import {
  TrackedValueMap,
  TrackerBase
} from "./chunk-UZPYPFQS.js";
import {
  Empty2 as Empty,
  Placeholder,
  Vector_exports,
  angleRadian,
  distance,
  joinPointsToLines,
  length,
  relation,
  subtract
} from "./chunk-MVQCQHQL.js";
import {
  toStringDefault
} from "./chunk-6UZ3OSJO.js";

// src/trackers/ObjectTracker.ts
var ObjectTracker = class extends TrackerBase {
  constructor(opts = {}) {
    super(opts);
    this.values = [];
  }
  onTrimmed() {
  }
  /**
   * Reduces size of value store to `limit`. 
   * Returns number of remaining items
   * @param limit
   */
  trimStore(limit) {
    if (limit >= this.values.length) return this.values.length;
    this.values = this.values.slice(-limit);
    return this.values.length;
  }
  /**
   * Allows sub-classes to be notified when a reset happens
   * @ignore
   */
  onReset() {
    this.values = [];
  }
  /**
   * Tracks a value
   * @ignore
   */
  filterData(p) {
    const ts = p.map(
      (v) => `at` in v ? v : {
        ...v,
        at: Date.now()
      }
    );
    const last = ts.at(-1);
    if (this.storeIntermediate) this.values.push(...ts);
    else switch (this.values.length) {
      case 0: {
        this.values.push(last);
        break;
      }
      case 1: {
        this.values.push(last);
        break;
      }
      case 2: {
        this.values[1] = last;
        break;
      }
    }
    return ts;
  }
  /**
   * Last seen value. If no values have been added, it will return the initial value
   */
  get last() {
    if (this.values.length === 1) return this.values[0];
    return this.values.at(-1);
  }
  /**
   * Returns the initial value
   */
  get initial() {
    return this.values.at(0);
  }
  /**
   * Returns number of recorded values (includes the initial value in the count)
   */
  get size() {
    return this.values.length;
  }
  /**
   * Returns the elapsed time, in milliseconds since the initial value
   */
  get elapsed() {
    return Date.now() - this.values[0].at;
  }
};

