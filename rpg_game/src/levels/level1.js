import { Hero } from "../objects/Hero/Hero";
import { Level } from "../objects/Level/Level";
import { resources } from "../resoures";
import { Sprite } from "../sprite";
import { Vector2 } from "../vector2";
import { Rod, Gold } from "../objects/Rod/rod";
import { Exit } from "../objects/Exit/exit";
import { gridCells } from "../helpers/grid";

export class OutdoorLevel1 extends Level {
  constructor() {
    super({});
    this.background = new Sprite({
      resource: resources.images.sky,
      frameSize: new Vector2(320, 180),
    });

    const groundSprite = new Sprite({
      resource: resources.images.ground,
      frameSize: new Vector2(320, 180),
    });

    this.addChild(groundSprite);

    const hero = new Hero(gridCells(6), gridCells(5));
    this.addChild(hero);

    const rod = new Rod(gridCells(7), gridCells(6));
    this.addChild(rod);

    const gold = new Gold(gridCells(8), gridCells(7));
    this.addChild(gold);

    const exit = new Exit(gridCells(6), gridCells(3));
    this.addChild(exit);

    // Walle
    this.walls = new Set();

    this.walls.add(`64,48`); //tree

    this.walls.add(`64,64`); //squares
    this.walls.add(`64,80`);
    this.walls.add(`80,64`);
    this.walls.add(`80,80`);

    this.walls.add(`112,80`); //water
    this.walls.add(`128,80`);
    this.walls.add(`144,80`);
    this.walls.add(`160,80`);
  }
}
