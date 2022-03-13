import {
  Map_exports,
  addUniqueByHash,
  filter,
  find,
  hasAnyValue,
  toArray
} from "./chunk-U5MCJANK.js";
import {
  Set_exports,
  setMutable
} from "./chunk-G5Q3FAR4.js";
import {
  Arrays_exports,
  without
} from "./chunk-JLZF6V57.js";
import {
  SimpleEventEmitter,
  simpleMapArrayMutable
} from "./chunk-HCHJFXUB.js";
import {
  isEqualDefault,
  toStringDefault
} from "./chunk-YSYB6TIS.js";
import {
  integer
} from "./chunk-6M44PDIN.js";
import {
  __export,
  __privateAdd,
  __privateGet,
  __privateSet,
  __publicField
} from "./chunk-YDTVC7MM.js";

// src/collections/index.ts
var collections_exports = {};
__export(collections_exports, {
  Arrays: () => Arrays_exports,
  Maps: () => Map_exports,
  Queues: () => Queue_exports,
  Sets: () => Set_exports,
  Stacks: () => Stack_exports,
  circularArray: () => circularArray,
  map: () => map,
  mapArray: () => mapArray,
  mapCircular: () => mapCircular,
  mapMutable: () => mapMutable,
  mapSet: () => mapSet,
  queue: () => queue,
  queueMutable: () => queueMutable,
  setMutable: () => setMutable,
  simpleMapArrayMutable: () => simpleMapArrayMutable,
  stack: () => stack,
  stackMutable: () => stackMutable
});

