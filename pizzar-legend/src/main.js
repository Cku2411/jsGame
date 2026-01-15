import { World } from "./classes/World.js";
import { GameObject } from "./classes/GameObjects.js";

// ==DEFINE WORLD

window.OverworldMaps = {
  DemoRoom: {
    backgroundLayer: "./img/maps/DemoLower.png",
    foregroundLayer: "./img/maps/DemoUpper.png",
    gameObjects: {
      hero: new GameObject({ position: { x: 5, y: 6 } }),
      npc1: new GameObject({
        position: { x: 7, y: 9 },
        Imgsrc: "./img/characters/people/npc1.png",
      }),
    },
  },

  Kitchen: {
    backgroundLayer: "./img/maps/KitchenLower.png",
    foregroundLayer: "./img/maps/KitchenUpper.png",
    gameObjects: {
      hero: new GameObject({ position: { x: 5, y: 6 } }),
      npcA: new GameObject({
        position: { x: 7, y: 9 },
        Imgsrc: "./img/characters/people/npc1.png",
      }),
      npcB: new GameObject({
        position: { x: 8, y: 7 },
        Imgsrc: "./img/characters/people/npc2.png",
      }),
    },
  },
};

// CREATE GAME
const game = new World({ document: document });
game.init();
