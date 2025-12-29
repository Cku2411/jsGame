import { Camera } from "../../Camera";
import { events } from "../../Event";
import { GameObject } from "../../GameObject";
import { Input } from "../../input";
import { Inventory } from "../inventory/Inventory";
import { TextBox } from "../TextBox/TextBox";

export class Main extends GameObject {
  constructor() {
    super({});
    this.level = null;
    this.input = new Input();
    this.camera = new Camera();
    this.inventory = new Inventory();
    this.textBox = new TextBox();
  }

  ready() {
    events.on("CHANGE_LEVEL", this, (newLevelInstance) => {
      this.setLevel(newLevelInstance);
    });
  }

  setLevel(newLevelInstance) {
    // remove current level and add new one
    if (this.level) {
      this.level.destroy();
    }

    this.level = newLevelInstance;
    this.addChild(this.level);
  }

  drawBackground(ctx) {
    this.level?.background.drawImage(ctx, 0, 0);
  }

  drawForeground(ctx) {
    this.inventory.draw(
      ctx,
      this.inventory.position.x,
      this.inventory.position.y
    );

    this.textBox.draw(ctx, 0, 0);
  }
}
