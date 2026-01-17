import { GameObject } from "./GameObjects.js";

export class Person extends GameObject {
  constructor({ position, isPlayerControlled }) {
    super({ position });

    this.isPlayerControlled = isPlayerControlled || false;
    this.movingProgressRemaining = 16; //1title
    this.directionUpdate = {
      up: ["y", -1],
      down: ["y", 1],
      left: ["x", -1],
      right: ["x", 1],
    };
  }

  update(state) {
    // onlymove if hero
    this.isPlayerControlled && this.updatePositon();

    if (this.movingProgressRemaining == 0 && state.direction) {
      this.direction = state.direction;
      // check collision with map
      state.map.isSpaceTaken(this.position.x, this.position.y, this.direction);
      this.movingProgressRemaining = 16;
    }
    this.updateSprite(state);
  }

  updatePositon() {
    if (this.movingProgressRemaining > 0) {
      const [propety, change] = this.directionUpdate[this.direction];
      this.position[propety] += change;
      this.movingProgressRemaining -= 1;
    }
  }

  updateSprite(state) {
    if (
      this.isPlayerControlled &&
      this.movingProgressRemaining == 0 &&
      !state.direction
    ) {
      this.sprite.setAnimation("idle-" + this.direction);
      return;
    }

    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation("walk-" + this.direction);
    }
  }
}
