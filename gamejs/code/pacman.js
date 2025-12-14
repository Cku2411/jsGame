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
let score = 0;
let lives = 3;
let gameOver = false;

const GAME_STATE = {
  START: "START",
  PLAYING: "PLAYING",
  GAME_OVER: "GAME_OVER",
};

let gameState = GAME_STATE.START;

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
  document.addEventListener("keydown", movePacman);
};

function update() {
  if (gameOver) {
    return;
  }
  move();
  draw();
  // setTimeout(update, 50);
  requestAnimationFrame(update);
}

function draw() {
  // clear canvas everytime draw
  context.clearRect(0, 0, board.width, board.height);

  // ===== UI =====
  context.fillStyle = "white";
  context.font = "18px serif";
  context.fillText("❤️ " + lives + "   SCORE: " + score, 10, 24);

  if (gameState === GAME_STATE.START) {
    context.font = "32px Arial";
    context.textAlign = "center";
    context.fillText("PRESS ANY KEY TO START", boardWidth / 2, boardHeight / 2);
    context.textAlign = "left";
  }

  if (gameState === GAME_STATE.GAME_OVER) {
    context.font = "40px Arial";
    context.textAlign = "center";
    context.fillText("GAME OVER", boardWidth / 2, boardHeight / 2 - 20);
    context.font = "20px Arial";
    context.fillText(
      "PRESS ANY KEY TO RESTART",
      boardWidth / 2,
      boardHeight / 2 + 30
    );
    context.textAlign = "left";
  }

  updatePacmanImage();

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
  // score
  context.fillStyle = "white";
  context.font = "18px serif";
  if (gameOver) {
    context.fillText("Game Over: " + String(score), tileSize / 2, tileSize / 2);
  } else {
    context.fillText(
      "x" + String(lives) + " " + String(score),
      tileSize / 2,
      tileSize / 2
    );
  }
}

function move() {
  // --- XỬ LÝ PACMAN ---

  // 1. Cố gắng rẽ theo nextDirection nếu có
  if (pacman.nextDirection && pacman.nextDirection !== pacman.direction) {
    // Chỉ cho phép rẽ khi gần tâm ô
    if (pacman.isNearCenter()) {
      // KỸ THUẬT SNAP: Căn chỉnh tọa độ chính xác vào lưới trước khi rẽ
      // Nếu đang đi Ngang (L/R) mà rẽ Dọc (U/D) -> Căn chỉnh X
      // Nếu đang đi Dọc (U/D) mà rẽ Ngang (L/R) -> Căn chỉnh Y
      const isTurningVertical =
        pacman.nextDirection === "U" || pacman.nextDirection === "D";
      const isTurningHorizontal =
        pacman.nextDirection === "L" || pacman.nextDirection === "R";

      // Tọa độ dự phòng
      let tempX = pacman.x;
      let tempY = pacman.y;

      if (isTurningVertical) {
        pacman.x = Math.round(pacman.x / tileSize) * tileSize;
      } else if (isTurningHorizontal) {
        pacman.y = Math.round(pacman.y / tileSize) * tileSize;
      }

      // Thử đổi hướng
      let changed = pacman.updateDirection(pacman.nextDirection);

      if (changed) {
        // Nếu rẽ thành công, xóa nextDirection để không rẽ lại
        pacman.nextDirection = null;
      } else {
        // Nếu rẽ thất bại (đâm tường), trả lại tọa độ cũ (không snap nữa)
        pacman.x = tempX;
        pacman.y = tempY;
      }
    }
  }

  // 2. Di chuyển Pacman theo hướng hiện tại
  pacman.x += pacman.velocityX;
  pacman.y += pacman.velocityY;

  // 3. Check va chạm tường ở hướng hiện tại
  for (let wall of walls.values()) {
    if (collision(pacman, wall)) {
      pacman.x -= pacman.velocityX;
      pacman.y -= pacman.velocityY;
      break;
    }
  }

  // ===== TELEPORT LEFT <-> RIGHT =====
  if (pacman.x < -pacman.width) {
    pacman.x = boardWidth;
  } else if (pacman.x > boardWidth) {
    pacman.x = -pacman.width;
  }

  // --- XỬ LÝ GHOST (Giữ nguyên hoặc tối ưu nhẹ) ---
  for (let ghost of ghosts.values()) {
    // ... (Logic Ghost giữ nguyên như code cũ của bạn) ...
    // Copy lại phần logic Ghost va chạm Pacman, va chạm tường, ăn Food từ code cũ vào đây
    if (collision(ghost, pacman)) {
      lives -= 1;
      if (lives == 0) {
        gameState = GAME_STATE.GAME_OVER;
        return;
      }
      resetPositions();
    }

    // Ghost AI logic đơn giản
    if (
      ghost.y == tileSize * 9 &&
      ghost.direction != "U" &&
      ghost.direction != "D"
    ) {
      ghost.updateDirection("U");
    }

    ghost.x += ghost.velocityX;
    ghost.y += ghost.velocityY;

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

    // Ăn Food
    let foodEaten = null;
    for (let food of foods.values()) {
      if (collision(pacman, food)) {
        foodEaten = food;
        score += 10;
        break;
      }
    }
    foods.delete(foodEaten);
    if (foods.size == 0) {
      loadMap();
      resetPositions();
    }
  }
}

