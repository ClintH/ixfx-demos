import {
  __privateAdd,
  __privateGet,
  __publicField
} from "./chunk-FQLUQVDZ.js";

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

// src/collections/Lists.ts
var guardArray = (array, paramName = `?`) => {
  if (array === void 0)
    throw new Error(`Param '${paramName}' is undefined. Expected array.`);
  if (array === null)
    throw new Error(`Param '${paramName}' is null. Expected array.`);
  if (!Array.isArray(array))
    throw new Error(`Param '${paramName}' not an array as expected`);
};
var randomElement = (array) => {
  guardArray(array, `array`);
  return array[Math.floor(Math.random() * array.length)];
};

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
    const without = existing.filter((i) => i !== v);
    __privateGet(this, _map).set(key, without);
    return without.length < existing.length;
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
  SimpleEventEmitter,
  mutableStringSet
};
//# sourceMappingURL=chunk-3FKWJC5Q.js.map