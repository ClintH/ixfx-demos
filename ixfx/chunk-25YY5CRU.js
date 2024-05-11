import {
  SvgElements_exports,
  Svg_exports
} from "./chunk-CO2IP74V.js";
import {
  Video_exports
} from "./chunk-OLTRXGL7.js";
import {
  NumberTracker,
  PrimitiveTracker,
  TrackedValueMap,
  TrackerBase,
  numberTracker
} from "./chunk-R6QB4GYU.js";
import {
  floatSource,
  interpolate,
  interpolateAngle,
  interpolatorInterval,
  interpolatorStepped
} from "./chunk-ZESXYRA7.js";
import {
  Forms_exports
} from "./chunk-YURVZ2AM.js";
import {
  ImageDataGrid_exports,
  Placeholder,
  Scaler_exports,
  Vector_exports,
  angle,
  cardinal,
  clamp as clamp2,
  corners,
  corners2,
  distance,
  distanceToExterior,
  empty,
  emptyPositioned,
  getPointParameter,
  guard,
  intersectsPoint,
  isCubicBezier,
  isEqualSize,
  isLine,
  isPlaceholder,
  isQuadraticBezier,
  line_exports,
  multiply,
  multiply2,
  placeholder,
  placeholderPositioned,
  point_exports,
  rect_exports,
  relation,
  scale,
  scaleClamped,
  scalePercent,
  scalePercentages,
  scaler,
  scalerPercent,
  subtract,
  subtract2
} from "./chunk-FUZHXQHR.js";
import {
  Colour_exports,
  opacity,
  randomHue,
  wrap,
  wrapInteger,
  wrapRange
} from "./chunk-3XE462OU.js";
import {
  DispatchList,
  StateMachine_exports,
  continuously,
  timeout
} from "./chunk-XGTRFTA7.js";
import {
  resolveEl,
  resolveEls
} from "./chunk-L3UAAAAG.js";
import {
  clamp,
  clampIndex
} from "./chunk-2U2UFSNC.js";
import {
  Map_exports,
  NumberMap,
  StackImmutable,
  immutable,
  ofArrayMutable,
  ofCircularMutable
} from "./chunk-QNC5EXX7.js";
import {
  PriorityMutable
} from "./chunk-YPZEBOSD.js";
import {
  SimpleEventEmitter
} from "./chunk-5BFMO22S.js";
import {
  compareArrays
} from "./chunk-CRTFMN7Y.js";
import {
  Immutable_exports,
  getField,
  getPaths,
  getPathsAndData,
  map as map2,
  require_dist
} from "./chunk-QNHSDXZP.js";
import {
  round
} from "./chunk-VYSWKRXA.js";
import {
  StackMutable,
  map
} from "./chunk-LLEN4PGD.js";
import {
  afterMatch,
  beforeMatch
} from "./chunk-67EP4MRJ.js";
import {
  QueueMutable
} from "./chunk-KAHSJ6KJ.js";
import {
  KeyValue_exports,
  getSorter,
  isPrimitive
} from "./chunk-XWCACJL7.js";
import {
  arrays_exports,
  average,
  averageWeighted,
  getFromKeys,
  insertAt,
  minIndex,
  minMaxAvg,
  remove,
  shuffle,
  zipKeyValue
} from "./chunk-YOQ54OW2.js";
import {
  ifNaN,
  intervalToMs,
  isAsyncIterable,
  isEqualValueDefault,
  isIterable,
  isPlainObjectOrPrimitive,
  nextWithTimeout,
  roundUpToMultiple,
  sleep,
  toStringDefault2 as toStringDefault
} from "./chunk-Z5PR74I2.js";
import {
  numberTest,
  throwArrayTest,
  throwNumberTest
} from "./chunk-LTXP53ZM.js";
import {
  getErrorMessage,
  logSet
} from "./chunk-EKX6PMDK.js";
import {
  __export,
  __toESM
} from "./chunk-Q2EHUQVZ.js";

// src/rx/index.ts
var rx_exports = {};
__export(rx_exports, {
  Dom: () => Dom_exports,
  From: () => sources_exports,
  Ops: () => Ops,
  annotate: () => annotate,
  annotateElapsed: () => annotateElapsed,
  batch: () => batch,
  cloneFromFields: () => cloneFromFields,
  combineLatestToArray: () => combineLatestToArray,
  combineLatestToObject: () => combineLatestToObject,
  count: () => count,
  debounce: () => debounce,
  field: () => field,
  filter: () => filter,
  hasLast: () => hasLast,
  isDisposable: () => isDisposable,
  isReactive: () => isReactive,
  isTrigger: () => isTrigger,
  isTriggerFunction: () => isTriggerFunction,
  isTriggerGenerator: () => isTriggerGenerator,
  isTriggerValue: () => isTriggerValue,
  isWrapped: () => isWrapped,
  manual: () => manual,
  messageHasValue: () => messageHasValue,
  messageIsDoneSignal: () => messageIsDoneSignal,
  messageIsSignal: () => messageIsSignal,
  opify: () => opify,
  pipe: () => pipe,
  prepare: () => prepare,
  resolveSource: () => resolveSource,
  resolveTriggerValue: () => resolveTriggerValue,
  run: () => run,
  singleFromArray: () => singleFromArray,
  split: () => split,
  splitLabelled: () => splitLabelled,
  switcher: () => switcher,
  symbol: () => symbol,
  syncToArray: () => syncToArray,
  syncToObject: () => syncToObject,
  takeNextValue: () => takeNextValue,
  throttle: () => throttle,
  timeoutTrigger: () => timeoutTrigger,
  to: () => to,
  toArray: () => toArray,
  toArrayOrThrow: () => toArrayOrThrow,
  toGenerator: () => toGenerator,
  transform: () => transform,
  withValue: () => withValue,
  wrap: () => wrap2
});

// src/rx/Util.ts
function messageIsSignal(message) {
  if (message.value !== void 0)
    return false;
  if (`signal` in message && message.signal !== void 0)
    return true;
  return false;
}
function messageIsDoneSignal(message) {
  if (message.value !== void 0)
    return false;
  if (`signal` in message && message.signal === `done`)
    return true;
  return false;
}
function messageHasValue(v) {
  if (v.value !== void 0)
    return true;
  return false;
}
var hasLast = (rx) => {
  if (!isReactive(rx))
    return false;
  if (`last`) {
    const v = rx.last();
    if (v !== void 0)
      return true;
  }
  return false;
};
var isReactive = (rx) => {
  if (typeof rx !== `object`)
    return false;
  return `on` in rx && `value` in rx;
};
var isDisposable = (v) => {
  return `isDisposed` in v && `dispose` in v;
};
var isWrapped = (v) => {
  if (typeof v !== `object`)
    return false;
  if (!(`source` in v))
    return false;
  if (!(`annotateElapsed` in v))
    return false;
  return true;
};
var opify = (fn, ...args) => {
  return (source) => {
    return fn(source, ...args);
  };
};
var isTriggerValue = (t) => `value` in t;
var isTriggerFunction = (t) => `fn` in t;
var isTriggerGenerator = (t) => isIterable(t);
var isTrigger = (t) => {
  if (typeof t !== `object`)
    return false;
  if (isTriggerValue(t))
    return true;
  if (isTriggerFunction(t))
    return true;
  if (isTriggerGenerator(t))
    return true;
  return false;
};
function resolveTriggerValue(t) {
  if (isTriggerValue(t))
    return [t.value, false];
  if (isTriggerFunction(t)) {
    const v = t.fn();
    if (v === void 0)
      return [void 0, true];
    return [v, false];
  }
  if (isTriggerGenerator(t)) {
    const v = t.gen.next();
    if (v.done)
      return [void 0, true];
    return [v.value, false];
  }
  throw new Error(`Invalid trigger. Missing 'value' or 'fn' fields`);
}

// src/rx/sources/Function.ts
function func(callback, options = {}) {
  const maximumRepeats = options.maximumRepeats ?? Number.MAX_SAFE_INTEGER;
  const closeOnError = options.closeOnError ?? true;
  const interval = intervalToMs(options.interval, 1);
  const loop = options.interval !== void 0;
  const predelay = intervalToMs(options.predelay, 1);
  const lazy = options.lazy ?? `very`;
  const signal = options.signal;
  const internalAbort = new AbortController();
  const internalAbortCallback = (reason) => {
    internalAbort.abort(reason);
  };
  let sentResults = 0;
  if (options.maximumRepeats && !loop)
    throw new Error(`'maximumRepeats' has no purpose if 'loop' is not set to true`);
  const done = (reason) => {
    events.dispose(reason);
    run2.cancel();
  };
  const run2 = continuously(async () => {
    if (predelay)
      await sleep(predelay);
    try {
      if (signal?.aborted) {
        done(`Signal (${signal.aborted})`);
        return false;
      }
      const value = await callback(internalAbortCallback);
      events.set(value);
      sentResults++;
    } catch (error) {
      if (closeOnError) {
        done(`Function error: ${getErrorMessage(error)}`);
        return false;
      } else {
        events.signal(`warn`, getErrorMessage(error));
      }
    }
    if (!loop) {
      done(`fromFunction done`);
      return false;
    }
    if (internalAbort.signal.aborted) {
      done(`callback function aborted (${internalAbort.signal.reason})`);
      return false;
    }
    if (sentResults >= maximumRepeats) {
      done(`Maximum repeats reached ${maximumRepeats.toString()}`);
      return false;
    }
  }, interval);
  const events = initLazyStream({
    lazy,
    onStart() {
      run2.start();
    },
    onStop() {
      run2.cancel();
    }
  });
  if (lazy === `never`)
    run2.start();
  return events;
}

// src/rx/sources/Iterator.ts
function iterator(source, options = {}) {
  const lazy = options.lazy ?? `very`;
  const log2 = options.traceLifecycle ? (message) => {
    console.log(`Rx.From.Generator ${message}`);
  } : (_) => {
  };
  const readIntervalMs = intervalToMs(options.readInterval, 5);
  const readTimeoutMs = intervalToMs(options.readTimeout, 5 * 60 * 1e3);
  const whenStopped = options.whenStopped ?? `continue`;
  let iterator2;
  let ourAc;
  let sm = StateMachine_exports.init({
    idle: [`wait_for_next`],
    wait_for_next: [`processing_result`, `stopping`, `disposed`],
    processing_result: [`queued`, `disposed`, `stopping`],
    queued: [`wait_for_next`, `disposed`, `stopping`],
    stopping: `idle`,
    // eslint-disable-next-line unicorn/no-null
    disposed: null
  }, `idle`);
  const onExternalSignal = () => {
    log2(`onExternalSignal`);
    ourAc?.abort(options.signal?.reason);
  };
  if (options.signal) {
    options.signal.addEventListener(`abort`, onExternalSignal, { once: true });
  }
  ;
  const read = async () => {
    log2(`read. State: ${sm.value}`);
    ourAc = new AbortController();
    try {
      sm = StateMachine_exports.to(sm, `wait_for_next`);
      const v = await nextWithTimeout(iterator2, { signal: ourAc.signal, millis: readTimeoutMs });
      sm = StateMachine_exports.to(sm, `processing_result`);
      ourAc?.abort(`nextWithTimeout completed`);
      if (v.done) {
        log2(`read v.done true`);
        events.dispose(`Generator complete`);
        sm = StateMachine_exports.to(sm, `disposed`);
      }
      if (sm.value === `stopping`) {
        log2(`read. sm.value = stopping`);
        sm = StateMachine_exports.to(sm, `idle`);
        return;
      }
      if (sm.value === `disposed`) {
        log2(`read. sm.value = disposed`);
        return;
      }
      events.set(v.value);
    } catch (error) {
      events.dispose(`Generator error: ${error.toString()}`);
      return;
    }
    if (sm.value === `processing_result`) {
      sm = StateMachine_exports.to(sm, `queued`);
      log2(`scheduling read. State: ${sm.value}`);
      setTimeout(read, readIntervalMs);
    } else {
      sm = StateMachine_exports.to(sm, `idle`);
    }
  };
  const events = initLazyStream({
    ...options,
    lazy,
    onStart() {
      log2(`onStart state: ${sm.value} whenStopped: ${whenStopped}`);
      if (sm.value !== `idle`)
        return;
      if (sm.value === `idle` && whenStopped === `reset` || iterator2 === void 0) {
        iterator2 = isAsyncIterable(source) ? source[Symbol.asyncIterator]() : source[Symbol.iterator]();
      }
      void read();
    },
    onStop() {
      log2(`onStop state: ${sm.value} whenStopped: ${whenStopped}`);
      sm = StateMachine_exports.to(sm, `stopping`);
      if (whenStopped === `reset`) {
        log2(`onStop reiniting iterator`);
        iterator2 = isAsyncIterable(source) ? source[Symbol.asyncIterator]() : source[Symbol.iterator]();
      }
    },
    onDispose(reason) {
      log2(`onDispose (${reason})`);
      ourAc?.abort(`Rx.fromGenerator disposed (${reason})`);
      if (options.signal)
        options.signal.removeEventListener(`abort`, onExternalSignal);
    }
  });
  return events;
}

// src/rx/ResolveSource.ts
var resolveSource = (source, options = {}) => {
  if (isReactive(source))
    return source;
  const generatorOptions = options.generator ?? { lazy: `initial`, interval: 5 };
  const functionOptions = options.function ?? { lazy: `very` };
  if (Array.isArray(source)) {
    return iterator(source.values(), generatorOptions);
  } else if (typeof source === `function`) {
    return func(source, functionOptions);
  } else if (typeof source === `object`) {
    if (isWrapped(source)) {
      return source.source;
    }
    if (isIterable(source) || isAsyncIterable(source)) {
      return iterator(source, generatorOptions);
    }
  }
  throw new TypeError(`Unable to resolve source. Supports: array, Reactive, Async/Iterable. Got type: ${typeof source}`);
};

// src/rx/InitStream.ts
var initUpstream = (upstreamSource, options) => {
  const lazy = options.lazy ?? `initial`;
  const disposeIfSourceDone = options.disposeIfSourceDone ?? true;
  const onValue = options.onValue ?? ((_v) => {
  });
  const source = resolveSource(upstreamSource);
  let unsub;
  const start = () => {
    if (unsub !== void 0)
      return;
    if (options.onStart)
      options.onStart();
    unsub = source.on((value) => {
      if (messageIsSignal(value)) {
        if (value.signal === `done`) {
          stop();
          if (disposeIfSourceDone)
            events.dispose(`Upstream source has completed (${value.context ?? ``})`);
        } else {
          events.through(value);
        }
      } else if (messageHasValue(value)) {
        onValue(value.value);
      }
    });
  };
  const stop = () => {
    if (unsub === void 0)
      return;
    unsub();
    unsub = void 0;
    if (options.onStop)
      options.onStop();
  };
  const events = initLazyStream({
    ...options,
    lazy,
    onStart() {
      start();
    },
    onStop() {
      stop();
    }
  });
  return events;
};
function initLazyStream(options) {
  const lazy = options.lazy ?? `initial`;
  const onStop = options.onStop ?? (() => {
  });
  const onStart = options.onStart ?? (() => {
  });
  const events = initStream({
    ...options,
    onFirstSubscribe() {
      if (lazy !== `never`)
        onStart();
    },
    onNoSubscribers() {
      if (lazy === `very`)
        onStop();
    }
  });
  if (lazy === `never`)
    onStart();
  return events;
}
function initStream(options = {}) {
  let dispatcher;
  let disposed = false;
  let firstSubscribe = false;
  let emptySubscriptions = true;
  const onFirstSubscribe = options.onFirstSubscribe ?? void 0;
  const onNoSubscribers = options.onNoSubscribers ?? void 0;
  const isEmpty = () => {
    if (dispatcher === void 0)
      return;
    if (!dispatcher.isEmpty)
      return;
    if (!emptySubscriptions) {
      emptySubscriptions = true;
      firstSubscribe = false;
      if (onNoSubscribers)
        onNoSubscribers();
    }
  };
  const subscribe = (handler) => {
    if (disposed)
      throw new Error(`Disposed, cannot subscribe`);
    if (dispatcher === void 0)
      dispatcher = new DispatchList();
    const id = dispatcher.add(handler);
    emptySubscriptions = false;
    if (!firstSubscribe) {
      firstSubscribe = true;
      if (onFirstSubscribe)
        setTimeout(() => {
          onFirstSubscribe();
        }, 10);
    }
    return () => {
      dispatcher?.remove(id);
      isEmpty();
    };
  };
  return {
    dispose: (reason) => {
      if (disposed)
        return;
      dispatcher?.notify({ value: void 0, signal: `done`, context: `Disposed: ${reason}` });
      disposed = true;
      if (options.onDispose)
        options.onDispose(reason);
    },
    isDisposed: () => {
      return disposed;
    },
    reset: () => {
      dispatcher?.clear();
      isEmpty();
    },
    set: (v) => {
      if (disposed)
        throw new Error(`Disposed, cannot set`);
      dispatcher?.notify({ value: v });
    },
    through: (pass) => {
      if (disposed)
        throw new Error(`Disposed, cannot through`);
      dispatcher?.notify(pass);
    },
    signal: (signal, context) => {
      if (disposed)
        throw new Error(`Disposed, cannot signal`);
      dispatcher?.notify({ signal, value: void 0, context });
    },
    on: (handler) => subscribe(handler),
    value: (handler) => {
      const unsub = subscribe((message) => {
        if (messageHasValue(message)) {
          handler(message.value);
        }
      });
      return unsub;
    }
  };
}

// src/rx/ToReadable.ts
var toReadable = (upstream) => ({
  on: upstream.on,
  dispose: upstream.dispose,
  isDisposed: upstream.isDisposed,
  value: upstream.value
});

// src/rx/ops/Annotate.ts
function annotate(input, transformer, options = {}) {
  const upstream = initUpstream(input, {
    ...options,
    onValue(value) {
      const t = transformer(value);
      upstream.set(t);
    }
  });
  return toReadable(upstream);
}
var annotateElapsed = (input) => {
  let last = 0;
  return annotate(input, (value) => {
    const elapsed = last === 0 ? 0 : Date.now() - last;
    last = Date.now();
    return { ...value, elapsedMs: elapsed };
  });
};

// src/rx/ops/Batch.ts
function batch(batchSource, options = {}) {
  const queue = new QueueMutable();
  const quantity = options.quantity ?? 0;
  const returnRemainder = options.returnRemainder ?? true;
  const upstreamOpts = {
    ...options,
    onStop() {
      if (returnRemainder && !queue.isEmpty) {
        const data = queue.toArray();
        queue.clear();
        upstream.set(data);
      }
    },
    onValue(value) {
      queue.enqueue(value);
      if (quantity > 0 && queue.length >= quantity) {
        send();
      }
      if (timer !== void 0 && timer.runState === `idle`) {
        timer.start();
      }
    }
  };
  const upstream = initUpstream(batchSource, upstreamOpts);
  const send = () => {
    if (queue.isEmpty)
      return;
    if (timer !== void 0)
      timer.start();
    const data = queue.toArray();
    queue.clear();
    upstream.set(data);
  };
  const timer = options.elapsed ? timeout(send, options.elapsed) : void 0;
  return toReadable(upstream);
}

// src/rx/ops/Transform.ts
function transform(input, transformer, options = {}) {
  const upstream = initUpstream(input, {
    lazy: `initial`,
    ...options,
    onValue(value) {
      const t = transformer(value);
      upstream.set(t);
    }
  });
  return toReadable(upstream);
}

// src/rx/ops/CloneFromFields.ts
var cloneFromFields = (source) => {
  return transform(source, (v) => {
    const entries = [];
    for (const field2 in v) {
      const value = v[field2];
      if (isPlainObjectOrPrimitive(value)) {
        entries.push([field2, value]);
      }
    }
    return Object.fromEntries(entries);
  });
};

// src/rx/ops/CombineLatestToArray.ts
function combineLatestToArray(reactiveSources, options = {}) {
  const event2 = initStream();
  const onSourceDone = options.onSourceDone ?? `break`;
  const data = [];
  const sources = reactiveSources.map((source) => resolveSource(source));
  const noop = () => {
  };
  const sourceOff = sources.map((_) => noop);
  const doneSources = sources.map((_) => false);
  const unsub = () => {
    for (const v of sourceOff) {
      v();
    }
  };
  for (const [index, v] of sources.entries()) {
    data[index] = void 0;
    sourceOff[index] = v.on((message) => {
      if (messageIsDoneSignal(message)) {
        doneSources[index] = true;
        sourceOff[index]();
        sourceOff[index] = noop;
        if (onSourceDone === `break`) {
          unsub();
          event2.dispose(`Source has completed and 'break' is set`);
          return;
        }
        if (!doneSources.includes(false)) {
          unsub();
          event2.dispose(`All sources completed`);
        }
      } else if (messageHasValue(message)) {
        data[index] = message.value;
        event2.set([...data]);
      }
    });
  }
  return {
    on: event2.on,
    value: event2.value
  };
}

// src/rx/ops/CombineLatestToObject.ts
function combineLatestToObject(reactiveSources, options = {}) {
  const disposeSources = options.disposeSources ?? true;
  const event2 = initStream();
  const onSourceDone = options.onSourceDone ?? `break`;
  const states = /* @__PURE__ */ new Map();
  for (const [key, source] of Object.entries(reactiveSources)) {
    const s = {
      source: resolveSource(source),
      done: false,
      data: void 0,
      off: () => {
      }
    };
    states.set(key, s);
  }
  const someUnfinished = () => Map_exports.some(states, (v) => !v.done);
  const unsub = () => {
    for (const state of states.values())
      state.off();
  };
  const getData = () => {
    const r = {};
    for (const [key, state] of states) {
      r[key] = state.data;
    }
    return r;
  };
  for (const state of states.values()) {
    state.off = state.source.on((message) => {
      if (messageIsDoneSignal(message)) {
        state.done = true;
        state.off();
        state.off = () => {
        };
        if (onSourceDone === `break`) {
          unsub();
          event2.dispose(`Source has completed and 'break' is behaviour`);
          return;
        }
        if (!someUnfinished()) {
          unsub();
          event2.dispose(`All sources completed`);
        }
      } else if (messageHasValue(message)) {
        state.data = message.value;
        event2.set(getData());
      }
    });
  }
  return {
    on: event2.on,
    value: event2.value,
    dispose(reason) {
      unsub();
      event2.dispose(reason);
      if (disposeSources) {
        for (const v of states.values()) {
          if (isDisposable(v.source)) {
            v.source.dispose(`Part of disposed mergeToObject`);
          }
        }
      }
    },
    isDisposed() {
      return event2.isDisposed();
    }
  };
}

// src/rx/ops/Debounce.ts
function debounce(source, options = {}) {
  const elapsed = intervalToMs(options.elapsed, 50);
  let lastValue;
  const timer = timeout(() => {
    const v = lastValue;
    if (v) {
      upstream.set(v);
      lastValue = void 0;
    }
  }, elapsed);
  const upstream = initUpstream(source, {
    ...options,
    onValue(value) {
      lastValue = value;
      timer.start();
    }
  });
  return toReadable(upstream);
}

// src/rx/ops/Field.ts
function field(fieldSource, fieldName, options = {}) {
  const handleMissing = `missingFieldDefault` in options;
  const upstream = initUpstream(fieldSource, {
    disposeIfSourceDone: true,
    ...options,
    onValue(value) {
      if (fieldName in value) {
        upstream.set(value[fieldName]);
      } else {
        if (handleMissing) {
          upstream.set(options.missingFieldDefault);
        }
      }
    }
  });
  return toReadable(upstream);
}

// src/rx/ops/Filter.ts
function filter(input, predicate, options) {
  const upstream = initUpstream(input, {
    ...options,
    onValue(value) {
      if (predicate(value)) {
        upstream.set(value);
      }
    }
  });
  return toReadable(upstream);
}

// src/rx/ops/Pipe.ts
var pipe = (...streams) => {
  const event2 = initStream();
  const unsubs = [];
  const performDispose = (reason) => {
    for (const s of streams) {
      if (isDisposable(s) && !s.isDisposed)
        s.dispose(reason);
    }
    for (const s of unsubs) {
      s();
    }
    event2.dispose(reason);
  };
  for (let index = 0; index < streams.length; index++) {
    unsubs.push(streams[index].on((message) => {
      const isLast = index === streams.length - 1;
      if (messageHasValue(message)) {
        if (isLast) {
          event2.set(message.value);
        } else {
          streams[index + 1].set(message.value);
        }
      } else if (messageIsDoneSignal(message)) {
        performDispose(`Upstream disposed`);
      }
    }));
  }
  return {
    on: event2.on,
    value: event2.value,
    dispose(reason) {
      performDispose(reason);
    },
    isDisposed() {
      return event2.isDisposed();
    }
  };
};

// src/rx/ops/SingleFromArray.ts
function singleFromArray(source, options = {}) {
  const order = options.order ?? `default`;
  if (!options.at && !options.predicate)
    throw new Error(`Options must have 'predicate' or 'at' fields`);
  let preprocess = (values) => values;
  if (order === `random`)
    preprocess = shuffle;
  else if (typeof order === `function`)
    preprocess = (values) => values.toSorted(order);
  const upstream = initUpstream(source, {
    onValue(values) {
      values = preprocess(values);
      if (options.predicate) {
        for (const v of values) {
          if (options.predicate(v)) {
            upstream.set(v);
          }
        }
      } else if (options.at) {
        upstream.set(values.at(options.at));
      }
    }
  });
  return upstream;
}

// src/rx/ops/Split.ts
var split = (r, options = {}) => {
  const quantity = options.quantity ?? 2;
  const outputs = [];
  const source = resolveSource(r);
  for (let index = 0; index < quantity; index++) {
    outputs.push(initUpstream(source, { disposeIfSourceDone: true, lazy: `initial` }));
  }
  return outputs;
};
var splitLabelled = (r, labels) => {
  const source = resolveSource(r);
  const t = {};
  for (const label of labels) {
    t[label] = initUpstream(source, { lazy: `initial`, disposeIfSourceDone: true });
  }
  return t;
};

// src/rx/ops/Switcher.ts
var switcher = (reactiveOrSource, cases, options = {}) => {
  const match = options.match ?? `first`;
  const source = resolveSource(reactiveOrSource);
  let disposed = false;
  const t = {};
  for (const label of Object.keys(cases)) {
    t[label] = initStream();
  }
  const performDispose = () => {
    if (disposed)
      return;
    unsub();
    disposed = true;
    for (const stream2 of Object.values(t)) {
      stream2.dispose(`switcher source dispose`);
    }
  };
  const unsub = source.on((message) => {
    if (messageHasValue(message)) {
      for (const [lbl, pred] of Object.entries(cases)) {
        if (pred(message.value)) {
          t[lbl].set(message.value);
          if (match === `first`)
            break;
        }
      }
    } else if (messageIsDoneSignal(message)) {
      performDispose();
    }
  });
  return t;
};

// src/rx/ops/SyncToArray.ts
function syncToArray(reactiveSources, options = {}) {
  const onSourceDone = options.onSourceDone ?? `break`;
  const finalValue = options.finalValue ?? `undefined`;
  const maximumWait = intervalToMs(options.maximumWait, 2e3);
  let watchdog;
  const data = [];
  const states = reactiveSources.map((source) => ({
    finalData: void 0,
    done: false,
    source: resolveSource(source),
    unsub: () => {
    }
  }));
  const unsubscribe = () => {
    for (const s of states) {
      s.unsub();
      s.unsub = () => {
      };
    }
  };
  const isDataSetComplete = () => {
    for (let index = 0; index < data.length; index++) {
      if (onSourceDone === `allow` && states[index].done)
        continue;
      if (data[index] === void 0)
        return false;
    }
    return true;
  };
  const hasIncompleteSource = () => states.some((s) => !s.done);
  const resetDataSet = () => {
    for (let index = 0; index < data.length; index++) {
      if (finalValue === `last` && states[index].done)
        continue;
      data[index] = void 0;
    }
  };
  const onWatchdog = () => {
    done(`Sync timeout exceeded (${maximumWait.toString()})`);
  };
  const done = (reason) => {
    if (watchdog)
      clearTimeout(watchdog);
    unsubscribe();
    event2.dispose(reason);
  };
  const init2 = () => {
    watchdog = setTimeout(onWatchdog, maximumWait);
    for (const [index, state] of states.entries()) {
      data[index] = void 0;
      state.unsub = state.source.on((valueChanged) => {
        if (messageIsSignal(valueChanged)) {
          if (valueChanged.signal === `done`) {
            state.finalData = data[index];
            state.unsub();
            state.done = true;
            state.unsub = () => {
            };
            if (finalValue === `undefined`)
              data[index] = void 0;
            if (onSourceDone === `break`) {
              done(`Source '${index.toString()}' done, and onSourceDone:'break' is set`);
              return;
            }
            if (!hasIncompleteSource()) {
              done(`All sources done`);
              return;
            }
          }
          return;
        }
        data[index] = valueChanged.value;
        if (isDataSetComplete()) {
          event2.set([...data]);
          resetDataSet();
          if (watchdog)
            clearTimeout(watchdog);
          watchdog = setTimeout(onWatchdog, maximumWait);
        }
      });
    }
  };
  const event2 = initStream({
    onFirstSubscribe() {
      unsubscribe();
      init2();
    },
    onNoSubscribers() {
      if (watchdog)
        clearTimeout(watchdog);
      unsubscribe();
    }
  });
  return {
    on: event2.on,
    value: event2.value
  };
}

// src/rx/ops/SyncToObject.ts
function syncToObject(reactiveSources, options = {}) {
  const keys = Object.keys(reactiveSources);
  const values = Object.values(reactiveSources);
  const s = syncToArray(values, options);
  const st = transform(s, (streamValues) => {
    return zipKeyValue(keys, streamValues);
  });
  return st;
}

// src/rx/ops/Throttle.ts
function throttle(throttleSource, options = {}) {
  const elapsed = intervalToMs(options.elapsed, 0);
  let lastFire = performance.now();
  let lastValue;
  const upstream = initUpstream(throttleSource, {
    ...options,
    onValue(value) {
      lastValue = value;
      trigger();
    }
  });
  const trigger = () => {
    const now = performance.now();
    if (elapsed > 0 && now - lastFire > elapsed) {
      lastFire = now;
      if (lastValue !== void 0) {
        upstream.set(lastValue);
      }
    }
  };
  return toReadable(upstream);
}

// src/rx/ops/TimeoutTrigger.ts
function timeoutTrigger(source, options) {
  let timer;
  const immediate = options.immediate ?? true;
  const timeoutMs = intervalToMs(options.interval, 1e3);
  if (!isTrigger(options)) {
    throw new Error(`Param 'options' does not contain trigger 'value' or 'fn' fields`);
  }
  const sendFallback = () => {
    const [value, done] = resolveTriggerValue(options);
    if (done) {
      events.dispose(`Trigger completed`);
    } else {
      events.set(value);
    }
  };
  const events = initUpstream(source, {
    disposeIfSourceDone: true,
    onValue(v) {
      if (timer)
        clearTimeout(timer);
      timer = setTimeout(sendFallback, timeoutMs);
      events.set(v);
    },
    onDispose() {
      if (timer)
        clearTimeout(timer);
    }
  });
  if (immediate && !timer) {
    timer = setTimeout(sendFallback, timeoutMs);
  }
  return events;
}

// src/rx/ops/WithValue.ts
function withValue(input, options) {
  let lastValue = options.initial;
  const upstream = initUpstream(input, {
    ...options,
    onValue(value) {
      lastValue = value;
      upstream.set(value);
    }
  });
  const readable = toReadable(upstream);
  return {
    ...readable,
    // @ts-expect-error
    last() {
      return lastValue;
    }
  };
}

// src/data/graphs/DirectedGraph.ts
var DirectedGraph_exports = {};
__export(DirectedGraph_exports, {
  adjacentVertices: () => adjacentVertices,
  areAdjacent: () => areAdjacent,
  bfs: () => bfs,
  clone: () => clone,
  connect: () => connect,
  connectTo: () => connectTo,
  createVertex: () => createVertex,
  dfs: () => dfs,
  disconnect: () => disconnect,
  distance: () => distance2,
  distanceDefault: () => distanceDefault,
  dumpGraph: () => dumpGraph,
  edges: () => edges,
  getCycles: () => getCycles,
  getOrCreate: () => getOrCreate,
  getOrFail: () => getOrFail,
  graph: () => graph,
  graphFromVertices: () => graphFromVertices,
  hasNoOuts: () => hasNoOuts,
  hasOnlyOuts: () => hasOnlyOuts,
  hasOut: () => hasOut,
  isAcyclic: () => isAcyclic,
  pathDijkstra: () => pathDijkstra,
  toAdjacencyMatrix: () => toAdjacencyMatrix,
  topologicalSort: () => topologicalSort,
  transitiveReduction: () => transitiveReduction,
  updateGraphVertex: () => updateGraphVertex,
  vertexHasOut: () => vertexHasOut,
  vertices: () => vertices
});