// src/collections/CircularArray.ts
var _capacity, _pointer;
var _CircularArrayImpl = class extends Array {
  constructor(capacity = 0) {
    super();
    __privateAdd(this, _capacity, void 0);
    __privateAdd(this, _pointer, void 0);
    integer(capacity, `positive`, `capacity`);
    __privateSet(this, _capacity, capacity);
    __privateSet(this, _pointer, 0);
  }
  add(thing) {
    const ca = _CircularArrayImpl.from(this);
    ca[__privateGet(this, _pointer)] = thing;
    __privateSet(ca, _capacity, __privateGet(this, _capacity));
    if (__privateGet(this, _capacity) > 0) {
      __privateSet(ca, _pointer, __privateGet(this, _pointer) + 1 === __privateGet(this, _capacity) ? 0 : __privateGet(this, _pointer) + 1);
    } else {
      __privateSet(ca, _pointer, __privateGet(this, _pointer) + 1);
    }
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
var CircularArrayImpl = _CircularArrayImpl;
_capacity = new WeakMap();
_pointer = new WeakMap();
var circularArray = (capacity) => new CircularArrayImpl(capacity);

// src/collections/MapMultiMutable.ts
var _map;
var MapOfMutableImpl = class extends SimpleEventEmitter {
  constructor(type, opts = {}) {
    super();
    __privateAdd(this, _map, /* @__PURE__ */ new Map());
    __publicField(this, "groupBy");
    __publicField(this, "type");
    this.type = type;
    this.groupBy = opts.groupBy ?? toStringDefault;
  }
  get typeName() {
    return this.type.name;
  }
  get lengthMax() {
    let m = 0;
    for (const v of __privateGet(this, _map).values()) {
      m = Math.max(m, this.type.count(v));
    }
    return m;
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
    const set2 = __privateGet(this, _map).get(key);
    if (set2 === void 0) {
      __privateGet(this, _map).set(key, this.type.add(void 0, values));
      super.fireEvent(`addedKey`, { key });
      super.fireEvent(`addedValues`, { values });
    } else {
      __privateGet(this, _map).set(key, this.type.add(set2, values));
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
      return false;
    const preCount = this.type.count(a);
    const filtered = this.type.without(a, value);
    const postCount = filtered.length;
    __privateGet(this, _map).set(key, this.type.add(void 0, filtered));
    return preCount > postCount;
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
var mapArray = (opts = {}) => {
  const comparer = opts.comparer === void 0 ? opts.toString === void 0 ? (a, b) => opts.toString(a) === opts.toString(b) : isEqualDefault : opts.comparer;
  const t = {
    get name() {
      return `array`;
    },
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
  const m = new MapOfMutableImpl(t, opts);
  return m;
};
var mapSet = (opts) => {
  const hash = opts?.hash ?? toStringDefault;
  const comparer = (a, b) => hash(a) === hash(b);
  const t = {
    get name() {
      return `set`;
    },
    add: (dest, values) => addUniqueByHash(dest, hash, ...values),
    count: (source) => source.size,
    find: (source, predicate) => find(source, predicate),
    filter: (source, predicate) => filter(source, predicate),
    toArray: (source) => toArray(source),
    has: (source, value) => hasAnyValue(source, value, comparer),
    without: (source, value) => without(toArray(source), value, comparer)
  };
  const m = new MapOfMutableImpl(t, opts);
  return m;
};
var mapCircular = (opts) => {
  const comparer = isEqualDefault;
  const t = {
    get name() {
      return `circular`;
    },
    add: (dest, values) => {
      if (dest === void 0)
        dest = circularArray(opts.capacity);
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
  return new MapOfMutableImpl(t, opts);
};

// src/collections/Stack.ts
var Stack_exports = {};
__export(Stack_exports, {
  stack: () => stack,
  stackMutable: () => stackMutable
});
var trimStack = (opts, stack2, toAdd) => {
  const potentialLength = stack2.length + toAdd.length;
  const policy = opts.discardPolicy ?? `additions`;
  const capacity = opts.capacity ?? potentialLength;
  const toRemove = potentialLength - capacity;
  if (opts.debug)
    console.log(`Stack.push: stackLen: ${stack2.length} potentialLen: ${potentialLength} toRemove: ${toRemove} policy: ${policy}`);
  switch (policy) {
    case `additions`:
      if (opts.debug)
        console.log(`Stack.push:DiscardAdditions: stackLen: ${stack2.length} slice: ${potentialLength - capacity} toAddLen: ${toAdd.length}`);
      if (stack2.length === opts.capacity) {
        return stack2;
      } else {
        return [...stack2, ...toAdd.slice(0, toAdd.length - toRemove)];
      }
    case `newer`:
      if (toRemove >= stack2.length) {
        return toAdd.slice(Math.max(0, toAdd.length - capacity), Math.min(toAdd.length, capacity) + 1);
      } else {
        if (opts.debug)
          console.log(` from orig: ${stack2.slice(0, toRemove - 1)}`);
        return [...stack2.slice(0, toRemove - 1), ...toAdd.slice(0, Math.min(toAdd.length, capacity - toRemove + 1))];
      }
    case `older`:
      return [...stack2, ...toAdd].slice(toRemove);
    default:
      throw new Error(`Unknown discard policy ${policy}`);
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
var StackImpl = class {
  constructor(opts, data) {
    __publicField(this, "opts");
    __publicField(this, "data");
    this.opts = opts;
    this.data = data;
  }
  push(...toAdd) {
    return new StackImpl(this.opts, push(this.opts, this.data, ...toAdd));
  }
  pop() {
    return new StackImpl(this.opts, pop(this.opts, this.data));
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
var StackMutableImpl = class {
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
  forEach(fn) {
    this.data.forEach(fn);
  }
  forEachFromTop(fn) {
    [...this.data].reverse().forEach(fn);
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
var stack = (opts = {}, ...startingItems) => new StackImpl({ ...opts }, [...startingItems]);
var stackMutable = (opts, ...startingItems) => new StackMutableImpl({ ...opts }, [...startingItems]);

// src/collections/Queue.ts
var Queue_exports = {};
__export(Queue_exports, {
  queue: () => queue,
  queueMutable: () => queueMutable
});
var debug = (opts, msg) => {
  opts.debug ? console.log(`queue:${msg}`) : null;
};
var trimQueue = (opts, queue2, toAdd) => {
  const potentialLength = queue2.length + toAdd.length;
  const capacity = opts.capacity ?? potentialLength;
  const toRemove = potentialLength - capacity;
  const policy = opts.discardPolicy ?? `additions`;
  debug(opts, `queueLen: ${queue2.length} potentialLen: ${potentialLength} toRemove: ${toRemove} policy: ${policy}`);
  switch (policy) {
    case `additions`:
      debug(opts, `trimQueue:DiscardAdditions: queueLen: ${queue2.length} slice: ${potentialLength - capacity} toAddLen: ${toAdd.length}`);
      if (queue2.length === opts.capacity) {
        return queue2;
      } else {
        return [...queue2, ...toAdd.slice(0, toRemove - 1)];
      }
    case `newer`:
      if (toRemove >= queue2.length) {
        return toAdd.slice(Math.max(0, toAdd.length - capacity), Math.min(toAdd.length, capacity) + 1);
      } else {
        const toAddFinal = toAdd.slice(0, Math.min(toAdd.length, capacity - toRemove + 1));
        const toKeep = queue2.slice(0, queue2.length - toRemove);
        debug(opts, `trimQueue: toRemove: ${toRemove} keeping: ${JSON.stringify(toKeep)} from orig: ${JSON.stringify(queue2)} toAddFinal: ${JSON.stringify(toAddFinal)}`);
        const t = [...toKeep, ...toAddFinal];
        debug(opts, `final: ${JSON.stringify(t)}`);
        return t;
      }
    case `older`:
      return [...queue2, ...toAdd].slice(toRemove);
    default:
      throw new Error(`Unknown overflow policy ${policy}`);
  }
};
var enqueue = (opts, queue2, ...toAdd) => {
  if (opts === void 0)
    throw new Error(`opts parameter undefined`);
  const potentialLength = queue2.length + toAdd.length;
  const overSize = opts.capacity && potentialLength > opts.capacity;
  const toReturn = overSize ? trimQueue(opts, queue2, toAdd) : [...queue2, ...toAdd];
  if (opts.capacity && toReturn.length !== opts.capacity && overSize)
    throw new Error(`Bug! Expected return to be at capacity. Return len: ${toReturn.length} capacity: ${opts.capacity} opts: ${JSON.stringify(opts)}`);
  if (!opts.capacity && toReturn.length !== potentialLength)
    throw new Error(`Bug! Return length not expected. Return len: ${toReturn.length} expected: ${potentialLength} opts: ${JSON.stringify(opts)}`);
  return toReturn;
};
var dequeue = (opts, queue2) => {
  if (queue2.length === 0)
    throw new Error(`Queue is empty`);
  return queue2.slice(1);
};
var peek2 = (opts, queue2) => queue2[0];
var isEmpty2 = (opts, queue2) => queue2.length === 0;
var isFull2 = (opts, queue2) => {
  if (opts.capacity) {
    return queue2.length >= opts.capacity;
  }
  return false;
};
var QueueImpl = class {
  constructor(opts, data) {
    __publicField(this, "opts");
    __publicField(this, "data");
    if (opts === void 0)
      throw new Error(`opts parameter undefined`);
    this.opts = opts;
    this.data = data;
  }
  forEach(fn) {
    for (let i = this.data.length - 1; i >= 0; i--) {
      fn(this.data[i]);
    }
  }
  forEachFromFront(fn) {
    this.data.forEach((vv) => fn(vv));
  }
  enqueue(...toAdd) {
    return new QueueImpl(this.opts, enqueue(this.opts, this.data, ...toAdd));
  }
  dequeue() {
    return new QueueImpl(this.opts, dequeue(this.opts, this.data));
  }
  get isEmpty() {
    return isEmpty2(this.opts, this.data);
  }
  get isFull() {
    return isFull2(this.opts, this.data);
  }
  get length() {
    return this.data.length;
  }
  get peek() {
    return peek2(this.opts, this.data);
  }
};
var QueueMutableImpl = class {
  constructor(opts, data) {
    __publicField(this, "opts");
    __publicField(this, "data");
    if (opts === void 0)
      throw new Error(`opts parameter undefined`);
    this.opts = opts;
    this.data = data;
  }
  enqueue(...toAdd) {
    this.data = enqueue(this.opts, this.data, ...toAdd);
    return this.data.length;
  }
  dequeue() {
    const v = peek2(this.opts, this.data);
    this.data = dequeue(this.opts, this.data);
    return v;
  }
  get isEmpty() {
    return isEmpty2(this.opts, this.data);
  }
  get isFull() {
    return isFull2(this.opts, this.data);
  }
  get length() {
    return this.data.length;
  }
  get peek() {
    return peek2(this.opts, this.data);
  }
};
var queue = (opts = {}, ...startingItems) => {
  opts = { ...opts };
  return new QueueImpl(opts, [...startingItems]);
};
var queueMutable = (opts = {}, ...startingItems) => new QueueMutableImpl({ ...opts }, [...startingItems]);

// src/collections/MapImmutable.ts
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
var has = (map2, key) => map2.has(key);
var add = (map2, ...data) => {
  if (map2 === void 0)
    throw new Error(`map parameter is undefined`);
  if (data === void 0)
    throw new Error(`data parameter i.s undefined`);
  if (data.length === 0)
    return map2;
  const firstRecord = data[0];
  const isObj = typeof firstRecord.key !== `undefined` && typeof firstRecord.value !== `undefined`;
  return isObj ? addObjects(map2, data) : addArray(map2, data);
};
var set = (map2, key, value) => {
  const x = new Map(map2.entries());
  x.set(key, value);
  return x;
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

// src/collections/MapMutable.ts
var mapMutable = (...data) => {
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

export {
  circularArray,
  mapArray,
  mapSet,
  mapCircular,
  stack,
  stackMutable,
  Stack_exports,
  queue,
  queueMutable,
  Queue_exports,
  map,
  mapMutable,
  collections_exports
};
