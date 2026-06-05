// src/components/DiagnosisList.jsx

import { motion } from "framer-motion";

const DiagnosisList = ({ diagnosticList }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Under Observation":
        return "text-yellow-600 bg-yellow-50";
      case "Cured":
        return "text-green-600 bg-green-50";
      case "Inactive":
        return "text-gray-600 bg-gray-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="card"
    >
      <h2 className="text-xl font-bold text-primary mb-4">Diagnostic List</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 rounded-xl">
            <tr>
              <th className="text-left p-3 text-sm font-semibold text-primary">
                Proteins/Diagnosis
              </th>
              <th className="text-left p-3 text-sm font-semibold text-primary">
                Description
              </th>
              <th className="text-left p-3 text-sm font-semibold text-primary">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {diagnosticList?.map((item, index) => (
              <motion.tr
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="p-3 text-primary font-medium">{item.name}</td>
                <td className="p-3 text-gray-600">{item.description}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}
                  >
                    {item.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default DiagnosisList;
