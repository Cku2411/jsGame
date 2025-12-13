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

const directions = ["U", "D", "L", "R"];

window.onload = function () {
  board = this.document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d");

  loadImage();
  loadMap();
  // start the game
  update();
  // randoem direction evertime game load for ghost
  for (let ghost of ghosts.values()) {
    const newDirection =
      directions[Math.floor(Math.random() * directions.length)];
    ghost.updateDirection(newDirection);
  }

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
  // check wall collisions
  for (let wall of walls.values()) {
    if (collision(pacman, wall)) {
      pacman.x -= pacman.velocityX;
      pacman.y -= pacman.velocityY;
      break;
    }
  }

  // ghost move
  for (let ghost of ghosts.values()) {
    if (
      ghost.y == tileSize * 9 &&
      ghost.direction != "U" &&
      ghost.direction != "D"
    ) {
      ghost.updateDirection("U");
    }
    ghost.x += ghost.velocityX;
    ghost.y += ghost.velocityY;
    // check ghost collison
    for (let wall of walls.values()) {
      if (
        collision(ghost, wall) ||
        ghost.x <= 0 ||
        ghost.x + ghost.width >= boardWidth
      ) {
        ghost.x -= ghost.velocityX;
        ghost.y -= ghost.velocityY;
        const newDirection =
          directions[Math.floor(Math.random() * directions.length)];
        ghost.updateDirection(newDirection);
      }
    }
  }
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
  // update pacman image
  if (pacman.direction == "U") {
    pacman.image = pacmanUpImage;
  } else if (pacman.direction == "D") {
    pacman.image = pacmanDownImage;
  } else if (pacman.direction == "R") {
    pacman.image = pacmanRightImage;
  } else if (pacman.direction == "L") {
    pacman.image = pacmanLeftImage;
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

// check va cham giua 2 rectangle
function collision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
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
    const preventDirection = this.direction;
    this.direction = direction;
    this.updateVelocity();
    this.x += this.velocityX;
    this.y += this.velocityY;

    for (let wall of walls.values()) {
      // this refer to this block class (pacman, ghost..)
      if (collision(this, wall)) {
        this.x -= this.velocityX;
        this.y -= this.velocityY;
        this.direction = preventDirection;
        this.updateVelocity();
        return;
      }
    }
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
