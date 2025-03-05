// src/pages/About.jsx
import React from "react";
import { motion } from "framer-motion";
import about from "../assets/about.jpg";
import weare from "../assets/weare.jpg";
import dt from "../assets/dt.png";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const fadeLeftVariant = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

function About() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#020B2D] to-[#010821]">
      {/* Hero/Banner Section */}
      <section className="relative py-24">
        <img
          src={about}
          alt="About Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-yellow-500 mb-6"
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
          >
            ABOUT COMPANY
          </motion.h1>
          <motion.p
            className="text-lg text-gray-300 max-w-3xl mx-auto"
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
          >
            WIZ InfraProjects is a diversified enterprise operating across multiple industries including sand business, granite extraction, electric vehicle technology, gold trading, stock market investments, construction, open plots selling, agro farming, and banking. We are dedicated to sustainability and innovation, delivering high-quality products and services while upholding ethical practices.
          </motion.p>
        </div>
      </section>

      {/* Animated Divider */}
      <motion.div
        className="flex justify-center my-8"
        variants={fadeUpVariant}
        initial="hidden"
        animate="visible"
      >
        <img src={dt} alt="Divider" className="h-6 w-auto opacity-70" />
      </motion.div>

      {/* WHO WE ARE Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="md:w-1/2"
            variants={fadeLeftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <img
              src={weare}
              alt="Who We Are"
              className="w-full rounded-lg shadow-lg"
            />
          </motion.div>
          <motion.div
            className="md:w-1/2 space-y-6"
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-500">
              WHO WE ARE?
            </h2>
            <p className="text-lg text-gray-300">
              With over 10 years of industry experience, our team at WIZ InfraProjects stands as a trusted leader in its fields. We combine quality, innovation, and ethical business practices to exceed client expectations while making a positive impact in our community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Additional Decorative Animated Elements */}
      <motion.div
        className="absolute top-[-50px] left-[-50px] w-32 h-32 bg-yellow-500/20 rounded-full blur-2xl"
        animate={{ x: [0, 50, 0], y: [0, 50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-50px] right-[-50px] w-40 h-40 bg-green-500/20 rounded-full blur-2xl"
        animate={{ x: [0, -50, 0], y: [0, -50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export default About;
