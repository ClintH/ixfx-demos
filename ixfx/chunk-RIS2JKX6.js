import {
  addUniqueByHash,
  filter,
  find,
  hasAnyValue,
  toArray,
  without
} from "./chunk-2TEE7PJK.js";
import {
  SimpleEventEmitter
} from "./chunk-HQCU5VB2.js";
import {
  isEqualDefault,
  toStringDefault
} from "./chunk-CX6IPGLD.js";
import {
  __privateAdd,
  __privateGet,
  __privateSet,
  __publicField
} from "./chunk-FQLUQVDZ.js";

// src/collections/Stack.ts
var OverflowPolicy = /* @__PURE__ */ ((OverflowPolicy2) => {
  OverflowPolicy2[OverflowPolicy2["DiscardOlder"] = 0] = "DiscardOlder";
  OverflowPolicy2[OverflowPolicy2["DiscardNewer"] = 1] = "DiscardNewer";
  OverflowPolicy2[OverflowPolicy2["DiscardAdditions"] = 2] = "DiscardAdditions";
  return OverflowPolicy2;
})(OverflowPolicy || {});
var trimStack = (opts, stack2, toAdd) => {
  const potentialLength = stack2.length + toAdd.length;
  const policy = opts.overflowPolicy ?? 2 /* DiscardAdditions */;
  const capacity = opts.capacity ?? potentialLength;
  const toRemove = potentialLength - capacity;
  if (opts.debug)
    console.log(`Stack.push: stackLen: ${stack2.length} potentialLen: ${potentialLength} toRemove: ${toRemove} policy: ${OverflowPolicy[policy]}`);
  switch (policy) {
    case 2 /* DiscardAdditions */:
      if (opts.debug)
        console.log(`Stack.push:DiscardAdditions: stackLen: ${stack2.length} slice: ${potentialLength - capacity} toAddLen: ${toAdd.length}`);
      if (stack2.length === opts.capacity) {
        return stack2;
      } else {
        return [...stack2, ...toAdd.slice(0, toAdd.length - toRemove)];
      }
    case 1 /* DiscardNewer */:
      if (toRemove >= stack2.length) {
        return toAdd.slice(Math.max(0, toAdd.length - capacity), Math.min(toAdd.length, capacity) + 1);
      } else {
        if (opts.debug)
          console.log(` from orig: ${stack2.slice(0, toRemove - 1)}`);
        return [...stack2.slice(0, toRemove - 1), ...toAdd.slice(0, Math.min(toAdd.length, capacity - toRemove + 1))];
      }
    case 0 /* DiscardOlder */:
      return [...stack2, ...toAdd].slice(toRemove);
    default:
      throw new Error(`Unknown overflow policy ${policy}`);
  }
};
var push = (opts, stack2, ...toAdd) => {
  const potentialLength = stack2.length + toAdd.length;
  const overSize = opts.capacity && potentialLength > opts.capacity;
  const toReturn = overSize ? trimStack(opts, stack2, toAdd) : [...stack2, ...toAdd];
  return toReturn;
};
var pop = (opts, stack2) => {
  if (stack2.length === 0)
    throw new Error(`Stack is empty`);
  return stack2.slice(0, stack2.length - 1);
};
var peek = (opts, stack2) => stack2[stack2.length - 1];
var isEmpty = (opts, stack2) => stack2.length === 0;
var isFull = (opts, stack2) => {
  if (opts.capacity) {
    return stack2.length >= opts.capacity;
  }
  return false;
};
var Stack = class {
  constructor(opts, data) {
    __publicField(this, "opts");
    __publicField(this, "data");
    this.opts = opts;
    this.data = data;
  }
  push(...toAdd) {
    return new Stack(this.opts, push(this.opts, this.data, ...toAdd));
  }
  pop() {
    return new Stack(this.opts, pop(this.opts, this.data));
  }
  forEach(fn) {
    this.data.forEach(fn);
  }
  forEachFromTop(fn) {
    [...this.data].reverse().forEach(fn);
  }
  get isEmpty() {
    return isEmpty(this.opts, this.data);
  }
  get isFull() {
    return isFull(this.opts, this.data);
  }
  get peek() {
    return peek(this.opts, this.data);
  }
  get length() {
    return this.data.length;
  }
};
var stack = (opts = {}, ...startingItems) => new Stack({ ...opts }, [...startingItems]);
var MutableStack = class {
  constructor(opts, data) {
    __publicField(this, "opts");
    __publicField(this, "data");
    this.opts = opts;
    this.data = data;
  }
  push(...toAdd) {
    this.data = push(this.opts, this.data, ...toAdd);
    return this.data.length;
  }
  pop() {
    const v = peek(this.opts, this.data);
    pop(this.opts, this.data);
    return v;
  }
  get isEmpty() {
    return isEmpty(this.opts, this.data);
  }
  get isFull() {
    return isFull(this.opts, this.data);
  }
  get peek() {
    return peek(this.opts, this.data);
  }
  get length() {
    return this.data.length;
  }
};
var stackMutable = (opts, ...startingItems) => new MutableStack({ ...opts }, [...startingItems]);

