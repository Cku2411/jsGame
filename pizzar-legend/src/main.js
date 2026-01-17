import { World } from "./classes/World.js";
import { GameObject } from "./classes/GameObjects.js";
import { Person } from "./classes/Person.js";
import { utils } from "./util.js";

// ==DEFINE WORLD
let mapName = "DemoRoom";

window.OverworldMaps = {
  DemoRoom: {
    backgroundLayer: "./img/maps/DemoLower.png",
    foregroundLayer: "./img/maps/DemoUpper.png",
    gameObjects: {
      hero: new Person({
        position: { x: utils.grid(5), y: utils.grid(6) },
        isPlayerControlled: true,
      }),
      npc1: new GameObject({
        position: { x: utils.grid(7), y: utils.grid(9) },
        Imgsrc: "./img/characters/people/npc1.png",
      }),
    },

    walls: {
      [utils.gridCoord(7, 6)]: true,
    },
  },

  Kitchen: {
    backgroundLayer: "./img/maps/KitchenLower.png",
    foregroundLayer: "./img/maps/KitchenUpper.png",
    gameObjects: {
      hero: new Person({
        position: { x: utils.grid(5), y: utils.grid(6) },
        isPlayerControlled: true,
      }),
      npcA: new GameObject({
        position: { x: utils.grid(7), y: utils.grid(9) },
        Imgsrc: "./img/characters/people/npc1.png",
      }),
      npcB: new GameObject({
        position: { x: utils.grid(8), y: utils.grid(7) },
        Imgsrc: "./img/characters/people/npc2.png",
      }),
    },

    walls: {},
  },
};

// CREATE GAME
const game = new World({ document: document });
game.init(mapName);

// BUTOON
const button = document.getElementById("changeMap");
const changeMap = () => {
  mapName = mapName == "DemoRoom" ? "Kitchen" : "DemoRoom";
  game.init(mapName);
};
button.addEventListener("click", changeMap);
