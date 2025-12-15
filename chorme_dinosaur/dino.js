// board

let board;
let boardWidth = 750;
let boardheight = 250;
let context;

// dinasour
let dinoWidth = 88;
let dinoHeight = 94;
let dinoX = 50;
let dinoY = boardheight - dinoHeight;
let dinoImg;

let dino = {
  x: dinoX,
  y: dinoY,
  width: dinoWidth,
  height: dinoHeight,
};

let catusArray = [];
let catus1Width = 34;
let catus2Width = 69;
let catus3Width = 102;

let catusHeight = 70;
let catusX = 700;
let catusY = boardheight - catusHeight;

let catus1Img;
let catus2Img;
let catus3Img;

// game physic
let velocityX = -8; //catus moving to the left;
let velocityY = 0;
let gravity = 0.4;

let gameOver = false;
let score = 0;

// onload
window.onload = function () {
  board = document.getElementById("board");
  board.height = boardheight;
  board.width = boardWidth;

  context = board.getContext("2d");

  //   //   draw initial dinosaur
  //   context.fillStyle = "green";
  //   context.fillRect(dino.x, dino.y, dino.width, dino.height);

  dinoImg = new Image();
  dinoImg.src = "./img/dino.png";
  dinoImg.onload = function () {
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
  };

  catus1Img = new Image();
  catus1Img.src = "./img/big-cactus1.png";

  catus2Img = new Image();
  catus2Img.src = "./img/big-cactus2.png";

  catus3Img = new Image();
  catus3Img.src = "./img/big-cactus3.png";
  //   catus1Img.onload = function () {
  //     context.drawImage(catus1Img, catusX, catusY, catus1Width, catusHeight);
  //   };

  this.requestAnimationFrame(update);
  this.setInterval(placeCatus, 1000);
  document.addEventListener("keydown", moveDino);
};

function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, boardWidth, boardheight);
  if (gameOver) {
    return;
  }
  //   dino
  velocityY += gravity;
  dino.y = Math.min(dino.y + velocityY, dinoY);
  context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

  //   catus
  for (let index = 0; index < catusArray.length; index++) {
    const catus = catusArray[index];
    catus.x += velocityX;
    context.drawImage(catus.img, catus.x, catus.y, catus.width, catus.height);
  }
}

function placeCatus() {
  let catus = {
    img: null,
    x: catusX,
    y: catusY,
    width: null,
    height: catusHeight,
  };

  //
  let placeCatusChance = Math.random();

  if (placeCatusChance > 0.9) {
    catus.img = catus3Img;
    catus.width = catus3Width;
    catusArray.push(catus);
  } else if (placeCatusChance > 0.7) {
    catus.img = catus2Img;
    catus.width = catus2Width;
    catusArray.push(catus);
  } else if (placeCatusChance > 0.5) {
    catus.img = catus1Img;
    catus.width = catus1Width;
    catusArray.push(catus);
  }

  if (catusArray.length > 5) {
    catusArray.shift();
  }
}

function moveDino(e) {
  if (gameOver) {
    return;
  }

  if (
    (e.code == "Space" || e.code == "ArrowUp") &&
    dino.y == dinoY /*prevent jumping on the air*/
  ) {
    // jump
    velocityY = -10;
  }
}
