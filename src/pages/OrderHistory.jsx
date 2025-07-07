// import React from 'react';
// import { useAuth } from '../context/AuthProvider';
// import Navbar from '../components/common/Navbar';

// function OrderHistory() {
//   const { user } = useAuth();

//   if (!user) {
//     return <p>Please login to see your order history.</p>;
//   }

//   const orders = user.orders || [];

//   if (orders.length === 0) {
//     return <p>You have no past orders.</p>;
//   }

//    //convert date into string
//   const formatDate = (isoDate) => {
//     const date = new Date(isoDate);
//     return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
//   };

//   return (
//     <>
//      <Navbar/>
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">My Orders</h1>
//       {orders.map((order) => (
//         <div key={order.orderId} className="border  rounded mb-6 shadow-sm">
//           <div className="flex justify-between mb-2 p-4 border-b">
//             <div>
//               <strong>Order ID:</strong> {order.orderId}
//             </div>
//             <div>
//               <strong>Date:</strong> {formatDate(order.orderDate)}
//             </div>
//           </div>
//           <div className="mb-2 p-4">
//             <strong>Total Amount:</strong> ₹{order.totalAmount.toFixed(2)}
//           </div>
//           <div className='p-4'>
//             <strong>Items:</strong>
//             <ul className="list-disc ml-6">
//               {order.items.map((item) => (
//                 <li key={item.id}>
//                     <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
//                   {item.name} - Qty: {item.quantity} - ₹{item.price * item.quantity}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       ))}
//     </div>
//     </>
//   );
// }

// export default OrderHistory;




// import React from 'react';
// import { useAuth } from '../context/AuthProvider';
// import Navbar from '../components/common/Navbar';

// function OrderHistory() {
//   const { user } = useAuth();

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-pink-50 text-pink-700 font-semibold text-lg">
//         Please login to see your order history.
//       </div>
//     );
//   }

//   const orders = user.orders || [];

//   if (orders.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-pink-50 text-pink-700 font-semibold text-lg">
//         You have no past orders.
//       </div>
//     );
//   }

//   // Format date helper
//   const formatDate = (isoDate) => {
//     const date = new Date(isoDate);
//     return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8 mb-16">
//         <h1 className="text-3xl font-extrabold text-pink-700 mb-8 border-b border-pink-200 pb-4">
//           My Orders
//         </h1>
//         {orders.map((order) => (
//           <div
//             key={order.orderId}
//             className="border border-pink-200 rounded-lg mb-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
//           >
//             <div className="flex justify-between items-center bg-pink-100 rounded-t-lg px-6 py-3 border-b border-pink-200">
//               <div className="text-pink-800 font-semibold text-sm md:text-base">
//                 Order ID: <span className="font-normal">{order.orderId}</span>
//               </div>
//               <div className="text-pink-800 font-semibold text-sm md:text-base">
//                 Date: <span className="font-normal">{formatDate(order.orderDate)}</span>
//               </div>
//             </div>
//             <div className="px-6 py-4 text-pink-700 font-semibold text-lg border-b border-pink-200">
//               Total Amount: ₹{order.totalAmount.toFixed(2)}
//             </div>
//             <div className="px-6 py-4">
//               <strong className="block mb-3 text-pink-700 text-lg">Items:</strong>
//               <ul className="space-y-4">
//                 {order.items.map((item) => (
//                   <li
//                     key={item.id}
//                     className="flex items-center gap-4 border rounded-lg p-3 bg-pink-50 hover:bg-pink-100 transition-colors duration-200"
//                   >
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-20 h-20 object-cover rounded-md shadow-sm"
//                       loading="lazy"
//                     />
//                     <div className="text-pink-800 font-medium text-base">
//                       <p>{item.name}</p>
//                       <p className="text-pink-600 text-sm">
//                         Qty: {item.quantity} &nbsp; | &nbsp; ₹{item.price * item.quantity}
//                       </p>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default OrderHistory;







import React from 'react';
import { useAuth } from '../context/AuthProvider';
import Navbar from '../components/common/Navbar';

function OrderHistory() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-600 font-semibold text-lg">
        Please login to see your order history.
      </div>
    );
  }

  const orders = user.orders || [];

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50 text-gray-600 font-semibold text-lg">
        You have no past orders.
      </div>
    );
  }

  // Format date helper
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8 mb-16">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-8 border-b border-gray-200 pb-4">
          My Orders
        </h1>
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="border border-blue-200 rounded-lg mb-8 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex justify-between items-center bg-blue-100 rounded-t-lg px-6 py-3 border-b border-gray-200">
              <div className="text-gray-700 font-semibold text-sm md:text-base">
                Order ID: <span className="font-normal">{order.orderId}</span>
              </div>
              <div className="text-gray-700 font-semibold text-sm md:text-base">
                Date: <span className="font-normal">{formatDate(order.orderDate)}</span>
              </div>
            </div>
            <div className="px-6 py-4 text-blue-800 font-semibold text-lg border-b border-gray-200">
              Total Amount: ₹{order.totalAmount.toFixed(2)}
            </div>
            <div className="px-6 py-4">
              <strong className="block mb-3 text-blue-800 text-lg">Items:</strong>
              <ul className="space-y-4">
                {order.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-4 border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md shadow-sm"
                      loading="lazy"
                    />
                    <div className="text-blue-900 font-medium text-base">
                      <p>{item.name}</p>
                      <p className="text-gray-600 text-sm">
                        Qty: {item.quantity} &nbsp; | &nbsp; ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default OrderHistory;
