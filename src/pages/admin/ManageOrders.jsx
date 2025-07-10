import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      const allOrders = res.data.flatMap(user =>
        user.orders?.map(order => ({
          ...order,
          userId: user.id,
          customerEmail: user.email,
        })) || []
      );
      setOrders(allOrders);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    shipped: 'bg-blue-100 text-blue-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setUpdatingStatus(true);
    try {
      const userRes = await axios.get(`http://localhost:3000/users/${selectedOrder.userId}`);
      const user = userRes.data;
      const updatedOrders = user.orders.map(order => 
        order.orderId === selectedOrder.orderId ? { ...order, status: newStatus } : order
      );
      await axios.put(`http://localhost:3000/users/${selectedOrder.userId}`, {
        ...user,
        orders: updatedOrders
      });

      setSelectedOrder(prev => ({ ...prev, status: newStatus }));
      setOrders(prevOrders => prevOrders.map(o => 
        o.orderId === selectedOrder.orderId ? { ...o, status: newStatus } : o
      ));
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-pink-600">Manage Orders</h1>
      
      <div className="overflow-x-auto border border-gray-300 rounded-md shadow-sm">
        <table className="min-w-full bg-white text-sm md:text-base">
          <thead className="bg-pink-50 text-pink-700">
            <tr>
              <th className="p-3 border-b">Order ID</th>
              <th className="p-3 border-b">Customer</th>
              <th className="p-3 border-b hidden sm:table-cell">Email</th>
              <th className="p-3 border-b text-right">Total Amount</th>
              <th className="p-3 border-b hidden md:table-cell">Order Date</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-500">No orders found.</td>
              </tr>
            )}
            {orders.map((order) => (
              <tr key={order.orderId} className="hover:bg-pink-50 cursor-pointer">
                <td className="p-3 border-b font-mono">{order.orderId}</td>
                <td className="p-3 border-b">{order.customerName}</td>
                <td className="p-3 border-b hidden sm:table-cell truncate max-w-xs">{order.customerEmail}</td>
                <td className="p-3 border-b text-right font-semibold">₹{order.totalAmount}</td>
                <td className="p-3 border-b hidden md:table-cell">{formatDate(order.orderDate)}</td>
                <td className="p-3 border-b">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status || 'pending']}`}>
                    {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending'}
                  </span>
                </td>
                <td className="p-3 border-b text-center">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-pink-600 hover:underline font-semibold"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white rounded-lg max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-pink-700">Order Details - {selectedOrder.orderId}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
                <p><strong>Phone:</strong> {selectedOrder.customerPhone}</p>
                <p><strong>Address:</strong> {selectedOrder.customerAddress}</p>
                <p><strong>Date:</strong> {formatDate(selectedOrder.orderDate)}</p>
              </div>
              <div>
                <label htmlFor="status" className="block font-semibold mb-2">Update Status:</label>
                <select
                  id="status"
                  value={selectedOrder.status || 'pending'}
                  onChange={handleStatusChange}
                  disabled={updatingStatus}
                  className="border rounded px-3 py-2 w-full text-pink-700"
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-3 border-b pb-2">Order Items</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-center border border-gray-300 rounded">
                <thead className="bg-pink-50 text-pink-600 font-semibold">
                  <tr>
                    <th className="p-2 border-b">Image</th>
                    <th className="p-2 border-b">Product</th>
                    <th className="p-2 border-b hidden sm:table-cell">Category</th>
                    <th className="p-2 border-b">Price</th>
                    <th className="p-2 border-b">Quantity</th>
                    <th className="p-2 border-b">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item) => (
                    <tr key={item.id} className="border-b last:border-none">
                      <td className="p-2 border-r">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded mx-auto"
                        />
                      </td>
                      <td className="p-2 border-r font-semibold">{item.name}</td>
                      <td className="p-2 border-r hidden sm:table-cell">{item.category}</td>
                      <td className="p-2 border-r">₹{item.price}</td>
                      <td className="p-2 border-r">{item.quantity}</td>
                      <td className="p-2">₹{item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-right font-bold text-lg text-pink-700">
              Total Amount: ₹{selectedOrder.totalAmount}
            </p>

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-6 bg-pink-600 hover:bg-pink-700 text-white rounded px-6 py-2 w-full md:w-auto"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageOrders;
