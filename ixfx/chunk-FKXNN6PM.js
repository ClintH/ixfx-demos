import {
  SimpleEventEmitter,
  defaultKeyer
} from "./chunk-YSD5376E.js";
import {
  toStringDefault
} from "./chunk-6UZ3OSJO.js";
import {
  __export
} from "./chunk-L5EJU35C.js";

// src/collections/set/index.ts
var set_exports = {};
__export(set_exports, {
  MassiveSet: () => MassiveSet,
  immutable: () => immutable,
  mutable: () => mutable
});

// src/collections/set/SetMutable.ts
var mutable = (keyString) => new SetStringMutable(keyString);
var SetStringMutable = class extends SimpleEventEmitter {
  /**
   * Constructor
   * @param keyString Function which returns a string version of added items. If unspecified `JSON.stringify`
   */
  constructor(keyString) {
    super();
    // ✔ UNIT TESTED
    /* eslint-disable functional/prefer-readonly-type */
    this.store = /* @__PURE__ */ new Map();
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
   * @param values items to add
   */
  add(...values) {
    let somethingAdded = false;
    for (const value of values) {
      const isUpdated = this.has(value);
      this.store.set(this.keyString(value), value);
      super.fireEvent(`add`, { value, updated: isUpdated });
      if (!isUpdated) somethingAdded = true;
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
    if (isDeleted) super.fireEvent(`delete`, v);
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
    if (s.delete(key)) return new _SetStringImmutable(this.keyString, s);
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

// src/collections/set/MassiveSet.ts
var MassiveSet = class _MassiveSet {
  constructor(maxDepth = 1, depth = 0) {
    this.children = /* @__PURE__ */ new Map();
    this.values = [];
    this.#depth = depth;
    this.#maxDepth = maxDepth;
  }
  #depth;
  #maxDepth;
  /**
   * Returns the number of values stored in just this level of the set
   * @returns 
   */
  sizeLocal() {
    return this.values.length;
  }
  /**
   * Returns the number of branches at this node
   * Use {@link sizeChildrenDeep} to count all branches recursively
   * @returns 
   */
  sizeChildren() {
    return [...this.children.values()].length;
  }
  sizeChildrenDeep() {
    let t = this.sizeChildren();
    for (const c of this.children.values()) {
      t += c.sizeChildrenDeep();
    }
    return t;
  }
  /**
   * Returns the total number of values stored in the set
   */
  size() {
    let x = this.values.length;
    for (const set of this.children.values()) {
      x += set.size();
    }
    return x;
  }
  add(value) {
    if (typeof value !== `string`) throw new Error(`Param 'value' must be a string. Got: ${typeof value}`);
    if (value.length === 0) throw new Error(`Param 'value' is empty`);
    const destination = this.#getChild(value, true);
    if (destination === this) {
      if (!this.hasLocal(value)) {
        this.values.push(value);
      }
      return;
    }
    if (!destination) throw new Error(`Could not create child set for: ${value}`);
    destination.add(value);
  }
  remove(value) {
    if (typeof value !== `string`) throw new Error(`Param 'value' must be a string. Got: ${typeof value}`);
    if (value.length === 0) throw new Error(`Param 'value' is empty`);
    const destination = this.#getChild(value, false);
    if (destination === void 0) return false;
    if (destination === this) {
      if (this.hasLocal(value)) {
        this.values = this.values.filter((v) => v !== value);
        return true;
      }
      return false;
    }
    return destination.remove(value);
  }
  debugDump() {
    const r = this.#dumpToArray();
    for (const rr of r) {
      console.log(rr);
    }
  }
  #dumpToArray(depth = 0) {
    const r = [];
    r.push(`Depth: ${this.#depth} Max: ${this.#maxDepth}`);
    for (const [key, value] of this.children.entries()) {
      const dumped = value.#dumpToArray(depth + 1);
      r.push(` key: ${key}`);
      for (const d of dumped) {
        r.push(` `.repeat(depth + 1) + d);
      }
    }
    r.push(`Values: (${this.values.length})`);
    for (const v of this.values) {
      r.push(` ${v}`);
    }
    return r.map((line) => ` `.repeat(depth) + line);
  }
  #getChild(value, create) {
    if (value === void 0) throw new Error(`Param 'value' undefined`);
    if (this.#depth === this.#maxDepth) return this;
    if (value.length <= this.#depth) return this;
    const k = value[this.#depth];
    if (k === void 0) throw new Error(`Logic error. Depth: ${this.#depth} Len: ${value.length}`);
    let child = this.children.get(k);
    if (child === void 0 && create) {
      child = new _MassiveSet(this.#maxDepth, this.#depth + 1);
      this.children.set(k, child);
    }
    return child;
  }
  /**
   * Returns _true_ if `value` stored on this node
   * @param value 
   * @returns 
   */
  hasLocal(value) {
    for (const v of this.values) {
      if (v === value) return true;
    }
    return false;
  }
  has(value) {
    if (typeof value !== `string`) return false;
    const destination = this.#getChild(value, false);
    if (destination === void 0) return false;
    if (destination === this) return this.hasLocal(value);
    return destination.has(value);
  }
};

export {
  mutable,
  SetStringMutable,
  SetStringImmutable,
  immutable,
  MassiveSet,
  set_exports
};
//# sourceMappingURL=chunk-FKXNN6PM.js.map