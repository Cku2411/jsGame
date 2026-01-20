import { utils } from "../util.js";
import { GameObject } from "./GameObjects.js";

export class Person extends GameObject {
  constructor({ position, isPlayerControlled, Imgsrc, behaviorLoop, talking }) {
    super({ position, Imgsrc, behaviorLoop });

    this.isStanding = false;
    this.isPlayerControlled = isPlayerControlled || false;
    this.movingProgressRemaining = 0; //1title
    this.directionUpdate = {
      up: ["y", -1],
      down: ["y", 1],
      left: ["x", -1],
      right: ["x", 1],
    };

    this.talking = talking || [];
  }

  update({ direction, map }) {
    // if (this.isPlayerControlled) {
    if (this.movingProgressRemaining > 0) {
      this.updatePositon();
    } else {
      // More case for starting to walk will come here
      //

      // Case: We're keyboard ready and have an arrow pressed
      if (!map.isCuttingScenePlaying && this.isPlayerControlled && direction) {
        this.startAction(
          { map },
          {
            type: "walk",
            direction: direction,
          },
        );
      }

      // update animation
      this.updateSprite();
    }
    // }
  }

  startAction({ map }, action) {
    this.direction = action.direction;

    if (action.type == "walk") {
      // stop here if space is not free
      if (map.isSpaceTaken(this.position.x, this.position.y, this.direction)) {
        // id NPC get stucked, retry ..
        action.retry &&
          setTimeout(() => {
            this.startAction({ map }, action);
          }, 100);
        return;
      }

      // ready to walk
      map.moveWall(this.position.x, this.position.y, this.direction);
      this.movingProgressRemaining = 16;
      this.updateSprite();
    }

    if (action.type == "stand") {
      this.isStanding = true;
      setTimeout(() => {
        utils.emitEvent("PersonStandComplete", {
          who: this.id,
        });
        this.isStanding = false;
      }, action.timeOut);
    }
  }

  updatePositon() {
    const [propety, change] = this.directionUpdate[this.direction];
    this.position[propety] += change;
    this.movingProgressRemaining -= 1;

    // case for NPC
    if (this.movingProgressRemaining === 0) {
      // finish npc walk, emit the event

      utils.emitEvent("PersonWalkingComplete", {
        who: this.id,
      });
    }
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
