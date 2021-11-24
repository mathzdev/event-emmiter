let EventEmitter = {
  events: new Map(),
  eventsOnce: new Map(),
};

EventEmitter.listen = (eventName, func) => {
  if (EventEmitter.events.get(eventName) === undefined) {
    EventEmitter.events.set(eventName, [func]);
  } else {
    let funcs = EventEmitter.events.get(eventName);
    funcs.push(func);

    EventEmitter.events.set(eventName, funcs);
  }
};

EventEmitter.listenOnce = (eventName, func) => {
  if (EventEmitter.eventsOnce.get(eventName) === undefined) {
    EventEmitter.eventsOnce.set(eventName, [func]);
  } else {
    let funcs = EventEmitter.eventsOnce.get(eventName);
    funcs.push(func);

    EventEmitter.eventsOnce.set(eventName, funcs);
  }
};

EventEmitter.emit = (eventName, data) => {
  let funcs = EventEmitter.events.get(eventName);
  let funcsOnce = EventEmitter.eventsOnce.get(eventName);

  if (funcs !== undefined) {
    funcs.forEach((func) => {
      try {
        func(data);
      } catch (e) {}
    });
  }

  if (funcsOnce !== undefined) {
    funcsOnce.forEach((funcOnce) => {
      try {
        funcOnce(data);
        EventEmitter.removeEventOnce(eventName);
      } catch (e) {}
    });
  }
};

EventEmitter.removeEvent = (eventName) => {
  EventEmitter.events.clear(eventName);
};

EventEmitter.removeEventOnce = (eventName) => {
  EventEmitter.eventsOnce.clear(eventName);
};

EventEmitter.removeAllEvents = () => {
  EventEmitter.events = new Map();
  EventEmitter.eventsOnce = new Map();
};

module.exports = {
  EventEmitter: EventEmitter,
};
