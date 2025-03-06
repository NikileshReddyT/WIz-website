import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
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
  FaUserShield
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
      axios.get("http://localhost:8080/api/users", {
        headers: { Authorization: `Bearer ${token}` }
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
  }, [userRole, token]);

  // Hide toast automatically
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const renderContent = () => {
    switch (activeComponent) {
      case "Home":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div className="bg-white shadow rounded p-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Welcome</h3>
              <p className="text-gray-600">Hello, {userEmail}</p>
              <p className="text-gray-600">Role: {userRole}</p>
            </motion.div>
            {userRole === "USER" && (
              <>
                <motion.div className="bg-white shadow rounded p-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">Package</h3>
                  <p className="text-2xl text-blue-600">₹0</p>
                </motion.div>
                <motion.div className="bg-white shadow rounded p-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">Wallet</h3>
                  <p className="text-2xl text-green-500">₹0.00</p>
                </motion.div>
              </>
            )}
          </div>
        );
      case "Manage Users":
        return (
          <div className="bg-white shadow rounded p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">User Management</h3>
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
                      <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition text-sm mr-2">
                        Edit
                      </button>
                      <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition text-sm">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "Refer Now":
        return (
          <div className="bg-white shadow rounded p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Referral Program</h3>
            <div className="space-y-4">
              <p className="text-gray-600">Your Referral Link:</p>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  readOnly
                  value={`https://referral.app/${userID}`}
                  className="flex-1 p-2 border rounded"
                />
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                  Copy
                </button>
              </div>
            </div>
          </div>
        );
      case "Direct Referrals":
        return (
          <div className="bg-white shadow rounded p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Direct Referrals</h3>
            <p className="text-gray-600">Your direct referral list will appear here.</p>
          </div>
        );
      case "Level Wise":
        return (
          <div className="bg-white shadow rounded p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Level Wise Team</h3>
            <p className="text-gray-600">Your level-wise team structure will appear here.</p>
          </div>
        );
      case "Total Team":
        return (
          <div className="bg-white shadow rounded p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Total Team</h3>
            <p className="text-gray-600">Your complete team structure will appear here.</p>
          </div>
        );
      case "Total Business":
        return (
          <div className="bg-white shadow rounded p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Total Business</h3>
            <p className="text-gray-600">Your total business statistics will appear here.</p>
          </div>
        );
      case "Tree View":
        return (
          <div className="bg-white shadow rounded p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Team Tree View</h3>
            <p className="text-gray-600">Your team tree visualization will appear here.</p>
          </div>
        );
      case "Deposit":
        return (
          <div className="bg-white shadow rounded p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Deposit Funds</h3>
            <p className="text-gray-600">Deposit form will appear here.</p>
          </div>
        );
      case "Topup":
        return (
          <div className="bg-white shadow rounded p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Top Up Wallet</h3>
            <p className="text-gray-600">Top-up form will appear here.</p>
          </div>
        );
      case "Transfer":
        return (
          <div className="bg-white shadow rounded p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Transfer Funds</h3>
            <p className="text-gray-600">Transfer form will appear here.</p>
          </div>
        );
      case "Withdraw":
        return (
          <div className="bg-white shadow rounded p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Withdraw Funds</h3>
            <p className="text-gray-600">Withdrawal form will appear here.</p>
          </div>
        );
      case "Incomes":
        return (
          <div className="bg-white shadow rounded p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Income Details</h3>
            <p className="text-gray-600">Your income details will appear here.</p>
          </div>
        );
      case "Transactions":
        return (
          <div className="bg-white shadow rounded p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Transaction History</h3>
            <p className="text-gray-600">Your transaction history will appear here.</p>
          </div>
        );
      default:
        return <div>Select a menu item</div>;
    }
  };

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
        <aside className="w-64 bg-gray-900 text-gray-300 flex flex-col">
          <div className="p-4 border-b border-gray-800 text-lg font-bold">Menu</div>
          <nav className="flex-1 overflow-auto p-4 space-y-2">
            {/* Common Menu Items */}
            <button
              onClick={() => setActiveComponent("Home")}
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
                  onClick={() => setActiveComponent("Refer Now")}
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
                    className="w-full text-left py-2 px-3 rounded flex items-center justify-between hover:bg-gray-800 transition"
                  >
                    <div className="flex items-center space-x-2">
                      <FaUserFriends />
                      <span>Team</span>
                    </div>
                    {teamOpen ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  {teamOpen && (
                    <div className="ml-4 space-y-2 mt-2">
                      <button
                        onClick={() => setActiveComponent("Direct Referrals")}
                        className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                          activeComponent === "Direct Referrals" ? "bg-gray-800" : ""
                        }`}
                      >
                        <span>Direct Referrals</span>
                      </button>
                      <button
                        onClick={() => setActiveComponent("Level Wise")}
                        className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                          activeComponent === "Level Wise" ? "bg-gray-800" : ""
                        }`}
                      >
                        <span>Level Wise</span>
                      </button>
                      <button
                        onClick={() => setActiveComponent("Total Team")}
                        className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                          activeComponent === "Total Team" ? "bg-gray-800" : ""
                        }`}
                      >
                        <span>Total Team</span>
                      </button>
                      <button
                        onClick={() => setActiveComponent("Tree View")}
                        className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                          activeComponent === "Tree View" ? "bg-gray-800" : ""
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
                    className="w-full text-left py-2 px-3 rounded flex items-center justify-between hover:bg-gray-800 transition"
                  >
                    <div className="flex items-center space-x-2">
                      <FaChartBar />
                      <span>Business</span>
                    </div>
                    {levelWiseOpen ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  {levelWiseOpen && (
                    <div className="ml-4 space-y-2 mt-2">
                      <button
                        onClick={() => setActiveComponent("Total Business")}
                        className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                          activeComponent === "Total Business" ? "bg-gray-800" : ""
                        }`}
                      >
                        <span>Total Business</span>
                      </button>
                      <button
                        onClick={() => setActiveComponent("50% Business Count")}
                        className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                          activeComponent === "50% Business Count" ? "bg-gray-800" : ""
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
                    className="w-full text-left py-2 px-3 rounded flex items-center justify-between hover:bg-gray-800 transition"
                  >
                    <div className="flex items-center space-x-2">
                      <FaWallet />
                      <span>Wallet</span>
                    </div>
                    {walletOpen ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  {walletOpen && (
                    <div className="ml-4 space-y-2 mt-2">
                      <button
                        onClick={() => setActiveComponent("Deposit")}
                        className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                          activeComponent === "Deposit" ? "bg-gray-800" : ""
                        }`}
                      >
                        <span>Deposit</span>
                      </button>
                      <button
                        onClick={() => setActiveComponent("Topup")}
                        className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                          activeComponent === "Topup" ? "bg-gray-800" : ""
                        }`}
                      >
                        <span>Topup</span>
                      </button>
                      <button
                        onClick={() => setActiveComponent("Transfer")}
                        className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                          activeComponent === "Transfer" ? "bg-gray-800" : ""
                        }`}
                      >
                        <span>Transfer</span>
                      </button>
                      <button
                        onClick={() => setActiveComponent("Withdraw")}
                        className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                          activeComponent === "Withdraw" ? "bg-gray-800" : ""
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
                    className="w-full text-left py-2 px-3 rounded flex items-center justify-between hover:bg-gray-800 transition"
                  >
                    <div className="flex items-center space-x-2">
                      <FaMoneyBillWave />
                      <span>Income</span>
                    </div>
                    {powerTeamOpen ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  {powerTeamOpen && (
                    <div className="ml-4 space-y-2 mt-2">
                      <button
                        onClick={() => setActiveComponent("Incomes")}
                        className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                          activeComponent === "Incomes" ? "bg-gray-800" : ""
                        }`}
                      >
                        <span>Incomes</span>
                      </button>
                      <button
                        onClick={() => setActiveComponent("Transactions")}
                        className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                          activeComponent === "Transactions" ? "bg-gray-800" : ""
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
                  onClick={() => setActiveComponent("Manage Users")}
                  className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                    activeComponent === "Manage Users" ? "bg-gray-800" : ""
                  }`}
                >
                  <FaUsers />
                  <span>Manage Users</span>
                </button>
                <button
                  onClick={() => setActiveComponent("Total Business")}
                  className={`w-full text-left py-2 px-3 rounded flex items-center space-x-2 hover:bg-gray-800 transition ${
                    activeComponent === "Total Business" ? "bg-gray-800" : ""
                  }`}
                >
                  <FaChartLine />
                  <span>Business Overview</span>
                </button>
                <button
                  onClick={() => setActiveComponent("Transactions")}
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
          <div className="p-6">
            {renderContent()}
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
