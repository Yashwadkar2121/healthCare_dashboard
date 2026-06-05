// src/components/Sidebar.jsx

import { motion } from "framer-motion";

const Sidebar = () => {
  const menuItems = [
    { icon: "🏠", label: "Dashboard" },
    { icon: "👥", label: "Patients" },
    { icon: "📅", label: "Schedule" },
    { icon: "💬", label: "Messages" },
    { icon: "📊", label: "Reports" },
  ];

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 bg-white shadow-lg rounded-r-2xl"
    >
      <div className="p-6">
        <div className="mb-8 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-secondary to-primary rounded-full mx-auto mb-3 flex items-center justify-center">
            <span className="text-white text-3xl font-bold">JT</span>
          </div>
          <h3 className="font-semibold text-primary">Jessica Taylor</h3>
          <p className="text-sm text-gray-500">Patient ID: #PT-2024-001</p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-secondary hover:text-white transition-all duration-200 text-primary"
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </motion.button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-gray-100 text-primary">
            <span>⚙️</span>
            <span>Settings</span>
          </button>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
