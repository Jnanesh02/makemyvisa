const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
router.get('/getDepartmentDetails/:departmentName', async(req, res)=>{
try {
    const departName = req.params.departmentName;
    const db = mongoose.connection;
   const collection = db.collection(departName);
   const results = await collection.find({}).toArray();
return res.status(200).json(results);
} catch (error) {
    return res.status(500).json(error.message);
}
});
module.exports = router;