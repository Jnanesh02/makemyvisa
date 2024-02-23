const express = require('express');
const router = express.Router();
const notificationSchema = require("../../models/notificationModel");
router.post('/notification', async(req, res)=>{
   try { const {userId,notification,department,assignTo} = req.body;
   const newNotification = new notificationSchema({
       userId,
       notification,
       department,
       assignTo
   });
   const savedNotification = await newNotification.save();
   return res.status(201).json(savedNotification);
   } catch (error) {
    return res.status(500).json({error: error.message});
   }
});

module.exports = router