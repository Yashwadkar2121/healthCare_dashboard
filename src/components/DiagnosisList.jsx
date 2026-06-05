// src/components/DiagnosisList.jsx
import { motion } from "framer-motion";

const DiagnosisList = ({ diagnosticList }) => {
  if (!diagnosticList || diagnosticList.length === 0) {
    return (
      <motion.div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
        <p className="text-gray-500 text-center text-sm sm:text-base">
          No diagnostic list available
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-[#072635] mb-4">
        Diagnostic List
      </h3>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="text-left py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-[#072635] bg-gray-50 rounded-l-2xl sm:rounded-l-3xl border-y border-l border-gray-200">
                  Problem/Diagnosis
                </th>
                <th className="text-left py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-[#072635] bg-gray-50 border-y border-gray-200">
                  Description
                </th>
                <th className="text-left py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-[#072635] bg-gray-50 rounded-r-2xl sm:rounded-r-3xl border-y border-r border-gray-200">
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
                  <td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium text-[#072635] break-words">
                    {diagnostic.name}
                  </td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-600 break-words">
                    {diagnostic.description}
                  </td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
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
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-3">
        {diagnosticList.map((diagnostic, index) => (
          <div
            key={index}
            className="border border-gray-100 rounded-xl p-3 bg-white"
          >
            <div className="mb-2">
              <span className="text-xs font-semibold text-[#072635] block mb-1">
                Problem/Diagnosis
              </span>
              <p className="text-sm text-gray-800">{diagnostic.name}</p>
            </div>
            <div className="mb-2">
              <span className="text-xs font-semibold text-[#072635] block mb-1">
                Description
              </span>
              <p className="text-sm text-gray-600">{diagnostic.description}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-[#072635] block mb-1">
                Status
              </span>
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
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default DiagnosisList;
