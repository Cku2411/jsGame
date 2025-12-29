import { GameObject } from "../../GameObject";
import { Directions } from "../../input";
import { Vector2 } from "../../vector2";
import { Sprite } from "../../sprite";
import { FrameIndexPattern } from "../../FrameIndexPattern";
import { isSpaceFree } from "../../helpers/grid";
import { moveTowards } from "../../helpers/moveToward";
import { resources } from "../../resoures";
import { Animations } from "../../animation";
import {
  PICK_UP_DOWN,
  STAND_DOWN,
  STAND_LEFT,
  STAND_RIGHT,
  STAND_UP,
  WALK_DOWN,
  WALK_LEFT,
  WALK_RIGHT,
  WALK_UP,
} from "./Heroanimation";
import { events } from "../../Event";

export class Hero extends GameObject {
  constructor(x, y) {
    super({
      position: new Vector2(x, y),
    });

    this.shadow = new Sprite({
      resource: resources.images.shadow,
      position: new Vector2(-8, -20),
      frameSize: new Vector2(32, 32),
    });

    this.addChild(this.shadow);

    this.body = new Sprite({
      resource: resources.images.hero,
      frameSize: new Vector2(32, 32),
      hFrames: 3,
      VFrames: 8,
      frame: 1,
      position: new Vector2(-8, -20),
      animations: new Animations({
        walkRight: new FrameIndexPattern(WALK_RIGHT),
        walkLeft: new FrameIndexPattern(WALK_LEFT),
        walkUp: new FrameIndexPattern(WALK_UP),
        walkDown: new FrameIndexPattern(WALK_DOWN),

        standRight: new FrameIndexPattern(STAND_RIGHT),
        standLeft: new FrameIndexPattern(STAND_LEFT),
        standUp: new FrameIndexPattern(STAND_UP),
        standDown: new FrameIndexPattern(STAND_DOWN),
        pickUpDown: new FrameIndexPattern(PICK_UP_DOWN),
      }),
    });

    this.addChild(this.body);
    this.facingDirection = Directions.DOWN;
    this.heroDestinationPosition = this.position.duplicate();
    this.itemPickupTime = 0;
    this.itemPickupShell = null;

    // listen to the event
    events.on("HERO_PICKS_UP_ITEM", this, (data) => {
      this.onPickUpItem(data);
    });
  }

  step(delta, root) {
    if (this.itemPickupTime > 0) {
      this.workOnItemPickup(delta);
      return;
    }

    const distance = moveTowards(this, this.heroDestinationPosition, 1);

    const hasArrived = distance <= 1;
    if (hasArrived) {
      this.tryMove(root);
    }

    this.tryEmitPosition();
  }

  tryEmitPosition() {
    if (this.lastX === this.position.x && this.lastY === this.position.y) {
      // dont emit event
      return;
    }

    this.lastX = this.position.x;
    this.lastY = this.position.y;

    events.emit("HERO_POSITION", this.position);
  }

  tryMove(root) {
    const { input } = root;

    if (!input.direction) {
      if (this.facingDirection === Directions.LEFT) {
        this.body.animations.play("standLeft");
      } else if (this.facingDirection === Directions.DOWN) {
        this.body.animations.play("standDown");
      } else if (this.facingDirection === Directions.UP) {
        this.body.animations.play("standUp");
      } else if (this.facingDirection === Directions.RIGHT) {
        this.body.animations.play("standRight");
      }
      return;
    }

    let nextX = this.heroDestinationPosition.x;
    let nextY = this.heroDestinationPosition.y;
    const gridSize = 16;

    if (input.direction === Directions.DOWN) {
      nextY += gridSize;
      this.body.animations.play("walkDown");
    } else if (input.direction === Directions.UP) {
      nextY -= gridSize;
      this.body.animations.play("walkUp");
    } else if (input.direction === Directions.LEFT) {
      nextX -= gridSize;
      this.body.animations.play("walkLeft");
    } else if (input.direction === Directions.RIGHT) {
      nextX += gridSize;
      this.body.animations.play("walkRight");
    }

    this.facingDirection = input.direction ?? this.facingDirection;
    // check if that space is free
    if (isSpaceFree(root.level?.walls, nextX, nextY)) {
      this.heroDestinationPosition.x = nextX;
      this.heroDestinationPosition.y = nextY;
    }
  }

  onPickUpItem({ image, position }) {
    // when pickup item, change destination to this
    this.heroDestinationPosition = position.duplicate();

    // start the pickup animation
    this.itemPickupTime = 500;

    this.itemPickupShell = new GameObject({});
    this.itemPickupShell.addChild(
      new Sprite({
        resource: image,
        position: new Vector2(0, -18),
      })
    );

    // add Child to the heroes
    this.addChild(this.itemPickupShell);
  }

  workOnItemPickup(delta) {
    this.itemPickupTime -= delta;
    this.body.animations.play("pickUpDown");

    if (this.itemPickupTime <= 0) {
      this.itemPickupShell.destroy();
    }
  }
}
