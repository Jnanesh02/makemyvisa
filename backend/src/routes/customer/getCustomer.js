const express = require("express");
const router = express.Router();
const customer = require("../../models/customerSchema");
router.get("/getuserdetails/:id",async(req,res)=>{
    try {
        const object_id = req.params.id;
        const existingUser= await customer.findById({_id:object_id});

        if(!existingUser){
            return res.status(201).json({message:"User Id not found"});
        }
        return res.status(200).json({existingUser});

    } catch (error) {
        return res.status(500).json({message:"Internal error"});

    }
})
module.exports = router