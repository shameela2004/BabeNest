

// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import ProductCard from './ProductCard'
// import CategoryFilter from './filters/CategoryFilter'
// import SearchBar from './filters/SearchBar'
// import PriceFilter from './filters/PriceFilter'
// import RatingFilter from './filters/RatingFilter'
// import { useSearchParams } from 'react-router-dom'
// import api from '../api/axios'

// function ProductList() {
//   const [products, setProducts] = useState([])
//   const [filteredProducts, setFilteredProducts] = useState([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })
//   const [selectedRating, setSelectedRating] = useState(0)

//   const [searchParams] = useSearchParams();
//   const defaultCategory = searchParams.get('category') || '';
//   const [categoryFilter, setCategoryFilter] = useState(defaultCategory);

//   // useEffect(() => {
//   //   axios
//   //     .get('http://localhost:3001/products')
//   //     .then((res) => {
//   //       setProducts(res.data)
//   //       setFilteredProducts(res.data)
//   //     })
//   //     .catch((e) => console.log(e))
//   // }, [])
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//           const res = await api.get('/api/products');
//         setProducts(res.data.data.items);  // ✅ correct path
//       } catch (err) {
//         console.error("Error fetching products:", err);
//       }
//     };

//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     let filtered = [...products]

//     // search
//     if (searchTerm.trim()) {
//       const lower = searchTerm.toLowerCase()
//       filtered = filtered.filter(p =>
//         p.name?.toLowerCase().includes(lower) ||
//         p.category?.toLowerCase().includes(lower)
//       )
//     }

//     // category
//     if (categoryFilter.trim()) {
//       filtered = filtered.filter(
//         p => p.category.trim().toLowerCase() === categoryFilter.trim().toLowerCase()
//       )
//     }

//     // price
//     filtered = filtered.filter(p => p.price >= priceRange.min && p.price <= priceRange.max)

//     // rating
//     if (selectedRating > 0) {
//       filtered = filtered.filter(p => Number(p.rating) >= selectedRating)
//     }

//     setFilteredProducts(filtered)
//   }, [products, searchTerm, categoryFilter, priceRange, selectedRating])

//   const handleClearFilters = () => {
//     setSearchTerm('')
//     setCategoryFilter('')
//     setPriceRange({ min: 0, max: 10000 })
//     setSelectedRating(0)
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* === Modern Filter Bar === */}
//       <div className="w-full bg-white shadow sticky top-16 z-40 border-b">
//         <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
//           <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

//           <CategoryFilter
//             categories={["Clothing", "Baby Care", "Feeding", "Diapering", "Toys", "Bedding", "Travel"]}
//             selectedCategory={categoryFilter}
//             setSelectedCategory={setCategoryFilter}
//           />

//           <PriceFilter priceRange={priceRange} setPriceRange={setPriceRange} />

//           <RatingFilter selectedRating={selectedRating} setSelectedRating={setSelectedRating} />

//           <button
//             onClick={handleClearFilters}
//             className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-md transition shadow"
//           >
//             Clear Filters
//           </button>
//         </div>
//       </div>

//       {/* === Product Grid === */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//   {filteredProducts.length === 0 ? (
//     <p className="text-gray-500 text-center text-lg mt-10">
//       No products found. Try changing filters.
//     </p>
//   ) : (
//     <>
//       {/* <h2 className="text-3xl font-bold text-pink-700 mb-6 text-center">All Products</h2> */}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredProducts.map(product => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </>
//   )}
// </div>

//     </div>
//   )
// }

// export default ProductList



// import React, { useEffect, useState } from "react";
// import ProductCard from "./ProductCard";
// import CategoryFilter from "./filters/CategoryFilter";
// import SearchBar from "./filters/SearchBar";
// import PriceFilter from "./filters/PriceFilter";
// import RatingFilter from "./filters/RatingFilter";
// import { useSearchParams } from "react-router-dom";
// import api from "../api/axios";

// function ProductList() {
//   const [products, setProducts] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize] = useState(10);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
//   const [selectedRating, setSelectedRating] = useState(0);

//   const [searchParams] = useSearchParams();
//   const defaultCategory = searchParams.get("category") || "";
//   const [categoryFilter, setCategoryFilter] = useState(defaultCategory);

//   const categories = [
//   { id: 1, name: "BabyCare" },
//   { id: 2, name: "Toys" },
//   { id: 3, name: "clothing" },
//   { id: 4, name: "Feeding" },
//   { id: 5, name: "Traveling" },
//   { id: 6, name: "Diapering" },
// ];

//   // Fetch products from backend with filters & pagination
//   const fetchProducts = async () => {
//     try {
//       const res = await api.get("/api/products", {
//         params: {
//           SearchTerm: searchTerm || undefined,
//           CategoryId: categoryFilter ? parseInt(categoryFilter) : undefined,
//           MinPrice: priceRange.min,
//           MaxPrice: priceRange.max,
//           Rating: selectedRating > 0 ? selectedRating : undefined,
//           Page: currentPage,
//           PageSize: pageSize,
//         },
//       });

