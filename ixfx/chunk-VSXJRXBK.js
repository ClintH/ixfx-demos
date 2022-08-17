import {
  IterableAsync_exports
} from "./chunk-WNVEM7O7.js";
import {
  delayLoop,
  interval
} from "./chunk-LWEMLAJY.js";
import {
  integer,
  number
} from "./chunk-U4IZE4J2.js";
import {
  __export
} from "./chunk-6SYKIMQH.js";

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

// src/IterableSync.ts
var IterableSync_exports = {};
__export(IterableSync_exports, {
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
  unique: () => unique,
  zip: () => zip
});
function* chunks(it, size) {
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
function* concat(...its) {
  for (const it of its)
    yield* it;
}
function* dropWhile(it, f) {
  for (const v of it) {
    if (!f(v)) {
      yield v;
      break;
    }
  }
  yield* it;
}
function equals(it1, it2, equality) {
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
function every(it, f) {
  let ok = true;
  for (const v of it)
    ok = ok && f(v);
  return ok;
}
function* fill(it, v) {
  for (const _ of it)
    yield v;
}
function forEach(it, f) {
  for (const v of it)
    f(v);
}
function* filter(it, f) {
  for (const v of it) {
    if (!f(v))
      continue;
    yield v;
  }
}
function find(it, f) {
  for (const v of it) {
    if (f(v))
      return v;
  }
}
function* flatten(it) {
  for (const v of it) {
    if (Symbol.iterator in v) {
      yield* v;
    } else {
      yield v;
    }
  }
}
function* map(it, f) {
  for (const v of it) {
    yield f(v);
  }
}
function max(it, gt = (a, b) => a > b) {
  let max2;
  for (const v of it) {
    if (!max2) {
      max2 = v;
      continue;
    }
    max2 = gt(max2, v) ? max2 : v;
  }
  return max2;
}
function min(it, gt = (a, b) => a > b) {
  let min2;
  for (const v of it) {
    if (!min2) {
      min2 = v;
      continue;
    }
    min2 = gt(min2, v) ? v : min2;
  }
  return min2;
}
function* range(start, len) {
  for (let i = 0; i < len; i++) {
    yield start++;
  }
}
function reduce(it, f, start) {
  for (const v of it)
    start = f(start, v);
  return start;
}
function* slice(it, start = 0, end = Number.POSITIVE_INFINITY) {
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
function some(it, f) {
  for (const v of it) {
    if (f(v))
      return true;
  }
  return false;
}
function* takeWhile(it, f) {
  for (const v of it) {
    if (!f(v))
      return;
    yield v;
  }
}
function* unique(it, f = (id) => id) {
  const buffer = [];
  for (const v of it) {
    const fv = f(v);
    if (buffer.indexOf(fv) !== -1)
      continue;
    buffer.push(fv);
    yield v;
  }
}
function* zip(...its) {
  const iits = its.map((it) => it[Symbol.iterator]());
  while (true) {
    const vs = iits.map((it) => it.next());
    if (vs.some((v) => v.done))
      return;
    yield vs.map((v) => v.value);
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
  pingPongPercent,
  pingPong,
  IterableSync_exports,
  numericRangeRaw,
  numericRange,
  count,
  numericPercent,
  Generators_exports
};
//# sourceMappingURL=chunk-VSXJRXBK.js.map