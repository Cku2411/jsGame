export class Sprite {
  constructor({ position, resource, frameSize }) {
    this.position = position;
    this.resource = resource;
  }

  draw(ctx) {
    if (!this.resource.isLoaded) {
      return;
    }

    // draw sprite
    ctx.drawImage(
      this.resource.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update(ctx) {
    this.draw(ctx);
    // this.updateFrame();
  }
}
