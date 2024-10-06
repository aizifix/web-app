"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "../public/logo.png";

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

  // Mock login logic without using Axios
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Predefined admin credentials
    const mockAdminCredentials = {
      idNumber: "admin",
      password: "123",
    };

    // Validate login details
    if (
      formData.idNumber === mockAdminCredentials.idNumber &&
      formData.password === mockAdminCredentials.password
    ) {
      // Mock successful login as admin
      router.push("/admin/routes/dashboard"); // Redirect to admin dashboard
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex justify-center items-center py-3">
        <Image alt="Logo" src={Logo} height={100} />
      </div>
      <div className="border border-gray-300 m-4 px-6 py-8 rounded-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6">Log in</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="idNumber" className="block mb-2">
            Username
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
            className="w-full p-2 mb-4 bg-[black] text-white rounded-[0.35rem]"
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
