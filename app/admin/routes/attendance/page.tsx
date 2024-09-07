"use client";

import React, { useEffect, useState } from "react";
import AdminLayout from "../../layout";
import axios from "axios";

interface AttendanceRecord {
  attendance_id: number;
  first_name: string;
  last_name: string;
  tribu: string;
  event_name: string;
  event_date: string;
  check_in_time: string;
  check_out_time: string;
  status: string;
}

interface Event {
  event_id: number;
  event_name: string;
}

const Attendance: React.FC = () => {
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterDate, setFilterDate] = useState<string>("");

  // Fetch events when component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost/attendance/admin.php?action=fetchEvents"
        );
        if (response.data.success) {
          setEvents(response.data.events);
          setSelectedEvent(response.data.events[0]?.event_id || null); // Set default event if available
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Fetch attendance data whenever selectedEvent changes
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(
          `http://localhost/attendance/admin.php?action=fetchAttendance&event_id=${selectedEvent}`
        );
        if (response.data.success) {
          setAttendanceData(response.data.records);
        } else {
          setAttendanceData([]); // If no data, set empty array
        }
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    if (selectedEvent) {
      fetchAttendance();
    }
  }, [selectedEvent]);

  // Delete attendance record
  const handleDelete = async (attendanceId: number) => {
    try {
      const response = await axios.post(
        "http://localhost/attendance/admin.php?action=deleteAttendance",
        {
          attendance_id: attendanceId,
        }
      );
      if (response.data.success) {
        setAttendanceData((prev) =>
          prev.filter((record) => record.attendance_id !== attendanceId)
        );
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  // Format time to AM/PM
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    let hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // Convert to 12-hour format and handle midnight case
    return `${hour}:${minutes} ${ampm}`;
  };

  // Filter attendance data by student name and date
  const filteredData = attendanceData.filter((record) => {
    const nameMatch = `${record.first_name} ${record.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const dateMatch = filterDate ? record.event_date === filterDate : true;
    return nameMatch && dateMatch;
  });

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Attendance Management</h1>

        <div className="mb-4 flex justify-between items-center">
          <div>
            <label htmlFor="event" className="mr-2">
              Select Event:
            </label>
            <select
              id="event"
              value={selectedEvent || ""}
              onChange={(e) => setSelectedEvent(Number(e.target.value))}
              className="p-2 border rounded"
            >
              {events.map((event) => (
                <option key={event.event_id} value={event.event_id}>
                  {event.event_name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            placeholder="Search by student name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded ml-auto"
          />

          <input
            type="date"
            placeholder="Filter by date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="p-2 border rounded ml-2"
          />
        </div>

        <div>
          <table className="min-w-full table-auto border-collapse">
            <thead className="sticky">
              <tr className="border-b">
                <th className="px-4 py-2 text-left">Student Name</th>
                <th className="px-4 py-2 text-left">Tribu</th>
                <th className="px-4 py-2 text-left">Event</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">IN</th>
                <th className="px-4 py-2 text-left">OUT</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((record) => (
                  <tr key={record.attendance_id} className="border-b">
                    <td className="px-4 py-2">{`${record.first_name} ${record.last_name}`}</td>
                    <td className="px-4 py-2">{record.tribu}</td>
                    <td className="px-4 py-2">{record.event_name}</td>
                    <td className="px-4 py-2">{record.event_date}</td>
                    <td className="px-4 py-2">
                      {formatTime(record.check_in_time)}
                    </td>
                    <td className="px-4 py-2">
                      {record.check_out_time
                        ? formatTime(record.check_out_time)
                        : "Not yet checked out"}
                    </td>
                    <td className="px-4 py-2">
                      <span className="bg-[#00800067] border border-[green] p-2 rounded-xl text-[green] text-[0.8rem]">
                        {" "}
                        {record.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 relative">
                      <div className="relative inline-block">
                        <i
                          className="bx bx-dots-horizontal-rounded text-2xl cursor-pointer relative"
                          onClick={(e) => {
                            const dropdown = e.currentTarget
                              .nextElementSibling as HTMLElement;
                            dropdown.classList.toggle("hidden");
                          }}
                        ></i>
                        <div className="absolute bg-white shadow-lg rounded-md mt-1 right-0 w-32 z-50 hidden">
                          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(record.attendance_id)}
                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-2 text-center">
                    No records to show
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Attendance;
