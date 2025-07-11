import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [orders, statusFilter, searchTerm, dateRange]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      const allOrders = res.data.flatMap((user) =>
        user.orders?.map((order) => ({
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

  const applyFilters = () => {
    let filtered = [...orders];

    // Filter by status
    if (statusFilter) {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Search by name or email
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(order =>
        order.customerName?.toLowerCase().includes(term) ||
        order.customerEmail?.toLowerCase().includes(term)
      );
    }

    // Date range filter
    if (dateRange.from && dateRange.to) {
      const fromDate = new Date(dateRange.from);
      const toDate = new Date(dateRange.to);
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.orderDate);
        return orderDate >= fromDate && orderDate <= toDate;
      });
    }

    setFilteredOrders(filtered);
    setCurrentPage(1); // Reset page on filter
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
        orders: updatedOrders,
      });

      setSelectedOrder(prev => ({ ...prev, status: newStatus }));
      setOrders(prev =>
        prev.map(o => o.orderId === selectedOrder.orderId ? { ...o, status: newStatus } : o)
      );
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString();
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    shipped: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  // Pagination
  const indexOfLast = currentPage * ordersPerPage;
  const indexOfFirst = indexOfLast - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-pink-600">Manage Orders</h1>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <input
          type="date"
          value={dateRange.from}
          onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
          className="border px-3 py-2 rounded-md"
        />
        <input
          type="date"
          value={dateRange.to}
          onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
          className="border px-3 py-2 rounded-md"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-300 rounded-md shadow-sm">
        <table className="min-w-full bg-white text-sm md:text-base">
          <thead className="bg-pink-50 text-pink-700">
            <tr>
              <th className="p-3 border-b">Order ID</th>
              <th className="p-3 border-b">Customer</th>
              <th className="p-3 border-b text-right">Total</th>
              <th className="p-3 border-b hidden md:table-cell">Date</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">No orders found.</td>
              </tr>
            ) : (
              currentOrders.map(order => (
                <tr key={order.orderId} className="hover:bg-pink-50">
                  <td className="p-3 border-b font-mono">{order.orderId}</td>
                  <td className="p-3 border-b">
                    <div className="font-semibold">{order.customerName}</div>
                    <div className="text-xs text-gray-500">{order.customerEmail}</div>
                  </td>
                  <td className="p-3 border-b text-right font-semibold">₹{order.totalAmount}</td>
                  <td className="p-3 border-b hidden md:table-cell">{formatDate(order.orderDate)}</td>
                  <td className="p-3 border-b">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status || "pending"]}`}>
                      {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                    </span>
                  </td>
                  <td className="p-3 border-b text-center space-x-2">
                    <button onClick={() => setSelectedOrder(order)} className="text-pink-600 hover:underline font-semibold">View</button>
                    <Link to={`/admin/users/${order.userId}`} className="text-blue-600 hover:underline font-semibold">User</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-pink-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* order modal */}
       {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white rounded-lg max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto shadow-lg" onClick={(e) => e.stopPropagation()}>
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
                  value={selectedOrder.status || "pending"}
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
                    <th className="p-2 border-b">Qty</th>
                    <th className="p-2 border-b">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item) => (
                    <tr key={item.id} className="border-b last:border-none">
                      <td className="p-2 border-r">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mx-auto" />
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
