import {
  mutable
} from "./chunk-6Z3ER26Z.js";
import {
  SimpleEventEmitter
} from "./chunk-E4IFY2X7.js";
import {
  randomElement,
  shuffle,
  unique
} from "./chunk-7JRFC6PB.js";
import {
  defaultComparer,
  intervalToMs,
  isInterval,
  sleep
} from "./chunk-RFTU5JVU.js";
import {
  integerTest,
  throwFromResult,
  throwIntegerTest,
  throwNumberTest
} from "./chunk-JNUBDOCI.js";
import {
  getErrorMessage,
  resolveLogOption
} from "./chunk-EKX6PMDK.js";
import {
  __export
} from "./chunk-Q2EHUQVZ.js";

// src/flow/StateMachine.ts
var StateMachine_exports = {};
__export(StateMachine_exports, {
  WithEvents: () => StateMachineWithEvents,
  bidirectionalFromList: () => bidirectionalFromList,
  cloneState: () => cloneState,
  done: () => done,
  driver: () => init2,
  fromList: () => fromList,
  init: () => init,
  isValidTransition: () => isValidTransition,
  next: () => next,
  normaliseTargets: () => normaliseTargets,
  possible: () => possible,
  possibleTargets: () => possibleTargets,
  reset: () => reset,
  to: () => to,
  validateMachine: () => validateMachine,
  validateTransition: () => validateTransition
});

// src/flow/index.ts
var flow_exports = {};
__export(flow_exports, {
  DispatchList: () => DispatchList,
  Elapsed: () => Elapsed_exports,
  StateMachine: () => StateMachine_exports,
  TaskQueue: () => TaskQueue,
  continuously: () => continuously,
  debounce: () => debounce,
  delay: () => delay,
  delayLoop: () => delayLoop,
  everyNth: () => everyNth,
  forEach: () => forEach,
  forEachAsync: () => forEachAsync,
  frequencyTimer: () => frequencyTimer,
  frequencyTimerSource: () => frequencyTimerSource,
  hasElapsed: () => hasElapsed,
  interval: () => interval,
  intervalToMs: () => intervalToMs,
  isInterval: () => isInterval,
  msElapsedTimer: () => msElapsedTimer,
  relativeTimer: () => relativeTimer,
  repeat: () => repeat,
  repeatReduce: () => repeatReduce,
  retry: () => retry,
  runOnce: () => runOnce,
  sleep: () => sleep,
  throttle: () => throttle,
  ticksElapsedTimer: () => ticksElapsedTimer,
  timeout: () => timeout,
  updateOutdated: () => updateOutdated,
  waitFor: () => waitFor
});

// src/flow/Elapsed.ts
var Elapsed_exports = {};
__export(Elapsed_exports, {
  infinity: () => infinity,
  once: () => once,
  progress: () => progress,
  since: () => since,
  toString: () => toString
});

// src/numbers/Round.ts
function round(a, b) {
  throwFromResult(integerTest(a, `positive`, `decimalPlaces`));
  let rounder;
  if (a === 0)
    rounder = Math.round;
  else {
    const p = Math.pow(10, a);
    rounder = (v) => Math.floor(v * p) / p;
  }
  return b === void 0 ? rounder : rounder(b);
}

// src/flow/Timer.ts
var Timer_exports = {};
__export(Timer_exports, {
  frequencyTimer: () => frequencyTimer,
  frequencyTimerSource: () => frequencyTimerSource,
  hasElapsed: () => hasElapsed,
  msElapsedTimer: () => msElapsedTimer,
  relativeTimer: () => relativeTimer,
  ticksElapsedTimer: () => ticksElapsedTimer
});

// src/data/Clamp.ts
var clamp = (value, min = 0, max = 1) => {
  if (Number.isNaN(value))
    throw new Error(`'value' parameter is NaN`);
  if (Number.isNaN(min))
    throw new Error(`'min' parameter is NaN`);
  if (Number.isNaN(max))
    throw new Error(`'max' parameter is NaN`);
  if (value < min)
    return min;
  if (value > max)
    return max;
  return value;
};
var clampIndex = (v, arrayOrLength) => {
  if (!Number.isInteger(v)) {
    throw new TypeError(`v parameter must be an integer (${v})`);
  }
  const length = Array.isArray(arrayOrLength) ? arrayOrLength.length : arrayOrLength;
  if (!Number.isInteger(length)) {
    throw new TypeError(
      `length parameter must be an integer (${length}, ${typeof length})`
    );
  }
  v = Math.round(v);
  if (v < 0)
    return 0;
  if (v >= length)
    return length - 1;
  return v;
};

