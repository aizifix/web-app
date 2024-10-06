"use client";
import React, { useState } from "react";
import AdminLayout from "../../layout";

interface Site {
  site_id: number;
  site_name: string;
  site_location: string;
  status: string;
}

const Sites: React.FC = () => {
  const [sites, setSites] = useState<Site[]>([
    {
      site_id: 1,
      site_name: "Site A",
      site_location: "Location A",
      status: "active",
    },
    {
      site_id: 2,
      site_name: "Site B",
      site_location: "Location B",
      status: "inactive",
    },
    // Add more site records if needed
  ]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showActions, setShowActions] = useState<number | null>(null); // Track the open action menu
  const [newSite, setNewSite] = useState({
    site_name: "",
    site_location: "",
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSite({
      ...newSite,
      [name]: value,
    });
  };

  // Function to handle adding a site
  const addSite = () => {
    const updatedSites = [
      ...sites,
      {
        site_id: sites.length + 1,
        site_name: newSite.site_name,
        site_location: newSite.site_location,
        status: "active", // Default status for new sites
      },
    ];
    setSites(updatedSites);
    setIsModalOpen(false);
  };

  // Function to toggle action menu visibility
  const toggleActions = (siteId: number) => {
    setShowActions((prev) => (prev === siteId ? null : siteId));
  };

  return (
    <AdminLayout>
      <h1 className="text-xl font-bold mb-3">Site Management</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          <input
            className="border border-[#999999] p-2 rounded-[5px]"
            placeholder="Search sites..."
          />
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
          Add Site +
        </button>
      </div>

      {/* Site Table */}
      <div className="max-h-[400px] overflow-y-auto">
        <table className="min-w-full table-auto bg-white shadow rounded-lg">
          <thead className="bg-white sticky top-0 z-10 border-b border-b-[#424242] text-left">
            <tr>
              <th className="px-4 py-2 text-sm font-semibold">Site Name</th>
              <th className="px-4 py-2 text-sm font-semibold">Location</th>
              <th className="px-4 py-2 text-sm font-semibold">Status</th>
              <th className="px-4 py-2 text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site) => (
              <tr key={site.site_id} className="border-b relative">
                <td className="px-4 py-2 text-sm">{site.site_name}</td>
                <td className="px-4 py-2 text-sm">{site.site_location}</td>
                <td className="px-4 py-2 text-sm">
                  {site.status === "active" ? (
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
                  {/* Icon Menu for Actions */}
                  <div className="flex items-center gap-2">
                    <button onClick={() => alert(`Editing ${site.site_name}`)}>
                      <i className="bx bx-edit text-[black] text-[1rem]"></i>
                    </button>
                    <button onClick={() => alert(`Deleting ${site.site_name}`)}>
                      <i className="bx bx-trash text-[black] text-[1rem]"></i>
                    </button>
                    <button onClick={() => alert(`Archiving ${site.site_name}`)}>
                      <i className="bx bx-archive text-[black] text-[1rem]"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Site Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-[8px] shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add New Site</h2>
            {/* Site Form Fields */}
            <form className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  name="site_name"
                  placeholder="Site Name"
                  className="w-full px-4 py-2 border rounded"
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="site_location"
                  placeholder="Site Location"
                  className="w-full px-4 py-2 border rounded"
                  onChange={handleInputChange}
                />
              </div>
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
                  onClick={addSite}
                >
                  Add Site
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Sites;
