import { Directions } from "./input";

export class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  duplicate() {
    return new Vector2(this.x, this.y);
  }

  matches(otherVector2) {
    return this.x === otherVector2.x && this.y === otherVector2.y;
  }

  toNeighbor(dir) {
    let x = this.x;
    let y = this.y;

    if (dir === Directions.LEFT) {
      x -= 16;
    } else if (dir === Directions.RIGHT) {
      x += 16;
    } else if (dir === Directions.UP) {
      y -= 16;
    } else if (dir === Directions.DOWN) {
      y += 16;
    }
    return new Vector2(x, y);
  }
}
