import {
  SvgElements_exports,
  Svg_exports
} from "./chunk-CB6UZHH7.js";
import {
  Video_exports
} from "./chunk-JQCXMGPI.js";
import {
  NumberTracker,
  PrimitiveTracker,
  TrackedValueMap,
  TrackerBase,
  numberTracker
} from "./chunk-3XY6BLXP.js";
import {
  floatSource,
  interpolate,
  interpolateAngle,
  interpolatorInterval,
  interpolatorStepped
} from "./chunk-OXJCLPKB.js";
import {
  DispatchList,
  continuously,
  timeout
} from "./chunk-OVKLVJUW.js";
import {
  Forms_exports,
  resolveEl,
  resolveEls
} from "./chunk-C37M4BRE.js";
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
} from "./chunk-YQAYXQ6L.js";
import {
  Colour_exports,
  opacity,
  randomHue,
  wrap,
  wrapInteger,
  wrapRange
} from "./chunk-ZPGFUGHT.js";
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
} from "./chunk-KLQXWQ53.js";
import {
  PriorityMutable
} from "./chunk-NS7KXKH6.js";
import {
  SimpleEventEmitter
} from "./chunk-5AETFVOQ.js";
import {
  compareArrays
} from "./chunk-LULAJS36.js";
import {
  round
} from "./chunk-2FF4255M.js";
import {
  Immutable_exports,
  getField,
  getPaths,
  getPathsAndData,
  map as map2,
  require_dist
} from "./chunk-XLH7KSHF.js";
import {
  StackMutable
} from "./chunk-EEB2RB6T.js";
import {
  afterMatch,
  beforeMatch
} from "./chunk-7KTY42OF.js";
import {
  QueueMutable
} from "./chunk-FQ6AJA3D.js";
import {
  map
} from "./chunk-2MOQXBDW.js";
import {
  KeyValue_exports,
  getSorter,
  isPrimitive
} from "./chunk-NJIMQZNH.js";
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
} from "./chunk-PSPCCJSY.js";
import {
  ifNaN,
  intervalToMs,
  isAsyncIterable,
  isEqualValueDefault,
  isIterable,
  isPlainObjectOrPrimitive,
  roundUpToMultiple,
  sleep,
  toStringDefault2 as toStringDefault
} from "./chunk-ESXWQDUL.js";
import {
  throwArrayTest,
  throwNumberTest
} from "./chunk-WUN4GNAA.js";
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
  LitHtml: () => x,
  Ops: () => Ops,
  annotate: () => annotate,
  annotateElapsed: () => annotateElapsed,
  batch: () => batch,
  boolean: () => boolean,
  cache: () => cache,
  cloneFromFields: () => cloneFromFields,
  count: () => count,
  debounce: () => debounce,
  field: () => field,
  filter: () => filter,
  fromArray: () => fromArray,
  fromEvent: () => fromEvent,
  fromFunction: () => fromFunction,
  fromGenerator: () => fromGenerator,
  fromObject: () => fromObject,
  fromProxy: () => fromProxy,
  fromProxySymbol: () => fromProxySymbol,
  hasLast: () => hasLast,
  isDisposable: () => isDisposable,
  isReactive: () => isReactive,
  lit: () => lit,
  manual: () => manual,
  mergeToArray: () => mergeToArray,
  mergeToObject: () => mergeToObject,
  messageHasValue: () => messageHasValue,
  messageIsDoneSignal: () => messageIsDoneSignal,
  messageIsSignal: () => messageIsSignal,
  number: () => number,
  observable: () => observable,
  observableWritable: () => observableWritable,
  opify: () => opify,
  pinged: () => pinged,
  pipe: () => pipe,
  prepare: () => prepare,
  readFromArray: () => readFromArray,
  resolve: () => resolve,
  resolveSource: () => resolveSource,
  run: () => run,
  singleFromArray: () => singleFromArray,
  split: () => split,
  splitLabelled: () => splitLabelled,
  switcher: () => switcher,
  symbol: () => symbol,
  sync: () => sync,
  syncToObject: () => syncToObject,
  takeNextValue: () => takeNextValue,
  throttle: () => throttle,
  to: () => to,
  toArray: () => toArray,
  toArrayOrThrow: () => toArrayOrThrow,
  toGenerator: () => toGenerator,
  transform: () => transform,
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
function messageHasValue(v2) {
  if (v2.value !== void 0)
    return true;
  return false;
}
var hasLast = (rx) => {
  if (!isReactive(rx))
    return false;
  if (`last`) {
    const v2 = rx.last();
    if (v2 !== void 0)
      return true;
  }
  return false;
};
var isReactive = (rx) => {
  if (typeof rx !== `object`)
    return false;
  return `on` in rx && `value` in rx;
};
var isDisposable = (v2) => {
  return `isDisposed` in v2 && `dispose` in v2;
};
var opify = (fn, ...args) => {
  return (source) => {
    return fn(source, ...args);
  };
};

// src/rx/FromGenerator.ts
function fromGenerator(generator, options = {}) {
  const lazy = options.lazy ?? `initial`;
  const signal = options.signal;
  const interval = intervalToMs(options.interval, 5);
  let reading = false;
  const events = initLazyStream({
    ...options,
    lazy,
    onStart() {
      readingStart();
    },
    onStop() {
      reading = false;
    }
  });
  const read = async () => {
    try {
      if (signal?.aborted) {
        events.dispose(`Signalled (${signal.reason})`);
        reading = false;
        return;
      }
      const v2 = await generator.next();
      if (v2.done) {
        events.dispose(`Generator complete`);
        reading = false;
      }
      if (!reading)
        return;
      events.set(v2.value);
    } catch (error) {
      events.dispose(`Generator error: ${error.toString()}`);
      return;
    }
    if (events.isDisposed())
      return;
    if (!reading)
      return;
    setTimeout(read, interval);
  };
  const readingStart = () => {
    if (reading)
      return;
    reading = true;
    void read();
  };
  if (!lazy)
    readingStart();
  return {
    on: events.on,
    value: events.value,
    dispose: events.dispose,
    isDisposed: events.isDisposed
  };
}

