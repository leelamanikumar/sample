const { Server } = require("socket.io");
const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express(); 
app.use(express.json());
app.use(cors());
dotenv.config();

app.use(express.static(path.join(__dirname, "client", "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // Allow requests from any origin
    methods: ["GET", "POST"],
  },
});

// Handle socket connections
io.on("connection", (socket) => {
  console.log("New client connected"); // Log when a new client connects

  socket.on("create_room", (room) => {
    console.log(`Room created: ${room}`); // Log room creation
    // You can add logic here to create a room and emit confirmation
    socket.emit("room_created", { room }); // Send confirmation back to the client
  });

  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start the server on port 3000
const PORT = process.env.PORT
console.log(PORT)
server.listen(PORT, () => {
  console.log("Server running on http://localhost:3000");
});
