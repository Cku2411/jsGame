// === Global Variables ===
let canvas, ctx;
let score = 0;
let health = 100;

// Player
const PLAYER_WIDTH = 32;
const PLAYER_HEIGHT = 32;
let playerImg, player;

// Bullets
let bullets = [];
const BULLET_WIDTH = 6;
const BULLET_HEIGHT = 8;
const BULLET_SPEED = 10;

// Enemies
let enemies = [];
const ENEMY_WIDTH = 32;
const ENEMY_HEIGHT = 32;
let enemyImg;

// Health Kits
let healthKits = [];
const KIT_WIDTH = 32;
const KIT_HEIGHT = 32;
let healthKitImg;

// Shooting control
let shooting = false;
let shootCooldown = 0;

// === Classes ===
class Entity {
  constructor(image, x, y, width, height, speed = 0) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  update() {
    this.y += this.speed;
    this.draw();
  }
}

class Bullet {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  draw() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.y -= this.speed;
    this.draw();
  }
}

// === Utility ===
function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

// === Game Setup ===
window.onload = () => {
  canvas = document.getElementById("board");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext("2d");

  // Load images
  playerImg = new Image();
  playerImg.src = "./img/ship.png";

  enemyImg = new Image();
  enemyImg.src = "./img/enemy.png";

  healthKitImg = new Image();
  healthKitImg.src = "./img/healthkit.png";

  // Init player
  player = new Entity(
    playerImg,
    canvas.width / 2,
    canvas.height - 50,
    PLAYER_WIDTH,
    PLAYER_HEIGHT
  );

  // Input
  setupControls();

  // Spawn enemies & kits
  setInterval(spawnEnemies, 3000);
  setInterval(spawnHealthKit, 10000);

  // Start loop
  updateGame();
};

// === Input Controls ===
function setupControls() {
  document.addEventListener("mousemove", (e) => {
    player.x = e.clientX - PLAYER_WIDTH / 2;
  });

  document.addEventListener("mousedown", (e) => {
    if (e.button === 0) shooting = true;
  });

  document.addEventListener("mouseup", (e) => {
    if (e.button === 0) shooting = false;
  });

  document.addEventListener("click", fireBullet);
}

// === Spawning ===
function spawnEnemies() {
  for (let i = 0; i < 4; i++) {
    const x = Math.random() * (canvas.width - ENEMY_WIDTH);
    const y = -ENEMY_HEIGHT;
    const speed = Math.random() * 2 + 1;
    enemies.push(new Entity(enemyImg, x, y, ENEMY_WIDTH, ENEMY_HEIGHT, speed));
  }
}

function spawnHealthKit() {
  const x = Math.random() * (canvas.width - KIT_WIDTH);
  const y = -KIT_HEIGHT;
  const speed = Math.random() * 1 + 0.5;
  healthKits.push(new Entity(healthKitImg, x, y, KIT_WIDTH, KIT_HEIGHT, speed));
}

// === Shooting ===
function fireBullet() {
  const bulletX = player.x + PLAYER_WIDTH / 2 - BULLET_WIDTH / 2;
  const bulletY = player.y;
  bullets.push(
    new Bullet(bulletX, bulletY, BULLET_WIDTH, BULLET_HEIGHT, BULLET_SPEED)
  );
}

// === Game Loop ===
function updateGame() {
  requestAnimationFrame(updateGame);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player
  player.y = canvas.height - PLAYER_HEIGHT - 10;
  player.draw();

  // Enemies
  enemies.forEach((enemy, i) => {
    enemy.update();
    if (enemy.y > canvas.height) {
      enemies.splice(i, 1);
      health -= 10;
      score -= 5;
      if (health < 0) health = 0;
    }
  });

  // Health Kits
  healthKits.forEach((kit) => kit.update());

  // Bullets
  bullets.forEach((bullet, bIndex) => {
    bullet.update();
    if (bullet.y + bullet.height < 0) bullets.splice(bIndex, 1);

    // Collision with enemies
    enemies.forEach((enemy, eIndex) => {
      if (isColliding(bullet, enemy)) {
        enemies.splice(eIndex, 1);
        bullets.splice(bIndex, 1);
        score += 10;
      }
    });

    // Collision with health kits
    healthKits.forEach((kit, kIndex) => {
      if (isColliding(bullet, kit)) {
        healthKits.splice(kIndex, 1);
        bullets.splice(bIndex, 1);
        health += 20;
        if (health > 100) health = 100;
      }
    });
  });

  // Auto fire when holding mouse
  if (shooting && shootCooldown <= 0) {
    fireBullet();
    shootCooldown = 10;
  }
  if (shootCooldown > 0) shootCooldown--;

  // HUD
  drawHUD();
}

// === HUD ===
function drawHUD() {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 20, 30);

  // Health bar
  ctx.fillStyle = "red";
  ctx.fillRect(20, 50, 200, 20);
  ctx.fillStyle = "green";
  ctx.fillRect(20, 50, (health / 100) * 200, 20);
  ctx.strokeStyle = "white";
  ctx.strokeRect(20, 50, 200, 20);
}
