"use client";
import React, { useState, useEffect } from "react";
import AdminLayout from "../../layout";
import axios from "axios";

// Define interfaces
interface Position {
  position_id: number;
  position_name: string;
}

interface Employee {
  employee_id: number;
  first_name: string;
  last_name: string;
  position_id: number;
  email: string;
  phone_number: string;
  username: string;
  password?: string;
  status: string;
}

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({
    first_name: "",
    last_name: "",
    position_id: 0, // Fix the position_id to use a number
    email: "",
    phone_number: "",
    username: "",
    password: "",
    status: "active",
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fetch positions and employees from the backend
  useEffect(() => {
    const fetchPositionsAndEmployees = async () => {
      try {
        const positionsResponse = await axios.get(
          "http://localhost/attendance-api/admin.php?action=fetchPositions"
        );
        const employeesResponse = await axios.get(
          "http://localhost/attendance-api/admin.php?action=fetchEmployees"
        );

        if (positionsResponse.data.success) {
          setPositions(positionsResponse.data.positions);
        } else {
          console.error("Error fetching positions:", positionsResponse.data.error);
        }

        if (employeesResponse.data.success) {
          setEmployees(employeesResponse.data.employees);
        } else {
          console.error("Error fetching employees:", employeesResponse.data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPositionsAndEmployees();
  }, []);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value,
    });
  };

  const saveEmployee = async () => {
    try {
      console.log("Submitting Employee:", newEmployee);
  
      const response = await axios.post(
        "http://localhost/attendance-api/admin.php?action=addEmployee",
        newEmployee
      );
  
      console.log("Response from backend:", response.data); // Log the full response
  
      if (response.data.success) {
        const savedEmployee = {
          ...newEmployee,
          employee_id: response.data.employee_id,
        } as Employee;
  
        // Add the new employee to the list
        setEmployees([...employees, savedEmployee]);
  
        // Show a success message
        setToastMessage(`${newEmployee.first_name} added to employees`);
  
        // Collapse modal after submission
        setIsModalOpen(false);
  
        // Remove the toast after 3 seconds
        setTimeout(() => setToastMessage(null), 3000);
      } else {
        // Show a detailed error message
        const errorMsg = response.data.error || "Unknown error occurred";
        setToastMessage(errorMsg);
  
        // Remove the toast after 3 seconds
        setTimeout(() => setToastMessage(null), 3000);
        console.error("Error adding employee:", errorMsg);
      }
    } catch (error) {
      // Log the actual error object for more detail
      console.error("Error in saveEmployee function:", error);
  
      setToastMessage("Error adding employee");
      setTimeout(() => setToastMessage(null), 3000);
    }
  };
  

  return (
    <AdminLayout>
      {/* Display toast message */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded">
          {toastMessage}
        </div>
      )}

      <h1 className="text-xl font-bold mb-3">Employee Management</h1>
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-[14px] bg-black text-white px-4 py-2 rounded-[8px] shadow"
        >
          Add Employee +
        </button>
      </div>

      {/* Employee Table */}
      <div className="max-h-[400px] overflow-y-auto">
        <table className="min-w-full table-auto bg-white shadow rounded-lg">
          <thead className="bg-white sticky top-0 z-10 border-b border-b-[#424242] text-left">
            <tr>
              <th className="px-4 py-2 text-sm font-semibold">Name</th>
              <th className="px-4 py-2 text-sm font-semibold">Position</th>
              <th className="px-4 py-2 text-sm font-semibold">Email</th>
              <th className="px-4 py-2 text-sm font-semibold">Phone</th>
              <th className="px-4 py-2 text-sm font-semibold">Status</th>
              <th className="px-4 py-2 text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employee_id} className="border-b relative">
                <td className="px-4 py-2 text-sm">
                  {employee.first_name} {employee.last_name}
                </td>
                <td className="px-4 py-2 text-sm">
                  {positions.find((pos) => pos.position_id === employee.position_id)?.position_name || "N/A"}
                </td>
                <td className="px-4 py-2 text-sm">{employee.email}</td>
                <td className="px-4 py-2 text-sm">{employee.phone_number}</td>
                <td className="px-4 py-2 text-sm">
                  {employee.status === "active" ? (
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                      Active
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 text-sm relative">
                  <div className="flex items-center gap-2">
                    <button>
                      <i className="bx bx-edit text-[black] text-[1rem]"></i>
                    </button>
                    <button>
                      <i className="bx bx-trash text-[black] text-[1rem]"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Employee Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-[8px] shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add New Employee</h2>
            <form className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  className="w-full px-4 py-2 border rounded"
                  onChange={handleInputChange}
                  value={newEmployee.first_name}
                />
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  className="w-full px-4 py-2 border rounded"
                  onChange={handleInputChange}
                  value={newEmployee.last_name}
                />
              </div>

              <select
                name="position_id"
                className="w-full px-4 py-2 border rounded"
                onChange={handleInputChange}
                value={newEmployee.position_id?.toString() || ""}
              >
                <option value="" disabled>
                  Select Position
                </option>
                {positions.map((position) => (
                  <option key={position.position_id} value={position.position_id.toString()}>
                    {position.position_name}
                  </option>
                ))}
              </select>

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded"
                onChange={handleInputChange}
                value={newEmployee.email}
              />
              <input
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                className="w-full px-4 py-2 border rounded"
                onChange={handleInputChange}
                value={newEmployee.phone_number}
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="w-full px-4 py-2 border rounded"
                onChange={handleInputChange}
                value={newEmployee.username}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded"
                onChange={handleInputChange}
                value={newEmployee.password}
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="border border-[black] text-[black] px-4 py-2 rounded text-[14px]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-[black] text-white px-4 py-2 rounded text-[14px]"
                  onClick={saveEmployee}
                >
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Employees;
