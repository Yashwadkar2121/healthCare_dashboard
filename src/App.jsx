// src/App.jsx
import  { useState, useEffect } from "react";
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

  useEffect(() => {
    const loadPatientData = async () => {
      try {
        const data = await fetchPatientData();
        setPatientData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadPatientData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-primary">Loading patient data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center text-red-500">
          <p>Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-secondary text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <Navbar />
      <div className="flex pt-20">
        <Sidebar />
        <main className="flex-1 p-6 ml-64">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Diagnosis History */}
            <div className="lg:col-span-2">
              <DiagnosisHistory
                diagnosisHistory={patientData.diagnosis_history}
              />
              <div className="mt-6">
                <DiagnosisList diagnosticList={patientData.diagnostic_list} />
              </div>
            </div>

            {/* Right Column - Patient Info and Lab Results */}
            <div className="space-y-6">
              <PatientInfo patient={patientData} />
              <LabResults labResults={patientData.lab_results} />
            </div>
          </div>
        </main>
      </div>
    </motion.div>
  );
}

export default App;
