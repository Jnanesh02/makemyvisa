const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
router.post("/employe/priceupdate", async (req, res) => {
  try {
    const { serviceName, ticketId, price } = req.body;
    console.log(req.body);
    if (!serviceName || !ticketId ||!price) {
      return res.status(400).json("Required fields: serviceName & ticketId");
    }
    const db = mongoose.connection;
    const collection = db.collection(`${serviceName}`);
    const objectId = new mongoose.Types.ObjectId(ticketId);
    const result = await collection.findOneAndUpdate(
      { _id: objectId },
      { $set: { price: price } },
      { returnDocument: "after" } 

    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
module.exports = router;
