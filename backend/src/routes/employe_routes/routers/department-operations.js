const express = require('express');
const router = express.Router();
const Employee = require("../../../models/departmentSchema");

router.post("/employee/create/department", async (req, res) => {
  try {
    const { department,status,role,description } = req.body;
    
    // Check if a model with the specified role already exists
    const existingModel =await Employee.findOne({department: department});

    // If the model already exists, return an error
    if (existingModel) {
      return res.status(400).json({ error: `Role '${department}' already exists.` });
    }

    // If the model doesn't exist, create a new one
    const DepartmentModel = new Employee({
      department:department,
        status:status,
        role:role,
        description:description,
    });
    await DepartmentModel.save();

    res.status(201).json({ message: 'Department created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get("/employee/get/department", async (req, res) => {
    try {
  const uniqueRole = await Employee.find();
      res.status(200).json({ message: uniqueRole });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
module.exports = router;
