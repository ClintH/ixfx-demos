import {
  NumberTracker,
  PrimitiveTracker,
  number
} from "./chunk-PACXC2BC.js";
import {
  ObjectTracker,
  PointTracker,
  TrackedPointMap,
  point,
  points,
  unique,
  uniqueInstances
} from "./chunk-VG4MJOMS.js";
import {
  TrackedValueMap,
  TrackerBase
} from "./chunk-UZPYPFQS.js";
import {
  SimpleEventEmitter
} from "./chunk-YSD5376E.js";
import {
  getSorter,
  minMaxAvg
} from "./chunk-JEKP7EQY.js";
import {
  __export
} from "./chunk-L5EJU35C.js";

// src/trackers/index.ts
var trackers_exports = {};
__export(trackers_exports, {
  FrequencyTracker: () => FrequencyTracker,
  IntervalTracker: () => IntervalTracker,
  NumberTracker: () => NumberTracker,
  ObjectTracker: () => ObjectTracker,
  PointTracker: () => PointTracker,
  PrimitiveTracker: () => PrimitiveTracker,
  TrackedPointMap: () => TrackedPointMap,
  TrackedValueMap: () => TrackedValueMap,
  TrackerBase: () => TrackerBase,
  frequency: () => frequency,
  interval: () => interval,
  number: () => number,
  point: () => point,
  points: () => points,
  unique: () => unique,
  uniqueInstances: () => uniqueInstances
});

// src/trackers/FrequencyMutable.ts
var FrequencyTracker = class extends SimpleEventEmitter {
  #store;
  #keyString;
  /**
   * Constructor
   * @param keyString Function to key items. Uses JSON.stringify by default
   */
  constructor(keyString) {
    super();
    this.#store = /* @__PURE__ */ new Map();
    if (keyString === void 0) {
      keyString = (a) => {
        if (a === void 0) throw new Error(`Cannot create key for undefined`);
        return typeof a === `string` ? a : JSON.stringify(a);
      };
    }
    this.#keyString = keyString;
  }
  /**
   * Clear data. Fires `change` event
   */
  clear() {
    this.#store.clear();
    this.fireEvent(`change`, { context: this });
  }
  /**
   * @returns Iterator over keys (ie. groups)
   */
  keys() {
    return this.#store.keys();
  }
  /**
   * @returns Iterator over frequency counts
   */
  values() {
    return this.#store.values();
  }
  /**
   * @returns Copy of entries as an array of `[key, count]`
   */
  toArray() {
    return [...this.#store.entries()];
  }
  /**
   * Returns a string with keys and counts, useful for debugging.
   * @returns
   */
  debugString() {
    let t = ``;
    for (const [key, count] of this.#store.entries()) {
      t += `${key}: ${count}, `;
    }
    if (t.endsWith(`, `)) return t.slice(0, Math.max(0, t.length - 2));
    return t;
  }
  /**
   *
   * @param value Value to count
   * @returns Frequency of value, or _undefined_ if it does not exist
   */
  frequencyOf(value) {
    if (typeof value === `string`) return this.#store.get(value);
    const key = this.#keyString(value);
    return this.#store.get(key);
  }
  /**
   *
   * @param value Value to count
   * @returns Relative frequency of `value`, or _undefined_ if it does not exist
   */
  relativeFrequencyOf(value) {
    let freq;
    if (typeof value === `string`) freq = this.#store.get(value);
    else {
      const key = this.#keyString(value);
      freq = this.#store.get(key);
    }
    if (freq === void 0) return;
    const mma = this.minMaxAvg();
    return freq / mma.total;
  }
  /**
   * @returns Copy of entries as an array
   */
  entries() {
    return [...this.#store.entries()];
  }
  /**
   *
   * @returns Returns `{min,max,avg,total}`
   */
  minMaxAvg() {
    return minMaxAvg(this.entries());
  }
  /**
   *
   * @param sortStyle Sorting style (default: _value_, ie. count)
   * @returns Sorted array of [key,frequency]
   */
  entriesSorted(sortStyle = `value`) {
    const s = getSorter(sortStyle);
    return s(this.entries());
  }
  /**
   *
   * @param values Values to add. Fires _change_ event after adding item(s)
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  add(...values) {
    if (values === void 0) throw new Error(`value parameter is undefined`);
    const keys = values.map((v) => this.#keyString(v));
    for (const key of keys) {
      const score = this.#store.get(key) ?? 0;
      this.#store.set(key, score + 1);
    }
    this.fireEvent(`change`, { context: this });
  }
};
var frequency = (keyString) => new FrequencyTracker(keyString);

// src/trackers/IntervalTracker.ts
var IntervalTracker = class extends NumberTracker {
  constructor() {
    super(...arguments);
    this.lastMark = 0;
  }
  mark() {
    if (this.lastMark > 0) {
      this.seen(performance.now() - this.lastMark);
    }
    this.lastMark = performance.now();
  }
};
var interval = (options) => new IntervalTracker(options);

export {
  FrequencyTracker,
  frequency,
  IntervalTracker,
  interval,
  trackers_exports
};
//# sourceMappingURL=chunk-G5YQ7NOB.js.map