// import React from 'react';
// import { Link, Outlet, useLocation } from 'react-router-dom';
// import { FaTachometerAlt, FaBoxOpen, FaPlusSquare, FaClipboardList } from 'react-icons/fa';

// function AdminLayout() {
//   const { pathname } = useLocation();

//   const navItems = [
//     { label: 'Dashboard', to: '/admin', icon: <FaTachometerAlt size={18} /> },
//     { label: 'Manage Products', to: '/admin/products', icon: <FaBoxOpen size={18} /> },
//     { label: 'Add Product', to: '/admin/products/add', icon: <FaPlusSquare size={18} /> },
//     { label: 'Manage Orders', to: '/admin/orders', icon: <FaClipboardList size={18} /> },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sticky Sidebar */}
//       <aside className="w-64 bg-white shadow-md border-r p-6 sticky top-0 h-screen">
//         <h2 className="text-2xl font-bold text-pink-600 mb-8 tracking-wide">Admin Panel</h2>
//         <nav className="flex flex-col space-y-3">
//           {navItems.map((item) => (
//             <Link
//               key={item.to}
//               to={item.to}
//               className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
//                 pathname === item.to 
//                   ? 'bg-pink-100 text-pink-700 font-semibold'
//                   : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600'
//               }`}
//             >
//               {item.icon}
//               {item.label}
//             </Link>
//           ))}
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8">
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// export default AdminLayout;

import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaPlusSquare,
  FaClipboardList,
} from 'react-icons/fa';

function AdminLayout() {
  const { pathname } = useLocation();

  const navItems = [
    { label: 'Dashboard', to: '/admin', icon: <FaTachometerAlt /> },
    { label: 'Manage Products', to: '/admin/products', icon: <FaBoxOpen /> },
    // { label: 'Add Product', to: '/admin/products/add', icon: <FaPlusSquare /> },
    { label: 'Manage Orders', to: '/admin/orders', icon: <FaClipboardList /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar for medium and above */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white shadow-md border-r p-6 sticky top-0 h-screen">
        <h2 className="text-2xl font-bold text-pink-600 mb-8 tracking-wide">
          Admin Panel
        </h2>
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
      </div>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
