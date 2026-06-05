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

  const navItems = [
    { id: "Overview", icon: overviewIcon, label: "Overview" },
    { id: "Patients", icon: patientsIcon, label: "Patients" },
    { id: "Schedule", icon: scheduleIcon, label: "Schedule" },
    { id: "Message", icon: messageIcon, label: "Message" },
    { id: "Transaction", icon: transactionIcon, label: "Transaction" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-4 left-4 right-4 bg-white shadow-lg z-50 px-6 py-3 rounded-4xl"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo Section - Tech.Care with local SVG */}
        <div className="flex items-center space-x-2">
          <img src={testLogo} alt="Tech.Care Logo" className="object-contain" />
        </div>

        {/* Navigation Items - 5 items in horizontal flex row */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-3xl transition-all duration-200 group ${
                activeTab === item.id
                  ? "bg-[#01F0D0] text-[#072635] shadow-sm"
                  : "text-gray-600 hover:text-[#072635] hover:bg-[#01F0D0]/10"
              }`}
            >
              <img
                src={item.icon}
                alt={item.label}
                className={`w-4 h-4 transition-transform ${
                  activeTab === item.id ? "scale-110" : "group-hover:scale-110"
                }`}
              />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Right Section - User Profile, Settings, Three Dots */}
        <div className="flex items-center space-x-3">
          {/* User Profile with PNG Image */}
          <div className="flex items-center space-x-3 rounded-full px-3 py-1.5 hover:bg-gray-50 transition-colors cursor-pointer">
            <img
              src={doctorImage}
              alt="Dr. Jose Simmons"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-[#072635]">
                Dr. Jose Simmons
              </p>
              <p className="text-xs text-[#707070]">General Practitioner</p>
            </div>
          </div>

          {/* Settings SVG Icon */}
          <button className="p-2 rounded-full text-gray-500 hover:text-[#072635] hover:bg-[#01F0D0]/10 transition-all duration-200">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
          </button>

          {/* Three Dots Menu */}
          <button className="p-2 rounded-full text-gray-500 hover:text-[#072635] hover:bg-[#01F0D0]/10 transition-all duration-200">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar - visible only on mobile */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 bg-white border-t border-gray-200 px-4 py-2 flex justify-around items-center z-50 rounded-2xl shadow-lg">
        {navItems.slice(0, 4).map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center transition-all duration-200 ${
              activeTab === item.id
                ? "text-[#072635]"
                : "text-gray-500 hover:text-[#072635]"
            }`}
          >
            <img
              src={item.icon}
              alt={item.label}
              className={`w-5 h-5 ${
                activeTab === item.id ? "opacity-100" : "opacity-70"
              }`}
            />
            <span className="text-xs mt-1">
              {item.label === "Overview" ? "Home" : item.label}
            </span>
          </button>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
