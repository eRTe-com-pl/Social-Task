const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
// const { Socket } = require("dgram");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "dist/Social-Task")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/Social-Task/index.html"));
});

const server = http.createServer(app);

const io = socketIO(server);

let numberOfOnlineUsers = 0;
io.on("connection", (socket) => {
  console.log("New user connected");
  numberOfOnlineUsers++;
  io.emit("numberOfOnlineUsers", numberOfOnlineUsers);

  socket.on("disconnect", () => {
    console.log("User dissconnected");
    numberOfOnlineUsers--;
    io.emit("numberOfOnlineUsers", numberOfOnlineUsers);
  });
});

server.listen(port, () => {
  console.log(`Server running :) on port ${port}`);
});
