class Ripple {
  constructor(x, y, width, height, speed, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.type = type;
  }

  draw() {
    ctx1.fillStyle = "blue";
    ctx1.fillRect(this.x, this.y, this.width, this.height);
  }
  update() {
    // update speed for obstacle
    this.x += this.speed * gameSpeed;
    if (this.speed > 0) {
      if (this.x > canvas.width + this.width) {
        // reset car
        this.x = 0 - this.width;
      }
    } else if (this.x < 0 - this.width) {
      this.x = canvas.width;
    }
  }
}
