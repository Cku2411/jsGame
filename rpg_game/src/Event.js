class Events {
  callbacks = [];
  nextId = 0;

  //   emit event (something happened)
  emit(eventName, value) {
    this.callbacks.forEach((stored) => {
      if (stored.eventName === eventName) {
        stored.callback(value);
      }
    });
  }

  //   subscribe to something happeing
  on(eventName, caller, callback) {
    this.nextId += 1;
    this.callbacks.push({
      eventName,
      caller,
      callback,
    });

    return this.nextId;
  }

  //   remove the subscribe
  off(id) {
    this.callbacks.filter((stored) => stored.id !== id);
  }

  //   unsubcribe
  unsubcribe(caller) {
    this.callbacks = this.callbacks.filter(
      (stored) => stored.caller !== caller
    );
  }
}

export const events = new Events();