// src/data/Table.ts
var Table = class {
  rows = [];
  rowLabels = [];
  colLabels = [];
  labelColumns(...labels) {
    this.colLabels = labels;
  }
  labelColumn(columnNumber, label) {
    this.colLabels[columnNumber] = label;
  }
  getColumnLabelIndex(label) {
    for (const [index, l] of this.colLabels.entries()) {
      if (l === label)
        return index;
    }
  }
  print() {
    console.table([...this.rowsWithLabelsObject()]);
  }
  *rowsWithLabelsArray() {
    for (let index = 0; index < this.rows.length; index++) {
      const labelledRow = this.getRowWithLabelsArray(index);
      yield labelledRow;
    }
  }
  /**
   * Return a copy of table as nested array
   * ```js
   * const t = new Table();
   * // add stuff
   * // ...
   * const m = t.asArray();
   * for (const row of m) {
   *  for (const colValue of row) {
   *    // iterate over all column values for this row
   *  }
   * }
   * ```
   * 
   * Alternative: get value at row Y and column X
   * ```js
   * const value = m[y][x];
   * ```
   * @returns 
   */
  asArray() {
    const r = [];
    for (const row of this.rows) {
      if (row === void 0)
        r.push([]);
      else
        r.push([...row]);
    }
    return r;
  }
  /**
   * Return the number of rows
   */
  get rowCount() {
    return this.rows.length;
  }
  /**
   * Return the maximum number of columns in any row
   */
  get columnCount() {
    const lengths = this.rows.map((row) => row.length);
    return Math.max(...lengths);
  }
  *rowsWithLabelsObject() {
    for (let index = 0; index < this.rows.length; index++) {
      const labelledRow = this.getRowWithLabelsObject(index);
      yield labelledRow;
    }
  }
  labelRows(...labels) {
    this.rowLabels = labels;
  }
  appendRow(...data) {
    this.rows.push(data);
  }
  getRowWithLabelsArray(rowNumber) {
    const row = this.rows.at(rowNumber);
    if (row === void 0)
      return void 0;
    return row.map((value, index) => [this.colLabels.at(index), value]);
  }
  /**
   * Return a row of objects. Keys use the column labels.
   * 
   * ```js
   * const row = table.getRowWithLabelsObject(10);
   * // eg:
   * // [{ colour: red, size: 10}, { colour: blue, size: 20 }]
   * ```
   * @param rowNumber 
   * @returns 
   */
  getRowWithLabelsObject(rowNumber) {
    const row = this.rows.at(rowNumber);
    if (row === void 0)
      return void 0;
    const object2 = {};
    for (let index = 0; index < this.colLabels.length; index++) {
      const label = this.colLabels.at(index) ?? index.toString();
      object2[label] = row[index];
    }
    return object2;
  }
  /**
   * Gets or creates a row at `rowNumber`.
   * @param rowNumber 
   * @returns 
   */
  getOrCreateRow(rowNumber) {
    let row = this.rows.at(rowNumber);
    if (row === void 0) {
      row = [];
      this.rows[rowNumber] = row;
    }
    return row;
  }
  /**
   * Gets the values at `rowNumber`
   * @param rowNumber 
   * @returns 
   */
  row(rowNumber) {
    return this.rows.at(rowNumber);
  }
  /**
   * Set the value of row,column to `value`
   * @param rowNumber 
   * @param columnNumber 
   * @param value 
   */
  set(rowNumber, columnNumber, value) {
    const row = this.getOrCreateRow(rowNumber);
    row[columnNumber] = value;
  }
  get(rowNumber, column) {
    const row = this.getOrCreateRow(rowNumber);
    const index = typeof column === `number` ? column : this.getColumnLabelIndex(column);
    if (index === void 0)
      throw new Error(`Column not found: ${column}`);
    return row[index];
  }
  /**
   * For a given row number, set all the columns to `value`.
   * `cols` gives the number of columns to set
   * @param rowNumber 
   * @param cols 
   * @param value 
   */
  setRow(rowNumber, cols, value) {
    const row = this.getOrCreateRow(rowNumber);
    for (let columnNumber = 0; columnNumber < cols; columnNumber++) {
      row[columnNumber] = value;
    }
  }
};

// src/data/graphs/DirectedGraph.ts
var createVertex = (id) => {
  return {
    id,
    out: []
  };
};
function toAdjacencyMatrix(graph3) {
  const v = [...graph3.vertices.values()];
  const table = new Table();
  table.labelColumns(...v.map((vv) => vv.id));
  table.labelRows(...v.map((vv) => vv.id));
  for (let i = 0; i < v.length; i++) {
    table.setRow(i, v.length, false);
    const ii = v[i];
    for (const [j, jj] of v.entries()) {
      if (ii.out.some((o) => o.id === jj.id)) {
        table.set(i, j, true);
      }
    }
  }
  return table;
}
var dumpGraph = (graph3) => {
  const lines = debugGraphToArray(graph3);
  return lines.join(`
`);
};
var debugGraphToArray = (graph3) => {
  const r = [];
  const vertices2 = `vertices` in graph3 ? graph3.vertices.values() : graph3;
  for (const v of vertices2) {
    const str = debugDumpVertex(v);
    r.push(...str.map((line2) => ` ${line2}`));
  }
  return r;
};
var distance2 = (graph3, edge) => {
  if (edge.weight !== void 0)
    return edge.weight;
  return 1;
};
function* edges(graph3) {
  const vertices2 = [...graph3.vertices.values()];
  for (const vertex of vertices2) {
    for (const edge of vertex.out) {
      yield edge;
    }
  }
}
function* vertices(graph3) {
  const vertices2 = [...graph3.vertices.values()];
  for (const vertex of vertices2) {
    yield vertex;
  }
}
function* adjacentVertices(graph3, context) {
  if (context === void 0)
    return;
  const vertex = typeof context === `string` ? graph3.vertices.get(context) : context;
  if (vertex === void 0)
    throw new Error(`Vertex not found ${JSON.stringify(context)}`);
  for (const edge of vertex.out) {
    const edgeV = graph3.vertices.get(edge.id);
    if (edgeV === void 0)
      throw new Error(`Could not find vertex: ${edge.id}`);
    yield edgeV;
  }
}
var vertexHasOut = (vertex, outIdOrVertex) => {
  if (vertex === void 0)
    return false;
  const outId = typeof outIdOrVertex === `string` ? outIdOrVertex : outIdOrVertex.id;
  return vertex.out.some((edge) => edge.id === outId);
};
var hasNoOuts = (graph3, vertex) => {
  const context = typeof vertex === `string` ? graph3.vertices.get(vertex) : vertex;
  if (context === void 0)
    return false;
  return context.out.length === 0;
};
var hasOnlyOuts = (graph3, vertex, ...outIdOrVertex) => {
  const context = resolveVertex(graph3, vertex);
  const outs = outIdOrVertex.map((o) => resolveVertex(graph3, o));
  if (outs.length !== context.out.length) {
    return false;
  }
  for (const out of outs) {
    if (!hasOut(graph3, context, out)) {
      return false;
    }
  }
  return true;
};
var hasOut = (graph3, vertex, outIdOrVertex) => {
  const context = resolveVertex(graph3, vertex);
  const outId = typeof outIdOrVertex === `string` ? outIdOrVertex : outIdOrVertex.id;
  return context.out.some((edge) => edge.id === outId);
};
var getOrCreate = (graph3, id) => {
  const v = graph3.vertices.get(id);
  if (v !== void 0)
    return { graph: graph3, vertex: v };
  const vv = createVertex(id);
  const gg = updateGraphVertex(graph3, vv);
  return { graph: gg, vertex: vv };
};
var getOrFail = (graph3, id) => {
  const v = graph3.vertices.get(id);
  if (v === void 0)
    throw new Error(`Vertex '${id}' not found in graph`);
  return v;
};
var updateGraphVertex = (graph3, vertex) => {
  const gr = {
    ...graph3,
    vertices: graph3.vertices.set(vertex.id, vertex)
  };
  return gr;
};
var distanceDefault = (graph3, edge) => {
  if (edge.weight !== void 0)
    return edge.weight;
  return 1;
};
function disconnect(graph3, from, to2) {
  const fromV = resolveVertex(graph3, from);
  const toV = resolveVertex(graph3, to2);
  return hasOut(graph3, fromV, toV) ? updateGraphVertex(graph3, {
    ...fromV,
    out: fromV.out.filter((t) => t.id !== toV.id)
  }) : graph3;
}
function connectTo(graph3, from, to2, weight) {
  const fromResult = getOrCreate(graph3, from);
  graph3 = fromResult.graph;
  const toResult = getOrCreate(graph3, to2);
  graph3 = toResult.graph;
  const edge = {
    id: to2,
    weight
  };
  if (!hasOut(graph3, fromResult.vertex, toResult.vertex)) {
    graph3 = updateGraphVertex(graph3, {
      ...fromResult.vertex,
      // Add new edge to list of edges for this node
      out: [...fromResult.vertex.out, edge]
    });
  }
  return { graph: graph3, edge };
}
function connect(graph3, options) {
  const { to: to2, weight, from } = options;
  const bidi = options.bidi ?? false;
  const toList = Array.isArray(to2) ? to2 : [to2];
  for (const toSingle of toList) {
    const result = connectTo(graph3, from, toSingle, weight);
    graph3 = result.graph;
  }
  if (!bidi)
    return graph3;
  for (const toSingle of toList) {
    const result = connectTo(graph3, toSingle, from, weight);
    graph3 = result.graph;
  }
  return graph3;
}
var debugDumpVertex = (v) => {
  const r = [
    v.id
  ];
  const stringForEdge2 = (edge) => edge.weight === void 0 ? edge.id : `${edge.id} (${edge.weight})`;
  for (const edge of v.out) {
    r.push(` -> ${stringForEdge2(edge)}`);
  }
  if (v.out.length === 0)
    r[0] += ` (terminal)`;
  return r;
};
function areAdjacent(graph3, a, b) {
  if (hasOut(graph3, a, b.id))
    return true;
  if (hasOut(graph3, b, a.id))
    return true;
}
function resolveVertex(graph3, idOrVertex) {
  const v = typeof idOrVertex === `string` ? graph3.vertices.get(idOrVertex) : idOrVertex;
  if (v === void 0)
    throw new Error(`Id not found ${idOrVertex}`);
  return v;
}
function* bfs(graph3, startIdOrVertex, targetIdOrVertex) {
  const start = resolveVertex(graph3, startIdOrVertex);
  const target = targetIdOrVertex === void 0 ? void 0 : resolveVertex(graph3, targetIdOrVertex);
  const queue = new QueueMutable();
  const seen = /* @__PURE__ */ new Set();
  queue.enqueue(start);
  while (!queue.isEmpty) {
    const v = queue.dequeue();
    yield v;
    if (target !== void 0 && target === v)
      return;
    for (const edge of adjacentVertices(graph3, v)) {
      if (!seen.has(edge.id)) {
        seen.add(edge.id);
        queue.enqueue(resolveVertex(graph3, edge.id));
      }
    }
  }
}
function* dfs(graph3, startIdOrVertex) {
  const source = resolveVertex(graph3, startIdOrVertex);
  const s = new StackMutable();
  const seen = /* @__PURE__ */ new Set();
  s.push(source);
  while (!s.isEmpty) {
    const v = s.pop();
    if (v === void 0)
      continue;
    if (!seen.has(v.id)) {
      seen.add(v.id);
      yield v;
      for (const edge of v.out) {
        const destination = graph3.vertices.get(edge.id);
        if (destination) {
          s.push(destination);
        }
      }
    }
  }
}
var pathDijkstra = (graph3, sourceOrId) => {
  const source = typeof sourceOrId === `string` ? graph3.vertices.get(sourceOrId) : sourceOrId;
  if (source === void 0)
    throw new Error(`source vertex not found`);
  const distances = /* @__PURE__ */ new Map();
  const previous = /* @__PURE__ */ new Map();
  distances.set(source.id, 0);
  const pq = new PriorityMutable();
  const vertices2 = [...graph3.vertices.values()];
  for (const v of vertices2) {
    if (v.id !== source.id) {
      distances.set(v.id, Number.MAX_SAFE_INTEGER);
      previous.set(v.id, null);
    }
    pq.enqueueWithPriority(v.id, Number.MAX_SAFE_INTEGER);
  }
  while (!pq.isEmpty) {
    const u = pq.dequeueMin();
    if (u === void 0)
      throw new Error(`Bug. Queue unexpectedly empty`);
    const vertexU = graph3.vertices.get(u);
    for (const neighbour of vertexU.out) {
      const alt = distances.get(u) + distance2(graph3, neighbour);
      if (alt < distances.get(neighbour.id)) {
        distances.set(neighbour.id, alt);
        previous.set(neighbour.id, vertexU);
        pq.changePriority(neighbour.id, alt, true);
      }
    }
  }
  const pathTo = (id) => {
    const path = [];
    while (true) {
      if (id === source.id)
        break;
      const v = previous.get(id);
      if (v === void 0 || v === null)
        throw new Error(`Id not present: ${id}`);
      path.push({ id, weight: distances.get(id) });
      id = v.id;
    }
    return path;
  };
  return {
    distances,
    previous,
    pathTo
  };
};
var clone = (graph3) => {
  const g = {
    vertices: immutable([...graph3.vertices.entries()])
  };
  return g;
};
var graph = (...initialConnections) => {
  let g = {
    vertices: immutable()
  };
  for (const ic of initialConnections) {
    g = connect(g, ic);
  }
  return g;
};
function isAcyclic(graph3) {
  const cycles = getCycles(graph3);
  return cycles.length === 0;
}
function topologicalSort(graph3) {
  const indegrees = new NumberMap(0);
  for (const edge of edges(graph3)) {
    indegrees.add(edge.id, 1);
  }
  const queue = new QueueMutable();
  let vertexCount = 0;
  for (const vertex of vertices(graph3)) {
    if (indegrees.get(vertex.id) === 0) {
      queue.enqueue(vertex);
    }
    vertexCount++;
  }
  const topOrder = [];
  while (!queue.isEmpty) {
    const u = queue.dequeue();
    topOrder.push(u);
    for (const neighbour of u.out) {
      const result = indegrees.subtract(neighbour.id, 1);
      if (result === 0) {
        queue.enqueue(graph3.vertices.get(neighbour.id));
      }
    }
  }
  if (topOrder.length !== vertexCount) {
    throw new Error(`Graph contains cycles`);
  }
  return graphFromVertices(topOrder);
}
function graphFromVertices(vertices2) {
  const keyValues = map(vertices2, (f) => {
    return [f.id, f];
  });
  const m = immutable([...keyValues]);
  return {
    vertices: m
  };
}
function getCycles(graph3) {
  let index = 0;
  const stack = new StackMutable();
  const vertices2 = /* @__PURE__ */ new Map();
  const scc = [];
  for (const v of graph3.vertices.values()) {
    vertices2.set(v.id, {
      ...v,
      lowlink: Number.NaN,
      index: Number.NaN,
      onStack: false
    });
  }
  const strongConnect = (vertex) => {
    vertex.index = index;
    vertex.lowlink = index;
    index++;
    stack.push(vertex);
    vertex.onStack = true;
    for (const edge of vertex.out) {
      const edgeV = vertices2.get(edge.id);
      if (Number.isNaN(edgeV.index)) {
        strongConnect(edgeV);
        vertex.lowlink = Math.min(vertex.lowlink, edgeV.lowlink);
      } else if (edgeV.onStack) {
        vertex.lowlink = Math.min(vertex.lowlink, edgeV.lowlink);
      }
    }
    if (vertex.lowlink === vertex.index) {
      const stronglyConnected = [];
      let w;
      while (vertex !== w) {
        w = stack.pop();
        w.onStack = false;
        stronglyConnected.push({ id: w.id, out: w.out });
      }
      if (stronglyConnected.length > 1)
        scc.push(stronglyConnected);
    }
  };
  for (const v of vertices2.values()) {
    if (Number.isNaN(v.index)) {
      strongConnect(v);
    }
  }
  return scc;
}
function transitiveReduction(graph3) {
  for (const u of vertices(graph3)) {
    for (const v of adjacentVertices(graph3, u)) {
      for (const v1 of dfs(graph3, v)) {
        if (v.id === v1.id)
          continue;
        if (hasOut(graph3, u, v1)) {
          const g = disconnect(graph3, u, v1);
          return transitiveReduction(g);
        }
      }
    }
  }
  return graph3;
}

// src/rx/Graph.ts
function isReactive2(o) {
  if (typeof o !== `object`)
    return false;
  if (`on` in o) {
    return typeof o.on === `function`;
  }
  return false;
}
function prepare(_rx) {
  let g = graph();
  const nodes = /* @__PURE__ */ new Map();
  const events = initStream();
  const process = (o, path) => {
    for (const [key, value] of Object.entries(o)) {
      const subPath = path + `.` + key;
      g = connect(g, {
        from: path,
        to: subPath
      });
      if (isReactive2(value)) {
        nodes.set(subPath, { value, type: `rx` });
        value.on((v) => {
          console.log(`Reactive.prepare value: ${JSON.stringify(v)} path: ${subPath}`);
        });
      } else {
        const valueType = typeof value;
        if (valueType === `bigint` || valueType === `boolean` || valueType === `number` || valueType === `string`) {
          nodes.set(subPath, { type: `primitive`, value });
        } else if (valueType === `object`) {
          process(value, subPath);
        } else if (valueType === `function`) {
          console.log(`Reactive.process - not handling functions`);
        }
      }
    }
  };
  const returnValue = {
    graph: g,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    on: events.on,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    value: events.value
  };
  return returnValue;
}

// src/rx/Types.ts
var symbol = Symbol(`Rx`);

// src/rx/ToArray.ts
async function toArray(source, options = {}) {
  const limit = options.limit ?? Number.MAX_SAFE_INTEGER;
  const maximumWait = intervalToMs(options.maximumWait, 10 * 1e3);
  const underThreshold = options.underThreshold ?? `partial`;
  const read = [];
  const rx = resolveSource(source);
  const promise = new Promise((resolve, reject) => {
    const done = () => {
      clearTimeout(maxWait);
      unsub();
      if (read.length < limit && underThreshold === `throw`) {
        reject(new Error(`Threshold not reached. Wanted: ${limit} got: ${read.length}. Maximum wait: ${maximumWait}`));
        return;
      }
      if (read.length < limit && underThreshold === `fill`) {
        for (let index = 0; index < limit; index++) {
          if (read[index] === void 0) {
            read[index] = options.fillValue;
          }
        }
      }
      resolve(read);
    };
    const maxWait = setTimeout(() => {
      done();
    }, maximumWait);
    const unsub = rx.on((message) => {
      if (messageIsDoneSignal(message)) {
        done();
      } else if (messageHasValue(message)) {
        read.push(message.value);
        if (read.length === limit) {
          done();
        }
      }
    });
  });
  return promise;
}
async function toArrayOrThrow(source, options = {}) {
  const limit = options.limit ?? Number.MAX_SAFE_INTEGER;
  const maximumWait = options.maximumWait ?? 5 * 1e3;
  const v = await toArray(source, { limit, maximumWait, underThreshold: `partial` });
  if (options.limit && v.length < options.limit)
    throw new Error(`Threshold not reached. Wanted: ${options.limit}, got ${v.length}`);
  return v;
}

// src/rx/ToGenerator.ts
async function* toGenerator(source) {
  const s = resolveSource(source);
  let promiseResolve = (_) => {
  };
  let promiseReject = (_) => {
  };
  const promiseInit = () => new Promise((resolve, reject) => {
    promiseResolve = resolve;
    promiseReject = reject;
  });
  let promise = promiseInit();
  let keepRunning = true;
  s.on((message) => {
    if (messageHasValue(message)) {
      promiseResolve(message.value);
      promise = promiseInit();
    } else if (messageIsDoneSignal(message)) {
      keepRunning = false;
      promiseReject(`Source has completed`);
    }
  });
  while (keepRunning) {
    yield await promise;
  }
}

// src/rx/Wrap.ts
function wrap2(source) {
  return {
    source: resolveSource(source),
    annotate: (transformer) => {
      const a = annotate(source, transformer);
      return wrap2(a);
    },
    annotateElapsed: () => {
      return wrap2(annotateElapsed(source));
    },
    batch: (options) => {
      const w = wrap2(batch(source, options));
      return w;
    },
    debounce: (options = {}) => {
      return wrap2(debounce(source, options));
    },
    field: (fieldName, options = {}) => {
      const f = field(source, fieldName, options);
      return wrap2(f);
    },
    filter: (predicate, options) => {
      return wrap2(filter(source, predicate, options));
    },
    combineLatestToArray: (sources, options = {}) => {
      const srcs = [source, ...sources];
      return wrap2(combineLatestToArray(srcs, options));
    },
    combineLatestToObject: (sources, options) => {
      const name = options.name ?? `source`;
      const o = { ...sources };
      o[name] = source;
      return wrap2(combineLatestToObject(o, options));
    },
    split: (options = {}) => {
      const streams = split(source, options).map((v) => wrap2(v));
      return streams;
    },
    splitLabelled: (...labels) => {
      const l = splitLabelled(source, labels);
      const m = map2(l, (v) => wrap2(v));
      return m;
    },
    switcher: (cases, options = {}) => {
      const s = switcher(source, cases, options);
      const m = map2(s, (v) => wrap2(v));
      return m;
    },
    syncToArray: (additionalSources, options = {}) => {
      const unwrapped = [source, ...additionalSources].map((v) => resolveSource(v));
      const x = syncToArray(unwrapped, options);
      return wrap2(x);
    },
    syncToObject: (sources, options = {}) => {
      const name = options.name ?? `source`;
      const o = { ...sources };
      o[name] = source;
      return wrap2(syncToObject(o, options));
    },
    throttle: (options = {}) => {
      return wrap2(throttle(source, options));
    },
    transform: (transformer, options = {}) => {
      return wrap2(transform(source, transformer, options));
    },
    timeoutTrigger: (options) => {
      return wrap2(timeoutTrigger(source, options));
    },
    toArray: (options) => {
      return toArray(source, options);
    },
    toArrayOrThrow: (options) => {
      return toArrayOrThrow(source, options);
    },
    value: (callback) => {
      const s = resolveSource(source);
      s.on((message) => {
        if (messageHasValue(message))
          callback(message.value);
      });
    }
  };
}

// src/rx/Count.ts
function count(options = {}) {
  const lazy = options.lazy ?? `initial`;
  const interval = intervalToMs(options.interval, 1e3);
  const amount = options.amount ?? 1;
  const offset = options.offset ?? 0;
  let produced = 0;
  let value = offset;
  const done = (reason) => {
    events.dispose(reason);
  };
  const timer = continuously(() => {
    if (options.signal?.aborted) {
      done(`Aborted (${options.signal.reason})`);
      return false;
    }
    events.set(value);
    value += 1;
    produced++;
    if (produced >= amount) {
      done(`Limit reached`);
      return false;
    }
  }, interval);
  const events = initLazyStream({
    onStart() {
      timer.start();
    },
    onStop() {
      timer.cancel();
    },
    onDispose() {
      timer.cancel();
    },
    lazy
  });
  return events;
}

// src/rx/Dom.ts
var Dom_exports = {};
__export(Dom_exports, {
  bind: () => bind,
  bindDiffUpdate: () => bindDiffUpdate,
  bindElement: () => bindElement,
  bindHtml: () => bindHtml,
  bindText: () => bindText,
  bindUpdate: () => bindUpdate,
  elements: () => elements,
  fromDomQuery: () => fromDomQuery,
  win: () => win
});

// src/text/Segments.ts
function* stringSegmentsWholeToEnd(source, delimiter = `.`) {
  while (source.length > 0) {
    yield source;
    const trimmed = afterMatch(source, delimiter);
    if (trimmed === source) {
      break;
    }
    source = trimmed;
  }
}
function* stringSegmentsWholeToFirst(source, delimiter = `.`) {
  while (source.length > 0) {
    yield source;
    const b = beforeMatch(source, delimiter, { ifNoMatch: `original`, fromEnd: true });
    if (b === source)
      break;
    source = b;
  }
}

// src/data/index.ts
var data_exports = {};
__export(data_exports, {
  Bipolar: () => Bipolar_exports,
  Correlate: () => Correlate_exports,
  FrequencyMutable: () => FrequencyMutable,
  Graphs: () => graphs_exports,
  IntervalTracker: () => IntervalTracker,
  Normalise: () => Normalise_exports,
  NumberTracker: () => NumberTracker,
  PointTracker: () => PointTracker,
  Pool: () => Pool_exports,
  PrimitiveTracker: () => PrimitiveTracker,
  Table: () => Table,
  TrackedPointMap: () => TrackedPointMap,
  TrackedValueMap: () => TrackedValueMap,
  TrackerBase: () => TrackerBase,
  clamp: () => clamp,
  clampIndex: () => clampIndex,
  fieldResolve: () => fieldResolve,
  fieldResolver: () => fieldResolver,
  flip: () => flip,
  frequencyMutable: () => frequencyMutable,
  interpolate: () => interpolate,
  interpolateAngle: () => interpolateAngle,
  interpolatorInterval: () => interpolatorInterval,
  interpolatorStepped: () => interpolatorStepped,
  intervalTracker: () => intervalTracker,
  movingAverage: () => movingAverage,
  movingAverageLight: () => movingAverageLight,
  movingAverageTimed: () => movingAverageTimed,
  noiseFilter: () => noiseFilter,
  numberTracker: () => numberTracker,
  piPi: () => piPi,
  pointTracker: () => pointTracker,
  pointsTracker: () => pointsTracker,
  pull: () => pull,
  scale: () => scale,
  scaleClamped: () => scaleClamped,
  scalePercent: () => scalePercent,
  scalePercentages: () => scalePercentages,
  scaler: () => scaler,
  scalerPercent: () => scalerPercent,
  trackUnique: () => trackUnique,
  trackUniqueInstances: () => trackUniqueInstances,
  wrap: () => wrap,
  wrapInteger: () => wrapInteger,
  wrapRange: () => wrapRange
});

// src/data/Normalise.ts
var Normalise_exports = {};
__export(Normalise_exports, {
  array: () => array,
  stream: () => stream
});
var stream = (minDefault, maxDefault) => {
  let min = minDefault ?? Number.MAX_SAFE_INTEGER;
  let max = maxDefault ?? Number.MIN_SAFE_INTEGER;
  throwNumberTest(minDefault);
  throwNumberTest(maxDefault);
  return (v) => {
    throwNumberTest(v);
    min = Math.min(min, v);
    max = Math.max(max, v);
    return scale(v, min, max);
  };
};
var array = (values, minForced, maxForced) => {
  if (!Array.isArray(values)) {
    throw new Error(`values param should be an array`);
  }
  const mma = minMaxAvg(values);
  const min = minForced ?? mma.min;
  const max = maxForced ?? mma.max;
  return values.map((v) => clamp(scale(v, min, max)));
};

