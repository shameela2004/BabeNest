
// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import ProductCard from './ProductCard'
// import CategoryFilter from './filters/CategoryFilter'
// import SearchBar from './filters/SearchBar'
// import PriceFilter from './filters/PriceFilter'
// import RatingFilter from './filters/RatingFilter'
// import { useSearchParams } from 'react-router-dom'

// function ProductList() {
//   const [products, setProducts] = useState([])
//   const [filteredProducts, setFilteredProducts] = useState([])
//   // const [categoryFilter, setCategoryFilter] = useState('')
//   const [searchTerm,setSearchTerm]=useState("")
//   const [priceRange,setPriceRange]=useState({min:0,max:10000})
//   const [selectedRating,setSelectedRating]=useState(0)


//   const [searchParams] = useSearchParams();
// const defaultCategory = searchParams.get('category') || '';
// const [categoryFilter, setCategoryFilter] = useState(defaultCategory);



//   useEffect(() => {
//     axios
//       .get('http://localhost:3001/products')
//       .then((res) => {
//         setProducts(res.data)
//         setFilteredProducts(res.data)
//       })
//       .catch((e) => console.log(e))
//   }, [])

//   useEffect(()=>{
//     let filtered=[...products]

//     //search item
//       if (searchTerm.trim()) {
//     const lowerSearch = searchTerm.trim().toLowerCase();
//     filtered = filtered.filter(
//       (p) =>
//         p.name?.toLowerCase().includes(lowerSearch) ||
//         p.category?.toLowerCase().includes(lowerSearch)
//     );
//   }
//     //categoryfilter
//      if (categoryFilter.trim()) {
//     filtered = filtered.filter(
//   (p) => p.category.trim().toLowerCase() === categoryFilter.trim().toLowerCase()
// );
//   }

//   //Price Filter
//    filtered = filtered.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

//     //rating filter
//      if (selectedRating > 0) {
//       filtered = filtered.filter(p => Number(p.rating) >= selectedRating)
//     }
//     setFilteredProducts(filtered)

//   },[products, searchTerm, categoryFilter, priceRange, selectedRating])
//     // Reset all filters
//   const handleClearFilters = () => {
//     setSearchTerm('')
//     setCategoryFilter('')
//     setPriceRange({ min: 0, max: 10000 })
//     setSelectedRating(0)
//   }

//   return (
//     <div >
//        {/* Filters */}
// <div className="w-full bg-pink-50 border-t border-pink-200 shadow-sm mb-6 fixed z-40 top-16">
//   <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap md:flex-nowrap gap-4 items-center justify-between">
//     <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//     <CategoryFilter
//       categories={["Clothing", "Baby Care","Feeding", "Diapering", "Toys", "Bedding", "Travel"]}
//       selectedCategory={categoryFilter}
//       setSelectedCategory={setCategoryFilter}
//     />
//     <PriceFilter priceRange={priceRange} setPriceRange={setPriceRange} />
//     <RatingFilter
//       selectedRating={selectedRating}
//       setSelectedRating={setSelectedRating}
//     />
//     <button
//       onClick={handleClearFilters}
//       className="bg-pink-200 hover:bg-pink-300 text-pink-900 font-medium px-4 py-2 rounded shadow-sm"
//     >
//       Clear
//     </button>
//   </div>
// </div>


//       {/* Products Display */}

// <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))
//         ) : (
//           <p className="text-gray-600 text-xl">No products found.</p>
//         )}
//       </div>

     
//     </div>
//   )
// }

// export default ProductList

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import CategoryFilter from './filters/CategoryFilter'
import SearchBar from './filters/SearchBar'
import PriceFilter from './filters/PriceFilter'
import RatingFilter from './filters/RatingFilter'
import { useSearchParams } from 'react-router-dom'

function ProductList() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })
  const [selectedRating, setSelectedRating] = useState(0)

  const [searchParams] = useSearchParams();
  const defaultCategory = searchParams.get('category') || '';
  const [categoryFilter, setCategoryFilter] = useState(defaultCategory);

  useEffect(() => {
    axios
      .get('http://localhost:3001/products')
      .then((res) => {
        setProducts(res.data)
        setFilteredProducts(res.data)
      })
      .catch((e) => console.log(e))
  }, [])

  useEffect(() => {
    let filtered = [...products]

    // search
    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase()
      filtered = filtered.filter(p =>
        p.name?.toLowerCase().includes(lower) ||
        p.category?.toLowerCase().includes(lower)
      )
    }

    // category
    if (categoryFilter.trim()) {
      filtered = filtered.filter(
        p => p.category.trim().toLowerCase() === categoryFilter.trim().toLowerCase()
      )
    }

    // price
    filtered = filtered.filter(p => p.price >= priceRange.min && p.price <= priceRange.max)

    // rating
    if (selectedRating > 0) {
      filtered = filtered.filter(p => Number(p.rating) >= selectedRating)
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, categoryFilter, priceRange, selectedRating])

  const handleClearFilters = () => {
    setSearchTerm('')
    setCategoryFilter('')
    setPriceRange({ min: 0, max: 10000 })
    setSelectedRating(0)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* === Modern Filter Bar === */}
      <div className="w-full bg-white shadow sticky top-16 z-40 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <CategoryFilter
            categories={["Clothing", "Baby Care", "Feeding", "Diapering", "Toys", "Bedding", "Travel"]}
            selectedCategory={categoryFilter}
            setSelectedCategory={setCategoryFilter}
          />

          <PriceFilter priceRange={priceRange} setPriceRange={setPriceRange} />

          <RatingFilter selectedRating={selectedRating} setSelectedRating={setSelectedRating} />

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
  {filteredProducts.length === 0 ? (
    <p className="text-gray-500 text-center text-lg mt-10">
      No products found. Try changing filters.
    </p>
  ) : (
    <>
      {/* <h2 className="text-3xl font-bold text-pink-700 mb-6 text-center">All Products</h2> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )}
</div>

    </div>
  )
}

export default ProductList

