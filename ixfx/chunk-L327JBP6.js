import {
  __export
} from "./chunk-6SYKIMQH.js";

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
async function toArray(it, count = Infinity) {
  const result = [];
  const iterator = it[Symbol.asyncIterator]();
  while (result.length < count) {
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

export {
  IterableAsync_exports
};
//# sourceMappingURL=chunk-L327JBP6.js.map