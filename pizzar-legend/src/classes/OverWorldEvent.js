export class OverWorldEvent {
  constructor({ map, eventConfig }) {
    this.map = map;
    this.event = eventConfig;
  }

  //   event type
  stand(resolve) {
    // find the person who receive event
    const who = this.map.gameObjects[this.event.who];
    who.startAction(
      { map: this.map },
      {
        type: this.event.type,
        direction: this.event.direction,
        timeOut: this.event.timeOut,
      },
    );

    const completeHandler = (event) => {
      if (event.detail.who === this.event.who) {
        // remove event lisener
        document.removeEventListener("PersonStandComplete", completeHandler);
        resolve();
      }
    };

    // listen to the event complete
    document.addEventListener("PersonStandComplete", completeHandler);
  }

  walk(resolve) {
    // find the person who receive event
    const who = this.map.gameObjects[this.event.who];
    who.startAction(
      { map: this.map },
      { type: this.event.type, direction: this.event.direction, retry: true },
    );

    const completeHandler = (event) => {
      if (event.detail.who === this.event.who) {
        // remove event lisener
        document.removeEventListener("PersonWalkingComplete", completeHandler);
        resolve();
      }
    };

    // listen to the event complete
    document.addEventListener("PersonWalkingComplete", completeHandler);
  }

  init() {
    return new Promise((res) => {
      this[this.event.type](res);
    });
  }
}
