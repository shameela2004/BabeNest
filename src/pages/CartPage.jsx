
// import React from 'react';
// import { useCart } from '../context/CartProvider';

// function Cart() {
//   const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

//   if (cartItems.length === 0) {
//     return <p className="p-4 text-center">Your cart is empty.</p>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
//       <div className="space-y-4">
//         {cartItems.map(item => (
//           <div key={item.id} className="flex items-center gap-4 border rounded p-4">
//             <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
//             <div className="flex-1">
//               <h3 className="font-semibold">{item.name}</h3>
//               <p>₹{item.price}</p>
//               <div className="flex items-center gap-2 mt-2 content-center">
//                <label className='mr-2'>Qty:</label>
//                <button onClick={()=>updateQuantity(item.id,item.quantity-1)} disabled={item.quantity===1} className='text-3xl font-bold text-gray-700 hover:text-grey-600  disabled:opacity-40 mb-2'>-</button>
//                <div className=' border rounded px-1'>
//                     <span className='px-3'>{item.quantity}</span>
//                </div>
//               <button onClick={()=>updateQuantity(item.id,item.quantity+1)} className='text-3xl font-bold text-gray-700 hover:text-grey-600 mb-2'>+</button>
//               </div>
//             </div>
//             <button
//               onClick={() => removeFromCart(item.id)}
//               className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6 text-right text-xl font-semibold">
//         Total: ₹{totalPrice.toFixed(2)}
//       </div>

//       <button
//         className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
//         onClick={() => alert('Checkout coming soon!')}
//       >
//         Proceed to Checkout
//       </button>
//     </div>
//   );
// }

// export default Cart;






import React from 'react';
import { useCart } from '../context/CartProvider';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { BiTrash } from 'react-icons/bi';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice ,clearCart} = useCart();

  if (cartItems.length === 0) {
    return <>
        <Navbar></Navbar>
        <div className="max-w-4xl mx-auto p-6 text-center text-gray-600">
          <h2 className="text-2xl font-semibold mb-4">Your Cart is empty 😔</h2>
          <p>Add some products ...!!</p>
        </div>
        </>
  }

  return (
    <>
    <Navbar></Navbar>
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-pink-600">My Cart</h1>
      <div className="space-y-4">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center gap-4 border rounded p-4">
            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p>₹{item.price}</p>
              <div className="flex items-center gap-2 mt-2 content-center">
                <label className='mr-2'>Qty:</label>
                
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity === 1}
                  className='text-3xl font-bold text-gray-700 hover:text-grey-600 disabled:opacity-40 mb-2'
                >
                  -
                </button>

                <div className='border rounded px-1'>
                  <span className='px-3'>{item.quantity}</span>
                </div>

                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className='text-3xl font-bold text-gray-700 hover:text-grey-600 mb-2'
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right  font-semibold flex justify-between">
        <div className='text-xl'>Total: ₹{totalPrice.toFixed(2)}</div>
        <button className='flex text-white bg-gray-600 hover:bg-gray-800 p-2 rounded text-m text-light' onClick={clearCart}>🗑️ Clear Cart</button>
      </div>

      {/* <button
        type="button"
        className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
        
      >
        <Link to="/checkout" >
       Proceed to Checkout
        </Link>
      </button> */}      <Link
  to="/checkout"
  className="inline-block mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded text-center"
>
  Proceed to Checkout
</Link>
    </div>
    </>
  );
}

export default Cart;


