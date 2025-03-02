import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // Check localStorage for initial authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  return (
    <Router>
      {/* We include ToastContainer once at the root level */}
      <ToastContainer />

      {/* Overall background: white with a subtle light-gradient */}
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />

            {/* Pass setIsAuthenticated to SignIn & SignUp */}
            <Route
              path="/signin"
              element={<SignIn setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/signup"
              element={<SignUp setIsAuthenticated={setIsAuthenticated} />}
            />

            {/* Protected Dashboard Route */}
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard setIsAuthenticated={setIsAuthenticated} />
                ) : (
                  <Navigate to="/signin" />
                )
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
