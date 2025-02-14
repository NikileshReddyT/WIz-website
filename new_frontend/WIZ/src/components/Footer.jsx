import React from "react";
import { motion } from "framer-motion";

const footerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function Footer() {
  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white shadow-inner py-6 mt-12"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm text-yellow-600">
          © {new Date().getFullYear()} WelfareInfra. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}

export default Footer;
