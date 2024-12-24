import express from "express"
import { createEmployee, deleteEmployee, getAllEmployee, getSpecificEmployee, updateEmployeeData,getEmployeeByName } from "../controller/empolyee.controller.js";

const route = express.Router();

route.get("/all",getAllEmployee)
route.post("/new",createEmployee)
route.get("/find/:empId", getSpecificEmployee)
route.put("/update/:empId",updateEmployeeData)
route.delete("/delete/:empId",deleteEmployee)
route.get("/findByName",getEmployeeByName);

export default route;

