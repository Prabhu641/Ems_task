import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { User, Camera } from "lucide-react";
import axios from "axios";

function ViewEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/employees/${id}`);
        setEmployee(res.data);
      } catch (err) {
        console.error("Error fetching employee:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!employee) return <p className="text-center py-10">Employee not found</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6 space-y-6">
      <h2
        className="text-2xl font-semibold text-gray-800 cursor-pointer flex items-center gap-2"
        onClick={() => navigate("/")}
      >
        <span className="text-blue-600">&lt;</span> View Employee
      </h2>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-600 font-semibold">
          <User className="w-5 h-5" />
          <span>Personal Information</span>
        </div>
        <hr className="border-blue-500" />
      </div>

      <div className="flex items-center gap-4">
        <div className="w-28 h-28 border border-gray-300 flex items-center justify-center">
          {employee.image_url ? (
            <img
              src={`http://localhost:5000${employee.image_url}`}
              alt="profile"
              className="w-28 h-28 object-cover"
            />
          ) : (
            <Camera className="w-6 h-6 text-gray-400" />
          )}
        </div>
      </div>

      {/* Fields with lines after every 2 */}
      <div className="space-y-4 mt-4">
        {/* First 2 fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-500 font-semibold">Full Name</label>
            <p>{employee.name}</p>
          </div>
          <div>
            <label className="text-gray-500 font-semibold">Employee ID</label>
            <p>{employee.employee_id}</p>
          </div>
        </div>
        <hr className="border-gray-300" />

        {/* Next 2 fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-500 font-semibold">Department</label>
            <p>{employee.department}</p>
          </div>
          <div>
            <label className="text-gray-500 font-semibold">Designation</label>
            <p>{employee.designation}</p>
          </div>
        </div>
        <hr className="border-gray-300" />

        {/* Next 2 fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-500 font-semibold">Project</label>
            <p>{employee.project}</p>
          </div>
          <div>
            <label className="text-gray-500 font-semibold">Type</label>
            <p>{employee.type}</p>
          </div>
        </div>
        <hr className="border-gray-300" />

        {/* Last field */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-500 font-semibold">Status</label>
            <p>{employee.status}</p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default ViewEmployee;
