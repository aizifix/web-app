"use client";

import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code"; // For generating QR codes
import { useRouter } from "next/navigation"; // For navigation

const StudentDashboard: React.FC = () => {
  const [qrData, setQrData] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const router = useRouter(); // To handle logout redirection

  // Fetch QR data dynamically based on the stored student's credentials
  const fetchQrData = () => {
    const storedData = localStorage.getItem("studentData");
    if (storedData) {
      setQrData(JSON.parse(storedData));
    } else {
      setError("Failed to fetch QR data. Please log in again.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("studentData"); // Clear student data from localStorage
    router.push("/"); // Redirect to the login page
  };

  useEffect(() => {
    fetchQrData(); // Automatically fetch QR code when component mounts
  }, []);

  return (
    <div className="p-4 h-[100vh] flex flex-col items-center justify-center gap-6">
      {error && <p className="text-red-600">{error}</p>}
      {qrData ? (
        <div className="flex flex-col items-center justify-center gap-5">
          {/* Display student name, tribu, and event name */}
          <h2 className="text-xl font-semibold">Hello, {qrData.name}</h2>
          <p className="text-lg">Tribu: {qrData.tribu_name}</p>
          <p className="text-lg">Event: {qrData.event_name}</p>

          {/* QR Code Display */}
          <div className="border h-[300px] w-[300px] rounded-xl overflow-hidden">
            <QRCode className="w-full h-full" value={JSON.stringify(qrData)} />
          </div>

          {/* Optional: You can display check-in and check-out times */}
          <p>Check-in Time: {qrData.check_in_time}</p>
          <p>Check-out Time: {qrData.check_out_time}</p>
        </div>
      ) : (
        !error && <p>Loading QR code...</p>
      )}

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 mt-4 rounded w-full"
      >
        Logout
      </button>
    </div>
  );
};

export default StudentDashboard;
