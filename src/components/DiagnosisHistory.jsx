// src/components/DiagnosisHistory.jsx
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import RespiratoryIcon from "../assets/DiagnosisHistory/respiratory rate.svg";
import TemperatureIcon from "../assets/DiagnosisHistory/temperature.svg";
import HeartRateIcon from "../assets/DiagnosisHistory/HeartBPM.svg";

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

      // Format labels - shorter on mobile, full on desktop
      const labels = diagnosisHistory.map((entry) => {
        if (windowWidth < 640) {
          return `${entry.month.slice(0, 3)} ${entry.year.toString().slice(-2)}`;
        } else if (windowWidth < 1024) {
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
              label: "Systolic",
              data: systolicData,
              borderColor: "#E66FD2",
              backgroundColor: "rgba(230, 111, 210, 0.05)",
              borderWidth: 3,
              tension: 0.4,
              fill: true,
              pointBackgroundColor: "#E66FD2",
              pointBorderColor: "#FFFFFF",
              pointBorderWidth: 2,
              pointRadius: windowWidth < 640 ? 4 : 5,
              pointHoverRadius: windowWidth < 640 ? 7 : 9,
              pointHoverBorderWidth: 3,
              pointHoverBackgroundColor: "#E66FD2",
            },
            {
              label: "Diastolic",
              data: diastolicData,
              borderColor: "#8C6FE6",
              backgroundColor: "rgba(140, 111, 230, 0.05)",
              borderWidth: 3,
              tension: 0.4,
              fill: true,
              pointBackgroundColor: "#8C6FE6",
              pointBorderColor: "#FFFFFF",
              pointBorderWidth: 2,
              pointRadius: windowWidth < 640 ? 4 : 5,
              pointHoverRadius: windowWidth < 640 ? 7 : 9,
              pointHoverBorderWidth: 3,
              pointHoverBackgroundColor: "#8C6FE6",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          interaction: {
            mode: "index",
            intersect: false,
          },
          plugins: {
            legend: {
              position: "top",
              align: "end",
              labels: {
                usePointStyle: true,
                boxWidth: 12,
                boxHeight: 12,
                font: {
                  size: windowWidth < 640 ? 11 : 13,
                  weight: "500",
                  family: "'Inter', system-ui, sans-serif",
                },
                padding: 15,
                color: "#072635",
              },
            },
            tooltip: {
              backgroundColor: "#FFFFFF",
              titleColor: "#072635",
              titleFont: {
                size: 13,
                weight: "bold",
                family: "'Inter', system-ui, sans-serif",
              },
              bodyColor: "#707070",
              bodyFont: {
                size: 12,
                family: "'Inter', system-ui, sans-serif",
              },
              borderColor: "#E9EDF2",
              borderWidth: 1,
              padding: 10,
              cornerRadius: 10,
              displayColors: true,
              callbacks: {
                label: (context) => {
                  return `${context.dataset.label}: ${context.parsed.y} mmHg`;
                },
              },
            },
          },
          scales: {
            y: {
              title: {
                display: windowWidth >= 768,
                text: "Blood Pressure (mmHg)",
                color: "#707070",
                font: {
                  size: 11,
                  weight: "500",
                  family: "'Inter', system-ui, sans-serif",
                },
              },
              min: 60,
              max: 180,
              ticks: {
                stepSize: 20,
                font: {
                  size: windowWidth < 640 ? 10 : 11,
                  family: "'Inter', system-ui, sans-serif",
                },
                color: "#707070",
                padding: 6,
                callback: function (value) {
                  return value;
                },
              },
              grid: {
                color: "#E0D8F0",
                drawBorder: true,
                borderDash: [4, 4],
                lineWidth: 1,
              },
              border: {
                color: "#E0D8F0",
                width: 1,
              },
            },
            x: {
              title: {
                display: windowWidth >= 768,
                text: "Month",
                color: "#707070",
                font: {
                  size: 11,
                  weight: "500",
                  family: "'Inter', system-ui, sans-serif",
                },
              },
              grid: {
                display: false,
                drawBorder: true,
              },
              ticks: {
                font: {
                  size: windowWidth < 640 ? 10 : 11,
                  family: "'Inter', system-ui, sans-serif",
                },
                color: "#707070",
                padding: 6,
                maxRotation: windowWidth < 640 ? 45 : 0,
                minRotation: windowWidth < 640 ? 45 : 0,
              },
              border: {
                color: "#E0D8F0",
                width: 1,
              },
            },
          },
          elements: {
            line: {
              borderJoin: "round",
              borderCap: "round",
            },
            point: {
              hoverBorderWidth: 2,
            },
          },
          layout: {
            padding: {
              top: 10,
              bottom: 10,
              left: 5,
              right: 5,
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
      <h3 className="text-lg sm:text-xl font-bold text-[#072635] mb-4 md:mb-5">
        Diagnosis History
      </h3>

      {/* Blood Pressure Chart Section with Systolic & Diastolic Reports */}
      <div className="flex flex-col lg:flex-row mb-5">
        {/* Chart - Takes 70% on desktop, full width on mobile */}
        <div className="w-full lg:w-[70%]">
          <div className="bg-[#F4F0FE]  p-3 md:p-4">
            {/* Chart Title - Blood Pressure */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-sm md:text-base font-semibold text-[#072635]">
                  Blood Pressure
                </h4>
              </div>
            </div>
            <canvas ref={chartRef} style={{ height: "260px", width: "100%" }} />
          </div>
        </div>

        {/* Systolic and Diastolic Reports - Takes 30% on desktop, full width on mobile */}
        <div className="w-full lg:w-[30%]">
          <div className="bg-[#F4F0FE]  p-4 h-full flex flex-col">
            {/* Systolic Report */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="flex-1 cursor-pointer group"
            >
              <div className="pb-4 mb-3 border-b border-gray-200/60">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-[#E66FD2] shadow-sm shadow-pink-200"></div>
                  <p className="text-xs md:text-sm font-semibold text-[#072635] group-hover:text-[#E66FD2] transition-colors">
                    Systolic
                  </p>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[#072635] mb-2">
                  {latestRecord.blood_pressure.systolic.value}
                </div>
                <div className="flex items-center gap-2">
                  <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: [0, -3, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  >
                    <svg
                      className={`w-4 h-4 md:w-5 md:h-5 ${
                        latestRecord.blood_pressure.systolic.levels ===
                        "Higher than Average"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={
                          latestRecord.blood_pressure.systolic.levels ===
                          "Higher than Average"
                            ? "M5 15l7-7 7 7"
                            : "M19 9l-7 7-7-7"
                        }
                      />
                    </svg>
                  </motion.div>
                  <p className="text-xs md:text-sm font-medium text-[#707070] group-hover:text-[#072635] transition-colors">
                    {latestRecord.blood_pressure.systolic.levels}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Diastolic Report */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="flex-1 cursor-pointer group pt-2"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-[#8C6FE6] shadow-sm shadow-purple-200"></div>
                  <p className="text-xs md:text-sm font-semibold text-[#072635] group-hover:text-[#8C6FE6] transition-colors">
                    Diastolic
                  </p>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[#072635] mb-2">
                  {latestRecord.blood_pressure.diastolic.value}
                </div>
                <div className="flex items-center gap-2">
                  <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: [0, 3, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  >
                    <svg
                      className={`w-4 h-4 md:w-5 md:h-5 ${
                        latestRecord.blood_pressure.diastolic.levels ===
                        "Lower than Average"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={
                          latestRecord.blood_pressure.diastolic.levels ===
                          "Lower than Average"
                            ? "M19 9l-7 7-7-7"
                            : "M5 15l7-7 7 7"
                        }
                      />
                    </svg>
                  </motion.div>
                  <p className="text-xs md:text-sm font-medium text-[#707070] group-hover:text-[#072635] transition-colors">
                    {latestRecord.blood_pressure.diastolic.levels}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5">
        {/* Respiratory Rate Card */}
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-gradient-to-br from-[#E0F3FA] to-[#D0EAF4] rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-5 shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-start justify-between mb-2 md:mb-3 lg:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center bg-white rounded-4xl shadow-sm">
              <img
                src={RespiratoryIcon}
                alt="Respiratory Rate"
                className="object-contain w-7 h-7 md:w-9 md:h-9 lg:w-10 lg:h-10"
              />
            </div>
          </div>
          <p className="text-xs md:text-sm lg:text-base font-semibold text-[#072635] mb-0.5 md:mb-1">
            Respiratory Rate
          </p>
          <div className="text-xl md:text-2xl lg:text-3xl font-bold text-[#072635]">
            {latestRecord.respiratory_rate.value} bpm
          </div>
          <p className="text-xs text-[#707070] mt-1 md:mt-1.5 font-medium">
            {latestRecord.respiratory_rate.levels}
          </p>
        </motion.div>

        {/* Temperature Card */}
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-gradient-to-br from-[#FFE6E6] to-[#FDD8D8] rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-5 shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-start justify-between mb-2 md:mb-3 lg:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center bg-white rounded-4xl shadow-sm">
              <img
                src={TemperatureIcon}
                alt="Temperature"
                className="object-contain w-7 h-7 md:w-9 md:h-9 lg:w-10 lg:h-10"
              />
            </div>
          </div>
          <p className="text-xs md:text-sm lg:text-base font-semibold text-[#072635] mb-0.5 md:mb-1">
            Temperature
          </p>
          <div className="text-xl md:text-2xl lg:text-3xl font-bold text-[#072635]">
            {latestRecord.temperature.value}°F
          </div>
          <p className="text-xs text-[#707070] mt-1 md:mt-1.5 font-medium">
            {latestRecord.temperature.levels}
          </p>
        </motion.div>

        {/* Heart Rate Card */}
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-gradient-to-br from-[#E8F0FE] to-[#D8E6FC] rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-5 shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-start justify-between mb-2 md:mb-3 lg:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center bg-white rounded-4xl shadow-sm">
              <img
                src={HeartRateIcon}
                alt="Heart Rate"
                className="object-contain w-7 h-7 md:w-9 md:h-9 lg:w-10 lg:h-10"
              />
            </div>
          </div>
          <p className="text-xs md:text-sm lg:text-base font-semibold text-[#072635] mb-0.5 md:mb-1">
            Heart Rate
          </p>
          <div className="text-xl md:text-2xl lg:text-3xl font-bold text-[#072635]">
            {latestRecord.heart_rate.value} bpm
          </div>
          <p className="text-xs text-[#707070] mt-1 md:mt-1.5 font-medium">
            {latestRecord.heart_rate.levels}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DiagnosisHistory;
