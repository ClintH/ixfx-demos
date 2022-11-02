import {
  integer
} from "./chunk-JSN2YTED.js";

// src/flow/Sleep.ts
var sleep = (timeoutMs, value) => {
  integer(timeoutMs, `positive`, `timeoutMs`);
  if (timeoutMs === 0) {
    return new Promise((resolve) => requestAnimationFrame((_) => {
      resolve(value);
    }));
  } else {
    return new Promise((resolve) => setTimeout(() => resolve(value), timeoutMs));
  }
};

// src/flow/Interval.ts
var interval = async function* (produce, intervalMs) {
  let cancelled = false;
  try {
    while (!cancelled) {
      await sleep(intervalMs);
      if (cancelled)
        return;
      if (typeof produce === `function`) {
        const result = await produce();
        yield result;
      } else if (typeof produce === `object`) {
        if (`next` in produce && `return` in produce && `throw` in produce) {
          const result = await produce.next();
          if (result.done)
            return;
          yield result.value;
        } else {
          throw new Error(`interval: produce param does not seem to be a generator?`);
        }
      } else {
        throw new Error(`produce param does not seem to return a value/Promise and is not a generator?`);
      }
    }
  } finally {
    cancelled = true;
  }
};

// src/flow/Delay.ts
var delay = async (callback, timeoutMs) => {
  await sleep(timeoutMs);
  return Promise.resolve(await callback());
};
async function* delayAnimationLoop() {
  let resolve;
  let p = new Promise((r) => resolve = r);
  let timer = 0;
  const callback = () => {
    resolve();
    p = new Promise((r) => resolve = r);
  };
  try {
    while (true) {
      timer = window.requestAnimationFrame(callback);
      yield await p;
    }
  } finally {
    resolve();
    window.cancelAnimationFrame(timer);
  }
}
async function* delayLoop(timeoutMs) {
  if (timeoutMs === 0)
    return yield* delayAnimationLoop();
  let resolve;
  let p = new Promise((r) => resolve = r);
  let timer = 0;
  const callback = () => {
    resolve();
    p = new Promise((r) => resolve = r);
  };
  try {
    while (true) {
      timer = window.setTimeout(callback, timeoutMs);
      yield await p;
    }
  } finally {
    resolve();
    window.clearTimeout(timer);
  }
}

export {
  sleep,
  interval,
  delay,
  delayLoop
};
//# sourceMappingURL=chunk-7EVATTA2.js.map