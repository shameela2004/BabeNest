
// import React from 'react';
// import { useAuth } from '../context/AuthProvider';
// import Navbar from '../components/common/Navbar';

// function OrderHistory() {
//   const { user } = useAuth();

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-600 font-semibold text-lg">
//         Please login to see your order history.
//       </div>
//     );
//   }

//   const orders = user.orders || [];

//   if (orders.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-pink-50 text-gray-600 font-semibold text-lg">
//         You have no past orders.
//       </div>
//     );
//   }

//   //Format date..
//   const formatDate = (isoDate) => {
//     const date = new Date(isoDate);
//     return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
//   };

//   const handleCancelOrder = async (order) => {
//   try {
//     const userRes = await axios.get(`http://localhost:3000/users/${user.id}`);
//     const userData = userRes.data;
//     const updatedOrders = userData.orders.map(o =>
//       o.orderId === order.orderId ? { ...o, status: 'cancelled' } : o
//     );

//     await axios.put(`http://localhost:3000/users/${user.id}`, {
//       ...userData,
//       orders: updatedOrders
//     });

//     // Update context or refetch if needed
//     alert("Order cancelled successfully.");
//   } catch (err) {
//     console.error("Cancel failed:", err);
//     alert("Failed to cancel order.");
//   }
// };

// const handleRatingChange = (item, rating) => {
//   item.tempRating = rating; // Temp value to attach
// };

// const handleReviewSubmit = async (item, reviewText) => {
//   const rating = item.tempRating;
//   if (!rating) return alert("Please select a rating.");

//   try {
//     const res = await axios.get(`http://localhost:3000/products/${item.id}`);
//     const product = res.data;

//     const newReview = {
//       userName: user.name,
//       rating: parseFloat(rating),
//       review: reviewText,
//       date: new Date().toISOString()
//     };

//     const updatedReviews = [...(product.reviews || []), newReview];

//     const avgRating = (
//       updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length
//     ).toFixed(1);

//     await axios.put(`http://localhost:3000/products/${item.id}`, {
//       ...product,
//       rating: avgRating,
//       reviews: updatedReviews
//     });

//     alert("Review submitted successfully.");
//   } catch (err) {
//     console.error("Failed to submit review:", err);
//     alert("Failed to submit review.");
//   }
// };



//   return (
//     <>
//       <Navbar />
//       <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8 mb-16">
//         <h1 className="text-3xl font-extrabold text-pink-800 mb-8 border-b border-gray-200 pb-4">
//           My Orders
//         </h1>
//         {orders.map((order) => (
//           <div
//             key={order.orderId}
//             className="border border-pink-200 rounded-lg mb-8 shadow-sm hover:shadow-md transition-shadow duration-300"
//           >
//             <div className="flex justify-between items-center bg-pink-100 rounded-t-lg px-6 py-3 border-b border-gray-200">
//               <div className="text-gray-700 font-semibold text-sm md:text-base">
//                 Order ID: <span className="font-normal">{order.orderId}</span>
//               </div>
//               <div className="text-gray-700 font-semibold text-sm md:text-base">
//                 Date: <span className="font-normal">{formatDate(order.orderDate)}</span>
//               </div>
//             </div>
//             <div className="px-6 py-4 text-pink-800 font-semibold text-lg border-b border-gray-200">
//               Total Amount: ₹{order.totalAmount.toFixed(2)}
//               <div className="text-gray-700 font-semibold text-sm md:text-base">
//   Status: <span className={`font-bold px-2 py-1 rounded ${
//     order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//     order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
//     order.status === 'delivered' ? 'bg-green-100 text-green-800' :
//     'bg-red-100 text-red-800'
//   }`}>
//     {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//   </span>
// </div>

//               <div className="text-gray-700 font-semibold text-sm md:text-base">
//                 Name: <span className="font-normal">{order.customerName}</span>
//               </div>
//               <div className="text-gray-700 font-semibold text-sm md:text-base">
//                 Email: <span className="font-normal">{order.customerEmail}</span>
//               </div>
//               <div className="text-gray-700 font-semibold text-sm md:text-base">
//                 Phone: <span className="font-normal">{order.customerPhone}</span>
//               </div>
//               <div className="text-gray-700 font-semibold text-sm md:text-base">
//                 Address: <span className="font-normal">{order.customerAddress}</span>
//               </div>
//             </div>
             
//             <div className="px-6 py-4">
//               <strong className="block mb-3 text-pink-800 text-lg">Items:</strong>
//               <ul className="space-y-4">
//                 {order.items.map((item) => (
//                   <li
//                     key={item.id}
//                     className="flex items-center gap-4 border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
//                   >
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-20 h-20 object-cover rounded-md shadow-sm"
//                       loading="lazy"
//                     />
//                     <div className="text-pink-900 font-medium text-base">
//                       <p>{item.name}</p>
//                       <p className="text-gray-600 text-sm">
//                         Qty: {item.quantity} &nbsp; | &nbsp; ₹{item.price * item.quantity}
//                       </p>
//                     </div>
//                     {order.status === 'delivered' && (
//   <div className="mt-2">
//     <label className="block text-sm text-gray-600">Your Rating:</label>
//     <select
//       onChange={(e) => handleRatingChange(item, e.target.value)}
//       className="border rounded px-2 py-1 mt-1"
//     >
//       <option value="">Rate</option>
//       {[1, 2, 3, 4, 5].map(n => (
//         <option key={n} value={n}>{n}</option>
//       ))}
//     </select>
//     <textarea
//       placeholder="Write your review..."
//       onBlur={(e) => handleReviewSubmit(item, e.target.value)}
//       className="w-full mt-2 border px-3 py-2 rounded"
//     />
//   </div>
// )}

//                   </li>
                  
                  
//                 ))}
                
