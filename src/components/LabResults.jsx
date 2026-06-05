// src/components/LabResults.jsx
import { motion } from "framer-motion";

const LabResults = ({ labResults }) => {
  if (!labResults || labResults.length === 0) {
    return (
      <motion.div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
        <p className="text-gray-500 text-center text-sm sm:text-base">
          No lab results available
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-[#072635] mb-4">
        Lab Results
      </h3>

      <div className="space-y-2 max-h-64 sm:max-h-80 overflow-y-auto custom-scroll">
        {labResults.map((result, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2 sm:py-3 px-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
          >
            <span className="text-xs sm:text-sm text-gray-700 break-words flex-1 mr-2">
              {result}
            </span>
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </div>
        ))}
      </div>

      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #e9edf2;
          border-radius: 8px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #b9c1cc;
          border-radius: 8px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #01f0d0;
        }
      `}</style>
    </motion.div>
  );
};

export default LabResults;
