import {
  StateMachine_exports,
  run,
  runSingle
} from "./chunk-XONNGZY5.js";
import {
  Elapsed_exports,
  frequencyTimer,
  frequencyTimerSource,
  hasElapsed,
  msElapsedTimer,
  relativeTimer,
  since,
  ticksElapsedTimer,
  toString
} from "./chunk-4LUNZR7B.js";
import {
  mutable
} from "./chunk-5PZ2TXZH.js";
import {
  SimpleEventEmitter
} from "./chunk-QZPNGNL4.js";
import {
  intervalToMs,
  isInterval
} from "./chunk-37WZU5ZM.js";
import {
  integerTest,
  throwIntegerTest,
  throwNumberTest
} from "./chunk-JIDOUNL5.js";
import {
  getErrorMessage
} from "./chunk-4IJNRUE7.js";
import {
  resolveLogOption
} from "./chunk-BWJ5AMOD.js";
import {
  __export
} from "./chunk-AFNFQUHK.js";

// src/flow/index.ts
var flow_exports = {};
__export(flow_exports, {
  BehaviourTree: () => BehaviourTree_exports,
  DispatchList: () => DispatchList,
  Elapsed: () => Elapsed_exports,
  RequestResponseMatch: () => RequestResponseMatch,
  StateMachine: () => StateMachine_exports,
  SyncWait: () => SyncWait,
  TaskQueueMutable: () => TaskQueueMutable,
  WaitForValue: () => WaitForValue,
  backoffGenerator: () => backoffGenerator,
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
  promiseFromEvent: () => promiseFromEvent,
  promiseWithResolvers: () => promiseWithResolvers,
  rateMinimum: () => rateMinimum,
  relativeTimer: () => relativeTimer,
  repeat: () => repeat,
  repeatAwait: () => repeatAwait,
  retryFunction: () => retryFunction,
  retryTask: () => retryTask,
  run: () => run,
  runOnce: () => runOnce,
  runSingle: () => runSingle,
  singleItem: () => singleItem,
  sleep: () => sleep,
  sleepWhile: () => sleepWhile,
  throttle: () => throttle,
  ticksElapsedTimer: () => ticksElapsedTimer,
  timeout: () => timeout,
  updateOutdated: () => updateOutdated,
  waitFor: () => waitFor
});

// src/flow/BehaviourTree.ts
var BehaviourTree_exports = {};
__export(BehaviourTree_exports, {
  iterateBreadth: () => iterateBreadth,
  iterateDepth: () => iterateDepth
});
var getName = (t, defaultValue = ``) => {
  if (typeof t === `object` && `name` in t && t.name !== void 0) return t.name;
  return defaultValue;
};
function* iterateBreadth(t, pathPrefix) {
  if (typeof pathPrefix === `undefined`) {
    pathPrefix = getName(t);
  }
  for (const [index, n] of entries(t)) {
    yield [n, pathPrefix];
  }
  for (const [index, n] of entries(t)) {
    const name = getName(n, `?`);
    const prefix = pathPrefix.length > 0 ? pathPrefix + `.` + name : name;
    yield* iterateBreadth(n, prefix);
  }
}
function* iterateDepth(t, pathPrefix) {
  if (typeof pathPrefix === `undefined`) {
    pathPrefix = getName(t);
  }
  for (const [index, n] of entries(t)) {
    yield [n, pathPrefix];
    const name = getName(n, `?`);
    const prefix = pathPrefix.length > 0 ? pathPrefix + `.` + name : name;
    yield* iterateBreadth(n, prefix);
  }
}
function isSeqNode(n) {
  return n.seq !== void 0;
}
function isSelNode(n) {
  return n.sel !== void 0;
}
function* entries(n) {
  if (isSeqNode(n)) {
    yield* n.seq.entries();
  } else if (isSelNode(n)) {
    yield* n.sel.entries();
  } else if (typeof n === `string`) {
  } else {
    throw new TypeError(`Unexpected shape of node. seq/sel missing`);
  }
}

