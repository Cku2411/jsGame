import { TILE_SIZE } from "../index.js";
import { Vector2 } from "./Vector2.js";

export class GameObject {
  constructor({ game, sprite, position, scale }) {
    this.game = game;
    this.sprite = sprite ?? {
      x: 0,
      y: 0,
      Width: TILE_SIZE,
      height: TILE_SIZE,
      image: "",
    };
    this.position = position ?? new Vector2(0, 0);
    this.scale = scale ?? 1;
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(
      this.position.x * TILE_SIZE,
      this.position.y * TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE
    );
  }
}
