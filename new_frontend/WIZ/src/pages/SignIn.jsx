import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

function SignIn({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Validate form data
  const validate = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid.";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required.";
    }
    return errors;
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission and backend integration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch("https://wiz-website-production.up.railway.app/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          toast.error(errorMessage, {
            position: "top-center",
            autoClose: 500,
          });
        } else {
          const data = await response.json();
          localStorage.setItem("token", data.token);
          localStorage.setItem("userID", data.id);
          localStorage.setItem("userEmail", data.email);
          
          toast.success("Login Successful!", {
            position: "top-center",
            autoClose: 1000,
            onClose: () => {
              setIsAuthenticated(true);
              navigate("/dashboard");
            },
          });
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.", {
          position: "top-center",
          autoClose: 500,
        });
      }
    } else {
      toast.error("Please correct the errors in the form.", {
        position: "top-center",
        autoClose: 500,
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020B2D] to-[#010821] flex items-center justify-center relative overflow-hidden">
      <motion.div
        className="absolute top-[-50px] left-[-50px] w-32 h-32 bg-yellow-500/20 rounded-full blur-2xl"
        animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-50px] right-[-50px] w-40 h-40 bg-green-500/20 rounded-full blur-2xl"
        animate={{ x: [0, -20, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="bg-gray-800/80 rounded-lg shadow-lg p-8 w-full max-w-md relative z-10">
        <motion.h1
          className="text-3xl font-bold text-yellow-500 text-center mb-6"
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
        >
          Sign In
        </motion.h1>
        <motion.form
          className="space-y-4"
          onSubmit={handleSubmit}
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
        >
          <div>
            <label className="block text-gray-300 mb-1" htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={errors.email ? "true" : "false"}
              required
              className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.email && (
              <motion.p
                className="text-red-500 text-sm mt-1"
                variants={fadeUpVariant}
                initial="hidden"
                animate="visible"
              >
                {errors.email}
              </motion.p>
            )}
          </div>
          <div>
            <label className="block text-gray-300 mb-1" htmlFor="password">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                aria-invalid={errors.password ? "true" : "false"}
                required
                className="mt-1 block w-full border border-gray-700 rounded-md p-2 pr-10 bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400"
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <motion.p
                className="text-red-500 text-sm mt-1"
                variants={fadeUpVariant}
                initial="hidden"
                animate="visible"
              >
                {errors.password}
              </motion.p>
            )}
          </div>
          <div className="text-right">
            <a
              href="/forgot-password"
              className="text-sm text-yellow-500 hover:underline"
            >
              Forgot Password?
            </a>
          </div>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-md transition ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Sign In"}
          </motion.button>
        </motion.form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default SignIn;
