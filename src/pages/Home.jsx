
// import React, { useEffect } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import Input from '../components/common/Input'
// import Button from '../components/common/Button'
// import Navbar from '../components/common/Navbar'
// import { useAuth } from '../context/AuthProvider'
// import { FaBabyCarriage, FaPuzzlePiece, FaTshirt, FaUtensilSpoon } from 'react-icons/fa'
// import { GiBabyBottle } from 'react-icons/gi'
// import { MdBed } from 'react-icons/md'

// function Home() {
//     const {user,login,loading} =useAuth()
//     const navigate = useNavigate();

//   useEffect(() => {
//     if (!loading && user?.role === 'admin') {
//       navigate('/admin', { replace: true });
//     }
//   }, [user, loading]);

//   if (loading) return <p>Loading...</p>;
//   return (
//     <>
//     <Navbar></Navbar>

//      <div className="bg-pink-50 py-16 px-6 text-center shadow-md">
//         {user ? (
//           <div>
//             <h2 className="text-2xl text-pink-500 font-semibold mb-2">Hi {user.name},</h2>
//             <h1 className="text-4xl md:text-5xl font-bold text-pink-700 mb-4">
//               Welcome to BabeNest 👶
//             </h1>
//             <p className="text-gray-600 text-lg mb-6">
//               Discover adorable and essential care products for your little one!
//             </p>
//             <Link to="/products">
//               <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl text-lg shadow">
//                 Browse Products
//               </button>
//             </Link>
//           </div>
//         ) : (
//           <div>
//             <h1 className="text-4xl md:text-5xl font-bold text-pink-700 mb-4">
//               Welcome to BabeNest 👶
//             </h1>
//             <p className="text-gray-600 text-lg mb-6">
//               Adorable care essentials for your newborn baby.
//             </p>
//             <div className="flex justify-center gap-6 mt-6">
//               <Link to="/login">
//                 <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded shadow">
//                   Login
//                 </button>
//               </Link>
//               <Link to="/register">
//                 <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded shadow">
//                   Sign Up
//                 </button>
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* CategoriesSection */}
//       <div className="max-w-6xl mx-auto py-16 px-6">
//         <h2 className="text-3xl font-bold text-center text-pink-600 mb-10">Shop by Category</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
//           <Link to={`/products?category=Clothing`}>
//           <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
//             <FaTshirt className="text-5xl mx-auto text-pink-400 mb-4" />
//             <h3 className="text-xl font-semibold text-gray-700">Clothing</h3>
//             <p className="text-gray-500 mt-2">Soft & cozy clothes for your newborn.</p>
//           </div>
//           </Link>
//           <Link to={`/products?category=Feeding`}>
//           <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
//             <FaUtensilSpoon className="text-5xl mx-auto text-pink-400 mb-4" />
//             <h3 className="text-xl font-semibold text-gray-700">Feeding</h3>
//             <p className="text-gray-500 mt-2">Safe and gentle feeding bottles & tools.</p>
//           </div>
//           </Link>
//           <Link to={`/products?category=Toys`}>
//           <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
//             <FaPuzzlePiece className="text-5xl mx-auto text-pink-400 mb-4" />
//             <h3 className="text-xl font-semibold text-gray-700">Toys</h3>
//             <p className="text-gray-500 mt-2">Playful & soft toys to keep them smiling.</p>
//           </div>
//           </Link>
//            <Link to={`/products?category=Travel`}>
//           <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
//             <FaBabyCarriage className="text-5xl mx-auto text-pink-400 mb-4" />
//             <h3 className="text-xl font-semibold text-gray-700">Travel</h3>
//             <p className="text-gray-500 mt-2">	Strollers & travel-friendly baby gear.</p>
//           </div>
//           </Link>
//            <Link to={`/products?category=Baby Care`}>
//           <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
//             <GiBabyBottle className="text-5xl mx-auto text-pink-400 mb-4" />
//             <h3 className="text-xl font-semibold text-gray-700">Baby Care</h3>
//             <p className="text-gray-500 mt-2">Grooming and hygiene for your newborn.</p>
//           </div>
//           </Link>
//            <Link to={`/products?category=Bedding`}>
//           <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
//             <MdBed className="text-5xl mx-auto text-pink-400 mb-4" />
//             <h3 className="text-xl font-semibold text-gray-700">Bedding</h3>
//             <p className="text-gray-500 mt-2">Soft bedding sets for a cozy sleep.</p>
//           </div>
//           </Link>
//         </div>
//       </div>

      
//        {/* bottom section */}
//       <div className="bg-yellow-100 py-10 px-6 text-center">
//         <h2 className="text-2xl font-bold text-gray-800">Don't miss out on our latest arrivals!</h2>
//         <p className="text-gray-600 mt-2 mb-4">Hand-picked essentials, curated for your baby's needs.</p>
//         <Link to="/products">
//           <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded shadow">
//             Shop Now
//           </button>
//         </Link>
//       </div>




