import {
  interpolate
} from "./chunk-YEZDB5LJ.js";
import {
  resolve,
  toHex,
  toHsl
} from "./chunk-4NG2GB4D.js";
import {
  average,
  max,
  min,
  nextWithTimeout,
  rank,
  sum,
  tally
} from "./chunk-SJ3R4FCY.js";
import {
  resolveEl,
  resolveEls
} from "./chunk-ZNCB3DZ2.js";
import {
  DispatchList,
  continuously,
  sleep,
  timeout
} from "./chunk-RNUQGND2.js";
import {
  StateMachine_exports
} from "./chunk-XONNGZY5.js";
import {
  Elapsed_exports
} from "./chunk-4LUNZR7B.js";
import {
  insertAt,
  remove
} from "./chunk-C6FK33KH.js";
import {
  shuffle
} from "./chunk-WIEQUAVY.js";
import {
  StackMutable,
  depthFirst,
  isAsyncIterable,
  isIterable,
  isPrimitive,
  map
} from "./chunk-SP37NBBE.js";
import {
  Map_exports,
  NumberMap,
  immutable
} from "./chunk-KSOSZLHF.js";
import {
  PriorityMutable
} from "./chunk-RLUQAN6Q.js";
import {
  QueueMutable
} from "./chunk-5PZ2TXZH.js";
import {
  intervalToMs
} from "./chunk-37WZU5ZM.js";
import {
  getFromKeys,
  zipKeyValue
} from "./chunk-YWGG2NOJ.js";
import {
  isInteger,
  throwResult
} from "./chunk-N37UR7MZ.js";
import {
  afterMatch,
  beforeMatch,
  wildcard
} from "./chunk-KQLC3QPI.js";
import {
  isPlainObjectOrPrimitive
} from "./chunk-QZ7DQTW7.js";
import {
  compareArrays,
  compareKeys
} from "./chunk-EHDC2PRM.js";
import {
  isEqualDefault,
  isEqualValueDefault,
  toStringDefault
} from "./chunk-SGQC7FGM.js";
import {
  getErrorMessage
} from "./chunk-4IJNRUE7.js";
import {
  __export
} from "./chunk-AFNFQUHK.js";

// src/rx/index.ts
var rx_exports = {};
__export(rx_exports, {
  Dom: () => Dom_exports,
  From: () => sources_exports,
  Ops: () => Ops,
  Sinks: () => Sinks,
  annotate: () => annotate,
  annotateWithOp: () => annotateWithOp,
  average: () => average2,
  batch: () => batch,
  chainer: () => chainer,
  cloneFromFields: () => cloneFromFields,
  combineLatestToArray: () => combineLatestToArray,
  combineLatestToObject: () => combineLatestToObject,
  computeWithPrevious: () => computeWithPrevious,
  count: () => count,
  debounce: () => debounce,
  drop: () => drop,
  elapsed: () => elapsed,
  field: () => field,
  filter: () => filter,
  hasLast: () => hasLast,
  interpolate: () => interpolate2,
  interpolateToTarget: () => interpolateToTarget,
  isPingable: () => isPingable,
  isReactive: () => isReactive,
  isTrigger: () => isTrigger,
  isTriggerFunction: () => isTriggerFunction,
  isTriggerGenerator: () => isTriggerGenerator,
  isTriggerValue: () => isTriggerValue,
  isWrapped: () => isWrapped,
  isWritable: () => isWritable,
  manual: () => manual,
  max: () => max2,
  messageHasValue: () => messageHasValue,
  messageIsDoneSignal: () => messageIsDoneSignal,
  messageIsSignal: () => messageIsSignal,
  min: () => min2,
  opify: () => opify,
  pipe: () => pipe,
  prepare: () => prepare,
  rank: () => rank2,
  resolveSource: () => resolveSource,
  resolveTriggerValue: () => resolveTriggerValue,
  run: () => run,
  runHead: () => runHead,
  setHtmlText: () => setHtmlText,
  singleFromArray: () => singleFromArray,
  split: () => split,
  splitLabelled: () => splitLabelled,
  sum: () => sum2,
  switcher: () => switcher,
  symbol: () => symbol,
  syncToArray: () => syncToArray,
  syncToObject: () => syncToObject,
  takeNextValue: () => takeNextValue,
  tally: () => tally2,
  tapOps: () => tapOps,
  tapProcess: () => tapProcess,
  tapStream: () => tapStream,
  throttle: () => throttle,
  timeoutTrigger: () => timeoutTrigger,
  to: () => to,
  toArray: () => toArray,
  toArrayOrThrow: () => toArrayOrThrow,
  toGenerator: () => toGenerator,
  transform: () => transform,
  withValue: () => withValue,
  wrap: () => wrap
});

