
// import axios from "axios";
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { Navigate, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); 
//   const navigate=useNavigate()
  
//   useEffect(() => {
//     const storeddata = localStorage.getItem("user");
//     if (storeddata) {
//       setUser(JSON.parse(storeddata));
//     }
//     setLoading(false); 
//   }, []);


//     useEffect(() => {
//     if (user?.id) {
//       // Check block status from server
//       axios.get(`http://localhost:3001/users/${user.id}`)
//         .then(res => {
//           if (res.data.blocked) {
//             Swal.fire({
//               icon: 'error',
//               title: 'Account Blocked',
//               text: 'Your account has been blocked by admin.',
//               timer: 3000,
//               showConfirmButton: false,
//             });
//             logout();
//           }
//         })
//         .catch(err => {
//           console.error("Failed to verify user block status", err);
//         });
//     }
//   }, [user]);

//   const login = (userdata) => {
//     setUser(userdata);
//     localStorage.setItem("user", JSON.stringify(userdata));
//   };
  

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//     navigate("/")
//   };
  

//   return (
//     <AuthContext.Provider value={{ user, login, logout ,loading,setUser}}>
//       {children}
//     </AuthContext.Provider>
//   );
// };








// correct working code after connecting with the backend .. got this code after so many fixes of  bugs and erroros ..--------------------------------------------

// import React, { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import toast from "react-hot-toast";

// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     try {
//       const storedUser = localStorage.getItem("user");
//       if (storedUser) setUser(JSON.parse(storedUser));
//     } catch (err) {
//       console.warn("Failed to parse user from localStorage:", err);
//       localStorage.removeItem("user");
//     }
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const res = await api.post("/auth/login", { email, password });
//       const data = res.data.data; // ✅ use 'data' from backend

//       if (!data || !data.user) {
//         toast.error("Login failed: invalid response from server");
//         return null;
//       }

//       // check if user is blocked
//       if (data.user.blocked) {
//         toast.error("Your account has been blocked.");
//         return null;
//       }

//       // save user and access token
//       setUser(data.user);
//       localStorage.setItem("user", JSON.stringify(data.user));
//       localStorage.setItem("accessToken", data.accessToken);

//       toast.success("Login successful!");

//       // navigate based on role
//       if (data.user.role.toLowerCase() === "admin") {
//         navigate("/admin");
//       } else {
//         navigate("/");
//       }

//       return data.user;
//     } catch (err) {
//       console.log("Login failed", err);
//       toast.error(err.response?.data?.message || "Login failed");
//       return null;
//     }
//   };

//   const logout = async () => {
//     try {
//       await api.post("/auth/logout");
//     } catch (err) {
//       console.warn("Backend logout error (will clear local state anyway):", err?.response?.data || err.message);
//     } finally {
//       setUser(null);
//       localStorage.removeItem("user");
//       localStorage.removeItem("accessToken");
//       navigate("/");
//     }
//   };

//   const refreshToken = async () => {
//     try {
//       const res = await api.post("/auth/refresh");
//       const data = res.data?.data;
//       if (!data?.accessToken) throw new Error("No access token in refresh response");
//       localStorage.setItem("accessToken", data.accessToken);
//       if (data.user) {
//         setUser(data.user);
//         localStorage.setItem("user", JSON.stringify(data.user));
//       }
//       return data.accessToken;
//     } catch (err) {
//       await logout();
//       throw err;
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, refreshToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };








import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user & token from localStorage on app start
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("accessToken");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        // Navigate based on role
        if (parsedUser.role.toLowerCase() === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }

      if (storedToken) {
        api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      }
    } catch (err) {
      console.warn("Failed to load auth from storage:", err);
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const data = res.data.data;

      if (!data || !data.user) {
        toast.error("Login failed: invalid response from server");
        return null;
      }

      if (data.user.blocked) {
        toast.error("Your account has been blocked.");
        return null;
      }

      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("accessToken", data.accessToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;

      toast.success("Login successful!");

      // Navigate based on role
      if (data.user.role.toLowerCase() === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      return data.user;
    } catch (err) {
      console.log("Login failed", err);
      toast.error(err.response?.data?.message || "Login failed");
      return null;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.post("/auth/logout"); // optional backend logout
    } catch (err) {
      console.warn("Backend logout error (will clear local state anyway):", err?.response?.data || err.message);
    } finally {
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      delete api.defaults.headers.common["Authorization"];
      navigate("/login");
      toast.success("Logged out successfully!");
    }
  };

  // Refresh token
  const refreshToken = async () => {
    try {
      const res = await api.post("/auth/refresh"); // HttpOnly cookie
      const data = res.data.data;

      if (!data?.accessToken) throw new Error("No access token in refresh response");

      localStorage.setItem("accessToken", data.accessToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;

      if (data.user) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return data.accessToken;
    } catch (err) {
      await logout();
      throw err;
    }
  };

  // Wrapper for API calls with auto-refresh
  const callApiWithRefresh = async (callback) => {
    try {
      return await callback();
    } catch (err) {
      if (err.response?.status === 401) {
        await refreshToken(); // try refresh
        return await callback(); // retry original request
      } else {
        throw err;
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, refreshToken, callApiWithRefresh }}
    >
      {children}
    </AuthContext.Provider>
  );
};
