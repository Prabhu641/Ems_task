import express from "express";
import dotenv from "dotenv";
import employeeRoutes from "./src/routes/employeeRoute.js";
import path from "path";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173" })); 
app.use(express.json());
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));
app.use("/api/employees", employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
