"use client";
import React, { useState } from "react";
import AdminLayout from "../../layout";

// Example data for employees and sites
interface Employee {
  employee_id: number;
  employee_name: string;
}

interface Site {
  site_id: number;
  site_name: string;
}

interface Shift {
  shift_id: number;
  employee_id: number;
  employee_name: string;
  site_name: string;
  shift_date: string;
  shift_start_time: string;
}

const Shifts: React.FC = () => {
  // Sample employees
  const employees: Employee[] = [
    { employee_id: 1, employee_name: "John Doe" },
    { employee_id: 2, employee_name: "Jane Smith" },
  ];

  // Sample sites
  const sites: Site[] = [
    { site_id: 1, site_name: "Site A" },
    { site_id: 2, site_name: "Site B" },
  ];

  // Shift data (could later be fetched from a database)
  const [shifts, setShifts] = useState<Shift[]>([
    {
      shift_id: 1,
      employee_id: 1,
      employee_name: "John Doe",
      site_name: "Site A",
      shift_date: "2024-09-28",
      shift_start_time: "08:00 AM",
    },
    {
      shift_id: 2,
      employee_id: 2,
      employee_name: "Jane Smith",
      site_name: "Site B",
      shift_date: "2024-09-28",
      shift_start_time: "09:00 AM",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newShift, setNewShift] = useState({
    employee_id: "",
    site_name: "",
    shift_date: "",
    shift_start_time: "",
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewShift({
      ...newShift,
      [name]: value,
    });
  };

  // Function to add a shift
  const addShift = () => {
    const selectedEmployee = employees.find(emp => emp.employee_id === Number(newShift.employee_id));
    const updatedShifts = [
      ...shifts,
      {
        shift_id: shifts.length + 1,
        employee_id: Number(newShift.employee_id),
        employee_name: selectedEmployee ? selectedEmployee.employee_name : "",
        site_name: newShift.site_name,
        shift_date: newShift.shift_date,
        shift_start_time: newShift.shift_start_time,
      },
    ];
    setShifts(updatedShifts);
    setIsModalOpen(false);
  };

  return (
    <AdminLayout>
      <h1 className="text-xl font-bold mb-3">Shifts Management</h1>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-[14px] bg-black text-white px-4 py-2 rounded-[8px] shadow"
        >
          Add Shift +
        </button>
      </div>

      {/* Shifts Table */}
      <div className="max-h-[400px] overflow-y-auto">
        <table className="min-w-full table-auto bg-white shadow rounded-lg">
          <thead className="bg-white sticky top-0 z-10 border-b border-b-[#424242] text-left">
            <tr>
              <th className="px-4 py-2 text-sm font-semibold">Employee ID</th>
              <th className="px-4 py-2 text-sm font-semibold">Employee Name</th>
              <th className="px-4 py-2 text-sm font-semibold">Site Name</th>
              <th className="px-4 py-2 text-sm font-semibold">Shift Date</th>
              <th className="px-4 py-2 text-sm font-semibold">Start Time</th>
              <th className="px-4 py-2 text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift) => (
              <tr key={shift.shift_id} className="border-b relative">
                <td className="px-4 py-2 text-sm">{shift.employee_id}</td>
                <td className="px-4 py-2 text-sm">{shift.employee_name}</td>
                <td className="px-4 py-2 text-sm">{shift.site_name}</td>
                <td className="px-4 py-2 text-sm">{shift.shift_date}</td>
                <td className="px-4 py-2 text-sm">{shift.shift_start_time}</td>
                <td className="px-4 py-2 text-sm relative">
                  {/* Icon Menu for Actions */}
                  <div className="flex items-center gap-2">
                    <button onClick={() => alert(`Editing shift for employee ${shift.employee_name}`)}>
                      <i className="bx bx-edit text-[black] text-[1rem]"></i>
                    </button>
                    <button onClick={() => alert(`Deleting shift for employee ${shift.employee_name}`)}>
                      <i className="bx bx-trash text-[black] text-[1rem]"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Shift Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-[8px] shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add New Shift</h2>
            {/* Shift Form Fields */}
            <form className="space-y-4">
              <select
                name="employee_id"
                className="w-full px-4 py-2 border rounded"
                onChange={handleInputChange}
              >
                <option value="" disabled selected>
                  Select Employee
                </option>
                {employees.map((employee) => (
                  <option key={employee.employee_id} value={employee.employee_id}>
                    {employee.employee_name} (ID: {employee.employee_id})
                  </option>
                ))}
              </select>

              <select
                name="site_name"
                className="w-full px-4 py-2 border rounded"
                onChange={handleInputChange}
              >
                <option value="" disabled selected>
                  Select Site
                </option>
                {sites.map((site) => (
                  <option key={site.site_id} value={site.site_name}>
                    {site.site_name}
                  </option>
                ))}
              </select>

              <input
                type="date"
                name="shift_date"
                placeholder="Shift Date"
                className="w-full px-4 py-2 border rounded"
                onChange={handleInputChange}
              />
              <input
                type="time"
                name="shift_start_time"
                placeholder="Start Time"
                className="w-full px-4 py-2 border rounded"
                onChange={handleInputChange}
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
                  onClick={addShift}
                >
                  Add Shift
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Shifts;
