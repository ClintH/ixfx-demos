// src/iterables/Iterable.ts
var isAsyncIterable = (v) => Symbol.asyncIterator in new Object(v);
var isIterable = (v) => Symbol.iterator in new Object(v);
var fromEvent = (eventSource, eventType) => {
  const pullQueue = [];
  const pushQueue = [];
  let done = false;
  const pushValue = (args) => {
    if (pullQueue.length > 0) {
      const resolver = pullQueue.shift();
      resolver(...args);
    } else {
      pushQueue.push(args);
    }
  };
  const pullValue = () => new Promise((resolve) => {
    if (pushQueue.length > 0) {
      const arguments_ = pushQueue.shift();
      resolve(...arguments_);
    } else {
      pullQueue.push(resolve);
    }
  });
  const handler = (...arguments_) => {
    pushValue(arguments_);
  };
  eventSource.addEventListener(eventType, handler);
  const r = {
    next: async () => {
      if (done) return { done: true, value: void 0 };
      return {
        done: false,
        value: await pullValue()
      };
    },
    //eslint-disable-next-line @typescript-eslint/require-await
    return: async () => {
      done = true;
      eventSource.removeEventListener(eventType, handler);
      return { done: true, value: void 0 };
    },
    //eslint-disable-next-line @typescript-eslint/require-await
    throw: async (error) => {
      done = true;
      return {
        done: true,
        value: Promise.reject(new Error(error))
      };
    }
  };
  return r;
};

export {
  isAsyncIterable,
  isIterable,
  fromEvent
};
//# sourceMappingURL=chunk-YLRZZLGG.js.map