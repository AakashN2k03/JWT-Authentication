const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Aattach teh details of the authenticated user to the request object
    const expirationTime = new Date(decoded.exp * 1000);
    console.log("Expires at:", expirationTime);
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;

// req.user = decoded -?This payload typically contains user details like their ID, email, and the token's expiration time.

// EXAMPLE
// const token = jwt.sign(
//   { id: "123abc", username: "aakash", role: "student" },
//   process.env.JWT_SECRET,
//   { expiresIn: "1h" }
// );

// When this token is sent with the request, and jwt.verify() decodes it:
// const decoded = {
//   id: "123abc",
//   username: "aakash",
//   role: "student",
//   iat: 1714820000,  // issued at (timestamp)
//   exp: 1714823600   // expires at (timestamp)
// };
// Then it is assigned to req.user = decoded;