// src/collections/NumericArrays.ts
var average = (...data) => {
  if (data === void 0)
    throw new Error(`data parameter is undefined`);
  const validNumbers = data.filter((d) => typeof d === `number` && !Number.isNaN(d));
  const total = validNumbers.reduce((acc, v) => acc + v, 0);
  return total / validNumbers.length;
};
var getMinMaxAvg = (data) => {
  const validNumbers = data.filter((d) => typeof d === `number` && !Number.isNaN(d));
  const total = validNumbers.reduce((acc, v) => acc + v, 0);
  return {
    total,
    max: Math.max(...validNumbers),
    min: Math.min(...validNumbers),
    avg: total / validNumbers.length
  };
};

// src/collections/MutableCircularArray.ts
var _capacity, _pointer;
var _MutableCircularArray = class extends Array {
  constructor(capacity) {
    super();
    __privateAdd(this, _capacity, void 0);
    __privateAdd(this, _pointer, void 0);
    if (Number.isNaN(capacity))
      throw Error(`capacity is NaN`);
    __privateSet(this, _capacity, capacity);
    __privateSet(this, _pointer, 0);
  }
  add(thing) {
    const ca = _MutableCircularArray.from(this);
    ca[__privateGet(this, _pointer)] = thing;
    __privateSet(ca, _capacity, __privateGet(this, _capacity));
    __privateSet(ca, _pointer, __privateGet(this, _pointer) + 1 === __privateGet(this, _capacity) ? 0 : __privateGet(this, _pointer) + 1);
    return ca;
  }
  get pointer() {
    return __privateGet(this, _pointer);
  }
  get isFull() {
    if (__privateGet(this, _capacity) === 0)
      return false;
    return this.length === __privateGet(this, _capacity);
  }
};
var MutableCircularArray = _MutableCircularArray;
_capacity = new WeakMap();
_pointer = new WeakMap();
var mutableCircularArray = (capacity) => new MutableCircularArray(capacity);

