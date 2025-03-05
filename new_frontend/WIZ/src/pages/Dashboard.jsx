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
                    Level Wise
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
        </aside>

        {/* ======= Main Content ======= */}
        <main className="flex-1 bg-gray-100 overflow-auto">
          <div className="p-6 border-b border-gray-300 bg-white shadow flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
              <p className="text-gray-500">Welcome back, {userID}!</p>
            </div>
            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
            >
              Sign Out
            </button>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <motion.div
                className="bg-white shadow rounded p-6"
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
              <motion.div
                className="bg-white shadow rounded p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  Wallet
                </h3>
                <p className="text-2xl text-green-500">₹0.00</p>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
