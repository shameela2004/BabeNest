import React, { useState } from 'react'
import Input from '../components/common/Input'
import { useNavigate } from 'react-router-dom'
import Button from '../components/common/Button';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';

function Login() {
    const [form,setForm]=useState({email:"",password:""})
    const navigate=useNavigate();
    const {login}=useAuth();
    const handlesubmit=async (e)=>{
        e.preventDefault()
        try{
            const res = await axios.get(`http://localhost:3000/users?email=${form.email}&password=${form.password}`)
            if(res.data.length>0){
                login(res.data[0])
                alert("Login Successfull")
                navigate("/")
            }
            else{
                alert("Invalid password or email")
            }
        }
        catch(er){
                console.log("login failed",er)
            }
    }
  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow'>
        <h1 className='font-bold text-blue-500 text-2xl mb-4 text-center'>LOGIN</h1>
        <form onSubmit={handlesubmit}>
            <Input type='email' label="Email" placeholder='Enter the registered email' value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})}></Input>
            <Input type='password' label="Password" placeholder="Enter your password" value={form.password} onChange={(e)=>setForm({...form, password: e.target.value})}></Input>
             <Button type="submit" text="Login" className='w-full mt-4'></Button>
        </form>

    </div>
  )
}
export default Login

