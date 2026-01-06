import { HALF_TILE, TILE_SIZE } from "../index.js";
import { Vector2 } from "./Vector2.js";

export class GameObject {
  constructor({ game, sprite, position, scale }) {
    this.game = game;
    this.sprite = sprite ?? {
      image: "",
      x: 0,
      y: 0,
      width: TILE_SIZE,
      height: TILE_SIZE,
    };
    this.position = position ?? new Vector2(0, 0);
    this.scale = scale ?? 1;

    this.width = this.sprite.width * this.scale;
    this.halfWidth = this.width / 2;
    this.height = this.sprite.height * this.scale;

    this.destinationPosition = new Vector2(this.position.x, this.position.y);
    this.distanceToTravel = new Vector2(0, 0);
  }

  moveTowards(destinationPosition, speed) {
    this.distanceToTravel.x = destinationPosition.x - this.position.x;
    this.distanceToTravel.y = destinationPosition.y - this.position.y;

    // let distance = Math.sqrt(
    //   this.distanceToTravel.x ** 2 + this.distanceToTravel.y ** 2
    // );
    let distance = Math.hypot(this.distanceToTravel.x, this.distanceToTravel.y);

    if (distance <= speed) {
      // if close enough, snap to position
      this.position.x = destinationPosition.x;
      this.position.y = destinationPosition.y;
    } else {
      // else take a step towards destination
      const stepX = this.distanceToTravel.x / distance;
      const stepY = this.distanceToTravel.y / distance;

      this.position.x += stepX * speed;
      this.position.y += stepY * speed;

      // Remaining distance
      this.distanceToTravel.x = destinationPosition.x - this.position.x;
      this.distanceToTravel.y = destinationPosition.y - this.position.y;

      distance = Math.hypot(this.distanceToTravel.x, this.distanceToTravel.y);
    }

    return distance;
  }

  draw(ctx) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.position.x, this.position.y, TILE_SIZE, TILE_SIZE);

    ctx.strokeStyle = "yellow";
    ctx.strokeRect(
      this.destinationPosition.x,
      this.destinationPosition.y,
      TILE_SIZE,
      TILE_SIZE
    );

    // draw sprite
    ctx.drawImage(
      this.sprite.image,
      this.sprite.x * this.sprite.width,
      this.sprite.y * this.sprite.height,
      this.sprite.width,
      this.sprite.height,
      this.position.x + HALF_TILE - this.halfWidth,
      this.position.y + TILE_SIZE - this.height,
      this.width,
      this.height
    );
  }
}
