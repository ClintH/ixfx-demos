import {
  QueueMutable,
  dequeue,
  enqueue,
  isEmpty,
  isFull,
  mutable,
  peek
} from "./chunk-5PZ2TXZH.js";
import {
  maxScore,
  min
} from "./chunk-SMLGKS2N.js";
import {
  isEqualDefault
} from "./chunk-SGQC7FGM.js";
import {
  throwNumberTest
} from "./chunk-JIDOUNL5.js";
import {
  __export
} from "./chunk-AFNFQUHK.js";

// src/collections/queue/index.ts
var queue_exports = {};
__export(queue_exports, {
  QueueMutable: () => QueueMutable,
  immutable: () => immutable,
  mutable: () => mutable,
  priority: () => priority
});

// src/collections/queue/QueueImmutable.ts
var QueueImmutable = class _QueueImmutable {
  opts;
  #data;
  /**
   * Creates an instance of Queue.
   * @param {QueueOpts} opts Options foor queue
   * @param {V[]} data Initial data. Index 0 is front of queue
   * @memberof Queue
   */
  constructor(opts = {}, data = []) {
    if (opts === void 0) throw new Error(`opts parameter undefined`);
    this.opts = opts;
    this.#data = data;
  }
  forEach(fn) {
    for (let index = this.#data.length - 1; index >= 0; index--) {
      fn(this.#data[index]);
    }
  }
  forEachFromFront(fn) {
    this.#data.forEach((item) => {
      fn(item);
    });
  }
  enqueue(...toAdd) {
    return new _QueueImmutable(
      this.opts,
      enqueue(this.opts, this.#data, ...toAdd)
    );
  }
  dequeue() {
    return new _QueueImmutable(this.opts, dequeue(this.opts, this.#data));
  }
  get isEmpty() {
    return isEmpty(this.opts, this.#data);
  }
  get isFull() {
    return isFull(this.opts, this.#data);
  }
  get length() {
    return this.#data.length;
  }
  get peek() {
    return peek(this.opts, this.#data);
  }
  toArray() {
    return [...this.#data];
  }
};
var immutable = (options = {}, ...startingItems) => {
  options = { ...options };
  return new QueueImmutable(options, [...startingItems]);
};

// src/collections/queue/PriorityMutable.ts
var PriorityMutable = class extends QueueMutable {
  constructor(opts = {}) {
    if (opts.eq === void 0) {
      opts = {
        ...opts,
        eq: (a, b) => {
          return isEqualDefault(a.item, b.item);
        }
      };
    }
    super(opts);
  }
  /**
   * Adds an item with a given priority
   * @param item Item
   * @param priority Priority (higher numeric value means higher priority)
   */
  enqueueWithPriority(item, priority2) {
    throwNumberTest(priority2, `positive`);
    super.enqueue({ item, priority: priority2 });
  }
  changePriority(item, priority2, addIfMissing = false, eq) {
    if (item === void 0) throw new Error(`Item cannot be undefined`);
    let toDelete;
    for (const d of this.data) {
      if (eq) {
        if (eq(d.item, item)) {
          toDelete = d;
          break;
        }
      } else {
        if (this.eq(d, { item, priority: 0 })) {
          toDelete = d;
          break;
        }
      }
    }
    if (toDelete === void 0 && !addIfMissing) throw new Error(`Item not found in priority queue. Item: ${JSON.stringify(item)}`);
    if (toDelete !== void 0) {
      this.removeWhere((item2) => toDelete === item2);
    }
    this.enqueueWithPriority(item, priority2);
  }
  dequeueMax() {
    const m = maxScore(this.data, (v) => v.priority);
    if (m === void 0) return;
    this.removeWhere((item) => item === m);
    return m.item;
  }
  dequeueMin() {
    const m = min(this.data, (v) => v.priority);
    if (m === void 0) return;
    this.removeWhere((item) => item === m);
    return m.item;
  }
  peekMax() {
    const m = maxScore(this.data, (v) => v.priority);
    if (m === void 0) return;
    return m.item;
  }
  peekMin() {
    const m = min(this.data, (v) => v.priority);
    if (m === void 0) return;
    return m.item;
  }
};
function priority(opts = {}) {
  return new PriorityMutable(opts);
}

export {
  QueueImmutable,
  immutable,
  PriorityMutable,
  priority,
  queue_exports
};
//# sourceMappingURL=chunk-RLUQAN6Q.js.map