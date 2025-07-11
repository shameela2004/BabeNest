import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/products/${id}`, product);
      alert("Product updated successfully!");
      navigate('/admin/products');
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-semibold">Product Name</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block font-semibold">Price (₹)</label>
          <input type="text" name="price" value={product.price} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block font-semibold">Category</label>
          <select name="category" value={product.category} onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="">Select Category</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div>
          <label className="block font-semibold">Description</label>
          <textarea name="description" value={product.description} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block font-semibold">Stock</label>
          <input type="text" name="stock" value={product.stock} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>

        

        <div>
          <label className="block font-semibold mb-1">Upload Image</label>
          <input type="text" name="image" value={product.image} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
