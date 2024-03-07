import {
  maxFast,
  minFast,
  totalFast
} from "./chunk-46GN7MZ3.js";
import {
  getOrGenerate
} from "./chunk-EG2IYMCR.js";

// src/data/TrackerBase.ts
var TrackerBase = class {
  /**
   * @ignore
   */
  seenCount;
  /**
   * @ignore
   */
  storeIntermediate;
  /**
   * @ignore
   */
  resetAfterSamples;
  /**
   * @ignore
   */
  sampleLimit;
  id;
  debug;
  constructor(opts = {}) {
    this.id = opts.id ?? `tracker`;
    this.debug = opts.debug ?? false;
    this.sampleLimit = opts.sampleLimit ?? -1;
    this.resetAfterSamples = opts.resetAfterSamples ?? -1;
    this.storeIntermediate = opts.storeIntermediate ?? (this.sampleLimit > -1 || this.resetAfterSamples > -1);
    this.seenCount = 0;
    if (this.debug) {
      console.log(`TrackerBase: sampleLimit: ${this.sampleLimit} resetAfter: ${this.resetAfterSamples} store: ${this.storeIntermediate}`);
    }
  }
  /**
   * Reset tracker
   */
  reset() {
    this.seenCount = 0;
    this.onReset();
  }
  /**
   * Calculate results
   *  
   * @param p 
   * @returns 
   */
  seen(...p) {
    if (this.resetAfterSamples > 0 && this.seenCount > this.resetAfterSamples) {
      this.reset();
    } else if (this.sampleLimit > 0 && this.seenCount > this.sampleLimit * 2) {
      this.seenCount = this.trimStore(this.sampleLimit);
      this.onTrimmed();
    }
    this.seenCount += p.length;
    const t = this.filterData(p);
    return this.computeResults(t);
  }
};

// src/data/TrackedValue.ts
var TrackedValueMap = class {
  store;
  gog;
  constructor(creator) {
    this.store = /* @__PURE__ */ new Map();
    this.gog = getOrGenerate(this.store, creator);
  }
  /**
   * Number of named values being tracked
   */
  get size() {
    return this.store.size;
  }
  /**
   * Returns _true_ if `id` is stored
   * @param id
   * @returns
   */
  has(id) {
    return this.store.has(id);
  }
  /**
   * For a given id, note that we have seen one or more values.
   * @param id Id
   * @param values Values(s)
   * @returns Information about start to last value
   */
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  //eslint-disable-next-line functional/prefer-immutable-types
  async seen(id, ...values) {
    const trackedValue = await this.getTrackedValue(id, ...values);
    const result = trackedValue.seen(...values);
    return result;
  }
  /**
   * Creates or returns a TrackedValue instance for `id`.
   * @param id
   * @param values
   * @returns
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  async getTrackedValue(id, ...values) {
    if (id === null)
      throw new Error(`id parameter cannot be null`);
    if (id === void 0)
      throw new Error(`id parameter cannot be undefined`);
    const trackedValue = await this.gog(id, values[0]);
    return trackedValue;
  }
  /**
   * Remove a tracked value by id.
   * Use {@link reset} to clear them all.
   * @param id
   */
  delete(id) {
    this.store.delete(id);
  }
  /**
   * Remove all tracked values.
   * Use {@link delete} to remove a single value by id.
   */
  reset() {
    this.store = /* @__PURE__ */ new Map();
  }
  /**
   * Enumerate ids
   */
  *ids() {
    yield* this.store.keys();
  }
  /**
   * Enumerate tracked values
   */
  *tracked() {
    yield* this.store.values();
  }
  /**
   * Iterates TrackedValues ordered with oldest first
   * @returns
   */
  *trackedByAge() {
    const tp = [...this.store.values()];
    tp.sort((a, b) => {
      const aa = a.elapsed;
      const bb = b.elapsed;
      if (aa === bb)
        return 0;
      if (aa > bb)
        return -1;
      return 1;
    });
    for (const t of tp) {
      yield t;
    }
  }
  /**
   * Iterates underlying values, ordered by age (oldest first)
   * First the named values are sorted by their `elapsed` value, and then
   * we return the last value for that group.
   */
  *valuesByAge() {
    for (const tb of this.trackedByAge()) {
      yield tb.last;
    }
  }
  /**
   * Enumerate last received values
   *
   * @example Calculate centroid of latest-received values
   * ```js
   * const pointers = pointTracker();
   * const c = Points.centroid(...Array.from(pointers.lastPoints()));
   * ```
   */
  *last() {
    for (const p of this.store.values()) {
      yield p.last;
    }
  }
  /**
   * Enumerate starting values
   */
  *initialValues() {
    for (const p of this.store.values()) {
      yield p.initial;
    }
  }
  /**
   * Returns a tracked value by id, or undefined if not found
   * @param id
   * @returns
   */
  get(id) {
    return this.store.get(id);
  }
};

