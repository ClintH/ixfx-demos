import {
  StateMachine_exports
} from "./chunk-2OTOEK6Q.js";
import {
  delay,
  delayLoop,
  interval,
  sleep
} from "./chunk-2E3HYTN7.js";
import {
  integer,
  number
} from "./chunk-M24U4LLG.js";
import {
  __export
} from "./chunk-6SYKIMQH.js";

// src/flow/index.ts
var flow_exports = {};
__export(flow_exports, {
  StateMachine: () => StateMachine_exports,
  continuously: () => continuously,
  debounce: () => debounce,
  delay: () => delay,
  delayLoop: () => delayLoop,
  forEach: () => forEach,
  forEachAsync: () => forEachAsync,
  frequencyTimer: () => frequencyTimer,
  frequencyTimerSource: () => frequencyTimerSource,
  interval: () => interval,
  msElapsedTimer: () => msElapsedTimer,
  relativeTimer: () => relativeTimer,
  repeat: () => repeat,
  sleep: () => sleep,
  throttle: () => throttle,
  ticksElapsedTimer: () => ticksElapsedTimer,
  timeout: () => timeout,
  updateOutdated: () => updateOutdated,
  waitFor: () => waitFor
});

// src/flow/Timer.ts
var Timer_exports = {};
__export(Timer_exports, {
  frequencyTimer: () => frequencyTimer,
  frequencyTimerSource: () => frequencyTimerSource,
  msElapsedTimer: () => msElapsedTimer,
  relativeTimer: () => relativeTimer,
  ticksElapsedTimer: () => ticksElapsedTimer
});

// src/data/Clamp.ts
var clamp = (v, min = 0, max = 1) => {
  if (Number.isNaN(v))
    throw new Error(`v parameter is NaN`);
  if (Number.isNaN(min))
    throw new Error(`min parameter is NaN`);
  if (Number.isNaN(max))
    throw new Error(`max parameter is NaN`);
  if (v < min)
    return min;
  if (v > max)
    return max;
  return v;
};
var clampIndex = (v, arrayOrLength) => {
  if (!Number.isInteger(v))
    throw new Error(`v parameter must be an integer (${v})`);
  const length = Array.isArray(arrayOrLength) ? arrayOrLength.length : arrayOrLength;
  if (!Number.isInteger(length))
    throw new Error(`length parameter must be an integer (${length}, ${typeof length})`);
  v = Math.round(v);
  if (v < 0)
    return 0;
  if (v >= length)
    return length - 1;
  return v;
};

// src/flow/Timer.ts
var frequencyTimerSource = (frequency) => () => frequencyTimer(frequency, msElapsedTimer());
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

