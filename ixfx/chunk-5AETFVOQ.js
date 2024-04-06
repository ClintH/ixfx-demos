import {
  defaultKeyer,
  intervalToMs,
  isEqualDefault
} from "./chunk-ESXWQDUL.js";
import {
  __export
} from "./chunk-Q2EHUQVZ.js";

// src/Events.ts
var Events_exports = {};
__export(Events_exports, {
  SimpleEventEmitter: () => SimpleEventEmitter,
  eventRace: () => eventRace
});

// src/collections/map/MapMultiFns.ts
var firstEntryByIterableValue = (map, value, isEqual = isEqualDefault) => {
  for (const e of map.entries()) {
    const val = e[1];
    for (const subValue of val) {
      if (isEqual(subValue, value))
        return e;
    }
  }
};

// src/collections/map/MapOfSimpleBase.ts
var MapOfSimpleBase = class {
  map;
  groupBy;
  valueEq;
  /**
   * Constructor
   * @param groupBy Creates keys for values when using `addValue`. By default uses JSON.stringify
   * @param valueEq Compare values. By default uses JS logic for equality
   */
  constructor(groupBy = defaultKeyer, valueEq = isEqualDefault, initial = []) {
    this.groupBy = groupBy;
    this.valueEq = valueEq;
    this.map = new Map(initial);
  }
  /**
   * Iterate over all entries
   */
  *entriesFlat() {
    for (const key of this.map.keys()) {
      for (const value of this.map.get(key)) {
        yield [key, value];
      }
    }
  }
  *entries() {
    for (const [k, v] of this.map.entries()) {
      yield [k, [...v]];
    }
  }
  firstKeyByValue(value, eq = isEqualDefault) {
    const entry = firstEntryByIterableValue(this, value, eq);
    if (entry)
      return entry[0];
  }
  /**
   * Get all values under `key`
   * @param key
   * @returns
   */
  *get(key) {
    const m = this.map.get(key);
    if (!m)
      return;
    yield* m.values();
  }
  /**
   * Iterate over all keys
   */
  *keys() {
    yield* this.map.keys();
  }
  /**
   * Iterate over all values (regardless of key)
   */
  *valuesFlat() {
    for (const entries of this.map) {
      yield* entries[1];
    }
  }
  /**
   * Iterate over keys and length of values stored under keys
   */
  *keysAndCounts() {
    for (const entries of this.map) {
      yield [entries[0], entries[1].length];
    }
  }
  /**
   * Returns _true_ if `key` exists
   * @param key
   * @returns
   */
  //eslint-disable-next-line functional/prefer-tacit
  has(key) {
    return this.map.has(key);
  }
  /**
   * Returns _true_ if `value` exists under `key`.
   * @param key Key
   * @param value Value to seek under `key`
   * @returns _True_ if `value` exists under `key`.
   */
  hasKeyValue(key, value) {
    const values = this.map.get(key);
    if (!values)
      return false;
    for (const v of values) {
      if (this.valueEq(v, value))
        return true;
    }
    return false;
  }
  /**
   * Debug dump of contents
   * @returns
   */
  debugString() {
    let r = ``;
    const keys = [...this.map.keys()];
    keys.every((k) => {
      const v = this.map.get(k);
      if (v === void 0)
        return;
      r += k + ` (${v.length}) = ${JSON.stringify(v)}\r
`;
    });
    return r;
  }
  /**
   * _True_ if empty
   */
  get isEmpty() {
    return this.map.size === 0;
  }
  /**
   * Return number of values stored under `key`.
   * Returns 0 if `key` is not found.
   * @param key
   * @returns
   */
  count(key) {
    const values = this.map.get(key);
    if (!values)
      return 0;
    return values.length;
  }
  get lengthKeys() {
    return this.map.size;
  }
};

