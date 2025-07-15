
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate=useNavigate()
  
  useEffect(() => {
    const storeddata = localStorage.getItem("user");
    if (storeddata) {
      setUser(JSON.parse(storeddata));
    }
    setLoading(false); 
  }, []);


    useEffect(() => {
    if (user?.id) {
      // Check block status from server
      axios.get(`http://localhost:3001/users/${user.id}`)
        .then(res => {
          if (res.data.blocked) {
            Swal.fire({
              icon: 'error',
              title: 'Account Blocked',
              text: 'Your account has been blocked by admin.',
              timer: 3000,
              showConfirmButton: false,
            });
            logout();
          }
        })
        .catch(err => {
          console.error("Failed to verify user block status", err);
        });
    }
  }, [user]);

  const login = (userdata) => {
    setUser(userdata);
    localStorage.setItem("user", JSON.stringify(userdata));
  };
  

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/")
  };
  

  return (
    <AuthContext.Provider value={{ user, login, logout ,loading,setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

