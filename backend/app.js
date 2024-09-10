const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const profileRoutes = require("./routes/profileRoutes");
const http = require("http");
const { Server } = require("socket.io");

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

const mongoUrl = process.env.MONGODB_URL;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.error("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/profile", profileRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../frontend/build")));
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../frontend/build/index.html")));
}

// Handle Socket.io connection
io.on("connection", (socket) => {
  console.log("New client connected: ", socket.id);

  // Listen for disconnect event
  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  });
});

// Expose io to routes if needed
app.set("io", io);

server.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});
