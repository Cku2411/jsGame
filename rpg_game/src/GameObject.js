import { Vector2 } from "./vector2";

export class GameObject {
  constructor({ position }) {
    this.position = position ?? new Vector2(0, 0);
    this.children = [];
    this.drawOffset = new Vector2(0, 0);
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
    const drawPosX = (x += this.position.x + this.drawOffset.x);
    const drawPosY = (y += this.position.y + this.drawOffset.y);

    // Do the actual rendering for images
    this.drawImage(ctx, drawPosX, drawPosY);

    // Pass on to children
    this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
  }

  drawImage(ctx, drawPosX, drawPosY) {}

  // Other GameObject are nestable inside this one.
  addChild(gameObject) {
    this.children.push(gameObject);
  }

  removeChild(gameObject) {
    // remove gameObject
    this.children = this.children.filter((game) => {
      return gameObject !== game;
    });
  }
}