//               </ul>
//               {order.status === "pending"&& (
//   <button
//     onClick={() => handleCancelOrder(order)}
//     className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-4"
//   >
//     Cancel Order
//   </button>
// )}

//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default OrderHistory;








import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import Navbar from '../components/common/Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';

const OrderHistory = () => {
  const { user, login } = useAuth();
const [refresh, setRefresh] = useState(false);

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-600 font-semibold text-lg">Please login to see your order history.</div>;
  }

  const orders = user.orders || [];
  const formatDate = iso => new Date(iso).toLocaleString();

  const canCancel = order =>
    order.status === 'pending' && (Date.now() - new Date(order.orderDate) < 24 * 60 * 60 * 1000);

  const handleCancel = async (order) => {
    try {
      const res = await axios.get(`http://localhost:3001/users/${user.id}`);
      const userData = res.data;
      const updated = userData.orders.map(o =>
        o.orderId === order.orderId ? { ...o, status: 'cancelled' } : o
      );
      await axios.put(`http://localhost:3001/users/${user.id}`, {...userData, orders: updated});
      login({ ...user, orders: updated }); 
      toast.success('Order cancelled.');
      setRefresh(r => !r);
    } catch (_) {
      toast.error('Cancel failed.');
    }
  };
const handleReviewSubmit = async (item) => {
  const rating = item.tempRating;
  const reviewText = item.tempReview;

  if (!rating || !reviewText) {
    return toast.error("Please provide both rating and review.");
  }

  try {
    // Get product
    const res = await axios.get(`http://localhost:3001/products/${item.id}`);
    const product = res.data;

    const existingReviews = product.reviews || [];

    // Check if user already reviewed
    const existingIndex = existingReviews.findIndex(
      (r) => r.userName === user.name
    );

    const updatedReview = {
      userName: user.name,
      rating: parseFloat(rating),
      review: reviewText,
      date: new Date().toISOString(),
    };

    let updatedReviews;
    if (existingIndex !== -1) {
      // Overwrite existing review
      existingReviews[existingIndex] = updatedReview;
      updatedReviews = [...existingReviews];
    } else {
      // New review
      updatedReviews = [...existingReviews, updatedReview];
    }

    // Recalculate average rating
    const avgRating = (
      updatedReviews.reduce((sum, r) => sum + r.rating, 0) /
      updatedReviews.length
    ).toFixed(1);

    // Update product
    await axios.put(`http://localhost:3001/products/${item.id}`, {
      ...product,
      rating: avgRating,
      reviews: updatedReviews,
    });

    toast.success("Review submitted successfully.");
    item.showForm = false;
    setRefresh((prev) => !prev);
  } catch (err) {
    console.error("Review error", err);
    toast.error("Failed to submit review.");
  }
};

   if (orders.length === 0) {
    return <>
        <Navbar></Navbar>
        <div className="max-w-4xl mx-auto p-6 text-center text-gray-600">
          <h2 className="text-2xl font-semibold mb-4">You have no previous orders!!</h2>
          <p>Shop something...</p>
        </div>
        </>
  }
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-pink-700">My Orders</h1>
        {orders.map(order => (
          <div key={order.orderId} className="border rounded-lg mb-6 overflow-hidden shadow-sm">
            <div className="bg-pink-100 px-6 py-3 flex justify-between items-center">
              <div className="font-semibold">Order ID: <span className="font-normal">{order.orderId}</span></div>
              <div className="font-semibold">Date: <span className="font-normal">{formatDate(order.orderDate)}</span></div>
            </div>
            <div className="px-6 py-4 bg-white">
              <div className="flex flex-wrap justify-between items-center mb-4">
                <div className="text-gray-800 font-semibold">Total: ₹{order.totalAmount.toFixed(2)}</div>
                <div className="text-sm"><span className={`px-2 py-1 rounded-full ${
                  order.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                  order.status === 'shipped' ? 'bg-blue-200 text-blue-800' :
                  order.status === 'delivered' ? 'bg-green-200 text-green-800' :
                  'bg-red-200 text-red-800'
                }`}>{order.status.charAt(0).toUpperCase()+order.status.slice(1)}</span></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 mb-4">
                <div><strong>Name:</strong> {order.customerName}</div>
                <div><strong>Email:</strong> {order.customerEmail}</div>
                <div><strong>Phone:</strong> {order.customerPhone}</div>
                <div><strong>Address:</strong> {order.customerAddress}</div>
              </div>
              <div>
                <strong className="block text-lg mb-2 text-pink-700">Items:</strong>
                <ul className="space-y-4">
                  {order.items.map(item => (
                    <li key={item.id} className="flex items-center gap-4 border p-3 rounded-lg bg-gray-50">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      <div className="flex-1">
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-gray-600 text-sm">Qty: {item.quantity} — ₹{item.price*item.quantity}</div>
                      </div>
                      {order.status === 'delivered' && (
  <div className="ml-auto">
    {!item.showForm ? (
      <button
        className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600"
        onClick={() => {
          item.showForm = true;
          setRefresh((prev) => !prev);
        }}
      >
        Add Review
      </button>
    ) : (
      <div className="mt-2 space-y-2">
        <select
          onChange={(e) => (item.tempRating = e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select Rating</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {'★'.repeat(n)} ({n})
            </option>
          ))}
        </select>
        <textarea
          className="w-full border px-3 py-2 rounded"
          placeholder="Write your review..."
          onChange={(e) => (item.tempReview = e.target.value)}
        />
        <button
          onClick={() =>
            handleReviewSubmit(item)
          }
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Submit Review
        </button>
      </div>
    )}
  </div>
)}

                    </li>
                  ))}
                </ul>
              </div>
              {canCancel(order) && (
                <button onClick={()=>handleCancel(order)}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderHistory;
