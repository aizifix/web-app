"use client";
import React, { useState } from "react";
import AdminLayout from "../../layout";

// Leave data structure
interface Leave {
  leave_id: number;
  employee_name: string;
  email: string;
  leave_type: string;
  description: string;
  start_date: string;
  end_date: string;
  status: string;
}

const Leaves: React.FC = () => {
  const [leaves] = useState<Leave[]>([
    {
      leave_id: 1,
      employee_name: "John Doe",
      email: "john.doe@example.com",
      leave_type: "Sick Leave",
      description: "Flu and fever, needs rest",
      start_date: "2024-09-25",
      end_date: "2024-09-27",
      status: "pending",
    },
    {
      leave_id: 2,
      employee_name: "Jane Smith",
      email: "jane.smith@example.com",
      leave_type: "Vacation Leave",
      description: "Family vacation",
      start_date: "2024-10-05",
      end_date: "2024-10-10",
      status: "approved",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentLeave, setCurrentLeave] = useState<Leave | null>(null);

  // Function to open the view modal
  const viewLeave = (leave: Leave) => {
    setCurrentLeave(leave);
    setIsModalOpen(true);
  };

  return (
    <AdminLayout>
      <h1 className="text-xl font-bold mb-3">Leave Requests</h1>

      {/* Leaves Table */}
      <div className="max-h-[400px] overflow-y-auto">
        <table className="min-w-full table-auto bg-white shadow rounded-lg">
          <thead className="sticky top-0 z-10 bg-white border-b border-[#e0e0e0] text-left">
            <tr>
              <th className="px-4 py-2 text-sm font-semibold border-b-2 border-gray-300">Name</th>
              <th className="px-4 py-2 text-sm font-semibold border-b-2 border-gray-300">Email</th>
              <th className="px-4 py-2 text-sm font-semibold border-b-2 border-gray-300">Leave Type</th>
              <th className="px-4 py-2 text-sm font-semibold border-b-2 border-gray-300">Description</th>
              <th className="px-4 py-2 text-sm font-semibold border-b-2 border-gray-300">Start Date</th>
              <th className="px-4 py-2 text-sm font-semibold border-b-2 border-gray-300">End Date</th>
              <th className="px-4 py-2 text-sm font-semibold border-b-2 border-gray-300">Status</th>
              <th className="px-4 py-2 text-sm font-semibold border-b-2 border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.leave_id} className="border-b relative">
                <td className="px-4 py-2 text-sm">{leave.employee_name}</td>
                <td className="px-4 py-2 text-sm">{leave.email}</td>
                <td className="px-4 py-2 text-sm">{leave.leave_type}</td>
                <td className="px-4 py-2 text-sm">{leave.description}</td>
                <td className="px-4 py-2 text-sm">{leave.start_date}</td>
                <td className="px-4 py-2 text-sm">{leave.end_date}</td>
                <td className="px-4 py-2 text-sm">
                  {leave.status === "pending" ? (
                    <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs">
                      Pending
                    </span>
                  ) : leave.status === "approved" ? (
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                      Approved
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
                      Declined
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 text-sm relative">
                  <div className="flex items-center gap-2">
                    <button onClick={() => viewLeave(leave)}>
                      <i className="bx bx-show text-[black] text-[1rem]"></i>
                    </button>
                    <button onClick={() => alert(`Editing leave request for ${leave.employee_name}`)}>
                      <i className="bx bx-edit text-[black] text-[1rem]"></i>
                    </button>
                    <button onClick={() => alert(`Deleting leave request for ${leave.employee_name}`)}>
                      <i className="bx bx-trash text-[black] text-[1rem]"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Leave Details Modal */}
      {isModalOpen && currentLeave && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-[8px] shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Leave Details</h2>
            <p><strong>Name:</strong> {currentLeave.employee_name}</p>
            <p><strong>Date:</strong> {currentLeave.start_date} to {currentLeave.end_date}</p>
            <p><strong>Type:</strong> {currentLeave.leave_type}</p>
            <p><strong>Description:</strong> {currentLeave.description}</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded text-sm"
                onClick={() => alert("Approved")}
              >
                Approve
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded text-sm"
                onClick={() => alert("Declined")}
              >
                Decline
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded text-sm"
                onClick={() => setIsModalOpen(false)}
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

export default Leaves;
