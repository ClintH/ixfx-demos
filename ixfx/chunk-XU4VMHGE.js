import {
  clamp
} from "./chunk-L73ZEV4V.js";
import {
  integer
} from "./chunk-G4S3XAFG.js";
import {
  __export
} from "./chunk-YDTVC7MM.js";

// src/Timer.ts
var Timer_exports = {};
__export(Timer_exports, {
  continuously: () => continuously,
  cycleTimer: () => cycleTimer,
  delay: () => delay,
  frequencyCycleSource: () => frequencyCycleSource,
  frequencyTimer: () => frequencyTimer,
  msElapsedTimer: () => msElapsedTimer,
  relativeTimer: () => relativeTimer,
  sleep: () => sleep,
  ticksElapsedTimer: () => ticksElapsedTimer,
  timeout: () => timeout
});
var timeout = (callback, timeoutMs) => {
  if (callback === void 0)
    throw new Error(`callback parameter is undefined`);
  integer(timeoutMs, `aboveZero`, `timeoutMs`);
  let timer = 0;
  const start = (altTimeoutMs = timeoutMs) => {
    integer(altTimeoutMs, `aboveZero`, `altTimeoutMs`);
    if (timer !== 0)
      stop();
    timer = window.setTimeout(() => {
      callback();
      timer = 0;
    }, altTimeoutMs);
  };
  const cancel = () => {
    if (timer === 0)
      return;
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
    integer(intervalMs, `aboveZero`, `intervalMs`);
  let running = false;
  let ticks = 0;
  let startedAt = performance.now();
  const schedule = intervalMs === void 0 ? (cb) => window.requestAnimationFrame(cb) : (cb) => window.setTimeout(cb, intervalMs);
  const cancel = () => {
    if (!running)
      return;
    running = false;
    ticks = 0;
  };
  const loop = () => {
    if (!running)
      return;
    const r = callback(ticks++, performance.now() - startedAt);
    if (r !== void 0 && !r) {
      cancel();
      return;
    }
    schedule(loop);
  };
  const start = () => {
    if (running && resetCallback !== void 0) {
      console.log(`starting`);
      startedAt = performance.now();
      const r = resetCallback(ticks);
      if (r !== void 0 && !r) {
        cancel();
        return;
      }
    } else if (running) {
      console.log(`already running`);
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
    get elapsed() {
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
  return {
    get isDone() {
      return done;
    },
    reset: () => {
      done = false;
      timer.reset();
    },
    get elapsed() {
      let v = timer.elapsed / total;
      if (clampValue)
        v = clamp(v);
      if (v >= 1)
        done = true;
      return v;
    }
  };
};
var frequencyCycleSource = (cyclesPerSecond) => () => cycleTimer(1, frequencyTimer(cyclesPerSecond / 1e3, msElapsedTimer()));
var cycleTimer = (cycleLen, timer) => ({
  reset: () => {
    timer.reset();
  },
  get elapsed() {
    let v = timer.elapsed;
    let f = v - Math.floor(v);
    if (f < 0)
      throw new Error(`Unexpected cycle fraction less than 0. Elapsed: ${v} f: ${f}`);
    if (f > 1)
      throw new Error(`Unexpected cycle fraction more than 1. Elapsed: ${v} f: ${f}`);
    return f;
  }
});
var frequencyTimer = (frequency, timer) => ({
  reset: () => {
    timer.reset();
  },
  get elapsed() {
    return timer.elapsed * frequency;
  }
});
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
  timeout,
  continuously,
  sleep,
  delay,
  relativeTimer,
  frequencyCycleSource,
  cycleTimer,
  frequencyTimer,
  msElapsedTimer,
  ticksElapsedTimer,
  Timer_exports
};
