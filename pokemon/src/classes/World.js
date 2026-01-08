import { COLS, WORLD_HEIGHT, WORLD_WIDTH, ROWS, TILE_SIZE } from "../main.js";
import { resources } from "./resources.js";
import { Camera } from "./Camera.js";

export class Word {
  constructor() {
    this.level1 = {
      backgroundLayer: resources.images.background,
    };
    this.camera = new Camera({ mapLevel: this, WORLD_WIDTH, WORLD_HEIGHT });
    this.zoom = 4;
  }

  drawBackground(ctx) {
    if (this.level1.backgroundLayer.isLoaded) {
      ctx.drawImage(this.level1.backgroundLayer.image, 0, 0);
    }
  }

  drawGrid(ctx) {
    // const tileZoom = TILE_SIZE * this.zoom;
    ctx.strokeStyle = "gray";
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        ctx.strokeRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    }
  }
}
