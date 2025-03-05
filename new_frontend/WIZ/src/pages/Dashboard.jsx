import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaHome, FaUsers, FaWallet, FaChartBar, FaExchangeAlt, FaPowerOff } from "react-icons/fa";
import { MdGroupWork } from "react-icons/md";

function Dashboard({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID") || "UnknownUser";
  const userEmail = localStorage.getItem("userEmail") || "UnknownEmail";
  const userRole = localStorage.getItem("userRole") || "UnknownRole";
  console.log("User ID:", userID);
  console.log("User Email:", userEmail);
  console.log("User Role:", userRole);
  // State for referral link
  const [referralLink, setReferralLink] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // For toggling Team, Wallet, and Power Team sub-menus in the sidebar
  const [teamOpen, setTeamOpen] = useState(false);
  const [levelWiseOpen, setLevelWiseOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [powerTeamOpen, setPowerTeamOpen] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userID");
    setIsAuthenticated(false);
    navigate("/signin");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setToastMessage("Referral link copied!");
    setShowToast(true);
  };

  const handleMenuClick = (event) => {
    const availableComponents = [
      "Home",
      "Refer Now",
      "Direct Referrals",
      "Level Wise",
      "Total Team",
      "Total Business",
      "Tree View",
      "Deposit",
      "Topup",
      "Transfer",
      "Withdraw",
      "Incomes",
      "Transactions",
      "50% Business Count",
      "One Leg Power Team",
      "Other Leg 50% Business",
    ];

    const clickedElement = event.target.closest("a, button");
    if (clickedElement) {
      const textContent = clickedElement.textContent.trim();
      if (!availableComponents.includes(textContent)) {
        event.preventDefault(); // Prevent navigation
        setToastMessage("Feature coming soon!");
        setShowToast(true);
      }
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000); // Hide toast after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showToast]);

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
        <aside className="w-64 bg-gray-900 text-gray-300 flex flex-col" onClick={handleMenuClick}>
          <div className="p-4 border-b border-gray-800 text-lg font-bold">
            Menu
          </div>
          <nav className="flex-1 overflow-auto p-4 space-y-2">
            <a
              href="#!"
              className="block py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition"
            >
              <FaHome />
              <span>Home</span>
            </a>
            <a
              href="#!"
              className="block py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition"
            >
              <FaChartBar />
              <span>Refer Now</span>
            </a>

            {/* Team Menu */}
            <div>
              <button
                onClick={() => setTeamOpen(!teamOpen)}
                className="w-full flex items-center justify-between py-2 px-3 rounded hover:bg-gray-800 transition"
              >
                <span className="flex items-center space-x-2">
                  <FaUsers />
                  <span>Team</span>
                </span>
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
                  <button
                    onClick={() => setLevelWiseOpen(!levelWiseOpen)}
                    className="w-full flex items-center justify-between py-1 px-3 rounded hover:bg-gray-800 text-sm transition"
                  >
                    <span>Level Wise</span>
                    {levelWiseOpen ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  {levelWiseOpen && (
                    <div className="pl-6 mt-1 space-y-1">
                      <a
                        href="#!"
                        className="block py-1 px-3 rounded hover:bg-gray-800 text-sm"
                      >
                        Total Team
                      </a>
                      <a
                        href="#!"
                        className="block py-1 px-3 rounded hover:bg-gray-800 text-sm"
                      >
                        Total Business
                      </a>
                    </div>
                  )}
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
                <span className="flex items-center space-x-2">
                  <FaWallet />
                  <span>Wallet</span>
                </span>
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
              className="block py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition"
            >
              <FaExchangeAlt />
              <span>Incomes</span>
            </a>
            <a
              href="#!"
              className="block py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition"
            >
              <FaExchangeAlt />
              <span>Transactions</span>
            </a>

            {/* Power Team Menu */}
            <div>
              <button
                onClick={() => setPowerTeamOpen(!powerTeamOpen)}
                className="w-full flex items-center justify-between py-2 px-3 rounded hover:bg-gray-800 transition"
              >
                <span className="flex items-center space-x-2">
                  <MdGroupWork />
                  <span>Power Team</span>
                </span>
                {powerTeamOpen ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {powerTeamOpen && (
                <div className="pl-6 mt-1 space-y-1">
                  <a
                    href="#!"
                    className="block py-1 px-3 rounded hover:bg-gray-800 text-sm"
                  >
                    50% Business Count
                  </a>
                  <a
                    href="#!"
                    className="block py-1 px-3 rounded hover:bg-gray-800 text-sm"
                  >
                    One Leg Power Team
                  </a>
                  <a
                    href="#!"
                    className="block py-1 px-3 rounded hover:bg-gray-800 text-sm"
                  >
                    Other Leg 50% Business
                  </a>
                </div>
              )}
            </div>
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
                <p className="text-2xl text-blue-600">₹0</p>
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
                {!referralLink ? (
                  <button
                    onClick={() => setReferralLink(`https://referral.app/${userID}`)}
                    className="mb-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                  >
                    Generate Referral Link
                  </button>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{referralLink}</p>
                    <button
                      onClick={copyToClipboard}
                      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                    >
                      Copy Referral Link
                    </button>
                  </div>
                )}
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

      {/* Toast Message */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded shadow">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
