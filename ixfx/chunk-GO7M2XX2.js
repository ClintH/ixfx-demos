import {
  Bipolar_exports,
  flip
} from "./chunk-N7YXKZMN.js";
import {
  PointTracker,
  TrackedPointMap,
  pointTracker,
  pointsTracker,
  trackUnique,
  trackUniqueInstances
} from "./chunk-B7WAGCWK.js";
import {
  DirectedGraph_exports,
  Reactive_exports,
  Table
} from "./chunk-4T5D2YT2.js";
import {
  resolveEl
} from "./chunk-W7ZO7ANV.js";
import {
  scale,
  scaleClamped,
  scalePercent,
  scalePercentages,
  scaler,
  scalerPercent
} from "./chunk-CAI5TLNP.js";
import {
  interpolate,
  interpolateAngle,
  wrap,
  wrapInteger,
  wrapRange
} from "./chunk-HI4CSGFK.js";
import {
  NumberTracker,
  PrimitiveTracker,
  TrackedValueMap,
  TrackerBase,
  numberTracker
} from "./chunk-DK5J4BYE.js";
import {
  Elapsed_exports,
  clamp,
  clampIndex
} from "./chunk-N26YSP3N.js";
import {
  immutable
} from "./chunk-PPUK7HTL.js";
import {
  queue_exports
} from "./chunk-OTN26LTM.js";
import {
  QueueMutable
} from "./chunk-6AR5IC6V.js";
import {
  SimpleEventEmitter
} from "./chunk-URNX3V7L.js";
import {
  KeyValue_exports,
  getSorter
} from "./chunk-SZTMT36C.js";
import {
  average,
  averageWeighted,
  minMaxAvg
} from "./chunk-YFLKLOTE.js";
import {
  IterableAsync_exports,
  intervalToMs,
  sleep
} from "./chunk-QMMKIDRO.js";
import {
  throwIntegerTest,
  throwNumberTest
} from "./chunk-UKONBQSB.js";
import {
  logSet
} from "./chunk-L62EN7US.js";
import {
  __export
} from "./chunk-ERASX3TW.js";