// src/collections/MutableMapMulti.ts
var _map;
var MutableMapOf = class extends SimpleEventEmitter {
  constructor(type, opts = {}) {
    super();
    __privateAdd(this, _map, /* @__PURE__ */ new Map());
    __publicField(this, "groupBy");
    __publicField(this, "type");
    this.type = type;
    this.groupBy = opts.groupBy ?? toStringDefault;
  }
  debugString() {
    const keys = Array.from(__privateGet(this, _map).keys());
    let r = `Keys: ${keys.join(`, `)}\r
`;
    keys.forEach((k) => {
      const v = __privateGet(this, _map).get(k);
      if (v !== void 0) {
        const asArray = this.type.toArray(v);
        if (asArray !== void 0) {
          r += ` - ${k} (${this.type.count(v)}) = ${JSON.stringify(asArray)}\r
`;
        }
      } else
        r += ` - ${k} (undefined)\r
`;
    });
    return r;
  }
  get isEmpty() {
    return __privateGet(this, _map).size === 0;
  }
  clear() {
    __privateGet(this, _map).clear();
    super.fireEvent(`clear`, true);
  }
  addKeyedValues(key, ...values) {
    const set = __privateGet(this, _map).get(key);
    if (set === void 0) {
      __privateGet(this, _map).set(key, this.type.add(void 0, values));
      super.fireEvent(`addedKey`, { key });
      super.fireEvent(`addedValues`, { values });
    } else {
      __privateGet(this, _map).set(key, this.type.add(set, values));
      super.fireEvent(`addedValues`, { values });
    }
  }
  addValue(...values) {
    values.forEach((v) => this.addKeyedValues(this.groupBy(v), v));
  }
  hasKeyValue(key, value) {
    const m = __privateGet(this, _map).get(key);
    if (m === void 0)
      return false;
    return this.type.has(m, value);
  }
  has(key) {
    return __privateGet(this, _map).has(key);
  }
  deleteKeyValue(key, value) {
    const a = __privateGet(this, _map).get(key);
    if (a === void 0)
      return;
    const filtered = this.type.without(a, value);
    __privateGet(this, _map).set(key, this.type.add(void 0, filtered));
  }
  delete(key) {
    const a = __privateGet(this, _map).get(key);
    if (a === void 0)
      return false;
    __privateGet(this, _map).delete(key);
    this.fireEvent(`deleteKey`, { key });
    return true;
  }
  findKeyForValue(value) {
    const keys = Array.from(__privateGet(this, _map).keys());
    const found = keys.find((key) => {
      const a = __privateGet(this, _map).get(key);
      if (a === void 0)
        throw Error(`Bug: map could not be accessed`);
      if (this.type.has(a, value))
        return true;
      return false;
    });
    return found;
  }
  count(key) {
    const e = __privateGet(this, _map).get(key);
    if (e === void 0)
      return 0;
    return this.type.count(e);
  }
  get(key) {
    const m = __privateGet(this, _map).get(key);
    if (m === void 0)
      return void 0;
    return this.type.toArray(m);
  }
  getSource(key) {
    return __privateGet(this, _map).get(key);
  }
  keys() {
    return Array.from(__privateGet(this, _map).keys());
  }
  keysAndCounts() {
    const keys = this.keys();
    const r = keys.map((k) => [k, this.count(k)]);
    return r;
  }
  merge(other) {
    const keys = other.keys();
    keys.forEach((key) => {
      const data = other.get(key);
      if (data !== void 0)
        this.addKeyedValues(key, ...data);
    });
  }
};
_map = new WeakMap();
var mutableMapArray = (opts = {}) => {
  const comparer = opts.comparer === void 0 ? opts.toString === void 0 ? (a, b) => opts.toString(a) === opts.toString(b) : isEqualDefault : opts.comparer;
  const t = {
    add: (dest, values) => {
      if (dest === void 0)
        return [...values];
      return [...dest, ...values];
    },
    count: (source) => source.length,
    find: (source, predicate) => source.find(predicate),
    filter: (source, predicate) => source.filter(predicate),
    toArray: (source) => source,
    has: (source, value) => source.find((v) => comparer(v, value)) !== void 0,
    without: (source, value) => source.filter((v) => !comparer(v, value))
  };
  const m = new MutableMapOf(t, opts);
  return m;
};
var mutableMapSet = (opts) => {
  const hash = opts?.hash ?? toStringDefault;
  const comparer = (a, b) => hash(a) === hash(b);
  const t = {
    add: (dest, values) => addUniqueByHash(dest, hash, ...values),
    count: (source) => source.size,
    find: (source, predicate) => find(source, predicate),
    filter: (source, predicate) => filter(source, predicate),
    toArray: (source) => toArray(source),
    has: (source, value) => hasAnyValue(source, value, comparer),
    without: (source, value) => without(toArray(source), value, comparer)
  };
  const m = new MutableMapOf(t, opts);
  return m;
};
var mutableMapCircular = (opts) => {
  const comparer = isEqualDefault;
  const t = {
    add: (dest, values) => {
      if (dest === void 0)
        dest = mutableCircularArray(opts.capacity);
      values.forEach((v) => dest = dest?.add(v));
      return dest;
    },
    count: (source) => source.length,
    find: (source, predicate) => source.find(predicate),
    filter: (source, predicate) => source.filter(predicate),
    toArray: (source) => source,
    has: (source, value) => source.find((v) => comparer(v, value)) !== void 0,
    without: (source, value) => source.filter((v) => !comparer(v, value))
  };
  return new MutableMapOf(t, opts);
};

export {
  stack,
  stackMutable,
  average,
  getMinMaxAvg,
  mutableCircularArray,
  mutableMapArray,
  mutableMapSet,
  mutableMapCircular
};
//# sourceMappingURL=chunk-RIS2JKX6.js.map