// src/flow/Timeout.ts
var timeout = (callback, timeoutMs) => {
  if (callback === void 0)
    throw new Error(`callback parameter is undefined`);
  integer(timeoutMs, `aboveZero`, `timeoutMs`);
  let timer = 0;
  let startedAt = 0;
  const start = async (altTimeoutMs = timeoutMs, args) => {
    const p = new Promise((resolve, reject) => {
      startedAt = performance.now();
      try {
        integer(altTimeoutMs, `aboveZero`, `altTimeoutMs`);
      } catch (e) {
        reject(e);
        return;
      }
      if (timer !== 0)
        cancel();
      timer = window.setTimeout(async () => {
        await callback(performance.now() - startedAt, ...args);
        timer = 0;
        resolve(void 0);
      }, altTimeoutMs);
    });
    return p;
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

// src/flow/UpdateOutdated.ts
var updateOutdated = (fn, intervalMs, updateFail = `slow`) => {
  let lastRun = 0;
  let lastValue;
  let intervalMsCurrent = intervalMs;
  return () => new Promise(async (resolve, reject) => {
    const elapsed = performance.now() - lastRun;
    if (lastValue === void 0 || elapsed > intervalMsCurrent) {
      try {
        lastRun = performance.now();
        lastValue = await fn(elapsed);
        intervalMsCurrent = intervalMs;
      } catch (ex) {
        if (updateFail === `fast`) {
          lastValue = void 0;
          lastRun = 0;
        } else if (updateFail === `backoff`) {
          intervalMsCurrent = Math.floor(intervalMsCurrent * 1.2);
        }
        reject(ex);
        return;
      }
    }
    resolve(lastValue);
  });
};

// src/flow/Continuously.ts
var raf = typeof window !== `undefined` ? (cb) => window.requestAnimationFrame(cb) : (cb) => setTimeout(cb, 1);
var continuously = (callback, intervalMs, resetCallback) => {
  if (intervalMs !== void 0)
    integer(intervalMs, `positive`, `intervalMs`);
  let running = false;
  let ticks = 0;
  let startedAt = performance.now();
  let iMs = intervalMs === void 0 ? 0 : intervalMs;
  const schedule = iMs === 0 ? raf : (cb) => setTimeout(cb, iMs);
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
    let val;
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
    get intervalMs() {
      return iMs;
    },
    set intervalMs(ms) {
      integer(ms, `positive`, `ms`);
      iMs = ms;
    },
    get isDone() {
      return !running;
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

// src/flow/Debounce.ts
var debounce = (callback, timeoutMs) => {
  const t = timeout(callback, timeoutMs);
  return (...args) => t.start(void 0, args);
};

// src/flow/Throttle.ts
var throttle = (callback, intervalMinMs) => {
  let trigger = 0;
  return async (...args) => {
    const elapsed = performance.now() - trigger;
    if (elapsed >= intervalMinMs) {
      const r = callback(elapsed, ...args);
      if (typeof r === `object`)
        await r;
      trigger = performance.now();
    }
  };
};

// src/flow/WaitFor.ts
var waitFor = (timeoutMs, onAborted, onComplete) => {
  let success = false;
  const done = (error) => {
    if (t !== 0) {
      window.clearTimeout(t);
      t = 0;
    }
    if (error) {
      onAborted(error);
    } else {
      success = true;
    }
    if (onComplete !== void 0)
      onComplete(success);
  };
  let t = window.setTimeout(() => {
    t = 0;
    try {
      onAborted(`Timeout after ${timeoutMs}ms`);
    } finally {
      if (onComplete !== void 0)
        onComplete(success);
    }
  }, timeoutMs);
  return done;
};

// src/flow/index.ts
var forEach = (iterator, fn) => {
  for (const x of iterator) {
    const r = fn(x);
    if (typeof r === `boolean` && !r)
      break;
  }
};
var forEachAsync = async function(iterator, fn, intervalMs) {
  if (Array.isArray(iterator)) {
    for (const x of iterator) {
      const r = await fn(x);
      if (intervalMs)
        await sleep(intervalMs);
      if (typeof r === `boolean` && !r)
        break;
    }
  } else {
    for await (const x of iterator) {
      const r = await fn(x);
      if (intervalMs)
        await sleep(intervalMs);
      if (typeof r === `boolean` && !r)
        break;
    }
  }
};
var repeat = (countOrPredicate, fn) => {
  let repeats, valuesProduced;
  repeats = valuesProduced = 0;
  const ret = [];
  if (typeof countOrPredicate === `number`) {
    number(countOrPredicate, `positive`, `countOrPredicate`);
    while (countOrPredicate-- > 0) {
      repeats++;
      const v = fn();
      if (v === void 0)
        continue;
      ret.push(v);
      valuesProduced++;
    }
  } else {
    while (countOrPredicate(repeats, valuesProduced)) {
      repeats++;
      const v = fn();
      if (v === void 0)
        continue;
      ret.push(v);
      valuesProduced++;
    }
  }
  return ret;
};
try {
  if (typeof window !== `undefined`) {
    window.ixfx = { ...window.ixfx, Flow: { StateMachine: StateMachine_exports, Timer: Timer_exports, forEach, forEachAsync, repeat } };
  }
} catch {
}

export {
  clamp,
  clampIndex,
  frequencyTimerSource,
  relativeTimer,
  frequencyTimer,
  msElapsedTimer,
  ticksElapsedTimer,
  timeout,
  updateOutdated,
  continuously,
  debounce,
  throttle,
  waitFor,
  forEach,
  forEachAsync,
  repeat,
  flow_exports
};
//# sourceMappingURL=chunk-UT6IZVV4.js.map