const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const customer = require("../../models/customerSchema");
router.post("/login", async(req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await customer.findOne({ email: email });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid email" });
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password." });
        }
        return res.json({ existingUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;