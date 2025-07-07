
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

function ProductList() {
    const [products,setProducts]=useState([])
    useEffect(()=>{
        axios.get("http://localhost:3000/products")
        .then((res)=>setProducts(res.data))
        .catch((e)=>console.log(e))
    },[])
  return (
    <div className="flex flex-wrap gap-6 justify-center mt-6">
        
        {products.length>0?
        products.map((product)=>(
            <ProductCard key={product.id} product={product}/>
        )):
        <p className="text-gray-600 text-xl">Loading products...</p>        }
    </div>
  )
}

export default ProductList