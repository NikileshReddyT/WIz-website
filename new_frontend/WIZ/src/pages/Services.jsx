import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import servicesHeroImg from "../assets/servicesHeroImg.jpg";
import dottedLine from "../assets/dottedLine.png";

import sandGraniteImg from "../assets/sandGranite.jpg";
import evIndustryImg from "../assets/evIndustry.jpg";
import goldTradingImg from "../assets/goldTrading.jpg";
import stockMarketImg from "../assets/stockMarket.jpg";
import agroFarmingImg from "../assets/agroFarming.jpg";
import constructionImg from "../assets/construction.jpg";

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
    <div className="relative overflow-hidden">
      {/* Hero/Banner Section */}
      <section className="relative bg-gradient-to-b from-white to-gray-50 py-16 overflow-hidden">
        <img
          src={servicesHeroImg}
          alt="Services Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 text-yellow-600"
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
          >
            Our Services
          </motion.h1>
          <motion.p
            className="text-lg max-w-2xl mx-auto text-gray-800"
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
          >
            We offer a wide range of services across multiple industries, ensuring innovation, sustainability, and excellence in every project.
          </motion.p>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <FlipCard
          title="Sand and Granite PROJECTS"
          img={sandGraniteImg}
          text="WelfareInfraProjects is a leader in both the sand and granite industries, offering top-quality materials essential for construction and industrial applications..."
        />
        <FlipCard
          title="Electric Vehicle (EV) Industry"
          img={evIndustryImg}
          text="WelfareInfraProjects is at the forefront of the electric vehicle revolution, playing an active role in the transition to clean and sustainable transportation..."
        />
        <FlipCard
          title="Gold Trading"
          img={goldTradingImg}
          text="WelfareInfraProjects is a trusted name in the gold trading sector, dedicated to providing secure and transparent trading solutions for investors and stakeholders..."
        />
        <FlipCard
          title="Stock Market Investments (NSE/BSE)"
          img={stockMarketImg}
          text="WelfareInfraProjects actively participates in the Indian stock markets (NSE and BSE), leveraging our market expertise to navigate the complexities of stock trading and investments..."
        />
        <FlipCard
          title="Agro Farming"
          img={agroFarmingImg}
          text="WelfareInfraProjects is dedicated to sustainable agro farming practices, focusing on producing high-quality agricultural products that support food security and promote environmental stewardship..."
        />
        <FlipCard
          title="Construction and Open Plots Selling"
          img={constructionImg}
          text="WelfareInfraProjects is a prominent player in the construction industry and open plots selling, delivering comprehensive solutions for residential, commercial, and infrastructure development..."
        />
      </div>
      <motion.div
        className="flex justify-center mb-8"
        variants={fadeUpVariant}
        initial="hidden"
        animate="visible"
      >
        <img src={dottedLine} alt="Divider" className="h-6 w-auto opacity-70" />
      </motion.div>
    </div>
  );
}

function FlipCard({ title, img, text }) {
  return (
    <AnimatePresence>
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 flex flex-col"
        variants={flipCardVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        whileHover={{ scale: 1.02 }}
      >
        <motion.img
          src={img}
          alt={title}
          className="w-full h-48 object-cover rounded-md mb-4"
          whileHover={{ rotate: 2 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
        <h2 className="text-2xl font-bold mb-2 text-yellow-600">{title}</h2>
        <p className="text-gray-800 text-sm">{text}</p>
      </motion.div>
    </AnimatePresence>
  );
}

export default Services;
