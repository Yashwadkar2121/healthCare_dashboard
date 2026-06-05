// src/components/PatientInfo.jsx
import { motion } from "framer-motion";

const PatientInfo = ({ patient }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="card"
    >
      <div className="text-center mb-6">
        <div className="w-32 h-32 bg-gradient-to-br from-secondary to-primary rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-white text-4xl font-bold">
            {patient.name
              ?.split(" ")
              .map((n) => n[0])
              .join("") || "JT"}
          </span>
        </div>
        <h3 className="text-xl font-bold text-primary">
          {patient.name || "Jessica Taylor"}
        </h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <span className="text-gray-500">📅 Date Of Birth</span>
          <span className="font-medium text-primary">
            {formatDate(patient.date_of_birth)}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <span className="text-gray-500">⚥ Gender</span>
          <span className="font-medium text-primary">
            {patient.gender || "Female"}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <span className="text-gray-500">📞 Contact Info</span>
          <span className="font-medium text-primary">
            {patient.phone_number || "(415) 555-1234"}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <span className="text-gray-500">🆘 Emergency Contacts</span>
          <span className="font-medium text-primary">
            {patient.emergency_contact || "(415) 666-9678"}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <span className="text-gray-500">🏥 Insurance Provider</span>
          <span className="font-medium text-primary">
            {patient.insurance_type || "Sunrise Health Assurance"}
          </span>
        </div>
      </div>

      <button className="w-full mt-6 bg-secondary text-white py-3 rounded-xl font-semibold hover:bg-opacity-90 transition-all">
        Save All Information
      </button>
    </motion.div>
  );
};

export default PatientInfo;
