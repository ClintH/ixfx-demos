import {
  resolveEl
} from "./chunk-W7ZO7ANV.js";
import {
  integerTest,
  nullUndef,
  numberTest,
  throwFromResult,
  throwIntegerTest,
  throwNumberTest
} from "./chunk-UKONBQSB.js";
import {
  getErrorMessage,
  getOrGenerate,
  getOrGenerateSync,
  resolveLogOption
} from "./chunk-NVHYT2TT.js";
import {
  __export
} from "./chunk-ERASX3TW.js";

// src/Events.ts
var Events_exports = {};
__export(Events_exports, {
  SimpleEventEmitter: () => SimpleEventEmitter
});

// src/Text.ts
var Text_exports = {};
__export(Text_exports, {
  abbreviate: () => abbreviate,
  afterMatch: () => afterMatch,
  between: () => between,
  betweenChomp: () => betweenChomp,
  countCharsFromStart: () => countCharsFromStart,
  htmlEntities: () => htmlEntities,
  indexOfCharCode: () => indexOfCharCode,
  lineSpan: () => lineSpan,
  omitChars: () => omitChars,
  random: () => string,
  segmentsFromEnd: () => stringSegmentsFromEnd,
  splitByLength: () => splitByLength,
  splitRanges: () => splitRanges,
  startsEnds: () => startsEnds,
  toStringAbbreviate: () => toStringAbbreviate,
  untilMatch: () => untilMatch,
  unwrap: () => unwrap
});

// src/random/Types.ts
var defaultRandom = Math.random;

// src/random/String.ts
var string = (lengthOrOptions = 5) => {
  const options = typeof lengthOrOptions === `number` ? { length: lengthOrOptions } : lengthOrOptions;
  const calculate = options.source ?? defaultRandom;
  return calculate().toString(36).slice(2, length + 2);
};

// src/generators/index.ts
var generators_exports = {};
__export(generators_exports, {
  Async: () => IterableAsync_exports,
  Chain: () => chain_exports,
  Sync: () => IterableSync_exports,
  count: () => count,
  delayLoop: () => delayLoop,
  interval: () => interval,
  numericPercent: () => numericPercent,
  numericRange: () => numericRange,
  numericRangeRaw: () => numericRangeRaw,
  pingPong: () => pingPong,
  pingPongPercent: () => pingPongPercent,
  randomUniqueInteger: () => integerUniqueGen,
  stringSegmentsFromEnd: () => stringSegmentsFromEnd
});

// src/modulation/PingPong.ts
var pingPongPercent = function(interval2 = 0.1, lower, upper, start, rounding) {
  if (lower === void 0)
    lower = 0;
  if (upper === void 0)
    upper = 1;
  if (start === void 0)
    start = lower;
  throwNumberTest(interval2, `bipolar`, `interval`);
  throwNumberTest(upper, `bipolar`, `end`);
  throwNumberTest(start, `bipolar`, `offset`);
  throwNumberTest(lower, `bipolar`, `start`);
  return pingPong(interval2, lower, upper, start, rounding);
};
var pingPong = function* (interval2, lower, upper, start, rounding) {
  if (lower === void 0)
    throw new Error(`Parameter 'lower' is undefined`);
  if (interval2 === void 0) {
    throw new Error(`Parameter 'interval' is undefined`);
  }
  if (upper === void 0)
    throw new Error(`Parameter 'upper' is undefined`);
  if (rounding === void 0 && interval2 <= 1 && interval2 >= 0) {
    rounding = 10 / interval2;
  } else if (rounding === void 0)
    rounding = 1234;
  if (Number.isNaN(interval2))
    throw new Error(`interval parameter is NaN`);
  if (Number.isNaN(lower))
    throw new Error(`lower parameter is NaN`);
  if (Number.isNaN(upper))
    throw new Error(`upper parameter is NaN`);
  if (Number.isNaN(start))
    throw new Error(`upper parameter is NaN`);
  if (lower >= upper)
    throw new Error(`lower must be less than upper`);
  if (interval2 === 0)
    throw new Error(`Interval cannot be zero`);
  const distance = upper - lower;
  if (Math.abs(interval2) >= distance) {
    throw new Error(`Interval should be between -${distance} and ${distance}`);
  }
  let incrementing = interval2 > 0;
  upper = Math.floor(upper * rounding);
  lower = Math.floor(lower * rounding);
  interval2 = Math.floor(Math.abs(interval2 * rounding));
  if (interval2 === 0) {
    throw new Error(`Interval is zero (rounding: ${rounding})`);
  }
  if (start === void 0)
    start = lower;
  else
    start = Math.floor(start * rounding);
  if (start > upper || start < lower) {
    throw new Error(
      `Start (${start / rounding}) must be within lower (${lower / rounding}) and upper (${upper / rounding})`
    );
  }
  let v = start;
  yield v / rounding;
  let firstLoop = true;
  while (true) {
    v = v + (incrementing ? interval2 : -interval2);
    if (incrementing && v >= upper) {
      incrementing = false;
      v = upper;
      if (v === upper && firstLoop) {
        v = lower;
        incrementing = true;
      }
    } else if (!incrementing && v <= lower) {
      incrementing = true;
      v = lower;
      if (v === lower && firstLoop) {
        v = upper;
        incrementing = false;
      }
    }
    yield v / rounding;
    firstLoop = false;
  }
};

// src/generators/IterableAsync.ts
var IterableAsync_exports = {};
__export(IterableAsync_exports, {
  chunks: () => chunks,
  concat: () => concat,
  dropWhile: () => dropWhile,
  equals: () => equals,
  every: () => every,
  fill: () => fill,
  filter: () => filter,
  find: () => find,
  flatten: () => flatten,
  forEach: () => forEach,
  fromArray: () => fromArray,
  fromIterable: () => fromIterable,
  map: () => map,
  max: () => max,
  min: () => min,
  range: () => range,
  reduce: () => reduce,
  slice: () => slice,
  some: () => some,
  takeWhile: () => takeWhile,
  toArray: () => toArray,
  unique: () => unique,
  zip: () => zip
});

// src/flow/IntervalType.ts
function intervalToMs(interval2, defaultNumber) {
  if (isInterval(interval2)) {
    if (typeof interval2 === `number`)
      return interval2;
    let ms = interval2.millis ?? 0;
    ms += (interval2.hours ?? 0) * 60 * 60 * 1e3;
    ms += (interval2.mins ?? 0) * 60 * 1e3;
    ms += (interval2.secs ?? 0) * 1e3;
    return ms;
  } else {
    if (typeof defaultNumber !== `undefined`)
      return defaultNumber;
    throw new Error(`Not a valid interval: ${interval2}`);
  }
}
function isInterval(interval2) {
  if (interval2 === void 0)
    return false;
  if (interval2 === null)
    return false;
  if (typeof interval2 === `number`) {
    if (Number.isNaN(interval2))
      return false;
    if (!Number.isFinite(interval2))
      return false;
    return true;
  } else if (typeof interval2 !== `object`)
    return false;
  const hasMillis = `millis` in interval2;
  const hasSecs = `secs` in interval2;
  const hasMins = `mins` in interval2;
  const hasHours = `hours` in interval2;
  if (hasMillis && !numberTest(interval2.millis)[0])
    return false;
  if (hasSecs && !numberTest(interval2.secs)[0])
    return false;
  if (hasMins && !numberTest(interval2.mins)[0])
    return false;
  if (hasHours && !numberTest(interval2.hours)[0])
    return false;
  if (hasMillis || hasSecs || hasHours || hasMins)
    return true;
  return false;
}

// src/flow/Sleep.ts
if (typeof window === `undefined` || !(`requestAnimationFrame` in window)) {
  if (typeof window === `undefined`) {
    globalThis.requestAnimationFrame = setImmediate;
  }
}
var sleep = (optsOrMillis) => {
  const timeoutMs = intervalToMs(optsOrMillis, 1);
  const signal = optsOrMillis.signal;
  const value2 = optsOrMillis.value;
  throwNumberTest(timeoutMs, `positive`, `timeoutMs`);
  if (timeoutMs === 0) {
    return new Promise(
      (resolve) => requestAnimationFrame((_) => {
        resolve(value2);
      })
    );
  } else {
    return new Promise((resolve, reject) => {
      const onAbortSignal = () => {
        signal?.removeEventListener(`abort`, onAbortSignal);
        reject(new Error(signal.reason));
      };
      if (signal) {
        signal.addEventListener(`abort`, onAbortSignal);
      }
      setTimeout(() => {
        if (signal?.aborted) {
          reject(signal.reason);
          return;
        }
        signal?.removeEventListener(`abort`, onAbortSignal);
        resolve(value2);
      }, timeoutMs);
    });
  }
};

// src/generators/IterableAsync.ts
async function* fromArray(array) {
  for (const v of array) {
    yield v;
    await sleep(1);
  }
}
async function* fromIterable(iterable) {
  for (const v of iterable) {
    yield v;
    await sleep(1);
  }
}
async function* chunks(it, size) {
  let buffer = [];
  for await (const v of it) {
    buffer.push(v);
    if (buffer.length === size) {
      yield buffer;
      buffer = [];
    }
  }
  if (buffer.length > 0)
    yield buffer;
}
async function* concat(...its) {
  for await (const it of its)
    yield* it;
}
async function* dropWhile(it, f) {
  for await (const v of it) {
    if (!f(v)) {
      yield v;
      break;
    }
  }
  yield* it;
}
async function equals(it1, it2, equality) {
  const iit1 = it1[Symbol.asyncIterator]();
  const iit2 = it2[Symbol.asyncIterator]();
  while (true) {
    const index1 = await iit1.next();
    const index2 = await iit2.next();
    if (equality !== void 0) {
      if (!equality(index1.value, index2.value))
        return false;
    } else if (index1.value !== index2.value)
      return false;
    if (index1.done ?? index2.done)
      return index1.done && index2.done;
  }
}
async function every(it, f) {
  let ok = true;
  for await (const v of it)
    ok = ok && f(v);
  return ok;
}
async function* fill(it, v) {
  for await (const _ of it)
    yield v;
}
async function* filter(it, f) {
  for await (const v of it) {
    if (!f(v))
      continue;
    yield v;
  }
}
async function find(it, f) {
  for await (const v of it) {
    if (f(v))
      return v;
  }
}
async function* flatten(it) {
  for await (const v of it) {
    if (Symbol.asyncIterator in v) {
      yield* v;
    } else {
      yield v;
    }
  }
}
async function forEach(it, f) {
  for await (const v of it)
    f(v);
}
async function* map(it, f) {
  for await (const v of it) {
    yield f(v);
  }
}
async function max(it, gt = (a, b) => a > b) {
  let max6;
  for await (const v of it) {
    if (!max6) {
      max6 = v;
      continue;
    }
    max6 = gt(max6, v) ? max6 : v;
  }
  return max6;
}
async function min(it, gt = (a, b) => a > b) {
  let min6;
  for await (const v of it) {
    if (!min6) {
      min6 = v;
      continue;
    }
    min6 = gt(min6, v) ? v : min6;
  }
  return min6;
}
async function* range(start, length2) {
  for (let index = 0; index < length2; index++) {
    yield start++;
  }
}
async function reduce(it, f, start) {
  for await (const v of it)
    start = f(start, v);
  return start;
}
async function* slice(it, start = 0, end = Number.POSITIVE_INFINITY) {
  const iit = it[Symbol.asyncIterator]();
  for (; start > 0; start--, end--)
    await iit.next();
  for await (const v of it) {
    if (end-- > 0) {
      yield v;
    } else {
      break;
    }
  }
}
async function some(it, f) {
  for await (const v of it) {
    if (f(v))
      return true;
  }
  return false;
}
async function* takeWhile(it, f) {
  for await (const v of it) {
    if (!f(v))
      return;
    yield v;
  }
}
async function toArray(it, count2 = Number.POSITIVE_INFINITY) {
  const result = [];
  const iterator = it[Symbol.asyncIterator]();
  while (result.length < count2) {
    const r = await iterator.next();
    if (r.done)
      break;
    result.push(r.value);
  }
  return result;
}
async function* unique(it, f = (id) => id) {
  const buffer = [];
  for await (const v of it) {
    const fv = f(v);
    if (buffer.includes(fv))
      continue;
    buffer.push(fv);
    yield v;
  }
}
async function* zip(...its) {
  const iits = its.map((it) => it[Symbol.asyncIterator]());
  while (true) {
    const vs = await Promise.all(iits.map((it) => it.next()));
    if (vs.some((v) => v.done))
      return;
    yield vs.map((v) => v.value);
  }
}

// src/generators/IterableSync.ts
var IterableSync_exports = {};
__export(IterableSync_exports, {
  chunks: () => chunks2,
  chunksOverlapping: () => chunksOverlapping,
  concat: () => concat2,
  dropWhile: () => dropWhile2,
  equals: () => equals2,
  every: () => every2,
  fill: () => fill2,
  filter: () => filter2,
  find: () => find2,
  first: () => first,
  flatten: () => flatten2,
  forEach: () => forEach2,
  last: () => last,
  map: () => map2,
  max: () => max2,
  min: () => min2,
  range: () => range2,
  reduce: () => reduce2,
  slice: () => slice2,
  some: () => some2,
  takeWhile: () => takeWhile2,
  unique: () => unique2,
  uniqueByValue: () => uniqueByValue,
  yieldNumber: () => yieldNumber,
  zip: () => zip2
});

// src/Util.ts
var Util_exports = {};
__export(Util_exports, {
  IterableAsync: () => IterableAsync_exports,
  comparerInverse: () => comparerInverse,
  defaultComparer: () => defaultComparer,
  defaultKeyer: () => defaultKeyer,
  ifNaN: () => ifNaN,
  isFunction: () => isFunction,
  isInteger: () => isInteger,
  isMap: () => isMap,
  isPlainObject: () => isPlainObject,
  isPlainObjectOrPrimitive: () => isPlainObjectOrPrimitive,
  isPowerOfTwo: () => isPowerOfTwo,
  isSet: () => isSet,
  jsComparer: () => jsComparer,
  numericComparer: () => numericComparer,
  relativeDifference: () => relativeDifference,
  roundUpToMultiple: () => roundUpToMultiple,
  runningiOS: () => runningiOS,
  toStringDefault: () => toStringDefault
});
var isFunction = (object) => object instanceof Function;
var isPlainObject = (value2) => {
  if (typeof value2 !== `object` || value2 === null)
    return false;
  const prototype = Object.getPrototypeOf(value2);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value2) && !(Symbol.iterator in value2);
};
var isInteger = (value2) => {
  if (value2 === void 0)
    return false;
  if (typeof value2 === `string`) {
    const v = Number.parseInt(value2);
    if (Number.isNaN(v))
      return false;
    if (v.toString() === value2.toString())
      return true;
    return false;
  }
  if (typeof value2 === `number`) {
    if (Number.isNaN(value2))
      return false;
    if (!Number.isFinite(value2))
      return false;
    if (Math.round(value2) === value2)
      return true;
    return false;
  }
  return false;
};
var isPlainObjectOrPrimitive = (value2) => {
  const t = typeof value2;
  if (t === `symbol`)
    return false;
  if (t === `function`)
    return false;
  if (t === `bigint`)
    return true;
  if (t === `number`)
    return true;
  if (t === `string`)
    return true;
  if (t === `boolean`)
    return true;
  return isPlainObject(value2);
};
var ifNaN = (v, fallback) => {
  if (Number.isNaN(v))
    return fallback;
  if (typeof v !== `number`) {
    throw new TypeError(`v is not a number. Got: ${typeof v}`);
  }
  return v;
};
var isPowerOfTwo = (x) => Math.log2(x) % 1 === 0;
var relativeDifference = (initial) => (v) => v / initial;
var roundUpToMultiple = (v, multiple) => {
  throwFromResult(numberTest(v, `nonZero`, `v`));
  throwFromResult(numberTest(multiple, `nonZero`, `multiple`));
  return Math.ceil(v / multiple) * multiple;
};
var objectToString = Object.prototype.toString;
var toTypeString = (value2) => objectToString.call(value2);
var isMap = (value2) => toTypeString(value2) === `[object Map]`;
var isSet = (value2) => toTypeString(value2) === `[object Set]`;
var toStringDefault = (itemToMakeStringFor) => typeof itemToMakeStringFor === `string` ? itemToMakeStringFor : JSON.stringify(itemToMakeStringFor);
var runningiOS = () => [
  `iPad Simulator`,
  `iPhone Simulator`,
  `iPod Simulator`,
  `iPad`,
  `iPhone`,
  `iPod`
].includes(navigator.platform) || // iPad on iOS 13 detection
navigator.userAgent.includes(`Mac`) && `ontouchend` in document;
var numericComparer = (x, y) => {
  if (x === y)
    return 0;
  if (x > y)
    return 1;
  return -1;
};
var jsComparer = (x, y) => {
  if (x === void 0 && y === void 0)
    return 0;
  if (x === void 0)
    return 1;
  if (y === void 0)
    return -1;
  const xString = defaultToString(x);
  const yString = defaultToString(y);
  if (xString < yString)
    return -1;
  if (xString > yString)
    return 1;
  return 0;
};
var defaultComparer = (x, y) => {
  if (typeof x === `number` && typeof y === `number`) {
    return numericComparer(x, y);
  }
  return jsComparer(x, y);
};
var comparerInverse = (comparer) => {
  return (x, y) => {
    const v = comparer(x, y);
    return v * -1;
  };
};
var defaultKeyer = (a) => {
  return typeof a === `string` ? a : JSON.stringify(a);
};
var defaultToString = (object) => {
  if (object === null)
    return `null`;
  if (typeof object === `boolean` || typeof object === `number`) {
    return object.toString();
  }
  if (typeof object === `string`)
    return object;
  if (typeof object === `symbol`)
    throw new TypeError(`Symbol cannot be converted to string`);
  return JSON.stringify(object);
};

// src/iterable/SliceSync.ts
function* slice2(it, start = 0, end = Number.POSITIVE_INFINITY) {
  const iit = it[Symbol.iterator]();
  for (; start > 0; start--, end--)
    iit.next();
  for (const v of it) {
    if (end-- > 0) {
      yield v;
    } else {
      break;
    }
  }
}

// src/generators/IterableSync.ts
function* uniqueByValue(input, toString4 = toStringDefault, seen = /* @__PURE__ */ new Set()) {
  for (const v of input) {
    const key = toString4(v);
    if (seen.has(key))
      continue;
    seen.add(key);
    yield v;
  }
}
function yieldNumber(generator, defaultValue) {
  return () => {
    const v = generator.next().value;
    if (v === void 0)
      return defaultValue;
    return v;
  };
}
function first(it) {
  for (const value2 of it) {
    return value2;
  }
}
function last(it) {
  let returnValue;
  for (const value2 of it) {
    returnValue = value2;
  }
  return returnValue;
}
function* chunksOverlapping(it, size) {
  if (size <= 1)
    throw new Error(`Size should be at least 2`);
  let buffer = [];
  for (const v of it) {
    buffer.push(v);
    if (buffer.length === size) {
      yield buffer;
      buffer = [buffer.at(-1)];
    }
  }
  if (buffer.length <= 1)
    return;
  if (buffer.length > 0)
    yield buffer;
}
function* chunks2(it, size) {
  let buffer = [];
  for (const v of it) {
    buffer.push(v);
    if (buffer.length === size) {
      yield buffer;
      buffer = [];
    }
  }
  if (buffer.length > 0)
    yield buffer;
}
function* concat2(...its) {
  for (const it of its)
    yield* it;
}
function* dropWhile2(it, f) {
  for (const v of it) {
    if (!f(v)) {
      yield v;
      break;
    }
  }
  yield* it;
}
function equals2(it1, it2, equality) {
  while (true) {
    const index1 = it1.next(), index2 = it2.next();
    if (equality !== void 0) {
      if (!equality(index1.value, index2.value))
        return false;
    } else if (index1.value !== index2.value)
      return false;
    if (index1.done ?? index2.done)
      return index1.done && index2.done;
  }
}
function every2(it, f) {
  let ok = true;
  for (const v of it)
    ok = ok && f(v);
  return ok;
}
function* fill2(it, v) {
  for (const _ of it)
    yield v;
}
function forEach2(it, f) {
  for (const v of it)
    f(v);
}
function* filter2(it, f) {
  for (const v of it) {
    if (!f(v))
      continue;
    yield v;
  }
}
function find2(it, f) {
  for (const v of it) {
    if (f(v))
      return v;
  }
}
function* flatten2(it) {
  for (const v of it) {
    if (Symbol.iterator in v) {
      yield* v;
    } else {
      yield v;
    }
  }
}
function* map2(it, f) {
  for (const v of it) {
    yield f(v);
  }
}
function max2(it, gt = (a, b) => a > b) {
  let max6;
  for (const v of it) {
    if (!max6) {
      max6 = v;
      continue;
    }
    max6 = gt(max6, v) ? max6 : v;
  }
  return max6;
}
function min2(it, gt = (a, b) => a > b) {
  let min6;
  for (const v of it) {
    if (!min6) {
      min6 = v;
      continue;
    }
    min6 = gt(min6, v) ? v : min6;
  }
  return min6;
}
function* range2(start, length2) {
  for (let index = 0; index < length2; index++) {
    yield start++;
  }
}
function reduce2(it, f, start) {
  for (const v of it)
    start = f(start, v);
  return start;
}
function some2(it, f) {
  for (const v of it) {
    if (f(v))
      return true;
  }
  return false;
}
function* takeWhile2(it, f) {
  for (const v of it) {
    if (!f(v))
      return;
    yield v;
  }
}
function* unique2(iterable) {
  const buffer = [];
  let itera = [];
  itera = Array.isArray(iterable) ? iterable : [iterable];
  for (const it of itera) {
    for (const v of it) {
      if (buffer.includes(v))
        continue;
      buffer.push(v);
      yield v;
    }
  }
}
function* zip2(...its) {
  const iits = its.map((it) => it[Symbol.iterator]());
  while (true) {
    const vs = iits.map((it) => it.next());
    if (vs.some((v) => v.done))
      return;
    yield vs.map((v) => v.value);
  }
}

