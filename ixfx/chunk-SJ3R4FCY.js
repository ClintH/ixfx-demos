import {
  sleep
} from "./chunk-RNUQGND2.js";
import {
  isAsyncIterable,
  isIterable
} from "./chunk-SP37NBBE.js";
import {
  intervalToMs
} from "./chunk-37WZU5ZM.js";
import {
  toStringDefault
} from "./chunk-SGQC7FGM.js";
import {
  __export
} from "./chunk-AFNFQUHK.js";

// src/iterables/IterableAsync.ts
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
  fromFunction: () => fromFunction,
  fromFunctionAwaited: () => fromFunctionAwaited,
  fromIterable: () => fromIterable,
  map: () => map,
  max: () => max,
  min: () => min,
  nextWithTimeout: () => nextWithTimeout,
  reduce: () => reduce,
  repeat: () => repeat,
  slice: () => slice,
  some: () => some,
  toArray: () => toArray,
  unique: () => unique,
  uniqueByValue: () => uniqueByValue,
  until: () => until,
  withDelay: () => withDelay,
  zip: () => zip
});
async function* fromArray(array, interval = 1) {
  for (const v of array) {
    yield v;
    await sleep(interval);
  }
}
async function* fromIterable(iterable, interval = 1) {
  for await (const v of iterable) {
    yield v;
    await sleep(interval);
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
  if (buffer.length > 0) yield buffer;
}
async function* concat(...its) {
  for await (const it of its) yield* it;
}
async function* dropWhile(it, f) {
  for await (const v of it) {
    if (!f(v)) {
      yield v;
    }
  }
}
var until = async (it, callback) => {
  for await (const _ of it) {
    const value = await callback();
    if (typeof value === `boolean` && !value) break;
  }
};
var repeat = async function* (genCreator, repeatsOrSignal) {
  const repeats = typeof repeatsOrSignal === `number` ? repeatsOrSignal : Number.POSITIVE_INFINITY;
  const signal = typeof repeatsOrSignal === `number` ? void 0 : repeatsOrSignal;
  let count = repeats;
  while (true) {
    for await (const v of genCreator()) {
      yield v;
      if (signal?.aborted) break;
    }
    if (Number.isFinite(repeats)) {
      count--;
      if (count === 0) break;
    }
    if (signal?.aborted) break;
  }
};
async function equals(it1, it2, equality) {
  const iit1 = it1[Symbol.asyncIterator]();
  const iit2 = it2[Symbol.asyncIterator]();
  while (true) {
    const index1 = await iit1.next();
    const index2 = await iit2.next();
    if (equality !== void 0) {
      if (!equality(index1.value, index2.value)) return false;
    } else if (index1.value !== index2.value) return false;
    if (index1.done ?? index2.done) return index1.done && index2.done;
  }
}
async function every(it, f) {
  for await (const v of it) {
    const result = await f(v);
    if (!result) return false;
  }
  return true;
}
async function* fill(it, v) {
  for await (const _ of it) yield v;
}
async function* filter(it, f) {
  for await (const v of it) {
    if (!await f(v)) continue;
    yield v;
  }
}
async function find(it, f) {
  for await (const v of it) {
    if (await f(v)) return v;
  }
}
async function* flatten(it) {
  for await (const v of it) {
    if (typeof v === `object`) {
      if (Array.isArray(v)) {
        for (const vv of v) yield vv;
      } else if (isAsyncIterable(v)) {
        for await (const vv of v) {
          yield vv;
        }
      } else if (isIterable(v)) {
        for (const vv of v) {
          yield vv;
        }
      }
    } else {
      yield v;
    }
  }
}
async function forEach(it, f) {
  for await (const v of it) {
    const result = await f(v);
    if (typeof result === `boolean` && !result) break;
  }
}
async function* map(it, f) {
  for await (const v of it) {
    yield f(v);
  }
}
async function* max(it, gt = (a, b) => a > b) {
  let max3;
  for await (const v of it) {
    if (max3 === void 0) {
      max3 = v;
      yield max3;
      continue;
    }
    if (gt(v, max3)) {
      max3 = v;
      yield v;
    }
  }
}
async function* min(it, gt = (a, b) => a > b) {
  let min3;
  for await (const v of it) {
    if (min3 === void 0) {
      min3 = v;
      yield min3;
      continue;
    }
    if (gt(min3, v)) {
      min3 = v;
      yield v;
    }
  }
  return min3;
}
async function reduce(it, f, start) {
  for await (const v of it) start = f(start, v);
  return start;
}
async function* slice(it, start = 0, end = Number.POSITIVE_INFINITY) {
  const iit = it[Symbol.asyncIterator]();
  for (; start > 0; start--, end--) await iit.next();
  for await (const v of it) {
    if (end-- > 0) {
      yield v;
    } else {
      break;
    }
  }
}
async function* withDelay(it, delay) {
  for (const v of it) {
    await sleep(delay);
    yield v;
  }
}
async function nextWithTimeout(it, options) {
  const ms = intervalToMs(options, 1e3);
  const value = await Promise.race([
    (async () => {
      await sleep({ millis: ms, signal: options.signal });
      return void 0;
    })(),
    (async () => {
      return await it.next();
    })()
  ]);
  if (value === void 0) throw new Error(`Timeout`);
  return value;
}
async function some(it, f) {
  for await (const v of it) {
    if (await f(v)) return true;
  }
  return false;
}
async function toArray(it, options = {}) {
  const result = [];
  const iterator = it[Symbol.asyncIterator]();
  const started = Date.now();
  const maxItems = options.limit ?? Number.POSITIVE_INFINITY;
  const maxElapsed = intervalToMs(options.elapsed, Number.POSITIVE_INFINITY);
  while (result.length < maxItems && Date.now() - started < maxElapsed) {
    const r = await iterator.next();
    if (r.done) break;
    result.push(r.value);
  }
  return result;
}
async function* fromFunctionAwaited(callback) {
  while (true) {
    const v = await callback();
    yield v;
  }
}
function* fromFunction(callback) {
  while (true) {
    const v = callback();
    yield v;
  }
}
async function* unique(iterable) {
  const buffer = [];
  const itera = Array.isArray(iterable) ? iterable : [iterable];
  for await (const it of itera) {
    for await (const v of it) {
      if (buffer.includes(v)) continue;
      buffer.push(v);
      yield v;
    }
  }
}
async function* uniqueByValue(input, toString = toStringDefault, seen = /* @__PURE__ */ new Set()) {
  for await (const v of input) {
    const key = toString(v);
    if (seen.has(key)) continue;
    seen.add(key);
    yield v;
  }
}
async function* zip(...its) {
  const iits = its.map((it) => it[Symbol.asyncIterator]());
  while (true) {
    const vs = await Promise.all(iits.map((it) => it.next()));
    if (vs.some((v) => v.done)) return;
    yield vs.map((v) => v.value);
  }
}

// src/data/BasicProcessors.ts
var max2 = () => {
  let max3 = Number.MIN_SAFE_INTEGER;
  const compute = (value) => {
    const valueArray = Array.isArray(value) ? value : [value];
    for (const subValue of valueArray) {
      if (typeof subValue !== `number`) break;
      max3 = Math.max(subValue, max3);
    }
    return max3;
  };
  return compute;
};
var min2 = () => {
  let min3 = Number.MAX_SAFE_INTEGER;
  const compute = (value) => {
    const valueArray = Array.isArray(value) ? value : [value];
    for (const subValue of valueArray) {
      if (typeof subValue !== `number`) break;
      min3 = Math.min(subValue, min3);
    }
    return min3;
  };
  return compute;
};
var sum = () => {
  let t = 0;
  const compute = (value) => {
    const valueArray = Array.isArray(value) ? value : [value];
    for (const subValue of valueArray) {
      if (typeof subValue !== `number`) continue;
      t += subValue;
    }
    return t;
  };
  return compute;
};
var average = () => {
  let total = 0;
  let tally2 = 0;
  const compute = (value) => {
    const valueArray = Array.isArray(value) ? value : [value];
    for (const subValue of valueArray) {
      if (typeof subValue !== `number`) continue;
      tally2++;
      total += subValue;
    }
    return total / tally2;
  };
  return compute;
};
var tally = (countArrayItems) => {
  let t = 0;
  const compute = (value) => {
    if (countArrayItems) {
      if (Array.isArray(value)) t += value.length;
      else t++;
    } else {
      t++;
    }
    return t;
  };
  return compute;
};
function rank(r, options = {}) {
  const includeType = options.includeType;
  const emitEqualRanked = options.emitEqualRanked ?? false;
  const emitRepeatHighest = options.emitRepeatHighest ?? false;
  let best;
  return (value) => {
    if (includeType && typeof value !== includeType) return;
    if (best === void 0) {
      best = value;
      return best;
    } else {
      const result = r(value, best);
      if (result == `a`) {
        best = value;
        return best;
      } else if (result === `eq` && emitEqualRanked) {
        return best;
      } else if (emitRepeatHighest) {
        return best;
      }
    }
  };
}

export {
  max2 as max,
  min2 as min,
  sum,
  average,
  tally,
  rank,
  fromArray,
  fromIterable,
  chunks,
  concat,
  dropWhile,
  until,
  equals,
  every,
  fill,
  filter,
  find,
  flatten,
  forEach,
  map,
  max as max2,
  min as min2,
  reduce,
  slice,
  nextWithTimeout,
  some,
  toArray,
  unique,
  uniqueByValue,
  zip,
  IterableAsync_exports
};
//# sourceMappingURL=chunk-SJ3R4FCY.js.map