"use strict";
module.exports = function createDispatcher(events = {}, systemContext) {
  const Dispatcher = this || {};

  Dispatcher.emit = (eventName, data, event) => {
    if (events[eventName])
      events[eventName].forEach((callback) =>
        callback.apply(systemContext, [data, event])
      );
    return Dispatcher;
  };

  Dispatcher.on = (eventName, callback) => {
    if (typeof callback !== "function") return Dispatcher;

    if (!events[eventName]) events[eventName] = [];

    if (callback.name) {
      //if the function has a name and it already present don't add it
      const i = events[eventName].findIndex((fn) => fn.name === callback.name);
      if (i === -1) events[eventName].push(callback);
      else events[eventName][i] = callback;
    } else events[eventName].push(callback);
    return Dispatcher;
  };

  return Dispatcher;
};