// src/generators/chain/index.ts
var chain_exports = {};
__export(chain_exports, {
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
  run: () => run2,
  runN: () => runN,
  single: () => single,
  synchronise: () => synchronise,
  tick: () => tick
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
  forEach: () => forEach3,
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
var clamp = (value2, min6 = 0, max6 = 1) => {
  if (Number.isNaN(value2))
    throw new Error(`'value' parameter is NaN`);
  if (Number.isNaN(min6))
    throw new Error(`'min' parameter is NaN`);
  if (Number.isNaN(max6))
    throw new Error(`'max' parameter is NaN`);
  if (value2 < min6)
    return min6;
  if (value2 > max6)
    return max6;
  return value2;
};
var clampIndex = (v, arrayOrLength) => {
  if (!Number.isInteger(v)) {
    throw new TypeError(`v parameter must be an integer (${v})`);
  }
  const length2 = Array.isArray(arrayOrLength) ? arrayOrLength.length : arrayOrLength;
  if (!Number.isInteger(length2)) {
    throw new TypeError(
      `length parameter must be an integer (${length2}, ${typeof length2})`
    );
  }
  v = Math.round(v);
  if (v < 0)
    return 0;
  if (v >= length2)
    return length2 - 1;
  return v;
};

// src/flow/Timer.ts
function hasElapsed(elapsed) {
  const t = relativeTimer(intervalToMs(elapsed, 0), { timer: msElapsedTimer() });
  return () => t.isDone;
}
var frequencyTimerSource = (frequency) => () => frequencyTimer(frequency, { timer: msElapsedTimer() });
var relativeTimer = (total3, opts = {}) => {
  const clampValue = opts.clampValue ?? false;
  const wrapValue = opts.wrapValue ?? false;
  if (clampValue && wrapValue)
    throw new Error(`clampValue and wrapValue cannot both be enabled`);
  let modulationAmount = 1;
  const timer = opts.timer ?? msElapsedTimer();
  const computeElapsed = () => {
    let v = timer.elapsed / (total3 * modulationAmount);
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
function progress(duration2, opts = {}) {
  const totalMs = intervalToMs(duration2);
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
    const wrap3 = {
      id: this.#id + `-` + this.#counter,
      handler,
      once: once2
    };
    this.#handlers.push(wrap3);
    return wrap3.id;
  }
  remove(id) {
    const length2 = this.#handlers.length;
    this.#handlers = this.#handlers.filter((handler) => handler.id !== id);
    return this.#handlers.length !== length2;
  }
  notify(value2) {
    for (const handler of this.#handlers) {
      handler.handler(value2);
      if (handler.once) {
        this.remove(handler.id);
      }
    }
  }
  clear() {
    this.#handlers = [];
  }
};

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

// src/collections/arrays/index.ts
var arrays_exports = {};
__export(arrays_exports, {
  additionalValues: () => additionalValues,
  average: () => average,
  averageWeighted: () => averageWeighted,
  chunks: () => chunks3,
  compareValues: () => compareValues,
  compareValuesEqual: () => compareValuesEqual,
  contains: () => contains,
  containsDuplicateInstances: () => containsDuplicateInstances,
  containsDuplicateValues: () => containsDuplicateValues,
  cycle: () => cycle,
  dotProduct: () => dotProduct,
  ensureLength: () => ensureLength,
  filterAB: () => filterAB,
  filterBetween: () => filterBetween,
  flatten: () => flatten3,
  groupBy: () => groupBy,
  guardArray: () => guardArray,
  guardIndex: () => guardIndex,
  interleave: () => interleave,
  intersection: () => intersection,
  isEqual: () => isEqual,
  max: () => max3,
  maxFast: () => maxFast,
  maxIndex: () => maxIndex,
  mergeByKey: () => mergeByKey2,
  min: () => min3,
  minFast: () => minFast,
  minIndex: () => minIndex,
  minMaxAvg: () => minMaxAvg,
  randomElement: () => randomElement,
  randomElementWeightedSource: () => randomElementWeightedSource,
  randomIndex: () => randomIndex,
  randomPluck: () => randomPluck,
  reducePairwise: () => reducePairwise,
  remove: () => remove,
  sample: () => sample,
  shuffle: () => shuffle,
  sortByNumericProperty: () => sortByNumericProperty,
  total: () => total,
  totalFast: () => totalFast,
  unique: () => unique3,
  until: () => until,
  validNumbers: () => validNumbers,
  valuesEqual: () => valuesEqual,
  weight: () => weight,
  without: () => without,
  withoutUndefined: () => withoutUndefined,
  zip: () => zip3
});

// src/collections/Map/MapFns.ts
var getClosestIntegerKey = (data, target) => {
  target = Math.round(target);
  if (data.has(target)) {
    return target;
  } else {
    let offset = 1;
    while (offset < 1e3) {
      if (data.has(target - offset))
        return target - offset;
      else if (data.has(target + offset))
        return target + offset;
      offset++;
    }
    throw new Error(`Could not find target ${target}`);
  }
};
var getFromKeys = (data, keys) => {
  for (const key of keys) {
    if (data.has(key))
      return data.get(key);
  }
};
var hasKeyValue = (map3, key, value2, comparer) => {
  if (!map3.has(key))
    return false;
  const values = [...map3.values()];
  return values.some((v) => comparer(v, value2));
};
var deleteByValue = (map3, value2, comparer = isEqualDefault) => {
  for (const entry of Object.entries(map3)) {
    if (comparer(entry[1], value2)) {
      map3.delete(entry[0]);
    }
  }
};
var firstEntryByIterablePredicate = (map3, predicate) => {
  for (const entry of map3.entries()) {
    if (predicate(entry[1], entry[0]))
      return entry;
  }
};
var firstEntryByIterableValue = (map3, value2, isEqual2 = isEqualDefault) => {
  for (const entry of map3.entries()) {
    if (isEqual2(entry[1], value2))
      return entry;
  }
};
var addKeepingExisting = (set2, hasher, ...values) => {
  const s = set2 === void 0 ? /* @__PURE__ */ new Map() : new Map(set2);
  for (const v of values) {
    const hashResult = hasher(v);
    if (s.has(hashResult))
      continue;
    s.set(hashResult, v);
  }
  return s;
};
var sortByValue = (map3, comparer) => {
  const f = comparer ?? defaultComparer;
  [...map3.entries()].sort((a, b) => f(a[1], b[1]));
};
var sortByValueProperty = (map3, property, compareFunction) => {
  const cfn = typeof compareFunction === `undefined` ? defaultComparer : compareFunction;
  return [...map3.entries()].sort((aE, bE) => {
    const a = aE[1];
    const b = bE[1];
    return cfn(a[property], b[property]);
  });
};
var hasAnyValue = (map3, value2, comparer) => {
  const entries = [...map3.entries()];
  return entries.some((kv) => comparer(kv[1], value2));
};
function* filter3(map3, predicate) {
  for (const v of map3.values()) {
    if (predicate(v))
      yield v;
  }
}
var toArray2 = (map3) => [...map3.values()];
var fromIterable2 = (data, keyFunction = toStringDefault, allowOverwrites = false) => {
  const m = /* @__PURE__ */ new Map();
  for (const d of data) {
    const id = keyFunction(d);
    if (m.has(id) && !allowOverwrites) {
      throw new Error(
        `id ${id} is already used and new data will overwrite it. `
      );
    }
    m.set(id, d);
  }
  return m;
};
var fromObject = (data) => {
  const map3 = /* @__PURE__ */ new Map();
  if (Array.isArray(data)) {
    for (const d of data)
      addObject(map3, d);
  } else {
    addObject(map3, data);
  }
  return map3;
};
var addObject = (map3, data) => {
  const entries = Object.entries(data);
  for (const [key, value2] of entries) {
    map3.set(key, value2);
  }
};
var find3 = (map3, predicate) => [...map3.values()].find((v) => predicate(v));
var mapToObjectTransform = (m, valueTransform) => (
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, unicorn/no-array-reduce
  [...m].reduce((object, [key, value2]) => {
    const t = valueTransform(value2);
    object[key] = t;
    return object;
  }, {})
);
var zipKeyValue = (keys, values) => {
  if (keys.length !== values.length) {
    throw new Error(`Keys and values arrays should be same length`);
  }
  return Object.fromEntries(keys.map((k, index) => [k, values[index]]));
};
var transformMap = (source, transformer) => new Map(Array.from(source, (v) => [v[0], transformer(v[1], v[0])]));
var toObject = (m) => (
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  [...m].reduce((object, [key, value2]) => {
    object[key] = value2;
    return object;
  }, {})
);
var mapToArray = (m, transformer) => [...m.entries()].map((x) => transformer(x[0], x[1]));
var mergeByKey = (reconcile, ...maps) => {
  const result = /* @__PURE__ */ new Map();
  for (const m of maps) {
    for (const [mk, mv] of m) {
      let v = result.get(mk);
      v = v ? reconcile(v, mv) : mv;
      result.set(mk, v);
    }
  }
  return result;
};

// src/random/WeightedIndex.ts
var weightedIndex = (weightings, rand = defaultRandom) => {
  const precompute = [];
  let total3 = 0;
  for (let index = 0; index < weightings.length; index++) {
    total3 += weightings[index];
    precompute[index] = total3;
  }
  if (total3 !== 1)
    throw new Error(`Weightings should add up to 1. Got: ${total3}`);
  return () => {
    const v = rand();
    for (let index = 0; index < precompute.length; index++) {
      if (v <= precompute[index])
        return index;
    }
    throw new Error(`Bug: weightedIndex could not select index`);
  };
};

// src/collections/GuardArray.ts
var guardArray = (array, name = `?`) => {
  if (array === void 0) {
    throw new TypeError(`Param '${name}' is undefined. Expected array.`);
  }
  if (array === null) {
    throw new TypeError(`Param '${name}' is null. Expected array.`);
  }
  if (!Array.isArray(array)) {
    throw new TypeError(`Param '${name}' not an array as expected`);
  }
};

// src/collections/GuardIndex.ts
var guardIndex = (array, index, name = `index`) => {
  guardArray(array);
  throwIntegerTest(index, `positive`, name);
  if (index > array.length - 1) {
    throw new Error(
      `'${name}' ${index} beyond array max of ${array.length - 1}`
    );
  }
};

// src/collections/arrays/ValuesEqual.ts
var valuesEqual = (array, equality) => {
  if (!Array.isArray(array))
    throw new Error(`Param 'array' is not an array.`);
  if (array.length === 0)
    return true;
  const eq = equality ?? isEqualValueDefault;
  const a = array[0];
  const r = array.some((v) => !eq(a, v));
  if (r)
    return false;
  return true;
};

// src/collections/FilterBetween.ts
var filterBetween = (array, predicate, startIndex, endIndex) => {
  guardArray(array);
  if (typeof startIndex === `undefined`)
    startIndex = 0;
  if (typeof endIndex === `undefined`)
    endIndex = array.length;
  guardIndex(array, startIndex, `startIndex`);
  guardIndex(array, endIndex - 1, `endIndex`);
  const t = [];
  for (let index = startIndex; index < endIndex; index++) {
    if (predicate(array[index], index, array))
      t.push(array[index]);
  }
  return t;
};

// src/collections/MinMaxAvg.ts
var minMaxAvg = (data, opts = {}) => {
  if (data === void 0)
    throw new Error(`'data' is undefined`);
  if (!Array.isArray(data)) {
    if (`next` in data) {
      if (opts.startIndex || opts.endIndex) {
        data = slice2(data, opts.startIndex, opts.endIndex);
      }
      let total4 = 0;
      let min6 = Number.MAX_SAFE_INTEGER;
      let max6 = Number.MIN_SAFE_INTEGER;
      let samples = 0;
      for (const v of data) {
        if (typeof v !== `number`) {
          throw new TypeError(`Generator should yield numbers. Got: ${typeof v}`);
        }
        total4 += v;
        samples++;
        min6 = Math.min(min6, v);
        max6 = Math.max(max6, v);
      }
      return {
        avg: total4 / samples,
        total: total4,
        max: max6,
        min: min6
      };
    } else {
      throw new Error(`'data' parameter is neither array or iterable`);
    }
  }
  if (data.length === 0) {
    return {
      total: 0,
      min: 0,
      max: 0,
      avg: 0
    };
  }
  const startIndex = opts.startIndex ?? 0;
  const endIndex = opts.endIndex ?? data.length;
  const validNumbers2 = filterBetween(
    data,
    (d) => typeof d === `number` && !Number.isNaN(d),
    startIndex,
    endIndex
  );
  const total3 = validNumbers2.reduce((accumulator, v) => accumulator + v, 0);
  return {
    total: total3,
    max: Math.max(...validNumbers2),
    min: Math.min(...validNumbers2),
    avg: total3 / validNumbers2.length
  };
};

// src/collections/arrays/NumericArrays.ts
var weight = (data, fn) => {
  const f = fn ?? ((x) => x);
  return validNumbers(data).map(
    (v, index) => v * f(index / (validNumbers.length - 1))
  );
};
var validNumbers = (data) => data.filter((d) => typeof d === `number` && !Number.isNaN(d));
var dotProduct = (values) => {
  let r = 0;
  const length2 = values[0].length;
  for (let index = 0; index < length2; index++) {
    let t = 0;
    for (const [p, value2] of values.entries()) {
      if (p === 0)
        t = value2[index];
      else {
        t *= value2[index];
      }
    }
    r += t;
  }
  return r;
};
var average = (data) => {
  if (data === void 0)
    throw new Error(`data parameter is undefined`);
  const valid = validNumbers(data);
  const total3 = valid.reduce((accumulator, v) => accumulator + v, 0);
  return total3 / valid.length;
};
var min3 = (data) => Math.min(...validNumbers(data));
var maxIndex = (data) => (
  // eslint-disable-next-line unicorn/no-array-reduce
  data.reduce(
    (bestIndex, value2, index, array) => value2 > array[bestIndex] ? index : bestIndex,
    0
  )
);
var minIndex = (...data) => (
  // eslint-disable-next-line unicorn/no-array-reduce
  data.reduce(
    (bestIndex, value2, index, array) => value2 < array[bestIndex] ? index : bestIndex,
    0
  )
);
var max3 = (data) => Math.max(...validNumbers(data));
var total = (data) => (
  // eslint-disable-next-line unicorn/no-array-reduce
  data.reduce((previous, current) => {
    if (typeof current !== `number`)
      return previous;
    if (Number.isNaN(current))
      return previous;
    if (Number.isFinite(current))
      return previous;
    return previous + current;
  }, 0)
);
var maxFast = (data) => {
  let m = Number.MIN_SAFE_INTEGER;
  for (const datum of data) {
    m = Math.max(m, datum);
  }
  return m;
};
var totalFast = (data) => {
  let m = 0;
  for (const datum of data) {
    m += datum;
  }
  return m;
};
var minFast = (data) => {
  let m = Number.MIN_SAFE_INTEGER;
  for (const datum of data) {
    m = Math.min(m, datum);
  }
  return m;
};

// src/collections/ArrayCycle.ts
var cycle = (options) => {
  const opts = [...options];
  let index = 0;
  const next2 = () => {
    index++;
    if (index === opts.length)
      index = 0;
    return value2();
  };
  const prev = () => {
    index--;
    if (index === -1)
      index = opts.length - 1;
    return value2();
  };
  const value2 = () => {
    return opts.at(index);
  };
  const select = (indexOrValue) => {
    if (typeof indexOrValue === `number`) {
      index = indexOrValue;
    } else {
      const found = opts.indexOf(indexOrValue);
      if (found === -1)
        throw new Error(`Could not find value`);
      index = found;
    }
  };
  const toArray3 = () => [...opts];
  return { toArray: toArray3, next: next2, prev, get current() {
    return value2();
  }, select };
};

// src/collections/arrays/Zip.ts
var zip3 = (...arrays) => {
  if (arrays.some((a) => !Array.isArray(a))) {
    throw new Error(`All parameters must be an array`);
  }
  const lengths = arrays.map((a) => a.length);
  if (!valuesEqual(lengths)) {
    throw new Error(`Arrays must be of same length`);
  }
  const returnValue = [];
  const length2 = lengths[0];
  for (let index = 0; index < length2; index++) {
    returnValue.push(arrays.map((a) => a[index]));
  }
  return returnValue;
};

// src/collections/arrays/AverageWeighted.ts
var averageWeighted = (data, weightings) => {
  if (typeof weightings === `function`)
    weightings = weight(data, weightings);
  const ww = zip3(data, weightings);
  const [totalV, totalW] = ww.reduce(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    (accumulator, v) => [accumulator[0] + v[0] * v[1], accumulator[1] + v[1]],
    [0, 0]
  );
  return totalV / totalW;
};

// src/collections/arrays/SortByNumericProperty.ts
var sortByNumericProperty = (data, propertyName) => [...data].sort((a, b) => {
  guardArray(data, `data`);
  const av = a[propertyName];
  const bv = b[propertyName];
  if (av < bv)
    return -1;
  if (av > bv)
    return 1;
  return 0;
});

// src/collections/Iterables.ts
var Iterables_exports = {};
__export(Iterables_exports, {
  compareValues: () => compareValues,
  compareValuesEqual: () => compareValuesEqual,
  max: () => max4,
  min: () => min4
});
var max4 = (iterable, scorer) => {
  let highestValue;
  let highestScore = Number.MIN_SAFE_INTEGER;
  for (const value2 of iterable) {
    const score = scorer(value2);
    if (score >= highestScore) {
      highestScore = score;
      highestValue = value2;
    }
  }
  return highestValue;
};
var min4 = (iterable, scorer) => {
  let lowestValue;
  let lowestScore = Number.MAX_SAFE_INTEGER;
  for (const value2 of iterable) {
    const score = scorer(value2);
    if (score <= lowestScore) {
      lowestScore = score;
      lowestValue = value2;
    }
  }
  return lowestValue;
};
var compareValuesEqual = (iterableA, iterableB, eq = isEqualDefault) => {
  const returnValue = compareValues(iterableA, iterableB, eq);
  return returnValue.a.length === 0 && returnValue.b.length === 0;
};
var compareValues = (a, b, eq = isEqualDefault) => {
  const shared = [];
  const aUnique = [];
  const bUnique = [];
  for (const element of a) {
    let seenInB = false;
    for (const element_ of b) {
      if (eq(element, element_)) {
        seenInB = true;
        break;
      }
    }
    if (seenInB) {
      shared.push(element);
    } else {
      aUnique.push(element);
    }
  }
  for (const element of b) {
    let seenInA = false;
    for (const element_ of a) {
      if (eq(element, element_)) {
        seenInA = true;
      }
    }
    if (!seenInA) {
      bUnique.push(element);
    }
  }
  return {
    shared,
    a: aUnique,
    b: bUnique
  };
};

// src/collections/arrays/index.ts
var intersection = (arrayA, arrayB, equality = isEqualDefault) => arrayA.filter((valueFromA) => arrayB.some((valueFromB) => equality(valueFromA, valueFromB)));
var flatten3 = (array) => [...array].flat();
var interleave = (...arrays) => {
  if (arrays.some((a) => !Array.isArray(a))) {
    throw new Error(`All parameters must be an array`);
  }
  const lengths = arrays.map((a) => a.length);
  if (!valuesEqual(lengths)) {
    throw new Error(`Arrays must be of same length`);
  }
  const returnValue = [];
  const length2 = lengths[0];
  for (let index = 0; index < length2; index++) {
    for (const array of arrays) {
      returnValue.push(array[index]);
    }
  }
  return returnValue;
};
var ensureLength = (data, length2, expand = `undefined`) => {
  if (data === void 0)
    throw new Error(`Data undefined`);
  if (!Array.isArray(data))
    throw new Error(`data is not an array`);
  if (data.length === length2)
    return [...data];
  if (data.length > length2) {
    return data.slice(0, length2);
  }
  const d = [...data];
  const add3 = length2 - d.length;
  for (let index = 0; index < add3; index++) {
    switch (expand) {
      case `undefined`: {
        d.push(void 0);
        break;
      }
      case `repeat`: {
        d.push(data[index % data.length]);
        break;
      }
      case `first`: {
        d.push(data[0]);
        break;
      }
      case `last`: {
        d.push(data.at(-1));
        break;
      }
    }
  }
  return d;
};
var randomIndex = (array, rand = defaultRandom) => Math.floor(rand() * array.length);
var randomElementWeightedSource = (array, weightings, randomSource = defaultRandom) => {
  if (array.length !== weightings.length)
    throw new Error(`Lengths of 'array' and 'weightings' should be the same.`);
  const r = weightedIndex(weightings, randomSource);
  return () => {
    const index = r();
    return array[index];
  };
};
var randomElement = (array, rand = defaultRandom) => {
  guardArray(array, `array`);
  return array[Math.floor(rand() * array.length)];
};
var randomPluck = (array, mutate = false, rand = defaultRandom) => {
  if (array === void 0)
    throw new Error(`array is undefined`);
  if (!Array.isArray(array))
    throw new Error(`'array' param is not an array`);
  if (array.length === 0)
    return { value: void 0, array: [] };
  const index = randomIndex(array, rand);
  if (mutate) {
    return {
      value: array[index],
      //eslint-disable-next-line functional/immutable-data
      array: array.splice(index, 1)
    };
  } else {
    const t = [...array];
    t.splice(index, 1);
    return {
      value: array[index],
      array: t
    };
  }
};
var shuffle = (dataToShuffle, rand = defaultRandom) => {
  const array = [...dataToShuffle];
  for (let index = array.length - 1; index > 0; index--) {
    const index_ = Math.floor(rand() * (index + 1));
    [array[index], array[index_]] = [array[index_], array[index]];
  }
  return array;
};
var without = (sourceArray, toRemove, comparer = isEqualDefault) => {
  if (Array.isArray(toRemove)) {
    const returnArray = [];
    for (const source of sourceArray) {
      if (!toRemove.some((v) => comparer(source, v))) {
        returnArray.push(source);
      }
    }
    return returnArray;
  } else {
    return sourceArray.filter((v) => !comparer(v, toRemove));
  }
};
var withoutUndefined = (data) => {
  return data.filter((v) => v !== void 0);
};
var until = (data, predicate, initial) => {
  const returnValue = [];
  let total3 = initial;
  for (const datum of data) {
    const [stop, accumulator] = predicate(datum, total3);
    if (stop)
      break;
    total3 = accumulator;
    returnValue.push(datum);
  }
  return returnValue;
};
var remove = (data, index) => {
  if (!Array.isArray(data)) {
    throw new TypeError(`'data' parameter should be an array`);
  }
  guardIndex(data, index, `index`);
  return [...data.slice(0, index), ...data.slice(index + 1)];
};
var groupBy = (array, grouper) => {
  const map3 = /* @__PURE__ */ new Map();
  for (const a of array) {
    const key = grouper(a);
    let existing = map3.get(key);
    if (!existing) {
      existing = [];
      map3.set(key, existing);
    }
    existing.push(a);
  }
  return map3;
};
var sample = (array, amount) => {
  let subsampleSteps = 1;
  if (amount <= 1) {
    const numberOfItems = array.length * amount;
    subsampleSteps = Math.round(array.length / numberOfItems);
  } else {
    subsampleSteps = amount;
  }
  throwIntegerTest(subsampleSteps, `positive`, `amount`);
  if (subsampleSteps > array.length - 1) {
    throw new Error(`Subsample steps exceeds array length`);
  }
  const r = [];
  for (let index = subsampleSteps - 1; index < array.length; index += subsampleSteps) {
    r.push(array[index]);
  }
  return r;
};
function chunks3(array, size) {
  const output = [];
  for (let index = 0; index < array.length; index += size) {
    output.push(array.slice(index, index + size));
  }
  return output;
}
var mergeByKey2 = (keyFunction, reconcile, ...arrays) => {
  const result = /* @__PURE__ */ new Map();
  for (const m of arrays) {
    for (const mv of m) {
      if (mv === void 0)
        continue;
      const mk = keyFunction(mv);
      let v = result.get(mk);
      v = v ? reconcile(v, mv) : mv;
      result.set(mk, v);
    }
  }
  return [...result.values()];
};
var reducePairwise = (array, reducer, initial) => {
  guardArray(array, `arr`);
  if (array.length < 2)
    return initial;
  for (let index = 0; index < array.length - 1; index++) {
    initial = reducer(initial, array[index], array[index + 1]);
  }
  return initial;
};
var filterAB = (data, filter5) => {
  const a = [];
  const b = [];
  for (const datum of data) {
    if (filter5(datum))
      a.push(datum);
    else
      b.push(datum);
  }
  return [a, b];
};
var unique3 = (arrays, comparer = isEqualDefault) => {
  const t = [];
  for (const a of arrays) {
    if (Array.isArray(a)) {
      for (const v of additionalValues(t, a, comparer)) {
        t.push(v);
      }
    } else {
      return [...additionalValues([], arrays, comparer)];
    }
  }
  return t;
};
var containsDuplicateValues = (array, keyFunction = toStringDefault) => {
  if (!Array.isArray(array))
    throw new Error(`Parameter needs to be an array`);
  try {
    const _ = fromIterable2(array, keyFunction);
  } catch {
    return true;
  }
  return false;
};
var containsDuplicateInstances = (array) => {
  if (!Array.isArray(array))
    throw new Error(`Parameter needs to be an array`);
  for (let index = 0; index < array.length; index++) {
    for (let x = 0; x < array.length; x++) {
      if (index === x)
        continue;
      if (array[index] === array[x])
        return true;
    }
  }
  return false;
};
var isEqual = (arrayA, arrayB, isEqual2 = isEqualDefault) => {
  if (!Array.isArray(arrayA))
    throw new Error(`Parameter 'arrayA' is not actually an array`);
  if (!Array.isArray(arrayB))
    throw new Error(`Parameter 'arrayB' is not actually an array`);
  if (arrayA.length !== arrayB.length)
    return false;
  for (let indexA = 0; indexA < arrayA.length; indexA++) {
    if (!isEqual2(arrayA[indexA], arrayB[indexA]))
      return false;
  }
  return true;
};
var contains = (haystack, needles, eq = isEqualDefault) => {
  if (!Array.isArray(haystack)) {
    throw new TypeError(`Expects haystack parameter to be an array`);
  }
  if (!Array.isArray(needles)) {
    throw new TypeError(`Expects needles parameter to be an array`);
  }
  for (const needle of needles) {
    let found = false;
    for (const element of haystack) {
      if (eq(needle, element)) {
        found = true;
        break;
      }
    }
    if (!found) {
      return false;
    }
  }
  return true;
};
function* additionalValues(input, values, eq = isEqualDefault) {
  const yielded = [];
  for (const v of values) {
    const found = input.find((index) => eq(index, v));
    if (!found) {
      const alreadyYielded = yielded.find((ii) => eq(ii, v));
      if (!alreadyYielded) {
        yielded.push(v);
        yield v;
      }
    }
  }
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
  const run3 = async () => {
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
    run: run3,
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
    visited: unique3([sm.visited, [sm.value]])
  });
};
var next = (sm) => {
  const first2 = possibleTargets(sm).at(0);
  if (!first2 || first2.state === null) {
    throw new Error(
      `Not possible to move to a next state from '${sm.value}`
    );
  }
  return to(sm, first2.state);
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
    const value2 = typeof valueOrPromise === `object` ? await valueOrPromise : valueOrPromise;
    if (cancelled) {
      return;
    }
    runState = `scheduled`;
    if (value2 !== void 0 && !value2) {
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
  let run3 = false;
  let success = false;
  return () => {
    if (run3)
      return success;
    run3 = true;
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
  const count2 = opts.count;
  let attempts = 0;
  throwIntegerTest(count2, `aboveZero`, `count`);
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
  while (attempts < count2) {
    attempts++;
    const callbackResult = await callback();
    if (callbackResult !== void 0) {
      return { value: callbackResult, success: true, attempts, elapsed: startedAt() };
    }
    log({
      msg: `retry attempts: ${attempts} t: ${toString(t)}`
    });
    if (attempts >= count2) {
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

// src/collections/queue/QueueFns.ts
var trimQueue = (opts, queue, toAdd) => {
  const potentialLength = queue.length + toAdd.length;
  const capacity = opts.capacity ?? potentialLength;
  const toRemove = potentialLength - capacity;
  const policy = opts.discardPolicy ?? `additions`;
  switch (policy) {
    case `additions`: {
      if (queue.length === 0)
        return toAdd.slice(0, toAdd.length - toRemove);
      if (queue.length === opts.capacity) {
        return queue;
      } else {
        return [...queue, ...toAdd.slice(0, toRemove - 1)];
      }
    }
    case `newer`: {
      if (toRemove >= queue.length) {
        if (queue.length === 0) {
          return [...toAdd.slice(0, capacity - 1), toAdd.at(-1)];
        }
        return toAdd.slice(
          Math.max(0, toAdd.length - capacity),
          Math.min(toAdd.length, capacity) + 1
        );
      } else {
        const countToAdd = Math.max(1, toAdd.length - queue.length);
        const toAddFinal = toAdd.slice(toAdd.length - countToAdd, toAdd.length);
        const toKeep = queue.slice(0, Math.min(queue.length, capacity - 1));
        const t = [...toKeep, ...toAddFinal];
        return t;
      }
    }
    case `older`: {
      return [...queue, ...toAdd].slice(toRemove);
    }
    default: {
      throw new Error(`Unknown overflow policy ${policy}`);
    }
  }
};
var enqueue = (opts, queue, ...toAdd) => {
  if (opts === void 0)
    throw new Error(`opts parameter undefined`);
  const potentialLength = queue.length + toAdd.length;
  const overSize = opts.capacity && potentialLength > opts.capacity;
  const toReturn = overSize ? trimQueue(opts, queue, toAdd) : [...queue, ...toAdd];
  if (opts.capacity && toReturn.length !== opts.capacity && overSize) {
    throw new Error(
      `Bug! Expected return to be at capacity. Return len: ${toReturn.length} capacity: ${opts.capacity} opts: ${JSON.stringify(opts)}`
    );
  }
  if (!opts.capacity && toReturn.length !== potentialLength) {
    throw new Error(
      `Bug! Return length not expected. Return len: ${toReturn.length} expected: ${potentialLength} opts: ${JSON.stringify(opts)}`
    );
  }
  return toReturn;
};
var dequeue = (opts, queue) => {
  if (queue.length === 0)
    throw new Error(`Queue is empty`);
  return queue.slice(1);
};
var peek = (opts, queue) => queue[0];
var isEmpty = (opts, queue) => queue.length === 0;
var isFull = (opts, queue) => {
  if (opts.capacity) {
    return queue.length >= opts.capacity;
  }
  return false;
};

// src/collections/queue/QueueMutable.ts
var QueueMutable = class {
  opts;
  // eslint-disable-next-line functional/prefer-readonly-type
  data;
  eq;
  constructor(opts = {}, data = []) {
    if (opts === void 0)
      throw new Error(`opts parameter undefined`);
    this.opts = opts;
    this.data = data;
    this.eq = opts.eq ?? isEqualDefault;
  }
  clear() {
    this.data = [];
  }
  at(index) {
    if (index >= this.data.length)
      throw new Error(`Index outside bounds of queue`);
    const v = this.data.at(index);
    if (v === void 0)
      throw new Error(`Index appears to be outside range of queue`);
    return v;
  }
  /**
   * Return a copy of the array
   * @returns 
   */
  toArray() {
    return [...this.data];
  }
  enqueue(...toAdd) {
    this.data = enqueue(this.opts, this.data, ...toAdd);
    return this.data.length;
  }
  dequeue() {
    const v = peek(this.opts, this.data);
    if (v === void 0)
      return;
    this.data = dequeue(this.opts, this.data);
    return v;
  }
  /**
   * Remove value from queue, regardless of position.
   * Returns _true_ if something was removed.
   * 
   * See also {@link removeWhere} to remove based on a predicate
   * @param value 
   */
  remove(value2, comparer) {
    const length2 = this.data.length;
    this.data = without(this.data, value2, comparer ?? this.eq);
    return this.data.length !== length2;
  }
  /**
   * Removes values that match `predicate`.
   * See also {@link remove} if to remove a value based on equality checking.
   * @param predicate 
   * @returns Returns number of items removed.
   */
  removeWhere(predicate) {
    const countPre = this.data.length;
    this.data = this.data.filter((element) => predicate(element));
    return countPre - this.data.length;
  }
  get isEmpty() {
    return isEmpty(this.opts, this.data);
  }
  get isFull() {
    return isFull(this.opts, this.data);
  }
  get length() {
    return this.data.length;
  }
  get peek() {
    return peek(this.opts, this.data);
  }
};
function mutable(opts = {}, ...startingItems) {
  return new QueueMutable({ ...opts }, [...startingItems]);
}

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
var forEach3 = (iterator, fn) => {
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
var repeatReduce = (countOrPredicate, fn, initial, reduce3) => {
  if (typeof countOrPredicate === `number`) {
    throwNumberTest(countOrPredicate, `positive`, `countOrPredicate`);
    while (countOrPredicate-- > 0) {
      const v = fn();
      if (v === void 0)
        continue;
      initial = reduce3(initial, v);
    }
  } else {
    let repeats, valuesProduced;
    repeats = valuesProduced = 0;
    while (countOrPredicate(repeats, valuesProduced)) {
      repeats++;
      const v = fn();
      if (v === void 0)
        continue;
      initial = reduce3(initial, v);
      valuesProduced++;
    }
  }
  return initial;
};
try {
  if (typeof window !== `undefined`) {
    window.ixfx = {
      ...window.ixfx,
      Flow: { StateMachine: StateMachine_exports, Timer: Timer_exports, forEach: forEach3, forEachAsync, repeat }
    };
  }
} catch {
}

// src/collections/index.ts
var collections_exports = {};
__export(collections_exports, {
  Arrays: () => arrays_exports,
  Iterables: () => Iterables_exports,
  Maps: () => Map_exports,
  QueueImmutable: () => QueueImmutable,
  QueueMutable: () => QueueMutable,
  Queues: () => queue_exports,
  SetStringImmutable: () => SetStringImmutable,
  SetStringMutable: () => SetStringMutable,
  Sets: () => set_exports,
  StackImmutable: () => StackImmutable,
  StackMutable: () => StackMutable,
  Stacks: () => stack_exports,
  Trees: () => tree_exports,
  circularArray: () => circularArray
});

// src/collections/CircularArray.ts
var CircularArray = class _CircularArray extends Array {
  // ✔ Class is unit tested!
  /* eslint-disable-next-line functional/prefer-readonly-type */
  #capacity;
  /* eslint-disable-next-line functional/prefer-readonly-type */
  #pointer;
  constructor(capacity = 0) {
    super();
    throwIntegerTest(capacity, `positive`, `capacity`);
    this.#capacity = capacity;
    this.#pointer = 0;
  }
  /**
   * Add to array
   * @param thing Thing to add
   * @returns 
   */
  add(thing) {
    const ca = _CircularArray.from(this);
    ca[this.#pointer] = thing;
    ca.#capacity = this.#capacity;
    if (this.#capacity > 0) {
      ca.#pointer = this.#pointer + 1 === this.#capacity ? 0 : this.#pointer + 1;
    } else {
      ca.#pointer = this.#pointer + 1;
    }
    return ca;
  }
  get pointer() {
    return this.#pointer;
  }
  get isFull() {
    if (this.#capacity === 0)
      return false;
    return this.length === this.#capacity;
  }
};
var circularArray = (capacity) => new CircularArray(capacity);

// src/collections/tree/index.ts
var tree_exports = {};
__export(tree_exports, {
  FromObject: () => TraverseObject_exports,
  Mutable: () => TreeMutable_exports,
  Pathed: () => Pathed_exports,
  Traverse: () => TraversableTree_exports,
  compare: () => compare,
  isTraversable: () => isTraversable,
  isTreeNode: () => isTreeNode,
  toTraversable: () => toTraversable
});

// src/collections/tree/TraverseObject.ts
var TraverseObject_exports = {};
__export(TraverseObject_exports, {
  asDynamicTraversable: () => asDynamicTraversable2,
  children: () => children2,
  create: () => create,
  createSimplified: () => createSimplified,
  createWrapped: () => createWrapped,
  depthFirst: () => depthFirst2,
  getByPath: () => getByPath,
  prettyPrint: () => prettyPrint,
  prettyPrintEntries: () => prettyPrintEntries,
  toStringDeep: () => toStringDeep2,
  traceByPath: () => traceByPath
});

// src/collections/tree/TreeMutable.ts
var TreeMutable_exports = {};
__export(TreeMutable_exports, {
  add: () => add,
  addValue: () => addValue,
  asDynamicTraversable: () => asDynamicTraversable,
  breadthFirst: () => breadthFirst,
  children: () => children,
  childrenLength: () => childrenLength,
  compare: () => compare2,
  computeMaxDepth: () => computeMaxDepth,
  createNode: () => createNode,
  depthFirst: () => depthFirst,
  findAnyChildByValue: () => findAnyChildByValue,
  findChildByValue: () => findChildByValue,
  followValue: () => followValue,
  fromPlainObject: () => fromPlainObject,
  getRoot: () => getRoot,
  hasAnyChild: () => hasAnyChild,
  hasAnyParent: () => hasAnyParent,
  hasChild: () => hasChild,
  hasParent: () => hasParent,
  nodeDepth: () => nodeDepth,
  parents: () => parents,
  queryByValue: () => queryByValue,
  remove: () => remove2,
  root: () => root,
  rootWrapped: () => rootWrapped,
  setChildren: () => setChildren,
  stripParentage: () => stripParentage,
  throwTreeTest: () => throwTreeTest,
  toStringDeep: () => toStringDeep,
  treeTest: () => treeTest,
  value: () => value,
  wrap: () => wrap
});

// src/collections/stack/StackFns.ts
var trimStack = (opts, stack, toAdd) => {
  const potentialLength = stack.length + toAdd.length;
  const policy = opts.discardPolicy ?? `additions`;
  const capacity = opts.capacity ?? potentialLength;
  const toRemove = potentialLength - capacity;
  if (opts.debug) {
    console.log(
      `Stack.push: stackLen: ${stack.length} potentialLen: ${potentialLength} toRemove: ${toRemove} policy: ${policy}`
    );
  }
  switch (policy) {
    case `additions`: {
      if (opts.debug) {
        console.log(
          `Stack.push:DiscardAdditions: stackLen: ${stack.length} slice: ${potentialLength - capacity} toAddLen: ${toAdd.length}`
        );
      }
      if (stack.length === opts.capacity) {
        return stack;
      } else {
        return [...stack, ...toAdd.slice(0, toAdd.length - toRemove)];
      }
    }
    case `newer`: {
      if (toRemove >= stack.length) {
        return toAdd.slice(
          Math.max(0, toAdd.length - capacity),
          Math.min(toAdd.length, capacity) + 1
        );
      } else {
        if (opts.debug) {
          console.log(` from orig: ${JSON.stringify(stack.slice(0, stack.length - toRemove))}`);
        }
        return [
          ...stack.slice(0, stack.length - toRemove),
          ...toAdd.slice(0, Math.min(toAdd.length, capacity - toRemove + 1))
        ];
      }
    }
    case `older`: {
      return [...stack, ...toAdd].slice(toRemove);
    }
    default: {
      throw new Error(`Unknown discard policy ${policy}`);
    }
  }
};
var push = (opts, stack, ...toAdd) => {
  const potentialLength = stack.length + toAdd.length;
  const overSize = opts.capacity && potentialLength > opts.capacity;
  const toReturn = overSize ? trimStack(opts, stack, toAdd) : [...stack, ...toAdd];
  return toReturn;
};
var pop = (opts, stack) => {
  if (stack.length === 0)
    throw new Error(`Stack is empty`);
  return stack.slice(0, -1);
};
var peek2 = (opts, stack) => stack.at(-1);
var isEmpty2 = (opts, stack) => stack.length === 0;
var isFull2 = (opts, stack) => {
  if (opts.capacity) {
    return stack.length >= opts.capacity;
  }
  return false;
};

// src/collections/stack/StackMutable.ts
var StackMutable = class {
  opts;
  /* eslint-disable-next-line functional/prefer-readonly-type */
  data;
  constructor(opts = {}, data = []) {
    this.opts = opts;
    this.data = data;
  }
  /**
   * Push data onto the stack.
   * If `toAdd` is empty, nothing happens
   * @param toAdd Data to add
   * @returns Length of stack
   */
  push(...toAdd) {
    if (toAdd.length === 0)
      return this.data.length;
    this.data = push(this.opts, this.data, ...toAdd);
    return this.data.length;
  }
  forEach(fn) {
    this.data.forEach(fn);
  }
  forEachFromTop(fn) {
    [...this.data].reverse().forEach(fn);
  }
  pop() {
    const v = peek2(this.opts, this.data);
    this.data = pop(this.opts, this.data);
    return v;
  }
  get isEmpty() {
    return isEmpty2(this.opts, this.data);
  }
  get isFull() {
    return isFull2(this.opts, this.data);
  }
  get peek() {
    return peek2(this.opts, this.data);
  }
  get length() {
    return this.data.length;
  }
};
var mutable2 = (opts = {}, ...startingItems) => new StackMutable({ ...opts }, [...startingItems]);

// src/collections/tree/Compare.ts
var compare = (a, b, eq = isEqualValueIgnoreOrder, parent) => {
  const valueEqual = valueOrIdentityEqual(a, b, eq);
  const childrenCompare = compareChildren(a, b, eq);
  const diff = {
    valueChanged: !valueEqual,
    a,
    b,
    added: childrenCompare.added,
    removed: childrenCompare.removed,
    childChanged: false
  };
  const diffNode = {
    value: diff,
    childrenStore: [],
    parent
  };
  const childrenDiff = childrenCompare.identical.map((c) => compare(c[0], c[1], eq, diffNode));
  const someChildChange = hasChange(diff) || childrenDiff.some((v) => hasChange(v.value));
  setChildren(diffNode, childrenDiff);
  diffNode.toString = () => toString2(diffNode, 0);
  diffNode.value.childChanged = someChildChange;
  throwTreeTest(diffNode);
  return diffNode;
};
var hasChange = (vv) => {
  if (vv === void 0)
    return false;
  if (vv.valueChanged)
    return true;
  if (vv.childChanged)
    return true;
  if (vv.added.length > 0)
    return true;
  if (vv.removed.length > 0)
    return true;
  return false;
};
var compareChildren = (a, b, eq = isEqualValueIgnoreOrder) => {
  const childrenOfA = [...a.children()];
  const childrenOfB = [...b.children()];
  const identical = [];
  const removed = [];
  for (const childA of childrenOfA) {
    let foundIndex = -1;
    for (const [index, childOfB] of childrenOfB.entries()) {
      const d = valueOrIdentityEqual(childA, childOfB, eq);
      if (d) {
        identical.push([childA, childOfB]);
        foundIndex = index;
        break;
      }
    }
    if (foundIndex === -1) {
      removed.push(childA);
    } else {
      childrenOfB.splice(foundIndex, 1);
    }
  }
  const added = [...childrenOfB];
  return { added, identical, removed };
};
var valueOrIdentityEqual = (a, b, eq) => {
  if (a.getIdentity() === b.getIdentity())
    return true;
  if (eq(a.getValue(), b.getValue()))
    return true;
  return false;
};
var toStringSingle = (n) => {
  return JSON.stringify(n.getValue());
};
var toString2 = (n, indent = 0) => {
  if (n === void 0)
    return `(undefined)`;
  let t = toStringDiff(n.value, indent);
  for (const c of n.childrenStore) {
    t += toString2(c, indent + 2);
  }
  return t;
};
var toStringDiff = (n, indent) => {
  const spaces = ` `.repeat(indent);
  if (n === void 0)
    return `${spaces}(undefined)`;
  const t = [];
  t.push(`a: ${toStringSingle(n.a)} b: ${toStringSingle(n.b)}`);
  if (n.valueChanged)
    t.push(`Value changed. Child changed: ${n.childChanged}`);
  else
    t.push(`Value unchanged. Child changed: ${n.childChanged}`);
  if (n.added.length > 0) {
    t.push(`Added:`);
    for (const c of n.added) {
      t.push(` - ` + toStringSingle(c));
    }
  }
  if (n.removed.length > 0) {
    t.push(`Removed: ${n.removed.length}`);
    for (const c of n.removed) {
      t.push(` - ` + toStringSingle(c));
    }
  }
  t.push(`----
`);
  return t.map((line) => spaces + line).join(`
`);
};

// src/collections/tree/TreeMutable.ts
var compare2 = (a, b, eq) => {
  return compare(asDynamicTraversable(a), asDynamicTraversable(b), eq);
};
var stripParentage = (node) => {
  const n = {
    value: node.value,
    childrenStore: node.childrenStore.map((c) => stripParentage(c))
  };
  return n;
};
var unwrapped = (node) => `wraps` in node ? node.wraps : node;
var wrapped = (node) => `wraps` in node ? node : wrap(node);
var wrap = (n) => {
  return {
    *children() {
      for (const c of n.childrenStore) {
        yield wrap(c);
      }
    },
    getValue: () => n.value,
    getIdentity: () => n,
    *queryValue(value2) {
      for (const v of queryByValue(value2, unwrapped(n))) {
        yield wrap(v);
      }
    },
    getParent: () => n.parent === void 0 ? void 0 : wrap(n.parent),
    hasParent: (parent) => {
      return hasParent(n, unwrapped(parent));
    },
    hasAnyParent: (parent) => {
      return hasAnyParent(n, unwrapped(parent));
    },
    hasChild: (child) => {
      return hasChild(unwrapped(child), n);
    },
    hasAnyChild: (child) => {
      return hasAnyChild(unwrapped(child), n);
    },
    remove: () => {
      remove2(n);
    },
    addValue: (value2) => {
      const nodeValue = addValue(value2, n);
      return wrap(nodeValue);
    },
    add: (child) => {
      add(unwrapped(child), n);
      return wrapped(child);
    },
    wraps: n
  };
};
var remove2 = (child) => {
  const p = child.parent;
  if (p === void 0)
    return;
  child.parent = void 0;
  p.childrenStore = without(p.childrenStore, child);
};
function* depthFirst(node) {
  if (!root)
    return;
  const stack = new StackMutable();
  stack.push(...node.childrenStore);
  let entry = stack.pop();
  while (entry) {
    yield entry;
    if (entry) {
      stack.push(...entry.childrenStore);
    }
    if (stack.isEmpty)
      break;
    entry = stack.pop();
  }
}
function* breadthFirst(node) {
  if (!node)
    return;
  const queue = new QueueMutable();
  queue.enqueue(...node.childrenStore);
  let entry = queue.dequeue();
  while (entry) {
    yield entry;
    if (entry) {
      queue.enqueue(...entry.childrenStore);
    }
    if (queue.isEmpty)
      break;
    entry = queue.dequeue();
  }
}
function treeTest(root2, seen = []) {
  if (root2.parent === root2)
    return [false, `Root has itself as parent`, root2];
  if (seen.includes(root2))
    return [false, `Same node instance is appearing further in tree`, root2];
  seen.push(root2);
  if (containsDuplicateInstances(root2.childrenStore))
    return [false, `Children list contains duplicates`, root2];
  for (const c of root2.childrenStore) {
    if (c.parent !== root2)
      return [false, `Member of childrenStore does not have .parent set`, c];
    if (hasAnyChild(root2, c))
      return [false, `Child has parent as its own child`, c];
    const v = treeTest(c, seen);
    if (!v[0])
      return v;
  }
  return [true, ``, root2];
}
function throwTreeTest(root2) {
  const v = treeTest(root2);
  if (v[0])
    return;
  throw new Error(`${v[1]} Node: ${toStringAbbreviate(v[2].value, 30)}`, { cause: v[2] });
}
function* children(root2) {
  for (const c of root2.childrenStore) {
    yield c;
  }
}
function* parents(root2) {
  let p = root2.parent;
  while (p) {
    yield p;
    p = p.parent;
  }
}
function nodeDepth(node) {
  const p = [...parents(node)];
  return p.length;
}
var hasChild = (child, parent) => {
  for (const c of parent.childrenStore) {
    if (c === child)
      return true;
  }
  return false;
};
var findChildByValue = (value2, parent, eq = isEqualDefault) => {
  for (const c of parent.childrenStore) {
    if (eq(value2, c.value))
      return c;
  }
};
function* queryByValue(value2, parent, eq = isEqualDefault) {
  for (const c of parent.childrenStore) {
    if (eq(value2, c.value))
      yield c;
  }
}
var hasAnyChild = (prospectiveChild, parent) => {
  for (const c of breadthFirst(parent)) {
    if (c === prospectiveChild)
      return true;
  }
  return false;
};
var findAnyChildByValue = (value2, parent, eq = isEqualDefault) => {
  for (const c of breadthFirst(parent)) {
    if (eq(c.value, value2))
      return c;
  }
};
var getRoot = (node) => {
  if (node.parent)
    return getRoot(node.parent);
  return node;
};
var hasAnyParent = (child, prospectiveParent) => {
  for (const p of parents(child)) {
    if (p === prospectiveParent)
      return true;
  }
  return false;
};
var hasParent = (child, prospectiveParent) => {
  return child.parent === prospectiveParent;
};
var computeMaxDepth = (node) => {
  return computeMaxDepthImpl(node, 0);
};
var computeMaxDepthImpl = (node, startingDepth = 0) => {
  let depth = startingDepth;
  for (const c of node.childrenStore) {
    depth = Math.max(depth, computeMaxDepthImpl(c, startingDepth + 1));
  }
  return depth;
};
var add = (child, parent) => {
  throwAttemptedChild(child, parent);
  const p = child.parent;
  parent.childrenStore = [...parent.childrenStore, child];
  child.parent = parent;
  if (p) {
    p.childrenStore = without(p.childrenStore, child);
  }
};
var addValue = (value2, parent) => {
  return createNode(value2, parent);
};
var root = (value2) => {
  return createNode(value2);
};
var fromPlainObject = (value2, label = ``, parent, seen = []) => {
  const entries = Object.entries(value2);
  parent = parent === void 0 ? root() : addValue({ label, value: value2 }, parent);
  for (const entry of entries) {
    const value3 = entry[1];
    if (seen.includes(value3))
      continue;
    seen.push(value3);
    if (typeof entry[1] === `object`) {
      fromPlainObject(value3, entry[0], parent, seen);
    } else {
      addValue({ label: entry[0], value: value3 }, parent);
    }
  }
  return parent;
};
var rootWrapped = (value2) => {
  return wrap(createNode(value2));
};
var createNode = (value2, parent) => {
  const n = {
    childrenStore: [],
    parent,
    value: value2
  };
  if (parent !== void 0) {
    parent.childrenStore = [...parent.childrenStore, n];
  }
  return n;
};
var childrenLength = (node) => {
  return node.childrenStore.length;
};
var value = (node) => {
  return node.value;
};
var asDynamicTraversable = (node) => {
  const t = {
    *children() {
      for (const c of node.childrenStore) {
        yield asDynamicTraversable(c);
      }
    },
    getParent() {
      if (node.parent === void 0)
        return;
      return asDynamicTraversable(node.parent);
    },
    getValue() {
      return node.value;
    },
    getIdentity() {
      return node;
    }
  };
  return t;
};
var throwAttemptedChild = (c, parent) => {
  if (parent === c)
    throw new Error(`Cannot add self as child`);
  if (c.parent === parent)
    return;
  if (hasAnyParent(parent, c))
    throw new Error(`Child contains parent (1)`, { cause: c });
  if (hasAnyParent(c, parent))
    throw new Error(`Parent already contains child`, { cause: c });
  if (hasAnyChild(parent, c))
    throw new Error(`Child contains parent (2)`, { cause: c });
};
var setChildren = (parent, children3) => {
  for (const c of children3) {
    throwAttemptedChild(c, parent);
  }
  parent.childrenStore = [...children3];
  for (const c of children3) {
    c.parent = parent;
  }
};
var toStringDeep = (node, indent = 0) => {
  const t = `${`  `.repeat(indent)} + ${node.value ? JSON.stringify(node.value) : `-`}`;
  return node.childrenStore.length > 0 ? t + `
` + node.childrenStore.map((d) => toStringDeep(d, indent + 1)).join(`
`) : t;
};
function* followValue(root2, continuePredicate, depth = 1) {
  for (const c of root2.childrenStore) {
    const value2 = c.value;
    if (value2 === void 0)
      continue;
    if (continuePredicate(value2, depth)) {
      yield c.value;
      yield* followValue(c, continuePredicate, depth + 1);
    }
  }
}

// src/KeyValue.ts
var KeyValue_exports = {};
__export(KeyValue_exports, {
  getSorter: () => getSorter,
  isPrimitive: () => isPrimitive,
  minMaxAvg: () => minMaxAvg2
});
function isPrimitive(v) {
  if (typeof v == `number`)
    return true;
  if (typeof v === `string`)
    return true;
  if (typeof v == `bigint`)
    return true;
  if (typeof v === `boolean`)
    return true;
  return false;
}
var sorterByValueIndex = (index, reverse = false) => {
  return (values) => {
    const s = values.toSorted((a, b) => {
      return defaultComparer(a[index], b[index]);
    });
    if (reverse)
      return s.reverse();
    return s;
  };
};
var getSorter = (sortStyle) => {
  switch (sortStyle) {
    case `value`: {
      return sorterByValueIndex(1, false);
    }
    case `value-reverse`: {
      return sorterByValueIndex(1, true);
    }
    case `key`: {
      return sorterByValueIndex(0, false);
    }
    case `key-reverse`: {
      return sorterByValueIndex(0, true);
    }
    default: {
      throw new Error(`Unknown sorting value '${sortStyle}'. Expecting: value, value-reverse, key or key-reverse`);
    }
  }
};
var minMaxAvg2 = (entries, conversionFunction) => {
  const converter = conversionFunction ?? ((v) => v[1]);
  const values = entries.map((entry) => converter(entry));
  return minMaxAvg(values);
};

// src/collections/tree/TraverseObject.ts
function prettyPrintEntries(entries) {
  if (entries.length === 0)
    return `(empty)`;
  let t = ``;
  for (const [index, entry] of entries.entries()) {
    t += `  `.repeat(index);
    t += entry.name + ` = ` + JSON.stringify(entry.nodeValue) + `
`;
  }
  return t;
}
var prettyPrint = (node, indent = 0, options = {}) => {
  nullUndef(node, `node`);
  const defaultName = options.name ?? `node`;
  const entry = getNamedEntry(node, defaultName);
  const t = `${`  `.repeat(indent)} + name: ${entry.name} value: ${JSON.stringify(entry.nodeValue)}`;
  const childrenAsArray = [...children2(node, options)];
  return childrenAsArray.length > 0 ? t + `
` + childrenAsArray.map((d) => prettyPrint(d.nodeValue, indent + 1, { ...options, name: d.name })).join(`
`) : t;
};
var toStringDeep2 = (node, indent = 0) => {
  let t = ` `.repeat(indent) + ` ` + node.value?.name;
  if (node.value !== void 0) {
    if (`sourceValue` in node.value && `nodeValue` in node.value) {
      let sourceValue = toStringAbbreviate(node.value?.sourceValue, 20);
      const nodeValue = toStringAbbreviate(node.value?.nodeValue, 20);
      sourceValue = sourceValue === nodeValue ? `` : `source: ` + sourceValue;
      t += ` = ${nodeValue} ${sourceValue}`;
    } else if (`value` in node.value && node.value.value !== void 0)
      t += ` = ${node.value.value}`;
    if (`ancestors` in node.value) {
      t += ` (ancestors: ${node.value.ancestors.join(`, `)})`;
    }
  }
  t += `
`;
  for (const c of node.childrenStore) {
    t += toStringDeep2(c, indent + 1);
  }
  return t;
};
function* children2(node, options = {}) {
  nullUndef(node, `node`);
  const filter5 = options.filter ?? `none`;
  const filterByValue = (v) => {
    if (filter5 === `none`)
      return [true, isPrimitive(v)];
    else if (filter5 === `leaves` && isPrimitive(v))
      return [true, true];
    else if (filter5 === `branches` && !isPrimitive(v))
      return [true, false];
    return [false, isPrimitive(v)];
  };
  if (Array.isArray(node)) {
    for (const [index, element] of node.entries()) {
      const f = filterByValue(element);
      if (f[0]) {
        yield { name: index.toString(), sourceValue: element, nodeValue: f[1] ? element : void 0 };
      }
    }
  } else if (typeof node === `object`) {
    const entriesIter = `entries` in node ? node.entries() : Object.entries(node);
    for (const [name, value2] of entriesIter) {
      const f = filterByValue(value2);
      if (f[0]) {
        yield { name, sourceValue: value2, nodeValue: f[1] ? value2 : void 0 };
      }
    }
  }
}
function* depthFirst2(node, options = {}, ancestors = []) {
  for (const c of children2(node, options)) {
    yield { ...c, ancestors: [...ancestors] };
    yield* depthFirst2(c.sourceValue, options, [...ancestors, c.name]);
  }
}
function childByName(name, node) {
  for (const d of children2(node)) {
    if (d.name === name)
      return d;
  }
}
function getByPath(path, node, opts = {}) {
  const v = last(traceByPath(path, node, opts));
  if (!v)
    throw new Error(`Could not trace path: ${path} `);
  return v;
}
function* traceByPath(path, node, opts = {}) {
  nullUndef(path, `path`);
  nullUndef(node, `node`);
  const separator = opts.separator ?? `.`;
  const pathSplit = path.split(separator);
  const ancestors = [];
  for (const p of pathSplit) {
    const entry = childByName(p, node);
    if (!entry) {
      yield { name: p, sourceValue: void 0, nodeValue: void 0, ancestors };
      return;
    }
    node = entry.sourceValue;
    yield { ...entry, ancestors: [...ancestors] };
    ancestors.push(p);
  }
}
var asDynamicTraversable2 = (node, options = {}, ancestors = [], parent) => {
  const name = options.name ?? `object`;
  const t = {
    *children() {
      for (const c of children2(node, options)) {
        yield asDynamicTraversable2(c.sourceValue, { ...options, name: c.name }, [...ancestors, name], t);
      }
    },
    getParent() {
      return parent;
    },
    getValue() {
      return { name, value: node, ancestors };
    },
    getIdentity() {
      return node;
    }
  };
  return t;
};
var createWrapped = (node, options) => {
  return wrap(create(node, options));
};
var create = (node, options = {}) => {
  const valuesAtLeaves = options.valuesAtLeaves ?? false;
  const valueFor = valuesAtLeaves ? (v) => {
    if (isPrimitive(v))
      return v;
  } : (v) => v;
  return createImpl(node, valueFor(node), options, []);
};
var createImpl = (sourceValue, nodeValue, options = {}, ancestors) => {
  const defaultName = options.name ?? `object_ci`;
  const r = root({ name: defaultName, value: nodeValue, ancestors: [...ancestors] });
  ancestors = [...ancestors, defaultName];
  for (const c of children2(sourceValue, options)) {
    const v = options.valuesAtLeaves ? c.nodeValue : c.sourceValue;
    add(createImpl(c.sourceValue, v, { ...options, name: c.name }, ancestors), r);
  }
  return r;
};
var createSimplified = (node, options = {}) => {
  return stripParentage(create(node, options));
};
function getNamedEntry(node, defaultName = ``) {
  if (`name` in node && `nodeValue` in node && `sourceValue` in node)
    return node;
  if (`name` in node) {
    return { name: node.name, nodeValue: node, sourceValue: node };
  }
  return { name: defaultName, nodeValue: node, sourceValue: node };
}

// src/collections/tree/Pathed.ts
var Pathed_exports = {};
__export(Pathed_exports, {
  addValueByPath: () => addValueByPath,
  childrenLengthByPath: () => childrenLengthByPath,
  clearValuesByPath: () => clearValuesByPath,
  create: () => create2,
  removeByPath: () => removeByPath,
  valueByPath: () => valueByPath,
  valuesByPath: () => valuesByPath
});
var create2 = (pathOpts = {}) => {
  let root2;
  const add3 = (value2, path) => {
    const n = addValueByPath(value2, path, root2, pathOpts);
    if (root2 === void 0) {
      root2 = getRoot(n);
    }
  };
  const prettyPrint2 = () => {
    if (root2 === void 0)
      return `(empty)`;
    return toStringDeep(root2);
  };
  const getValue = (path) => {
    if (root2 === void 0)
      return;
    return valueByPath(path, root2, pathOpts);
  };
  const remove3 = (path) => {
    if (root2 === void 0)
      return false;
    return removeByPath(path, root2, pathOpts);
  };
  const hasPath = (path) => {
    if (root2 === void 0)
      return false;
    const c = findChildByPath(path, root2, pathOpts);
    return c !== void 0;
  };
  const getNode = (path) => {
    if (root2 === void 0)
      return;
    const c = findChildByPath(path, root2, pathOpts);
    return c;
  };
  const childrenLength3 = (path) => {
    if (root2 === void 0)
      return 0;
    const c = findChildByPath(path, root2, pathOpts);
    if (c === void 0)
      return 0;
    return c.childrenStore.length;
  };
  const getValues = (path) => {
    if (root2 === void 0)
      return [];
    return valuesByPath(path, root2, pathOpts);
  };
  const clearValues = (path) => {
    if (root2 === void 0)
      return false;
    return clearValuesByPath(path, root2, pathOpts);
  };
  return { add: add3, prettyPrint: prettyPrint2, remove: remove3, getValue, getValues, hasPath, childrenLength: childrenLength3, getNode, clearValues };
};
var addValueByPath = (value2, path, node, pathOpts = {}) => {
  const separator = pathOpts.separator ?? `.`;
  const duplicatePath = pathOpts.duplicates ?? `overwrite`;
  const split = path.split(separator);
  let count2 = 0;
  for (const p of split) {
    const lastEntry = count2 === split.length - 1;
    const found = findChildByLabel(p, node);
    if (found === void 0) {
      const labelled = {
        value: lastEntry ? value2 : void 0,
        label: p
      };
      node = createNode(labelled, node);
    } else {
      node = found;
      if (lastEntry) {
        switch (duplicatePath) {
          case `ignore`: {
            break;
          }
          case `allow`: {
            const existing = getValuesFromNode(node);
            node.value = {
              values: [...existing, value2],
              label: p
            };
            break;
          }
          case `overwrite`: {
            node.value = {
              value: value2,
              label: p
            };
            break;
          }
        }
      } else {
        node = found;
      }
    }
    count2++;
  }
  if (node === void 0)
    throw new Error(`Could not create tree`);
  return node;
};
var removeByPath = (path, root2, pathOpts = {}) => {
  if (root2 === void 0)
    return false;
  const c = findChildByPath(path, root2, pathOpts);
  if (c === void 0)
    return false;
  remove2(c);
  return true;
};
var clearValuesByPath = (path, root2, pathOpts = {}) => {
  if (root2 === void 0)
    return false;
  const c = findChildByPath(path, root2, pathOpts);
  if (c === void 0)
    return false;
  c.value = {
    label: c.value?.label ?? ``,
    value: void 0
  };
  return true;
};
var childrenLengthByPath = (path, node, pathOpts = {}) => {
  if (node === void 0)
    return 0;
  const c = findChildByPath(path, node, pathOpts);
  if (c === void 0)
    return 0;
  return c.childrenStore.length;
};
var findChildByLabel = (label, node) => {
  if (node === void 0)
    return void 0;
  if (label === void 0)
    throw new Error(`Parameter 'label' cannot be undefined`);
  if (node.value?.label === label)
    return node;
  for (const c of node.childrenStore) {
    if (c.value?.label === label)
      return c;
  }
};
var valueByPath = (path, node, pathOpts = {}) => {
  const values = valuesByPath(path, node, pathOpts);
  if (values.length === 0)
    return void 0;
  if (values.length > 1)
    throw new Error(`Multiple values at path. Use getValues instead`);
  return values[0];
};
var getValuesFromNode = (c) => {
  if (c.value === void 0)
    return [];
  if (`values` in c.value)
    return c.value.values;
  if (`value` in c.value) {
    if (c.value.value === void 0)
      return [];
    return [c.value.value];
  }
  return [];
};
var findChildByPath = (path, node, pathOpts = {}) => {
  const separator = pathOpts.separator ?? `.`;
  const split = path.split(separator);
  let c = node;
  for (const p of split) {
    c = findChildByLabel(p, c);
    if (c === void 0) {
      return;
    }
  }
  return c;
};
var valuesByPath = (path, node, pathOpts = {}) => {
  const separator = pathOpts.separator ?? `.`;
  const split = path.split(separator);
  let c = node;
  for (const p of split) {
    c = findChildByLabel(p, c);
    if (c === void 0) {
      return [];
    }
  }
  return getValuesFromNode(c);
};

// src/collections/tree/TraversableTree.ts
var TraversableTree_exports = {};
__export(TraversableTree_exports, {
  breadthFirst: () => breadthFirst2,
  childrenLength: () => childrenLength2,
  couldAddChild: () => couldAddChild,
  depthFirst: () => depthFirst3,
  find: () => find4,
  findAnyChildByValue: () => findAnyChildByValue2,
  findAnyParentByValue: () => findAnyParentByValue,
  findByValue: () => findByValue,
  findChildByValue: () => findChildByValue2,
  findParentByValue: () => findParentByValue,
  followValue: () => followValue2,
  hasAnyChild: () => hasAnyChild2,
  hasAnyChildValue: () => hasAnyChildValue,
  hasAnyParent: () => hasAnyParent2,
  hasAnyParentValue: () => hasAnyParentValue,
  hasChild: () => hasChild2,
  hasChildValue: () => hasChildValue,
  hasParent: () => hasParent2,
  hasParentValue: () => hasParentValue,
  parents: () => parents2,
  siblings: () => siblings,
  toString: () => toString3,
  toStringDeep: () => toStringDeep3
});
var childrenLength2 = (tree) => {
  return [...tree.children()].length;
};
var hasAnyParent2 = (child, possibleParent, eq) => {
  return hasParent2(child, possibleParent, eq, Number.MAX_SAFE_INTEGER);
};
var hasAnyParentValue = (child, possibleParentValue, eq) => {
  return hasParentValue(child, possibleParentValue, eq, Number.MAX_SAFE_INTEGER);
};
var findAnyParentByValue = (child, possibleParentValue, eq) => {
  return findParentByValue(child, possibleParentValue, eq, Number.MAX_SAFE_INTEGER);
};
var hasParent2 = (child, possibleParent, eq = isEqualDefault, maxDepth = 0) => {
  if (maxDepth < 0)
    return false;
  const p = child.getParent();
  if (p === void 0)
    return false;
  if (eq(p, possibleParent))
    return true;
  if (eq(p.getIdentity(), possibleParent.getIdentity()))
    return true;
  return hasParent2(p, possibleParent, eq, maxDepth - 1);
};
var hasParentValue = (child, possibleParentValue, eq = isEqualDefault, maxDepth = 0) => {
  if (maxDepth < 0)
    return false;
  const p = child.getParent();
  if (p === void 0)
    return false;
  if (eq(p.getValue(), possibleParentValue))
    return true;
  return hasParentValue(p, possibleParentValue, eq, maxDepth - 1);
};
var findParentByValue = (child, possibleParentValue, eq = isEqualDefault, maxDepth = 0) => {
  if (maxDepth < 0)
    return;
  const p = child.getParent();
  if (p === void 0)
    return;
  if (eq(p.getValue(), possibleParentValue))
    return p;
  return findParentByValue(p, possibleParentValue, eq, maxDepth - 1);
};
var couldAddChild = (parent, prospectiveChild, eq = isEqualDefault) => {
  if (eq(parent, prospectiveChild))
    throw new Error(`Child equals parent`);
  if (hasAnyChild2(parent, prospectiveChild, eq)) {
    throw new Error(`Circular. Parent already has child`);
  }
  if (hasAnyChild2(prospectiveChild, parent, eq)) {
    throw new Error(`Prospective child has parent as child relation`);
  }
};
var hasAnyChild2 = (parent, possibleChild, eq = isEqualDefault) => {
  return hasChild2(parent, possibleChild, eq, Number.MAX_SAFE_INTEGER);
};
var hasAnyChildValue = (parent, possibleChildValue, eq = isEqualDefault) => {
  return hasChildValue(parent, possibleChildValue, eq, Number.MAX_SAFE_INTEGER);
};
var hasChild2 = (parent, possibleChild, eq = isEqualDefault, maxDepth = 0) => {
  if (maxDepth < 0)
    return false;
  if (eq(parent, possibleChild))
    return true;
  if (eq(parent.getIdentity(), possibleChild.getIdentity()))
    return true;
  for (const c of breadthFirst2(parent, maxDepth)) {
    if (eq(c, possibleChild))
      return true;
    if (eq(c.getIdentity(), possibleChild.getIdentity()))
      return true;
  }
  return false;
};
var hasChildValue = (parent, possibleValue, eq = isEqualDefault, maxDepth = 0) => {
  if (maxDepth < 0)
    return false;
  if (eq(parent.getValue(), possibleValue))
    return true;
  for (const c of breadthFirst2(parent, maxDepth)) {
    if (eq(c.getValue(), possibleValue))
      return true;
  }
  return false;
};
function* siblings(node) {
  const p = node.getParent();
  if (p === void 0)
    return;
  for (const s of p.children()) {
    if (s === node)
      continue;
    yield s;
  }
}
function* parents2(node) {
  let p = node.getParent();
  while (p !== void 0) {
    yield p;
    p = p.getParent();
  }
}
var findAnyChildByValue2 = (parent, possibleValue, eq = isEqualDefault) => {
  return findChildByValue2(parent, possibleValue, eq, Number.MAX_SAFE_INTEGER);
};
var findChildByValue2 = (parent, possibleValue, eq = isEqualDefault, maxDepth = 0) => {
  if (maxDepth < 0)
    return;
  if (eq(parent.getValue(), possibleValue))
    return parent;
  for (const d of breadthFirst2(parent, maxDepth)) {
    if (eq(d.getValue(), possibleValue))
      return d;
  }
  return;
};
function* depthFirst3(root2) {
  if (!root2)
    return;
  const stack = new StackMutable();
  let entry = root2;
  while (entry) {
    stack.push(...entry.children());
    entry = stack.pop();
    if (entry)
      yield entry;
  }
}
function* breadthFirst2(root2, depth = Number.MAX_SAFE_INTEGER) {
  if (!root2)
    return;
  const queue = new QueueMutable();
  let entry = root2;
  while (entry) {
    if (depth < 0)
      return;
    for (const c of entry.children()) {
      yield c;
      queue.enqueue(c);
    }
    entry = queue.dequeue();
    depth--;
  }
}
function find4(root2, predicate, order = `breadth`) {
  if (predicate(root2))
    return root2;
  const iter = order === `breadth` ? breadthFirst2 : depthFirst3;
  for (const c of iter(root2)) {
    if (predicate(c))
      return c;
  }
}
function findByValue(root2, predicate, order = `breadth`) {
  if (predicate(root2.getValue()))
    return root2;
  const iter = order === `breadth` ? breadthFirst2 : depthFirst3;
  for (const c of iter(root2)) {
    if (predicate(c.getValue()))
      return c;
  }
}
function* followValue2(root2, continuePredicate, depth = 1) {
  for (const c of root2.children()) {
    if (continuePredicate(c.getValue(), depth)) {
      yield c.getValue();
      yield* followValue2(c, continuePredicate, depth + 1);
    }
  }
}
function toStringDeep3(node, depth = 0) {
  if (node === void 0)
    return `(undefined)`;
  if (node === null)
    return `(null)`;
  const v = node.getValue();
  let type = typeof v;
  if (Array.isArray(v))
    type = `array`;
  let t = `  `.repeat(depth) + `value: ${JSON.stringify(v)} (${type})
`;
  for (const n of node.children()) {
    t += toStringDeep3(n, depth + 1);
  }
  return t;
}
function toString3(...nodes) {
  let t = ``;
  for (const node of nodes) {
    const v = node.getValue();
    const vString = toStringAbbreviate(v);
    const children3 = [...node.children()];
    const parent = node.getParent();
    let type = typeof v;
    if (Array.isArray(v))
      type = `array`;
    t += `value: ${vString} (${type}) kids: ${children3.length} parented: ${parent ? `y` : `n`}
`;
  }
  return t;
}

// src/collections/tree/index.ts
var toTraversable = (node) => {
  if (isTraversable(node))
    return node;
  if (isTreeNode(node))
    return asDynamicTraversable(node);
  if (typeof node === `object`)
    return asDynamicTraversable2(node);
  throw new Error(`Parameter 'node' not convertible`);
};
var isTreeNode = (node) => {
  if (`parent` in node && `childrenStore` in node && `value` in node) {
    if (Array.isArray(node.childrenStore))
      return true;
  }
  return false;
};
var isTraversable = (node) => {
  return `children` in node && `getParent` in node && `getValue` in node && `getIdentity` in node;
};

// src/collections/stack/index.ts
var stack_exports = {};
__export(stack_exports, {
  immutable: () => immutable,
  mutable: () => mutable2
});

// src/collections/stack/StackImmutable.ts
var StackImmutable = class _StackImmutable {
  opts;
  /* eslint-disable-next-line functional/prefer-readonly-type */
  data;
  constructor(opts = {}, data = []) {
    this.opts = opts;
    this.data = data;
  }
  push(...toAdd) {
    return new _StackImmutable(
      this.opts,
      push(this.opts, this.data, ...toAdd)
    );
  }
  pop() {
    return new _StackImmutable(this.opts, pop(this.opts, this.data));
  }
  forEach(fn) {
    this.data.forEach(fn);
  }
  forEachFromTop(fn) {
    [...this.data].reverse().forEach(fn);
  }
  get isEmpty() {
    return isEmpty2(this.opts, this.data);
  }
  get isFull() {
    return isFull2(this.opts, this.data);
  }
  get peek() {
    return peek2(this.opts, this.data);
  }
  get length() {
    return this.data.length;
  }
};
var immutable = (opts = {}, ...startingItems) => new StackImmutable({ ...opts }, [...startingItems]);

// src/collections/set/index.ts
var set_exports = {};
__export(set_exports, {
  immutable: () => immutable2,
  mutable: () => mutable3
});

// src/collections/set/SetMutable.ts
var mutable3 = (keyString) => new SetStringMutable(keyString);
var SetStringMutable = class extends SimpleEventEmitter {
  // ✔ UNIT TESTED
  /* eslint-disable functional/prefer-readonly-type */
  store = /* @__PURE__ */ new Map();
  keyString;
  /**
   * Constructor
   * @param keyString Function which returns a string version of added items. If unspecified `JSON.stringify`
   */
  constructor(keyString) {
    super();
    this.keyString = keyString ?? defaultKeyer;
  }
  /**
   * Number of items stored in set
   */
  get size() {
    return this.store.size;
  }
  /**
   * Adds one or more items to set. `add` event is fired for each item
   * @param values items to add
   */
  add(...values) {
    let somethingAdded = false;
    for (const value2 of values) {
      const isUpdated = this.has(value2);
      this.store.set(this.keyString(value2), value2);
      super.fireEvent(`add`, { value: value2, updated: isUpdated });
      if (!isUpdated)
        somethingAdded = true;
    }
    return somethingAdded;
  }
  /**
   * Returns values from set as an iterable
   * @returns
   */
  //eslint-disable-next-line functional/prefer-tacit
  values() {
    return this.store.values();
  }
  /**
   * Clear items from set
   */
  clear() {
    this.store.clear();
    super.fireEvent(`clear`, true);
  }
  /**
   * Delete value from set.
   * @param v Value to delete
   * @returns _True_ if item was found and removed
   */
  delete(v) {
    const isDeleted = this.store.delete(this.keyString(v));
    if (isDeleted)
      super.fireEvent(`delete`, v);
    return isDeleted;
  }
  /**
   * Returns _true_ if item exists in set
   * @param v
   * @returns
   */
  has(v) {
    return this.store.has(this.keyString(v));
  }
  /**
   * Returns array copy of set
   * @returns Array copy of set
   */
  toArray() {
    return [...this.store.values()];
  }
};

// src/collections/set/SetImmutable.ts
var SetStringImmutable = class _SetStringImmutable {
  store;
  keyString;
  //eslint-disable-next-line functional/prefer-immutable-types
  constructor(keyString, map3) {
    this.store = map3 ?? /* @__PURE__ */ new Map();
    this.keyString = keyString ?? defaultKeyer;
  }
  get size() {
    return this.store.size;
  }
  add(...values) {
    const s = new Map(this.store);
    for (const v of values) {
      const key = this.keyString(v);
      s.set(key, v);
    }
    return new _SetStringImmutable(this.keyString, s);
  }
  delete(v) {
    const s = new Map(this.store);
    const key = this.keyString(v);
    if (s.delete(key))
      return new _SetStringImmutable(this.keyString, s);
    return this;
  }
  has(v) {
    const key = this.keyString(v);
    return this.store.has(key);
  }
  toArray() {
    return [...this.store.values()];
  }
  *values() {
    yield* this.store.values();
  }
};
var immutable2 = (keyString = toStringDefault) => new SetStringImmutable(keyString);

// src/collections/queue/index.ts
var queue_exports = {};
__export(queue_exports, {
  QueueMutable: () => QueueMutable,
  immutable: () => immutable3,
  mutable: () => mutable,
  priority: () => priority
});

// src/collections/queue/QueueImmutable.ts
var QueueImmutable = class _QueueImmutable {
  opts;
  data;
  /**
   * Creates an instance of Queue.
   * @param {QueueOpts} opts Options foor queue
   * @param {V[]} data Initial data. Index 0 is front of queue
   * @memberof Queue
   */
  constructor(opts = {}, data = []) {
    if (opts === void 0)
      throw new Error(`opts parameter undefined`);
    this.opts = opts;
    this.data = data;
  }
  forEach(fn) {
    for (let index = this.data.length - 1; index >= 0; index--) {
      fn(this.data[index]);
    }
  }
  forEachFromFront(fn) {
    this.data.forEach(fn);
  }
  enqueue(...toAdd) {
    return new _QueueImmutable(
      this.opts,
      enqueue(this.opts, this.data, ...toAdd)
    );
  }
  dequeue() {
    return new _QueueImmutable(this.opts, dequeue(this.opts, this.data));
  }
  get isEmpty() {
    return isEmpty(this.opts, this.data);
  }
  get isFull() {
    return isFull(this.opts, this.data);
  }
  get length() {
    return this.data.length;
  }
  get peek() {
    return peek(this.opts, this.data);
  }
};
var immutable3 = (opts = {}, ...startingItems) => {
  opts = { ...opts };
  return new QueueImmutable(opts, [...startingItems]);
};

// src/collections/queue/PriorityMutable.ts
var PriorityMutable = class extends QueueMutable {
  constructor(opts = {}) {
    if (opts.eq === void 0) {
      opts = {
        ...opts,
        eq: (a, b) => {
          return isEqualDefault(a.item, b.item);
        }
      };
    }
    super(opts);
  }
  enqueueWithPriority(item, priority2) {
    super.enqueue({ item, priority: priority2 });
  }
  changePriority(item, priority2, addIfMissing = false, eq) {
    if (item === void 0)
      throw new Error(`Item cannot be undefined`);
    let toDelete;
    for (const d of this.data) {
      if (eq) {
        if (eq(d.item, item)) {
          toDelete = d;
          break;
        }
      } else {
        if (this.eq(d, { item, priority: 0 })) {
          toDelete = d;
          break;
        }
      }
    }
    if (toDelete === void 0 && !addIfMissing)
      throw new Error(`Item not found in priority queue. Item: ${JSON.stringify(item)}`);
    if (toDelete !== void 0) {
      this.remove(toDelete);
    }
    this.enqueueWithPriority(item, priority2);
  }
  dequeueMax() {
    const m = max4(this.data, (v) => v.priority);
    if (m === void 0)
      return;
    this.remove(m);
    return m.item;
  }
  dequeueMin() {
    const m = min4(this.data, (v) => v.priority);
    if (m === void 0)
      return;
    this.remove(m);
    return m.item;
  }
  peekMax() {
    const m = max4(this.data, (v) => v.priority);
    if (m === void 0)
      return;
    return m.item;
  }
  peekMin() {
    const m = min4(this.data, (v) => v.priority);
    if (m === void 0)
      return;
    return m.item;
  }
};
function priority(opts = {}) {
  return new PriorityMutable(opts);
}

// src/collections/Map/index.ts
var Map_exports = {};
__export(Map_exports, {
  ExpiringMap: () => ExpiringMap,
  MapOfMutableImpl: () => MapOfMutableImpl,
  MapOfSimpleMutable: () => MapOfSimpleMutable,
  NumberMap: () => NumberMap,
  addKeepingExisting: () => addKeepingExisting,
  addObject: () => addObject,
  deleteByValue: () => deleteByValue,
  expiringMap: () => create3,
  filter: () => filter3,
  find: () => find3,
  firstEntryByIterablePredicate: () => firstEntryByIterablePredicate,
  firstEntryByIterableValue: () => firstEntryByIterableValue,
  fromIterable: () => fromIterable2,
  fromObject: () => fromObject,
  getClosestIntegerKey: () => getClosestIntegerKey,
  getFromKeys: () => getFromKeys,
  getOrGenerate: () => getOrGenerate,
  getOrGenerateSync: () => getOrGenerateSync,
  hasAnyValue: () => hasAnyValue,
  hasKeyValue: () => hasKeyValue,
  immutable: () => immutable4,
  mapOfSimpleMutable: () => ofSimpleMutable,
  mapToArray: () => mapToArray,
  mapToObjectTransform: () => mapToObjectTransform,
  mergeByKey: () => mergeByKey,
  mutable: () => mutable4,
  ofArrayMutable: () => ofArrayMutable,
  ofCircularMutable: () => ofCircularMutable,
  ofSetMutable: () => ofSetMutable,
  sortByValue: () => sortByValue,
  sortByValueProperty: () => sortByValueProperty,
  toArray: () => toArray2,
  toObject: () => toObject,
  transformMap: () => transformMap,
  zipKeyValue: () => zipKeyValue
});

// src/collections/Map/ExpiringMap.ts
var create3 = (opts = {}) => new ExpiringMap(opts);
var ExpiringMap = class extends SimpleEventEmitter {
  capacity;
  store;
  keyCount;
  evictPolicy;
  autoDeleteElapsedMs;
  autoDeletePolicy;
  constructor(opts = {}) {
    super();
    this.capacity = opts.capacity ?? -1;
    throwIntegerTest(this.capacity, `nonZero`, `capacity`);
    this.store = /* @__PURE__ */ new Map();
    this.keyCount = 0;
    if (opts.evictPolicy && this.capacity <= 0) {
      throw new Error(`evictPolicy is set, but no capacity limit is set`);
    }
    this.evictPolicy = opts.evictPolicy ?? `none`;
    this.autoDeleteElapsedMs = opts.autoDeleteElapsedMs ?? -1;
    this.autoDeletePolicy = opts.autoDeletePolicy ?? `none`;
    if (this.autoDeleteElapsedMs > 0) {
      setInterval(
        () => this.#maintain(),
        Math.max(1e3, this.autoDeleteElapsedMs * 2)
      );
    }
  }
  /**
   * Returns the number of keys being stored.
   */
  get keyLength() {
    return this.keyCount;
  }
  *entries() {
    for (const entry of this.store.entries()) {
      yield [entry[0], entry[1].value];
    }
  }
  *values() {
    for (const v of this.store.values()) {
      yield v.value;
    }
  }
  *keys() {
    yield* this.store.keys();
  }
  /**
   * Returns the elapsed time since `key`
   * was set. Returns _undefined_ if `key`
   * does not exist
   */
  elapsedSet(key) {
    const v = this.store.get(key);
    if (!v)
      return v;
    return Date.now() - v.lastSet;
  }
  /**
   * Returns the elapsed time since `key`
   * was accessed. Returns _undefined_ if `key`
   * does not exist
   */
  elapsedGet(key) {
    const v = this.store.get(key);
    if (!v)
      return v;
    return Date.now() - v.lastGet;
  }
  /**
   * Returns true if `key` is stored.
   * Does not affect the key's last access time.
   * @param key
   * @returns
   */
  has(key) {
    return this.store.has(key);
  }
  /**
   * Gets an item from the map by key, returning
   * undefined if not present
   * @param key Key
   * @returns Value, or undefined
   */
  get(key) {
    const v = this.store.get(key);
    if (v) {
      return v.value;
    }
  }
  /**
   * Deletes the value under `key`, if present.
   *
   * Returns _true_ if something was removed.
   * @param key
   * @returns
   */
  delete(key) {
    const val = this.store.get(key);
    if (!val)
      return false;
    const d = this.store.delete(key);
    this.keyCount = this.keyCount - 1;
    this.fireEvent(`removed`, {
      key,
      value: val.value
    });
    return d;
  }
  /**
   * Updates the lastSet/lastGet time for a value
   * under `k`.
   *
   * Returns false if key was not found
   * @param key
   * @returns
   */
  touch(key) {
    const v = this.store.get(key);
    if (!v)
      return false;
    this.store.set(key, {
      ...v,
      lastSet: Date.now(),
      lastGet: Date.now()
    });
    return true;
  }
  findEvicteeKey() {
    if (this.evictPolicy === `none`)
      return null;
    let sortBy = ``;
    if (this.evictPolicy === `oldestGet`)
      sortBy = `lastGet`;
    else if (this.evictPolicy === `oldestSet`)
      sortBy = `lastSet`;
    else
      throw Error(`Unknown eviction policy ${this.evictPolicy}`);
    const sorted = sortByValueProperty(this.store, sortBy);
    return sorted[0][0];
  }
  #maintain() {
    if (this.autoDeletePolicy === `none`)
      return;
    this.deleteWithElapsed(this.autoDeleteElapsedMs, this.autoDeletePolicy);
  }
  /**
   * Deletes all values where elapsed time has past
   * for get/set or either.
   *
   * Remove items are returned
   * @param time
   * @param prop get/set/either
   */
  deleteWithElapsed(time2, prop) {
    const entries = [...this.store.entries()];
    const prune = [];
    const now = Date.now();
    for (const e of entries) {
      const elapsedGet = now - e[1].lastGet;
      const elapsedSet = now - e[1].lastSet;
      const elapsed = prop === `get` ? elapsedGet : prop === `set` ? elapsedSet : Math.max(elapsedGet, elapsedSet);
      if (elapsed >= time2) {
        prune.push([e[0], e[1].value]);
      }
    }
    for (const e of prune) {
      this.store.delete(e[0]);
      this.keyCount = this.keyCount - 1;
      const eventArgs = {
        key: e[0],
        value: e[1]
      };
      this.fireEvent(`expired`, eventArgs);
      this.fireEvent(`removed`, eventArgs);
    }
    return prune;
  }
  /**
   * Sets the `key` to be `value`.
   *
   * If the key already exists, it is updated.
   *
   * If the map is full, according to its capacity,
   * another value is selected for removal.
   * @param key
   * @param value
   * @returns
   */
  set(key, value2) {
    const existing = this.store.get(key);
    if (existing) {
      this.store.set(key, {
        ...existing,
        lastSet: performance.now()
      });
      return;
    }
    if (this.keyCount === this.capacity && this.capacity > 0) {
      const key2 = this.findEvicteeKey();
      if (!key2) {
        throw new Error(`ExpiringMap full (capacity: ${this.capacity})`);
      }
      const existing2 = this.store.get(key2);
      this.store.delete(key2);
      this.keyCount = this.keyCount - 1;
      if (existing2) {
        const eventArgs = { key: key2, value: existing2.value };
        this.fireEvent(`expired`, eventArgs);
        this.fireEvent(`removed`, eventArgs);
      }
    }
    this.keyCount++;
    this.store.set(key, {
      lastGet: 0,
      lastSet: Date.now(),
      value: value2
    });
    this.fireEvent(`newKey`, { key, value: value2 });
  }
};

// src/collections/Map/MapImmutableFns.ts
var addArray = (map3, data) => {
  const x = new Map(map3.entries());
  for (const d of data) {
    if (d[0] === void 0)
      throw new Error(`key cannot be undefined`);
    if (d[1] === void 0)
      throw new Error(`value cannot be undefined`);
    x.set(d[0], d[1]);
  }
  return x;
};
var addObjects = (map3, data) => {
  const x = new Map(map3.entries());
  for (const d of data) {
    if (d.key === void 0)
      throw new Error(`key cannot be undefined`);
    if (d.value === void 0)
      throw new Error(`value cannot be undefined`);
    x.set(d.key, d.value);
  }
  return x;
};
var has = (map3, key) => map3.has(key);
var add2 = (map3, ...data) => {
  if (map3 === void 0)
    throw new Error(`map parameter is undefined`);
  if (data === void 0)
    throw new Error(`data parameter i.s undefined`);
  if (data.length === 0)
    return map3;
  const firstRecord = data[0];
  const isObject = typeof firstRecord.key !== `undefined` && typeof firstRecord.value !== `undefined`;
  return isObject ? addObjects(map3, data) : addArray(map3, data);
};
var set = (map3, key, value2) => {
  const x = new Map(map3.entries());
  x.set(key, value2);
  return x;
};
var del = (map3, key) => {
  const x = new Map(map3.entries());
  x.delete(key);
  return x;
};

// src/collections/Map/Map.ts
var immutable4 = (dataOrMap) => {
  if (dataOrMap === void 0)
    return immutable4([]);
  if (Array.isArray(dataOrMap))
    return immutable4(add2(/* @__PURE__ */ new Map(), ...dataOrMap));
  const data = dataOrMap;
  return {
    add: (...itemsToAdd) => {
      const s = add2(data, ...itemsToAdd);
      return immutable4(s);
    },
    set: (key, value2) => {
      const s = set(data, key, value2);
      return immutable4(s);
    },
    get: (key) => data.get(key),
    delete: (key) => immutable4(del(data, key)),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    clear: () => immutable4(),
    has: (key) => data.has(key),
    entries: () => data.entries(),
    values: () => data.values(),
    isEmpty: () => data.size === 0
  };
};

// src/collections/Map/MapMutable.ts
var mutable4 = (...data) => {
  let m = add2(/* @__PURE__ */ new Map(), ...data);
  return {
    add: (...data2) => {
      m = add2(m, ...data2);
    },
    delete: (key) => {
      m = del(m, key);
    },
    clear: () => {
      m = add2(/* @__PURE__ */ new Map());
    },
    set: (key, value2) => {
      m = set(m, key, value2);
    },
    get: (key) => m.get(key),
    entries: () => m.entries(),
    values: () => m.values(),
    isEmpty: () => m.size === 0,
    has: (key) => has(m, key)
  };
};

// src/collections/Map/MapOfMultiImpl.ts
var MapOfMutableImpl = class extends SimpleEventEmitter {
  /* eslint-disable-next-line functional/prefer-readonly-type */
  #map = /* @__PURE__ */ new Map();
  groupBy;
  type;
  constructor(type, opts = {}) {
    super();
    this.type = type;
    this.groupBy = opts.groupBy ?? toStringDefault;
  }
  /**
   * Returns the type name. For in-built implementations, it will be one of: array, set or circular
   */
  get typeName() {
    return this.type.name;
  }
  /**
   * Returns the number of keys
   */
  get lengthKeys() {
    return this.#map.size;
  }
  /**
   * Returns the length of the longest child list
   */
  get lengthMax() {
    let m = 0;
    for (const v of this.#map.values()) {
      m = Math.max(m, this.type.count(v));
    }
    return m;
  }
  debugString() {
    const keys = [...this.#map.keys()];
    let r = `Keys: ${keys.join(`, `)}\r
`;
    for (const k of keys) {
      const v = this.#map.get(k);
      if (v === void 0) {
        r += ` - ${k} (undefined)\r
`;
      } else {
        const asArray2 = this.type.toArray(v);
        if (asArray2 !== void 0) {
          r += ` - ${k} (${this.type.count(v)}) = ${JSON.stringify(
            asArray2
          )}\r
`;
        }
      }
    }
    ;
    return r;
  }
  get isEmpty() {
    return this.#map.size === 0;
  }
  clear() {
    this.#map.clear();
    super.fireEvent(`clear`, true);
  }
  //eslint-disable-next-line functional/prefer-immutable-types
  addKeyedValues(key, ...values) {
    const set2 = this.#map.get(key);
    if (set2 === void 0) {
      this.#map.set(key, this.type.add(void 0, values));
      super.fireEvent(`addedKey`, { key });
      super.fireEvent(`addedValues`, { values });
    } else {
      this.#map.set(key, this.type.add(set2, values));
      super.fireEvent(`addedValues`, { values });
    }
  }
  //eslint-disable-next-line functional/prefer-immutable-types
  set(key, values) {
    this.addKeyedValues(key, ...values);
    return this;
  }
  addValue(...values) {
    for (const v of values)
      this.addKeyedValues(this.groupBy(v), v);
  }
  hasKeyValue(key, value2, eq) {
    const m = this.#map.get(key);
    if (m === void 0)
      return false;
    return this.type.has(m, value2, eq);
  }
  //eslint-disable-next-line functional/prefer-tacit
  has(key) {
    return this.#map.has(key);
  }
  deleteKeyValue(key, value2) {
    const a = this.#map.get(key);
    if (a === void 0)
      return false;
    return this.deleteKeyValueFromMap(a, key, value2);
  }
  deleteKeyValueFromMap(map3, key, value2) {
    const preCount = this.type.count(map3);
    const filtered = this.type.without(map3, value2);
    const postCount = filtered.length;
    this.#map.set(key, this.type.add(void 0, filtered));
    return preCount > postCount;
  }
  deleteByValue(value2) {
    let something = false;
    [...this.#map.keys()].filter((key) => {
      const a = this.#map.get(key);
      if (!a)
        throw new Error(`Bug: map could not be accessed`);
      if (this.deleteKeyValueFromMap(a, key, value2)) {
        something = true;
        if (this.count(key) === 0)
          this.delete(key);
      }
    });
    return something;
  }
  delete(key) {
    const a = this.#map.get(key);
    if (a === void 0)
      return false;
    this.#map.delete(key);
    this.fireEvent(`deleteKey`, { key });
    return true;
  }
  firstKeyByValue(value2, eq = isEqualDefault) {
    const keys = [...this.#map.keys()];
    const found = keys.find((key) => {
      const a = this.#map.get(key);
      if (a === void 0)
        throw new Error(`Bug: map could not be accessed`);
      const r = this.type.has(a, value2, eq);
      return r;
    });
    return found;
  }
  count(key) {
    const entry = this.#map.get(key);
    if (entry === void 0)
      return 0;
    return this.type.count(entry);
  }
  /**
   * Iterates over values stored under `key`
   * An empty array is returned if there are no values
   */
  *get(key) {
    const m = this.#map.get(key);
    if (m === void 0)
      return;
    yield* this.type.iterable(m);
  }
  /**
   * Iterate over the values stored under `key`.
   * If key does not exist, iteration is essentially a no-op
   * @param key
   * @returns
   */
  *valuesFor(key) {
    const m = this.#map.get(key);
    if (m === void 0)
      return;
    yield* this.type.iterable(m);
  }
  //eslint-disable-next-line functional/prefer-tacit
  getSource(key) {
    return this.#map.get(key);
  }
  /* eslint-disable-next-line functional/prefer-readonly-type */
  *keys() {
    yield* this.#map.keys();
  }
  *entriesFlat() {
    for (const entry of this.#map.entries()) {
      for (const v of this.type.iterable(entry[1])) {
        yield [entry[0], v];
      }
    }
  }
  *valuesFlat() {
    for (const entry of this.#map.entries()) {
      yield* this.type.iterable(entry[1]);
    }
  }
  *entries() {
    for (const [k, v] of this.#map.entries()) {
      const temporary = [...this.type.iterable(v)];
      yield [k, temporary];
    }
  }
  /* eslint-disable-next-line functional/prefer-readonly-type */
  *keysAndCounts() {
    for (const key of this.keys()) {
      yield [key, this.count(key)];
    }
  }
  merge(other) {
    for (const key of other.keys()) {
      const data = other.get(key);
      this.addKeyedValues(key, ...data);
    }
  }
  get size() {
    return this.#map.size;
  }
  /*
    forEach_(
      fn: (
        value: ReadonlyArray<V>,
        key: string,
        //eslint-disable-next-line functional/prefer-immutable-types
        map: Map<string, ReadonlyArray<V>>
      ) => void,
      _?: any
    ) {
      // for (const [key,value] of this.#map.entries()) {
      //   value
      // }
      // @ts-expect-error
      this.#map.forEach(fn);
    }
    */
  get [Symbol.toStringTag]() {
    return this.#map[Symbol.toStringTag];
  }
  // [Symbol.iterator]() {
  //   return this.type[Symbol.iterator]();
  // }
};

// src/collections/Map/MapOfSetMutable.ts
var ofSetMutable = (opts) => {
  const hash = opts?.hash ?? toStringDefault;
  const comparer = (a, b) => hash(a) === hash(b);
  const t = {
    get name() {
      return `set`;
    },
    iterable: (source) => source.values(),
    add: (dest, values) => addKeepingExisting(dest, hash, ...values),
    count: (source) => source.size,
    find: (source, predicate) => find3(source, predicate),
    filter: (source, predicate) => filter3(source, predicate),
    toArray: (source) => toArray2(source),
    has: (source, value2) => hasAnyValue(source, value2, comparer),
    without: (source, value2) => without(toArray2(source), value2, comparer)
  };
  const m = new MapOfMutableImpl(t, opts);
  return m;
};

// src/collections/Map/MapOfCircularMutable.ts
var ofCircularMutable = (opts) => {
  const comparer = isEqualDefault;
  const t = {
    get name() {
      return `circular`;
    },
    add: (dest, values) => {
      if (dest === void 0)
        dest = circularArray(opts.capacity);
      for (const v of values) {
        dest = dest.add(v);
      }
      return dest;
    },
    count: (source) => source.length,
    find: (source, predicate) => source.find(predicate),
    filter: (source, predicate) => source.filter(predicate),
    toArray: (source) => source,
    iterable: (source) => source.values(),
    has: (source, value2) => source.find((v) => comparer(v, value2)) !== void 0,
    without: (source, value2) => source.filter((v) => !comparer(v, value2))
  };
  return new MapOfMutableImpl(t, opts);
};

// src/collections/Map/NumberMap.ts
var NumberMap = class extends Map {
  defaultValue;
  constructor(defaultValue = 0) {
    super();
    this.defaultValue = defaultValue;
  }
  get(key) {
    const v = super.get(key);
    if (v === void 0)
      return this.defaultValue;
    return v;
  }
  reset(key) {
    super.set(key, this.defaultValue);
    return this.defaultValue;
  }
  multiply(key, amount) {
    const v = super.get(key);
    let value2 = v ?? this.defaultValue;
    value2 *= amount;
    super.set(key, value2);
    return value2;
  }
  add(key, amount = 1) {
    const v = super.get(key);
    let value2 = v ?? this.defaultValue;
    value2 += amount;
    super.set(key, value2);
    return value2;
  }
  subtract(key, amount = 1) {
    const v = super.get(key);
    let value2 = v ?? this.defaultValue;
    value2 -= amount;
    super.set(key, value2);
    return value2;
  }
};

// src/collections/Map/MapOfArrayMutable.ts
var ofArrayMutable = (opts = {}) => {
  const convertToString = opts.convertToString;
  const toStringFunction = typeof convertToString === `undefined` ? isEqualDefault : (a, b) => convertToString(a) === convertToString(b);
  const comparer = opts.comparer ?? toStringFunction;
  const t = {
    get name() {
      return `array`;
    },
    add: (destination, values) => {
      if (destination === void 0)
        return [...values];
      return [...destination, ...values];
    },
    iterable: (source) => source.values(),
    count: (source) => source.length,
    find: (source, predicate) => source.find((f) => predicate(f)),
    filter: (source, predicate) => source.filter((f) => predicate(f)),
    toArray: (source) => source,
    has: (source, value2) => source.some((v) => comparer(v, value2)),
    without: (source, value2) => source.filter((v) => !comparer(v, value2))
    //[Symbol.iterator]: (source) => source[Symbol.iterator]()
  };
  const m = new MapOfMutableImpl(t, opts);
  return m;
};

// src/generators/Iterable.ts
var isAsyncIterable = (v) => Symbol.asyncIterator in new Object(v);

// src/generators/chain/Util.ts
function* primitiveToGenerator(value2) {
  yield value2;
}
async function* primitiveToAsyncGenerator(value2) {
  yield value2;
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

// src/generators/chain/Links.ts
var Links_exports = {};
__export(Links_exports, {
  average: () => average2,
  chunk: () => chunk,
  debounce: () => debounce2,
  delay: () => delay2,
  drop: () => drop,
  duration: () => duration,
  filter: () => filter4,
  flatten: () => flatten4,
  max: () => max5,
  min: () => min5,
  rank: () => rank,
  rankArray: () => rankArray,
  take: () => take,
  tally: () => tally,
  total: () => total2,
  transform: () => transform
});
function transform(transformer) {
  async function* transform2(input) {
    input = resolveToGen(input);
    for await (const value2 of input) {
      yield transformer(value2);
    }
  }
  transform2._name = `transform`;
  return transform2;
}
function take(limit) {
  async function* take2(input) {
    input = resolveToGen(input);
    let yielded = 0;
    for await (const value2 of input) {
      if (++yielded > limit)
        break;
      yield value2;
    }
  }
  take2._name = `take`;
  return take2;
}
function flatten4(flattener) {
  async function* flatten5(input) {
    input = resolveToGen(input);
    for await (const value2 of input) {
      yield flattener(value2);
    }
  }
  flatten5._name = `flatten`;
  return flatten5;
}
function duration(elapsed) {
  const durationMs = intervalToMs(elapsed, 0);
  async function* duration2(input) {
    input = resolveToGen(input);
    const elapsed2 = Elapsed_exports.since();
    for await (const value2 of input) {
      if (elapsed2() > durationMs)
        break;
      yield value2;
    }
  }
  duration2._name = `duration`;
  return duration2;
}
function delay2(options) {
  const before = intervalToMs(options.before, 0);
  const after = intervalToMs(options.after, 0);
  async function* delay3(input) {
    input = resolveToGen(input);
    for await (const value2 of input) {
      if (before > 0) {
        await sleep(before);
      }
      yield value2;
      if (after > 0) {
        await sleep(after);
      }
    }
  }
  delay3._name = `delay`;
  return delay3;
}
function debounce2(rate) {
  const rateMs = intervalToMs(rate, 0);
  async function* debounce3(input) {
    input = resolveToGen(input);
    let elapsed = Elapsed_exports.since();
    for await (const value2 of input) {
      if (elapsed() < rateMs)
        continue;
      yield value2;
      elapsed = Elapsed_exports.since();
    }
  }
  debounce3._name = `debounce`;
  return debounce3;
}
function tally() {
  async function* tally2(input) {
    input = resolveToGen(input);
    let count2 = 0;
    for await (const _ of input) {
      yield ++count2;
    }
  }
  tally2._name = `tally`;
  return tally2;
}
function min5() {
  async function* min6(input) {
    input = resolveToGen(input);
    let min7 = Number.MAX_SAFE_INTEGER;
    for await (const value2 of input) {
      const arrayValue = Array.isArray(value2) ? value2 : [value2];
      for (const subValue of arrayValue) {
        if (typeof subValue !== `number`)
          break;
        min7 = Math.min(subValue, min7);
        yield min7;
      }
    }
  }
  min6._name = `min`;
  return min6;
}
function max5() {
  async function* max6(input) {
    input = resolveToGen(input);
    let max7 = Number.MIN_SAFE_INTEGER;
    for await (const value2 of input) {
      const valueArray = Array.isArray(value2) ? value2 : [value2];
      for (const subValue of valueArray) {
        if (typeof subValue !== `number`)
          break;
        max7 = Math.max(subValue, max7);
        yield max7;
      }
    }
  }
  max6._name = `max`;
  return max6;
}
function rank(r, options = {}) {
  const includeType = options.includeType;
  const emitEqualRanked = options.emitEqualRanked ?? false;
  const emitRepeatHighest = options.emitRepeatHighest ?? false;
  async function* rank2(input) {
    input = resolveToGen(input);
    let best;
    for await (const value2 of input) {
      let emit = false;
      if (includeType && typeof value2 !== includeType)
        continue;
      if (best === void 0) {
        best = value2;
        emit = true;
      } else {
        const result = r(value2, best);
        if (result == `a`) {
          best = value2;
          emit = true;
        } else if (result === `eq` && emitEqualRanked) {
          emit = true;
        } else if (emitRepeatHighest) {
          emit = true;
        }
      }
      if (emit)
        yield best;
    }
  }
  rank2._name = `rank`;
  return rank2;
}
function rankArray(r, options = {}) {
  const includeType = options.includeType;
  const emitEqualRanked = options.emitEqualRanked ?? false;
  const emitRepeatHighest = options.emitRepeatHighest ?? false;
  const withinArrays = options.withinArrays ?? false;
  async function* rankArray2(input) {
    input = resolveToGen(input);
    let best;
    for await (const value2 of input) {
      let emit = false;
      if (withinArrays)
        best = void 0;
      for (const subValue of value2) {
        if (includeType && typeof subValue !== includeType)
          continue;
        if (best === void 0) {
          best = subValue;
          emit = true;
        } else {
          const result = r(subValue, best);
          if (result == `a`) {
            best = subValue;
            emit = true;
          } else if (result === `eq` && emitEqualRanked) {
            emit = true;
          } else if (emitRepeatHighest) {
            emit = true;
          }
        }
      }
      if (emit && best)
        yield best;
    }
  }
  rankArray2._name = `rankArray`;
  return rankArray2;
}
function average2() {
  async function* average3(input) {
    input = resolveToGen(input);
    let total3 = 0;
    let count2 = 0;
    for await (const value2 of input) {
      if (typeof value2 !== `number`)
        break;
      count2++;
      total3 += value2;
      yield total3 / count2;
    }
  }
  average3._name = `average`;
  return average3;
}
function total2() {
  async function* average3(input) {
    input = resolveToGen(input);
    let total3 = 0;
    for await (const value2 of input) {
      if (typeof value2 !== `number`)
        break;
      total3 += value2;
      yield total3;
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
    for await (const value2 of input) {
      buffer.push(value2);
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
function filter4(predicate) {
  async function* filter5(input) {
    input = resolveToGen(input);
    for await (const value2 of input) {
      if (predicate(value2)) {
        yield value2;
      }
    }
  }
  filter5._name = `filter`;
  return filter5;
}
function drop(predicate) {
  async function* drop2(input) {
    input = resolveToGen(input);
    for await (const value2 of input) {
      if (!predicate(value2)) {
        yield value2;
      }
    }
  }
  drop2._name = `drop`;
  return drop2;
}

// src/generators/chain/Dom.ts
var Dom_exports = {};
__export(Dom_exports, {
  perValue: () => perValue,
  query: () => query
});
var createMap = (key) => {
  const keyFunction = key ?? ((value2) => value2);
  const map3 = /* @__PURE__ */ new Map();
  return {
    has(key2) {
      return map3.has(keyFunction(key2));
    },
    get(key2) {
      return map3.get(keyFunction(key2));
    },
    set(key2, value2) {
      map3.set(keyFunction(key2), value2);
    },
    entries() {
      return map3.entries();
    },
    delete(key2) {
      map3.delete(key2);
    }
  };
};
function perValue(options = {}) {
  const byReference = options.byReference;
  const tagName = options.tagName ?? `div`;
  if (byReference && options.key)
    throw new Error(`byReference and key options are mutually exclusive`);
  const keyFunction = byReference ? void 0 : options.key ?? toStringDefault;
  const map3 = createMap(keyFunction);
  const parentElementOrQuery = options.parentEl ?? document.body;
  const parentEl = resolveEl(parentElementOrQuery);
  const usedElements = /* @__PURE__ */ new Set();
  async function* perValue2(input) {
    for await (const value2 of resolveToGen(input)) {
      let el = map3.get(value2);
      if (!el) {
        el = document.createElement(tagName);
        map3.set(value2, el);
        if (options.beforeInsert)
          options.beforeInsert(el);
        parentEl.append(el);
        if (options.afterInsert)
          options.afterInsert(el);
      }
      usedElements.add(el);
      yield { el, value: value2 };
    }
    for (const [id, el] of map3.entries()) {
      if (usedElements.has(el))
        continue;
      if (options.beforeRemove)
        options.beforeRemove(el);
      el.remove();
      map3.delete(id);
    }
  }
  perValue2._name = `dom.perValue`;
  return perValue2;
}
function query(options = {}) {
  const baseElement = options.baseElement ?? document;
  async function* query2(input) {
    const gen = resolveToGen(input);
    for await (const value2 of gen) {
      for (const element of baseElement.querySelectorAll(value2)) {
        yield element;
      }
    }
  }
  query2._name = `dom.query`;
  return query2;
}

// src/generators/chain/index.ts
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
    rankArray: (r, options) => {
      chained.push(rankArray(r, options));
      return w;
    },
    rank: (r, options) => {
      chained.push(rank(r, options));
      return w;
    },
    transform: (transformer) => {
      chained.push(transform(transformer));
      return w;
    },
    flatten: (flattener) => {
      chained.push(flatten4(flattener));
      return w;
    },
    drop: (predicate) => {
      chained.push(drop(predicate));
      return w;
    },
    delay: (options) => {
      chained.push(delay2(options));
      return w;
    },
    duration: (elapsed) => {
      chained.push(duration(elapsed));
      return w;
    },
    debounce: (rate) => {
      chained.push(debounce2(rate));
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
      chained.push(filter4((v) => predicate(v)));
      return w;
    },
    min: () => {
      chained.push(min5());
      return w;
    },
    max: () => {
      chained.push(max5());
      return w;
    },
    average: () => {
      chained.push(average2());
      return w;
    },
    total: () => {
      chained.push(total2());
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
    asGenerator,
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
  for await (const value2 of outputType) {
    callback(value2);
  }
  if (onDone)
    onDone();
}
async function asArray(valueToWrap) {
  const outputType = typeof valueToWrap === `function` ? valueToWrap() : valueToWrap;
  return IterableAsync_exports.toArray(outputType);
}
async function addToArray(array, valueToWrap) {
  const outputType = typeof valueToWrap === `function` ? valueToWrap() : valueToWrap;
  for await (const value2 of outputType) {
    array.push(value2);
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
async function* runN(...functions2) {
  let input;
  for (const fnOrData of functions2) {
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
async function* run2(gen, l0, l1, l2, l3, l4, l5) {
  let input;
  const functions2 = arguments;
  for (const fnOrData of functions2) {
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

// src/random/index.ts
var random_exports = {};
__export(random_exports, {
  arrayElement: () => randomElement,
  arrayIndex: () => randomIndex,
  defaultRandom: () => defaultRandom,
  float: () => float,
  floatSource: () => floatSource,
  gaussian: () => gaussian2,
  gaussianSource: () => gaussianSource,
  hue: () => randomHue,
  integer: () => integer,
  integerSource: () => integerSource,
  integerUniqueGen: () => integerUniqueGen,
  minutesMs: () => minutesMs,
  minutesMsSource: () => minutesMsSource,
  secondsMs: () => secondsMs,
  secondsMsSource: () => secondsMsSource,
  shortGuid: () => shortGuid,
  string: () => string,
  weighted: () => weighted,
  weightedIndex: () => weightedIndex,
  weightedInteger: () => weightedInteger,
  weightedIntegerSource: () => weightedIntegerSource,
  weightedSource: () => weightedSource
});

// src/random/FloatSource.ts
var floatSource = (maxOrOptions = 1) => {
  const options = typeof maxOrOptions === `number` ? { max: maxOrOptions } : maxOrOptions;
  let max6 = options.max;
  let min6 = options.min ?? 0;
  const source = options.source ?? defaultRandom;
  throwFromResult(numberTest(min6, ``, `min`));
  throwFromResult(numberTest(max6, ``, `max`));
  if (!options.min && max6 < 0) {
    min6 = max6;
    max6 = 0;
  }
  if (min6 > max6) {
    throw new Error(`Min is greater than max. Min: ${min6} max: ${max6}`);
  }
  return () => source() * (max6 - min6) + min6;
};

// src/visual/Colour.ts
var Colour_exports = {};
__export(Colour_exports, {
  getCssVariable: () => getCssVariable,
  goldenAngleColour: () => goldenAngleColour,
  interpolate: () => interpolate,
  opacity: () => opacity,
  randomHue: () => randomHue,
  scale: () => scale,
  toHex: () => toHex,
  toHsl: () => toHsl,
  toRgb: () => toRgb
});

// node_modules/d3-color/src/define.js
function define_default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition)
    prototype[key] = definition[key];
  return prototype;
}

// node_modules/d3-color/src/color.js
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*";
var reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex = /^#([0-9a-f]{3,8})$/;
var reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`);
var reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`);
var reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`);
var reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`);
var reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`);
var reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define_default(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b, a) {
  if (a <= 0)
    r = g = b = NaN;
  return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity2) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity2 == null ? 1 : opacity2);
}
function Rgb(r, g, b, opacity2) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity2;
}
define_default(Rgb, rgb, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}
function clampa(opacity2) {
  return isNaN(opacity2) ? 1 : Math.max(0, Math.min(1, opacity2));
}
function clampi(value2) {
  return Math.max(0, Math.min(255, Math.round(value2) || 0));
}
function hex(value2) {
  value2 = clampi(value2);
  return (value2 < 16 ? "0" : "") + value2.toString(16);
}
function hsla(h, s, l, a) {
  if (a <= 0)
    h = s = l = NaN;
  else if (l <= 0 || l >= 1)
    h = s = NaN;
  else if (s <= 0)
    h = NaN;
  return new Hsl(h, s, l, a);
}
function hslConvert(o) {
  if (o instanceof Hsl)
    return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Hsl();
  if (o instanceof Hsl)
    return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min6 = Math.min(r, g, b), max6 = Math.max(r, g, b), h = NaN, s = max6 - min6, l = (max6 + min6) / 2;
  if (s) {
    if (r === max6)
      h = (g - b) / s + (g < b) * 6;
    else if (g === max6)
      h = (b - r) / s + 2;
    else
      h = (r - g) / s + 4;
    s /= l < 0.5 ? max6 + min6 : 2 - max6 - min6;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity2) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity2 == null ? 1 : opacity2);
}
function Hsl(h, s, l, opacity2) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity2;
}
define_default(Hsl, hsl, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
  }
}));
function clamph(value2) {
  value2 = (value2 || 0) % 360;
  return value2 < 0 ? value2 + 360 : value2;
}
function clampt(value2) {
  return Math.max(0, Math.min(1, value2 || 0));
}
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

// node_modules/d3-color/src/math.js
var radians = Math.PI / 180;
var degrees = 180 / Math.PI;

// node_modules/d3-color/src/lab.js
var K = 18;
var Xn = 0.96422;
var Yn = 1;
var Zn = 0.82521;
var t0 = 4 / 29;
var t1 = 6 / 29;
var t2 = 3 * t1 * t1;
var t3 = t1 * t1 * t1;
function labConvert(o) {
  if (o instanceof Lab)
    return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl)
    return hcl2lab(o);
  if (!(o instanceof Rgb))
    o = rgbConvert(o);
  var r = rgb2lrgb(o.r), g = rgb2lrgb(o.g), b = rgb2lrgb(o.b), y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x, z;
  if (r === g && g === b)
    x = z = y;
  else {
    x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
  }
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}
function lab(l, a, b, opacity2) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity2 == null ? 1 : opacity2);
}
function Lab(l, a, b, opacity2) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity2;
}
define_default(Lab, lab, extend(Color, {
  brighter(k) {
    return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker(k) {
    return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb() {
    var y = (this.l + 16) / 116, x = isNaN(this.a) ? y : y + this.a / 500, z = isNaN(this.b) ? y : y - this.b / 200;
    x = Xn * lab2xyz(x);
    y = Yn * lab2xyz(y);
    z = Zn * lab2xyz(z);
    return new Rgb(
      lrgb2rgb(3.1338561 * x - 1.6168667 * y - 0.4906146 * z),
      lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.033454 * z),
      lrgb2rgb(0.0719453 * x - 0.2289914 * y + 1.4052427 * z),
      this.opacity
    );
  }
}));
function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}
function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}
function lrgb2rgb(x) {
  return 255 * (x <= 31308e-7 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}
function rgb2lrgb(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}
function hclConvert(o) {
  if (o instanceof Hcl)
    return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab))
    o = labConvert(o);
  if (o.a === 0 && o.b === 0)
    return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
  var h = Math.atan2(o.b, o.a) * degrees;
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}
function hcl(h, c, l, opacity2) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity2 == null ? 1 : opacity2);
}
function Hcl(h, c, l, opacity2) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity2;
}
function hcl2lab(o) {
  if (isNaN(o.h))
    return new Lab(o.l, 0, 0, o.opacity);
  var h = o.h * radians;
  return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}
define_default(Hcl, hcl, extend(Color, {
  brighter(k) {
    return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
  },
  darker(k) {
    return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
  },
  rgb() {
    return hcl2lab(this).rgb();
  }
}));

// node_modules/d3-color/src/cubehelix.js
var A = -0.14861;
var B = 1.78277;
var C = -0.29227;
var D = -0.90649;
var E = 1.97294;
var ED = E * D;
var EB = E * B;
var BC_DA = B * C - D * A;
function cubehelixConvert(o) {
  if (o instanceof Cubehelix)
    return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Rgb))
    o = rgbConvert(o);
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB), bl = b - l, k = (E * (g - l) - C * bl) / D, s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), h = s ? Math.atan2(k, bl) * degrees - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}
function cubehelix(h, s, l, opacity2) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity2 == null ? 1 : opacity2);
}
function Cubehelix(h, s, l, opacity2) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity2;
}
define_default(Cubehelix, cubehelix, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * radians, l = +this.l, a = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh = Math.cos(h), sinh = Math.sin(h);
    return new Rgb(
      255 * (l + a * (A * cosh + B * sinh)),
      255 * (l + a * (C * cosh + D * sinh)),
      255 * (l + a * (E * cosh)),
      this.opacity
    );
  }
}));

// node_modules/d3-interpolate/src/basis.js
function basis(t12, v0, v1, v2, v3) {
  var t22 = t12 * t12, t32 = t22 * t12;
  return ((1 - 3 * t12 + 3 * t22 - t32) * v0 + (4 - 6 * t22 + 3 * t32) * v1 + (1 + 3 * t12 + 3 * t22 - 3 * t32) * v2 + t32 * v3) / 6;
}
function basis_default(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/constant.js
var constant_default = (x) => () => x;

// node_modules/d3-interpolate/src/color.js
function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}
function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}
function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant_default(isNaN(a) ? b : a);
}
function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant_default(isNaN(a) ? b : a);
  };
}
function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant_default(isNaN(a) ? b : a);
}

// node_modules/d3-interpolate/src/rgb.js
var rgb_default = function rgbGamma(y) {
  var color2 = gamma(y);
  function rgb2(start, end) {
    var r = color2((start = rgb(start)).r, (end = rgb(end)).r), g = color2(start.g, end.g), b = color2(start.b, end.b), opacity2 = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity2(t);
      return start + "";
    };
  }
  rgb2.gamma = rgbGamma;
  return rgb2;
}(1);
function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color2;
    for (i = 0; i < n; ++i) {
      color2 = rgb(colors[i]);
      r[i] = color2.r || 0;
      g[i] = color2.g || 0;
      b[i] = color2.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color2.opacity = 1;
    return function(t) {
      color2.r = r(t);
      color2.g = g(t);
      color2.b = b(t);
      return color2 + "";
    };
  };
}
var rgbBasis = rgbSpline(basis_default);
var rgbBasisClosed = rgbSpline(basisClosed_default);

// node_modules/d3-interpolate/src/numberArray.js
function numberArray_default(a, b) {
  if (!b)
    b = [];
  var n = a ? Math.min(b.length, a.length) : 0, c = b.slice(), i;
  return function(t) {
    for (i = 0; i < n; ++i)
      c[i] = a[i] * (1 - t) + b[i] * t;
    return c;
  };
}
function isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}

// node_modules/d3-interpolate/src/array.js
function genericArray(a, b) {
  var nb = b ? b.length : 0, na = a ? Math.min(nb, a.length) : 0, x = new Array(na), c = new Array(nb), i;
  for (i = 0; i < na; ++i)
    x[i] = value_default(a[i], b[i]);
  for (; i < nb; ++i)
    c[i] = b[i];
  return function(t) {
    for (i = 0; i < na; ++i)
      c[i] = x[i](t);
    return c;
  };
}

// node_modules/d3-interpolate/src/date.js
function date_default(a, b) {
  var d = /* @__PURE__ */ new Date();
  return a = +a, b = +b, function(t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
}

// node_modules/d3-interpolate/src/number.js
function number_default(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}

// node_modules/d3-interpolate/src/object.js
function object_default(a, b) {
  var i = {}, c = {}, k;
  if (a === null || typeof a !== "object")
    a = {};
  if (b === null || typeof b !== "object")
    b = {};
  for (k in b) {
    if (k in a) {
      i[k] = value_default(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }
  return function(t) {
    for (k in i)
      c[k] = i[k](t);
    return c;
  };
}

// node_modules/d3-interpolate/src/string.js
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB = new RegExp(reA.source, "g");
function zero(b) {
  return function() {
    return b;
  };
}
function one(b) {
  return function(t) {
    return b(t) + "";
  };
}
function string_default(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
  a = a + "", b = b + "";
  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      bs = b.slice(bi, bs);
      if (s[i])
        s[i] += bs;
      else
        s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s[i])
        s[i] += bm;
      else
        s[++i] = bm;
    } else {
      s[++i] = null;
      q.push({ i, x: number_default(am, bm) });
    }
    bi = reB.lastIndex;
  }
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i])
      s[i] += bs;
    else
      s[++i] = bs;
  }
  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
    for (var i2 = 0, o; i2 < b; ++i2)
      s[(o = q[i2]).i] = o.x(t);
    return s.join("");
  });
}

// node_modules/d3-interpolate/src/value.js
function value_default(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? constant_default(b) : (t === "number" ? number_default : t === "string" ? (c = color(b)) ? (b = c, rgb_default) : string_default : b instanceof color ? rgb_default : b instanceof Date ? date_default : isNumberArray(b) ? numberArray_default : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object_default : number_default)(a, b);
}

// node_modules/d3-interpolate/src/hsl.js
function hsl2(hue2) {
  return function(start, end) {
    var h = hue2((start = hsl(start)).h, (end = hsl(end)).h), s = nogamma(start.s, end.s), l = nogamma(start.l, end.l), opacity2 = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.s = s(t);
      start.l = l(t);
      start.opacity = opacity2(t);
      return start + "";
    };
  };
}
var hsl_default = hsl2(hue);
var hslLong = hsl2(nogamma);

// node_modules/d3-interpolate/src/lab.js
function lab2(start, end) {
  var l = nogamma((start = lab(start)).l, (end = lab(end)).l), a = nogamma(start.a, end.a), b = nogamma(start.b, end.b), opacity2 = nogamma(start.opacity, end.opacity);
  return function(t) {
    start.l = l(t);
    start.a = a(t);
    start.b = b(t);
    start.opacity = opacity2(t);
    return start + "";
  };
}

// node_modules/d3-interpolate/src/hcl.js
function hcl2(hue2) {
  return function(start, end) {
    var h = hue2((start = hcl(start)).h, (end = hcl(end)).h), c = nogamma(start.c, end.c), l = nogamma(start.l, end.l), opacity2 = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.c = c(t);
      start.l = l(t);
      start.opacity = opacity2(t);
      return start + "";
    };
  };
}
var hcl_default = hcl2(hue);
var hclLong = hcl2(nogamma);

// node_modules/d3-interpolate/src/cubehelix.js
function cubehelix2(hue2) {
  return function cubehelixGamma(y) {
    y = +y;
    function cubehelix3(start, end) {
      var h = hue2((start = cubehelix(start)).h, (end = cubehelix(end)).h), s = nogamma(start.s, end.s), l = nogamma(start.l, end.l), opacity2 = nogamma(start.opacity, end.opacity);
      return function(t) {
        start.h = h(t);
        start.s = s(t);
        start.l = l(Math.pow(t, y));
        start.opacity = opacity2(t);
        return start + "";
      };
    }
    cubehelix3.gamma = cubehelixGamma;
    return cubehelix3;
  }(1);
}
var cubehelix_default = cubehelix2(hue);
var cubehelixLong = cubehelix2(nogamma);

// node_modules/d3-interpolate/src/piecewise.js
function piecewise(interpolate3, values) {
  if (values === void 0)
    values = interpolate3, interpolate3 = value_default;
  var i = 0, n = values.length - 1, v = values[0], I = new Array(n < 0 ? 0 : n);
  while (i < n)
    I[i] = interpolate3(v, v = values[++i]);
  return function(t) {
    var i2 = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
    return I[i2](t - i2);
  };
}

// src/visual/Colour.ts
var toHsl = (colour) => {
  const c = resolveColour(colour);
  if (c === null)
    throw new Error(`Could not resolve colour ${colour}`);
  if (isHsl(c))
    return c;
  if (isRgb(c)) {
    const asHsl = hsl(c);
    if (c.opacity)
      return { ...asHsl, opacity: c.opacity };
    return asHsl;
  }
  throw new Error(`Could not resolve colour ${colour}`);
};
var goldenAngleColour = (index, saturation = 0.5, lightness = 0.75, alpha = 1) => {
  throwNumberTest(index, `positive`, `index`);
  throwNumberTest(saturation, `percentage`, `saturation`);
  throwNumberTest(lightness, `percentage`, `lightness`);
  throwNumberTest(alpha, `percentage`, `alpha`);
  const hue2 = index * 137.508;
  return alpha === 1 ? `hsl(${hue2},${saturation * 100}%,${lightness * 100}%)` : `hsl(${hue2},${saturation * 100}%,${lightness * 100}%,${alpha * 100}%)`;
};
var randomHue = (rand = defaultRandom) => {
  const r = rand();
  return r * 360;
};
var toRgb = (colour) => {
  const c = resolveColour(colour);
  const rgb2 = c.rgb();
  return c.opacity < 1 ? { r: rgb2.r, g: rgb2.g, b: rgb2.b, opacity: c.opacity } : { r: rgb2.r, g: rgb2.g, b: rgb2.b };
};
var resolveColour = (c) => {
  if (typeof c === `string`) {
    const css = color(c);
    if (css !== null)
      return css;
    const error = c.startsWith(`hsl`) && c.indexOf(`%`) <= 0 ? new Error(`Could not resolve CSS colour ${c}. HSL values should be in the form: hsl(0, 50%, 50%)`) : new Error(`Could not resolve CSS colour ${c}`);
    throw error;
  } else {
    if (isHsl(c))
      return hsl(c.h, c.s, c.l);
    if (isRgb(c))
      return rgb(c.r, c.g, c.b);
  }
  throw new Error(`Could not resolve colour ${JSON.stringify(c)}`);
};
var toHex = (colour) => {
  const c = resolveColour(colour);
  return c.formatHex();
};
var opacity = (colour, amt) => {
  const c = resolveColour(colour);
  c.opacity *= amt;
  return c.toString();
};
var getCssVariable = (name, fallbackColour = `black`, root2) => {
  if (root2 === void 0)
    root2 = document.body;
  const fromCss = getComputedStyle(root2).getPropertyValue(`--${name}`).trim();
  if (fromCss === void 0 || fromCss.length === 0)
    return fallbackColour;
  return fromCss;
};
var interpolate = (amount, from, to2, optsOrSpace) => {
  throwNumberTest(amount, `percentage`, `amount`);
  if (typeof from !== `string`)
    throw new Error(`Expected string for 'from' param`);
  if (typeof to2 !== `string`)
    throw new Error(`Expected string for 'to' param`);
  let opts;
  if (typeof optsOrSpace === `undefined`)
    opts = {};
  else if (typeof optsOrSpace === `string`)
    opts = { space: optsOrSpace };
  else
    opts = optsOrSpace;
  const inter = getInterpolator(opts, [from, to2]);
  if (inter === void 0)
    throw new Error(`Could not handle colour/space`);
  return inter(amount);
};
var getInterpolator = (optsOrSpace, colours) => {
  if (!Array.isArray(colours))
    throw new Error(`Expected one or more colours as parameters`);
  let opts;
  if (typeof optsOrSpace === `undefined`)
    opts = {};
  else if (typeof optsOrSpace === `string`)
    opts = { space: optsOrSpace };
  else
    opts = optsOrSpace;
  if (!Array.isArray(colours))
    throw new Error(`Expected array for colours parameter`);
  if (colours.length < 2)
    throw new Error(`Interpolation expects at least two colours`);
  const { space = `rgb`, long = false } = opts;
  let inter;
  switch (space) {
    case `lab`: {
      inter = lab2;
      break;
    }
    case `hsl`: {
      inter = long ? hslLong : hsl_default;
      break;
    }
    case `hcl`: {
      inter = long ? hclLong : hcl_default;
      break;
    }
    case `cubehelix`: {
      inter = long ? cubehelixLong : cubehelix_default;
      break;
    }
    case `rgb`: {
      inter = rgb_default;
    }
    default: {
      inter = rgb_default;
    }
  }
  if (opts.gamma && (space === `rgb` || space === `cubehelix`)) {
    inter = inter.gamma(
      opts.gamma
    );
  }
  return colours.length > 2 ? piecewise(inter, colours) : inter(colours[0], colours[1]);
};
var scale = (steps, opts, ...colours) => {
  throwNumberTest(steps, `aboveZero`, `steps`);
  if (!Array.isArray(colours))
    throw new Error(`Expected one or more colours as parameters`);
  const inter = getInterpolator(opts, colours);
  if (inter === void 0)
    throw new Error(`Could not handle colour/space`);
  const perStep = 1 / (steps - 1);
  const r = [];
  let amt = 0;
  for (let index = 0; index < steps; index++) {
    r.push(inter(amt));
    amt += perStep;
    if (amt > 1)
      amt = 1;
  }
  return r;
};
var isHsl = (p) => {
  if (p.h === void 0)
    return false;
  if (p.s === void 0)
    return false;
  if (p.l === void 0)
    return false;
  return true;
};
var isRgb = (p) => {
  if (p.r === void 0)
    return false;
  if (p.g === void 0)
    return false;
  if (p.b === void 0)
    return false;
  return true;
};

// src/modulation/Easing.ts
var Easing_exports = {};
__export(Easing_exports, {
  crossfade: () => crossfade,
  fromCubicBezier: () => fromCubicBezier,
  functions: () => functions,
  gaussian: () => gaussian,
  get: () => get,
  getEasings: () => getEasings,
  mix: () => mix,
  tick: () => tick2,
  time: () => time,
  weightedAverage: () => weightedAverage
});

// src/data/Wrap.ts
var wrapInteger = (v, min6 = 0, max6 = 360) => {
  throwIntegerTest(v, void 0, `v`);
  throwIntegerTest(min6, void 0, `min`);
  throwIntegerTest(max6, void 0, `max`);
  if (v === min6)
    return min6;
  if (v === max6)
    return min6;
  if (v > 0 && v < min6)
    v += min6;
  v -= min6;
  max6 -= min6;
  v = v % max6;
  if (v < 0)
    v = max6 - Math.abs(v) + min6;
  return v + min6;
};
var wrap2 = (v, min6 = 0, max6 = 1) => {
  throwNumberTest(v, ``, `min`);
  throwNumberTest(min6, ``, `min`);
  throwNumberTest(max6, ``, `max`);
  if (v === min6)
    return min6;
  if (v === max6)
    return min6;
  while (v <= min6 || v >= max6) {
    if (v === max6)
      break;
    if (v === min6)
      break;
    if (v > max6) {
      v = min6 + (v - max6);
    } else if (v < min6) {
      v = max6 - (min6 - v);
    }
  }
  return v;
};
var wrapRange = (min6, max6, fn, a, b) => {
  let r = 0;
  const distF = Math.abs(b - a);
  const distFwrap = Math.abs(max6 - a + b);
  const distBWrap = Math.abs(a + (360 - b));
  const distMin = Math.min(distF, distFwrap, distBWrap);
  if (distMin === distBWrap) {
    r = a - fn(distMin);
  } else if (distMin === distFwrap) {
    r = a + fn(distMin);
  } else {
    if (a > b) {
      r = a - fn(distMin);
    } else {
      r = a + fn(distMin);
    }
  }
  return wrapInteger(r, min6, max6);
};

// src/data/Interpolate.ts
var piPi = Math.PI * 2;
var interpolate2 = (amount, a, b) => {
  const v = (1 - amount) * a + amount * b;
  return v;
};
var interpolateAngle = (amount, aRadians, bRadians) => {
  const t = wrap2(bRadians - aRadians, 0, piPi);
  return interpolate2(amount, aRadians, aRadians + (t > Math.PI ? t - piPi : t));
};

// src/modulation/Easing.ts
var sqrt = Math.sqrt;
var pow = Math.pow;
var cos = Math.cos;
var pi = Math.PI;
var sin = Math.sin;
var time = function(nameOrFunction, durationMs) {
  return create4(nameOrFunction, durationMs, msElapsedTimer);
};
var tick2 = function(nameOrFunction, durationTicks) {
  return create4(nameOrFunction, durationTicks, ticksElapsedTimer);
};
var create4 = function(nameOrFunction, duration2, timerSource) {
  const fn = typeof nameOrFunction === `function` ? nameOrFunction : get(nameOrFunction);
  if (fn === void 0) {
    const error = typeof nameOrFunction === `string` ? new Error(`Easing function not found: ${nameOrFunction}`) : new Error(`Easing function not found`);
    throw error;
  }
  const timer = relativeTimer(duration2, {
    timer: timerSource(),
    clampValue: true
  });
  let startCount = 1;
  return {
    get isDone() {
      return timer.isDone;
    },
    get runState() {
      if (timer.isDone)
        return `idle`;
      return `scheduled`;
    },
    /**
     * Returns 1 if it has been created, returns +1 for each additional time the timer has been reset.
     */
    get startCount() {
      return startCount;
    },
    compute: () => {
      const relative = timer.elapsed;
      return fn(relative);
    },
    reset: () => {
      timer.reset();
      startCount++;
    }
  };
};
var fromCubicBezier = (b, d) => (t) => {
  const s = 1 - t;
  const s2 = s * s;
  const t22 = t * t;
  const t32 = t22 * t;
  return 3 * b * s2 * t + 3 * d * s * t22 + t32;
};
var mix = (amt, balance, easingA, easingB) => interpolate2(balance, easingA(amt), easingB(amt));
var crossfade = (amt, easingA, easingB) => mix(amt, amt, easingA, easingB);
var get = function(easingName) {
  if (easingName === null)
    throw new Error(`easingName is null`);
  if (easingName === void 0)
    throw new Error(`easingName is undefined`);
  const name = easingName.toLocaleLowerCase();
  const found = Object.entries(functions).find(
    ([k, _v]) => k.toLocaleLowerCase() === name
  );
  if (found === void 0)
    return found;
  return found[1];
};
function* getEasings() {
  yield* Object.keys(functions);
}
var gaussian = (standardDeviation = 0.4) => {
  const a = 1 / sqrt(2 * pi);
  const mean = 0.5;
  return (t) => {
    const f = a / standardDeviation;
    let p = -2.5;
    let c = (t - mean) / standardDeviation;
    c *= c;
    p *= c;
    const v = f * pow(Math.E, p);
    if (v > 1)
      return 1;
    if (v < 0)
      return 0;
    return v;
  };
};
var bounceOut = function(x) {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
};
var quintIn = (x) => x * x * x * x * x;
var quintOut = (x) => 1 - pow(1 - x, 5);
var arch = (x) => x * (1 - x) * 4;
var weightedAverage = (currentValue, targetValue, slowDownFactor) => {
  return (currentValue * (slowDownFactor - 1) + targetValue) / slowDownFactor;
};
var functions = {
  smoothstep: (x) => x * x * (3 - 2 * x),
  smootherstep: (x) => (x * (x * 6 - 15) + 10) * x * x * x,
  arch,
  bell: gaussian(),
  sineIn: (x) => 1 - cos(x * pi / 2),
  sineOut: (x) => sin(x * pi / 2),
  quadIn: (x) => x * x,
  quadOut: (x) => 1 - (1 - x) * (1 - x),
  sineInOut: (x) => -(cos(pi * x) - 1) / 2,
  quadInOut: (x) => x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2,
  cubicIn: (x) => x * x * x,
  cubicOut: (x) => 1 - pow(1 - x, 3),
  quartIn: (x) => x * x * x * x,
  quartOut: (x) => 1 - pow(1 - x, 4),
  quintIn,
  quintOut,
  //: (x: number): number => 1 - pow(1 - x, 5),
  expoIn: (x) => x === 0 ? 0 : pow(2, 10 * x - 10),
  expoOut: (x) => x === 1 ? 1 : 1 - pow(2, -10 * x),
  quintInOut: (x) => x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2,
  expoInOut: (x) => x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? pow(2, 20 * x - 10) / 2 : (2 - pow(2, -20 * x + 10)) / 2,
  circIn: (x) => 1 - sqrt(1 - pow(x, 2)),
  circOut: (x) => sqrt(1 - pow(x - 1, 2)),
  backIn: (x) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return c3 * x * x * x - c1 * x * x;
  },
  backOut: (x) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
  },
  circInOut: (x) => x < 0.5 ? (1 - sqrt(1 - pow(2 * x, 2))) / 2 : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2,
  backInOut: (x) => {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return x < 0.5 ? pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2) / 2 : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
  },
  elasticIn: (x) => {
    const c4 = 2 * pi / 3;
    return x === 0 ? 0 : x === 1 ? 1 : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
  },
  elasticOut: (x) => {
    const c4 = 2 * pi / 3;
    return x === 0 ? 0 : x === 1 ? 1 : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
  },
  bounceIn: (x) => 1 - bounceOut(1 - x),
  bounceOut,
  elasticInOut: (x) => {
    const c5 = 2 * pi / 4.5;
    return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2 : pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5) / 2 + 1;
  },
  bounceInOut: (x) => x < 0.5 ? (1 - bounceOut(1 - 2 * x)) / 2 : (1 + bounceOut(2 * x - 1)) / 2
};

// src/random/Weighted.ts
var weighted = (easingNameOrOptions = `quadIn`) => weightedSource(easingNameOrOptions)();
var weightedSource = (easingNameOrOptions = `quadIn`) => {
  const options = typeof easingNameOrOptions === `string` ? { easing: easingNameOrOptions } : easingNameOrOptions;
  const source = options.source ?? defaultRandom;
  const easingName = options.easing ?? `quadIn`;
  const easingFunction = get(easingName);
  if (easingFunction === void 0) {
    throw new Error(`Easing function '${easingName}' not found.`);
  }
  const compute = () => {
    const r = source();
    return easingFunction(r);
  };
  return compute;
};

// src/random/WeightedInteger.ts
var weightedIntegerSource = (maxOrOptions) => {
  const options = typeof maxOrOptions === `number` ? { max: maxOrOptions } : maxOrOptions;
  const source = options.source ?? defaultRandom;
  const max6 = options.max;
  const min6 = options.min ?? 0;
  const easingName = options.easing ?? `quadIn`;
  if (typeof max6 === `undefined`)
    throw new Error(`max field is undefined`);
  if (typeof easingName !== `string`) {
    throw new TypeError(`easing field expected to be string`);
  }
  throwFromResult(numberTest(max6));
  const easingFunction = get(easingName);
  if (easingFunction === void 0) {
    throw new Error(`Easing '${easingName}' not found`);
  }
  throwFromResult(numberTest(min6));
  if (max6 <= min6)
    throw new Error(`Max should be greater than min`);
  const compute = () => {
    const r = clamp(easingFunction(source()));
    return Math.floor(r * (max6 - min6)) + min6;
  };
  return compute;
};
var weightedInteger = (maxOrOptions) => weightedIntegerSource(maxOrOptions)();

// src/random/index.ts
var gaussian2 = (skew = 1) => gaussianSource(skew)();
var gaussianSource = (skew = 1) => {
  const min6 = 0;
  const max6 = 1;
  const compute = () => {
    const u = calculateNonZero();
    const v = calculateNonZero();
    let result = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    result = result / 10 + 0.5;
    if (result > 1 || result < 0) {
      result = compute();
    } else {
      result = Math.pow(result, skew);
      result *= max6 - min6;
      result += min6;
    }
    return result;
  };
  return compute;
};
var calculateNonZero = (source = defaultRandom) => {
  let v = 0;
  while (v === 0) {
    v = source();
  }
  return v;
};
var integerSource = (maxOrOptions) => {
  if (typeof maxOrOptions === `undefined`) {
    throw new TypeError(`maxOrOptions is undefined`);
  }
  const options = typeof maxOrOptions === `number` ? { max: maxOrOptions } : maxOrOptions;
  let max6 = Math.floor(options.max);
  let min6 = Math.floor(options.min ?? 0);
  if (!options.min && max6 < 0) {
    max6 = 1;
    min6 = options.max;
  }
  const randomSource = options.source ?? defaultRandom;
  if (min6 > max6) {
    throw new Error(`Min value is greater than max (min: ${min6} max: ${max6})`);
  }
  throwFromResult(numberTest(min6, ``, `min`));
  throwFromResult(numberTest(max6, ``, `max`));
  if (max6 === min6) {
    throw new Error(`Max and min values cannot be the same (${max6})`);
  }
  const amt = Math.abs(max6 - min6);
  return () => Math.floor(randomSource() * amt) + min6;
};
var integer = (maxOrOptions) => integerSource(maxOrOptions)();
var float = (maxOrOptions = 1) => floatSource(maxOrOptions)();
var shortGuid = (options = {}) => {
  const source = options.source ?? defaultRandom;
  const firstPart = Math.trunc(source() * 46656);
  const secondPart = Math.trunc(source() * 46656);
  const firstPartString = `000${firstPart.toString(36)}`.slice(-3);
  const secondPartString = `000${secondPart.toString(36)}`.slice(-3);
  return firstPartString + secondPartString;
};
var minutesMsSource = (maxMinutesOrOptions) => {
  const options = typeof maxMinutesOrOptions === `number` ? { max: maxMinutesOrOptions } : maxMinutesOrOptions;
  const min6 = (options.min ?? 0) * 60 * 1e3;
  const max6 = options.max * 60 * 1e3;
  return integerSource({ ...options, max: max6, min: min6 });
};
var minutesMs = (maxMinutesOrOptions) => minutesMsSource(maxMinutesOrOptions)();
var secondsMsSource = (maxSecondsOrOptions) => {
  const options = typeof maxSecondsOrOptions === `number` ? { max: maxSecondsOrOptions } : maxSecondsOrOptions;
  const min6 = (options.min ?? 0) * 1e3;
  const max6 = options.max * 1e3;
  return () => integer({ ...options, max: max6, min: min6 });
};
var secondsMs = (maxSecondsOrOptions) => secondsMsSource(maxSecondsOrOptions)();
function* integerUniqueGen(maxOrOptions) {
  const options = typeof maxOrOptions === `number` ? { max: maxOrOptions } : maxOrOptions;
  const min6 = options.min ?? 0;
  const max6 = options.max;
  const source = options.source ?? defaultRandom;
  const loop = options.loop ?? false;
  throwFromResult(integerTest(min6, ``, `min`));
  throwFromResult(integerTest(max6, ``, `max`));
  if (min6 > max6) {
    throw new Error(`Min value is greater than max. Min: ${min6} Max: ${max6}`);
  }
  const origRange = [...range2(min6, max6 - min6)];
  let numberRange = shuffle(origRange);
  let index = 0;
  while (true) {
    if (index === numberRange.length) {
      if (loop)
        numberRange = shuffle(origRange, source);
      else
        return;
    }
    yield numberRange[index++];
  }
}

// src/generators/index.ts
var numericRangeRaw = function* (interval2, start = 0, end, repeating = false) {
  if (interval2 <= 0)
    throw new Error(`Interval is expected to be above zero`);
  if (end === void 0)
    end = Number.MAX_SAFE_INTEGER;
  let v = start;
  do {
    while (v < end) {
      yield v;
      v += interval2;
    }
  } while (repeating);
};
function* stringSegmentsFromEnd(source, delimiter = `.`) {
  while (source.length > 0) {
    yield source;
    const trimmed = afterMatch(source, delimiter);
    if (trimmed === source) {
      break;
    }
    source = trimmed;
  }
}
var numericRange = function* (interval2, start = 0, end, repeating = false, rounding) {
  throwNumberTest(interval2, `nonZero`);
  const negativeInterval = interval2 < 0;
  if (end === void 0) {
  } else {
    if (negativeInterval && start < end) {
      throw new Error(
        `Interval of ${interval2} will never go from ${start} to ${end}`
      );
    }
    if (!negativeInterval && start > end) {
      throw new Error(
        `Interval of ${interval2} will never go from ${start} to ${end}`
      );
    }
  }
  rounding = rounding ?? 1e3;
  if (end === void 0)
    end = Number.MAX_SAFE_INTEGER;
  else
    end *= rounding;
  interval2 = interval2 * rounding;
  do {
    let v = start * rounding;
    while (!negativeInterval && v <= end || negativeInterval && v >= end) {
      yield v / rounding;
      v += interval2;
    }
  } while (repeating);
};
var count = function* (amount, offset = 0) {
  throwIntegerTest(amount, ``, `amount`);
  throwIntegerTest(offset, ``, `offset`);
  if (amount === 0)
    return;
  let index = 0;
  do {
    yield amount < 0 ? -index + offset : index + offset;
  } while (index++ < Math.abs(amount) - 1);
};
var numericPercent = function(interval2 = 0.01, repeating = false, start = 0, end = 1) {
  throwNumberTest(interval2, `percentage`, `interval`);
  throwNumberTest(start, `percentage`, `start`);
  throwNumberTest(end, `percentage`, `end`);
  return numericRange(interval2, start, end, repeating);
};

// src/Text.ts
var abbreviate = (source, maxLength = 15) => {
  throwFromResult(integerTest(maxLength, `aboveZero`, `maxLength`));
  if (typeof source !== `string`)
    throw new Error(`Parameter 'source' is not a string`);
  if (source.length > maxLength && source.length > 3) {
    if (maxLength > 15) {
      const chunk2 = Math.round((maxLength - 2) / 2);
      return source.slice(0, chunk2) + `...` + source.slice(-chunk2);
    }
    return source.slice(0, maxLength) + `...`;
  }
  return source;
};
var toStringAbbreviate = (source, maxLength = 20) => {
  if (source === void 0)
    return `(undefined)`;
  if (source === null)
    return `(null)`;
  return abbreviate(JSON.stringify(source), maxLength);
};
var between = (source, start, end, lastEndMatch = true) => {
  const startPos = source.indexOf(start);
  if (startPos < 0)
    return;
  if (end === void 0)
    end = start;
  const endPos = lastEndMatch ? source.lastIndexOf(end) : source.indexOf(end, startPos + 1);
  if (endPos < 0)
    return;
  return source.slice(startPos + 1, endPos);
};
var betweenChomp = (source, start, end, lastEndMatch = true) => {
  if (typeof source !== `string`)
    throw new Error(`Parameter 'source' is not a string`);
  if (typeof start !== `string`)
    throw new Error(`Parameter 'start' is not a string`);
  if (end !== void 0 && typeof end !== `string`)
    throw new Error(`Parameter 'end' is not a string`);
  const startPos = source.indexOf(start);
  if (startPos < 0)
    return [source, void 0];
  if (end === void 0)
    end = start;
  const endPos = lastEndMatch ? source.lastIndexOf(end) : source.indexOf(end, startPos + 1);
  if (endPos < 0)
    return [source, void 0];
  const between2 = source.slice(startPos + 1, endPos);
  const sourceResult = source.slice(0, startPos) + source.slice(endPos + 1);
  return [sourceResult, between2];
};
var indexOfCharCode = (source, code, start = 0, end = source.length - 1) => {
  for (let index = start; index <= end; index++) {
    if (source.codePointAt(index) === code)
      return index;
  }
  return -1;
};
var omitChars = (source, removeStart, removeLength) => source.slice(0, removeStart) + source.slice(removeStart + removeLength);
var splitByLength = (source, length2) => {
  throwFromResult(integerTest(length2, `aboveZero`, `length`));
  if (source === null)
    throw new Error(`source parameter null`);
  if (typeof source !== `string`) {
    throw new TypeError(`source parameter not a string`);
  }
  const chunks4 = Math.ceil(source.length / length2);
  const returnValue = [];
  let start = 0;
  for (let c = 0; c < chunks4; c++) {
    returnValue.push(source.slice(start, start + length2));
    start += length2;
  }
  return returnValue;
};
var untilMatch = (source, match, options = {}) => {
  let fallback = options.fallback;
  const ifNoMatch = options.ifNoMatch ?? (fallback ? `fallback` : `original`);
  if (ifNoMatch === `original`)
    fallback = source;
  if (ifNoMatch === `fallback` && fallback === void 0)
    throw new Error(`Fallback must be provided`);
  const startPos = options.startPos ?? void 0;
  const fromEnd = options.fromEnd ?? false;
  const m = fromEnd ? source.lastIndexOf(match, startPos) : source.indexOf(match, startPos);
  if (m < 0) {
    if (ifNoMatch === `throw`)
      throw new Error(`Match string not found in source`);
    return fallback;
  }
  return source.slice(startPos ?? 0, m);
};
var afterMatch = (source, match, options = {}) => {
  if (source === void 0)
    throw new Error(`source is undefined`);
  const startPos = options.startPos ?? void 0;
  const fromEnd = options.fromEnd ?? false;
  const m = fromEnd ? source.lastIndexOf(match, startPos) : source.indexOf(match, startPos);
  if (m < 0)
    return source;
  return source.slice(Math.max(0, m + match.length));
};
var unwrap = (source, ...wrappers) => {
  let matched = false;
  do {
    matched = false;
    for (const w of wrappers) {
      if (source.startsWith(w) && source.endsWith(w)) {
        source = source.slice(w.length, source.length - w.length * 2 + 1);
        matched = true;
      }
    }
  } while (matched);
  return source;
};
var lineSpan = (ranges, start, end) => {
  let s = -1;
  let endPos = -1;
  for (const [index, r] of ranges.entries()) {
    s = index;
    if (r.text.length === 0)
      continue;
    if (start < r.end) {
      break;
    }
  }
  for (let index = s; index < ranges.length; index++) {
    const r = ranges[index];
    endPos = index;
    if (end === r.end) {
      endPos = index + 1;
      break;
    }
    if (end < r.end) {
      break;
    }
  }
  return { length: endPos - s, start: s, end: endPos };
};
var splitRanges = (source, split) => {
  let start = 0;
  let text = ``;
  const ranges = [];
  let index = 0;
  for (let i = 0; i < source.length; i++) {
    if (source.indexOf(split, i) === i) {
      const end = i;
      ranges.push({
        text,
        start,
        end,
        index
      });
      start = end + 1;
      text = ``;
      index++;
    } else {
      text += source.charAt(i);
    }
  }
  if (start < source.length) {
    ranges.push({ text, start, index, end: source.length });
  }
  return ranges;
};
var countCharsFromStart = (source, ...chars) => {
  let counted = 0;
  for (let index = 0; index < source.length; index++) {
    if (chars.includes(source.charAt(index))) {
      counted++;
    } else {
      break;
    }
  }
  return counted;
};
var startsEnds = (source, start, end = start) => source.startsWith(start) && source.endsWith(end);
var htmlEntities = (source) => source.replaceAll(/[&<>\u00A0-\u9999]/g, (index) => `&#${index.codePointAt(0)};`);

// src/IsEqual.ts
var toStringDefault2 = (itemToMakeStringFor) => {
  switch (typeof itemToMakeStringFor) {
    case `string`: {
      return itemToMakeStringFor;
    }
    case `object`: {
      return JSON.stringify(itemToMakeStringFor);
    }
    default: {
      return `` + itemToMakeStringFor;
    }
  }
};
var toStringOrdered = (itemToMakeStringFor) => {
  if (typeof itemToMakeStringFor === `string`)
    return itemToMakeStringFor;
  const allKeys = /* @__PURE__ */ new Set();
  JSON.stringify(itemToMakeStringFor, (key, value2) => (allKeys.add(key), value2));
  return JSON.stringify(itemToMakeStringFor, [...allKeys].sort());
};
var isEqualDefault = (a, b) => a === b;
var isEqualValueDefault = (a, b) => {
  if (a === b)
    return true;
  return toStringDefault2(a) === toStringDefault2(b);
};
var isEqualValuePartial = (a, b, fieldComparer) => {
  if (typeof a !== `object`)
    throw new Error(`Parameter 'a' expected to be object`);
  if (typeof b !== `object`)
    throw new Error(`Parameter 'b' expected to be object`);
  if (Object.is(a, b))
    return true;
  const comparer = fieldComparer ?? isEqualValuePartial;
  for (const entryB of Object.entries(b)) {
    const valueA = a[entryB[0]];
    const valueB = entryB[1];
    if (typeof valueA === `object` && typeof valueB === `object`) {
      if (!comparer(valueA, valueB)) {
        return false;
      }
    } else {
      if (valueA !== valueB) {
        return false;
      }
    }
  }
  return true;
};
var isEqualTrace = (eq) => {
  return (a, b) => {
    const result = eq(a, b);
    console.log(`isEqualTrace eq: ${result} a: ${toStringAbbreviate(a)} b: ${toStringAbbreviate(b)}`);
    return result;
  };
};
var isEqualValueIgnoreOrder = (a, b) => {
  if (a === b)
    return true;
  return toStringOrdered(a) === toStringOrdered(b);
};

// src/collections/map/MapMultiFns.ts
var firstEntryByIterableValue2 = (map3, value2, isEqual2 = isEqualDefault) => {
  for (const e of map3.entries()) {
    const val = e[1];
    for (const subValue of val) {
      if (isEqual2(subValue, value2))
        return e;
    }
  }
};

// src/collections/map/MapOfSimpleBase.ts
var MapOfSimpleBase = class {
  map;
  groupBy;
  valueEq;
  /**
   * Constructor
   * @param groupBy Creates keys for values when using `addValue`. By default uses JSON.stringify
   * @param valueEq Compare values. By default uses JS logic for equality
   */
  constructor(groupBy2 = defaultKeyer, valueEq = isEqualDefault, initial = []) {
    this.groupBy = groupBy2;
    this.valueEq = valueEq;
    this.map = new Map(initial);
  }
  /**
   * Iterate over all entries
   */
  *entriesFlat() {
    for (const key of this.map.keys()) {
      for (const value2 of this.map.get(key)) {
        yield [key, value2];
      }
    }
  }
  *entries() {
    for (const [k, v] of this.map.entries()) {
      yield [k, [...v]];
    }
  }
  firstKeyByValue(value2, eq = isEqualDefault) {
    const entry = firstEntryByIterableValue2(this, value2, eq);
    if (entry)
      return entry[0];
  }
  /**
   * Get all values under `key`
   * @param key
   * @returns
   */
  *get(key) {
    const m = this.map.get(key);
    if (!m)
      return;
    yield* m.values();
  }
  /**
   * Iterate over all keys
   */
  *keys() {
    yield* this.map.keys();
  }
  /**
   * Iterate over all values (regardless of key)
   */
  *valuesFlat() {
    for (const entries of this.map) {
      yield* entries[1];
    }
  }
  /**
   * Iterate over keys and length of values stored under keys
   */
  *keysAndCounts() {
    for (const entries of this.map) {
      yield [entries[0], entries[1].length];
    }
  }
  /**
   * Returns _true_ if `key` exists
   * @param key
   * @returns
   */
  //eslint-disable-next-line functional/prefer-tacit
  has(key) {
    return this.map.has(key);
  }
  /**
   * Returns _true_ if `value` exists under `key`.
   * @param key Key
   * @param value Value to seek under `key`
   * @returns _True_ if `value` exists under `key`.
   */
  hasKeyValue(key, value2) {
    const values = this.map.get(key);
    if (!values)
      return false;
    for (const v of values) {
      if (this.valueEq(v, value2))
        return true;
    }
    return false;
  }
  /**
   * Debug dump of contents
   * @returns
   */
  debugString() {
    let r = ``;
    const keys = [...this.map.keys()];
    keys.every((k) => {
      const v = this.map.get(k);
      if (v === void 0)
        return;
      r += k + ` (${v.length}) = ${JSON.stringify(v)}\r
`;
    });
    return r;
  }
  /**
   * _True_ if empty
   */
  get isEmpty() {
    return this.map.size === 0;
  }
  /**
   * Return number of values stored under `key`.
   * Returns 0 if `key` is not found.
   * @param key
   * @returns
   */
  count(key) {
    const values = this.map.get(key);
    if (!values)
      return 0;
    return values.length;
  }
  get lengthKeys() {
    return this.map.size;
  }
};

// src/collections/map/MapOfSimpleMutable.ts
var MapOfSimpleMutable = class extends MapOfSimpleBase {
  addKeyedValues(key, ...values) {
    const existing = this.map.get(key);
    if (existing === void 0) {
      this.map.set(key, values);
    } else {
      this.map.set(key, [...existing, ...values]);
    }
  }
  /**
   * Adds a value, automatically extracting a key via the
   * `groupBy` function assigned in the constructor options.
   * @param values Adds several values
   */
  addValue(...values) {
    for (const v of values) {
      const key = this.groupBy(v);
      this.addKeyedValues(key, v);
    }
  }
  /**
   * Delete `value` under a particular `key`
   * @param key
   * @param value
   * @returns _True_ if `value` was found under `key`
   */
  deleteKeyValue(key, value2) {
    const existing = this.map.get(key);
    if (existing === void 0)
      return false;
    const without2 = existing.filter((existingValue) => !this.valueEq(existingValue, value2));
    this.map.set(key, without2);
    return without2.length < existing.length;
  }
  /**
   * Deletes `value` regardless of key.
   *
   * Uses the constructor-defined equality function.
   * @param value Value to delete
   * @returns
   */
  deleteByValue(value2) {
    let del2 = false;
    const entries = [...this.map.entries()];
    for (const keyEntries of entries) {
      for (const values of keyEntries[1]) {
        if (this.valueEq(values, value2)) {
          del2 = true;
          this.deleteKeyValue(keyEntries[0], value2);
        }
      }
    }
    return del2;
  }
  /**
   * Deletes all values under `key`,
   * @param key
   * @returns _True_ if `key` was found and values stored
   */
  delete(key) {
    const values = this.map.get(key);
    if (!values)
      return false;
    if (values.length === 0)
      return false;
    this.map.delete(key);
    return true;
  }
  /**
   * Clear contents
   */
  clear() {
    this.map.clear();
  }
};
var ofSimpleMutable = (groupBy2 = defaultKeyer, valueEq = isEqualDefault) => new MapOfSimpleMutable(groupBy2, valueEq);

// src/Events.ts
var SimpleEventEmitter = class {
  #listeners = ofSimpleMutable();
  /**
   * Fire event
   * @private
   * @param type Type of event
   * @param args Arguments for event
   * @returns
   */
  fireEvent(type, args) {
    const listeners = this.#listeners.get(type);
    for (const l of listeners) {
      l(args, this);
    }
  }
  /**
   * Adds event listener
   *
   * @template K
   * @param {K} type
   * @param {Listener<Events>} listener
   * @memberof SimpleEventEmitter
   */
  addEventListener(type, listener) {
    this.#listeners.addKeyedValues(
      type,
      listener
    );
  }
  /**
   * Remove event listener
   *
   * @param {Listener<Events>} listener
   * @memberof SimpleEventEmitter
   */
  removeEventListener(type, listener) {
    this.#listeners.deleteKeyValue(
      type,
      listener
    );
  }
  /**
   * Clear all event listeners
   * @private
   * @memberof SimpleEventEmitter
   */
  clearEventListeners() {
    this.#listeners.clear();
  }
};

export {
  defaultRandom,
  string,
  pingPongPercent,
  pingPong,
  IterableSync_exports,
  round,
  intervalToMs,
  isInterval,
  clamp,
  clampIndex,
  hasElapsed,
  frequencyTimerSource,
  relativeTimer,
  frequencyTimer,
  msElapsedTimer,
  ticksElapsedTimer,
  Elapsed_exports,
  DispatchList,
  sleep,
  MapOfSimpleMutable,
  ofSimpleMutable,
  SimpleEventEmitter,
  Events_exports,
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
  QueueMutable,
  mutable,
  TaskQueue,
  forEach3 as forEach,
  forEachAsync,
  repeat,
  repeatReduce,
  flow_exports,
  circularArray,
  StackMutable,
  compare,
  TreeMutable_exports,
  isPrimitive,
  getSorter,
  minMaxAvg2 as minMaxAvg,
  KeyValue_exports,
  depthFirst2 as depthFirst,
  TraverseObject_exports,
  Pathed_exports,
  TraversableTree_exports,
  toTraversable,
  isTreeNode,
  isTraversable,
  tree_exports,
  compareValuesEqual,
  compareValues,
  Iterables_exports,
  StackImmutable,
  stack_exports,
  mutable3 as mutable2,
  SetStringMutable,
  SetStringImmutable,
  immutable2 as immutable,
  set_exports,
  QueueImmutable,
  immutable3 as immutable2,
  PriorityMutable,
  priority,
  queue_exports,
  getClosestIntegerKey,
  getFromKeys,
  hasKeyValue,
  deleteByValue,
  firstEntryByIterablePredicate,
  firstEntryByIterableValue,
  addKeepingExisting,
  sortByValue,
  sortByValueProperty,
  hasAnyValue,
  filter3 as filter,
  toArray2 as toArray,
  fromIterable2 as fromIterable,
  fromObject,
  addObject,
  find3 as find,
  mapToObjectTransform,
  zipKeyValue,
  transformMap,
  toObject,
  mapToArray,
  mergeByKey,
  create3 as create,
  ExpiringMap,
  immutable4 as immutable3,
  mutable4 as mutable3,
  MapOfMutableImpl,
  ofSetMutable,
  ofCircularMutable,
  NumberMap,
  ofArrayMutable,
  Map_exports,
  collections_exports,
  chain_exports,
  floatSource,
  randomHue,
  opacity,
  getCssVariable,
  Colour_exports,
  wrapInteger,
  wrap2 as wrap,
  wrapRange,
  interpolate2 as interpolate,
  interpolateAngle,
  Easing_exports,
  weighted,
  weightedSource,
  weightedIndex,
  weightedIntegerSource,
  weightedInteger,
  gaussian2 as gaussian,
  gaussianSource,
  integerSource,
  integer,
  float,
  shortGuid,
  minutesMsSource,
  minutesMs,
  secondsMsSource,
  secondsMs,
  integerUniqueGen,
  random_exports,
  numericRangeRaw,
  stringSegmentsFromEnd,
  numericRange,
  count,
  numericPercent,
  generators_exports,
  abbreviate,
  toStringAbbreviate,
  between,
  betweenChomp,
  indexOfCharCode,
  omitChars,
  splitByLength,
  untilMatch,
  afterMatch,
  unwrap,
  lineSpan,
  splitRanges,
  countCharsFromStart,
  startsEnds,
  htmlEntities,
  Text_exports,
  toStringDefault2 as toStringDefault,
  toStringOrdered,
  isEqualDefault,
  isEqualValueDefault,
  isEqualValuePartial,
  isEqualTrace,
  isEqualValueIgnoreOrder,
  IterableAsync_exports,
  isFunction,
  isPlainObject,
  isInteger,
  isPlainObjectOrPrimitive,
  ifNaN,
  isPowerOfTwo,
  relativeDifference,
  roundUpToMultiple,
  isMap,
  isSet,
  toStringDefault as toStringDefault2,
  runningiOS,
  numericComparer,
  jsComparer,
  defaultComparer,
  comparerInverse,
  defaultKeyer,
  Util_exports,
  guardArray,
  guardIndex,
  valuesEqual,
  filterBetween,
  minMaxAvg as minMaxAvg2,
  weight,
  validNumbers,
  dotProduct,
  average,
  min3 as min,
  maxIndex,
  minIndex,
  max3 as max,
  total,
  maxFast,
  totalFast,
  minFast,
  cycle,
  zip3 as zip,
  averageWeighted,
  sortByNumericProperty,
  intersection,
  flatten3 as flatten,
  interleave,
  ensureLength,
  randomIndex,
  randomElementWeightedSource,
  randomElement,
  randomPluck,
  shuffle,
  without,
  withoutUndefined,
  until,
  remove,
  groupBy,
  sample,
  chunks3 as chunks,
  mergeByKey2,
  reducePairwise,
  filterAB,
  unique3 as unique,
  containsDuplicateValues,
  containsDuplicateInstances,
  isEqual,
  contains,
  additionalValues,
  arrays_exports
};
