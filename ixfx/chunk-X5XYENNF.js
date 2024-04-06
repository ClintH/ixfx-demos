import {
  IterableSync_exports,
  chunks as chunks2,
  concat as concat2,
  dropWhile as dropWhile2,
  equals as equals2,
  every as every2,
  fill as fill2,
  filter as filter2,
  find as find2,
  flatten as flatten2,
  forEach as forEach2,
  fromArray as fromArray2,
  fromIterable as fromIterable2,
  map as map2,
  max as max2,
  min as min2,
  reduce as reduce2,
  some as some2,
  toArray as toArray2,
  unique as unique2,
  uniqueByValue as uniqueByValue2,
  until as until2,
  zip as zip2
} from "./chunk-2MOQXBDW.js";
import {
  slice as slice2
} from "./chunk-BLGLFIG7.js";
import {
  IterableAsync_exports,
  chunks,
  concat,
  dropWhile,
  equals,
  every,
  fill,
  filter,
  find,
  flatten,
  forEach,
  fromArray,
  fromIterable,
  isAsyncIterable,
  map,
  max,
  min,
  reduce,
  slice,
  some,
  toArray,
  toStringDefault2 as toStringDefault,
  unique,
  uniqueByValue,
  until,
  zip
} from "./chunk-ESXWQDUL.js";
import {
  __export
} from "./chunk-Q2EHUQVZ.js";

// src/iterables/index.ts
var iterables_exports = {};
__export(iterables_exports, {
  Async: () => IterableAsync_exports,
  Sync: () => IterableSync_exports,
  chunks: () => chunks3,
  concat: () => concat3,
  dropWhile: () => dropWhile3,
  equals: () => equals3,
  every: () => every3,
  fill: () => fill3,
  filter: () => filter3,
  find: () => find3,
  flatten: () => flatten3,
  forEach: () => forEach3,
  fromArray: () => fromArray3,
  fromIterable: () => fromIterable3,
  map: () => map3,
  max: () => max3,
  min: () => min3,
  reduce: () => reduce3,
  slice: () => slice3,
  some: () => some3,
  toArray: () => toArray3,
  unique: () => unique3,
  uniqueByValue: () => uniqueByValue3,
  until: () => until3,
  zip: () => zip3
});
function min3(it, gt = (a, b) => a > b) {
  return isAsyncIterable(it) ? min(it, gt) : min2(it, gt);
}
function max3(it, gt = (a, b) => a > b) {
  return isAsyncIterable(it) ? max(it, gt) : max2(it, gt);
}
function dropWhile3(it, f) {
  return isAsyncIterable(it) ? dropWhile(it, f) : dropWhile2(it, f);
}
function until3(it, callback) {
  if (isAsyncIterable(it)) {
    return until(it, callback);
  } else {
    until2(it, callback);
  }
}
function chunks3(it, size) {
  return isAsyncIterable(it) ? chunks(it, size) : chunks2(it, size);
}
function filter3(it, f) {
  return isAsyncIterable(it) ? filter(it, f) : filter2(it, f);
}
function fill3(it, v) {
  return isAsyncIterable(it) ? fill(it, v) : fill2(it, v);
}
function concat3(...its) {
  return isAsyncIterable(its[0]) ? concat(...its) : concat2(...its);
}
function find3(it, f) {
  return isAsyncIterable(it) ? find(it, f) : find2(it, f);
}
function forEach3(it, f) {
  if (isAsyncIterable(it)) {
    return forEach(it, f);
  } else {
    forEach2(it, f);
  }
}
function map3(it, f) {
  return isAsyncIterable(it) ? map(it, f) : map2(it, f);
}
function fromArray3(array, interval) {
  return interval === void 0 ? fromArray2(array) : fromArray(array, interval);
}
function flatten3(it) {
  return isAsyncIterable(it) ? flatten(it) : flatten2(it);
}
function some3(it, f) {
  return isAsyncIterable(it) ? some(it, f) : some2(it, f);
}
function reduce3(it, f, start) {
  return isAsyncIterable(it) ? reduce(it, f, start) : reduce2(it, f, start);
}
function slice3(it, start = 0, end = Number.POSITIVE_INFINITY) {
  return isAsyncIterable(it) ? slice(it, start, end) : slice2(it, end);
}
function unique3(iterable) {
  if (Array.isArray(iterable)) {
    if (iterable.length === 0)
      return fromArray2([]);
    return isAsyncIterable(iterable[0]) ? unique(iterable) : unique2(iterable);
  } else if (isAsyncIterable(iterable)) {
    return unique(iterable);
  } else {
    return unique2(iterable);
  }
}
function* uniqueByValue3(input, toString = toStringDefault, seen = /* @__PURE__ */ new Set()) {
  return isAsyncIterable(input) ? uniqueByValue(input, toString, seen) : uniqueByValue2(input, toString, seen);
}
function toArray3(it, count = Number.POSITIVE_INFINITY) {
  return isAsyncIterable(it) ? toArray(it, count) : toArray2(it, count);
}
function every3(it, f) {
  return isAsyncIterable(it) ? every(it, f) : every2(it, f);
}
function equals3(it1, it2, equality) {
  const as = isAsyncIterable(it1) && isAsyncIterable(it2);
  return as ? equals(it1, it2, equality) : equals2(it1, it2, equality);
}
function zip3(...its) {
  if (its.length === 0)
    return fromArray2([]);
  return isAsyncIterable(its[0]) ? zip(...its) : zip2(...its);
}
function fromIterable3(iterable, interval) {
  if (isAsyncIterable(iterable) || interval !== void 0)
    return fromIterable(iterable, interval);
  return fromIterable2(iterable);
}

export {
  min3 as min,
  max3 as max,
  dropWhile3 as dropWhile,
  until3 as until,
  chunks3 as chunks,
  filter3 as filter,
  fill3 as fill,
  concat3 as concat,
  find3 as find,
  forEach3 as forEach,
  map3 as map,
  fromArray3 as fromArray,
  flatten3 as flatten,
  some3 as some,
  reduce3 as reduce,
  slice3 as slice,
  unique3 as unique,
  uniqueByValue3 as uniqueByValue,
  toArray3 as toArray,
  every3 as every,
  equals3 as equals,
  zip3 as zip,
  fromIterable3 as fromIterable,
  iterables_exports
};
//# sourceMappingURL=chunk-X5XYENNF.js.map