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

  if (!patient) {
    return (
      <motion.div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
        <p className="text-gray-500 text-center text-sm sm:text-base">
          Loading patient info...
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
      <div className="text-center mb-4 sm:mb-6">
        <img
          src={
            patient.profile_picture || "https://fedskillstest.ct.digital/4.png"
          }
          alt={patient.name}
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-3 sm:mb-4 object-cover"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              patient.name || "Jessica Taylor",
            )}&background=01F0D0&color=fff&length=2`;
          }}
        />
        <h3 className="text-lg sm:text-xl font-bold text-[#072635]">
          {patient.name || "Jessica Taylor"}
        </h3>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-gray-100">
          <span className="text-gray-500 text-xs sm:text-sm mb-1 sm:mb-0">
            Date Of Birth
          </span>
          <span className="font-medium text-[#072635] text-xs sm:text-sm">
            {formatDate(patient.date_of_birth)}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-gray-100">
          <span className="text-gray-500 text-xs sm:text-sm mb-1 sm:mb-0">
            Gender
          </span>
          <span className="font-medium text-[#072635] text-xs sm:text-sm">
            {patient.gender || "Female"}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-gray-100">
          <span className="text-gray-500 text-xs sm:text-sm mb-1 sm:mb-0">
            Contact Info
          </span>
          <span className="font-medium text-[#072635] text-xs sm:text-sm">
            {patient.phone_number || "(415) 555-1234"}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-gray-100">
          <span className="text-gray-500 text-xs sm:text-sm mb-1 sm:mb-0">
            Emergency Contacts
          </span>
          <span className="font-medium text-[#072635] text-xs sm:text-sm">
            {patient.emergency_contact || "(415) 555-5678"}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-gray-100">
          <span className="text-gray-500 text-xs sm:text-sm mb-1 sm:mb-0">
            Insurance Provider
          </span>
          <span className="font-medium text-[#072635] text-xs sm:text-sm">
            {patient.insurance_type || "Sunrise Health Assurance"}
          </span>
        </div>
      </div>

      <button className="w-full mt-4 sm:mt-6 bg-[#01F0D0] text-[#072635] py-2 sm:py-3 rounded-xl font-semibold hover:bg-[#01F0D0]/80 transition-all text-sm sm:text-base">
        Show All Information
      </button>
    </motion.div>
  );
};

export default PatientInfo;