// src/flow/Timer.ts
function hasElapsed(elapsed) {
  const t = relativeTimer(intervalToMs(elapsed, 0), { timer: msElapsedTimer() });
  return () => t.isDone;
}
var frequencyTimerSource = (frequency) => () => frequencyTimer(frequency, { timer: msElapsedTimer() });
var relativeTimer = (total, opts = {}) => {
  const clampValue = opts.clampValue ?? false;
  const wrapValue = opts.wrapValue ?? false;
  if (clampValue && wrapValue)
    throw new Error(`clampValue and wrapValue cannot both be enabled`);
  let modulationAmount = 1;
  const timer = opts.timer ?? msElapsedTimer();
  const computeElapsed = () => {
    let v = timer.elapsed / (total * modulationAmount);
    if (clampValue)
      v = clamp(v);
    else if (wrapValue && v >= 1)
      v = v % 1;
    return v;
  };
  return {
    mod(amt) {
      modulationAmount = amt;
    },
    get isDone() {
      return computeElapsed() >= 1;
    },
    get elapsed() {
      return computeElapsed();
    },
    reset: () => {
      timer.reset();
    }
  };
};
var frequencyTimer = (frequency, opts = {}) => {
  const timer = opts.timer ?? msElapsedTimer();
  const cyclesPerSecond = frequency / 1e3;
  let modulationAmount = 1;
  const computeElapsed = () => {
    const v = timer.elapsed * (cyclesPerSecond * modulationAmount);
    const f = v - Math.floor(v);
    if (f < 0) {
      throw new Error(
        `Unexpected cycle fraction less than 0. Elapsed: ${v} f: ${f}`
      );
    }
    if (f > 1) {
      throw new Error(
        `Unexpected cycle fraction more than 1. Elapsed: ${v} f: ${f}`
      );
    }
    return f;
  };
  return {
    mod: (amt) => {
      modulationAmount = amt;
    },
    reset: () => {
      timer.reset();
    },
    get isDone() {
      return computeElapsed() >= 1;
    },
    get elapsed() {
      return computeElapsed();
    }
  };
};
var msElapsedTimer = () => {
  let start = performance.now();
  return {
    /**
     * Reset timer
     */
    reset: () => {
      start = performance.now();
    },
    /**
     * Returns elapsed time since start
     */
    get elapsed() {
      return performance.now() - start;
    },
    /**
     * Always returns _true_
     */
    get isDone() {
      return false;
    }
  };
};
var ticksElapsedTimer = () => {
  let start = 0;
  return {
    /**
     * Reset ticks to 0. The next call to `elapsed` will return 1.
     */
    reset: () => {
      start = 0;
    },
    /**
     * Returns the number of elapsed ticks as well as
     * incrementing the tick count. 
     * 
     * Minimum is 1
     */
    get elapsed() {
      return ++start;
    },
    /**
     * Always returns _true_
     */
    get isDone() {
      return true;
    }
  };
};

// src/flow/Elapsed.ts
var since = () => {
  const start = performance.now();
  return () => {
    return performance.now() - start;
  };
};
var once = () => {
  const start = Date.now();
  let stoppedAt = 0;
  return () => {
    if (stoppedAt === 0) {
      stoppedAt = Date.now() - start;
    }
    return stoppedAt;
  };
};
var infinity = () => {
  return () => {
    return Number.POSITIVE_INFINITY;
  };
};
function progress(duration, opts = {}) {
  const totalMs = intervalToMs(duration);
  if (!totalMs)
    throw new Error(`duration invalid`);
  const timerOpts = {
    ...opts,
    timer: msElapsedTimer()
  };
  const t = relativeTimer(totalMs, timerOpts);
  return () => t.elapsed;
}
var toString = (millisOrFunction, rounding = 2) => {
  let interval2 = {} = 0;
  if (typeof millisOrFunction === `function`) {
    const intervalResult = millisOrFunction();
    return toString(intervalResult);
  } else if (typeof millisOrFunction === `number`) {
    interval2 = millisOrFunction;
  } else if (typeof millisOrFunction === `object`) {
    interval2 = intervalToMs(interval2);
  }
  let ms = intervalToMs(interval2);
  if (typeof ms === `undefined`)
    return `(undefined)`;
  if (ms < 1e3)
    return `${round(rounding, ms)}ms`;
  ms /= 1e3;
  if (ms < 120)
    return `${ms.toFixed(1)}secs`;
  ms /= 60;
  if (ms < 60)
    return `${ms.toFixed(2)}mins`;
  ms /= 60;
  return `${ms.toFixed(2)}hrs`;
};

// src/flow/DispatchList.ts
var DispatchList = class {
  #handlers;
  #counter = 0;
  #id = Math.floor(Math.random() * 100);
  constructor() {
    this.#handlers = [];
  }
  /**
   * Returns _true_ if list is empty
   * @returns 
   */
  isEmpty() {
    return this.#handlers.length === 0;
  }
  /**
   * Adds a handler
   * @param handler 
   * @param options 
   * @returns 
   */
  add(handler, options = {}) {
    this.#counter++;
    const once2 = options.once ?? false;
    const wrap = {
      id: this.#id + `-` + this.#counter,
      handler,
      once: once2
    };
    this.#handlers.push(wrap);
    return wrap.id;
  }
  remove(id) {
    const length = this.#handlers.length;
    this.#handlers = this.#handlers.filter((handler) => handler.id !== id);
    return this.#handlers.length !== length;
  }
  notify(value) {
    for (const handler of this.#handlers) {
      handler.handler(value);
      if (handler.once) {
        this.remove(handler.id);
      }
    }
  }
  clear() {
    this.#handlers = [];
  }
};

