import { Vector2 } from "../utils/vector2.js";
import { GameObject } from "./GameObjects.js";
import { Sprite } from "./Sprite.js";
import { resources } from "./resources.js";

export class Monster extends GameObject {
  constructor({ position, game, resource }) {
    // 1. Gọi constructor của cha để set vị trí
    super({ position: position, game: game });

    // 2. TẠO HÌNH ẢNH (Composition)
    const shadow = new Sprite({
      resource: resources.images.shadow,
      position: this.position,
      scale: 2,
    });

    this.addChild(shadow);
    this.body = new Sprite({
      resource: resource,
      position: this.position,
      scale: 3,
      VFrames: 4,
      hFrames: 4,
      currentFrame: 0,
      currentSprite: { x: 0, y: 0, width: 16, height: 16, frameCount: 4 },
      animations: {
        walkDown: { x: 0, y: 0, width: 16, height: 16, frameCount: 4 },
        walkUp: { x: 16, y: 0, width: 16, height: 16, frameCount: 4 },
        walkRight: { x: 48, y: 0, width: 16, height: 16, frameCount: 4 },
        walkLeft: { x: 32, y: 0, width: 16, height: 16, frameCount: 4 },
      },
    });

    this.addChild(this.body);
    this.randomMoveTime = 0;
    this.originalPosition = position;
    this.speed = 4;
  }

  draw(ctx) {
    // draw debug
    super.draw(ctx);
    // draw children
    this.children.forEach((child) => child.draw(ctx));
  }

  update(deltaTime) {
    this.children.forEach((child) => child.update(deltaTime));
    this.randomMove(deltaTime);
  }

  randomMove(deltaTime) {
    this.randomMoveTime += deltaTime;

    if (this.randomMoveTime > 3000) {
      console.log("GOING TO MOVE");

      const radius = 20;
      // chúng ta sẽ randomw move enemy trong 1 vòng tròn
      // randomw goc 0 -360
      const randomAngle = Math.random() * Math.PI * 2;

      // randomw khoang cach tu tam den ban kinh
      const distance = Math.sqrt(Math.random()) * radius;

      // tinh toa do target
      const targetX =
        this.originalPosition.x + Math.cos(randomAngle) * distance;
      const targetY =
        this.originalPosition.x + Math.sin(randomAngle) * distance;
    }
  }
}
