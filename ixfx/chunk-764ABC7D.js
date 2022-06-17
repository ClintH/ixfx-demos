import {
  __export,
  __privateAdd,
  __privateGet
} from "./chunk-6SYKIMQH.js";

// src/Events.ts
var Events_exports = {};
__export(Events_exports, {
  SimpleEventEmitter: () => SimpleEventEmitter
});

// src/collections/SimpleMapArray.ts
var _map;
var SimpleMapArrayMutableImpl = class {
  constructor() {
    __privateAdd(this, _map, /* @__PURE__ */ new Map());
  }
  add(key, ...values) {
    const existing = __privateGet(this, _map).get(key);
    if (existing === void 0) {
      __privateGet(this, _map).set(key, values);
    } else {
      __privateGet(this, _map).set(key, [...existing, ...values]);
    }
  }
  keys() {
    return __privateGet(this, _map).keys();
  }
  debugString() {
    let r = ``;
    const keys = Array.from(__privateGet(this, _map).keys());
    keys.every((k) => {
      const v = __privateGet(this, _map).get(k);
      if (v === void 0)
        return;
      r += k + ` (${v.length}) = ${JSON.stringify(v)}\r
`;
    });
    return r;
  }
  get(key) {
    return __privateGet(this, _map).get(key);
  }
  delete(key, v) {
    const existing = __privateGet(this, _map).get(key);
    if (existing === void 0)
      return false;
    const without = existing.filter((i) => i !== v);
    __privateGet(this, _map).set(key, without);
    return without.length < existing.length;
  }
  clear() {
    __privateGet(this, _map).clear();
  }
};
_map = new WeakMap();
var simpleMapArrayMutable = () => new SimpleMapArrayMutableImpl();

// src/Events.ts
var _listeners;
var SimpleEventEmitter = class {
  constructor() {
    __privateAdd(this, _listeners, simpleMapArrayMutable());
  }
  fireEvent(type, args) {
    const listeners = __privateGet(this, _listeners).get(type);
    if (listeners === void 0)
      return;
    listeners.forEach((l) => {
      try {
        l(args, this);
      } catch (err) {
        console.debug(`Event listener error: `, err);
      }
    });
  }
  addEventListener(type, listener) {
    __privateGet(this, _listeners).add(type, listener);
  }
  removeEventListener(type, listener) {
    __privateGet(this, _listeners).delete(type, listener);
  }
  clearEventListeners() {
    __privateGet(this, _listeners).clear();
  }
};
_listeners = new WeakMap();

export {
  simpleMapArrayMutable,
  SimpleEventEmitter,
  Events_exports
};
//# sourceMappingURL=chunk-764ABC7D.js.map