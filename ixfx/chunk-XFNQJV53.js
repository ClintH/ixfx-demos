// src/collections/Map/MapImmutableFns.ts
var addArray = (map, data) => {
  const x = new Map(map.entries());
  for (const d of data) {
    if (d[0] === void 0) throw new Error(`key cannot be undefined`);
    if (d[1] === void 0) throw new Error(`value cannot be undefined`);
    x.set(d[0], d[1]);
  }
  return x;
};
var addObjects = (map, data) => {
  const x = new Map(map.entries());
  for (const d of data) {
    if (d.key === void 0) throw new Error(`key cannot be undefined`);
    if (d.value === void 0) throw new Error(`value cannot be undefined`);
    x.set(d.key, d.value);
  }
  return x;
};
var has = (map, key) => map.has(key);
var add = (map, ...data) => {
  if (map === void 0) throw new Error(`map parameter is undefined`);
  if (data === void 0) throw new Error(`data parameter i.s undefined`);
  if (data.length === 0) return map;
  const firstRecord = data[0];
  const isObject = typeof firstRecord.key !== `undefined` && typeof firstRecord.value !== `undefined`;
  return isObject ? addObjects(map, data) : addArray(map, data);
};
var set = (map, key, value) => {
  const x = new Map(map.entries());
  x.set(key, value);
  return x;
};
var del = (map, key) => {
  const x = new Map(map.entries());
  x.delete(key);
  return x;
};

// src/collections/Map/Map.ts
var immutable = (dataOrMap) => {
  if (dataOrMap === void 0) return immutable([]);
  if (Array.isArray(dataOrMap)) return immutable(add(/* @__PURE__ */ new Map(), ...dataOrMap));
  const data = dataOrMap;
  return {
    add: (...itemsToAdd) => {
      const s = add(data, ...itemsToAdd);
      return immutable(s);
    },
    set: (key, value) => {
      const s = set(data, key, value);
      return immutable(s);
    },
    get: (key) => data.get(key),
    delete: (key) => immutable(del(data, key)),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    clear: () => immutable(),
    has: (key) => data.has(key),
    entries: () => data.entries(),
    values: () => data.values(),
    isEmpty: () => data.size === 0
  };
};

// src/collections/Map/NumberMap.ts
var NumberMap = class extends Map {
  constructor(defaultValue = 0) {
    super();
    this.defaultValue = defaultValue;
  }
  get(key) {
    const v = super.get(key);
    if (v === void 0) return this.defaultValue;
    return v;
  }
  reset(key) {
    super.set(key, this.defaultValue);
    return this.defaultValue;
  }
  multiply(key, amount) {
    const v = super.get(key);
    let value = v ?? this.defaultValue;
    value *= amount;
    super.set(key, value);
    return value;
  }
  add(key, amount = 1) {
    const v = super.get(key);
    let value = v ?? this.defaultValue;
    value += amount;
    super.set(key, value);
    return value;
  }
  subtract(key, amount = 1) {
    const v = super.get(key);
    let value = v ?? this.defaultValue;
    value -= amount;
    super.set(key, value);
    return value;
  }
};

export {
  has,
  add,
  set,
  del,
  immutable,
  NumberMap
};
//# sourceMappingURL=chunk-XFNQJV53.js.map