function movePacman(e) {
  // bởi vì ta đang lắng nghe bất kỳ 1 keyup nào
  if (gameState === GAME_STATE.START) {
    gameState = GAME_STATE.PLAYING;
    return;
  }

  if (gameState === GAME_STATE.GAME_OVER) {
    loadMap();
    resetPositions();
    lives = 3;
    score = 0;
    gameState = GAME_STATE.PLAYING;
    return;
  }

  if (e.code == "ArrowUp" || e.code == "KeyW") {
    pacman.nextDirection = "U";
    // pacman.updateDirection("U");
  } else if (e.code == "ArrowDown" || e.code == "KeyS") {
    pacman.nextDirection = "D";
    // pacman.updateDirection("D");
  } else if (e.code == "ArrowLeft" || e.code == "KeyA") {
    pacman.nextDirection = "L";
    // pacman.updateDirection("L");
  } else if (e.code == "ArrowRight" || e.code == "KeyD") {
    pacman.nextDirection = "R";
    // pacman.updateDirection("R");
  }
}

function updatePacmanImage() {
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

function resetPositions() {
  pacman.reset();
  pacman.velocityX = 0;
  pacman.velocityY = 0;

  for (let ghost of ghosts.values()) {
    ghost.reset();
    const newDirection =
      directions[Math.floor(Math.random() * directions.length)];
    ghost.updateDirection(newDirection);
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
    this.nextDirection = null;
    this.velocityX = 0;
    this.velocityY = 0;
  }

  updateDirection(direction) {
    let prevDirection = this.direction;
    let prevX = this.x;
    let prevY = this.y;

    // Cập nhật hướng và vận tốc tạm thời
    this.direction = direction;
    this.updateVelocity();

    // Di chuyển thử
    this.x += this.velocityX;
    this.y += this.velocityY;

    // Kiểm tra va chạm với tường
    for (let wall of walls.values()) {
      if (collision(this, wall)) {
        // Nếu va chạm, hoàn tác lại vị trí và hướng cũ
        this.x = prevX;
        this.y = prevY;
        this.direction = prevDirection;
        this.updateVelocity();
        return false; // Trả về false báo hiệu không đổi hướng được
      }
    }
    return true; // Đổi hướng thành công
  }

  updateVelocity() {
    // Giảm tốc độ xuống để phù hợp với 60 FPS
    // tileSize = 32.
    // Trước đây: /4 = 8px/frame (nhanh ở 60fps)
    // Bây giờ: /8 = 4px/frame (vừa phải) hoặc set cứng = 2

    const speed = 2; // Bạn có thể thử 2 hoặc 4 để xem tốc độ nào vừa mắt

    if (this.direction == "U") {
      this.velocityX = 0;
      this.velocityY = -speed;
    } else if (this.direction == "D") {
      this.velocityX = 0;
      this.velocityY = speed;
    } else if (this.direction == "L") {
      this.velocityX = -speed;
      this.velocityY = 0;
    } else if (this.direction == "R") {
      this.velocityX = speed;
      this.velocityY = 0;
    }
  }

  isNearCenter() {
    return (
      Math.abs(((this.x + this.width / 2) % tileSize) - tileSize / 2) < 4 &&
      Math.abs(((this.y + this.height / 2) % tileSize) - tileSize / 2) < 4
    );
  }

  reset() {
    this.x = this.startX;
    this.y = this.startY;
  }
}
