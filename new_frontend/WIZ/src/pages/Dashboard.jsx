import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronDown,
  FiChevronUp,
  FiMenu,
  FiX,
  FiLoader,
} from "react-icons/fi";
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
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import { MdGroupWork, MdAccountBalance } from "react-icons/md";
import axios from "axios";

// --- Reusable Components ---

// Sidebar Item Button
const SidebarButton = ({
  icon,
  label,
  onClick,
  isActive,
  hasSubmenu = false,
  isOpen = false,
}) => (
  <button
    onClick={onClick}
    className={`w-full text-left py-2.5 px-4 rounded-md flex items-center justify-between text-sm transition-colors duration-200 ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-gray-100"
    }`}
  >
    <div className="flex items-center space-x-3">
      {icon && React.createElement(icon, { className: "w-5 h-5" })}
      <span>{label}</span>
    </div>
    {hasSubmenu && (isOpen ? <FiChevronUp /> : <FiChevronDown />)}
  </button>
);

// Sidebar Sub-Item Button
const SidebarSubButton = ({ label, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`w-full text-left py-2 pl-11 pr-4 rounded-md flex items-center space-x-3 text-sm transition-colors duration-200 ${
      isActive
        ? "bg-gray-700 text-white"
        : "text-gray-400 hover:bg-gray-700 hover:text-gray-100"
    }`}
  >
    <span>{label}</span>
  </button>
);

