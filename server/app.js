<<<<<<< HEAD
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
=======
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');
>>>>>>> 6e2832b29e7485e3efcd287b35cad20ba95099b3

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
// Static file serving for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Route imports
const uploadRoute = require("./routes/upload");
const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

// Route usage
app.use("/api/uploads", uploadRoute);
app.use("/api/jobs", jobRoutes);
app.use("/api/users", authRoutes);
app.use("/api/applications", applicationRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the HireHub API");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});
=======
// Define routes here
app.use('/api', jobRoutes);
>>>>>>> 6e2832b29e7485e3efcd287b35cad20ba95099b3

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
