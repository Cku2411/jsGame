import { World } from "./classes/World.js";
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
      npc1: new Person({
        position: { x: utils.grid(8), y: utils.grid(5) },
        Imgsrc: "./img/characters/people/npc1.png",
        behaviorLoop: [
          // { type: "walk", direction: "left" },
          // { type: "stand", direction: "up", timeOut: 800 },
          // { type: "walk", direction: "up" },
          // { type: "stand", direction: "up", timeOut: 800 },
          // { type: "walk", direction: "right" },
          // { type: "walk", direction: "down" },
        ],
        talking: [
          {
            events: [
              { type: "textMessage", text: "Heloo!", faceHero: "npc1" },
              { type: "textMessage", text: "is this me, you are looking for" },
            ],
          },
        ],
      }),

      npc2: new Person({
        position: { x: utils.grid(8), y: utils.grid(9) },
        Imgsrc: "./img/characters/people/npc3.png",
        behaviorLoop: [
          { type: "walk", direction: "right" },
          { type: "walk", direction: "up", timeOut: 1200 },
          { type: "stand", direction: "up", timeOut: 1200 },
          { type: "walk", direction: "left", timeOut: 800 },
          { type: "walk", direction: "down", timeOut: 800 },
        ],
      }),
    },

    walls: {
      [utils.gridCoord(7, 6)]: true,
      [utils.gridCoord(7, 7)]: true,
      [utils.gridCoord(8, 6)]: true,
      [utils.gridCoord(8, 7)]: true,
    },

    cutSceneSpaces: {
      // when hero enter this spot, cutscene happed!
      [utils.gridCoord(7, 4)]: [
        {
          events: [
            { who: "npc1", type: "walk", direction: "left", timeOut: 500 },
            { who: "npc1", type: "stand", direction: "up", timeOut: 500 },
            { type: "textMessage", text: "Hey, you can't get in there" },

            { who: "hero", type: "stand", direction: "down", timeOut: 500 },
            { type: "textMessage", text: "Why? okie!" },
            { who: "npc1", type: "walk", direction: "right", timeOut: 500 },
            { who: "npc1", type: "walk", direction: "right", timeOut: 500 },
            { who: "hero", type: "walk", direction: "down", timeOut: 500 },
          ],
        },
      ],

      [utils.gridCoord(5, 10)]: [
        {
          events: [{ type: "changeMap", map: "Kitchen" }],
        },
      ],
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
      npcA: new Person({
        position: { x: utils.grid(7), y: utils.grid(9) },
        Imgsrc: "./img/characters/people/npc1.png",
      }),
      npcB: new Person({
        position: { x: utils.grid(8), y: utils.grid(7) },
        Imgsrc: "./img/characters/people/npc2.png",
        talking: [
          {
            events: [
              { type: "textMessage", text: "Heloo!", faceHero: "npcB" },
              { type: "textMessage", text: "You made it" },
            ],
          },
        ],
      }),
    },

    walls: {},

    cutSceneSpaces: {
      [utils.gridCoord(5, 10)]: [
        {
          events: [{ type: "changeMap", map: "DemoRoom" }],
        },
      ],
    },
  },
};

// CREATE GAME
const game = new World({ document: document });
game.init(mapName);

// BUTOON
const button = document.getElementById("changeMap");
const changeMap = () => {
  mapName = mapName == "DemoRoom" ? "Kitchen" : "DemoRoom";
  game.startMap(mapName);
};
button.addEventListener("click", changeMap);
