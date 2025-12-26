import { GameLoop } from "./gameLoop";
import { gridCells, isSpaceFree } from "./helpers/grid";
import { Directions, Input } from "./input";
import { resources } from "./resoures";
import { Sprite } from "./sprite";
import "./style.css";
import { Vector2 } from "./vector2";
import { moveTowards } from "./helpers/moveToward";
import { walls } from "./levels/level1";
import { Animations } from "./animation";
import { FrameIndexPattern } from "./FrameIndexPattern";
import {
  STAND_DOWN,
  STAND_LEFT,
  STAND_RIGHT,
  STAND_UP,
  WALK_DOWN,
  WALK_LEFT,
  WALK_RIGHT,
  WALK_UP,
} from "./objects/Hero/Heroanimation";

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180),
});

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),
});

const hero = new Sprite({
  resource: resources.images.hero,
  frameSize: new Vector2(32, 32),
  hFrames: 3,
  VFrames: 8,
  frame: 1,
  position: new Vector2(gridCells(6), gridCells(5)),
  animations: new Animations({
    walkRight: new FrameIndexPattern(WALK_RIGHT),
    walkLeft: new FrameIndexPattern(WALK_LEFT),
    walkUp: new FrameIndexPattern(WALK_UP),
    walkDown: new FrameIndexPattern(WALK_DOWN),

    standRight: new FrameIndexPattern(STAND_RIGHT),
    standLeft: new FrameIndexPattern(STAND_LEFT),
    standUp: new FrameIndexPattern(STAND_UP),
    standDown: new FrameIndexPattern(STAND_DOWN),
  }),
});

const heroDestinationPosition = hero.position.duplicate();
let heroFacing = Directions.DOWN;

const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),
});

const input = new Input();

const update = (delta) => {
  const distance = moveTowards(hero, heroDestinationPosition, 1);

  // check if distance < 1px=> move hero to this
  const hasArrived = distance <= 1;
  // Attempt to move again if the hero is at his position

  if (hasArrived) {
    tryMove();
  }

  // work on hero animation
  hero.step(delta);
  // Update entities in the game
};

const tryMove = () => {
  if (!input.direction) {
    if (heroFacing === Directions.LEFT) {
      hero.animations.play("standLeft");
    } else if (heroFacing === Directions.DOWN) {
      hero.animations.play("standDown");
    } else if (heroFacing === Directions.UP) {
      hero.animations.play("standUp");
    } else if (heroFacing === Directions.RIGHT) {
      hero.animations.play("standRight");
    }
    return;
  }

  let nextX = heroDestinationPosition.x;
  let nextY = heroDestinationPosition.y;
  const gridSize = 16;

  console.log("Current direction:", input.direction);
  if (input.direction === Directions.DOWN) {
    // hero.position.y += 1;
    nextY += gridSize;
    hero.animations.play("walkDown");
  } else if (input.direction === Directions.UP) {
    // hero.position.y -= 1;
    nextY -= gridSize;
    hero.animations.play("walkUp");
  } else if (input.direction === Directions.LEFT) {
    // hero.position.x -= 1;
    nextX -= gridSize;
    hero.animations.play("walkLeft");
  } else if (input.direction === Directions.RIGHT) {
    // hero.position.x += 1;
    nextX += gridSize;
    hero.animations.play("walkRight");
  }

  heroFacing = input.direction ?? heroFacing;
  // check if that space is free
  if (isSpaceFree(walls, nextX, nextY)) {
    heroDestinationPosition.x = nextX;
    heroDestinationPosition.y = nextY;
  }
};

const draw = () => {
  skySprite.drawImage(ctx, 0, 0);
  groundSprite.drawImage(ctx, 0, 0);

  // create the Hero in the cell
  const heroOffset = new Vector2(-8, -21);

  const heroPosX = hero.position.x + heroOffset.x;
  const heroPosY = hero.position.y + 1 + heroOffset.y;

  shadow.drawImage(ctx, heroPosX, heroPosY);
  hero.drawImage(ctx, heroPosX, heroPosY);
};

const gameLoop = new GameLoop(update, draw);

gameLoop.start();
