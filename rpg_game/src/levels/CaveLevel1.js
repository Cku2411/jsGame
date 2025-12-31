import { Level } from "../objects/Level/Level";
import { resources } from "../resoures";
import { Sprite } from "../sprite";
import { Vector2 } from "../vector2";
import { Exit } from "../objects/Exit/exit";
import { Hero } from "../objects/Hero/Hero";
import { Rod } from "../objects/Rod/rod";
import { Gold } from "../objects/Rod/rod";
import { gridCells } from "../helpers/grid";
import { events } from "../Event";
import { OutdoorLevel1 } from "./level1";
import { Npc } from "../objects/NPC/Npc";
import { TALK_TO_NPC_A, TALK_TO_NPC_B } from "../StoryFlag";

// =================

const DEFAULT_HERO_POSITION = new Vector2(gridCells(6), gridCells(5));

export class CaveLevel1 extends Level {
  constructor(params = {}) {
    super();

    this.background = new Sprite({
      resource: resources.images.cave,
      frameSize: new Vector2(320, 180),
    });

    const ground = new Sprite({
      resource: resources.images.caveGround,
      frameSize: new Vector2(320, 180),
    });

    this.addChild(ground);

    const exit = new Exit(gridCells(3), gridCells(7));
    this.addChild(exit);

    this.heroStartPosition = params.heroPosition ?? DEFAULT_HERO_POSITION;
    const hero = new Hero(this.heroStartPosition.x, this.heroStartPosition.y);
    this.addChild(hero);

    const npc1 = new Npc(gridCells(5), gridCells(5), {
      content: [
        {
          string: "I am the first NPC!!",
          requires: [TALK_TO_NPC_A], //any string in this list must exit in
          bypass: [],
          addsFlag: TALK_TO_NPC_A,
        },
        {
          string: "this is what I want to say",
          requires: [], //any string in this list must exit in
          bypass: [],
          addsFlag: TALK_TO_NPC_A,
        },
      ],
      portraitFrame: 1,
    });
    this.addChild(npc1);

    const npc2 = new Npc(gridCells(8), gridCells(7), {
      content: [
        {
          string: "Oh, go right and turn left to find something",
          requires: [], //any string in this list must exit in
          bypass: [],
          addsFlag: TALK_TO_NPC_B,
        },
      ],
      portraitFrame: 1,
    });
    this.addChild(npc2);

    const rod = new Rod(gridCells(7), gridCells(6));
    this.addChild(rod);

    const gold = new Gold(gridCells(8), gridCells(7));
    this.addChild(gold);

    this.walls = new Set();
  }

  ready() {
    // catch the hero exits and emit new events
    events.on("HERO_EXITS", this, () => {
      events.emit(
        "CHANGE_LEVEL",
        new OutdoorLevel1({
          heroPosition: new Vector2(gridCells(6), gridCells(3)),
        })
      );
      // mainScene.setLevel(new CaveLevel1());
    });
  }
}
