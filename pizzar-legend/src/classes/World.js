import { COLS, ROWS } from "../const.js";
import { DirectionInput } from "./Input.js";
import { KeyPressListener } from "./KeyPressListener.js";
import { OverworldMap } from "./OverworldMaps.js";

export class World {
  constructor({ document }) {
    this.isGameRunning = false;
    this.document = document;
    this.canvas = this.document.getElementById("board");
    this.ctx = this.canvas.getContext("2d");
    this.debug = false;
    this.map = null;
  }

  cutSceneActionHandler() {
    // check for cutscenespaces
    new KeyPressListener({
      keycode: "Space",
      callback: () => {
        // is there any a person to talk to
        this.map.checkForActionCutScene();
      },
    });

    document.addEventListener("PersonWalkingComplete", (event) => {
      if (event.detail.who === "hero") {
        this.map.checkForCutsceneSpaces();
      }
    });

    // press space to find someone to talk if near by hero
  }

  startMap(mapName) {
    this.map = new OverworldMap({
      gameObjects: window.OverworldMaps[mapName].gameObjects,
      backgroundSrc: window.OverworldMaps[mapName].backgroundLayer,
      foregroundSrc: window.OverworldMaps[mapName].foregroundLayer,
      walls: window.OverworldMaps[mapName].walls,
      cutSceneSpaces: window.OverworldMaps[mapName].cutSceneSpaces,
    });

    this.map.world = this;
    this.map.getObjectReady();
  }

  init(mapName) {
    this.startMap(mapName);
    this.input = new DirectionInput();
    this.input.init();

    this.startGameLoop();
    // this.map.startCutscene([
    //   { type: "textMessage", text: "hello from the other side" },
    // ]);
    this.cutSceneActionHandler();
  }

  startGameLoop() {
    if (this.isGameRunning) return;
    this.isGameRunning = true;

    const update = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      if (this.input.debug) {
        this.toggleDebug();
        this.input.debug = false;
      }

      // toa camera theo toa do person
      const cameraPerson = this.map.gameObjects.hero;

      Object.values(this.map.gameObjects).forEach((obj) => {
        obj.update({ direction: this.input.direction, map: this.map });
      });

      this.map.drawBackground(this.ctx, cameraPerson);

      // draw objects with ordered
      Object.values(this.map.gameObjects)
        .sort((a, b) => a.position.y - b.position.y)
        .forEach((obj) => {
          obj.sprite.draw(this.ctx, cameraPerson);
        });

      this.map.drawForeground(this.ctx, cameraPerson);
      this.debug && this.drawGrid();

      requestAnimationFrame(update);
    };

    update();
  }

  drawGrid() {
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        this.ctx.strokeStyle = "gray";
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(col * 16 + 0.5, row * 16 + 0.5, 16, 16);
      }
    }
  }

  toggleDebug() {
    this.debug = !this.debug;
  }
}
