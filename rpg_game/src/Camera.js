import { GameObject } from "./GameObject";
import { events } from "./Event";
import { Vector2 } from "./vector2";

export class Camera extends GameObject {
  constructor() {
    super({});

    events.on("HERO_POSITION", this, (heroPosition) => {
      this.centerPositionOnTarget(heroPosition);
    });

    // Camera knows when a new level starts
    events.on("CHANGE_LEVEL", this, (newMap) => {
      console.log("CAMERA: ", newMap.heroStartPosition);
      this.centerPositionOnTarget(newMap.heroStartPosition);
    });
  }

  centerPositionOnTarget(pos) {
    // Create a new positoij based on the hero's position
    const personHalf = 8;
    const canvasWidth = 320;
    const canvasHeight = 180;

    const halfWidth = -personHalf + canvasWidth / 2;
    const halfHeight = -personHalf + canvasHeight / 2;
    this.position = new Vector2(-pos.x + halfWidth, -pos.y + halfHeight);
  }
}
