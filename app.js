import express from "express";
import employeesRouter from "./routes/employeeRouters.js";
const app = express();
app.use(express.json());
app.get("/", (req, res)=>{res.send("Hello employees!");
});
app.use("/employees", employeesRouter);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error:"Internal Server Error" });
});
export default app;

