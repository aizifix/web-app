"use client";

import { useState } from "react";
import QrScanner from "react-qr-scanner";
import axios from "axios";
import Link from "next/link"; // Import Link for navigation

const SimpleQRScanner: React.FC = () => {
  const [qrData, setQrData] = useState<string | null>(null);
  const [attendanceStatus, setAttendanceStatus] = useState<string>("");
  const [isScanning, setIsScanning] = useState<boolean>(true); // Toggle scanning
  const [inputValue, setInputValue] = useState<string>(""); // State to manage input value

  // Function to handle QR scan result
  const handleScan = async (data: any) => {
    if (data && data.text) {
      const scannedData = JSON.parse(data.text); // Assuming QR data is in JSON format
      setQrData(scannedData); // Save the scanned data locally
      console.log(`ScannedQRCode: ${data.text}`);

      try {
        // Send the scanned data to the backend via Axios
        const response = await axios.post(
          "http://localhost/attendance/user.php?action=handleAttendance",
          {
            student_id: scannedData.student_id,
            event_id: scannedData.event_id,
          }
        );

        // Update the attendance status based on the response from the backend
        if (response.data.success) {
          setAttendanceStatus(response.data.message); // e.g., "Checked in successfully"
        } else if (response.data.error) {
          setAttendanceStatus(response.data.error); // e.g., "Error: Already checked out"
        }
      } catch (error) {
        console.error("Error updating attendance:", error);
        setAttendanceStatus("Failed to update attendance.");
      }
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  // Function to toggle scanning on/off
  const toggleScanning = () => {
    setIsScanning((prev) => !prev);
    setQrData(null); // Reset QR data when toggling
    setAttendanceStatus(""); // Reset the status message
  };

  // Function to reset the scanning result
  const resetScan = () => {
    setQrData(null); // Clear QR data
    setAttendanceStatus(""); // Clear status message
    setIsScanning(true); // Enable scanning again
    setInputValue(""); // Reset input field
  };

  // Handle input text change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-black p-4">
      {/* Header */}
      <div className="w-full flex justify-between items-center p-4 bg-black">
        <div>
          <h2 className="text-2xl font-semibold text-white">Hello</h2>
          <p className="text-xl text-white">Clitz Partosa</p>
          <span className="bg-gray-700 text-white p-1 rounded text-sm">
            Developer
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <i className="bx bx-bell text-white" />
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-600">
            <img src="/path-to-image.jpg" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <i className="bx bx-menu text-white" />
        </div>
      </div>

      {/* Dashboard */}
      <div className="w-full p-4">
        <h3 className="text-2xl font-bold text-white">Dashboard</h3>

        {/* Attendance Progress Bar */}
        <div className="my-4">
          <p className="text-lg text-white">Attendance</p>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: "69%" }} // Hardcoded to 69% for the example
            ></div>
          </div>
          <p className="text-right text-sm mt-1 text-white">69%</p>
        </div>

        {/* Leaves Progress Bar */}
        <div className="my-4">
          <p className="text-lg text-white">Leaves</p>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: "50%" }} // Hardcoded for 3 out of 6 leaves
            ></div>
          </div>
          <p className="text-right text-sm mt-1 text-white">3 out of 6</p>
        </div>
      </div>

      {/* QR Code Scanner Button */}
      <div className="fixed bottom-4 w-full flex justify-center">
        <Link href="/employee/scanner">
          <button className="flex items-center justify-center bg-gray-800 text-white p-4 rounded-full shadow-lg">
            <i className="bx bx-qr-scan text-white" />
            <span className="ml-2">Scan QR</span>
          </button>
        </Link>
      </div>

      {/* Input Field for Additional Info after Scan */}
      {qrData && (
        <div className="mt-6 w-full">
          <label htmlFor="additionalInfo" className="block text-white">
            Additional Information:
          </label>
          <input
            id="additionalInfo"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="w-full p-2 mt-2 bg-gray-800 text-white rounded-lg"
            placeholder="Enter additional info..."
          />
        </div>
      )}
    </div>
  );
};

export default SimpleQRScanner;
