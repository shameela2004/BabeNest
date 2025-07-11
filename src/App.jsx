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
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminLayout from './pages/admin/AdminLayout'
import ManageProducts from './pages/admin/ManageProducts'
import AddProduct from './pages/admin/AddProduct'
import EditProduct from './pages/admin/EditProduct'
import AdminRoute from './components/common/AdminRoute'
import ManageOrders from './pages/admin/ManageOrders'
import UserDetails from './pages/admin/UserDetails'
import ManageUsers from './pages/admin/ManageUsers'
import UserProfile from './pages/UserProfile'

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

        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/myorders" element={<OrderHistory />} />
        <Route path="/products/:id" element={<ProductDetails/>}/>

        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path="/profile" element={<UserProfile/>}/>


        <Route path="/admin" element={<AdminRoute><AdminLayout/></AdminRoute>}>
        <Route index element={<AdminDashboard/>}/>
        <Route path="/admin/products" element={<ManageProducts/>}/>
        <Route path="/admin/products/add" element={<AddProduct/>}/>
        <Route path="/admin/products/edit/:id" element={<EditProduct/>}/>
        <Route path="/admin/orders" element={<ManageOrders/>}/>
        <Route path="/admin/users" element={<ManageUsers/>}/>
        <Route path="/admin/users/:id" element={<UserDetails/>}/>
        </Route>

      </Routes>
     
    </>
  )
}

export default App