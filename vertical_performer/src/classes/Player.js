export class Player {
  constructor(position) {
    this.position = position;
    this.velocity = { x: 0, y: 1 };
    this.height = 100;
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, 100, this.height);
  }
  update(ctx, gravity, canvas) {
    this.draw(ctx);
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    // chekc colision with canvas
    if (this.position.y + this.height + this.velocity.y < canvas.height) {
      this.velocity.y += gravity;
    } else {
      // stop falling
      this.velocity.y = 0;
    }
  }
}
