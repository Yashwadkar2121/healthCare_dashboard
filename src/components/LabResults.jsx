// src/components/LabResults.jsx
import { motion } from "framer-motion";

const LabResults = ({ labResults }) => {
  if (!labResults || labResults.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm p-6"
      >
        <p className="text-gray-500 text-center">No lab results available</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="bg-white rounded-2xl shadow-sm p-6"
    >
      <h3 className="text-xl font-bold text-[#072635] mb-4">Lab Results</h3>

      <div className="space-y-2 max-h-80 overflow-y-auto custom-scroll">
        {labResults.map((result, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 px-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
          >
            <span className="text-sm text-gray-700">{result}</span>
            <svg
              className="w-5 h-5 text-gray-400"
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
          width: 6px;
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