import { TILE_SIZE } from "../index.js";
import { GameObject } from "./GameObjects.js";
import { UP, DOWN, LEFT, RIGHT } from "./Input.js";

export class Hero extends GameObject {
  constructor({ game, sprite, position, scale }) {
    super({ game, sprite, position, scale });
    this.speed = 200;
    this.maxFrame = 8;
    this.moving = false;
  }

  update(deltaTime) {
    let nextX = this.destinationPosition.x;
    let nextY = this.destinationPosition.y;

    // in slower machine delta time is higher than fast machine
    // remember speed shows how many pixels per seconds the character to move
    // delta time is time between frames (we want ration deltaTime/1000ms)
    const scaledSpeed = this.speed * (deltaTime / 1000);

    const distance = this.moveTowards(this.destinationPosition, scaledSpeed);
    const arrived = distance <= scaledSpeed;

    if (arrived) {
      if (this.game.input.lastKey === UP) {
        nextY -= TILE_SIZE;
        this.sprite.y = 8;
      } else if (this.game.input.lastKey === DOWN) {
        nextY += TILE_SIZE;
        this.sprite.y = 10;
      } else if (this.game.input.lastKey === LEFT) {
        nextX -= TILE_SIZE;
        this.sprite.y = 9;
      } else if (this.game.input.lastKey === RIGHT) {
        nextX += TILE_SIZE;
        this.sprite.y = 11;
      }

      const col = nextX / TILE_SIZE;
      const row = nextY / TILE_SIZE;

      if (
        this.game.world.getTile(
          this.game.world.level1.collisionLayer,
          row,
          col
        ) !== 1
      ) {
        this.destinationPosition.x = nextX;
        this.destinationPosition.y = nextY;
      }
    }

    if (this.game.input.keys.length > 0 || !arrived) {
      this.moving = true;
    } else {
      this.moving = false;
    }

    if (this.game.eventUpdate && this.moving) {
      this.sprite.x < this.maxFrame ? this.sprite.x++ : (this.sprite.x = 0);
    } else if (!this.moving) {
      // reset spriteSheet to frame 0
      this.sprite.x = 0;
    }
  }
}
