import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaHome, FaUsers, FaWallet, FaChartBar, FaExchangeAlt } from "react-icons/fa";
import { MdGroupWork } from "react-icons/md";
import axios from "axios";

function Dashboard({ setIsAuthenticated }) {
  const navigate = useNavigate();
  // Retrieve user details from localStorage
  const userID = localStorage.getItem("userID") || "UnknownUser";
  const userEmail = localStorage.getItem("userEmail") || "UnknownEmail";
  const userRole = localStorage.getItem("userRole") || "USER"; // default to USER

  console.log("User ID:", userID);
  console.log("User Email:", userEmail);
  console.log("User Role:", userRole);

  // Referral link state (for normal users)
  const [referralLink, setReferralLink] = useState("");
  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // State for toggling sub-menus in the sidebar
  const [teamOpen, setTeamOpen] = useState(false);
  const [levelWiseOpen, setLevelWiseOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [powerTeamOpen, setPowerTeamOpen] = useState(false);

  // State for admin user list
  const [users, setUsers] = useState([]);

  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userID");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
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
        event.preventDefault();
        setToastMessage("Feature coming soon!");
        setShowToast(true);
      }
    }
  };

  // Fetch user list if logged in user is ADMIN
  useEffect(() => {
    if (userRole === "ADMIN") {
      axios
        .get("http://localhost:8080/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => {
          console.error("Error fetching users:", err);
          setToastMessage("Failed to fetch users data.");
          setShowToast(true);
        });
    }
  }, [userRole]);

  // Hide toast automatically
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#020B2D] to-[#010821] relative">
      {/* Decorative Animated Circles */}
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

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-gray-300 flex flex-col" onClick={handleMenuClick}>
          <div className="p-4 border-b border-gray-800 text-lg font-bold">Menu</div>
          <nav className="flex-1 overflow-auto p-4 space-y-2">
            <a
              href="#!"
              className="block py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition"
            >
              <FaHome />
              <span>Home</span>
            </a>
            {userRole === "USER" && (
              <a
                href="#!"
                className="block py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition"
              >
                <FaChartBar />
                <span>Refer Now</span>
              </a>
            )}
            {userRole === "ADMIN" && (
              <>
                <a
                  href="#!"
                  className="block py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition"
                >
                  <FaUsers />
                  <span>Manage Users</span>
                </a>
                {/* Add more admin-specific menu items as needed */}
              </>
            )}
            {/* Additional menu items common to both roles */}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 overflow-auto">
          <div className="p-6 border-b border-gray-300 bg-white shadow flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
              <p className="text-gray-500">Welcome back, {userEmail}!</p>
              <p className="text-gray-500">Your role: {userRole}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
            >
              Sign Out
            </button>
          </div>
          <div className="p-6 space-y-6">
            {userRole === "USER" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div
                    className="bg-white shadow rounded p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Package</h3>
                    <p className="text-2xl text-blue-600">₹0</p>
                  </motion.div>
                  <motion.div
                    className="bg-white shadow rounded p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Your Referral Links</h3>
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
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Wallet</h3>
                    <p className="text-2xl text-green-500">₹0.00</p>
                  </motion.div>
                </div>
              </>
            )}
            {userRole === "ADMIN" && (
              <div className="space-y-6">
                <div className="bg-white shadow rounded p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-700">Admin Panel</h3>
                  <p className="text-gray-600">Total Users: {users.length}</p>
                </div>
                <div className="bg-white shadow rounded p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-700">User List</h3>
                  {users.length === 0 ? (
                    <p className="text-gray-600">No users found.</p>
                  ) : (
                    <table className="min-w-full table-auto">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="px-4 py-2">ID</th>
                          <th className="px-4 py-2">Name</th>
                          <th className="px-4 py-2">Username</th>
                          <th className="px-4 py-2">Email</th>
                          <th className="px-4 py-2">Phone</th>
                          <th className="px-4 py-2">Role</th>
                          <th className="px-4 py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="border-t">
                            <td className="px-4 py-2">{user.id}</td>
                            <td className="px-4 py-2">{user.name}</td>
                            <td className="px-4 py-2">{user.username}</td>
                            <td className="px-4 py-2">{user.email}</td>
                            <td className="px-4 py-2">{user.phone}</td>
                            <td className="px-4 py-2">{user.role}</td>
                            <td className="px-4 py-2">
                              <button
                                onClick={() => alert(`Edit user ${user.id} functionality coming soon!`)}
                                className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition text-sm"
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}
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
