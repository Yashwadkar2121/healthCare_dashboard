// src/api/patientApi.js
const API_BASE = "https://fedskillstest.coalitiontechnologies.workers.dev";

// Read credentials from environment variables (Vite)
const username = import.meta.env.VITE_API_USERNAME;
const password = import.meta.env.VITE_API_PASSWORD;

const basicAuth = btoa(`${username}:${password}`);

export const fetchPatientData = async () => {
  try {
    const response = await fetch(`${API_BASE}/patients`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basicAuth}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Find Jessica Taylor from the patients array
    const jessicaTaylor = data.find(
      (patient) => patient.name === "Jessica Taylor",
    );

    if (!jessicaTaylor) {
      throw new Error("Jessica Taylor data not found in API response");
    }

    return jessicaTaylor;
  } catch (error) {
    console.error("Failed to fetch patient data:", error);

    // Single fallback data for Jessica Taylor
    return {
      name: "Jessica Taylor",
      date_of_birth: "1996-08-23",
      gender: "Female",
      age: 28,
      profile_picture: "https://fedskillstest.ct.digital/4.png",
      phone_number: "(415) 555-1234",
      emergency_contact: "(415) 555-5678",
      insurance_type: "Sunrise Health Assurance",
      diagnosis_history: [
        {
          month: "March",
          year: 2024,
          blood_pressure: {
            systolic: {
              value: 160,
              levels: "Higher than Average",
            },
            diastolic: {
              value: 78,
              levels: "Lower than Average",
            },
          },
          heart_rate: {
            value: 78,
            levels: "Lower than Average",
          },
          respiratory_rate: {
            value: 20,
            levels: "Normal",
          },
          temperature: {
            value: 98.6,
            levels: "Normal",
          },
        },
        {
          month: "February",
          year: 2024,
          blood_pressure: {
            systolic: {
              value: 155,
              levels: "Higher than Average",
            },
            diastolic: {
              value: 76,
              levels: "Normal",
            },
          },
          heart_rate: {
            value: 76,
            levels: "Normal",
          },
          respiratory_rate: {
            value: 18,
            levels: "Normal",
          },
          temperature: {
            value: 98.4,
            levels: "Normal",
          },
        },
        {
          month: "January",
          year: 2024,
          blood_pressure: {
            systolic: {
              value: 148,
              levels: "Higher than Average",
            },
            diastolic: {
              value: 74,
              levels: "Normal",
            },
          },
          heart_rate: {
            value: 77,
            levels: "Normal",
          },
          respiratory_rate: {
            value: 19,
            levels: "Normal",
          },
          temperature: {
            value: 98.5,
            levels: "Normal",
          },
        },
        {
          month: "December",
          year: 2023,
          blood_pressure: {
            systolic: {
              value: 152,
              levels: "Higher than Average",
            },
            diastolic: {
              value: 75,
              levels: "Normal",
            },
          },
          heart_rate: {
            value: 78,
            levels: "Normal",
          },
          respiratory_rate: {
            value: 20,
            levels: "Normal",
          },
          temperature: {
            value: 98.6,
            levels: "Normal",
          },
        },
        {
          month: "November",
          year: 2023,
          blood_pressure: {
            systolic: {
              value: 145,
              levels: "Normal",
            },
            diastolic: {
              value: 72,
              levels: "Normal",
            },
          },
          heart_rate: {
            value: 75,
            levels: "Normal",
          },
          respiratory_rate: {
            value: 18,
            levels: "Normal",
          },
          temperature: {
            value: 98.3,
            levels: "Normal",
          },
        },
        {
          month: "October",
          year: 2023,
          blood_pressure: {
            systolic: {
              value: 140,
              levels: "Normal",
            },
            diastolic: {
              value: 70,
              levels: "Normal",
            },
          },
          heart_rate: {
            value: 74,
            levels: "Normal",
          },
          respiratory_rate: {
            value: 17,
            levels: "Normal",
          },
          temperature: {
            value: 98.2,
            levels: "Normal",
          },
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
      lab_results: ["Blood Tests", "CT Scans", "X-Ray", "Urinalysis"],
    };
  }
};
