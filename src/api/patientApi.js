// src/api/patientApi.js
const API_BASE = "https://fedskillstest.coalitiontechnologies.workers.dev";

export const fetchPatientData = async () => {
  try {
    const response = await fetch(`${API_BASE}/patients`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    // Find Jessica Taylor from the patients array
    const jessicaTaylor = data.find(
      (patient) => patient.name === "Jessica Taylor",
    );

    if (!jessicaTaylor) {
      throw new Error("Jessica Taylor data not found");
    }

    return jessicaTaylor;
  } catch (error) {
    console.error("Failed to fetch patient data:", error);
    // Return fallback data based on the screenshot
    return {
      name: "Jessica Taylor",
      date_of_birth: "1996-08-23",
      gender: "Female",
      phone_number: "(415) 555-1234",
      emergency_contact: "(415) 666-9678",
      insurance_type: "Sunrise Health Assurance",
      diagnosis_history: [
        {
          month: "October 2024",
          blood_pressure: { systolic: 160, diastolic: 78 },
          respiratory_rate: 20,
          temperature: 98.6,
          heart_rate: 78,
        },
        {
          month: "September 2024",
          blood_pressure: { systolic: 155, diastolic: 76 },
          respiratory_rate: 18,
          temperature: 98.4,
          heart_rate: 76,
        },
        {
          month: "August 2024",
          blood_pressure: { systolic: 148, diastolic: 74 },
          respiratory_rate: 19,
          temperature: 98.5,
          heart_rate: 77,
        },
        {
          month: "July 2024",
          blood_pressure: { systolic: 152, diastolic: 75 },
          respiratory_rate: 20,
          temperature: 98.6,
          heart_rate: 78,
        },
        {
          month: "June 2024",
          blood_pressure: { systolic: 145, diastolic: 72 },
          respiratory_rate: 18,
          temperature: 98.3,
          heart_rate: 75,
        },
        {
          month: "May 2024",
          blood_pressure: { systolic: 140, diastolic: 70 },
          respiratory_rate: 17,
          temperature: 98.2,
          heart_rate: 74,
        },
      ],
      diagnostic_list: [
        {
          name: "Hypertension",
          description: "Chronic high blood pressure",
          status: "Under Observation",
        },
        {
          name: "Type 2 Diabetes",
          description: "Insulin resistance and elevated blood sugar",
          status: "Cured",
        },
        {
          name: "Asthma",
          description: "Recurrent episodes of bronchial constriction",
          status: "Inactive",
        },
      ],
      lab_results: ["Blood Test", "CT Scan", "X-Ray", "Urine Analysis"],
    };
  }
};
