// src/pages/Services.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import services from "../assets/services.jpg";
import dt from "../assets/dt.png";

import sand from "../assets/sand.jpg";
import ev from "../assets/ev.jpg";
import gold from "../assets/gold.jpg";
import stock from "../assets/stock.jpg";
import agro from "../assets/agro.jpg";
import plot from "../assets/plot.jpg";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const flipCardVariant = {
  hidden: { rotateY: 90, opacity: 0 },
  visible: {
    rotateY: 0,
    opacity: 1,
    transition: { duration: 0.8 },
  },
};

function Services() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#020B2D] to-[#010821] min-h-screen">
      {/* Hero/Banner Section */}
      <section className="relative py-20">
        <img
          src={services}
          alt="Services Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 text-yellow-500"
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
          >
            Our Services
          </motion.h1>
          <motion.p
            className="text-lg max-w-2xl mx-auto text-gray-300"
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
          >
            We offer a wide range of services across multiple industries, ensuring innovation, sustainability, and excellence in every project.
          </motion.p>
        </div>
      </section>

      {/* Divider */}
      <motion.div
        className="flex justify-center my-8"
        variants={fadeUpVariant}
        initial="hidden"
        animate="visible"
      >
        <img src={dt} alt="Divider" className="h-6 w-auto opacity-70" />
      </motion.div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <FlipCard
          title="Sand and Granite Projects"
          img={sand}
          text="Leader in supplying premium-grade sand and high-quality granite for construction and industrial applications. Our sustainable practices ensure a reliable supply for projects of all sizes."
        />
        <FlipCard
          title="Electric Vehicle (EV) Industry"
          img={ev}
          text="At the forefront of the EV revolution, we promote innovative and sustainable transportation solutions. Our services include infrastructure support, technology integration, and industry partnerships."
        />
        <FlipCard
          title="Gold Trading"
          img={gold}
          text="Providing secure and transparent trading solutions, our gold trading services offer competitive pricing and reliable market insights to investors."
        />
        <FlipCard
          title="Stock Market Investments (NSE/BSE)"
          img={stock}
          text="We leverage market expertise to navigate stock trading complexities, ensuring strategic investments and diversified portfolios."
        />
        <FlipCard
          title="Agro Farming"
          img={agro}
          text="Focused on sustainable practices, our agro farming initiatives support food security and environmental stewardship by integrating innovative agricultural techniques."
        />
        <FlipCard
          title="Construction and Open Plots Selling"
          img={plot}
          text="Delivering comprehensive construction solutions and prime real estate opportunities, we focus on high-quality development and sustainable practices."
        />
      </div>

      {/* Animated Decorative Elements */}
      <motion.div
        className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-yellow-500/20 rounded-full blur-2xl"
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-50px] left-[-50px] w-40 h-40 bg-green-500/20 rounded-full blur-2xl"
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function FlipCard({ title, img, text }) {
  return (
    <AnimatePresence>
      <motion.div
        className="bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col"
        variants={flipCardVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <motion.img
          src={img}
          alt={title}
          className="w-full h-48 object-cover rounded-md mb-4"
          whileHover={{ rotate: 2 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <h2 className="text-2xl font-bold mb-2 text-yellow-500">{title}</h2>
        <p className="text-gray-300 text-sm">{text}</p>
      </motion.div>
    </AnimatePresence>
  );
}

export default Services;
