import { COLS, ROWS, TILE_SIZE } from "../const.js";

export class World {
  constructor({ element }) {
    this.element = element;
    this.canvas = this.element.getElementById("board");
    this.ctx = this.canvas.getContext("2d");
  }

  init() {
    console.log("HELLOOOO", this);
    const image = new Image();
    image.src = "./img/maps/DemoLower.png";
    image.onload = () => {
      this.ctx.drawImage(image, 0, 0);
    };

    const x = 1;
    const y = 4;
    const hero = new Image();
    hero.src = "./img/characters/people/hero.png";
    hero.onload = () => {
      this.ctx.drawImage(hero, 0, 0, 32, 32, x * 16, y * 16, 32, 32);
    };

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
