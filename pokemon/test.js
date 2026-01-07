// ============================================
// 1. GameObject - CLASS NỀN TẢNG
// ============================================
class GameObject {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.active = true; // Đối tượng có đang hoạt động không
  }

  // Phương thức cập nhật mỗi frame
  update(deltaTime) {
    // Override trong class con
  }

  // Phương thức vẽ
  render(ctx) {
    // Override trong class con
  }

  // Kiểm tra va chạm với đối tượng khác
  collidesWith(other) {
    return (
      this.x < other.x + other.width &&
      this.x + this.width > other.x &&
      this.y < other.y + other.height &&
      this.y + this.height > other.y
    );
  }

  // Xóa đối tượng
  destroy() {
    this.active = false;
  }
}

// ============================================
// 2. Sprite - THÊM ĐỒ HỌA
// ============================================
class Sprite extends GameObject {
  constructor(x, y, width, height, imageSrc) {
    super(x, y, width, height); // Gọi constructor của GameObject

    // Thuộc tính đồ họa
    this.image = new Image();
    this.image.src = imageSrc;
    this.imageLoaded = false;

    this.image.onload = () => {
      this.imageLoaded = true;
    };

    // Animation
    this.currentFrame = 0;
    this.frameCount = 1;
    this.frameWidth = width;
    this.frameHeight = height;
    this.frameTimer = 0;
    this.frameInterval = 100; // ms giữa các frame

    // Visual effects
    this.opacity = 1;
    this.rotation = 0;
    this.flipX = false;
  }

  // Cập nhật animation
  update(deltaTime) {
    super.update(deltaTime);

    if (this.frameCount > 1) {
      this.frameTimer += deltaTime;
      if (this.frameTimer >= this.frameInterval) {
        this.currentFrame = (this.currentFrame + 1) % this.frameCount;
        this.frameTimer = 0;
      }
    }
  }

  // Vẽ sprite lên canvas
  render(ctx) {
    if (!this.imageLoaded) return;

    ctx.save();
    ctx.globalAlpha = this.opacity;

    // Xử lý flip và rotation
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(this.rotation);
    if (this.flipX) ctx.scale(-1, 1);

    // Vẽ frame hiện tại
    ctx.drawImage(
      this.image,
      this.currentFrame * this.frameWidth,
      0,
      this.frameWidth,
      this.frameHeight,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );

    ctx.restore();
  }

  // Thiết lập animation
  setAnimation(frameCount, frameInterval = 100) {
    this.frameCount = frameCount;
    this.frameInterval = frameInterval;
    this.currentFrame = 0;
  }
}

// ============================================
// 3. Character - THÊM VẬT LÝ & LOGIC
// ============================================
class Character extends Sprite {
  constructor(x, y, width, height, imageSrc) {
    super(x, y, width, height, imageSrc);

    // Vật lý
    this.vx = 0; // Vận tốc X
    this.vy = 0; // Vận tốc Y
    this.gravity = 0.5;
    this.maxFallSpeed = 10;
    this.isGrounded = false;

    // Thuộc tính sinh tồn
    this.health = 100;
    this.maxHealth = 100;
    this.isDead = false;

    // Trạng thái
    this.state = "idle"; // idle, walk, jump, attack...
  }

  // Cập nhật vật lý
  update(deltaTime) {
    super.update(deltaTime);

    if (this.isDead) return;

    // Áp dụng trọng lực
    if (!this.isGrounded) {
      this.vy += this.gravity;
      if (this.vy > this.maxFallSpeed) {
        this.vy = this.maxFallSpeed;
      }
    }

    // Cập nhật vị trí
    this.x += this.vx;
    this.y += this.vy;

    // Kiểm tra chạm đất (giả sử đất ở y = 400)
    if (this.y + this.height >= 400) {
      this.y = 400 - this.height;
      this.vy = 0;
      this.isGrounded = true;
    } else {
      this.isGrounded = false;
    }
  }

  // Nhận sát thương
  takeDamage(amount) {
    if (this.isDead) return;

    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
      this.die();
    }
  }

  // Hồi máu
  heal(amount) {
    this.health = Math.min(this.health + amount, this.maxHealth);
  }

  // Xử lý khi chết
  die() {
    this.isDead = true;
    this.state = "dead";
    this.vx = 0;
  }

  // Nhảy
  jump(force = 12) {
    if (this.isGrounded) {
      this.vy = -force;
      this.isGrounded = false;
      this.state = "jump";
    }
  }
}

// ============================================
// 4. Hero - NHÂN VẬT CHÍNH
// ============================================
class Hero extends Character {
  constructor(x, y) {
    super(x, y, 50, 50, "hero.png");

    // Thuộc tính riêng của Hero
    this.moveSpeed = 5;
    this.jumpForce = 12;
    this.canDoubleJump = true;
    this.hasDoubleJumped = false;

    // Điều khiển
    this.keys = {};

    // Thiết lập animation
    this.setAnimation(4, 150); // 4 frames, 150ms mỗi frame
  }

