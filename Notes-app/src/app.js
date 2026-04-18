const express = require("express");
const noteRoutes = require("./routes/note.routes");

const app = express();

app.use(express.json());

// 1. Add a Welcome Route for the root "/"
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Notes API Server is running successfully!",
    endpoints: {
      notes: "/api/notes"
    }
  });
});

// 2. Your existing routes
app.use("/api/notes", noteRoutes);

module.exports = app;