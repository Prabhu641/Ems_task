import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Camera, User } from "lucide-react";
import axios from "axios";

function EditEmployee() {
  const { id } = useParams();
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
    image_url: null,
  });

  const [loading, setLoading] = useState(true);

  const departments = ["HR", "Finance", "Engineering", "Marketing"];
  const designations = ["Manager", "Team Lead", "Developer", "Intern"];
  const types = ["Full-time", "Intern"];
  const statuses = ["Active", "Inactive"];

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/employees/${id}`);
        const emp = res.data;
        setFormData({
          name: emp.name || "",
          employee_id: emp.employee_id || "",
          department: emp.department || "",
          designation: emp.designation || "",
          project: emp.project || "",
          type: emp.type || "",
          status: emp.status || "",
          image: null,
          image_url: emp.image_url || null,
        });
      } catch (err) {
        console.error("Error fetching employee:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
      ...(files && { image_url: null }),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) data.append(key, formData[key]);
      });

      await axios.put(`http://localhost:5000/api/employees/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/");
    } catch (err) {
      console.error("Error updating employee:", err);
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="flex justify-center py-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-4xl bg-white shadow rounded-lg p-6 space-y-6">

        {/* Heading */}
        <h2
          className="text-2xl font-semibold text-gray-800 cursor-pointer flex items-center gap-2"
          onClick={() => navigate("/")}
        >
          <span className="text-blue-600">&lt;</span> Edit Employee
        </h2>

        {/* Personal Info Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600 font-semibold">
            <User className="w-5 h-5" />
            <span>Personal Information</span>
          </div>
          <hr className="border-blue-500" />
        </div>

        {/* Profile Upload */}
        <div className="flex items-center gap-4">
          <label className="relative w-28 h-28 cursor-pointer">
            {formData.image ? (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="profile"
                className="w-28 h-28 object-cover border border-gray-300"
              />
            ) : formData.image_url ? (
              <img
                src={`http://localhost:5000${formData.image_url}`}
                alt="profile"
                className="w-28 h-28 object-cover border border-gray-300"
              />
            ) : (
              <div className="w-28 h-28 border border-gray-300 flex items-center justify-center text-gray-400">
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name & Employee ID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              name="employee_id"
              placeholder="Employee ID"
              value={formData.employee_id || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* Department & Designation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="department"
              value={formData.department || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep} value={dep}>{dep}</option>
              ))}
            </select>

            <select
              name="designation"
              value={formData.designation || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Designation</option>
              {designations.map((des) => (
                <option key={des} value={des}>{des}</option>
              ))}
            </select>
          </div>

          {/* Project & Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="project"
              placeholder="Project"
              value={formData.project || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <select
              name="type"
              value={formData.type || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Type</option>
              {types.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Status & (Optional empty for layout alignment) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="status"
              value={formData.status || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Status</option>
              {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            {/* Empty div for alignment */}
            <div></div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEmployee;
