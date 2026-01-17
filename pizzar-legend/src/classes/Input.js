export class DirectionInput {
  constructor() {
    this.heldDirections = [];
    this.debug = false;

    this.keyMap = {
      ArrowRight: "right",
      ArrowLeft: "left",
      ArrowUp: "up",
      ArrowDown: "down",

      KeyD: "right",
      KeyA: "left",
      KeyW: "up",
      KeyS: "down",
    };
  }

  get direction() {
    return this.heldDirections[0];
  }

  init() {
    document.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        this.debug = true;
        return;
      }

      const dir = this.keyMap[e.code];

      //   neu dir chua cho trong held thi push new dir to the top
      if (dir && this.heldDirections.indexOf(dir) === -1) {
        this.heldDirections.unshift(dir);
      }
    });

    document.addEventListener("keyup", (e) => {
      e.preventDefault();

      const dir = this.keyMap[e.code];
      const index = this.heldDirections.indexOf(dir);
      if (index > -1) {
        this.heldDirections.splice(index, 1);
      }
    });
  }
}
