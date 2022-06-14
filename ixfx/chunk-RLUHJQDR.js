import {
  SimpleEventEmitter
} from "./chunk-R7MIQL7F.js";
import {
  __export,
  __publicField
} from "./chunk-6SYKIMQH.js";

// src/collections/Set.ts
var Set_exports = {};
__export(Set_exports, {
  setMutable: () => setMutable
});
var setMutable = (keyString = void 0) => new MutableStringSetImpl(keyString);
var MutableStringSetImpl = class extends SimpleEventEmitter {
  constructor(keyString = void 0) {
    super();
    __publicField(this, "store", /* @__PURE__ */ new Map());
    __publicField(this, "keyString");
    if (keyString === void 0) {
      keyString = (a) => {
        if (typeof a === `string`) {
          return a;
        } else {
          return JSON.stringify(a);
        }
      };
    }
    this.keyString = keyString;
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
  setMutable,
  Set_exports
};
//# sourceMappingURL=chunk-RLUHJQDR.js.map