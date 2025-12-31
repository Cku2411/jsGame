import { GameObject } from "../../GameObject";
import { Vector2 } from "../../vector2";
import { Sprite } from "../../sprite";
import { resources } from "../../resoures";
import { storyFlag } from "../../StoryFlag";

export class Npc extends GameObject {
  constructor(x, y, textConfig = {}) {
    super({
      position: new Vector2(x, y),
    });

    this.isSolid = true;
    // say somethign
    this.textContent = textConfig.content;
    this.textPortraitFrame = textConfig.portraitFrame;

    // Shadown under feet
    const shadow = new Sprite({
      resource: resources.images.shadow,
      frameSize: new Vector2(32, 32),
      position: new Vector2(-8, -20),
    });

    this.addChild(shadow);

    // body sprite
    const body = new Sprite({
      resource: resources.images.knight,
      frameSize: new Vector2(32, 32),
      hFrames: 2,
      VFrames: 1,
      position: new Vector2(-8, -20),
    });

    this.addChild(body);
  }

  getContent() {
    // we have method here maybe want to expand storyflag logi
    const match = storyFlag.getReleventScenario(this.textContent);
    if (!match) {
      console.warn("No matches found in this list!", this.textContent);

      return null;
    }

    return {
      string: match.string,
      portraitFrame: this.textPortraitFrame,
      addsFlag: match.addsFlag ?? null,
    };
  }
}
