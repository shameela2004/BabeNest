// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Navbar from '../components/common/Navbar';
// import { useAuth } from '../context/AuthProvider';
// import Swal from 'sweetalert2';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// // import { Eye, EyeOff } from 'lucide-react'; // Optional: use react-icons if needed

// function UserProfile() {
//   const { user, logout, setUser } = useAuth();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ name: '', password: '' });
//   const [showPassword, setShowPassword] = useState(false);

//   useEffect(() => {
//     if (user) {
//       setFormData({ name: user.name, password: user.password });
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleUpdate = async () => {
//     try {
//       const updatedUser = {
//         ...user,
//         name: formData.name,
//         password: formData.password,
//       };

//       await axios.put(`http://localhost:3001/users/${user.id}`, updatedUser);
//       setUser(updatedUser);
//       localStorage.setItem("user", JSON.stringify(updatedUser)); // update storage too
//       Swal.fire('Success', 'Profile updated successfully!', 'success');
//     } catch (error) {
//       console.error('Update failed:', error);
//       Swal.fire('Error', 'Failed to update profile.', 'error');
//     }
//   };

//   const handleLogout = () => {
//     Swal.fire({
//       title: `Logout from this account?`,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#e3342f',
//       cancelButtonColor: '#6c757d',
//       confirmButtonText: 'Yes!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logout(); // Use AuthContext logout
//         // navigate('/');
//         Swal.fire('Logged out!', 'You have been logged out.', 'success');
//       }
//     });
//   };

//   if (!user) {
//     return <div className="text-center mt-10 text-gray-600">Please log in to view your profile.</div>;
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
//         <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">My Profile</h2>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-semibold">Name</label>
//           <input
//             type="text"
//             name="name"
//             className="w-full border px-3 py-2 rounded mt-1"
//             value={formData.name}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-semibold">Email</label>
//           <input
//             type="email"
//             value={user.email}
//             disabled
//             className="w-full border px-3 py-2 rounded mt-1 bg-gray-100 cursor-not-allowed"
//           />
//         </div>

//         <div className="mb-4 relative">
//           <label className="block text-gray-700 font-semibold">Password</label>
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             className="w-full border px-3 py-2 rounded mt-1 pr-10"
//             value={formData.password}
//             onChange={handleChange}
//           />
//           <button
//             type="button"
//             className="absolute top-9 right-3 text-gray-600"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
//           </button>
//         </div>

//         <div className="text-sm text-gray-500 mb-6">
//           Joined on: {new Date(user.createdAt).toLocaleDateString()}
//         </div>

//         <div className="flex justify-between">
//           <button
//             onClick={handleUpdate}
//             className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded"
//           >
//             Save Changes
//           </button>
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default UserProfile;




// correct working user profile after connecting with the backend ..------------------------------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/common/Navbar";
// import { useAuth } from "../context/AuthProvider";
// import Swal from "sweetalert2";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import api from "../api/axios"; // your axios instance

// function UserProfile() {
//   const { user, logout, refreshToken } = useAuth();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ username: "", oldPassword: "", newPassword: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // Fetch user profile from backend
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         // await refreshToken(); // refresh token if expired
//         const res = await api.get("/user/me"); // GET profile
//         if (res.data && res.data.data) {
//           setFormData({
//             username: res.data.data.username,
//             oldPassword: "",
//             newPassword: "",
//           });
//         }
//       } catch (err) {
//         console.error("Failed to fetch profile:", err);
//         if (err.response?.status === 401) {
//           Swal.fire("Unauthorized", "Please login again.", "warning");
//           logout();
//           navigate("/login");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [logout, navigate]);

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleUpdate = async () => {
//     if (!formData.username.trim()) {
//       Swal.fire("Validation Error", "Username cannot be empty.", "warning");
//       return;
//     }

//     try {
//       const payload = {
//         username: formData.username,
//       };

//       // Only include password change if user filled it
//       if (formData.oldPassword && formData.newPassword) {
//         payload.oldPassword = formData.oldPassword;
//         payload.newPassword = formData.newPassword;
//       }

//       const res = await api.put("/user/me", payload); // PUT update

//       if (res.data && res.data.success) {
//         Swal.fire("Success", "Profile updated successfully!", "success");

//         // Refresh token/user info in auth context if needed
//         if (res.data.data) {
//           // Update AuthContext user (optional)
//           // refreshToken(); // can refresh token if your backend returns new JWT
//         }

//         setFormData({ username: res.data.data.username, oldPassword: "", newPassword: "" });
//       }
//     } catch (err) {
//       console.error("Update failed:", err);
//       if (err.response?.data?.message) {
//         Swal.fire("Error", err.response.data.message, "error");
//       } else {
//         Swal.fire("Error", "Failed to update profile.", "error");
//       }
//     }
//   };

//   const handleLogout = () => {
//     Swal.fire({
//       title: `Logout from this account?`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#e3342f",
//       cancelButtonColor: "#6c757d",
//       confirmButtonText: "Yes!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logout();
//         Swal.fire("Logged out!", "You have been logged out.", "success");
//         navigate("/login");
//       }
//     });
//   };

//   if (loading) return <div className="text-center mt-10 text-gray-600">Loading profile...</div>;
//   if (!user) return <div className="text-center mt-10 text-gray-600">Please log in to view your profile.</div>;

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
//         <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">My Profile</h2>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-semibold">Username</label>
//           <input
//             type="text"
//             name="username"
//             className="w-full border px-3 py-2 rounded mt-1"
//             value={formData.username}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-semibold">Email</label>
//           <input
//             type="email"
//             value={user.email}
//             disabled
//             className="w-full border px-3 py-2 rounded mt-1 bg-gray-100 cursor-not-allowed"
//           />
//         </div>

//         <div className="mb-4 relative">
//           <label className="block text-gray-700 font-semibold">Old Password</label>
//           <input
//             type={showPassword ? "text" : "password"}
//             name="oldPassword"
//             className="w-full border px-3 py-2 rounded mt-1 pr-10"
//             value={formData.oldPassword}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="mb-4 relative">
//           <label className="block text-gray-700 font-semibold">New Password</label>
//           <input
//             type={showPassword ? "text" : "password"}
//             name="newPassword"
//             className="w-full border px-3 py-2 rounded mt-1 pr-10"
//             value={formData.newPassword}
//             onChange={handleChange}
//           />
//           <button
//             type="button"
//             className="absolute top-9 right-3 text-gray-600"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
//           </button>
//         </div>

//         <div className="flex justify-between">
//           <button
//             onClick={handleUpdate}
//             className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded"
//           >
//             Save Changes
//           </button>
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default UserProfile;



import React, { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthProvider';
import api from '../api/axios';

function UserProfile() {
  const { user, setUser, logout, callApiWithRefresh } = useAuth();
  const [formData, setFormData] = useState({ username: '', oldPassword: '', newPassword: '' });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({ ...formData, username: user.username });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      await callApiWithRefresh(() =>
        api.put('/user/me', {
          username: formData.username,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword
        })
      );

      // Update local state
      const updatedUser = { ...user, username: formData.username };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      Swal.fire('Success', 'Profile updated successfully!', 'success');
      setFormData(prev => ({ ...prev, oldPassword: '', newPassword: '' }));
    } catch (err) {
      console.error('Update failed:', err);
      Swal.fire('Error', err.response?.data?.message || 'Failed to update profile.', 'error');
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout from this account?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e3342f',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes!'
    }).then(result => {
      if (result.isConfirmed) {
        logout();
        Swal.fire('Logged out!', 'You have been logged out.', 'success');
      }
    });
  };

  if (!user) return <div className="text-center mt-10 text-gray-600">Please log in to view your profile.</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">My Profile</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Username</label>
          <input
            type="text"
            name="username"
            className="w-full border px-3 py-2 rounded mt-1"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full border px-3 py-2 rounded mt-1 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-700 font-semibold">Old Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="oldPassword"
            className="w-full border px-3 py-2 rounded mt-1 pr-10"
            value={formData.oldPassword}
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute top-9 right-3 text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">New Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="newPassword"
            className="w-full border px-3 py-2 rounded mt-1"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleUpdate}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded"
          >
            Save Changes
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default UserProfile;

