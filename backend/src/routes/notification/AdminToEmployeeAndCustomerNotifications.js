const express = require("express");
const router = express.Router();
const Notification = require("../../models/CusToAdminNotificationModel");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

// Route to create a new notification
// router.post("/AdminToEmployeeAndCustomerNotifications", async (req, res) => {
//   try {
//     console.log("assignedto",req.body);

//     const {sender,assignTo,message}=req.body;
//     const recipient=assignTo.employeeId;
//     const ticketid=assignTo.ticketId;
//     const department = assignTo.ticketName+'s';
    
//     const existingNotification = await Notification.findOne({ recipient });
//     const db = mongoose.connection;
//     const Employeecollection = db.collection("employeeschemas");
//     const employeeresult = await Employeecollection.findOne({
//       _id: new ObjectId(sender),
//     });


//     const Customercollection = db.collection(department);
   
//     const Customerresult = await Customercollection.findOne({
//       _id: new ObjectId(ticketid),
//     });

//     console.log("Customerresult",Customerresult);
//     recipient2=Customerresult.customerID;


//     const existingNotification2 = await Notification.findOne({ recipient2 });

//     console.log("employeeresult",employeeresult);
//     if(existingNotification && existingNotification2){
//       existingNotification.notificationsData.push({
//         senderEmail: employeeresult.email,
//         message: message,
//       });


//       existingNotification2.notificationsData.push({
//         senderEmail: employeeresult.email,
//         message: message,
//       });

//       await existingNotification.save();
//       await existingNotification2.save();
//       res.status(200).json({existingNotification,existingNotification2});

//     }else{
//       const newNotification = new Notification({
//         recipient: recipient,
//         notificationsData: [
//           {
//             senderEmail: employeeresult.email,
//             message: message,
//           },
//         ],
//       });
//       const newNotification2 = new Notification({
//         recipient: recipient2,
//         notificationsData: [
//           {
//             senderEmail: employeeresult.email,
//             message: message,
//           },
//         ],
//       });

//       await newNotification.save();
//       await newNotification2.save();
//       res.status(201).json({newNotification,newNotification2});
//     }
    
//     // res.status(200).json({message:"Success"});
//   }catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });


// Route to create a new notification
router.post("/AdminToEmployeeAndCustomerNotifications", async (req, res) => {
  try {
    const { sender, assignTo,CustomerMessage,EmployeeMessage } = req.body;
    console.log("assignedto", req.body);
    const recipient = assignTo.employeeId;
    const ticketId = assignTo.ticketId;
    const department = assignTo.ticketName;

    const db = mongoose.connection;
    const EmployeeCollection = db.collection("employeeschemas");
    const CustomerCollection = db.collection(department);

    const [employeeResult, customerResult] = await Promise.all([
      EmployeeCollection.findOne({ _id: new ObjectId(sender) }),
      CustomerCollection.findOne({ _id: new ObjectId(ticketId) })
    ]);

    if (!employeeResult || !customerResult) {
      return res.status(404).json({ message: "Employee or Customer not found" });
    }

    const existingEmployeeNotification = await Notification.findOne({ recipient });
    const existingCustomerNotification = await Notification.findOne({ recipient: customerResult.customerID });

    if (existingEmployeeNotification && existingCustomerNotification) {
      existingEmployeeNotification.notificationsData.push({
        senderEmail: employeeResult.email,
        message: EmployeeMessage,
      });

      existingCustomerNotification.notificationsData.push({
        senderEmail: employeeResult.email,
        message: CustomerMessage,
      });

      await Promise.all([
        existingEmployeeNotification.save(),
        existingCustomerNotification.save()
      ]);

      res.status(200).json({ existingEmployeeNotification, existingCustomerNotification });
    } else {
      const newEmployeeNotification = new Notification({
        recipient: recipient,
        notificationsData: [{
          senderEmail: employeeResult.email,
          message: EmployeeMessage,
        }],
      });

      const newCustomerNotification = new Notification({
        recipient: customerResult.customerID,
        notificationsData: [{
          senderEmail: employeeResult.email,
          message: CustomerMessage,
        }],
      });

      await Promise.all([
        newEmployeeNotification.save(),
        newCustomerNotification.save()
      ]);

      res.status(201).json({ newEmployeeNotification, newCustomerNotification });
    }

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


























// Route to get all notifications for a user
router.get("/AdminToEmployeeAndCustomerNotifications/:Id", async (req, res) => {
  try {
    const Id = req.params.Id;
    const notifications = await Notification.find({ recipient: Id });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put('/AdminToEmployeeAndCustomerNotifications/:id', async (req, res) => {
  try {
    const notificationId = req.params.id;

    const recipientid=req.body.tokenData.id;
    console.log("recipientid",recipientid);
    // Find the recipient document
    const recipient = await Notification.findOne({ recipient: recipientid });

    if (!recipient) {
      console.log("Recipient not found");
      return res.status(404).json({ error: 'Recipient not found' });
    }

    const notificationIndex = recipient.notificationsData.findIndex(notification => String(notification._id) === notificationId);
    console.log("index",notificationIndex);
    if (notificationIndex === -1) {
      console.log("Notification not found");
      return res.status(404).json({ error: 'Notification not found' });
    }

    recipient.notificationsData.splice(notificationIndex, 1);

    // Save the updated recipient document
    await recipient.save();

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating notification status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
