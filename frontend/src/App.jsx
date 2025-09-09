import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Employees from "./pages/Employees.jsx";
import AddEmployee from "./pages/AddEmployee.jsx";
import EditEmployee from "./pages/EditEmployee.jsx";
import ViewEmployee from "./pages/ViewEmployee.jsx";
function App() {
  return (
 
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Employees />} />
          <Route path="add-employee" element={<AddEmployee />} />
             <Route path="edit-employee/:id" element={<EditEmployee />} />
             <Route path="/view-employee/:id" element={<ViewEmployee />} />

        </Route>
      </Routes>
    
  );
}

export default App;
