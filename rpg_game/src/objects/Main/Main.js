import { Camera } from "../../Camera";
import { GameObject } from "../../GameObject";
import { Input } from "../../input";
import { Inventory } from "../inventory/Inventory";

export class Main extends GameObject {
  constructor() {
    super({});
    this.level = null;
    this.input = new Input();
    this.camera = new Camera();
    this.inventory = new Inventory();
  }

  setLevel(newLevelInstance) {}

  drawBackground(ctx) {
    this.level?.background.drawImage(ctx, 0, 0);
  }

  drawForeground(ctx) {
    this.inventory.draw(ctx, this.inventory.x, this.inventory.y);
  }
}
