const express = require("express");
const router = express.Router();
const Notification = require("../../models/CusToAdminNotificationModel");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

// Route to create a new notification
router.post("/CustomerToAdminNotifications", async (req, res) => {
  try {
    const { sender, message } = req.body;
   

    const db = mongoose.connection;
    const admincollection = db.collection("admins");
    const results = await admincollection.find({}).toArray();

    // Select a random admin from the results
    const randomAdminIndex = Math.floor(Math.random() * results.length);
    const recipient = results[randomAdminIndex]._id; // Assuming _id is the admin ID field
    // Check if there's an existing notification for the recipient admin
    const existingNotification = await Notification.findOne({ recipient });
    // Assuming `sender` holds the `_id` value for which you want to fetch data
    const customercollection = db.collection("customers");
    const employeeresult = await customercollection.findOne({
      _id: new ObjectId(sender),
    });

    console.log("Employee Result:", employeeresult);

    if (existingNotification) {
      // If there's an existing notification, add new notification data to it
      existingNotification.notificationsData.push({
        senderEmail: employeeresult.email,
        message: message,
      });

      await existingNotification.save();
      res.status(200).json(existingNotification);
    } else {
      // If there's no existing notification, create a new one
      const newNotification = new Notification({
        recipient: recipient,
        notificationsData: [
          {
            senderEmail: employeeresult.email,
            message: message,
          },
        ],
      });

      await newNotification.save();
      res.status(201).json(newNotification);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get all notifications for a user
router.get("/CustomerToAdminNotifications/:adminId", async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const notifications = await Notification.find({ recipient: adminId });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put('/CustomerToAdminNotifications/:id', async (req, res) => {
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
