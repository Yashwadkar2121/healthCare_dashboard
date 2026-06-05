// src/components/PatientInfo.jsx
import { motion } from "framer-motion";

import CalendarIcon from "../assets/PatientInfo/BirthIcon.svg";
import GenderIcon from "../assets/PatientInfo/FemaleIcon.svg";
import PhoneIcon from "../assets/PatientInfo/PhoneIcon.svg";
import InsuranceIcon from "../assets/PatientInfo/InsuranceIcon.svg";

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
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full mx-auto mb-3 sm:mb-4 object-cover"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              patient.name || "Jessica Taylor",
            )}&background=01F0D0&color=fff&length=2`;
          }}
        />
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#072635]">
          {patient.name || "Jessica Taylor"}
        </h3>
      </div>

      <div className="space-y-2 sm:space-y-3 md:space-y-4">
        {/* Date Of Birth */}
        <div className="flex items-center py-2 border-b border-gray-100">
          <div className="flex items-center gap-2 sm:gap-3 flex-1">
            <img
              src={CalendarIcon}
              alt="Calendar"
              className="w-5 h-5 sm:w-auto sm:h-auto opacity-70 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-[#072635] text-xs sm:text-sm">Date Of Birth</p>
              <p className="font-medium text-[#072635] text-xs sm:text-sm truncate">
                {formatDate(patient.date_of_birth)}
              </p>
            </div>
          </div>
        </div>

        {/* Gender */}
        <div className="flex items-center py-2 border-b border-gray-100">
          <div className="flex items-center gap-2 sm:gap-3 flex-1">
            <img
              src={GenderIcon}
              alt="Gender"
              className="w-5 h-5 sm:w-auto sm:h-auto opacity-70 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-[#072635] text-xs sm:text-sm">Gender</p>
              <p className="font-medium text-[#072635] text-xs sm:text-sm truncate">
                {patient.gender || "Female"}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex items-center py-2 border-b border-gray-100">
          <div className="flex items-center gap-2 sm:gap-3 flex-1">
            <img
              src={PhoneIcon}
              alt="Phone"
              className="w-5 h-5 sm:w-auto sm:h-auto opacity-70 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-[#072635] text-xs sm:text-sm">Contact Info</p>
              <p className="font-medium text-[#072635] text-xs sm:text-sm truncate">
                {patient.phone_number || "(415) 555-1234"}
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="flex items-center py-2 border-b border-gray-100">
          <div className="flex items-center gap-2 sm:gap-3 flex-1">
            <img
              src={PhoneIcon}
              alt="Emergency"
              className="w-5 h-5 sm:w-auto sm:h-auto opacity-70 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-[#072635] text-xs sm:text-sm">
                Emergency Contacts
              </p>
              <p className="font-medium text-[#072635] text-xs sm:text-sm truncate">
                {patient.emergency_contact || "(415) 555-5678"}
              </p>
            </div>
          </div>
        </div>

        {/* Insurance Provider */}
        <div className="flex items-center py-2 border-b border-gray-100">
          <div className="flex items-center gap-2 sm:gap-3 flex-1">
            <img
              src={InsuranceIcon}
              alt="Insurance"
              className="w-5 h-5 sm:w-auto sm:h-auto opacity-70 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-[#072635] text-xs sm:text-sm">
                Insurance Provider
              </p>
              <p className="font-medium text-[#072635] text-xs sm:text-sm truncate">
                {patient.insurance_type || "Sunrise Health Assurance"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <button className="w-full mt-4 sm:mt-6 bg-[#01F0D0] text-[#072635] py-2 sm:py-3 rounded-xl font-semibold hover:bg-[#01F0D0]/80 transition-all text-sm sm:text-base">
        Show All Information
      </button>
    </motion.div>
  );
};

export default PatientInfo;