// src/data/index.ts
var data_exports = {};
__export(data_exports, {
  Bipolar: () => Bipolar_exports,
  Chains: () => chains_exports,
  Correlate: () => Correlate_exports,
  FrequencyMutable: () => FrequencyMutable,
  Graphs: () => graphs_exports,
  IntervalTracker: () => IntervalTracker,
  Normalise: () => Normalise_exports,
  NumberTracker: () => NumberTracker,
  PointTracker: () => PointTracker,
  Pool: () => Pool_exports,
  PrimitiveTracker: () => PrimitiveTracker,
  Reactive: () => Reactive_exports,
  Table: () => Table,
  TrackedPointMap: () => TrackedPointMap,
  TrackedValueMap: () => TrackedValueMap,
  TrackerBase: () => TrackerBase,
  clamp: () => clamp,
  clampIndex: () => clampIndex,
  flip: () => flip,
  frequencyMutable: () => frequencyMutable,
  interpolate: () => interpolate,
  interpolateAngle: () => interpolateAngle,
  intervalTracker: () => intervalTracker,
  movingAverage: () => movingAverage,
  movingAverageLight: () => movingAverageLight,
  movingAverageTimed: () => movingAverageTimed,
  noiseFilter: () => noiseFilter,
  numberTracker: () => numberTracker,
  piPi: () => piPi,
  pointTracker: () => pointTracker,
  pointsTracker: () => pointsTracker,
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
  let min2 = minDefault ?? Number.MAX_SAFE_INTEGER;
  let max2 = maxDefault ?? Number.MIN_SAFE_INTEGER;
  throwNumberTest(minDefault);
  throwNumberTest(maxDefault);
  return (v) => {
    throwNumberTest(v);
    min2 = Math.min(min2, v);
    max2 = Math.max(max2, v);
    return scale(v, min2, max2);
  };
};
var array = (values, minForced, maxForced) => {
  if (!Array.isArray(values)) {
    throw new Error(`values param should be an array`);
  }
  const mma = minMaxAvg(values);
  const min2 = minForced ?? mma.min;
  const max2 = maxForced ?? mma.max;
  return values.map((v) => clamp(scale(v, min2, max2)));
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
    for (const [key, count] of this.#store.entries()) {
      t += `${key}: ${count}, `;
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

// src/data/MovingAverage.ts
var movingAverageLight = (scaling = 3) => {
  throwNumberTest(scaling, `aboveZero`, `scaling`);
  let average3 = 0;
  let count = 0;
  let disposed = false;
  const ma = {
    dispose() {
      disposed = true;
    },
    get isDisposed() {
      return disposed;
    },
    add(v) {
      if (disposed)
        throw new Error(`MovingAverage disposed, cannot add`);
      count++;
      average3 = average3 + (v - average3) / Math.min(count, scaling);
      return average3;
    },
    clear() {
      if (disposed)
        throw new Error(`MovingAverage disposed, cannot clear`);
      average3 = 0;
      count = 0;
    },
    compute() {
      return average3;
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
    add(v) {
      reschedule();
      return mal.add(v);
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
  const clear = () => {
    q = new QueueMutable({
      capacity: samples,
      discardPolicy: `older`
    });
  };
  const compute = () => {
    return weighter === void 0 ? average(q.data) : averageWeighted(q.data, weighter);
  };
  const add = (v) => {
    q.enqueue(v);
    return compute();
  };
  const dispose = () => {
    disposed = true;
  };
  return { add, compute, clear, dispose, isDisposed: disposed };
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

// src/data/chains/index.ts
var chains_exports = {};
__export(chains_exports, {
  Dom: () => Dom_exports,
  Links: () => Links_exports,
  addToArray: () => addToArray,
  asArray: () => asArray,
  asCallback: () => asCallback,
  asPromise: () => asPromise,
  asValue: () => asValue,
  fromEvent: () => fromEvent,
  fromFunction: () => fromFunction,
  lazy: () => lazy,
  mergeAsArray: () => mergeAsArray,
  mergeFlat: () => mergeFlat,
  prepare: () => prepare,
  run: () => run,
  single: () => single,
  synchronise: () => synchronise,
  tick: () => tick
});

// src/Iterable.ts
var isAsyncIterable = (v) => Symbol.asyncIterator in new Object(v);

// src/data/chains/Util.ts
function* primitiveToGenerator(value) {
  yield value;
}
async function* primitiveToAsyncGenerator(value) {
  yield value;
  await sleep(1);
}
function resolveToGen(input) {
  if (Array.isArray(input)) {
    const a = input.values();
    a._name = `arrayInput`;
    return a;
  } else if (typeof input === `number` || typeof input === `boolean` || typeof input === `string`) {
    return primitiveToGenerator(input);
  } else if (typeof input === `function`) {
    return input();
  }
  return input;
}
function resolveToAsyncGen(input) {
  if (input === void 0)
    return;
  if (Array.isArray(input)) {
    return IterableAsync_exports.fromArray(input);
  } else if (typeof input === `number` || typeof input === `boolean` || typeof input === `string`) {
    return primitiveToAsyncGenerator(input);
  } else if (typeof input === `function`) {
    return input();
  } else if (isAsyncIterable(input)) {
    return input;
  }
  return IterableAsync_exports.fromIterable(input);
}

// src/data/chains/Links.ts
var Links_exports = {};
__export(Links_exports, {
  average: () => average2,
  chunk: () => chunk,
  debounce: () => debounce,
  delay: () => delay,
  drop: () => drop,
  duration: () => duration,
  filter: () => filter,
  flatten: () => flatten,
  max: () => max,
  min: () => min,
  take: () => take,
  tally: () => tally,
  total: () => total,
  transform: () => transform
});
function transform(transformer) {
  async function* transform2(input) {
    input = resolveToGen(input);
    for await (const value of input) {
      yield transformer(value);
    }
  }
  transform2._name = `transform`;
  return transform2;
}
function take(limit) {
  async function* take2(input) {
    input = resolveToGen(input);
    let yielded = 0;
    for await (const value of input) {
      if (++yielded > limit)
        break;
      yield value;
    }
  }
  take2._name = `take`;
  return take2;
}
function flatten(flattener) {
  async function* flatten2(input) {
    input = resolveToGen(input);
    for await (const value of input) {
      yield flattener(value);
    }
  }
  flatten2._name = `flatten`;
  return flatten2;
}
function duration(elapsed) {
  const durationMs = intervalToMs(elapsed, 0);
  async function* duration2(input) {
    input = resolveToGen(input);
    const elapsed2 = Elapsed_exports.since();
    for await (const value of input) {
      if (elapsed2() > durationMs)
        break;
      yield value;
    }
  }
  duration2._name = `duration`;
  return duration2;
}
function delay(options) {
  const before = intervalToMs(options.before, 0);
  const after = intervalToMs(options.after, 0);
  async function* delay3(input) {
    input = resolveToGen(input);
    for await (const value of input) {
      if (before > 0) {
        await sleep(before);
      }
      yield value;
      if (after > 0) {
        await sleep(after);
      }
    }
  }
  delay3._name = `delay`;
  return delay3;
}
function debounce(rate) {
  const rateMs = intervalToMs(rate, 0);
  async function* debounce2(input) {
    input = resolveToGen(input);
    let elapsed = Elapsed_exports.since();
    for await (const value of input) {
      if (elapsed() < rateMs)
        continue;
      yield value;
      elapsed = Elapsed_exports.since();
    }
  }
  debounce2._name = `debounce`;
  return debounce2;
}
function tally() {
  async function* tally2(input) {
    input = resolveToGen(input);
    let count = 0;
    for await (const _ of input) {
      yield ++count;
    }
  }
  tally2._name = `tally`;
  return tally2;
}
function min() {
  async function* min2(input) {
    input = resolveToGen(input);
    let min3 = Number.MAX_SAFE_INTEGER;
    for await (const value of input) {
      if (typeof value !== `number`)
        break;
      min3 = Math.min(value, min3);
      yield min3;
    }
  }
  min2._name = `min`;
  return min2;
}
function max() {
  async function* max2(input) {
    input = resolveToGen(input);
    let max3 = Number.MIN_SAFE_INTEGER;
    for await (const value of input) {
      if (typeof value !== `number`)
        break;
      max3 = Math.max(value, max3);
      yield max3;
    }
  }
  max2._name = `max`;
  return max2;
}
function average2() {
  async function* average3(input) {
    input = resolveToGen(input);
    let total2 = 0;
    let count = 0;
    for await (const value of input) {
      if (typeof value !== `number`)
        break;
      count++;
      total2 += value;
      yield total2 / count;
    }
  }
  average3._name = `average`;
  return average3;
}
function total() {
  async function* average3(input) {
    input = resolveToGen(input);
    let total2 = 0;
    for await (const value of input) {
      if (typeof value !== `number`)
        break;
      total2 += value;
      yield total2;
    }
  }
  average3._name = `average`;
  return average3;
}
function chunk(size, returnRemainders = true) {
  throwIntegerTest(size, `aboveZero`, `size`);
  async function* chunk2(input) {
    input = resolveToGen(input);
    let buffer = [];
    for await (const value of input) {
      buffer.push(value);
      if (buffer.length >= size) {
        yield buffer;
        buffer = [];
      }
    }
    if (returnRemainders && buffer.length > 0)
      yield buffer;
  }
  chunk2._name = `chunk`;
  return chunk2;
}
function filter(predicate) {
  async function* filter2(input) {
    input = resolveToGen(input);
    for await (const value of input) {
      if (predicate(value)) {
        yield value;
      }
    }
  }
  filter2._name = `filter`;
  return filter2;
}
function drop(predicate) {
  async function* drop2(input) {
    input = resolveToGen(input);
    for await (const value of input) {
      if (!predicate(value)) {
        yield value;
      }
    }
  }
  drop2._name = `drop`;
  return drop2;
}

// src/data/chains/Dom.ts
var Dom_exports = {};
__export(Dom_exports, {
  createPerValue: () => createPerValue,
  query: () => query
});
var createMap = (key) => {
  const keyFunction = key ?? ((value) => value);
  const map = /* @__PURE__ */ new Map();
  return {
    has(key2) {
      return map.has(keyFunction(key2));
    },
    get(key2) {
      return map.get(keyFunction(key2));
    },
    set(key2, value) {
      map.set(keyFunction(key2), value);
    }
  };
};
function createPerValue(options = {}) {
  const map = createMap(options.key);
  const parentElOrQuery = options.parentEl ?? document.body;
  const parentEl = resolveEl(parentElOrQuery);
  async function* createPerValue2(input) {
    for await (const value of resolveToGen(input)) {
      let el = map.get(value);
      if (!el) {
        el = document.createElement(`div`);
        map.set(value, el);
        parentEl.append(el);
      }
      yield el;
    }
  }
  createPerValue2._name = `dom.createPerValue`;
  return query;
}
function query(options = {}) {
  const baseElement = options.baseElement ?? document;
  async function* query2(input) {
    const gen = resolveToGen(input);
    for await (const value of gen) {
      for (const element of baseElement.querySelectorAll(value)) {
        yield element;
      }
    }
  }
  query2._name = `dom.query`;
  return query2;
}

// src/data/chains/index.ts
function isNoInput(c) {
  if (`_allowNoInput` in c)
    return true;
  return false;
}
function lazy() {
  const chained = [];
  let dataToUse;
  const asGenerator = (data) => {
    if (data === void 0)
      data = dataToUse;
    let d = resolveToAsyncGen(data);
    for (const c of chained) {
      if (d === void 0) {
        if (isNoInput(c)) {
          d = c();
        } else {
          throw new Error(`Function '${getLinkName(c)}' requires input. Provide it to the function, or call 'input' earlier.`);
        }
      } else {
        d = c(d);
      }
    }
    return d;
  };
  const w = {
    asGenerator,
    transform: (transformer) => {
      chained.push(transform(transformer));
      return w;
    },
    flatten: (flattener) => {
      chained.push(flatten(flattener));
      return w;
    },
    drop: (predicate) => {
      chained.push(drop(predicate));
      return w;
    },
    delay: (options) => {
      chained.push(delay(options));
      return w;
    },
    duration: (elapsed) => {
      chained.push(duration(elapsed));
      return w;
    },
    debounce: (rate) => {
      chained.push(debounce(rate));
      return w;
    },
    fromFunction: (callback) => {
      chained.push(fromFunction(callback));
      return w;
    },
    take: (limit) => {
      chained.push(take(limit));
      return w;
    },
    chunk: (size, returnRemainders = true) => {
      chained.push(chunk(size, returnRemainders));
      return w;
    },
    filter: (predicate) => {
      chained.push(filter((v) => predicate(v)));
      return w;
    },
    min: () => {
      chained.push(min());
      return w;
    },
    max: () => {
      chained.push(max());
      return w;
    },
    average: () => {
      chained.push(average2());
      return w;
    },
    total: () => {
      chained.push(total());
      return w;
    },
    tally: () => {
      chained.push(tally());
      return w;
    },
    input(data) {
      dataToUse = data;
      return w;
    },
    asAsync(data) {
      let d = data ?? dataToUse;
      for (const c of chained) {
        if (d === void 0 && isNoInput(c)) {
          d = c();
        } else if (d === void 0) {
          throw new Error(`Function '${getLinkName(c)}' needs input. Pass in data calling 'asAsync', or call 'input' earlier`);
        } else {
          d = c(d);
        }
      }
      return w;
    },
    asArray: async (data) => {
      const g = asGenerator(data);
      return await IterableAsync_exports.toArray(g);
    },
    firstOutput: async (data) => {
      const g = asGenerator(data);
      const v = await g.next();
      return v.value;
    },
    lastOutput: async (data) => {
      const g = asGenerator(data);
      let lastValue;
      for await (const v of g) {
        lastValue = v;
      }
      return lastValue;
    }
  };
  return w;
}
function tick(options) {
  const intervalMs = intervalToMs(options.interval, 0);
  const asClockTime = options.asClockTime ?? false;
  const loops = options.loops ?? Number.MAX_SAFE_INTEGER;
  let looped = 0;
  const durationTime = intervalToMs(options.elapsed, Number.MAX_SAFE_INTEGER);
  async function* ts() {
    const elapsed = Elapsed_exports.since();
    while (looped < loops && elapsed() < durationTime) {
      yield asClockTime ? Date.now() : elapsed();
      const expectedTimeDiff = looped * intervalMs - elapsed();
      await sleep(Math.max(0, intervalMs + expectedTimeDiff));
      looped++;
    }
  }
  ts._name = `timestamp`;
  return ts;
}
function fromFunction(callback) {
  async function* fromFunction2() {
    while (true) {
      const v = await callback();
      if (v === void 0)
        break;
      yield v;
    }
  }
  fromFunction2._name = `fromFunction`;
  return fromFunction2;
}
var oncePromise = (target, name) => {
  return new Promise((resolve) => {
    const handler = (...args) => {
      target.removeEventListener(name, handler);
      resolve(args);
    };
    target.addEventListener(name, handler);
  });
};
function fromEvent(target, name) {
  async function* fromEvent2() {
    while (true) {
      yield await oncePromise(target, name);
    }
  }
  fromEvent2._name = `fromEvent`;
  return fromEvent2;
}
function asPromise(valueToWrap) {
  let lastValue;
  const outputType = typeof valueToWrap === `function` ? valueToWrap() : valueToWrap;
  async function asPromise2() {
    const v = await outputType.next();
    if (v.done)
      return;
    lastValue = v.value;
    return lastValue;
  }
  return asPromise2;
}
function asValue(valueToWrap, initialValue) {
  let lastValue = initialValue;
  let awaiting = false;
  const outputType = typeof valueToWrap === `function` ? valueToWrap() : valueToWrap;
  function asValue2() {
    if (!awaiting) {
      awaiting = true;
      outputType.next().then((v) => {
        lastValue = v.value;
        awaiting = false;
      }).catch((error) => {
        awaiting = false;
        throw error;
      });
    }
    return lastValue;
  }
  return asValue2;
}
async function asCallback(valueToWrap, callback, onDone) {
  const outputType = typeof valueToWrap === `function` ? valueToWrap() : valueToWrap;
  for await (const value of outputType) {
    callback(value);
  }
  if (onDone)
    onDone();
}
async function asArray(valueToWrap) {
  const outputType = typeof valueToWrap === `function` ? valueToWrap() : valueToWrap;
  return IterableAsync_exports.toArray(outputType);
}
async function addToArray(array2, valueToWrap) {
  const outputType = typeof valueToWrap === `function` ? valueToWrap() : valueToWrap;
  for await (const value of outputType) {
    array2.push(value);
  }
}
async function single(f, input) {
  const iterator = await f([input]).next();
  return iterator.value;
}
async function* mergeFlat(...sources) {
  const sourcesInput = sources.map((source) => resolveToAsyncGen(source));
  const buffer = queue_exports.mutable();
  let completed = 0;
  const schedule = async (source) => {
    if (source === void 0) {
      completed++;
      return;
    }
    const x = await source.next();
    if (x.done) {
      completed++;
    } else {
      buffer.enqueue(x.value);
      setTimeout(() => schedule(source), 1);
    }
  };
  for (const source of sourcesInput) {
    setTimeout(() => schedule(source), 1);
  }
  const loopSpeed = 10;
  let loopFactor = 1;
  while (completed < sourcesInput.length) {
    const d = buffer.dequeue();
    if (d === void 0) {
      loopFactor = Math.min(loopFactor + 1, 10);
    } else {
      yield d;
      loopFactor = 1;
    }
    await sleep(loopSpeed * loopFactor);
  }
}
async function* mergeAsArray(...sources) {
  const sourcesInput = sources.map((source) => resolveToGen(source));
  let somethingProduced = true;
  while (somethingProduced) {
    let data = [];
    for (let index = 0; index < sourcesInput.length; index++) {
      data[index] = null;
    }
    somethingProduced = false;
    for (const [index, source] of sourcesInput.entries()) {
      const v = await source.next();
      if (!v.done) {
        data[index] = v.value;
        somethingProduced = true;
      }
    }
    if (somethingProduced) {
      yield data;
      data = [];
    }
  }
}
async function* synchronise(...sources) {
  const sourcesInput = sources.map((source) => resolveToGen(source));
  let somethingStopped = false;
  while (!somethingStopped) {
    let data = [];
    for (let index = 0; index < sourcesInput.length; index++) {
      data[index] = null;
    }
    somethingStopped = false;
    for (const [index, source] of sourcesInput.entries()) {
      const v = await source.next();
      if (v.done) {
        somethingStopped = true;
        break;
      } else {
        data[index] = v.value;
      }
    }
    if (somethingStopped)
      break;
    yield data;
    data = [];
  }
}
var getLinkName = (c) => {
  if (`_name` in c) {
    return c._name;
  } else {
    return c.name;
  }
};
async function* run(...functions) {
  let input;
  for (const fnOrData of functions) {
    if (typeof fnOrData === `function`) {
      input = fnOrData(input ?? []);
    } else {
      input = resolveToGen(fnOrData);
    }
  }
  if (input === void 0)
    return;
  for await (const v of input) {
    yield v;
  }
}
function prepare(...functions) {
  const r = (source) => {
    return run(source, ...functions);
  };
  return r;
}

// src/data/graphs/index.ts
var graphs_exports = {};
__export(graphs_exports, {
  Directed: () => DirectedGraph_exports,
  Undirected: () => UndirectedGraph_exports
});

// src/data/graphs/UndirectedGraph.ts
var UndirectedGraph_exports = {};
__export(UndirectedGraph_exports, {
  adjacentVertices: () => adjacentVertices,
  connect: () => connect,
  connectTo: () => connectTo,
  createVertex: () => createVertex,
  dumpGraph: () => dumpGraph,
  edgesForVertex: () => edgesForVertex,
  getConnection: () => getConnection,
  getOrCreate: () => getOrCreate,
  graph: () => graph,
  hasConnection: () => hasConnection,
  toAdjacencyMatrix: () => toAdjacencyMatrix,
  updateGraphVertex: () => updateGraphVertex
});
var createVertex = (id) => {
  return {
    id
  };
};
var updateGraphVertex = (graph2, vertex) => {
  const gr = {
    ...graph2,
    vertices: graph2.vertices.set(vertex.id, vertex)
  };
  return gr;
};
var getOrCreate = (graph2, id) => {
  const v = graph2.vertices.get(id);
  if (v !== void 0)
    return { graph: graph2, vertex: v };
  const vv = createVertex(id);
  const gg = updateGraphVertex(graph2, vv);
  return { graph: gg, vertex: vv };
};
function resolveVertex(graph2, idOrVertex) {
  const v = typeof idOrVertex === `string` ? graph2.vertices.get(idOrVertex) : idOrVertex;
  if (v === void 0)
    throw new Error(`Id not found ${idOrVertex}`);
  return v;
}
var hasConnection = (graph2, a, b) => {
  const edge = getConnection(graph2, a, b);
  return edge !== void 0;
};
var getConnection = (graph2, a, b) => {
  const aa = resolveVertex(graph2, a);
  const bb = resolveVertex(graph2, b);
  for (const edge of graph2.edges) {
    if (edge.a == aa.id && edge.b === bb.id)
      return edge;
    if (edge.a == bb.id && edge.b === aa.id)
      return edge;
  }
  return;
};
function connectTo(graph2, a, b, weight) {
  const aResult = getOrCreate(graph2, a);
  graph2 = aResult.graph;
  const bResult = getOrCreate(graph2, b);
  graph2 = bResult.graph;
  let edge = getConnection(graph2, a, b);
  if (edge !== void 0)
    return { graph: graph2, edge };
  edge = {
    a,
    b,
    weight
  };
  const graphChanged = {
    ...graph2,
    edges: [...graph2.edges, edge]
  };
  return { graph: graphChanged, edge };
}
function connect(graph2, options) {
  const { a, weight, b } = options;
  const destinations = Array.isArray(b) ? b : [b];
  for (const destination of destinations) {
    const result = connectTo(graph2, a, destination, weight);
    graph2 = result.graph;
  }
  return graph2;
}
var graph = (...initialConnections) => {
  let g = {
    vertices: immutable(),
    edges: []
  };
  for (const ic of initialConnections) {
    g = connect(g, ic);
  }
  return g;
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
      const connected = hasConnection(graph2, ii, jj);
      if (connected) {
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
  r.push(`Vertices: ${[...graph2.vertices.values()].map((v) => v.id).join(`, `)}`);
  r.push(`Edges:`);
  for (const edge of graph2.edges) {
    r.push(stringForEdge(edge));
  }
  return r;
};
var stringForEdge = (edge) => {
  const weight = edge.weight ? ` (${edge.weight})` : ``;
  return `${edge.a} <-> ${edge.b}${weight}`;
};
function* adjacentVertices(graph2, context) {
  if (context === void 0)
    return;
  const vertex = typeof context === `string` ? graph2.vertices.get(context) : context;
  if (vertex === void 0)
    throw new Error(`Vertex not found ${JSON.stringify(context)}`);
  for (const edge of graph2.edges) {
    if (edge.a === context)
      yield resolveVertex(graph2, edge.b);
    else if (edge.b === context)
      yield resolveVertex(graph2, edge.a);
  }
}
function* edgesForVertex(graph2, context) {
  if (context === void 0)
    return;
  const vertex = typeof context === `string` ? graph2.vertices.get(context) : context;
  if (vertex === void 0)
    throw new Error(`Vertex not found ${JSON.stringify(context)}`);
  for (const edge of graph2.edges) {
    if (edge.a === context)
      yield edge;
    else if (edge.b === context)
      yield edge;
  }
}

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
  chains_exports,
  graphs_exports,
  Correlate_exports,
  Pool_exports,
  piPi,
  data_exports
};
