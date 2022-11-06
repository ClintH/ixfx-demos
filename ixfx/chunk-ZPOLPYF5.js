import {
  SimpleEventEmitter
} from "./chunk-OVCUSACM.js";
import {
  __export,
  __publicField
} from "./chunk-FU5PERHQ.js";

// src/collections/Set.ts
var Set_exports = {};
__export(Set_exports, {
  set: () => set,
  setMutable: () => setMutable
});
var StringSetImpl = class {
  constructor(keyString, map) {
    __publicField(this, "store");
    __publicField(this, "keyString");
    this.store = map ?? /* @__PURE__ */ new Map();
    this.keyString = keyString ?? defaultKeyer;
  }
  add(...values) {
    const s = new Map(this.store);
    for (const v of values) {
      const key = this.keyString(v);
      s.set(key, v);
    }
    return new StringSetImpl(this.keyString, s);
  }
  delete(v) {
    const s = new Map(this.store);
    const key = this.keyString(v);
    if (s.delete(key))
      return new StringSetImpl(this.keyString, s);
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
var set = (keyString) => new StringSetImpl(keyString);
var setMutable = (keyString = void 0) => new MutableStringSetImpl(keyString);
var defaultKeyer = (a) => {
  if (typeof a === `string`) {
    return a;
  } else {
    return JSON.stringify(a);
  }
};
var MutableStringSetImpl = class extends SimpleEventEmitter {
  constructor(keyString = void 0) {
    super();
    __publicField(this, "store", /* @__PURE__ */ new Map());
    __publicField(this, "keyString");
    this.keyString = keyString ?? defaultKeyer;
  }
  add(...v) {
    v.forEach((i) => {
      const isUpdated = this.has(i);
      this.store.set(this.keyString(i), i);
      super.fireEvent(`add`, { value: i, updated: isUpdated });
    });
  }
  values() {
    return this.store.values();
  }
  clear() {
    this.store.clear();
    super.fireEvent(`clear`, true);
  }
  delete(v) {
    const isDeleted = this.store.delete(this.keyString(v));
    if (isDeleted)
      super.fireEvent(`delete`, v);
    return isDeleted;
  }
  has(v) {
    return this.store.has(this.keyString(v));
  }
  toArray() {
    return Array.from(this.store.values());
  }
};

export {
  set,
  setMutable,
  Set_exports
};
//# sourceMappingURL=chunk-ZPOLPYF5.js.map