
import React from 'react'
import { Link } from 'react-router-dom'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import Navbar from '../components/common/Navbar'
import { useAuth } from '../context/AuthProvider'

function Home() {
    const {user,login} =useAuth()
  return (
    <>
    <Navbar></Navbar>
   <div className="text-center mt-10">
    {user?<div>
        <h2 className="text-2xl text-pink-300">Hi {user.name}</h2>
        <h1 className="text-4xl font-bold text-pink-600">Welcome to Newborn Nest 👶</h1>
      <p className="text-gray-600 mt-4">The best care products for your little one.</p>
        <Link to="/products">Products</Link>
        </div>
        :<div><h1 className="text-4xl font-bold text-pink-600">Welcome to Newborn Nest 👶</h1>
        <p className="text-gray-600 mt-4">The best care products for your little one.</p>
        <div className='flex gap-4 justify-center'>
            <button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'>Login</button>
            <button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'>SignUp</button>
        </div>
        </div>}
      
    </div>
    </>
  )
}
export default Home

