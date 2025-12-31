import { events } from "./Event";
import { Vector2 } from "./vector2";

export class GameObject {
  constructor({ position }) {
    this.position = position ?? new Vector2(0, 0);
    this.children = [];
    this.drawOffset = new Vector2(0, 0);
    this.parent = null;
    this.hasReadyBeenCalled = false;
    this.isSolid = false;
    this.drawLayer = null;
  }

  //   First entry point of the loop
  stepEntry(delta, root) {
    // Call updates on all children first
    this.children.forEach((child) => child.stepEntry(delta, root));

    // Call ready on the first
    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.ready();
    }

    // Call any implemented Step code
    this.step(delta, root);
  }

  // Call before the 1st steps
  ready() {}

  //   called once every frame
  step(_delta, root) {
    // ...
  }

  //   draw entry
  draw(ctx, x, y) {
    const drawPosX = (x += this.position.x + this.drawOffset.x);
    const drawPosY = (y += this.position.y + this.drawOffset.y);

    // Do the actual rendering for images
    this.drawImage(ctx, drawPosX, drawPosY);

    // Pass on to children
    this.getDrawChildrenOrdered().forEach((child) =>
      child.draw(ctx, drawPosX, drawPosY)
    );
  }

  getDrawChildrenOrdered() {
    return [...this.children].sort((a, b) => {
      if (b.drawLayer === "FLOOR") {
        return 1;
      }
      return a.position.y > b.position.y ? 1 : -1;
    });
  }

  drawImage(ctx, drawPosX, drawPosY) {}

  destroy() {
    this.children.forEach((child) => {
      child.destroy();
    });

    this.parent.removeChild(this);
  }

  // Other GameObject are nestable inside this one.
  addChild(gameObject) {
    gameObject.parent = this;
    this.children.push(gameObject);
  }

  removeChild(gameObject) {
    events.unsubcribe(gameObject);
    // remove gameObject
    this.children = this.children.filter((game) => {
      return gameObject !== game;
    });
  }
}
