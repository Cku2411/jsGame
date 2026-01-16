import { COLS, ROWS, TILE_SIZE } from "../const.js";
import { DirectionInput } from "./Input.js";
import { OverworldMap } from "./OverworldMaps.js";

export class World {
  constructor({ document }) {
    this.document = document;
    this.canvas = this.document.getElementById("board");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
  }

  startGameLoop() {
    const update = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // Draw background
      this.map.drawBackground(this.ctx);

      // Draw gameObjects
      Object.values(this.map.gameObjects).forEach((obj) => {
        obj.update({ key: this.input.direction });
        // obj.position.x += 0.2;
        obj.sprite.draw(this.ctx);
      });

      // draw foreground
      this.map.drawForeground(this.ctx);

      requestAnimationFrame(update);
    };

    update();
  }

  init(mapName) {
    // creat map
    // const mapName = "DemoRoom";
    this.map = new OverworldMap({
      gameObjects: window.OverworldMaps[mapName].gameObjects,
      backgroundSrc: window.OverworldMaps[mapName].backgroundLayer,
      foregroundSrc: window.OverworldMaps[mapName].foregroundLayer,
    });

    this.input = new DirectionInput();
    this.input.init();

    this.startGameLoop();
    this.drawGrid();
  }

  drawGrid() {
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        this.ctx.strokeStyle = "gray";
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(col * 16 + 0.5, row * 16 + 0.5, 16, 16);
      }
    }
  }
}
