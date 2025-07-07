import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../context/CartProvider'
import Navbar from './common/Navbar'
import axios from 'axios'

function ProductDetails() {
  const {id}=useParams()
  const [product,setProduct]=useState(null)
  const {addToCart}=useCart()
  const navigate=useNavigate()
  useEffect(()=>{
    axios.get(`http://localhost:3000/products/${id}`).
    then((res)=>setProduct(res.data))
    .catch((e)=>console.log("error in fetching..",e))
  },[id])
  const displayStars=(rating)=>{
    const fullstars=Math.floor(rating || 0)
    const stars=[]
    for(let i=0;i<5;i++){
      stars.push(
        <span key={i} className={i<fullstars?"text-yellow-400":"text-gray-400"}>★</span>
      )
    } 
    return <div className='text-lg'>
        {stars}
       </div>
  }
  const handleBuyNow=()=>{
    addToCart(product)
    navigate("/checkout")
  }
      if (!product) {
    return (
      <>
        <Navbar />
        <div className="text-center text-gray-600 mt-10">Loading product details...</div>
      </>
    );
  }
  return (
    
     <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-10">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-80 object-cover rounded-lg shadow"
        />
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold text-pink-700">{product.name}</h1>
          <p className="text-xl font-semibold text-gray-800">₹{product.price}</p>

          {/* Rating */}
          <div>
            <p className="text-sm text-gray-600">Rating:</p>
            {displayStars(product.rating)}
          </div>

          <p className="text-gray-600">{product.description}</p>
          <p className="text-sm text-gray-500">Stock: {product.stock}</p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => addToCart(product)}
              className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded shadow"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded shadow"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails