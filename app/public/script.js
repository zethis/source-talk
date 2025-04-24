const socket = io();
const c64 = document.getElementById('canvas64').getContext('2d');
const c128 = document.getElementById('canvas128').getContext('2d');
const diffEl = document.getElementById('diffVal');

function draw(ctx, x) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = '#e74c3c';
  ctx.fillRect(x, 40, 20, 20);
}

socket.on('tick64', ({ x }) => draw(c64, x));
socket.on('tick128', ({ x }) => draw(c128, x));
socket.on('diff', ({ d }) => diffEl.textContent = d.toFixed(2));
