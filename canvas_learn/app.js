// const canvas = document.getElementById("board");
// const context = canvas.getContext("2d");

// context.font = "42px serif";
// context.textAlign = "center";
// context.textBaseline = "middle";
// const ox = canvas.width / 2;
// const oy = canvas.height / 2;

// context.fillStyle = "#FFF";
// context.fillText("Hello World", ox, oy);

// canvas.addEventListener("mousemove", function (event) {
//   const cRect = canvas.getBoundingClientRect();

//   const canvasX = Math.round(event.clientX - cRect.left);
//   const canvasY = Math.round(event.clientY - cRect.top);

//   context.clearRect(0, 0, canvas.width, canvas.height);
//   context.fillText("X: " + canvasX + ", Y: " + canvasY, 10, 20);
// });

// // rotate
// function rotate_ctx() {
//   //   context.save();
//   // dich toa do goc den ox, oy
//   context.translate(ox, oy);
//   //   quay goc 15 do, quy doi ra radian
//   context.rotate(Math.PI / 180) * 15;
//   //   ve lại heelloword theo hệ tọa độ mới (lúc này đã quay 15)
//   context.fillText("Hello World", 0, 0);

//   //   dich nguoc lai he toa do ban dau
//   context.translate(-ox, -oy);
//   //   context.restore();
// }

// function download_img(el) {
//   const imageURI = canvas.toDataURL("image/jpg");
//   el.href = imageURI;
// }

function createCanvas(width, height) {
  const canvas = document.createElement("canvas");
  canvas.height = height;
  canvas.width = width;
  canvas.ctx = canvas.getContext("2d");
  return canvas;
}

const myCanvas = createCanvas(500, 500);
const ctx = myCanvas.getContext("2d");

ctx.fillStyle = "blue";
ctx.fillRect(0, 0, 500, 500);

// Gắn canvas vào trang
document.body.appendChild(myCanvas);
