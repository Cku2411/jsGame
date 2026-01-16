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
    this.isPlayerControlled && this.updatePositon();

    if (this.movingProgressRemaining == 0 && state.key) {
      this.direction = state.key;
      this.movingProgressRemaining = 16;
      this.updateSprite();
    }
  }

  updatePositon() {
    if (this.movingProgressRemaining > 0) {
      const [propety, change] = this.directionUpdate[this.direction];
      this.position[propety] += change;
      this.movingProgressRemaining -= 1;
    }
  }

  updateSprite() {
    if (this.movingProgressRemaining == 0 && state.key) {
      this.sprite.setAnimation("idle-" + this.direction);
    }

    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation("walk-" + this.direction);
    }
  }
}
