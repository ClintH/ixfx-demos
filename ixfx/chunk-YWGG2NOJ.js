import {
  defaultComparer
} from "./chunk-N37UR7MZ.js";
import {
  isEqualDefault,
  toStringDefault
} from "./chunk-SGQC7FGM.js";

// src/data/maps/MapFns.ts
var getClosestIntegerKey = (data, target) => {
  target = Math.round(target);
  if (data.has(target)) {
    return target;
  } else {
    let offset = 1;
    while (offset < 1e3) {
      if (data.has(target - offset)) return target - offset;
      else if (data.has(target + offset)) return target + offset;
      offset++;
    }
    throw new Error(`Could not find target ${target}`);
  }
};
var getFromKeys = (data, keys) => {
  for (const key of keys) {
    if (data.has(key)) return data.get(key);
  }
};
var hasKeyValue = (map, key, value, comparer) => {
  if (!map.has(key)) return false;
  const values = [...map.values()];
  return values.some((v) => comparer(v, value));
};
var deleteByValue = (map, value, comparer = isEqualDefault) => {
  for (const entry of Object.entries(map)) {
    if (comparer(entry[1], value)) {
      map.delete(entry[0]);
    }
  }
};
var firstEntryByIterablePredicate = (map, predicate) => {
  for (const entry of map.entries()) {
    if (predicate(entry[1], entry[0])) return entry;
  }
};
var firstEntryByIterableValue = (map, value, isEqual = isEqualDefault) => {
  for (const entry of map.entries()) {
    if (isEqual(entry[1], value)) return entry;
  }
};
var addKeepingExisting = (set, hasher, ...values) => {
  const s = set === void 0 ? /* @__PURE__ */ new Map() : new Map(set);
  for (const v of values) {
    const hashResult = hasher(v);
    if (s.has(hashResult)) continue;
    s.set(hashResult, v);
  }
  return s;
};
var sortByValue = (map, comparer) => {
  const f = comparer ?? defaultComparer;
  return [...map.entries()].sort((a, b) => f(a[1], b[1]));
};
var sortByValueProperty = (map, property, compareFunction) => {
  const cfn = typeof compareFunction === `undefined` ? defaultComparer : compareFunction;
  return [...map.entries()].sort((aE, bE) => {
    const a = aE[1];
    const b = bE[1];
    return cfn(a[property], b[property]);
  });
};
var hasAnyValue = (map, value, comparer) => {
  const entries = [...map.entries()];
  return entries.some((kv) => comparer(kv[1], value));
};
function* filter(map, predicate) {
  for (const v of map.values()) {
    if (predicate(v)) yield v;
  }
}
var toArray = (map) => [...map.values()];
var fromIterable = (data, keyFunction = toStringDefault, allowOverwrites = false) => {
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
  const map = /* @__PURE__ */ new Map();
  if (Array.isArray(data)) {
    for (const d of data) addObject(map, d);
  } else {
    addObject(map, data);
  }
  return map;
};
var addObject = (map, data) => {
  const entries = Object.entries(data);
  for (const [key, value] of entries) {
    map.set(key, value);
  }
};
var find = (map, predicate) => [...map.values()].find((v) => predicate(v));
var some = (map, predicate) => [...map.values()].some((v) => predicate(v));
var mapToObjectTransform = (m, valueTransform) => (
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, unicorn/no-array-reduce
  [...m].reduce((object, [key, value]) => {
    const t = valueTransform(value);
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
  [...m].reduce((object, [key, value]) => {
    object[key] = value;
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

export {
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
  filter,
  toArray,
  fromIterable,
  fromObject,
  addObject,
  find,
  some,
  mapToObjectTransform,
  zipKeyValue,
  transformMap,
  toObject,
  mapToArray,
  mergeByKey
};
//# sourceMappingURL=chunk-YWGG2NOJ.js.map