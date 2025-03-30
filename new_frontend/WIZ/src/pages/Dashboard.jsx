import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronUp, FiMenu, FiX } from "react-icons/fi";
import {
  FaHome,
  FaUsers,
  FaWallet,
  FaChartBar,
  FaExchangeAlt,
  FaUserPlus,
  FaTree,
  FaMoneyBillWave,
  FaHistory,
  FaUserFriends,
  FaChartLine,
  FaUserShield,
} from "react-icons/fa";
import { MdGroupWork, MdAccountBalance } from "react-icons/md";
import axios from "axios";

function Dashboard({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID") || "UnknownUser";
  const userEmail = localStorage.getItem("userEmail") || "UnknownEmail";
  const userRole = localStorage.getItem("userRole") || "USER";
  const token = localStorage.getItem("token");

  // State for toggling sub-menus
  const [teamOpen, setTeamOpen] = useState(false);
  const [levelWiseOpen, setLevelWiseOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [powerTeamOpen, setPowerTeamOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [activeComponent, setActiveComponent] = useState("Home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userID");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/signin");
  };

  // Fetch user list for admin
  useEffect(() => {
    if (userRole === "ADMIN") {
      axios
        .get("https://wiz-website-production.up.railway.app/api/users", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
        .then((res) => {
          console.log("API Response for /api/users:", res.data);
          // Ensure the response data is an array before setting state
          if (Array.isArray(res.data)) {
            setUsers(res.data);
          } else {
            console.error(
              "API response for /api/users is not an array:",
              res.data
            );
            setUsers([]); // Reset to empty array if data is not as expected
            setToastMessage("Received invalid user data format from server.");
            setShowToast(true);
          }
        })
        .catch((err) => {
          console.error("Error fetching users:", err);
          // Check if the error is CORS related even if status code isn't explicit
          if (
            err.message.toLowerCase().includes("network error") ||
            err.code === "ERR_NETWORK"
          ) {
            setToastMessage("Network error or CORS issue fetching users.");
          } else if (err.response) {
            // Handle specific HTTP error statuses
            setToastMessage(
              `Failed to fetch users: ${err.response.status} ${err.response.statusText}`
            );
          } else {
            setToastMessage("Failed to fetch users data.");
          }
          setShowToast(true);
          setUsers([]); // Ensure users is an empty array on error
        });
    }
  }, [userRole, token]);

  // Hide toast automatically
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth < 768 && isSidebarOpen) {
        const sidebar = document.getElementById("sidebar");
        const toggleButton = document.getElementById("sidebar-toggle");
        if (
          sidebar &&
          !sidebar.contains(event.target) &&
          !toggleButton?.contains(event.target)
        ) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  // Close sidebar on mobile when selecting a menu item
  const handleMenuClick = (component) => {
    setActiveComponent(component);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const renderContent = () => {
    switch (activeComponent) {
      case "Home":
        return (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <motion.div className='bg-white shadow rounded p-6'>
              <h3 className='text-lg font-semibold mb-2 text-gray-700'>
                Welcome
              </h3>
              <p className='text-gray-600'>Hello, {userEmail}</p>
              <p className='text-gray-600'>Role: {userRole}</p>
            </motion.div>
            {userRole === "USER" && (
              <>
                <motion.div className='bg-white shadow rounded p-6'>
                  <h3 className='text-lg font-semibold mb-2 text-gray-700'>
                    Package
                  </h3>
                  <p className='text-2xl text-blue-600'>₹0</p>
                </motion.div>
                <motion.div className='bg-white shadow rounded p-6'>
                  <h3 className='text-lg font-semibold mb-2 text-gray-700'>
                    Wallet
                  </h3>
                  <p className='text-2xl text-green-500'>₹0.00</p>
                </motion.div>
              </>
            )}
          </div>
        );
      case "Manage Users":
        return (
          <div className='bg-white shadow rounded p-6'>
            <h3 className='text-lg font-semibold mb-4 text-gray-700'>
              User Management
            </h3>
            <div className='overflow-x-auto'>
              <div className='min-w-full inline-block align-middle'>
                <div className='overflow-hidden'>
                  <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          ID
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Name
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Username
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Email
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Phone
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Role
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                      {users.map((user) => (
                        <tr key={user.id} className='hover:bg-gray-50'>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                            {user.id}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                            {user.name}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                            {user.username}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                            {user.email}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                            {user.phone}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                            {user.role}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2'>
                            <button className='text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded-md'>
                              Edit
                            </button>
                            <button className='text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded-md'>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      case "Refer Now":
        return (
          <div className='bg-white shadow rounded p-6'>
            <h3 className='text-lg font-semibold mb-4 text-gray-700'>
              Referral Program
            </h3>
            <div className='space-y-4'>
              <p className='text-gray-600'>Your Referral Link:</p>
              <div className='flex items-center space-x-2'>
                <input
                  type='text'
                  readOnly
                  value={`https://referral.app/${userID}`}
                  className='flex-1 p-2 border rounded'
                />
                <button className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition'>
                  Copy
                </button>
              </div>
            </div>
          </div>
        );
      case "Direct Referrals":
        return (
          <div className='bg-white shadow rounded p-6'>
            <h3 className='text-lg font-semibold mb-4 text-gray-700'>
              Direct Referrals
            </h3>
            <p className='text-gray-600'>
              Your direct referral list will appear here.
            </p>
          </div>
        );
      case "Level Wise":
        return (
          <div className='bg-white shadow rounded p-6'>
            <h3 className='text-lg font-semibold mb-4 text-gray-700'>
              Level Wise Team
            </h3>
            <p className='text-gray-600'>
              Your level-wise team structure will appear here.
            </p>
          </div>
        );
      case "Total Team":
        return (
          <div className='bg-white shadow rounded p-6'>
            <h3 className='text-lg font-semibold mb-4 text-gray-700'>
              Total Team
            </h3>
            <p className='text-gray-600'>
              Your complete team structure will appear here.
            </p>
          </div>
        );
      case "Total Business":
        return (
          <div className='bg-white shadow rounded p-6'>
            <h3 className='text-lg font-semibold mb-4 text-gray-700'>
              Total Business
            </h3>
            <p className='text-gray-600'>
              Your total business statistics will appear here.
            </p>
          </div>
        );
      case "Tree View":
        return (
          <div className='bg-white shadow rounded p-6'>
            <h3 className='text-lg font-semibold mb-4 text-gray-700'>
              Team Tree View
            </h3>
            <p className='text-gray-600'>
              Your team tree visualization will appear here.
            </p>
          </div>
        );
      case "Deposit":
        return (
          <div className='bg-white shadow rounded p-6'>
            <h3 className='text-lg font-semibold mb-4 text-gray-700'>
              Deposit Funds
            </h3>
            <p className='text-gray-600'>Deposit form will appear here.</p>
          </div>
        );
      case "Topup":
        return (
          <div className='bg-white shadow rounded p-6'>
            <h3 className='text-lg font-semibold mb-4 text-gray-700'>
              Top Up Wallet
            </h3>
            <p className='text-gray-600'>Top-up form will appear here.</p>
          </div>
        );
      case "Transfer":
        return (
          <div className='bg-white shadow rounded p-6'>
            <h3 className='text-lg font-semibold mb-4 text-gray-700'>
              Transfer Funds
            </h3>
            <p className='text-gray-600'>Transfer form will appear here.</p>
          </div>
        );
      case "Withdraw":
        return (
          <div className='bg-white shadow rounded p-6'>
            <h3 className='text-lg font-semibold mb-4 text-gray-700'>
              Withdraw Funds
            </h3>
            <p className='text-gray-600'>Withdrawal form will appear here.</p>
          </div>
        );
      case "Incomes":
        return (
          <div className='bg-white shadow rounded p-6'>
            <h3 className='text-lg font-semibold mb-4 text-gray-700'>
              Income Details
            </h3>
            <p className='text-gray-600'>
              Your income details will appear here.
            </p>
          </div>
        );
      case "Transactions":
        return (
          <div className='bg-white shadow rounded p-6'>
            <h3 className='text-lg font-semibold mb-4 text-gray-700'>
              Transaction History
            </h3>
            <p className='text-gray-600'>
              Your transaction history will appear here.
            </p>
          </div>
        );
      default:
        return <div>Select a menu item</div>;
    }
  };

  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-br from-[#020B2D] to-[#010821] relative'>
      {/* Decorative Animated Circles */}
      <motion.div
        className='absolute top-[-50px] left-[-50px] w-32 h-32 bg-yellow-500/20 rounded-full blur-2xl'
        animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className='absolute bottom-[-50px] right-[-50px] w-40 h-40 bg-green-500/20 rounded-full blur-2xl'
        animate={{ x: [0, -20, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Layout */}
      <div className='flex flex-1 overflow-hidden'>
        {/* Mobile Toggle Button */}
        <button
          id='sidebar-toggle'
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className='md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition'
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside
              id='sidebar'
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 20 }}
              className='fixed md:relative w-64 bg-gray-900 text-gray-300 flex flex-col h-full z-40'
            >
              <div className='p-4 border-b border-gray-800 text-lg font-bold flex justify-between items-center'>
                <span>Menu</span>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className='md:hidden p-2 hover:bg-gray-800 rounded'
                >
                  <FiX size={20} />
                </button>
              </div>
              <nav className='flex-1 overflow-auto p-4 space-y-2'>
                {/* Common Menu Items */}
                <button
                  onClick={() => handleMenuClick("Home")}
                  className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                    activeComponent === "Home" ? "bg-gray-800" : ""
                  }`}
                >
                  <FaHome />
                  <span>Home</span>
                </button>

                {/* User-specific Menu Items */}
                {userRole === "USER" && (
                  <>
                    <button
                      onClick={() => handleMenuClick("Refer Now")}
                      className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                        activeComponent === "Refer Now" ? "bg-gray-800" : ""
                      }`}
                    >
                      <FaUserPlus />
                      <span>Refer Now</span>
                    </button>

                    {/* Team Section */}
                    <div>
                      <button
                        onClick={() => setTeamOpen(!teamOpen)}
                        className='w-full text-left py-2 px-3 rounded flex items-center justify-between hover:bg-gray-800 transition'
                      >
                        <div className='flex items-center space-x-2'>
                          <FaUserFriends />
                          <span>Team</span>
                        </div>
                        {teamOpen ? <FiChevronUp /> : <FiChevronDown />}
                      </button>
                      {teamOpen && (
                        <div className='ml-4 space-y-2 mt-2'>
                          <button
                            onClick={() => handleMenuClick("Direct Referrals")}
                            className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                              activeComponent === "Direct Referrals"
                                ? "bg-gray-800"
                                : ""
                            }`}
                          >
                            <span>Direct Referrals</span>
                          </button>
                          <button
                            onClick={() => handleMenuClick("Level Wise")}
                            className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                              activeComponent === "Level Wise"
                                ? "bg-gray-800"
                                : ""
                            }`}
                          >
                            <span>Level Wise</span>
                          </button>
                          <button
                            onClick={() => handleMenuClick("Total Team")}
                            className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                              activeComponent === "Total Team"
                                ? "bg-gray-800"
                                : ""
                            }`}
                          >
                            <span>Total Team</span>
                          </button>
                          <button
                            onClick={() => handleMenuClick("Tree View")}
                            className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                              activeComponent === "Tree View"
                                ? "bg-gray-800"
                                : ""
                            }`}
                          >
                            <span>Tree View</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Business Section */}
                    <div>
                      <button
                        onClick={() => setLevelWiseOpen(!levelWiseOpen)}
                        className='w-full text-left py-2 px-3 rounded flex items-center justify-between hover:bg-gray-800 transition'
                      >
                        <div className='flex items-center space-x-2'>
                          <FaChartBar />
                          <span>Business</span>
                        </div>
                        {levelWiseOpen ? <FiChevronUp /> : <FiChevronDown />}
                      </button>
                      {levelWiseOpen && (
                        <div className='ml-4 space-y-2 mt-2'>
                          <button
                            onClick={() => handleMenuClick("Total Business")}
                            className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                              activeComponent === "Total Business"
                                ? "bg-gray-800"
                                : ""
                            }`}
                          >
                            <span>Total Business</span>
                          </button>
                          <button
                            onClick={() =>
                              handleMenuClick("50% Business Count")
                            }
                            className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                              activeComponent === "50% Business Count"
                                ? "bg-gray-800"
                                : ""
                            }`}
                          >
                            <span>50% Business Count</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Wallet Section */}
                    <div>
                      <button
                        onClick={() => setWalletOpen(!walletOpen)}
                        className='w-full text-left py-2 px-3 rounded flex items-center justify-between hover:bg-gray-800 transition'
                      >
                        <div className='flex items-center space-x-2'>
                          <FaWallet />
                          <span>Wallet</span>
                        </div>
                        {walletOpen ? <FiChevronUp /> : <FiChevronDown />}
                      </button>
                      {walletOpen && (
                        <div className='ml-4 space-y-2 mt-2'>
                          <button
                            onClick={() => handleMenuClick("Deposit")}
                            className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                              activeComponent === "Deposit" ? "bg-gray-800" : ""
                            }`}
                          >
                            <span>Deposit</span>
                          </button>
                          <button
                            onClick={() => handleMenuClick("Topup")}
                            className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                              activeComponent === "Topup" ? "bg-gray-800" : ""
                            }`}
                          >
                            <span>Topup</span>
                          </button>
                          <button
                            onClick={() => handleMenuClick("Transfer")}
                            className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                              activeComponent === "Transfer"
                                ? "bg-gray-800"
                                : ""
                            }`}
                          >
                            <span>Transfer</span>
                          </button>
                          <button
                            onClick={() => handleMenuClick("Withdraw")}
                            className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                              activeComponent === "Withdraw"
                                ? "bg-gray-800"
                                : ""
                            }`}
                          >
                            <span>Withdraw</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Income Section */}
                    <div>
                      <button
                        onClick={() => setPowerTeamOpen(!powerTeamOpen)}
                        className='w-full text-left py-2 px-3 rounded flex items-center justify-between hover:bg-gray-800 transition'
                      >
                        <div className='flex items-center space-x-2'>
                          <FaMoneyBillWave />
                          <span>Income</span>
                        </div>
                        {powerTeamOpen ? <FiChevronUp /> : <FiChevronDown />}
                      </button>
                      {powerTeamOpen && (
                        <div className='ml-4 space-y-2 mt-2'>
                          <button
                            onClick={() => handleMenuClick("Incomes")}
                            className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                              activeComponent === "Incomes" ? "bg-gray-800" : ""
                            }`}
                          >
                            <span>Incomes</span>
                          </button>
                          <button
                            onClick={() => handleMenuClick("Transactions")}
                            className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                              activeComponent === "Transactions"
                                ? "bg-gray-800"
                                : ""
                            }`}
                          >
                            <span>Transactions</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Admin-specific Menu Items */}
                {userRole === "ADMIN" && (
                  <>
                    <button
                      onClick={() => handleMenuClick("Manage Users")}
                      className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                        activeComponent === "Manage Users" ? "bg-gray-800" : ""
                      }`}
                    >
                      <FaUsers />
                      <span>Manage Users</span>
                    </button>
                    <button
                      onClick={() => handleMenuClick("Total Business")}
                      className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                        activeComponent === "Total Business"
                          ? "bg-gray-800"
                          : ""
                      }`}
                    >
                      <FaChartLine />
                      <span>Business Overview</span>
                    </button>
                    <button
                      onClick={() => handleMenuClick("Transactions")}
                      className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                        activeComponent === "Transactions" ? "bg-gray-800" : ""
                      }`}
                    >
                      <FaHistory />
                      <span>All Transactions</span>
                    </button>
                  </>
                )}
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className='flex-1 bg-gray-100 overflow-auto'>
          <div className='p-6 border-b border-gray-300 bg-white shadow flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mt-16 md:mt-0'>
            <div>
              <h2 className='text-2xl font-semibold text-gray-800'>
                Dashboard
              </h2>
              <p className='text-gray-500'>Welcome back, {userEmail}!</p>
              <p className='text-gray-500'>Your role: {userRole}</p>
            </div>
            <button
              onClick={handleSignOut}
              className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition w-full md:w-auto'
            >
              Sign Out
            </button>
          </div>
          <div className='p-4 md:p-6'>{renderContent()}</div>
        </main>
      </div>

      {/* Toast Message */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className='fixed bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded shadow z-50'
        >
          {toastMessage}
        </motion.div>
      )}

      {/* Mobile Overlay */}
      {isSidebarOpen && window.innerWidth < 768 && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-30' />
      )}
    </div>
  );
}

export default Dashboard;
