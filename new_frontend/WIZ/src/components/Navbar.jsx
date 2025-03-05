// src/components/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-[#020B2D] shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-8 h-8 text-yellow-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-white hover:text-yellow-500 transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-white hover:text-yellow-500 transition-colors">
            About Us
          </Link>
          <Link to="/contact" className="text-white hover:text-yellow-500 transition-colors">
            Contact Us
          </Link>
          <Link to="/services" className="text-white hover:text-yellow-500 transition-colors">
            Services
          </Link>
        </div>

        {/* Right Side Buttons & Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          <Link
            to="/signin"
            className="bg-transparent border border-white text-white px-4 py-2 rounded hover:bg-yellow-500 transition"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            Join Us
          </Link>
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#020B2D]">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              to="/"
              className="text-white hover:text-yellow-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-yellow-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-yellow-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              to="/services"
              className="text-white hover:text-yellow-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/signin"
              className="bg-transparent border border-white text-white px-4 py-2 rounded hover:bg-yellow-500 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Join Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
