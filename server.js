const express = require("express");
require("dotenv").config();
const connectTODB = require("./database/data_base");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const app = express();

// Connect to the database
connectTODB();
const PORT = process.env.PORT;
// Start the server
app.listen(PORT, () => {
    console.log("Server is listening to the Port", PORT);
})
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/student", profileRoutes);
