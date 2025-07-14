import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaUsers, FaBoxOpen, FaShoppingCart, FaBan, FaTruck, FaCheckCircle
} from 'react-icons/fa';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const userRes = await axios.get("http://localhost:3001/users");
    const productRes = await axios.get("http://localhost:3001/products");

    const allUsers = userRes.data;
    const allOrders = allUsers.flatMap(user =>
      user.orders?.map(order => ({ ...order, userId: user.id })) || []
    );

    setUsers(allUsers);
    setProducts(productRes.data);
    setOrders(allOrders);
  };

  const userCount = users.filter(u => u.role !== 'admin').length;
  const blockedCount = users.filter(u => u.role !== 'admin' && u.blocked).length;

  const statusCounts = {
    pending: orders.filter(o => o.status === 'pending').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length
  };

  const totalRevenue = orders
    .filter(order => order.status === 'delivered')
    .reduce((sum, order) => sum + Number(order.totalAmount), 0);

  const monthlyRevenue = Array(12).fill(0);
  orders.forEach(order => {
    if (order.status === 'delivered') {
      const month = new Date(order.orderDate).getMonth(); // 0-11
      monthlyRevenue[month] += Number(order.totalAmount);
    }
  });

  return (
    <div className="p-6 space-y-8 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-pink-600">Welcome, Admin</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <StatCard icon={<FaUsers />} label="Total Users" value={userCount} color="bg-blue-100 text-blue-700" />
        <StatCard icon={<FaBan />} label="Blocked Users" value={blockedCount} color="bg-red-100 text-red-700" />
        <StatCard icon={<FaBoxOpen />} label="Total Products" value={products.length} color="bg-green-100 text-green-700" />
        <StatCard icon={<FaShoppingCart />} label="Total Orders" value={orders.length} color="bg-purple-100 text-purple-700" />
        <StatCard icon={<FaTruck />} label="Shipped Orders" value={statusCounts.shipped} color="bg-yellow-100 text-yellow-700" />
        <StatCard icon={<FaCheckCircle />} label="Delivered Orders" value={statusCounts.delivered} color="bg-green-200 text-green-800" />
        <StatCard icon="🕓" label="Pending Orders" value={statusCounts.pending} color="bg-orange-100 text-orange-700" />
        <StatCard icon="❌" label="Cancelled Orders" value={statusCounts.cancelled} color="bg-red-200 text-red-800" />
        <StatCard icon="💰" label="Total Revenue" value={`₹${totalRevenue}`} color="bg-pink-100 text-pink-700 col-span-full" />
      </div>

      {/* Charts */}
      <div className="grid gap-8 md:grid-cols-2 mt-12">
        {/* Doughnut Chart */}
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-pink-700">Order Status Overview</h2>
          <Doughnut
            data={{
              labels: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
              datasets: [{
                label: 'Order Status',
                data: [
                  statusCounts.pending,
                  statusCounts.shipped,
                  statusCounts.delivered,
                  statusCounts.cancelled
                ],
                backgroundColor: ['#facc15', '#60a5fa', '#34d399', '#f87171'],
                borderWidth: 1
              }]
            }}
          />
        </div>

        {/* Bar Chart */}
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-pink-700">Monthly Revenue</h2>
          <Bar
            data={{
              labels: [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
              ],
              datasets: [{
                label: 'Revenue (₹)',
                data: monthlyRevenue,
                backgroundColor: '#ec4899'
              }]
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <div className={`p-4 rounded-lg shadow-md flex items-center justify-between ${color}`}>
    <div className="text-2xl">{icon}</div>
    <div className="text-right">
      <div className="text-sm">{label}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  </div>
);

export default AdminDashboard;
