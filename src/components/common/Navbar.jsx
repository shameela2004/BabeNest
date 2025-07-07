import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'
import Button from './Button'
import { CartProvider, useCart } from '../../context/CartProvider'
import { FaHeart, FaShoppingCart } from 'react-icons/fa'


function Navbar() {
  const {logout,user}=useAuth()
  const {cartItems}=useCart()
  function handleLogout(){
    let isConfirm=confirm("Do You want Logout from this account?")
    if(isConfirm){
      logout()
    }
  }
  return (
//     <nav className="bg-white px-4 md:px-10 py-4 flex flex-wrap justify-between items-center gap-3 position:fixed">
//       <Link to="/" className='font-bold text-pink-600 text-2xl'>BabeNest</Link>
//       {user?
//       <div className='flex gap-4'>
//       {/* <Link to='/' className='hover:text-pink-600'>Home</Link> */}
//       <Link to='/products' className="hover:text-pink-600">Products</Link>
// <Link to='/cart' className='relative'>
//   🛒
//   {cartItems.length > 0 && (
//     <span className='absolute -top-2 -right-3 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
//       {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
//     </span>
//   )}
// </Link>   
// <Link to="/wishlist">
// <FaHeart></FaHeart>
// </Link>   
//     <Link to="/myorders">Orders</Link>
//  <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-[5px] font-light rounded leading-none">logout</button>
//       </div>
      
//       :
//       <div className='flex gap-4'>
//       <Link to='/' className='hover:text-pink-600'>Home</Link>
//       <Link to='/products' className="hover:text-pink-600">Products</Link>
//       <Link to='/cart' className='hover:text-pink-600'>Cart</Link>
//       <div>
//       <Link to='/login' className='hover:text-pink-600'>Login |</Link>
//       <Link to='/register' className='hover:text-pink-600'> Register</Link>
//       </div>
//       </div>
//       }
      
//     </nav>
 <nav className="sticky top-0 z-50 bg-white shadow-md px-6 md:px-12 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-pink-600 tracking-wide">
        BabeNest
      </Link>

      {/* Navigation Links */}
      {user ? (
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/products" className="hover:text-pink-600 transition">
            Products
          </Link>

          <Link to="/cart" className="relative hover:text-pink-600 transition">
            <FaShoppingCart size={18} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          <Link to="/wishlist" className="hover:text-pink-600 transition">
            <FaHeart className="text-xl" />
          </Link>

          <Link to="/myorders" className="hover:text-pink-600 transition">
            Orders
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-pink-600 transition">
            Home
          </Link>
          <Link to="/products" className="hover:text-pink-600 transition">
            Products
          </Link>
          <Link to="/cart" className="hover:text-pink-600 transition">
            Cart
          </Link>
          <Link to="/login" className="hover:text-pink-600 transition">
            Login
          </Link>
          <Link to="/register" className="hover:text-pink-600 transition">
            Register
          </Link>
        </div>
      )}
    </nav>
  )
}
export default Navbar




