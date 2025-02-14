import React from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const navVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const linkVariants = {
  hover: {
    scale: 1.1,
    transition: { type: "spring", stiffness: 300, damping: 10 },
  },
};

function Navbar() {
  return (
    <motion.header
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-yellow-100 shadow-lg sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo with hover scale */}
        <motion.div whileHover={{ scale: 1.1 }} className="text-2xl font-bold">
          <Link to="/">WelfareInfra</Link>
        </motion.div>
        <nav>
          <ul className="flex space-x-6">
            {["/", "/about", "/services", "/contact"].map((path, index) => (
              <motion.li
                key={index}
                variants={linkVariants}
                whileHover="hover"
                className="cursor-pointer"
              >
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold text-yellow-100"
                      : "transition-colors duration-300 hover:text-yellow-100"
                  }
                >
                  {path === "/" ? "Home" : path.replace("/", "").replace(/\b\w/g, (c) => c.toUpperCase())}
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.header>
  );
}

export default Navbar;
