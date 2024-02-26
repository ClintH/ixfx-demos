import {
  toStringAbbreviate
} from "./chunk-MX6757FI.js";
import {
  numberTest,
  throwFromResult,
  throwNumberTest
} from "./chunk-UKONBQSB.js";
import {
  __export
} from "./chunk-ERASX3TW.js";

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
  toStringDefault: () => toStringDefault2
});

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

// src/IsEqual.ts
var toStringDefault = (itemToMakeStringFor) => {
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
  JSON.stringify(itemToMakeStringFor, (key, value) => (allKeys.add(key), value));
  return JSON.stringify(itemToMakeStringFor, [...allKeys].sort());
};
var isEqualDefault = (a, b) => a === b;
var isEqualValueDefault = (a, b) => {
  if (a === b)
    return true;
  return toStringDefault(a) === toStringDefault(b);
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

// src/flow/IntervalType.ts
function intervalToMs(interval, defaultNumber) {
  if (isInterval(interval)) {
    if (typeof interval === `number`)
      return interval;
    let ms = interval.millis ?? 0;
    ms += (interval.hours ?? 0) * 60 * 60 * 1e3;
    ms += (interval.mins ?? 0) * 60 * 1e3;
    ms += (interval.secs ?? 0) * 1e3;
    return ms;
  } else {
    if (typeof defaultNumber !== `undefined`)
      return defaultNumber;
    throw new Error(`Not a valid interval: ${interval}`);
  }
}
function isInterval(interval) {
  if (interval === void 0)
    return false;
  if (interval === null)
    return false;
  if (typeof interval === `number`) {
    if (Number.isNaN(interval))
      return false;
    if (!Number.isFinite(interval))
      return false;
    return true;
  } else if (typeof interval !== `object`)
    return false;
  const hasMillis = `millis` in interval;
  const hasSecs = `secs` in interval;
  const hasMins = `mins` in interval;
  const hasHours = `hours` in interval;
  if (hasMillis && !numberTest(interval.millis)[0])
    return false;
  if (hasSecs && !numberTest(interval.secs)[0])
    return false;
  if (hasMins && !numberTest(interval.mins)[0])
    return false;
  if (hasHours && !numberTest(interval.hours)[0])
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
        resolve(value);
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
  let max2;
  for await (const v of it) {
    if (!max2) {
      max2 = v;
      continue;
    }
    max2 = gt(max2, v) ? max2 : v;
  }
  return max2;
}
async function min(it, gt = (a, b) => a > b) {
  let min2;
  for await (const v of it) {
    if (!min2) {
      min2 = v;
      continue;
    }
    min2 = gt(min2, v) ? v : min2;
  }
  return min2;
}
async function* range(start, length) {
  for (let index = 0; index < length; index++) {
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
async function toArray(it, count = Number.POSITIVE_INFINITY) {
  const result = [];
  const iterator = it[Symbol.asyncIterator]();
  while (result.length < count) {
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

// src/Util.ts
var isFunction = (object) => object instanceof Function;
var isPlainObject = (value) => {
  if (typeof value !== `object` || value === null)
    return false;
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
};
var isInteger = (value) => {
  if (value === void 0)
    return false;
  if (typeof value === `string`) {
    const v = Number.parseInt(value);
    if (Number.isNaN(v))
      return false;
    if (v.toString() === value.toString())
      return true;
    return false;
  }
  if (typeof value === `number`) {
    if (Number.isNaN(value))
      return false;
    if (!Number.isFinite(value))
      return false;
    if (Math.round(value) === value)
      return true;
    return false;
  }
  return false;
};
var isPlainObjectOrPrimitive = (value) => {
  const t = typeof value;
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
  return isPlainObject(value);
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
var toTypeString = (value) => objectToString.call(value);
var isMap = (value) => toTypeString(value) === `[object Map]`;
var isSet = (value) => toTypeString(value) === `[object Set]`;
var toStringDefault2 = (itemToMakeStringFor) => typeof itemToMakeStringFor === `string` ? itemToMakeStringFor : JSON.stringify(itemToMakeStringFor);
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

export {
  toStringDefault,
  toStringOrdered,
  isEqualDefault,
  isEqualValueDefault,
  isEqualValuePartial,
  isEqualTrace,
  isEqualValueIgnoreOrder,
  intervalToMs,
  isInterval,
  sleep,
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
  toStringDefault2,
  runningiOS,
  numericComparer,
  jsComparer,
  defaultComparer,
  comparerInverse,
  defaultKeyer,
  Util_exports
};
