import {
  StackMutable,
  isEmpty,
  isFull,
  mutable,
  peek,
  pop,
  push,
  tree_exports
} from "./chunk-SP37NBBE.js";
import {
  Map_exports,
  circularArray
} from "./chunk-KSOSZLHF.js";
import {
  QueueImmutable,
  queue_exports
} from "./chunk-RLUQAN6Q.js";
import {
  SetStringImmutable,
  SetStringMutable,
  set_exports
} from "./chunk-BS3QYH4U.js";
import {
  QueueMutable
} from "./chunk-5PZ2TXZH.js";
import {
  __export
} from "./chunk-AFNFQUHK.js";

// src/collections/index.ts
var collections_exports = {};
__export(collections_exports, {
  Maps: () => Map_exports,
  QueueImmutable: () => QueueImmutable,
  QueueMutable: () => QueueMutable,
  Queues: () => queue_exports,
  SetStringImmutable: () => SetStringImmutable,
  SetStringMutable: () => SetStringMutable,
  Sets: () => set_exports,
  StackImmutable: () => StackImmutable,
  StackMutable: () => StackMutable,
  Stacks: () => stack_exports,
  Trees: () => tree_exports,
  circularArray: () => circularArray
});

// src/collections/stack/index.ts
var stack_exports = {};
__export(stack_exports, {
  immutable: () => immutable,
  mutable: () => mutable
});

// src/collections/stack/StackImmutable.ts
var StackImmutable = class _StackImmutable {
  opts;
  /* eslint-disable-next-line functional/prefer-readonly-type */
  data;
  constructor(opts = {}, data = []) {
    this.opts = opts;
    this.data = data;
  }
  push(...toAdd) {
    return new _StackImmutable(
      this.opts,
      push(this.opts, this.data, ...toAdd)
    );
  }
  pop() {
    return new _StackImmutable(this.opts, pop(this.opts, this.data));
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
var immutable = (options = {}, ...startingItems) => new StackImmutable({ ...options }, [...startingItems]);

export {
  StackImmutable,
  stack_exports,
  collections_exports
};
//# sourceMappingURL=chunk-JR5DG2GR.js.map