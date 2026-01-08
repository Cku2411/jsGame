import { Vector2 } from "../utils/vector2.js";
import { TILE_SIZE } from "../main.js";

export class GameObject {
  constructor({ position, game }) {
    this.position = position ?? new Vector2(0, 0);
    this.children = [];
    this.game = game;
  }

  draw(ctx) {
    // this.children.forEach((child) => child.draw(ctx));
    ctx.fillStyle = "blue";
    ctx.fillRect(
      this.position.x,
      this.position.y,
      TILE_SIZE * 4,
      4 * TILE_SIZE
    );
  }

  update() {}

  addChild(gameObject) {
    this.children.push(gameObject);
  }
}
