import React, { useState } from 'react'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

function Register() {
    const [form,setForm]=useState({name:"",email:"",password:""})
    const [confpass,setConfpass]=useState("")
    const [warning,setWarning]=useState({name:"",password:"",confpass:""})
    const navigate=useNavigate()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        setWarning({ name: "", password: "", confpass: "" });
            setWarning({ name: "", password: "", confpass: "" });

    let valid = true;
    const newWarnings = {};

    if (!form.name.trim() || form.name.length < 3) {
      newWarnings.name = "Name must be at least 3 characters.";
      valid = false;
    }

    if (!form.password.trim() || form.password.length < 8) {
      newWarnings.password = "Password must be at least 8 characters.";
      valid = false;
    }

    if (confpass !== form.password) {
      newWarnings.confpass = "Passwords do not match.";
      valid = false;
    }

    if (!form.email.trim()) {
      alert("Please enter your email.");
      return;
    }

    setWarning(newWarnings);
    if (!valid) return;
        try{
           await axios.post("http://localhost:3001/users", form)
        
           toast.success("Registered Successfully!!")
           setForm({ name: "", email: "", password: "" });
           navigate("/login")
        }
        catch(e){
            console.log("Registration failed",e)
        }
    }

    
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
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex flex-col justify-center items-center  p-4">

    <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow'>
        <h1 className='text-2xl text-pink-500 font-bold text-center mb-4'>SignUp</h1>
        <form onSubmit={handleSubmit}>
          <div  className="w-full md:w-80 mx-auto">
            <Input label='Name' value={form.name} className="w-full border  rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
 onChange={(e)=>setForm({...form,name:e.target.value})} placeholder='Enter your name'></Input></div>
            <span className='text-xs text-red-700'>{warning.name}</span>
            <Input label='E-mail' type='email' placeholder='Enter your Email' value={form.email}  onChange={(e)=>setForm({...form,email:e.target.value})}></Input>
            <Input label="Password" type='password' placeholder='Enter a strong password' value={form.password}  name='password' onChange={(e)=>setForm({...form,password:e.target.value})}></Input>
            <span className='text-xs text-red-700'>{warning.password}</span>
            <Input label="Confirm Password" type='password' value={confpass} onChange={(e)=>setConfpass(e.target.value)}></Input>
            <span className='text-xs text-red-700'>{warning.confpass}</span>

             <Button type="submit" text="SignUp" className='w-full mt-4'></Button>
        </form>

    </div>
    </div>
    </div>
    </>
  )
}

export default Register


