"use client";
import React, { useState } from "react";
import AdminLayout from "../../layout";

interface Attendance {
  attendance_id: number;
  employee_name: string;
  date: string;
  check_in_time: string;
  check_out_time: string;
  status: string;
}

const Attendance: React.FC = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<Attendance[]>([
    {
      attendance_id: 1,
      employee_name: "John Doe",
      date: "2024-09-28",
      check_in_time: "09:00 AM",
      check_out_time: "05:00 PM",
      status: "present",
    },
    {
      attendance_id: 2,
      employee_name: "Jane Doe",
      date: "2024-09-28",
      check_in_time: "-",
      check_out_time: "-",
      status: "absent",
    },
    {
      attendance_id: 3,
      employee_name: "Mark Smith",
      date: "2024-09-28",
      check_in_time: "09:45 AM",
      check_out_time: "05:00 PM",
      status: "late",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [viewModalOpen, setViewModalOpen] = useState<boolean>(false);
  const [selectedAttendance, setSelectedAttendance] = useState<Attendance | null>(null);
  const [newAttendance, setNewAttendance] = useState({
    employee_name: "",
    date: "",
    check_in_time: "",
    check_out_time: "",
    status: "present",
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAttendance({
      ...newAttendance,
      [name]: value,
    });
  };

  // Function to add new attendance record
  const addAttendance = () => {
    setAttendanceRecords([...attendanceRecords, { ...newAttendance, attendance_id: Date.now() }]);
    setIsModalOpen(false);
  };

  // Function to get status color
  const getStatusClass = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-600";
      case "absent":
        return "bg-red-100 text-red-600";
      case "late":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "";
    }
  };

  // Function to view attendance details
  const viewDetails = (attendance: Attendance) => {
    setSelectedAttendance(attendance);
    setViewModalOpen(true);
  };

  return (
    <AdminLayout>
      <h1 className="text-xl font-bold mb-3">Attendance</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          <input className="border border-[#999999] p-2 rounded-[5px]" placeholder="Search attendance..." />
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-[14px] bg-black text-white px-4 py-2 rounded-[8px] shadow"
          >
            Search
          </button>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-[14px] bg-black text-white px-4 py-2 rounded-[8px] shadow"
        >
          Add Attendance +
        </button>
      </div>

      {/* Attendance Table */}
      <div className="max-h-[400px] overflow-y-auto">
        <table className="min-w-full table-auto bg-white shadow rounded-lg">
          <thead className="bg-white sticky top-0 z-10 border-b border-b-[#424242] text-left">
            <tr>
              <th className="px-4 py-2 text-sm font-semibold">Employee Name</th>
              <th className="px-4 py-2 text-sm font-semibold">Date</th>
              <th className="px-4 py-2 text-sm font-semibold">Check-in Time</th>
              <th className="px-4 py-2 text-sm font-semibold">Check-out Time</th>
              <th className="px-4 py-2 text-sm font-semibold">Status</th>
              <th className="px-4 py-2 text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record) => (
              <tr key={record.attendance_id} className="border-b relative">
                <td className="px-4 py-2 text-sm">{record.employee_name}</td>
                <td className="px-4 py-2 text-sm">{record.date}</td>
                <td className="px-4 py-2 text-sm">{record.check_in_time}</td>
                <td className="px-4 py-2 text-sm">{record.check_out_time}</td>
                <td className="px-4 py-2 text-sm">
                  <span className={`${getStatusClass(record.status)} px-2 py-1 rounded-full text-xs`}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm relative">
                  {/* Icon Menu for Actions */}
                  <div className="flex items-center gap-2">
                    <button onClick={() => viewDetails(record)}>
                      <i className="bx bx-show text-[black] text-[1rem]"></i>
                    </button>
                    <button onClick={() => alert(`Editing ${record.employee_name}`)}>
                      <i className="bx bx-edit text-[black] text-[1rem]"></i>
                    </button>
                    <button onClick={() => alert(`Deleting ${record.employee_name}`)}>
                      <i className="bx bx-trash text-[black] text-[1rem]"></i>
                    </button>
                    <button onClick={() => alert(`Archiving ${record.employee_name}`)}>
                      <i className="bx bx-archive text-[black] text-[1rem]"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Attendance Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-[8px] shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add Attendance Record</h2>
            {/* Attendance Form Fields */}
            <form className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  name="employee_name"
                  placeholder="Employee Name"
                  className="w-full px-4 py-2 border rounded"
                  onChange={handleInputChange}
                />
              </div>
              <input
                type="date"
                name="date"
                placeholder="Date"
                className="w-full px-4 py-2 border rounded"
                onChange={handleInputChange}
              />
              <input
                type="time"
                name="check_in_time"
                placeholder="Check-in Time"
                className="w-full px-4 py-2 border rounded"
                onChange={handleInputChange}
              />
              <input
                type="time"
                name="check_out_time"
                placeholder="Check-out Time"
                className="w-full px-4 py-2 border rounded"
                onChange={handleInputChange}
              />
              <select
                name="status"
                className="w-full px-4 py-2 border rounded"
                onChange={handleInputChange}
              >
                <option value="present">Present</option>
                <option value="late">Late</option>
                <option value="absent">Absent</option>
              </select>
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
                  onClick={addAttendance}
                >
                  Add Attendance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewModalOpen && selectedAttendance && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-[8px] shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Attendance Details</h2>
            <div className="space-y-4">
              <p><strong>Employee Name:</strong> {selectedAttendance.employee_name}</p>
              <p><strong>Date:</strong> {selectedAttendance.date}</p>
              <p><strong>Check-in Time:</strong> {selectedAttendance.check_in_time}</p>
              <p><strong>Check-out Time:</strong> {selectedAttendance.check_out_time}</p>
              <p><strong>Status:</strong> {selectedAttendance.status.charAt(0).toUpperCase() + selectedAttendance.status.slice(1)}</p>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setViewModalOpen(false)}
                className="bg-[black] text-white px-4 py-2 rounded text-[14px]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Attendance;
