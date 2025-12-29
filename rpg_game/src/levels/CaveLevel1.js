import { Level } from "../objects/Level/Level";
import { resources } from "../resoures";
import { Sprite } from "../sprite";
import { Vector2 } from "../vector2";
import { Exit } from "../objects/Exit/exit";
import { Hero } from "../objects/Hero/Hero";
import { Rod } from "../objects/Rod/rod";
import { Gold } from "../objects/Rod/rod";
import { gridCells } from "../helpers/grid";

export class CaveLevel1 extends Level {
  constructor() {
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

    const exit = new Exit(gridCells(6), gridCells(3));
    this.addChild(exit);

    const hero = new Hero(gridCells(6), gridCells(5));
    this.addChild(hero);

    const rod = new Rod(gridCells(7), gridCells(6));
    this.addChild(rod);

    const gold = new Gold(gridCells(8), gridCells(7));
    this.addChild(gold);

    this.walls = new Set();
  }
}