  // Xử lý input
  handleInput() {
    if (this.isDead) return;

    // Di chuyển trái/phải
    this.vx = 0;
    if (this.keys["ArrowLeft"] || this.keys["a"]) {
      this.vx = -this.moveSpeed;
      this.flipX = true;
      this.state = "walk";
    } else if (this.keys["ArrowRight"] || this.keys["d"]) {
      this.vx = this.moveSpeed;
      this.flipX = false;
      this.state = "walk";
    } else if (this.isGrounded) {
      this.state = "idle";
    }

    // Nhảy
    if (this.keys[" "] || this.keys["ArrowUp"] || this.keys["w"]) {
      if (this.isGrounded) {
        this.jump(this.jumpForce);
        this.hasDoubleJumped = false;
      } else if (this.canDoubleJump && !this.hasDoubleJumped) {
        // Double jump
        this.vy = -this.jumpForce;
        this.hasDoubleJumped = true;
      }
    }
  }

  update(deltaTime) {
    this.handleInput();
    super.update(deltaTime);

    // Reset double jump khi chạm đất
    if (this.isGrounded) {
      this.hasDoubleJumped = false;
    }
  }

  render(ctx) {
    super.render(ctx);

    // Vẽ health bar
    this.renderHealthBar(ctx);
  }

  renderHealthBar(ctx) {
    const barWidth = 50;
    const barHeight = 5;
    const barX = this.x;
    const barY = this.y - 10;

    // Background
    ctx.fillStyle = "red";
    ctx.fillRect(barX, barY, barWidth, barHeight);

    // Health
    ctx.fillStyle = "green";
    const healthWidth = (this.health / this.maxHealth) * barWidth;
    ctx.fillRect(barX, barY, healthWidth, barHeight);
  }
}

// ============================================
// 5. Enemy - KẺ THÙ
// ============================================
class Enemy extends Character {
  constructor(x, y, type = "basic") {
    super(x, y, 40, 40, "enemy.png");

    this.type = type;
    this.moveSpeed = 2;
    this.attackRange = 50;
    this.attackDamage = 10;
    this.attackCooldown = 1000; // ms
    this.lastAttackTime = 0;

    // AI behavior
    this.patrolDistance = 100;
    this.startX = x;
    this.direction = 1; // 1 = right, -1 = left

    if (type === "fast") {
      this.moveSpeed = 4;
      this.health = 50;
    } else if (type === "tank") {
      this.moveSpeed = 1;
      this.health = 200;
    }
  }

  // AI Logic
  update(deltaTime) {
    super.update(deltaTime);

    if (this.isDead) return;

    // Tuần tra qua lại
    this.vx = this.moveSpeed * this.direction;

    // Đổi hướng khi đi quá xa điểm spawn
    if (Math.abs(this.x - this.startX) > this.patrolDistance) {
      this.direction *= -1;
      this.flipX = this.direction === -1;
    }
  }

  // Tấn công khi gần player
  tryAttack(hero, currentTime) {
    if (this.isDead) return;

    const distance = Math.abs(this.x - hero.x);
    if (
      distance < this.attackRange &&
      currentTime - this.lastAttackTime > this.attackCooldown
    ) {
      hero.takeDamage(this.attackDamage);
      this.lastAttackTime = currentTime;
      return true;
    }
    return false;
  }
}

// ============================================
// 6. VÍ DỤ SỬ DỤNG
// ============================================

// Setup canvas
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

// Tạo các đối tượng
const hero = new Hero(100, 300);
const enemies = [
  new Enemy(400, 300, "basic"),
  new Enemy(600, 300, "fast"),
  new Enemy(300, 300, "tank"),
];

// Lắng nghe phím
window.addEventListener("keydown", (e) => {
  hero.keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  hero.keys[e.key] = false;
});

// Game loop
let lastTime = 0;
function gameLoop(currentTime) {
  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;

  // Clear canvas
  ctx.fillStyle = "#87CEEB";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Vẽ ground
  ctx.fillStyle = "#8B4513";
  ctx.fillRect(0, 400, canvas.width, canvas.height - 400);

  // Update và render hero
  hero.update(deltaTime);
  hero.render(ctx);

  // Update và render enemies
  enemies.forEach((enemy) => {
    if (enemy.active) {
      enemy.update(deltaTime);
      enemy.render(ctx);
      enemy.tryAttack(hero, currentTime);

      // Kiểm tra collision với hero
      if (hero.collidesWith(enemy)) {
        console.log("Hero chạm enemy!");
      }
    }
  });

  requestAnimationFrame(gameLoop);
}

// Bắt đầu game
requestAnimationFrame(gameLoop);
