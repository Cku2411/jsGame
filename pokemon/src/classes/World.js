import { COLS, ROWS, TILE_SIZE } from "../main.js";
import { resources } from "./resources.js";

export class Word {
  constructor() {
    this.level1 = {
      backgroundLayer: resources.images.background,
    };
  }

  drawBackground(ctx) {
    if (this.level1.backgroundLayer.isLoaded) {
      ctx.drawImage(this.level1.backgroundLayer.image, 0, 0);
    }
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
