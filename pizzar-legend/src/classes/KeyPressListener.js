export class KeyPressListener {
  constructor({ keycode, callback }) {
    let keysafe = true; //khong dung this vì trong event listner nó sẽ trỏ về document (lỗi underfined)

    this.keyDownFunction = function (event) {
      if (event.code == keycode) {
        if (keysafe) {
          keysafe = false;

          callback();
        }
      }
    };

    this.keyUpFunction = function (event) {
      if (event.code == keycode) {
        keysafe = true;
      }
    };

    document.addEventListener("keydown", this.keyDownFunction);
    document.addEventListener("keyup", this.keyUpFunction);
  }

  unbindEventListener() {
    document.removeEventListener("keydown", this.keyDownFunction);
    document.removeEventListener("keyup", this.keyUpFunction);
  }
}
