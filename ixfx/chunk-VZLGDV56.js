import {
  isEqualDefault
} from "./chunk-H4TGENJF.js";
import {
  __export,
  __privateAdd,
  __privateGet,
  __publicField
} from "./chunk-FQLUQVDZ.js";

// src/collections/Lists.ts
var Lists_exports = {};
__export(Lists_exports, {
  QueueOverflowPolicy: () => OverflowPolicy2,
  StackOverflowPolicy: () => OverflowPolicy,
  guardArray: () => guardArray,
  queue: () => queue,
  queueMutable: () => queueMutable,
  randomElement: () => randomElement,
  randomIndex: () => randomIndex,
  randomPluck: () => randomPluck,
  shuffle: () => shuffle,
  stack: () => stack,
  stackMutable: () => stackMutable,
  without: () => without
});

// src/collections/Stack.ts
var OverflowPolicy = /* @__PURE__ */ ((OverflowPolicy3) => {
  OverflowPolicy3[OverflowPolicy3["DiscardOlder"] = 0] = "DiscardOlder";
  OverflowPolicy3[OverflowPolicy3["DiscardNewer"] = 1] = "DiscardNewer";
  OverflowPolicy3[OverflowPolicy3["DiscardAdditions"] = 2] = "DiscardAdditions";
  return OverflowPolicy3;
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

// src/collections/Queue.ts
var OverflowPolicy2 = /* @__PURE__ */ ((OverflowPolicy3) => {
  OverflowPolicy3[OverflowPolicy3["DiscardOlder"] = 0] = "DiscardOlder";
  OverflowPolicy3[OverflowPolicy3["DiscardNewer"] = 1] = "DiscardNewer";
  OverflowPolicy3[OverflowPolicy3["DiscardAdditions"] = 2] = "DiscardAdditions";
  return OverflowPolicy3;
})(OverflowPolicy2 || {});
var debug = (opts, msg) => {
  opts.debug ? console.log(`queue:${msg}`) : null;
};
var trimQueue = (opts, queue2, toAdd) => {
  const potentialLength = queue2.length + toAdd.length;
  const capacity = opts.capacity ?? potentialLength;
  const toRemove = potentialLength - capacity;
  const policy = opts.overflowPolicy ?? 2 /* DiscardAdditions */;
  debug(opts, `queueLen: ${queue2.length} potentialLen: ${potentialLength} toRemove: ${toRemove} policy: ${OverflowPolicy2[policy]}`);
  switch (policy) {
    case 2 /* DiscardAdditions */:
      debug(opts, `enqueue:DiscardAdditions: queueLen: ${queue2.length} slice: ${potentialLength - capacity} toAddLen: ${toAdd.length}`);
      if (queue2.length === opts.capacity) {
        return queue2;
      } else {
        return [...queue2, ...toAdd.slice(0, toRemove - 1)];
      }
    case 1 /* DiscardNewer */:
      if (toRemove >= queue2.length) {
        return toAdd.slice(Math.max(0, toAdd.length - capacity), Math.min(toAdd.length, capacity) + 1);
      } else {
        debug(opts, ` from orig: ${queue2.slice(0, toRemove - 1)}`);
        return [...queue2.slice(0, toRemove - 1), ...toAdd.slice(0, Math.min(toAdd.length, capacity - toRemove + 1))];
      }
    case 0 /* DiscardOlder */:
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
var Queue = class {
  constructor(opts, data) {
    __publicField(this, "opts");
    __publicField(this, "data");
    if (opts === void 0)
      throw new Error(`opts parameter undefined`);
    this.opts = opts;
    this.data = data;
  }
  enqueue(...toAdd) {
    return new Queue(this.opts, enqueue(this.opts, this.data, ...toAdd));
  }
  dequeue() {
    return new Queue(this.opts, dequeue(this.opts, this.data));
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
  return new Queue(opts, [...startingItems]);
};
var MutableQueueImpl = class {
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
var queueMutable = (opts = {}, ...startingItems) => new MutableQueueImpl({ ...opts }, [...startingItems]);

// src/collections/Lists.ts
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

// src/collections/SimpleMutableMapArray.ts
var _map;
var SimpleMutableMapArray = class {
  constructor() {
    __privateAdd(this, _map, /* @__PURE__ */ new Map());
  }
  add(key, ...values) {
    const existing = __privateGet(this, _map).get(key);
    if (existing === void 0) {
      __privateGet(this, _map).set(key, values);
    } else {
      __privateGet(this, _map).set(key, [...existing, ...values]);
    }
  }
  debugString() {
    let r = ``;
    const keys = Array.from(__privateGet(this, _map).keys());
    keys.every((k) => {
      const v = __privateGet(this, _map).get(k);
      if (v === void 0)
        return;
      r += k + ` (${v.length}) = ${JSON.stringify(v)}\r
`;
    });
    return r;
  }
  get(key) {
    return __privateGet(this, _map).get(key);
  }
  delete(key, v) {
    const existing = __privateGet(this, _map).get(key);
    if (existing === void 0)
      return false;
    const without2 = existing.filter((i) => i !== v);
    __privateGet(this, _map).set(key, without2);
    return without2.length < existing.length;
  }
  clear() {
    __privateGet(this, _map).clear();
  }
};
_map = new WeakMap();

// src/Events.ts
var _listeners;
var SimpleEventEmitter = class {
  constructor() {
    __privateAdd(this, _listeners, new SimpleMutableMapArray());
  }
  fireEvent(type, args) {
    const listeners = __privateGet(this, _listeners).get(type);
    if (listeners === void 0)
      return;
    listeners.forEach((l) => {
      try {
        l(args, this);
      } catch (err) {
        console.debug(`Event listener error: `, err);
      }
    });
  }
  addEventListener(type, listener) {
    __privateGet(this, _listeners).add(type, listener);
  }
  removeEventListener(type, listener) {
    __privateGet(this, _listeners).delete(type, listener);
  }
  clearEventListeners() {
    __privateGet(this, _listeners).clear();
  }
};
_listeners = new WeakMap();

// src/collections/Set.ts
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

export {
  stack,
  randomElement,
  Lists_exports,
  SimpleEventEmitter,
  mutableStringSet,
  Set_exports
};
//# sourceMappingURL=chunk-VZLGDV56.js.map