import "./style.css";
import { GameLoop } from "./gameLoop";
import { gridCells } from "./helpers/grid";
import { resources } from "./resoures";
import { Sprite } from "./sprite";
import { Vector2 } from "./vector2";
import { GameObject } from "./GameObject";
import { Hero } from "./objects/Hero/Hero";
import { Input } from "./input";
import { events } from "./Event";
import { Camera } from "./Camera";
import { Gold, Rod } from "./objects/Rod/rod";
import { Inventory } from "./objects/inventory/Inventory";
import { Exit } from "./objects/Exit/exit";
import { Main } from "./objects/Main/Main";

// =======START=========
// Garbbing the canvas to draw to
const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

// Etablish the root scene
const mainScene = new Main();

const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180),
});

// mainScene.addChild(skySprite);

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),
});

mainScene.addChild(groundSprite);

const hero = new Hero(gridCells(6), gridCells(5));
mainScene.addChild(hero);

const camera = new Camera();
mainScene.addChild(camera);

const rod = new Rod(gridCells(7), gridCells(6));
mainScene.addChild(rod);

const gold = new Gold(gridCells(8), gridCells(7));
mainScene.addChild(gold);

const exit = new Exit(gridCells(6), gridCells(3));
mainScene.addChild(exit);

const inventory = new Inventory();
// Adding input class to the mainScene

mainScene.input = new Input();

events.on("HERO_EXITS", mainScene, () => {
  console.log("CHANGE THE MAP");
});

// Etablish update and draw loop
const update = (delta) => {
  mainScene.stepEntry(delta, mainScene);
};

const draw = () => {
  // clear anything stale
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  mainScene.drawBackground(ctx);
  // save the current satte (for camera offset)
  ctx.save();

  // offset by camera position
  ctx.translate(camera.position.x, camera.position.y);

  // Draw objects in the mounted scene
  mainScene.draw(ctx, 0, 0);

  // Restore to original state
  ctx.restore();

  // Draw anything above the game world
  mainScene.drawForeground(ctx);
};

// Start the game
const gameLoop = new GameLoop(update, draw);
gameLoop.start();
