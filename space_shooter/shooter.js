let board;
let boardHeight = 1000;
let boardWidth = 1500;
let context;
let score = 0;
let health = 100;

// player
let player_width = 32;
let player_height = 32;
let playerImg;
let player;

// bullet
let bulletArray = [];
let bullet_width = 6;
let bullet_height = 8;
let bullet_speed = 10;

// enemy

let enemies = [];
let enemyImg;
let enemyWidth = 32;
let enemyHeight = 32;

// kits

let healthKits = [];
let healthKitImg;
let healthkitWidth = 32;
let healthkitHeight = 32;

// === start==

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;

  context = board.getContext("2d");

  startGame();
};

function startGame() {
  mouse = {
    x: board.width / 2,
    y: board.height - 33,
  };

  touch = { x: innerWidth / 2, y: innerHeight - 33 };

  document.addEventListener("mousemove", function (event) {
    mouse.x = event.clientX;
  });

  document.addEventListener("touchmove", function (event) {
    const rect = board.getBoundingClientRect();
    const root = document.documentElement;
    const touch = event.changedTouches[0];
    const touchX = parseInt(touch.clientX);
    const touchY = parseInt(touch.clientY) - rect.top - root.scrollTop;
    event.preventDefault();

    mouseX = touchX;
    mouseY = touchY;
  });

  playerImg = new Image();
  playerImg.src = "./img/ship.png";

  enemyImg = new Image();
  enemyImg.src = "./img/enemy.png";

  healthKitImg = new Image();
  healthKitImg.src = "./img/healthkit.png";

  // draw player

  player = new Player(playerImg, mouse.x, mouse.y, player_width, player_height);

  update();

  // draw enemy

  for (let index = 0; index < 4; index++) {
    const x = Math.random() * (innerWidth - enemyWidth);
    const y = -enemyHeight;
    const width = enemyWidth;
    const height = enemyHeight;
    const speed = Math.random() * 2;
    const _enemy = new Player(enemyImg, x, y, width, height, speed);

    _enemy.draw();

    enemies.push(_enemy);
  }
}

function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height);

  player.draw();

  enemies.forEach((enemy) => {
    enemy.update();
  });
}

function Player(image, x, y, width, height, speed) {
  this.image = image;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speed = speed;

  this.draw = function () {
    context.beginPath();
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  };

  this.update = function () {
    this.y += this.speed;
    this.draw();
  };
}

function Healkit(x, y, width, height, speed) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speed = speed;

  this.draw = function () {
    context.beginPath();
    context.drawImage(healthKitImg, this.x, this.y);
  };

  this.update = function () {
    this.y += speed;
    this.draw();
  };
}
