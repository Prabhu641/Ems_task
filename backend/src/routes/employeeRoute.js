import express from "express";
import {getEmployees,  createEmployee,updateEmployee,deleteEmployee,getEmployeeById} from "../controllers/employeeController.js";
import upload from "../middleware/fileUpload.js";

const router = express.Router();

router.get("/", getEmployees);
router.get("/:id", getEmployeeById);
router.post("/", upload.single("image"), createEmployee);  
router.put("/:id", upload.single("image"), updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;
