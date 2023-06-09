import {
  integer,
  number
} from "./chunk-5M4HS36T.js";
import {
  __export
} from "./chunk-H4X2M26K.js";

// src/Generators.ts
var Generators_exports = {};
__export(Generators_exports, {
  Async: () => IterableAsync_exports,
  Sync: () => IterableSync_exports,
  count: () => count,
  delayLoop: () => delayLoop,
  interval: () => interval,
  numericPercent: () => numericPercent,
  numericRange: () => numericRange,
  numericRangeRaw: () => numericRangeRaw,
  pingPong: () => pingPong,
  pingPongPercent: () => pingPongPercent
});

// src/modulation/PingPong.ts
var pingPongPercent = function(interval2 = 0.1, lower, upper, start, rounding) {
  if (lower === void 0)
    lower = 0;
  if (upper === void 0)
    upper = 1;
  if (start === void 0)
    start = lower;
  number(interval2, `bipolar`, `interval`);
  number(upper, `bipolar`, `end`);
  number(start, `bipolar`, `offset`);
  number(lower, `bipolar`, `start`);
  return pingPong(interval2, lower, upper, start, rounding);
};
var pingPong = function* (interval2, lower, upper, start, rounding) {
  if (lower === void 0)
    throw new Error(`Parameter 'lower' is undefined`);
  if (interval2 === void 0)
    throw new Error(`Parameter 'interval' is undefined`);
  if (upper === void 0)
    throw new Error(`Parameter 'upper' is undefined`);
  if (rounding === void 0 && (interval2 <= 1 && interval2 >= 0))
    rounding = 10 / interval2;
  else if (rounding === void 0)
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
  if (Math.abs(interval2) >= distance)
    throw new Error(`Interval should be between -${distance} and ${distance}`);
  let incrementing = interval2 > 0;
  upper = Math.floor(upper * rounding);
  lower = Math.floor(lower * rounding);
  interval2 = Math.floor(Math.abs(interval2 * rounding));
  if (interval2 === 0)
    throw new Error(`Interval is zero (rounding: ${rounding})`);
  if (start === void 0)
    start = lower;
  else
    start = Math.floor(start * rounding);
  if (start > upper || start < lower)
    throw new Error(`Start (${start / rounding}) must be within lower (${lower / rounding}) and upper (${upper / rounding})`);
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

// src/IterableAsync.ts
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
  const iit1 = it1[Symbol.iterator]();
  const iit2 = it2[Symbol.iterator]();
  while (true) {
    const i1 = await iit1.next(), i2 = await iit2.next();
    if (equality !== void 0) {
      if (!equality(i1.value, i2.value))
        return false;
    } else if (i1.value !== i2.value)
      return false;
    if (i1.done || i2.done)
      return i1.done && i2.done;
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
  let max3;
  for await (const v of it) {
    if (!max3) {
      max3 = v;
      continue;
    }
    max3 = gt(max3, v) ? max3 : v;
  }
  return max3;
}
async function min(it, gt = (a, b) => a > b) {
  let min3;
  for await (const v of it) {
    if (!min3) {
      min3 = v;
      continue;
    }
    min3 = gt(min3, v) ? v : min3;
  }
  return min3;
}
async function* range(start, len) {
  for (let i = 0; i < len; i++) {
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
async function toArray(it, count2 = Infinity) {
  const result = [];
  const iterator = it[Symbol.asyncIterator]();
  while (result.length < count2) {
    const { value, done } = await iterator.next();
    if (done)
      break;
    result.push(value);
  }
  return result;
}
async function* unique(it, f = (id) => id) {
  const buffer = [];
  for await (const v of it) {
    const fv = f(v);
    if (buffer.indexOf(fv) !== -1)
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

// src/IterableSync.ts
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
  zip: () => zip2
});
function first(it) {
  for (const val of it) {
    return val;
  }
}
function last(it) {
  let ret;
  for (const val of it) {
    ret = val;
  }
  return ret;
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
    const i1 = it1.next(), i2 = it2.next();
    if (equality !== void 0) {
      if (!equality(i1.value, i2.value))
        return false;
    } else if (i1.value !== i2.value)
      return false;
    if (i1.done || i2.done)
      return i1.done && i2.done;
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
  let max3;
  for (const v of it) {
    if (!max3) {
      max3 = v;
      continue;
    }
    max3 = gt(max3, v) ? max3 : v;
  }
  return max3;
}
function min2(it, gt = (a, b) => a > b) {
  let min3;
  for (const v of it) {
    if (!min3) {
      min3 = v;
      continue;
    }
    min3 = gt(min3, v) ? v : min3;
  }
  return min3;
}
function* range2(start, len) {
  for (let i = 0; i < len; i++) {
    yield start++;
  }
}
function reduce2(it, f, start) {
  for (const v of it)
    start = f(start, v);
  return start;
}
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
function* unique2(it, f = (id) => id) {
  const buffer = [];
  for (const v of it) {
    const fv = f(v);
    if (buffer.indexOf(fv) !== -1)
      continue;
    buffer.push(fv);
    yield v;
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

// src/flow/Sleep.ts
var sleep = (timeoutMs, value, signal) => {
  integer(timeoutMs, `positive`, `timeoutMs`);
  if (timeoutMs === 0) {
    return new Promise((resolve) => requestAnimationFrame((_) => {
      resolve(value);
    }));
  } else {
    return new Promise((resolve, reject) => {
      if (signal) {
        signal.addEventListener(`abort`, () => {
          reject(`Aborted`);
        });
      }
      setTimeout(() => {
        signal?.throwIfAborted();
        resolve(value);
      }, timeoutMs);
    });
  }
};

// src/flow/Interval.ts
var interval = async function* (produce, intervalMs, signal) {
  let cancelled = false;
  try {
    while (!cancelled) {
      await sleep(intervalMs, signal);
      if (signal.aborted)
        throw new Error(`Signal aborted ${signal.reason}`);
      if (cancelled)
        return;
      if (typeof produce === `function`) {
        const result = await produce();
        yield result;
      } else if (typeof produce === `object`) {
        if (`next` in produce && `return` in produce && `throw` in produce) {
          const result = await produce.next();
          if (result.done)
            return;
          yield result.value;
        } else {
          throw new Error(`interval: produce param does not seem to be a generator?`);
        }
      } else {
        throw new Error(`produce param does not seem to return a value/Promise and is not a generator?`);
      }
    }
  } finally {
    cancelled = true;
  }
};

// src/flow/Delay.ts
var delay = async (callback, timeoutMs) => {
  await sleep(timeoutMs);
  return Promise.resolve(await callback());
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
async function* delayLoop(timeoutMs) {
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

// src/Generators.ts
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
var numericRange = function* (interval2, start = 0, end, repeating = false, rounding) {
  number(interval2, `nonZero`);
  const negativeInterval = interval2 < 0;
  if (end === void 0) {
  } else {
    if (negativeInterval && start < end)
      throw new Error(`Interval of ${interval2} will never go from ${start} to ${end}`);
    if (!negativeInterval && start > end)
      throw new Error(`Interval of ${interval2} will never go from ${start} to ${end}`);
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
  integer(amount, ``, `amount`);
  integer(offset, ``, `offset`);
  if (amount === 0)
    return;
  let i = 0;
  do {
    if (amount < 0)
      yield -i + offset;
    else
      yield i + offset;
  } while (i++ < Math.abs(amount) - 1);
};
var numericPercent = function(interval2 = 0.01, repeating = false, start = 0, end = 1) {
  number(interval2, `percentage`, `interval`);
  number(start, `percentage`, `start`);
  number(end, `percentage`, `end`);
  return numericRange(interval2, start, end, repeating);
};

export {
  IterableAsync_exports,
  last,
  range2 as range,
  IterableSync_exports,
  sleep,
  interval,
  delay,
  delayLoop,
  pingPongPercent,
  pingPong,
  numericRangeRaw,
  numericRange,
  count,
  numericPercent,
  Generators_exports
};
//# sourceMappingURL=chunk-3DT5MWXD.js.map