import db from "../config/db.js";

// Get all employees
export const getEmployees = (req, res) => {
  try {
    const sql = "SELECT * FROM employees";
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error in query", error: err });
      }
      res.json(result);
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// Get employee by ID
export const getEmployeeById = (req, res) => {
  try {
    const { id } = req.params;
    const sql = "SELECT * FROM employees WHERE id=?";
     db.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error in query", error: err });
      }
      if (result.length === 0) return res.status(404).json({ message: "Employee not found" });
      res.json(result[0]);
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// Create new employee
export const createEmployee = (req, res) => {
  try {
    const { name, employee_id, department, designation, project, type, status } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    const sql = "INSERT INTO employees (name, employee_id, department, designation, project, type, status, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [name, employee_id, department, designation, project, type, status, image_url], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error creating employee", error: err });
      }
      res.json({ message: "Employee created successfully", employeeId: result.insertId });
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// Update employee
export const updateEmployee = (req, res) => {
  try {
    const { id } = req.params;
    const { name, employee_id, department, designation, project, type, status } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : req.body.image_url;

    const sql = "UPDATE employees SET name=?, employee_id=?, department=?, designation=?, project=?, type=?, status=?, image_url=? WHERE id=?";
    db.query(sql, [name, employee_id, department, designation, project, type, status, image_url, id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error updating employee", error: err });
      }
      if (result.affectedRows === 0) return res.status(404).json({ message: "Employee not found" });
      res.json({ message: "Employee updated successfully" });
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// Delete employee
export const deleteEmployee = (req, res) => {
  try {
    const { id } = req.params;
    const sql = "DELETE FROM employees WHERE id=?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error deleting employee", error: err });
      }
      if (result.affectedRows === 0) return res.status(404).json({ message: "Employee not found" });
      res.json({ message: " Employee deleted successfully" });
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};
