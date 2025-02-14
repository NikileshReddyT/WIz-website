import React from "react";
import { motion } from "framer-motion";

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function Contact() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 bg-gradient-to-b from-white to-gray-50 text-gray-800">
      <motion.h2
        className="text-4xl font-bold text-center mb-8 text-yellow-600"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        Contact Us
      </motion.h2>
      <motion.form
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="max-w-xl mx-auto space-y-6"
      >
        <div>
          <label className="block text-lg font-medium mb-2 text-yellow-600" htmlFor="name">
            Name
          </label>
          <input
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            type="text"
            id="name"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2 text-yellow-600" htmlFor="email">
            Email
          </label>
          <input
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            type="email"
            id="email"
            placeholder="Your email"
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2 text-yellow-600" htmlFor="message">
            Message
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            id="message"
            rows="5"
            placeholder="Your message"
          ></textarea>
        </div>
        <motion.button
          variants={formVariants}
          whileHover={{ scale: 1.02 }}
          type="submit"
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-md transition"
        >
          Send Message
        </motion.button>
      </motion.form>
    </section>
  );
}

export default Contact;
