// src/components/LabResults.jsx

import { motion } from "framer-motion";

const LabResults = ({ labResults }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="card"
    >
      <h2 className="text-xl font-bold text-primary mb-4">Lab Results</h2>
      <div className="space-y-2">
        {labResults?.map((result, index) => (
          <motion.div
            key={result}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <span className="text-primary group-hover:text-secondary transition-colors">
              {result}
            </span>
            <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-secondary">
              📄 Download
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LabResults;
