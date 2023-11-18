import {
  slice
} from "./chunk-HR35CHTB.js";
import {
  toStringDefault2 as toStringDefault
} from "./chunk-7X5X4U3O.js";
import {
  __export
} from "./chunk-VE7DK22H.js";

// src/IterableSync.ts
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
  last: () => last,
  map: () => map,
  max: () => max,
  min: () => min,
  range: () => range,
  reduce: () => reduce,
  slice: () => slice,
  some: () => some,
  takeWhile: () => takeWhile,
  unique: () => unique,
  yieldNumber: () => yieldNumber,
  zip: () => zip
});
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
      break;
    }
  }
  yield* it;
}
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
function* range(start, length) {
  for (let index = 0; index < length; index++) {
    yield start++;
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
function* takeWhile(it, f) {
  for (const v of it) {
    if (!f(v))
      return;
    yield v;
  }
}
function* unique(iterable, keyFunction = toStringDefault) {
  const buffer = [];
  let itera = [];
  itera = Array.isArray(iterable) ? iterable : [iterable];
  for (const it of itera) {
    for (const v of it) {
      const fv = keyFunction(v);
      if (buffer.includes(fv))
        continue;
      buffer.push(fv);
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

export {
  last,
  range,
  IterableSync_exports
};
//# sourceMappingURL=chunk-IC4XTFPE.js.map