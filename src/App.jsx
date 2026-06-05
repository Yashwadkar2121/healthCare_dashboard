// src/App.jsx
import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import DiagnosisHistory from "./components/DiagnosisHistory";
import DiagnosisList from "./components/DiagnosisList";
import LabResults from "./components/LabResults";
import PatientInfo from "./components/PatientInfo";
import { fetchPatientData } from "./api/patientApi";

function App() {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sidebarHeight, setSidebarHeight] = useState("auto");

  const rightSidebarRef = useRef(null);

  useEffect(() => {
    const loadPatientData = async () => {
      try {
        const data = await fetchPatientData();
        setPatientData(data);
        setSelectedPatient(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadPatientData();
  }, []);

  // Update sidebar height based on right sidebar height
  useEffect(() => {
    const updateHeight = () => {
      if (rightSidebarRef.current) {
        const rightSidebarRect =
          rightSidebarRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const topOffset = rightSidebarRect.top;
        const bottomPadding = 20;
        const availableHeight = Math.min(
          rightSidebarRect.height,
          viewportHeight - topOffset - bottomPadding,
        );
        setSidebarHeight(`${availableHeight}px`);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    // Also update when content changes
    const observer = new ResizeObserver(updateHeight);
    if (rightSidebarRef.current) {
      observer.observe(rightSidebarRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateHeight);
      observer.disconnect();
    };
  }, [selectedPatient, patientData]);

  const handlePatientSelect = useCallback((patient) => {
    setSelectedPatient(patient);
    setIsMobileMenuOpen(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f6f8fc]">
        <div className="text-center px-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-[#01F0D0] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#072635] text-sm sm:text-base">
            Loading patient data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f6f8fc] px-4">
        <div className="text-center text-red-500">
          <p className="text-sm sm:text-base">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#01F0D0] text-[#072635] rounded-lg font-semibold text-sm sm:text-base"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const currentPatient = selectedPatient || patientData;
  const diagnosisHistoryData = currentPatient?.diagnosis_history;
  const diagnosticListData = currentPatient?.diagnostic_list;
  const labResultsData = currentPatient?.lab_results;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#f6f8fc]"
    >
      <Navbar />

      {/* Mobile Menu Toggle Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-[#01F0D0] text-[#072635] p-3 rounded-full shadow-lg"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className="pt-20 sm:pt-24 px-3 sm:px-4 md:px-6 pb-6">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 max-w-[1440px] mx-auto">
          {/* Sidebar - Patient List with dynamic height */}
          <div
            className={`
              ${isMobileMenuOpen ? "fixed inset-y-0 left-0 z-50 w-80" : "hidden lg:block lg:w-80"}
              transition-all duration-300 ease-in-out
            `}
            style={!isMobileMenuOpen ? { height: sidebarHeight } : {}}
          >
            <div className="h-full">
              <Sidebar
                onSelectPatient={handlePatientSelect}
                selectedPatientName={currentPatient?.name}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-4 md:space-y-6">
            <DiagnosisHistory diagnosisHistory={diagnosisHistoryData} />
            <DiagnosisList diagnosticList={diagnosticListData} />
          </div>

          {/* Right Sidebar - Reference for height */}
          <div ref={rightSidebarRef} className="lg:w-80 space-y-4 md:space-y-6">
            <PatientInfo patient={currentPatient} />
            <LabResults labResults={labResultsData} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default App;