// src/trackers/PointTracker.ts
var PointTracker = class extends ObjectTracker {
  constructor(opts = {}) {
    super(opts);
  }
  onTrimmed() {
    this.initialRelation = void 0;
  }
  /**
   * Returns the last x coord
   */
  get x() {
    return this.last.x;
  }
  /**
   * Returns the last y coord
   */
  get y() {
    return this.last.y;
  }
  /**
   * @ignore
   */
  onReset() {
    super.onReset();
    this.lastResult = void 0;
    this.initialRelation = void 0;
  }
  seenEvent(p) {
    if (`getCoalescedEvents` in p) {
      const events = p.getCoalescedEvents();
      const asPoints = events.map((event) => ({ x: event.clientX, y: event.clientY }));
      return this.seen(...asPoints);
    } else {
      return this.seen({ x: p.clientX, y: p.clientY });
    }
  }
  /**
   * Tracks a point, returning data on its relation to the
   * initial point and the last received point.
   * 
   * Use {@link seenEvent} to track a raw `PointerEvent`.
   * 
   * @param _p Point
   */
  computeResults(_p) {
    const currentLast = this.last;
    const previousLast = this.values.at(-2);
    if (this.initialRelation === void 0 && this.initial) {
      this.initialRelation = relation(this.initial);
    } else if (this.initialRelation === void 0) {
      throw new Error(`Bug: No initialRelation, and this.inital is undefined?`);
    }
    const lastRelation = previousLast === void 0 ? relation(currentLast) : relation(previousLast);
    const initialRel = this.initialRelation(currentLast);
    const speed = previousLast === void 0 ? 0 : length(previousLast, currentLast) / (currentLast.at - previousLast.at);
    const lastRel = {
      ...lastRelation(currentLast),
      speed
    };
    const r = {
      fromInitial: initialRel,
      fromLast: lastRel,
      values: [...this.values]
    };
    this.lastResult = r;
    return r;
  }
  /**
   * Returns a polyline representation of stored points.
   * Returns an empty array if points were not saved, or there's only one.
   */
  get line() {
    if (this.values.length === 1) return [];
    return joinPointsToLines(...this.values);
  }
  /**
   * Returns a vector of the initial/last points of the tracker.
   * Returns as a polar coordinate
   */
  get vectorPolar() {
    return Vector_exports.fromLinePolar(this.lineStartEnd);
  }
  /**
   * Returns a vector of the initial/last points of the tracker.
   * Returns as a Cartesian coordinate
   */
  get vectorCartesian() {
    return Vector_exports.fromLineCartesian(this.lineStartEnd);
  }
  /**
   * Returns a line from initial point to last point.
   *
   * If there are less than two points, Lines.Empty is returned
   */
  get lineStartEnd() {
    const initial = this.initial;
    if (this.values.length < 2 || !initial) return Empty;
    return {
      a: initial,
      b: this.last
    };
  }
  /**
   * Returns distance from latest point to initial point.
   * If there are less than two points, zero is returned.
   *
   * This is the direct distance from initial to last,
   * not the accumulated length.
   * @returns Distance
   */
  distanceFromStart() {
    const initial = this.initial;
    return this.values.length >= 2 && initial !== void 0 ? distance(initial, this.last) : 0;
  }
  /**
   * Difference between last point and the initial point, calculated
   * as a simple subtraction of x & y.
   *
   * `Points.Placeholder` is returned if there's only one point so far.
   */
  difference() {
    const initial = this.initial;
    return this.values.length >= 2 && initial !== void 0 ? subtract(this.last, initial) : Placeholder;
  }
  /**
   * Returns angle (in radians) from latest point to the initial point
   * If there are less than two points, undefined is return.
   * @returns Angle in radians
   */
  angleFromStart() {
    const initial = this.initial;
    if (initial !== void 0 && this.values.length > 2) {
      return angleRadian(initial, this.last);
    }
  }
  /**
   * Returns the total length of accumulated points.
   * Returns 0 if points were not saved, or there's only one
   */
  get length() {
    if (this.values.length === 1) return 0;
    const l = this.line;
    return length(l);
  }
};
var TrackedPointMap = class extends TrackedValueMap {
  constructor(opts = {}) {
    super((key, start) => {
      if (start === void 0) throw new Error(`Requires start point`);
      const p = new PointTracker({
        ...opts,
        id: key
      });
      p.seen(start);
      return p;
    });
  }
  /**
   * Track a PointerEvent
   * @param event
   */
  seenEvent(event) {
    if (`getCoalescedEvents` in event) {
      const events = event.getCoalescedEvents();
      const seens = events.map((subEvent) => super.seen(subEvent.pointerId.toString(), subEvent));
      return Promise.all(seens);
    } else {
      return Promise.all([super.seen(event.pointerId.toString(), event)]);
    }
  }
};
var points = (options = {}) => new TrackedPointMap(options);
var point = (opts = {}) => new PointTracker(opts);

// src/trackers/TrackUnique.ts
var unique = (toString = toStringDefault) => {
  const set = /* @__PURE__ */ new Set();
  return (value) => {
    if (value === null) throw new TypeError(`Param 'value' cannot be null`);
    if (value === void 0) throw new TypeError(`Param 'value' cannot be undefined`);
    const asString = typeof value === `string` ? value : toString(value);
    if (set.has(asString)) return false;
    set.add(asString);
    return true;
  };
};
var uniqueInstances = () => {
  const set = /* @__PURE__ */ new Set();
  return (value) => {
    if (value === null) throw new TypeError(`Param 'value' cannot be null`);
    if (value === void 0) throw new TypeError(`Param 'value' cannot be undefined`);
    if (set.has(value)) return false;
    set.add(value);
    return true;
  };
};

export {
  ObjectTracker,
  PointTracker,
  TrackedPointMap,
  points,
  point,
  unique,
  uniqueInstances
};
//# sourceMappingURL=chunk-VG4MJOMS.js.map