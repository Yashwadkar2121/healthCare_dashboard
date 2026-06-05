// src/components/DiagnosisHistory.jsx

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const DiagnosisHistory = ({ diagnosisHistory }) => {
  // Get last 6 months of data
  const last6Months = diagnosisHistory?.slice(-6).reverse() || [];

  const chartData = {
    labels: last6Months.map((item) => {
      const date = new Date(item.month);
      return date.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
    }),
    datasets: [
      {
        label: "Systolic BP",
        data: last6Months.map((item) => item.blood_pressure.systolic),
        borderColor: "#E74C3C",
        backgroundColor: "rgba(231, 76, 60, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#E74C3C",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Diastolic BP",
        data: last6Months.map((item) => item.blood_pressure.diastolic),
        borderColor: "#3498DB",
        backgroundColor: "rgba(52, 152, 219, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#3498DB",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          boxWidth: 8,
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 60,
        max: 180,
        grid: {
          color: "#e2e8f0",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const latestReading = last6Months[last6Months.length - 1] || {};
  const respiratoryRate = latestReading.respiratory_rate || 20;
  const temperature = latestReading.temperature || 98.6;
  const heartRate = latestReading.heart_rate || 78;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="card"
    >
      <h2 className="text-xl font-bold text-primary mb-4">Diagnosis History</h2>
      <p className="text-sm text-gray-500 mb-4">Last 6 months</p>

      <div className="h-80 mb-6">
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-red-50 rounded-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Respiratory Rate</span>
            <span className="text-xl">🌬️</span>
          </div>
          <p className="text-2xl font-bold text-primary">
            {respiratoryRate} bpm
          </p>
          <p className="text-xs text-green-600 mt-1">✓ Normal</p>
        </div>

        <div className="bg-blue-50 rounded-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Temperature</span>
            <span className="text-xl">🌡️</span>
          </div>
          <p className="text-2xl font-bold text-primary">{temperature}°F</p>
          <p className="text-xs text-green-600 mt-1">✓ Normal</p>
        </div>

        <div className="bg-purple-50 rounded-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Heart Rate</span>
            <span className="text-xl">❤️</span>
          </div>
          <p className="text-2xl font-bold text-primary">{heartRate} bpm</p>
          <p className="text-xs text-green-600 mt-1">✓ Normal</p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-xl">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Blood Pressure Trend</p>
            <p className="text-sm font-medium text-primary">
              Systolic: {latestReading.blood_pressure?.systolic || "N/A"}
              <span className="text-red-500 ml-2">↑ Higher than average</span>
            </p>
            <p className="text-sm font-medium text-primary">
              Diastolic: {latestReading.blood_pressure?.diastolic || "N/A"}
              <span className="text-blue-500 ml-2">↓ Lower than average</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DiagnosisHistory;
