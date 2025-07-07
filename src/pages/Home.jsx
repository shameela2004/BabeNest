
import React from 'react'
import { Link } from 'react-router-dom'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import Navbar from '../components/common/Navbar'
import { useAuth } from '../context/AuthProvider'
import { FaBabyCarriage, FaPuzzlePiece, FaTshirt, FaUtensilSpoon } from 'react-icons/fa'
import { GiBabyBottle, GiDelicatePerfume } from 'react-icons/gi'
import { MdBed } from 'react-icons/md'

function Home() {
    const {user,login} =useAuth()
  return (
    <>
    <Navbar></Navbar>
   {/* <div className="text-center mt-10">
    {user?<div>
        <h2 className="text-2xl text-pink-300">Hi {user.name}</h2>
        <h1 className="text-4xl font-bold text-pink-600">Welcome to BabeNest 👶</h1>
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
      
    </div> */}


     

     <div className="bg-pink-50 py-16 px-6 text-center shadow-md">
        {user ? (
          <div>
            <h2 className="text-2xl text-pink-500 font-semibold mb-2">Hi {user.name},</h2>
            <h1 className="text-4xl md:text-5xl font-bold text-pink-700 mb-4">
              Welcome to BabeNest 👶
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Discover adorable and essential care products for your little one!
            </p>
            <Link to="/products">
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl text-lg shadow">
                Browse Products
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-pink-700 mb-4">
              Welcome to BabeNest 👶
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Adorable care essentials for your newborn baby.
            </p>
            <div className="flex justify-center gap-6 mt-6">
              <Link to="/login">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded shadow">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded shadow">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Categories / Features Section */}
      <div className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-10">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <Link to={`/products?category=Clothing`}>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
            <FaTshirt className="text-5xl mx-auto text-pink-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Clothing</h3>
            <p className="text-gray-500 mt-2">Soft & cozy clothes for your newborn.</p>
          </div>
          </Link>
          <Link to={`/products?category=Feeding`}>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
            <FaUtensilSpoon className="text-5xl mx-auto text-pink-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Feeding</h3>
            <p className="text-gray-500 mt-2">Safe and gentle feeding bottles & tools.</p>
          </div>
          </Link>
          <Link to={`/products?category=Toys`}>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
            <FaPuzzlePiece className="text-5xl mx-auto text-pink-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Toys</h3>
            <p className="text-gray-500 mt-2">Playful & soft toys to keep them smiling.</p>
          </div>
          </Link>
           <Link to={`/products?category=Travel`}>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
            <FaBabyCarriage className="text-5xl mx-auto text-pink-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Travel</h3>
            <p className="text-gray-500 mt-2">	Strollers & travel-friendly baby gear.</p>
          </div>
          </Link>
           <Link to={`/products?category=Baby Care`}>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
            <GiBabyBottle className="text-5xl mx-auto text-pink-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Baby Care</h3>
            <p className="text-gray-500 mt-2">Grooming and hygiene for your newborn.</p>
          </div>
          </Link>
           <Link to={`/products?category=Bedding`}>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
            <MdBed className="text-5xl mx-auto text-pink-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Bedding</h3>
            <p className="text-gray-500 mt-2">Soft bedding sets for a cozy sleep.</p>
          </div>
          </Link>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-yellow-100 py-10 px-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Don't miss out on our latest arrivals!</h2>
        <p className="text-gray-600 mt-2 mb-4">Hand-picked essentials, curated for your baby's needs.</p>
        <Link to="/products">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded shadow">
            Shop Now
          </button>
        </Link>
      </div>




    </>
  )
}
export default Home

