const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.post("/assignTo", async (req, res) => {
  try {
    const { serviceName, serviceId, departmentName, EmployeeId } = req.body;
    const validationErrors = [];
    if (!serviceName) {
      validationErrors.push("service name is required");
    }
    if (!serviceId) {
      validationErrors.push("serviceId name is required");
    }
    if (!departmentName) {
      validationErrors.push("departmentName name is required");
    }
    if (!EmployeeId) {
      validationErrors.push("EmployeeId name is required");
    }
    if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
      }
    const db = await mongoose.connection;
    const serviceCollection = db.collection(serviceName);
    const serviceObjectId = new mongoose.Types.ObjectId(serviceId);
    const ticketExit = await serviceCollection.findOne({_id:serviceObjectId});
    if (!ticketExit) {
      return res.status(404).json("ticket does not exist");
    }
    ticketExit.ticketStatus = "assign to";
    ticketExit.assign = {
      ticketName: departmentName,
      ticketId: EmployeeId,
    };

    await serviceCollection.updateOne({ _id: serviceObjectId }, { $set: ticketExit });

    const departmentCollection = await db.collection(departmentName);
    const employeeObjectId = new mongoose.Types.ObjectId(EmployeeId);

    const departmentExit = await departmentCollection.findOne({ _id: employeeObjectId });
    if (!departmentExit) {
      return res.status(404).json("employee Id does not exist");
    }
    departmentExit.status = "occupied";
    departmentExit.assignto = {
      ticketName: serviceName,
      ticketId: serviceId,
    };
    console.log(departmentExit);

    await departmentCollection.updateOne({ _id: employeeObjectId }, { $set: departmentExit });
    
    res.json({ message: 'Ticket assigned successfully' });
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
