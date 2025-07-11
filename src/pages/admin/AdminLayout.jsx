import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaPlusSquare,
  FaClipboardList,
  FaUsers,
  FaSignOutAlt
} from 'react-icons/fa';

function AdminLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', to: '/admin', icon: <FaTachometerAlt /> },
    { label: 'Manage Products', to: '/admin/products', icon: <FaBoxOpen /> },
    { label: 'Manage Orders', to: '/admin/orders', icon: <FaClipboardList /> },
    { label: 'Manage Users', to: '/admin/users', icon: <FaUsers /> },
  ];

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      // Clear auth data (adjust as needed based on how you're storing login)
      localStorage.removeItem('authUser'); 
      navigate('/login'); // redirect to login page
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar for medium and above */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white shadow-md border-r p-6 sticky top-0 h-screen">
        <h2 className="text-2xl font-bold text-pink-600 mb-8 tracking-wide">BabeNest</h2>
        <nav className="space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
                pathname === item.to
                  ? 'bg-pink-100 text-pink-700'
                  : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-red-600 hover:text-red-700 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </nav>
      </aside>

      {/* Top nav bar for mobile */}
      <div className="md:hidden bg-white shadow-md border-b p-4 flex flex-wrap justify-center gap-2">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center gap-2 px-3 py-1 rounded text-sm font-medium ${
              pathname === item.to
                ? 'bg-pink-100 text-pink-600'
                : 'text-gray-700 hover:text-pink-600'
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1 text-sm text-red-600 hover:text-red-700"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
