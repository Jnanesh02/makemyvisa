const express = require("express");
const router = express.Router();

router.post("/employee/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "logout failed" });
    } else {
      res.status(200).json({ message: "logout successfull " });
    }
  });
});

module.exports = router;
