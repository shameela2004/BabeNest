import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Products from './pages/Products'
import Home from './pages/Home'
import PageNotFound from './pages/PageNotFound'
import ProductList from './components/ProductList'
import CartPage from './pages/CartPage'
import Login from './pages/Login'
import Register from './pages/Register'

import ProtectedRoute from './components/common/ProtectedRoute'
import Checkout from './pages/Checkout'
import OrderHistory from './pages/OrderHistory'
import ProductDetails from './components/ProductDetails'
import Wishlist from './pages/Wishlist'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='*' element={<PageNotFound/>}/>

        <Route path='/cart' element={<ProtectedRoute><CartPage/></ProtectedRoute>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='cart' element={<CartPage/>}></Route>
        <Route path='login' element={<Login/>}></Route>
        <Route path='register' element={<Register/>}></Route>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/myorders" element={<OrderHistory />} />
        <Route path="/products/:id" element={<ProductDetails/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>

      </Routes>
     
    </>
  )
}

export default App