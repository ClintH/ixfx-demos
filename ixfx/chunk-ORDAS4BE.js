import {
  SimpleEventEmitter
} from "./chunk-HQCU5VB2.js";
import {
  isEqualDefault
} from "./chunk-5IO4FPHS.js";
import {
  __export,
  __publicField
} from "./chunk-FQLUQVDZ.js";

// src/collections/Arrays.ts
var guardArray = (array, paramName = `?`) => {
  if (array === void 0)
    throw new Error(`Param '${paramName}' is undefined. Expected array.`);
  if (array === null)
    throw new Error(`Param '${paramName}' is null. Expected array.`);
  if (!Array.isArray(array))
    throw new Error(`Param '${paramName}' not an array as expected`);
};
var randomIndex = (array) => Math.floor(Math.random() * array.length);
var randomElement = (array) => {
  guardArray(array, `array`);
  return array[Math.floor(Math.random() * array.length)];
};
var randomPluck = (array, mutate = false) => {
  if (array === void 0)
    throw new Error(`array is undefined`);
  if (!Array.isArray(array))
    throw new Error(`'array' param is not an array`);
  if (array.length === 0)
    return { value: void 0, array: [] };
  const index = randomIndex(array);
  if (mutate) {
    return {
      value: array[index],
      array: array.splice(index, 1)
    };
  } else {
    const t = [...array];
    t.splice(index, 1);
    return {
      value: array[index],
      array: t
    };
  }
};
var shuffle = (dataToShuffle) => {
  const array = [...dataToShuffle];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
var without = (data, value, comparer = isEqualDefault) => data.filter((v) => !comparer(v, value));

// src/collections/Set.ts
var Set_exports = {};
__export(Set_exports, {
  addUniqueByHash: () => addUniqueByHash,
  mutableStringSet: () => mutableStringSet
});
var addUniqueByHash = (set2, hashFunc, ...values) => {
  const s = set2 === void 0 ? /* @__PURE__ */ new Map() : new Map(set2);
  values.forEach((v) => {
    const vStr = hashFunc(v);
    if (s.has(vStr))
      return;
    s.set(vStr, v);
  });
  return s;
};
var mutableStringSet = (keyString = void 0) => new MutableStringSetImpl(keyString);
var MutableStringSetImpl = class extends SimpleEventEmitter {
  constructor(keyString = void 0) {
    super();
    __publicField(this, "store", /* @__PURE__ */ new Map());
    __publicField(this, "keyString");
    if (keyString === void 0) {
      keyString = (a) => {
        if (typeof a === `string`) {
          return a;
        } else {
          return JSON.stringify(a);
        }
      };
    }
    this.keyString = keyString;
  }
  add(...v) {
    v.forEach((i) => {
      const isUpdated = this.has(i);
      this.store.set(this.keyString(i), i);
      super.fireEvent(`add`, { value: i, updated: isUpdated });
    });
  }
  values() {
    return this.store.values();
  }
  clear() {
    this.store.clear();
    super.fireEvent(`clear`, true);
  }
  delete(v) {
    const isDeleted = this.store.delete(this.keyString(v));
    if (isDeleted)
      super.fireEvent(`delete`, v);
    return isDeleted;
  }
  has(v) {
    return this.store.has(this.keyString(v));
  }
  toArray() {
    return Array.from(this.store.values());
  }
};

// src/collections/Map.ts
var Map_exports = {};
__export(Map_exports, {
  add: () => add,
  del: () => del,
  filter: () => filter,
  find: () => find,
  groupBy: () => groupBy,
  has: () => has,
  hasAnyValue: () => hasAnyValue,
  hasKeyValue: () => hasKeyValue,
  map: () => map,
  mapToArray: () => mapToArray,
  mapToObj: () => mapToObj,
  mutableMap: () => mutableMap,
  set: () => set,
  toArray: () => toArray,
  transformMap: () => transformMap,
  zipKeyValue: () => zipKeyValue
});
var has = (map2, key) => map2.has(key);
var hasKeyValue = (map2, key, value, comparer) => {
  if (!map2.has(key))
    return false;
  const values = Array.from(map2.values());
  return values.some((v) => comparer(v, value));
};
var hasAnyValue = (map2, value, comparer) => {
  const entries = Array.from(map2.entries());
  return entries.some((kv) => comparer(kv[1], value));
};
var filter = (map2, predicate) => Array.from(map2.values()).filter(predicate);
var toArray = (map2) => Array.from(map2.values());
var find = (map2, predicate) => Array.from(map2.values()).find((vv) => predicate(vv));
var addArray = (map2, data) => {
  const x = new Map(map2.entries());
  data.forEach((d) => {
    if (d[0] === void 0)
      throw new Error(`key cannot be undefined`);
    if (d[1] === void 0)
      throw new Error(`value cannot be undefined`);
    x.set(d[0], d[1]);
  });
  return x;
};
var addObjects = (map2, data) => {
  const x = new Map(map2.entries());
  data.forEach((d) => {
    if (d.key === void 0)
      throw new Error(`key cannot be undefined`);
    if (d.value === void 0)
      throw new Error(`value cannot be undefined`);
    x.set(d.key, d.value);
  });
  return x;
};
var set = (map2, key, value) => {
  const x = new Map(map2.entries());
  x.set(key, value);
  return x;
};
var add = (map2, ...data) => {
  if (map2 === void 0)
    throw new Error(`map parameter is undefined`);
  if (data === void 0)
    throw new Error(`data parameter is undefined`);
  if (data.length === 0)
    return map2;
  const firstRecord = data[0];
  const isObj = typeof firstRecord.key !== `undefined` && typeof firstRecord.value !== `undefined`;
  return isObj ? addObjects(map2, data) : addArray(map2, data);
};
var del = (map2, key) => {
  const x = new Map(map2.entries());
  x.delete(key);
  return x;
};
var map = (dataOrMap) => {
  if (dataOrMap === void 0)
    return map([]);
  if (Array.isArray(dataOrMap))
    return map(add(/* @__PURE__ */ new Map(), ...dataOrMap));
  const data = dataOrMap;
  return {
    add: (...itemsToAdd) => {
      const s = add(data, ...itemsToAdd);
      return map(s);
    },
    get: (key) => data.get(key),
    delete: (key) => map(del(data, key)),
    clear: () => map(),
    has: (key) => data.has(key),
    entries: () => data.entries(),
    isEmpty: () => data.size === 0
  };
};
var mutableMap = (...data) => {
  let m = add(/* @__PURE__ */ new Map(), ...data);
  return {
    add: (...data2) => {
      m = add(m, ...data2);
    },
    delete: (key) => {
      m = del(m, key);
    },
    clear: () => {
      m = add(/* @__PURE__ */ new Map());
    },
    set: (key, value) => {
      m = set(m, key, value);
    },
    get: (key) => m.get(key),
    entries: () => m.entries(),
    isEmpty: () => m.size === 0,
    has: (key) => has(m, key)
  };
};
var transformMap = (source, transformer) => new Map(Array.from(source, (v) => [v[0], transformer(v[1], v[0])]));
var zipKeyValue = (keys, values) => {
  if (keys.length !== values.length)
    throw new Error(`Keys and values arrays should be same length`);
  return Object.fromEntries(keys.map((k, i) => [k, values[i]]));
};
var groupBy = (array, grouper) => array.reduce((store, item) => {
  const key = grouper(item);
  const val = store.get(key);
  if (val === void 0) {
    store.set(key, [item]);
  } else {
    val.push(item);
  }
  return store;
}, /* @__PURE__ */ new Map());
var mapToObj = (m) => Array.from(m).reduce((obj, [key, value]) => {
  obj[key] = value;
  return obj;
}, {});
var mapToArray = (m, transformer) => Array.from(m.entries()).map((x) => transformer(x[0], x[1]));

export {
  guardArray,
  randomIndex,
  randomElement,
  randomPluck,
  shuffle,
  without,
  addUniqueByHash,
  mutableStringSet,
  Set_exports,
  has,
  hasKeyValue,
  hasAnyValue,
  filter,
  toArray,
  find,
  set,
  add,
  del,
  map,
  mutableMap,
  transformMap,
  zipKeyValue,
  groupBy,
  mapToObj,
  mapToArray,
  Map_exports
};
//# sourceMappingURL=chunk-ORDAS4BE.js.map