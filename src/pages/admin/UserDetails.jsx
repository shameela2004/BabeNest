import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/users/${id}`);
      setUser(res.data);
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  };

  if (!user) return <div className="p-6">Loading user data...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-pink-600">User Details</h2>

      <div className={`p-4 rounded-md border ${user.blocked ? 'border-red-400' : 'border-gray-300'} bg-white shadow mb-6`}>
        <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Status:</strong> {user.blocked ? '❌ Blocked' : '✅ Active'}</p>
      </div>

      {/* Cart Section */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2 text-pink-500">Cart Items</h4>
        {user.cart && user.cart.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {user.cart.map(item => (
              <div key={item.id} className="border p-3 rounded shadow-sm">
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded mb-2" />
                <p className="font-bold">{item.name}</p>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No items in cart.</p>
        )}
      </div>

      {/* Wishlist Section */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2 text-pink-500">Wishlist Items</h4>
        {user.wishlist && user.wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {user.wishlist.map(item => (
              <div key={item.id} className="border p-3 rounded shadow-sm">
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded mb-2" />
                <p className="font-bold">{item.name}</p>
                <p>Price: ₹{item.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No items in wishlist.</p>
        )}
      </div>

      {/* Orders Section */}
      <div>
        <h4 className="text-lg font-semibold mb-2 text-pink-500">Orders</h4>
        {user.orders && user.orders.length > 0 ? (
          <div className="space-y-4">
            {user.orders.map(order => (
              <div key={order.orderId} className="border p-4 rounded shadow-sm">
                <p><strong>Order ID:</strong> {order.orderId}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>

                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {order.items.map(item => (
                    <div key={item.id} className="border p-2 rounded">
                      <img src={item.image} alt={item.name} className="w-full h-28 object-cover rounded mb-1" />
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-sm">Qty: {item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No orders found.</p>
        )}
      </div>

      <button
        onClick={() => navigate('/admin/users')}
        className="mt-6 bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded"
      >
        ← Back to Manage Users
      </button>
    </div>
  );
}

export default UserDetails;
