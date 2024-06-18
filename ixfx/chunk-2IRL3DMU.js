import {
  SimpleEventEmitter
} from "./chunk-AHTRZRWD.js";
import {
  isEqualDefault
} from "./chunk-SGQC7FGM.js";

// src/collections/queue/QueueFns.ts
var trimQueue = (opts, queue, toAdd) => {
  const potentialLength = queue.length + toAdd.length;
  const capacity = opts.capacity ?? potentialLength;
  const toRemove = potentialLength - capacity;
  const policy = opts.discardPolicy ?? `additions`;
  switch (policy) {
    case `additions`: {
      if (queue.length === 0) return toAdd.slice(0, toAdd.length - toRemove);
      if (queue.length === opts.capacity) {
        return queue;
      } else {
        return [...queue, ...toAdd.slice(0, toRemove - 1)];
      }
    }
    case `newer`: {
      if (toRemove >= queue.length) {
        if (queue.length === 0) {
          return [...toAdd.slice(0, capacity - 1), toAdd.at(-1)];
        }
        return toAdd.slice(
          Math.max(0, toAdd.length - capacity),
          Math.min(toAdd.length, capacity) + 1
        );
      } else {
        const countToAdd = Math.max(1, toAdd.length - queue.length);
        const toAddFinal = toAdd.slice(toAdd.length - countToAdd, toAdd.length);
        const toKeep = queue.slice(0, Math.min(queue.length, capacity - 1));
        const t = [...toKeep, ...toAddFinal];
        return t;
      }
    }
    case `older`: {
      return [...queue, ...toAdd].slice(toRemove);
    }
    default: {
      throw new Error(`Unknown overflow policy ${policy}`);
    }
  }
};
var enqueue = (opts, queue, ...toAdd) => {
  if (opts === void 0) throw new Error(`opts parameter undefined`);
  const potentialLength = queue.length + toAdd.length;
  const overSize = opts.capacity && potentialLength > opts.capacity;
  const toReturn = overSize ? trimQueue(opts, queue, toAdd) : [...queue, ...toAdd];
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
var dequeue = (opts, queue) => {
  if (queue.length === 0) throw new Error(`Queue is empty`);
  return queue.slice(1);
};
var peek = (opts, queue) => queue[0];
var isEmpty = (opts, queue) => queue.length === 0;
var isFull = (opts, queue) => {
  if (opts.capacity) {
    return queue.length >= opts.capacity;
  }
  return false;
};

// src/collections/queue/QueueMutable.ts
var QueueMutable = class extends SimpleEventEmitter {
  opts;
  data;
  eq;
  constructor(opts = {}, data = []) {
    super();
    if (opts === void 0) throw new Error(`opts parameter undefined`);
    this.opts = opts;
    this.data = data;
    this.eq = opts.eq ?? isEqualDefault;
  }
  clear() {
    const copy = [...this.data];
    this.data = [];
    this.fireEvent(`removed`, { finalData: this.data, removed: copy });
    this.onClear();
  }
  /**
   * Called when all data is cleared
   */
  onClear() {
  }
  at(index) {
    if (index >= this.data.length) throw new Error(`Index outside bounds of queue`);
    const v = this.data.at(index);
    if (v === void 0) throw new Error(`Index appears to be outside range of queue`);
    return v;
  }
  enqueue(...toAdd) {
    this.data = enqueue(this.opts, this.data, ...toAdd);
    const length = this.data.length;
    this.onEnqueue(this.data, toAdd);
    return length;
  }
  onEnqueue(result, attemptedToAdd) {
    this.fireEvent(`enqueue`, { added: attemptedToAdd, finalData: result });
  }
  dequeue() {
    const v = peek(this.opts, this.data);
    if (v === void 0) return;
    this.data = dequeue(this.opts, this.data);
    this.fireEvent(`dequeue`, { removed: v, finalData: this.data });
    this.onRemoved([v], this.data);
    return v;
  }
  onRemoved(removed, finalData) {
    this.fireEvent(`removed`, { removed, finalData });
  }
  /**
   * Removes values that match `predicate`.
   * @param predicate 
   * @returns Returns number of items removed.
   */
  removeWhere(predicate) {
    const countPre = this.data.length;
    const toRemove = this.data.filter((v) => predicate(v));
    if (toRemove.length === 0) return 0;
    this.data = this.data.filter((element) => !predicate(element));
    this.onRemoved(toRemove, this.data);
    return countPre - this.data.length;
  }
  /**
  * Return a copy of the array
  * @returns 
  */
  toArray() {
    return [...this.data];
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
function mutable(opts = {}, ...startingItems) {
  return new QueueMutable({ ...opts }, [...startingItems]);
}

export {
  enqueue,
  dequeue,
  peek,
  isEmpty,
  isFull,
  QueueMutable,
  mutable
};
//# sourceMappingURL=chunk-2IRL3DMU.js.map