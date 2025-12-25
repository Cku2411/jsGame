export const Directions = Object.freeze({
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
});

export class Input {
  constructor() {
    this.heldDirections = [];

    document.addEventListener("keydown", (e) => {
      if (e.code === "ArrowUp" || e.code === "KeyW") {
        this.onArrowPressed(Directions.UP);
      } else if (e.code === "ArrowDown" || e.code === "KeyS") {
        this.onArrowPressed(Directions.DOWN);
      } else if (e.code === "ArrowLeft" || e.code === "KeyA") {
        this.onArrowPressed(Directions.LEFT);
      } else if (e.code === "ArrowRight" || e.code === "KeyD") {
        this.onArrowPressed(Directions.RIGHT);
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.code === "ArrowUp" || e.code === "KeyW") {
        this.onArrowRelease(Directions.UP);
      } else if (e.code === "ArrowDown" || e.code === "KeyS") {
        this.onArrowRelease(Directions.DOWN);
      } else if (e.code === "ArrowLeft" || e.code === "KeyA") {
        this.onArrowRelease(Directions.LEFT);
      } else if (e.code === "ArrowRight" || e.code === "KeyD") {
        this.onArrowRelease(Directions.RIGHT);
      }
    });
  }

  get direction() {
    return this.heldDirections[0]; //return undefined if dont have any keys
  }

  onArrowPressed(direction) {
    if (this.heldDirections.indexOf(direction) === -1) {
      // add new directions to the beginning of arrray

      this.heldDirections.unshift(direction);
    }
  }

  onArrowRelease(direction) {
    const index = this.heldDirections.indexOf(direction);
    if (index === -1) {
      return;
    }

    // Remove this key from the list
    this.heldDirections.splice(index, 1);
  }
}