// src/flow/Interval.ts
var interval = async function* (produce, optsOrFixedMs = {}) {
  let cancelled = false;
  const opts = typeof optsOrFixedMs === `number` ? { fixed: optsOrFixedMs } : optsOrFixedMs;
  const signal = opts.signal;
  const when = opts.delay ?? `before`;
  let sleepMs = intervalToMs(opts.fixed) ?? intervalToMs(opts.minimum, 0);
  let started = performance.now();
  const minIntervalMs = opts.minimum ? intervalToMs(opts.minimum) : void 0;
  const doDelay = async () => {
    const elapsed = performance.now() - started;
    if (typeof minIntervalMs !== `undefined`) {
      sleepMs = Math.max(0, minIntervalMs - elapsed);
    }
    if (sleepMs) {
      await sleep({ millis: sleepMs, signal });
    }
    started = performance.now();
    if (signal?.aborted)
      throw new Error(`Signal aborted ${signal.reason}`);
  };
  if (Array.isArray(produce))
    produce = produce.values();
  const isGenerator = typeof produce === `object` && `next` in produce && typeof produce.next === `function`;
  try {
    while (!cancelled) {
      if (when === `before`)
        await doDelay();
      if (typeof produce === `function`) {
        const result = await produce();
        if (typeof result === `undefined`)
          return;
        yield result;
      } else if (isGenerator) {
        const result = await produce.next();
        if (result.done)
          return;
        yield result.value;
      } else {
        throw new Error(
          `produce param does not seem to return a value/Promise and is not a generator?`
        );
      }
      if (when === `after`)
        await doDelay();
    }
  } finally {
    cancelled = true;
  }
};

