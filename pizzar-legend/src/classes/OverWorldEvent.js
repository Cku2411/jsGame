import { utils } from "../util.js";
import { TextMessage } from "./TextMessage.js";

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

  textMessage(resolve) {
    if (this.event.faceHero) {
      // find the npc facehero
      const obj = this.map.gameObjects[this.event.faceHero];
      // change npc directon
      obj.direction = utils.getFacingDirection(
        this.map.gameObjects["hero"].direction,
      );
    }

    const message = new TextMessage({
      text: this.event.text,
      onComplete: () => resolve(),
    });

    message.init(document.querySelector(".game-container"));
  }

  changeMap(resolve) {
    console.log("CHANGE MAP..");
    // 1. Gọi hiệu ứng chuyển cảnh (nếu có, ví dụ làm mờ màn hình)

    // 2. Gọi hàm startMap từ World instance
    // this.map là OverworldMap, this.map.world là World (đã gán ở World.js)
    this.map.world.startMap(this.event.map);

    // 3. Resolve để kết thúc event hiện tại
    resolve();

    // Lưu ý: Sau khi đổi map, nhân vật Hero sẽ xuất hiện ở vị trí mặc định
    // được định nghĩa trong file main.js của map mới.
  }

  init() {
    return new Promise((res) => {
      this[this.event.type](res);
    });
  }
}