// src/flow/Continuously.ts
var continuously = (callback, interval2, options = {}) => {
  let intervalMs = intervalToMs(interval2, 0);
  throwIntegerTest(intervalMs, `positive`, `interval`);
  const fireBeforeWait = options.fireBeforeWait ?? false;
  const onStartCalled = options.onStartCalled;
  const signal = options.signal;
  let disposed = false;
  let runState = `idle`;
  let startCount = 0;
  let startCountTotal = 0;
  let startedAt = performance.now();
  let intervalUsed = interval2 ?? 0;
  let cancelled = false;
  let currentTimer;
  const deschedule = () => {
    if (currentTimer === void 0) return;
    globalThis.clearTimeout(currentTimer);
    currentTimer = void 0;
    startCount = 0;
    startedAt = Number.NaN;
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
    if (cancelled) return;
    cancelled = true;
    if (runState === `idle`) return;
    runState = `idle`;
    deschedule();
  };
  const loop = async () => {
    if (signal?.aborted) {
      runState = `idle`;
    }
    if (runState === `idle`) return;
    runState = `running`;
    startCount++;
    startCountTotal++;
    const valueOrPromise = callback(startCount, performance.now() - startedAt);
    const value = typeof valueOrPromise === `object` ? await valueOrPromise : valueOrPromise;
    if (cancelled) {
      return;
    }
    runState = `scheduled`;
    if (value !== void 0 && !value) {
      cancel();
      return;
    }
    if (cancelled) return;
    schedule(loop);
  };
  const start = () => {
    if (disposed) throw new Error(`Disposed`);
    cancelled = false;
    if (onStartCalled !== void 0) {
      const doWhat = onStartCalled(startCount, performance.now() - startedAt);
      switch (doWhat) {
        case `cancel`: {
          cancel();
          return;
        }
        case `reset`: {
          reset();
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
      startCount = 0;
      startedAt = performance.now();
      runState = `scheduled`;
      if (fireBeforeWait) {
        void loop();
      } else {
        schedule(loop);
      }
    }
  };
  const reset = () => {
    if (disposed) throw new Error(`Disposed`);
    cancelled = false;
    startCount = 0;
    startedAt = Number.NaN;
    if (runState !== `idle`) {
      cancel();
    }
    start();
  };
  return {
    start,
    reset,
    cancel,
    get interval() {
      return intervalUsed;
    },
    get runState() {
      return runState;
    },
    get startCountTotal() {
      return startCountTotal;
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
  let startCountTotal = 0;
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
        startCountTotal++;
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
    if (state === `idle`) return;
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
    },
    get startCountTotal() {
      return startCountTotal;
    }
  };
};

// src/flow/Debounce.ts
var debounce = (callback, interval2) => {
  const t = timeout(callback, interval2);
  return (...args) => {
    t.start(void 0, args);
  };
};

// src/flow/Sleep.ts
if (typeof window === `undefined` || !(`requestAnimationFrame` in window)) {
  if (typeof window === `undefined`) {
    globalThis.requestAnimationFrame = (callback) => {
      setTimeout(callback, 1);
    };
  }
}
var sleep = (optsOrMillis) => {
  const timeoutMs = intervalToMs(optsOrMillis, 1);
  const signal = optsOrMillis.signal;
  const value = optsOrMillis.value;
  throwNumberTest(timeoutMs, `positive`, `timeoutMs`);
  if (timeoutMs === 0) {
    return new Promise(
      (resolve) => requestAnimationFrame((_) => {
        resolve(value);
      })
    );
  } else {
    return new Promise((resolve, reject) => {
      const onAbortSignal = () => {
        clearTimeout(t);
        if (signal) {
          signal.removeEventListener(`abort`, onAbortSignal);
          reject(new Error(signal.reason));
        } else {
          reject(new Error(`Cancelled`));
        }
      };
      if (signal) {
        signal.addEventListener(`abort`, onAbortSignal);
      }
      const t = setTimeout(() => {
        signal?.removeEventListener(`abort`, onAbortSignal);
        if (signal?.aborted) {
          reject(new Error(signal.reason));
          return;
        }
        resolve(value);
      }, timeoutMs);
    });
  }
};
var sleepWhile = async (predicate, checkInterval = 100) => {
  while (predicate()) {
    await sleep(checkInterval);
  }
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
    if (resolve) resolve();
    p = new Promise((r) => resolve = r);
  };
  try {
    while (true) {
      timer = globalThis.requestAnimationFrame(callback);
      const _ = await p;
      yield _;
    }
  } finally {
    if (resolve) resolve();
    globalThis.cancelAnimationFrame(timer);
  }
}
async function* delayLoop(timeout2) {
  const timeoutMs = intervalToMs(timeout2);
  if (typeof timeoutMs === `undefined`) throw new Error(`timeout is undefined`);
  if (timeoutMs < 0) throw new Error(`Timeout is less than zero`);
  if (timeoutMs === 0) return yield* delayAnimationLoop();
  let resolve;
  let p = new Promise((r) => resolve = r);
  let timer;
  const callback = () => {
    if (resolve) resolve();
    p = new Promise((r) => resolve = r);
  };
  try {
    while (true) {
      timer = globalThis.setTimeout(callback, timeoutMs);
      const _ = await p;
      yield _;
    }
  } finally {
    if (resolve) resolve();
    if (timer !== void 0) globalThis.clearTimeout(timer);
    timer = void 0;
  }
}

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
    const once = options.once ?? false;
    const wrap = {
      id: `${this.#id} - ${this.#counter}`,
      handler,
      once
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

// src/flow/Every.ts
var everyNth = (nth, callback) => {
  throwIntegerTest(nth, `positive`, `nth`);
  let counter = 0;
  return (data) => {
    counter++;
    if (counter === nth) {
      counter = 0;
      if (callback) callback(data);
      return true;
    }
    return false;
  };
};

// src/flow/ForEach.ts
var forEach = (iterator, fn) => {
  for (const x of iterator) {
    const r = fn(x);
    if (typeof r === `boolean` && !r) break;
  }
};
var forEachAsync = async function(iterator, fn, intervalMs) {
  if (Array.isArray(iterator)) {
    for (const x of iterator) {
      const r = await fn(x);
      if (intervalMs) await sleep(intervalMs);
      if (typeof r === `boolean` && !r) break;
    }
  } else {
    for await (const x of iterator) {
      const r = await fn(x);
      if (intervalMs) await sleep(intervalMs);
      if (typeof r === `boolean` && !r) break;
    }
  }
};

// src/flow/Interval.ts
var interval = async function* (produce, optsOrFixedMs = {}) {
  const opts = typeof optsOrFixedMs === `number` ? { fixed: optsOrFixedMs } : optsOrFixedMs;
  const signal = opts.signal;
  const when = opts.delay ?? `before`;
  const minIntervalMs = opts.minimum ? intervalToMs(opts.minimum) : void 0;
  let cancelled = false;
  let sleepMs = intervalToMs(opts.fixed) ?? intervalToMs(opts.minimum, 0);
  let started = performance.now();
  const doDelay = async () => {
    const elapsed = performance.now() - started;
    if (typeof minIntervalMs !== `undefined`) {
      sleepMs = Math.max(0, minIntervalMs - elapsed);
    }
    if (sleepMs) {
      await sleep({ millis: sleepMs, signal });
    }
    started = performance.now();
    if (signal?.aborted) throw new Error(`Signal aborted ${signal.reason}`);
  };
  if (Array.isArray(produce)) produce = produce.values();
  const isGenerator = typeof produce === `object` && `next` in produce && typeof produce.next === `function`;
  try {
    while (!cancelled) {
      if (when === `before`) await doDelay();
      if (typeof produce === `function`) {
        const result = await produce();
        if (typeof result === `undefined`) return;
        yield result;
      } else if (isGenerator) {
        const result = await produce.next();
        if (result.done) return;
        yield result.value;
      } else {
        throw new Error(
          `produce param does not seem to return a value/Promise and is not a generator?`
        );
      }
      if (when === `after`) await doDelay();
    }
  } finally {
    cancelled = true;
  }
};

// src/flow/PromiseFromEvent.ts
var promiseFromEvent = (target, name) => {
  return new Promise((resolve) => {
    const handler = (...args) => {
      target.removeEventListener(name, handler);
      if (Array.isArray(args) && args.length === 1) resolve(args[0]);
      else resolve(args);
    };
    target.addEventListener(name, handler);
  });
};

// src/flow/PromiseWithResolvers.ts
function promiseWithResolvers() {
  let resolve;
  let reject;
  const promise = new Promise(
    (_resolve, _reject) => {
      resolve = _resolve;
      reject = _reject;
    }
  );
  return { promise, resolve, reject };
}

// src/flow/RateMinimum.ts
var rateMinimum = (options) => {
  let disposed = false;
  const t = timeout(() => {
    if (disposed) return;
    t.start();
    options.whatToCall(options.fallback());
  }, options.interval);
  if (options.abort) {
    options.abort.addEventListener(`abort`, (_) => {
      disposed = true;
      t.cancel();
    });
  }
  t.start();
  return (args) => {
    if (disposed) throw new Error(`AbortSignal has been fired`);
    t.start();
    options.whatToCall(args);
  };
};

// src/flow/Repeat.ts
function repeatAwait(countOrPredicate, fn) {
  return typeof countOrPredicate === `number` ? repeatTimesAwaited(countOrPredicate, fn) : repeatWhileAwaited(countOrPredicate, fn);
}
function repeat(countOrPredicate, fn) {
  return typeof countOrPredicate === `number` ? repeatTimes(countOrPredicate, fn) : repeatWhile(countOrPredicate, fn);
}
async function* repeatWhileAwaited(predicate, fn) {
  let repeats = 0;
  let valuesProduced = 0;
  while (predicate(repeats, valuesProduced)) {
    repeats++;
    const v = await fn(repeats, valuesProduced);
    if (v === void 0) continue;
    yield v;
    valuesProduced++;
  }
}
function* repeatWhile(predicate, fn) {
  let repeats = 0;
  let valuesProduced = 0;
  while (predicate(repeats, valuesProduced)) {
    repeats++;
    const v = fn(repeats, valuesProduced);
    if (v === void 0) continue;
    yield v;
    valuesProduced++;
  }
}
async function* repeatTimesAwaited(count, fn) {
  throwNumberTest(count, `positive`, `count`);
  let valuesProduced = 0;
  let repeats = 0;
  while (count-- > 0) {
    repeats++;
    const v = await fn(repeats, valuesProduced);
    if (v === void 0) continue;
    yield v;
    valuesProduced++;
  }
}
function* repeatTimes(count, fn) {
  throwNumberTest(count, `positive`, `count`);
  let valuesProduced = 0;
  let repeats = 0;
  while (count-- > 0) {
    repeats++;
    const v = fn(repeats, valuesProduced);
    if (v === void 0) continue;
    yield v;
    valuesProduced++;
  }
}

// src/flow/RequestResponseMatch.ts
var RequestResponseMatch = class extends SimpleEventEmitter {
  timeoutMs;
  whenUnmatchedResponse;
  keyRequest;
  keyResponse;
  #outgoing = /* @__PURE__ */ new Map();
  #maintainLoop;
  constructor(options = {}) {
    super();
    if (typeof window === `undefined`) {
      globalThis.window = {
        setTimeout,
        clearTimeout
      };
    }
    this.timeoutMs = options.timeoutMs ?? 1e3;
    this.whenUnmatchedResponse = options.whenUnmatchedResponse ?? `throw`;
    this.#maintainLoop = continuously(() => this.#maintain(), this.timeoutMs * 2);
    if (options.key) {
      if (options.keyRequest) throw new Error(`Cannot set 'keyRequest' when 'key' is set `);
      if (options.keyResponse) throw new Error(`Cannot set 'keyResponse' when 'key' is set `);
      this.keyRequest = options.key;
      this.keyResponse = options.key;
    } else {
      if (!options.keyRequest || !options.keyResponse) {
        throw new Error(`Expects 'keyRequest' & 'keyResponse' fields to be set if 'key' is not set`);
      }
      this.keyRequest = options.keyRequest;
      this.keyResponse = options.keyResponse;
    }
  }
  #maintain() {
    const values = [...this.#outgoing.values()];
    const now = Date.now();
    for (const v of values) {
      if (v.expiresAt <= now) {
        if (v.promiseReject) {
          v.promiseReject(`Request timeout`);
        }
        const callback = v.callback;
        if (callback) {
          setTimeout(() => {
            callback(true, `Request timeout`);
          }, 1);
        }
        this.fireEvent(`completed`, { request: v.req, response: `Request timeout`, success: false });
        this.#outgoing.delete(v.id);
      }
    }
    this.debugDump();
    return this.#outgoing.size > 0;
  }
  debugDump() {
    const values = [...this.#outgoing.values()];
    const now = Date.now();
    for (const v of values) {
      const expire = now - v.expiresAt;
      console.log(`${v.id} Expires in: ${Math.floor(expire / 1e3)}s`);
    }
  }
  /**
   * Makes a request.
   * If `callback` is set, it's equivalent to calling `requestCallback`.
   * If `callback` is not set, a promise is returned
   * @param request 
   * @param callback 
   * @returns 
   */
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  request(request, callback) {
    if (callback !== void 0) {
      this.#requestCallback(request, callback);
      return;
    }
    return this.#requestAwait(request);
  }
  /**
   * Make a request and don't wait for the outcome.
   * @param request 
   */
  requestAndForget(request) {
    const id = this.keyRequest(request);
    if (this.#outgoing.has(id)) throw new Error(`Already a request pending with id '${id}'`);
    const r = {
      expiresAt: Date.now() + this.timeoutMs,
      id,
      req: request
    };
    this.#outgoing.set(id, r);
    this.#maintainLoop.start();
  }
  /**
   * Make a request, returning a Promise for the outcome.
   * Errors will throw an exception.
   * @param request 
   * @returns 
   */
  #requestAwait(request) {
    const id = this.keyRequest(request);
    if (this.#outgoing.has(id)) throw new Error(`Already a request pending with id '${id}'`);
    const p = new Promise((resolve, reject) => {
      const r = {
        expiresAt: Date.now() + this.timeoutMs,
        id,
        req: request,
        promiseResolve: resolve,
        promiseReject: reject
      };
      this.#outgoing.set(id, r);
      this.#maintainLoop.start();
    });
    return p;
  }
  /**
   * Make a request, and get notified of outcome with a callback
   * @param request 
   * @param callback 
   */
  #requestCallback(request, callback) {
    const id = this.keyRequest(request);
    if (this.#outgoing.has(id)) throw new Error(`Already a request pending with id '${id}'`);
    const r = {
      expiresAt: Date.now() + this.timeoutMs,
      id,
      req: request,
      callback
    };
    this.#outgoing.set(id, r);
    this.#maintainLoop.start();
  }
  /**
   * Response has been received
   * @param response Response
   * @returns _True_ if response matched a request 
   */
  response(response, keepAlive) {
    const id = this.keyResponse(response);
    const request = this.#outgoing.get(id);
    if (!request) {
      if (this.whenUnmatchedResponse === `throw`) throw new Error(`Unmatched response with id: '${id}'`, { cause: response });
      return false;
    }
    if (keepAlive) {
      request.expiresAt = Date.now() + this.timeoutMs;
    } else {
      this.#outgoing.delete(id);
    }
    if (request.promiseResolve) {
      request.promiseResolve(response);
    }
    if (request.callback) {
      request.callback(false, response);
    }
    this.fireEvent(`match`, { request: request.req, response });
    if (!keepAlive) {
      this.fireEvent(`completed`, { request: request.req, response, success: true });
    }
    return true;
  }
};

// src/flow/Retry.ts
function* backoffGenerator(options = {}) {
  const startAt = options.startAt ?? 1;
  let limitAttempts = options.limitAttempts ?? Number.MAX_SAFE_INTEGER;
  const limitValue = options.limitValue;
  const power = options.power ?? 1.1;
  let value = startAt;
  throwIntegerTest(limitAttempts, `aboveZero`, `limitAttempts`);
  throwNumberTest(startAt, ``, `startAt`);
  throwNumberTest(limitAttempts, ``, `limitAttempts`);
  if (limitValue !== void 0) throwNumberTest(limitValue, ``, `limitValue`);
  throwNumberTest(power, ``, `power`);
  while (limitAttempts > 0) {
    if (limitValue && value >= limitValue) return;
    limitAttempts--;
    yield value;
    value += Math.pow(value, power);
  }
}
var retryFunction = (callback, options = {}) => {
  const task = {
    async probe() {
      try {
        const v = await callback();
        if (v === void 0) return { value: options.taskValueFallback, success: false };
        return { value: v, success: true };
      } catch (error) {
        return { success: false, message: getErrorMessage(error) };
      }
    }
  };
  return retryTask(task, options);
};
var retryTask = async (task, opts = {}) => {
  const signal = opts.abort;
  const log = resolveLogOption(opts.log);
  const predelayMs = opts.predelayMs ?? 0;
  const startedAt = since();
  let attempts = 0;
  const initialValue = opts.startAt ?? 1e3;
  const limitAttempts = opts.limitAttempts ?? Number.MAX_SAFE_INTEGER;
  const backoffGen = backoffGenerator({ ...opts, startAt: initialValue, limitAttempts });
  if (initialValue <= 0) throw new Error(`Param 'initialValue' must be above zero`);
  if (predelayMs > 0) {
    try {
      await sleep({ millis: predelayMs, signal });
    } catch (error) {
      return {
        success: false,
        attempts,
        value: opts.taskValueFallback,
        elapsed: startedAt(),
        message: getErrorMessage(error)
      };
    }
  }
  for (const t of backoffGen) {
    attempts++;
    const result = await task.probe(attempts);
    if (result.success) {
      return { success: result.success, value: result.value, attempts, elapsed: startedAt() };
    }
    log({
      msg: `retry attempts: ${attempts} t: ${toString(t)}`
    });
    if (attempts >= limitAttempts) {
      break;
    }
    try {
      await sleep({ millis: t, signal });
    } catch (error) {
      return {
        success: false,
        attempts,
        value: opts.taskValueFallback,
        message: getErrorMessage(error),
        elapsed: startedAt()
      };
    }
  }
  return {
    message: `Giving up after ${attempts} attempts.`,
    success: false,
    attempts,
    value: opts.taskValueFallback,
    elapsed: startedAt()
  };
};

// src/flow/RunOnce.ts
var runOnce = (onRun) => {
  let run2 = false;
  let success = false;
  return () => {
    if (run2) return success;
    run2 = true;
    success = onRun();
    return success;
  };
};

// src/flow/SyncWait.ts
var SyncWait = class {
  #resolve;
  #reject;
  #promise;
  signal() {
    if (this.#resolve) {
      this.#resolve();
      this.#resolve = void 0;
    }
    this.#promise = Promise.resolve();
  }
  /**
   * Throw away any previous signalled state.
   * This will cause any currently waiters to throw
   */
  flush() {
    if (this.#reject) {
      this.#reject(`Flushed`);
      this.#reject = void 0;
    }
    this.#resolve = void 0;
    this.#promise = void 0;
  }
  #initPromise() {
    const p = new Promise((resolve, reject) => {
      this.#resolve = resolve;
      this.#reject = reject;
    });
    this.#promise = p;
    return p;
  }
  /**
   * Call with `await` to wait until .signal() happens.
   * If a wait period is specified, an exception is thrown if signal does not happen within this time.
   * @param maximumWaitMs 
   */
  async forSignal(maximumWaitMs) {
    let p = this.#promise;
    if (!p) p = this.#initPromise();
    if (maximumWaitMs) {
      const reject = this.#reject;
      setTimeout(() => {
        if (reject) {
          reject(`Timeout elapsed ${maximumWaitMs}`);
        }
      }, maximumWaitMs);
    }
    await p;
    this.#promise = void 0;
    this.#resolve = void 0;
    this.#reject = void 0;
  }
  /**
   * An alternative to {@link forSignal}, returning _true_
   * if signalled, or _false_ if wait period was exceeded 
   * 
   * ```js
   * const s = await sw.didSignal(5000);
   * ```
   * @param maximumWaitMs 
   * @returns 
   */
  async didSignal(maximumWaitMs) {
    try {
      await this.forSignal(maximumWaitMs);
      return true;
    } catch {
      return false;
    }
  }
};

// src/flow/TaskQueueMutable.ts
var TaskQueueMutable = class _TaskQueueMutable extends SimpleEventEmitter {
  static shared = new _TaskQueueMutable();
  _loop;
  _queue;
  constructor() {
    super();
    this._queue = mutable();
    this._loop = continuously(() => {
      return this.processQueue();
    }, 100);
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
  enqueue(task) {
    const length = this._queue.enqueue(task);
    if (this._loop.runState === `idle`) {
      this.fireEvent(`started`, {});
      this._loop.start();
    }
    return length;
  }
  dequeue() {
    return this._queue.dequeue();
  }
  async processQueue() {
    const task = this._queue.dequeue();
    if (task === void 0) {
      this.fireEvent(`empty`, {});
      return false;
    }
    try {
      await task();
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Clears all tasks, and stops any scheduled processing.
   * Currently running tasks will continue.
   * @returns 
   */
  clear() {
    if (this._queue.length === 0) return;
    this._queue.clear();
    this._loop.cancel();
    this.fireEvent(`empty`, {});
  }
  /**
  * Returns true if queue is empty
  */
  get isEmpty() {
    return this._queue.isEmpty;
  }
  /**
   * Number of items in queue
   */
  get length() {
    return this._queue.length;
  }
};

// src/flow/Throttle.ts
var throttle = (callback, intervalMinMs) => {
  let trigger = 0;
  return async (...args) => {
    const elapsed = performance.now() - trigger;
    if (elapsed >= intervalMinMs) {
      const r = callback(elapsed, ...args);
      if (typeof r === `object`) await r;
      trigger = performance.now();
    }
  };
};

// src/flow/UpdateOutdated.ts
var updateOutdated = (fn, interval2, updateFail = `slow`) => {
  let lastRun = 0;
  let lastValue;
  let intervalMsCurrent = intervalToMs(interval2, 1e3);
  return () => (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    new Promise(async (resolve, reject) => {
      const elapsed = performance.now() - lastRun;
      if (lastValue === void 0 || elapsed > intervalMsCurrent) {
        try {
          lastRun = performance.now();
          lastValue = await fn(elapsed);
          intervalMsCurrent = intervalToMs(interval2, 1e3);
        } catch (error) {
          if (updateFail === `fast`) {
            lastValue = void 0;
            lastRun = 0;
          } else if (updateFail === `backoff`) {
            intervalMsCurrent = Math.floor(intervalMsCurrent * 1.2);
          }
          reject(error);
          return;
        }
      }
      resolve(lastValue);
    })
  );
};

// src/flow/WaitFor.ts
var waitFor = (timeoutMs, onAborted, onComplete) => {
  let t;
  let success = false;
  const done = (error) => {
    if (t !== void 0) {
      window.clearTimeout(t);
      t = void 0;
    }
    if (error) {
      onAborted(error);
    } else {
      success = true;
    }
    if (onComplete !== void 0) onComplete(success);
  };
  t = globalThis.setTimeout(() => {
    t = void 0;
    try {
      onAborted(`Timeout after ${timeoutMs}ms`);
    } finally {
      if (onComplete !== void 0) onComplete(success);
    }
  }, timeoutMs);
  return done;
};

// src/flow/WaitForValue.ts
var WaitForValue = class {
  #promise;
  #resolve;
  #written = false;
  constructor() {
    const { promise, resolve } = promiseWithResolvers();
    this.#promise = promise;
    this.#resolve = resolve;
  }
  get() {
    return this.#promise;
  }
  add(value) {
    if (this.#written) throw new Error(`QueueSingleUse has already been used`);
    this.#written = true;
    this.#resolve(value);
  }
  /**
   * Returns _true_ if a value has been added
   * and therefore no more values can be written
   */
  get isUsed() {
    return this.#written;
  }
};
var singleItem = () => new WaitForValue();

export {
  timeout,
  rateMinimum,
  DispatchList,
  continuously,
  sleep,
  sleepWhile,
  BehaviourTree_exports,
  debounce,
  delay,
  delayLoop,
  everyNth,
  forEach,
  forEachAsync,
  interval,
  promiseFromEvent,
  promiseWithResolvers,
  repeatAwait,
  repeat,
  RequestResponseMatch,
  backoffGenerator,
  retryFunction,
  retryTask,
  runOnce,
  SyncWait,
  TaskQueueMutable,
  throttle,
  updateOutdated,
  waitFor,
  WaitForValue,
  singleItem,
  flow_exports
};
//# sourceMappingURL=chunk-RNUQGND2.js.map