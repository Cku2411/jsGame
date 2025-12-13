let board;
const rowCount = 21;
const columnCount = 19;
const tileSize = 32;

const boardWidth = columnCount * tileSize;
const boardHeight = rowCount * tileSize;

let context;
// images
let blueGhostImage;
let redGhostImage;
let yellowGhostImage;

let pacmanUpImage;
let pacmanDownImage;
let pacmanLeftImage;
let pacmanRightImage;

let wallImage;

const tileMap = [
  "XXXXXXXXXXXXXXXXXXX",
  "X        X        X",
  "X XX XXX X XXX XX X",
  "X                 X",
  "X XX X XXXXX X XX X",
  "X    X       X    X",
  "XXXX XXXX XXXX XXXX",
  "OOOX X       X XOOO",
  "XXXX X XXrXX X XXXX",
  "O       bpo       O",
  "XXXX X XXXXX X XXXX",
  "OOOX X       X XOOO",
  "XXXX X XXXXX X XXXX",
  "X        X        X",
  "X XX XXX X XXX XX X",
  "X  X     P     X  X",
  "XX X X XXXXX X X XX",
  "X    X   X   X    X",
  "X XXXXXX X XXXXXX X",
  "X                 X",
  "XXXXXXXXXXXXXXXXXXX",
];

const walls = new Set();
const foods = new Set();
const ghosts = new Set();

let pacman;

window.onload = function () {
  board = this.document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d");

  loadImage();
  loadMap();
  // start the game
  update();

  // event listener
  document.addEventListener("keyup", movePacman);
};

function update() {
  move();
  draw();
  setTimeout(update, 50);
}

function draw() {
  // clear canvas everytime draw
  context.clearRect(0, 0, board.width, board.height);

  context.drawImage(
    pacman.image,
    pacman.x,
    pacman.y,
    pacman.width,
    pacman.height
  );
  // draw ghost
  for (let ghost of ghosts.values()) {
    context.drawImage(ghost.image, ghost.x, ghost.y, ghost.width, ghost.height);
  }

  for (let wall of walls.values()) {
    context.drawImage(wall.image, wall.x, wall.y, wall.width, wall.height);
  }

  // food
  context.fillStyle = "white";
  for (let food of foods.values()) {
    context.fillRect(food.x, food.y, food.width, food.height);
  }
}

function move() {
  pacman.x += pacman.velocityX;
  pacman.y += pacman.velocityY;
}

function movePacman(e) {
  if (e.code == "ArrowUp" || e.code == "KeyW") {
    pacman.updateDirection("U");
  } else if (e.code == "ArrowDown" || e.code == "KeyS") {
    pacman.updateDirection("D");
  } else if (e.code == "ArrowLeft" || e.code == "KeyA") {
    pacman.updateDirection("L");
  } else if (e.code == "ArrowRight" || e.code == "KeyD") {
    pacman.updateDirection("R");
  }
}

function loadImage() {
  wallImage = new Image();
  wallImage.src = "./public/wall.png";

  blueGhostImage = new Image();
  blueGhostImage.src = "./public/blue.png";

  redGhostImage = new Image();
  redGhostImage.src = "./public/red.png";

  yellowGhostImage = new Image();
  yellowGhostImage.src = "./public/yellow.png";

  pacmanUpImage = new Image();
  pacmanUpImage.src = "./public/pacUp.png";

  pacmanDownImage = new Image();
  pacmanDownImage.src = "./public/pacDown.png";

  pacmanLeftImage = new Image();
  pacmanLeftImage.src = "./public/pacLeft.png";

  pacmanRightImage = new Image();
  pacmanRightImage.src = "./public/pacRight.png";
}

function loadMap() {
  walls.clear();
  foods.clear();
  ghosts.clear();

  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < columnCount; c++) {
      // duyt qua tung dong, lay ky tu tung dong
      const row = tileMap[r];
      const tileMapChar = row[c];

      const x = c * tileSize;
      const y = r * tileSize;

      if (tileMapChar == "X") {
        // block wall
        const wall = new Block(wallImage, x, y, tileSize, tileSize);
        walls.add(wall);
      } else if (
        tileMapChar == "b" //blue ghost
      ) {
        const ghost = new Block(blueGhostImage, x, y, tileSize, tileSize);
        ghosts.add(ghost);
      } else if (
        tileMapChar == "o" //yellow ghost
      ) {
        const ghost = new Block(yellowGhostImage, x, y, tileSize, tileSize);
        ghosts.add(ghost);
      } else if (
        tileMapChar == "r" //yellow ghost
      ) {
        const ghost = new Block(redGhostImage, x, y, tileSize, tileSize);
        ghosts.add(ghost);
      } else if (
        tileMapChar == "P" //Pacman
      ) {
        pacman = new Block(pacmanRightImage, x, y, tileSize, tileSize);
      } else if (
        tileMapChar == " " //Empty is food
      ) {
        const food = new Block(null, x + 14, y + 14, 4, 4);
        foods.add(food);
      }
    }
  }
}

class Block {
  constructor(image, x, y, width, height) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.startX = x;
    this.startY = y;

    this.direction = `R`;
    this.velocityX = 0;
    this.velocityY = 0;
  }

  updateDirection(direction) {
    this.direction = direction;
    this.updateVelocity();
  }

  updateVelocity() {
    if (this.direction == "U") {
      this.velocityX = 0;
      this.velocityY = -tileSize / 4;
    } else if (this.direction == "D") {
      this.velocityX = 0;
      this.velocityY = tileSize / 4;
    } else if (this.direction == "L") {
      this.velocityX = -tileSize / 4;
      this.velocityY = 0;
    } else if (this.direction == "R") {
      this.velocityX = tileSize / 4;
      this.velocityY = 0;
    }
  }
}
