import React, { useState } from 'react'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {
    const [form,setForm]=useState({name:"",email:"",password:""})
    const [confpass,setConfpass]=useState("")
    const navigate=useNavigate()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(form.name==""||form.password==""||form.email==""){
            alert("Fill all the fields")
            return
        }
        if(confpass!==form.password){
            alert("Password and confirm password must be equal")
            return
        }
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
    <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow'>
        <h1 className='text-2xl text-pink-500 font-bold text-center mb-4'>SignUp</h1>
        <form onSubmit={handleSubmit}>
            <Input label='Name' value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}></Input>
            <Input label='E-mail' type='email' value={form.email}  onChange={(e)=>setForm({...form,email:e.target.value})}></Input>
            <Input label="Password" type='password' value={form.password}  name='password' onChange={(e)=>setForm({...form,password:e.target.value})}></Input>
            <Input label="Confirm Password" type='password' value={confpass} onChange={(e)=>setConfpass(e.target.value)}></Input>

             <Button type="submit" text="SignUp" className='w-full mt-4'></Button>
        </form>

    </div>
    </>
  )
}

export default Register


