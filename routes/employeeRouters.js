import express from "express";
import employees from "#db/employees";
const router = express.Router();
router.get("/", (req, res) =>{
  res.json(employees);
});
router.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.json(employees[randomIndex]);
});
router.post("/", (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is required" });
  }
  const { name } = req.body;
  if (!name || name.trim() === "") {
    return res.status(400).json({ error: "Name is required" });
  }
  const maxId = employees.length>0?Math.max(...employees.map(e =>e.id)):0;
  const newEmployee = {
    id: maxId + 1,name: name.trim()
  };
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const employee = employees.find((e)=>e.id === +id);  
  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  }
  res.json(employee);
});
export default router;