// src/data/PrimitiveTracker.ts
var PrimitiveTracker = class extends TrackerBase {
  //computeResults(_p: Timestamped[]): TResult;
  values;
  timestamps;
  //data: Array<TimestampedPrimitive<V>>;
  constructor(opts) {
    super(opts);
    this.values = [];
    this.timestamps = [];
  }
  /**
   * Reduces size of value store to `limit`. Returns
   * number of remaining items
   * @param limit
   */
  trimStore(limit) {
    if (limit >= this.values.length)
      return this.values.length;
    this.values = this.values.slice(-limit);
    this.timestamps = this.timestamps.slice(-limit);
    return this.values.length;
  }
  onTrimmed() {
  }
  get last() {
    return this.values.at(-1);
  }
  get initial() {
    return this.values.at(0);
  }
  /**
   * Returns number of recorded values (this can include the initial value)
   */
  get size() {
    return this.values.length;
  }
  /**
   * Returns the elapsed time, in milliseconds since the instance was created
   */
  get elapsed() {
    if (this.values.length < 0)
      throw new Error(`No values seen yet`);
    return Date.now() - this.timestamps[0];
  }
  onReset() {
    this.values = [];
    this.timestamps = [];
  }
  /**
   * Tracks a value
   */
  filterData(rawValues) {
    const lastValue = rawValues.at(-1);
    const last = { value: lastValue, at: performance.now() };
    const values = rawValues.map((value) => ({
      at: performance.now(),
      value
    }));
    if (this.storeIntermediate) {
      this.values.push(...rawValues);
      this.timestamps.push(...values.map((v) => v.at));
    } else
      switch (this.values.length) {
        case 0: {
          this.values.push(last.value);
          this.timestamps.push(last.at);
          break;
        }
        case 2: {
          this.values[1] = last.value;
          this.timestamps[1] = last.at;
          break;
        }
        case 1: {
          this.values.push(last.value);
          this.timestamps.push(last.at);
          break;
        }
      }
    return values;
  }
};

// src/data/NumberTracker.ts
var NumberTracker = class extends PrimitiveTracker {
  total = 0;
  min = Number.MAX_SAFE_INTEGER;
  max = Number.MIN_SAFE_INTEGER;
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(opts) {
    super(opts);
  }
  get avg() {
    return this.total / this.seenCount;
  }
  /**
   * Difference between last value and initial.
   * Eg. if last value was 10 and initial value was 5, 5 is returned (10 - 5)
   * If either of those is missing, undefined is returned
   */
  difference() {
    if (this.last === void 0)
      return;
    if (this.initial === void 0)
      return;
    return this.last - this.initial;
  }
  /**
   * Relative difference between last value and initial.
   * Eg if last value was 10 and initial value was 5, 2 is returned (200%)
   */
  relativeDifference() {
    if (this.last === void 0)
      return;
    if (this.initial === void 0)
      return;
    return this.last / this.initial;
  }
  onReset() {
    this.min = Number.MAX_SAFE_INTEGER;
    this.max = Number.MIN_SAFE_INTEGER;
    this.total = 0;
    super.onReset();
  }
  onTrimmed() {
    this.min = minFast(this.values);
    this.max = maxFast(this.values);
    this.total = totalFast(this.values);
  }
  computeResults(values) {
    if (values.some((v) => Number.isNaN(v)))
      throw new Error(`Cannot add NaN`);
    const numbers = values.map((value) => value.value);
    this.total = numbers.reduce((accumulator, v) => accumulator + v, this.total);
    this.min = Math.min(...numbers, this.min);
    this.max = Math.max(...numbers, this.max);
    const r = {
      max: this.max,
      min: this.min,
      total: this.total,
      avg: this.avg
    };
    return r;
  }
  getMinMaxAvg() {
    return {
      min: this.min,
      max: this.max,
      avg: this.avg
    };
  }
};
var numberTracker = (opts = {}) => new NumberTracker(opts);

export {
  TrackedValueMap,
  TrackerBase,
  PrimitiveTracker,
  NumberTracker,
  numberTracker
};
//# sourceMappingURL=chunk-UD5UG5VS.js.map