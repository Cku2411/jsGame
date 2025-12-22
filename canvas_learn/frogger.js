class Frogger {
  constructor() {
    this.spriteWidth = 250;
    this.spriteHeight = 250;
    this.width = this.spriteWidth / 5;
    this.height = this.spriteHeight / 5;
    this.x = canvas.width / 2 - this.width / 2;
    this.y = canvas.height - this.height - 40;
    this.moving = false;
    this.frameX = 0;
    this.frameY = 0;
  }

  update() {
    if (keys["ArrowUp"] && !this.moving) {
      this.y -= grid;
      this.moving = true;
    } else if (keys["ArrowDown"] && !this.moving) {
      if (this.y < canvas.height - this.height * 2) {
        this.y += grid;
        this.moving = true;
      }
    } else if (keys["ArrowLeft"] && !this.moving) {
      if (this.x > this.width) {
        this.x -= grid;
        this.moving = true;
      }
    } else if (keys["ArrowRight"] && !this.moving) {
      if (this.x < canvas.width - this.width * 2) {
        this.x += grid;
        this.moving = true;
      }
    } else if (this.y < 0) scored();
  }

  draw() {
    ctx3.fillStyle = "green";
    ctx3.fillRect(this.x, this.y, this.width, this.height);
  }
  jump() {
    console.log("jumpe");
  }
}

const frogger = new Frogger();
