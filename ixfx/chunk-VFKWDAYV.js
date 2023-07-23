var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/collections/queue/index.ts
var queue_exports = {};
__export(queue_exports, {
  queue: () => queue,
  queueMutable: () => queueMutable
});

// src/collections/queue/QueueFns.ts
var debug = (opts, msg) => {
  opts.debug ? console.log(`queue:${msg}`) : null;
};
var trimQueue = (opts, queue2, toAdd) => {
  const potentialLength = queue2.length + toAdd.length;
  const capacity = opts.capacity ?? potentialLength;
  const toRemove = potentialLength - capacity;
  const policy = opts.discardPolicy ?? `additions`;
  debug(
    opts,
    `queueLen: ${queue2.length} potentialLen: ${potentialLength} toRemove: ${toRemove} policy: ${policy}`
  );
  switch (policy) {
    case `additions`:
      debug(
        opts,
        `trimQueue:DiscardAdditions: queueLen: ${queue2.length} slice: ${potentialLength - capacity} toAddLen: ${toAdd.length}`
      );
      if (queue2.length === opts.capacity) {
        return queue2;
      } else {
        return [...queue2, ...toAdd.slice(0, toRemove - 1)];
      }
    case `newer`:
      if (toRemove >= queue2.length) {
        return toAdd.slice(
          Math.max(0, toAdd.length - capacity),
          Math.min(toAdd.length, capacity) + 1
        );
      } else {
        const toAddFinal = toAdd.slice(
          0,
          Math.min(toAdd.length, capacity - toRemove + 1)
        );
        const toKeep = queue2.slice(0, queue2.length - toRemove);
        debug(
          opts,
          `trimQueue: toRemove: ${toRemove} keeping: ${JSON.stringify(
            toKeep
          )} from orig: ${JSON.stringify(queue2)} toAddFinal: ${JSON.stringify(
            toAddFinal
          )}`
        );
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
  if (opts.capacity && toReturn.length !== opts.capacity && overSize) {
    throw new Error(
      `Bug! Expected return to be at capacity. Return len: ${toReturn.length} capacity: ${opts.capacity} opts: ${JSON.stringify(opts)}`
    );
  }
  if (!opts.capacity && toReturn.length !== potentialLength) {
    throw new Error(
      `Bug! Return length not expected. Return len: ${toReturn.length} expected: ${potentialLength} opts: ${JSON.stringify(opts)}`
    );
  }
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

// src/collections/queue/Queue.ts
var QueueImpl = class _QueueImpl {
  opts;
  data;
  /**
   * Creates an instance of Queue.
   * @param {QueueOpts} opts Options foor queue
   * @param {V[]} data Initial data. Index 0 is front of queue
   * @memberof Queue
   */
  constructor(opts, data) {
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
    this.data.forEach(fn);
  }
  enqueue(...toAdd) {
    return new _QueueImpl(this.opts, enqueue(this.opts, this.data, ...toAdd));
  }
  dequeue() {
    return new _QueueImpl(this.opts, dequeue(this.opts, this.data));
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
  return new QueueImpl(opts, [...startingItems]);
};

// src/collections/queue/QueueMutable.ts
var QueueMutableImpl = class {
  opts;
  // eslint-disable-next-line functional/prefer-readonly-type
  data;
  constructor(opts, data) {
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
function queueMutable(opts = {}, ...startingItems) {
  return new QueueMutableImpl({ ...opts }, [...startingItems]);
}

export {
  __commonJS,
  __export,
  __toESM,
  __decorateClass,
  __publicField,
  queue,
  queueMutable,
  queue_exports
};
//# sourceMappingURL=chunk-VFKWDAYV.js.map