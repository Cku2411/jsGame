import { COLS, GAME_HEIGHT, GAME_WIDTH, ROWS, TILE_SIZE } from "../main.js";
import { resources } from "./resources.js";
import { Camera } from "./Camera.js";

export class Word {
  constructor() {
    this.level1 = {
      backgroundLayer: resources.images.background,
    };
    this.camera = new Camera({ mapLevel: this, GAME_WIDTH, GAME_HEIGHT });
    this.zoom = 4;
  }

  drawBackground(ctx) {
    if (this.level1.backgroundLayer.isLoaded) {
      ctx.drawImage(this.level1.backgroundLayer.image, 0, 0);
    }
  }

  drawGrid(ctx) {
    const tileZoom = TILE_SIZE * this.zoom;
    ctx.strokeStyle = "gray";
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        ctx.strokeRect(col * tileZoom, row * tileZoom, tileZoom, tileZoom);
      }
    }
  }
}
