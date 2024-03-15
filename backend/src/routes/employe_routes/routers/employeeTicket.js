const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
router.get('/employeeticket',async(req,res)=>{
try {
    console.log("hello");
} catch (error) {
    console.log(error);
}
});
module.exports = router;