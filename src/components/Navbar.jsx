// src/components/Navbar.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import testLogo from "../assets/Navbar/TestLogo.svg";
import overviewIcon from "../assets/Navbar/home_FILL0_wght300_GRAD0_opsz24.svg";
import patientsIcon from "../assets/Navbar/group_FILL0_wght300_GRAD0_opsz24.svg";
import scheduleIcon from "../assets/Navbar/calendar_today_FILL0_wght300_GRAD0_opsz24.svg";
import messageIcon from "../assets/Navbar/chat_bubble_FILL0_wght300_GRAD0_opsz24.svg";
import transactionIcon from "../assets/Navbar/credit_card_FILL0_wght300_GRAD0_opsz24.svg";
import doctorImage from "../assets/Navbar/senior-woman-doctor-and-portrait-smile-for-health-2023-11-27-05-18-16-utc.png";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Patients");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "Overview", icon: overviewIcon, label: "Overview" },
    { id: "Patients", icon: patientsIcon, label: "Patients" },
    { id: "Schedule", icon: scheduleIcon, label: "Schedule" },
    { id: "Message", icon: messageIcon, label: "Message" },
    { id: "Transaction", icon: transactionIcon, label: "Transaction" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="fixed top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 bg-white shadow-lg z-50 px-3 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl"
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <img
              src={testLogo}
              alt="Tech.Care Logo"
              className="h-8 w-auto sm:h-10 object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1 lg:space-x-2 px-2 lg:px-3 py-1.5 lg:py-2 rounded-xl lg:rounded-2xl transition-all duration-200 group ${
                  activeTab === item.id
                    ? "bg-[#01F0D0] text-[#072635] shadow-sm"
                    : "text-gray-600 hover:text-[#072635] hover:bg-[#01F0D0]/10"
                }`}
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className="w-3 h-3 lg:w-4 lg:h-4 transition-transform"
                />
                <span className="text-xs lg:text-sm font-medium whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
            <div className="flex items-center space-x-2 lg:space-x-3 rounded-full px-2 lg:px-3 py-1 hover:bg-gray-50 transition-colors cursor-pointer">
              <img
                src={doctorImage}
                alt="Dr. Jose Simmons"
                className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover"
              />
              <div className="hidden lg:block">
                <p className="text-sm font-semibold text-[#072635]">
                  Dr. Jose Simmons
                </p>
                <p className="text-xs text-[#707070]">General Practitioner</p>
              </div>
            </div>
            <button className="p-1.5 lg:p-2 rounded-full text-gray-500 hover:text-[#072635] hover:bg-[#01F0D0]/10">
              <svg
                className="w-4 h-4 lg:w-5 lg:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
            <button className="p-1.5 lg:p-2 rounded-full text-gray-500 hover:text-[#072635] hover:bg-[#01F0D0]/10">
              <svg
                className="w-4 h-4 lg:w-5 lg:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Navigation Menu */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isMobileMenuOpen ? 0 : "100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 md:hidden"
      >
        <div className="p-4 pt-20">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-[#01F0D0] text-[#072635]"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <img src={item.icon} alt={item.label} className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
          <hr className="my-4" />
          <div className="flex items-center space-x-3 px-4 py-3">
            <img
              src={doctorImage}
              alt="Dr. Jose Simmons"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-[#072635]">
                Dr. Jose Simmons
              </p>
              <p className="text-xs text-[#707070]">General Practitioner</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
