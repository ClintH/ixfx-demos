import {
  PriorityMutable,
  manual,
  priority
} from "./chunk-FVOMQHH6.js";
import {
  dequeue,
  enqueue,
  isEmpty,
  isFull,
  mutable,
  peek
} from "./chunk-4RHG66EP.js";
import {
  __export
} from "./chunk-L5EJU35C.js";

// src/collections/queue/index.ts
var queue_exports = {};
__export(queue_exports, {
  PriorityMutable: () => PriorityMutable,
  asResponsive: () => asResponsive,
  immutable: () => immutable,
  mutable: () => mutable,
  priority: () => priority
});

// src/collections/queue/QueueImmutable.ts
var QueueImmutable = class _QueueImmutable {
  #data;
  /**
   * Creates an instance of Queue.
   * @param {QueueOpts} opts Options foor queue
   * @param {V[]} data Initial data. Index 0 is front of queue
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

// src/collections/queue/Responsive.ts
function asResponsive(queue) {
  const events = manual({
    onNoSubscribers() {
      queue.removeEventListener(`removed`, onRemoved);
      queue.removeEventListener(`enqueue`, onEnqueue);
    },
    onFirstSubscribe() {
      queue.addEventListener(`removed`, onRemoved);
      queue.addEventListener(`enqueue`, onEnqueue);
      events.set(queue.toArray());
    }
  });
  const onRemoved = (event) => {
    events.set(event.finalData);
  };
  const onEnqueue = (event) => {
    events.set(event.finalData);
  };
  const set = (data) => {
    queue.enqueue(...data);
  };
  return {
    ...events,
    set
  };
}

export {
  QueueImmutable,
  immutable,
  asResponsive,
  queue_exports
};
//# sourceMappingURL=chunk-2LUR5STP.js.map