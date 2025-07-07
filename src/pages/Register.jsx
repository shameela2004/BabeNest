import React, { useState } from 'react'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

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
           await axios.post("http://localhost:3000/users", form)
        
           alert("Registered Successfully!!")
           setForm({ name: "", email: "", password: "" });
           navigate("/login")
        }
        catch(e){
            console.log("Registration failed",e)
        }
    }

    
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
    <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow'>
        <h1 className='text-2xl text-pink-500 font-bold text-center mb-4'>SignUp</h1>
        <form onSubmit={handleSubmit}>
            <Input label='Name' value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}></Input>
            <span className='text-xs text-red-700'>{warning.name}</span>
            <Input label='E-mail' type='email' value={form.email}  onChange={(e)=>setForm({...form,email:e.target.value})}></Input>
            <Input label="Password" type='password' value={form.password}  name='password' onChange={(e)=>setForm({...form,password:e.target.value})}></Input>
            <span className='text-xs text-red-700'>{warning.password}</span>
            <Input label="Confirm Password" type='password' value={confpass} onChange={(e)=>setConfpass(e.target.value)}></Input>
            <span className='text-xs text-red-700'>{warning.confpass}</span>

             <Button type="submit" text="SignUp" className='w-full mt-4'></Button>
        </form>

    </div>
    </div>
    </>
  )
}

export default Register


