let canvas;
let ctx, canvasWidth, canvasHeight;
const DURATION = 1000;
let nextime = 0;
let nextX = 20;
let nextY = 30;
const rectW = 30;
const rectH = 30;
const gapX = 0; // khoảng cách ngang giữa các rect (tùy chỉnh)
const gapY = 0;

window.onload = function () {
  canvas = document.getElementById("board");
  ctx = canvas.getContext("2d");
  canvasWidth = canvas.width;
  canvasHeight = canvas.height;

  requestAnimationFrame(animate);
};

function animate(currentTime) {
  if (currentTime < nextime) {
    requestAnimationFrame(animate);
    return;
  }

  nextime = currentTime + DURATION;
  ctx.fillStyle = "#" + Math.floor(Math.random() * 16777215).toString(16);

  // update nextX
  if (nextX + rectW > canvasWidth) {
    nextY += rectH + gapY;
    nextX = 20;
  }

  if (nextY + rectH > canvasHeight) {
    // Ví dụ: reset về đầu
    nextY = 30;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  }

  ctx.fillRect(nextX, nextY, rectW, rectH);

  // update nextX
  nextX += 30;

  requestAnimationFrame(animate);
}
