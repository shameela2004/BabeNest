import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
const [categoryFilter, setCategoryFilter] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 8;
  

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3001/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleDelete = (product) => {
  Swal.fire({
    title: `Delete "${product.name}"?`,
    text: "This will permenantly delete this product.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e3342f',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, delete it!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      await axios.delete(`http://localhost:3001/products/${product.id}`);
      setProducts(prev => prev.filter(p => p.id !== product.id));
      Swal.fire('Deleted!', 'Product has been deleted.', 'success');
    }
  });
};
const filteredProducts = products.filter(product => {
  const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
  return matchesSearch && matchesCategory;
});

const paginatedProducts = filteredProducts.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold mb-6 text-pink-600">Manage Products</h1>

        <button
          onClick={() => navigate('/admin/products/add')}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Add New Product
        </button>
      </div>





      <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
  <input
    type="text"
    placeholder="Search by name"
    value={searchTerm}
    onChange={(e) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1);
    }}
    className="border px-3 py-2 rounded-md"
  />

  <select
    value={categoryFilter}
    onChange={(e) => {
      setCategoryFilter(e.target.value);
      setCurrentPage(1);
    }}
    className="border px-3 py-2 rounded-md"
  >
    <option value="">All Categories</option>
    {[...new Set(products.map(p => p.category))].map(cat => (
      <option key={cat} value={cat}>{cat}</option>
    ))}
  </select>
</div>


      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-pink-100 text-pink-700 text-left">
            <tr>
              <th className="p-4 border-b">Image</th>
              <th className="p-4 border-b">Name</th>
              <th className="p-4 border-b">Price</th>
              <th className='p-4 border-b'>Category</th>
              <th className="p-4 border-b">Stock</th>
              <th className="p-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product) => (
              <tr
                key={product.id}
                className="border-t hover:bg-pink-50 cursor-pointer transition"
                onClick={() => setSelectedProduct(product)}
              >
                <td className="p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="p-4">{product.name}</td>
                <td className="p-4">₹{product.price}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/products/edit/${product.id}`);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(product);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-6 gap-4">
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(p => p - 1)}
    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
  >
    Prev
  </button>

  <span className="font-medium">
    Page {currentPage} of {Math.ceil(filteredProducts.length / itemsPerPage)}
  </span>

  <button
    disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}
    onClick={() => setCurrentPage(p => p + 1)}
    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
  >
    Next
  </button>
</div>

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-pink-200 bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg ">
            <h2 className="text-xl font-bold mb-2">{selectedProduct.name}</h2>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <p><strong>Category:</strong> {selectedProduct.category}</p>
            <p><strong>Price:</strong> ₹{selectedProduct.price}</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
            <p><strong>Rating:</strong> {selectedProduct.rating}</p>
            <p><strong>Stock:</strong> {selectedProduct.stock}</p>
            <button
              onClick={() => setSelectedProduct(null)}
              className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default ManageProducts;
