var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};

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
  *entries() {
    for (const key of __privateGet(this, _map).keys()) {
      for (const value of __privateGet(this, _map).get(key)) {
        yield [key, value];
      }
    }
  }
  *keys() {
    yield* __privateGet(this, _map).keys();
  }
  *values() {
    for (const entries of __privateGet(this, _map)) {
      yield* entries[1];
    }
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
  *get(key) {
    const m = __privateGet(this, _map).get(key);
    if (!m)
      return;
    yield* m.values();
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
    for (const l of listeners) {
      try {
        l(args, this);
      } catch (err) {
        console.debug(`Event listener error: `, err);
      }
    }
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
  __commonJS,
  __export,
  __toESM,
  __decorateClass,
  __publicField,
  __privateGet,
  __privateAdd,
  __privateSet,
  __privateWrapper,
  __privateMethod,
  simpleMapArrayMutable,
  SimpleEventEmitter,
  Events_exports
};
//# sourceMappingURL=chunk-S6CC37P2.js.map