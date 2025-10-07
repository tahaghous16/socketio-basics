import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();

//create http connetion
const server = http.createServer(app);

//create socket connection
const io = new Server(server);

//sockets
io.on("connection", (socket) => {
  socket.on("user-msg", (message) => {
    io.emit("message", message);
  });
});

const staticFile = path.join(import.meta.dirname, "public/index.html");

app.use("/", (req, res) => {
  res.sendFile(staticFile);
});

server.listen(4000, () => {
  console.log(`Server is running..`);
});
