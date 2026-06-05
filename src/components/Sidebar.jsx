// src/components/Sidebar.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Sidebar = ({ onSelectPatient, selectedPatientName }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const fetchAllPatients = async () => {
      try {
        const API_BASE =
          "https://fedskillstest.coalitiontechnologies.workers.dev";
        const username = "coalition";
        const password = "skills-test";
        const basicAuth = btoa(`${username}:${password}`);

        const response = await fetch(`${API_BASE}/patients`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${basicAuth}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            `API error: ${response.status} ${response.statusText}`,
          );
        }

        const data = await response.json();
        setPatients(data);

        const jessicaTaylor = data.find(
          (patient) => patient.name === "Jessica Taylor",
        );
        if (jessicaTaylor && onSelectPatient) {
          onSelectPatient(jessicaTaylor);
        }
      } catch (error) {
        console.error("Failed to fetch patients:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPatients();
  }, [onSelectPatient]);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handlePatientClick = (patient) => {
    if (onSelectPatient) {
      onSelectPatient(patient);
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchTerm("");
    }
  };

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 h-full"
      >
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-[#072635]">
            Patients
          </h3>
          <button
            onClick={toggleSearch}
            className="text-gray-400 hover:text-[#072635] transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="text-center py-8">
          <div className="text-red-500 mb-2">⚠️</div>
          <p className="text-sm text-red-600">Failed to load patients</p>
          <p className="text-xs text-gray-500 mt-1">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#01F0D0] text-[#072635] rounded-lg text-sm font-semibold"
          >
            Retry
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 flex flex-col h-full"
    >
      {/* Header - Fixed */}
      <div className="flex-shrink-0">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-[#072635]">
            Patients
          </h3>
          <button
            onClick={toggleSearch}
            className={`text-gray-400 hover:text-[#072635] transition-colors ${showSearch ? "text-[#01F0D0]" : ""}`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>

        {/* Search Input - Animated */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="mb-4 overflow-hidden"
            >
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#01F0D0] text-sm"
                autoFocus
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Patients List - Scrollable */}
      <div className="flex-1 min-h-0 overflow-y-auto custom-scroll pr-1">
        {loading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-2 border-[#01F0D0] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm text-gray-500">Loading patients...</p>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3 pb-4">
            {filteredPatients.map((patient, index) => (
              <motion.div
                key={patient.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handlePatientClick(patient)}
                className={`flex items-center justify-between p-2 sm:p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                  selectedPatientName === patient.name
                    ? "bg-[#D8FCF7]"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                  <img
                    src={patient.profile_picture}
                    alt={patient.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        patient.name,
                      )}&background=01F0D0&color=fff&length=2`;
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-semibold text-[#072635] truncate">
                      {patient.name}
                    </h4>
                    <p className="text-xs text-[#707070]">
                      {patient.gender}, {patient.age}
                    </p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 ml-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    ></path>
                  </svg>
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filteredPatients.length === 0 && showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <p className="text-sm text-gray-500">No patients found</p>
          </motion.div>
        )}

        {!loading && filteredPatients.length === 0 && !showSearch && (
          <div className="text-center py-8">
            <p className="text-sm text-gray-500">No patients available</p>
          </div>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scroll {
          scrollbar-width: thin;
          scrollbar-color: #b9c1cc #e9edf2;
        }
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #e9edf2;
          border-radius: 10px;
          margin: 4px 0;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #b9c1cc;
          border-radius: 10px;
          transition: background 0.2s;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #01f0d0;
        }
        .custom-scroll::-webkit-scrollbar-corner {
          background: transparent;
        }
      `}</style>
    </motion.div>
  );
};

export default Sidebar;
