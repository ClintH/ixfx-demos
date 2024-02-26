import {
  without
} from "./chunk-KHC3C4P2.js";
import {
  isEqualDefault
} from "./chunk-BBT4NEOP.js";

// src/collections/queue/QueueFns.ts
var trimQueue = (opts, queue, toAdd) => {
  const potentialLength = queue.length + toAdd.length;
  const capacity = opts.capacity ?? potentialLength;
  const toRemove = potentialLength - capacity;
  const policy = opts.discardPolicy ?? `additions`;
  switch (policy) {
    case `additions`: {
      if (queue.length === 0)
        return toAdd.slice(0, toAdd.length - toRemove);
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
  if (opts === void 0)
    throw new Error(`opts parameter undefined`);
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
  if (queue.length === 0)
    throw new Error(`Queue is empty`);
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
var QueueMutable = class {
  opts;
  // eslint-disable-next-line functional/prefer-readonly-type
  data;
  eq;
  constructor(opts = {}, data = []) {
    if (opts === void 0)
      throw new Error(`opts parameter undefined`);
    this.opts = opts;
    this.data = data;
    this.eq = opts.eq ?? isEqualDefault;
  }
  clear() {
    this.data = [];
  }
  at(index) {
    if (index >= this.data.length)
      throw new Error(`Index outside bounds of queue`);
    const v = this.data.at(index);
    if (v === void 0)
      throw new Error(`Index appears to be outside range of queue`);
    return v;
  }
  /**
   * Return a copy of the array
   * @returns 
   */
  toArray() {
    return [...this.data];
  }
  enqueue(...toAdd) {
    this.data = enqueue(this.opts, this.data, ...toAdd);
    return this.data.length;
  }
  dequeue() {
    const v = peek(this.opts, this.data);
    if (v === void 0)
      return;
    this.data = dequeue(this.opts, this.data);
    return v;
  }
  /**
   * Remove value from queue, regardless of position.
   * Returns _true_ if something was removed.
   * 
   * See also {@link removeWhere} to remove based on a predicate
   * @param value 
   */
  remove(value, comparer) {
    const length = this.data.length;
    this.data = without(this.data, value, comparer ?? this.eq);
    return this.data.length !== length;
  }
  /**
   * Removes values that match `predicate`.
   * See also {@link remove} if to remove a value based on equality checking.
   * @param predicate 
   * @returns Returns number of items removed.
   */
  removeWhere(predicate) {
    const countPre = this.data.length;
    this.data = this.data.filter((element) => predicate(element));
    return countPre - this.data.length;
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
//# sourceMappingURL=chunk-GMKE2SCE.js.map