// src/data/FrequencyMutable.ts
var FrequencyMutable = class extends SimpleEventEmitter {
  #store;
  #keyString;
  /**
   * Constructor
   * @param keyString Function to key items. Uses JSON.stringify by default
   */
  constructor(keyString) {
    super();
    this.#store = /* @__PURE__ */ new Map();
    if (keyString === void 0) {
      keyString = (a) => {
        if (a === void 0)
          throw new Error(`Cannot create key for undefined`);
        return typeof a === `string` ? a : JSON.stringify(a);
      };
    }
    this.#keyString = keyString;
  }
  /**
   * Clear data. Fires `change` event
   */
  clear() {
    this.#store.clear();
    this.fireEvent(`change`, { context: this });
  }
  /**
   * @returns Iterator over keys (ie. groups)
   */
  keys() {
    return this.#store.keys();
  }
  /**
   * @returns Iterator over frequency counts
   */
  values() {
    return this.#store.values();
  }
  /**
   * @returns Copy of entries as an array of `[key, count]`
   */
  toArray() {
    return [...this.#store.entries()];
  }
  /**
   * Returns a string with keys and counts, useful for debugging.
   * @returns
   */
  debugString() {
    let t = ``;
    for (const [key, count2] of this.#store.entries()) {
      t += `${key}: ${count2}, `;
    }
    if (t.endsWith(`, `))
      return t.slice(0, Math.max(0, t.length - 2));
    return t;
  }
  /**
   *
   * @param value Value to count
   * @returns Frequency of value, or _undefined_ if it does not exist
   */
  frequencyOf(value) {
    if (typeof value === `string`)
      return this.#store.get(value);
    const key = this.#keyString(value);
    return this.#store.get(key);
  }
  /**
   *
   * @param value Value to count
   * @returns Relative frequency of `value`, or _undefined_ if it does not exist
   */
  relativeFrequencyOf(value) {
    let freq;
    if (typeof value === `string`)
      freq = this.#store.get(value);
    else {
      const key = this.#keyString(value);
      freq = this.#store.get(key);
    }
    if (freq === void 0)
      return;
    const mma = this.minMaxAvg();
    return freq / mma.total;
  }
  /**
   * @returns Copy of entries as an array
   */
  entries() {
    return [...this.#store.entries()];
  }
  /**
   *
   * @returns Returns `{min,max,avg,total}`
   */
  minMaxAvg() {
    return KeyValue_exports.minMaxAvg(this.entries());
  }
  /**
   *
   * @param sortStyle Sorting style (default: _value_, ie. count)
   * @returns Sorted array of [key,frequency]
   */
  entriesSorted(sortStyle = `value`) {
    const s = getSorter(sortStyle);
    return s(this.entries());
  }
  /**
   *
   * @param values Values to add. Fires _change_ event after adding item(s)
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  add(...values) {
    if (values === void 0)
      throw new Error(`value parameter is undefined`);
    const keys = values.map((v) => this.#keyString(v));
    for (const key of keys) {
      const score = this.#store.get(key) ?? 0;
      this.#store.set(key, score + 1);
    }
    this.fireEvent(`change`, { context: this });
  }
};
var frequencyMutable = (keyString) => new FrequencyMutable(keyString);

// src/flow/RateMinimum.ts
var rateMinimum = (options) => {
  let disposed = false;
  const t = timeout(() => {
    if (disposed)
      return;
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
    if (disposed)
      throw new Error(`AbortSignal has been fired`);
    t.start();
    options.whatToCall(args);
  };
};

// src/data/MovingAverage.ts
var movingAverageLight = (scaling = 3) => {
  throwNumberTest(scaling, `aboveZero`, `scaling`);
  let average2 = 0;
  let count2 = 0;
  return (v) => {
    const r = numberTest(v, ``, `v`);
    if (r[0] && v !== void 0) {
      count2++;
      average2 = average2 + (v - average2) / Math.min(count2, scaling);
    }
    return average2;
  };
};
var movingAverageTimed = (options) => {
  const average2 = movingAverageLight();
  const rm = rateMinimum({
    ...options,
    whatToCall: (distance3) => {
      average2(distance3);
    },
    fallback() {
      return options.default ?? 0;
    }
  });
  return (v) => {
    rm(v);
    return average2();
  };
};
var movingAverage = (samples = 100, weighter) => {
  const q = new QueueMutable({
    capacity: samples,
    discardPolicy: `older`
  });
  return (v) => {
    const r = numberTest(v);
    if (r[0] && v !== void 0) {
      q.enqueue(v);
    }
    return weighter === void 0 ? average(q.data) : averageWeighted(q.data, weighter);
  };
};
var PiPi = Math.PI * 2;
var smoothingFactor = (timeDelta, cutoff) => {
  const r = PiPi * cutoff * timeDelta;
  return r / (r + 1);
};
var exponentialSmoothing = (smoothingFactor2, value, previous) => {
  return smoothingFactor2 * value + (1 - smoothingFactor2) * previous;
};
var noiseFilter = (cutoffMin = 1, speedCoefficient = 0, cutoffDefault = 1) => {
  let previousValue = 0;
  let derivativeLast = 0;
  let timestampLast = 0;
  const compute = (value, timestamp) => {
    if (timestamp === void 0)
      timestamp = performance.now();
    const timeDelta = timestamp - timestampLast;
    const s = smoothingFactor(timeDelta, cutoffDefault);
    const valueDelta = (value - previousValue) / timeDelta;
    const derivative = exponentialSmoothing(s, valueDelta, derivativeLast);
    const cutoff = cutoffMin + speedCoefficient * Math.abs(derivative);
    const a = smoothingFactor(timeDelta, cutoff);
    const smoothed = exponentialSmoothing(a, value, previousValue);
    previousValue = smoothed;
    derivativeLast = derivative;
    timestampLast = timestamp;
    return smoothed;
  };
  return compute;
};

// src/data/IntervalTracker.ts
var IntervalTracker = class extends NumberTracker {
  lastMark = 0;
  mark() {
    if (this.lastMark > 0) {
      this.seen(performance.now() - this.lastMark);
    }
    this.lastMark = performance.now();
  }
};
var intervalTracker = (opts) => new IntervalTracker(opts);

// src/data/ObjectTracker.ts
var ObjectTracker = class extends TrackerBase {
  //abstract onSeen(_p: Array<V>): SeenResultType;
  values;
  constructor(opts = {}) {
    super(opts);
    this.values = [];
  }
  onTrimmed() {
  }
  /**
   * Reduces size of value store to `limit`. 
   * Returns number of remaining items
   * @param limit
   */
  trimStore(limit) {
    if (limit >= this.values.length)
      return this.values.length;
    this.values = this.values.slice(-limit);
    return this.values.length;
  }
  /**
   * Allows sub-classes to be notified when a reset happens
   * @ignore
   */
  onReset() {
    this.values = [];
  }
  /**
   * Tracks a value
   * @ignore
   */
  filterData(p) {
    const ts = p.map(
      (v) => `at` in v ? v : {
        ...v,
        at: Date.now()
      }
    );
    const last = ts.at(-1);
    if (this.storeIntermediate)
      this.values.push(...ts);
    else
      switch (this.values.length) {
        case 0: {
          this.values.push(last);
          break;
        }
        case 1: {
          this.values.push(last);
          break;
        }
        case 2: {
          this.values[1] = last;
          break;
        }
      }
    return ts;
  }
  /**
   * Last seen value. If no values have been added, it will return the initial value
   */
  get last() {
    if (this.values.length === 1)
      return this.values[0];
    return this.values.at(-1);
  }
  /**
   * Returns the initial value
   */
  get initial() {
    return this.values.at(0);
  }
  /**
   * Returns number of recorded values (includes the initial value in the count)
   */
  get size() {
    return this.values.length;
  }
  /**
   * Returns the elapsed time, in milliseconds since the initial value
   */
  get elapsed() {
    return Date.now() - this.values[0].at;
  }
};

// src/data/PointTracker.ts
var PointTracker = class extends ObjectTracker {
  /**
   * Function that yields the relation from initial point
   */
  initialRelation;
  /**
   * Last result
   */
  lastResult;
  constructor(opts = {}) {
    super(opts);
  }
  onTrimmed() {
    this.initialRelation = void 0;
  }
  /**
   * Returns the last x coord
   */
  get x() {
    return this.last.x;
  }
  /**
   * Returns the last y coord
   */
  get y() {
    return this.last.y;
  }
  /**
   * @ignore
   */
  onReset() {
    super.onReset();
    this.lastResult = void 0;
    this.initialRelation = void 0;
  }
  seenEvent(p) {
    if (`getCoalescedEvents` in p) {
      const events = p.getCoalescedEvents();
      const asPoints = events.map((event2) => ({ x: event2.clientX, y: event2.clientY }));
      return this.seen(...asPoints);
    } else {
      return this.seen({ x: p.clientX, y: p.clientY });
    }
  }
  /**
   * Tracks a point, returning data on its relation to the
   * initial point and the last received point.
   * 
   * Use {@link seenEvent} to track a raw `PointerEvent`.
   * 
   * @param _p Point
   */
  computeResults(_p) {
    const currentLast = this.last;
    const previousLast = this.values.at(-2);
    if (this.initialRelation === void 0 && this.initial) {
      this.initialRelation = relation(this.initial);
    } else if (this.initialRelation === void 0) {
      throw new Error(`Bug: No initialRelation, and this.inital is undefined?`);
    }
    const lastRelation = previousLast === void 0 ? relation(currentLast) : relation(previousLast);
    const initialRel = this.initialRelation(currentLast);
    const speed = previousLast === void 0 ? 0 : line_exports.length(previousLast, currentLast) / (currentLast.at - previousLast.at);
    const lastRel = {
      ...lastRelation(currentLast),
      speed
    };
    const r = {
      fromInitial: initialRel,
      fromLast: lastRel,
      values: [...this.values]
    };
    this.lastResult = r;
    return r;
  }
  /**
   * Returns a polyline representation of stored points.
   * Returns an empty array if points were not saved, or there's only one.
   */
  get line() {
    if (this.values.length === 1)
      return [];
    return line_exports.joinPointsToLines(...this.values);
  }
  /**
   * Returns a vector of the initial/last points of the tracker.
   * Returns as a polar coordinate
   */
  get vectorPolar() {
    return Vector_exports.fromLinePolar(this.lineStartEnd);
  }
  /**
   * Returns a vector of the initial/last points of the tracker.
   * Returns as a Cartesian coordinate
   */
  get vectorCartesian() {
    return Vector_exports.fromLineCartesian(this.lineStartEnd);
  }
  /**
   * Returns a line from initial point to last point.
   *
   * If there are less than two points, Lines.Empty is returned
   */
  get lineStartEnd() {
    const initial = this.initial;
    if (this.values.length < 2 || !initial)
      return line_exports.Empty;
    return {
      a: initial,
      b: this.last
    };
  }
  /**
   * Returns distance from latest point to initial point.
   * If there are less than two points, zero is returned.
   *
   * This is the direct distance from initial to last,
   * not the accumulated length.
   * @returns Distance
   */
  distanceFromStart() {
    const initial = this.initial;
    return this.values.length >= 2 && initial !== void 0 ? distance(initial, this.last) : 0;
  }
  /**
   * Difference between last point and the initial point, calculated
   * as a simple subtraction of x & y.
   *
   * `Points.Placeholder` is returned if there's only one point so far.
   */
  difference() {
    const initial = this.initial;
    return this.values.length >= 2 && initial !== void 0 ? subtract2(this.last, initial) : Placeholder;
  }
  /**
   * Returns angle (in radians) from latest point to the initial point
   * If there are less than two points, undefined is return.
   * @returns Angle in radians
   */
  angleFromStart() {
    const initial = this.initial;
    if (initial !== void 0 && this.values.length > 2) {
      return angle(initial, this.last);
    }
  }
  /**
   * Returns the total length of accumulated points.
   * Returns 0 if points were not saved, or there's only one
   */
  get length() {
    if (this.values.length === 1)
      return 0;
    const l = this.line;
    return line_exports.length(l);
  }
};
var TrackedPointMap = class extends TrackedValueMap {
  constructor(opts = {}) {
    super((key, start) => {
      if (start === void 0)
        throw new Error(`Requires start point`);
      const p = new PointTracker({
        ...opts,
        id: key
      });
      p.seen(start);
      return p;
    });
  }
  /**
   * Track a PointerEvent
   * @param event
   */
  seenEvent(event2) {
    if (`getCoalescedEvents` in event2) {
      const events = event2.getCoalescedEvents();
      const seens = events.map((subEvent) => super.seen(subEvent.pointerId.toString(), subEvent));
      return Promise.all(seens);
    } else {
      return Promise.all([super.seen(event2.pointerId.toString(), event2)]);
    }
  }
};
var pointsTracker = (opts = {}) => new TrackedPointMap(opts);
var pointTracker = (opts = {}) => new PointTracker(opts);

// src/data/Flip.ts
var flip = (v) => {
  if (typeof v === `function`)
    v = v();
  throwNumberTest(v, `percentage`, `v`);
  return 1 - v;
};

// src/data/graphs/index.ts
var graphs_exports = {};
__export(graphs_exports, {
  Directed: () => DirectedGraph_exports,
  Undirected: () => UndirectedGraph_exports
});

// src/data/graphs/UndirectedGraph.ts
var UndirectedGraph_exports = {};
__export(UndirectedGraph_exports, {
  adjacentVertices: () => adjacentVertices2,
  connect: () => connect2,
  connectTo: () => connectTo2,
  createVertex: () => createVertex2,
  dumpGraph: () => dumpGraph2,
  edgesForVertex: () => edgesForVertex,
  getConnection: () => getConnection,
  getOrCreate: () => getOrCreate2,
  graph: () => graph2,
  hasConnection: () => hasConnection,
  toAdjacencyMatrix: () => toAdjacencyMatrix2,
  updateGraphVertex: () => updateGraphVertex2
});
var createVertex2 = (id) => {
  return {
    id
  };
};
var updateGraphVertex2 = (graph3, vertex) => {
  const gr = {
    ...graph3,
    vertices: graph3.vertices.set(vertex.id, vertex)
  };
  return gr;
};
var getOrCreate2 = (graph3, id) => {
  const v = graph3.vertices.get(id);
  if (v !== void 0)
    return { graph: graph3, vertex: v };
  const vv = createVertex2(id);
  const gg = updateGraphVertex2(graph3, vv);
  return { graph: gg, vertex: vv };
};
function resolveVertex2(graph3, idOrVertex) {
  const v = typeof idOrVertex === `string` ? graph3.vertices.get(idOrVertex) : idOrVertex;
  if (v === void 0)
    throw new Error(`Id not found ${idOrVertex}`);
  return v;
}
var hasConnection = (graph3, a, b) => {
  const edge = getConnection(graph3, a, b);
  return edge !== void 0;
};
var getConnection = (graph3, a, b) => {
  const aa = resolveVertex2(graph3, a);
  const bb = resolveVertex2(graph3, b);
  for (const edge of graph3.edges) {
    if (edge.a == aa.id && edge.b === bb.id)
      return edge;
    if (edge.a == bb.id && edge.b === aa.id)
      return edge;
  }
  return;
};
function connectTo2(graph3, a, b, weight) {
  const aResult = getOrCreate2(graph3, a);
  graph3 = aResult.graph;
  const bResult = getOrCreate2(graph3, b);
  graph3 = bResult.graph;
  let edge = getConnection(graph3, a, b);
  if (edge !== void 0)
    return { graph: graph3, edge };
  edge = {
    a,
    b,
    weight
  };
  const graphChanged = {
    ...graph3,
    edges: [...graph3.edges, edge]
  };
  return { graph: graphChanged, edge };
}
function connect2(graph3, options) {
  const { a, weight, b } = options;
  const destinations = Array.isArray(b) ? b : [b];
  for (const destination of destinations) {
    const result = connectTo2(graph3, a, destination, weight);
    graph3 = result.graph;
  }
  return graph3;
}
var graph2 = (...initialConnections) => {
  let g = {
    vertices: immutable(),
    edges: []
  };
  for (const ic of initialConnections) {
    g = connect2(g, ic);
  }
  return g;
};
function toAdjacencyMatrix2(graph3) {
  const v = [...graph3.vertices.values()];
  const table = new Table();
  table.labelColumns(...v.map((vv) => vv.id));
  table.labelRows(...v.map((vv) => vv.id));
  for (let i = 0; i < v.length; i++) {
    table.setRow(i, v.length, false);
    const ii = v[i];
    for (const [j, jj] of v.entries()) {
      const connected = hasConnection(graph3, ii, jj);
      if (connected) {
        table.set(i, j, true);
      }
    }
  }
  return table;
}
var dumpGraph2 = (graph3) => {
  const lines = debugGraphToArray2(graph3);
  return lines.join(`
`);
};
var debugGraphToArray2 = (graph3) => {
  const r = [];
  r.push(`Vertices: ${[...graph3.vertices.values()].map((v) => v.id).join(`, `)}`);
  r.push(`Edges:`);
  for (const edge of graph3.edges) {
    r.push(stringForEdge(edge));
  }
  return r;
};
var stringForEdge = (edge) => {
  const weight = edge.weight ? ` (${edge.weight})` : ``;
  return `${edge.a} <-> ${edge.b}${weight}`;
};
function* adjacentVertices2(graph3, context) {
  if (context === void 0)
    return;
  const vertex = typeof context === `string` ? graph3.vertices.get(context) : context;
  if (vertex === void 0)
    throw new Error(`Vertex not found ${JSON.stringify(context)}`);
  for (const edge of graph3.edges) {
    if (edge.a === context)
      yield resolveVertex2(graph3, edge.b);
    else if (edge.b === context)
      yield resolveVertex2(graph3, edge.a);
  }
}
function* edgesForVertex(graph3, context) {
  if (context === void 0)
    return;
  const vertex = typeof context === `string` ? graph3.vertices.get(context) : context;
  if (vertex === void 0)
    throw new Error(`Vertex not found ${JSON.stringify(context)}`);
  for (const edge of graph3.edges) {
    if (edge.a === context)
      yield edge;
    else if (edge.b === context)
      yield edge;
  }
}

// src/data/TrackUnique.ts
var trackUnique = (toString = toStringDefault) => {
  const set = /* @__PURE__ */ new Set();
  return (value) => {
    if (value === null)
      throw new TypeError(`Param 'value' cannot be null`);
    if (value === void 0)
      throw new TypeError(`Param 'value' cannot be undefined`);
    const asString = typeof value === `string` ? value : toString(value);
    if (set.has(asString))
      return false;
    set.add(asString);
    return true;
  };
};
var trackUniqueInstances = () => {
  const set = /* @__PURE__ */ new Set();
  return (value) => {
    if (value === null)
      throw new TypeError(`Param 'value' cannot be null`);
    if (value === void 0)
      throw new TypeError(`Param 'value' cannot be undefined`);
    if (set.has(value))
      return false;
    set.add(value);
    return true;
  };
};

// src/data/ResolveFields.ts
async function resolveValue(valueOrFunction) {
  if (typeof valueOrFunction === `object` && `next` in valueOrFunction) {
    const v = await valueOrFunction.next();
    return v.value;
  }
  if (typeof valueOrFunction === `function`) {
    const v = await valueOrFunction();
    return v;
  }
  return valueOrFunction;
}
async function fieldResolve(object2) {
  const output = [];
  for (const entry of Object.entries(object2)) {
    const key = entry[0];
    const valueOrFunction = entry[1];
    const value = await resolveValue(valueOrFunction);
    output.push([key, value]);
  }
  return Object.fromEntries(output);
}
function fieldResolver(object2) {
  return () => fieldResolve(object2);
}
function pull(value) {
  const sources = {};
  const fixedValues = {};
  const callers = {};
  for (const [key, v] of Object.entries(value)) {
    if (Array.isArray(v) || isPrimitive(v)) {
      fixedValues[key] = v;
    } else if (typeof v === `function`) {
      callers[key] = v;
    } else {
      try {
        console.log(`pull: ${key}`);
        const s = resolveSource(v);
        sources[key] = s;
      } catch {
        fixedValues[key] = v;
      }
    }
  }
  const latestToObjectRx = combineLatestToObject(sources, { onSourceDone: `allow` });
  let lastRxValue;
  const latestToObjectOff = latestToObjectRx.value((v) => {
    lastRxValue = v;
  });
  const computeCallers = async () => {
    const r = {};
    for (const [key, value2] of Object.entries(callers)) {
      r[key] = await value2();
    }
    return r;
  };
  const compute = async () => ({ ...fixedValues, ...lastRxValue, ...await computeCallers() });
  const dispose = () => {
    latestToObjectOff();
    latestToObjectRx.dispose(`ResolveFields.dispose`);
  };
  return { compute, dispose };
}

// src/data/Bipolar.ts
var Bipolar_exports = {};
__export(Bipolar_exports, {
  clamp: () => clamp3,
  fromScalar: () => fromScalar,
  immutable: () => immutable2,
  random: () => random,
  randomSource: () => randomSource,
  scale: () => scale2,
  scaleClamped: () => scaleClamped2,
  toScalar: () => toScalar,
  towardZero: () => towardZero
});
var immutable2 = (startingValueOrBipolar = 0) => {
  const startingValue = typeof startingValueOrBipolar === `number` ? startingValueOrBipolar : startingValueOrBipolar.value;
  if (startingValue > 1)
    throw new Error(`Cannot be larger than 1`);
  if (startingValue < -1)
    throw new Error(`Cannot be smaller than -1`);
  if (Number.isNaN(startingValue))
    throw new Error(`startingValue is NaN`);
  const v = startingValue;
  return {
    [Symbol.toPrimitive](hint) {
      if (hint === `number`)
        return v;
      else if (hint === `string`)
        return v.toString();
      return true;
    },
    value: v,
    towardZero: (amt) => {
      return immutable2(towardZero(v, amt));
    },
    add: (amt) => {
      return immutable2(clamp3(v + amt));
    },
    multiply: (amt) => {
      return immutable2(clamp3(v * amt));
    },
    inverse: () => {
      return immutable2(-v);
    },
    interpolate: (amt, b) => {
      return immutable2(clamp3(interpolate(amt, v, b)));
    },
    asScalar: () => {
      return toScalar(v);
    }
  };
};
var toScalar = (bipolarValue) => {
  if (typeof bipolarValue !== `number`)
    throw new Error(`Expected v to be a number. Got: ${typeof bipolarValue}`);
  if (Number.isNaN(bipolarValue))
    throw new Error(`Parameter is NaN`);
  return (bipolarValue + 1) / 2;
};
var fromScalar = (scalarValue) => {
  throwNumberTest(scalarValue, `percentage`, `v`);
  return scalarValue * 2 - 1;
};
var scale2 = (inputValue, inMin, inMax) => {
  return clamp3(scaler(inMin, inMax, -1, 1)(inputValue));
};
var scaleClamped2 = (inputValue, inMin, inMax) => {
  return scaler(inMin, inMax, -1, 1)(inputValue);
};
var randomSource = (maxOrOptions) => {
  const source = floatSource(maxOrOptions);
  return () => source() * 2 - 1;
};
var random = (maxOrOptions) => {
  const source = randomSource(maxOrOptions);
  return source();
};
var clamp3 = (bipolarValue) => {
  if (typeof bipolarValue !== `number`)
    throw new Error(`Parameter must be a number. Got: ${typeof bipolarValue}`);
  if (Number.isNaN(bipolarValue))
    throw new Error(`v parameter is NaN`);
  if (bipolarValue > 1)
    return 1;
  if (bipolarValue < -1)
    return -1;
  return bipolarValue;
};
var towardZero = (bipolarValue, amount) => {
  if (typeof bipolarValue !== `number`)
    throw new Error(`Parameter 'v' must be a number. Got: ${typeof bipolarValue}`);
  if (typeof amount !== `number`)
    throw new Error(`Parameter 'amt' must be a number. Got: ${typeof amount}`);
  if (amount < 0)
    throw new Error(`Parameter 'amt' must be positive`);
  if (bipolarValue < 0) {
    bipolarValue += amount;
    if (bipolarValue > 0)
      bipolarValue = 0;
  } else if (bipolarValue > 0) {
    bipolarValue -= amount;
    if (bipolarValue < 0)
      bipolarValue = 0;
  }
  return bipolarValue;
};

// src/data/Correlate.ts
var Correlate_exports = {};
__export(Correlate_exports, {
  align: () => align,
  alignById: () => alignById
});
var orderScore = (a, b) => {
  if (a.score > b.score)
    return -1;
  else if (a.score < b.score)
    return 1;
  return 0;
};
var align = (similarityFn, lastData, newData, opts = {}) => {
  const matchThreshold = opts.matchThreshold ?? 0;
  const debug = opts.debug ?? false;
  const results = /* @__PURE__ */ new Map();
  const newThings = [];
  const lastMap = /* @__PURE__ */ new Map();
  lastData?.forEach((d, index) => {
    if (d === void 0) {
      throw new Error(`'lastData' contains undefined (index: ${index})`);
    }
    lastMap.set(d.id, d);
  });
  for (let i = 0; i < newData.length; i++) {
    const newD = newData[i];
    if (!lastData || lastData.length === 0) {
      if (debug)
        console.debug(`Correlate.align() new id: ${newD.id}`);
      newThings.push(newD);
      continue;
    }
    const scoredLastValues = Array.from(lastMap.values()).map((last) => ({
      id: last.id,
      score: last === null ? -1 : similarityFn(last, newD),
      last
    }));
    if (scoredLastValues.length === 0) {
      if (debug) {
        console.debug(`Correlate.align() no valid last values id: ${newD.id}`);
      }
      newThings.push(newD);
      continue;
    }
    scoredLastValues.sort(orderScore);
    const top = scoredLastValues[0];
    if (top.score < matchThreshold) {
      if (debug) {
        console.debug(
          `Correlate.align() new item does not reach threshold. Top score: ${top.score} id: ${newD.id}`
        );
      }
      newThings.push(newD);
      continue;
    }
    if (debug && top.id !== newD.id) {
      console.log(
        `Correlate.align() Remapped ${newD.id} -> ${top.id} (score: ${top.score})`
      );
    }
    results.set(top.id, { ...newD, id: top.id });
    lastMap.delete(top.id);
  }
  newThings.forEach((t) => results.set(t.id, t));
  return Array.from(results.values());
};
var alignById = (fn, opts = {}) => {
  let lastData = [];
  const compute = (newData) => {
    lastData = align(fn, lastData, newData, opts);
    return [...lastData];
  };
  return compute;
};

// src/data/Pool.ts
var Pool_exports = {};
__export(Pool_exports, {
  Pool: () => Pool,
  PoolUser: () => PoolUser,
  Resource: () => Resource,
  create: () => create
});
var PoolUser = class extends SimpleEventEmitter {
  /**
   * Constructor
   * @param key User key
   * @param resource Resource being used
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  constructor(key, resource) {
    super();
    this.key = key;
    this.resource = resource;
    this._lastUpdate = performance.now();
    this._pool = resource.pool;
    this._userExpireAfterMs = this._pool.userExpireAfterMs;
    this._state = `idle`;
    this._pool.log.log(`PoolUser ctor key: ${this.key}`);
  }
  _lastUpdate;
  _pool;
  _state;
  _userExpireAfterMs;
  /**
   * Returns a human readable debug string
   * @returns
   */
  toString() {
    if (this.isDisposed)
      return `PoolUser. State: disposed`;
    return `PoolUser. State: ${this._state} Elapsed: ${performance.now() - this._lastUpdate} Data: ${JSON.stringify(this.resource.data)}`;
  }
  /**
   * Resets countdown for instance expiry.
   * Throws an error if instance is disposed.
   */
  keepAlive() {
    if (this._state === `disposed`)
      throw new Error(`PoolItem disposed`);
    this._lastUpdate = performance.now();
  }
  /**
   * @internal
   * @param reason
   * @returns
   */
  _dispose(reason, data) {
    if (this._state === `disposed`)
      return;
    const resource = this.resource;
    this._state = `disposed`;
    resource._release(this);
    this._pool.log.log(`PoolUser dispose key: ${this.key} reason: ${reason}`);
    this.fireEvent(`disposed`, { data, reason });
    super.clearEventListeners();
  }
  /**
   * Release this instance
   * @param reason
   */
  release(reason) {
    if (this.isDisposed)
      throw new Error(`User disposed`);
    const resource = this.resource;
    const data = resource.data;
    this._pool.log.log(`PoolUser release key: ${this.key} reason: ${reason}`);
    this.fireEvent(`released`, { data, reason });
    this._dispose(`release-${reason}`, data);
  }
  // #region Properties
  get data() {
    if (this.isDisposed)
      throw new Error(`User disposed`);
    return this.resource.data;
  }
  /**
   * Returns true if this instance has expired.
   * Expiry counts if elapsed time is greater than `userExpireAfterMs`
   */
  get isExpired() {
    if (this._userExpireAfterMs > 0) {
      return performance.now() > this._lastUpdate + this._userExpireAfterMs;
    }
    return false;
  }
  /**
   * Returns elapsed time since last 'update'
   */
  get elapsed() {
    return performance.now() - this._lastUpdate;
  }
  /**
   * Returns true if instance is disposed
   */
  get isDisposed() {
    return this._state === `disposed`;
  }
  /**
   * Returns true if instance is neither disposed nor expired
   */
  get isValid() {
    if (this.isDisposed || this.isExpired)
      return false;
    if (this.resource.isDisposed)
      return false;
    return true;
  }
  // #endregion
};
var Resource = class {
  /**
   * Constructor.
   * @param pool Pool
   * @param data Data
   */
  constructor(pool, data) {
    this.pool = pool;
    if (data === void 0)
      throw new Error(`Parameter 'data' is undefined`);
    if (pool === void 0)
      throw new Error(`Parameter 'pool' is undefined`);
    this.#data = data;
    this.#lastUsersChange = 0;
    this.#resourcesWithoutUserExpireAfterMs = pool.resourcesWithoutUserExpireAfterMs;
    this.#capacityPerResource = pool.capacityPerResource;
    this.#users = [];
    this.#state = `idle`;
  }
  #state;
  #data;
  #users;
  #capacityPerResource;
  #resourcesWithoutUserExpireAfterMs;
  #lastUsersChange;
  /**
   * Gets data associated with resource.
   * Throws an error if disposed
   */
  get data() {
    if (this.#state === `disposed`)
      throw new Error(`Resource disposed`);
    return this.#data;
  }
  /**
   * Changes the data associated with this resource.
   * Throws an error if disposed or `data` is undefined.
   * @param data
   */
  updateData(data) {
    if (this.#state === `disposed`)
      throw new Error(`Resource disposed`);
    if (data === void 0)
      throw new Error(`Parameter 'data' is undefined`);
    this.#data = data;
  }
  /**
   * Returns a human-readable debug string for resource
   * @returns
   */
  toString() {
    return `Resource (expired: ${this.isExpiredFromUsers} users: ${this.#users.length}, state: ${this.#state}) data: ${JSON.stringify(this.data)}`;
  }
  /**
   * Assigns a user to this resource.
   * @internal
   * @param user
   */
  _assign(user) {
    const existing = this.#users.find((u) => u === user || u.key === user.key);
    if (existing)
      throw new Error(`User instance already assigned to resource`);
    this.#users.push(user);
    this.#lastUsersChange = performance.now();
  }
  /**
   * Releases a user from this resource
   * @internal
   * @param user
   */
  _release(user) {
    this.#users = this.#users.filter((u) => u !== user);
    this.pool._release(user);
    this.#lastUsersChange = performance.now();
  }
  /**
   * Returns true if resource can have additional users allocated
   */
  get hasUserCapacity() {
    return this.usersCount < this.#capacityPerResource;
  }
  /**
   * Returns number of uses of the resource
   */
  get usersCount() {
    return this.#users.length;
  }
  /**
   * Returns true if automatic expiry is enabled, and that interval
   * has elapsed since the users list has changed for this resource
   */
  get isExpiredFromUsers() {
    if (this.#resourcesWithoutUserExpireAfterMs <= 0)
      return false;
    if (this.#users.length > 0)
      return false;
    return performance.now() > this.#resourcesWithoutUserExpireAfterMs + this.#lastUsersChange;
  }
  /**
   * Returns true if instance is disposed
   */
  get isDisposed() {
    return this.#state === `disposed`;
  }
  /**
   * Disposes the resource.
   * If it is already disposed, it does nothing.
   * @param reason
   * @returns
   */
  dispose(reason) {
    if (this.#state === `disposed`)
      return;
    const data = this.#data;
    this.#state = `disposed`;
    this.pool.log.log(`Resource disposed (${reason})`);
    for (const u of this.#users) {
      u._dispose(`resource-${reason}`, data);
    }
    this.#users = [];
    this.#lastUsersChange = performance.now();
    this.pool._releaseResource(this, reason);
    if (this.pool.freeResource)
      this.pool.freeResource(data);
  }
};
var Pool = class {
  _resources;
  _users;
  capacity;
  userExpireAfterMs;
  resourcesWithoutUserExpireAfterMs;
  capacityPerResource;
  fullPolicy;
  generateResource;
  freeResource;
  log;
  /**
   * Constructor.
   *
   * By default, no capacity limit, one user per resource
   * @param opts Pool options
   */
  constructor(opts = {}) {
    this.capacity = opts.capacity ?? -1;
    this.fullPolicy = opts.fullPolicy ?? `error`;
    this.capacityPerResource = opts.capacityPerResource ?? 1;
    this.userExpireAfterMs = opts.userExpireAfterMs ?? -1;
    this.resourcesWithoutUserExpireAfterMs = opts.resourcesWithoutUserExpireAfterMs ?? -1;
    this.generateResource = opts.generate;
    this.freeResource = opts.free;
    this._users = /* @__PURE__ */ new Map();
    this._resources = [];
    this.log = logSet(`Pool`, opts.debug ?? false);
    const timer = Math.max(
      this.userExpireAfterMs,
      this.resourcesWithoutUserExpireAfterMs
    );
    if (timer > 0) {
      setInterval(() => {
        this.maintain();
      }, timer * 1.1);
    }
  }
  /**
   * Returns a debug string of Pool state
   * @returns
   */
  dumpToString() {
    let r = `Pool
    capacity: ${this.capacity} userExpireAfterMs: ${this.userExpireAfterMs} capacityPerResource: ${this.capacityPerResource}
    resources count: ${this._resources.length}`;
    const resource = this._resources.map((r2) => r2.toString()).join(`\r
	`);
    r += `\r
Resources:\r
	` + resource;
    r += `\r
Users: \r
`;
    for (const [k, v] of this._users.entries()) {
      r += `	k: ${k} v: ${v.toString()}\r
`;
    }
    return r;
  }
  /**
   * Sorts users by longest elapsed time since update
   * @returns
   */
  getUsersByLongestElapsed() {
    return [...this._users.values()].sort((a, b) => {
      const aa = a.elapsed;
      const bb = b.elapsed;
      if (aa === bb)
        return 0;
      if (aa < bb)
        return 1;
      return -1;
    });
  }
  /**
   * Returns resources sorted with least used first
   * @returns
   */
  getResourcesSortedByUse() {
    return [...this._resources].sort((a, b) => {
      if (a.usersCount === b.usersCount)
        return 0;
      if (a.usersCount < b.usersCount)
        return -1;
      return 1;
    });
  }
  /**
   * Adds a resource to the pool.
   * Throws an error if the capacity limit is reached.
   * @param resource
   * @returns
   */
  addResource(resource) {
    if (resource === void 0) {
      throw new Error(`Cannot add undefined resource`);
    }
    if (resource === null)
      throw new Error(`Cannot add null resource`);
    if (this.capacity > 0 && this._resources.length === this.capacity) {
      throw new Error(
        `Capacity limit (${this.capacity}) reached. Cannot add more.`
      );
    }
    this.log.log(`Adding resource: ${JSON.stringify(resource)}`);
    const pi = new Resource(this, resource);
    this._resources.push(pi);
    return pi;
  }
  /**
   * Performs maintenance, removing disposed/expired resources & users.
   * This is called automatically when using a resource.
   */
  maintain() {
    let changed = false;
    const nuke = [];
    for (const p of this._resources) {
      if (p.isDisposed) {
        this.log.log(`Maintain, disposed resource: ${JSON.stringify(p.data)}`);
        nuke.push(p);
      } else if (p.isExpiredFromUsers) {
        this.log.log(`Maintain, expired resource: ${JSON.stringify(p.data)}`);
        nuke.push(p);
      }
    }
    if (nuke.length > 0) {
      for (const resource of nuke) {
        resource.dispose(`diposed/expired`);
      }
      changed = true;
    }
    const userKeysToRemove = [];
    for (const [key, user] of this._users.entries()) {
      if (!user.isValid) {
        this.log.log(
          `Maintain. Invalid user: ${user.key} (Disposed: ${user.isDisposed} Expired: ${user.isExpired} Resource disposed: ${user.resource.isDisposed})`
        );
        userKeysToRemove.push(key);
        user._dispose(`invalid`, user.data);
      }
    }
    for (const userKey of userKeysToRemove) {
      this._users.delete(userKey);
      changed = true;
    }
    if (changed) {
      this.log.log(
        `End: resource len: ${this._resources.length} users: ${this.usersLength}`
      );
    }
  }
  /**
   * Iterate over resources in the pool.
   * To iterate over the data associated with each resource, use
   * `values`.
   */
  *resources() {
    const resource = [...this._resources];
    for (const r of resource) {
      yield r;
    }
  }
  /**
   * Iterate over resource values in the pool.
   * to iterate over the resources, use `resources`.
   *
   * Note that values may be returned even though there is no
   * active user.
   */
  *values() {
    const resource = [...this._resources];
    for (const r of resource) {
      yield r.data;
    }
  }
  /**
   * Unassociate a key with a pool item
   * @param userKey
   */
  release(userKey, reason) {
    const pi = this._users.get(userKey);
    if (!pi)
      return;
    pi.release(reason ?? `Pool.release`);
  }
  /**
   * @internal
   * @param user
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  _release(user) {
    this._users.delete(user.key);
  }
  /**
   * @internal
   * @param resource
   * @param _
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  _releaseResource(resource, _) {
    this._resources = this._resources.filter((v) => v !== resource);
  }
  /**
   * Returns true if `v` has an associted resource in the pool
   * @param resource
   * @returns
   */
  hasResource(resource) {
    const found = this._resources.find((v) => v.data === resource);
    return found !== void 0;
  }
  /**
   * Returns true if a given `userKey` is in use.
   * @param userKey
   * @returns
   */
  hasUser(userKey) {
    return this._users.has(userKey);
  }
  /**
   * @internal
   * @param key
   * @param resource
   * @returns
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  _assign(key, resource) {
    const u = new PoolUser(key, resource);
    this._users.set(key, u);
    resource._assign(u);
    return u;
  }
  /**
   * @internal
   * @param userKey
   * @returns
   */
  _findUser(userKey) {
    const sorted = this.getResourcesSortedByUse();
    if (sorted.length > 0 && sorted[0].hasUserCapacity) {
      const u = this._assign(userKey, sorted[0]);
      return u;
    }
    if (this.generateResource && (this.capacity < 0 || this._resources.length < this.capacity)) {
      this.log.log(
        `capacity: ${this.capacity} resources: ${this._resources.length}`
      );
      const resourceGenerated = this.addResource(this.generateResource());
      const u = this._assign(userKey, resourceGenerated);
      return u;
    }
  }
  /**
   * Return the number of users
   */
  get usersLength() {
    return [...this._users.values()].length;
  }
  /**
   * 'Uses' a resource, returning the value
   * @param userKey
   * @returns
   */
  useValue(userKey) {
    const resource = this.use(userKey);
    return resource.resource.data;
  }
  /**
   * Gets a pool item based on a user key.
   * The same key should return the same pool item,
   * for as long as it still exists.
   * @param userKey
   * @returns
   */
  use(userKey) {
    const pi = this._users.get(userKey);
    if (pi) {
      pi.keepAlive();
      return pi;
    }
    this.maintain();
    const match = this._findUser(userKey);
    if (match)
      return match;
    if (this.fullPolicy === `error`) {
      throw new Error(
        `Pool is fully used (fullPolicy: ${this.fullPolicy}, capacity: ${this.capacity})`
      );
    }
    if (this.fullPolicy === `evictOldestUser`) {
      const users = this.getUsersByLongestElapsed();
      if (users.length > 0) {
        this.release(users[0].key, `evictedOldestUser`);
        const match2 = this._findUser(userKey);
        if (match2)
          return match2;
      }
    }
    throw new Error(`Pool is fully used (${this.fullPolicy})`);
  }
};
var create = (opts = {}) => new Pool(opts);

// src/data/index.ts
var piPi = Math.PI * 2;

// src/visual/index.ts
var visual_exports = {};
__export(visual_exports, {
  BipolarView: () => BipolarView_exports,
  Colour: () => Colour_exports,
  Drawing: () => Drawing_exports,
  ImageDataGrid: () => ImageDataGrid_exports,
  Palette: () => Palette_exports,
  Plot2: () => Plot2_exports,
  PlotOld: () => PlotOld_exports,
  SceneGraph: () => SceneGraph_exports,
  Svg: () => Svg_exports,
  Video: () => Video_exports,
  scaleCanvas: () => scaleCanvas
});

// src/visual/Drawing.ts
var Drawing_exports = {};
__export(Drawing_exports, {
  arc: () => arc,
  bezier: () => bezier,
  circle: () => circle,
  connectedPoints: () => connectedPoints,
  copyToImg: () => copyToImg,
  dot: () => dot,
  drawingStack: () => drawingStack,
  ellipse: () => ellipse,
  getContext: () => getContext,
  line: () => line,
  lineThroughPoints: () => lineThroughPoints,
  makeHelper: () => makeHelper,
  paths: () => paths,
  pointLabels: () => pointLabels,
  rect: () => rect,
  textBlock: () => textBlock,
  textBlockAligned: () => textBlockAligned,
  textHeight: () => textHeight,
  textRect: () => textRect,
  textWidth: () => textWidth,
  translatePoint: () => translatePoint,
  triangle: () => triangle
});
var PIPI = Math.PI * 2;
var getContext = (canvasElementContextOrQuery) => {
  if (canvasElementContextOrQuery === null) {
    throw new Error(
      `canvasElCtxOrQuery null. Must be a 2d drawing context or Canvas element`
    );
  }
  if (canvasElementContextOrQuery === void 0) {
    throw new Error(
      `canvasElCtxOrQuery undefined. Must be a 2d drawing context or Canvas element`
    );
  }
  const ctx = canvasElementContextOrQuery instanceof CanvasRenderingContext2D ? canvasElementContextOrQuery : canvasElementContextOrQuery instanceof HTMLCanvasElement ? canvasElementContextOrQuery.getContext(`2d`) : typeof canvasElementContextOrQuery === `string` ? resolveEl(canvasElementContextOrQuery).getContext(`2d`) : canvasElementContextOrQuery;
  if (ctx === null)
    throw new Error(`Could not create 2d context for canvas`);
  return ctx;
};
var makeHelper = (ctxOrCanvasEl, canvasBounds) => {
  const ctx = getContext(ctxOrCanvasEl);
  return {
    paths(pathsToDraw, opts) {
      paths(ctx, pathsToDraw, opts);
    },
    line(lineToDraw, opts) {
      line(ctx, lineToDraw, opts);
    },
    rect(rectsToDraw, opts) {
      rect(ctx, rectsToDraw, opts);
    },
    bezier(bezierToDraw, opts) {
      bezier(ctx, bezierToDraw, opts);
    },
    connectedPoints(pointsToDraw, opts) {
      connectedPoints(ctx, pointsToDraw, opts);
    },
    pointLabels(pointsToDraw, opts) {
      pointLabels(ctx, pointsToDraw, opts);
    },
    dot(dotPosition, opts) {
      dot(ctx, dotPosition, opts);
    },
    circle(circlesToDraw, opts) {
      circle(ctx, circlesToDraw, opts);
    },
    arc(arcsToDraw, opts) {
      arc(ctx, arcsToDraw, opts);
    },
    textBlock(lines, opts) {
      if (opts.bounds === void 0 && canvasBounds !== void 0) {
        opts = { ...opts, bounds: { ...canvasBounds, x: 0, y: 0 } };
      }
      textBlock(ctx, lines, opts);
    }
  };
};
var optsOp = (opts) => coloringOp(opts.strokeStyle, opts.fillStyle);
var applyOpts = (ctx, opts = {}, ...additionalOps) => {
  if (ctx === void 0)
    throw new Error(`ctx undefined`);
  const stack = drawingStack(ctx).push(optsOp(opts), ...additionalOps);
  stack.apply();
  return stack;
};
var arc = (ctx, arcs, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (arc2) => {
    ctx.beginPath();
    ctx.arc(arc2.x, arc2.y, arc2.radius, arc2.startRadian, arc2.endRadian);
    ctx.stroke();
  };
  const arcsArray = Array.isArray(arcs) ? arcs : [arcs];
  for (const arc2 of arcsArray) {
    draw2(arc2);
  }
};
var coloringOp = (strokeStyle, fillStyle) => {
  const apply = (ctx) => {
    if (fillStyle)
      ctx.fillStyle = fillStyle;
    if (strokeStyle)
      ctx.strokeStyle = strokeStyle;
  };
  return apply;
};
var lineOp = (lineWidth, lineJoin, lineCap) => {
  const apply = (ctx) => {
    if (lineWidth)
      ctx.lineWidth = lineWidth;
    if (lineJoin)
      ctx.lineJoin = lineJoin;
    if (lineCap)
      ctx.lineCap = lineCap;
  };
  return apply;
};
var drawingStack = (ctx, stk) => {
  if (stk === void 0)
    stk = new StackImmutable();
  const push = (...ops) => {
    if (stk === void 0)
      stk = new StackImmutable();
    const s = stk.push(...ops);
    for (const o of ops)
      o(ctx);
    return drawingStack(ctx, s);
  };
  const pop = () => {
    const s = stk?.pop();
    return drawingStack(ctx, s);
  };
  const apply = () => {
    if (stk === void 0)
      return drawingStack(ctx);
    for (const op of stk.data)
      op(ctx);
    return drawingStack(ctx, stk);
  };
  return { push, pop, apply };
};
var lineThroughPoints = (ctx, points, opts) => {
  applyOpts(ctx, opts);
  ctx.moveTo(points[0].x, points[0].y);
  for (const [index, p] of points.entries()) {
    if (index + 2 >= points.length)
      continue;
    const pNext = points[index + 1];
    const mid = {
      x: (p.x + pNext.x) / 2,
      y: (p.y + pNext.y) / 2
    };
    const cpX1 = (mid.x + p.x) / 2;
    const cpX2 = (mid.x + pNext.x) / 2;
    ctx.quadraticCurveTo(cpX1, pNext.y, mid.x, mid.y);
    ctx.quadraticCurveTo(cpX2, pNext.y, pNext.x, pNext.y);
  }
};
var circle = (ctx, circlesToDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (c) => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.radius, 0, PIPI);
    if (opts.strokeStyle)
      ctx.stroke();
    if (opts.fillStyle)
      ctx.fill();
  };
  if (Array.isArray(circlesToDraw)) {
    for (const c of circlesToDraw)
      draw2(c);
  } else {
    draw2(circlesToDraw);
  }
};
var ellipse = (ctx, ellipsesToDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (ellipse2) => {
    ctx.beginPath();
    const rotation = ellipse2.rotation ?? 0;
    const startAngle = ellipse2.startAngle ?? 0;
    const endAngle = ellipse2.endAngle ?? PIPI;
    ctx.ellipse(ellipse2.x, ellipse2.y, ellipse2.radiusX, ellipse2.radiusY, rotation, startAngle, endAngle);
    if (opts.strokeStyle)
      ctx.stroke();
    if (opts.fillStyle)
      ctx.fill();
  };
  const ellipsesArray = Array.isArray(ellipsesToDraw) ? ellipsesToDraw : [ellipsesToDraw];
  for (const ellipse2 of ellipsesArray) {
    draw2(ellipse2);
  }
};
var paths = (ctx, pathsToDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (path) => {
    if (isQuadraticBezier(path))
      quadraticBezier(ctx, path, opts);
    else if (isLine(path))
      line(ctx, path, opts);
    else
      throw new Error(`Unknown path type ${JSON.stringify(path)}`);
  };
  if (Array.isArray(pathsToDraw)) {
    for (const p of pathsToDraw)
      draw2(p);
  } else {
    draw2(pathsToDraw);
  }
};
var connectedPoints = (ctx, pts, opts = {}) => {
  const shouldLoop = opts.loop ?? false;
  throwArrayTest(pts);
  if (pts.length === 0)
    return;
  for (const [index, pt] of pts.entries())
    guard(pt, `Index ${index}`);
  applyOpts(ctx, opts);
  if (opts.lineWidth)
    ctx.lineWidth = opts.lineWidth;
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (const pt of pts)
    ctx.lineTo(pt.x, pt.y);
  if (shouldLoop)
    ctx.lineTo(pts[0].x, pts[0].y);
  if (opts.strokeStyle || opts.strokeStyle === void 0 && opts.fillStyle === void 0) {
    ctx.stroke();
  }
  if (opts.fillStyle) {
    ctx.fill();
  }
};
var pointLabels = (ctx, pts, opts = {}, labels) => {
  if (pts.length === 0)
    return;
  for (const [index, pt] of pts.entries())
    guard(pt, `Index ${index}`);
  applyOpts(ctx, opts);
  for (const [index, pt] of pts.entries()) {
    const label = labels !== void 0 && index < labels.length ? labels[index] : index.toString();
    ctx.fillText(label.toString(), pt.x, pt.y);
  }
};
var translatePoint = (ctx, point) => {
  const m = ctx.getTransform();
  return {
    x: point.x * m.a + point.y * m.c + m.e,
    y: point.x * m.b + point.y * m.d + m.f
  };
};
var copyToImg = (canvasEl) => {
  const img = document.createElement(`img`);
  img.src = canvasEl.toDataURL(`image/jpeg`);
  return img;
};
var dot = (ctx, pos, opts) => {
  if (opts === void 0)
    opts = {};
  const radius = opts.radius ?? 10;
  applyOpts(ctx, opts);
  ctx.beginPath();
  if (Array.isArray(pos)) {
    for (const p of pos) {
      ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
    }
  } else {
    const p = pos;
    ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
  }
  if (opts.filled || !opts.outlined)
    ctx.fill();
  if (opts.outlined)
    ctx.stroke();
};
var bezier = (ctx, bezierToDraw, opts) => {
  if (isQuadraticBezier(bezierToDraw)) {
    quadraticBezier(ctx, bezierToDraw, opts);
  } else if (isCubicBezier(bezierToDraw)) {
    cubicBezier(ctx, bezierToDraw, opts);
  }
};
var cubicBezier = (ctx, bezierToDraw, opts = {}) => {
  let stack = applyOpts(ctx, opts);
  const { a, b, cubic1, cubic2 } = bezierToDraw;
  const isDebug = opts.debug ?? false;
  if (isDebug) {
  }
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.bezierCurveTo(cubic1.x, cubic1.y, cubic2.x, cubic2.y, b.x, b.y);
  ctx.stroke();
  if (isDebug) {
    stack = stack.push(
      optsOp({
        ...opts,
        strokeStyle: opacity(opts.strokeStyle ?? `silver`, 0.6),
        fillStyle: opacity(opts.fillStyle ?? `yellow`, 0.4)
      })
    );
    stack.apply();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(cubic1.x, cubic1.y);
    ctx.stroke();
    ctx.moveTo(b.x, b.y);
    ctx.lineTo(cubic2.x, cubic2.y);
    ctx.stroke();
    ctx.fillText(`a`, a.x + 5, a.y);
    ctx.fillText(`b`, b.x + 5, b.y);
    ctx.fillText(`c1`, cubic1.x + 5, cubic1.y);
    ctx.fillText(`c2`, cubic2.x + 5, cubic2.y);
    dot(ctx, cubic1, { radius: 3 });
    dot(ctx, cubic2, { radius: 3 });
    dot(ctx, a, { radius: 3 });
    dot(ctx, b, { radius: 3 });
    stack = stack.pop();
    stack.apply();
  }
};
var quadraticBezier = (ctx, bezierToDraw, opts = {}) => {
  const { a, b, quadratic } = bezierToDraw;
  const isDebug = opts.debug ?? false;
  let stack = applyOpts(ctx, opts);
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.quadraticCurveTo(quadratic.x, quadratic.y, b.x, b.y);
  ctx.stroke();
  if (isDebug) {
    stack = stack.push(
      optsOp({
        ...opts,
        strokeStyle: opacity(opts.strokeStyle ?? `silver`, 0.6),
        fillStyle: opacity(opts.fillStyle ?? `yellow`, 0.4)
      })
    );
    connectedPoints(ctx, [a, quadratic, b]);
    ctx.fillText(`a`, a.x + 5, a.y);
    ctx.fillText(`b`, b.x + 5, b.y);
    ctx.fillText(`h`, quadratic.x + 5, quadratic.y);
    dot(ctx, quadratic, { radius: 3 });
    dot(ctx, a, { radius: 3 });
    dot(ctx, b, { radius: 3 });
    stack = stack.pop();
    stack.apply();
  }
};
var line = (ctx, toDraw, opts = {}) => {
  const isDebug = opts.debug ?? false;
  const o = lineOp(opts.lineWidth, opts.lineJoin, opts.lineCap);
  applyOpts(ctx, opts, o);
  const draw2 = (d) => {
    const { a, b } = d;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    if (isDebug) {
      ctx.fillText(`a`, a.x, a.y);
      ctx.fillText(`b`, b.x, b.y);
      dot(ctx, a, { radius: 5, strokeStyle: `black` });
      dot(ctx, b, { radius: 5, strokeStyle: `black` });
    }
    ctx.stroke();
  };
  if (Array.isArray(toDraw)) {
    for (const t of toDraw)
      draw2(t);
  } else {
    draw2(toDraw);
  }
};
var triangle = (ctx, toDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (t) => {
    connectedPoints(ctx, corners2(t), { ...opts, loop: true });
    if (opts.debug) {
      pointLabels(ctx, corners2(t), void 0, [`a`, `b`, `c`]);
    }
  };
  if (Array.isArray(toDraw)) {
    for (const t of toDraw) {
      draw2(t);
    }
  } else {
    draw2(toDraw);
  }
};
var rect = (ctx, toDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const filled = opts.filled ?? (opts.fillStyle === void 0 ? false : true);
  const stroked = opts.stroked ?? (opts.strokeStyle === void 0 ? false : true);
  const draw2 = (d) => {
    const x = `x` in d ? d.x : 0;
    const y = `y` in d ? d.y : 0;
    if (filled)
      ctx.fillRect(x, y, d.width, d.height);
    if (stroked ?? true)
      ctx.strokeRect(x, y, d.width, d.height);
    if (opts.debug) {
      pointLabels(ctx, corners(d), void 0, [`NW`, `NE`, `SE`, `SW`]);
    }
  };
  if (Array.isArray(toDraw)) {
    for (const t of toDraw) {
      draw2(t);
    }
  } else {
    draw2(toDraw);
  }
};
var textWidth = (ctx, text, padding = 0, widthMultiple) => {
  const rect2 = textRect(ctx, text, padding, widthMultiple);
  return rect2.width;
};
var textRect = (ctx, text, padding = 0, widthMultiple) => {
  if (text === void 0 || text === null || text.length === 0)
    return empty;
  const m = ctx.measureText(text);
  const width = widthMultiple ? roundUpToMultiple(m.width, widthMultiple) + padding : m.width + padding;
  return {
    width,
    height: m.actualBoundingBoxAscent + m.actualBoundingBoxDescent + padding + padding
  };
};
var textHeight = (ctx, text, padding = 0) => {
  const rect2 = textRect(ctx, text, padding);
  return rect2.height;
};
var textBlock = (ctx, lines, opts) => {
  applyOpts(ctx, opts);
  const anchorPadding = opts.anchorPadding ?? 0;
  const anchor = opts.anchor;
  const bounds = opts.bounds ?? { x: 0, y: 0, width: 1e6, height: 1e6 };
  const blocks = lines.map((l) => ctx.measureText(l));
  const widths = blocks.map((tm) => tm.width);
  const heights = blocks.map(
    (tm) => tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent
  );
  const maxWidth = Math.max(...widths);
  const totalHeight = heights.reduce((accumulator, value) => accumulator + value, 0);
  let { x, y } = anchor;
  if (anchor.x + maxWidth > bounds.width) {
    x = bounds.width - (maxWidth + anchorPadding);
  } else
    x -= anchorPadding;
  if (x < bounds.x)
    x = bounds.x + anchorPadding;
  if (anchor.y + totalHeight > bounds.height) {
    y = bounds.height - (totalHeight + anchorPadding);
  } else
    y -= anchorPadding;
  if (y < bounds.y)
    y = bounds.y + anchorPadding;
  for (const [index, line2] of lines.entries()) {
    ctx.fillText(line2, x, y);
    y += heights[index];
  }
};
var textBlockAligned = (ctx, text, opts) => {
  const { bounds } = opts;
  const { horiz = `left`, vert = `top` } = opts;
  const lines = typeof text === `string` ? [text] : text;
  applyOpts(ctx, opts);
  ctx.save();
  ctx.translate(bounds.x, bounds.y);
  ctx.textAlign = `left`;
  ctx.textBaseline = `top`;
  const middleX = bounds.width / 2;
  const middleY = bounds.height / 2;
  const blocks = lines.map((l) => ctx.measureText(l));
  const heights = blocks.map(
    (tm) => tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent
  );
  const totalHeight = heights.reduce((accumulator, value) => accumulator + value, 0);
  let y = 0;
  if (vert === `center`)
    y = middleY - totalHeight / 2;
  else if (vert === `bottom`) {
    y = bounds.height - totalHeight;
  }
  for (const [index, line2] of lines.entries()) {
    let x = 0;
    if (horiz === `center`)
      x = middleX - blocks[index].width / 2;
    else if (horiz === `right`)
      x = bounds.width - blocks[index].width;
    ctx.fillText(line2, x, y);
    y += heights[index];
  }
  ctx.restore();
};

// src/visual/Plot2.ts
var Plot2_exports = {};
__export(Plot2_exports, {
  AxisX: () => AxisX,
  AxisY: () => AxisY,
  Legend: () => Legend,
  Plot: () => Plot,
  PlotArea: () => PlotArea,
  Series: () => Series
});

// src/visual/SceneGraph.ts
var SceneGraph_exports = {};
__export(SceneGraph_exports, {
  Box: () => Box,
  CanvasBox: () => CanvasBox,
  CanvasLayoutState: () => CanvasLayoutState,
  CanvasMeasureState: () => CanvasMeasureState,
  LayoutState: () => LayoutState,
  MeasureState: () => MeasureState,
  boxRectFromPx: () => boxRectFromPx,
  boxRectFromRectPx: () => boxRectFromRectPx,
  boxUnitFromPx: () => boxUnitFromPx
});
var boxUnitFromPx = (v) => {
  return { type: `px`, value: v };
};
var boxRectFromPx = (x, y, width, height) => {
  return {
    x: boxUnitFromPx(x),
    y: boxUnitFromPx(y),
    width: boxUnitFromPx(width),
    height: boxUnitFromPx(height)
  };
};
var boxRectFromRectPx = (r) => {
  return {
    x: boxUnitFromPx(r.x),
    y: boxUnitFromPx(r.y),
    width: boxUnitFromPx(r.width),
    height: boxUnitFromPx(r.height)
  };
};
var unitIsEqual = (a, b) => {
  if (a.type === `px` && b.type === `px`) {
    return a.value === b.value;
  }
  return false;
};
var boxRectIsEqual = (a, b) => {
  if (a === void 0 && b === void 0)
    return true;
  if (a === void 0)
    return false;
  if (b === void 0)
    return false;
  if (a.x && b.x && !unitIsEqual(a.x, b.x))
    return false;
  if (a.y && b.y && !unitIsEqual(a.y, b.y))
    return false;
  if (a.width && b.width && !unitIsEqual(a.width, b.width))
    return false;
  if (a.height && b.height && !unitIsEqual(a.height, b.height))
    return false;
  return true;
};
var BaseState = class {
  bounds;
  pass;
  constructor(bounds) {
    this.bounds = bounds;
    this.pass = 0;
  }
  resolveToPx(u, maxValue, defaultValue) {
    if (u === void 0 && defaultValue !== void 0)
      return defaultValue;
    if (u === void 0)
      return;
    if (u.type === void 0)
      throw new TypeError(`Expected 'type' and 'value' fields. Type is missing`);
    if (u.value === void 0)
      throw new TypeError(`Expected 'type' and 'value' fields. Value is missing`);
    if (u.type === `px`)
      return u.value;
    if (u.type === `pc`)
      return u.value * maxValue;
    throw new Error(`Unknown unit type: ${u.type}`);
  }
  resolveBox(box) {
    if (box === void 0)
      return void 0;
    const x = this.resolveToPx(box.x, this.bounds.width);
    const y = this.resolveToPx(box.y, this.bounds.height);
    const width = this.resolveToPx(box.width, this.bounds.width);
    const height = this.resolveToPx(box.height, this.bounds.height);
    if (!width || !height)
      throw new TypeError(`Expected width and height`);
    if (x === void 0 && y === void 0) {
      return Object.freeze({ width, height });
    } else {
      if (!x || !y)
        throw new TypeError(`Expected x and y`);
      return Object.freeze({
        x,
        y,
        width,
        height
      });
    }
  }
};
var MeasureState = class extends BaseState {
  measurements;
  constructor(bounds) {
    super(bounds);
    this.measurements = /* @__PURE__ */ new Map();
  }
  getActualSize(id) {
    const s = this.measurements.get(id);
    if (s === void 0)
      return;
    if (isPlaceholder(s.actual))
      return;
    return s.actual;
  }
  whatIsMeasured() {
    return [...this.measurements.keys()];
  }
};
var LayoutState = class extends BaseState {
  layouts;
  constructor(bounds) {
    super(bounds);
    this.layouts = /* @__PURE__ */ new Map();
  }
};
var Box = class {
  /** Rectangle Box occupies in canvas/etc */
  canvasRegion = placeholderPositioned;
  _desiredRect;
  _measuredSize;
  _layoutPosition;
  children = [];
  _parent;
  _idMap = /* @__PURE__ */ new Map();
  debugLayout = false;
  _visible = true;
  _ready = true;
  takesSpaceWhenInvisible = false;
  _needsMeasuring = true;
  _needsLayoutX = true;
  _needsDrawing = true;
  debugHue = randomHue();
  id;
  /**
   * Constructor.
   * 
   * If `parent` is provided, `parent.onChildAdded(this)` is called.
   * @param parent parent box 
   * @param id id of this box
   */
  constructor(parent, id) {
    this.id = id;
    this._parent = parent;
    parent?.onChildAdded(this);
  }
  /**
   * Returns _true_ if `box` is a child
   * @param box 
   * @returns 
   */
  hasChild(box) {
    const byReference = this.children.find((c) => c === box);
    const byId2 = this.children.find((c) => c.id === box.id);
    return byReference !== void 0 || byId2 !== void 0;
  }
  /**
   * Sends a message to all child boxes.
   * 
   * This first calls `onNotify` on this instance,
   * before calling `notify()` on each child.
   * @param message 
   * @param source 
   */
  notify(message, source) {
    this.onNotify(message, source);
    for (const c of this.children)
      c.notify(message, source);
  }
  *getChildren() {
    return this.children.entries();
  }
  /**
   * Handles a received message
   * @param _message 
   * @param _source 
   */
  onNotify(_message, _source) {
  }
  /**
   * Notification a child box has been added
   * 
   * Throws if
   * - child has parent as its own child
   * - child is same as this
   * - child is already child of this
   * @param child 
   */
  onChildAdded(child) {
    if (child.hasChild(this))
      throw new Error(`Recursive`);
    if (child === this)
      throw new Error(`Cannot add self as child`);
    if (this.hasChild(child))
      throw new Error(`Child already present`);
    this.children.push(child);
    this._idMap.set(child.id, child);
    this.layoutInvalidated(`Box.onChildAdded`);
  }
  /**
   * Sets `_ready` to `ready`. If `includeChildren` is _true_,
   * `setReady` is called on each child
   * @param ready 
   * @param includeChildren 
   */
  setReady(ready, includeChildren = false) {
    this._ready = ready;
    if (includeChildren) {
      for (const c of this.children)
        c.setReady(ready, includeChildren);
    }
  }
  /**
   * Gets visible state
   */
  get visible() {
    return this._visible;
  }
  /**
   * Sets visible state
   */
  set visible(v) {
    if (this._visible === v)
      return;
    this._visible = v;
    this.layoutInvalidated(`Box.set visible`);
  }
  /**
   * Gets the box's desired region, or _undefined_
   */
  get desiredRegion() {
    return this._desiredRect;
  }
  /**
   * Sets the box's desired region.
   * Calls `onLayoutNeeded()`
   */
  set desiredRegion(v) {
    if (boxRectIsEqual(v, this._desiredRect))
      return;
    this._desiredRect = v;
    this.layoutInvalidated(`set desiredRegion`);
  }
  /**
   * Calls `notifyChildLayoutNeeded`
   */
  layoutInvalidated(reason) {
    if (reason === void 0)
      debugger;
    this.debugLog(`layoutInvalidated ${reason}`);
    this._needsMeasuring = true;
    this._needsLayoutX = true;
    this._needsDrawing = true;
    this.notifyChildLayoutNeeded();
  }
  drawingInvalidated(_reason) {
    this._needsDrawing = true;
  }
  /**
   * Called from a child, notifying us that
   * its layout has changed
   * @returns 
   */
  notifyChildLayoutNeeded() {
    this._needsDrawing = true;
    this._needsLayoutX = true;
    this._needsMeasuring = true;
    if (this._parent === void 0)
      return;
    this._parent.notifyChildLayoutNeeded();
  }
  /**
   * Returns the root box
   */
  get root() {
    if (this._parent === void 0)
      return this;
    return this._parent.root;
  }
  /**
   * Prepare for measuring
   */
  measurePreflight() {
  }
  /**
   * Applies actual size, returning _true_ if size is different than before
   * 
   * 1. Sets `_needsLayout` to _false_.
   * 2. Sets `visual` to `m`
   * 3. Calls `measureApply` on each child
   * 4. If there's a change or `force`, sets `needsDrawing` to _true_, and notifies root of `measureApplied`
   * @param m Measurement for box
   * @returns 
   */
  measureApply(m) {
    this._needsMeasuring = false;
    const different = this._measuredSize === void 0 ? true : !isEqualSize(m.actual, this._measuredSize);
    if (different) {
      this._needsLayoutX = true;
    }
    this._measuredSize = { width: m.actual.width, height: m.actual.height };
    for (const c of m.children) {
      if (c !== void 0)
        c.ref.measureApply(c);
    }
    if (different) {
      this.root.notify(`measureApplied`, this);
    }
    return different;
  }
  layoutApply(l) {
    this._needsLayoutX = false;
    const different = this._layoutPosition === void 0 ? true : !point_exports.isEqual(l.actual, this._layoutPosition);
    this._layoutPosition = { x: l.actual.x, y: l.actual.y };
    for (const c of l.children) {
      if (c !== void 0)
        c.ref.layoutApply(c);
    }
    if (different) {
      this.root.notify(`layoutApplied`, this);
    }
    return different;
  }
  /**
   * Debug log from this box context
   * @param m 
   */
  debugLog(m) {
    if (!this.debugLayout)
      return;
    console.log(this.id, m);
  }
  layoutStart(measureState, layoutState, force, parent) {
    const m = {
      ref: this,
      actual: point_exports.Empty,
      children: []
    };
    layoutState.layouts.set(this.id, m);
    const currentPosition = this.layoutSelf(measureState, layoutState, parent);
    this.root.notify(`laidout`, this);
    if (currentPosition === void 0)
      return;
    m.actual = currentPosition;
    m.children = this.children.map((c) => c.layoutStart(measureState, layoutState, force, m));
    if (arrays_exports.withoutUndefined(m.children).length < this.children.length) {
      return void 0;
    }
    return m;
  }
  layoutSelf(measureState, layoutState, _parent) {
    const box = layoutState.resolveBox(this._desiredRect);
    const x = box === void 0 ? 0 : `x` in box ? box.x : 0;
    const y = box === void 0 ? 0 : `y` in box ? box.y : 0;
    if (x === void 0)
      debugger;
    if (y === void 0)
      debugger;
    return { x, y };
  }
  /**
   * Start of measuring
   * 1. Keeps track of measurements in `opts.measurements`
   * 2. If this box takes space
   * 2.1. Measure itself if needed
   * 2.2. Use size
   * 2. Calls `measureStart` on each child
   * @param opts Options
   * @param force Force measurement
   * @param parent Parent's measurement 
   * @returns Measurement
   */
  measureStart(opts, force, parent) {
    this.measurePreflight();
    const m = {
      ref: this,
      // So far no known measurement
      actual: placeholder,
      children: []
    };
    opts.measurements.set(this.id, m);
    if (!this._visible && !this.takesSpaceWhenInvisible) {
      m.actual = emptyPositioned;
    } else {
      let currentMeasurement = this._measuredSize;
      if (this._needsMeasuring || this._measuredSize === void 0) {
        currentMeasurement = this.measureSelf(opts, parent);
        this.root.notify(`measured`, this);
      }
      if (typeof currentMeasurement === `string`) {
        return;
      } else if (currentMeasurement === void 0) {
        return;
      }
      m.actual = currentMeasurement;
    }
    m.children = this.children.map((c) => c.measureStart(opts, force, m));
    if (arrays_exports.withoutUndefined(m.children).length < this.children.length) {
      return void 0;
    }
    return m;
  }
  /**
   * Measure the box
   * 1. Uses desired rectangle, if possible
   * 2. Otherwise uses parent's size
   * @param opts Measure state
   * @param parent Parent size
   * @returns 
   */
  measureSelf(opts, parent) {
    let size = placeholder;
    const context = parent ? parent.actual : opts.bounds;
    const desired = opts.resolveBox(this._desiredRect);
    size = desired ? clamp2(desired, context) : context;
    if (isPlaceholder(size)) {
      return `Box.measureSelf - No size for box?`;
    }
    return size;
  }
  // protected updateDone(state: MeasureState, force: boolean): void {
  //   this.onUpdateDone(state, force);
  //   for (const c of this.children) c.updateDone(state, force);
  // }
  /**
   * Update has completed
   * @param state 
   * @param force 
   */
  //abstract onUpdateDone(state: MeasureState, force: boolean): void;
  /**
   * Update
   * 1. Calls `this.updateBegin()` to initialise measurement state
   * 2. In a loop, run `measureStart()` and then `measureApply` if possible
   * 3. Call `updateDone` when finished
   * @param force Force update
   * @returns 
   */
  update(context, force = false) {
    if (context === void 0)
      throw new Error(`context is undefined`);
    if (!this._needsMeasuring && !this._needsLayoutX && !force)
      return;
    const [measureState, layoutState] = this.updateBegin(context);
    let attempts = 5;
    let measureApplied = false;
    let layoutApplied = false;
    if (this._needsMeasuring || force) {
      while (attempts--) {
        const m = this.measureStart(measureState, force);
        if (m !== void 0) {
          this.measureApply(m);
          if (!this._ready)
            return;
          measureApplied = true;
        }
      }
      if (!measureApplied)
        this.debugLog(`Ran out of measurement attempts`);
    }
    if (this._needsLayoutX || force) {
      const p = this.layoutStart(measureState, layoutState, force);
      if (p === void 0) {
        this.debugLog(`Warning: could not layout`);
      } else {
        this.layoutApply(p);
        layoutApplied = true;
      }
    }
    this.updateComplete(measureApplied, layoutApplied);
  }
};
var CanvasMeasureState = class extends MeasureState {
  ctx;
  constructor(bounds, ctx) {
    super(bounds);
    this.ctx = ctx;
    if (ctx === void 0)
      throw new Error(`ctx is undefined`);
  }
};
var CanvasLayoutState = class extends LayoutState {
  ctx;
  constructor(bounds, ctx) {
    super(bounds);
    this.ctx = ctx;
    if (ctx === void 0)
      throw new Error(`ctx is undefined`);
  }
};
var CanvasBox = class _CanvasBox extends Box {
  bounds;
  constructor(parent, id, bounds) {
    super(parent, id);
    this.bounds = bounds;
    this.debugLog(`CanvasBox ctor bounds: ${JSON.stringify(bounds)}`);
  }
  static fromCanvas(canvasElement) {
    const box = new _CanvasBox(void 0, `canvas-box`, canvasElement.getBoundingClientRect());
    return box;
  }
  /**
   * Called if this is the parent Box
   */
  addEventHandlers(element) {
    element.addEventListener(`pointermove`, (event2) => {
      const p = { x: event2.offsetX, y: event2.offsetY };
      this.notifyPointerMove(p);
    });
    element.addEventListener(`pointerleave`, (_event) => {
      this.notifyPointerLeave();
    });
    element.addEventListener(`click`, (event2) => {
      const p = { x: event2.offsetX, y: event2.offsetY };
      this.notifyClick(p);
    });
  }
  onClick(_p) {
  }
  /**
   * Click event has happened on canvas
   * 1. If it's within our range, call `onClick` and pass to all children via `notifyClick`
   * @param p 
   * @returns 
   */
  notifyClick(p) {
    if (isPlaceholder(this.canvasRegion))
      return;
    if (intersectsPoint(this.canvasRegion, p)) {
      const pp = point_exports.subtract(p, this.canvasRegion.x, this.canvasRegion.y);
      this.onClick(pp);
      for (const c of this.children)
        c.notifyClick(pp);
    }
  }
  /**
   * Pointer has left
   * 1. Pass notification to all children via `notifyPointerLeave`
   */
  notifyPointerLeave() {
    this.onPointerLeave();
    for (const c of this.children)
      c.notifyPointerLeave();
  }
  /**
   * Pointer has moved
   * 1. If it's within range `onPointerMove` is called, and pass on to all children via `notifyPointerMove`
   * @param p 
   * @returns 
   */
  notifyPointerMove(p) {
    if (isPlaceholder(this.canvasRegion))
      return;
    if (intersectsPoint(this.canvasRegion, p)) {
      const pp = point_exports.subtract(p, this.canvasRegion.x, this.canvasRegion.y);
      this.onPointerMove(pp);
      for (const c of this.children)
        c.notifyPointerMove(pp);
    }
  }
  /**
   * Handler when pointer has left
   */
  onPointerLeave() {
  }
  /**
   * Handler when pointer moves within our region
   * @param _p 
   */
  onPointerMove(_p) {
  }
  /**
   * Performs recalculations and drawing as necessary
   * If nothing needs to happen, function returns.
   * @param context 
   * @param force Force update
   */
  update(context, force = false) {
    super.update(context, force);
    this.draw(context, force);
  }
  getBounds() {
    return this.bounds === void 0 && this._parent ? this._parent.bounds : this.bounds;
  }
  /**
   * Update begins.
   * @returns MeasureState
   */
  updateBegin(context) {
    if (context === void 0)
      throw new Error(`Context is undefined`);
    let bounds = this.getBounds();
    if (bounds === void 0) {
      this.debugLog(`No bounds for element or parent, using canvas bounds`);
      bounds = { x: 0, y: 0, width: context.canvas.width, height: context.canvas.height };
    }
    return [
      new CanvasMeasureState(bounds, context),
      new CanvasLayoutState(bounds, context)
    ];
  }
  updateComplete(_measureChanged, _layoutChanged) {
    this.canvasRegion = placeholderPositioned;
  }
  measureApply(m) {
    const different = super.measureApply(m);
    if (different)
      this.canvasRegion = placeholderPositioned;
    return different;
  }
  layoutApply(l) {
    const different = super.layoutApply(l);
    if (different)
      this.canvasRegion = placeholderPositioned;
    return different;
  }
  draw(ctx, force = false) {
    if (this._needsDrawing || force) {
      if (isPlaceholder(this.canvasRegion)) {
        if (this._layoutPosition === void 0)
          return;
        if (this._measuredSize === void 0)
          return;
        this.canvasRegion = {
          x: this._layoutPosition.x,
          y: this._layoutPosition.y,
          width: this._measuredSize.width,
          height: this._measuredSize.height
        };
      }
      if (this._needsLayoutX || this._needsMeasuring) {
      }
      ctx.save();
      const v = this.canvasRegion;
      ctx.translate(v.x, v.y);
      if (this.debugLayout) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = `hsl(${this.debugHue}, 100%, 50%)`;
        ctx.strokeRect(0, 0, v.width, v.height);
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fillText(this.id, 10, 10, v.width);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(v.width, v.height);
        ctx.stroke();
      }
      this.drawSelf(ctx);
      this._needsDrawing = false;
      ctx.restore();
    }
    for (const c of this.children) {
      c.draw(ctx, force);
    }
  }
  /**
   * Draw this object
   * @param _ctx 
   */
  drawSelf(_ctx) {
  }
};

// src/visual/ScaleCanvas.ts
var scaleCanvas = (domQueryOrElement) => {
  const canvasElement = resolveEl(domQueryOrElement);
  const ratio = window.devicePixelRatio;
  canvasElement.style.width = canvasElement.width + `px`;
  canvasElement.style.height = canvasElement.height + `px`;
  canvasElement.width *= devicePixelRatio;
  canvasElement.height *= devicePixelRatio;
  const getContext2 = () => {
    const ctx = canvasElement.getContext(`2d`);
    if (ctx === null)
      throw new Error(`Could not get drawing context`);
    ctx.save();
    ctx.scale(ratio, ratio);
    return ctx;
  };
  return { ctx: getContext2(), element: canvasElement, bounds: canvasElement.getBoundingClientRect() };
};

// src/dom/DomRx.ts
var DomRx_exports = {};
__export(DomRx_exports, {
  resizeObservable: () => resizeObservable,
  themeChange: () => themeChange,
  windowResize: () => windowResize
});
var windowResize = (elapsed) => Ops.debounce({ elapsed: elapsed ?? 100 })(sources_exports.event(window, `resize`));
var themeChange = () => {
  const m = sources_exports.observable((stream2) => {
    const ro = new MutationObserver((entries) => {
      stream2.set(entries);
    });
    const opts = {
      attributeFilter: [`class`],
      attributes: true
    };
    ro.observe(document.documentElement, opts);
    return () => {
      ro.disconnect();
    };
  });
  return m;
};
var resizeObservable = (elem, timeout2) => {
  if (elem === null) {
    throw new Error(`elem parameter is null. Expected element to observe`);
  }
  if (elem === void 0) {
    throw new Error(`elem parameter is undefined. Expected element to observe`);
  }
  const m = sources_exports.observable((stream2) => {
    const ro = new ResizeObserver((entries) => {
      stream2.set(entries);
    });
    ro.observe(elem);
    return () => {
      ro.unobserve(elem);
    };
  });
  return Ops.debounce({ elapsed: timeout2 ?? 100 })(m);
};

// src/dom/CanvasSizing.ts
var parentSizeCanvas = (domQueryOrEl, onResized, timeoutMs = 100) => {
  const el2 = resolveEl(domQueryOrEl);
  if (el2.nodeName !== `CANVAS`) {
    throw new Error(
      `Expected HTML element with node name CANVAS, not ${el2.nodeName}`
    );
  }
  const parent = el2.parentElement;
  if (parent === null)
    throw new Error(`Element has no parent`);
  const ctx = el2.getContext(`2d`);
  if (ctx === null)
    throw new Error(`Could not create drawing context`);
  el2.style.width = `100%`;
  el2.style.height = `100%`;
  const ro = resizeObservable(parent, timeoutMs).value(
    (entries) => {
      const entry = entries.find((v) => v.target === parent);
      if (entry === void 0)
        return;
      const width = entry.contentRect.width;
      const height = entry.contentRect.height;
      el2.setAttribute(`width`, el2.offsetWidth + `px`);
      el2.setAttribute(`height`, el2.offsetHeight + `px`);
      if (onResized !== void 0) {
        const bounds = {
          min: Math.min(width, height),
          max: Math.max(width, height),
          width,
          height,
          center: { x: width / 2, y: height / 2 }
        };
        onResized({ ctx, el: el2, bounds });
      }
    }
  );
  return ro;
};
var fullSizeCanvas = (domQueryOrEl, onResized, skipCss = false) => {
  if (domQueryOrEl === null || domQueryOrEl === void 0) {
    throw new Error(`domQueryOrEl is null or undefined`);
  }
  const el2 = resolveEl(domQueryOrEl);
  if (el2.nodeName !== `CANVAS`) {
    throw new Error(
      `Expected HTML element with node name CANVAS, not ${el2.nodeName}`
    );
  }
  const ctx = el2.getContext(`2d`);
  if (ctx === null)
    throw new Error(`Could not create drawing context`);
  const update = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    el2.width = width;
    el2.height = height;
    if (onResized !== void 0) {
      const bounds = {
        min: Math.min(width, height),
        max: Math.max(width, height),
        width,
        height,
        center: { x: width / 2, y: height / 2 }
      };
      onResized({ ctx, el: el2, bounds });
    }
  };
  if (!skipCss) {
    el2.style.top = `0`;
    el2.style.left = `0`;
    el2.style.zIndex = `-100`;
    el2.style.position = `fixed`;
  }
  const r = windowResize();
  r.value(update);
  update();
  return r;
};

// src/visual/Plot2.ts
var ArrayDataSource = class {
  data;
  series;
  dirty = false;
  type = `array`;
  _range;
  constructor(series) {
    this.series = series;
    this.data = [];
    this.dirty = true;
  }
  clear() {
    this.set([]);
    this._range = void 0;
  }
  set(data) {
    this.data = data;
    this.dirty = true;
  }
  get length() {
    return this.data.length;
  }
  get range() {
    if (!this.dirty && this._range !== void 0)
      return this._range;
    this.dirty = false;
    const updatedRange = minMaxAvg(this.data);
    if (this._range === void 0 || updatedRange.max !== this._range.max || updatedRange.min !== this._range.min) {
      this._range = updatedRange;
      return { ...this._range, changed: true };
    } else {
      return { ...this._range, changed: false };
    }
  }
  add(value) {
    this.data = [...this.data, value];
    this.dirty = true;
  }
};
var StreamingDataSource = class extends ArrayDataSource {
  desiredDataPointMinWidth = 5;
  add(value) {
    const lastWidth = this.series.lastPxPerPt;
    if (lastWidth > -1 && lastWidth < this.desiredDataPointMinWidth) {
      const pts = Math.floor(this.desiredDataPointMinWidth / lastWidth);
      const d = [...this.data.slice(pts), value];
      super.set(d);
    } else
      super.add(value);
  }
};
var Series = class {
  constructor(name, sourceType, plot2, opts) {
    this.plot = plot2;
    this.name = name;
    this.drawingStyle = opts.drawingStyle ?? `line`;
    this.colour = opts.colour;
    this.width = opts.width ?? 3;
    this.axisRange = opts.axisRange ?? { min: Number.NaN, max: Number.NaN };
    this._visualRange = { ...this.axisRange };
    this._visualRangeStretch = opts.visualRangeStretch ?? true;
    if (sourceType === `array`) {
      this.source = new ArrayDataSource(this);
    } else if (sourceType === `stream`) {
      this.source = new StreamingDataSource(this);
    } else
      throw new Error(`Unknown sourceType. Expected array|stream`);
  }
  name;
  colour;
  source;
  drawingStyle;
  width = 3;
  dataHitPoint;
  tooltip;
  precision = 2;
  axisRange;
  // How many pixels wide per data point on last draw
  lastPxPerPt = -1;
  _visualRange;
  _visualRangeStretch;
  formatValue(v) {
    return v.toFixed(this.precision);
  }
  get visualRange() {
    let vr = this._visualRange;
    const sourceRange = this.source.range;
    let changed = false;
    if (sourceRange.changed) {
      if (this._visualRangeStretch) {
        const rmin = Math.min(ifNaN(vr.min, sourceRange.min), sourceRange.min);
        const rmax = Math.max(ifNaN(vr.max, sourceRange.max), sourceRange.max);
        if (rmin !== vr.min || rmax !== vr.max) {
          vr = { min: rmin, max: rmax };
          changed = true;
        }
      } else {
        if (!isRangeEqual(sourceRange, vr)) {
          vr = sourceRange;
          changed = true;
        }
      }
    }
    this._visualRange = vr;
    return { ...vr, changed };
  }
  scaleValue(value) {
    if (this.source === void 0)
      return value;
    const r = this.visualRange;
    if (r.changed) {
      this.plot.notify(`range-change`, this.plot.plotArea);
    }
    if (r.min == r.max) {
      return 0.5;
    }
    return scale(value, r.min, r.max);
  }
  add(value) {
    throwNumberTest(value, ``, `value`);
    this.source.add(value);
    this.plot.plotArea.drawingInvalidated(`Series.add`);
  }
  /**
   * Clears the underlying source
   * and sets a flag that the plot area needs redrawing
   */
  clear() {
    this.source.clear();
    this._visualRange = { ...this.axisRange };
    this.plot.plotArea.layoutInvalidated(`Series.clear`);
  }
};
var PlotArea = class extends CanvasBox {
  constructor(plot2, region) {
    super(plot2, `PlotArea`, region);
    this.plot = plot2;
  }
  paddingPx = 5;
  piPi = Math.PI * 2;
  // If pointer is more than this distance away from a data point, it's ignored
  pointerDistanceThreshold = 20;
  lastRangeChange = 0;
  pointer;
  clear() {
    this.lastRangeChange = 0;
    this.pointer = void 0;
  }
  measureSelf(opts, _parent) {
    const axisY = opts.getActualSize(`AxisY`);
    const padding = this.paddingPx;
    const legend = opts.getActualSize(`Legend`);
    const legendHeight = legend?.height ?? 0;
    const axisX = opts.getActualSize(`AxisX`);
    const axisXHeight = axisX?.height ?? 0;
    if (!axisY)
      return `No AxisY. Measured: ${opts.whatIsMeasured().join(`, `)}`;
    if (!legend)
      return `No Legend`;
    if (!axisX)
      return `No AxisX`;
    return {
      width: opts.bounds.width - axisY.width - this.paddingPx,
      height: opts.bounds.height - legendHeight - axisXHeight - padding
    };
  }
  layoutSelf(measureState, _layoutState, _parent) {
    const axisY = measureState.getActualSize(`AxisY`);
    const padding = this.paddingPx;
    const axisYWidth = axisY?.width ?? 0;
    return {
      x: axisYWidth,
      y: padding
      // layoutState.bounds.height - height - axisXHeight - legendHeight
    };
  }
  onNotify(message, source) {
    if (message === `measureApplied` && source === this.plot.axisY)
      this.layoutInvalidated(`PlotArea.onNotify measureApplied to axisY`);
    if (message === `laidout` && source === this.plot.legend)
      this.layoutInvalidated(`PlotArea.onNotify laidout to legend`);
  }
  // protected onClick(p: Point): void {
  //   this.plot.frozen = !this.plot.frozen;
  // }
  onPointerLeave() {
    for (const series of this.plot.series.values()) {
      series.tooltip = void 0;
    }
    this.pointer = void 0;
    this.plot.legend.drawingInvalidated(`PlotArea.onPointerLeave`);
  }
  onPointerMove(p) {
    this.pointer = p;
    this.plot.legend.drawingInvalidated(`PlotArea.onPointerMove`);
  }
  measurePreflight() {
    this.updateTooltip();
  }
  updateTooltip() {
    const p = this.pointer;
    if (p === void 0)
      return;
    for (const series of this.plot.series.values()) {
      if (p === void 0) {
        series.tooltip = void 0;
        return;
      }
      if (series.dataHitPoint === void 0)
        return;
      const v = series.dataHitPoint(p);
      if (v[0] === void 0)
        return;
      if (v[1] > this.pointerDistanceThreshold)
        return;
      series.tooltip = series.formatValue(v[0].value);
    }
    this.plot.legend.drawingInvalidated(`PlotArea.updateTooltip`);
  }
  drawSelf(ctx) {
    if (this.plot.frozen)
      return;
    const seriesCopy = this.plot.seriesArray();
    ctx.clearRect(0, -1, this.canvasRegion.width, this.canvasRegion.height);
    for (const series of seriesCopy) {
      if (series.source.type === `array` || series.source.type === `stream`) {
        const arraySeries = series.source;
        if (arraySeries.data === void 0)
          return;
        const d = [...arraySeries.data];
        this.drawDataSet(series, d, ctx);
      } else
        console.warn(`Unknown data source type ${series.source.type}`);
    }
  }
  computeY(series, rawValue) {
    const s = series.scaleValue(rawValue);
    return flip(s) * this.canvasRegion.height + this.paddingPx;
  }
  drawDataSet(series, d, ctx) {
    const padding = this.paddingPx + series.width;
    const v = subtract(this.canvasRegion, padding * 2, padding * 3.5);
    const pxPerPt = v.width / d.length;
    series.lastPxPerPt = pxPerPt;
    let x = padding;
    ctx.strokeStyle = series.colour;
    ctx.lineWidth = series.width;
    const shapes = [];
    series.dataHitPoint = (pt) => {
      const distances = shapes.map((v2) => distanceToExterior(pt, v2));
      const index = minIndex(...distances);
      const closest = shapes[index];
      if (closest === void 0)
        [void 0, 0];
      return [closest, distances[index]];
    };
    if (series.drawingStyle === `line`) {
      let y = 0;
      ctx.beginPath();
      for (let index = 0; index < d.length; index++) {
        const scaled = clamp(series.scaleValue(d[index]));
        y = padding + this.paddingPx + v.height * flip(scaled);
        shapes.push({ x, y, index, value: d[index] });
        if (index == 0)
          ctx.moveTo(x + pxPerPt / 2, y);
        else
          ctx.lineTo(x + pxPerPt / 2, y);
        if (y > this.canvasRegion.height)
          console.warn(`${y} h: ${this.canvasRegion.height}`);
        x += pxPerPt;
      }
      ctx.strokeStyle = series.colour;
      ctx.stroke();
    } else if (series.drawingStyle === `dotted`) {
      let y = 0;
      ctx.fillStyle = series.colour;
      for (let index = 0; index < d.length; index++) {
        const scaled = series.scaleValue(d[index]);
        y = padding + v.height * flip(scaled);
        ctx.beginPath();
        ctx.arc(x + pxPerPt / 2, y, series.width, 0, this.piPi);
        ctx.fill();
        shapes.push({ radius: series.width, x, y, index, value: d[index] });
        x += pxPerPt;
      }
    } else if (series.drawingStyle === `bar`) {
      ctx.fillStyle = series.colour;
      const interBarPadding = Math.ceil(pxPerPt * 0.1);
      for (let index = 0; index < d.length; index++) {
        const scaled = series.scaleValue(d[index]);
        const h = v.height * scaled;
        const r = {
          x: x + interBarPadding,
          y: v.height - h + padding,
          width: pxPerPt - interBarPadding,
          height: h,
          index,
          value: d[index]
        };
        ctx.fillRect(r.x, r.y, r.width, r.height);
        shapes.push(r);
        x += pxPerPt;
      }
    }
  }
};
var Legend = class extends CanvasBox {
  constructor(plot2, region) {
    super(plot2, `Legend`, region);
    this.plot = plot2;
  }
  sampleSize = { width: 10, height: 10 };
  padding = 3;
  widthSnapping = 20;
  labelMeasurements = /* @__PURE__ */ new Map();
  clear() {
  }
  layoutSelf(measureState, layoutState, _parent) {
    const axisY = measureState.getActualSize(`AxisY`);
    const axisYWidth = axisY?.width ?? 0;
    const height = this._measuredSize?.height ?? 0;
    return {
      x: axisYWidth,
      y: layoutState.bounds.height - height
    };
  }
  measureSelf(opts, _parent) {
    const series = this.plot.seriesArray();
    const sample = this.sampleSize;
    const padding = this.padding;
    const widthSnapping = this.widthSnapping;
    const ctx = opts.ctx;
    const yAxis = opts.measurements.get(`AxisY`);
    const yAxisWidth = yAxis?.actual.width ?? 0;
    let x = padding;
    let y = padding;
    const availableWidth = opts.bounds.width - yAxisWidth - padding;
    let rowHeight = 0;
    for (const s of series) {
      const startX = x;
      x += sample.width + padding;
      ctx.textBaseline = `middle`;
      const text = textRect(ctx, s.name, padding, widthSnapping);
      x += textWidth(ctx, s.name, padding, widthSnapping);
      if (s.tooltip) {
        x += textWidth(ctx, s.tooltip, padding, widthSnapping);
      }
      const r = { width: 10, height: 10, x: startX, y };
      this.labelMeasurements.set(s.name, r);
      rowHeight = Math.min(sample.height + padding + padding, text.height + padding + padding);
      x += padding;
      if (x > availableWidth) {
        x = padding;
        y += rowHeight;
      }
    }
    return {
      width: availableWidth,
      height: y + rowHeight
    };
  }
  drawSelf(ctx) {
    const series = this.plot.seriesArray();
    const sample = this.sampleSize;
    const padding = this.padding;
    this.debugLog(`drawSelf`);
    ctx.clearRect(0, 0, this.canvasRegion.width, this.canvasRegion.height);
    for (const s of series) {
      const r = this.labelMeasurements.get(s.name);
      if (r === void 0)
        continue;
      let x = r.x;
      ctx.fillStyle = s.colour;
      ctx.fillRect(x, r.y, sample.width, sample.height);
      x += sample.width + padding;
      ctx.textBaseline = `middle`;
      ctx.fillStyle = this.plot.legendTextColour;
      ctx.fillText(s.name, x, r.y + sample.height / 2);
      if (s.tooltip) {
        ctx.fillStyle = this.plot.legendTextColour;
        ctx.fillText(s.tooltip, r.x, r.y + sample.height / 2);
      }
    }
  }
  onNotify(message, source) {
    this.debugLog(`onNotify ${message} source: ${source.id}`);
    if (message === `measureApplied` && source === this._parent.axisY) {
      this.layoutInvalidated(`Legend.onNotify measureApplied to axisY`);
    } else if (message == `range-change`) {
    }
  }
};
var AxisX = class extends CanvasBox {
  constructor(plot2, region) {
    super(plot2, `AxisX`, region);
    this.plot = plot2;
  }
  paddingPx = 2;
  colour;
  clear() {
  }
  onNotify(message, source) {
    if (message === `measureApplied` && source === this.plot.axisY) {
      this.layoutInvalidated(`AxisX.onNotify measureApplied to axisY`);
    }
  }
  drawSelf(ctx) {
    const plot2 = this.plot;
    const v = this.canvasRegion;
    const strokeWidth = plot2.axisStrokeWidth;
    const colour = this.colour ?? plot2.axisStrokeColour;
    ctx.strokeStyle = colour;
    ctx.clearRect(0, 0, v.width, v.height);
    ctx.beginPath();
    ctx.lineWidth = strokeWidth;
    ctx.moveTo(0, strokeWidth / 2);
    ctx.lineTo(v.width, strokeWidth / 2);
    ctx.stroke();
  }
  measureSelf(opts, _parent) {
    const plot2 = this.plot;
    const padding = this.paddingPx;
    const yAxis = opts.measurements.get(`AxisY`);
    const yAxisWidth = yAxis?.actual.width ?? 0;
    const heightOfText = 0;
    const h = plot2.axisStrokeWidth + heightOfText + padding + padding;
    return {
      width: opts.bounds.width - yAxisWidth - padding,
      height: h
    };
  }
  layoutSelf(measureState, _layoutState, _parent) {
    const yAxis = measureState.measurements.get(`AxisY`);
    const legend = measureState.getActualSize(`Legend`);
    const legendHeight = legend?.height ?? 0;
    const yAxisWidth = yAxis?.actual.width ?? 0;
    const height = this._measuredSize?.height ?? 0;
    return {
      x: yAxisWidth,
      y: measureState.bounds.height - height - legendHeight
    };
  }
};
var isRangeEqual = (a, b) => a.max === b.max && a.min === b.min;
var isRangeSinglePoint = (a) => a.max === a.min;
var AxisY = class extends CanvasBox {
  constructor(plot2, region) {
    super(plot2, `AxisY`, region);
    this.plot = plot2;
    this.lastRange = { min: 0, max: 0 };
  }
  // Number of digits axis will be expected to show as a data legend
  _maxDigits = 1;
  seriesToShow;
  paddingPx = 2;
  colour;
  lastRange;
  lastPlotAreaHeight = 0;
  clear() {
    this.lastRange = { min: 0, max: 0 };
    this.lastPlotAreaHeight = 0;
  }
  measurePreflight() {
  }
  onNotify(message, source) {
    const pa = this.plot.plotArea;
    if (message === `range-change`) {
      this.drawingInvalidated(`range-change`);
      return;
    }
    if (message === `measureApplied` && source === pa && pa.canvasRegion.height !== this.lastPlotAreaHeight) {
      this.lastPlotAreaHeight = pa.canvasRegion.height;
      this.drawingInvalidated(`AxisY.onNotify height change`);
    }
  }
  measureSelf(copts) {
    if (copts.ctx === void 0)
      throw new Error(`opts.ctx is undefined`);
    const paddingPx = this.paddingPx;
    let width = this.plot.axisStrokeWidth + paddingPx;
    const series = this.getSeries();
    if (series !== void 0) {
      const r = series.visualRange;
      this._maxDigits = Math.ceil(r.max).toString().length + series.precision + 1;
      const textToMeasure = `9`.repeat(this._maxDigits);
      width += textWidth(copts.ctx, textToMeasure, paddingPx * 2);
    }
    const w = copts.resolveToPx(this.desiredRegion?.width, width, width);
    return {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      width: w,
      height: copts.bounds.height
    };
  }
  layoutSelf(_measureState, _layoutState, _parent) {
    return { x: 0, y: 0 };
  }
  drawSelf(ctx) {
    const s = this.getSeries();
    if (s === void 0) {
      if (this.seriesToShow === void 0)
        return;
      console.warn(`Plot AxisY series '${this.seriesToShow}' is missing.`);
    } else {
      this.seriesAxis(s, ctx);
    }
  }
  getSeries() {
    return this.seriesToShow === void 0 ? (
      // Pick first series
      this.plot.seriesArray()[0]
    ) : (
      // Try designated series name
      this.plot.series.get(this.seriesToShow)
    );
  }
  seriesAxis(series, ctx) {
    const plot2 = this.plot;
    const plotArea = plot2.plotArea;
    const v = this.canvasRegion;
    const paddingPx = this.paddingPx;
    const r = series.visualRange;
    const strokeWidth = plot2.axisStrokeWidth;
    const colour = this.colour ?? plot2.axisStrokeColour;
    ctx.strokeStyle = colour;
    ctx.fillStyle = colour;
    if (Number.isNaN(r.min) && Number.isNaN(r.max))
      return;
    this.lastRange = r;
    ctx.clearRect(0, 0, v.width, v.height);
    ctx.beginPath();
    ctx.lineWidth = strokeWidth;
    const lineX = v.width - strokeWidth / 2;
    ctx.moveTo(lineX, plotArea.paddingPx + strokeWidth);
    ctx.lineTo(lineX, plotArea.canvasRegion.height + paddingPx + strokeWidth + strokeWidth);
    ctx.stroke();
    ctx.textBaseline = `top`;
    const fromRight = v.width - paddingPx * 4;
    ctx.fillStyle = plot2.axisTextColour;
    if (isRangeSinglePoint(r)) {
      this.debugLog(`rangeSinglePoint`);
      drawText(ctx, series.formatValue(r.max), (size) => [
        fromRight - size.width,
        plotArea.computeY(series, r.max) - paddingPx * 4
      ]);
    } else {
      drawText(ctx, series.formatValue(r.max), (size) => [
        fromRight - size.width,
        plotArea.computeY(series, r.max) + strokeWidth / 2
      ]);
      drawText(ctx, series.formatValue(r.min), (size) => [
        fromRight - size.width,
        plotArea.computeY(series, r.min) - 5
      ]);
    }
  }
};
var drawText = (ctx, text, position) => {
  if (ctx === void 0)
    throw new Error(`ctx is undefined`);
  const size = ctx.measureText(text);
  const xy = position(size);
  ctx.fillText(text, xy[0], xy[1]);
};
var Plot = class extends CanvasBox {
  plotArea;
  legend;
  axisX;
  axisY;
  axisStrokeColour;
  axisTextColour;
  legendTextColour;
  axisStrokeWidth;
  series;
  _frozen = false;
  _canvasEl;
  _ctx;
  defaultSeriesOpts;
  constructor(canvasElementOrQuery, opts = {}) {
    const { ctx, element, bounds } = scaleCanvas(canvasElementOrQuery);
    super(void 0, `Plot`);
    this._canvasEl = element;
    this._ctx = ctx;
    if (opts.autoSize) {
      parentSizeCanvas(element, (event2) => {
        this.drawingInvalidated(`resize`);
        this.layoutInvalidated(`resize`);
        this.update(event2.ctx, true);
      });
    }
    this.axisStrokeColour = opts.axisStrokeColour ?? `black`;
    this.axisTextColour = opts.axisTextColour ?? `black`;
    this.legendTextColour = opts.legendTextColour ?? `black`;
    this.axisStrokeWidth = opts.axisStrokeWidth ?? 3;
    this.series = /* @__PURE__ */ new Map();
    this.plotArea = new PlotArea(this, bounds);
    this.legend = new Legend(this, bounds);
    this.axisX = new AxisX(this, bounds);
    this.axisY = new AxisY(this, bounds);
  }
  update(ctx, force = false) {
    if (ctx === void 0)
      ctx = this._ctx;
    super.update(ctx, force);
  }
  /**
   * Calls 'clear()' on each of the series
   */
  clearSeries() {
    for (const series of this.series.values()) {
      series.clear();
    }
    this.update();
  }
  /**
   * Removes all series, plot, legend
   * and axis data.
   */
  clear() {
    this.series = /* @__PURE__ */ new Map();
    this.plotArea.clear();
    this.legend.clear();
    this.axisX.clear();
    this.axisY.clear();
    this.layoutInvalidated(`Plot.clear`);
    this.drawingInvalidated(`Plot.clear`);
    this.update();
  }
  get frozen() {
    return this._frozen;
  }
  set frozen(v) {
    this._frozen = v;
    if (v) {
      this._canvasEl.classList.add(`frozen`);
      this._canvasEl.title = `Plot frozen. Tap to unfreeze`;
    } else {
      this._canvasEl.title = ``;
      this._canvasEl.classList.remove(`frozen`);
    }
  }
  seriesArray() {
    return [...this.series.values()];
  }
  get seriesLength() {
    return this.series.size;
  }
  /**
   * Plots a simple object, eg `{ x: 10, y: 20, z: 300 }`
   * Series are automatically created for each property of `o`
   *
   * Be sure to call `update()` to visually refresh.
   * @param o
   */
  plot(o) {
    const paths2 = getPaths(o, true);
    let seriesCreated = false;
    for (const p of paths2) {
      let s = this.series.get(p);
      if (s === void 0) {
        s = this.createSeries(p, `stream`);
        s.drawingStyle = `line`;
        seriesCreated = true;
      }
      s.add(getField(o, p));
    }
    if (seriesCreated)
      this.legend.layoutInvalidated(`new series`);
    this.update();
  }
  createSeriesFromObject(o, prefix = ``) {
    const keys = Object.keys(o);
    const create3 = (key) => {
      const v = o[key];
      if (typeof v === `object`) {
        return this.createSeriesFromObject(v, `${prefix}${key}.`);
      } else if (typeof v === `number`) {
        return [this.createSeries(key, `stream`)];
      } else {
        return [];
      }
    };
    return keys.flatMap((k) => create3(k));
  }
  createSeries(name, type = `array`, seriesOpts) {
    const seriesLength = this.seriesLength;
    if (name === void 0)
      name = `series-${seriesLength}`;
    if (this.series.has(name))
      throw new Error(`Series name '${name}' already in use`);
    let opts = {
      colour: `hsl(${seriesLength * 25 % 360}, 70%,50%)`,
      ...seriesOpts
    };
    if (this.defaultSeriesOpts)
      opts = { ...this.defaultSeriesOpts, ...opts };
    const s = new Series(name, type, this, opts);
    this.series.set(name, s);
    this.setReady(true, true);
    this.plotArea.drawingInvalidated(`Plot.createSeries`);
    return s;
  }
};

// src/visual/Palette.ts
var Palette_exports = {};
__export(Palette_exports, {
  create: () => create2
});
var create2 = (fallbacks) => new PaletteImpl(fallbacks);
var PaletteImpl = class {
  /* eslint-disable-next-line functional/prefer-readonly-type */
  #store = /* @__PURE__ */ new Map();
  /* eslint-disable-next-line functional/prefer-readonly-type */
  #aliases = /* @__PURE__ */ new Map();
  fallbacks;
  #lastFallback = 0;
  #elementBase;
  constructor(fallbacks) {
    if (fallbacks !== void 0)
      this.fallbacks = fallbacks;
    else
      this.fallbacks = [`red`, `blue`, `green`, `orange`];
    this.#elementBase = document.body;
  }
  setElementBase(el2) {
    this.#elementBase = el2;
  }
  add(key, colour) {
    this.#store.set(key, colour);
  }
  alias(from, to2) {
    this.#aliases.set(from, to2);
  }
  get(key, fallback) {
    const alias = this.#aliases.get(key);
    if (alias !== void 0)
      key = alias;
    const c = this.#store.get(key);
    if (c !== void 0)
      return c;
    const varName = `--` + key;
    let fromCss = getComputedStyle(this.#elementBase).getPropertyValue(varName).trim();
    if (fromCss === void 0 || fromCss.length === 0) {
      if (fallback !== void 0)
        return fallback;
      fromCss = this.fallbacks[this.#lastFallback];
      this.#lastFallback++;
      if (this.#lastFallback === this.fallbacks.length)
        this.#lastFallback = 0;
    }
    return fromCss;
  }
  getOrAdd(key, fallback) {
    if (this.has(key))
      return this.get(key);
    const c = this.get(key, fallback);
    this.add(key, c);
    return c;
  }
  has(key) {
    return this.#store.has(key);
  }
};

// src/visual/BipolarView.ts
var BipolarView_exports = {};
__export(BipolarView_exports, {
  init: () => init
});
function getNumericAttribute(el2, name, defaultValue) {
  const a = el2.getAttribute(name);
  if (a === null)
    return defaultValue;
  return Number.parseInt(a);
}
var init = (elementQuery, opts = {}) => {
  const element = document.querySelector(elementQuery);
  if (!element)
    throw new Error(`Element query could not be found (${elementQuery})`);
  const labels = opts.labels ?? [`x`, `y`];
  const labelPrecision = opts.labelPrecision ?? 2;
  const asPercentages = opts.asPercentages ?? false;
  const showWhiskers = opts.showWhiskers ?? true;
  const showDot = opts.showDot ?? true;
  const showLabels = opts.showLabels ?? true;
  const axisColour = opts.axisColour ?? `silver`;
  const bgColour = opts.bgColour ?? `white`;
  const whiskerColour = opts.whiskerColour ?? `black`;
  const dotColour = opts.dotColour ?? whiskerColour;
  const labelColour = opts.labelColour ?? axisColour;
  const axisWidth = opts.axisWidth ?? 1 * window.devicePixelRatio;
  const dotRadius = opts.dotRadius ?? 5 * window.devicePixelRatio;
  const pad = opts.padding ?? 10 * window.devicePixelRatio;
  const whiskerSize = opts.whiskerSize ?? 5 * window.devicePixelRatio;
  const width = opts.width ?? getNumericAttribute(element, `width`, 200) * window.devicePixelRatio;
  const height = opts.height ?? getNumericAttribute(element, `height`, 200) * window.devicePixelRatio;
  element.width = width;
  element.height = height;
  element.style.width = width / window.devicePixelRatio + `px`;
  element.style.height = height / window.devicePixelRatio + `px`;
  const midY = height / 2;
  const midX = width / 2;
  const ctx = element.getContext(`2d`);
  if (!ctx)
    throw new Error(`Could not create drawing context`);
  if (window.devicePixelRatio >= 2) {
    ctx.font = `20px sans-serif`;
  }
  const percentageFormat = (v) => Math.round(v * 100) + `%`;
  const fixedFormat = (v) => v.toFixed(labelPrecision);
  const valueFormat = asPercentages ? percentageFormat : fixedFormat;
  if (showLabels) {
    labels[0] = labels[0] + `:`;
    labels[1] = labels[1] + `:`;
  } else {
    labels[0] = ``;
    labels[1] = ``;
  }
  const renderBackground = opts.renderBackground ?? ((ctx2, width2, height2) => {
    ctx2.fillStyle = bgColour;
    ctx2.fillRect(0, 0, width2, height2);
  });
  return (x, y) => {
    x = clamp3(x);
    y = clamp3(y);
    renderBackground(ctx, width, height);
    ctx.fillStyle = labelColour;
    ctx.textBaseline = `top`;
    ctx.save();
    ctx.translate(midX, midY);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText((labels[1] + ` ` + valueFormat(y)).trim(), -midX + pad, 1);
    ctx.restore();
    ctx.fillText((labels[0] + ` ` + valueFormat(x)).trim(), pad, midX + 2);
    ctx.strokeStyle = axisColour;
    ctx.lineWidth = axisWidth;
    ctx.beginPath();
    ctx.moveTo(pad, midY);
    ctx.lineTo(width - pad, midY);
    ctx.moveTo(midX, pad);
    ctx.lineTo(midX, height - pad);
    ctx.stroke();
    ctx.closePath();
    const yy = (height - pad - pad) / 2 * -y;
    const xx = (width - pad - pad) / 2 * x;
    ctx.save();
    ctx.translate(midX, midY);
    if (showDot) {
      circle(ctx, { radius: dotRadius, x: xx, y: yy }, { fillStyle: dotColour });
    }
    if (showWhiskers) {
      ctx.strokeStyle = whiskerColour;
      ctx.beginPath();
      ctx.moveTo(0, yy - whiskerSize);
      ctx.lineTo(0, yy + whiskerSize);
      ctx.moveTo(xx - whiskerSize, 0);
      ctx.lineTo(xx + whiskerSize, 0);
      ctx.stroke();
      ctx.closePath();
    }
    ctx.restore();
  };
};

// src/visual/PlotOld.ts
var PlotOld_exports = {};
__export(PlotOld_exports, {
  add: () => add,
  calcScale: () => calcScale,
  defaultAxis: () => defaultAxis,
  draw: () => draw,
  drawValue: () => drawValue,
  plot: () => plot
});
var piPi2 = Math.PI * 2;
var defaultAxis = (name) => ({
  endWith: `none`,
  lineWidth: 1,
  namePosition: `none`,
  name,
  showLabels: name === `y`,
  showLine: true,
  // For y axis, it's the width, for x axis it's the text height
  textSize: name === `y` ? 20 : 10
});
var calcScale = (buffer, drawingOpts, seriesColours) => {
  const scales = [];
  for (const s of buffer.keys()) {
    const series = [...buffer.get(s)];
    if (series.length === 0)
      break;
    let { min, max } = minMaxAvg(series);
    let range = max - min;
    let colour;
    if (seriesColours !== void 0) {
      colour = seriesColours[s];
    }
    if (colour == void 0) {
      colour = drawingOpts.defaultSeriesVariable ? Colour_exports.getCssVariable(
        `accent`,
        drawingOpts.defaultSeriesColour
      ) : drawingOpts.defaultSeriesColour;
    }
    if (range === 0) {
      range = min;
      min = min - range / 2;
      max = max + range / 2;
    }
    scales.push({
      min,
      max,
      range,
      name: s,
      colour
    });
  }
  return scales;
};
var add = (buffer, value, series = ``) => {
  buffer.addKeyedValues(series, value);
};
var drawValue = (index, buffer, drawing) => {
  const c = {
    ...drawing,
    translucentPlot: true,
    leadingEdgeDot: false
  };
  draw(buffer, c);
  drawing = {
    ...drawing,
    highlightIndex: index,
    leadingEdgeDot: true,
    translucentPlot: false,
    style: `none`,
    clearCanvas: false
  };
  draw(buffer, drawing);
};
var scaleWithFixedRange = (buffer, range, drawing) => calcScale(buffer, drawing, drawing.seriesColours).map((s) => ({
  ...s,
  range: range[1] - range[0],
  min: range[0],
  max: range[1]
}));
var draw = (buffer, drawing) => {
  const { x: xAxis, y: yAxis, ctx, canvasSize } = drawing;
  const margin = drawing.margin;
  const series = drawing.y.scaleRange ? scaleWithFixedRange(buffer, drawing.y.scaleRange, drawing) : calcScale(buffer, drawing, drawing.seriesColours);
  if (drawing.clearCanvas)
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  if (drawing.debug) {
    ctx.strokeStyle = `orange`;
    ctx.strokeRect(0, 0, canvasSize.width, canvasSize.height);
  }
  ctx.translate(margin, margin);
  const plotSize = drawing.plotSize ?? plotSizeFromBounds(canvasSize, drawing);
  const axisSize = {
    height: plotSize.height + margin + margin,
    width: plotSize.width
  };
  if (yAxis.showLabels || yAxis.showLine) {
    for (const s of series) {
      if (yAxis.allowedSeries !== void 0 && !yAxis.allowedSeries.includes(s.name))
        continue;
      drawYSeriesScale(s, axisSize, drawing);
    }
    if (series.length > 0 && yAxis.showLine)
      drawYLine(axisSize, series[0], drawing);
  }
  if ((xAxis.showLabels || xAxis.showLine) && series.length > 0) {
    const yPos = yAxis.labelRange ? yAxis.labelRange[0] : series[0].min;
    drawXAxis(
      plotSize.width,
      calcYForValue(yPos, series[0], plotSize.height) + margin + xAxis.lineWidth,
      drawing
    );
  }
  const plotDrawing = {
    ...drawing,
    plotSize
  };
  const ptr = Drawing_exports.translatePoint(ctx, drawing.pointer);
  for (const s of series) {
    const data = buffer.getSource(s.name);
    if (data === void 0)
      continue;
    let leadingEdgeIndex = buffer.typeName === `circular` ? data.pointer - 1 : data.length - 1;
    if (drawing.highlightIndex !== void 0)
      leadingEdgeIndex = drawing.highlightIndex;
    ctx.save();
    ctx.translate(0, margin + margin);
    drawSeriesData(s, data, plotSize, plotDrawing, leadingEdgeIndex);
    ctx.restore();
  }
  if (drawing.showLegend) {
    ctx.save();
    ctx.translate(0, plotSize.height + margin + margin + margin);
    const legendSize = {
      width: plotSize.width,
      height: drawing.x.textSize + margin + margin
    };
    drawLegend(series, drawing, legendSize);
    ctx.restore();
  }
  ctx.resetTransform();
};
var drawYSeriesScale = (series, plotSize, drawing) => {
  const { ctx, y, digitsPrecision, margin } = drawing;
  const { height } = plotSize;
  if (drawing.debug) {
    ctx.strokeStyle = `purple`;
    ctx.strokeRect(0, 0, y.textSize, height + margin);
  }
  ctx.fillStyle = series.colour.length > 0 ? series.colour : `white`;
  if (y.colour)
    ctx.fillStyle = y.colour;
  const min = y.labelRange ? y.labelRange[0] : series.min;
  const max = y.labelRange ? y.labelRange[1] : series.max;
  const range = y.labelRange ? max - min : series.range;
  const mid = min + range / 2;
  const halfHeight = drawing.textHeight / 2;
  ctx.textBaseline = `top`;
  ctx.fillText(
    min.toFixed(digitsPrecision),
    0,
    calcYForValue(min, series, height) - halfHeight
  );
  ctx.fillText(
    mid.toFixed(digitsPrecision),
    0,
    calcYForValue(mid, series, height) - halfHeight
  );
  ctx.fillText(
    max.toFixed(digitsPrecision),
    0,
    calcYForValue(max, series, height) - margin
  );
  ctx.translate(y.textSize + margin, 0);
};
var drawYLine = (plotSize, series, drawing) => {
  if (series === void 0)
    throw new Error(`series undefined`);
  const { ctx, y } = drawing;
  const { height } = plotSize;
  const min = y.labelRange ? y.labelRange[0] : series.min;
  const max = y.labelRange ? y.labelRange[1] : series.max;
  const minPos = calcYForValue(min, series, height);
  const maxPos = calcYForValue(max, series, height);
  ctx.translate(y.lineWidth, 0);
  ctx.lineWidth = y.lineWidth;
  ctx.beginPath();
  ctx.moveTo(0, minPos);
  ctx.lineTo(0, maxPos);
  ctx.strokeStyle = series.colour;
  if (y.colour)
    ctx.strokeStyle = y.colour;
  ctx.stroke();
  ctx.translate(y.lineWidth, 0);
};
var drawLegend = (series, drawing, size) => {
  const { ctx } = drawing;
  const lineSampleWidth = 10;
  let x = 0;
  const lineY = drawing.margin * 3;
  const textY = drawing.margin;
  ctx.lineWidth = drawing.lineWidth;
  for (const s of series) {
    ctx.moveTo(x, lineY);
    ctx.strokeStyle = s.colour;
    ctx.lineTo(x + lineSampleWidth, lineY);
    ctx.stroke();
    x += lineSampleWidth + drawing.margin;
    let label = s.name;
    if (s.lastValue)
      label += ` ` + s.lastValue.toFixed(drawing.digitsPrecision);
    const labelSize = ctx.measureText(label);
    ctx.fillStyle = s.colour;
    ctx.fillText(label, x, textY);
    x += labelSize.width;
  }
};
var drawXAxis = (width, yPos, drawing) => {
  const { ctx, x, y } = drawing;
  if (!x.showLine)
    return;
  if (x.colour)
    ctx.strokeStyle = x.colour;
  ctx.lineWidth = x.lineWidth;
  ctx.beginPath();
  ctx.moveTo(0, yPos);
  ctx.lineTo(width, yPos);
  ctx.stroke();
};
var drawSeriesData = (series, values, plotSize, drawing, leadingEdgeIndex) => {
  const { ctx, lineWidth, translucentPlot = false, margin, x: xAxis } = drawing;
  const style = drawing.style ?? `connected`;
  const height = plotSize.height - margin;
  let dataXScale = 1;
  if (xAxis.scaleRange) {
    const xAxisRange = xAxis.scaleRange[1] - xAxis.scaleRange[0];
    dataXScale = plotSize.width / xAxisRange;
  } else {
    dataXScale = drawing.capacity === 0 ? plotSize.width / values.length : plotSize.width / drawing.capacity;
  }
  const incrementBy = drawing.coalesce ? dataXScale < 0 ? Math.floor(1 / dataXScale) : 1 : 1;
  let x = 0;
  let leadingEdge;
  if (drawing.debug) {
    ctx.strokeStyle = `green`;
    ctx.strokeRect(0, 0, plotSize.width, plotSize.height);
  }
  const colourTransform = (c) => {
    if (translucentPlot)
      return Colour_exports.opacity(c, 0.2);
    return c;
  };
  if (style === `dots`) {
    ctx.fillStyle = colourTransform(series.colour);
  } else if (style === `none`) {
  } else {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = colourTransform(series.colour);
  }
  for (let index = 0; index < values.length; index += incrementBy) {
    const y = calcYForValue(values[index], series, height) - 1;
    if (style === `dots`) {
      ctx.beginPath();
      ctx.arc(x, y, lineWidth, 0, piPi2);
      ctx.fill();
    } else if (style === `none`) {
    } else {
      if (index == 0)
        ctx.moveTo(x, y);
      ctx.lineTo(x, y);
    }
    if (index === leadingEdgeIndex) {
      leadingEdge = { x, y };
      series.lastValue = values[index];
    }
    x += dataXScale;
  }
  if (style === `connected`) {
    ctx.stroke();
  }
  if (leadingEdge !== void 0 && drawing.leadingEdgeDot) {
    ctx.beginPath();
    ctx.fillStyle = colourTransform(series.colour);
    ctx.arc(leadingEdge.x, leadingEdge.y, 3, 0, 2 * Math.PI);
    ctx.fill();
  }
};
var calcYForValue = (v, series, height) => (1 - (v - series.min) / series.range) * height;
var calcSizing = (margin, x, y, showLegend) => {
  let fromLeft = margin;
  if (y.showLabels)
    fromLeft += y.textSize;
  if (y.showLine)
    fromLeft += y.lineWidth;
  if (y.showLabels || y.showLine)
    fromLeft += margin + margin;
  const fromRight = margin;
  const fromTop = margin + margin;
  let fromBottom = margin + margin;
  fromBottom += x.showLabels ? x.textSize : margin;
  if (x.showLine)
    fromBottom += x.lineWidth;
  if (x.showLabels || x.showLine)
    fromBottom += margin;
  if (showLegend)
    fromBottom += x.textSize;
  return {
    left: fromLeft,
    right: fromRight,
    top: fromTop,
    bottom: fromBottom
  };
};
var plotSizeFromBounds = (bounds, opts) => {
  const { width, height } = bounds;
  const sizing = calcSizing(opts.margin, opts.x, opts.y, opts.showLegend);
  return {
    width: width - sizing.left - sizing.right,
    height: height - sizing.top - sizing.bottom
  };
};
var canvasSizeFromPlot = (plot2, opts) => {
  const { width, height } = plot2;
  const sizing = calcSizing(opts.margin, opts.x, opts.y, opts.showLegend);
  return {
    width: width + sizing.left + sizing.right,
    height: height + sizing.top + sizing.bottom
  };
};
var plot = (parentElementOrQuery, opts) => {
  if (parentElementOrQuery === null)
    throw new Error(`parentElOrQuery is null. Expected string or element`);
  const parentEl = resolveEl(parentElementOrQuery);
  let canvasEl;
  let destroyCanvasEl = true;
  let plotSize = opts.plotSize;
  let canvasSize;
  if (parentEl.nodeName === `CANVAS`) {
    canvasEl = parentEl;
    destroyCanvasEl = false;
    canvasSize = { width: canvasEl.width, height: canvasEl.height };
  } else {
    canvasEl = document.createElement(`CANVAS`);
    parentEl.append(canvasEl);
    plotSize = opts.plotSize;
    canvasSize = { width: canvasEl.width, height: canvasEl.height };
  }
  const pointer = { x: 0, y: 0 };
  const onPointerMove = (event2) => {
    pointer.x = event2.offsetX;
    pointer.y = event2.offsetY;
  };
  canvasEl.addEventListener(`pointermove`, onPointerMove);
  const ctx = canvasEl.getContext(`2d`);
  const capacity = opts.capacity ?? 10;
  const buffer = capacity > 0 ? ofCircularMutable({ capacity }) : ofArrayMutable();
  const metrics = ctx.measureText(`Xy`);
  const coalesce = opts.coalesce ?? true;
  if (ctx === null)
    throw new Error(`Drawing context not available`);
  let xAxis = defaultAxis(`x`);
  if (opts.x)
    xAxis = { ...xAxis, ...opts.x };
  let yAxis = defaultAxis(`y`);
  if (opts.y)
    yAxis = { ...yAxis, ...opts.y };
  let drawingOpts = {
    ...opts,
    y: yAxis,
    x: xAxis,
    pointer,
    capacity,
    coalesce,
    plotSize,
    canvasSize,
    ctx,
    textHeight: opts.textHeight ?? metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
    style: opts.style ?? `connected`,
    defaultSeriesColour: opts.defaultSeriesColour ?? `yellow`,
    margin: 3,
    clearCanvas: true,
    leadingEdgeDot: true,
    debug: opts.debug ?? false,
    digitsPrecision: opts.digitsPrecision ?? 2,
    lineWidth: opts.lineWidth ?? 2,
    showLegend: opts.showLegend ?? false
  };
  if (plotSize) {
    const canvasSize2 = canvasSizeFromPlot(plotSize, drawingOpts);
    canvasEl.width = canvasSize2.width;
    canvasEl.height = canvasSize2.height;
    drawingOpts.canvasSize = canvasSize2;
  }
  if (opts.autoSizeCanvas) {
    parentSizeCanvas(canvasEl, (args) => {
      const bounds = args.bounds;
      drawingOpts = {
        ...drawingOpts,
        plotSize: plotSizeFromBounds(bounds, drawingOpts),
        canvasSize: bounds
      };
      draw(buffer, drawingOpts);
    });
  }
  return {
    drawValue: (index) => {
      drawValue(index, buffer, drawingOpts);
    },
    dispose: () => {
      canvasEl.removeEventListener(`pointermove`, onPointerMove);
      if (destroyCanvasEl)
        canvasEl.remove();
    },
    add: (value, series = ``, skipDrawing = false) => {
      add(buffer, value, series);
      if (skipDrawing)
        return;
      draw(buffer, drawingOpts);
    },
    draw: () => {
      draw(buffer, drawingOpts);
    },
    clear: () => {
      buffer.clear();
    }
  };
};

// src/visual/index.ts
try {
  if (typeof window !== `undefined`) {
    window.ixfx = {
      ...window.ixfx,
      Visuals: {
        SceneGraph: SceneGraph_exports,
        Plot2: Plot2_exports,
        Drawing: Drawing_exports,
        Svg: Svg_exports,
        Palette: Palette_exports,
        Colour: Colour_exports,
        Video: Video_exports
      }
    };
  }
} catch {
}

// src/dom/index.ts
var dom_exports = {};
__export(dom_exports, {
  CanvasHelper: () => CanvasHelper,
  DataDisplay: () => DataDisplay,
  DataTable: () => DataTable_exports,
  DragDrop: () => DragDrop_exports,
  Forms: () => Forms_exports,
  Rx: () => DomRx_exports,
  Variables: () => CssVariables_exports,
  byId: () => byId,
  cardinalPosition: () => cardinalPosition,
  clear: () => clear,
  copyToClipboard: () => copyToClipboard,
  createAfter: () => createAfter,
  createIn: () => createIn,
  cycleCssClass: () => cycleCssClass,
  defaultErrorHandler: () => defaultErrorHandler,
  el: () => el,
  elRequery: () => elRequery,
  fullSizeCanvas: () => fullSizeCanvas,
  fullSizeElement: () => fullSizeElement,
  getTranslation: () => getTranslation,
  inlineConsole: () => inlineConsole,
  insertSorted: () => insertSorted,
  log: () => log,
  parentSize: () => parentSize,
  parentSizeCanvas: () => parentSizeCanvas,
  pointScaler: () => pointScaler,
  pointerVisualise: () => pointerVisualise,
  positionFn: () => positionFn,
  positionFromMiddle: () => positionFromMiddle,
  positionRelative: () => positionRelative,
  query: () => query,
  reconcileChildren: () => reconcileChildren,
  resolveEl: () => resolveEl,
  resolveEls: () => resolveEls,
  setCssClass: () => setCssClass,
  setCssDisplay: () => setCssDisplay,
  setCssToggle: () => setCssToggle,
  setHtml: () => setHtml,
  setText: () => setText,
  viewportToSpace: () => viewportToSpace
});

// src/dom/ShadowDom.ts
var addShadowCss = (parentEl, styles) => {
  const styleEl = document.createElement(`style`);
  styleEl.textContent = styles;
  let shadowRoot;
  if (parentEl.shadowRoot) {
    shadowRoot = parentEl.shadowRoot;
    shadowRoot.innerHTML = ``;
  } else {
    shadowRoot = parentEl.attachShadow({ mode: `open` });
  }
  shadowRoot.append(styleEl);
  return shadowRoot;
};

// src/dom/Log.ts
var log = (domQueryOrElement, opts = {}) => {
  const {
    capacity = 0,
    monospaced = true,
    timestamp = false,
    collapseDuplicates = true,
    css = ``
  } = opts;
  let added = 0;
  let lastLog;
  let lastLogRepeats = 0;
  const parentElement = resolveEl(domQueryOrElement);
  const fontFamily = monospaced ? `Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", Monaco, "Courier New", Courier, monospace` : `normal`;
  const shadowRoot = addShadowCss(
    parentElement,
    `
  .log {
    font-family: ${fontFamily};
    background-color: var(--code-background-color);
    padding: var(--padding1, 0.2em);
    overflow-y: auto;
    height:100%;
  }
  .timestamp {
    margin-right: 0.5em;
    opacity: 0.5;
    font-size: 70%;
    align-self: center;
  }
  .line {
    display: flex;
    padding-bottom: 0.1em;
    padding-top: 0.1em;
  }
  .line:hover {
  
  }
  .error {
    color: red;
  }
  .badge {
    border: 1px solid currentColor;
    align-self: center;
    font-size: 70%;
    padding-left: 0.2em;
    padding-right: 0.2em;
    border-radius: 1em;
    margin-left: 0.5em;
    margin-right: 0.5em;
  }
  .msg {
    flex: 1;
    word-break: break-word;
  }
  ${css}
  `
  );
  const el2 = document.createElement(`div`);
  el2.className = `log`;
  shadowRoot.append(el2);
  const error = (messageOrError) => {
    const line2 = document.createElement(`div`);
    if (typeof messageOrError === `string`) {
      line2.innerHTML = messageOrError;
    } else if (messageOrError instanceof Error) {
      const stack = messageOrError.stack;
      line2.innerHTML = stack === void 0 ? messageOrError.toString() : stack.toString();
    } else {
      line2.innerHTML = messageOrError;
    }
    line2.classList.add(`error`);
    append(line2);
    lastLog = void 0;
    lastLogRepeats = 0;
  };
  let lastLogTime = 0;
  const warn = (whatToLog = ``) => {
    const element = log2(whatToLog);
    if (!element)
      return element;
    element.classList.add(`warning`);
    return element;
  };
  const log2 = (whatToLog = ``) => {
    let message;
    const interval = window.performance.now() - lastLogTime;
    if (opts.minIntervalMs && interval < opts.minIntervalMs)
      return;
    lastLogTime = window.performance.now();
    if (typeof whatToLog === `object`) {
      message = JSON.stringify(whatToLog);
    } else if (whatToLog === void 0) {
      message = `(undefined)`;
    } else if (whatToLog === null) {
      message = `(null)`;
    } else if (typeof whatToLog === `number`) {
      if (Number.isNaN(message))
        message = `(NaN)`;
      message = whatToLog.toString();
    } else {
      message = whatToLog;
    }
    if (message.length === 0) {
      const rule = document.createElement(`hr`);
      lastLog = void 0;
      append(rule);
    } else if (message === lastLog && collapseDuplicates) {
      const lastElement = el2.firstElementChild;
      let lastBadge = lastElement.querySelector(`.badge`);
      if (lastBadge === null) {
        lastBadge = document.createElement(`div`);
        lastBadge.className = `badge`;
        lastElement.insertAdjacentElement(`beforeend`, lastBadge);
      }
      if (lastElement !== null) {
        lastBadge.textContent = (++lastLogRepeats).toString();
      }
      return lastElement;
    } else {
      const line2 = document.createElement(`div`);
      line2.textContent = message;
      append(line2);
      lastLog = message;
      return line2;
    }
  };
  const append = (line2) => {
    if (timestamp) {
      const wrapper = document.createElement(`div`);
      const timestamp2 = document.createElement(`div`);
      timestamp2.className = `timestamp`;
      timestamp2.textContent = (/* @__PURE__ */ new Date()).toLocaleTimeString();
      wrapper.append(timestamp2, line2);
      line2.classList.add(`msg`);
      wrapper.classList.add(`line`);
      line2 = wrapper;
    } else {
      line2.classList.add(`line`, `msg`);
    }
    if (opts.reverse) {
      el2.append(line2);
    } else {
      el2.insertBefore(line2, el2.firstChild);
    }
    if (capacity > 0 && ++added > capacity * 2) {
      while (added > capacity) {
        el2.lastChild?.remove();
        added--;
      }
    }
    if (opts.reverse) {
      el2.scrollTop = el2.scrollHeight;
    }
    lastLogRepeats = 0;
  };
  const clear2 = () => {
    el2.innerHTML = ``;
    lastLog = void 0;
    lastLogRepeats = 0;
    added = 0;
  };
  const dispose = () => {
    el2.remove();
  };
  return {
    error,
    log: log2,
    warn,
    append,
    clear: clear2,
    dispose,
    get isEmpty() {
      return added === 0;
    }
  };
};

// src/dom/Util.ts
var import_json5 = __toESM(require_dist(), 1);
var pointScaler = (reference = `viewport`) => {
  switch (reference) {
    case `viewport`: {
      return (a, b) => {
        const pt = getPointParameter(a, b);
        return Object.freeze({
          x: pt.x / window.innerWidth,
          y: pt.y / window.innerHeight
        });
      };
    }
    case `screen`: {
      return (a, b) => {
        const pt = getPointParameter(a, b);
        return Object.freeze({
          x: pt.x / screen.width,
          y: pt.y / screen.height
        });
      };
    }
    case `document`: {
      return (a, b) => {
        const pt = getPointParameter(a, b);
        return Object.freeze({
          x: pt.x / document.body.scrollWidth,
          y: pt.y / document.body.scrollHeight
        });
      };
    }
    default: {
      throw new Error(
        `Unknown 'reference' parameter: ${JSON.stringify(reference)}`
      );
    }
  }
};
var positionFn = (domQueryOrEl, opts = {}) => {
  const targetSpace = opts.target ?? `viewport`;
  const relative = opts.relative ?? false;
  const anchor = opts.anchor ?? `nw`;
  const el2 = resolveEl(domQueryOrEl);
  const vpToSpace = viewportToSpace(targetSpace);
  if (relative) {
    const s = pointScaler(targetSpace);
    return () => s(vpToSpace(cardinal(el2.getBoundingClientRect(), anchor)));
  } else {
    return () => vpToSpace(cardinal(el2.getBoundingClientRect(), anchor));
  }
};
var cardinalPosition = (domQueryOrEl, anchor = `nw`) => {
  const el2 = resolveEl(domQueryOrEl);
  return cardinal(el2.getBoundingClientRect(), anchor);
};
var positionRelative = (domQueryOrEl, target = `viewport`) => {
  const f = positionFn(domQueryOrEl, { relative: true, target });
  return f();
};
var viewportToSpace = (targetSpace = `viewport`) => {
  switch (targetSpace) {
    case `screen`: {
      return (a, b) => {
        const pt = getPointParameter(a, b);
        return Object.freeze({
          x: pt.x + window.screenX,
          y: pt.y + window.screenY
        });
      };
    }
    case `document`: {
      return (a, b) => {
        const pt = getPointParameter(a, b);
        return Object.freeze({
          x: pt.x + window.scrollX,
          y: pt.y + window.scrollY
        });
      };
    }
    case `viewport`: {
      return (a, b) => {
        const pt = getPointParameter(a, b);
        return Object.freeze({
          x: pt.x,
          y: pt.y
        });
      };
    }
    default: {
      throw new Error(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `Unexpected target coordinate space: ${targetSpace}. Expected: viewport, document or screen`
      );
    }
  }
};
var positionFromMiddle = (domQueryOrEl, relativePos, relativeTo = `window`) => {
  if (!domQueryOrEl)
    throw new Error(`domQueryOrEl is null or undefined`);
  const el2 = resolveEl(domQueryOrEl);
  const absPosition = multiply2(
    relativePos,
    window.innerWidth,
    window.innerHeight
  );
  const thingRect = el2.getBoundingClientRect();
  const offsetPos = subtract2(
    absPosition,
    thingRect.width / 2,
    thingRect.height / 2
  );
  el2.style.transform = `translate(${offsetPos.x}px, ${offsetPos.y}px)`;
};
var cycleCssClass = (el2, list) => {
  if (el2 === null || !el2)
    return;
  if (!Array.isArray(list)) {
    throw new TypeError(`List should be an array of strings`);
  }
  for (let index = 0; index < list.length; index++) {
    if (el2.classList.contains(list[index])) {
      el2.classList.remove(list[index]);
      if (index + 1 < list.length) {
        el2.classList.add(list[index + 1]);
      } else {
        el2.classList.add(list[0]);
      }
      return;
    }
  }
  el2.classList.add(list[0]);
};
var getTranslation = (domQueryOrEl) => {
  const el2 = resolveEl(domQueryOrEl);
  const style = window.getComputedStyle(el2);
  const matrix = style.transform;
  if (matrix === `none` || typeof matrix === `undefined`) {
    return {
      x: 0,
      y: 0,
      z: 0
    };
  }
  const matrixType = matrix.includes(`3d`) ? `3d` : `2d`;
  const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(`, `);
  if (matrixType === `2d`) {
    return {
      x: Number.parseFloat(matrixValues[4]),
      y: Number.parseFloat(matrixValues[5]),
      z: 0
    };
  }
  if (matrixType === `3d`) {
    return {
      x: Number.parseFloat(matrixValues[12]),
      y: Number.parseFloat(matrixValues[13]),
      z: Number.parseFloat(matrixValues[14])
    };
  }
  return { x: 0, y: 0, z: 0 };
};
var createAfter = (sibling, tagName) => {
  const el2 = document.createElement(tagName);
  sibling.parentElement?.insertBefore(el2, sibling.nextSibling);
  return el2;
};
var createIn = (parent, tagName) => {
  const el2 = document.createElement(tagName);
  parent.append(el2);
  return el2;
};
var clear = (parent) => {
  let c = parent.lastElementChild;
  while (c) {
    c.remove();
    c = parent.lastElementChild;
  }
};
var copyToClipboard = (object2) => {
  const p = new Promise((resolve, reject) => {
    const string_ = import_json5.default.stringify(object2);
    navigator.clipboard.writeText(JSON.stringify(string_)).then(
      () => {
        resolve(true);
      },
      (error) => {
        console.warn(`Could not copy to clipboard`);
        console.log(string_);
        reject(new Error(error));
      }
    );
  });
  return p;
};
var insertSorted = (parent, element) => {
  const elSort = element.getAttribute(`data-sort`) ?? ``;
  let elAfter;
  let elBefore;
  for (const c of parent.children) {
    const sort = c.getAttribute(`data-sort`) ?? ``;
    if (elSort >= sort)
      elAfter = c;
    if (elSort <= sort)
      elBefore = c;
    if (elAfter !== void 0 && elBefore !== void 0)
      break;
  }
  if (elAfter !== void 0) {
    elAfter.insertAdjacentElement(`afterend`, element);
  } else if (elBefore === void 0) {
    parent.append(element);
  } else {
    elBefore.insertAdjacentElement(`beforebegin`, element);
  }
};
var reconcileChildren = (parentEl, list, createUpdate) => {
  if (parentEl === null)
    throw new Error(`parentEl is null`);
  if (parentEl === void 0)
    throw new Error(`parentEl is undefined`);
  const seen = /* @__PURE__ */ new Set();
  for (const [key, value] of list) {
    const id = `c-${key}`;
    const el2 = parentEl.querySelector(`#${id}`);
    const finalEl = createUpdate(value, el2);
    if (el2 !== finalEl) {
      finalEl.id = id;
      parentEl.append(finalEl);
    }
    seen.add(id);
  }
  const prune = [];
  for (const child of parentEl.children) {
    if (!seen.has(child.id)) {
      prune.push(child);
    }
  }
  for (const p of prune)
    p.remove();
};
var setCssClass = (selectors, value, cssClass) => {
  const elements2 = resolveEls(selectors);
  if (elements2.length === 0)
    return;
  for (const element of elements2) {
    if (value)
      element.classList.add(cssClass);
    else
      element.classList.remove(cssClass);
  }
};
var setCssToggle = (selectors, cssClass) => {
  const elements2 = resolveEls(selectors);
  if (elements2.length === 0)
    return;
  for (const element of elements2) {
    element.classList.toggle(cssClass);
  }
};
var setCssDisplay = (selectors, value) => {
  const elements2 = resolveEls(selectors);
  if (elements2.length === 0)
    return;
  for (const element of elements2) {
    element.style.display = value;
  }
};
var byId = (id) => {
  const element = document.getElementById(id);
  if (element === null)
    throw new Error(`HTML element with id '${id}' not found`);
  return element;
};
var setHtml = (selectors, value) => {
  const elements2 = resolveEls(selectors);
  if (elements2.length === 0)
    return;
  if (typeof value === `number`) {
    value = value.toString();
  }
  for (const element of elements2) {
    element.innerHTML = value;
  }
};
var setText = (selectors, value) => {
  const elements2 = resolveEls(selectors);
  if (elements2.length === 0)
    return;
  if (typeof value === `number`) {
    value = value.toString();
  }
  for (const element of elements2) {
    element.textContent = value;
  }
};
var elRequery = (selectors) => {
  ({
    text: (value) => {
      setText(selectors, value);
    },
    html: (value) => {
      setHtml(selectors, value);
    },
    cssDisplay: (value) => {
      setCssDisplay(selectors, value);
    },
    cssClass: (value, cssClass) => {
      setCssClass(selectors, value, cssClass);
    },
    cssToggle: (cssClass) => {
      setCssToggle(selectors, cssClass);
    },
    el: () => resolveEl(selectors),
    els: () => resolveEls(selectors)
  });
};
var el = (selectors) => {
  const elements2 = resolveEls(selectors);
  return {
    text: (value) => {
      setText(elements2, value);
    },
    html: (value) => {
      setHtml(elements2, value);
    },
    cssDisplay: (value) => {
      setCssDisplay(elements2, value);
    },
    cssClass: (value, cssClass) => {
      setCssClass(elements2, value, cssClass);
    },
    cssToggle: (cssClass) => {
      setCssToggle(elements2, cssClass);
    },
    el: () => elements2[0],
    els: () => elements2
  };
};

// src/dom/DataTable.ts
var DataTable_exports = {};
__export(DataTable_exports, {
  fromList: () => fromList,
  fromObject: () => fromObject
});
var import_json52 = __toESM(require_dist(), 1);
var toHtmlSimple = (v, options) => {
  if (v === null)
    return `(null)`;
  if (v === void 0)
    return `(undefined)`;
  if (typeof v === `boolean`)
    return v ? `true` : `false`;
  if (typeof v === `string`)
    return `"${v}"`;
  if (typeof v === `number`) {
    let vAsNumber = v;
    if (options.roundNumbers !== void 0)
      vAsNumber = round(options.roundNumbers, v);
    if (options.precision !== void 0)
      return vAsNumber.toFixed(options.precision);
    return vAsNumber.toString();
  }
  if (typeof v === `object`)
    return toTableSimple(v, options);
  return import_json52.default.stringify(v);
};
var toTableSimple = (v, options) => {
  let html = `<div style="display:grid; grid-template-columns: repeat(2, 1fr)">`;
  for (const entry of Object.entries(v)) {
    const value = toHtmlSimple(entry[1], options);
    html += `<div class="label" style="display:table-cell">${entry[0]}</div>
      <div class="data" style="display:table-cell">${value}</div>`;
  }
  html += `</div>`;
  return html;
};
var fromList = (parentOrQuery, data) => {
  const parent = resolveEl(parentOrQuery);
  let container = document.createElement(
    `DIV`
  );
  parent.append(container);
  const remove2 = () => {
    if (!container)
      return false;
    container.remove();
    container = void 0;
    return true;
  };
  const update = (data2) => {
    const seenTables = /* @__PURE__ */ new Set();
    for (const [key, value] of data2) {
      const tKey = `table-${key}`;
      seenTables.add(tKey);
      let t = parent.querySelector(`#${tKey}`);
      if (t === null) {
        t = document.createElement(`table`);
        if (!t)
          throw new Error(`Could not create table element`);
        t.id = tKey;
        parent.append(t);
      }
      updateElement(t, value);
    }
    const tables = Array.from(parent.querySelectorAll(`table`));
    for (const t of tables) {
      if (!seenTables.has(t.id)) {
        t.remove();
      }
    }
  };
  if (data)
    update(data);
  return { update, remove: remove2 };
};
var updateElement = (t, data, opts = {}) => {
  const precision = opts.precision ?? 2;
  const idPrefix = opts.idPrefix ?? ``;
  const objectsAsTables = opts.objectsAsTables ?? false;
  if (data === void 0) {
    t.innerHTML = ``;
    return;
  }
  const seenRows = /* @__PURE__ */ new Set();
  for (const [key, value] of Object.entries(data)) {
    const domKey = `${idPrefix}-row-${key}`;
    seenRows.add(domKey);
    let rowEl = t.querySelector(`tr[data-key='${domKey}']`);
    if (rowEl === null) {
      rowEl = document.createElement(`tr`);
      t.append(rowEl);
      rowEl.setAttribute(`data-key`, domKey);
      const keyEl = document.createElement(`td`);
      keyEl.textContent = key;
      keyEl.classList.add(`label`);
      rowEl.append(keyEl);
    }
    let valEl = rowEl.querySelector(`td[data-key='${domKey}-val']`);
    if (valEl === null) {
      valEl = document.createElement(`td`);
      valEl.classList.add(`data`);
      valEl.setAttribute(`data-key`, `${domKey}-val`);
      rowEl.append(valEl);
    }
    let valueHTML;
    if (opts.formatter) {
      valueHTML = opts.formatter(value, key);
    }
    if (valueHTML === void 0) {
      if (typeof value === `object`) {
        valueHTML = objectsAsTables ? toTableSimple(value, opts) : import_json52.default.stringify(value);
      } else if (typeof value === `number`) {
        valueHTML = opts.roundNumbers ? Math.round(value).toString() : value.toFixed(precision);
      } else if (typeof value === `boolean`) {
        valueHTML = value ? `true` : `false`;
      } else if (typeof value === `string`) {
        valueHTML = `"${value}"`;
      } else {
        valueHTML = JSON.stringify(value);
      }
    }
    valEl.innerHTML = valueHTML;
  }
  const rows = Array.from(t.querySelectorAll(`tr`));
  for (const r of rows) {
    const key = r.getAttribute(`data-key`);
    if (!seenRows.has(key)) {
      r.remove();
    }
  }
};
var fromObject = (parentOrQuery, data, opts) => {
  const parent = resolveEl(parentOrQuery);
  const idPrefix = opts?.idPrefix ?? Math.floor(Math.random() * 1e3).toString();
  let t = document.createElement(`table`);
  parent.append(t);
  const remove2 = () => {
    if (!t)
      return false;
    t.remove();
    t = void 0;
    return true;
  };
  if (data)
    updateElement(t, data, opts);
  const update = (d) => {
    if (!t)
      throw new Error(`Table disposed`);
    updateElement(t, d, { ...opts, idPrefix });
  };
  return { remove: remove2, update };
};

// src/dom/DataDisplay.ts
var DataDisplay = class {
  dataTable;
  /**
   * Constructor
   * @param options Options
   */
  constructor(options = {}) {
    const theme = options.theme ?? `dark`;
    const existing = document.querySelector(`#ixfx-data-display`);
    if (existing !== null)
      throw new Error(`DataDisplay already loaded on this page`);
    const container = document.createElement(`div`);
    container.id = `ixfx-data-display`;
    container.classList.add(`theme-${theme}`);
    const css = document.createElement(`style`);
    css.textContent = `
    #ixfx-data-display {
      background: white;
      color: black;
      border: 2px solid hsl(0deg 0.61% 90%);
      border-radius: 4px;
      z-index: 1000;
      opacity: 40%;
      padding: 1em;
      font-family: monospace;
      position: fixed;
      right: 1em;
      top: 1em;
    }
    #ixfx-data-display.theme-dark {
      background: black;
      color: white;
      border: 2px solid hsl(0deg 0.61% 10%);
    }
    #ixfx-data-display:hover {
      opacity: 100%;
    }
    #ixfx-data-display table {
      border-collapse: collapse;
    }
    #ixfx-data-display tr:not(:last-child) {
      border-bottom: 2px solid hsl(0deg 0.61% 90%);
    }
    #ixfx-data-display.dark tr:not(:last-child) {
      border-bottom: 2px solid hsl(0deg 0.61% 10%);
    }
    #ixfx-data-display td {
      padding-bottom: 0.4em;
      padding-top: 0.4em;
    }
    #ixfx-data-display .label {
      color: hsl(0deg 0.61% 60%);
      text-align: right;
      padding-right: 0.5em;
    }
    #ixfx-data-display.theme-dark .label {
      color: gray;
    }
    `;
    container.style.display = `inline-block`;
    document.body.append(css);
    document.body.append(container);
    this.dataTable = fromObject(container, void 0, {
      objectsAsTables: true,
      roundNumbers: 2
    });
  }
  update(data) {
    this.dataTable.update(data);
  }
};

// src/dom/ElementSizing.ts
var fullSizeElement = (domQueryOrEl, onResized) => {
  const el2 = resolveEl(domQueryOrEl);
  const r = windowResize();
  const update = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    el2.setAttribute(`width`, width.toString());
    el2.setAttribute(`height`, height.toString());
    if (onResized !== void 0) {
      const bounds = {
        min: Math.min(width, height),
        max: Math.max(width, height),
        width,
        height,
        center: {
          x: width / 2,
          y: height / 2
        }
      };
      onResized({ el: el2, bounds });
    }
  };
  r.value(update);
  update();
  return r;
};
var parentSize = (domQueryOrEl, onResized, timeoutMs = 100) => {
  const el2 = resolveEl(domQueryOrEl);
  const parent = el2.parentElement;
  if (parent === null)
    throw new Error(`Element has no parent`);
  const ro = resizeObservable(parent, timeoutMs).value(
    (entries) => {
      const entry = entries.find((v) => v.target === parent);
      if (entry === void 0)
        return;
      const width = entry.contentRect.width;
      const height = entry.contentRect.height;
      el2.setAttribute(`width`, width + `px`);
      el2.setAttribute(`height`, height + `px`);
      if (onResized !== void 0) {
        const bounds = {
          min: Math.min(width, height),
          max: Math.max(width, height),
          width,
          height,
          center: { x: width / 2, y: height / 2 }
        };
        onResized({ el: el2, bounds });
      }
    }
  );
  return ro;
};

// src/dom/PointerVisualise.ts
var pointerVisualise = (elOrQuery, opts = {}) => {
  const touchRadius = opts.touchRadius ?? 45;
  const mouseRadius = opts.touchRadius ?? 20;
  const trace = opts.trace ?? false;
  const hue = opts.hue ?? 100;
  const startFillStyle = `hsla(${hue}, 100%, 10%, 10%)`;
  let currentHue = hue;
  const el2 = resolveEl(elOrQuery);
  const tracker = pointsTracker({
    storeIntermediate: trace
  });
  const svg = document.createElementNS(
    `http://www.w3.org/2000/svg`,
    `svg`
  );
  svg.id = `pointerVis`;
  svg.style.zIndex = `-1000`;
  svg.style.position = `fixed`;
  svg.style.top = `0`;
  svg.style.left = `0`;
  svg.style.width = `100%`;
  svg.style.height = `100%`;
  svg.style.boxSizing = `border-box`;
  svg.style.border = `3px solid red`;
  svg.style.pointerEvents = `none`;
  svg.style.touchAction = `none`;
  fullSizeElement(svg);
  let pointerCount = 0;
  const lostPointer = (event2) => {
    const id = event2.pointerId.toString();
    tracker.delete(id);
    currentHue = hue;
    svg.querySelector(`#pv-start-${id}`)?.remove();
    for (let index = 0; index < pointerCount + 10; index++) {
      svg.querySelector(`#pv-progress-${id}-${index}`)?.remove();
    }
    pointerCount = 0;
  };
  const trackPointer = async (event2) => {
    const id = event2.pointerId.toString();
    const pt = { x: event2.x, y: event2.y };
    const type = event2.pointerType;
    if (event2.type === `pointermove` && !tracker.has(id)) {
      return;
    }
    const info = await tracker.seen(event2.pointerId.toString(), { x: event2.clientX, y: event2.clientY });
    if (info.values.length === 1) {
      const el3 = SvgElements_exports.circle(
        {
          ...info.values[0],
          radius: type === `touch` ? touchRadius : mouseRadius
        },
        svg,
        {
          fillStyle: startFillStyle
        },
        `#pv-start-${id}`
      );
      el3.style.pointerEvents = `none`;
      el3.style.touchAction = `none`;
    }
    const fillStyle = `hsla(${currentHue}, 100%, 50%, 50%)`;
    const el22 = SvgElements_exports.circle(
      { ...pt, radius: type === `touch` ? touchRadius : mouseRadius },
      svg,
      {
        fillStyle
      },
      `#pv-progress-${id}-${info.values.length}`
    );
    el22.style.pointerEvents = `none`;
    el22.style.touchAction = `none`;
    currentHue += 1;
    pointerCount = info.values.length;
  };
  document.body.append(svg);
  el2.addEventListener(`pointerdown`, trackPointer);
  el2.addEventListener(`pointermove`, trackPointer);
  el2.addEventListener(`pointerup`, lostPointer);
  el2.addEventListener(`pointerleave`, lostPointer);
  el2.addEventListener(`contextmenu`, (event2) => {
    event2.preventDefault();
  });
};

// src/dom/ErrorHandler.ts
var defaultErrorHandler = () => {
  let enabled = true;
  const container = document.createElement(`div`);
  container.style.color = `black`;
  container.style.border = `2px solid red`;
  container.style.backgroundColor = `hsl(0, 80%, 90%)`;
  container.style.padding = `1em`;
  container.style.display = `none`;
  container.style.top = `1em`;
  container.style.left = `1em`;
  container.style.position = `absolute`;
  container.style.fontFamily = `monospace`;
  const messageElement = document.createElement(`div`);
  messageElement.style.maxWidth = `50vw`;
  messageElement.style.maxHeight = `50vh`;
  messageElement.style.overflowY = `scroll`;
  container.innerHTML = `<h1>Error</h1>`;
  container.append(messageElement);
  const styleButton = (b) => {
    b.style.padding = `0.3em`;
    b.style.marginTop = `1em`;
  };
  const buttonClose = document.createElement(`button`);
  buttonClose.textContent = `Close`;
  buttonClose.addEventListener(`click`, () => {
    hide();
  });
  const buttonStop = document.createElement(`button`);
  buttonStop.textContent = `Stop displaying errors`;
  buttonStop.addEventListener(`click`, () => {
    enabled = false;
    hide();
  });
  styleButton(buttonClose);
  styleButton(buttonStop);
  container.append(buttonClose);
  container.append(buttonStop);
  document.body.append(container);
  const show = (ex) => {
    container.style.display = `inline`;
    messageElement.innerHTML += ex.stack ? `<pre>${ex.stack}</pre>` : `<p>${getErrorMessage(ex)}</p>`;
  };
  const hide = () => {
    container.style.display = `none`;
  };
  window.onerror = (message, url, lineNo, colNo, error) => {
    if (enabled) {
      if (error) {
        console.log(error);
        show(error);
      } else {
        console.log(message);
        show(message);
      }
    }
  };
  window.addEventListener(`unhandledrejection`, (event2) => {
    console.log(event2.reason);
    if (enabled) {
      show(event2.reason);
    }
  });
  return { show, hide };
};

// src/dom/DragDrop.ts
var DragDrop_exports = {};
__export(DragDrop_exports, {
  draggable: () => draggable
});
var draggable = (elem, listener) => {
  let initial = point_exports.Placeholder;
  let token;
  const onParentClick = () => {
    const selected = elem.classList.contains(`drag-sel`);
    if (selected) {
      elem.classList.remove(`drag-sel`);
    }
  };
  const onElementClick = (event2) => {
    const selected = elem.classList.contains(`drag-sel`);
    if (selected) {
      elem.classList.remove(`drag-sel`);
    } else {
      elem.classList.add(`drag-sel`);
    }
    event2.stopPropagation();
  };
  elem.ownerDocument.addEventListener(`click`, onParentClick);
  elem.addEventListener(`click`, onElementClick);
  const dragCleanup = () => {
    elem.classList.remove(`drag-progress`);
    elem.ownerDocument.removeEventListener(`pointermove`, onPointerMove);
    elem.ownerDocument.removeEventListener(`pointerup`, onPointerUp);
    elem.ownerDocument.removeEventListener(`pointercancel`, onDragCancel);
  };
  const dispose = () => {
    console.log(`drag dispose`);
    if (elem.classList.contains(`drag-progress`)) {
      onDragCancel(void 0, `dispose`);
    } else {
      dragCleanup();
    }
    elem.ownerDocument.removeEventListener(`click`, onParentClick);
    elem.removeEventListener(`click`, onElementClick);
  };
  const onPointerMove = (moveEvent) => {
    moveEvent.preventDefault();
    moveEvent.stopPropagation();
    const offset = point_exports.isPlaceholder(initial) ? { x: moveEvent.offsetX, y: moveEvent.offsetY } : {
      x: moveEvent.x - initial.x,
      y: moveEvent.y - initial.y
    };
    const state = {
      delta: offset,
      initial,
      token
    };
    if (typeof listener.progress !== `undefined` && !listener.progress(state)) {
      onDragCancel(void 0, `discontinued`);
    }
  };
  const onPointerUp = (upEvent) => {
    dragCleanup();
    const offset = {
      x: upEvent.x - initial.x,
      y: upEvent.y - initial.y
    };
    const state = {
      initial,
      token,
      delta: offset
    };
    if (typeof listener.success !== `undefined`) {
      listener.success(state);
    }
  };
  const onDragCancel = (event2, reason = `pointercancel`) => {
    dragCleanup();
    const state = {
      token,
      initial,
      delta: { x: -1, y: -1 }
    };
    if (typeof listener.abort !== `undefined`) {
      listener.abort(reason, state);
    }
  };
  elem.addEventListener(`pointerdown`, (event2) => {
    const selected = elem.classList.contains(`drag-sel`);
    if (!selected)
      return;
    initial = { x: event2.x, y: event2.y };
    const s = typeof listener.start === `undefined` ? { allow: true, token } : listener.start();
    if (!s.allow)
      return;
    token = s.token;
    elem.classList.add(`drag-progress`);
    elem.ownerDocument.addEventListener(`pointermove`, onPointerMove);
    elem.ownerDocument.addEventListener(`pointerup`, onPointerUp);
    elem.ownerDocument.addEventListener(`pointercancel`, onDragCancel);
  });
  return dispose;
};

// src/dom/InlineConsole.ts
var inlineConsole = (opts = {}) => {
  const original = {
    log: console.log,
    error: console.error,
    warn: console.warn
  };
  const logElement = document.createElement(`DIV`);
  logElement.id = `ixfx-log`;
  logElement.style.position = `fixed`;
  logElement.style.left = `0px`;
  logElement.style.top = `0px`;
  logElement.style.pointerEvents = `none`;
  logElement.style.display = `none`;
  document.body.prepend(logElement);
  const logger = log(logElement, opts);
  const visibility = (show) => {
    logElement.style.display = show ? `block` : `none`;
  };
  console.error = (message, ...optionalParameters) => {
    logger.error(message);
    if (optionalParameters.length > 0) {
      logger.error(optionalParameters);
    }
    original.error(message, ...optionalParameters);
    visibility(true);
  };
  console.warn = (message, ...optionalParameters) => {
    logger.warn(message);
    if (optionalParameters.length > 0) {
      logger.warn(optionalParameters);
    }
    visibility(true);
  };
  console.log = (message, ...optionalParameters) => {
    logger.log(message);
    if (optionalParameters.length > 0) {
      logger.log(optionalParameters);
    }
    original.log(message, ...optionalParameters);
    visibility(true);
  };
  window.onerror = (event2, source, lineno, _colno, error) => {
    const abbreviatedSource = source === void 0 ? `` : afterMatch(source, `/`, { fromEnd: true });
    const eventString = getErrorMessage(error);
    logger.error(eventString + ` (${abbreviatedSource}:${lineno})`);
    visibility(true);
  };
};

// src/dom/CssVariables.ts
var CssVariables_exports = {};
__export(CssVariables_exports, {
  parseAsAttributes: () => parseAsAttributes,
  setFromVariables: () => setFromVariables
});
var parseAsAttributes = (options) => {
  return options.map((opt) => {
    let defaultValue;
    if (Array.isArray(opt)) {
      defaultValue = opt[1];
      opt = opt[0];
    }
    const dash = opt.indexOf(`-`);
    if (dash < 0)
      throw new Error(`Simple expression expects form of: 'elementid-attribute'`);
    return {
      variable: opt,
      attribute: opt.slice(dash + 1),
      id: opt.slice(0, dash),
      defaultValue
    };
  });
};
var setFromVariables = (context, ...options) => {
  const contextEl = resolveEl(context);
  const style = window.getComputedStyle(contextEl);
  for (const opt of options) {
    const variable = afterMatch(opt.variable, `--`);
    let v = style.getPropertyValue(`--${variable}`);
    if (v === null || v.length === 0) {
      if (opt.defaultValue === void 0) {
        continue;
      } else {
        v = opt.defaultValue;
      }
    }
    let query2;
    let els;
    if (`query` in opt && opt.query !== void 0) {
      query2 = opt.query;
    } else if (`id` in opt && opt.id !== void 0) {
      query2 = `#${opt.id}`;
    } else if (`element` in opt && opt.element !== void 0) {
      els = Array.isArray(opt.element) ? opt.element : [opt.element];
    }
    if (query2 === void 0) {
      if (els === void 0) {
        throw new Error(`Missing query, id or element`);
      }
    } else {
      els = [...contextEl.querySelectorAll(query2)];
    }
    if (els === null)
      continue;
    if (els === void 0)
      continue;
    if (opt.attribute) {
      for (const el2 of els) {
        el2.setAttribute(opt.attribute, v);
      }
    } else if (opt.field) {
      for (const el2 of els) {
        el2[opt.field] = v;
      }
    } else {
      throw new Error(`Neither 'attribute' or 'field' to set is defined in option (${JSON.stringify(opt)})`);
    }
  }
};

// src/dom/CanvasHelper.ts
var CanvasHelper = class extends SimpleEventEmitter {
  el;
  opts;
  #scaler;
  #currentSize = rect_exports.empty;
  #ctx;
  constructor(domQueryOrEl, opts = {}) {
    super();
    if (!domQueryOrEl)
      throw new Error(`Param 'domQueryOrEl' is null or undefined`);
    this.el = resolveEl(domQueryOrEl);
    if (this.el.nodeName !== `CANVAS`) {
      throw new Error(`Expected CANVAS HTML element. Got: ${this.el.nodeName}`);
    }
    this.opts = {
      fill: opts.fill ?? `none`,
      height: opts.height ?? -1,
      width: opts.width ?? -1,
      zIndex: opts.zIndex ?? -1,
      scaleBy: opts.scaleBy ?? `both`,
      onResize: opts.onResize,
      clearOnResize: opts.clearOnResize ?? true,
      draw: opts.draw,
      skipCss: opts.skipCss ?? false
    };
    this.#scaler = Scaler_exports.scaler(`both`);
    this.#init();
  }
  #getContext(reset = false) {
    if (this.#ctx === void 0 || reset) {
      const ratio = this.ratio;
      const c = this.el.getContext(`2d`);
      if (c === null)
        throw new Error(`Could not create drawing context`);
      this.#ctx = c;
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.scale(ratio, ratio);
    }
    return this.#ctx;
  }
  #setLogicalSize(logicalSize) {
    rect_exports.guard(logicalSize, `logicalSize`);
    const ratio = window.devicePixelRatio || 1;
    this.#scaler = Scaler_exports.scaler(this.opts.scaleBy, logicalSize);
    const pixelScaled = multiply(logicalSize, ratio, ratio);
    this.el.width = pixelScaled.width;
    this.el.height = pixelScaled.height;
    this.el.style.width = logicalSize.width.toString() + `px`;
    this.el.style.height = logicalSize.height.toString() + `px`;
    this.#getContext(true);
    if (this.opts.clearOnResize) {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
    this.#currentSize = logicalSize;
    const r = this.opts.onResize;
    if (r) {
      setTimeout(() => {
        r(this.ctx, this.size, this);
      }, 100);
    }
    this.fireEvent(`resize`, { ctx: this.ctx, size: this.#currentSize, helper: this });
  }
  /**
   * Notified that parent has changed size
   * @returns 
   */
  #onParentResize() {
    const parentEl = this.el.parentElement;
    if (!parentEl)
      return;
    const bounds = parentEl.getBoundingClientRect();
    this.#setLogicalSize({ width: bounds.width, height: bounds.height });
  }
  /**
   * Notified that window has changed size
   */
  #onWindowResize() {
    this.#setLogicalSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }
  #init() {
    switch (this.opts.fill) {
      case `viewport`: {
        if (!this.opts.skipCss) {
          this.el.style.position = `absolute`;
          this.el.style.left = `0px`;
          this.el.style.top = `0px`;
          this.el.style.zIndex = this.opts.zIndex.toString();
        }
        const r = windowResize();
        r.value(() => {
          this.#onWindowResize();
        });
        this.#onWindowResize();
        break;
      }
      case `parent`: {
        const parentEl = this.el.parentElement;
        if (!parentEl)
          throw new Error(`Canvas element has no parent?!`);
        if (!this.opts.skipCss) {
          this.el.style.position = `relative`;
          this.el.style.left = `0px`;
          this.el.style.top = `0px`;
        }
        const r = windowResize();
        r.value(() => {
          this.#onParentResize();
        });
        this.#onParentResize();
        break;
      }
      case `none`: {
        let { width, height } = this.el.getBoundingClientRect();
        if (this.opts.width > 0)
          width = this.opts.width;
        if (this.opts.height > 0)
          height = this.opts.height;
        const desiredSize = { width, height };
        this.#setLogicalSize(desiredSize);
        break;
      }
      default: {
        throw new Error(`Unknown 'fill' value. Expecting: 'none', 'viewport' or 'fill'`);
      }
    }
    const d = this.opts.draw;
    if (d) {
      const sched = () => {
        d(this.ctx, this.#currentSize, this);
        requestAnimationFrame(sched);
      };
      setTimeout(() => {
        sched();
      }, 100);
    }
  }
  /**
   * Clears the canvas.
   * 
   * Shortcut for:
   * `this.ctx.clearRect( 0, 0, this.width, this.height)`
   */
  clear() {
    if (this.#ctx) {
      this.#ctx.clearRect(0, 0, this.width, this.height);
    }
  }
  /**
   * Gets the drawing context
   */
  get ctx() {
    if (this.#ctx === void 0)
      throw new Error(`Context not available`);
    return this.#getContext();
  }
  /**
   * Gets the logical width of the canvas
   * See also: {@link height}, {@link size}
   */
  get width() {
    return this.#currentSize.width;
  }
  /**
   * Gets the logical height of the canvas
   * See also: {@link width}, {@link size}
   */
  get height() {
    return this.#currentSize.height;
  }
  /**
   * Gets the logical size of the canvas
   * See also: {@link width}, {@link height}
   */
  get size() {
    return this.#currentSize;
  }
  /**
   * Gets the current scaling ratio being used
   * to compensate for high-DPI display
   */
  get ratio() {
    return window.devicePixelRatio || 1;
  }
  /**
   * Returns the width or height, whichever is smallest
   */
  get dimensionMin() {
    return Math.min(this.width, this.height);
  }
  /**
   * Returns the width or height, whichever is largest
   */
  get dimensionMax() {
    return Math.max(this.width, this.height);
  }
  /**
   * Returns a {@link Scaler} that converts from relative to absolute
   * coordinates.
   * This is based on the canvas size.
   * 
   * ```js
   * // Assuming a canvas of 800x600
   * toAbsolute({ x: 1, y: 1 });      // { x: 800, y: 600}
   * toAbsolute({ x: 0, y: 0 });      // { x: 0, y: 0}
   * toAbsolute({ x: 0.5, y: 0.5 });  // { x: 400, y: 300}
   * ```
   */
  get toAbsolute() {
    return this.#scaler.abs;
  }
  /**
   * Returns a {@link Scaler} that converts from absolute
   * to relative coordinates.
   * This is based on the canvas size.
   * 
   * ```js
   * // Assuming a canvas of 800x500
   * toRelative({ x: 800, y:600 });  // { x: 1,   y: 1 }
   * toRelative({ x: 0,   y: 0 });   // { x: 0,   y: 0 }
   * toRelative({ x: 400, y: 300 }); // { x: 0.5, y: 0.5 }
   * ```
   */
  get toRelative() {
    return this.#scaler.rel;
  }
  /**
   * Gets the center coordinate of the canvas
   */
  get center() {
    return { x: this.width / 2, y: this.height / 2 };
  }
};

// src/dom/Query.ts
async function* query(queryOrElement, options = {}) {
  if (typeof queryOrElement === `string`) {
    return query([queryOrElement], options);
  } else if (typeof queryOrElement === `object` && `nodeName` in queryOrElement) {
    return query([queryOrElement], options);
  }
  const ensureUnique = options ?? false;
  const isUnique = ensureUnique ? trackUniqueInstances() : (_) => true;
  if (Array.isArray(queryOrElement)) {
    for (const item of queryOrElement) {
      if (typeof item === `string`) {
        for (const element of document.querySelectorAll(item)) {
          const elementProper = element;
          if (isUnique(elementProper)) {
            yield elementProper;
          }
        }
      } else {
        if (isUnique(item)) {
          yield item;
        }
      }
    }
  } else {
    for await (const item of queryOrElement) {
      if (typeof item === `string`) {
        for (const element of document.querySelectorAll(item)) {
          if (isUnique(element)) {
            yield element;
          }
        }
      } else {
        if (isUnique(item)) {
          yield item;
        }
      }
    }
  }
}

// src/rx/sources/Object.ts
function object(initialValue, options = {}) {
  const eq = options.eq ?? Immutable_exports.isEqualContextString;
  const setEvent = initStream();
  const diffEvent = initStream();
  let value = initialValue;
  let disposed = false;
  const set = (v) => {
    if (value !== void 0) {
      const diff = Immutable_exports.compareData(value, v, { ...options, includeMissingFromA: true });
      if (diff.length === 0)
        return;
      diffEvent.set(diff);
    }
    value = v;
    setEvent.set(v);
  };
  const update = (toMerge) => {
    if (value === void 0) {
      value = toMerge;
    } else {
      const diff = Immutable_exports.compareData(toMerge, value);
      if (diff.length === 0)
        return;
      value = {
        ...value,
        ...toMerge
      };
      diffEvent.set(diff);
    }
    setEvent.set(value);
  };
  const updateField = (path, valueForField) => {
    if (value === void 0)
      throw new Error(`Cannot update value when it has not already been set`);
    const existing = Immutable_exports.getField(value, path);
    if (eq(existing, valueForField, path)) {
      return;
    }
    let diff = Immutable_exports.compareData(existing, valueForField, { ...options, includeMissingFromA: true });
    diff = diff.map((d) => {
      if (d.path.length > 0)
        return { ...d, path: path + `.` + d.path };
      return { ...d, path };
    });
    const o = Immutable_exports.updateByPath(value, path, valueForField, true);
    value = o;
    diffEvent.set(diff);
    setEvent.set(o);
  };
  const dispose = (reason) => {
    if (disposed)
      return;
    diffEvent.dispose(reason);
    setEvent.dispose(reason);
    disposed = true;
  };
  return {
    dispose,
    isDisposed() {
      return disposed;
    },
    /**
     * Update a field.
     * Exception is thrown if field does not exist
     */
    updateField,
    last: () => value,
    on: setEvent.on,
    value: setEvent.value,
    onDiff: diffEvent.on,
    /**
     * Set the whole object
     */
    set,
    /**
     * Update the object with a partial set of fields and values
     */
    update
  };
}

// src/rx/Dom.ts
function fromDomQuery(query2) {
  const elements2 = [...document.querySelectorAll(query2)];
  return object(elements2);
}
var bindText = (source, elOrQuery, bindOpts = {}) => {
  return bindElement(source, elOrQuery, { ...bindOpts, elField: `textContent` });
};
var bindHtml = (source, elOrQuery, bindOpts = {}) => {
  return bindElement(source, elOrQuery, { ...bindOpts, elField: `innerHTML` });
};
var bindElement = (source, elOrQuery, ...binds) => {
  if (elOrQuery === null)
    throw new Error(`Param 'elOrQuery' is null`);
  if (elOrQuery === void 0)
    throw new Error(`Param 'elOrQuery' is undefined`);
  const el2 = resolveEl(elOrQuery);
  let b = [];
  if (binds.length === 0) {
    b.push({ elField: `textContent` });
  } else {
    b = [...binds];
  }
  const bb = b.map((bind2) => {
    if (`element` in bind2)
      return bind2;
    return { ...bind2, element: el2 };
  });
  return bind(source, ...bb);
};
var resolveBindUpdater = (bind2, element) => {
  const b = resolveBindUpdaterBase(bind2);
  return (value) => {
    b(value, element);
  };
};
var resolveBindUpdaterBase = (bind2) => {
  if (bind2.elField !== void 0 || bind2.cssVariable === void 0 && bind2.attribName === void 0 && bind2.cssProperty === void 0 && bind2.textContent === void 0 && bind2.htmlContent === void 0) {
    const field2 = bind2.elField ?? `textContent`;
    return (v, element) => {
      element[field2] = v;
    };
  }
  if (bind2.attribName !== void 0) {
    const attrib = bind2.attribName;
    return (v, element) => {
      element.setAttribute(attrib, v);
    };
  }
  if (bind2.textContent) {
    return (v, element) => {
      element.textContent = v;
    };
  }
  if (bind2.htmlContent) {
    return (v, element) => {
      element.innerHTML = v;
    };
  }
  if (bind2.cssVariable !== void 0) {
    let css = bind2.cssVariable;
    if (!css.startsWith(`--`))
      css = `--` + css;
    return (v, element) => {
      element.style.setProperty(css, v);
    };
  }
  if (bind2.cssProperty !== void 0) {
    return (v, element) => {
      element.style[bind2.cssProperty] = v;
    };
  }
  return (_, _element) => {
  };
};
var resolveTransform = (bind2) => {
  if (!bind2.transform && !bind2.transformValue)
    return;
  if (bind2.transformValue) {
    if (bind2.sourceField === void 0)
      throw new Error(`Expects 'sourceField' to be set when 'transformValue' is set`);
    return (value) => {
      const fieldValue = value[bind2.sourceField];
      return bind2.transformValue(fieldValue);
    };
  } else if (bind2.transform) {
    if (bind2.sourceField !== void 0)
      throw new Error(`If 'transform' is set, 'sourceField' is ignored`);
    return (value) => bind2.transform(value);
  }
};
var bind = (source, ...bindsUnresolvedElements) => {
  const binds = bindsUnresolvedElements.map((bind2) => {
    if (bind2.element && bind2.element !== void 0)
      return bind2;
    if (bind2.query)
      return {
        ...bind2,
        element: resolveEl(bind2.query)
      };
    throw new Error(`Unable to resolve element. Missing 'element' or 'query' values on bind. ${JSON.stringify(bind2)}`);
  });
  const bindsResolved = binds.map((bind2) => ({
    update: resolveBindUpdater(bind2, bind2.element),
    transformer: resolveTransform(bind2),
    sourceField: bind2.sourceField
  }));
  const update = (value) => {
    for (const bind2 of bindsResolved) {
      if (bind2.transformer) {
        bind2.update(bind2.transformer(value));
      } else {
        const v = bind2.sourceField ? value[bind2.sourceField] : value;
        if (typeof v === `object`) {
          if (bind2.sourceField) {
            bind2.update(JSON.stringify(v));
          } else {
            bind2.update(JSON.stringify(v));
          }
        } else
          bind2.update(v);
      }
    }
  };
  const unsub = source.on((message) => {
    if (messageHasValue(message)) {
      update(message.value);
    } else if (messageIsSignal(message)) {
      console.warn(message);
    }
  });
  if (hasLast(source)) {
    update(source.last());
  }
  return {
    remove: (removeElements) => {
      unsub();
      if (removeElements) {
        for (const bind2 of binds) {
          bind2.element.remove();
        }
      }
    }
  };
};
var bindUpdate = (source, elOrQuery, updater) => {
  const el2 = resolveEl(elOrQuery);
  const update = (value) => {
    updater(value, el2);
  };
  const unsub = source.on((message) => {
    if (messageHasValue(message)) {
      console.log(message);
      update(message.value);
    } else {
      console.warn(message);
    }
  });
  if (hasLast(source)) {
    update(source.last());
  }
  return {
    remove: (removeElement) => {
      unsub();
      if (removeElement) {
        el2.remove();
      }
    }
  };
};
var bindDiffUpdate = (source, elOrQuery, updater, opts = {}) => {
  if (elOrQuery === null)
    throw new Error(`Param 'elOrQuery' is null`);
  if (elOrQuery === void 0)
    throw new Error(`Param 'elOrQuery' is undefined`);
  const el2 = resolveEl(elOrQuery);
  const binds = opts.binds;
  const update = (value) => {
    updater(value, el2);
  };
  const unsub = source.onDiff((message) => {
    if (messageHasValue(message)) {
      update(message.value);
    } else {
      console.warn(message);
    }
  });
  const init2 = () => {
    if (hasLast(source) && opts.initial)
      opts.initial(source.last(), el2);
  };
  init2();
  return {
    refresh: () => {
      init2();
    },
    remove: (removeElement) => {
      unsub();
      if (removeElement) {
        el2.remove();
      }
    }
  };
};
var elements = (source, options) => {
  const containerEl = options.container ? resolveEl(options.container) : document.body;
  const defaultTag = options.defaultTag ?? `div`;
  const elByField = /* @__PURE__ */ new Map();
  const binds = /* @__PURE__ */ new Map();
  for (const [key, value] of Object.entries(options.binds ?? {})) {
    const tagName = value.tagName ?? defaultTag;
    binds.set(key, {
      ...value,
      update: resolveBindUpdaterBase(value),
      transform: resolveTransform(value),
      tagName,
      path: key
    });
  }
  const findBind = (path) => {
    const bind2 = getFromKeys(binds, stringSegmentsWholeToEnd(path));
    if (bind2 !== void 0)
      return bind2;
    if (!path.includes(`.`))
      return binds.get(`_root`);
  };
  function* ancestorBinds(path) {
    for (const p of stringSegmentsWholeToFirst(path)) {
      if (binds.has(p)) {
        yield binds.get(p);
      } else {
      }
    }
    if (binds.has(`_root`) && path.includes(`.`))
      yield binds.get(`_root`);
  }
  const create3 = (path, value) => {
    const rootedPath = getRootedPath(path);
    console.log(`Rx.Dom.elements.create: ${path} rooted: ${rootedPath} value: ${JSON.stringify(value)}`);
    const bind2 = findBind(getRootedPath(path));
    let tagName = defaultTag;
    if (bind2?.tagName)
      tagName = bind2.tagName;
    const el2 = document.createElement(tagName);
    el2.setAttribute(`data-path`, path);
    update(path, el2, value);
    let parentForEl;
    for (const b of ancestorBinds(rootedPath)) {
      if (b?.nestChildren) {
        const absoluteRoot = beforeMatch(path, `.`);
        const findBy = b.path.replace(`_root`, absoluteRoot);
        parentForEl = elByField.get(findBy);
        if (parentForEl === void 0) {
        } else {
          break;
        }
      }
    }
    (parentForEl ?? containerEl).append(el2);
    elByField.set(path, el2);
    console.log(`Added el: ${path}`);
  };
  const update = (path, el2, value) => {
    console.log(`Rx.dom.update path: ${path} value:`, value);
    const bind2 = findBind(getRootedPath(path));
    if (bind2 === void 0) {
      if (typeof value === `object`)
        value = JSON.stringify(value);
      el2.textContent = value;
    } else {
      if (bind2.transform)
        value = bind2.transform(value);
      bind2.update(value, el2);
    }
  };
  const changes = (changes2) => {
    const queue = new QueueMutable({}, changes2);
    let d = queue.dequeue();
    const seenPaths = /* @__PURE__ */ new Set();
    while (d !== void 0) {
      const path = d.path;
      if (d.previous === void 0) {
        console.log(`Rx.Dom.elements.changes no previous. path: ${path}`);
        create3(path, d.value);
        const subdata = getPathsAndData(d.value, Number.MAX_SAFE_INTEGER, path);
        console.log(subdata);
        for (const dd of subdata) {
          if (!seenPaths.has(dd.path)) {
            queue.enqueue(dd);
            seenPaths.add(dd.path);
          }
        }
      } else if (d.value === void 0) {
        const el2 = elByField.get(path);
        if (el2 === void 0) {
          console.warn(`No element to delete? ${path} `);
        } else {
          console.log(`Rx.Dom.elements.changes delete ${path}`);
          el2.remove();
        }
      } else {
        const el2 = elByField.get(path);
        if (el2 === void 0) {
          console.warn(`Rx.Dom.elements.changes No element to update ? ${path} `);
          create3(path, d.value);
        } else {
          update(path, el2, d.value);
        }
      }
      d = queue.dequeue();
    }
  };
  source.onDiff((message) => {
    if (message.value) {
      console.log(`Rx.Dom.elements diff ${JSON.stringify(message.value)} `);
      changes(message.value);
    }
  });
  if (hasLast(source)) {
    const last = source.last();
    changes(getPathsAndData(last, 1));
  }
};
var getRootedPath = (path) => {
  const after = afterMatch(path, `.`);
  return after === path ? `_root` : `_root.` + after;
};
function win() {
  const generateRect = () => ({ width: window.innerWidth, height: window.innerHeight });
  const size = sources_exports.event(window, `resize`, {
    lazy: `very`,
    transform: () => generateRect()
  });
  const pointer = sources_exports.event(window, `pointermove`, {
    lazy: `very`,
    transform: (args) => {
      if (args === void 0)
        return { x: 0, y: 0 };
      const pe = args;
      return { x: pe.x, y: pe.y };
    }
  });
  const dispose = (reason = `Reactive.win.dispose`) => {
    size.dispose(reason);
    pointer.dispose(reason);
  };
  return { dispose, size, pointer };
}

// src/rx/sources/index.ts
var sources_exports = {};
__export(sources_exports, {
  array: () => array2,
  arrayObject: () => arrayObject,
  boolean: () => boolean,
  event: () => event,
  func: () => func,
  iterator: () => iterator,
  number: () => number,
  object: () => object,
  objectProxy: () => objectProxy,
  objectProxySymbol: () => objectProxySymbol,
  observable: () => observable,
  observableWritable: () => observableWritable,
  of: () => of,
  pinged: () => pinged
});

// src/rx/sources/Array.ts
var of = (source, options = {}) => {
  if (Array.isArray(source)) {
    return array2(source, options);
  } else {
  }
};
var array2 = (sourceArray, options = {}) => {
  const lazy = options.lazy ?? `initial`;
  const signal = options.signal;
  const whenStopped = options.whenStopped ?? `continue`;
  const debugLifecycle = options.debugLifecycle ?? false;
  const array3 = [...sourceArray];
  if (lazy !== `very` && whenStopped === `reset`)
    throw new Error(`whenStopped:'reset' has no effect with 'lazy:${lazy}'. Use lazy:'very' instead.`);
  const intervalMs = intervalToMs(options.interval, 5);
  let index = 0;
  let lastValue = array3[0];
  const s = initLazyStream({
    ...options,
    lazy,
    onStart() {
      if (debugLifecycle)
        console.log(`Rx.readFromArray:onStart`);
      c.start();
    },
    onStop() {
      if (debugLifecycle)
        console.log(`Rx.readFromArray:onStop. whenStopped: ${whenStopped} index: ${index}`);
      c.cancel();
      if (whenStopped === `reset`)
        index = 0;
    }
    // onFirstSubscribe() {
    //   if (debugLifecycle) console.log(`Rx.readFromArray:onFirstSubscribe lazy: ${ lazy } runState: '${ c.runState }'`);
    //   // Start if in lazy mode and not running
    //   if (lazy !== `never` && c.runState === `idle`) c.start();
    // },
    // onNoSubscribers() {
    //   if (debugLifecycle) console.log(`Rx.readFromArray:onNoSubscribers lazy: ${ lazy } runState: '${ c.runState }' whenStopped: '${ whenStopped }'`);
    //   if (lazy === `very`) {
    //     c.cancel();
    //     if (whenStopped === `reset`) {
    //       index = 0;
    //     }
    //   }
    // }
  });
  const c = continuously(() => {
    if (signal?.aborted) {
      s.dispose(`Signalled (${signal.reason})`);
      return false;
    }
    lastValue = array3[index];
    index++;
    s.set(lastValue);
    if (index === array3.length) {
      s.dispose(`Source array complete`);
      return false;
    }
  }, intervalMs);
  if (!lazy)
    c.start();
  return {
    isDone() {
      return index === array3.length;
    },
    last() {
      return lastValue;
    },
    // eslint-disable-next-line @typescript-eslint/unbound-method
    on: s.on,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    value: s.value
  };
};

// src/rx/sources/ArrayObject.ts
function arrayObject(initialValue = [], options = {}) {
  const eq = options.eq ?? isEqualValueDefault;
  const setEvent = initStream();
  const arrayEvent = initStream();
  let value = initialValue;
  let disposed = false;
  const set = (replacement) => {
    const diff = compareArrays(value, replacement, eq);
    value = replacement;
    setEvent.set([...replacement]);
  };
  const setAt = (index, v) => {
    value[index] = v;
    setEvent.set([...value]);
  };
  const push = (v) => {
    value = [...value, v];
    setEvent.set([...value]);
    const cr = [`add`, value.length - 1, v];
    arrayEvent.set([cr]);
  };
  const deleteAt = (index) => {
    const valueChanged = remove(value, index);
    if (valueChanged.length === value.length)
      return;
    const diff = compareArrays(value, valueChanged, eq);
    value = valueChanged;
    setEvent.set([...value]);
    arrayEvent.set(diff.summary);
  };
  const deleteWhere = (filter2) => {
    const valueChanged = value.filter((v) => !filter2(v));
    const count2 = value.length - valueChanged.length;
    const diff = compareArrays(value, valueChanged, eq);
    value = valueChanged;
    setEvent.set([...value]);
    arrayEvent.set(diff.summary);
    return count2;
  };
  const insertAt2 = (index, v) => {
    const valueChanged = insertAt(value, index, v);
    const diff = compareArrays(value, valueChanged, eq);
    value = valueChanged;
    setEvent.set([...value]);
    arrayEvent.set(diff.summary);
  };
  const dispose = (reason) => {
    if (disposed)
      return;
    setEvent.dispose(reason);
    disposed = true;
  };
  const r = {
    dispose,
    isDisposed() {
      return disposed;
    },
    last: () => value,
    on: setEvent.on,
    onArray: arrayEvent.on,
    value: setEvent.value,
    setAt,
    push,
    deleteAt,
    deleteWhere,
    insertAt: insertAt2,
    /**
     * Set the whole object
     */
    set
  };
  return r;
}

// src/rx/sources/Boolean.ts
function boolean(initialValue) {
  let value = initialValue;
  const events = initStream();
  const set = (v) => {
    value = v;
    events.set(v);
  };
  return {
    dispose: events.dispose,
    isDisposed: events.isDisposed,
    last: () => value,
    on: events.on,
    value: events.value,
    set
  };
}

// src/rx/sources/Event.ts
function event(target, name, options = {}) {
  if (target === null)
    throw new Error(`Param 'target' is null`);
  const transform2 = options.transform;
  const initialValue = transform2 ? transform2() : void 0;
  const debugLifecycle = options.debugLifecycle ?? false;
  const debugFiring = options.debugFiring ?? false;
  const rxObject = initialValue ? object(initialValue, { deepEntries: true }) : object(void 0, { deepEntries: true });
  const lazy = options.lazy ?? false;
  let eventAdded = false;
  let disposed = false;
  const callback = (args) => {
    if (debugFiring)
      console.log(`Reactive.event '${name}' firing '${JSON.stringify(args)}`);
    rxObject.set(transform2 ? transform2(args) : args);
  };
  const remove2 = () => {
    if (!eventAdded)
      return;
    eventAdded = false;
    target.removeEventListener(name, callback);
    if (debugLifecycle) {
      console.log(`Reactive.event remove '${name}'`);
    }
  };
  const add2 = () => {
    if (eventAdded)
      return;
    eventAdded = true;
    target.addEventListener(name, callback);
    if (debugLifecycle) {
      console.log(`Reactive.event add '${name}'`);
    }
  };
  if (!lazy)
    add2();
  return {
    last: () => {
      if (lazy)
        add2();
      return rxObject.last();
    },
    dispose: (reason) => {
      if (disposed)
        return;
      disposed = true;
      remove2();
      rxObject.dispose(reason);
    },
    isDisposed() {
      return disposed;
    },
    on: (handler) => {
      if (lazy)
        add2();
      return rxObject.on(handler);
    },
    value: (handler) => {
      if (lazy)
        add2();
      return rxObject.value(handler);
    }
  };
}

// src/rx/sources/FunctionPinged.ts
function pinged(source, callback, options = {}) {
  const closeOnError = options.closeOnError ?? true;
  const lazy = options.lazy ?? `initial`;
  const internalAbort = new AbortController();
  const internalAbortCallback = (reason) => {
    internalAbort.abort(reason);
  };
  let upstreamOff;
  if (options.signal) {
    options.signal.addEventListener(`abort`, (_) => {
      done(`Signal received (${options.signal?.reason})`);
    });
  }
  const events = initStream({
    onFirstSubscribe() {
      if (lazy !== `never` && upstreamOff === void 0)
        start();
    },
    onNoSubscribers() {
      if (lazy === `very` && upstreamOff !== void 0) {
        upstreamOff();
        upstreamOff = void 0;
      }
    }
  });
  const start = () => {
    upstreamOff = source.on((message) => {
      if (messageIsDoneSignal(message)) {
        done(`Upstream closed`);
      } else if (messageIsSignal(message)) {
        events.signal(message.signal);
      } else if (messageHasValue(message)) {
        void trigger(message.value);
      }
    });
  };
  const done = (reason) => {
    events.dispose(reason);
    if (upstreamOff)
      upstreamOff();
  };
  const trigger = async (value) => {
    try {
      const v = await callback(value, internalAbortCallback);
      events.set(v);
      if (internalAbort.signal.aborted) {
        done(`callback function aborted (${internalAbort.signal.reason})`);
        return false;
      }
    } catch (error) {
      if (closeOnError) {
        done(`Function error: ${getErrorMessage(error)}`);
        return false;
      } else {
        events.signal(`warn`, getErrorMessage(error));
      }
    }
  };
  if (lazy === `never`)
    start();
  return events;
}

// src/rx/sources/Number.ts
function number(initialValue) {
  let value = initialValue;
  const events = initStream();
  const set = (v) => {
    value = v;
    events.set(v);
  };
  return {
    dispose: events.dispose,
    isDisposed: events.isDisposed,
    last: () => value,
    on: events.on,
    value: events.value,
    set
  };
}

// src/rx/sources/ObjectProxy.ts
var objectProxy = (target) => {
  const rx = object(target);
  const proxy = new Proxy(target, {
    set(target2, p, newValue, _receiver) {
      const isArray = Array.isArray(target2);
      if (isArray && p === `length`)
        return true;
      if (typeof p === `string`) {
        rx.updateField(p, newValue);
      }
      if (isArray && typeof p === `string`) {
        const pAsNumber = Number.parseInt(p);
        if (!Number.isNaN(pAsNumber)) {
          target2[pAsNumber] = newValue;
          return true;
        }
      }
      target2[p] = newValue;
      return true;
    }
  });
  return { proxy, rx };
};
var objectProxySymbol = (target) => {
  const { proxy, rx } = objectProxy(target);
  const p = proxy;
  p[symbol] = rx;
  return p;
};

// src/rx/sources/Observable.ts
function observable(init2) {
  const ow = observableWritable(init2);
  return {
    on: ow.on,
    value: ow.value
  };
}
function observableWritable(init2) {
  let onCleanup = () => {
  };
  const ow = manual({
    onFirstSubscribe() {
      onCleanup = init2(ow);
    },
    onNoSubscribers() {
      if (onCleanup)
        onCleanup();
    }
  });
  return {
    ...ow,
    value: (callback) => {
      return ow.on((message) => {
        if (messageHasValue(message)) {
          callback(message.value);
        }
      });
    }
  };
}

// src/rx/index.ts
function manual(options = {}) {
  const events = initStream(options);
  return {
    set(value) {
      events.set(value);
    },
    on: events.on,
    value: events.value
  };
}
var Ops = {
  /**
  * Annotates values.
  * 
  * For every value `input` emits, run it through `transformer`, which should
  * return the original value with additional fields.
  * 
  * Conceptually the same as `transform`, just with typing to enforce result
  * values are V & TAnnotation
  * @param transformer 
  * @returns 
  */
  annotate: (transformer) => opify(annotate, transformer),
  /**
   * Annotates all values with the elapsed time since the last value
   * @returns 
   */
  annotateElapsed: () => opify(annotateElapsed),
  /**
   * Takes a stream of values and batches them up (by quantity or time elapsed),
   * emitting them as an array.
   * @param options 
   * @returns 
   */
  batch: (options) => {
    return (source) => {
      return batch(source, options);
    };
  },
  cloneFromFields: () => {
    return (source) => {
      return cloneFromFields(source);
    };
  },
  /**
  * Merges values from several sources into a single source that emits values as an array.
  * @param options 
  * @returns 
  */
  combineLatestToArray: (options = {}) => {
    return (sources) => {
      return combineLatestToArray(sources, options);
    };
  },
  /**
   * Merges values from several sources into a single source that emits values as an object.
   * @param options
   * @returns 
   */
  combineLatestToObject: (options = {}) => {
    return (reactiveSources) => {
      return combineLatestToObject(reactiveSources, options);
    };
  },
  /**
  * Debounce values from the stream. It will wait until a certain time
  * has elapsed before emitting latest value.
  * 
  * Effect is that no values are emitted if input emits faster than the provided
  * timeout.
  * 
  * See also: throttle
  * @param options 
  * @returns 
  */
  debounce: (options) => {
    return (source) => {
      return debounce(source, options);
    };
  },
  /**
   * Yields the value of a field from an input stream of values.
   * Eg if the source reactive emits `{ colour: string, size: number }`,
   * we might use `field` to pluck out the `colour` field, thus returning
   * a stream of string values.
   * @param fieldName 
   * @param options 
   * @returns 
   */
  field: (fieldName, options) => {
    return (source) => {
      return field(source, fieldName, options);
    };
  },
  /**
   * Filters the input stream, only re-emitting values that pass the predicate
   * @param predicate 
   * @returns 
   */
  filter: (predicate) => opify(filter, predicate),
  pipe: (...streams) => {
    return (source) => {
      const resolved = resolveSource(source);
      const s = [resolved, ...streams];
      return pipe(...s);
    };
  },
  singleFromArray: (options = {}) => {
    return (source) => {
      return singleFromArray(source, options);
    };
  },
  split: (options = {}) => {
    return (source) => {
      return split(source, options);
    };
  },
  splitLabelled: (labels) => {
    return (source) => {
      return splitLabelled(source, labels);
    };
  },
  switcher: (cases, options = {}) => {
    return (source) => {
      return switcher(source, cases, options);
    };
  },
  syncToArray: (options = {}) => {
    return (reactiveSources) => {
      return syncToArray(reactiveSources, options);
    };
  },
  syncToObject: (options = {}) => {
    return (reactiveSources) => {
      return syncToObject(reactiveSources, options);
    };
  },
  /**
  * Throttle values from the stream.
  * Only emits a value if some minimum time has elapsed.
  * @param options 
  * @returns 
  */
  throttle: (options) => opify(throttle, options),
  /**
   * Trigger a value if 'source' does not emit a value within an interval.
   * Trigger value can be a fixed value, result of function, or step through an iterator.
   * @param options 
   * @returns 
   */
  timeoutTrigger: (options) => {
    return (source) => {
      return timeoutTrigger(source, options);
    };
  },
  transform: (transformer) => {
    return (source) => {
      return transform(source, transformer);
    };
  },
  /**
  * Reactive where last (or a given initial) value is available to read
  * @param opts 
  * @returns 
  */
  withValue: (opts) => {
    return opify(withValue, opts);
  }
};
var prepareOps = (...ops) => {
  return (source) => {
    for (const op of ops) {
      source = op(source);
    }
    return source;
  };
};
function run(source, ...ops) {
  const raw = prepareOps(...ops);
  return raw(source);
}
async function takeNextValue(source, maximumWait = 1e3) {
  const rx = resolveSource(source);
  let off = () => {
  };
  let watchdog;
  const p = new Promise((resolve, reject) => {
    off = rx.on((message) => {
      if (watchdog)
        clearTimeout(watchdog);
      if (messageHasValue(message)) {
        off();
        resolve(message.value);
      } else {
        if (messageIsDoneSignal(message)) {
          reject(new Error(`Source closed. ${message.context ?? ``}`));
          off();
        }
      }
    });
    watchdog = setTimeout(() => {
      watchdog = void 0;
      off();
      reject(new Error(`Timeout waiting for value (${JSON.stringify(maximumWait)})`));
    }, intervalToMs(maximumWait));
  });
  return p;
}
var to = (a, b, transform2, closeBonA = false) => {
  const unsub = a.on((message) => {
    if (messageHasValue(message)) {
      b.set(transform2(message.value));
    } else if (messageIsDoneSignal(message)) {
      unsub();
      if (closeBonA) {
        if (isDisposable(b)) {
          b.dispose(`Source closed (${message.context ?? ``})`);
        } else {
          console.warn(`Reactive.to cannot close 'b' reactive since it is not disposable`);
        }
      }
    } else {
      console.warn(`Unsupported message: ${JSON.stringify(message)}`);
    }
  });
  return unsub;
};

export {
  Normalise_exports,
  FrequencyMutable,
  frequencyMutable,
  movingAverageLight,
  movingAverageTimed,
  movingAverage,
  noiseFilter,
  IntervalTracker,
  intervalTracker,
  PointTracker,
  TrackedPointMap,
  pointsTracker,
  pointTracker,
  flip,
  Table,
  graphs_exports,
  trackUnique,
  trackUniqueInstances,
  messageIsSignal,
  messageIsDoneSignal,
  messageHasValue,
  hasLast,
  isReactive,
  isDisposable,
  isWrapped,
  opify,
  isTriggerValue,
  isTriggerFunction,
  isTriggerGenerator,
  isTrigger,
  resolveTriggerValue,
  resolveSource,
  annotate,
  annotateElapsed,
  batch,
  transform,
  cloneFromFields,
  combineLatestToArray,
  combineLatestToObject,
  debounce,
  field,
  filter,
  pipe,
  singleFromArray,
  split,
  splitLabelled,
  switcher,
  syncToArray,
  syncToObject,
  throttle,
  timeoutTrigger,
  withValue,
  prepare,
  symbol,
  toArray,
  toArrayOrThrow,
  toGenerator,
  wrap2 as wrap,
  count,
  Dom_exports,
  sources_exports,
  manual,
  Ops,
  run,
  takeNextValue,
  to,
  rx_exports,
  fieldResolve,
  fieldResolver,
  pull,
  Bipolar_exports,
  Correlate_exports,
  Pool_exports,
  piPi,
  data_exports,
  Drawing_exports,
  SceneGraph_exports,
  scaleCanvas,
  DomRx_exports,
  parentSizeCanvas,
  fullSizeCanvas,
  Plot2_exports,
  Palette_exports,
  BipolarView_exports,
  PlotOld_exports,
  visual_exports,
  log,
  pointScaler,
  positionFn,
  cardinalPosition,
  positionRelative,
  viewportToSpace,
  positionFromMiddle,
  cycleCssClass,
  getTranslation,
  createAfter,
  createIn,
  clear,
  copyToClipboard,
  insertSorted,
  reconcileChildren,
  setCssClass,
  setCssToggle,
  setCssDisplay,
  byId,
  setHtml,
  setText,
  elRequery,
  el,
  DataTable_exports,
  DataDisplay,
  fullSizeElement,
  parentSize,
  pointerVisualise,
  defaultErrorHandler,
  DragDrop_exports,
  inlineConsole,
  CssVariables_exports,
  CanvasHelper,
  query,
  dom_exports
};
//# sourceMappingURL=chunk-25YY5CRU.js.map