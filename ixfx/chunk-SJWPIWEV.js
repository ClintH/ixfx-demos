import {
  intervalTracker,
  tracker
} from "./chunk-K6YEOA6B.js";
import {
  joinPointsToLines,
  length,
  relation
} from "./chunk-XG4JXAZ2.js";
import {
  queueMutable
} from "./chunk-2Q3G2A6K.js";
import {
  getOrGenerate
} from "./chunk-LTK4DV2D.js";
import {
  KeyValue_exports,
  getSorter
} from "./chunk-EJENDR66.js";
import {
  Arrays_exports,
  minMaxAvg
} from "./chunk-5JS26KLN.js";
import {
  clamp,
  scale
} from "./chunk-CJEVR63F.js";
import {
  integer
} from "./chunk-U4IZE4J2.js";
import {
  SimpleEventEmitter
} from "./chunk-764ABC7D.js";
import {
  __export,
  __privateAdd,
  __privateGet,
  __privateSet,
  __publicField
} from "./chunk-6SYKIMQH.js";

// src/temporal/index.ts
var temporal_exports = {};
__export(temporal_exports, {
  FrequencyMutable: () => FrequencyMutable,
  Normalise: () => Normalise_exports,
  frequencyMutable: () => frequencyMutable,
  intervalTracker: () => intervalTracker,
  movingAverage: () => movingAverage,
  movingAverageLight: () => movingAverageLight,
  pointTracker: () => pointTracker,
  tracker: () => tracker
});

// src/temporal/Normalise.ts
var Normalise_exports = {};
__export(Normalise_exports, {
  array: () => array,
  stream: () => stream
});
var stream = (minDefault, maxDefault) => {
  let min = minDefault ?? Number.MAX_SAFE_INTEGER;
  let max = maxDefault ?? Number.MIN_SAFE_INTEGER;
  return (v) => {
    min = Math.min(min, v);
    max = Math.max(max, v);
    return scale(v, min, max);
  };
};
var array = (values, minForced, maxForced) => {
  if (!Array.isArray(values))
    throw new Error(`values param should be an array`);
  const mma = minMaxAvg(values);
  const min = minForced ?? mma.min;
  const max = maxForced ?? mma.max;
  return values.map((v) => clamp(scale(v, min, max)));
};

// src/temporal/FrequencyMutable.ts
var _store, _keyString;
var FrequencyMutable = class extends SimpleEventEmitter {
  constructor(keyString = void 0) {
    super();
    __privateAdd(this, _store, void 0);
    __privateAdd(this, _keyString, void 0);
    __privateSet(this, _store, /* @__PURE__ */ new Map());
    if (keyString === void 0) {
      keyString = (a) => {
        if (a === void 0)
          throw new Error(`Cannot create key for undefined`);
        if (typeof a === `string`) {
          return a;
        } else {
          return JSON.stringify(a);
        }
      };
    }
    __privateSet(this, _keyString, keyString);
  }
  clear() {
    __privateGet(this, _store).clear();
    this.fireEvent(`change`, void 0);
  }
  keys() {
    return __privateGet(this, _store).keys();
  }
  values() {
    return __privateGet(this, _store).values();
  }
  toArray() {
    return Array.from(__privateGet(this, _store).entries());
  }
  debugString() {
    let t = ``;
    for (const [key, count] of __privateGet(this, _store).entries()) {
      t += `${key}: ${count}, `;
    }
    if (t.endsWith(`, `))
      return t.substring(0, t.length - 2);
    return t;
  }
  frequencyOf(value) {
    if (typeof value === `string`)
      return __privateGet(this, _store).get(value);
    const key = __privateGet(this, _keyString).call(this, value);
    return __privateGet(this, _store).get(key);
  }
  relativeFrequencyOf(value) {
    let freq;
    if (typeof value === `string`)
      freq = __privateGet(this, _store).get(value);
    else {
      const key = __privateGet(this, _keyString).call(this, value);
      freq = __privateGet(this, _store).get(key);
    }
    if (freq === void 0)
      return;
    const mma = this.minMaxAvg();
    return freq / mma.total;
  }
  entries() {
    return Array.from(__privateGet(this, _store).entries());
  }
  minMaxAvg() {
    return KeyValue_exports.minMaxAvg(this.entries());
  }
  entriesSorted(sortStyle = `value`) {
    const s = getSorter(sortStyle);
    return s(this.entries());
  }
  add(...values) {
    if (values === void 0)
      throw new Error(`value parameter is undefined`);
    const keys = values.map(__privateGet(this, _keyString));
    keys.forEach((key) => {
      const score = __privateGet(this, _store).get(key) ?? 0;
      __privateGet(this, _store).set(key, score + 1);
    });
    this.fireEvent(`change`, void 0);
  }
};
_store = new WeakMap();
_keyString = new WeakMap();
var frequencyMutable = (keyString) => new FrequencyMutable(keyString);

