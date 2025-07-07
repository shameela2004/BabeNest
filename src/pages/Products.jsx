
import React from 'react'
import ProductList from '../components/ProductList'
import Navbar from '../components/common/Navbar'

function Products() {
  return (
    <>
    <Navbar></Navbar>
    <div className="p-6">
        <ProductList/>
    </div>
    </>
  )
}

export default Products