// src/flow/Timeout.ts
var timeout = (callback, interval2) => {
  if (callback === void 0) {
    throw new Error(`callback parameter is undefined`);
  }
  const intervalMs = intervalToMs(interval2);
  throwIntegerTest(intervalMs, `aboveZero`, `interval`);
  let timer;
  let startedAt = 0;
  let startCount = 0;
  let state = `idle`;
  const clear = () => {
    startedAt = 0;
    globalThis.clearTimeout(timer);
    state = `idle`;
  };
  const start = async (altInterval = interval2, args) => {
    const p = new Promise((resolve, reject) => {
      startedAt = performance.now();
      const altTimeoutMs = intervalToMs(altInterval);
      const it = integerTest(altTimeoutMs, `aboveZero`, `altTimeoutMs`);
      if (!it[0]) {
        reject(new Error(it[1]));
        return;
      }
      switch (state) {
        case `scheduled`: {
          cancel();
          break;
        }
        case `running`: {
          break;
        }
      }
      state = `scheduled`;
      timer = globalThis.setTimeout(async () => {
        if (state !== `scheduled`) {
          console.warn(`Timeout skipping execution since state is not 'scheduled'`);
          clear();
          return;
        }
        const args_ = args ?? [];
        startCount++;
        state = `running`;
        await callback(performance.now() - startedAt, ...args_);
        state = `idle`;
        clear();
        resolve();
      }, altTimeoutMs);
    });
    return p;
  };
  const cancel = () => {
    if (state === `idle`)
      return;
    clear();
  };
  return {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    start,
    cancel,
    get runState() {
      return state;
    },
    get startCount() {
      return startCount;
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
var continuously = (callback, interval2, opts = {}) => {
  let intervalMs = intervalToMs(interval2, 0);
  throwIntegerTest(intervalMs, `positive`, `interval`);
  const fireBeforeWait = opts.fireBeforeWait ?? false;
  const onStartCalled = opts.onStartCalled;
  let disposed = false;
  let runState = `idle`;
  let startCount = 0;
  let ticks = 0;
  let startedAt = performance.now();
  let intervalUsed = interval2 ?? 0;
  let cancelled = false;
  let currentTimer;
  const deschedule = () => {
    if (currentTimer === void 0)
      return;
    globalThis.clearTimeout(currentTimer);
    currentTimer = void 0;
  };
  const schedule = (scheduledCallback) => {
    if (intervalMs === 0) {
      if (typeof requestAnimationFrame === `undefined`) {
        currentTimer = globalThis.setTimeout(scheduledCallback, 0);
      } else {
        currentTimer = void 0;
        requestAnimationFrame(scheduledCallback);
      }
    } else {
      currentTimer = globalThis.setTimeout(scheduledCallback, intervalMs);
    }
  };
  const cancel = () => {
    if (cancelled)
      return;
    cancelled = true;
    if (runState === `idle`)
      return;
    runState = `idle`;
    ticks = 0;
    deschedule();
  };
  const loop = async () => {
    if (runState === `idle`)
      return;
    runState = `running`;
    startCount++;
    const valueOrPromise = callback(ticks++, performance.now() - startedAt);
    const value = typeof valueOrPromise === `object` ? await valueOrPromise : valueOrPromise;
    if (cancelled) {
      return;
    }
    runState = `scheduled`;
    if (value !== void 0 && !value) {
      cancel();
      return;
    }
    if (cancelled)
      return;
    schedule(loop);
  };
  const start = () => {
    if (disposed)
      throw new Error(`Disposed`);
    cancelled = false;
    if (onStartCalled !== void 0) {
      const doWhat = onStartCalled(ticks, performance.now() - startedAt);
      switch (doWhat) {
        case `cancel`: {
          cancel();
          return;
        }
        case `reset`: {
          reset2();
          return;
        }
        case `dispose`: {
          disposed = true;
          cancel();
          return;
        }
      }
    }
    if (runState === `idle`) {
      startedAt = performance.now();
      runState = `scheduled`;
      if (fireBeforeWait) {
        void loop();
      } else {
        schedule(loop);
      }
    }
  };
  const reset2 = () => {
    if (disposed)
      throw new Error(`Disposed`);
    cancelled = false;
    if (runState !== `idle`) {
      cancel();
    }
    start();
  };
  return {
    start,
    reset: reset2,
    cancel,
    get interval() {
      return intervalUsed;
    },
    get runState() {
      return runState;
    },
    get startCount() {
      return startCount;
    },
    set interval(interval3) {
      const ms = intervalToMs(interval3, 0);
      throwIntegerTest(ms, `positive`, `interval`);
      intervalMs = ms;
      intervalUsed = interval3;
    },
    get isDisposed() {
      return disposed;
    },
    get elapsedMs() {
      return performance.now() - startedAt;
    }
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
  const done2 = (error) => {
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
  return done2;
};

// src/flow/Delay.ts
var delay = async (callback, optsOrMillis) => {
  const opts = typeof optsOrMillis === `number` ? { millis: optsOrMillis } : optsOrMillis;
  const delayWhen = opts.delay ?? `before`;
  if (delayWhen === `before` || delayWhen === `both`) {
    await sleep(opts);
  }
  const r = Promise.resolve(await callback());
  if (delayWhen === `after` || delayWhen === `both`) {
    await sleep(opts);
  }
  return r;
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
async function* delayLoop(timeout2) {
  const timeoutMs = intervalToMs(timeout2);
  if (typeof timeoutMs === `undefined`)
    throw new Error(`timeout is undefined`);
  if (timeoutMs < 0)
    throw new Error(`Timeout is less than zero`);
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

// src/flow/Every.ts
var everyNth = (nth, callback) => {
  throwIntegerTest(nth, `positive`, `nth`);
  let counter = 0;
  return (...args) => {
    if (++counter === nth) {
      counter = 0;
      if (callback)
        callback(...args);
      return true;
    }
    return false;
  };
};

// src/flow/RunOnce.ts
var runOnce = (onRun) => {
  let run2 = false;
  let success = false;
  return () => {
    if (run2)
      return success;
    run2 = true;
    success = onRun();
    return success;
  };
};

// src/flow/Retry.ts
var retry = async (callback, opts) => {
  const signal = opts.abort;
  const log = resolveLogOption(opts.log);
  const power = opts.power ?? 1.1;
  const predelayMs = opts.predelayMs ?? 0;
  const startedAt = since();
  let t = opts.startMs ?? 1e3;
  const count = opts.count;
  let attempts = 0;
  throwIntegerTest(count, `aboveZero`, `count`);
  if (t <= 0)
    throw new Error(`startMs must be above zero`);
  if (predelayMs > 0)
    await sleep({ millis: predelayMs, signal });
  if (signal?.aborted) {
    return {
      success: false,
      attempts,
      value: opts.defaultValue,
      elapsed: startedAt(),
      message: `Aborted during predelay`
    };
  }
  while (attempts < count) {
    attempts++;
    const callbackResult = await callback();
    if (callbackResult !== void 0) {
      return { value: callbackResult, success: true, attempts, elapsed: startedAt() };
    }
    log({
      msg: `retry attempts: ${attempts} t: ${toString(t)}`
    });
    if (attempts >= count) {
      break;
    }
    try {
      await sleep({ millis: t, signal });
    } catch (error) {
      return {
        success: false,
        attempts,
        value: opts.defaultValue,
        message: getErrorMessage(error),
        elapsed: startedAt()
      };
    }
    t = Math.floor(Math.pow(t, power));
  }
  return {
    message: `Giving up after ${attempts} attempts.`,
    success: false,
    attempts,
    value: opts.defaultValue,
    elapsed: startedAt()
  };
};

// src/flow/TaskQueue.ts
var TaskQueue = class _TaskQueue {
  static instance = new _TaskQueue();
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  _timer = 0;
  _queue;
  _startDelayMs;
  _intervalMs;
  constructor(opts = {}) {
    this._startDelayMs = opts.startDelayMs ?? 500;
    this._intervalMs = opts.intervalMs ?? 100;
    this._queue = mutable();
  }
  /**
   * Adds a task. This triggers processing loop if not already started.
   *
   * ```js
   * queue.add(async () => {
   *  await sleep(1000);
   * });
   * ```
   * @param task Task to run
   */
  add(task) {
    this._queue.enqueue(task);
    if (this._timer === 0)
      this.schedule(this._startDelayMs);
  }
  schedule(intervalMs) {
    if (this._queue.length === 0) {
      this._timer = 0;
      return;
    }
    if (this._timer !== 0) {
      return;
    }
    this._timer = setTimeout(() => {
      void this.processQueue();
    }, intervalMs);
  }
  async processQueue() {
    const task = this._queue.dequeue();
    this._timer = 0;
    if (task !== void 0) {
      try {
        await task();
        this._timer = 0;
        this.schedule(this._intervalMs);
      } catch (error) {
        console.error(error);
      }
    }
  }
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
function* repeat(countOrPredicate, fn) {
  let repeats, valuesProduced;
  repeats = valuesProduced = 0;
  if (typeof countOrPredicate === `number`) {
    throwNumberTest(countOrPredicate, `positive`, `countOrPredicate`);
    while (countOrPredicate-- > 0) {
      repeats++;
      const v = fn(repeats, valuesProduced);
      if (v === void 0)
        continue;
      yield v;
      valuesProduced++;
    }
  } else if (typeof countOrPredicate === `function`) {
    while (countOrPredicate(repeats, valuesProduced)) {
      repeats++;
      const v = fn(repeats, valuesProduced);
      if (v === void 0)
        continue;
      yield v;
      valuesProduced++;
    }
  } else {
    throw new TypeError(
      `countOrPredicate should be a number or function. Got: ${typeof countOrPredicate}`
    );
  }
}
var repeatReduce = (countOrPredicate, fn, initial, reduce) => {
  if (typeof countOrPredicate === `number`) {
    throwNumberTest(countOrPredicate, `positive`, `countOrPredicate`);
    while (countOrPredicate-- > 0) {
      const v = fn();
      if (v === void 0)
        continue;
      initial = reduce(initial, v);
    }
  } else {
    let repeats, valuesProduced;
    repeats = valuesProduced = 0;
    while (countOrPredicate(repeats, valuesProduced)) {
      repeats++;
      const v = fn();
      if (v === void 0)
        continue;
      initial = reduce(initial, v);
      valuesProduced++;
    }
  }
  return initial;
};
try {
  if (typeof window !== `undefined`) {
    window.ixfx = {
      ...window.ixfx,
      Flow: { StateMachine: StateMachine_exports, Timer: Timer_exports, forEach, forEachAsync, repeat }
    };
  }
} catch {
}

// src/flow/StateMachineWithEvents.ts
var StateMachineWithEvents = class extends SimpleEventEmitter {
  #sm;
  #smInitial;
  #debug;
  #isDoneNeedsFiring = false;
  #isDone = false;
  #changedAt = Elapsed_exports.infinity();
  /**
   * Create a state machine with initial state, description and options
   * @param m Machine description
   * @param opts Options for machine (defaults to `{debug:false}`)
   * @memberof StateMachine
   */
  constructor(m, opts = {}) {
    super();
    this.#debug = opts.debug ?? false;
    this.#sm = init(m, opts.initial);
    this.#smInitial = cloneState(this.#sm);
  }
  #setIsDone(v) {
    if (this.#isDone === v)
      return;
    this.#isDone = v;
    if (v) {
      this.#isDoneNeedsFiring = true;
      setTimeout(() => {
        if (!this.#isDoneNeedsFiring)
          return;
        this.#isDoneNeedsFiring = false;
        this.fireEvent(`stop`, { state: this.#sm.value });
      }, 2);
    } else {
      this.#isDoneNeedsFiring = false;
    }
  }
  /**
   * Return a list of possible states from current state.
   *
   * If list is empty, no states are possible. Otherwise lists
   * possible states, including 'null' for terminal
   */
  get statesPossible() {
    return possible(this.#sm);
  }
  /**
   * Return a list of all defined states
   */
  get statesDefined() {
    return Object.keys(this.#sm.machine);
  }
  /**
   * Moves to the next state if possible. If multiple states are possible, it will use the first.
   * If machine is finalised, no error is thrown and null is returned.
   *
   * @returns {(string|null)} Returns new state, or null if machine is finalised
   * @memberof StateMachine
   */
  next() {
    const p = possible(this.#sm);
    if (p.length === 0)
      return null;
    this.state = p[0];
    return p[0];
  }
  /**
   * Returns true if state machine is in its final state
   *
   * @returns
   * @memberof StateMachine
   */
  get isDone() {
    return done(this.#sm);
  }
  /**
   * Resets machine to initial state
   *
   * @memberof StateMachine
   */
  reset() {
    this.#setIsDone(false);
    this.#sm = cloneState(this.#smInitial);
    this.#changedAt = Elapsed_exports.since();
  }
  /**
   * Throws if it's not valid to transition to `newState`
   * @param newState
   * @returns
   */
  validateTransition(newState) {
    validateTransition(this.#sm, newState);
  }
  /**
   * Returns _true_ if `newState` is valid transition from current state.
   * Use {@link validateTransition} if you want an explanation for the _false_ results.
   * @param newState
   * @returns
   */
  isValid(newState) {
    return isValidTransition(this.#sm, newState);
  }
  /**
   * Gets or sets state. Throws an error if an invalid transition is attempted.
   * Use `StateMachine.isValid` to check validity without changing.
   *
   * If `newState` is the same as current state, the request is ignored silently.
   *
   * @memberof StateMachine
   */
  set state(newState) {
    const priorState = this.#sm.value;
    if (newState === this.#sm.value)
      return;
    this.#sm = to(this.#sm, newState);
    if (this.#debug) {
      console.log(`StateMachine: ${priorState} -> ${newState}`);
    }
    this.#changedAt = Elapsed_exports.since();
    setTimeout(() => {
      this.fireEvent(`change`, { newState, priorState });
    }, 1);
    if (done(this.#sm))
      this.#setIsDone(true);
  }
  get state() {
    return this.#sm.value;
  }
  /**
   * Returns timestamp when state was last changed.
   * See also `elapsed`
   */
  //eslint-disable-next-line functional/prefer-tacit
  get changedAt() {
    return this.#changedAt();
  }
  /**
   * Returns milliseconds elapsed since last state change.
   * See also `changedAt`
   */
  //eslint-disable-next-line functional/prefer-tacit
  get elapsed() {
    return this.#changedAt();
  }
};

// src/flow/Execute.ts
var run = async (expressions, opts = {}, args) => {
  const results = [];
  const compareFn = opts.rank ?? defaultComparer;
  let expressionsArray = Array.isArray(expressions) ? expressions : [expressions];
  if (opts.shuffle)
    expressionsArray = shuffle(expressionsArray);
  for (let i = 0; i < expressionsArray.length; i++) {
    const exp = expressionsArray[i];
    let r;
    if (typeof exp === "function") {
      r = await exp(args);
    } else {
      r = exp;
    }
    if (r !== void 0) {
      results.push(r);
      results.sort(compareFn);
    }
    if (typeof opts.stop !== "undefined") {
      if (opts.stop(r, results)) {
        break;
      }
    }
  }
  if (opts.filter) {
    return results.filter(opts.filter);
  }
  return results;
};

// src/flow/StateMachineDriver.ts
async function init2(machine, handlersOrOpts) {
  const opts = Array.isArray(handlersOrOpts) ? {
    handlers: handlersOrOpts
  } : handlersOrOpts;
  const debug = resolveLogOption(opts.debug, {
    category: `StateMachineDriver`
  });
  const byState = /* @__PURE__ */ new Map();
  for (const h of opts.handlers) {
    const ifBlock = Array.isArray(h.if) ? h.if : [h.if];
    for (const state of ifBlock) {
      if (typeof state !== `string`) {
        throw new TypeError(
          `Expected single or array of strings for the 'if' field. Got: '${typeof state}'.`
        );
      }
      if (byState.has(state)) {
        throw new Error(
          `Multiple handlers defined for state '${state}'. There should be at most one.`
        );
      }
      byState.set(state, h);
    }
  }
  const runOpts = {
    // Rank results by score
    rank: (a, b) => {
      return defaultComparer(a.score ?? 0, b.score ?? 0);
    },
    shuffle: opts.shuffleHandlers ?? false
  };
  let sm = init(machine);
  for (const [ifState] of byState) {
    if (typeof sm.machine[ifState] === `undefined` && ifState !== `__fallback`) {
      throw new Error(
        `StateMachineDriver handler references a state ('${ifState}') which is not defined on the machine. Therefore this handler will never run.'`
      );
    }
  }
  const run2 = async () => {
    debug(`Run. State: ${sm.value}`);
    const state = sm.value;
    let handler = byState.get(state);
    if (handler === void 0) {
      debug(`  No handler for state '${state}', trying __fallback`);
      handler = byState.get(`__fallback`);
    }
    if (handler === void 0) {
      debug(`  No __fallback handler`);
      return;
    }
    const runOptionsForHandler = handler.resultChoice === `first` ? {
      ...runOpts,
      stop: (latest) => {
        if (!latest)
          return false;
        if (`reset` in latest)
          return true;
        if (`next` in latest && latest.next !== void 0)
          return true;
        return false;
      }
    } : runOpts;
    const results = await run(
      handler.then,
      runOptionsForHandler,
      sm
    );
    debug(
      `  In state '${sm.value}' results: ${results.length}. Choice: ${handler.resultChoice}`
    );
    let r;
    switch (handler.resultChoice ?? `highest`) {
      case `highest`: {
        r = results.at(-1);
        break;
      }
      case `first`: {
        r = results[0];
        break;
      }
      case `lowest`: {
        r = results.at(0);
        break;
      }
      case `random`: {
        r = randomElement(results);
        break;
      }
      default: {
        throw new Error(
          `Unknown 'resultChoice' option: ${handler.resultChoice}. Expected highest, first, lowest or random`
        );
      }
    }
    debug(`  Chosen result: ${JSON.stringify(r)}`);
    if (r && r.reset) {
      sm = reset(sm);
    } else if (r && r.next) {
      if (typeof r.next === `boolean`) {
        sm = next(sm);
      } else {
        debug(JSON.stringify(results));
        sm = to(sm, r.next);
      }
    }
    return sm;
  };
  return {
    reset: () => {
      sm = reset(sm);
    },
    getValue: () => sm.value,
    run: run2,
    to: (state) => {
      sm = to(sm, state);
      return sm;
    }
  };
}

// src/flow/StateMachine.ts
var cloneState = (toClone) => {
  return Object.freeze({
    value: toClone.value,
    visited: [...toClone.visited],
    machine: toClone.machine
  });
};
var init = (stateMachine, initialState) => {
  const [machine, machineValidationError] = validateMachine(stateMachine);
  if (!machine)
    throw new Error(machineValidationError);
  const state = initialState ?? Object.keys(machine.states)[0];
  if (typeof machine.states[state] === "undefined") {
    throw new Error(`Initial state not found`);
  }
  const transitions = validateAndNormaliseTransitions(machine.states);
  if (transitions === void 0) {
    throw new Error(`Could not normalise transitions`);
  }
  return Object.freeze({
    value: state,
    visited: [],
    machine: Object.fromEntries(transitions)
  });
};
var reset = (sm) => {
  return init(sm.machine);
};
var validateMachine = (smOrTransitions) => {
  if (typeof smOrTransitions === "undefined") {
    return [void 0, "Parameter undefined"];
  }
  if (smOrTransitions === null) {
    return [void 0, "Parameter null"];
  }
  if (`states` in smOrTransitions) {
    return [smOrTransitions, ""];
  }
  if (typeof smOrTransitions === `object`) {
    return [
      {
        // @ts-ignore
        states: smOrTransitions
      },
      ""
    ];
  }
  return [
    void 0,
    `Unexpected type: ${typeof smOrTransitions}. Expected object`
  ];
};
var done = (sm) => {
  return possible(sm).length === 0;
};
var possibleTargets = (sm) => {
  validateMachineState(sm);
  const fromS = sm.machine[sm.value];
  if (fromS.length === 1 && fromS[0].state === null)
    return [];
  return fromS;
};
var possible = (sm) => {
  const targets = possibleTargets(sm);
  return targets.map((v) => v.state);
};
var normaliseTargets = (targets) => {
  const normaliseSingleTarget = (target) => {
    if (target === null)
      return { state: null };
    if (typeof target === "string") {
      return {
        state: target
      };
    } else if (typeof target === "object" && "state" in target) {
      const targetState = target.state;
      if (typeof targetState !== "string") {
        throw new Error(
          `Target 'state' field is not a string. Got: ${typeof targetState}`
        );
      }
      if (`preconditions` in target) {
        return {
          state: targetState,
          preconditions: target.preconditions
        };
      }
      return { state: targetState };
    } else {
      throw new Error(
        `Unexpected type: ${typeof target}. Expected string or object with 'state' field.`
      );
    }
  };
  if (Array.isArray(targets)) {
    let containsNull = false;
    const mapResults = targets.map((t) => {
      const r = normaliseSingleTarget(t);
      if (!r)
        throw new Error(`Invalid target`);
      containsNull = containsNull || r.state === null;
      return r;
    });
    if (containsNull && mapResults.length > 1) {
      throw new Error(`Cannot have null as an possible state`);
    }
    return mapResults;
  } else {
    const target = normaliseSingleTarget(targets);
    if (!target)
      return;
    return [target];
  }
};
var validateAndNormaliseTransitions = (d) => {
  const returnMap = /* @__PURE__ */ new Map();
  for (const [topLevelState, topLevelTargets] of Object.entries(d)) {
    if (typeof topLevelState === `undefined`) {
      throw new Error(`Top-level undefined state`);
    }
    if (typeof topLevelTargets === `undefined`) {
      throw new Error(`Undefined target state for ${topLevelState}`);
    }
    if (returnMap.has(topLevelState)) {
      throw new Error(`State defined twice: ${topLevelState}`);
    }
    if (topLevelState.includes(" ")) {
      throw new Error("State names cannot contain spaces");
    }
    returnMap.set(topLevelState, []);
  }
  for (const [topLevelState, topLevelTargets] of Object.entries(d)) {
    const targets = normaliseTargets(topLevelTargets);
    if (targets === void 0)
      throw new Error(`Could not normalise target`);
    if (targets !== null) {
      const seenStates = /* @__PURE__ */ new Set();
      for (const target of targets) {
        if (seenStates.has(target.state)) {
          throw new Error(
            `Target state '${target.state}' already exists for '${topLevelState}'`
          );
        }
        seenStates.add(target.state);
        if (target.state === null)
          continue;
        if (!returnMap.has(target.state)) {
          throw new Error(
            `Target state '${target.state}' is not defined as a top-level state. Defined under: '${topLevelState}'`
          );
        }
      }
      returnMap.set(topLevelState, targets);
    }
  }
  return returnMap;
};
var validateMachineState = (state) => {
  if (typeof state === "undefined") {
    throw new Error(`Parameter 'state' is undefined`);
  }
  if (typeof state.value !== "string") {
    throw new Error("Existing state is not a string");
  }
};
var to = (sm, toState) => {
  validateMachineState(sm);
  validateTransition(sm, toState);
  return Object.freeze({
    value: toState,
    machine: sm.machine,
    visited: unique([sm.visited, [sm.value]])
  });
};
var next = (sm) => {
  const first = possibleTargets(sm).at(0);
  if (!first || first.state === null) {
    throw new Error(
      `Not possible to move to a next state from '${sm.value}`
    );
  }
  return to(sm, first.state);
};
var isValidTransition = (sm, toState) => {
  try {
    validateTransition(sm, toState);
    return true;
  } catch (ex) {
    return false;
  }
};
var validateTransition = (sm, toState) => {
  if (toState === null)
    throw new Error(`Cannot transition to null state`);
  if (toState === void 0) {
    throw new Error(`Cannot transition to undefined state`);
  }
  if (typeof toState !== "string") {
    throw new Error(
      `Parameter 'toState' should be a string. Got: ${typeof toState}`
    );
  }
  const p = possible(sm);
  if (p.length === 0)
    throw new Error("Machine is in terminal state");
  if (!p.includes(toState)) {
    throw new Error(
      `Target state '${toState}' not available at current state '${sm.value}'. Possible states: ${p.join(", ")}`
    );
  }
};
var fromList = (...states) => {
  const t = {};
  if (!Array.isArray(states))
    throw new Error(`Expected array of strings`);
  if (states.length <= 2)
    throw new Error(`Expects at least two states`);
  for (let i = 0; i < states.length; i++) {
    const s = states[i];
    if (typeof s !== `string`) {
      throw new Error(
        `Expected array of strings. Got type '${typeof s}' at index ${i}`
      );
    }
    if (i === states.length - 1) {
      t[s] = null;
    } else {
      t[s] = states[i + 1];
    }
  }
  return t;
};
var bidirectionalFromList = (...states) => {
  const t = {};
  if (!Array.isArray(states))
    throw new Error(`Expected array of strings`);
  if (states.length < 2)
    throw new Error(`Expects at least two states`);
  for (let i = 0; i < states.length; i++) {
    const s = states[i];
    if (typeof s !== `string`) {
      throw new Error(
        `Expected array of strings. Got type '${typeof s}' at index ${i}`
      );
    }
    t[s] = [];
  }
  for (let i = 0; i < states.length; i++) {
    const v = t[states[i]];
    if (i === states.length - 1) {
      if (states.length > 1) {
        v.push(states[i - 1]);
      } else {
        t[states[i]] = null;
      }
    } else {
      v.push(states[i + 1]);
      if (i > 0)
        v.push(states[i - 1]);
    }
  }
  return t;
};

export {
  clamp,
  clampIndex,
  round,
  Elapsed_exports,
  DispatchList,
  StateMachineWithEvents,
  init2 as init,
  cloneState,
  init as init2,
  reset,
  validateMachine,
  done,
  possibleTargets,
  possible,
  normaliseTargets,
  to,
  next,
  isValidTransition,
  validateTransition,
  fromList,
  bidirectionalFromList,
  StateMachine_exports,
  interval,
  timeout,
  updateOutdated,
  continuously,
  debounce,
  throttle,
  waitFor,
  delay,
  delayLoop,
  everyNth,
  runOnce,
  retry,
  TaskQueue,
  forEach,
  forEachAsync,
  repeat,
  repeatReduce,
  flow_exports,
  hasElapsed,
  frequencyTimerSource,
  relativeTimer,
  frequencyTimer,
  msElapsedTimer,
  ticksElapsedTimer
};
//# sourceMappingURL=chunk-PLOEFFHN.js.map