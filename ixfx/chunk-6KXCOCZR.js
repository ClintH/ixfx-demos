import {
  clamp
} from "./chunk-BBKPCEJK.js";
import {
  integer
} from "./chunk-E6FEPMVF.js";

// src/flow/Timer.ts
var debounce = (callback, timeoutMs) => {
  const t = timeout(callback, timeoutMs);
  return (...args) => t.start(void 0, args);
};
var throttle = (callback, intervalMinMs) => {
  let trigger = 0;
  return (...args) => {
    const elapsed = performance.now() - trigger;
    if (elapsed >= intervalMinMs) {
      callback(elapsed, ...args);
      trigger = performance.now();
    }
  };
};
var interval = async function* (produce, intervalMs) {
  let cancelled = false;
  try {
    while (!cancelled) {
      await sleep(intervalMs);
      if (cancelled)
        return;
      yield await produce();
    }
  } finally {
    cancelled = true;
  }
};
var timeout = (callback, timeoutMs) => {
  if (callback === void 0)
    throw new Error(`callback parameter is undefined`);
  integer(timeoutMs, `aboveZero`, `timeoutMs`);
  let timer = 0;
  let startedAt = 0;
  const start = (altTimeoutMs = timeoutMs, ...args) => {
    startedAt = performance.now();
    integer(altTimeoutMs, `aboveZero`, `altTimeoutMs`);
    if (timer !== 0)
      cancel();
    timer = window.setTimeout(() => {
      callback(performance.now() - startedAt, ...args);
      timer = 0;
    }, altTimeoutMs);
  };
  const cancel = () => {
    if (timer === 0)
      return;
    startedAt = 0;
    window.clearTimeout(timer);
  };
  return {
    start,
    cancel,
    get isDone() {
      return timer !== 0;
    }
  };
};
var continuously = (callback, intervalMs, resetCallback) => {
  if (intervalMs !== void 0)
    integer(intervalMs, `positive`, `intervalMs`);
  let running = false;
  let ticks = 0;
  let startedAt = performance.now();
  const schedule = intervalMs === void 0 || intervalMs === 0 ? (cb) => window.requestAnimationFrame(cb) : (cb) => window.setTimeout(cb, intervalMs);
  const cancel = () => {
    if (!running)
      return;
    running = false;
    ticks = 0;
  };
  const loop = async () => {
    if (!running)
      return;
    const valOrPromise = callback(ticks++, performance.now() - startedAt);
    let val = void 0;
    if (typeof valOrPromise === `object`) {
      val = await valOrPromise;
    } else {
      val = valOrPromise;
    }
    if (val !== void 0 && !val) {
      cancel();
      return;
    }
    schedule(loop);
  };
  const start = () => {
    if (running && resetCallback !== void 0) {
      const r = resetCallback(ticks, performance.now() - startedAt);
      startedAt = performance.now();
      if (r !== void 0 && !r) {
        cancel();
        return;
      }
    } else if (running) {
      return;
    }
    running = true;
    schedule(loop);
  };
  return {
    start,
    get isDone() {
      return running;
    },
    get ticks() {
      return ticks;
    },
    get elapsedMs() {
      return performance.now() - startedAt;
    },
    cancel
  };
};
var sleep = (timeoutMs) => new Promise((resolve) => setTimeout(resolve, timeoutMs));
var delay = async (callback, timeoutMs) => {
  integer(timeoutMs, `aboveZero`, `timeoutMs`);
  await sleep(timeoutMs);
  return Promise.resolve(await callback());
};
var relativeTimer = (total, timer, clampValue = true) => {
  let done = false;
  let modAmt = 1;
  return {
    mod(amt) {
      modAmt = amt;
    },
    get isDone() {
      return done;
    },
    reset: () => {
      done = false;
      timer.reset();
    },
    get elapsed() {
      let v = timer.elapsed / (total * modAmt);
      if (clampValue)
        v = clamp(v);
      if (v >= 1)
        done = true;
      return v;
    }
  };
};
var frequencyTimerSource = (frequency) => () => frequencyTimer(frequency, msElapsedTimer());
var frequencyTimer = (frequency, timer = msElapsedTimer()) => {
  const cyclesPerSecond = frequency / 1e3;
  let modAmt = 1;
  return {
    mod: (amt) => {
      modAmt = amt;
    },
    reset: () => {
      timer.reset();
    },
    get elapsed() {
      const v = timer.elapsed * (cyclesPerSecond * modAmt);
      const f = v - Math.floor(v);
      if (f < 0)
        throw new Error(`Unexpected cycle fraction less than 0. Elapsed: ${v} f: ${f}`);
      if (f > 1)
        throw new Error(`Unexpected cycle fraction more than 1. Elapsed: ${v} f: ${f}`);
      return f;
    }
  };
};
var msElapsedTimer = () => {
  let start = performance.now();
  return {
    reset: () => {
      start = performance.now();
    },
    get elapsed() {
      return performance.now() - start;
    }
  };
};
var ticksElapsedTimer = () => {
  let start = 0;
  return {
    reset: () => {
      start = 0;
    },
    get elapsed() {
      return start++;
    }
  };
};

export {
  debounce,
  throttle,
  interval,
  timeout,
  continuously,
  sleep,
  delay,
  relativeTimer,
  frequencyTimerSource,
  frequencyTimer,
  msElapsedTimer,
  ticksElapsedTimer
};
