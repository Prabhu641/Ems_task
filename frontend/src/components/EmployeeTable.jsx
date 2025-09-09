import React, { useEffect, useState } from "react";
import axios from "axios";
import { Eye, PencilLineIcon, Trash2, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/employees");
        setEmployees(res.data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const openDeleteModal = (emp) => {
    setSelectedEmployee(emp);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/employees/${selectedEmployee.id}`
      );
      setEmployees(employees.filter((emp) => emp.id !== selectedEmployee.id));
      setShowModal(false);
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.employee_id.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-700">Employee</h1>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              className="border p-2 pl-8 rounded w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() => (window.location.href = "/add-employee")}
            className="px-4 py-2 bg-blue-600 text-white rounded flex gap-2"
          >
            <span className="w-6 h-6 flex items-center justify-center border border-white rounded-full text-white font-bold bg-transparent">
              +
            </span>{" "}
            Add New Employee
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm text-left border-gray-600 border">
          <thead className="bg-white text-gray-600 font-normal text-sm border-gray-600 border">
            <tr>
              <th className="px-6 py-3 font-normal">Employee Name</th>
              <th className="px-6 py-3 font-normal">Employee ID</th>
              <th className="px-6 py-3 font-normal">Department</th>
              <th className="px-6 py-3 font-normal">Designation</th>
              <th className="px-6 py-3 font-normal">Project</th>
              <th className="px-6 py-3 font-normal">Type</th>
              <th className="px-6 py-3 font-normal">Status</th>
              <th className="px-6 py-3 font-normal">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                  No Records Found
                </td>
              </tr>
            ) : (
              filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center gap-3 text-black">
                    {emp.image_url ? (
                      <img
                        src={`http://localhost:5000${emp.image_url}`}
                        alt={emp.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                        {emp.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span>{emp.name}</span>
                  </td>
                  <td className="px-6 py-4 text-black">{emp.employee_id}</td>
                  <td className="px-6 py-4 text-black">{emp.department}</td>
                  <td className="px-6 py-4 text-black">{emp.designation}</td>
                  <td className="px-6 py-4 text-black">{emp.project}</td>
                  <td className="px-6 py-4 text-black">{emp.type}</td>
                  <td className="px-6 py-4 text-black">{emp.status}</td>
                  <td className="px-6 py-4 flex items-center gap-4 text-black">
                    {/* View Icon */}
                    <Eye
                      size={20}
                      className="cursor-pointer hover:text-blue-600"
                      onClick={() => navigate(`/view-employee/${emp.id}`)}
                    />
                    {/* Edit Icon */}
                    <PencilLineIcon
                      size={20}
                      className="cursor-pointer hover:text-yellow-500"
                      onClick={() => navigate(`/edit-employee/${emp.id}`)}
                    />
                    {/* Delete Icon */}
                    <Trash2
                      size={20}
                      className="cursor-pointer hover:text-red-600"
                      onClick={() => openDeleteModal(emp)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 flex flex-col items-center">
            <Trash2 className="text-blue-600 w-12 h-12 mb-4" />
            <h3 className="text-center text-lg font-semibold mb-6">
              Are you sure you want to delete
            </h3>
            <div className="flex gap-2 w-full">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
