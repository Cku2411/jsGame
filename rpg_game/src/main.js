import "./style.css";
import { GameLoop } from "./gameLoop";
import { Vector2 } from "./vector2";
import { Input } from "./input";
import { Main } from "./objects/Main/Main";
import { OutdoorLevel1 } from "./levels/level1";
import { CaveLevel1 } from "./levels/CaveLevel1";

// =======START=========
// Garbbing the canvas to draw to
const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

// Etablish the root scene
const mainScene = new Main({
  position: new Vector2(0, 0),
});

mainScene.setLevel(new OutdoorLevel1());
mainScene.setLevel(new CaveLevel1());

// Adding input class to the mainScene

mainScene.input = new Input();

// events.on("HERO_EXITS", mainScene, () => {
//   console.log("CHANGE THE MAP");
//   mainScene.setLevel(new CaveLevel1());
// });

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
  if (mainScene.camera) {
    ctx.translate(mainScene.camera.position.x, mainScene.camera.position.y);
  }

  // Draw objects in the mounted scene
  mainScene.draw(ctx, 0, 0);

  // Restore to original state
  ctx.restore();

  // Draw anything above the game world
  mainScene.drawForeground(ctx);
  // inventory.draw(ctx, 0, 0);
};

// Start the game
const gameLoop = new GameLoop(update, draw);
gameLoop.start();
