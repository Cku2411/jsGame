import { ROWS, COLS, TILE_SIZE } from "../index.js";

export class World {
  constructor() {
    this.level1 = {};
  }

  drawGrid(ctx) {
    ctx.strokeStyle = "gray";
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        ctx.strokeRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    }
  }
}
