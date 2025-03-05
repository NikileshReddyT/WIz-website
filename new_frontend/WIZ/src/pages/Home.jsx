// src/HomePage.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import homei from "../assets/homei.jpg";

const heroText = "IT'S TIME TO BUILD YOUR ECONOMY GROW";

function HomePage() {
  const [displayedText, setDisplayedText] = useState("");
  const navigate = useNavigate(); // Initialize navigate function

  // Typewriter effect for the headline
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(heroText.slice(0, index + 1));
      index++;
      if (index === heroText.length) {
        clearInterval(interval);
      }
    }, 100); // Adjust speed as needed
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020B2D] to-[#010821] relative overflow-hidden">
      {/* Animated Decorative Circles */}
      <motion.div
        className="absolute top-[-50px] left-[-50px] w-56 h-56 rounded-full bg-yellow-500 opacity-20"
        animate={{ x: [0, 50, 0], y: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-50px] right-[-50px] w-72 h-72 rounded-full bg-green-500 opacity-20"
        animate={{ x: [0, -50, 0], y: [0, -50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-24 flex flex-col md:flex-row items-center">
        {/* Hero Text */}
        <div className="flex-1 space-y-6">
          <motion.div
            className="text-yellow-500 font-medium text-xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            WIZ INFRA PROJECTS
          </motion.div>
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {displayedText}
          </motion.h1>
          <motion.p
            className="text-gray-300 text-lg max-w-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Make your work easier with an integrated ecosystem that lets all departments work together seamlessly.
          </motion.p>
          <motion.button
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-6 text-lg rounded transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            onClick={() => navigate('/signin')} // Navigate to sign-in page
          >
            Get Started
          </motion.button>
        </div>

        {/* Hero Image */}
        <div className="flex-1 relative mt-12 md:mt-0">
          <motion.img
            src={homei}
            alt="Person working on laptop"
            className="rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1 }}
          />
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <FiChevronDown size={32} />
      </motion.div>

      {/* Additional About Section */}
      <div className="container mx-auto px-4 py-24">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            About WIZ InfraProjects
          </h2>
          <p className="text-gray-300 text-lg">
            WIZ InfraProjects is a diversified enterprise operating in multiple sectors including construction, finance, technology, and more. We harness innovation and sustainable practices to drive growth and build a better future for our community.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default HomePage;