//       const data = res.data.data.items;
//       setProducts(data);
//       setTotalCount(res.data.data.totalCount);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//     }
//   };

//   // Refetch whenever filters or page changes
//   useEffect(() => {
//     fetchProducts();
//   }, [searchTerm, categoryFilter, priceRange, selectedRating, currentPage]);

//   // Clear all filters
//   const handleClearFilters = () => {
//     setSearchTerm("");
//     setCategoryFilter("");
//     setPriceRange({ min: 0, max: 10000 });
//     setSelectedRating(0);
//     setCurrentPage(1);
//   };

//   const totalPages = Math.ceil(totalCount / pageSize);

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* === Filter Bar === */}
//       <div className="w-full bg-white shadow sticky top-16 z-40 border-b">
//         <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
//           <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} setCurrentPage={setCurrentPage}/>

//           <CategoryFilter
//             categories={categories}
//             selectedCategory={categoryFilter}
//             setSelectedCategory={setCategoryFilter}
//             setCurrentPage={setCurrentPage}
//           />

//           <PriceFilter priceRange={priceRange} setPriceRange={setPriceRange} setCurrentPage={setCurrentPage} />

//           <RatingFilter
//             selectedRating={selectedRating}
//             setSelectedRating={setSelectedRating}
//             setCurrentPage={setCurrentPage}
//           />

//           <button
//             onClick={handleClearFilters}
//             className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-md transition shadow"
//           >
//             Clear Filters
//           </button>
//         </div>
//       </div>

//       {/* === Product Grid === */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {products.length === 0 ? (
//           <p className="text-gray-500 text-center text-lg mt-10">
//             No products found. Try changing filters.
//           </p>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {products.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>

//             {/* === Pagination === */}
//             <div className="flex justify-center mt-8 gap-2">
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <button
//                   key={i + 1}
//                   className={`px-3 py-1 rounded ${
//                     currentPage === i + 1
//                       ? "bg-pink-500 text-white"
//                       : "bg-gray-200"
//                   }`}
//                   onClick={() => setCurrentPage(i + 1)}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProductList;



import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import CategoryFilter from "./filters/CategoryFilter";
import SearchBar from "./filters/SearchBar";
import PriceFilter from "./filters/PriceFilter";
import RatingFilter from "./filters/RatingFilter";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [selectedRating, setSelectedRating] = useState(0);

  const [searchParams] = useSearchParams();
  const defaultCategory = searchParams.get("category") || "";
  const [categoryFilter, setCategoryFilter] = useState(defaultCategory);

  const categories = [
    { id: 1, name: "BabyCare" },
    { id: 2, name: "Toys" },
    { id: 3, name: "Clothing" },
    { id: 4, name: "Feeding" },
    { id: 5, name: "Traveling" },
    { id: 6, name: "Diapering" },
  ];

  // Fetch products from backend with filters & pagination
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products", {
        params: {
          SearchTerm: searchTerm || undefined,
          CategoryId: categoryFilter ? parseInt(categoryFilter) : undefined,
          MinPrice: priceRange.min,
          MaxPrice: priceRange.max,
          Rating: selectedRating > 0 ? selectedRating : undefined,
          Page: currentPage,
          PageSize: pageSize,
        },
      });

      const data = res.data.data.items;
      setProducts(data);
      setTotalCount(res.data.data.totalCount);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
      setTotalCount(0);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, categoryFilter, priceRange, selectedRating, currentPage]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("");
    setPriceRange({ min: 0, max: 10000 });
    setSelectedRating(0);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* === Filter Bar === */}
      <div className="w-full bg-white shadow sticky top-16 z-40 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setCurrentPage={setCurrentPage}
          />

          <CategoryFilter
            categories={categories}
            selectedCategory={categoryFilter}
            setSelectedCategory={setCategoryFilter}
            setCurrentPage={setCurrentPage}
          />

          <PriceFilter
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            setCurrentPage={setCurrentPage}
          />

          <RatingFilter
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            setCurrentPage={setCurrentPage}
          />

          <button
            onClick={handleClearFilters}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-md transition shadow"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* === Product Grid === */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {products.length === 0 ? (
          <div className="text-center mt-10">
            <p className="text-gray-500 text-lg mb-4">
              No products found. Try changing filters.
            </p>
            <button
              onClick={handleClearFilters}
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-md transition shadow"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* === Pagination with Next/Prev buttons === */}
            <div className="flex justify-center items-center mt-8 gap-2">
              <button
                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${
                  currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200"
                }`}
              >
                Prev
              </button>

              <span className="px-3 py-1">
                Page {currentPage} of {totalPages || 1}
              </span>

              <button
                onClick={() =>
                  currentPage < totalPages && setCurrentPage(currentPage + 1)
                }
                disabled={currentPage === totalPages || totalPages === 0}
                className={`px-3 py-1 rounded ${
                  currentPage === totalPages || totalPages === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gray-200"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductList;
