import { isCollision } from "../util";
import { Sprite } from "./Sprite";

export class Player extends Sprite {
  constructor({
    position,
    collisionBlocks,
    imageSrc,
    animations,
    frameRate,
    scale = 0.5,
  }) {
    super({ imageSrc, frameRate, scale });
    this.position = position;
    this.velocity = { x: 0, y: 1 };

    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 14,
      height: 27,
    };

    this.collisionBlocks = collisionBlocks;
    this.animations = animations;

    for (let key in this.animations) {
      const image = new Image();
      image.src = this.animations[key].imageSrc;

      this.animations[key].image = image;
    }
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

  switchSprite(key) {
    if (this.image === this.animations[key].image) return;
    this.image = this.animations[key].image;
    this.frameBuffer = this.animations[key].frameBuffer;
  }

  update(ctx, gravity, canvas) {
    this.updateFrame();
    this.updateHitbox();

    // draw out the images
    ctx.fillStyle = "rgba(0,255,0,0.2";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    // draw out the hitBox
    ctx.fillStyle = "rgba(255,0,0,0.2";
    ctx.fillRect(
      this.hitbox.position.x,
      this.hitbox.position.y,
      this.hitbox.width,
      this.hitbox.height
    );

    this.draw(ctx);
    this.position.x += this.velocity.x;
    this.updateHitbox();
    this.checkforHorizontalCollisions(canvas);
    this.applyGravity(gravity);
    this.updateHitbox();
    this.checkforVerticalCollisions();
  }

  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 35,
        y: this.position.y + 26,
      },
      width: 14,
      height: 27,
    };
  }

  applyGravity(gravity) {
    this.position.y += this.velocity.y;
    this.velocity.y += gravity;
  }

  checkforHorizontalCollisions(canvas) {
    // check collision with canvasa
    if (this.hitbox.position.x <= 0) {
      console.log("VAO K");

      this.velocity.x = 0;
      const offset = this.hitbox.position.x - this.position.x;
      this.position.x = -(this.hitbox.position.x - this.position.x) - 0.01;
    } else if (this.hitbox.position.x + this.hitbox.width >= canvas.width / 4) {
      this.velocity.x = 0;
      const offset =
        this.hitbox.position.x + this.hitbox.width - this.position.x;
      this.position.x = canvas.width / 4 - offset - 0.01;
    }

    // loop through collision block to detect collisions
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (isCollision({ object1: this.hitbox, object2: collisionBlock })) {
        // if detect collision, stop velocity
        if (this.velocity.x > 0) {
          this.velocity.x = 0;

          const offset =
            this.hitbox.position.x + this.hitbox.width - this.position.x;
          this.position.x = collisionBlock.position.x - offset - 0.01;
          break;
        }
        if (this.velocity.x < 0) {
          this.velocity.x = 0;
          const offset = this.hitbox.position.x - this.position.x;
          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01;
          break;
        }
      }
    }
  }

  checkforVerticalCollisions() {
    // loop through collision block to detect collisions
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (isCollision({ object1: this.hitbox, object2: collisionBlock })) {
        // if detect collision, stop velocity
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height;
          this.position.y = collisionBlock.position.y - offset - 0.01;
          break;
        }
        if (this.velocity.y < 0) {
          this.velocity.y = 0;

          const offset = this.hitbox.position.y - this.position.y;

          this.position.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01;
          break;
        }
      }
    }
  }
}