// src/temporal/MovingAverage.ts
var movingAverageLight = (scaling = 3) => {
  integer(scaling, `aboveZero`, `scaling`);
  let average = 0;
  let count = 0;
  const ma = {
    add(v) {
      count++;
      average = average + (v - average) / Math.min(count, scaling);
      return average;
    },
    clear() {
      average = 0;
      count = 0;
    },
    compute() {
      return average;
    }
  };
  return ma;
};
var movingAverage = (samples = 100, weightingFn) => {
  let q = queueMutable({
    capacity: samples,
    discardPolicy: `older`
  });
  const clear = () => {
    q = queueMutable({
      capacity: samples,
      discardPolicy: `older`
    });
  };
  const compute = () => {
    if (weightingFn === void 0) {
      return Arrays_exports.average(...q.data);
    } else {
      return Arrays_exports.averageWeighted(q.data, weightingFn);
    }
  };
  const add = (v) => {
    q.enqueue(v);
    return compute();
  };
  return { add, compute, clear };
};

// src/temporal/PointTracker.ts
var TrackedPoint = class {
  constructor(id, start, storePoints) {
    this.id = id;
    this.storePoints = storePoints;
    __publicField(this, "relation");
    __publicField(this, "points");
    __publicField(this, "lastPoint");
    const s = { ...start, at: Date.now() };
    this.relation = relation(s);
    this.lastPoint = { ...start, at: Date.now() };
    this.points = [s];
  }
  get x() {
    return this.lastPoint.x;
  }
  get y() {
    return this.lastPoint.y;
  }
  get size() {
    return this.points.length;
  }
  seen(...p) {
    const ts = p.map((v) => `at` in v ? v : {
      ...v,
      at: Date.now()
    });
    const last = ts[p.length - 1];
    if (this.storePoints)
      this.points.push(...ts);
    const rel = this.relation(last);
    const r = {
      ...rel,
      speed: length(last, this.lastPoint) / (last.at - this.lastPoint.at)
    };
    this.lastPoint = last;
    return r;
  }
  get line() {
    if (this.points.length === 1)
      return [];
    return joinPointsToLines(...this.points);
  }
  get length() {
    if (this.points.length === 1)
      return 0;
    const l = this.line;
    return length(l);
  }
  get elapsed() {
    return Date.now() - this.points[0].at;
  }
};
var pointTracker = (opts) => new PointTracker(opts);
var PointTracker = class {
  constructor(opts = {}) {
    __publicField(this, "store");
    __publicField(this, "gog");
    const trackIntermediatePoints = opts.trackIntermediatePoints ?? false;
    this.store = /* @__PURE__ */ new Map();
    this.gog = getOrGenerate(this.store, (key, start) => {
      if (start === void 0)
        throw new Error(`Requires start point`);
      return new TrackedPoint(key, start, trackIntermediatePoints);
    });
  }
  get size() {
    return this.store.size;
  }
  async seen(id, ...points) {
    if (id === null)
      throw new Error(`id parameter cannot be null`);
    if (id === void 0)
      throw new Error(`id parameter cannot be undefined`);
    const trackedPoint = await this.gog(id, points[0]);
    return trackedPoint.seen(...points);
  }
  delete(id) {
    this.store.delete(id);
  }
  reset() {
    this.store = /* @__PURE__ */ new Map();
  }
  *ids() {
    yield* this.store.keys();
  }
  *trackedPoints() {
    yield* this.store.values();
  }
  getTrackedPointsByAge() {
    const tp = Array.from(this.store.values());
    tp.sort((a, b) => {
      const aa = a.elapsed;
      const bb = b.elapsed;
      if (aa === bb)
        return 0;
      if (aa > bb)
        return -1;
      return 1;
    });
    return tp;
  }
  *lastPoints() {
    for (const p of this.store.values()) {
      yield p.lastPoint;
    }
  }
  *startPoints() {
    for (const p of this.store.values()) {
      yield p.points[0];
    }
  }
  get(id) {
    return this.store.get(id);
  }
};

export {
  Normalise_exports,
  FrequencyMutable,
  frequencyMutable,
  movingAverageLight,
  movingAverage,
  pointTracker,
  temporal_exports
};
//# sourceMappingURL=chunk-SJWPIWEV.js.map