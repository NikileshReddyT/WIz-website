import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

function Dashboard({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID") || "UnknownUser";

  // For toggling Team and Wallet sub-menus in the sidebar
  const [teamOpen, setTeamOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userID");
    setIsAuthenticated(false);
    navigate("/signin");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#020B2D] to-[#010821] relative">
      {/* ======= Decorative Animated Circles ======= */}
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

      {/* ======= Top Navigation Bar ======= */}
      <header className="flex items-center justify-between bg-gray-900 px-6 py-3 shadow z-10">
        <h1 className="text-xl text-yellow-500 font-bold">HAL WELFARE ASSOCIATES</h1>
        <nav className="hidden md:flex items-center space-x-6 text-gray-300">
          <a href="#!" className="hover:text-yellow-500 transition">
            Dashboard
          </a>
          <a href="#!" className="hover:text-yellow-500 transition">
            Team
          </a>
          <a href="#!" className="hover:text-yellow-500 transition">
            Wallet
          </a>
          <a href="#!" className="hover:text-yellow-500 transition">
            Incomes
          </a>
          <a href="#!" className="hover:text-yellow-500 transition">
            Transactions
          </a>
        </nav>
        <div className="text-gray-300 text-sm hidden md:block">
          Logged in as <span className="text-yellow-500">{userID}</span>
        </div>
      </header>

      {/* ======= Main Layout ======= */}
      <div className="flex flex-1 overflow-hidden">
        {/* ======= Left Sidebar ======= */}
        <aside className="w-64 bg-gray-900 text-gray-300 flex flex-col">
          <div className="p-4 border-b border-gray-800 text-lg font-bold">
            Menu
          </div>
          <nav className="flex-1 overflow-auto p-4 space-y-2">
            <a
              href="#!"
              className="block py-2 px-3 rounded hover:bg-gray-800 transition"
            >
              Home
            </a>
            <a
              href="#!"
              className="block py-2 px-3 rounded hover:bg-gray-800 transition"
            >
              Refer Now
            </a>

            {/* Team Menu */}
            <div>
              <button
                onClick={() => setTeamOpen(!teamOpen)}
                className="w-full flex items-center justify-between py-2 px-3 rounded hover:bg-gray-800 transition"
              >
                <span>Team</span>
                {teamOpen ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {teamOpen && (
                <div className="pl-6 mt-1 space-y-1">
                  <a
                    href="#!"
                    className="block py-1 px-3 rounded hover:bg-gray-800 text-sm"
                  >
                    Direct Referrals
                  </a>
                  <a
                    href="#!"
                    className="block py-1 px-3 rounded hover:bg-gray-800 text-sm"
                  >
                    Left Team
                  </a>
                  <a
                    href="#!"
                    className="block py-1 px-3 rounded hover:bg-gray-800 text-sm"
                  >
                    Right Team
                  </a>
                  <a
                    href="#!"
                    className="block py-1 px-3 rounded hover:bg-gray-800 text-sm"
                  >
                    Tree View
                  </a>
                </div>
              )}
            </div>

            {/* Wallet Menu */}
            <div>
              <button
                onClick={() => setWalletOpen(!walletOpen)}
                className="w-full flex items-center justify-between py-2 px-3 rounded hover:bg-gray-800 transition"
              >
                <span>Wallet</span>
                {walletOpen ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {walletOpen && (
                <div className="pl-6 mt-1 space-y-1">
                  <a
                    href="#!"
                    className="block py-1 px-3 rounded hover:bg-gray-800 text-sm"
                  >
                    Deposit
                  </a>
                  <a
                    href="#!"
                    className="block py-1 px-3 rounded hover:bg-gray-800 text-sm"
                  >
                    Topup
                  </a>
                  <a
                    href="#!"
                    className="block py-1 px-3 rounded hover:bg-gray-800 text-sm"
                  >
                    Transfer
                  </a>
                  <a
                    href="#!"
                    className="block py-1 px-3 rounded hover:bg-gray-800 text-sm"
                  >
                    Withdraw
                  </a>
                </div>
              )}
            </div>

            <a
              href="#!"
              className="block py-2 px-3 rounded hover:bg-gray-800 transition"
            >
              Incomes
            </a>
            <a
              href="#!"
              className="block py-2 px-3 rounded hover:bg-gray-800 transition"
            >
              Transactions
            </a>
          </nav>

          {/* Footer Section (Sidebar) */}
          <div className="p-4 border-t border-gray-800 space-y-2">
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
            >
              Contact on WhatsApp
            </a>
            <button
              onClick={handleSignOut}
              className="block w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded transition"
            >
              Sign Out
            </button>
          </div>
        </aside>

        {/* ======= Main Content ======= */}
        <main className="flex-1 bg-gray-100 overflow-auto">
          {/* Page Header */}
          <div className="p-6 border-b border-gray-300 bg-white shadow">
            <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
            <p className="text-gray-500">Welcome back, {userID}!</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Top Row Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Package Card */}
              <motion.div
                className="bg-white shadow rounded p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  Package
                </h3>
                <p className="text-2xl text-blue-600">P0</p>
              </motion.div>

              {/* Referral Links Card */}
              <motion.div
                className="bg-white shadow rounded p-6 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  Your Referral Links
                </h3>
                <button className="mb-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                  Copy Left Referral Link
                </button>
                <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                  Copy Right Referral Link
                </button>
              </motion.div>

              {/* Wallet Card */}
              <motion.div
                className="bg-white shadow rounded p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  Wallet
                </h3>
                <p className="text-xl text-gray-800">
                  Your Earning Wallet:{" "}
                  <span className="font-bold text-green-600">₹ 5000</span>
                </p>
              </motion.div>
            </div>

            {/* Activities Section */}
            <motion.div
              className="bg-white shadow rounded p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Activities
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <p className="text-sm text-gray-500">Total Business</p>
                  <p className="text-xl font-semibold text-blue-600">₹ 10,000</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Today Business</p>
                  <p className="text-xl font-semibold text-blue-600">₹ 2,000</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Right Team</p>
                  <p className="text-xl font-semibold text-blue-600">50</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Left Team</p>
                  <p className="text-xl font-semibold text-blue-600">45</p>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
