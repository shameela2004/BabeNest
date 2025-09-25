// fully working and functional code before connecting with the backend

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function UserDetails() {
//   const { id } = useParams();
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchUser();
//   }, [id]);

//   const fetchUser = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3001/users/${id}`);
//       setUser(res.data);
//     } catch (err) {
//       console.error('Error fetching user:', err);
//     }
//   };

//   if (!user) return <div className="p-6">Loading user data...</div>;

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h2 className="text-3xl font-bold mb-4 text-pink-600">User Details</h2>

//       <div className={`p-4 rounded-md border ${user.blocked ? 'border-red-400' : 'border-gray-300'} bg-white shadow mb-6`}>
//         <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
//         <p><strong>Email:</strong> {user.email}</p>
//         <p><strong>Status:</strong> {user.blocked ? '❌ Blocked' : '✅ Active'}</p>
//       </div>

//       {/* Cart Section */}
//       <div className="mb-6">
//         <h4 className="text-lg font-semibold mb-2 text-pink-500">Cart Items</h4>
//         {user.cart && user.cart.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {user.cart.map(item => (
//               <div key={item.id} className="border p-3 rounded shadow-sm">
//                 <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded mb-2" />
//                 <p className="font-bold">{item.name}</p>
//                 <p>Price: ₹{item.price}</p>
//                 <p>Quantity: {item.quantity}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No items in cart.</p>
//         )}
//       </div>

//       {/* Wishlist Section */}
//       <div className="mb-6">
//         <h4 className="text-lg font-semibold mb-2 text-pink-500">Wishlist Items</h4>
//         {user.wishlist && user.wishlist.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {user.wishlist.map(item => (
//               <div key={item.id} className="border p-3 rounded shadow-sm">
//                 <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded mb-2" />
//                 <p className="font-bold">{item.name}</p>
//                 <p>Price: ₹{item.price}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No items in wishlist.</p>
//         )}
//       </div>

//       {/* Orders Section */}
//       <div>
//         <h4 className="text-lg font-semibold mb-2 text-pink-500">Orders</h4>
//         {user.orders && user.orders.length > 0 ? (
//           <div className="space-y-4">
//             {user.orders.map(order => (
//               <div key={order.orderId} className="border p-4 rounded shadow-sm">
//                 <p><strong>Order ID:</strong> {order.orderId}</p>
//                 <p><strong>Status:</strong> {order.status}</p>
//                 <p><strong>Total:</strong> ₹{order.totalAmount}</p>
//                 <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>

//                 <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
//                   {order.items.map(item => (
//                     <div key={item.id} className="border p-2 rounded">
//                       <img src={item.image} alt={item.name} className="w-full h-28 object-cover rounded mb-1" />
//                       <p className="text-sm font-medium">{item.name}</p>
//                       <p className="text-sm">Qty: {item.quantity}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No orders found.</p>
//         )}
//       </div>

//       <button
//         onClick={() => navigate('/admin/users')}
//         className="mt-6 bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded"
//       >
//         ← Back to Manage Users
//       </button>
//     </div>
//   );
// }

// export default UserDetails;







// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FaBan, FaShoppingCart, FaHeart, FaBox } from 'react-icons/fa';
// import api from '../../api/axios';
// import Swal from 'sweetalert2';

// function UserDetails() {
//   const { id } = useParams();
//   const [userProfile, setUserProfile] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchUserProfile();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   const fetchUserProfile = async () => {
//     try {
//       const res = await api.get(`/AdminUser/${id}/profile`);
//       setUserProfile(res?.data?.data ?? null);
//     } catch (err) {
//       console.error('❌ Error fetching user profile:', err);
//       Swal.fire('Error', 'Failed to fetch user details', 'error');
//       navigate('/admin/users');
//     }
//   };

//   const toggleBlock = async () => {
//     if (!userProfile) return;
//     const user = userProfile.user;
//     const action = user.blocked ? 'Unblock' : 'Block';
//     const endpoint = user.blocked ? 'unblock' : 'block';

//     const result = await Swal.fire({
//       title: `${action} this user?`,
//       text: `Are you sure you want to ${action.toLowerCase()} ${user.username}?`,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: user.blocked ? '#3085d6' : '#e3342f',
//       cancelButtonColor: '#6c757d',
//       confirmButtonText: `Yes, ${action.toLowerCase()}!`,
//     });

//     if (result.isConfirmed) {
//       try {
//         await api.put(`/AdminUser/${user.id}/${endpoint}`);
//         Swal.fire({
//           title: `${action}ed!`,
//           text: `User has been ${action.toLowerCase()}ed successfully.`,
//           icon: 'success',
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         fetchUserProfile(); // Refresh
//       } catch (err) {
//         console.error(`Error ${action.toLowerCase()}ing user:`, err);
//         Swal.fire('Failed', 'Something went wrong.', 'error');
//       }
//     }
//   };

//   if (!userProfile) return <div className="p-6">Loading user data...</div>;

//   const { user, carts, wishlists, orders } = userProfile;

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h2 className="text-3xl font-bold mb-4 text-pink-600">User Details</h2>

//       {/* User Info */}
//       <div className={`p-4 rounded-md border ${user.blocked ? 'border-red-400' : 'border-gray-300'} bg-white shadow mb-6`}>
//         <h3 className="text-xl font-semibold mb-2">{user.username}</h3>
//         <p><strong>Email:</strong> {user.email}</p>
//         <p><strong>Status:</strong> {user.blocked ? '❌ Blocked' : '✅ Active'}</p>
//         <button
//           onClick={toggleBlock}
//           className={`mt-2 px-4 py-1 rounded text-white ${user.blocked ? 'bg-green-500 hover:bg-green-600' : 'bg-red-600 hover:bg-red-700'}`}
//         >
//           {user.blocked ? 'Unblock' : 'Block'}
//         </button>
//       </div>

//       {/* Cart Section */}
//       <div className="mb-6">
//         <h4 className="text-lg font-semibold mb-2 text-pink-500 flex items-center gap-2">
//           <FaShoppingCart /> Cart Items
//         </h4>
//         {carts && carts.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {carts.map(item => (
//               <div key={item.id} className="border p-3 rounded shadow-sm">
//                 <img src={item.productImage} alt={item.productName} className="w-full h-40 object-cover rounded mb-2" />
//                 <p className="font-bold">{item.productName}</p>
//                 <p>Price: ₹{item.productPrice}</p>
//                 <p>Quantity: {item.quantity}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No items in cart.</p>
//         )}
//       </div>

//       {/* Wishlist Section */}
//       <div className="mb-6">
//         <h4 className="text-lg font-semibold mb-2 text-pink-500 flex items-center gap-2">
//           <FaHeart /> Wishlist Items
//         </h4>
//         {wishlists && wishlists.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {wishlists.map(item => (
//               <div key={item.id} className="border p-3 rounded shadow-sm">
//                 <img src={item.productImage} alt={item.productName} className="w-full h-40 object-cover rounded mb-2" />
//                 <p className="font-bold">{item.productName}</p>
//                 <p>Price: ₹{item.productPrice}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No items in wishlist.</p>
//         )}
//       </div>

//       {/* Orders Section */}
//       <div>
//         <h4 className="text-lg font-semibold mb-2 text-pink-500 flex items-center gap-2">
//           <FaBox /> Orders
//         </h4>
//         {orders && orders.length > 0 ? (
//           <div className="space-y-4">
//             {orders.map(order => (
//               <div key={order.id} className="border p-4 rounded shadow-sm">
//                 <p><strong>Order ID:</strong> {order.orderNumber}</p>
//                 <p><strong>Status:</strong> {order.orderStatus}</p>
//                 <p><strong>Total:</strong> ₹{order.totalAmount}</p>
//                 <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
//                 <p><strong>Payment Status:</strong> {order.paymentStatus}</p>

//                 <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>

//                 {order.items.length > 0 ? (
//                   <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
//                     {order.items.map(item => (
//                       <div key={item.id} className="border p-2 rounded">
//                         <img src={item.productImage} alt={item.productName} className="w-full h-28 object-cover rounded mb-1" />
//                         <p className="text-sm font-medium">{item.productName}</p>
//                         <p className="text-sm">Qty: {item.quantity}</p>
//                         <p className="text-sm">Price: ₹{item.price}</p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-gray-500 mt-2">No items in this order.</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No orders found.</p>
//         )}
//       </div>

//       <button
//         onClick={() => navigate('/admin/users')}
//         className="mt-6 bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded"
//       >
//         ← Back to Manage Users
//       </button>
//     </div>
//   );
// }

// export default UserDetails;









// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FaBan, FaShoppingCart, FaHeart, FaBox } from 'react-icons/fa';
// import api from '../../api/axios';
// import Swal from 'sweetalert2';

// function UserDetails() {
//   const { id } = useParams();
//   const [userProfile, setUserProfile] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchUserProfile();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   const fetchUserProfile = async () => {
//     try {
//       const res = await api.get(`/AdminUser/${id}/profile`);
//       setUserProfile(res?.data?.data ?? null);
//     } catch (err) {
//       console.error('❌ Error fetching user profile:', err);
//       Swal.fire('Error', 'Failed to fetch user details', 'error');
//       navigate('/admin/users');
//     }
//   };

//   const toggleBlock = async () => {
//     if (!userProfile) return;
//     const user = userProfile.user;
//     const action = user.blocked ? 'Unblock' : 'Block';
//     const endpoint = user.blocked ? 'unblock' : 'block';

//     const result = await Swal.fire({
//       title: `${action} this user?`,
//       text: `Are you sure you want to ${action.toLowerCase()} ${user.username}?`,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: user.blocked ? '#3085d6' : '#e3342f',
//       cancelButtonColor: '#6c757d',
//       confirmButtonText: `Yes, ${action.toLowerCase()}!`,
//     });

//     if (result.isConfirmed) {
//       try {
//         await api.put(`/AdminUser/${user.id}/${endpoint}`);
//         Swal.fire({
//           title: `${action}ed!`,
//           text: `User has been ${action.toLowerCase()}ed successfully.`,
//           icon: 'success',
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         fetchUserProfile(); // Refresh
//       } catch (err) {
//         console.error(`Error ${action.toLowerCase()}ing user:`, err);
//         Swal.fire('Failed', 'Something went wrong.', 'error');
//       }
//     }
//   };

//   if (!userProfile) return <div className="p-6">Loading user data...</div>;

//   const { user, carts, wishlists, orders } = userProfile;

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h2 className="text-3xl font-bold mb-4 text-pink-600">User Details</h2>

//       {/* User Info */}
//       <div className={`p-4 rounded-md border ${user.blocked ? 'border-red-400' : 'border-gray-300'} bg-white shadow mb-6`}>
//         <h3 className="text-xl font-semibold mb-2">{user.username}</h3>
//         <p><strong>Email:</strong> {user.email}</p>
//         <p><strong>Status:</strong> {user.blocked ? '❌ Blocked' : '✅ Active'}</p>
//         <button
//           onClick={toggleBlock}
//           className={`mt-2 px-4 py-1 rounded text-white ${user.blocked ? 'bg-green-500 hover:bg-green-600' : 'bg-red-600 hover:bg-red-700'}`}
//         >
//           {user.blocked ? 'Unblock' : 'Block'}
//         </button>
//       </div>

//       {/* Cart Section */}
//       <div className="mb-6">
//         <h4 className="text-lg font-semibold mb-2 text-pink-500 flex items-center gap-2">
//           <FaShoppingCart /> Cart Items
//         </h4>
//         {carts && carts.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {carts.map(item => (
//               <div key={item.id} className="border p-3 rounded shadow-sm">
//                 <img src={item.productImage} alt={item.productName} className="w-full h-40 object-cover rounded mb-2" />
//                 <p className="font-bold">{item.productName}</p>
//                 <p>Category: {item.categoryName}</p>
//                 <p>Price: ₹{item.productPrice}</p>
//                 <p>Quantity: {item.quantity}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No items in cart.</p>
//         )}
//       </div>

//       {/* Wishlist Section */}
//       <div className="mb-6">
//         <h4 className="text-lg font-semibold mb-2 text-pink-500 flex items-center gap-2">
//           <FaHeart /> Wishlist Items
//         </h4>
//         {wishlists && wishlists.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {wishlists.map(item => (
//               <div key={item.id} className="border p-3 rounded shadow-sm">
//                 <img src={item.productImage} alt={item.productName} className="w-full h-40 object-cover rounded mb-2" />
//                 <p className="font-bold">{item.productName}</p>
//                 <p>Price: ₹{item.productPrice}</p>
//                 <p>Category: {item.categoryName}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No items in wishlist.</p>
//         )}
//       </div>

//       {/* Orders Section */}
//       <div>
//         <h4 className="text-lg font-semibold mb-2 text-pink-500 flex items-center gap-2">
//           <FaBox /> Orders
//         </h4>
//         {orders && orders.length > 0 ? (
//           <div className="space-y-4">
//             {orders.map(order => (
//               <div key={order.id} className="border p-4 rounded shadow-sm">
//                 <p><strong>Order Number:</strong> {order.orderNumber}</p>
//                 <p><strong>Status:</strong> {order.orderStatus}</p>
//                 <p><strong>Total:</strong> ₹{order.totalAmount}</p>
//                   <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
//                 <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
//                 <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>

//                 {order.items && order.items.length > 0 ? (
//                   <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
//                     {order.items.map(item => (
//                       <div key={item.id} className="border p-2 rounded">
//                         <img src={item.productImage} alt={item.productName} className="w-full h-28 object-cover rounded mb-1" />
//                         <p className="text-sm font-medium">{item.productName}</p>
//                         <p className="text-sm">Qty: {item.quantity}</p>
//                         <p className="text-sm">Price: ₹{item.price}</p>
//                         <p className="text-sm">Category: {item.categoryName}</p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-gray-500 mt-2">No items in this order.</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No orders found.</p>
//         )}
//       </div>

//       <button
//         onClick={() => navigate('/admin/users')}
//         className="mt-6 bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded"
//       >
//         ← Back to Manage Users
//       </button>
//     </div>
//   );
// }

// export default UserDetails;





import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBan, FaShoppingCart, FaHeart, FaBox } from 'react-icons/fa';
import api from '../../api/axios';
import Swal from 'sweetalert2';

