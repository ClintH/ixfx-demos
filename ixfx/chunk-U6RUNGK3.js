import {
  average,
  getMinMaxAvg,
  mutableCircularArray,
  mutableMapArray,
  mutableMapCircular,
  mutableMapSet,
  stack,
  stackMutable
} from "./chunk-RRAKEYPR.js";
import {
  Map_exports,
  Set_exports,
  add,
  del,
  filter,
  find,
  groupBy,
  guardArray,
  has,
  hasAnyValue,
  hasKeyValue,
  map,
  mapToArray,
  mapToObj,
  mutableMap,
  mutableStringSet,
  randomElement,
  randomIndex,
  randomPluck,
  set,
  shuffle,
  toArray,
  transformMap,
  without,
  zipKeyValue
} from "./chunk-ZFK2QSBD.js";
import {
  simpleMutableMapArray
} from "./chunk-HQCU5VB2.js";
import {
  __export,
  __publicField
} from "./chunk-FQLUQVDZ.js";

// src/collections/index.ts
var collections_exports = {};
__export(collections_exports, {
  Maps: () => Map_exports,
  Queues: () => Queue_exports,
  Sets: () => Set_exports,
  add: () => add,
  average: () => average,
  del: () => del,
  filter: () => filter,
  find: () => find,
  getMinMaxAvg: () => getMinMaxAvg,
  groupBy: () => groupBy,
  guardArray: () => guardArray,
  has: () => has,
  hasAnyValue: () => hasAnyValue,
  hasKeyValue: () => hasKeyValue,
  map: () => map,
  mapToArray: () => mapToArray,
  mapToObj: () => mapToObj,
  mutableCircularArray: () => mutableCircularArray,
  mutableMap: () => mutableMap,
  mutableMapArray: () => mutableMapArray,
  mutableMapCircular: () => mutableMapCircular,
  mutableMapSet: () => mutableMapSet,
  mutableStringSet: () => mutableStringSet,
  queue: () => queue,
  queueMutable: () => queueMutable,
  randomElement: () => randomElement,
  randomIndex: () => randomIndex,
  randomPluck: () => randomPluck,
  set: () => set,
  shuffle: () => shuffle,
  simpleMutableMapArray: () => simpleMutableMapArray,
  stack: () => stack,
  stackMutable: () => stackMutable,
  toArray: () => toArray,
  transformMap: () => transformMap,
  without: () => without,
  zipKeyValue: () => zipKeyValue
});

// src/collections/Queue.ts
var Queue_exports = {};
__export(Queue_exports, {
  OverflowPolicy: () => OverflowPolicy,
  queue: () => queue,
  queueMutable: () => queueMutable
});
var OverflowPolicy = /* @__PURE__ */ ((OverflowPolicy2) => {
  OverflowPolicy2[OverflowPolicy2["DiscardOlder"] = 0] = "DiscardOlder";
  OverflowPolicy2[OverflowPolicy2["DiscardNewer"] = 1] = "DiscardNewer";
  OverflowPolicy2[OverflowPolicy2["DiscardAdditions"] = 2] = "DiscardAdditions";
  return OverflowPolicy2;
})(OverflowPolicy || {});
var debug = (opts, msg) => {
  opts.debug ? console.log(`queue:${msg}`) : null;
};
var trimQueue = (opts, queue2, toAdd) => {
  const potentialLength = queue2.length + toAdd.length;
  const capacity = opts.capacity ?? potentialLength;
  const toRemove = potentialLength - capacity;
  const policy = opts.overflowPolicy ?? 2 /* DiscardAdditions */;
  debug(opts, `queueLen: ${queue2.length} potentialLen: ${potentialLength} toRemove: ${toRemove} policy: ${OverflowPolicy[policy]}`);
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
var peek = (opts, queue2) => queue2[0];
var isEmpty = (opts, queue2) => queue2.length === 0;
var isFull = (opts, queue2) => {
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
    return isEmpty(this.opts, this.data);
  }
  get isFull() {
    return isFull(this.opts, this.data);
  }
  get length() {
    return this.data.length;
  }
  get peek() {
    return peek(this.opts, this.data);
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
    const v = peek(this.opts, this.data);
    this.data = dequeue(this.opts, this.data);
    return v;
  }
  get isEmpty() {
    return isEmpty(this.opts, this.data);
  }
  get isFull() {
    return isFull(this.opts, this.data);
  }
  get length() {
    return this.data.length;
  }
  get peek() {
    return peek(this.opts, this.data);
  }
};
var queueMutable = (opts = {}, ...startingItems) => new MutableQueueImpl({ ...opts }, [...startingItems]);

export {
  queue,
  queueMutable,
  Queue_exports,
  collections_exports
};
//# sourceMappingURL=chunk-U6RUNGK3.js.map