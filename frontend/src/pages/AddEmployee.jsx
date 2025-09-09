import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, User } from "lucide-react";
import axios from "axios";

function AddEmployee() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    employee_id: "",
    department: "",
    designation: "",
    project: "",
    type: "",
    status: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));

      await axios.post("http://localhost:5000/api/employees", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/"); // back to table
    } catch (err) {
      console.error("Error adding employee:", err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-8 space-y-8">

            {/* Heading with back */}
            <h2
              className="text-2xl font-semibold text-gray-800 cursor-pointer flex items-center gap-3"
              onClick={() => navigate("/")}
            >
              <span className="text-blue-600 text-2xl font-bold">&lt;</span> Add New Employee
            </h2>

            {/* Personal Information Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-600 font-semibold text-lg">
                <User className="w-6 h-6" />
                <span>Personal Information</span>
              </div>
              <hr className="border-t-2 border-blue-500" />
            </div>

            {/* Profile Upload */}
            <div className="flex items-center gap-6">
              <label className="relative w-28 h-28 cursor-pointer">
                {formData.image ? (
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="profile"
                    className="w-28 h-28 object-cover border border-gray-300 rounded"
                  />
                ) : (
                  <div className="w-28 h-28 border-2 border-gray-300 flex items-center justify-center text-gray-400 rounded">
                    <Camera className="w-6 h-6" />
                  </div>
                )}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name & Employee ID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Full Name <span className="text-black">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    onChange={handleChange}
                    className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Employee ID <span className="text-black">*</span>
                  </label>
                  <input
                    type="text"
                    name="employee_id"
                    placeholder="Enter Employee ID"
                    onChange={handleChange}
                    className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Department & Designation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Department <span className="text-black">*</span>
                  </label>
                  <select
                    name="department"
                    onChange={handleChange}
                    className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="HR">HR</option>
                    <option value="Development">Development</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Designation <span className="text-black">*</span>
                  </label>
                  <select
                    name="designation"
                    onChange={handleChange}
                    className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Designation</option>
                    <option value="Manager">Manager</option>
                    <option value="Team Lead">Team Lead</option>
                    <option value="Developer">Developer</option>
                    <option value="Intern">Intern</option>
                  </select>
                </div>
              </div>

              {/* Project & Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Project {/* optional */}
                  </label>
                  <input
                    type="text"
                    name="project"
                    placeholder="Enter Project"
                    onChange={handleChange}
                    className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Type <span className="text-black">*</span>
                  </label>
                  <select
                    name="type"
                    onChange={handleChange}
                    className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Intern">Intern</option>
                  </select>
                </div>
              </div>

              {/* Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Status <span className="text-black">*</span>
                  </label>
                  <select
                    name="status"
                    onChange={handleChange}
                    className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div></div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-2 border rounded hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Confirm
                </button>
              </div>

            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddEmployee;
