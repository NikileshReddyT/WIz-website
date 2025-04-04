import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout component wrapping Navbar and Footer
const Layout = ({ children }) => (
  <>
    <Navbar />
    <main className='pt-16'>{children}</main>
    <Footer />
  </>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  return (
    <Router>
      <ToastContainer />
      <div className='min-h-screen bg-gradient-to-b from-white to-gray-50'>
        <Routes>
          {/* Public routes with Layout */}
          <Route
            path='/'
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path='/about'
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path='/services'
            element={
              <Layout>
                <Services />
              </Layout>
            }
          />
          <Route
            path='/contact'
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />
          <Route
            path='/signin'
            element={
              <Layout>
                <SignIn setIsAuthenticated={setIsAuthenticated} />
              </Layout>
            }
          />
          <Route
            path='/signup'
            element={
              <Layout>
                <SignUp setIsAuthenticated={setIsAuthenticated} />
              </Layout>
            }
          />

          {/* Protected Dashboard Route without Layout */}
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard setIsAuthenticated={setIsAuthenticated} />
              </ProtectedRoute>
            }
          />

          {/* Optional: Redirect any other path to home or a 404 page */}
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
