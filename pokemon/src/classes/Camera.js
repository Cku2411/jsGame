export class Camera {
  constructor({ mapLevel, width, height }) {
    this.map = mapLevel;
    this.width = width;
    this.height = height;

    this.x = 300;
    this.y = 200;
  }
}
