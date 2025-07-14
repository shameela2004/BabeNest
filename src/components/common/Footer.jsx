import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-pink-100 text-gray-700 pt-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 border-b border-pink-200 pb-10">

        {/* Brand Info */}
        <div>
          <h3 className="text-2xl font-bold text-pink-700 mb-3">BabeNest 👶</h3>
          <p className="text-sm text-gray-600">
            Your trusted place for adorable and essential newborn products.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/products">Shop</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/products?category=Clothing">Clothing</Link></li>
            <li><Link to="/products?category=Feeding">Feeding</Link></li>
            <li><Link to="/products?category=Toys">Toys</Link></li>
            <li><Link to="/products?category=Bedding">Bedding</Link></li>
            <li><Link to="/products?category=Baby Care">Baby Care</Link></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
          <p className="text-sm mb-2">📞 +91 98765 43210</p>
          <p className="text-sm mb-4">📧 hello@babenest.com</p>

          <div className="flex gap-4 text-pink-600">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="hover:text-pink-800 transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-pink-800 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="hover:text-pink-800 transition" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="hover:text-pink-800 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-sm text-gray-500 py-4">
        © {new Date().getFullYear()} BabeNest. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
