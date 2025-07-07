import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'
import Button from './Button'
import { CartProvider, useCart } from '../../context/CartProvider'
import { FaHeart } from 'react-icons/fa'


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
    <nav className="bg-white px-4 md:px-10 py-4 flex flex-wrap justify-between items-center gap-3 position:fixed">
      <Link to="/" className='font-bold text-pink-600 text-2xl'>BabeNest</Link>
      {user?
      <div className='flex gap-4'>
      {/* <Link to='/' className='hover:text-pink-600'>Home</Link> */}
      <Link to='/products' className="hover:text-pink-600">Products</Link>
<Link to='/cart' className='relative'>
  🛒
  {cartItems.length > 0 && (
    <span className='absolute -top-2 -right-3 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
      {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
    </span>
  )}
</Link>   
<Link to="/wishlist">
<FaHeart></FaHeart>
</Link>   
    <Link to="/myorders">Orders</Link>
 <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-[5px] font-light rounded leading-none">logout</button>
      </div>
      
      :
      <div className='flex gap-4'>
      <Link to='/' className='hover:text-pink-600'>Home</Link>
      <Link to='/products' className="hover:text-pink-600">Products</Link>
      <Link to='/cart' className='hover:text-pink-600'>Cart</Link>
      <div>
      <Link to='/login' className='hover:text-pink-600'>Login |</Link>
      <Link to='/register' className='hover:text-pink-600'> Register</Link>
      </div>
      </div>
      }
      
    </nav>
  )
}
export default Navbar


// import React from 'react'
// import { Link } from 'react-router-dom'
// import { useAuth } from '../../context/AuthProvider'
// import Button from './Button'

// function Navbar() {
//   const {login,user}=useAuth()
//   return (
//     <nav className='bg-white p-4 px-8 flex justify-between items-center'>
//       <Link to="/" className='font-bold text-pink-600 text-2xl'>NewBornNest</Link>
//       {user?<div className='flex gap-4'>
//       <Link to='/' className='hover:text-pink-600'>Home</Link>
//       <Link to='/products' className="hover:text-pink-600">Products</Link>
//       <Link to='/cart' className='hover:text-pink-600'>Cart</Link>
//       <Button className="rounded-full" text="Logout"></Button>
//       </div>:
//       <div className='flex gap-4'>
//       <Link to='/' className='hover:text-pink-600'>Home</Link>
//       <Link to='/products' className="hover:text-pink-600">Products</Link>
//       <Link to='/cart' className='hover:text-pink-600'>Cart</Link>
//       <Link to='/login' className='hover:text-pink-600'>Login</Link>
//       <Link to='/register' className='hover:text-pink-600'>Register</Link>
//       </div>
//       }
      
//     </nav>
//   )
// }

