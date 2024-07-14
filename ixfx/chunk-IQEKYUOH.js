// src/data/maps/GetOrGenerate.ts
var getOrGenerateSync = (map, fn) => (key, args) => {
  let value = map.get(key);
  if (value !== void 0) return value;
  value = fn(key, args);
  map.set(key, value);
  return value;
};
var getOrGenerate = (map, fn) => async (key, args) => {
  let value = map.get(key);
  if (value !== void 0) return value;
  value = await fn(key, args);
  if (value === void 0) throw new Error(`fn returned undefined`);
  map.set(key, value);
  return value;
};

export {
  getOrGenerateSync,
  getOrGenerate
};
//# sourceMappingURL=chunk-IQEKYUOH.js.map