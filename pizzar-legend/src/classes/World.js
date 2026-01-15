import { COLS, ROWS, TILE_SIZE } from "../const.js";
import { GameObject } from "./GameObjects.js";

export class World {
  constructor({ element }) {
    this.element = element;
    this.canvas = this.element.getElementById("board");
    this.ctx = this.canvas.getContext("2d");
  }

  init() {
    const image = new Image();
    console.log({ image });

    image.src = "./img/maps/DemoLower.png";
    image.onload = () => {
      this.ctx.drawImage(image, 0, 0);
    };

    // Place some GameObject

    const hero = new GameObject({ position: { x: 5, y: 6 } });
    const npc1 = new GameObject({
      position: { x: 7, y: 9 },
      Imgsrc: "./img/characters/people/npc1.png",
    });

    // teset, cho 0,2s cho anh load het

    setTimeout(() => {
      hero.sprite.draw(this.ctx);
      npc1.sprite.draw(this.ctx);
    }, 200);

    // this.drawGrid();
  }

  // drawGrid() {
  //   for (let row = 0; row < ROWS; row++) {
  //     for (let col = 0; col < COLS; col++) {
  //       this.ctx.strokeStlye = "red";
  //       this.ctx.strokeRect(
  //         col * TILE_SIZE,
  //         row * TILE_SIZE,
  //         TILE_SIZE,
  //         TILE_SIZE
  //       );
  //     }
  //   }
  // }
}
