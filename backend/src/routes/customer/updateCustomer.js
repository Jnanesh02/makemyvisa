const express = require("express");
const router = express.Router();
const customer = require("../../models/customerSchema");


router.put("/customer/updateCustomerProfile/:id",async (req, res) => {
    try {
        const object_id = req.params.id;
        console.log(object_id)
        const {  firstName,
        lastName,
        email,
        phoneNumber,
        address,
        passportNumber = "",
        passportExpiry= null} = req.body
        const updatedUser = await customer.findById({_id : object_id})
      if (!updatedUser) {
        return res.status(201).json({ success: false, message: 'User not found' });
      }
         updatedUser.first_name = firstName;
         updatedUser.last_name= lastName;
         updatedUser.email=email;
         updatedUser.phone_number=phoneNumber;
         updatedUser.address= address;
         if (updatedUser.passport) {
            updatedUser.passport.passportNumber = passportNumber;
            updatedUser.passport.passportExpiry = passportExpiry;
          }
        await updatedUser.save();
        res.status(200).json({ success: true, message: 'successfully updated' });

  
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

  module.exports = router;