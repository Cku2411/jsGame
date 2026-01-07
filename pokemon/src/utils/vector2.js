export class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export const gridCells = (n) => {
  // our grid is based on 16px
  return n * 16;
};
