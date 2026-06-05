// src/components/DiagnosisList.jsx
import { motion } from "framer-motion";

const DiagnosisList = ({ diagnosticList }) => {
  if (!diagnosticList || diagnosticList.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm p-6"
      >
        <p className="text-gray-500 text-center">
          No diagnostic list available
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="bg-white rounded-2xl shadow-sm p-6"
    >
      <h3 className="text-xl font-bold text-[#072635] mb-4">Diagnostic List</h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 rounded-lg">
              <th className="text-left py-3 px-4 text-sm font-semibold text-[#072635]">
                Problem/Diagnosis
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-[#072635]">
                Description
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-[#072635]">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {diagnosticList.map((diagnostic, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4 text-sm font-medium text-[#072635]">
                  {diagnostic.name}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {diagnostic.description}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      diagnostic.status === "Under Observation"
                        ? "bg-amber-100 text-amber-700"
                        : diagnostic.status === "Cured"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {diagnostic.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default DiagnosisList;
