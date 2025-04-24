const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.use(express.static('public'));

const speed = 100;        // pixels per second
let pos64 = 0, pos128 = 0;
const width = 800;

// 64 Hz tick
setInterval(() => {
  pos64 = (pos64 + speed / 64) % width;
  io.emit('tick64', { x: pos64 });
}, 1000 / 64);

// 128 Hz tick (sub-tick = every half interval of 64 Hz)
setInterval(() => {
  pos128 = (pos128 + speed / 128) % width;
  // Emit both raw 128-tick and diff against 64-tick
  io.emit('tick128', { x: pos128 });
  io.emit('diff', { d: pos128 - pos64 });
}, 1000 / 128);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server on port ${PORT}`));
