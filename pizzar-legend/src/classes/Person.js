import { GameObject } from "./GameObjects.js";

export class Person extends GameObject {
  constructor({ position, isPlayerControlled, Imgsrc, behaviorLoop }) {
    super({ position, Imgsrc });

    this.isPlayerControlled = isPlayerControlled || false;
    this.movingProgressRemaining = 0; //1title
    this.directionUpdate = {
      up: ["y", -1],
      down: ["y", 1],
      left: ["x", -1],
      right: ["x", 1],
    };
  }

  update(state) {
    // if (this.isPlayerControlled) {
    if (this.movingProgressRemaining > 0) {
      this.updatePositon();
    } else {
      // More case for starting to walk will come here
      //

      // Case: We're keyboard ready and have an arrow pressed
      if (this.isPlayerControlled && state.direction) {
        this.startAction(state, {
          type: "walk",
        });
      }

      // update animation
      this.updateSprite(state);
    }
    // }
  }

  startAction(state, action) {
    this.direction = state.direction;

    if (action.type == "walk") {
      // stop here if space is not free
      if (
        state.map.isSpaceTaken(this.position.x, this.position.y, this.direction)
      )
        return;

      // ready to walk
      state.map.moveWall(this.position.x, this.position.y, this.direction);
      this.movingProgressRemaining = 16;
    }
  }

  updatePositon() {
    const [propety, change] = this.directionUpdate[this.direction];
    this.position[propety] += change;
    this.movingProgressRemaining -= 1;
  }

  updateSprite() {
    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation("walk-" + this.direction);
      return;
    }

    this.sprite.setAnimation("idle-" + this.direction);
    return;
  }
}