// src/rx/ResolveSource.ts
var resolveSource = (source, options = {}) => {
  if (isReactive(source))
    return source;
  const generatorOptions = options.generator ?? { lazy: `initial`, interval: 5 };
  if (Array.isArray(source)) {
    return fromGenerator(source.values(), generatorOptions);
  } else {
    if (`source` in source && `toArrayOrThrow` in source) {
      return source.source;
    }
    if (isIterable(source) || isAsyncIterable(source)) {
      return fromGenerator(source, generatorOptions);
    }
  }
  throw new Error(`Unable to resolve source. Supports: array, Reactive, Async/Iterable. Got type: ${typeof source}`);
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
        options.onDispose();
    },
    isDisposed: () => {
      return disposed;
    },
    reset: () => {
      dispatcher?.clear();
      isEmpty();
    },
    set: (v2) => {
      if (disposed)
        throw new Error(`Disposed, cannot set`);
      dispatcher?.notify({ value: v2 });
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

// src/rx/Ops.ts
var to = (a2, b2, transform2, closeBonA = false) => {
  const unsub = a2.on((message) => {
    if (messageHasValue(message)) {
      b2.set(transform2(message.value));
    } else if (messageIsDoneSignal(message)) {
      unsub();
      if (closeBonA) {
        if (isDisposable(b2)) {
          b2.dispose(`Source closed (${message.context ?? ``})`);
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
var split = (options = {}) => {
  const quantity = options.quantity ?? 2;
  return (r2) => {
    const outputs = [];
    const source = resolveSource(r2);
    for (let index = 0; index < quantity; index++) {
      outputs.push(initUpstream(source, { disposeIfSourceDone: true, lazy: `initial` }));
    }
    return outputs;
  };
};
var splitLabelled = (...labels) => {
  return (r2) => {
    const source = resolveSource(r2);
    const t2 = {};
    for (const label of labels) {
      t2[label] = initUpstream(source, { lazy: `initial`, disposeIfSourceDone: true });
    }
    return t2;
  };
};
var switcher = (reactiveOrSource, cases, options = {}) => {
  const match = options.match ?? `first`;
  const source = resolveSource(reactiveOrSource);
  let disposed = false;
  const t2 = {};
  for (const label of Object.keys(cases)) {
    t2[label] = initStream();
  }
  const performDispose = () => {
    if (disposed)
      return;
    unsub();
    disposed = true;
    for (const stream2 of Object.values(t2)) {
      stream2.dispose(`switcher source dispose`);
    }
  };
  const unsub = source.on((message) => {
    if (messageHasValue(message)) {
      for (const [lbl, pred] of Object.entries(cases)) {
        if (pred(message.value)) {
          t2[lbl].set(message.value);
          if (match === `first`)
            break;
        }
      }
    } else if (messageIsDoneSignal(message)) {
      performDispose();
    }
  });
  return t2;
};
var pipe = (...streams) => {
  const event = initStream();
  const unsubs = [];
  const performDispose = (reason) => {
    for (const s2 of streams) {
      if (isDisposable(s2) && !s2.isDisposed)
        s2.dispose(reason);
    }
    for (const s2 of unsubs) {
      s2();
    }
    event.dispose(reason);
  };
  for (let index = 0; index < streams.length; index++) {
    unsubs.push(streams[index].on((message) => {
      const isLast = index === streams.length - 1;
      if (messageHasValue(message)) {
        if (isLast) {
          event.set(message.value);
        } else {
          streams[index + 1].set(message.value);
        }
      } else if (messageIsDoneSignal(message)) {
        performDispose(`Upstream disposed`);
      }
    }));
  }
  return {
    on: event.on,
    value: event.value,
    dispose(reason) {
      performDispose(reason);
    },
    isDisposed() {
      return event.isDisposed();
    }
  };
};
function mergeToObject(reactiveSources, options = {}) {
  const event = initStream();
  const onSourceDone = options.onSourceDone ?? `break`;
  const states = /* @__PURE__ */ new Map();
  for (const [key, source] of Object.entries(reactiveSources)) {
    const s2 = {
      source: resolveSource(source),
      done: false,
      data: void 0,
      off: () => {
      }
    };
    states.set(key, s2);
  }
  const someUnfinished = () => Map_exports.some(states, (v2) => !v2.done);
  const unsub = () => {
    for (const state of states.values())
      state.off();
  };
  const getData = () => {
    const r2 = {};
    for (const [key, state] of states) {
      r2[key] = state.data;
    }
    return r2;
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
          event.dispose(`Source has completed and 'break' is behaviour`);
          return;
        }
        if (!someUnfinished()) {
          unsub();
          event.dispose(`All sources completed`);
        }
      } else if (messageHasValue(message)) {
        state.data = message.value;
        event.set(getData());
      }
    });
  }
  return {
    on: event.on,
    value: event.value,
    dispose(reason) {
      console.log(`mergeToObject dispose`);
      unsub();
      event.dispose(reason);
    },
    isDisposed() {
      return event.isDisposed();
    }
  };
}
function mergeToArray(reactiveSources, options = {}) {
  const event = initStream();
  const onSourceDone = options.onSourceDone ?? `break`;
  const data = [];
  const sources = reactiveSources.map((source) => resolveSource(source));
  const noop = () => {
  };
  const sourceOff = sources.map((_2) => noop);
  const doneSources = sources.map((_2) => false);
  const unsub = () => {
    for (const v2 of sourceOff) {
      v2();
    }
  };
  for (const [index, v2] of sources.entries()) {
    data[index] = void 0;
    sourceOff[index] = v2.on((message) => {
      if (messageIsDoneSignal(message)) {
        doneSources[index] = true;
        sourceOff[index]();
        sourceOff[index] = noop;
        if (onSourceDone === `break`) {
          unsub();
          event.dispose(`Source has completed and 'break' is set`);
          return;
        }
        if (!doneSources.includes(false)) {
          unsub();
          event.dispose(`All sources completed`);
        }
      } else if (messageHasValue(message)) {
        data[index] = message.value;
        event.set([...data]);
      }
    });
  }
  return {
    on: event.on,
    value: event.value
  };
}
function syncToObject(reactiveSources, options = {}) {
  const keys = Object.keys(reactiveSources);
  const values = Object.values(reactiveSources);
  const s2 = sync(values, options);
  const st = transform(s2, (streamValues) => {
    return zipKeyValue(keys, streamValues);
  });
  return st;
}
function sync(reactiveSources, options = {}) {
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
    for (const s2 of states) {
      s2.unsub();
      s2.unsub = () => {
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
  const hasIncompleteSource = () => states.some((s2) => !s2.done);
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
    event.dispose(reason);
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
          event.set([...data]);
          resetDataSet();
          if (watchdog)
            clearTimeout(watchdog);
          watchdog = setTimeout(onWatchdog, maximumWait);
        }
      });
    }
  };
  const event = initStream({
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
    on: event.on,
    value: event.value
  };
}
function resolve(callbackOrValue, options = {}) {
  const intervalMs = intervalToMs(options.interval, 0);
  const lazy = options.lazy ?? false;
  const event = initStream({
    onFirstSubscribe() {
      if (lazy && c2.runState === `idle`)
        c2.start();
    },
    onNoSubscribers() {
      if (lazy) {
        c2.cancel();
      }
    }
  });
  const loops = options.infinite ? Number.MAX_SAFE_INTEGER : options.loops ?? 1;
  let remaining = loops;
  const c2 = continuously(() => {
    if (typeof callbackOrValue === `function`) {
      const value = callbackOrValue();
      event.set(value);
    } else {
      event.set(callbackOrValue);
    }
    remaining--;
    if (remaining === 0)
      return false;
  }, intervalMs);
  if (!lazy)
    c2.start();
  return {
    on: event.on,
    value: event.value
  };
}
function field(fieldName, options = {}) {
  return (fieldSource) => {
    const upstream = initUpstream(fieldSource, {
      disposeIfSourceDone: true,
      ...options,
      onValue(value) {
        let t2 = value[fieldName];
        if (t2 === void 0 && options.missingFieldDefault !== void 0) {
          t2 = options.missingFieldDefault;
        }
        upstream.set(t2);
      }
    });
    return toReadable(upstream);
  };
}
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
var toReadable = (upstream) => ({ on: upstream.on, value: upstream.value });
function transform(input, transformer, options = {}) {
  const upstream = initUpstream(input, {
    lazy: `initial`,
    ...options,
    onValue(value) {
      const t2 = transformer(value);
      upstream.set(t2);
    }
  });
  return toReadable(upstream);
}
function cache(input, options = {}) {
  let lastValue = options.initialValue;
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
function annotate(input, transformer, options = {}) {
  const upstream = initUpstream(input, {
    ...options,
    onValue(value) {
      const t2 = transformer(value);
      upstream.set(t2);
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
var cloneFromFields = (source) => {
  return transform(source, (v2) => {
    const entries = [];
    for (const field2 in v2) {
      const value = v2[field2];
      if (isPlainObjectOrPrimitive(value)) {
        entries.push([field2, value]);
      }
    }
    return Object.fromEntries(entries);
  });
};
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
        for (const v2 of values) {
          if (options.predicate(v2)) {
            upstream.set(v2);
          }
        }
      } else if (options.at) {
        upstream.set(values.at(options.at));
      }
    }
  });
  return upstream;
}
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
function debounce(source, options = {}) {
  const elapsed = intervalToMs(options.elapsed, 50);
  let lastValue;
  const timer = timeout(() => {
    const v2 = lastValue;
    if (v2) {
      upstream.set(v2);
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
    for (const [index, l2] of this.colLabels.entries()) {
      if (l2 === label)
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
    const r2 = [];
    for (const row of this.rows) {
      if (row === void 0)
        r2.push([]);
      else
        r2.push([...row]);
    }
    return r2;
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
    const object = {};
    for (let index = 0; index < this.colLabels.length; index++) {
      const label = this.colLabels.at(index) ?? index.toString();
      object[label] = row[index];
    }
    return object;
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
  const v2 = [...graph3.vertices.values()];
  const table = new Table();
  table.labelColumns(...v2.map((vv) => vv.id));
  table.labelRows(...v2.map((vv) => vv.id));
  for (let i2 = 0; i2 < v2.length; i2++) {
    table.setRow(i2, v2.length, false);
    const ii = v2[i2];
    for (const [j2, jj] of v2.entries()) {
      if (ii.out.some((o2) => o2.id === jj.id)) {
        table.set(i2, j2, true);
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
  const r2 = [];
  const vertices2 = `vertices` in graph3 ? graph3.vertices.values() : graph3;
  for (const v2 of vertices2) {
    const str = debugDumpVertex(v2);
    r2.push(...str.map((line2) => ` ${line2}`));
  }
  return r2;
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
  const outs = outIdOrVertex.map((o2) => resolveVertex(graph3, o2));
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
  const v2 = graph3.vertices.get(id);
  if (v2 !== void 0)
    return { graph: graph3, vertex: v2 };
  const vv = createVertex(id);
  const gg = updateGraphVertex(graph3, vv);
  return { graph: gg, vertex: vv };
};
var getOrFail = (graph3, id) => {
  const v2 = graph3.vertices.get(id);
  if (v2 === void 0)
    throw new Error(`Vertex '${id}' not found in graph`);
  return v2;
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
    out: fromV.out.filter((t2) => t2.id !== toV.id)
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
var debugDumpVertex = (v2) => {
  const r2 = [
    v2.id
  ];
  const stringForEdge2 = (edge) => edge.weight === void 0 ? edge.id : `${edge.id} (${edge.weight})`;
  for (const edge of v2.out) {
    r2.push(` -> ${stringForEdge2(edge)}`);
  }
  if (v2.out.length === 0)
    r2[0] += ` (terminal)`;
  return r2;
};
function areAdjacent(graph3, a2, b2) {
  if (hasOut(graph3, a2, b2.id))
    return true;
  if (hasOut(graph3, b2, a2.id))
    return true;
}
function resolveVertex(graph3, idOrVertex) {
  const v2 = typeof idOrVertex === `string` ? graph3.vertices.get(idOrVertex) : idOrVertex;
  if (v2 === void 0)
    throw new Error(`Id not found ${idOrVertex}`);
  return v2;
}
function* bfs(graph3, startIdOrVertex, targetIdOrVertex) {
  const start = resolveVertex(graph3, startIdOrVertex);
  const target = targetIdOrVertex === void 0 ? void 0 : resolveVertex(graph3, targetIdOrVertex);
  const queue = new QueueMutable();
  const seen = /* @__PURE__ */ new Set();
  queue.enqueue(start);
  while (!queue.isEmpty) {
    const v2 = queue.dequeue();
    yield v2;
    if (target !== void 0 && target === v2)
      return;
    for (const edge of adjacentVertices(graph3, v2)) {
      if (!seen.has(edge.id)) {
        seen.add(edge.id);
        queue.enqueue(resolveVertex(graph3, edge.id));
      }
    }
  }
}
function* dfs(graph3, startIdOrVertex) {
  const source = resolveVertex(graph3, startIdOrVertex);
  const s2 = new StackMutable();
  const seen = /* @__PURE__ */ new Set();
  s2.push(source);
  while (!s2.isEmpty) {
    const v2 = s2.pop();
    if (v2 === void 0)
      continue;
    if (!seen.has(v2.id)) {
      seen.add(v2.id);
      yield v2;
      for (const edge of v2.out) {
        const destination = graph3.vertices.get(edge.id);
        if (destination) {
          s2.push(destination);
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
  for (const v2 of vertices2) {
    if (v2.id !== source.id) {
      distances.set(v2.id, Number.MAX_SAFE_INTEGER);
      previous.set(v2.id, null);
    }
    pq.enqueueWithPriority(v2.id, Number.MAX_SAFE_INTEGER);
  }
  while (!pq.isEmpty) {
    const u2 = pq.dequeueMin();
    if (u2 === void 0)
      throw new Error(`Bug. Queue unexpectedly empty`);
    const vertexU = graph3.vertices.get(u2);
    for (const neighbour of vertexU.out) {
      const alt = distances.get(u2) + distance2(graph3, neighbour);
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
      const v2 = previous.get(id);
      if (v2 === void 0 || v2 === null)
        throw new Error(`Id not present: ${id}`);
      path.push({ id, weight: distances.get(id) });
      id = v2.id;
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
  const g2 = {
    vertices: immutable([...graph3.vertices.entries()])
  };
  return g2;
};
var graph = (...initialConnections) => {
  let g2 = {
    vertices: immutable()
  };
  for (const ic of initialConnections) {
    g2 = connect(g2, ic);
  }
  return g2;
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
    const u2 = queue.dequeue();
    topOrder.push(u2);
    for (const neighbour of u2.out) {
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
  const keyValues = map(vertices2, (f2) => {
    return [f2.id, f2];
  });
  const m2 = immutable([...keyValues]);
  return {
    vertices: m2
  };
}
function getCycles(graph3) {
  let index = 0;
  const stack = new StackMutable();
  const vertices2 = /* @__PURE__ */ new Map();
  const scc = [];
  for (const v2 of graph3.vertices.values()) {
    vertices2.set(v2.id, {
      ...v2,
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
      let w2;
      while (vertex !== w2) {
        w2 = stack.pop();
        w2.onStack = false;
        stronglyConnected.push({ id: w2.id, out: w2.out });
      }
      if (stronglyConnected.length > 1)
        scc.push(stronglyConnected);
    }
  };
  for (const v2 of vertices2.values()) {
    if (Number.isNaN(v2.index)) {
      strongConnect(v2);
    }
  }
  return scc;
}
function transitiveReduction(graph3) {
  for (const u2 of vertices(graph3)) {
    for (const v2 of adjacentVertices(graph3, u2)) {
      for (const v1 of dfs(graph3, v2)) {
        if (v2.id === v1.id)
          continue;
        if (hasOut(graph3, u2, v1)) {
          const g2 = disconnect(graph3, u2, v1);
          return transitiveReduction(g2);
        }
      }
    }
  }
  return graph3;
}

// src/rx/Graph.ts
function isReactive2(o2) {
  if (typeof o2 !== `object`)
    return false;
  if (`on` in o2) {
    return typeof o2.on === `function`;
  }
  return false;
}
function prepare(_rx) {
  let g2 = graph();
  const nodes = /* @__PURE__ */ new Map();
  const events = initStream();
  const process = (o2, path) => {
    for (const [key, value] of Object.entries(o2)) {
      const subPath = path + `.` + key;
      g2 = connect(g2, {
        from: path,
        to: subPath
      });
      if (isReactive2(value)) {
        nodes.set(subPath, { value, type: `rx` });
        value.on((v2) => {
          console.log(`Reactive.prepare value: ${JSON.stringify(v2)} path: ${subPath}`);
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
    graph: g2,
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
  const promise = new Promise((resolve2, reject) => {
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
      resolve2(read);
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
  const v2 = await toArray(source, { limit, maximumWait, underThreshold: `partial` });
  if (options.limit && v2.length < options.limit)
    throw new Error(`Threshold not reached. Wanted: ${options.limit}, got ${v2.length}`);
  return v2;
}

// src/rx/ToGenerator.ts
async function* toGenerator(source) {
  const s2 = resolveSource(source);
  let promiseResolve = (_2) => {
  };
  let promiseReject = (_2) => {
  };
  const promiseInit = () => new Promise((resolve2, reject) => {
    promiseResolve = resolve2;
    promiseReject = reject;
  });
  let promise = promiseInit();
  let keepRunning = true;
  s2.on((message) => {
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

// src/rx/FromArray.ts
function fromArray(initialValue = [], options = {}) {
  const eq = options.eq ?? isEqualValueDefault;
  const setEvent = initStream();
  const arrayEvent = initStream();
  let value = initialValue;
  let disposed = false;
  const set = (replacement) => {
    const diff = compareArrays(value, replacement, eq);
    console.log(`Rx.fromArray.set diff`, diff);
    value = replacement;
    setEvent.set([...replacement]);
  };
  const setAt = (index, v2) => {
    value[index] = v2;
    setEvent.set([...value]);
  };
  const push2 = (v2) => {
    value = [...value, v2];
    setEvent.set([...value]);
    const cr = [`add`, value.length - 1, v2];
    arrayEvent.set([cr]);
  };
  const deleteAt = (index) => {
    const valueChanged = remove(value, index);
    if (valueChanged.length === value.length)
      return;
    const diff = compareArrays(value, valueChanged, eq);
    console.log(diff.summary);
    value = valueChanged;
    setEvent.set([...value]);
    arrayEvent.set(diff.summary);
  };
  const deleteWhere = (filter2) => {
    const valueChanged = value.filter((v2) => !filter2(v2));
    const count2 = value.length - valueChanged.length;
    const diff = compareArrays(value, valueChanged, eq);
    value = valueChanged;
    setEvent.set([...value]);
    arrayEvent.set(diff.summary);
    return count2;
  };
  const insertAt2 = (index, v2) => {
    const valueChanged = insertAt(value, index, v2);
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
  return {
    dispose,
    isDisposed() {
      return disposed;
    },
    last: () => value,
    on: setEvent.on,
    onArray: arrayEvent.on,
    value: setEvent.value,
    setAt,
    push: push2,
    deleteAt,
    deleteWhere,
    insertAt: insertAt2,
    /**
     * Set the whole object
     */
    set
  };
}

// src/rx/FromEvent.ts
function fromEvent(target, name, options = {}) {
  if (target === null)
    throw new Error(`Param 'target' is null`);
  const transform2 = options.transform;
  const initialValue = transform2 ? transform2() : void 0;
  const debugLifecycle = options.debugLifecycle ?? false;
  const debugFiring = options.debugFiring ?? false;
  const rxObject = initialValue ? fromObject(initialValue, { deepEntries: true }) : fromObject(void 0, { deepEntries: true });
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

// src/rx/Wrap.ts
function wrap2(source) {
  return {
    source: resolveSource(source),
    toArray: (options) => {
      return toArray(source, options);
    },
    toArrayOrThrow: (options) => {
      return toArrayOrThrow(source, options);
    },
    value: (callback) => {
      const s2 = resolveSource(source);
      s2.on((message) => {
        if (messageHasValue(message))
          callback(message.value);
      });
    },
    batch: (options) => {
      const w2 = wrap2(batch(source, options));
      return w2;
    },
    annotate: (transformer) => {
      const a2 = annotate(source, transformer);
      return wrap2(a2);
    },
    annotateElapsed: () => {
      return wrap2(annotateElapsed(source));
    },
    field: (fieldName, options = {}) => {
      const f2 = field(fieldName, options)(source);
      return wrap2(f2);
    },
    filter: (predicate, options) => {
      return wrap2(filter(source, predicate, options));
    },
    split: (options = {}) => {
      const streams = split(options)(source).map((v2) => wrap2(v2));
      return streams;
    },
    splitLabelled: (...labels) => {
      const l2 = splitLabelled(...labels)(source);
      const m2 = map2(l2, (v2) => wrap2(v2));
      return m2;
    },
    switcher: (cases, options = {}) => {
      const s2 = switcher(source, cases, options);
      const m2 = map2(s2, (v2) => wrap2(v2));
      return m2;
    },
    //synchronise: (...additionalSources: Array<Wrapped<TIn> | ReactiveOrSource<TIn>>) => {
    synchronise: (additionalSources, options = {}) => {
      const unwrapped = [source, ...additionalSources].map((v2) => resolveSource(v2));
      const x2 = sync(unwrapped, options);
      return wrap2(x2);
    },
    debounce: (options = {}) => {
      return wrap2(debounce(source, options));
    },
    throttle: (options = {}) => {
      return wrap2(throttle(source, options));
    },
    transform: (transformer, options = {}) => {
      return wrap2(transform(source, transformer, options));
    }
  };
}

// node_modules/lit-html/lit-html.js
var t = globalThis;
var i = t.trustedTypes;
var s = i ? i.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0;
var e = "$lit$";
var h = `lit$${(Math.random() + "").slice(9)}$`;
var o = "?" + h;
var n = `<${o}>`;
var r = document;
var l = () => r.createComment("");
var c = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2;
var a = Array.isArray;
var u = (t2) => a(t2) || "function" == typeof t2?.[Symbol.iterator];
var d = "[ 	\n\f\r]";
var f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var v = /-->/g;
var _ = />/g;
var m = RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var p = /'/g;
var g = /"/g;
var $ = /^(?:script|style|textarea|title)$/i;
var y = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 });
var x = y(1);
var b = y(2);
var w = Symbol.for("lit-noChange");
var T = Symbol.for("lit-nothing");
var A = /* @__PURE__ */ new WeakMap();
var E = r.createTreeWalker(r, 129);
function C(t2, i2) {
  if (!Array.isArray(t2) || !t2.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return void 0 !== s ? s.createHTML(i2) : i2;
}
var P = (t2, i2) => {
  const s2 = t2.length - 1, o2 = [];
  let r2, l2 = 2 === i2 ? "<svg>" : "", c2 = f;
  for (let i3 = 0; i3 < s2; i3++) {
    const s3 = t2[i3];
    let a2, u2, d2 = -1, y2 = 0;
    for (; y2 < s3.length && (c2.lastIndex = y2, u2 = c2.exec(s3), null !== u2); )
      y2 = c2.lastIndex, c2 === f ? "!--" === u2[1] ? c2 = v : void 0 !== u2[1] ? c2 = _ : void 0 !== u2[2] ? ($.test(u2[2]) && (r2 = RegExp("</" + u2[2], "g")), c2 = m) : void 0 !== u2[3] && (c2 = m) : c2 === m ? ">" === u2[0] ? (c2 = r2 ?? f, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? m : '"' === u2[3] ? g : p) : c2 === g || c2 === p ? c2 = m : c2 === v || c2 === _ ? c2 = f : (c2 = m, r2 = void 0);
    const x2 = c2 === m && t2[i3 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === f ? s3 + n : d2 >= 0 ? (o2.push(a2), s3.slice(0, d2) + e + s3.slice(d2) + h + x2) : s3 + h + (-2 === d2 ? i3 : x2);
  }
  return [C(t2, l2 + (t2[s2] || "<?>") + (2 === i2 ? "</svg>" : "")), o2];
};
var V = class _V {
  constructor({ strings: t2, _$litType$: s2 }, n2) {
    let r2;
    this.parts = [];
    let c2 = 0, a2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [f2, v2] = P(t2, s2);
    if (this.el = _V.createElement(f2, n2), E.currentNode = this.el.content, 2 === s2) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (r2 = E.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes())
          for (const t3 of r2.getAttributeNames())
            if (t3.endsWith(e)) {
              const i2 = v2[a2++], s3 = r2.getAttribute(t3).split(h), e2 = /([.?@])?(.*)/.exec(i2);
              d2.push({ type: 1, index: c2, name: e2[2], strings: s3, ctor: "." === e2[1] ? k : "?" === e2[1] ? H : "@" === e2[1] ? I : R }), r2.removeAttribute(t3);
            } else
              t3.startsWith(h) && (d2.push({ type: 6, index: c2 }), r2.removeAttribute(t3));
        if ($.test(r2.tagName)) {
          const t3 = r2.textContent.split(h), s3 = t3.length - 1;
          if (s3 > 0) {
            r2.textContent = i ? i.emptyScript : "";
            for (let i2 = 0; i2 < s3; i2++)
              r2.append(t3[i2], l()), E.nextNode(), d2.push({ type: 2, index: ++c2 });
            r2.append(t3[s3], l());
          }
        }
      } else if (8 === r2.nodeType)
        if (r2.data === o)
          d2.push({ type: 2, index: c2 });
        else {
          let t3 = -1;
          for (; -1 !== (t3 = r2.data.indexOf(h, t3 + 1)); )
            d2.push({ type: 7, index: c2 }), t3 += h.length - 1;
        }
      c2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = r.createElement("template");
    return s2.innerHTML = t2, s2;
  }
};
function N(t2, i2, s2 = t2, e2) {
  if (i2 === w)
    return i2;
  let h2 = void 0 !== e2 ? s2._$Co?.[e2] : s2._$Cl;
  const o2 = c(i2) ? void 0 : i2._$litDirective$;
  return h2?.constructor !== o2 && (h2?._$AO?.(false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s2, e2)), void 0 !== e2 ? (s2._$Co ??= [])[e2] = h2 : s2._$Cl = h2), void 0 !== h2 && (i2 = N(t2, h2._$AS(t2, i2.values), h2, e2)), i2;
}
var S = class {
  constructor(t2, i2) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: i2 }, parts: s2 } = this._$AD, e2 = (t2?.creationScope ?? r).importNode(i2, true);
    E.currentNode = e2;
    let h2 = E.nextNode(), o2 = 0, n2 = 0, l2 = s2[0];
    for (; void 0 !== l2; ) {
      if (o2 === l2.index) {
        let i3;
        2 === l2.type ? i3 = new M(h2, h2.nextSibling, this, t2) : 1 === l2.type ? i3 = new l2.ctor(h2, l2.name, l2.strings, this, t2) : 6 === l2.type && (i3 = new L(h2, this, t2)), this._$AV.push(i3), l2 = s2[++n2];
      }
      o2 !== l2?.index && (h2 = E.nextNode(), o2++);
    }
    return E.currentNode = r, e2;
  }
  p(t2) {
    let i2 = 0;
    for (const s2 of this._$AV)
      void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
};
var M = class _M {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t2, i2, s2, e2) {
    this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cv = e2?.isConnected ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return void 0 !== i2 && 11 === t2?.nodeType && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = N(this, t2, i2), c(t2) ? t2 === T || null == t2 || "" === t2 ? (this._$AH !== T && this._$AR(), this._$AH = T) : t2 !== this._$AH && t2 !== w && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : u(t2) ? this.k(t2) : this._(t2);
  }
  S(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.S(t2));
  }
  _(t2) {
    this._$AH !== T && c(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(r.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    const { values: i2, _$litType$: s2 } = t2, e2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = V.createElement(C(s2.h, s2.h[0]), this.options)), s2);
    if (this._$AH?._$AD === e2)
      this._$AH.p(i2);
    else {
      const t3 = new S(e2, this), s3 = t3.u(this.options);
      t3.p(i2), this.T(s3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = A.get(t2.strings);
    return void 0 === i2 && A.set(t2.strings, i2 = new V(t2)), i2;
  }
  k(t2) {
    a(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const h2 of t2)
      e2 === i2.length ? i2.push(s2 = new _M(this.S(l()), this.S(l()), this, this.options)) : s2 = i2[e2], s2._$AI(h2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, i2) {
    for (this._$AP?.(false, true, i2); t2 && t2 !== this._$AB; ) {
      const i3 = t2.nextSibling;
      t2.remove(), t2 = i3;
    }
  }
  setConnected(t2) {
    void 0 === this._$AM && (this._$Cv = t2, this._$AP?.(t2));
  }
};
var R = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, i2, s2, e2, h2) {
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = T;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2)
      t2 = N(this, t2, i2, 0), o2 = !c(t2) || t2 !== this._$AH && t2 !== w, o2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let n2, r2;
      for (t2 = h2[0], n2 = 0; n2 < h2.length - 1; n2++)
        r2 = N(this, e3[s2 + n2], i2, n2), r2 === w && (r2 = this._$AH[n2]), o2 ||= !c(r2) || r2 !== this._$AH[n2], r2 === T ? t2 = T : t2 !== T && (t2 += (r2 ?? "") + h2[n2 + 1]), this._$AH[n2] = r2;
    }
    o2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
};
var k = class extends R {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === T ? void 0 : t2;
  }
};
var H = class extends R {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== T);
  }
};
var I = class extends R {
  constructor(t2, i2, s2, e2, h2) {
    super(t2, i2, s2, e2, h2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    if ((t2 = N(this, t2, i2, 0) ?? T) === w)
      return;
    const s2 = this._$AH, e2 = t2 === T && s2 !== T || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h2 = t2 !== T && (s2 === T || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
};
var L = class {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    N(this, t2);
  }
};
var Z = t.litHtmlPolyfillSupport;
Z?.(V, M), (t.litHtmlVersions ??= []).push("3.1.2");
var j = (t2, i2, s2) => {
  const e2 = s2?.renderBefore ?? i2;
  let h2 = e2._$litPart$;
  if (void 0 === h2) {
    const t3 = s2?.renderBefore ?? null;
    e2._$litPart$ = h2 = new M(i2.insertBefore(l(), t3), t3, void 0, s2 ?? {});
  }
  return h2._$AI(t2), h2;
};

// src/rx/Lit.ts
var lit = (elOrQuery, source, gen) => {
  const el2 = resolveEl(elOrQuery);
  source.value((value) => {
    j(gen(value), el2);
  });
  if (hasLast(source)) {
    j(gen(source.last()), el2);
  }
};

// src/rx/ReadFromArray.ts
var readFromArray = (sourceArray, options = {}) => {
  const lazy = options.lazy ?? `initial`;
  const signal = options.signal;
  const whenStopped = options.whenStopped ?? `continue`;
  const debugLifecycle = options.debugLifecycle ?? false;
  const array2 = [...sourceArray];
  const intervalMs = intervalToMs(options.interval, 5);
  let index = 0;
  let lastValue = array2[0];
  const s2 = initStream({
    onFirstSubscribe() {
      if (debugLifecycle)
        console.log(`Rx.readFromArray:onFirstSubscribe lazy: ${lazy} runState: '${c2.runState}'`);
      if (lazy !== `never` && c2.runState === `idle`)
        c2.start();
    },
    onNoSubscribers() {
      if (debugLifecycle)
        console.log(`Rx.readFromArray:onNoSubscribers lazy: ${lazy} runState: '${c2.runState}' whenStopped: '${whenStopped}'`);
      if (lazy === `very`) {
        c2.cancel();
        if (whenStopped === `reset`) {
          index = 0;
        }
      }
    }
  });
  const c2 = continuously(() => {
    if (signal?.aborted) {
      s2.dispose(`Signalled (${signal.reason})`);
      return false;
    }
    lastValue = array2[index];
    index++;
    s2.set(lastValue);
    if (index === array2.length) {
      s2.dispose(`Source array complete`);
      return false;
    }
  }, intervalMs);
  if (!lazy)
    c2.start();
  return {
    isDone() {
      return index === array2.length;
    },
    last() {
      return lastValue;
    },
    // eslint-disable-next-line @typescript-eslint/unbound-method
    on: s2.on,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    value: s2.value
  };
};

// src/rx/FromFunction.ts
function pinged(source, callback, options = {}) {
  const closeOnError = options.closeOnError ?? true;
  const lazy = options.lazy ?? `initial`;
  const internalAbort = new AbortController();
  const internalAbortCallback = (reason) => {
    internalAbort.abort(reason);
  };
  let upstreamOff;
  if (options.signal) {
    options.signal.addEventListener(`abort`, (_2) => {
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
      const v2 = await callback(value, internalAbortCallback);
      events.set(v2);
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
function fromFunction(callback, options = {}) {
  const maximumRepeats = options.maximumRepeats ?? Number.MAX_SAFE_INTEGER;
  const closeOnError = options.closeOnError ?? true;
  const interval = intervalToMs(options.interval, 1);
  const loop = options.interval !== void 0;
  const predelay = intervalToMs(options.predelay, 1);
  const lazy = options.lazy ?? `initial`;
  const signal = options.signal;
  const internalAbort = new AbortController();
  const internalAbortCallback = (reason) => {
    internalAbort.abort(reason);
  };
  let sentResults = 0;
  if (options.maximumRepeats && !loop)
    throw new Error(`'maximumRepeats' has no purpose if 'loop' is not set to true`);
  const events = initStream({
    onFirstSubscribe() {
      if (run2.runState === `idle`)
        run2.start();
    },
    onNoSubscribers() {
      if (lazy === `very`) {
        run2.cancel();
      }
    }
  });
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
  if (lazy === `never`)
    run2.start();
  return events;
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
  push: () => push,
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
  return (v2) => {
    throwNumberTest(v2);
    min = Math.min(min, v2);
    max = Math.max(max, v2);
    return scale(v2, min, max);
  };
};
var array = (values, minForced, maxForced) => {
  if (!Array.isArray(values)) {
    throw new Error(`values param should be an array`);
  }
  const mma = minMaxAvg(values);
  const min = minForced ?? mma.min;
  const max = maxForced ?? mma.max;
  return values.map((v2) => clamp(scale(v2, min, max)));
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
      keyString = (a2) => {
        if (a2 === void 0)
          throw new Error(`Cannot create key for undefined`);
        return typeof a2 === `string` ? a2 : JSON.stringify(a2);
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
    let t2 = ``;
    for (const [key, count2] of this.#store.entries()) {
      t2 += `${key}: ${count2}, `;
    }
    if (t2.endsWith(`, `))
      return t2.slice(0, Math.max(0, t2.length - 2));
    return t2;
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
    const s2 = getSorter(sortStyle);
    return s2(this.entries());
  }
  /**
   *
   * @param values Values to add. Fires _change_ event after adding item(s)
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  add(...values) {
    if (values === void 0)
      throw new Error(`value parameter is undefined`);
    const keys = values.map((v2) => this.#keyString(v2));
    for (const key of keys) {
      const score = this.#store.get(key) ?? 0;
      this.#store.set(key, score + 1);
    }
    this.fireEvent(`change`, { context: this });
  }
};
var frequencyMutable = (keyString) => new FrequencyMutable(keyString);

// src/data/MovingAverage.ts
var movingAverageLight = (scaling = 3) => {
  throwNumberTest(scaling, `aboveZero`, `scaling`);
  let average2 = 0;
  let count2 = 0;
  let disposed = false;
  const ma = {
    dispose() {
      disposed = true;
    },
    get isDisposed() {
      return disposed;
    },
    add(v2) {
      if (disposed)
        throw new Error(`MovingAverage disposed, cannot add`);
      count2++;
      average2 = average2 + (v2 - average2) / Math.min(count2, scaling);
      return average2;
    },
    clear() {
      if (disposed)
        throw new Error(`MovingAverage disposed, cannot clear`);
      average2 = 0;
      count2 = 0;
    },
    compute() {
      return average2;
    }
  };
  return ma;
};
var movingAverageTimed = (updateRateMs = 200, value = 0, scaling = 3) => {
  throwNumberTest(scaling, `aboveZero`, `scaling`);
  throwNumberTest(updateRateMs, `aboveZero`, `decayRateMs`);
  const mal = movingAverageLight(scaling);
  let timer = 0;
  const reschedule = () => {
    if (timer !== 0)
      clearTimeout(timer);
    timer = setTimeout(decay, updateRateMs);
  };
  const decay = () => {
    mal.add(value);
    if (!mal.isDisposed)
      setTimeout(decay, updateRateMs);
  };
  const ma = {
    add(v2) {
      reschedule();
      return mal.add(v2);
    },
    dispose() {
      mal.dispose();
    },
    clear: function() {
      mal.clear();
    },
    compute: function() {
      return mal.compute();
    },
    isDisposed: false
  };
  return ma;
};
var movingAverage = (samples = 100, weighter) => {
  let disposed = false;
  let q = new QueueMutable({
    capacity: samples,
    discardPolicy: `older`
  });
  const clear2 = () => {
    q = new QueueMutable({
      capacity: samples,
      discardPolicy: `older`
    });
  };
  const compute = () => {
    return weighter === void 0 ? average(q.data) : averageWeighted(q.data, weighter);
  };
  const add2 = (v2) => {
    q.enqueue(v2);
    return compute();
  };
  const dispose = () => {
    disposed = true;
  };
  return { add: add2, compute, clear: clear2, dispose, isDisposed: disposed };
};
var PiPi = Math.PI * 2;
var smoothingFactor = (timeDelta, cutoff) => {
  const r2 = PiPi * cutoff * timeDelta;
  return r2 / (r2 + 1);
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
    const s2 = smoothingFactor(timeDelta, cutoffDefault);
    const valueDelta = (value - previousValue) / timeDelta;
    const derivative = exponentialSmoothing(s2, valueDelta, derivativeLast);
    const cutoff = cutoffMin + speedCoefficient * Math.abs(derivative);
    const a2 = smoothingFactor(timeDelta, cutoff);
    const smoothed = exponentialSmoothing(a2, value, previousValue);
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
  filterData(p2) {
    const ts = p2.map(
      (v2) => `at` in v2 ? v2 : {
        ...v2,
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
  seenEvent(p2) {
    if (`getCoalescedEvents` in p2) {
      const events = p2.getCoalescedEvents();
      const asPoints = events.map((event) => ({ x: event.clientX, y: event.clientY }));
      return this.seen(...asPoints);
    } else {
      return this.seen({ x: p2.clientX, y: p2.clientY });
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
    const r2 = {
      fromInitial: initialRel,
      fromLast: lastRel,
      values: [...this.values]
    };
    this.lastResult = r2;
    return r2;
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
    const l2 = this.line;
    return line_exports.length(l2);
  }
};
var TrackedPointMap = class extends TrackedValueMap {
  constructor(opts = {}) {
    super((key, start) => {
      if (start === void 0)
        throw new Error(`Requires start point`);
      const p2 = new PointTracker({
        ...opts,
        id: key
      });
      p2.seen(start);
      return p2;
    });
  }
  /**
   * Track a PointerEvent
   * @param event
   */
  seenEvent(event) {
    if (`getCoalescedEvents` in event) {
      const events = event.getCoalescedEvents();
      const seens = events.map((subEvent) => super.seen(subEvent.pointerId.toString(), subEvent));
      return Promise.all(seens);
    } else {
      return Promise.all([super.seen(event.pointerId.toString(), event)]);
    }
  }
};
var pointsTracker = (opts = {}) => new TrackedPointMap(opts);
var pointTracker = (opts = {}) => new PointTracker(opts);

// src/data/Flip.ts
var flip = (v2) => {
  if (typeof v2 === `function`)
    v2 = v2();
  throwNumberTest(v2, `percentage`, `v`);
  return 1 - v2;
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
  const v2 = graph3.vertices.get(id);
  if (v2 !== void 0)
    return { graph: graph3, vertex: v2 };
  const vv = createVertex2(id);
  const gg = updateGraphVertex2(graph3, vv);
  return { graph: gg, vertex: vv };
};
function resolveVertex2(graph3, idOrVertex) {
  const v2 = typeof idOrVertex === `string` ? graph3.vertices.get(idOrVertex) : idOrVertex;
  if (v2 === void 0)
    throw new Error(`Id not found ${idOrVertex}`);
  return v2;
}
var hasConnection = (graph3, a2, b2) => {
  const edge = getConnection(graph3, a2, b2);
  return edge !== void 0;
};
var getConnection = (graph3, a2, b2) => {
  const aa = resolveVertex2(graph3, a2);
  const bb = resolveVertex2(graph3, b2);
  for (const edge of graph3.edges) {
    if (edge.a == aa.id && edge.b === bb.id)
      return edge;
    if (edge.a == bb.id && edge.b === aa.id)
      return edge;
  }
  return;
};
function connectTo2(graph3, a2, b2, weight) {
  const aResult = getOrCreate2(graph3, a2);
  graph3 = aResult.graph;
  const bResult = getOrCreate2(graph3, b2);
  graph3 = bResult.graph;
  let edge = getConnection(graph3, a2, b2);
  if (edge !== void 0)
    return { graph: graph3, edge };
  edge = {
    a: a2,
    b: b2,
    weight
  };
  const graphChanged = {
    ...graph3,
    edges: [...graph3.edges, edge]
  };
  return { graph: graphChanged, edge };
}
function connect2(graph3, options) {
  const { a: a2, weight, b: b2 } = options;
  const destinations = Array.isArray(b2) ? b2 : [b2];
  for (const destination of destinations) {
    const result = connectTo2(graph3, a2, destination, weight);
    graph3 = result.graph;
  }
  return graph3;
}
var graph2 = (...initialConnections) => {
  let g2 = {
    vertices: immutable(),
    edges: []
  };
  for (const ic of initialConnections) {
    g2 = connect2(g2, ic);
  }
  return g2;
};
function toAdjacencyMatrix2(graph3) {
  const v2 = [...graph3.vertices.values()];
  const table = new Table();
  table.labelColumns(...v2.map((vv) => vv.id));
  table.labelRows(...v2.map((vv) => vv.id));
  for (let i2 = 0; i2 < v2.length; i2++) {
    table.setRow(i2, v2.length, false);
    const ii = v2[i2];
    for (const [j2, jj] of v2.entries()) {
      const connected = hasConnection(graph3, ii, jj);
      if (connected) {
        table.set(i2, j2, true);
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
  const r2 = [];
  r2.push(`Vertices: ${[...graph3.vertices.values()].map((v2) => v2.id).join(`, `)}`);
  r2.push(`Edges:`);
  for (const edge of graph3.edges) {
    r2.push(stringForEdge(edge));
  }
  return r2;
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
    const v2 = await valueOrFunction.next();
    return v2.value;
  }
  if (typeof valueOrFunction === `function`) {
    const v2 = await valueOrFunction();
    return v2;
  }
  return valueOrFunction;
}
async function fieldResolve(object) {
  const output = [];
  for (const entry of Object.entries(object)) {
    const key = entry[0];
    const valueOrFunction = entry[1];
    const value = await resolveValue(valueOrFunction);
    output.push([key, value]);
  }
  return Object.fromEntries(output);
}
function fieldResolver(object) {
  return () => fieldResolve(object);
}
function pull(value) {
  const sources = {};
  const fixedValues = {};
  const generators = {};
  for (const [key, v2] of Object.entries(value)) {
    if (Array.isArray(v2) || isPrimitive(v2)) {
      fixedValues[key] = v2;
    } else if (isIterable(v2) || isAsyncIterable(v2)) {
      generators[key] = v2;
    } else {
      const s2 = resolveSource(v2);
      sources[key] = s2;
    }
  }
  const r2 = mergeToObject(sources, { onSourceDone: `allow` });
  let lastRxValue;
  const off = r2.value((v2) => {
    lastRxValue = v2;
  });
  const compute = () => ({ ...fixedValues, ...lastRxValue });
  const dispose = () => {
    off();
    if (isDisposable(r2)) {
      r2.dispose(`ResolveFields.dispose`);
    }
  };
  return { compute, dispose };
}
function push(value) {
  const sources = {};
  const fixedValues = {};
  for (const [key, v2] of Object.entries(value)) {
    if (Array.isArray(v2) || isPrimitive(v2)) {
      fixedValues[key] = v2;
      continue;
    }
    const s2 = resolveSource(v2);
    sources[key] = s2;
  }
  const r2 = mergeToObject(sources, { onSourceDone: `allow` });
  let lastRxValue;
  const off = r2.value((v2) => {
    lastRxValue = v2;
  });
  const compute = () => ({ ...fixedValues, ...lastRxValue });
  const dispose = () => {
    off();
    if (isDisposable(r2)) {
      r2.dispose(`ResolveFields.dispose`);
    }
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
  const v2 = startingValue;
  return {
    [Symbol.toPrimitive](hint) {
      if (hint === `number`)
        return v2;
      else if (hint === `string`)
        return v2.toString();
      return true;
    },
    value: v2,
    towardZero: (amt) => {
      return immutable2(towardZero(v2, amt));
    },
    add: (amt) => {
      return immutable2(clamp3(v2 + amt));
    },
    multiply: (amt) => {
      return immutable2(clamp3(v2 * amt));
    },
    inverse: () => {
      return immutable2(-v2);
    },
    interpolate: (amt, b2) => {
      return immutable2(clamp3(interpolate(amt, v2, b2)));
    },
    asScalar: () => {
      return toScalar(v2);
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
var orderScore = (a2, b2) => {
  if (a2.score > b2.score)
    return -1;
  else if (a2.score < b2.score)
    return 1;
  return 0;
};
var align = (similarityFn, lastData, newData, opts = {}) => {
  const matchThreshold = opts.matchThreshold ?? 0;
  const debug = opts.debug ?? false;
  const results = /* @__PURE__ */ new Map();
  const newThings = [];
  const lastMap = /* @__PURE__ */ new Map();
  lastData?.forEach((d2, index) => {
    if (d2 === void 0) {
      throw new Error(`'lastData' contains undefined (index: ${index})`);
    }
    lastMap.set(d2.id, d2);
  });
  for (let i2 = 0; i2 < newData.length; i2++) {
    const newD = newData[i2];
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
  newThings.forEach((t2) => results.set(t2.id, t2));
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
    const existing = this.#users.find((u2) => u2 === user || u2.key === user.key);
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
    this.#users = this.#users.filter((u2) => u2 !== user);
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
    for (const u2 of this.#users) {
      u2._dispose(`resource-${reason}`, data);
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
    let r2 = `Pool
    capacity: ${this.capacity} userExpireAfterMs: ${this.userExpireAfterMs} capacityPerResource: ${this.capacityPerResource}
    resources count: ${this._resources.length}`;
    const resource = this._resources.map((r3) => r3.toString()).join(`\r
	`);
    r2 += `\r
Resources:\r
	` + resource;
    r2 += `\r
Users: \r
`;
    for (const [k2, v2] of this._users.entries()) {
      r2 += `	k: ${k2} v: ${v2.toString()}\r
`;
    }
    return r2;
  }
  /**
   * Sorts users by longest elapsed time since update
   * @returns
   */
  getUsersByLongestElapsed() {
    return [...this._users.values()].sort((a2, b2) => {
      const aa = a2.elapsed;
      const bb = b2.elapsed;
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
    return [...this._resources].sort((a2, b2) => {
      if (a2.usersCount === b2.usersCount)
        return 0;
      if (a2.usersCount < b2.usersCount)
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
    for (const p2 of this._resources) {
      if (p2.isDisposed) {
        this.log.log(`Maintain, disposed resource: ${JSON.stringify(p2.data)}`);
        nuke.push(p2);
      } else if (p2.isExpiredFromUsers) {
        this.log.log(`Maintain, expired resource: ${JSON.stringify(p2.data)}`);
        nuke.push(p2);
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
    for (const r2 of resource) {
      yield r2;
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
    for (const r2 of resource) {
      yield r2.data;
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
  _releaseResource(resource, _2) {
    this._resources = this._resources.filter((v2) => v2 !== resource);
  }
  /**
   * Returns true if `v` has an associted resource in the pool
   * @param resource
   * @returns
   */
  hasResource(resource) {
    const found = this._resources.find((v2) => v2.data === resource);
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
    const u2 = new PoolUser(key, resource);
    this._users.set(key, u2);
    resource._assign(u2);
    return u2;
  }
  /**
   * @internal
   * @param userKey
   * @returns
   */
  _findUser(userKey) {
    const sorted = this.getResourcesSortedByUse();
    if (sorted.length > 0 && sorted[0].hasUserCapacity) {
      const u2 = this._assign(userKey, sorted[0]);
      return u2;
    }
    if (this.generateResource && (this.capacity < 0 || this._resources.length < this.capacity)) {
      this.log.log(
        `capacity: ${this.capacity} resources: ${this._resources.length}`
      );
      const resourceGenerated = this.addResource(this.generateResource());
      const u2 = this._assign(userKey, resourceGenerated);
      return u2;
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
  const push2 = (...ops) => {
    if (stk === void 0)
      stk = new StackImmutable();
    const s2 = stk.push(...ops);
    for (const o2 of ops)
      o2(ctx);
    return drawingStack(ctx, s2);
  };
  const pop = () => {
    const s2 = stk?.pop();
    return drawingStack(ctx, s2);
  };
  const apply = () => {
    if (stk === void 0)
      return drawingStack(ctx);
    for (const op of stk.data)
      op(ctx);
    return drawingStack(ctx, stk);
  };
  return { push: push2, pop, apply };
};
var lineThroughPoints = (ctx, points, opts) => {
  applyOpts(ctx, opts);
  ctx.moveTo(points[0].x, points[0].y);
  for (const [index, p2] of points.entries()) {
    if (index + 2 >= points.length)
      continue;
    const pNext = points[index + 1];
    const mid = {
      x: (p2.x + pNext.x) / 2,
      y: (p2.y + pNext.y) / 2
    };
    const cpX1 = (mid.x + p2.x) / 2;
    const cpX2 = (mid.x + pNext.x) / 2;
    ctx.quadraticCurveTo(cpX1, pNext.y, mid.x, mid.y);
    ctx.quadraticCurveTo(cpX2, pNext.y, pNext.x, pNext.y);
  }
};
var circle = (ctx, circlesToDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (c2) => {
    ctx.beginPath();
    ctx.arc(c2.x, c2.y, c2.radius, 0, PIPI);
    if (opts.strokeStyle)
      ctx.stroke();
    if (opts.fillStyle)
      ctx.fill();
  };
  if (Array.isArray(circlesToDraw)) {
    for (const c2 of circlesToDraw)
      draw2(c2);
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
    for (const p2 of pathsToDraw)
      draw2(p2);
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
  const m2 = ctx.getTransform();
  return {
    x: point.x * m2.a + point.y * m2.c + m2.e,
    y: point.x * m2.b + point.y * m2.d + m2.f
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
    for (const p2 of pos) {
      ctx.arc(p2.x, p2.y, radius, 0, 2 * Math.PI);
    }
  } else {
    const p2 = pos;
    ctx.arc(p2.x, p2.y, radius, 0, 2 * Math.PI);
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
  const { a: a2, b: b2, cubic1, cubic2 } = bezierToDraw;
  const isDebug = opts.debug ?? false;
  if (isDebug) {
  }
  ctx.beginPath();
  ctx.moveTo(a2.x, a2.y);
  ctx.bezierCurveTo(cubic1.x, cubic1.y, cubic2.x, cubic2.y, b2.x, b2.y);
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
    ctx.moveTo(a2.x, a2.y);
    ctx.lineTo(cubic1.x, cubic1.y);
    ctx.stroke();
    ctx.moveTo(b2.x, b2.y);
    ctx.lineTo(cubic2.x, cubic2.y);
    ctx.stroke();
    ctx.fillText(`a`, a2.x + 5, a2.y);
    ctx.fillText(`b`, b2.x + 5, b2.y);
    ctx.fillText(`c1`, cubic1.x + 5, cubic1.y);
    ctx.fillText(`c2`, cubic2.x + 5, cubic2.y);
    dot(ctx, cubic1, { radius: 3 });
    dot(ctx, cubic2, { radius: 3 });
    dot(ctx, a2, { radius: 3 });
    dot(ctx, b2, { radius: 3 });
    stack = stack.pop();
    stack.apply();
  }
};
var quadraticBezier = (ctx, bezierToDraw, opts = {}) => {
  const { a: a2, b: b2, quadratic } = bezierToDraw;
  const isDebug = opts.debug ?? false;
  let stack = applyOpts(ctx, opts);
  ctx.beginPath();
  ctx.moveTo(a2.x, a2.y);
  ctx.quadraticCurveTo(quadratic.x, quadratic.y, b2.x, b2.y);
  ctx.stroke();
  if (isDebug) {
    stack = stack.push(
      optsOp({
        ...opts,
        strokeStyle: opacity(opts.strokeStyle ?? `silver`, 0.6),
        fillStyle: opacity(opts.fillStyle ?? `yellow`, 0.4)
      })
    );
    connectedPoints(ctx, [a2, quadratic, b2]);
    ctx.fillText(`a`, a2.x + 5, a2.y);
    ctx.fillText(`b`, b2.x + 5, b2.y);
    ctx.fillText(`h`, quadratic.x + 5, quadratic.y);
    dot(ctx, quadratic, { radius: 3 });
    dot(ctx, a2, { radius: 3 });
    dot(ctx, b2, { radius: 3 });
    stack = stack.pop();
    stack.apply();
  }
};
var line = (ctx, toDraw, opts = {}) => {
  const isDebug = opts.debug ?? false;
  const o2 = lineOp(opts.lineWidth, opts.lineJoin, opts.lineCap);
  applyOpts(ctx, opts, o2);
  const draw2 = (d2) => {
    const { a: a2, b: b2 } = d2;
    ctx.beginPath();
    ctx.moveTo(a2.x, a2.y);
    ctx.lineTo(b2.x, b2.y);
    if (isDebug) {
      ctx.fillText(`a`, a2.x, a2.y);
      ctx.fillText(`b`, b2.x, b2.y);
      dot(ctx, a2, { radius: 5, strokeStyle: `black` });
      dot(ctx, b2, { radius: 5, strokeStyle: `black` });
    }
    ctx.stroke();
  };
  if (Array.isArray(toDraw)) {
    for (const t2 of toDraw)
      draw2(t2);
  } else {
    draw2(toDraw);
  }
};
var triangle = (ctx, toDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (t2) => {
    connectedPoints(ctx, corners2(t2), { ...opts, loop: true });
    if (opts.debug) {
      pointLabels(ctx, corners2(t2), void 0, [`a`, `b`, `c`]);
    }
  };
  if (Array.isArray(toDraw)) {
    for (const t2 of toDraw) {
      draw2(t2);
    }
  } else {
    draw2(toDraw);
  }
};
var rect = (ctx, toDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const filled = opts.filled ?? (opts.fillStyle === void 0 ? false : true);
  const stroked = opts.stroked ?? (opts.strokeStyle === void 0 ? false : true);
  const draw2 = (d2) => {
    const x2 = `x` in d2 ? d2.x : 0;
    const y2 = `y` in d2 ? d2.y : 0;
    if (filled)
      ctx.fillRect(x2, y2, d2.width, d2.height);
    if (stroked ?? true)
      ctx.strokeRect(x2, y2, d2.width, d2.height);
    if (opts.debug) {
      pointLabels(ctx, corners(d2), void 0, [`NW`, `NE`, `SE`, `SW`]);
    }
  };
  if (Array.isArray(toDraw)) {
    for (const t2 of toDraw) {
      draw2(t2);
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
  const m2 = ctx.measureText(text);
  const width = widthMultiple ? roundUpToMultiple(m2.width, widthMultiple) + padding : m2.width + padding;
  return {
    width,
    height: m2.actualBoundingBoxAscent + m2.actualBoundingBoxDescent + padding + padding
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
  const blocks = lines.map((l2) => ctx.measureText(l2));
  const widths = blocks.map((tm) => tm.width);
  const heights = blocks.map(
    (tm) => tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent
  );
  const maxWidth = Math.max(...widths);
  const totalHeight = heights.reduce((accumulator, value) => accumulator + value, 0);
  let { x: x2, y: y2 } = anchor;
  if (anchor.x + maxWidth > bounds.width) {
    x2 = bounds.width - (maxWidth + anchorPadding);
  } else
    x2 -= anchorPadding;
  if (x2 < bounds.x)
    x2 = bounds.x + anchorPadding;
  if (anchor.y + totalHeight > bounds.height) {
    y2 = bounds.height - (totalHeight + anchorPadding);
  } else
    y2 -= anchorPadding;
  if (y2 < bounds.y)
    y2 = bounds.y + anchorPadding;
  for (const [index, line2] of lines.entries()) {
    ctx.fillText(line2, x2, y2);
    y2 += heights[index];
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
  const blocks = lines.map((l2) => ctx.measureText(l2));
  const heights = blocks.map(
    (tm) => tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent
  );
  const totalHeight = heights.reduce((accumulator, value) => accumulator + value, 0);
  let y2 = 0;
  if (vert === `center`)
    y2 = middleY - totalHeight / 2;
  else if (vert === `bottom`) {
    y2 = bounds.height - totalHeight;
  }
  for (const [index, line2] of lines.entries()) {
    let x2 = 0;
    if (horiz === `center`)
      x2 = middleX - blocks[index].width / 2;
    else if (horiz === `right`)
      x2 = bounds.width - blocks[index].width;
    ctx.fillText(line2, x2, y2);
    y2 += heights[index];
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
var boxUnitFromPx = (v2) => {
  return { type: `px`, value: v2 };
};
var boxRectFromPx = (x2, y2, width, height) => {
  return {
    x: boxUnitFromPx(x2),
    y: boxUnitFromPx(y2),
    width: boxUnitFromPx(width),
    height: boxUnitFromPx(height)
  };
};
var boxRectFromRectPx = (r2) => {
  return {
    x: boxUnitFromPx(r2.x),
    y: boxUnitFromPx(r2.y),
    width: boxUnitFromPx(r2.width),
    height: boxUnitFromPx(r2.height)
  };
};
var unitIsEqual = (a2, b2) => {
  if (a2.type === `px` && b2.type === `px`) {
    return a2.value === b2.value;
  }
  return false;
};
var boxRectIsEqual = (a2, b2) => {
  if (a2 === void 0 && b2 === void 0)
    return true;
  if (a2 === void 0)
    return false;
  if (b2 === void 0)
    return false;
  if (a2.x && b2.x && !unitIsEqual(a2.x, b2.x))
    return false;
  if (a2.y && b2.y && !unitIsEqual(a2.y, b2.y))
    return false;
  if (a2.width && b2.width && !unitIsEqual(a2.width, b2.width))
    return false;
  if (a2.height && b2.height && !unitIsEqual(a2.height, b2.height))
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
  resolveToPx(u2, maxValue, defaultValue) {
    if (u2 === void 0 && defaultValue !== void 0)
      return defaultValue;
    if (u2 === void 0)
      return;
    if (u2.type === void 0)
      throw new TypeError(`Expected 'type' and 'value' fields. Type is missing`);
    if (u2.value === void 0)
      throw new TypeError(`Expected 'type' and 'value' fields. Value is missing`);
    if (u2.type === `px`)
      return u2.value;
    if (u2.type === `pc`)
      return u2.value * maxValue;
    throw new Error(`Unknown unit type: ${u2.type}`);
  }
  resolveBox(box) {
    if (box === void 0)
      return void 0;
    const x2 = this.resolveToPx(box.x, this.bounds.width);
    const y2 = this.resolveToPx(box.y, this.bounds.height);
    const width = this.resolveToPx(box.width, this.bounds.width);
    const height = this.resolveToPx(box.height, this.bounds.height);
    if (!width || !height)
      throw new TypeError(`Expected width and height`);
    if (x2 === void 0 && y2 === void 0) {
      return Object.freeze({ width, height });
    } else {
      if (!x2 || !y2)
        throw new TypeError(`Expected x and y`);
      return Object.freeze({
        x: x2,
        y: y2,
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
    const s2 = this.measurements.get(id);
    if (s2 === void 0)
      return;
    if (isPlaceholder(s2.actual))
      return;
    return s2.actual;
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
    const byReference = this.children.find((c2) => c2 === box);
    const byId2 = this.children.find((c2) => c2.id === box.id);
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
    for (const c2 of this.children)
      c2.notify(message, source);
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
      for (const c2 of this.children)
        c2.setReady(ready, includeChildren);
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
  set visible(v2) {
    if (this._visible === v2)
      return;
    this._visible = v2;
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
  set desiredRegion(v2) {
    if (boxRectIsEqual(v2, this._desiredRect))
      return;
    this._desiredRect = v2;
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
  measureApply(m2) {
    this._needsMeasuring = false;
    const different = this._measuredSize === void 0 ? true : !isEqualSize(m2.actual, this._measuredSize);
    if (different) {
      this._needsLayoutX = true;
    }
    this._measuredSize = { width: m2.actual.width, height: m2.actual.height };
    for (const c2 of m2.children) {
      if (c2 !== void 0)
        c2.ref.measureApply(c2);
    }
    if (different) {
      this.root.notify(`measureApplied`, this);
    }
    return different;
  }
  layoutApply(l2) {
    this._needsLayoutX = false;
    const different = this._layoutPosition === void 0 ? true : !point_exports.isEqual(l2.actual, this._layoutPosition);
    this._layoutPosition = { x: l2.actual.x, y: l2.actual.y };
    for (const c2 of l2.children) {
      if (c2 !== void 0)
        c2.ref.layoutApply(c2);
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
  debugLog(m2) {
    if (!this.debugLayout)
      return;
    console.log(this.id, m2);
  }
  layoutStart(measureState, layoutState, force, parent) {
    const m2 = {
      ref: this,
      actual: point_exports.Empty,
      children: []
    };
    layoutState.layouts.set(this.id, m2);
    const currentPosition = this.layoutSelf(measureState, layoutState, parent);
    this.root.notify(`laidout`, this);
    if (currentPosition === void 0)
      return;
    m2.actual = currentPosition;
    m2.children = this.children.map((c2) => c2.layoutStart(measureState, layoutState, force, m2));
    if (arrays_exports.withoutUndefined(m2.children).length < this.children.length) {
      return void 0;
    }
    return m2;
  }
  layoutSelf(measureState, layoutState, _parent) {
    const box = layoutState.resolveBox(this._desiredRect);
    const x2 = box === void 0 ? 0 : `x` in box ? box.x : 0;
    const y2 = box === void 0 ? 0 : `y` in box ? box.y : 0;
    if (x2 === void 0)
      debugger;
    if (y2 === void 0)
      debugger;
    return { x: x2, y: y2 };
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
    const m2 = {
      ref: this,
      // So far no known measurement
      actual: placeholder,
      children: []
    };
    opts.measurements.set(this.id, m2);
    if (!this._visible && !this.takesSpaceWhenInvisible) {
      m2.actual = emptyPositioned;
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
      m2.actual = currentMeasurement;
    }
    m2.children = this.children.map((c2) => c2.measureStart(opts, force, m2));
    if (arrays_exports.withoutUndefined(m2.children).length < this.children.length) {
      return void 0;
    }
    return m2;
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
        const m2 = this.measureStart(measureState, force);
        if (m2 !== void 0) {
          this.measureApply(m2);
          if (!this._ready)
            return;
          measureApplied = true;
        }
      }
      if (!measureApplied)
        this.debugLog(`Ran out of measurement attempts`);
    }
    if (this._needsLayoutX || force) {
      const p2 = this.layoutStart(measureState, layoutState, force);
      if (p2 === void 0) {
        this.debugLog(`Warning: could not layout`);
      } else {
        this.layoutApply(p2);
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
    element.addEventListener(`pointermove`, (event) => {
      const p2 = { x: event.offsetX, y: event.offsetY };
      this.notifyPointerMove(p2);
    });
    element.addEventListener(`pointerleave`, (_event) => {
      this.notifyPointerLeave();
    });
    element.addEventListener(`click`, (event) => {
      const p2 = { x: event.offsetX, y: event.offsetY };
      this.notifyClick(p2);
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
  notifyClick(p2) {
    if (isPlaceholder(this.canvasRegion))
      return;
    if (intersectsPoint(this.canvasRegion, p2)) {
      const pp = point_exports.subtract(p2, this.canvasRegion.x, this.canvasRegion.y);
      this.onClick(pp);
      for (const c2 of this.children)
        c2.notifyClick(pp);
    }
  }
  /**
   * Pointer has left
   * 1. Pass notification to all children via `notifyPointerLeave`
   */
  notifyPointerLeave() {
    this.onPointerLeave();
    for (const c2 of this.children)
      c2.notifyPointerLeave();
  }
  /**
   * Pointer has moved
   * 1. If it's within range `onPointerMove` is called, and pass on to all children via `notifyPointerMove`
   * @param p 
   * @returns 
   */
  notifyPointerMove(p2) {
    if (isPlaceholder(this.canvasRegion))
      return;
    if (intersectsPoint(this.canvasRegion, p2)) {
      const pp = point_exports.subtract(p2, this.canvasRegion.x, this.canvasRegion.y);
      this.onPointerMove(pp);
      for (const c2 of this.children)
        c2.notifyPointerMove(pp);
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
  measureApply(m2) {
    const different = super.measureApply(m2);
    if (different)
      this.canvasRegion = placeholderPositioned;
    return different;
  }
  layoutApply(l2) {
    const different = super.layoutApply(l2);
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
      const v2 = this.canvasRegion;
      ctx.translate(v2.x, v2.y);
      if (this.debugLayout) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = `hsl(${this.debugHue}, 100%, 50%)`;
        ctx.strokeRect(0, 0, v2.width, v2.height);
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fillText(this.id, 10, 10, v2.width);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(v2.width, v2.height);
        ctx.stroke();
      }
      this.drawSelf(ctx);
      this._needsDrawing = false;
      ctx.restore();
    }
    for (const c2 of this.children) {
      c2.draw(ctx, force);
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
var windowResize = (elapsed) => Ops.debounce({ elapsed: elapsed ?? 100 })(fromEvent(window, `resize`));
var themeChange = () => {
  const m2 = observable((stream2) => {
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
  return m2;
};
var resizeObservable = (elem, timeout2) => {
  if (elem === null) {
    throw new Error(`elem parameter is null. Expected element to observe`);
  }
  if (elem === void 0) {
    throw new Error(`elem parameter is undefined. Expected element to observe`);
  }
  const m2 = observable((stream2) => {
    const ro = new ResizeObserver((entries) => {
      stream2.set(entries);
    });
    ro.observe(elem);
    return () => {
      ro.unobserve(elem);
    };
  });
  return Ops.debounce({ elapsed: timeout2 ?? 100 })(m2);
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
      const entry = entries.find((v2) => v2.target === parent);
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
  const r2 = windowResize();
  r2.value(update);
  update();
  return r2;
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
      const d2 = [...this.data.slice(pts), value];
      super.set(d2);
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
  formatValue(v2) {
    return v2.toFixed(this.precision);
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
    const r2 = this.visualRange;
    if (r2.changed) {
      this.plot.notify(`range-change`, this.plot.plotArea);
    }
    if (r2.min == r2.max) {
      return 0.5;
    }
    return scale(value, r2.min, r2.max);
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
  onPointerMove(p2) {
    this.pointer = p2;
    this.plot.legend.drawingInvalidated(`PlotArea.onPointerMove`);
  }
  measurePreflight() {
    this.updateTooltip();
  }
  updateTooltip() {
    const p2 = this.pointer;
    if (p2 === void 0)
      return;
    for (const series of this.plot.series.values()) {
      if (p2 === void 0) {
        series.tooltip = void 0;
        return;
      }
      if (series.dataHitPoint === void 0)
        return;
      const v2 = series.dataHitPoint(p2);
      if (v2[0] === void 0)
        return;
      if (v2[1] > this.pointerDistanceThreshold)
        return;
      series.tooltip = series.formatValue(v2[0].value);
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
        const d2 = [...arraySeries.data];
        this.drawDataSet(series, d2, ctx);
      } else
        console.warn(`Unknown data source type ${series.source.type}`);
    }
  }
  computeY(series, rawValue) {
    const s2 = series.scaleValue(rawValue);
    return flip(s2) * this.canvasRegion.height + this.paddingPx;
  }
  drawDataSet(series, d2, ctx) {
    const padding = this.paddingPx + series.width;
    const v2 = subtract(this.canvasRegion, padding * 2, padding * 3.5);
    const pxPerPt = v2.width / d2.length;
    series.lastPxPerPt = pxPerPt;
    let x2 = padding;
    ctx.strokeStyle = series.colour;
    ctx.lineWidth = series.width;
    const shapes = [];
    series.dataHitPoint = (pt) => {
      const distances = shapes.map((v3) => distanceToExterior(pt, v3));
      const index = minIndex(...distances);
      const closest = shapes[index];
      if (closest === void 0)
        [void 0, 0];
      return [closest, distances[index]];
    };
    if (series.drawingStyle === `line`) {
      let y2 = 0;
      ctx.beginPath();
      for (let index = 0; index < d2.length; index++) {
        const scaled = clamp(series.scaleValue(d2[index]));
        y2 = padding + this.paddingPx + v2.height * flip(scaled);
        shapes.push({ x: x2, y: y2, index, value: d2[index] });
        if (index == 0)
          ctx.moveTo(x2 + pxPerPt / 2, y2);
        else
          ctx.lineTo(x2 + pxPerPt / 2, y2);
        if (y2 > this.canvasRegion.height)
          console.warn(`${y2} h: ${this.canvasRegion.height}`);
        x2 += pxPerPt;
      }
      ctx.strokeStyle = series.colour;
      ctx.stroke();
    } else if (series.drawingStyle === `dotted`) {
      let y2 = 0;
      ctx.fillStyle = series.colour;
      for (let index = 0; index < d2.length; index++) {
        const scaled = series.scaleValue(d2[index]);
        y2 = padding + v2.height * flip(scaled);
        ctx.beginPath();
        ctx.arc(x2 + pxPerPt / 2, y2, series.width, 0, this.piPi);
        ctx.fill();
        shapes.push({ radius: series.width, x: x2, y: y2, index, value: d2[index] });
        x2 += pxPerPt;
      }
    } else if (series.drawingStyle === `bar`) {
      ctx.fillStyle = series.colour;
      const interBarPadding = Math.ceil(pxPerPt * 0.1);
      for (let index = 0; index < d2.length; index++) {
        const scaled = series.scaleValue(d2[index]);
        const h2 = v2.height * scaled;
        const r2 = {
          x: x2 + interBarPadding,
          y: v2.height - h2 + padding,
          width: pxPerPt - interBarPadding,
          height: h2,
          index,
          value: d2[index]
        };
        ctx.fillRect(r2.x, r2.y, r2.width, r2.height);
        shapes.push(r2);
        x2 += pxPerPt;
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
    let x2 = padding;
    let y2 = padding;
    const availableWidth = opts.bounds.width - yAxisWidth - padding;
    let rowHeight = 0;
    for (const s2 of series) {
      const startX = x2;
      x2 += sample.width + padding;
      ctx.textBaseline = `middle`;
      const text = textRect(ctx, s2.name, padding, widthSnapping);
      x2 += textWidth(ctx, s2.name, padding, widthSnapping);
      if (s2.tooltip) {
        x2 += textWidth(ctx, s2.tooltip, padding, widthSnapping);
      }
      const r2 = { width: 10, height: 10, x: startX, y: y2 };
      this.labelMeasurements.set(s2.name, r2);
      rowHeight = Math.min(sample.height + padding + padding, text.height + padding + padding);
      x2 += padding;
      if (x2 > availableWidth) {
        x2 = padding;
        y2 += rowHeight;
      }
    }
    return {
      width: availableWidth,
      height: y2 + rowHeight
    };
  }
  drawSelf(ctx) {
    const series = this.plot.seriesArray();
    const sample = this.sampleSize;
    const padding = this.padding;
    this.debugLog(`drawSelf`);
    ctx.clearRect(0, 0, this.canvasRegion.width, this.canvasRegion.height);
    for (const s2 of series) {
      const r2 = this.labelMeasurements.get(s2.name);
      if (r2 === void 0)
        continue;
      let x2 = r2.x;
      ctx.fillStyle = s2.colour;
      ctx.fillRect(x2, r2.y, sample.width, sample.height);
      x2 += sample.width + padding;
      ctx.textBaseline = `middle`;
      ctx.fillStyle = this.plot.legendTextColour;
      ctx.fillText(s2.name, x2, r2.y + sample.height / 2);
      if (s2.tooltip) {
        ctx.fillStyle = this.plot.legendTextColour;
        ctx.fillText(s2.tooltip, r2.x, r2.y + sample.height / 2);
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
    const v2 = this.canvasRegion;
    const strokeWidth = plot2.axisStrokeWidth;
    const colour = this.colour ?? plot2.axisStrokeColour;
    ctx.strokeStyle = colour;
    ctx.clearRect(0, 0, v2.width, v2.height);
    ctx.beginPath();
    ctx.lineWidth = strokeWidth;
    ctx.moveTo(0, strokeWidth / 2);
    ctx.lineTo(v2.width, strokeWidth / 2);
    ctx.stroke();
  }
  measureSelf(opts, _parent) {
    const plot2 = this.plot;
    const padding = this.paddingPx;
    const yAxis = opts.measurements.get(`AxisY`);
    const yAxisWidth = yAxis?.actual.width ?? 0;
    const heightOfText = 0;
    const h2 = plot2.axisStrokeWidth + heightOfText + padding + padding;
    return {
      width: opts.bounds.width - yAxisWidth - padding,
      height: h2
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
var isRangeEqual = (a2, b2) => a2.max === b2.max && a2.min === b2.min;
var isRangeSinglePoint = (a2) => a2.max === a2.min;
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
      const r2 = series.visualRange;
      this._maxDigits = Math.ceil(r2.max).toString().length + series.precision + 1;
      const textToMeasure = `9`.repeat(this._maxDigits);
      width += textWidth(copts.ctx, textToMeasure, paddingPx * 2);
    }
    const w2 = copts.resolveToPx(this.desiredRegion?.width, width, width);
    return {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      width: w2,
      height: copts.bounds.height
    };
  }
  layoutSelf(_measureState, _layoutState, _parent) {
    return { x: 0, y: 0 };
  }
  drawSelf(ctx) {
    const s2 = this.getSeries();
    if (s2 === void 0) {
      if (this.seriesToShow === void 0)
        return;
      console.warn(`Plot AxisY series '${this.seriesToShow}' is missing.`);
    } else {
      this.seriesAxis(s2, ctx);
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
    const v2 = this.canvasRegion;
    const paddingPx = this.paddingPx;
    const r2 = series.visualRange;
    const strokeWidth = plot2.axisStrokeWidth;
    const colour = this.colour ?? plot2.axisStrokeColour;
    ctx.strokeStyle = colour;
    ctx.fillStyle = colour;
    if (Number.isNaN(r2.min) && Number.isNaN(r2.max))
      return;
    this.lastRange = r2;
    ctx.clearRect(0, 0, v2.width, v2.height);
    ctx.beginPath();
    ctx.lineWidth = strokeWidth;
    const lineX = v2.width - strokeWidth / 2;
    ctx.moveTo(lineX, plotArea.paddingPx + strokeWidth);
    ctx.lineTo(lineX, plotArea.canvasRegion.height + paddingPx + strokeWidth + strokeWidth);
    ctx.stroke();
    ctx.textBaseline = `top`;
    const fromRight = v2.width - paddingPx * 4;
    ctx.fillStyle = plot2.axisTextColour;
    if (isRangeSinglePoint(r2)) {
      this.debugLog(`rangeSinglePoint`);
      drawText(ctx, series.formatValue(r2.max), (size) => [
        fromRight - size.width,
        plotArea.computeY(series, r2.max) - paddingPx * 4
      ]);
    } else {
      drawText(ctx, series.formatValue(r2.max), (size) => [
        fromRight - size.width,
        plotArea.computeY(series, r2.max) + strokeWidth / 2
      ]);
      drawText(ctx, series.formatValue(r2.min), (size) => [
        fromRight - size.width,
        plotArea.computeY(series, r2.min) - 5
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
      parentSizeCanvas(element, (event) => {
        this.drawingInvalidated(`resize`);
        this.layoutInvalidated(`resize`);
        this.update(event.ctx, true);
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
  set frozen(v2) {
    this._frozen = v2;
    if (v2) {
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
  plot(o2) {
    const paths2 = getPaths(o2, true);
    let seriesCreated = false;
    for (const p2 of paths2) {
      let s2 = this.series.get(p2);
      if (s2 === void 0) {
        s2 = this.createSeries(p2, `stream`);
        s2.drawingStyle = `line`;
        seriesCreated = true;
      }
      s2.add(getField(o2, p2));
    }
    if (seriesCreated)
      this.legend.layoutInvalidated(`new series`);
    this.update();
  }
  createSeriesFromObject(o2, prefix = ``) {
    const keys = Object.keys(o2);
    const create3 = (key) => {
      const v2 = o2[key];
      if (typeof v2 === `object`) {
        return this.createSeriesFromObject(v2, `${prefix}${key}.`);
      } else if (typeof v2 === `number`) {
        return [this.createSeries(key, `stream`)];
      } else {
        return [];
      }
    };
    return keys.flatMap((k2) => create3(k2));
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
    const s2 = new Series(name, type, this, opts);
    this.series.set(name, s2);
    this.setReady(true, true);
    this.plotArea.drawingInvalidated(`Plot.createSeries`);
    return s2;
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
    const c2 = this.#store.get(key);
    if (c2 !== void 0)
      return c2;
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
    const c2 = this.get(key, fallback);
    this.add(key, c2);
    return c2;
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
  const a2 = el2.getAttribute(name);
  if (a2 === null)
    return defaultValue;
  return Number.parseInt(a2);
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
  const percentageFormat = (v2) => Math.round(v2 * 100) + `%`;
  const fixedFormat = (v2) => v2.toFixed(labelPrecision);
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
  return (x2, y2) => {
    x2 = clamp3(x2);
    y2 = clamp3(y2);
    renderBackground(ctx, width, height);
    ctx.fillStyle = labelColour;
    ctx.textBaseline = `top`;
    ctx.save();
    ctx.translate(midX, midY);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText((labels[1] + ` ` + valueFormat(y2)).trim(), -midX + pad, 1);
    ctx.restore();
    ctx.fillText((labels[0] + ` ` + valueFormat(x2)).trim(), pad, midX + 2);
    ctx.strokeStyle = axisColour;
    ctx.lineWidth = axisWidth;
    ctx.beginPath();
    ctx.moveTo(pad, midY);
    ctx.lineTo(width - pad, midY);
    ctx.moveTo(midX, pad);
    ctx.lineTo(midX, height - pad);
    ctx.stroke();
    ctx.closePath();
    const yy = (height - pad - pad) / 2 * -y2;
    const xx = (width - pad - pad) / 2 * x2;
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
  for (const s2 of buffer.keys()) {
    const series = [...buffer.get(s2)];
    if (series.length === 0)
      break;
    let { min, max } = minMaxAvg(series);
    let range = max - min;
    let colour;
    if (seriesColours !== void 0) {
      colour = seriesColours[s2];
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
      name: s2,
      colour
    });
  }
  return scales;
};
var add = (buffer, value, series = ``) => {
  buffer.addKeyedValues(series, value);
};
var drawValue = (index, buffer, drawing) => {
  const c2 = {
    ...drawing,
    translucentPlot: true,
    leadingEdgeDot: false
  };
  draw(buffer, c2);
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
var scaleWithFixedRange = (buffer, range, drawing) => calcScale(buffer, drawing, drawing.seriesColours).map((s2) => ({
  ...s2,
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
    for (const s2 of series) {
      if (yAxis.allowedSeries !== void 0 && !yAxis.allowedSeries.includes(s2.name))
        continue;
      drawYSeriesScale(s2, axisSize, drawing);
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
  for (const s2 of series) {
    const data = buffer.getSource(s2.name);
    if (data === void 0)
      continue;
    let leadingEdgeIndex = buffer.typeName === `circular` ? data.pointer - 1 : data.length - 1;
    if (drawing.highlightIndex !== void 0)
      leadingEdgeIndex = drawing.highlightIndex;
    ctx.save();
    ctx.translate(0, margin + margin);
    drawSeriesData(s2, data, plotSize, plotDrawing, leadingEdgeIndex);
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
  const { ctx, y: y2, digitsPrecision, margin } = drawing;
  const { height } = plotSize;
  if (drawing.debug) {
    ctx.strokeStyle = `purple`;
    ctx.strokeRect(0, 0, y2.textSize, height + margin);
  }
  ctx.fillStyle = series.colour.length > 0 ? series.colour : `white`;
  if (y2.colour)
    ctx.fillStyle = y2.colour;
  const min = y2.labelRange ? y2.labelRange[0] : series.min;
  const max = y2.labelRange ? y2.labelRange[1] : series.max;
  const range = y2.labelRange ? max - min : series.range;
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
  ctx.translate(y2.textSize + margin, 0);
};
var drawYLine = (plotSize, series, drawing) => {
  if (series === void 0)
    throw new Error(`series undefined`);
  const { ctx, y: y2 } = drawing;
  const { height } = plotSize;
  const min = y2.labelRange ? y2.labelRange[0] : series.min;
  const max = y2.labelRange ? y2.labelRange[1] : series.max;
  const minPos = calcYForValue(min, series, height);
  const maxPos = calcYForValue(max, series, height);
  ctx.translate(y2.lineWidth, 0);
  ctx.lineWidth = y2.lineWidth;
  ctx.beginPath();
  ctx.moveTo(0, minPos);
  ctx.lineTo(0, maxPos);
  ctx.strokeStyle = series.colour;
  if (y2.colour)
    ctx.strokeStyle = y2.colour;
  ctx.stroke();
  ctx.translate(y2.lineWidth, 0);
};
var drawLegend = (series, drawing, size) => {
  const { ctx } = drawing;
  const lineSampleWidth = 10;
  let x2 = 0;
  const lineY = drawing.margin * 3;
  const textY = drawing.margin;
  ctx.lineWidth = drawing.lineWidth;
  for (const s2 of series) {
    ctx.moveTo(x2, lineY);
    ctx.strokeStyle = s2.colour;
    ctx.lineTo(x2 + lineSampleWidth, lineY);
    ctx.stroke();
    x2 += lineSampleWidth + drawing.margin;
    let label = s2.name;
    if (s2.lastValue)
      label += ` ` + s2.lastValue.toFixed(drawing.digitsPrecision);
    const labelSize = ctx.measureText(label);
    ctx.fillStyle = s2.colour;
    ctx.fillText(label, x2, textY);
    x2 += labelSize.width;
  }
};
var drawXAxis = (width, yPos, drawing) => {
  const { ctx, x: x2, y: y2 } = drawing;
  if (!x2.showLine)
    return;
  if (x2.colour)
    ctx.strokeStyle = x2.colour;
  ctx.lineWidth = x2.lineWidth;
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
  let x2 = 0;
  let leadingEdge;
  if (drawing.debug) {
    ctx.strokeStyle = `green`;
    ctx.strokeRect(0, 0, plotSize.width, plotSize.height);
  }
  const colourTransform = (c2) => {
    if (translucentPlot)
      return Colour_exports.opacity(c2, 0.2);
    return c2;
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
    const y2 = calcYForValue(values[index], series, height) - 1;
    if (style === `dots`) {
      ctx.beginPath();
      ctx.arc(x2, y2, lineWidth, 0, piPi2);
      ctx.fill();
    } else if (style === `none`) {
    } else {
      if (index == 0)
        ctx.moveTo(x2, y2);
      ctx.lineTo(x2, y2);
    }
    if (index === leadingEdgeIndex) {
      leadingEdge = { x: x2, y: y2 };
      series.lastValue = values[index];
    }
    x2 += dataXScale;
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
var calcYForValue = (v2, series, height) => (1 - (v2 - series.min) / series.range) * height;
var calcSizing = (margin, x2, y2, showLegend) => {
  let fromLeft = margin;
  if (y2.showLabels)
    fromLeft += y2.textSize;
  if (y2.showLine)
    fromLeft += y2.lineWidth;
  if (y2.showLabels || y2.showLine)
    fromLeft += margin + margin;
  const fromRight = margin;
  const fromTop = margin + margin;
  let fromBottom = margin + margin;
  fromBottom += x2.showLabels ? x2.textSize : margin;
  if (x2.showLine)
    fromBottom += x2.lineWidth;
  if (x2.showLabels || x2.showLine)
    fromBottom += margin;
  if (showLegend)
    fromBottom += x2.textSize;
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
  const onPointerMove = (event) => {
    pointer.x = event.offsetX;
    pointer.y = event.offsetY;
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
      return (a2, b2) => {
        const pt = getPointParameter(a2, b2);
        return Object.freeze({
          x: pt.x / window.innerWidth,
          y: pt.y / window.innerHeight
        });
      };
    }
    case `screen`: {
      return (a2, b2) => {
        const pt = getPointParameter(a2, b2);
        return Object.freeze({
          x: pt.x / screen.width,
          y: pt.y / screen.height
        });
      };
    }
    case `document`: {
      return (a2, b2) => {
        const pt = getPointParameter(a2, b2);
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
    const s2 = pointScaler(targetSpace);
    return () => s2(vpToSpace(cardinal(el2.getBoundingClientRect(), anchor)));
  } else {
    return () => vpToSpace(cardinal(el2.getBoundingClientRect(), anchor));
  }
};
var cardinalPosition = (domQueryOrEl, anchor = `nw`) => {
  const el2 = resolveEl(domQueryOrEl);
  return cardinal(el2.getBoundingClientRect(), anchor);
};
var positionRelative = (domQueryOrEl, target = `viewport`) => {
  const f2 = positionFn(domQueryOrEl, { relative: true, target });
  return f2();
};
var viewportToSpace = (targetSpace = `viewport`) => {
  switch (targetSpace) {
    case `screen`: {
      return (a2, b2) => {
        const pt = getPointParameter(a2, b2);
        return Object.freeze({
          x: pt.x + window.screenX,
          y: pt.y + window.screenY
        });
      };
    }
    case `document`: {
      return (a2, b2) => {
        const pt = getPointParameter(a2, b2);
        return Object.freeze({
          x: pt.x + window.scrollX,
          y: pt.y + window.scrollY
        });
      };
    }
    case `viewport`: {
      return (a2, b2) => {
        const pt = getPointParameter(a2, b2);
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
  let c2 = parent.lastElementChild;
  while (c2) {
    c2.remove();
    c2 = parent.lastElementChild;
  }
};
var copyToClipboard = (object) => {
  const p2 = new Promise((resolve2, reject) => {
    const string_ = import_json5.default.stringify(object);
    navigator.clipboard.writeText(JSON.stringify(string_)).then(
      () => {
        resolve2(true);
      },
      (error) => {
        console.warn(`Could not copy to clipboard`);
        console.log(string_);
        reject(new Error(error));
      }
    );
  });
  return p2;
};
var insertSorted = (parent, element) => {
  const elSort = element.getAttribute(`data-sort`) ?? ``;
  let elAfter;
  let elBefore;
  for (const c2 of parent.children) {
    const sort = c2.getAttribute(`data-sort`) ?? ``;
    if (elSort >= sort)
      elAfter = c2;
    if (elSort <= sort)
      elBefore = c2;
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
  for (const p2 of prune)
    p2.remove();
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
  fromObject: () => fromObject2
});
var import_json52 = __toESM(require_dist(), 1);
var toHtmlSimple = (v2, options) => {
  if (v2 === null)
    return `(null)`;
  if (v2 === void 0)
    return `(undefined)`;
  if (typeof v2 === `boolean`)
    return v2 ? `true` : `false`;
  if (typeof v2 === `string`)
    return `"${v2}"`;
  if (typeof v2 === `number`) {
    let vAsNumber = v2;
    if (options.roundNumbers !== void 0)
      vAsNumber = round(options.roundNumbers, v2);
    if (options.precision !== void 0)
      return vAsNumber.toFixed(options.precision);
    return vAsNumber.toString();
  }
  if (typeof v2 === `object`)
    return toTableSimple(v2, options);
  return import_json52.default.stringify(v2);
};
var toTableSimple = (v2, options) => {
  let html2 = `<div style="display:grid; grid-template-columns: repeat(2, 1fr)">`;
  for (const entry of Object.entries(v2)) {
    const value = toHtmlSimple(entry[1], options);
    html2 += `<div class="label" style="display:table-cell">${entry[0]}</div>
      <div class="data" style="display:table-cell">${value}</div>`;
  }
  html2 += `</div>`;
  return html2;
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
      let t2 = parent.querySelector(`#${tKey}`);
      if (t2 === null) {
        t2 = document.createElement(`table`);
        if (!t2)
          throw new Error(`Could not create table element`);
        t2.id = tKey;
        parent.append(t2);
      }
      updateElement(t2, value);
    }
    const tables = Array.from(parent.querySelectorAll(`table`));
    for (const t2 of tables) {
      if (!seenTables.has(t2.id)) {
        t2.remove();
      }
    }
  };
  if (data)
    update(data);
  return { update, remove: remove2 };
};
var updateElement = (t2, data, opts = {}) => {
  const precision = opts.precision ?? 2;
  const idPrefix = opts.idPrefix ?? ``;
  const objectsAsTables = opts.objectsAsTables ?? false;
  if (data === void 0) {
    t2.innerHTML = ``;
    return;
  }
  const seenRows = /* @__PURE__ */ new Set();
  for (const [key, value] of Object.entries(data)) {
    const domKey = `${idPrefix}-row-${key}`;
    seenRows.add(domKey);
    let rowEl = t2.querySelector(`tr[data-key='${domKey}']`);
    if (rowEl === null) {
      rowEl = document.createElement(`tr`);
      t2.append(rowEl);
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
  const rows = Array.from(t2.querySelectorAll(`tr`));
  for (const r2 of rows) {
    const key = r2.getAttribute(`data-key`);
    if (!seenRows.has(key)) {
      r2.remove();
    }
  }
};
var fromObject2 = (parentOrQuery, data, opts) => {
  const parent = resolveEl(parentOrQuery);
  const idPrefix = opts?.idPrefix ?? Math.floor(Math.random() * 1e3).toString();
  let t2 = document.createElement(`table`);
  parent.append(t2);
  const remove2 = () => {
    if (!t2)
      return false;
    t2.remove();
    t2 = void 0;
    return true;
  };
  if (data)
    updateElement(t2, data, opts);
  const update = (d2) => {
    if (!t2)
      throw new Error(`Table disposed`);
    updateElement(t2, d2, { ...opts, idPrefix });
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
    this.dataTable = fromObject2(container, void 0, {
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
  const r2 = windowResize();
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
  r2.value(update);
  update();
  return r2;
};
var parentSize = (domQueryOrEl, onResized, timeoutMs = 100) => {
  const el2 = resolveEl(domQueryOrEl);
  const parent = el2.parentElement;
  if (parent === null)
    throw new Error(`Element has no parent`);
  const ro = resizeObservable(parent, timeoutMs).value(
    (entries) => {
      const entry = entries.find((v2) => v2.target === parent);
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
  const lostPointer = (event) => {
    const id = event.pointerId.toString();
    tracker.delete(id);
    currentHue = hue;
    svg.querySelector(`#pv-start-${id}`)?.remove();
    for (let index = 0; index < pointerCount + 10; index++) {
      svg.querySelector(`#pv-progress-${id}-${index}`)?.remove();
    }
    pointerCount = 0;
  };
  const trackPointer = async (event) => {
    const id = event.pointerId.toString();
    const pt = { x: event.x, y: event.y };
    const type = event.pointerType;
    if (event.type === `pointermove` && !tracker.has(id)) {
      return;
    }
    const info = await tracker.seen(event.pointerId.toString(), { x: event.clientX, y: event.clientY });
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
  el2.addEventListener(`contextmenu`, (event) => {
    event.preventDefault();
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
  const styleButton = (b2) => {
    b2.style.padding = `0.3em`;
    b2.style.marginTop = `1em`;
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
  window.addEventListener(`unhandledrejection`, (event) => {
    console.log(event.reason);
    if (enabled) {
      show(event.reason);
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
  const onElementClick = (event) => {
    const selected = elem.classList.contains(`drag-sel`);
    if (selected) {
      elem.classList.remove(`drag-sel`);
    } else {
      elem.classList.add(`drag-sel`);
    }
    event.stopPropagation();
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
  const onDragCancel = (event, reason = `pointercancel`) => {
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
  elem.addEventListener(`pointerdown`, (event) => {
    const selected = elem.classList.contains(`drag-sel`);
    if (!selected)
      return;
    initial = { x: event.x, y: event.y };
    const s2 = typeof listener.start === `undefined` ? { allow: true, token } : listener.start();
    if (!s2.allow)
      return;
    token = s2.token;
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
  window.onerror = (event, source, lineno, _colno, error) => {
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
    let v2 = style.getPropertyValue(`--${variable}`);
    if (v2 === null || v2.length === 0) {
      if (opt.defaultValue === void 0) {
        continue;
      } else {
        v2 = opt.defaultValue;
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
        el2.setAttribute(opt.attribute, v2);
      }
    } else if (opt.field) {
      for (const el2 of els) {
        el2[opt.field] = v2;
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
      const c2 = this.el.getContext(`2d`);
      if (c2 === null)
        throw new Error(`Could not create drawing context`);
      this.#ctx = c2;
      c2.setTransform(1, 0, 0, 1, 0, 0);
      c2.scale(ratio, ratio);
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
    this.el.style.width = logicalSize.width + `px`;
    this.el.style.height = logicalSize.height + `px`;
    this.#getContext(true);
    if (this.opts.clearOnResize) {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
    this.#currentSize = logicalSize;
    const r2 = this.opts.onResize;
    if (r2) {
      setTimeout(() => {
        r2(this.size);
      }, 100);
    }
    this.fireEvent(`resize`, { size: this.#currentSize });
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
        const r2 = windowResize();
        r2.value(() => {
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
        const r2 = windowResize();
        r2.value(() => {
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
    const d2 = this.opts.draw;
    if (d2) {
      const sched = () => {
        d2(this.ctx, this.#currentSize);
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
  const isUnique = ensureUnique ? trackUniqueInstances() : (_2) => true;
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

// src/rx/FromObject.ts
function fromObject(initialValue, options = {}) {
  const eq = options.eq ?? Immutable_exports.isEqualContextString;
  const setEvent = initStream();
  const diffEvent = initStream();
  let value = initialValue;
  let disposed = false;
  const set = (v2) => {
    if (value !== void 0) {
      const diff = Immutable_exports.compareData(value, v2, { ...options, includeMissingFromA: true });
      if (diff.length === 0)
        return;
      diffEvent.set(diff);
    }
    value = v2;
    setEvent.set(v2);
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
    diff = diff.map((d2) => {
      if (d2.path.length > 0)
        return { ...d2, path: path + `.` + d2.path };
      return { ...d2, path };
    });
    const o2 = Immutable_exports.updateByPath(value, path, valueForField, true);
    value = o2;
    diffEvent.set(diff);
    setEvent.set(o2);
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

// src/rx/FromProxy.ts
var fromProxy = (target) => {
  const rx = fromObject(target);
  const proxy = new Proxy(target, {
    set(target2, p2, newValue, _receiver) {
      const isArray = Array.isArray(target2);
      if (isArray && p2 === `length`)
        return true;
      if (typeof p2 === `string`) {
        rx.updateField(p2, newValue);
      }
      if (isArray && typeof p2 === `string`) {
        const pAsNumber = Number.parseInt(p2);
        if (!Number.isNaN(pAsNumber)) {
          target2[pAsNumber] = newValue;
          return true;
        }
      }
      target2[p2] = newValue;
      return true;
    }
  });
  return { proxy, rx };
};
var fromProxySymbol = (target) => {
  const { proxy, rx } = fromProxy(target);
  const p2 = proxy;
  p2[symbol] = rx;
  return p2;
};

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
    const b2 = beforeMatch(source, delimiter, { ifNoMatch: `original`, fromEnd: true });
    if (b2 === source)
      break;
    source = b2;
  }
}

// src/rx/Dom.ts
function fromDomQuery(query2) {
  const elements2 = [...document.querySelectorAll(query2)];
  return fromObject(elements2);
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
  let b2 = [];
  if (binds.length === 0) {
    b2.push({ elField: `textContent` });
  } else {
    b2 = [...binds];
  }
  const bb = b2.map((bind2) => {
    if (`element` in bind2)
      return bind2;
    return { ...bind2, element: el2 };
  });
  return bind(source, ...bb);
};
var resolveBindUpdater = (bind2, element) => {
  const b2 = resolveBindUpdaterBase(bind2);
  return (value) => {
    b2(value, element);
  };
};
var resolveBindUpdaterBase = (bind2) => {
  if (bind2.elField !== void 0 || bind2.cssVariable === void 0 && bind2.attribName === void 0 && bind2.cssProperty === void 0 && bind2.textContent === void 0 && bind2.htmlContent === void 0) {
    const field2 = bind2.elField ?? `textContent`;
    return (v2, element) => {
      element[field2] = v2;
    };
  }
  if (bind2.attribName !== void 0) {
    const attrib = bind2.attribName;
    return (v2, element) => {
      element.setAttribute(attrib, v2);
    };
  }
  if (bind2.textContent) {
    return (v2, element) => {
      element.textContent = v2;
    };
  }
  if (bind2.htmlContent) {
    return (v2, element) => {
      element.innerHTML = v2;
    };
  }
  if (bind2.cssVariable !== void 0) {
    let css = bind2.cssVariable;
    if (!css.startsWith(`--`))
      css = `--` + css;
    return (v2, element) => {
      element.style.setProperty(css, v2);
    };
  }
  if (bind2.cssProperty !== void 0) {
    return (v2, element) => {
      element.style[bind2.cssProperty] = v2;
    };
  }
  return (_2, _element) => {
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
        const v2 = bind2.sourceField ? value[bind2.sourceField] : value;
        if (typeof v2 === `object`) {
          if (bind2.sourceField) {
            bind2.update(JSON.stringify(v2));
          } else {
            bind2.update(JSON.stringify(v2));
          }
        } else
          bind2.update(v2);
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
    for (const p2 of stringSegmentsWholeToFirst(path)) {
      if (binds.has(p2)) {
        yield binds.get(p2);
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
    for (const b2 of ancestorBinds(rootedPath)) {
      if (b2?.nestChildren) {
        const absoluteRoot = beforeMatch(path, `.`);
        const findBy = b2.path.replace(`_root`, absoluteRoot);
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
    let d2 = queue.dequeue();
    const seenPaths = /* @__PURE__ */ new Set();
    while (d2 !== void 0) {
      const path = d2.path;
      if (d2.previous === void 0) {
        console.log(`Rx.Dom.elements.changes no previous. path: ${path}`);
        create3(path, d2.value);
        const subdata = getPathsAndData(d2.value, Number.MAX_SAFE_INTEGER, path);
        console.log(subdata);
        for (const dd of subdata) {
          if (!seenPaths.has(dd.path)) {
            queue.enqueue(dd);
            seenPaths.add(dd.path);
          }
        }
      } else if (d2.value === void 0) {
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
          create3(path, d2.value);
        } else {
          update(path, el2, d2.value);
        }
      }
      d2 = queue.dequeue();
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
  const size = fromEvent(window, `resize`, {
    lazy: `very`,
    transform: () => generateRect()
  });
  const pointer = fromEvent(window, `pointermove`, {
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

// src/rx/index.ts
function boolean(initialValue) {
  let value = initialValue;
  const events = initStream();
  const set = (v2) => {
    value = v2;
    events.set(v2);
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
function number(initialValue) {
  let value = initialValue;
  const events = initStream();
  const set = (v2) => {
    value = v2;
    events.set(v2);
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
var Ops = {
  annotate: (transformer) => opify(annotate, transformer),
  annotateElapsed: () => opify(annotateElapsed),
  cache: (opts) => {
    return opify(cache, opts);
  },
  batch: (options) => {
    return (source) => {
      return batch(source, options);
    };
  },
  debounce: (options) => {
    return (source) => {
      return debounce(source, options);
    };
  },
  filter: (predicate) => opify(filter, predicate),
  transform: (transformer) => {
    return (source) => {
      return transform(source, transformer);
    };
  },
  throttle: (options) => opify(throttle, options)
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
  const p2 = new Promise((resolve2, reject) => {
    off = rx.on((message) => {
      if (watchdog)
        clearTimeout(watchdog);
      if (messageHasValue(message)) {
        off();
        resolve2(message.value);
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
  return p2;
}

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
  opify,
  fromGenerator,
  resolveSource,
  to,
  split,
  splitLabelled,
  switcher,
  pipe,
  mergeToObject,
  mergeToArray,
  syncToObject,
  sync,
  resolve,
  field,
  filter,
  transform,
  cache,
  annotate,
  annotateElapsed,
  cloneFromFields,
  singleFromArray,
  batch,
  debounce,
  throttle,
  prepare,
  symbol,
  toArray,
  toArrayOrThrow,
  toGenerator,
  fromArray,
  fromEvent,
  wrap2 as wrap,
  x,
  lit,
  readFromArray,
  pinged,
  fromFunction,
  fromObject,
  fromProxy,
  fromProxySymbol,
  count,
  Dom_exports,
  boolean,
  number,
  manual,
  observable,
  observableWritable,
  Ops,
  run,
  takeNextValue,
  rx_exports,
  fieldResolve,
  fieldResolver,
  pull,
  push,
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
/*! Bundled license information:

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=chunk-RNK3YXOK.js.map