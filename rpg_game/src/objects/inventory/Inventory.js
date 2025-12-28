import { GameObject } from "../../GameObject";
import { resources } from "../../resoures";
import { Sprite } from "../../sprite";
import { Vector2 } from "../../vector2";
import { events } from "../../Event";

export class Inventory extends GameObject {
  constructor() {
    super({ position: new Vector2(0, 1) });

    this.nextId = 0;
    this.items = [
      {
        id: -1,
        image: resources.images.rod,
      },
      {
        id: -2,
        image: resources.images.rod,
      },
    ];

    // React to Hero picking up an item
    events.on("HERO_PICKS_UP_ITEM", this, (data) => {
      //   Show something on screen
      this.nextId += 1;
      this.items.push({
        id: this.nextId,
        image: data.image,
      });

      this.renderInventory();
    });

    // Draw initial state on bootup
    this.renderInventory();
  }

  renderInventory() {
    // Remove
    this.children.forEach((child) => child.destroy());

    // Draw fresh from the lastest version of the list
    this.items.forEach((item, index) => {
      const sprite = new Sprite({
        resource: item.image,
        position: new Vector2(index * 12, 0),
      });

      this.addChild(sprite);
    });
  }

  removeFromInventory() {
    this.items = this.items.filter((item) => item.id !== id);
    this.renderInventory();
  }
}
