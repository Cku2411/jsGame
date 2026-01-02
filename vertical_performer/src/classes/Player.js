import { isCollision } from "../util";
import { Sprite } from "./Sprite";

export class Player extends Sprite {
  constructor({ position, collisionBlocks, imageSrc, frameRate, scale = 0.5 }) {
    super({ imageSrc, frameRate, scale });
    this.position = position;
    this.velocity = { x: 0, y: 1 };
    this.collisionBlocks = collisionBlocks;
    this.width = 180;
    this.height = 111;
  }
  // draw(ctx) {
  //   if (!this.image) return;
  //   ctx.drawImage(
  //     this.image,
  //     0,
  //     0,
  //     25,
  //     25,
  //     this.position.x,
  //     this.position.y,
  //     25,
  //     25
  //   );
  // }

  update(ctx, gravity, canvas) {
    this.updateFrame();
    // console.log({ x: this.position.x, y: this.position.y });
    ctx.fillStyle = "rgba(0,255,0,0.2";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    this.draw(ctx);
    this.position.x += this.velocity.x;

    this.checkforHorizontalCollisions(canvas);
    this.applyGravity(gravity);
    this.checkforVerticalCollisions();
  }

  applyGravity(gravity) {
    this.position.y += this.velocity.y;
    this.velocity.y += gravity;
  }

  checkforHorizontalCollisions(canvas) {
    // check collision with canvas
    // if (this.position.x <= 0) {
    //   this.velocity.x = 0;
    //   this.position.x = 0;
    // } else if (this.position.x + this.width >= canvas.width / 4) {
    //   console.log(canvas.width);

    //   this.velocity.x = 0;
    //   this.position.x = canvas.width / 4 - this.width - 0.01;
    // }

    // loop through collision block to detect collisions
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (isCollision({ object1: this, object2: collisionBlock })) {
        // if detect collision, stop velocity
        if (this.velocity.x > 0) {
          this.velocity.x = 0;
          this.position.x = collisionBlock.position.x - this.width - 0.01;
          break;
        }
        if (this.velocity.x < 0) {
          this.velocity.x = 0;
          this.position.x =
            collisionBlock.position.x + collisionBlock.width + 0.01;
          break;
        }
      }
    }
  }

  checkforVerticalCollisions() {
    // loop through collision block to detect collisions
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (isCollision({ object1: this, object2: collisionBlock })) {
        // if detect collision, stop velocity
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          // move play in the top of the collision block () + 0.01
          this.position.y = collisionBlock.position.y - this.height - 0.01;
          break;
        }
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height + 0.01;
          break;
        }
      }
    }
  }
}