//     </>
//   )
// }
// export default Home




//second one---------------------------------------------------------------------------------


// import React, { useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Navbar from '../components/common/Navbar';
// import Footer from '../components/common/Footer';
// import { useAuth } from '../context/AuthProvider';
// import {
//   FaTshirt,
//   FaPuzzlePiece,
//   FaUtensilSpoon,
//   FaBabyCarriage,
// } from 'react-icons/fa';
// import { GiBabyBottle } from 'react-icons/gi';
// import { MdBed } from 'react-icons/md';

// const categories = [
//   { name: 'Clothing', icon: <FaTshirt /> },
//   { name: 'Feeding', icon: <FaUtensilSpoon /> },
//   { name: 'Toys', icon: <FaPuzzlePiece /> },
//   { name: 'Travel', icon: <FaBabyCarriage /> },
//   { name: 'Baby Care', icon: <GiBabyBottle /> },
//   { name: 'Bedding', icon: <MdBed /> },
// ];

// export default function Home() {
//   const { user, loading } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!loading && user?.role === 'admin') {
//       navigate('/admin', { replace: true });
//     }
//   }, [user, loading, navigate]);

//   if (loading) return <p className="text-center py-20">Loading...</p>;

//   return (
//     <>
//       <Navbar />

//       {/* HERO SECTION */}
//       <section className="relative h-[85vh] bg-pink-50">
//         <img
//           src="/images/romberanimalprint.jpg" // <-- Place this image inside /public folder
//           alt="hero"
//           className="absolute inset-0 w-full h-full object-cover opacity-80"
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-pink-100/80 via-white/70 to-white/60 backdrop-blur-sm" />
//         <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
//           <h1 className="text-5xl md:text-6xl font-extrabold text-pink-700 leading-tight drop-shadow mb-4 animate-fade-in">
//             Welcome to BabeNest 👶
//           </h1>
//           <p className="text-gray-700 text-lg md:text-xl mb-8 max-w-2xl animate-fade-in delay-200">
//             Adorable care essentials crafted with love for your newborn’s first steps into the world.
//           </p>
//           {user ? (
//             <Link to="/products">
//               <button className="bg-pink-600 hover:bg-pink-700 text-white text-lg font-semibold px-8 py-3 rounded-xl shadow-lg transition duration-300 animate-fade-in delay-300">
//                 Browse Products
//               </button>
//             </Link>
//           ) : (
//             <div className="flex justify-center gap-6 animate-fade-in delay-300">
//               <Link to="/login">
//                 <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow">
//                   Login
//                 </button>
//               </Link>
//               <Link to="/register">
//                 <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow">
//                   Sign Up
//                 </button>
//               </Link>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* CATEGORIES */}
//       <section className="max-w-6xl mx-auto py-16 px-6">
//         <h2 className="text-3xl font-bold text-center text-pink-600 mb-12">Shop by Category</h2>
//         <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
//           {categories.map((cat) => (
//             <Link key={cat.name} to={`/products?category=${cat.name}`}>
//               <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition cursor-pointer">
//                 <div className="text-pink-400 text-5xl">{cat.icon}</div>
//                 <h3 className="text-lg font-semibold text-gray-700">{cat.name}</h3>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </section>

//       {/* FEATURE SECTION */}
//       <section className="bg-yellow-100 py-16 px-6 text-center">
//         <div className="max-w-3xl mx-auto">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">
//             New Arrivals & Baby Essentials
//           </h2>
//           <p className="text-gray-700 mb-6">
//             Handpicked baby care essentials including clothing, feeding gear, and toys – thoughtfully curated for every moment.
//           </p>
//           <Link to="/products">
//             <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded shadow">
//               Shop Now
//             </button>
//           </Link>
//         </div>
            
//       </section>

      // {/* HIGHLIGHTS */}
      // <section className="max-w-5xl mx-auto py-16 px-6">
      //   <h2 className="text-3xl font-bold text-center text-pink-600 mb-10">
      //     Why Choose BabeNest?
      //   </h2>
      //   <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
      //     <div className="p-6 bg-white shadow rounded-lg">
      //       <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
      //       <p className="text-gray-600">
      //         All our products are safe, non-toxic, and made from baby-friendly materials.
      //       </p>
      //     </div>
      //     <div className="p-6 bg-white shadow rounded-lg">
      //       <h3 className="text-xl font-semibold mb-2">Fast & Safe Delivery</h3>
      //       <p className="text-gray-600">
      //         Delivered to your doorstep with care and hygiene assurance.
      //       </p>
      //     </div>
      //   </div>
      // </section>

