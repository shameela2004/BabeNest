import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    image: '',
    category: '',
    description: '',
    stock: '',
  });

  const categories = [
    "Clothing",
    "Baby Care",
    "Feeding",
    "Diapering",
    "Toys",
    "Bedding",
    "Travel"
  ];

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/products', product);
      toast.success("✅ Product added successfully!");
      navigate('/admin/products');
    } catch (err) {
      console.error("❌ Error adding product:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block font-semibold mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="E.g. Baby Shampoo - 200ml"
            value={product.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Price (₹)</label>
          <input
            type="number"
            name="price"
            placeholder="E.g. 249"
            value={product.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Enter product description"
            value={product.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Stock</label>
          <input
            type="number"
            name="stock"
            placeholder="E.g. 30"
            value={product.stock}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>


        <div>
          <label className="block font-semibold mb-1"> Image src</label>
           <input
            type="text"
            step="0.1"
            name="image"
            placeholder="E.g. /images/toyimage.jpg"
            value={product.image}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
