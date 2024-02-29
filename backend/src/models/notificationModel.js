const mongoose = require("mongoose");
const notification = ()=>{
    const notificationSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "customers"
        },
        notification: { type: mongoose.Schema.Types.Mixed },
    });
    
    const notification = mongoose.model("notification", notificationSchema);
};

module.exports = notification;