//       <Footer />
//     </>
//   );
// }



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import axios from 'axios';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/products?_sort=id&_order=desc&_limit=10')
      .then(res => setFeatured(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <img src="images/hero2.jpg" alt="hero" className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex flex-col justify-center items-center text-center p-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg mb-4 animate-fade-in">
            Welcome to BabeNest
          </h1>
          <p className="text-xl text-white mb-6 animate-fade-in delay-200">
            Discover best seller essentials for your little one.
          </p>
          <button
            onClick={() => navigate('/products')}
            className="bg-white text-pink-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition transform animate-fade-in delay-300"
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Top Products */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-pink-700 mb-6 text-center">Top Deals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {featured.map(prod => (
            <div
              key={prod.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transform hover:-translate-y-1 transition cursor-pointer"
              onClick={() => navigate(`/products/${prod.id}`)}
            >
              <div className="relative overflow-hidden h-48 rounded-t-xl">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="object-center object-cover w-full h-full hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg truncate">{prod.name}</h3>
                <p className="mt-2 text-pink-600 font-bold">₹{prod.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

   {/* Feature Highlights */}
<section className="bg-gradient-to-br from-pink-50 to-yellow-50 py-20 px-6">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-4xl font-extrabold text-pink-700 mb-12">Why Choose BabeNest?</h2>
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      
      {/* Card 1 */}
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-pink-200 transition-all transform hover:-translate-y-2">
        <img src="https://cdn-icons-png.freepik.com/512/11702/11702065.png" alt="Safety" className="w-16 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-pink-600 mb-2">Baby-Safe Products</h3>
        <p className="text-gray-600">All our items are hypoallergenic, toxin-free and certified for delicate skin.</p>
      </div>

      {/* Card 2 */}
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-yellow-200 transition-all transform hover:-translate-y-2">
        <img src="https://cdn.pixabay.com/photo/2025/06/23/15/12/ai-generated-9676110_640.png" alt="Fast Delivery" className="w-16 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-yellow-600 mb-2">Fast & Reliable Delivery</h3>
        <p className="text-gray-600">Get your baby’s favorites at your doorstep quickly and safely.</p>
      </div>

      {/* Card 3 */}
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-green-200 transition-all transform hover:-translate-y-2">
        <img src="https://cdn-icons-png.flaticon.com/512/10004/10004511.png" alt="Eco Friendly" className="w-16 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-green-600 mb-2">Eco-Friendly</h3>
        <p className="text-gray-600">We use sustainable materials and packaging for a better future.</p>
      </div>

      {/* Card 4 */}
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-blue-200 transition-all transform hover:-translate-y-2">
        <img src="https://png.pngtree.com/png-clipart/20250107/original/pngtree-vector-cartoon-customer-service-png-free-material-png-image_5472501.png" alt="Support" className="w-16 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-blue-600 mb-2">24/7 Customer Support</h3>
        <p className="text-gray-600">Need help? Our friendly team is here for you around the clock.</p>
      </div>

      {/* Card 5 */}
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-purple-200 transition-all transform hover:-translate-y-2">
        <img src="https://cdn-icons-png.flaticon.com/512/5526/5526322.png" alt="Quality Assured" className="w-16 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-purple-600 mb-2">Top Quality Assurance</h3>
        <p className="text-gray-600">Each item is handpicked and quality-checked by our team.</p>
      </div>

      {/* Card 6 */}
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-red-200 transition-all transform hover:-translate-y-2">
        <img src="https://cdn-icons-png.flaticon.com/512/6021/6021967.png" alt="Gifting" className="w-16 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-red-500 mb-2">Perfect for Gifting</h3>
        <p className="text-gray-600">Thoughtful packaging and adorable picks, ideal for baby showers.</p>
      </div>
    </div>
  </div>
</section>
      


      {/* Newsletter Signup */}
<section className="bg-gradient-to-r from-pink-50 via-yellow-50 to-pink-50 py-16 px-4">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl font-bold text-pink-600 mb-4">Stay Updated!</h2>
    <p className="text-gray-600 mb-6">
      Subscribe to our newsletter for exclusive offers, baby care tips, and product updates.
    </p>

    <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full sm:w-2/3 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
      />
      <button
        type="submit"
        className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg shadow-md transition"
      >
        Subscribe
      </button>
    </form>

    <p className="text-sm text-gray-400 mt-4">No spam. Unsubscribe anytime.</p>
  </div>
</section>


      <Footer />
    </>
  );
}
