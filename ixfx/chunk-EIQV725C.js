import {
  SimpleEventEmitter
} from "./chunk-ZSSYQQHP.js";
import {
  defaultKeyer,
  toStringDefault2 as toStringDefault
} from "./chunk-DUNDLGZO.js";
import {
  __export
} from "./chunk-VE7DK22H.js";

// src/collections/set/index.ts
var set_exports = {};
__export(set_exports, {
  immutable: () => immutable,
  mutable: () => mutable
});

// src/collections/set/SetMutable.ts
var mutable = (keyString) => new SetStringMutable(keyString);
var SetStringMutable = class extends SimpleEventEmitter {
  // ✔ UNIT TESTED
  /* eslint-disable functional/prefer-readonly-type */
  store = /* @__PURE__ */ new Map();
  keyString;
  /**
   * Constructor
   * @param keyString Function which returns a string version of added items. If unspecified `JSON.stringify`
   */
  constructor(keyString) {
    super();
    this.keyString = keyString ?? defaultKeyer;
  }
  /**
   * Number of items stored in set
   */
  get size() {
    return this.store.size;
  }
  /**
   * Adds one or more items to set. `add` event is fired for each item
   * @param v items to add
   */
  add(...values) {
    let somethingAdded = false;
    for (const value of values) {
      const isUpdated = this.has(value);
      this.store.set(this.keyString(value), value);
      super.fireEvent(`add`, { value, updated: isUpdated });
      if (!isUpdated)
        somethingAdded = true;
    }
    return somethingAdded;
  }
  /**
   * Returns values from set as an iterable
   * @returns
   */
  //eslint-disable-next-line functional/prefer-tacit
  values() {
    return this.store.values();
  }
  /**
   * Clear items from set
   */
  clear() {
    this.store.clear();
    super.fireEvent(`clear`, true);
  }
  /**
   * Delete value from set.
   * @param v Value to delete
   * @returns _True_ if item was found and removed
   */
  delete(v) {
    const isDeleted = this.store.delete(this.keyString(v));
    if (isDeleted)
      super.fireEvent(`delete`, v);
    return isDeleted;
  }
  /**
   * Returns _true_ if item exists in set
   * @param v
   * @returns
   */
  has(v) {
    return this.store.has(this.keyString(v));
  }
  /**
   * Returns array copy of set
   * @returns Array copy of set
   */
  toArray() {
    return [...this.store.values()];
  }
};

// src/collections/set/SetImmutable.ts
var SetStringImmutable = class _SetStringImmutable {
  store;
  keyString;
  //eslint-disable-next-line functional/prefer-immutable-types
  constructor(keyString, map) {
    this.store = map ?? /* @__PURE__ */ new Map();
    this.keyString = keyString ?? defaultKeyer;
  }
  get size() {
    return this.store.size;
  }
  add(...values) {
    const s = new Map(this.store);
    for (const v of values) {
      const key = this.keyString(v);
      s.set(key, v);
    }
    return new _SetStringImmutable(this.keyString, s);
  }
  delete(v) {
    const s = new Map(this.store);
    const key = this.keyString(v);
    if (s.delete(key))
      return new _SetStringImmutable(this.keyString, s);
    return this;
  }
  has(v) {
    const key = this.keyString(v);
    return this.store.has(key);
  }
  toArray() {
    return [...this.store.values()];
  }
  *values() {
    yield* this.store.values();
  }
};
var immutable = (keyString = toStringDefault) => new SetStringImmutable(keyString);

export {
  mutable,
  SetStringMutable,
  SetStringImmutable,
  immutable,
  set_exports
};
//# sourceMappingURL=chunk-EIQV725C.js.map