import { ROWS, COLS, TILE_SIZE } from "../index.js";

export class World {
  constructor() {
    this.level1 = {
      waterLayer: [],
      groundLayer: [],
      backgroundLayer: document.getElementById("bglevel1"),
      foregroundLayer: document.getElementById("fglevel1"),
    };
  }

  drawBackground(ctx) {
    ctx.drawImage(this.level1.backgroundLayer, 0, 0);
  }

  drawForeground(ctx) {
    ctx.drawImage(this.level1.foregroundLayer, 0, 0);
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
