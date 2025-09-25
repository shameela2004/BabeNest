// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// function AddProduct() {
//   const navigate = useNavigate();
//   const [product, setProduct] = useState({
//     name: '',
//     price: '',
//     image: '',
//     category: '',
//     description: '',
//     stock: '',
//   });

//   const categories = [
//     "Clothing",
//     "Baby Care",
//     "Feeding",
//     "Diapering",
//     "Toys",
//     "Bedding",
//     "Travel"
//   ];

//   const handleChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };



//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:3001/products', product);
//       toast.success("✅ Product added successfully!");
//       navigate('/admin/products');
//     } catch (err) {
//       console.error("❌ Error adding product:", err);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">Add New Product</h2>

//       <form onSubmit={handleSubmit} className="space-y-5">

//         <div>
//           <label className="block font-semibold mb-1">Product Name</label>
//           <input
//             type="text"
//             name="name"
//             placeholder="E.g. Baby Shampoo - 200ml"
//             value={product.name}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-semibold mb-1">Price (₹)</label>
//           <input
//             type="number"
//             name="price"
//             placeholder="E.g. 249"
//             value={product.price}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-semibold mb-1">Category</label>
//           <select
//             name="category"
//             value={product.category}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           >
//             <option value="">-- Select Category --</option>
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>{cat}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block font-semibold mb-1">Description</label>
//           <textarea
//             name="description"
//             placeholder="Enter product description"
//             value={product.description}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-semibold mb-1">Stock</label>
//           <input
//             type="number"
//             name="stock"
//             placeholder="E.g. 30"
//             value={product.stock}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>


//         <div>
//           <label className="block font-semibold mb-1"> Image src</label>
//            <input
//             type="text"
//             step="0.1"
//             name="image"
//             placeholder="E.g. /images/toyimage.jpg"
//             value={product.image}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 rounded"
//         >
//           Add Product
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddProduct;





import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios";

function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    categoryId: "",
    imageFile: null,
  });

  const [categories, setCategories] = useState([]); // ✅ categories from backend
  const [loadingCategories, setLoadingCategories] = useState(true);

  // ✅ Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/AdminCategories"); // matches AdminCategoriesController
        setCategories(res.data.data); // ✅ backend wraps in ApiResponse
      } catch (err) {
        console.error("❌ Error fetching categories:", err);
        toast.error("Failed to load categories.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setProduct({ ...product, imageFile: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(product).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      await api.post("/AdminProducts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("✅ Product added successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.error("❌ Error adding product:", err);
      toast.error("Failed to add product.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Product Name */}
        <div>
          <label className="block font-semibold mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold mb-1">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold mb-1">Category</label>
          {loadingCategories ? (
            <p className="text-gray-500 text-sm">Loading categories...</p>
          ) : (
            <select
              name="categoryId"
              value={product.categoryId}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block font-semibold mb-1">Stock</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-semibold mb-1">Product Image</label>
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Submit */}
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

