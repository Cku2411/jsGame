import { Vector2 } from "../utils/vector2.js";

export class GameObject {
  constructor({ position }) {
    this.position = position ?? new Vector2(0, 0);
    this.children = [];
  }

  draw(ctx) {
    this.children.forEach((child) => child.draw(ctx));
  }

  update() {}
}
