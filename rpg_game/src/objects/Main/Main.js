import { Camera } from "../../Camera";
import { events } from "../../Event";
import { GameObject } from "../../GameObject";
import { Input } from "../../input";
import { Inventory } from "../inventory/Inventory";
import { SpriteTextString } from "../SpriteTextString/SpriteTextString";
import { TextBox } from "../TextBox/TextBox";

export class Main extends GameObject {
  constructor() {
    super({});
    this.level = null;
    this.input = new Input();
    this.camera = new Camera();
  }

  ready() {
    const inventory = new Inventory();
    this.addChild(inventory);

    // Change level handlers
    events.on("CHANGE_LEVEL", this, (newLevelInstance) => {
      this.setLevel(newLevelInstance);
    });

    // Launch Text Box handler
    events.on("HERO_REQUESTS_ACTION", this, (withObject) => {
      if (typeof withObject.getContent == "function") {
        const content = withObject.getContent();

        const textBox = new SpriteTextString({
          string: content.string,
          portraitFrame: content.portraitFrame,
        });
        this.addChild(textBox);

        events.emit("START_TEXT_BOX");
        // event.on() return an ID and event.off(id) to unsubcribe
        const endingSub = events.on("END_TEXT_BOX", this, () => {
          // remove child from parent
          textBox.destroy();
          events.off(endingSub);
        });
      }
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

  drawObjects(ctx) {
    this.children.forEach((child) => {
      if (child.drawLayer !== "HUD") {
        child.draw(ctx, 0, 0);
      }
    });
  }

  drawBackground(ctx) {
    this.level?.background.drawImage(ctx, 0, 0);
  }

  drawForeground(ctx) {
    // this.inventory.draw(
    //   ctx,
    //   this.inventory.position.x,
    //   this.inventory.position.y
    // );
    // this.textBox.draw(ctx, 0, 0);

    this.children.forEach((child) => {
      if (child.drawLayer == "HUD") {
        child.draw(ctx, 0, 0);
      }
    });
  }
}
