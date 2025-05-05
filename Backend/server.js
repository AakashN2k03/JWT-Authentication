const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json()); // To parse JSON bodies
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000", // u can use this too
//     credentials: true,
//   })
// );

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// credentials: true

// Allows frontend to send cookies or authorization headers.
// Must be set if you're using JWT or sessions and want to maintain login.
