// correct working code before connecting with the backend

// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// function EditProduct() {
//   const navigate = useNavigate();
//   const { id } = useParams();
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

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(`http://localhost:3001/products/${id}`);
//         setProduct(res.data);
//       } catch (err) {
//         console.error("Error fetching product:", err);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   const handleChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

 

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:3001/products/${id}`, product);
//       toast.success("Product updated successfully!");
//       navigate('/admin/products');
//     } catch (err) {
//       console.error("Error updating product:", err);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
//       <h2 className="text-2xl text-pink-600 font-bold mb-6 text-center">Edit Product</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">

//         <div>
//           <label className="block font-semibold">Product Name</label>
//           <input type="text" name="name" value={product.name} onChange={handleChange} className="w-full border rounded px-3 py-2" />
//         </div>

//         <div>
//           <label className="block font-semibold">Price (₹)</label>
//           <input type="text" name="price" value={product.price} onChange={handleChange} className="w-full border rounded px-3 py-2" />
//         </div>

//         <div>
//           <label className="block font-semibold">Category</label>
//           <select name="category" value={product.category} onChange={handleChange} className="w-full border rounded px-3 py-2">
//             <option value="">Select Category</option>
//             {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
//           </select>
//         </div>

//         <div>
//           <label className="block font-semibold">Description</label>
//           <textarea name="description" value={product.description} onChange={handleChange} className="w-full border rounded px-3 py-2" />
//         </div>

//         <div>
//           <label className="block font-semibold">Stock</label>
//           <input type="text" name="stock" value={product.stock} onChange={handleChange} className="w-full border rounded px-3 py-2" />
//         </div>

        

//         <div>
//           <label className="block font-semibold mb-1">Upload Image</label>
//           <input type="text" name="image" value={product.image} onChange={handleChange} className="w-full border rounded px-3 py-2" />
//         </div>

//         <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 w-full">
//           Update Product
//         </button>
//       </form>
//     </div>
//   );
// }

// export default EditProduct;
















import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios"; // ✅ use same axios instance

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    categoryId: "",
    imageFile: null, // ✅ file for upload
  });

  const [categories, setCategories] = useState([]); // ✅ fetched from backend
  const [loadingCategories, setLoadingCategories] = useState(true);

  // ✅ Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/AdminProducts/${id}`);
        const p = res.data.data;

        setProduct({
          name: p.name,
          price: p.price,
          description: p.description,
          stock: p.stock,
          categoryId: p.categoryId,
          imageFile: null, // keep null unless user uploads new image
        });
      } catch (err) {
        console.error("❌ Error fetching product:", err);
        toast.error("Failed to load product.");
      }
    };

    fetchProduct();
  }, [id]);

  // ✅ Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/AdminCategories");
        setCategories(res.data.data);
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
      setProduct((prev) => ({ ...prev, imageFile: files[0] }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(product).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      await api.put(`/AdminProducts/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("✅ Product updated successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.error("❌ Error updating product:", err);
      toast.error("Failed to update product.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl text-pink-600 font-bold mb-6 text-center">
        Edit Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block font-semibold">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold">Category</label>
          {loadingCategories ? (
            <p className="text-gray-500 text-sm">Loading categories...</p>
          ) : (
            <select
              name="categoryId"
              value={product.categoryId}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
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
          <label className="block font-semibold">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block font-semibold">Stock</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-semibold mb-1">Upload New Image</label>
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <p className="text-sm text-gray-500 mt-1">
            Leave empty if you don’t want to change the image.
          </p>
        </div>

        <button
          type="submit"
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 w-full"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
