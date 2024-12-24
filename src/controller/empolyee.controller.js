import { Employee } from "../model/employee.model.js";

export const getAllEmployee = async (req, res) => {
  try {
    const allEmployeeData = await Employee.find();
    return res.status(200).json(allEmployeeData);
  } catch (error) {
    res.status(500).json({ error: "Failed to get employee detail" });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { employeeName, employeeEmail, employeeDepartment, employeeTitle } =
      req.body;

    // validation, checking if any field is empty
    if (
      [employeeName, employeeEmail, employeeDepartment, employeeTitle].some(
        (field) => field?.trim() === ""
      )
    ) {
      return res.status(400).json("All field required");
    }

    //checking if employee already exists
    const existingEmployee = await Employee.findOne({
      $or: [{ employeeName }, { employeeEmail }],
    });
    if (existingEmployee) {
      return res.status(400).json("Employee already exist");
    }

    //create employee
    const employee = await Employee.create({
      employeeName,
      employeeEmail,
      employeeDepartment,
      employeeTitle,
    });

    //check employee created
    const createdEmployee = await Employee.findById(employee._id);

    if (!createdEmployee) {
      return res
        .status(400)
        .json("Something went wrong while registering employee");
    }

    return res.status(200).json({
      message: "Employee Created Successfully",
      employee: createdEmployee,
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: "Failed to create employee" });
  }
};

export const updateEmployeeData = async (req, res) => {
  try {
    const { empId } = req.params;
    const { employeeName, employeeEmail, employeeDepartment, employeeTitle } =
      req.body;

    const updatedEmployeeData = await Employee.findByIdAndUpdate(
      empId,
      {
        $set: {
          employeeName,
          employeeEmail,
          employeeDepartment,
          employeeTitle,
        },
      },
      { new: true }
    );

    if (!updatedEmployeeData) {
      return res.status(400).json("Data not updated");
    }

    return res.status(200).json("Data updated successfully!!");
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json("Failed to update employee data");
  }
};

export const getSpecificEmployee = async (req, res) => {
  try {
    const { empId } = req.params;
    const employeeData = await Employee.findById(empId);

    if (!employeeData) {
      return res.status(404).json("Employee not found");
    }

    return res.status(200).json(employeeData);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json("Faild to get Employee Data");
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { empId } = req.params;

    const isEmployeeExist = await Employee.findById(empId);

    if (!isEmployeeExist) {
      return res.status(404).json("Employee Not Found");
    }

    const deleteEmployee = await Employee.findByIdAndDelete(empId);
    if (!deleteEmployee) {
      return res.status(400).json("Employee Not Found");
    }

    return res.status(200).json("Employee Deleted Successfully!");
  } catch (error) {
    res.status(500).json("Failed to delete employee");
  }
};

export const getEmployeeByName = async (req, res) => {
  try {
    const { name } = req.query;
    const employeeData = await Employee.findOne({ employeeName: name });

    if (!employeeData) {
      return res.status(404).json("Employee not found");
    }

    return res.status(200).json(employeeData);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json("Failed to get Employee Data");
  }
};
