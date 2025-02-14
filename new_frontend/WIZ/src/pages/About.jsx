import React from "react";
import { motion } from "framer-motion";
import aboutHeroImg from "../assets/aboutHeroImg.jpg";
import whoWeAreImg from "../assets/whoWeAreImg.jpg";
import dottedLine from "../assets/dottedLine.png";

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
    <div className="relative overflow-hidden">
      {/* Hero/Banner Section */}
      <section className="relative bg-gradient-to-b from-white to-gray-50 py-16 overflow-hidden">
        <img
          src={aboutHeroImg}
          alt="About Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-yellow-600 mb-6"
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
          >
            ABOUT COMPANY
          </motion.h1>
          <motion.p
            className="text-lg text-gray-800 max-w-3xl mx-auto"
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
          >
            WelfareInfraProjects is a diversified enterprise operating across multiple industries, including sand business, granite extraction, electric vehicle (EV) technology, gold trading, stock market investments (NSE/BSE), construction, open plots selling, agro farming, and the banking sector. Committed to sustainability and innovation, the company strives to deliver high-quality products and services while maintaining ethical practices. With a strong focus on community welfare, WelfareInfraProjects is also actively involved in charitable initiatives aimed at uplifting underprivileged groups, making a positive impact across all areas of operation.
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
        <img src={dottedLine} alt="Divider" className="h-6 w-auto opacity-70" />
      </motion.div>
      {/* WHO WE ARE Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
          <motion.div
            className="md:w-1/2"
            variants={fadeLeftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <img src={whoWeAreImg} alt="Who We Are" className="w-full rounded-lg shadow-lg" />
          </motion.div>
          <motion.div
            className="md:w-1/2 space-y-6"
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-600">
              WHO WE ARE?
            </h2>
            <p className="text-lg text-gray-800">
              With our expert's having 10+ years of experience in related field, WelfareInfraProjects is a trusted and established leader with over 10 years of experience across diverse industries, including the sand business, granite extraction, electric vehicles (EV), gold trading, stock market investments (NSE/BSE), construction, open plots selling, agro farming, and banking. Our expertise in these fields allows us to consistently deliver quality products and services that meet the highest standards. We are dedicated to innovation, sustainability, and ethical business practices, ensuring long-term growth and positive impact in every sector we operate in. Additionally, our commitment to community welfare drives our active participation in charitable initiatives, making a difference where it matters most.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default About;
