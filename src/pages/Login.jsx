import React, { useState } from "react";
import Input from "../components/common/Input";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!form.email.trim() || !form.password.trim()) {
    toast.error("Please fill in both fields");
    return;
  }

    try {
      const res = await axios.get(
        `http://localhost:3001/users?email=${form.email}&password=${form.password}`
      );
      if (res.data.length > 0) {
        const user = res.data[0];
        login(res.data[0]);
        if (user.blocked) {
          toast.error("Your account has been blocked.");
          return;
        }
        
        if (user.role === "admin") {
          toast.success("Login Successfull!!");
          navigate("/admin");
        } else {
          toast.success("Login Successfull!!");
          navigate("/");
        }
      } else {
        toast.error("Invalid password or email");
      }
    } catch (er) {
      console.log("login failed", er);
      toast.error("Login failed ");
    }
  };
  return (
    <>
    <nav className="sticky top-0 z-50 bg-white shadow-md px-4 md:px-8 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
    
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-bold text-pink-600 tracking-wide"
            >
              <img src="/images/baby-boy.png" alt="Logo" className="h-8 w-8 object-contain" />
              BabeNest
            </Link>
            </div>
            </nav>
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
  style={{ backgroundImage: "url('/images/hero2.jpg')" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex flex-col justify-center items-center  p-4">

      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
        <h1 className="font-bold text-pink-600 text-2xl mb-4 text-center">
          LOGIN
        </h1>
        <form onSubmit={handlesubmit}>
            <div className="w-full md:w-80 mx-auto">
          <Input
            type="email"
            label="Email"
            placeholder="Enter the registered email"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          ></Input></div>
          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          ></Input>
          <Button type="submit" text="Login" className="w-full mt-4"></Button>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?
            <Link
              to="/register"
              className="text-pink-500 hover:underline font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
      </div>
    </div>
    </>
  );
}
export default Login;
