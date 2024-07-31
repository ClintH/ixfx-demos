import {
  isEmpty,
  isFull,
  peek,
  pop,
  push
} from "./chunk-33YLZAWN.js";

// src/collections/stack/StackImmutable.ts
var StackImmutable = class _StackImmutable {
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
  immutable
};
//# sourceMappingURL=chunk-M2XIICMK.js.map