export const LEFT = "LEFT";
export const RIGHT = "RIGHT";
export const UP = "UP";
export const DOWN = "DOWN";

export class Input {
  constructor(game) {
    this.game = game;
    this.keys = [];

    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp" || e.key.toLowerCase() === "w") {
        this.keyPressed(UP);
      } else if (e.key === "ArrowDown" || e.key.toLowerCase() === "s") {
        this.keyPressed(DOWN);
      } else if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        this.keyPressed(LEFT);
      } else if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        this.keyPressed(RIGHT);
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.key === "ArrowUp" || e.key.toLowerCase() === "w") {
        this.keyRelease(UP);
      } else if (e.key === "ArrowDown" || e.key.toLowerCase() === "s") {
        this.keyRelease(DOWN);
      } else if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        this.keyRelease(LEFT);
      } else if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        this.keyRelease(RIGHT);
      } else if (e.key === "Enter") {
        this.game.toggleDebug();
      }
    });
  }

  keyPressed(key) {
    if (this.keys.indexOf(key) === -1) {
      // insert to the begining of the array if not exist in array
      this.keys.unshift(key);
    }
  }
  keyRelease(key) {
    // get index of the key
    const index = this.keys.indexOf(key);
    if (index === -1) return;
    this.keys.splice(index, 1);
  }

  get lastKey() {
    return this.keys[0];
  }
}
