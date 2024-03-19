const mongoose = require("mongoose");

// Define the Notification Schema
const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
    required: true,
  },
  notificationsData: [
    {
      senderEmail: {
        type: String,
        required: true,
      },
      
      message: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      read: {
        type: Boolean,
        default: false,
      },
    },
  ],

});

// Define a model for the Notification schema
const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
