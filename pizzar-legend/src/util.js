export const utils = {
  grid(x) {
    return x * 16;
  },

  gridCoord(x, y) {
    return `${x * 16},${y * 16}`;
  },

  // find nextposition
  nextPosition(initialX, initialY, direction) {
    let x = initialX;
    let y = initialY;
    const size = 16;

    switch (direction) {
      case "left":
        x -= size;
        break;

      case "right":
        x += size;
        break;
      case "up":
        y -= size;
        break;
      case "down":
        y += size;
        break;

      default:
        break;
    }
    return { x, y };
  },

  emitEvent(name, detail) {
    const event = new CustomEvent(name, {
      detail: detail,
    });

    document.dispatchEvent(event);
  },
};
