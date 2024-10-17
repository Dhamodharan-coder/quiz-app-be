const express = require("express");
const cors = require("cors");
const connectDB = require("./Database/mongodb"); // No .default
const admin = require("./Admin/Admin-details"); // Import the admin route using require
const student = require("./Users/users-content")
const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: "https://dhru-quizapp.netlify.app", // Replace with the actual URL you want to allow
        methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
        credentials: true // Allow credentials (e.g., cookies)
      }
));

connectDB(); // Connect to the database

app.use("/admin", admin); // Use the admin route
app.use("/student", student);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