// src/collections/map/MapOfSimpleMutable.ts
var MapOfSimpleMutable = class extends MapOfSimpleBase {
  addKeyedValues(key, ...values) {
    const existing = this.map.get(key);
    if (existing === void 0) {
      this.map.set(key, values);
    } else {
      this.map.set(key, [...existing, ...values]);
    }
  }
  /**
   * Adds a value, automatically extracting a key via the
   * `groupBy` function assigned in the constructor options.
   * @param values Adds several values
   */
  addValue(...values) {
    for (const v of values) {
      const key = this.groupBy(v);
      this.addKeyedValues(key, v);
    }
  }
  /**
   * Delete `value` under a particular `key`
   * @param key
   * @param value
   * @returns _True_ if `value` was found under `key`
   */
  deleteKeyValue(key, value) {
    const existing = this.map.get(key);
    if (existing === void 0)
      return false;
    const without = existing.filter((existingValue) => !this.valueEq(existingValue, value));
    this.map.set(key, without);
    return without.length < existing.length;
  }
  /**
   * Deletes `value` regardless of key.
   *
   * Uses the constructor-defined equality function.
   * @param value Value to delete
   * @returns
   */
  deleteByValue(value) {
    let del = false;
    const entries = [...this.map.entries()];
    for (const keyEntries of entries) {
      for (const values of keyEntries[1]) {
        if (this.valueEq(values, value)) {
          del = true;
          this.deleteKeyValue(keyEntries[0], value);
        }
      }
    }
    return del;
  }
  /**
   * Deletes all values under `key`,
   * @param key
   * @returns _True_ if `key` was found and values stored
   */
  delete(key) {
    const values = this.map.get(key);
    if (!values)
      return false;
    if (values.length === 0)
      return false;
    this.map.delete(key);
    return true;
  }
  /**
   * Clear contents
   */
  clear() {
    this.map.clear();
  }
};
var ofSimpleMutable = (groupBy = defaultKeyer, valueEq = isEqualDefault) => new MapOfSimpleMutable(groupBy, valueEq);

// src/Events.ts
var eventRace = (target, eventNames, opts = {}) => {
  const intervalMs = intervalToMs(opts.timeout, 60 * 1e3);
  const signal = opts.signal;
  let triggered = false;
  let disposed = false;
  let timeout;
  const promise = new Promise((resolve, reject) => {
    const onEvent = (event) => {
      if (`type` in event) {
        if (eventNames.includes(event.type)) {
          triggered = true;
          resolve(event);
          dispose();
        } else {
          console.warn(`eventRace: Got event '${event.type}' that is not in race list`);
        }
      } else {
        console.warn(`eventRace: Event data does not have expected 'type' field`);
        console.log(event);
      }
    };
    for (const name of eventNames) {
      target.addEventListener(name, onEvent);
    }
    const dispose = () => {
      if (disposed)
        return;
      if (timeout !== void 0)
        clearTimeout(timeout);
      timeout = void 0;
      disposed = true;
      for (const name of eventNames) {
        target.removeEventListener(name, onEvent);
      }
    };
    timeout = setTimeout(() => {
      if (triggered || disposed)
        return;
      dispose();
      reject(new Error(`Events not fired within interval. Events: ${JSON.stringify(eventNames)}`));
    }, intervalMs);
    signal?.addEventListener(`abort`, () => {
      if (triggered || disposed)
        return;
      dispose();
      reject(new Error(`Abort signal received ${signal.reason}`));
    });
  });
  return promise;
};
var SimpleEventEmitter = class {
  #listeners = ofSimpleMutable();
  /**
   * Fire event
   * @private
   * @param type Type of event
   * @param args Arguments for event
   * @returns
   */
  fireEvent(type, args) {
    const listeners = this.#listeners.get(type);
    for (const l of listeners) {
      l(args, this);
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
    this.#listeners.addKeyedValues(
      type,
      listener
    );
  }
  /**
   * Remove event listener
   *
   * @param {Listener<Events>} listener
   * @memberof SimpleEventEmitter
   */
  removeEventListener(type, listener) {
    this.#listeners.deleteKeyValue(
      type,
      listener
    );
  }
  /**
   * Clear all event listeners
   * @private
   * @memberof SimpleEventEmitter
   */
  clearEventListeners() {
    this.#listeners.clear();
  }
};

export {
  MapOfSimpleMutable,
  ofSimpleMutable,
  eventRace,
  SimpleEventEmitter,
  Events_exports
};
//# sourceMappingURL=chunk-5AETFVOQ.js.map