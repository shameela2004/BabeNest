// import React from 'react'
// import { Link } from 'react-router-dom'
// import { useAuth } from '../../context/AuthProvider'
// import Button from './Button'
// import { CartProvider, useCart } from '../../context/CartProvider'
// import { FaHeart, FaShoppingCart } from 'react-icons/fa'


// function Navbar() {
//   const {logout,user}=useAuth()
//   const {cartItems}=useCart()
//   // function handleLogout(){
//   //   let isConfirm=confirm("Do You want Logout from this account?")
//   //   if(isConfirm){
//   //     logout()
//   //   }
//   // }
//   return (

//  <nav className="sticky top-0 z-50 bg-white shadow-md px-6 md:px-12 py-4 flex justify-between items-center">
      
//       <Link to="/" className="text-2xl font-bold text-pink-600 tracking-wide">
//       <img src="" alt=""/>
//         BabeNest
//       </Link>

//       {/* Navigation Links */}
//       {user ? (
//         <div className="flex items-center gap-6 text-sm font-medium">
//           <Link to="/products" className="hover:text-pink-600 transition">
//             Products
//           </Link>

//           <Link to="/cart" className="relative hover:text-pink-600 transition">
//             <FaShoppingCart size={18} />
//             {cartItems.length > 0 && (
//               <span className="absolute -top-2 -right-3 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                 {cartItems.length}
//               </span>
//             )}
//           </Link>

//           <Link to="/wishlist" className="hover:text-pink-600 transition">
//             <FaHeart className="text-xl" />
//           </Link>

//           <Link to="/myorders" className="hover:text-pink-600 transition">
//             Orders
//           </Link>
//           <Link to="/profile" className="hover:text-pink-600 transition">
//             Profile
//           </Link>

//           {/* <button
//             onClick={handleLogout}
//             className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
//           >
//             Logout
//           </button> */}
//         </div>
//       ) : (
//         <div className="flex items-center gap-6 text-sm font-medium">
//           <Link to="/products" className="hover:text-pink-600 transition">
//             Products
//           </Link>
//           <Link to="/cart" className="hover:text-pink-600 transition">
//             Cart
//           </Link>
//           <Link to="/login" className="hover:text-pink-600 transition py-1 px-3 rounded-full bg-blue-400">
//             Login
//           </Link>
//           {/* <Link to="/register" className="hover:text-pink-600 transition">
//             Register
//           </Link> */}
//         </div>
//       )}
//     </nav>
//   )
// }
// export default Navbar




import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'
import { useCart } from '../../context/CartProvider'
import { useWishlist } from '../../context/WishlistProvider'
import Button from './Button'
import { FaHeart, FaShoppingCart, FaUser, FaBars, FaTimes, FaUserCircle } from 'react-icons/fa'

function Navbar() {
  const { logout, user } = useAuth()
  const { cartItems } = useCart()
  const { wishlistItems } = useWishlist()

  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(prev => !prev)
  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-pink-600 tracking-wide"
          onClick={closeMenu}
        >
          <img src="/images/baby-boy.png" alt="Logo" className="h-8 w-8 object-contain" />
          BabeNest
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="md:hidden text-pink-600 text-xl focus:outline-none"
          onClick={toggleMenu}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links */}
        <div
          className={`flex-col md:flex-row md:flex gap-6 text-sm font-medium items-center 
          md:static absolute top-20 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none 
          transition-all duration-300 ease-in-out ${menuOpen ? 'flex' : 'hidden'}`}
        >
          <Link to="/products" className="hover:text-pink-600 transition" onClick={closeMenu}>
            Products
          </Link>

          <Link to="/cart" className="relative hover:text-pink-600 transition" onClick={closeMenu}>
            <FaShoppingCart size={18} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          <Link to="/wishlist" className="relative hover:text-pink-600 transition" onClick={closeMenu}>
            <FaHeart className="text-xl" />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {user && (
            <>
              <Link to="/myorders" className="hover:text-pink-600 transition" onClick={closeMenu}>
                Orders
              </Link>
              <Link to="/profile" className="flex items-center gap-1 hover:text-pink-600 transition" onClick={closeMenu}>
                <FaUserCircle className='text-xl'/>
              </Link>
            </>
          )}

          {!user && (
            <Link
              to="/login"
              className="hover:bg-pink-600 transition bg-pink-500 px-4 py-1 rounded-full text-white"
              onClick={closeMenu}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

