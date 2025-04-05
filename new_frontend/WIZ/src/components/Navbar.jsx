// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

// Consistent Color Variables (Tailwind classes)
const colors = {
  background: "bg-[#020B2D]", // Primary dark background
  backgroundScroll: "bg-[#020B2D]/95 backdrop-blur-md", // Background when scrolled
  textPrimary: "text-gray-200", // Main text color
  textHover: "text-yellow-400", // Text hover/accent
  textActive: "text-yellow-400 font-semibold", // Active link text
  accent: "yellow-500", // Primary accent (buttons, highlights)
  accentHover: "yellow-600", // Accent hover
  buttonTextDark: "text-black", // Text on yellow button
  buttonSecondaryBorder: "border-gray-600",
  buttonSecondaryBgHover: "bg-gray-700/50", // Subtle hover for secondary button
};

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation(); // Get current location for active link styling

  // --- Scroll Detection ---
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // Change background after scrolling 10px
    };
    window.addEventListener('scroll', handleScroll);
    // Initial check in case page loads already scrolled
    handleScroll();
    // Cleanup listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Mobile Menu Management ---
  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset'; // Cleanup on unmount
    };
  }, [mobileMenuOpen]);


  // --- Animation Variants ---
  const mobileMenuVariants = {
    hidden: { opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: "easeOut", when: "afterChildren", staggerChildren: 0.05, staggerDirection: -1 } },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.08, delayChildren: 0.1 } },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  // --- Navigation Data ---
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact Us" },
    { path: "/services", label: "Services" },
  ];

  // Helper function for link classes
  const getLinkClasses = (path) => {
    const baseClasses = `${colors.textPrimary} hover:${colors.textHover} transition-colors duration-300 text-sm font-medium`;
    const activeClasses = colors.textActive;
    return location.pathname === path ? `${baseClasses} ${activeClasses}` : baseClasses;
  };

    // Helper function for mobile link classes
    const getMobileLinkClasses = (path) => {
      const baseClasses = `${colors.textPrimary} hover:${colors.textHover} transition-colors duration-300 block text-2xl font-medium py-2`;
      const activeClasses = colors.textActive;
      return location.pathname === path ? `${baseClasses} ${activeClasses}` : baseClasses;
    };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? `${colors.backgroundScroll} shadow-lg` : `${colors.background} shadow-md`}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16"> {/* Standard height */}

          {/* Logo & Brand Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center" aria-label="Homepage">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ring-1 ring-${colors.accent}/30`}>
                {/* SVG Logo */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={`w-7 h-7 text-${colors.accent}`}>
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                 </svg>
              </div>
              <span className={`text-white font-bold text-xl ml-3 inline`}>WIZ TRADE</span>
            </Link>
          </div>

          {/* Desktop Menu (Links) */}
          <div className="hidden md:flex items-center justify-center flex-grow">
            <div className="flex items-baseline space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                 <Link key={link.path} to={link.path} className={getLinkClasses(link.path)}>
                    {link.label}
                 </Link>
              ))}
            </div>
          </div>

          {/* Desktop Auth Buttons (Visible up to lg) & Mobile Toggle */}
          <div className="flex items-center">
            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-3 mr-3">
               <Link
                  to="/signin"
                  className={`text-sm font-medium ${colors.textPrimary} border ${colors.buttonSecondaryBorder} px-4 py-2 rounded-md hover:${colors.buttonSecondaryBgHover} hover:text-white transition-all duration-300`}
                >
                  Sign In
               </Link>
               <Link
                  to="/signup"
                  className={`text-sm font-medium bg-${colors.accent} ${colors.buttonTextDark} px-4 py-2 rounded-md hover:bg-${colors.accentHover} transition-all duration-300 shadow`}
               >
                  Join Us
               </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden"> {/* Changed breakpoint to md to match menu links hiding */}
                <button
                  className={`${colors.textPrimary} hover:text-white focus:outline-none p-2 z-50 relative`}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-menu-overlay"
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                >
                   <AnimatePresence initial={false} mode="wait">
                       {mobileMenuOpen ? (
                           <motion.div key="close" /* ... icon animation ... */> <FiX size={24} /> </motion.div>
                       ) : (
                           <motion.div key="open" /* ... icon animation ... */> <FiMenu size={24} /> </motion.div>
                       )}
                  </AnimatePresence>
                </button>
            </div>
          </div>

        </div>
      </div>

      {/* --- Mobile Menu Overlay --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-overlay"
            // Full screen, flex column, center content, specific bg/blur
            className={`fixed inset-0 h-[100dvh] w-screen ${colors.backgroundScroll} md:hidden flex flex-col items-center justify-center space-y-5 z-40 overflow-y-auto p-6`}
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Navigation Links */}
            <nav className="flex flex-col items-center space-y-4">
                {navLinks.map((link) => (
                  <motion.div key={link.path} variants={menuItemVariants}>
                    <Link
                      to={link.path}
                      className={getMobileLinkClasses(link.path)}
                      // onClick handled by useEffect on location change
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
            </nav>


            {/* Divider */}
            <motion.div variants={menuItemVariants} className="w-1/2 max-w-xs border-t border-gray-700/50 pt-6"></motion.div>

            {/* Auth Buttons in Mobile Menu */}
             <motion.div variants={menuItemVariants} className="flex flex-col space-y-4 w-full items-center px-6">
                 <Link
                    to="/signin"
                    className={`w-full max-w-xs text-center text-lg font-medium border ${colors.buttonSecondaryBorder} ${colors.textPrimary} px-6 py-3 rounded-md hover:${colors.buttonSecondaryBgHover} hover:text-white transition-all duration-300`}
                  >
                    Sign In
                 </Link>
                 <Link
                    to="/signup"
                     className={`w-full max-w-xs text-center text-lg font-medium bg-${colors.accent} ${colors.buttonTextDark} px-6 py-3 rounded-md hover:bg-${colors.accentHover} transition-all duration-300 shadow`}
                 >
                    Join Us
                 </Link>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// Helper for icon animation copy/paste
const IconAnimation = () => (
    <AnimatePresence initial={false} mode="wait">
        {mobileMenuOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <FiX size={24} />
            </motion.div>
        ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
               <FiMenu size={24} />
            </motion.div>
        )}
   </AnimatePresence>
);


export default Navbar;