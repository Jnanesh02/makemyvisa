const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Token not provided." });
  }

  // Verify the token
  jwt.verify(token.replace("Bearer ", ""), "your-secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }

    // Check if the decoded user has the role of "admin"
    if (decoded && decoded.role === "admin") {
      req.user = decoded; // Set the user details in the request object
      next(); // Proceed to the next middleware or route handler
    } else {
      return res.status(403).json({ message: "Unauthorized. Only admin can access this resource." });
    }
  });
};

module.exports = {isAdmin};
