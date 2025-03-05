// src/pages/Contact.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid.";
    }
    if (!formData.message.trim()) errors.message = "Message is required.";
    return errors;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // Place your API integration via Axios or fetch here if needed.
      console.log("Form submitted:", formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-[#020B2D] to-[#010821] min-h-screen overflow-hidden">
      {/* Decorative Animated Circles */}
      <motion.div
        className="absolute top-[-60px] left-[-60px] w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-60px] right-[-60px] w-56 h-56 bg-green-500/20 rounded-full blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-4xl mx-auto p-6 relative z-10">
        <motion.h1
          className="text-4xl font-bold text-yellow-500 text-center mb-8"
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
        >
          Contact Us
        </motion.h1>

        {submitted && (
          <motion.p
            className="text-green-500 text-center mb-6 text-xl"
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
          >
            Thank you for reaching out! We'll get back to you soon.
          </motion.p>
        )}

        <motion.form
          className="space-y-6"
          onSubmit={handleSubmit}
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
        >
          <div>
            <label className="block text-gray-300 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.name && (
              <p className="text-red-500 mt-1 text-sm">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.email && (
              <p className="text-red-500 mt-1 text-sm">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            ></textarea>
            {errors.message && (
              <p className="text-red-500 mt-1 text-sm">{errors.message}</p>
            )}
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-md transition"
          >
            Send Message
          </motion.button>
        </motion.form>

        <div className="mt-12 text-center text-gray-300">
          <h2 className="text-2xl font-semibold mb-2">Our Office</h2>
          <p>1234 Main Street, City, Country</p>
          <p>Phone: +1 (123) 456-7890</p>
          <div className="mt-6">
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434094303!2d144.95373631531633!3d-37.81627927975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1a7a3c1%3A0x5045675218ce6e0!2sMelbourne%20CBD%2C%20Melbourne%20VIC!5e0!3m2!1sen!2sau!4v1600000000000!5m2!1sen!2sau"
              width="100%"
              height="300"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
