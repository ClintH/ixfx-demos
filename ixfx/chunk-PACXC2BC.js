import {
  TrackerBase
} from "./chunk-UZPYPFQS.js";
import {
  maxFast,
  minFast,
  totalFast
} from "./chunk-NGZXMICH.js";

// src/trackers/PrimitiveTracker.ts
var PrimitiveTracker = class extends TrackerBase {
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
    if (limit >= this.values.length) return this.values.length;
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
    if (this.values.length < 0) throw new Error(`No values seen yet`);
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
    } else switch (this.values.length) {
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

// src/trackers/NumberTracker.ts
var NumberTracker = class extends PrimitiveTracker {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(opts) {
    super(opts);
    this.total = 0;
    this.min = Number.MAX_SAFE_INTEGER;
    this.max = Number.MIN_SAFE_INTEGER;
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
    if (this.last === void 0) return;
    if (this.initial === void 0) return;
    return this.last - this.initial;
  }
  /**
   * Relative difference between last value and initial.
   * Eg if last value was 10 and initial value was 5, 2 is returned (200%)
   */
  relativeDifference() {
    if (this.last === void 0) return;
    if (this.initial === void 0) return;
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
    if (values.some((v) => Number.isNaN(v))) throw new Error(`Cannot add NaN`);
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
var number = (opts = {}) => new NumberTracker(opts);

export {
  PrimitiveTracker,
  NumberTracker,
  number
};
//# sourceMappingURL=chunk-PACXC2BC.js.map