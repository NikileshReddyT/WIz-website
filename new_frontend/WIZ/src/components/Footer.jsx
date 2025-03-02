import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h4 className="text-2xl font-bold mb-4">About WelfareInfraProjects</h4>
          <p className="text-gray-400">
            WelfareInfraProjects is a diversified enterprise committed to innovation, quality, and community welfare across multiple industries.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-2xl font-bold mb-4">Quick Links</h4>
          <ul>
            <li className="mb-2">
              <a href="/about" className="hover:text-yellow-500 transition">
                About Us
              </a>
            </li>
            <li className="mb-2">
              <a href="/services" className="hover:text-yellow-500 transition">
                Services
              </a>
            </li>
            <li className="mb-2">
              <a href="/contact" className="hover:text-yellow-500 transition">
                Contact
              </a>
            </li>
            <li className="mb-2">
              <a href="/privacy-policy" className="hover:text-yellow-500 transition">
                Privacy Policy
              </a>
            </li>
            <li className="mb-2">
              <a href="/terms" className="hover:text-yellow-500 transition">
                Terms &amp; Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h4 className="text-2xl font-bold mb-4">Subscribe to our Newsletter</h4>
          <p className="text-gray-400 mb-4">
            Stay updated with our latest news and offers.
          </p>
          <form className="flex flex-col">
            <input
              type="email"
              placeholder="Your email"
              className="p-3 mb-4 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 p-3 rounded transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Social Media and Copyright */}
      <div className="border-t border-gray-700 mt-12 pt-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} WelfareInfraProjects. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-500 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-500 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-500 transition"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-500 transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
