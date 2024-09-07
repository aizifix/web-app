"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import Logo from "../public/logo.png"; // Adjust the logo path

const Login: React.FC = () => {
  const router = useRouter(); // Initialize router for navigation
  const [formData, setFormData] = useState({
    idNumber: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null); // For handling errors

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost/attendance/user.php?action=login",
        formData
      );
      const data = response.data;

      if (data.success) {
        if (data.qr_data) {
          // Store the student data in localStorage for future use in the dashboard
          localStorage.setItem("studentData", JSON.stringify(data.qr_data));
        }

        // If login is successful, check the role and redirect accordingly
        if (data.user.role === "student") {
          router.push("/student"); // Redirect to student dashboard
        } else if (data.user.role === "admin") {
          router.push("/admin"); // Redirect to admin dashboard
        } else if (data.user.role === "sbo") {
          router.push("/sbo"); // Redirect to SBO dashboard
        }
      } else {
        setError(data.error || "Unknown error occurred. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex justify-center mb-4">
        <Image
          src={Logo}
          alt="School Logo"
          className="w-24 h-24"
          width={96}
          height={96}
        />
      </div>
      <div className="border border-gray-300 m-4 px-6 py-8 rounded-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6">Log in</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="idNumber" className="block mb-2">
            ID number
          </label>
          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            className="border p-2 mb-4 w-full rounded-[0.35rem] border-gray-300"
            required
          />

          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 mb-6 w-full rounded-[0.35rem] border-gray-300"
            required
          />

          <button
            type="submit"
            className="w-full p-2 mb-4 bg-green-600 text-white rounded-[0.35rem]"
          >
            Log in
          </button>
        </form>

        <p className="text-center">
          Don’t have an account yet?{" "}
          <Link href="/register">
            <span className="font-bold text-black">Register</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
