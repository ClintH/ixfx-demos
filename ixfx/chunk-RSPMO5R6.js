import {
  __export,
  __privateAdd,
  __privateGet
} from "./chunk-H4X2M26K.js";

// src/Events.ts
var Events_exports = {};
__export(Events_exports, {
  SimpleEventEmitter: () => SimpleEventEmitter
});

// src/collections/SimpleMapArray.ts
var _map;
var SimpleMapArrayMutableImpl = class {
  constructor() {
    /* eslint-disable-next-line functional/prefer-readonly-type */
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
  /**
   * Fire event
   * @private
   * @param type Type of event 
   * @param args Arguments for event
   * @returns
   */
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
  /**
   * Adds event listener
   *
   * @template K
   * @param {K} type
   * @param {Listener<Events>} listener
   * @memberof SimpleEventEmitter
   */
  addEventListener(type, listener) {
    __privateGet(this, _listeners).add(type, listener);
  }
  /**
   * Remove event listener
   *
   * @param {Listener<Events>} listener
   * @memberof SimpleEventEmitter
   */
  removeEventListener(type, listener) {
    __privateGet(this, _listeners).delete(type, listener);
  }
  /**
   * Clear all event listeners
   * @private
   * @memberof SimpleEventEmitter
   */
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
//# sourceMappingURL=chunk-RSPMO5R6.js.map