function UserDetails() {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, [id]);

  const fetchUserProfile = async () => {
    try {
      const res = await api.get(`/AdminUser/${id}/profile`);
      setUserProfile(res?.data?.data ?? null);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      Swal.fire('Error', 'Failed to fetch user details', 'error');
      navigate('/admin/users');
    }
  };

  const toggleBlock = async () => {
    if (!userProfile) return;
    const user = userProfile.user;
    const action = user.blocked ? 'Unblock' : 'Block';
    const endpoint = user.blocked ? 'unblock' : 'block';

    const result = await Swal.fire({
      title: `${action} this user?`,
      text: `Are you sure you want to ${action.toLowerCase()} ${user.username}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: user.blocked ? '#3085d6' : '#e3342f',
      cancelButtonColor: '#6c757d',
      confirmButtonText: `Yes, ${action.toLowerCase()}!`,
    });

    if (result.isConfirmed) {
      try {
        await api.put(`/AdminUser/${user.id}/${endpoint}`);
        Swal.fire({
          title: `${action}ed!`,
          text: `User has been ${action.toLowerCase()}ed successfully.`,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
        fetchUserProfile();
      } catch (err) {
        console.error(`Error ${action.toLowerCase()}ing user:`, err);
        Swal.fire('Failed', 'Something went wrong.', 'error');
      }
    }
  };

  if (!userProfile) return <div className="p-6">Loading user data...</div>;

  const { user, carts, wishlists, orders } = userProfile;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-pink-600">User Details</h2>

      {/* User Info */}
      <div className={`p-6 rounded-md border ${user.blocked ? 'border-red-400' : 'border-gray-300'} bg-white shadow mb-8`}>
        <h3 className="text-2xl font-semibold mb-2">{user.username}</h3>
        <p className="mb-1"><strong>Email:</strong> {user.email}</p>
        <p className="mb-2"><strong>Status:</strong> {user.blocked ? '❌ Blocked' : '✅ Active'}</p>
        <button
          onClick={toggleBlock}
          className={`mt-2 px-5 py-2 rounded text-white ${user.blocked ? 'bg-green-500 hover:bg-green-600' : 'bg-red-600 hover:bg-red-700'}`}
        >
          {user.blocked ? 'Unblock' : 'Block'}
        </button>
      </div>

      {/* Cart Section */}
      <Section title="Cart Items" icon={<FaShoppingCart />} items={carts} />

      {/* Wishlist Section */}
      <Section title="Wishlist Items" icon={<FaHeart />} items={wishlists} isWishlist />

      {/* Orders Section */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold mb-4 text-pink-500 flex items-center gap-2">
          <FaBox /> Orders
        </h4>
        {orders && orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="border p-4 rounded shadow hover:shadow-lg transition">
                <p className="font-medium"><strong>Order #:</strong> {order.orderNumber}</p>
                <p className="text-sm"><strong>Status:</strong> {order.orderStatus}</p>
                <p className="text-sm"><strong>Total:</strong> ₹{order.totalAmount}</p>
                <p className="text-sm"><strong>Payment Method:</strong> {order.paymentMethod}</p>
                <p className="text-sm"><strong>Payment Status:</strong> {order.paymentStatus}</p>
                <p className="text-sm"><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>

                {order.items && order.items.length > 0 ? (
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {order.items.map(item => (
                      <div key={item.id} className="border p-2 rounded hover:shadow-md transition">
                        <img src={item.productImage} alt={item.productName} className="w-full h-28 object-cover rounded mb-1" />
                        <p className="text-sm font-semibold">{item.productName}</p>
                        <p className="text-sm">Qty: {item.quantity}</p>
                        <p className="text-sm">Price: ₹{item.price}</p>
                        <p className="text-sm">Category: {item.categoryName}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 mt-2">No items in this order.</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No orders found.</p>
        )}
      </div>

      <button
        onClick={() => navigate('/admin/users')}
        className="mt-4 bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded"
      >
        ← Back to Manage Users
      </button>
    </div>
  );
}

// Reusable Section for Cart/Wishlist
const Section = ({ title, icon, items, isWishlist = false }) => {
  return (
    <div className="mb-8">
      <h4 className="text-xl font-semibold mb-4 text-pink-500 flex items-center gap-2">
        {icon} {title}
      </h4>
      {items && items.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map(item => (
            <div
              key={item.id}
              className="border p-3 rounded shadow hover:shadow-lg transition relative group"
            >
              <img
                src={item.productImage}
                alt={item.productName}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <p className="font-medium text-sm">{item.productName}</p>
              <p className="text-sm">₹{item.productPrice}</p>
              <p className="text-sm">{item.categoryName}</p>
              {isWishlist && (
                <div className="absolute top-2 right-2 text-red-500 text-xl cursor-pointer opacity-0 group-hover:opacity-100 transition">
                  <FaHeart />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No items found.</p>
      )}
    </div>
  );
};

export default UserDetails;