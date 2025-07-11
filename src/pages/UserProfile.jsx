import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/common/Navbar';
import { useAuth } from '../context/AuthProvider';

function UserProfile() {
  const { user, logout, setUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, password: user.password });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      const updatedUser = {
        ...user,
        name: formData.name,
        password: formData.password,
      };

      await axios.put(`http://localhost:3000/users/${user.id}`, updatedUser);
      setUser(updatedUser);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update profile.');
    }
  };

  const handleLogout = () => {
    const confirm = window.confirm('Are you sure you want to logout?');
    if (confirm) {
      logout();
      navigate('/');
    }
  };

  if (!user) {
    return <div className="text-center mt-10 text-gray-600">Please log in to view your profile.</div>;
  }

  return (
    <>
      <Navbar/>
      <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">My Profile</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border px-3 py-2 rounded mt-1"
            value={formData.name}
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

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border px-3 py-2 rounded mt-1"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="text-sm text-gray-500 mb-6">
          Joined on: {new Date(user.createdAt).toLocaleDateString()}
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