// Simple Card Component
const InfoCard = ({ title, value, icon, colorClass = "text-gray-700" }) => (
  <motion.div
    className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4 border border-gray-200"
    whileHover={{
      y: -4,
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <div className={`p-3 rounded-full bg-opacity-10 ${colorClass.replace("text-", "bg-")}`}>
      {icon && React.createElement(icon, { className: `w-6 h-6 ${colorClass}` })}
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
        {title}
      </h3>
      <p className={`text-xl md:text-2xl font-semibold ${colorClass}`}>
        {value}
      </p>
    </div>
  </motion.div>
);

// Loading Indicator
const LoadingSpinner = ({ text = "Loading..." }) => (
  <div className="flex flex-col justify-center items-center h-40 text-gray-500">
    <FiLoader className="animate-spin h-8 w-8 mb-3 text-blue-600" />
    <span>{text}</span>
  </div>
);

// --- Main Dashboard Component ---

function Dashboard({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID") || "UnknownUser";
  const userEmail = localStorage.getItem("userEmail") || "UnknownEmail";
  const userRole = localStorage.getItem("userRole") || "USER";
  const token = localStorage.getItem("token");

  const [activeComponent, setActiveComponent] = useState("Home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [openMenus, setOpenMenus] = useState({
    team: false,
    business: false,
    wallet: false,
    income: false,
  });
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  // --- Effects ---
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth < 1024 && isSidebarOpen) {
        const sidebar = document.getElementById("sidebar");
        const toggleButton = document.getElementById("sidebar-toggle");
        if (
          sidebar &&
          !sidebar.contains(event.target) &&
          toggleButton &&
          !toggleButton.contains(event.target)
        ) {
          setIsSidebarOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  const fetchUsers = useCallback(() => {
    if (userRole === "ADMIN") {
      setIsLoadingUsers(true);
      axios
        .get("https://wiz-website-production.up.railway.app/api/users", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
        .then((res) => {
          console.log("API Response for /api/users:", res.data);
          if (Array.isArray(res.data)) {
            setUsers(res.data);
          } else {
            console.error("API response for /api/users is not an array:", res.data);
            setUsers([]);
            setToastMessage("Received invalid user data format from server.");
            setShowToast(true);
          }
        })
        .catch((err) => {
          console.error("Error fetching users:", err);
          let message = "Failed to fetch users data.";
          if (
            err.message.toLowerCase().includes("network error") ||
            err.code === "ERR_NETWORK"
          ) {
            message = "Network error or CORS issue fetching users.";
          } else if (err.response) {
            message = `Failed to fetch users: ${err.response.status} ${err.response.statusText}`;
          }
          setToastMessage(message);
          setShowToast(true);
          setUsers([]);
        })
        .finally(() => {
          setIsLoadingUsers(false);
        });
    }
  }, [userRole, token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // --- Handlers ---
  const handleSignOut = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate("/signin");
  };

  const handleMenuClick = (component) => {
    setActiveComponent(component);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
    if (component === "Manage Users") {
      fetchUsers();
    }
  };

  // --- Render Logic ---
  const ContentWrapper = ({ children, title }) => (
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
        {title}
      </h2>
      {children}
    </div>
  );

  const renderContent = () => {
    switch (activeComponent) {
      case "Home":
        return (
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-6 sm:p-10 text-white shadow-md">
              <h1 className="text-2xl sm:text-3xl font-bold">
                Welcome back!
              </h1>
              <p className="mt-2 text-sm sm:text-base">
                Here’s a quick overview of your dashboard. Explore the sections using the sidebar.
              </p>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
              <InfoCard
                title="Your Role"
                value={userRole}
                icon={FaUserShield}
                colorClass="text-purple-600"
              />
              {userRole === "USER" && (
                <>
                  <InfoCard
                    title="Current Package"
                    value="₹0"
                    icon={MdGroupWork}
                    colorClass="text-indigo-600"
                  />
                  <InfoCard
                    title="Wallet Balance"
                    value="₹0.00"
                    icon={FaWallet}
                    colorClass="text-green-600"
                  />
                </>
              )}
              {userRole === "ADMIN" && (
                <InfoCard
                  title="Total Users"
                  value={isLoadingUsers ? "Loading..." : users.length}
                  icon={FaUsers}
                  colorClass="text-teal-600"
                />
              )}
            </div>

            {/* Getting Started Section */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Let’s Get Started!
              </h2>
              <p className="text-gray-600 mb-4">
                Use the sidebar to navigate through different sections. Manage your account or check your referrals.
              </p>
              <button
                onClick={() =>
                  handleMenuClick(userRole === "ADMIN" ? "Manage Users" : "Refer Now")
                }
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {userRole === "ADMIN" ? "Manage Users" : "Refer a Friend"}
              </button>
            </div>
          </div>
        );

      case "Profile":
        return (
          <ContentWrapper title="Your Profile">
            <div className="space-y-4">
              <div>
                <strong>User ID:</strong> {userID}
              </div>
              <div>
                <strong>Email:</strong> {userEmail}
              </div>
              <div>
                <strong>Role:</strong> {userRole}
              </div>
            </div>
          </ContentWrapper>
        );

      case "Manage Users":
        return (
          <ContentWrapper title="User Management">
            {isLoadingUsers ? (
              <LoadingSpinner text="Fetching Users..." />
            ) : users.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No users found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "ID",
                        "Name",
                        "Username",
                        "Email",
                        "Phone",
                        "Role",
                        "Actions",
                      ].map((header) => (
                        <th
                          key={header}
                          scope="col"
                          className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">
                          {user.id}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {user.name}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-600">
                          {user.username}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-600">
                          {user.email}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-600">
                          {user.phone}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-sm">
                          <span
                            className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.role === "ADMIN"
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                          <button
                            aria-label="Edit User"
                            className="text-indigo-600 hover:text-indigo-800 transition-colors duration-150 p-1"
                          >
                            <FaEdit size={16} />
                          </button>
                          <button
                            aria-label="Delete User"
                            className="text-red-600 hover:text-red-800 transition-colors duration-150 p-1"
                          >
                            <FaTrashAlt size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </ContentWrapper>
        );

      case "Refer Now":
        return (
          <ContentWrapper title="Referral Program">
            <p className="text-gray-600 mb-3">
              Share your unique link to invite others:
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="text"
                readOnly
                value={`https://referral.app/${userID}`}
                className="flex-grow p-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Referral Link"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`https://referral.app/${userID}`);
                  setToastMessage("Referral link copied!");
                  setShowToast(true);
                }}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex-shrink-0"
              >
                Copy Link
              </button>
            </div>
          </ContentWrapper>
        );

      default:
        return (
          <ContentWrapper title={activeComponent}>
            <p className="text-gray-500">Content for this section will be available soon.</p>
          </ContentWrapper>
        );
    }
  };

  // --- JSX Return ---
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-gray-300 flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:inset-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <div className="flex items-center justify-between px-4 py-5 border-b border-gray-700 min-h-[64px]">
          <span className="text-lg font-semibold text-white">WIZ Dashboard</span>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
            aria-label="Close sidebar"
          >
            <FiX size={24} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5">
          <SidebarButton
            icon={FaHome}
            label="Home"
            onClick={() => handleMenuClick("Home")}
            isActive={activeComponent === "Home"}
          />
          <SidebarButton
            icon={FaUserShield}
            label="Profile"
            onClick={() => handleMenuClick("Profile")}
            isActive={activeComponent === "Profile"}
          />
          {userRole === "USER" && (
            <>
              <SidebarButton
                icon={FaUserPlus}
                label="Refer Now"
                onClick={() => handleMenuClick("Refer Now")}
                isActive={activeComponent === "Refer Now"}
              />
              <SidebarButton
                icon={FaUserFriends}
                label="Team"
                hasSubmenu={true}
                isOpen={openMenus.team}
                onClick={() => toggleMenu("team")}
              />
              <AnimatePresence>
                {openMenus.team && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden ml-4 pl-4 border-l border-gray-700 space-y-1"
                  >
                    <SidebarSubButton
                      label="Direct Referrals"
                      onClick={() => handleMenuClick("Direct Referrals")}
                      isActive={activeComponent === "Direct Referrals"}
                    />
                    <SidebarSubButton
                      label="Level Wise"
                      onClick={() => handleMenuClick("Level Wise")}
                      isActive={activeComponent === "Level Wise"}
                    />
                    <SidebarSubButton
                      label="Total Team"
                      onClick={() => handleMenuClick("Total Team")}
                      isActive={activeComponent === "Total Team"}
                    />
                    <SidebarSubButton
                      label="Tree View"
                      onClick={() => handleMenuClick("Tree View")}
                      isActive={activeComponent === "Tree View"}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
          {userRole === "ADMIN" && (
            <>
              <SidebarButton
                icon={FaUsers}
                label="Manage Users"
                onClick={() => handleMenuClick("Manage Users")}
                isActive={activeComponent === "Manage Users"}
              />
              <SidebarButton
                icon={FaChartLine}
                label="Business Overview"
                onClick={() => handleMenuClick("Total Business")}
                isActive={activeComponent === "Total Business"}
              />
              <SidebarButton
                icon={FaHistory}
                label="All Transactions"
                onClick={() => handleMenuClick("Transactions")}
                isActive={activeComponent === "Transactions"}
              />
            </>
          )}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center flex-shrink-0">
              <button
                id="sidebar-toggle"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden mr-3 text-gray-600 hover:text-gray-900 p-1"
                aria-label="Open sidebar"
              >
                <FiMenu size={24} />
              </button>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                {activeComponent}
              </h1>
            </div>
            <div className="flex items-center justify-end flex-wrap gap-x-4 gap-y-1 flex-shrink-0">
              <span className="text-sm text-gray-600 hidden sm:inline text-right">
                {userEmail} ({userRole})
              </span>
              <button
                onClick={handleSignOut}
                className="bg-red-600 text-white py-1.5 px-3 sm:px-4 rounded-md hover:bg-red-700 transition duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex-shrink-0"
              >
                Sign Out
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-5 right-5 bg-gray-900 text-white py-2.5 px-5 rounded-lg shadow-lg z-50 text-sm"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dashboard;
