import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaBan, FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, sortBy, users, currentPage]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3001/users');
      const nonAdminUsers = res.data.filter(user => user.role !== 'admin');
      setUsers(nonAdminUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const applyFilters = () => {
    let filtered = [...users];

    if (search.trim()) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortBy === 'name-asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'blocked') {
      filtered.sort((a, b) => (b.blocked ? 1 : 0) - (a.blocked ? 1 : 0));
    }

    const startIdx = (currentPage - 1) * usersPerPage;
    const paginated = filtered.slice(startIdx, startIdx + usersPerPage);
    setDisplayedUsers(paginated);
  };

  const toggleBlock = async (user) => {
    const action = user.blocked ? 'Unblock' : 'Block';

  const result = await Swal.fire({
    title: `${action} this user?`,
    text: `Are you sure you want to ${action.toLowerCase()} ${user.name}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: user.blocked ? '#3085d6' : '#e3342f',
    cancelButtonColor: '#6c757d',
    confirmButtonText: `Yes, ${action.toLowerCase()}!`
  });

  if (result.isConfirmed) {
    try {
      const updated = { ...user, blocked: !user.blocked };
      await axios.put(`http://localhost:3001/users/${user.id}`, updated);
      await fetchUsers(); // refresh
      Swal.fire({
        title: `${action}ed!`,
        text: `User has been ${action.toLowerCase()}ed successfully.`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error('Error blocking/unblocking user:', err);
      Swal.fire('Failed', 'Something went wrong.', 'error');
    }
  }
  };

  const totalPages = Math.ceil(
    users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    ).length / usersPerPage
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-3xl font-bold text-pink-600">Manage Users</h2>
        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="border border-gray-300 px-3 py-2 rounded-md w-64"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md"
          >
            <option value="">Sort By</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="blocked">Blocked First</option>
          </select>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedUsers.map(user => (
          <div
            key={user.id}
            className={`bg-white border shadow rounded-lg p-4 flex flex-col gap-2 relative transition duration-300 ${
              user.blocked ? 'border-red-500' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="bg-pink-100 text-pink-600 p-3 rounded-full">
                <FaUser size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-3">
              <button
                onClick={() => navigate(`/admin/users/${user.id}`)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
              >
                View Details
              </button>
              <button
                onClick={() => toggleBlock(user)}
                className={`px-4 py-1 rounded text-white ${
                  user.blocked
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {user.blocked ? 'Unblock' : 'Block'}
              </button>
            </div>

            {user.blocked && (
              <div className="absolute top-2 right-2 text-red-500" title="Blocked">
                <FaBan />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? 'bg-pink-600 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ManageUsers;
