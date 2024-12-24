import express from "express"
import employeeRoute from "./routes/employee.routes.js"

const app = express();
app.use(express.json());


app.use("/api/employee", employeeRoute);




export {app};
