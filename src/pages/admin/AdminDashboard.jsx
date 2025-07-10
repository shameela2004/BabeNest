import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBoxOpen, FaClipboardList, FaUsers, FaRupeeSign, FaArrowUp } from 'react-icons/fa';

function AdminDashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
  try {
    const productsRes = await axios.get('http://localhost:3000/products');
    const usersRes = await axios.get('http://localhost:3000/users');

    setTotalProducts(productsRes.data.length);
    setTotalUsers(usersRes.data.length);

    //  Flatten all orders from all users
    const allOrders = usersRes.data.flatMap(user => user.orders || []);

    setTotalOrders(allOrders.length);

    const totalRevenue = allOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    setRevenue(totalRevenue);
  } catch (err) {
    console.error('Error fetching data:', err);
  }
};

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-pink-600 mb-8">Admin Dashboard</h1>

      {/*  Unique Revenue Card */}
      <div className="bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-xl p-6 shadow-lg mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Total Revenue</h2>
          <p className="text-4xl font-bold mt-2 flex items-center gap-2">
            <FaRupeeSign />
            {revenue.toFixed(2)}
          </p>
        </div>
        <div className="text-5xl opacity-70">
          <FaArrowUp />
        </div>
      </div>

      {/* 📦 Other Stat Cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={<FaBoxOpen size={30} />}
          color="text-blue-600 bg-blue-100 border-blue-200"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={<FaClipboardList size={30} />}
          color="text-green-600 bg-green-100 border-green-200"
        />
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={<FaUsers size={30} />}
          color="text-purple-600 bg-purple-100 border-purple-200"
        />
      </div>
    </div>
  );
}

const StatCard = ({ title, value, icon, color }) => (
  <div className={`border rounded-xl p-6 shadow hover:shadow-lg transition-all duration-300 ${color}`}>
    <div className="flex items-center justify-between mb-4">
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-2xl">{icon}</div>
    </div>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default AdminDashboard;
