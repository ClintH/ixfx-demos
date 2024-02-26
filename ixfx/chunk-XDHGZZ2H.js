import {
  QueueMutable,
  dequeue,
  enqueue,
  isEmpty,
  isFull,
  mutable,
  peek
} from "./chunk-MYGNFH2D.js";
import {
  max2 as max,
  min2 as min
} from "./chunk-UTTSVY6V.js";
import {
  isEqualDefault
} from "./chunk-QMMKIDRO.js";
import {
  __export
} from "./chunk-ERASX3TW.js";

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
  data;
  /**
   * Creates an instance of Queue.
   * @param {QueueOpts} opts Options foor queue
   * @param {V[]} data Initial data. Index 0 is front of queue
   * @memberof Queue
   */
  constructor(opts = {}, data = []) {
    if (opts === void 0)
      throw new Error(`opts parameter undefined`);
    this.opts = opts;
    this.data = data;
  }
  forEach(fn) {
    for (let index = this.data.length - 1; index >= 0; index--) {
      fn(this.data[index]);
    }
  }
  forEachFromFront(fn) {
    this.data.forEach(fn);
  }
  enqueue(...toAdd) {
    return new _QueueImmutable(
      this.opts,
      enqueue(this.opts, this.data, ...toAdd)
    );
  }
  dequeue() {
    return new _QueueImmutable(this.opts, dequeue(this.opts, this.data));
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
var immutable = (opts = {}, ...startingItems) => {
  opts = { ...opts };
  return new QueueImmutable(opts, [...startingItems]);
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
  enqueueWithPriority(item, priority2) {
    super.enqueue({ item, priority: priority2 });
  }
  changePriority(item, priority2, addIfMissing = false, eq) {
    if (item === void 0)
      throw new Error(`Item cannot be undefined`);
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
    if (toDelete === void 0 && !addIfMissing)
      throw new Error(`Item not found in priority queue. Item: ${JSON.stringify(item)}`);
    if (toDelete !== void 0) {
      this.remove(toDelete);
    }
    this.enqueueWithPriority(item, priority2);
  }
  dequeueMax() {
    const m = max(this.data, (v) => v.priority);
    if (m === void 0)
      return;
    this.remove(m);
    return m.item;
  }
  dequeueMin() {
    const m = min(this.data, (v) => v.priority);
    if (m === void 0)
      return;
    this.remove(m);
    return m.item;
  }
  peekMax() {
    const m = max(this.data, (v) => v.priority);
    if (m === void 0)
      return;
    return m.item;
  }
  peekMin() {
    const m = min(this.data, (v) => v.priority);
    if (m === void 0)
      return;
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
