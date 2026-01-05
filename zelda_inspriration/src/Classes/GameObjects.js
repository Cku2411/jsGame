import { TILE_SIZE } from "../index.js";
import { Vector2 } from "./Vector2.js";

export class GameObject {
  constructor({ game, sprite, position, scale }) {
    this.game = game;
    this.sprite = sprite ?? {
      x: 0,
      y: 0,
      Width: TILE_SIZE,
      height: TILE_SIZE,
      image: "",
    };
    this.position = position ?? new Vector2(0, 0);
    this.scale = scale ?? 1;

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
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, TILE_SIZE, TILE_SIZE);
  }
}
