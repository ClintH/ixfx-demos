import {
  __export
} from "./chunk-6SYKIMQH.js";

// src/collections/Map.ts
var Map_exports = {};
__export(Map_exports, {
  addUniqueByHash: () => addUniqueByHash,
  filter: () => filter,
  find: () => find,
  getOrGenerate: () => getOrGenerate,
  getOrGenerateSync: () => getOrGenerateSync,
  hasAnyValue: () => hasAnyValue,
  hasKeyValue: () => hasKeyValue,
  mapToArray: () => mapToArray,
  mapToObj: () => mapToObj,
  mapToObjTransform: () => mapToObjTransform,
  toArray: () => toArray,
  transformMap: () => transformMap,
  zipKeyValue: () => zipKeyValue
});
var hasKeyValue = (map, key, value, comparer) => {
  if (!map.has(key))
    return false;
  const values = Array.from(map.values());
  return values.some((v) => comparer(v, value));
};
var getOrGenerate = (map, fn) => async (key, args) => {
  let value = map.get(key);
  if (value !== void 0)
    return Promise.resolve(value);
  value = await fn(key, args);
  if (value === void 0)
    throw new Error(`fn returned undefined`);
  map.set(key, value);
  return value;
};
var getOrGenerateSync = (map, fn) => (key, args) => {
  let value = map.get(key);
  if (value !== void 0)
    return value;
  value = fn(key, args);
  map.set(key, value);
  return value;
};
var addUniqueByHash = (set, hashFunc, ...values) => {
  const s = set === void 0 ? /* @__PURE__ */ new Map() : new Map(set);
  values.forEach((v) => {
    const vStr = hashFunc(v);
    if (s.has(vStr))
      return;
    s.set(vStr, v);
  });
  return s;
};
var hasAnyValue = (map, value, comparer) => {
  const entries = Array.from(map.entries());
  return entries.some((kv) => comparer(kv[1], value));
};
function* filter(map, predicate) {
  for (const v of map.values()) {
    if (predicate(v))
      yield v;
  }
}
var toArray = (map) => Array.from(map.values());
var find = (map, predicate) => Array.from(map.values()).find((vv) => predicate(vv));
var mapToObjTransform = (m, valueTransform) => Array.from(m).reduce((obj, [key, value]) => {
  const t = valueTransform(value);
  obj[key] = t;
  return obj;
}, {});
var zipKeyValue = (keys, values) => {
  if (keys.length !== values.length)
    throw new Error(`Keys and values arrays should be same length`);
  return Object.fromEntries(keys.map((k, i) => [k, values[i]]));
};
var transformMap = (source, transformer) => new Map(Array.from(source, (v) => [v[0], transformer(v[1], v[0])]));
var mapToObj = (m) => Array.from(m).reduce((obj, [key, value]) => {
  obj[key] = value;
  return obj;
}, {});
var mapToArray = (m, transformer) => Array.from(m.entries()).map((x) => transformer(x[0], x[1]));

export {
  hasKeyValue,
  getOrGenerate,
  getOrGenerateSync,
  addUniqueByHash,
  hasAnyValue,
  filter,
  toArray,
  find,
  mapToObjTransform,
  zipKeyValue,
  transformMap,
  mapToObj,
  mapToArray,
  Map_exports
};
//# sourceMappingURL=chunk-7QLZ7J2O.js.map