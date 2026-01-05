import { GameObject } from "./GameObjects.js";
import { UP, DOWN, LEFT, RIGHT } from "./Input.js";

export class Hero extends GameObject {
  constructor({ game, sprite, position, scale }) {
    super({ game, sprite, position, scale });
  }

  update() {
    if (this.game.input.lastKey === UP) {
      console.log("HERO MOVING UP");
      this.position.y--;
    } else if (this.game.input.lastKey === DOWN) {
      console.log("HERO MOVING UP");
      this.position.y++;
    } else if (this.game.input.lastKey === LEFT) {
      console.log("HERO MOVING UP");
      this.position.x--;
    } else if (this.game.input.lastKey === RIGHT) {
      console.log("HERO MOVING UP");
      this.position.x++;
    }
  }
}
