import { Vector2 } from "./vector2";

export class GameObject {
  constructor({ position }) {
    this.position = position ?? new Vector2(0, 0);
    this.children = [];
  }

  //   First entry point of the loop
  stepEntry(delta, root) {
    // Call updates on all children first
    this.children.forEach((child) => child.stepEntry(delta, root));

    // Call any implemented Step code
    this.step(delta, root);
  }

  //   called once every frame
  step(_delta) {
    // ...
  }

  //   draw entry
  draw(ctx, x, y) {
    const drawPosX = (x += this.position + this.drawOffset.x);
    const drawPosY = (y += this.position + this.drawOffset.y);

    // Do the actual rendering for images
    this.drawImage(ctx, drawPosX, drawPosY);

    // Pass on to children
    this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosX));
  }

  drawImage(ctx, drawPosX, drawPosY) {}
}
