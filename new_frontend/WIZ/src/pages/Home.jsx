import React from "react";
import { motion } from "framer-motion";
import heroImage from "../assets/heroImage.jpg";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

function Home() {
  return (
    <div className="relative">
      {/* Optional floating shape (you can remove if not needed) */}
      <motion.div
        className="absolute top-0 right-0 w-32 opacity-20"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src="../assets/floatingShape.png" alt="Floating" />
      </motion.div>
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <motion.div
            className="md:w-1/2 space-y-6 mb-10 md:mb-0"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-yellow-600"
              variants={fadeUpVariant}
            >
              WELFARE INFRA PROJECTS
            </motion.h1>
            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-yellow-600"
              variants={fadeUpVariant}
            >
              IT’S TIME TO BUILD YOUR ECONOMY GROW
            </motion.h2>
            <motion.p className="text-lg text-gray-800 max-w-2xl" variants={fadeUpVariant}>
              Make your work easier with an integrated ecosystem that lets all departments work properly together.
            </motion.p>
            <motion.button
              variants={fadeUpVariant}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-md transition"
            >
              Get Started
            </motion.button>
          </motion.div>
          <motion.div
            className="md:w-1/2 flex justify-center md:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img src={heroImage} alt="Hero" className="w-full max-w-md rounded-xl shadow-xl" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;
