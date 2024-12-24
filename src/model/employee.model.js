import mongoose,{ Schema } from "mongoose";

const employeeSchema = new Schema({
  employeeName: {
    type: String,
    require: true,
  },
  employeeEmail: {
    type: String,
    require: true,
  },
  employeeDepartment: {
    type: String,
    require: true,
  },
  employeeTitle: {
    type: String,
    require: true,
  },
});

export const Employee = mongoose.model("Employee", employeeSchema);
