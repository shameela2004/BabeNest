// // src/pages/OrderSuccess.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import api from "../api/axios";

// export default function OrderSuccess() {
//   const { id } = useParams();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!id) return;
//     (async () => {
//       try {
//         const res = await api.get(`/orders/${id}`);
//         const data = res?.data?.data ?? res?.data ?? null;
//         setOrder(data);
//       } catch (err) {
//         console.error("Failed to fetch order:", err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [id]);

//   if (loading) return <div className="p-6 text-center">Loading...</div>;
//   if (!order) return <div className="p-6 text-center">Order not found.</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="bg-white rounded-lg shadow p-6">
//         <h1 className="text-2xl font-bold text-green-600 mb-2">🎉 Order Confirmed</h1>
//         <p className="text-gray-700 mb-4">Thank you for your purchase! Your order is being processed.</p>

//         <div className="mb-4">
//           <strong>Order ID:</strong> {order.id || order.Id || order.orderNumber || "N/A"}<br />
//           <strong>Placed On:</strong> {new Date(order.orderDate || Date.now()).toLocaleString()}<br />
//           <strong>Total:</strong> ₹{(order.totalAmount ?? order.TotalAmount ?? 0).toFixed(2)}<br />
//           <strong>Payment:</strong> {order.paymentMethod ?? order.PaymentMethod ?? "N/A"} — {order.paymentStatus ?? order.PaymentStatus ?? "N/A"}<br />
//         </div>

//         <div className="mb-4">
//           <h3 className="font-semibold mb-2">Customer</h3>
//           <div>{order.customerName}</div>
//           <div>{order.customerEmail}</div>
//           <div>{order.customerPhone}</div>
//           <div className="text-sm text-gray-500">{order.customerAddress}</div>
//         </div>

//         <div>
//           <h3 className="font-semibold mb-2">Items</h3>
//           <ul className="space-y-3">
//             {order.items && order.items.length ? order.items.map((it) => (
//               <li key={it.id || `${it.productId}-${Math.random()}`} className="flex items-center gap-4 border-b pb-2">
//                 <img src={it.productImage || it.product?.image} alt={it.productName || it.product?.name} className="w-16 h-16 object-cover rounded" />
//                 <div>
//                   <div className="font-medium">{it.productName ?? it.product?.name}</div>
//                   <div className="text-sm text-gray-600">Qty: {it.quantity} × ₹{it.price ?? it.productPrice}</div>
//                 </div>
//                 <div className="ml-auto font-semibold">₹{((it.price ?? it.productPrice) * it.quantity).toFixed(2)}</div>
//               </li>
//             )) : <div>No items found.</div>}
//           </ul>
//         </div>

//         <div className="mt-6 flex gap-4">
//           <Link to="/" className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded">Continue Shopping</Link>
//           <Link to="/orders" className="bg-white border px-4 py-2 rounded">View Orders</Link>
//         </div>
//       </div>
//     </div>
//   );
// }







// src/pages/OrderSuccess.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await api.get(`/orders/${id}`);
        const data = res?.data?.data ?? res?.data ?? null;
        setOrder(data);
      } catch (err) {
        console.error("Failed to fetch order:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!order) return <div className="p-6 text-center">Order not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-green-600 mb-2">🎉 Order Confirmed</h1>
        <p className="text-gray-700 mb-4">Thank you for your purchase! Your order is being processed.</p>

        <div className="mb-4">
          <strong>Order ID:</strong> {order.id || order.Id || order.orderNumber || "N/A"}<br />
          <strong>Placed On:</strong> {new Date(order.orderDate || Date.now()).toLocaleString()}<br />
          <strong>Total:</strong> ₹{(order.totalAmount ?? order.TotalAmount ?? 0).toFixed(2)}<br />
          <strong>Payment:</strong> {order.paymentMethod ?? order.PaymentMethod ?? "N/A"} — {order.paymentStatus ?? order.PaymentStatus ?? "N/A"}<br />
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Customer</h3>
          <div>{order.customerName}</div>
          <div>{order.customerEmail}</div>
          <div>{order.customerPhone}</div>
          <div className="text-sm text-gray-500">{order.customerAddress}</div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Items</h3>
          <ul className="space-y-3">
            {order.items && order.items.length ? order.items.map((it) => (
              <li key={it.id || `${it.productId}-${Math.random()}`} className="flex items-center gap-4 border-b pb-2">
                <img src={it.productImage || it.product?.image} alt={it.productName || it.product?.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <div className="font-medium">{it.productName ?? it.product?.name}</div>
                  <div className="text-sm text-gray-600">Qty: {it.quantity} × ₹{it.price ?? it.productPrice}</div>
                </div>
                <div className="ml-auto font-semibold">₹{((it.price ?? it.productPrice) * it.quantity).toFixed(2)}</div>
              </li>
            )) : <div>No items found.</div>}
          </ul>
        </div>

        <div className="mt-6 flex gap-4">
          <Link to="/" className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded">Continue Shopping</Link>
          <Link to="/myorders" className="bg-white border px-4 py-2 rounded">View Orders</Link>
        </div>
      </div>
    </div>
  );
}
