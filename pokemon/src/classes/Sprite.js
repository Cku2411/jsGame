import { TILE_SIZE } from "../main.js";
import { GameObject } from "./GameObjects.js";

export class Sprite extends GameObject {
  constructor({ position, resource, frameSize, scale }) {
    super({});
    this.position = position;
    this.resource = resource;
    this.scale = scale ?? 1;
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
      this.resource.image.width * this.scale,
      this.resource.image.height * this.scale
    );
  }

  update(ctx) {
    this.draw(ctx);
    // this.updateFrame();
  }
}
