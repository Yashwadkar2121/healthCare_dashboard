// src/components/DiagnosisHistory.jsx
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const DiagnosisHistory = ({ diagnosisHistory }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!diagnosisHistory || diagnosisHistory.length === 0) return;

    const timer = setTimeout(() => {
      const ctx = chartRef.current?.getContext("2d");
      if (!ctx) return;

      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }

      const labels = diagnosisHistory.map((entry) => {
        if (windowWidth < 640) {
          return `${entry.month.slice(0, 3)} ${entry.year}`;
        }
        return `${entry.month} ${entry.year}`;
      });

      const systolicData = diagnosisHistory.map(
        (entry) => entry.blood_pressure.systolic.value,
      );
      const diastolicData = diagnosisHistory.map(
        (entry) => entry.blood_pressure.diastolic.value,
      );

      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Systolic (mmHg)",
              data: systolicData,
              borderColor: "#E66A6A",
              backgroundColor: "rgba(230, 106, 106, 0.1)",
              tension: 0.3,
              fill: false,
              pointBackgroundColor: "#E66A6A",
              pointBorderColor: "#E66A6A",
              pointRadius: windowWidth < 640 ? 3 : 4,
              pointHoverRadius: windowWidth < 640 ? 5 : 6,
            },
            {
              label: "Diastolic (mmHg)",
              data: diastolicData,
              borderColor: "#5B8DEF",
              backgroundColor: "rgba(91, 141, 239, 0.1)",
              tension: 0.3,
              fill: false,
              pointBackgroundColor: "#5B8DEF",
              pointBorderColor: "#5B8DEF",
              pointRadius: windowWidth < 640 ? 3 : 4,
              pointHoverRadius: windowWidth < 640 ? 5 : 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: windowWidth < 640 ? "bottom" : "top",
              labels: {
                usePointStyle: true,
                boxWidth: 8,
                font: { size: windowWidth < 640 ? 10 : 12 },
              },
            },
            tooltip: {
              mode: "index",
              intersect: false,
              callbacks: {
                label: (context) =>
                  `${context.dataset.label}: ${context.parsed.y} mmHg`,
              },
            },
          },
          scales: {
            y: {
              title: {
                display: windowWidth >= 768,
                text: "Blood Pressure (mmHg)",
                color: "#666",
              },
              beginAtZero: false,
              grid: { color: "#e9ecef" },
              ticks: { font: { size: windowWidth < 640 ? 10 : 12 } },
            },
            x: {
              title: {
                display: windowWidth >= 768,
                text: "Month",
                color: "#666",
              },
              grid: { display: false },
              ticks: {
                font: { size: windowWidth < 640 ? 10 : 12 },
                rotation: windowWidth < 640 ? 45 : 0,
              },
            },
          },
        },
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [diagnosisHistory, windowWidth]);

  if (!diagnosisHistory || diagnosisHistory.length === 0) {
    return (
      <motion.div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
        <p className="text-gray-500 text-center text-sm sm:text-base">
          No diagnosis history available
        </p>
      </motion.div>
    );
  }

  const latestRecord = diagnosisHistory[diagnosisHistory.length - 1];

  return (
    <motion.div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-[#072635] mb-4">
        Diagnosis History
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-rose-50 rounded-xl p-3 sm:p-4">
          <p className="text-xs text-gray-500 mb-1">Blood Pressure</p>
          <p className="text-base sm:text-xl font-bold text-[#072635]">
            {latestRecord.blood_pressure.systolic.value}/
            {latestRecord.blood_pressure.diastolic.value}
          </p>
          <p className="text-xs text-rose-600 mt-1">
            {latestRecord.blood_pressure.systolic.levels}
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl p-3 sm:p-4">
          <p className="text-xs text-gray-500 mb-1">Respiratory Rate</p>
          <p className="text-base sm:text-xl font-bold text-[#072635]">
            {latestRecord.respiratory_rate.value} bpm
          </p>
          <p className="text-xs text-green-600 mt-1">
            {latestRecord.respiratory_rate.levels}
          </p>
        </div>

        <div className="bg-amber-50 rounded-xl p-3 sm:p-4">
          <p className="text-xs text-gray-500 mb-1">Temperature</p>
          <p className="text-base sm:text-xl font-bold text-[#072635]">
            {latestRecord.temperature.value}°F
          </p>
          <p className="text-xs text-green-600 mt-1">
            {latestRecord.temperature.levels}
          </p>
        </div>

        <div className="bg-emerald-50 rounded-xl p-3 sm:p-4">
          <p className="text-xs text-gray-500 mb-1">Heart Rate</p>
          <p className="text-base sm:text-xl font-bold text-[#072635]">
            {latestRecord.heart_rate.value} bpm
          </p>
          <p className="text-xs text-gray-600 mt-1">
            {latestRecord.heart_rate.levels}
          </p>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <canvas ref={chartRef} style={{ maxHeight: "280px", width: "100%" }} />
      </div>
    </motion.div>
  );
};

export default DiagnosisHistory;