// src/rx/Util.ts
function messageIsSignal(message) {
  if (message.value !== void 0) return false;
  if (`signal` in message && message.signal !== void 0) return true;
  return false;
}
function messageIsDoneSignal(message) {
  if (message.value !== void 0) return false;
  if (`signal` in message && message.signal === `done`) return true;
  return false;
}
function messageHasValue(v) {
  if (v.value !== void 0) return true;
  return false;
}
var isPingable = (rx) => {
  if (!isReactive(rx)) return false;
  if (`ping` in rx) {
    return true;
  }
  return false;
};
var hasLast = (rx) => {
  if (!isReactive(rx)) return false;
  if (`last` in rx) {
    const v = rx.last();
    if (v !== void 0) return true;
  }
  return false;
};
var isReactive = (rx) => {
  if (typeof rx !== `object`) return false;
  if (rx === null) return false;
  return `on` in rx && `onValue` in rx;
};
var isWritable = (rx) => {
  if (!isReactive(rx)) return false;
  if (`set` in rx) return true;
  return false;
};
var isWrapped = (v) => {
  if (typeof v !== `object`) return false;
  if (!(`source` in v)) return false;
  if (!(`annotateElapsed` in v)) return false;
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
  if (typeof t !== `object`) return false;
  if (isTriggerValue(t)) return true;
  if (isTriggerFunction(t)) return true;
  if (isTriggerGenerator(t)) return true;
  return false;
};
function resolveTriggerValue(t) {
  if (isTriggerValue(t)) return [t.value, false];
  if (isTriggerFunction(t)) {
    const v = t.fn();
    if (v === void 0) return [void 0, true];
    return [v, false];
  }
  if (isTriggerGenerator(t)) {
    const v = t.gen.next();
    if (v.done) return [void 0, true];
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
  if (options.maximumRepeats && !loop) throw new Error(`'maximumRepeats' has no purpose if 'loop' is not set to true`);
  const done = (reason) => {
    events.dispose(reason);
    run2.cancel();
  };
  const run2 = continuously(async () => {
    if (predelay) await sleep(predelay);
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
  if (lazy === `never`) run2.start();
  return events;
}

// src/rx/sources/Iterator.ts
function iterator(source, options = {}) {
  const lazy = options.lazy ?? `very`;
  const log = options.traceLifecycle ? (message) => {
    console.log(`Rx.From.iterator ${message}`);
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
    log(`onExternalSignal`);
    ourAc?.abort(options.signal?.reason);
  };
  if (options.signal) {
    options.signal.addEventListener(`abort`, onExternalSignal, { once: true });
  }
  ;
  const read = async () => {
    log(`read. State: ${sm.value}`);
    ourAc = new AbortController();
    try {
      sm = StateMachine_exports.to(sm, `wait_for_next`);
      const v = await nextWithTimeout(iterator2, { signal: ourAc.signal, millis: readTimeoutMs });
      sm = StateMachine_exports.to(sm, `processing_result`);
      ourAc?.abort(`nextWithTimeout completed`);
      if (v.done) {
        log(`read v.done true`);
        events.dispose(`Generator complete`);
        sm = StateMachine_exports.to(sm, `disposed`);
      }
      if (sm.value === `stopping`) {
        log(`read. sm.value = stopping`);
        sm = StateMachine_exports.to(sm, `idle`);
        return;
      }
      if (sm.value === `disposed`) {
        log(`read. sm.value = disposed`);
        return;
      }
      events.set(v.value);
    } catch (error) {
      events.dispose(`Generator error: ${error.toString()}`);
      return;
    }
    if (sm.value === `processing_result`) {
      sm = StateMachine_exports.to(sm, `queued`);
      log(`scheduling read. State: ${sm.value}`);
      setTimeout(read, readIntervalMs);
    } else {
      sm = StateMachine_exports.to(sm, `idle`);
    }
  };
  const events = initLazyStream({
    ...options,
    lazy,
    onStart() {
      log(`onStart state: ${sm.value} whenStopped: ${whenStopped}`);
      if (sm.value !== `idle`) return;
      if (sm.value === `idle` && whenStopped === `reset` || iterator2 === void 0) {
        iterator2 = isAsyncIterable(source) ? source[Symbol.asyncIterator]() : source[Symbol.iterator]();
      }
      void read();
    },
    onStop() {
      log(`onStop state: ${sm.value} whenStopped: ${whenStopped}`);
      sm = StateMachine_exports.to(sm, `stopping`);
      if (whenStopped === `reset`) {
        log(`onStop reiniting iterator`);
        iterator2 = isAsyncIterable(source) ? source[Symbol.asyncIterator]() : source[Symbol.iterator]();
      }
    },
    onDispose(reason) {
      log(`onDispose (${reason})`);
      ourAc?.abort(`Rx.From.iterator disposed (${reason})`);
      if (options.signal) options.signal.removeEventListener(`abort`, onExternalSignal);
    }
  });
  return events;
}

// src/rx/ResolveSource.ts
var resolveSource = (source, options = {}) => {
  if (isReactive(source)) return source;
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

// src/rx/Cache.ts
function cache(r, initialValue) {
  let lastValue = initialValue;
  r.onValue((value) => {
    lastValue = value;
  });
  return {
    ...r,
    last() {
      return lastValue;
    },
    resetCachedValue() {
      lastValue = void 0;
    }
  };
}

// src/rx/InitStream.ts
function initUpstream(upstreamSource, options) {
  const lazy = options.lazy ?? `initial`;
  const disposeIfSourceDone = options.disposeIfSourceDone ?? true;
  const onValue = options.onValue ?? ((_v) => {
  });
  const source = resolveSource(upstreamSource);
  let unsub;
  const debugLabel = options.debugLabel ? `[${options.debugLabel}]` : ``;
  const onStart = () => {
    if (unsub !== void 0) return;
    if (options.onStart) options.onStart();
    unsub = source.on((value) => {
      if (messageIsSignal(value)) {
        if (value.signal === `done`) {
          stop();
          events.signal(value.signal, value.context);
          if (disposeIfSourceDone) events.dispose(`Upstream source ${debugLabel} has completed (${value.context ?? ``})`);
        } else {
          events.signal(value.signal, value.context);
        }
      } else if (messageHasValue(value)) {
        onValue(value.value);
      }
    });
  };
  const onStop = () => {
    if (unsub === void 0) return;
    unsub();
    unsub = void 0;
    if (options.onStop) options.onStop();
  };
  const events = initLazyStream({
    ...options,
    lazy,
    onStart,
    onStop
  });
  return events;
}
function initLazyStream(options) {
  const lazy = options.lazy ?? `initial`;
  const onStop = options.onStop ?? (() => {
  });
  const onStart = options.onStart ?? (() => {
  });
  const debugLabel = options.debugLabel ? `[${options.debugLabel}]` : ``;
  const events = initStream({
    ...options,
    onFirstSubscribe() {
      if (lazy !== `never`) {
        onStart();
      }
    },
    onNoSubscribers() {
      if (lazy === `very`) {
        onStop();
      }
    }
  });
  if (lazy === `never`) onStart();
  return events;
}
function initStream(options = {}) {
  let dispatcher;
  let disposed = false;
  let firstSubscribe = false;
  let emptySubscriptions = true;
  const onFirstSubscribe = options.onFirstSubscribe ?? void 0;
  const onNoSubscribers = options.onNoSubscribers ?? void 0;
  const debugLabel = options.debugLabel ? `[${options.debugLabel}]` : ``;
  const isEmpty = () => {
    if (dispatcher === void 0) return;
    if (!dispatcher.isEmpty) return;
    if (!emptySubscriptions) {
      emptySubscriptions = true;
      firstSubscribe = false;
      if (onNoSubscribers) onNoSubscribers();
    }
  };
  const subscribe = (handler) => {
    if (disposed) throw new Error(`Disposed, cannot subscribe ${debugLabel}`);
    if (dispatcher === void 0) dispatcher = new DispatchList();
    const id = dispatcher.add(handler);
    emptySubscriptions = false;
    if (!firstSubscribe) {
      firstSubscribe = true;
      if (onFirstSubscribe) onFirstSubscribe();
    }
    return () => {
      dispatcher?.remove(id);
      isEmpty();
    };
  };
  return {
    dispose: (reason) => {
      if (disposed) return;
      dispatcher?.notify({ value: void 0, signal: `done`, context: `Disposed: ${reason}` });
      disposed = true;
      if (options.onDispose) options.onDispose(reason);
    },
    isDisposed: () => {
      return disposed;
    },
    removeAllSubscribers: () => {
      dispatcher?.clear();
      isEmpty();
    },
    set: (v) => {
      if (disposed) throw new Error(`${debugLabel} Disposed, cannot set`);
      dispatcher?.notify({ value: v });
    },
    // through: (pass: Passed<V>) => {
    //   if (disposed) throw new Error(`Disposed, cannot through`);
    //   dispatcher?.notify(pass)
    // },
    signal: (signal, context) => {
      if (disposed) throw new Error(`${debugLabel} Disposed, cannot signal`);
      dispatcher?.notify({ signal, value: void 0, context });
    },
    on: (handler) => subscribe(handler),
    onValue: (handler) => {
      const unsub = subscribe((message) => {
        if (messageHasValue(message)) {
          handler(message.value);
        }
      });
      return unsub;
    }
  };
}

// src/dom/SetProperty.ts
function setText(selectors, value) {
  return setProperty(`textContent`, selectors, value);
}
function setHtml(selectors, value) {
  return setProperty(`innerHTML`, selectors, value);
}
function setProperty(property, selectors, value) {
  let elements2 = [];
  const set = (v) => {
    const typ = typeof v;
    const vv = typ === `string` || typ === `number` || typ === `boolean` ? v : JSON.stringify(v);
    if (elements2.length === 0) {
      elements2 = resolveEls(selectors);
    }
    for (const element of elements2) {
      element[property] = vv;
    }
    return vv;
  };
  return value === void 0 ? set : set(value);
}

// src/rx/sinks/Dom.ts
var setHtmlText = (rxOrSource, optionsOrElementOrQuery) => {
  let el;
  let options;
  if (typeof optionsOrElementOrQuery === `string`) {
    options = { query: optionsOrElementOrQuery };
  }
  if (typeof optionsOrElementOrQuery === `object`) {
    if (`nodeName` in optionsOrElementOrQuery) {
      options = { el: optionsOrElementOrQuery };
    } else {
      options = optionsOrElementOrQuery;
    }
  }
  if (options === void 0) throw new TypeError(`Missing element as second parameter or option`);
  if (`el` in options) {
    el = options.el;
  } else if (`query` in options) {
    el = document.querySelector(options.query);
  } else {
    throw new TypeError(`Options does not include 'el' or 'query' fields`);
  }
  if (el === null || el === void 0) throw new Error(`Element could not be resolved.`);
  const stream = resolveSource(rxOrSource);
  const setter = setProperty(options.asHtml ? `innerHTML` : `textContent`, el);
  const off = stream.onValue((value) => {
    setter(value);
  });
  return off;
};

// src/rx/ToReadable.ts
var toReadable = (stream) => ({
  on: stream.on,
  dispose: stream.dispose,
  isDisposed: stream.isDisposed,
  onValue: stream.onValue
});

// src/rx/ops/Annotate.ts
function annotate(input, annotator, options = {}) {
  const upstream = initUpstream(input, {
    ...options,
    onValue(value) {
      const annotation = annotator(value);
      upstream.set({ value, annotation });
    }
  });
  return toReadable(upstream);
}
function annotateWithOp(input, annotatorOp) {
  const inputStream = resolveSource(input);
  const stream = annotatorOp(inputStream);
  const synced = syncToObject({
    value: inputStream,
    annotation: stream
  });
  return synced;
}

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
    if (queue.isEmpty) return;
    if (timer !== void 0) timer.start();
    const data = queue.toArray();
    queue.clear();
    upstream.set(data);
  };
  const timer = options.elapsed ? timeout(send, options.elapsed) : void 0;
  return toReadable(upstream);
}

// src/rx/ops/Transform.ts
function transform(input, transformer, options = {}) {
  const traceInput = options.traceInput ?? false;
  const traceOutput = options.traceOutput ?? false;
  const upstream = initUpstream(input, {
    lazy: `initial`,
    ...options,
    onValue(value) {
      const t = transformer(value);
      if (traceInput && traceOutput) {
        console.log(`Rx.Ops.transform input: ${JSON.stringify(value)} output: ${JSON.stringify(t)}`);
      } else if (traceInput) {
        console.log(`Rx.Ops.transform input: ${JSON.stringify(value)}`);
      } else if (traceOutput) {
        console.log(`Rx.Ops.transform output: ${JSON.stringify(t)}`);
      }
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
    dispose: event2.dispose,
    isDisposed: event2.isDisposed,
    on: event2.on,
    onValue: event2.onValue
  };
}

// src/data/Pathed.ts
var Pathed_exports = {};
__export(Pathed_exports, {
  applyChanges: () => applyChanges,
  compareData: () => compareData,
  getField: () => getField,
  getPaths: () => getPaths,
  getPathsAndData: () => getPathsAndData,
  updateByPath: () => updateByPath
});

// src/data/Util.ts
var isEmptyEntries = (value) => [...Object.entries(value)].length === 0;
var isEqualContextString = (a, b, _path) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

// src/data/Pathed.ts
var getEntries = (target, deepProbe) => {
  if (target === void 0) throw new Error(`Param 'target' is undefined`);
  if (target === null) throw new Error(`Param 'target' is null`);
  if (typeof target !== `object`) throw new Error(`Param 'target' is not an object (got: ${typeof target})`);
  if (deepProbe) {
    const entries = [];
    for (const field2 in target) {
      const value = target[field2];
      if (isPlainObjectOrPrimitive(value)) {
        entries.push([field2, value]);
      }
    }
    return entries;
  } else {
    return Object.entries(target);
  }
};
function* compareData(a, b, options = {}) {
  if (a === void 0) {
    yield {
      path: options.pathPrefix ?? ``,
      value: b,
      state: `added`
    };
    return;
  }
  if (b === void 0) {
    yield { path: options.pathPrefix ?? ``, previous: a, value: void 0, state: `removed` };
    return;
  }
  const asPartial = options.asPartial ?? false;
  const undefinedValueMeansRemoved = options.undefinedValueMeansRemoved ?? false;
  const pathPrefix = options.pathPrefix ?? ``;
  const deepEntries = options.deepEntries ?? false;
  const eq = options.eq ?? isEqualContextString;
  const includeMissingFromA = options.includeMissingFromA ?? false;
  const includeParents = options.includeParents ?? false;
  if (isPrimitive(a) && isPrimitive(b)) {
    if (a !== b) yield { path: pathPrefix, value: b, previous: a, state: `change` };
    return;
  }
  if (isPrimitive(b)) {
    yield { path: pathPrefix, value: b, previous: a, state: `change` };
    return;
  }
  const entriesA = getEntries(a, deepEntries);
  const entriesAKeys = /* @__PURE__ */ new Set();
  for (const [key, valueA] of entriesA) {
    entriesAKeys.add(key);
    const keyOfAInB = key in b;
    const valueOfKeyInB = b[key];
    if (typeof valueA === `object` && valueA !== null) {
      if (keyOfAInB) {
        if (valueOfKeyInB === void 0) {
          throw new Error(`Pathed.compareData Value for key ${key} is undefined`);
        } else {
          const sub = [...compareData(valueA, valueOfKeyInB, {
            ...options,
            pathPrefix: pathPrefix + key + `.`
          })];
          if (sub.length > 0) {
            for (const s of sub) yield s;
            if (includeParents) {
              yield { path: pathPrefix + key, value: b[key], previous: valueA, state: `change` };
            }
          }
        }
      } else {
        if (asPartial) continue;
        yield { path: pathPrefix + key, value: void 0, previous: valueA, state: `removed` };
      }
    } else {
      const subPath = pathPrefix + key;
      if (keyOfAInB) {
        if (valueOfKeyInB === void 0 && undefinedValueMeansRemoved) {
          yield { path: subPath, previous: valueA, value: void 0, state: `removed` };
        } else {
          if (!eq(valueA, valueOfKeyInB, subPath)) {
            yield { path: subPath, previous: valueA, value: valueOfKeyInB, state: `change` };
          }
        }
      } else {
        if (asPartial) continue;
        yield { path: subPath, previous: valueA, value: void 0, state: `removed` };
      }
    }
  }
  if (includeMissingFromA) {
    const entriesB = getEntries(b, deepEntries);
    for (const [key, valueB] of entriesB) {
      if (entriesAKeys.has(key)) continue;
      yield { path: pathPrefix + key, previous: void 0, value: valueB, state: `added` };
    }
  }
}
var applyChanges = (source, changes) => {
  for (const change of changes) {
    source = updateByPath(source, change.path, change.value);
  }
  return source;
};
var updateByPath = (target, path, value, allowShapeChange = false) => {
  if (path === void 0) throw new Error(`Parameter 'path' is undefined`);
  if (typeof path !== `string`) throw new Error(`Parameter 'path' should be a string. Got: ${typeof path}`);
  if (target === void 0) throw new Error(`Parameter 'target' is undefined`);
  if (target === null) throw new Error(`Parameter 'target' is null`);
  const split2 = path.split(`.`);
  const r = updateByPathImpl(target, split2, value, allowShapeChange);
  return r;
};
var updateByPathImpl = (o, split2, value, allowShapeChange) => {
  if (split2.length === 0) {
    if (allowShapeChange) return value;
    if (Array.isArray(o) && !Array.isArray(value)) throw new Error(`Expected array value, got: '${JSON.stringify(value)}'. Set allowShapeChange=true to ignore.`);
    if (!Array.isArray(o) && Array.isArray(value)) throw new Error(`Unexpected array value, got: '${JSON.stringify(value)}'. Set allowShapeChange=true to ignore.`);
    if (typeof o !== typeof value) throw new Error(`Cannot reassign object type. (${typeof o} -> ${typeof value}). Set allowShapeChange=true to ignore.`);
    if (typeof o === `object` && !Array.isArray(o)) {
      const c = compareKeys(o, value);
      if (c.a.length > 0) {
        throw new Error(`New value is missing key(s): ${c.a.join(`,`)}`);
      }
      if (c.b.length > 0) {
        throw new Error(`New value cannot add new key(s): ${c.b.join(`,`)}`);
      }
    }
    return value;
  }
  const start = split2.shift();
  if (!start) return value;
  const isInt = isInteger(start);
  if (isInt && Array.isArray(o)) {
    const index = Number.parseInt(start);
    if (index >= o.length && !allowShapeChange) throw new Error(`Array index ${index.toString()} is outside of the existing length of ${o.length.toString()}. Use allowShapeChange=true to permit this.`);
    const copy = [...o];
    copy[index] = updateByPathImpl(copy[index], split2, value, allowShapeChange);
    return copy;
  } else if (start in o) {
    const copy = { ...o };
    copy[start] = updateByPathImpl(copy[start], split2, value, allowShapeChange);
    return copy;
  } else {
    throw new Error(`Path ${start} not found in data`);
  }
};
var getField = (object2, path) => {
  if (typeof path !== `string`) throw new Error(`Param 'path' ought to be a string. Got: '${typeof path}'`);
  if (path.length === 0) throw new Error(`Param string 'path' is empty`);
  if (object2 === void 0) throw new Error(`Param 'object' is undefined`);
  if (object2 === null) throw new Error(`Param 'object' is null`);
  const split2 = path.split(`.`);
  const v = getFieldImpl(object2, split2);
  return v;
};
var getFieldImpl = (object2, split2) => {
  if (object2 === void 0) throw new Error(`Param 'object' is undefined`);
  if (split2.length === 0) throw new Error(`Path has run out`);
  const start = split2.shift();
  if (!start) throw new Error(`Unexpected empty split path`);
  const isInt = isInteger(start);
  if (isInt && Array.isArray(object2)) {
    const index = Number.parseInt(start);
    if (typeof object2[index] === `undefined`) {
      return { success: false, error: `Index ${index} is not present` };
    }
    if (split2.length === 0) {
      return { value: object2[index], success: true };
    } else {
      return getFieldImpl(object2[index], split2);
    }
  } else if (typeof object2 === `object` && start in object2) {
    if (split2.length === 0) {
      return { value: object2[start], success: true };
    } else {
      return getFieldImpl(object2[start], split2);
    }
  } else {
    return { success: false, error: `Path '${start}' not found` };
  }
};
function* getPaths(object2, onlyLeaves = false) {
  if (object2 === void 0 || object2 === null) return;
  const iter = depthFirst(object2);
  for (const c of iter) {
    if (c.nodeValue === void 0 && onlyLeaves) continue;
    let path = c.name;
    if (c.ancestors.length > 0) path = c.ancestors.join(`.`) + `.` + path;
    yield path;
  }
}
function* getPathsAndData(o, maxDepth = Number.MAX_SAFE_INTEGER, prefix = ``) {
  if (o === null) return;
  if (o === void 0) return;
  yield* getPathsAndDataImpl(o, prefix, maxDepth);
}
function* getPathsAndDataImpl(o, prefix, maxDepth) {
  if (maxDepth <= 0) return;
  if (typeof o !== `object`) return;
  for (const entries of Object.entries(o)) {
    const sub = (prefix.length > 0 ? prefix + `.` : ``) + entries[0];
    yield { path: sub, value: entries[1] };
    yield* getPathsAndDataImpl(entries[1], sub, maxDepth - 1);
  }
}

// src/rx/sources/Object.ts
function object(initialValue, options = {}) {
  const eq = options.eq ?? isEqualContextString;
  const setEvent = initStream();
  const diffEvent = initStream();
  const fieldChangeEvents = [];
  let value = initialValue;
  let disposed = false;
  const set = (v) => {
    const diff = [...compareData(value ?? {}, v, { ...options, includeMissingFromA: true })];
    if (diff.length === 0) return;
    value = v;
    setEvent.set(v);
    diffEvent.set(diff);
  };
  const fireFieldUpdate = (field2, value2) => {
    for (const [matcher, pattern, list] of fieldChangeEvents) {
      if (matcher(field2)) {
        list.notify({ fieldName: field2, pattern, value: value2 });
      }
    }
  };
  const updateCompareOptions = {
    asPartial: true,
    includeParents: true
  };
  const update = (toMerge) => {
    if (value === void 0) {
      value = toMerge;
      setEvent.set(value);
      for (const [k, v] of Object.entries(toMerge)) {
        fireFieldUpdate(k, v);
      }
      return value;
    } else {
      const diff = [...compareData(value, toMerge, updateCompareOptions)];
      if (diff.length === 0) return value;
      value = {
        ...value,
        ...toMerge
      };
      setEvent.set(value);
      diffEvent.set(diff);
      for (const d of diff) {
        fireFieldUpdate(d.path, d.value);
      }
      return value;
    }
  };
  const updateField = (path, valueForField) => {
    if (value === void 0) throw new Error(`Cannot update value when it has not already been set`);
    const existing = getField(value, path);
    throwResult(existing);
    if (eq(existing.value, valueForField, path)) {
      return;
    }
    let diff = [...compareData(existing.value, valueForField, { ...options, includeMissingFromA: true })];
    diff = diff.map((d) => {
      if (d.path.length > 0) return { ...d, path: path + `.` + d.path };
      return { ...d, path };
    });
    const o = updateByPath(value, path, valueForField, true);
    value = o;
    setEvent.set(o);
    diffEvent.set(diff);
    fireFieldUpdate(path, valueForField);
  };
  const dispose = (reason) => {
    if (disposed) return;
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
    onValue: setEvent.onValue,
    onDiff: diffEvent.onValue,
    onField(fieldPattern, handler) {
      const matcher = wildcard(fieldPattern);
      const listeners = new DispatchList();
      fieldChangeEvents.push([matcher, fieldPattern, listeners]);
      const id = listeners.add(handler);
      return () => listeners.remove(id);
    },
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

// src/rx/ops/CombineLatestToObject.ts
function combineLatestToObject(reactiveSources, options = {}) {
  const disposeSources = options.disposeSources ?? true;
  const event2 = object(void 0);
  const onSourceDone = options.onSourceDone ?? `break`;
  const emitInitial = options.emitInitial ?? true;
  let emitInitialDone = false;
  const states = /* @__PURE__ */ new Map();
  for (const [key, source] of Object.entries(reactiveSources)) {
    const initialData = `last` in source ? source.last() : void 0;
    const s = {
      source: resolveSource(source),
      done: false,
      data: initialData,
      off: () => {
      }
    };
    states.set(key, s);
  }
  const sources = Object.fromEntries(Object.entries(states).map((entry) => [entry[0], entry[1].source]));
  const someUnfinished = () => Map_exports.some(states, (v) => !v.done);
  const unsub = () => {
    for (const state of states.values()) state.off();
  };
  const getData = () => {
    const r = {};
    for (const [key, state] of states) {
      const d = state.data;
      if (d !== void 0) {
        r[key] = state.data;
      }
    }
    return r;
  };
  const trigger = () => {
    emitInitialDone = true;
    const d = getData();
    event2.set(d);
  };
  const wireUpState = (state) => {
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
        trigger();
      }
    });
  };
  for (const state of states.values()) {
    wireUpState(state);
  }
  if (!emitInitialDone && emitInitial) {
    trigger();
  }
  return {
    ...event2,
    hasSource(field2) {
      return states.has(field2);
    },
    replaceSource(field2, source) {
      const state = states.get(field2);
      if (state === void 0) throw new Error(`Field does not exist: '${field2}'`);
      state.off();
      const s = resolveSource(source);
      state.source = s;
      wireUpState(state);
    },
    setWith(data) {
      let written = {};
      for (const [key, value] of Object.entries(data)) {
        const state = states.get(key);
        if (state !== void 0) {
          if (isWritable(state.source)) {
            state.source.set(value);
            written[key] = value;
          }
          state.data = value;
        }
      }
      return written;
    },
    sources,
    last() {
      return getData();
    },
    dispose(reason) {
      unsub();
      event2.dispose(reason);
      if (disposeSources) {
        for (const v of states.values()) {
          v.source.dispose(`Part of disposed mergeToObject`);
        }
      }
    }
  };
}

// src/rx/ops/ComputeWithPrevious.ts
function computeWithPrevious(input, fn) {
  let previousValue;
  let target;
  if (hasLast(input)) {
    target = previousValue = input.last();
  }
  const trigger = () => {
    if (previousValue === void 0 && target !== void 0) {
      previousValue = target;
      upstream.set(previousValue);
    } else if (previousValue !== void 0 && target !== void 0) {
      const vv = fn(previousValue, target);
      console.log(`vv: ${vv} prev: ${previousValue} target: ${target}`);
      previousValue = vv;
      upstream.set(vv);
    }
  };
  const upstream = initUpstream(input, {
    lazy: "very",
    debugLabel: `computeWithPrevious`,
    onValue(value) {
      console.log(`onValue ${value}`);
      target = value;
      trigger();
    }
  });
  if (target) trigger();
  return {
    ...toReadable(upstream),
    ping: () => {
      if (target !== void 0) trigger();
    }
  };
}

// src/rx/ops/Debounce.ts
function debounce(source, options = {}) {
  const elapsed2 = intervalToMs(options.elapsed, 50);
  let lastValue;
  const timer = timeout(() => {
    const v = lastValue;
    if (v) {
      upstream.set(v);
      lastValue = void 0;
    }
  }, elapsed2);
  const upstream = initUpstream(source, {
    ...options,
    onValue(value) {
      lastValue = value;
      timer.start();
    }
  });
  return toReadable(upstream);
}

// src/rx/ops/Elapsed.ts
var elapsed = (input) => {
  let last = 0;
  return transform(input, (_ignored) => {
    const elapsed2 = last === 0 ? 0 : Date.now() - last;
    last = Date.now();
    return elapsed2;
  });
};

// src/rx/ops/Field.ts
function field(fieldSource, fieldName, options = {}) {
  const fallbackFieldValue = options.fallbackFieldValue;
  const fallbackObject = options.fallbackObject;
  const upstream = initUpstream(fieldSource, {
    disposeIfSourceDone: true,
    ...options,
    onValue(value) {
      let v;
      if (fieldName in value) {
        v = value[fieldName];
      } else if (fallbackObject && fieldName in fallbackObject) {
        v = fallbackObject[fieldName];
      }
      if (v === void 0) {
        v = fallbackFieldValue;
      }
      if (v !== void 0) {
        upstream.set(v);
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
function drop(input, predicate, options) {
  const upstream = initUpstream(input, {
    ...options,
    onValue(value) {
      if (!predicate(value)) {
        upstream.set(value);
      }
    }
  });
  return toReadable(upstream);
}

// src/rx/ops/Interpolate.ts
function interpolate2(input, options = {}) {
  const amount = options.amount ?? 0.1;
  const snapAt = options.snapAt ?? 0.99;
  const i = interpolate(amount);
  return interpolateToTarget(input, (previous, target) => {
    const v = i(previous, target);
    if (v / target >= snapAt) return target;
    return v;
  });
}
function interpolateToTarget(input, fn) {
  let previousValue;
  let target;
  if (hasLast(input)) {
    target = previousValue = input.last();
  }
  const ping = () => {
    if (previousValue === void 0 && target !== void 0) {
      previousValue = target;
    } else if (previousValue !== void 0 && target !== void 0) {
      previousValue = fn(previousValue, target);
    }
    upstream.set(previousValue);
  };
  const upstream = initUpstream(input, {
    lazy: "very",
    debugLabel: `computeWithPrevious`,
    onValue(value) {
      target = value;
      ping();
    }
  });
  if (target) ping();
  return {
    ...toReadable(upstream),
    ping: () => {
      if (target !== void 0) ping();
    }
  };
}

// src/rx/ops/Math.ts
function max2(input, options) {
  const p = max();
  return process(p, `max`, input, options);
}
function min2(input, options) {
  const p = min();
  return process(p, `min`, input, options);
}
function average2(input, options) {
  const p = average();
  return process(p, `average`, input, options);
}
function sum2(input, options) {
  const p = sum();
  return process(p, `sum`, input, options);
}
function tally2(input, options = {}) {
  const countArrayItems = options.countArrayItems ?? true;
  const p = tally(countArrayItems);
  return process(p, `tally`, input, options);
}
function rank2(input, rank3, options) {
  const p = rank(rank3, options);
  return process(p, `rank`, input, options);
}
function process(processor, annotationField, input, options = {}) {
  const annotate2 = options.annotate;
  let previous;
  const skipUndefined = options.skipUndefined ?? true;
  const skipIdentical = options.skipIdentical ?? true;
  const upstream = initUpstream(input, {
    ...options,
    onValue(value) {
      const x = processor(value);
      if (x === void 0 && skipUndefined) return;
      if (skipIdentical && x === previous) return;
      previous = x;
      if (annotate2) {
        const ret = { value };
        ret[annotationField] = x;
        upstream.set(ret);
      } else {
        upstream.set(x);
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
      if (!s.isDisposed) s.dispose(reason);
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
    onValue: event2.onValue,
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
  if (!options.at && !options.predicate) throw new Error(`Options must have 'predicate' or 'at' fields`);
  let preprocess = (values) => values;
  if (order === `random`) preprocess = shuffle;
  else if (typeof order === `function`) preprocess = (values) => values.toSorted(order);
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
var split = (rxOrSource, options = {}) => {
  const quantity = options.quantity ?? 2;
  const outputs = [];
  const source = resolveSource(rxOrSource);
  for (let index = 0; index < quantity; index++) {
    outputs.push(initUpstream(source, { disposeIfSourceDone: true, lazy: `initial` }));
  }
  return outputs;
};
var splitLabelled = (rxOrSource, labels) => {
  const source = resolveSource(rxOrSource);
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
    if (disposed) return;
    unsub();
    disposed = true;
    for (const stream of Object.values(t)) {
      stream.dispose(`switcher source dispose`);
    }
  };
  const unsub = source.on((message) => {
    if (messageHasValue(message)) {
      for (const [lbl, pred] of Object.entries(cases)) {
        if (pred(message.value)) {
          t[lbl].set(message.value);
          if (match === `first`) break;
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
      if (onSourceDone === `allow` && states[index].done) continue;
      if (data[index] === void 0) return false;
    }
    return true;
  };
  const hasIncompleteSource = () => states.some((s) => !s.done);
  const resetDataSet = () => {
    for (let index = 0; index < data.length; index++) {
      if (finalValue === `last` && states[index].done) continue;
      data[index] = void 0;
    }
  };
  const onWatchdog = () => {
    done(`Sync timeout exceeded (${maximumWait.toString()})`);
  };
  const done = (reason) => {
    if (watchdog) clearTimeout(watchdog);
    unsubscribe();
    event2.dispose(reason);
  };
  const init = () => {
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
            if (finalValue === `undefined`) data[index] = void 0;
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
          if (watchdog) clearTimeout(watchdog);
          watchdog = setTimeout(onWatchdog, maximumWait);
        }
      });
    }
  };
  const event2 = initStream({
    onFirstSubscribe() {
      unsubscribe();
      init();
    },
    onNoSubscribers() {
      if (watchdog) clearTimeout(watchdog);
      unsubscribe();
    }
  });
  return {
    dispose: event2.dispose,
    isDisposed: event2.isDisposed,
    on: event2.on,
    onValue: event2.onValue
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

// src/data/Process.ts
var Process_exports = {};
__export(Process_exports, {
  CancelError: () => CancelError,
  average: () => average,
  cancelIfUndefined: () => cancelIfUndefined,
  chain: () => chain,
  ifNotUndefined: () => ifNotUndefined,
  ifUndefined: () => ifUndefined,
  max: () => max,
  min: () => min,
  rank: () => rank,
  seenLastToUndefined: () => seenLastToUndefined,
  seenToUndefined: () => seenToUndefined,
  seenToUndefinedByKey: () => seenToUndefinedByKey,
  sum: () => sum,
  tally: () => tally
});
function chain(...processors) {
  return (value) => {
    let v = value;
    for (const p of processors) {
      try {
        v = p(v);
      } catch (err) {
        if (err instanceof CancelError) {
          break;
        } else {
          throw err;
        }
      }
    }
    return v;
  };
}
function seenLastToUndefined(eq) {
  if (eq === void 0) eq = isEqualDefault;
  let lastValue;
  return (value) => {
    if (value !== lastValue) {
      lastValue = value;
      return value;
    }
    return void 0;
  };
}
function seenToUndefined(eq) {
  let seen = [];
  if (eq === void 0) eq = isEqualDefault;
  return (value) => {
    if (value === void 0) return;
    for (const s of seen) {
      if (eq(s, value)) return;
    }
    seen.push(value);
    return value;
  };
}
function seenToUndefinedByKey(toString) {
  let seen = /* @__PURE__ */ new Set();
  if (toString === void 0) toString = toStringDefault;
  return (value) => {
    if (value === void 0) return;
    const key = toString(value);
    if (seen.has(key)) return;
    seen.add(key);
    return value;
  };
}
function ifNotUndefined(fn) {
  return (value) => {
    if (value === void 0) return value;
    const v = fn(value);
    return v;
  };
}
var CancelError = class extends Error {
  constructor(message) {
    super(message);
    this.name = `CancelError`;
  }
};
function cancelIfUndefined() {
  return (value) => {
    if (value === void 0) throw new CancelError(`cancel`);
    return value;
  };
}
function ifUndefined(fn) {
  return (value) => {
    if (value === void 0) return fn();
    else return value;
  };
}

// src/rx/ops/Tap.ts
function tapProcess(input, ...processors) {
  const inputStream = resolveSource(input);
  const chain2 = chain(...processors);
  inputStream.onValue((value) => {
    chain2(value);
  });
  return inputStream;
}
function tapStream(input, diverged) {
  const inputStream = resolveSource(input);
  inputStream.onValue((value) => {
    diverged.set(value);
  });
  return inputStream;
}
var tapOps = (input, ...ops) => {
  for (const op of ops) {
    input = op(input);
  }
  return input;
};

// src/rx/ops/Throttle.ts
function throttle(throttleSource, options = {}) {
  const elapsed2 = intervalToMs(options.elapsed, 0);
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
    if (elapsed2 > 0 && now - lastFire > elapsed2) {
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
  const repeat = options.repeat ?? false;
  const timeoutMs = intervalToMs(options.interval, 1e3);
  if (!isTrigger(options)) {
    throw new Error(`Param 'options' does not contain trigger 'value' or 'fn' fields`);
  }
  const sendFallback = () => {
    const [value, done] = resolveTriggerValue(options);
    if (done) {
      events.dispose(`Trigger completed`);
    } else {
      if (events.isDisposed()) return;
      events.set(value);
      if (repeat) {
        timer = setTimeout(sendFallback, timeoutMs);
      }
    }
  };
  const events = initUpstream(source, {
    disposeIfSourceDone: true,
    // Received a value from upstream source
    onValue(v) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(sendFallback, timeoutMs);
      events.set(v);
    },
    onDispose() {
      if (timer) clearTimeout(timer);
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

// src/rx/Chain.ts
function chainer(...ops) {
  return (source) => {
    for (const op of ops) {
      source = op(source);
    }
    return source;
  };
}
function run(source, ...ops) {
  let s = resolveSource(source);
  for (const op of ops) {
    s = op(s);
  }
  return s;
}
function runHead(source, ...ops) {
  let originalSource = resolveSource(source);
  let s = originalSource;
  for (const op of ops) {
    s = op(s);
  }
  const rr = s;
  if (isWritable(originalSource)) {
    return {
      ...rr,
      set(value) {
        originalSource.set(value);
      }
    };
  } else {
    return rr;
  }
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
  distance: () => distance,
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
      if (l === label) return index;
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
      if (row === void 0) r.push([]);
      else r.push([...row]);
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
    if (row === void 0) return void 0;
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
    if (row === void 0) return void 0;
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
    if (index === void 0) throw new Error(`Column not found: ${column}`);
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
function toAdjacencyMatrix(graph2) {
  const v = [...graph2.vertices.values()];
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
var dumpGraph = (graph2) => {
  const lines = debugGraphToArray(graph2);
  return lines.join(`
`);
};
var debugGraphToArray = (graph2) => {
  const r = [];
  const vertices2 = `vertices` in graph2 ? graph2.vertices.values() : graph2;
  for (const v of vertices2) {
    const str = debugDumpVertex(v);
    r.push(...str.map((line) => ` ${line}`));
  }
  return r;
};
var distance = (graph2, edge) => {
  if (edge.weight !== void 0) return edge.weight;
  return 1;
};
function* edges(graph2) {
  const vertices2 = [...graph2.vertices.values()];
  for (const vertex of vertices2) {
    for (const edge of vertex.out) {
      yield edge;
    }
  }
}
function* vertices(graph2) {
  const vertices2 = [...graph2.vertices.values()];
  for (const vertex of vertices2) {
    yield vertex;
  }
}
function* adjacentVertices(graph2, context) {
  if (context === void 0) return;
  const vertex = typeof context === `string` ? graph2.vertices.get(context) : context;
  if (vertex === void 0) throw new Error(`Vertex not found ${JSON.stringify(context)}`);
  for (const edge of vertex.out) {
    const edgeV = graph2.vertices.get(edge.id);
    if (edgeV === void 0) throw new Error(`Could not find vertex: ${edge.id}`);
    yield edgeV;
  }
}
var vertexHasOut = (vertex, outIdOrVertex) => {
  if (vertex === void 0) return false;
  const outId = typeof outIdOrVertex === `string` ? outIdOrVertex : outIdOrVertex.id;
  return vertex.out.some((edge) => edge.id === outId);
};
var hasNoOuts = (graph2, vertex) => {
  const context = typeof vertex === `string` ? graph2.vertices.get(vertex) : vertex;
  if (context === void 0) return false;
  return context.out.length === 0;
};
var hasOnlyOuts = (graph2, vertex, ...outIdOrVertex) => {
  const context = resolveVertex(graph2, vertex);
  const outs = outIdOrVertex.map((o) => resolveVertex(graph2, o));
  if (outs.length !== context.out.length) {
    return false;
  }
  for (const out of outs) {
    if (!hasOut(graph2, context, out)) {
      return false;
    }
  }
  return true;
};
var hasOut = (graph2, vertex, outIdOrVertex) => {
  const context = resolveVertex(graph2, vertex);
  const outId = typeof outIdOrVertex === `string` ? outIdOrVertex : outIdOrVertex.id;
  return context.out.some((edge) => edge.id === outId);
};
var getOrCreate = (graph2, id) => {
  const v = graph2.vertices.get(id);
  if (v !== void 0) return { graph: graph2, vertex: v };
  const vv = createVertex(id);
  const gg = updateGraphVertex(graph2, vv);
  return { graph: gg, vertex: vv };
};
var getOrFail = (graph2, id) => {
  const v = graph2.vertices.get(id);
  if (v === void 0) throw new Error(`Vertex '${id}' not found in graph`);
  return v;
};
var updateGraphVertex = (graph2, vertex) => {
  const gr = {
    ...graph2,
    vertices: graph2.vertices.set(vertex.id, vertex)
  };
  return gr;
};
var distanceDefault = (graph2, edge) => {
  if (edge.weight !== void 0) return edge.weight;
  return 1;
};
function disconnect(graph2, from, to2) {
  const fromV = resolveVertex(graph2, from);
  const toV = resolveVertex(graph2, to2);
  return hasOut(graph2, fromV, toV) ? updateGraphVertex(graph2, {
    ...fromV,
    out: fromV.out.filter((t) => t.id !== toV.id)
  }) : graph2;
}
function connectTo(graph2, from, to2, weight) {
  const fromResult = getOrCreate(graph2, from);
  graph2 = fromResult.graph;
  const toResult = getOrCreate(graph2, to2);
  graph2 = toResult.graph;
  const edge = {
    id: to2,
    weight
  };
  if (!hasOut(graph2, fromResult.vertex, toResult.vertex)) {
    graph2 = updateGraphVertex(graph2, {
      ...fromResult.vertex,
      // Add new edge to list of edges for this node
      out: [...fromResult.vertex.out, edge]
    });
  }
  return { graph: graph2, edge };
}
function connect(graph2, options) {
  const { to: to2, weight, from } = options;
  const bidi = options.bidi ?? false;
  const toList = Array.isArray(to2) ? to2 : [to2];
  for (const toSingle of toList) {
    const result = connectTo(graph2, from, toSingle, weight);
    graph2 = result.graph;
  }
  if (!bidi) return graph2;
  for (const toSingle of toList) {
    const result = connectTo(graph2, toSingle, from, weight);
    graph2 = result.graph;
  }
  return graph2;
}
var debugDumpVertex = (v) => {
  const r = [
    v.id
  ];
  const stringForEdge = (edge) => edge.weight === void 0 ? edge.id : `${edge.id} (${edge.weight})`;
  for (const edge of v.out) {
    r.push(` -> ${stringForEdge(edge)}`);
  }
  if (v.out.length === 0) r[0] += ` (terminal)`;
  return r;
};
function areAdjacent(graph2, a, b) {
  if (hasOut(graph2, a, b.id)) return true;
  if (hasOut(graph2, b, a.id)) return true;
}
function resolveVertex(graph2, idOrVertex) {
  const v = typeof idOrVertex === `string` ? graph2.vertices.get(idOrVertex) : idOrVertex;
  if (v === void 0) throw new Error(`Id not found ${idOrVertex}`);
  return v;
}
function* bfs(graph2, startIdOrVertex, targetIdOrVertex) {
  const start = resolveVertex(graph2, startIdOrVertex);
  const target = targetIdOrVertex === void 0 ? void 0 : resolveVertex(graph2, targetIdOrVertex);
  const queue = new QueueMutable();
  const seen = /* @__PURE__ */ new Set();
  queue.enqueue(start);
  while (!queue.isEmpty) {
    const v = queue.dequeue();
    yield v;
    if (target !== void 0 && target === v) return;
    for (const edge of adjacentVertices(graph2, v)) {
      if (!seen.has(edge.id)) {
        seen.add(edge.id);
        queue.enqueue(resolveVertex(graph2, edge.id));
      }
    }
  }
}
function* dfs(graph2, startIdOrVertex) {
  const source = resolveVertex(graph2, startIdOrVertex);
  const s = new StackMutable();
  const seen = /* @__PURE__ */ new Set();
  s.push(source);
  while (!s.isEmpty) {
    const v = s.pop();
    if (v === void 0) continue;
    if (!seen.has(v.id)) {
      seen.add(v.id);
      yield v;
      for (const edge of v.out) {
        const destination = graph2.vertices.get(edge.id);
        if (destination) {
          s.push(destination);
        }
      }
    }
  }
}
var pathDijkstra = (graph2, sourceOrId) => {
  const source = typeof sourceOrId === `string` ? graph2.vertices.get(sourceOrId) : sourceOrId;
  if (source === void 0) throw new Error(`source vertex not found`);
  const distances = /* @__PURE__ */ new Map();
  const previous = /* @__PURE__ */ new Map();
  distances.set(source.id, 0);
  const pq = new PriorityMutable();
  const vertices2 = [...graph2.vertices.values()];
  for (const v of vertices2) {
    if (v.id !== source.id) {
      distances.set(v.id, Number.MAX_SAFE_INTEGER);
      previous.set(v.id, null);
    }
    pq.enqueueWithPriority(v.id, Number.MAX_SAFE_INTEGER);
  }
  while (!pq.isEmpty) {
    const u = pq.dequeueMin();
    if (u === void 0) throw new Error(`Bug. Queue unexpectedly empty`);
    const vertexU = graph2.vertices.get(u);
    for (const neighbour of vertexU.out) {
      const alt = distances.get(u) + distance(graph2, neighbour);
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
      if (id === source.id) break;
      const v = previous.get(id);
      if (v === void 0 || v === null) throw new Error(`Id not present: ${id}`);
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
var clone = (graph2) => {
  const g = {
    vertices: immutable([...graph2.vertices.entries()])
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
function isAcyclic(graph2) {
  const cycles = getCycles(graph2);
  return cycles.length === 0;
}
function topologicalSort(graph2) {
  const indegrees = new NumberMap(0);
  for (const edge of edges(graph2)) {
    indegrees.add(edge.id, 1);
  }
  const queue = new QueueMutable();
  let vertexCount = 0;
  for (const vertex of vertices(graph2)) {
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
        queue.enqueue(graph2.vertices.get(neighbour.id));
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
function getCycles(graph2) {
  let index = 0;
  const stack = new StackMutable();
  const vertices2 = /* @__PURE__ */ new Map();
  const scc = [];
  for (const v of graph2.vertices.values()) {
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
function transitiveReduction(graph2) {
  for (const u of vertices(graph2)) {
    for (const v of adjacentVertices(graph2, u)) {
      for (const v1 of dfs(graph2, v)) {
        if (v.id === v1.id) continue;
        if (hasOut(graph2, u, v1)) {
          const g = disconnect(graph2, u, v1);
          return transitiveReduction(g);
        }
      }
    }
  }
  return graph2;
}

// src/rx/Graph.ts
function prepare(_rx) {
  let g = graph();
  const nodes = /* @__PURE__ */ new Map();
  const events = initStream();
  const process2 = (o, path) => {
    for (const [key, value] of Object.entries(o)) {
      const subPath = path + `.` + key;
      g = connect(g, {
        from: path,
        to: subPath
      });
      if (isReactive(value)) {
        nodes.set(subPath, { value, type: `rx` });
        value.on((v) => {
          console.log(`Rx.prepare value: ${JSON.stringify(v)} path: ${subPath}`);
        });
      } else {
        const valueType = typeof value;
        if (valueType === `bigint` || valueType === `boolean` || valueType === `number` || valueType === `string`) {
          nodes.set(subPath, { type: `primitive`, value });
        } else if (valueType === `object`) {
          process2(value, subPath);
        } else if (valueType === `function`) {
          console.log(`Rx.process - not handling functions`);
        }
      }
    }
  };
  const returnValue = {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    dispose: events.dispose,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    isDisposed: events.isDisposed,
    graph: g,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    on: events.on,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    onValue: events.onValue
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
  const v = await toArray(source, { limit, maximumWait, underThreshold: `partial` });
  if (options.limit && v.length < options.limit) throw new Error(`Threshold not reached. Wanted: ${options.limit}, got ${v.length}`);
  return v;
}

// src/rx/ToGenerator.ts
async function* toGenerator(source) {
  const s = resolveSource(source);
  let promiseResolve = (_) => {
  };
  let promiseReject = (_) => {
  };
  const promiseInit = () => new Promise((resolve2, reject) => {
    promiseResolve = resolve2;
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

// src/data/MapObject.ts
var mapObjectShallow = (object2, mapFunction) => {
  const entries = Object.entries(object2);
  const mapped = entries.map(([sourceField, sourceFieldValue], index) => [
    sourceField,
    mapFunction({ value: sourceFieldValue, field: sourceField, index, path: sourceField })
  ]);
  return Object.fromEntries(mapped);
};
function mapObjectByObject(data, mapper) {
  const entries = Object.entries(data);
  for (let i = 0; i < entries.length; i++) {
    const e = entries[i];
    if (e[0] in mapper) {
      const m = mapper[e[0]];
      e[1] = typeof m === `object` ? mapObjectByObject(e[1], m) : m(e[1], data);
    }
  }
  return Object.fromEntries(entries);
}

// src/rx/Wrap.ts
function wrap(source) {
  return {
    source: resolveSource(source),
    enacts: {
      setHtmlText: (options) => {
        return setHtmlText(source, options);
      }
    },
    annotate: (transformer) => {
      const a = annotate(source, transformer);
      return wrap(a);
    },
    batch: (options) => {
      const w = wrap(batch(source, options));
      return w;
    },
    debounce: (options = {}) => {
      return wrap(debounce(source, options));
    },
    field: (fieldName, options = {}) => {
      const f = field(source, fieldName, options);
      return wrap(f);
    },
    filter: (predicate, options) => {
      return wrap(filter(source, predicate, options));
    },
    combineLatestToArray: (sources, options = {}) => {
      const srcs = [source, ...sources];
      return wrap(combineLatestToArray(srcs, options));
    },
    combineLatestToObject: (sources, options) => {
      const name = options.name ?? `source`;
      const o = { ...sources };
      o[name] = source;
      return wrap(combineLatestToObject(o, options));
    },
    min: (options = {}) => {
      return wrap(min2(source, options));
    },
    max: (options = {}) => {
      return wrap(max2(source, options));
    },
    average: (options = {}) => {
      return wrap(average2(source, options));
    },
    sum: (options = {}) => {
      return wrap(sum2(source, options));
    },
    tally: (options = {}) => {
      return wrap(tally2(source, options));
    },
    split: (options = {}) => {
      const streams = split(source, options).map((v) => wrap(v));
      return streams;
    },
    splitLabelled: (...labels) => {
      const l = splitLabelled(source, labels);
      const m = mapObjectShallow(l, (args) => wrap(args.value));
      return m;
    },
    switcher: (cases, options = {}) => {
      const s = switcher(source, cases, options);
      const m = mapObjectShallow(s, (args) => wrap(args.value));
      return m;
    },
    syncToArray: (additionalSources, options = {}) => {
      const unwrapped = [source, ...additionalSources].map((v) => resolveSource(v));
      const x = syncToArray(unwrapped, options);
      return wrap(x);
    },
    syncToObject: (sources, options = {}) => {
      const name = options.name ?? `source`;
      const o = { ...sources };
      o[name] = source;
      return wrap(syncToObject(o, options));
    },
    tapProcess: (...processors) => {
      tapProcess(source, ...processors);
      return wrap(source);
    },
    tapStream: (divergedStream) => {
      tapStream(source, divergedStream);
      return wrap(source);
    },
    tapOps: (source2, ...ops) => {
      tapOps(source2, ...ops);
      return wrap(source2);
    },
    throttle: (options = {}) => {
      return wrap(throttle(source, options));
    },
    transform: (transformer, options = {}) => {
      return wrap(transform(source, transformer, options));
    },
    timeoutTrigger: (options) => {
      return wrap(timeoutTrigger(source, options));
    },
    toArray: (options) => {
      return toArray(source, options);
    },
    toArrayOrThrow: (options) => {
      return toArrayOrThrow(source, options);
    },
    onValue: (callback) => {
      const s = resolveSource(source);
      s.on((message) => {
        if (messageHasValue(message)) callback(message.value);
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
  bindValueText: () => bindValueText,
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
    if (b === source) break;
    source = b;
  }
}

// src/rx/Dom.ts
function fromDomQuery(query) {
  const elements2 = [...document.querySelectorAll(query)];
  return object(elements2);
}
var bindText = (source, elOrQuery, bindOpts = {}) => {
  return bindElement(source, elOrQuery, { ...bindOpts, elField: `textContent` });
};
var bindValueText = (source, elOrQuery, bindOpts = {}) => {
  return bindElement(source, elOrQuery, { ...bindOpts, elField: `value`, attribName: `value` });
};
var bindHtml = (source, elOrQuery, bindOpts = {}) => {
  return bindElement(source, elOrQuery, { ...bindOpts, elField: `innerHTML` });
};
var bindElement = (source, elOrQuery, ...binds) => {
  if (elOrQuery === null) throw new Error(`Param 'elOrQuery' is null`);
  if (elOrQuery === void 0) throw new Error(`Param 'elOrQuery' is undefined`);
  const el = resolveEl(elOrQuery);
  let b = [];
  if (binds.length === 0) {
    b.push({ elField: `textContent` });
  } else {
    b = [...binds];
  }
  const bb = b.map((bind2) => {
    if (`element` in bind2) return bind2;
    return { ...bind2, element: el };
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
    if (!css.startsWith(`--`)) css = `--` + css;
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
  if (!bind2.transform && !bind2.transformValue) return;
  if (bind2.transformValue) {
    if (bind2.sourceField === void 0) throw new Error(`Expects 'sourceField' to be set when 'transformValue' is set`);
    return (value) => {
      const fieldValue = value[bind2.sourceField];
      return bind2.transformValue(fieldValue);
    };
  } else if (bind2.transform) {
    if (bind2.sourceField !== void 0) throw new Error(`If 'transform' is set, 'sourceField' is ignored`);
    return (value) => bind2.transform(value);
  }
};
var bind = (source, ...bindsUnresolvedElements) => {
  const binds = bindsUnresolvedElements.map((bind2) => {
    if (bind2.element && bind2.element !== void 0) return bind2;
    if (bind2.query) return {
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
        } else bind2.update(v);
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
  const el = resolveEl(elOrQuery);
  const update = (value) => {
    updater(value, el);
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
        el.remove();
      }
    }
  };
};
var bindDiffUpdate = (source, elOrQuery, updater, opts = {}) => {
  if (elOrQuery === null) throw new Error(`Param 'elOrQuery' is null`);
  if (elOrQuery === void 0) throw new Error(`Param 'elOrQuery' is undefined`);
  const el = resolveEl(elOrQuery);
  const update = (value) => {
    updater(value, el);
  };
  const unsub = source.onDiff((value) => {
    update(value);
  });
  const init = () => {
    if (hasLast(source) && opts.initial) opts.initial(source.last(), el);
  };
  init();
  return {
    refresh: () => {
      init();
    },
    remove: (removeElement) => {
      unsub();
      if (removeElement) {
        el.remove();
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
    if (bind2 !== void 0) return bind2;
    if (!path.includes(`.`)) return binds.get(`_root`);
  };
  function* ancestorBinds(path) {
    for (const p of stringSegmentsWholeToFirst(path)) {
      if (binds.has(p)) {
        yield binds.get(p);
      } else {
      }
    }
    if (binds.has(`_root`) && path.includes(`.`)) yield binds.get(`_root`);
  }
  const create = (path, value) => {
    const rootedPath = getRootedPath(path);
    console.log(`Rx.Dom.elements.create: ${path} rooted: ${rootedPath} value: ${JSON.stringify(value)}`);
    const bind2 = findBind(getRootedPath(path));
    let tagName = defaultTag;
    if (bind2?.tagName) tagName = bind2.tagName;
    const el = document.createElement(tagName);
    el.setAttribute(`data-path`, path);
    update(path, el, value);
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
    (parentForEl ?? containerEl).append(el);
    elByField.set(path, el);
    console.log(`Added el: ${path}`);
  };
  const update = (path, el, value) => {
    console.log(`Rx.dom.update path: ${path} value:`, value);
    const bind2 = findBind(getRootedPath(path));
    if (bind2 === void 0) {
      if (typeof value === `object`) value = JSON.stringify(value);
      el.textContent = value;
    } else {
      if (bind2.transform) value = bind2.transform(value);
      bind2.update(value, el);
    }
  };
  const changes = (changes2) => {
    const queue = new QueueMutable({}, changes2);
    let d = queue.dequeue();
    const seenPaths = /* @__PURE__ */ new Set();
    while (d !== void 0) {
      const path = d.path;
      if (!(`previous` in d) || d.previous === void 0) {
        console.log(`Rx.Dom.elements.changes no previous. path: ${path}`);
        create(path, d.value);
        const subdata = [...getPathsAndData(d.value, Number.MAX_SAFE_INTEGER, path)];
        console.log(subdata);
        for (const dd of subdata) {
          if (!seenPaths.has(dd.path)) {
            queue.enqueue(dd);
            seenPaths.add(dd.path);
          }
        }
      } else if (d.value === void 0) {
        const el = elByField.get(path);
        if (el === void 0) {
          console.warn(`No element to delete? ${path} `);
        } else {
          console.log(`Rx.Dom.elements.changes delete ${path}`);
          el.remove();
        }
      } else {
        const el = elByField.get(path);
        if (el === void 0) {
          console.warn(`Rx.Dom.elements.changes No element to update ? ${path} `);
          create(path, d.value);
        } else {
          update(path, el, d.value);
        }
      }
      d = queue.dequeue();
    }
  };
  source.onDiff((value) => {
    changes(value);
  });
  if (hasLast(source)) {
    const last = source.last();
    changes([...getPathsAndData(last, 1)]);
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
      if (args === void 0) return { x: 0, y: 0 };
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
  array: () => array,
  arrayObject: () => arrayObject,
  boolean: () => boolean,
  colour: () => colour,
  derived: () => derived,
  domHslInputValue: () => domHslInputValue,
  domInputValue: () => domInputValue,
  domNumberInputValue: () => domNumberInputValue,
  event: () => event,
  eventField: () => eventField,
  eventTrigger: () => eventTrigger,
  func: () => func,
  iterator: () => iterator,
  number: () => number,
  object: () => object,
  objectProxy: () => objectProxy,
  objectProxySymbol: () => objectProxySymbol,
  observable: () => observable,
  observableWritable: () => observableWritable,
  of: () => of,
  pinged: () => pinged,
  string: () => string
});

// src/rx/sources/Array.ts
var of = (source, options = {}) => {
  if (Array.isArray(source)) {
    return array(source, options);
  } else {
  }
};
var array = (sourceArray, options = {}) => {
  const lazy = options.lazy ?? `initial`;
  const signal = options.signal;
  const whenStopped = options.whenStopped ?? `continue`;
  const debugLifecycle = options.debugLifecycle ?? false;
  const array2 = [...sourceArray];
  if (lazy !== `very` && whenStopped === `reset`) throw new Error(`whenStopped:'reset' has no effect with 'lazy:${lazy}'. Use lazy:'very' instead.`);
  const intervalMs = intervalToMs(options.interval, 5);
  let index = 0;
  let lastValue = array2[0];
  const s = initLazyStream({
    ...options,
    lazy,
    onStart() {
      if (debugLifecycle) console.log(`Rx.readFromArray:onStart`);
      c.start();
    },
    onStop() {
      if (debugLifecycle) console.log(`Rx.readFromArray:onStop. whenStopped: ${whenStopped} index: ${index}`);
      c.cancel();
      if (whenStopped === `reset`) index = 0;
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
    lastValue = array2[index];
    index++;
    s.set(lastValue);
    if (index === array2.length) {
      s.dispose(`Source array complete`);
      return false;
    }
  }, intervalMs);
  if (!lazy) c.start();
  return {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    dispose: s.dispose,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    isDisposed: s.isDisposed,
    isDone() {
      return index === array2.length;
    },
    last() {
      return lastValue;
    },
    // eslint-disable-next-line @typescript-eslint/unbound-method
    on: s.on,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    onValue: s.onValue
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
    if (valueChanged.length === value.length) return;
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
    if (disposed) return;
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
    onValue: setEvent.onValue,
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
    onValue: events.onValue,
    set
  };
}

// src/rx/sources/Colour.ts
function colour(initialValue) {
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
    onValue: events.onValue,
    set,
    setHsl: (hsl) => {
      set(resolve(hsl));
    }
  };
}

// src/rx/sources/Derived.ts
function derived(fn, reactiveSources, options = {}) {
  const ignoreIdentical = options.ignoreIdentical ?? true;
  const eq = options.eq ?? isEqualValueDefault;
  const sources = combineLatestToObject(reactiveSources);
  const handle = (v) => {
    const last = output.last();
    const vv = fn(v);
    if (vv !== void 0) {
      if (ignoreIdentical && last !== void 0) {
        if (eq(vv, last)) return vv;
      }
      output.set(vv);
    }
    return vv;
  };
  const s = initUpstream(sources, {
    ...options,
    onValue(v) {
      handle(v);
    }
  });
  const output = cache(s, fn(sources.last()));
  return output;
}

// src/rx/sources/Event.ts
function eventField(targetOrQuery, eventName, fieldName, initialValue, options = {}) {
  const initial = {};
  initial[fieldName] = initialValue;
  const rxField = field(
    event(targetOrQuery, eventName, initial, options),
    fieldName,
    options
  );
  return rxField;
}
function event(targetOrQuery, name, initialValue, options = {}) {
  let target;
  if (typeof targetOrQuery === `string`) {
    target = document.querySelector(targetOrQuery);
    if (target === null) throw new Error(`Target query did not resolve to an element. Query: '${targetOrQuery}'`);
  } else {
    target = targetOrQuery;
  }
  if (target === null) throw new Error(`Param 'targetOrQuery' is null`);
  const debugLifecycle = options.debugLifecycle ?? false;
  const debugFiring = options.debugFiring ?? false;
  const lazy = options.lazy ?? false;
  if (initialValue === void 0) initialValue = {};
  const rxObject = object(initialValue, { deepEntries: true });
  let eventAdded = false;
  let disposed = false;
  const callback = (args) => {
    if (debugFiring) console.log(`Reactive.event '${name}' firing '${JSON.stringify(args)}`);
    rxObject.set(args);
  };
  const remove2 = () => {
    if (!eventAdded) return;
    eventAdded = false;
    target.removeEventListener(name, callback);
    if (debugLifecycle) {
      console.log(`Rx.From.event remove '${name}'`);
    }
  };
  const add = () => {
    if (eventAdded) return;
    eventAdded = true;
    target.addEventListener(name, callback);
    if (debugLifecycle) {
      console.log(`Rx.From.event add '${name}'`);
    }
  };
  if (!lazy) add();
  return {
    last: () => {
      if (lazy) add();
      return rxObject.last();
    },
    dispose: (reason) => {
      if (disposed) return;
      disposed = true;
      remove2();
      rxObject.dispose(reason);
    },
    isDisposed() {
      return disposed;
    },
    on: (handler) => {
      if (lazy) add();
      return rxObject.on(handler);
    },
    onValue: (handler) => {
      if (lazy) add();
      return rxObject.onValue(handler);
    }
  };
}
function eventTrigger(targetOrQuery, name, options = {}) {
  let target;
  if (typeof targetOrQuery === `string`) {
    target = document.querySelector(targetOrQuery);
    if (target === null) throw new Error(`Target query did not resolve to an element. Query: '${targetOrQuery}'`);
  } else {
    target = targetOrQuery;
  }
  if (target === null) throw new Error(`Param 'targetOrQuery' is null`);
  const debugLifecycle = options.debugLifecycle ?? false;
  const debugFiring = options.debugFiring ?? false;
  const fireInitial = options.fireInitial ?? false;
  let count2 = 0;
  const elapsed2 = Elapsed_exports.interval();
  const stream = initLazyStream({
    lazy: options.lazy ?? `very`,
    onStart() {
      target.addEventListener(name, callback);
      if (debugLifecycle) {
        console.log(`Rx.From.eventTrigger add '${name}'`);
      }
      if (fireInitial && count2 === 0) {
        if (debugLifecycle || debugFiring) console.log(`Rx.From.eventTrigger: firing initial`);
        callback();
      }
    },
    onStop() {
      target.removeEventListener(name, callback);
      if (debugLifecycle) {
        console.log(`Rx.From.eventTrigger remove '${name}'`);
      }
    }
  });
  const callback = (_args) => {
    if (debugFiring) console.log(`Rx.From.eventTrigger '${name}' triggered'`);
    stream.set({
      sinceLast: elapsed2(),
      total: ++count2
    });
  };
  return stream;
}

// src/rx/sources/Dom.ts
function domNumberInputValue(targetOrQuery, options = {}) {
  const input = domInputValue(targetOrQuery, options);
  const el = input.el;
  const relative = options.relative ?? false;
  const inverted = options.inverted ?? false;
  const rx = transform(input, (v) => {
    return Number.parseFloat(v);
  });
  if (relative) {
    el.max = inverted ? "0" : "1";
    el.min = inverted ? "1" : "0";
    if (!el.hasAttribute(`step`)) {
      el.step = "0.1";
    }
  }
  if (el.getAttribute(`type`) === null) {
    el.type = `range`;
  }
  const set = (value) => {
    input.set(value.toString());
  };
  return {
    ...rx,
    last() {
      return Number.parseFloat(input.last());
    },
    set
  };
}
function domHslInputValue(targetOrQuery, options = {}) {
  const input = domInputValue(targetOrQuery, {
    ...options,
    upstreamFilter(value) {
      return typeof value === `object` ? toHex(value) : value;
    }
  });
  const rx = transform(input, (v) => {
    return toHsl(v, true);
  });
  return {
    ...rx,
    last() {
      return toHsl(input.last(), true);
    },
    set(value) {
      input.set(toHex(value));
    }
  };
}
function domInputValue(targetOrQuery, options = {}) {
  const target = typeof targetOrQuery === `string` ? document.querySelector(targetOrQuery) : targetOrQuery;
  if (target === null && typeof targetOrQuery === `string`) throw new Error(`Element query could not be resolved '${targetOrQuery}'`);
  if (target === null) throw new Error(`targetOrQuery is null`);
  const el = resolveEl(targetOrQuery);
  const when = options.when ?? `changed`;
  const eventName = when === `changed` ? `change` : `input`;
  const emitInitialValue = options.emitInitialValue ?? false;
  const fallbackValue = options.fallbackValue ?? ``;
  const upstreamSource = options.upstreamSource;
  let upstreamSourceUnsub = () => {
  };
  let attribName = options.attributeName;
  let fieldName = options.fieldName;
  if (fieldName === void 0 && attribName === void 0) {
    attribName = fieldName = `value`;
  }
  const readValue = () => {
    let value;
    if (attribName) {
      value = el.getAttribute(attribName);
    }
    if (fieldName) {
      value = el[fieldName];
    }
    if (value === void 0 || value === null) value = fallbackValue;
    return value;
  };
  const setValue = (value) => {
    if (attribName) {
      el.setAttribute(attribName, value);
    }
    if (fieldName) {
      el[fieldName] = value;
    }
  };
  const setUpstream = (v) => {
    v = options.upstreamFilter ? options.upstreamFilter(v) : v;
    setValue(v);
  };
  if (upstreamSource) {
    upstreamSourceUnsub = upstreamSource.onValue(setUpstream);
    if (hasLast(upstreamSource)) {
      setUpstream(upstreamSource.last());
    }
  }
  const rxEvents = eventTrigger(el, eventName, {
    fireInitial: emitInitialValue,
    debugFiring: options.debugFiring ?? false,
    debugLifecycle: options.debugLifecycle ?? false
  });
  const rxValues = transform(rxEvents, (_trigger) => readValue());
  return {
    ...rxValues,
    el,
    last() {
      return readValue();
    },
    set(value) {
      setValue(value);
    },
    dispose(reason) {
      upstreamSourceUnsub();
      rxValues.dispose(reason);
      rxEvents.dispose(reason);
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
      if (lazy !== `never` && upstreamOff === void 0) start();
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
    if (upstreamOff) upstreamOff();
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
  if (lazy === `never`) start();
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
    onValue: events.onValue,
    set
  };
}

// src/rx/sources/ObjectProxy.ts
var objectProxy = (target) => {
  const rx = object(target);
  const proxy = new Proxy(target, {
    set(target2, p, newValue, _receiver) {
      const isArray = Array.isArray(target2);
      if (isArray && p === `length`) return true;
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
function observable(init) {
  const ow = observableWritable(init);
  return {
    dispose: ow.dispose,
    isDisposed: ow.isDisposed,
    on: ow.on,
    onValue: ow.onValue
  };
}
function observableWritable(init) {
  let onCleanup = () => {
  };
  const ow = manual({
    onFirstSubscribe() {
      onCleanup = init(ow);
    },
    onNoSubscribers() {
      if (onCleanup) onCleanup();
    }
  });
  return {
    ...ow,
    onValue: (callback) => {
      return ow.on((message) => {
        if (messageHasValue(message)) {
          callback(message.value);
        }
      });
    }
  };
}

// src/rx/sources/String.ts
function string(initialValue) {
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
    onValue: events.onValue,
    set
  };
}

// src/rx/index.ts
function manual(options = {}) {
  const events = initStream(options);
  return {
    dispose: events.dispose,
    isDisposed: events.isDisposed,
    set(value) {
      events.set(value);
    },
    on: events.on,
    onValue: events.onValue
  };
}
var Sinks = {
  setHtmlText: (options) => {
    return (source) => {
      setHtmlText(source, options);
    };
  }
};
var Ops = {
  /**
  * Annotates values with the result of a function.
  * The input value needs to be an object.
  * 
  * For every value `input` emits, run it through `annotator`, which should
  * return the original value with additional fields.
  * 
  * Conceptually the same as `transform`, just with typing to enforce result
  * values are V & TAnnotation
  * @param annotator 
  * @returns 
  */
  annotate: (annotator) => opify(annotate, annotator),
  /**
   * Annotates the input stream using {@link ReactiveOp} as the source of annotations.
   * The output values will have the shape of `{ value: TIn, annotation: TAnnotation }`.
   * Meaning that the original value is stored under `.value`, and the annotation under `.annotation`.
   * 
   * ```js
   * // Emit values from an array
   * const r1 = Rx.run(
   *  Rx.From.array([ 1, 2, 3 ]),
   *  Rx.Ops.annotateWithOp(
   *    // Add the 'max' operator to emit the largest-seen value
   *    Rx.Ops.sum()
   *  )
   * );
   * const data = await Rx.toArray(r1);
   * // Data =  [ { value: 1, annotation: 1 }, { value: 2, annotation: 3 }, { value: 3, annotation: 6 } ]
   * ```
   * @param annotatorOp 
   * @returns 
   */
  annotateWithOp: (annotatorOp) => opify(annotateWithOp, annotatorOp),
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
  elapsed: () => opify(elapsed),
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
  /**
   * Every upstream value is considered the target for interpolation.
   * Output value interpolates by a given amount toward the target.
   * @param options 
   * @returns 
   */
  interpolate: (options) => opify(interpolate2, options),
  /**
  * Outputs the minimum numerical value of the stream.
  * A value is only emitted when minimum decreases.
  * @returns 
  */
  min: (options) => opify(min2, options),
  /**
   * Outputs the maxium numerical value of the stream.
   * A value is only emitted when maximum increases.
   * @returns 
   */
  max: (options) => opify(max2, options),
  sum: (options) => opify(sum2, options),
  average: (options) => opify(average2, options),
  tally: (options) => opify(tally2, options),
  rank: (rank3, options) => opify(rank2, rank3, options),
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
  tapProcess: (processor) => {
    return (source) => {
      return tapProcess(source, processor);
    };
  },
  tapStream: (divergedStream) => {
    return (source) => {
      return tapStream(source, divergedStream);
    };
  },
  tapOps: (...ops) => {
    return (source) => {
      return tapOps(source, ...ops);
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
  transform: (transformer, options = {}) => {
    return (source) => {
      return transform(source, transformer, options);
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
async function takeNextValue(source, maximumWait = 1e3) {
  const rx = resolveSource(source);
  let off = () => {
  };
  let watchdog;
  const p = new Promise((resolve2, reject) => {
    off = rx.on((message) => {
      if (watchdog) clearTimeout(watchdog);
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
  return p;
}
var to = (a, b, transform2, closeBonA = false) => {
  const unsub = a.on((message) => {
    if (messageHasValue(message)) {
      const value = transform2 ? transform2(message.value) : message.value;
      b.set(value);
    } else if (messageIsDoneSignal(message)) {
      unsub();
      if (closeBonA) {
        b.dispose(`Source closed (${message.context ?? ``})`);
      }
    } else {
      console.warn(`Unsupported message: ${JSON.stringify(message)}`);
    }
  });
  return unsub;
};

export {
  mapObjectShallow,
  mapObjectByObject,
  isEmptyEntries,
  isEqualContextString,
  compareData,
  getField,
  getPaths,
  Pathed_exports,
  Process_exports,
  messageIsSignal,
  messageIsDoneSignal,
  messageHasValue,
  isPingable,
  hasLast,
  isReactive,
  isWritable,
  isWrapped,
  opify,
  isTriggerValue,
  isTriggerFunction,
  isTriggerGenerator,
  isTrigger,
  resolveTriggerValue,
  resolveSource,
  setText,
  setHtml,
  setProperty,
  setHtmlText,
  annotate,
  annotateWithOp,
  batch,
  transform,
  cloneFromFields,
  combineLatestToArray,
  combineLatestToObject,
  computeWithPrevious,
  debounce,
  elapsed,
  field,
  filter,
  drop,
  interpolate2 as interpolate,
  interpolateToTarget,
  max2 as max,
  min2 as min,
  average2 as average,
  sum2 as sum,
  tally2 as tally,
  rank2 as rank,
  pipe,
  singleFromArray,
  split,
  splitLabelled,
  switcher,
  syncToArray,
  syncToObject,
  tapProcess,
  tapStream,
  tapOps,
  throttle,
  timeoutTrigger,
  withValue,
  chainer,
  run,
  runHead,
  Table,
  DirectedGraph_exports,
  prepare,
  symbol,
  toArray,
  toArrayOrThrow,
  toGenerator,
  wrap,
  count,
  Dom_exports,
  sources_exports,
  manual,
  Sinks,
  Ops,
  takeNextValue,
  to,
  rx_exports
};
//# sourceMappingURL=chunk-RBLOJS6A.js.map