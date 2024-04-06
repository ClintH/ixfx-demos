import {
  slice
} from "./chunk-BLGLFIG7.js";
import {
  isIterable,
  toStringDefault2 as toStringDefault
} from "./chunk-ESXWQDUL.js";
import {
  __export
} from "./chunk-Q2EHUQVZ.js";

// src/iterables/IterableSync.ts
var IterableSync_exports = {};
__export(IterableSync_exports, {
  chunks: () => chunks,
  chunksOverlapping: () => chunksOverlapping,
  concat: () => concat,
  dropWhile: () => dropWhile,
  equals: () => equals,
  every: () => every,
  fill: () => fill,
  filter: () => filter,
  find: () => find,
  first: () => first,
  flatten: () => flatten,
  forEach: () => forEach,
  fromArray: () => fromArray,
  fromIterable: () => fromIterable,
  last: () => last,
  map: () => map,
  max: () => max,
  min: () => min,
  reduce: () => reduce,
  repeat: () => repeat,
  slice: () => slice,
  some: () => some,
  toArray: () => toArray,
  unique: () => unique,
  uniqueByValue: () => uniqueByValue,
  until: () => until,
  yieldNumber: () => yieldNumber,
  zip: () => zip
});
function* uniqueByValue(input, toString = toStringDefault, seen = /* @__PURE__ */ new Set()) {
  for (const v of input) {
    const key = toString(v);
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
  for (const value of it) {
    return value;
  }
}
function last(it) {
  let returnValue;
  for (const value of it) {
    returnValue = value;
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
    }
  }
}
var until = (it, callback) => {
  for (const _ of it) {
    const value = callback();
    if (typeof value === `boolean` && !value)
      break;
  }
};
function equals(it1, it2, equality) {
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
function every(it, f) {
  for (const v of it) {
    const result = f(v);
    if (!result)
      return false;
  }
  return true;
}
function* fill(it, v) {
  for (const _ of it)
    yield v;
}
function forEach(it, f) {
  for (const v of it) {
    const result = f(v);
    if (typeof result === `boolean` && !result)
      break;
  }
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
    if (typeof v === `object`) {
      if (Array.isArray(v)) {
        for (const vv of v)
          yield vv;
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
function* map(it, f) {
  for (const v of it) {
    yield f(v);
  }
}
function* max(it, gt = (a, b) => a > b) {
  let max2;
  for (const v of it) {
    if (max2 === void 0) {
      max2 = v;
      yield max2;
      continue;
    }
    if (gt(v, max2)) {
      max2 = v;
      yield max2;
    }
  }
  return max2;
}
function* min(it, gt = (a, b) => a > b) {
  let min2;
  for (const v of it) {
    if (min2 === void 0) {
      min2 = v;
      yield min2;
    }
    if (gt(min2, v)) {
      min2 = v;
      yield min2;
    }
  }
}
function reduce(it, f, start) {
  for (const v of it)
    start = f(start, v);
  return start;
}
function some(it, f) {
  for (const v of it) {
    if (f(v))
      return true;
  }
  return false;
}
function* repeat(genCreator, repeatsOrSignal) {
  const repeats = typeof repeatsOrSignal === `number` ? repeatsOrSignal : Number.POSITIVE_INFINITY;
  const signal = typeof repeatsOrSignal === `number` ? void 0 : repeatsOrSignal;
  let count = repeats;
  while (true) {
    for (const v of genCreator()) {
      yield v;
      if (signal?.aborted)
        break;
    }
    if (Number.isFinite(repeats)) {
      count--;
      if (count === 0)
        break;
    }
    if (signal?.aborted)
      break;
  }
}
function* unique(iterable) {
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
function* zip(...its) {
  const iits = its.map((it) => it[Symbol.iterator]());
  while (true) {
    const vs = iits.map((it) => it.next());
    if (vs.some((v) => v.done))
      return;
    yield vs.map((v) => v.value);
  }
}
function* fromIterable(iterable) {
  for (const v of iterable) {
    yield v;
  }
}
function toArray(it, count = Number.POSITIVE_INFINITY) {
  const result = [];
  for (const v of it) {
    if (result.length === count)
      break;
    result.push(v);
  }
  return result;
}
function* fromArray(array) {
  for (const v of array) {
    yield v;
  }
}

export {
  uniqueByValue,
  last,
  chunks,
  concat,
  dropWhile,
  until,
  equals,
  every,
  fill,
  forEach,
  filter,
  find,
  flatten,
  map,
  max,
  min,
  reduce,
  some,
  unique,
  zip,
  fromIterable,
  toArray,
  fromArray,
  IterableSync_exports
};
//# sourceMappingURL=chunk-2MOQXBDW.js.map