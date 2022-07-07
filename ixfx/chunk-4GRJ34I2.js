import {
  getFieldByPath,
  getFieldPaths,
  ifNaN,
  isEqualDefault,
  isEqualValueDefault,
  isPowerOfTwo,
  roundUpToMultiple,
  toStringDefault
} from "./chunk-CAFP7EUC.js";
import {
  indexOfCharCode,
  omitChars,
  splitByLength
} from "./chunk-OE2F6QKM.js";
import {
  Map_exports,
  addUniqueByHash,
  filter,
  find,
  getOrGenerate,
  hasAnyValue,
  toArray,
  zipKeyValue
} from "./chunk-7QLZ7J2O.js";
import {
  Set_exports,
  setMutable
} from "./chunk-ZPSON7YL.js";
import {
  clamp,
  clampIndex,
  continuously,
  frequencyTimer,
  msElapsedTimer,
  relativeTimer,
  repeat,
  ticksElapsedTimer,
  waitFor
} from "./chunk-XWGJ33MJ.js";
import {
  StateMachine
} from "./chunk-QLXBT3IA.js";
import {
  delayLoop,
  sleep
} from "./chunk-LWEMLAJY.js";
import {
  array,
  integer,
  number,
  percent
} from "./chunk-U4IZE4J2.js";
import {
  SimpleEventEmitter,
  simpleMapArrayMutable
} from "./chunk-5LGKCSB3.js";
import {
  Forms_exports,
  clear,
  copyToClipboard,
  createAfter,
  createIn,
  dataTable,
  dataTableList,
  fromEvent,
  fullSizeCanvas,
  fullSizeElement,
  getTranslation,
  map,
  parentSize,
  parentSizeCanvas,
  reconcileChildren,
  resizeObservable,
  resolveEl,
  themeChangeObservable,
  windowResize
} from "./chunk-YFNRNENM.js";
import {
  __export,
  __privateAdd,
  __privateGet,
  __privateSet,
  __privateWrapper,
  __publicField
} from "./chunk-6SYKIMQH.js";

// src/KeyValue.ts
var KeyValue_exports = {};
__export(KeyValue_exports, {
  byValueString: () => byValueString,
  getSorter: () => getSorter,
  minMaxAvg: () => minMaxAvg2,
  sortByKey: () => sortByKey,
  sortByValueNumber: () => sortByValueNumber,
  sortByValueString: () => sortByValueString
});

// node_modules/fp-ts/es6/function.js
function pipe(a, ab, bc, cd, de, ef, fg, gh, hi) {
  switch (arguments.length) {
    case 1:
      return a;
    case 2:
      return ab(a);
    case 3:
      return bc(ab(a));
    case 4:
      return cd(bc(ab(a)));
    case 5:
      return de(cd(bc(ab(a))));
    case 6:
      return ef(de(cd(bc(ab(a)))));
    case 7:
      return fg(ef(de(cd(bc(ab(a))))));
    case 8:
      return gh(fg(ef(de(cd(bc(ab(a)))))));
    case 9:
      return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
    default:
      var ret = arguments[0];
      for (var i = 1; i < arguments.length; i++) {
        ret = arguments[i](ret);
      }
      return ret;
  }
}

// node_modules/fp-ts/es6/Eq.js
var eqStrict = {
  equals: function(a, b) {
    return a === b;
  }
};
var strictEqual = eqStrict.equals;

// node_modules/fp-ts/es6/Ord.js
var equalsDefault = function(compare3) {
  return function(first, second) {
    return first === second || compare3(first, second) === 0;
  };
};
var fromCompare = function(compare3) {
  return {
    equals: equalsDefault(compare3),
    compare: function(first, second) {
      return first === second ? 0 : compare3(first, second);
    }
  };
};
var reverse = function(O) {
  return fromCompare(function(first, second) {
    return O.compare(second, first);
  });
};
var contramap = function(f) {
  return function(fa) {
    return fromCompare(function(first, second) {
      return fa.compare(f(first), f(second));
    });
  };
};
function compare(first, second) {
  return first < second ? -1 : first > second ? 1 : 0;
}
var strictOrd = {
  equals: eqStrict.equals,
  compare
};

// node_modules/fp-ts/es6/number.js
var Eq = {
  equals: function(first, second) {
    return first === second;
  }
};
var Ord = {
  equals: Eq.equals,
  compare: function(first, second) {
    return first < second ? -1 : first > second ? 1 : 0;
  }
};
var Bounded = {
  equals: Eq.equals,
  compare: Ord.compare,
  top: Infinity,
  bottom: -Infinity
};
var MagmaSub = {
  concat: function(first, second) {
    return first - second;
  }
};
var SemigroupSum = {
  concat: function(first, second) {
    return first + second;
  }
};
var SemigroupProduct = {
  concat: function(first, second) {
    return first * second;
  }
};
var MonoidSum = {
  concat: SemigroupSum.concat,
  empty: 0
};
var MonoidProduct = {
  concat: SemigroupProduct.concat,
  empty: 1
};
var Field = {
  add: SemigroupSum.concat,
  zero: 0,
  mul: SemigroupProduct.concat,
  one: 1,
  sub: MagmaSub.concat,
  degree: function(_) {
    return 1;
  },
  div: function(first, second) {
    return first / second;
  },
  mod: function(first, second) {
    return first % second;
  }
};

// node_modules/fp-ts/es6/Array.js
var copy = function(as) {
  return as.slice();
};
var sort = function(O) {
  return function(as) {
    return as.length <= 1 ? copy(as) : as.slice().sort(O.compare);
  };
};

// node_modules/fp-ts/es6/string.js
var Eq2 = {
  equals: function(first, second) {
    return first === second;
  }
};
var Semigroup = {
  concat: function(first, second) {
    return first + second;
  }
};
var empty = "";
var Monoid = {
  concat: Semigroup.concat,
  empty
};
var Ord2 = {
  equals: Eq2.equals,
  compare: function(first, second) {
    return first < second ? -1 : first > second ? 1 : 0;
  }
};

// src/collections/Arrays.ts
var Arrays_exports = {};
__export(Arrays_exports, {
  areValuesIdentical: () => areValuesIdentical,
  average: () => average,
  averageWeighted: () => averageWeighted,
  dotProduct: () => dotProduct,
  ensureLength: () => ensureLength,
  filterBetween: () => filterBetween,
  groupBy: () => groupBy,
  guardArray: () => guardArray,
  guardIndex: () => guardIndex,
  max: () => max,
  maxFast: () => maxFast,
  maxIndex: () => maxIndex,
  min: () => min,
  minFast: () => minFast,
  minIndex: () => minIndex,
  minMaxAvg: () => minMaxAvg,
  randomElement: () => randomElement,
  randomIndex: () => randomIndex,
  randomPluck: () => randomPluck,
  remove: () => remove2,
  sample: () => sample,
  shuffle: () => shuffle,
  total: () => total,
  weight: () => weight,
  without: () => without,
  zip: () => zip
});

// src/Random.ts
var Random_exports = {};
__export(Random_exports, {
  arrayElement: () => randomElement,
  arrayIndex: () => randomIndex,
  defaultRandom: () => defaultRandom,
  float: () => float,
  gaussian: () => gaussian2,
  gaussianSkewed: () => gaussianSkewed,
  hue: () => randomHue,
  integer: () => integer2,
  shortGuid: () => shortGuid,
  string: () => string,
  weighted: () => weighted,
  weightedInteger: () => weightedInteger,
  weightedSkewed: () => weightedSkewed
});

// src/modulation/Easing.ts
var Easing_exports = {};
__export(Easing_exports, {
  crossfade: () => crossfade,
  fromCubicBezier: () => fromCubicBezier,
  functions: () => functions,
  gaussian: () => gaussian,
  get: () => get,
  getEasings: () => getEasings,
  mix: () => mix,
  tick: () => tick,
  time: () => time
});

// src/data/index.ts
var data_exports = {};
__export(data_exports, {
  FrequencyMutable: () => FrequencyMutable,
  IntervalTracker: () => IntervalTracker,
  Normalise: () => Normalise_exports,
  NumberTracker: () => NumberTracker,
  ObjectTracker: () => ObjectTracker,
  PointTracker: () => PointTracker,
  PrimitiveTracker: () => PrimitiveTracker,
  TrackedPointMap: () => TrackedPointMap,
  TrackedValueMap: () => TrackedValueMap,
  TrackerBase: () => TrackerBase,
  clamp: () => clamp,
  clampIndex: () => clampIndex,
  flip: () => flip,
  frequencyMutable: () => frequencyMutable,
  interpolate: () => interpolate7,
  interpolateAngle: () => interpolateAngle,
  intervalTracker: () => intervalTracker,
  movingAverage: () => movingAverage,
  movingAverageLight: () => movingAverageLight,
  numberTracker: () => numberTracker,
  piPi: () => piPi6,
  pointTracker: () => pointTracker,
  pointsTracker: () => pointsTracker,
  scale: () => scale,
  scalePercent: () => scalePercent,
  scalePercentages: () => scalePercentages,
  wrap: () => wrap,
  wrapInteger: () => wrapInteger,
  wrapRange: () => wrapRange
});

// src/data/Normalise.ts
var Normalise_exports = {};
__export(Normalise_exports, {
  array: () => array2,
  stream: () => stream
});

// src/collections/NumericArrays.ts
var weight = (data, fn) => {
  const f = fn === void 0 ? (x) => x : fn;
  const validNumbers = data.filter((d) => typeof d === `number` && !Number.isNaN(d));
  return validNumbers.map((v, index) => v * f(index / (validNumbers.length - 1)));
};
var dotProduct = (values) => {
  let r = 0;
  const len = values[0].length;
  for (let i = 0; i < len; i++) {
    let t4 = 0;
    for (let p = 0; p < values.length; p++) {
      if (p === 0)
        t4 = values[p][i];
      else {
        t4 *= values[p][i];
      }
    }
    r += t4;
  }
  return r;
};
var average = (...data) => {
  if (data === void 0)
    throw new Error(`data parameter is undefined`);
  const validNumbers = data.filter((d) => typeof d === `number` && !Number.isNaN(d));
  const total2 = validNumbers.reduce((acc, v) => acc + v, 0);
  return total2 / validNumbers.length;
};
var averageWeighted = (data, weightings) => {
  if (typeof weightings === `function`)
    weightings = weight(data, weightings);
  const ww = zip(data, weightings);
  const [totalV, totalW] = ww.reduce((acc, v) => [acc[0] + v[0] * v[1], acc[1] + v[1]], [0, 0]);
  return totalV / totalW;
};
var min = (...data) => {
  const validNumbers = data.filter((d) => typeof d === `number` && !Number.isNaN(d));
  return Math.min(...validNumbers);
};
var maxIndex = (...data) => data.reduce((bestIndex, value, index, arr) => value > arr[bestIndex] ? index : bestIndex, 0);
var minIndex = (...data) => data.reduce((bestIndex, value, index, arr) => value < arr[bestIndex] ? index : bestIndex, 0);
var max = (...data) => {
  const validNumbers = data.filter((d) => typeof d === `number` && !Number.isNaN(d));
  return Math.max(...validNumbers);
};
var total = (...data) => data.reduce((prev, curr) => {
  if (typeof curr !== `number`)
    return prev;
  if (Number.isNaN(curr))
    return prev;
  if (Number.isFinite(curr))
    return prev;
  return prev + curr;
}, 0);
var maxFast = (data) => {
  let m = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < data.length; i++) {
    m = Math.max(m, data[i]);
  }
  return m;
};
var minFast = (data) => {
  let m = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < data.length; i++) {
    m = Math.min(m, data[i]);
  }
  return m;
};
var minMaxAvg = (data, startIndex, endIndex) => {
  if (data === void 0)
    throw new Error(`'data' is undefined`);
  if (!Array.isArray(data))
    throw new Error(`'data' parameter is not an array`);
  if (data.length === 0) {
    return {
      total: 0,
      min: 0,
      max: 0,
      avg: 0
    };
  }
  if (startIndex === void 0)
    startIndex = 0;
  if (endIndex === void 0)
    endIndex = data.length - 1;
  const validNumbers = filterBetween(data, (d) => typeof d === `number` && !Number.isNaN(d), startIndex, endIndex);
  const total2 = validNumbers.reduce((acc, v) => acc + v, 0);
  return {
    total: total2,
    max: Math.max(...validNumbers),
    min: Math.min(...validNumbers),
    avg: total2 / validNumbers.length
  };
};

// src/data/Scale.ts
var scale = (v, inMin, inMax, outMin, outMax, easing) => {
  if (outMax === void 0)
    outMax = 1;
  if (outMin === void 0)
    outMin = 0;
  if (inMin === inMax)
    return outMax;
  let a = (v - inMin) / (inMax - inMin);
  if (easing !== void 0)
    a = easing(a);
  return a * (outMax - outMin) + outMin;
};
var scalePercentages = (percentage, outMin, outMax = 1) => {
  number(percentage, `percentage`, `v`);
  number(outMin, `percentage`, `outMin`);
  number(outMax, `percentage`, `outMax`);
  return scale(percentage, 0, 1, outMin, outMax);
};
var scalePercent = (v, outMin, outMax) => {
  number(v, `percentage`, `v`);
  return scale(v, 0, 1, outMin, outMax);
};

// src/data/Normalise.ts
var stream = (minDefault, maxDefault) => {
  let min3 = minDefault ?? Number.MAX_SAFE_INTEGER;
  let max3 = maxDefault ?? Number.MIN_SAFE_INTEGER;
  return (v) => {
    min3 = Math.min(min3, v);
    max3 = Math.max(max3, v);
    return scale(v, min3, max3);
  };
};
var array2 = (values, minForced, maxForced) => {
  if (!Array.isArray(values))
    throw new Error(`values param should be an array`);
  const mma = minMaxAvg(values);
  const min3 = minForced ?? mma.min;
  const max3 = maxForced ?? mma.max;
  return values.map((v) => clamp(scale(v, min3, max3)));
};

// src/geometry/index.ts
var geometry_exports = {};
__export(geometry_exports, {
  Arcs: () => Arc_exports,
  Beziers: () => Bezier_exports,
  Circles: () => Circle_exports,
  Compound: () => CompoundPath_exports,
  Ellipses: () => Ellipse_exports,
  Grids: () => Grid_exports,
  Lines: () => Line_exports,
  Paths: () => Path_exports,
  Points: () => Point_exports,
  Polar: () => Polar_exports,
  Rects: () => Rect_exports,
  Shapes: () => Shape_exports,
  Triangles: () => Triangle_exports,
  degreeToRadian: () => degreeToRadian,
  radianToDegree: () => radianToDegree,
  radiansFromAxisX: () => radiansFromAxisX
});

// src/geometry/Arc.ts
var Arc_exports = {};
__export(Arc_exports, {
  bbox: () => bbox3,
  distanceCenter: () => distanceCenter,
  fromDegrees: () => fromDegrees,
  guard: () => guard4,
  interpolate: () => interpolate3,
  isArc: () => isArc,
  isEquals: () => isEquals,
  isPositioned: () => isPositioned2,
  length: () => length3,
  point: () => point,
  toLine: () => toLine,
  toPath: () => toPath2,
  toSvg: () => toSvg
});

// src/geometry/Point.ts
var Point_exports = {};
__export(Point_exports, {
  Empty: () => Empty,
  Placeholder: () => Placeholder,
  angle: () => angle,
  apply: () => apply2,
  bbox: () => bbox2,
  center: () => center2,
  centroid: () => centroid,
  clamp: () => clamp2,
  clampMagnitude: () => clampMagnitude,
  compare: () => compare2,
  compareByX: () => compareByX,
  convexHull: () => convexHull,
  distance: () => distance2,
  distanceToCenter: () => distanceToCenter,
  distanceToExterior: () => distanceToExterior,
  divide: () => divide2,
  dotProduct: () => dotProduct2,
  findMinimum: () => findMinimum,
  from: () => from,
  fromNumbers: () => fromNumbers2,
  getPointParam: () => getPointParam,
  guard: () => guard,
  guardNonZeroPoint: () => guardNonZeroPoint,
  interpolate: () => interpolate2,
  invert: () => invert,
  isEmpty: () => isEmpty4,
  isEqual: () => isEqual2,
  isPlaceholder: () => isPlaceholder2,
  isPoint: () => isPoint,
  isPoint3d: () => isPoint3d,
  multiply: () => multiply3,
  normalise: () => normalise,
  normaliseByRect: () => normaliseByRect2,
  pipeline: () => pipeline,
  pipelineApply: () => pipelineApply,
  project: () => project,
  random: () => random,
  reduce: () => reduce,
  relation: () => relation,
  rotate: () => rotate2,
  rotatePointArray: () => rotatePointArray,
  subtract: () => subtract3,
  sum: () => sum2,
  toArray: () => toArray2,
  toIntegerValues: () => toIntegerValues,
  toString: () => toString2,
  withinRange: () => withinRange2,
  wrap: () => wrap2
});

// src/geometry/Line.ts
var Line_exports = {};
__export(Line_exports, {
  angleRadian: () => angleRadian,
  apply: () => apply,
  bbox: () => bbox,
  distance: () => distance,
  divide: () => divide,
  equals: () => equals,
  extendFromA: () => extendFromA,
  extendX: () => extendX,
  fromFlatArray: () => fromFlatArray,
  fromNumbers: () => fromNumbers,
  fromPoints: () => fromPoints,
  fromPointsToPath: () => fromPointsToPath,
  getPointsParam: () => getPointsParam,
  guard: () => guard2,
  interpolate: () => interpolate,
  isLine: () => isLine,
  isPolyLine: () => isPolyLine,
  joinPointsToLines: () => joinPointsToLines,
  length: () => length,
  midpoint: () => midpoint,
  multiply: () => multiply,
  nearest: () => nearest,
  normaliseByRect: () => normaliseByRect,
  parallel: () => parallel,
  perpendicularPoint: () => perpendicularPoint,
  rotate: () => rotate,
  scaleFromMidpoint: () => scaleFromMidpoint,
  slope: () => slope,
  subtract: () => subtract,
  sum: () => sum,
  toFlatArray: () => toFlatArray,
  toPath: () => toPath,
  toString: () => toString,
  toSvgString: () => toSvgString,
  withinRange: () => withinRange
});

// src/collections/index.ts
var collections_exports = {};
__export(collections_exports, {
  Arrays: () => Arrays_exports,
  MapOfMutableImpl: () => MapOfMutableImpl,
  Maps: () => Map_exports,
  Queues: () => Queue_exports,
  Sets: () => Set_exports,
  Stacks: () => Stack_exports,
  circularArray: () => circularArray,
  map: () => map2,
  mapArray: () => mapArray,
  mapCircularMutable: () => mapCircularMutable,
  mapMutable: () => mapMutable,
  mapSet: () => mapSet,
  queue: () => queue,
  queueMutable: () => queueMutable,
  setMutable: () => setMutable,
  simpleMapArrayMutable: () => simpleMapArrayMutable,
  stack: () => stack,
  stackMutable: () => stackMutable
});

// src/collections/CircularArray.ts
var _capacity, _pointer;
var _CircularArrayImpl = class extends Array {
  constructor(capacity = 0) {
    super();
    __privateAdd(this, _capacity, void 0);
    __privateAdd(this, _pointer, void 0);
    integer(capacity, `positive`, `capacity`);
    __privateSet(this, _capacity, capacity);
    __privateSet(this, _pointer, 0);
  }
  add(thing) {
    const ca = _CircularArrayImpl.from(this);
    ca[__privateGet(this, _pointer)] = thing;
    __privateSet(ca, _capacity, __privateGet(this, _capacity));
    if (__privateGet(this, _capacity) > 0) {
      __privateSet(ca, _pointer, __privateGet(this, _pointer) + 1 === __privateGet(this, _capacity) ? 0 : __privateGet(this, _pointer) + 1);
    } else {
      __privateSet(ca, _pointer, __privateGet(this, _pointer) + 1);
    }
    return ca;
  }
  get pointer() {
    return __privateGet(this, _pointer);
  }
  get isFull() {
    if (__privateGet(this, _capacity) === 0)
      return false;
    return this.length === __privateGet(this, _capacity);
  }
};
var CircularArrayImpl = _CircularArrayImpl;
_capacity = new WeakMap();
_pointer = new WeakMap();
var circularArray = (capacity) => new CircularArrayImpl(capacity);

// src/collections/MapMultiMutable.ts
var _map;
var MapOfMutableImpl = class extends SimpleEventEmitter {
  constructor(type, opts = {}) {
    super();
    __privateAdd(this, _map, /* @__PURE__ */ new Map());
    __publicField(this, "groupBy");
    __publicField(this, "type");
    this.type = type;
    this.groupBy = opts.groupBy ?? toStringDefault;
  }
  get typeName() {
    return this.type.name;
  }
  get lengthMax() {
    let m = 0;
    for (const v of __privateGet(this, _map).values()) {
      m = Math.max(m, this.type.count(v));
    }
    return m;
  }
  debugString() {
    const keys = Array.from(__privateGet(this, _map).keys());
    let r = `Keys: ${keys.join(`, `)}\r
`;
    keys.forEach((k) => {
      const v = __privateGet(this, _map).get(k);
      if (v !== void 0) {
        const asArray = this.type.toArray(v);
        if (asArray !== void 0) {
          r += ` - ${k} (${this.type.count(v)}) = ${JSON.stringify(asArray)}\r
`;
        }
      } else
        r += ` - ${k} (undefined)\r
`;
    });
    return r;
  }
  get isEmpty() {
    return __privateGet(this, _map).size === 0;
  }
  clear() {
    __privateGet(this, _map).clear();
    super.fireEvent(`clear`, true);
  }
  addKeyedValues(key, ...values) {
    const set2 = __privateGet(this, _map).get(key);
    if (set2 === void 0) {
      __privateGet(this, _map).set(key, this.type.add(void 0, values));
      super.fireEvent(`addedKey`, { key });
      super.fireEvent(`addedValues`, { values });
    } else {
      __privateGet(this, _map).set(key, this.type.add(set2, values));
      super.fireEvent(`addedValues`, { values });
    }
  }
  addValue(...values) {
    values.forEach((v) => this.addKeyedValues(this.groupBy(v), v));
  }
  hasKeyValue(key, value) {
    const m = __privateGet(this, _map).get(key);
    if (m === void 0)
      return false;
    return this.type.has(m, value);
  }
  has(key) {
    return __privateGet(this, _map).has(key);
  }
  deleteKeyValue(key, value) {
    const a = __privateGet(this, _map).get(key);
    if (a === void 0)
      return false;
    const preCount = this.type.count(a);
    const filtered = this.type.without(a, value);
    const postCount = filtered.length;
    __privateGet(this, _map).set(key, this.type.add(void 0, filtered));
    return preCount > postCount;
  }
  delete(key) {
    const a = __privateGet(this, _map).get(key);
    if (a === void 0)
      return false;
    __privateGet(this, _map).delete(key);
    this.fireEvent(`deleteKey`, { key });
    return true;
  }
  findKeyForValue(value) {
    const keys = Array.from(__privateGet(this, _map).keys());
    const found = keys.find((key) => {
      const a = __privateGet(this, _map).get(key);
      if (a === void 0)
        throw Error(`Bug: map could not be accessed`);
      if (this.type.has(a, value))
        return true;
      return false;
    });
    return found;
  }
  count(key) {
    const e = __privateGet(this, _map).get(key);
    if (e === void 0)
      return 0;
    return this.type.count(e);
  }
  get(key) {
    const m = __privateGet(this, _map).get(key);
    if (m === void 0)
      return void 0;
    return this.type.toArray(m);
  }
  getSource(key) {
    return __privateGet(this, _map).get(key);
  }
  keys() {
    return Array.from(__privateGet(this, _map).keys());
  }
  keysAndCounts() {
    const keys = this.keys();
    const r = keys.map((k) => [k, this.count(k)]);
    return r;
  }
  merge(other) {
    const keys = other.keys();
    keys.forEach((key) => {
      const data = other.get(key);
      if (data !== void 0)
        this.addKeyedValues(key, ...data);
    });
  }
};
_map = new WeakMap();
var mapArray = (opts = {}) => {
  const comparer = opts.comparer === void 0 ? opts.toString === void 0 ? (a, b) => opts.toString(a) === opts.toString(b) : isEqualDefault : opts.comparer;
  const t4 = {
    get name() {
      return `array`;
    },
    add: (dest, values) => {
      if (dest === void 0)
        return [...values];
      return [...dest, ...values];
    },
    count: (source) => source.length,
    find: (source, predicate) => source.find(predicate),
    filter: (source, predicate) => source.filter(predicate),
    toArray: (source) => source,
    has: (source, value) => source.find((v) => comparer(v, value)) !== void 0,
    without: (source, value) => source.filter((v) => !comparer(v, value))
  };
  const m = new MapOfMutableImpl(t4, opts);
  return m;
};
var mapSet = (opts) => {
  const hash = opts?.hash ?? toStringDefault;
  const comparer = (a, b) => hash(a) === hash(b);
  const t4 = {
    get name() {
      return `set`;
    },
    add: (dest, values) => addUniqueByHash(dest, hash, ...values),
    count: (source) => source.size,
    find: (source, predicate) => find(source, predicate),
    filter: (source, predicate) => filter(source, predicate),
    toArray: (source) => toArray(source),
    has: (source, value) => hasAnyValue(source, value, comparer),
    without: (source, value) => without(toArray(source), value, comparer)
  };
  const m = new MapOfMutableImpl(t4, opts);
  return m;
};
var mapCircularMutable = (opts) => {
  const comparer = isEqualDefault;
  const t4 = {
    get name() {
      return `circular`;
    },
    add: (dest, values) => {
      if (dest === void 0)
        dest = circularArray(opts.capacity);
      values.forEach((v) => dest = dest?.add(v));
      return dest;
    },
    count: (source) => source.length,
    find: (source, predicate) => source.find(predicate),
    filter: (source, predicate) => source.filter(predicate),
    toArray: (source) => source,
    has: (source, value) => source.find((v) => comparer(v, value)) !== void 0,
    without: (source, value) => source.filter((v) => !comparer(v, value))
  };
  return new MapOfMutableImpl(t4, opts);
};

// src/collections/Stack.ts
var Stack_exports = {};
__export(Stack_exports, {
  stack: () => stack,
  stackMutable: () => stackMutable
});
var trimStack = (opts, stack2, toAdd) => {
  const potentialLength = stack2.length + toAdd.length;
  const policy = opts.discardPolicy ?? `additions`;
  const capacity = opts.capacity ?? potentialLength;
  const toRemove = potentialLength - capacity;
  if (opts.debug)
    console.log(`Stack.push: stackLen: ${stack2.length} potentialLen: ${potentialLength} toRemove: ${toRemove} policy: ${policy}`);
  switch (policy) {
    case `additions`:
      if (opts.debug)
        console.log(`Stack.push:DiscardAdditions: stackLen: ${stack2.length} slice: ${potentialLength - capacity} toAddLen: ${toAdd.length}`);
      if (stack2.length === opts.capacity) {
        return stack2;
      } else {
        return [...stack2, ...toAdd.slice(0, toAdd.length - toRemove)];
      }
    case `newer`:
      if (toRemove >= stack2.length) {
        return toAdd.slice(Math.max(0, toAdd.length - capacity), Math.min(toAdd.length, capacity) + 1);
      } else {
        if (opts.debug)
          console.log(` from orig: ${stack2.slice(0, stack2.length - toRemove)}`);
        return [...stack2.slice(0, stack2.length - toRemove), ...toAdd.slice(0, Math.min(toAdd.length, capacity - toRemove + 1))];
      }
    case `older`:
      return [...stack2, ...toAdd].slice(toRemove);
    default:
      throw new Error(`Unknown discard policy ${policy}`);
  }
};
var push = (opts, stack2, ...toAdd) => {
  const potentialLength = stack2.length + toAdd.length;
  const overSize = opts.capacity && potentialLength > opts.capacity;
  const toReturn = overSize ? trimStack(opts, stack2, toAdd) : [...stack2, ...toAdd];
  return toReturn;
};
var pop = (opts, stack2) => {
  if (stack2.length === 0)
    throw new Error(`Stack is empty`);
  return stack2.slice(0, stack2.length - 1);
};
var peek = (opts, stack2) => stack2[stack2.length - 1];
var isEmpty = (opts, stack2) => stack2.length === 0;
var isFull = (opts, stack2) => {
  if (opts.capacity) {
    return stack2.length >= opts.capacity;
  }
  return false;
};
var StackImpl = class {
  constructor(opts, data) {
    __publicField(this, "opts");
    __publicField(this, "data");
    this.opts = opts;
    this.data = data;
  }
  push(...toAdd) {
    return new StackImpl(this.opts, push(this.opts, this.data, ...toAdd));
  }
  pop() {
    return new StackImpl(this.opts, pop(this.opts, this.data));
  }
  forEach(fn) {
    this.data.forEach(fn);
  }
  forEachFromTop(fn) {
    [...this.data].reverse().forEach(fn);
  }
  get isEmpty() {
    return isEmpty(this.opts, this.data);
  }
  get isFull() {
    return isFull(this.opts, this.data);
  }
  get peek() {
    return peek(this.opts, this.data);
  }
  get length() {
    return this.data.length;
  }
};
var StackMutableImpl = class {
  constructor(opts, data) {
    __publicField(this, "opts");
    __publicField(this, "data");
    this.opts = opts;
    this.data = data;
  }
  push(...toAdd) {
    this.data = push(this.opts, this.data, ...toAdd);
    return this.data.length;
  }
  forEach(fn) {
    this.data.forEach(fn);
  }
  forEachFromTop(fn) {
    [...this.data].reverse().forEach(fn);
  }
  pop() {
    const v = peek(this.opts, this.data);
    pop(this.opts, this.data);
    return v;
  }
  get isEmpty() {
    return isEmpty(this.opts, this.data);
  }
  get isFull() {
    return isFull(this.opts, this.data);
  }
  get peek() {
    return peek(this.opts, this.data);
  }
  get length() {
    return this.data.length;
  }
};
var stack = (opts = {}, ...startingItems) => new StackImpl({ ...opts }, [...startingItems]);
var stackMutable = (opts = {}, ...startingItems) => new StackMutableImpl({ ...opts }, [...startingItems]);

// src/collections/Queue.ts
var Queue_exports = {};
__export(Queue_exports, {
  queue: () => queue,
  queueMutable: () => queueMutable
});
var debug = (opts, msg) => {
  opts.debug ? console.log(`queue:${msg}`) : null;
};
var trimQueue = (opts, queue2, toAdd) => {
  const potentialLength = queue2.length + toAdd.length;
  const capacity = opts.capacity ?? potentialLength;
  const toRemove = potentialLength - capacity;
  const policy = opts.discardPolicy ?? `additions`;
  debug(opts, `queueLen: ${queue2.length} potentialLen: ${potentialLength} toRemove: ${toRemove} policy: ${policy}`);
  switch (policy) {
    case `additions`:
      debug(opts, `trimQueue:DiscardAdditions: queueLen: ${queue2.length} slice: ${potentialLength - capacity} toAddLen: ${toAdd.length}`);
      if (queue2.length === opts.capacity) {
        return queue2;
      } else {
        return [...queue2, ...toAdd.slice(0, toRemove - 1)];
      }
    case `newer`:
      if (toRemove >= queue2.length) {
        return toAdd.slice(Math.max(0, toAdd.length - capacity), Math.min(toAdd.length, capacity) + 1);
      } else {
        const toAddFinal = toAdd.slice(0, Math.min(toAdd.length, capacity - toRemove + 1));
        const toKeep = queue2.slice(0, queue2.length - toRemove);
        debug(opts, `trimQueue: toRemove: ${toRemove} keeping: ${JSON.stringify(toKeep)} from orig: ${JSON.stringify(queue2)} toAddFinal: ${JSON.stringify(toAddFinal)}`);
        const t4 = [...toKeep, ...toAddFinal];
        debug(opts, `final: ${JSON.stringify(t4)}`);
        return t4;
      }
    case `older`:
      return [...queue2, ...toAdd].slice(toRemove);
    default:
      throw new Error(`Unknown overflow policy ${policy}`);
  }
};
var enqueue = (opts, queue2, ...toAdd) => {
  if (opts === void 0)
    throw new Error(`opts parameter undefined`);
  const potentialLength = queue2.length + toAdd.length;
  const overSize = opts.capacity && potentialLength > opts.capacity;
  const toReturn = overSize ? trimQueue(opts, queue2, toAdd) : [...queue2, ...toAdd];
  if (opts.capacity && toReturn.length !== opts.capacity && overSize)
    throw new Error(`Bug! Expected return to be at capacity. Return len: ${toReturn.length} capacity: ${opts.capacity} opts: ${JSON.stringify(opts)}`);
  if (!opts.capacity && toReturn.length !== potentialLength)
    throw new Error(`Bug! Return length not expected. Return len: ${toReturn.length} expected: ${potentialLength} opts: ${JSON.stringify(opts)}`);
  return toReturn;
};
var dequeue = (opts, queue2) => {
  if (queue2.length === 0)
    throw new Error(`Queue is empty`);
  return queue2.slice(1);
};
var peek2 = (opts, queue2) => queue2[0];
var isEmpty2 = (opts, queue2) => queue2.length === 0;
var isFull2 = (opts, queue2) => {
  if (opts.capacity) {
    return queue2.length >= opts.capacity;
  }
  return false;
};
var QueueImpl = class {
  constructor(opts, data) {
    __publicField(this, "opts");
    __publicField(this, "data");
    if (opts === void 0)
      throw new Error(`opts parameter undefined`);
    this.opts = opts;
    this.data = data;
  }
  forEach(fn) {
    for (let i = this.data.length - 1; i >= 0; i--) {
      fn(this.data[i]);
    }
  }
  forEachFromFront(fn) {
    this.data.forEach((vv) => fn(vv));
  }
  enqueue(...toAdd) {
    return new QueueImpl(this.opts, enqueue(this.opts, this.data, ...toAdd));
  }
  dequeue() {
    return new QueueImpl(this.opts, dequeue(this.opts, this.data));
  }
  get isEmpty() {
    return isEmpty2(this.opts, this.data);
  }
  get isFull() {
    return isFull2(this.opts, this.data);
  }
  get length() {
    return this.data.length;
  }
  get peek() {
    return peek2(this.opts, this.data);
  }
};
var QueueMutableImpl = class {
  constructor(opts, data) {
    __publicField(this, "opts");
    __publicField(this, "data");
    if (opts === void 0)
      throw new Error(`opts parameter undefined`);
    this.opts = opts;
    this.data = data;
  }
  enqueue(...toAdd) {
    this.data = enqueue(this.opts, this.data, ...toAdd);
    return this.data.length;
  }
  dequeue() {
    const v = peek2(this.opts, this.data);
    this.data = dequeue(this.opts, this.data);
    return v;
  }
  get isEmpty() {
    return isEmpty2(this.opts, this.data);
  }
  get isFull() {
    return isFull2(this.opts, this.data);
  }
  get length() {
    return this.data.length;
  }
  get peek() {
    return peek2(this.opts, this.data);
  }
};
var queue = (opts = {}, ...startingItems) => {
  opts = { ...opts };
  return new QueueImpl(opts, [...startingItems]);
};
var queueMutable = (opts = {}, ...startingItems) => new QueueMutableImpl({ ...opts }, [...startingItems]);

// src/collections/MapImmutable.ts
var addArray = (map3, data) => {
  const x = new Map(map3.entries());
  data.forEach((d) => {
    if (d[0] === void 0)
      throw new Error(`key cannot be undefined`);
    if (d[1] === void 0)
      throw new Error(`value cannot be undefined`);
    x.set(d[0], d[1]);
  });
  return x;
};
var addObjects = (map3, data) => {
  const x = new Map(map3.entries());
  data.forEach((d) => {
    if (d.key === void 0)
      throw new Error(`key cannot be undefined`);
    if (d.value === void 0)
      throw new Error(`value cannot be undefined`);
    x.set(d.key, d.value);
  });
  return x;
};
var has = (map3, key) => map3.has(key);
var add = (map3, ...data) => {
  if (map3 === void 0)
    throw new Error(`map parameter is undefined`);
  if (data === void 0)
    throw new Error(`data parameter i.s undefined`);
  if (data.length === 0)
    return map3;
  const firstRecord = data[0];
  const isObj = typeof firstRecord.key !== `undefined` && typeof firstRecord.value !== `undefined`;
  return isObj ? addObjects(map3, data) : addArray(map3, data);
};
var set = (map3, key, value) => {
  const x = new Map(map3.entries());
  x.set(key, value);
  return x;
};
var del = (map3, key) => {
  const x = new Map(map3.entries());
  x.delete(key);
  return x;
};
var map2 = (dataOrMap) => {
  if (dataOrMap === void 0)
    return map2([]);
  if (Array.isArray(dataOrMap))
    return map2(add(/* @__PURE__ */ new Map(), ...dataOrMap));
  const data = dataOrMap;
  return {
    add: (...itemsToAdd) => {
      const s = add(data, ...itemsToAdd);
      return map2(s);
    },
    get: (key) => data.get(key),
    delete: (key) => map2(del(data, key)),
    clear: () => map2(),
    has: (key) => data.has(key),
    entries: () => data.entries(),
    isEmpty: () => data.size === 0
  };
};

// src/collections/MapMutable.ts
var mapMutable = (...data) => {
  let m = add(/* @__PURE__ */ new Map(), ...data);
  return {
    add: (...data2) => {
      m = add(m, ...data2);
    },
    delete: (key) => {
      m = del(m, key);
    },
    clear: () => {
      m = add(/* @__PURE__ */ new Map());
    },
    set: (key, value) => {
      m = set(m, key, value);
    },
    get: (key) => m.get(key),
    entries: () => m.entries(),
    isEmpty: () => m.size === 0,
    has: (key) => has(m, key)
  };
};

// src/geometry/Line.ts
var isLine = (p) => {
  if (p === void 0)
    return false;
  if (p.a === void 0)
    return false;
  if (p.b === void 0)
    return false;
  if (!Point_exports.isPoint(p.a))
    return false;
  if (!Point_exports.isPoint(p.b))
    return false;
  return true;
};
var isPolyLine = (p) => {
  if (!Array.isArray(p))
    return false;
  const valid = !p.some((v) => !isLine(v));
  return valid;
};
var equals = (a, b) => a.a === b.a && a.b === b.b;
var apply = (line3, fn) => Object.freeze({
  ...line3,
  a: fn(line3.a),
  b: fn(line3.b)
});
var guard2 = (line3, paramName = `line`) => {
  if (line3 === void 0)
    throw new Error(`${paramName} undefined`);
  if (line3.a === void 0)
    throw new Error(`${paramName}.a undefined. Expected {a:Point, b:Point}`);
  if (line3.b === void 0)
    throw new Error(`${paramName}.b undefined. Expected {a:Point, b:Point}`);
};
var angleRadian = (lineOrPoint, b) => {
  let a;
  if (isLine(lineOrPoint)) {
    a = lineOrPoint.a;
    b = lineOrPoint.b;
  } else {
    a = lineOrPoint;
    if (b === void 0)
      throw new Error(`b point must be provided`);
  }
  return Math.atan2(b.y - a.y, b.x - a.x);
};
var multiply = (line3, point3) => Object.freeze({
  ...line3,
  a: Point_exports.multiply(line3.a, point3),
  b: Point_exports.multiply(line3.b, point3)
});
var divide = (line3, point3) => Object.freeze({
  ...line3,
  a: Point_exports.divide(line3.a, point3),
  b: Point_exports.divide(line3.b, point3)
});
var sum = (line3, point3) => Object.freeze({
  ...line3,
  a: Point_exports.sum(line3.a, point3),
  b: Point_exports.sum(line3.b, point3)
});
var subtract = (line3, point3) => Object.freeze({
  ...line3,
  a: Point_exports.subtract(line3.a, point3),
  b: Point_exports.subtract(line3.b, point3)
});
var normaliseByRect = (line3, width, height) => Object.freeze({
  ...line3,
  a: Point_exports.normaliseByRect(line3.a, width, height),
  b: Point_exports.normaliseByRect(line3.b, width, height)
});
var withinRange = (line3, point3, maxRange) => {
  const dist = distance(line3, point3);
  return dist <= maxRange;
};
function length(aOrLine, pointB) {
  if (isPolyLine(aOrLine)) {
    const sum3 = aOrLine.reduce((acc, v) => length(v) + acc, 0);
    return sum3;
  }
  const [a, b] = getPointsParam(aOrLine, pointB);
  const x = b.x - a.x;
  const y = b.y - a.y;
  if (a.z !== void 0 && b.z !== void 0) {
    const z = b.z - a.z;
    return Math.hypot(x, y, z);
  } else {
    return Math.hypot(x, y);
  }
}
var midpoint = (aOrLine, pointB) => {
  const [a, b] = getPointsParam(aOrLine, pointB);
  return interpolate(0.5, a, b);
};
var getPointsParam = (aOrLine, b) => {
  let a;
  if (isLine(aOrLine)) {
    b = aOrLine.b;
    a = aOrLine.a;
  } else {
    a = aOrLine;
    if (b === void 0)
      throw new Error(`Since first parameter is not a line, two points are expected. Got a: ${JSON.stringify(a)} b: ${JSON.stringify(b)}`);
  }
  guard(a, `a`);
  guard(a, `b`);
  return [a, b];
};
var nearest = (line3, point3) => {
  const n = (line4) => {
    const { a, b } = line4;
    const atob = { x: b.x - a.x, y: b.y - a.y };
    const atop = { x: point3.x - a.x, y: point3.y - a.y };
    const len = atob.x * atob.x + atob.y * atob.y;
    let dot2 = atop.x * atob.x + atop.y * atob.y;
    const t4 = Math.min(1, Math.max(0, dot2 / len));
    dot2 = (b.x - a.x) * (point3.y - a.y) - (b.y - a.y) * (point3.x - a.x);
    return { x: a.x + atob.x * t4, y: a.y + atob.y * t4 };
  };
  if (Array.isArray(line3)) {
    const pts = line3.map((l) => n(l));
    const dists = pts.map((p) => Point_exports.distance(p, point3));
    return Object.freeze(pts[Arrays_exports.minIndex(...dists)]);
  } else {
    return Object.freeze(n(line3));
  }
};
var slope = (lineOrPoint, b) => {
  let a;
  if (isLine(lineOrPoint)) {
    a = lineOrPoint.a;
    b = lineOrPoint.b;
  } else {
    a = lineOrPoint;
    if (b === void 0)
      throw new Error(`b parameter required`);
  }
  if (b !== void 0) {
    return (b.y - a.y) / (b.x - a.x);
  } else
    throw Error(`Second point missing`);
};
var directionVector = (line3) => ({
  x: line3.b.x - line3.a.x,
  y: line3.b.y - line3.a.y
});
var directionVectorNormalised = (line3) => {
  const l = length(line3);
  const v = directionVector(line3);
  return {
    x: v.x / l,
    y: v.y / l
  };
};
var perpendicularPoint = (line3, distance3, amount = 0) => {
  const origin = interpolate(amount, line3);
  const dvn = directionVectorNormalised(line3);
  return {
    x: origin.x - dvn.y * distance3,
    y: origin.y + dvn.x * distance3
  };
};
var parallel = (line3, distance3) => {
  const dv = directionVector(line3);
  const dvn = directionVectorNormalised(line3);
  const a = {
    x: line3.a.x - dvn.y * distance3,
    y: line3.a.y + dvn.x * distance3
  };
  return {
    a,
    b: {
      x: a.x + dv.x,
      y: a.y + dv.y
    }
  };
};
var scaleFromMidpoint = (line3, factor) => {
  const a = interpolate(factor / 2, line3);
  const b = interpolate(0.5 + factor / 2, line3);
  return { a, b };
};
var extendX = (line3, xIntersection) => {
  const y = line3.a.y + (xIntersection - line3.a.x) * slope(line3);
  return Object.freeze({ x: xIntersection, y });
};
var extendFromA = (line3, distance3) => {
  const len = length(line3);
  return Object.freeze({
    ...line3,
    a: line3.a,
    b: Object.freeze({
      x: line3.b.x + (line3.b.x - line3.a.x) / len * distance3,
      y: line3.b.y + (line3.b.y - line3.a.y) / len * distance3
    })
  });
};
var distance = (line3, point3) => {
  if (Array.isArray(line3)) {
    const distances = line3.map((l) => distanceSingleLine(l, point3));
    return minFast(distances);
  } else {
    return distanceSingleLine(line3, point3);
  }
};
var distanceSingleLine = (line3, point3) => {
  guard2(line3, `line`);
  guard(point3, `point`);
  const lineLength = length(line3);
  if (lineLength === 0) {
    return length(line3.a, point3);
  }
  const near = nearest(line3, point3);
  return length(near, point3);
};
function interpolate(amount, aOrLine, pointB) {
  percent(amount, `amount`);
  const [a, b] = getPointsParam(aOrLine, pointB);
  const d = length(a, b);
  const d2 = d * (1 - amount);
  const x = b.x - d2 * (b.x - a.x) / d;
  const y = b.y - d2 * (b.y - a.y) / d;
  return Object.freeze({ x, y });
}
function toString(a, b) {
  if (isLine(a)) {
    guard2(a, `a`);
    b = a.b;
    a = a.a;
  } else if (b === void 0)
    throw new Error(`Expect second point if first is a point`);
  return Point_exports.toString(a) + `-` + Point_exports.toString(b);
}
var fromNumbers = (x1, y1, x2, y2) => {
  if (Number.isNaN(x1))
    throw new Error(`x1 is NaN`);
  if (Number.isNaN(x2))
    throw new Error(`x2 is NaN`);
  if (Number.isNaN(y1))
    throw new Error(`y1 is NaN`);
  if (Number.isNaN(y2))
    throw new Error(`y2 is NaN`);
  const a = { x: x1, y: y1 };
  const b = { x: x2, y: y2 };
  return fromPoints(a, b);
};
var toFlatArray = (a, b) => [a.x, a.y, b.x, b.y];
var toSvgString = (a, b) => [`M${a.x} ${a.y} L ${b.x} ${b.y}`];
var fromFlatArray = (arr) => {
  if (!Array.isArray(arr))
    throw new Error(`arr parameter is not an array`);
  if (arr.length !== 4)
    throw new Error(`array is expected to have length four`);
  return fromNumbers(arr[0], arr[1], arr[2], arr[3]);
};
var fromPoints = (a, b) => {
  guard(a, `a`);
  guard(b, `b`);
  a = Object.freeze({ ...a });
  b = Object.freeze({ ...b });
  return Object.freeze({
    a,
    b
  });
};
var joinPointsToLines = (...points) => {
  const lines = [];
  let start2 = points[0];
  for (let i = 1; i < points.length; i++) {
    lines.push(fromPoints(start2, points[i]));
    start2 = points[i];
  }
  return lines;
};
var fromPointsToPath = (a, b) => toPath(fromPoints(a, b));
var bbox = (line3) => Point_exports.bbox(line3.a, line3.b);
var toPath = (line3) => {
  const { a, b } = line3;
  return Object.freeze({
    ...line3,
    length: () => length(a, b),
    interpolate: (amount) => interpolate(amount, a, b),
    bbox: () => bbox(line3),
    toString: () => toString(a, b),
    toFlatArray: () => toFlatArray(a, b),
    toSvgString: () => toSvgString(a, b),
    toPoints: () => [a, b],
    rotate: (amountRadian, origin) => toPath(rotate(line3, amountRadian, origin)),
    sum: (point3) => toPath(sum(line3, point3)),
    divide: (point3) => toPath(divide(line3, point3)),
    multiply: (point3) => toPath(multiply(line3, point3)),
    subtract: (point3) => toPath(subtract(line3, point3)),
    apply: (fn) => toPath(apply(line3, fn)),
    kind: `line`
  });
};
var rotate = (line3, amountRadian, origin) => {
  if (amountRadian === void 0 || amountRadian === 0)
    return line3;
  if (origin === void 0)
    origin = 0.5;
  if (typeof origin === `number`) {
    origin = interpolate(origin, line3.a, line3.b);
  }
  return Object.freeze({
    ...line3,
    a: Point_exports.rotate(line3.a, amountRadian, origin),
    b: Point_exports.rotate(line3.b, amountRadian, origin)
  });
};

// src/geometry/Rect.ts
var Rect_exports = {};
__export(Rect_exports, {
  area: () => area,
  center: () => center,
  corners: () => corners,
  distanceFromCenter: () => distanceFromCenter,
  distanceFromExterior: () => distanceFromExterior,
  edges: () => edges,
  empty: () => empty2,
  emptyPositioned: () => emptyPositioned,
  fromCenter: () => fromCenter,
  fromElement: () => fromElement,
  fromTopLeft: () => fromTopLeft,
  getEdgeX: () => getEdgeX,
  getEdgeY: () => getEdgeY,
  guard: () => guard3,
  intersectsPoint: () => intersectsPoint,
  isEmpty: () => isEmpty3,
  isEqual: () => isEqual,
  isEqualSize: () => isEqualSize,
  isPlaceholder: () => isPlaceholder,
  isPositioned: () => isPositioned,
  isRect: () => isRect,
  isRectPositioned: () => isRectPositioned,
  lengths: () => lengths,
  maxFromCorners: () => maxFromCorners,
  multiply: () => multiply2,
  perimeter: () => perimeter,
  placeholder: () => placeholder,
  placeholderPositioned: () => placeholderPositioned,
  subtract: () => subtract2
});
var empty2 = Object.freeze({ width: 0, height: 0 });
var emptyPositioned = Object.freeze({ x: 0, y: 0, width: 0, height: 0 });
var placeholder = Object.freeze({ width: Number.NaN, height: Number.NaN });
var placeholderPositioned = Object.freeze({ x: Number.NaN, y: Number.NaN, width: Number.NaN, height: Number.NaN });
var isEmpty3 = (rect2) => rect2.width === 0 && rect2.height === 0;
var isPlaceholder = (rect2) => Number.isNaN(rect2.width) && Number.isNaN(rect2.height);
var isPositioned = (p) => p.x !== void 0 && p.y !== void 0;
var isRect = (p) => {
  if (p === void 0)
    return false;
  if (p.width === void 0)
    return false;
  if (p.height === void 0)
    return false;
  return true;
};
var isRectPositioned = (p) => isRect(p) && isPositioned(p);
var fromElement = (el) => ({ width: el.clientWidth, height: el.clientHeight });
var isEqualSize = (a, b) => {
  if (a === void 0)
    throw new Error(`a undefined`);
  if (b === void 0)
    throw new Error(`b undefined`);
  return a.width === b.width && a.height === b.height;
};
var isEqual = (a, b) => {
  if (isPositioned(a) && isPositioned(b)) {
    if (!Point_exports.isEqual(a, b))
      return false;
    return a.width === b.width && a.height === b.height;
  } else if (!isPositioned(a) && !isPositioned(b)) {
    return a.width === b.width && a.height === b.height;
  } else {
    return false;
  }
};
function subtract2(a, b, c) {
  if (a === void 0)
    throw new Error(`First parameter undefined`);
  if (typeof b === `number`) {
    const height = c === void 0 ? 0 : c;
    return Object.freeze({
      ...a,
      width: a.width - b,
      height: a.height - height
    });
  } else {
    return Object.freeze({
      ...a,
      width: a.width - b.width,
      height: a.height - b.height
    });
  }
}
function intersectsPoint(rect2, a, b) {
  guard3(rect2, `rect`);
  let x = 0;
  let y = 0;
  if (typeof a === `number`) {
    if (b === void 0)
      throw new Error(`x and y coordinate needed`);
    x = a;
    y = b;
  } else {
    x = a.x;
    y = a.y;
  }
  if (isPositioned(rect2)) {
    if (x - rect2.x > rect2.width || x < rect2.x)
      return false;
    if (y - rect2.y > rect2.height || y < rect2.y)
      return false;
  } else {
    if (x > rect2.width || x < 0)
      return false;
    if (y > rect2.height || y < 0)
      return false;
  }
  return true;
}
var fromCenter = (origin, width, height) => {
  Point_exports.guard(origin, `origin`);
  guardDim(width, `width`);
  guardDim(height, `height`);
  const halfW = width / 2;
  const halfH = height / 2;
  return { x: origin.x - halfW, y: origin.y - halfH, width, height };
};
var distanceFromExterior = (rect2, pt) => {
  guardPositioned(rect2, `rect`);
  Point_exports.guard(pt, `pt`);
  if (intersectsPoint(rect2, pt))
    return 0;
  const dx = Math.max(rect2.x - pt.x, 0, pt.x - rect2.x + rect2.width);
  const dy = Math.max(rect2.y - pt.y, 0, pt.y - rect2.y + rect2.height);
  return Math.sqrt(dx * dx + dy * dy);
};
var distanceFromCenter = (rect2, pt) => Point_exports.distance(center(rect2), pt);
var maxFromCorners = (topLeft, topRight, bottomRight, bottomLeft) => {
  if (topLeft.y > bottomRight.y)
    throw new Error(`topLeft.y greater than bottomRight.y`);
  if (topLeft.y > bottomLeft.y)
    throw new Error(`topLeft.y greater than bottomLeft.y`);
  const w1 = topRight.x - topLeft.x;
  const w2 = bottomRight.x - bottomLeft.x;
  const h1 = Math.abs(bottomLeft.y - topLeft.y);
  const h2 = Math.abs(bottomRight.y - topRight.y);
  return {
    x: Math.min(topLeft.x, bottomLeft.x),
    y: Math.min(topRight.y, topLeft.y),
    width: Math.max(w1, w2),
    height: Math.max(h1, h2)
  };
};
var guardDim = (d, name = `Dimension`) => {
  if (d === void 0)
    throw Error(`${name} is undefined`);
  if (isNaN(d))
    throw Error(`${name} is NaN`);
  if (d < 0)
    throw Error(`${name} cannot be negative`);
};
var guard3 = (rect2, name = `rect`) => {
  if (rect2 === void 0)
    throw Error(`{$name} undefined`);
  if (isPositioned(rect2))
    Point_exports.guard(rect2, name);
  guardDim(rect2.width, name + `.width`);
  guardDim(rect2.height, name + `.height`);
};
var guardPositioned = (rect2, name = `rect`) => {
  if (!isPositioned(rect2))
    throw new Error(`Expected ${name} to have x,y`);
  guard3(rect2, name);
};
var fromTopLeft = (origin, width, height) => {
  guardDim(width, `width`);
  guardDim(height, `height`);
  Point_exports.guard(origin, `origin`);
  return { x: origin.x, y: origin.y, width, height };
};
var corners = (rect2, origin) => {
  guard3(rect2);
  if (origin === void 0 && Point_exports.isPoint(rect2))
    origin = rect2;
  else if (origin === void 0)
    throw new Error(`Unpositioned rect needs origin param`);
  return [
    { x: origin.x, y: origin.y },
    { x: origin.x + rect2.width, y: origin.y },
    { x: origin.x + rect2.width, y: origin.y + rect2.height },
    { x: origin.x, y: origin.y + rect2.height }
  ];
};
var getEdgeX = (rect2, edge) => {
  guard3(rect2);
  switch (edge) {
    case `top`:
      return Point_exports.isPoint(rect2) ? rect2.x : 0;
    case `bottom`:
      return Point_exports.isPoint(rect2) ? rect2.x : 0;
    case `left`:
      return Point_exports.isPoint(rect2) ? rect2.y : 0;
    case `right`:
      return Point_exports.isPoint(rect2) ? rect2.x + rect2.width : rect2.width;
  }
};
var getEdgeY = (rect2, edge) => {
  guard3(rect2);
  switch (edge) {
    case `top`:
      return Point_exports.isPoint(rect2) ? rect2.y : 0;
    case `bottom`:
      return Point_exports.isPoint(rect2) ? rect2.y + rect2.height : rect2.height;
    case `left`:
      return Point_exports.isPoint(rect2) ? rect2.y : 0;
    case `right`:
      return Point_exports.isPoint(rect2) ? rect2.y : 0;
  }
};
var multiply2 = (a, b, c) => {
  guard3(a, `a`);
  if (isRect(b)) {
    if (isRectPositioned(a)) {
      return {
        ...a,
        x: a.x * b.width,
        y: a.y * b.height,
        width: a.width * b.width,
        height: a.width * b.height
      };
    } else {
      return {
        ...a,
        width: a.width * b.width,
        height: a.width * b.height
      };
    }
  } else {
    if (typeof b !== `number`)
      throw new Error(`Expected second parameter of type Rect or number. Got ${JSON.stringify(b)}`);
    if (c === void 0)
      c = b;
    if (isRectPositioned(a)) {
      return {
        ...a,
        x: a.x * b,
        y: a.y * c,
        width: a.width * b,
        height: a.width * c
      };
    } else {
      return {
        ...a,
        width: a.width * b,
        height: a.width * c
      };
    }
  }
};
var center = (rect2, origin) => {
  guard3(rect2);
  if (origin === void 0 && Point_exports.isPoint(rect2))
    origin = rect2;
  else if (origin === void 0)
    origin = { x: 0, y: 0 };
  return Object.freeze({
    x: origin.x + rect2.width / 2,
    y: origin.y + rect2.height / 2
  });
};
var lengths = (rect2) => {
  guardPositioned(rect2, `rect`);
  return edges(rect2).map((l) => Line_exports.length(l));
};
var edges = (rect2, origin) => Line_exports.joinPointsToLines(...corners(rect2, origin));
var perimeter = (rect2) => {
  guard3(rect2);
  return rect2.height + rect2.height + rect2.width + rect2.width;
};
var area = (rect2) => {
  guard3(rect2);
  return rect2.height * rect2.width;
};

// src/geometry/Point.ts
var getPointParam = (a, b) => {
  if (a === void 0)
    return { x: 0, y: 0 };
  if (Point_exports.isPoint(a)) {
    return a;
  } else if (typeof a !== `number` || typeof b !== `number`) {
    throw new Error(`Expected point or x,y as parameters. Got: a: ${JSON.stringify(a)} b: ${JSON.stringify(b)}`);
  } else {
    return { x: a, y: b };
  }
};
var dotProduct2 = (...pts) => {
  const a = pts.map((p) => Point_exports.toArray(p));
  return Arrays_exports.dotProduct(a);
};
var Empty = Object.freeze({ x: 0, y: 0 });
var Placeholder = Object.freeze({ x: NaN, y: NaN });
var isEmpty4 = (p) => p.x === 0 && p.y === 0;
var isPlaceholder2 = (p) => Number.isNaN(p.x) && Number.isNaN(p.y);
var center2 = (shape) => {
  if (shape === void 0) {
    return Object.freeze({ x: 0.5, y: 0.5 });
  } else if (Rect_exports.isRect(shape)) {
    return Rect_exports.center(shape);
  } else {
    throw new Error(`Unknown shape: ${JSON.stringify(shape)}`);
  }
};
var findMinimum = (compareFn, ...points) => {
  if (points.length === 0)
    throw new Error(`No points provided`);
  let min3 = points[0];
  points.forEach((p) => {
    min3 = compareFn(min3, p);
  });
  return min3;
};
function distance2(a, xOrB, y) {
  const pt = getPointParam(xOrB, y);
  guard(pt);
  return Math.hypot(pt.x - a.x, pt.y - a.y);
}
var distanceToExterior = (a, shape) => {
  if (Rect_exports.isRectPositioned(shape)) {
    return Rect_exports.distanceFromExterior(shape, a);
  }
  if (Circle_exports.isCirclePositioned(shape)) {
    return Circle_exports.distanceFromExterior(shape, a);
  }
  if (isPoint(shape))
    return distance2(a, shape);
  throw new Error(`Unknown shape`);
};
var distanceToCenter = (a, shape) => {
  if (Rect_exports.isRectPositioned(shape)) {
    return Rect_exports.distanceFromExterior(shape, a);
  }
  if (Circle_exports.isCirclePositioned(shape)) {
    return Circle_exports.distanceFromExterior(shape, a);
  }
  if (isPoint(shape))
    return distance2(a, shape);
  throw new Error(`Unknown shape`);
};
var guard = (p, name = `Point`) => {
  if (p === void 0)
    throw new Error(`'${name}' is undefined. Expected {x,y} got ${JSON.stringify(p)}`);
  if (p === null)
    throw new Error(`'${name}' is null. Expected {x,y} got ${JSON.stringify(p)}`);
  if (p.x === void 0)
    throw new Error(`'${name}.x' is undefined. Expected {x,y} got ${JSON.stringify(p)}`);
  if (p.y === void 0)
    throw new Error(`'${name}.y' is undefined. Expected {x,y} got ${JSON.stringify(p)}`);
  if (typeof p.x !== `number`)
    throw new Error(`'${name}.x' must be a number. Got ${p.x}`);
  if (typeof p.y !== `number`)
    throw new Error(`'${name}.y' must be a number. Got ${p.y}`);
  if (Number.isNaN(p.x))
    throw new Error(`'${name}.x' is NaN`);
  if (Number.isNaN(p.y))
    throw new Error(`'${name}.y' is NaN`);
};
var guardNonZeroPoint = (pt, name = `pt`) => {
  guard(pt, name);
  number(pt.x, `nonZero`, `${name}.x`);
  number(pt.y, `nonZero`, `${name}.y`);
  return true;
};
var angle = (a, b) => {
  if (b === void 0) {
    return Math.atan2(a.y, a.x);
  }
  return Math.atan2(b.y - a.y, b.x - a.x);
};
var centroid = (...points) => {
  if (!Array.isArray(points))
    throw new Error(`Expected list of points`);
  const sum3 = points.reduce((prev, p) => {
    if (Array.isArray(p))
      throw new Error(`'points' list contains an array. Did you mean: centroid(...myPoints)?`);
    if (!isPoint(p))
      throw new Error(`'points' contains something which is not a point: ${JSON.stringify(p)}`);
    return {
      x: prev.x + p.x,
      y: prev.y + p.y
    };
  }, { x: 0, y: 0 });
  return Object.freeze({
    x: sum3.x / points.length,
    y: sum3.y / points.length
  });
};
var bbox2 = (...points) => {
  const leftMost = findMinimum((a, b) => {
    if (a.x < b.x)
      return a;
    else
      return b;
  }, ...points);
  const rightMost = findMinimum((a, b) => {
    if (a.x > b.x)
      return a;
    else
      return b;
  }, ...points);
  const topMost = findMinimum((a, b) => {
    if (a.y < b.y)
      return a;
    else
      return b;
  }, ...points);
  const bottomMost = findMinimum((a, b) => {
    if (a.y > b.y)
      return a;
    else
      return b;
  }, ...points);
  const topLeft = { x: leftMost.x, y: topMost.y };
  const topRight = { x: rightMost.x, y: topMost.y };
  const bottomRight = { x: rightMost.x, y: bottomMost.y };
  const bottomLeft = { x: leftMost.x, y: bottomMost.y };
  return Rect_exports.maxFromCorners(topLeft, topRight, bottomRight, bottomLeft);
};
var isPoint = (p) => {
  if (p === void 0)
    return false;
  if (p === null)
    return false;
  if (p.x === void 0)
    return false;
  if (p.y === void 0)
    return false;
  return true;
};
var isPoint3d = (p) => {
  if (p === void 0)
    return false;
  if (p === null)
    return false;
  if (p.x === void 0)
    return false;
  if (p.y === void 0)
    return false;
  if (p.z === void 0)
    return false;
  return true;
};
var toArray2 = (p) => [p.x, p.y];
var toString2 = (p) => {
  if (p === void 0)
    return `(undefined)`;
  if (p === null)
    return `(null)`;
  if (p.z !== void 0) {
    return `(${p.x},${p.y},${p.z})`;
  } else {
    return `(${p.x},${p.y})`;
  }
};
var isEqual2 = (...p) => {
  if (p === void 0)
    throw new Error(`parameter 'p' is undefined`);
  if (p.length < 2)
    return true;
  for (let i = 1; i < p.length; i++) {
    if (p[i].x !== p[0].x)
      return false;
    if (p[i].y !== p[0].y)
      return false;
  }
  return true;
};
var withinRange2 = (a, b, maxRange) => {
  if (typeof maxRange === `number`) {
    maxRange = { x: maxRange, y: maxRange };
  }
  const x = Math.abs(b.x - a.x);
  const y = Math.abs(b.y - a.y);
  return x <= maxRange.x && y <= maxRange.y;
};
var interpolate2 = (amount, a, b) => interpolate(amount, a, b);
var from = (xOrArray, y) => {
  if (Array.isArray(xOrArray)) {
    if (xOrArray.length !== 2)
      throw new Error(`Expected array of length two, got ` + xOrArray.length);
    return Object.freeze({
      x: xOrArray[0],
      y: xOrArray[1]
    });
  } else {
    if (xOrArray === void 0)
      xOrArray = 0;
    else if (Number.isNaN(xOrArray))
      throw new Error(`x is NaN`);
    if (y === void 0)
      y = 0;
    else if (Number.isNaN(y))
      throw new Error(`y is NaN`);
    return Object.freeze({ x: xOrArray, y });
  }
};
var fromNumbers2 = (...coords) => {
  const pts = [];
  if (Array.isArray(coords[0])) {
    coords.forEach((coord) => {
      if (!(coord.length % 2 === 0))
        throw new Error(`coords array should be even-numbered`);
      pts.push(Object.freeze({ x: coord[0], y: coord[1] }));
    });
  } else {
    if (coords.length % 2 !== 0)
      throw new Error(`Expected even number of elements: [x,y,x,y...]`);
    for (let i = 0; i < coords.length; i += 2) {
      pts.push(Object.freeze({ x: coords[i], y: coords[i + 1] }));
    }
  }
  return pts;
};
function subtract3(a, b, c, d) {
  if (isPoint(a)) {
    guard(a, `a`);
    if (isPoint(b)) {
      guard(b, `b`);
      return Object.freeze({
        x: a.x - b.x,
        y: a.y - b.y
      });
    } else {
      if (c === void 0)
        c = b;
      return Object.freeze({
        x: a.x - b,
        y: a.y - c
      });
    }
  } else {
    number(a, ``, `a`);
    if (typeof b !== `number`)
      throw new Error(`Second parameter is expected to by y value`);
    number(b, ``, `b`);
    if (Number.isNaN(c))
      throw new Error(`Third parameter is NaN`);
    if (Number.isNaN(d))
      throw new Error(`Fourth parameter is NaN`);
    if (c === void 0)
      c = 0;
    if (d === void 0)
      d = 0;
    return Object.freeze({
      x: a - c,
      y: b - d
    });
  }
}
var apply2 = (pt, fn) => Object.freeze({
  ...pt,
  x: fn(pt.x, `x`),
  y: fn(pt.y, `y`)
});
var pipelineApply = (pt, ...pipelineFns) => pipeline(...pipelineFns)(pt);
var pipeline = (...pipeline2) => (pt) => pipeline2.reduce((prev, curr) => curr(prev), pt);
var reduce = (pts, fn, initial = { x: 0, y: 0 }) => {
  let acc = initial;
  pts.forEach((p) => {
    acc = fn(p, acc);
  });
  return acc;
};
var sum2 = function(a, b, c, d) {
  if (a === void 0)
    throw new Error(`a missing. a: ${a}`);
  let ptA;
  let ptB;
  if (isPoint(a)) {
    ptA = a;
    if (b === void 0)
      b = Empty;
    if (isPoint(b)) {
      ptB = b;
    } else {
      if (b === void 0)
        throw new Error(`Expects x coordinate`);
      ptB = { x: b, y: c === void 0 ? b : c };
    }
  } else if (!isPoint(b)) {
    if (b === void 0)
      throw new Error(`Expected number as second param`);
    ptA = { x: a, y: b };
    if (c === void 0)
      throw new Error(`Expects x coordiante`);
    ptB = { x: c, y: d === void 0 ? 0 : d };
  }
  if (ptA === void 0)
    throw new Error(`ptA missing. a: ${a}`);
  if (ptB === void 0)
    throw new Error(`ptB missing. b: ${b}`);
  guard(ptA, `a`);
  guard(ptB, `b`);
  return Object.freeze({
    x: ptA.x + ptB.x,
    y: ptA.y + ptB.y
  });
};
function multiply3(a, bOrX, y) {
  guard(a, `a`);
  if (typeof bOrX === `number`) {
    if (typeof y === `undefined`)
      y = bOrX;
    number(y, ``, `y`);
    number(bOrX, ``, `x`);
    return Object.freeze({ x: a.x * bOrX, y: a.y * y });
  } else if (isPoint(bOrX)) {
    guard(bOrX, `b`);
    return Object.freeze({
      x: a.x * bOrX.x,
      y: a.y * bOrX.y
    });
  } else if (Rect_exports.isRect(bOrX)) {
    Rect_exports.guard(bOrX, `rect`);
    return Object.freeze({
      x: a.x * bOrX.width,
      y: a.y * bOrX.height
    });
  } else
    throw new Error(`Invalid arguments. a: ${JSON.stringify(a)} b: ${JSON.stringify(bOrX)}`);
}
function divide2(a, b, c, d) {
  if (isPoint(a)) {
    guard(a, `a`);
    if (isPoint(b)) {
      guardNonZeroPoint(b);
      return Object.freeze({
        x: a.x / b.x,
        y: a.y / b.y
      });
    } else if (isRect(b)) {
      Rect_exports.guard(b, `rect`);
      return Object.freeze({
        x: a.x / b.width,
        y: a.y / b.height
      });
    } else {
      if (c === void 0)
        c = b;
      guard(a);
      number(b, `nonZero`, `x`);
      number(c, `nonZero`, `y`);
      return Object.freeze({
        x: a.x / b,
        y: a.y / c
      });
    }
  } else {
    if (typeof b !== `number`)
      throw new Error(`expected second parameter to be y1 coord`);
    number(a, `positive`, `x1`);
    number(b, `positive`, `y1`);
    if (c === void 0)
      c = 1;
    if (d === void 0)
      d = c;
    number(c, `nonZero`, `x2`);
    number(d, `nonZero`, `y2`);
    return Object.freeze({
      x: a / c,
      y: b / d
    });
  }
}
var convexHull = (...pts) => {
  const sorted = [...pts].sort(compareByX);
  if (sorted.length === 1)
    return sorted;
  const x = (points) => {
    const v = [];
    points.forEach((p) => {
      while (v.length >= 2) {
        const q = v[v.length - 1];
        const r = v[v.length - 2];
        if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) {
          v.pop();
        } else
          break;
      }
      v.push(p);
    });
    v.pop();
    return v;
  };
  const upper = x(sorted);
  const lower = x(sorted.reverse());
  if (upper.length === 1 && lower.length === 1 && isEqual2(lower[0], upper[0]))
    return upper;
  return upper.concat(lower);
};
var compare2 = (a, b) => {
  if (a.x < b.x || a.y < b.y)
    return -1;
  if (a.x > b.x || a.y > b.y)
    return 1;
  return 0;
};
var compareByX = (a, b) => a.x - b.x || a.y - b.y;
var project = (origin, distance3, angle2) => {
  const x = Math.cos(angle2) * distance3 + origin.x;
  const y = Math.sin(angle2) * distance3 + origin.y;
  return { x, y };
};
function rotate2(pt, amountRadian, origin) {
  if (origin === void 0)
    origin = { x: 0, y: 0 };
  guard(origin, `origin`);
  number(amountRadian, ``, `amountRadian`);
  const arrayInput = Array.isArray(pt);
  if (amountRadian === 0)
    return pt;
  if (!arrayInput) {
    pt = [pt];
  }
  const ptAr = pt;
  ptAr.forEach((p, index) => guard(p, `pt[${index}]`));
  const asPolar = ptAr.map((p) => Polar_exports.fromCartesian(p, origin));
  const rotated = asPolar.map((p) => Polar_exports.rotate(p, amountRadian));
  const asCartesisan = rotated.map((p) => Polar_exports.toCartesian(p, origin));
  if (arrayInput)
    return asCartesisan;
  else
    return asCartesisan[0];
}
var rotatePointArray = (v, amountRadian) => {
  const mat = [[Math.cos(amountRadian), -Math.sin(amountRadian)], [Math.sin(amountRadian), Math.cos(amountRadian)]];
  const result = [];
  for (let i = 0; i < v.length; ++i) {
    result[i] = [mat[0][0] * v[i][0] + mat[0][1] * v[i][1], mat[1][0] * v[i][0] + mat[1][1] * v[i][1]];
  }
  return result;
};
var length2 = (ptOrX, y) => {
  if (isPoint(ptOrX)) {
    y = ptOrX.y;
    ptOrX = ptOrX.x;
  }
  if (y === void 0)
    throw new Error(`Expected y`);
  return Math.sqrt(ptOrX * ptOrX + y * y);
};
var normalise = (ptOrX, y) => {
  const pt = getPointParam(ptOrX, y);
  const l = length2(pt);
  if (l === 0)
    return Point_exports.Empty;
  return Object.freeze({
    x: pt.x / l,
    y: pt.y / l
  });
};
function normaliseByRect2(a, b, c, d) {
  if (isPoint(a)) {
    if (typeof b === `number` && c !== void 0) {
      number(b, `positive`, `width`);
      number(c, `positive`, `height`);
    } else {
      if (!Rect_exports.isRect(b))
        throw new Error(`Expected second parameter to be a rect`);
      c = b.height;
      b = b.width;
    }
    return Object.freeze({
      x: a.x / b,
      y: a.y / c
    });
  } else {
    number(a, `positive`, `x`);
    if (typeof b !== `number`)
      throw new Error(`Expecting second parameter to be a number (width)`);
    if (typeof c !== `number`)
      throw new Error(`Expecting third parameter to be a number (height)`);
    number(b, `positive`, `y`);
    number(c, `positive`, `width`);
    if (d === void 0)
      throw new Error(`Expected height parameter`);
    number(d, `positive`, `height`);
    return Object.freeze({
      x: a / c,
      y: b / d
    });
  }
}
var random = (rando) => {
  if (rando === void 0)
    rando = defaultRandom;
  return {
    x: rando(),
    y: rando()
  };
};
var wrap2 = (pt, ptMax = { x: 1, y: 1 }, ptMin = { x: 0, y: 0 }) => {
  guard(pt, `pt`);
  guard(ptMax, `ptMax`);
  guard(ptMin, `ptMin`);
  return Object.freeze({
    x: wrap(pt.x, ptMin.x, ptMax.x),
    y: wrap(pt.y, ptMin.y, ptMax.y)
  });
};
var invert = (pt, what = `both`) => {
  switch (what) {
    case `both`:
      if (isPoint3d(pt)) {
        return Object.freeze({
          ...pt,
          x: pt.x * -1,
          y: pt.y * -1,
          z: pt.z * -1
        });
      } else {
        return Object.freeze({
          ...pt,
          x: pt.x * -1,
          y: pt.y * -1
        });
      }
    case `x`:
      return Object.freeze({
        ...pt,
        x: pt.x * -1
      });
    case `y`:
      return Object.freeze({
        ...pt,
        y: pt.y * -1
      });
    case `z`:
      if (isPoint3d(pt)) {
        return Object.freeze({
          ...pt,
          z: pt.z * -1
        });
      } else
        throw new Error(`pt parameter is missing z`);
    default:
      throw new Error(`Unknown what parameter. Expecting 'both', 'x' or 'y'`);
  }
};
var toIntegerValues = (pt, rounder = Math.round) => {
  guard(pt, `pt`);
  return Object.freeze({
    x: rounder(pt.x),
    y: rounder(pt.y)
  });
};
var clampMagnitude = (pt, m) => {
  const length5 = distance2(pt);
  if (length5 > m) {
    const ratio = m / length5;
    return multiply3(pt, ratio, ratio);
  }
  return pt;
};
function clamp2(a, b, c, d) {
  if (isPoint(a)) {
    if (b === void 0)
      b = 0;
    if (c === void 0)
      c = 1;
    number(b, ``, `min`);
    number(c, ``, `max`);
    return Object.freeze({
      x: clamp(a.x, b, c),
      y: clamp(a.y, b, c)
    });
  } else {
    if (b === void 0)
      throw new Error(`Expected y coordinate`);
    if (c === void 0)
      c = 0;
    if (d === void 0)
      d = 1;
    number(a, ``, `x`);
    number(b, ``, `y`);
    number(c, ``, `min`);
    number(d, ``, `max`);
    return Object.freeze({
      x: clamp(a, c, d),
      y: clamp(b, c, d)
    });
  }
}
var relation = (a, b) => {
  const start2 = getPointParam(a, b);
  let totalX = 0;
  let totalY = 0;
  let count = 0;
  const update = (aa, bb) => {
    const p = getPointParam(aa, bb);
    totalX += p.x;
    totalY += p.y;
    count++;
    return Object.freeze({
      angle: angle(p, start2),
      distance: distance2(p, start2),
      centroid: centroid(p, start2),
      average: {
        x: totalX / count,
        y: totalY / count
      }
    });
  };
  return update;
};

// src/geometry/Arc.ts
var isArc = (p) => p.startRadian !== void 0 && p.endRadian !== void 0;
var isPositioned2 = (p) => p.x !== void 0 && p.y !== void 0;
var piPi = Math.PI * 2;
function fromDegrees(radius, startDegrees, endDegrees, origin) {
  const a = {
    radius,
    startRadian: degreeToRadian(startDegrees),
    endRadian: degreeToRadian(endDegrees)
  };
  if (isPoint(origin)) {
    guard(origin);
    const ap = {
      ...a,
      x: origin.x,
      y: origin.y
    };
    return Object.freeze(ap);
  } else {
    return Object.freeze(a);
  }
}
var toLine = (arc2) => Line_exports.fromPoints(point(arc2, arc2.startRadian), point(arc2, arc2.endRadian));
var point = (arc2, angleRadian2, origin) => {
  if (angleRadian2 > arc2.endRadian)
    throw new Error(`angleRadian beyond end angle of arc`);
  if (angleRadian2 < arc2.startRadian)
    throw new Error(`angleRadian beyond start angle of arc`);
  if (origin === void 0) {
    if (isPositioned2(arc2)) {
      origin = arc2;
    } else {
      origin = { x: 0, y: 0 };
    }
  }
  return {
    x: Math.cos(angleRadian2) * arc2.radius + origin.x,
    y: Math.sin(angleRadian2) * arc2.radius + origin.y
  };
};
var guard4 = (arc2) => {
  if (arc2 === void 0)
    throw new Error(`Arc is undefined`);
  if (isPositioned2(arc2)) {
    guard(arc2, `arc`);
  }
  if (arc2.radius === void 0)
    throw new Error(`Arc radius is undefined (${JSON.stringify(arc2)})`);
  if (typeof arc2.radius !== `number`)
    throw new Error(`Radius must be a number`);
  if (Number.isNaN(arc2.radius))
    throw new Error(`Radius is NaN`);
  if (arc2.radius <= 0)
    throw new Error(`Radius must be greater than zero`);
  if (arc2.startRadian === void 0)
    throw new Error(`Arc is missing 'startRadian' field`);
  if (arc2.endRadian === void 0)
    throw new Error(`Arc is missing 'startRadian' field`);
  if (Number.isNaN(arc2.endRadian))
    throw new Error(`Arc endRadian is NaN`);
  if (Number.isNaN(arc2.startRadian))
    throw new Error(`Arc endRadian is NaN`);
  if (arc2.startRadian >= arc2.endRadian)
    throw new Error(`startRadian is expected to be les than endRadian`);
};
var interpolate3 = (amount, arc2, origin) => {
  guard4(arc2);
  return point(arc2, arc2.startRadian + (arc2.endRadian - arc2.startRadian) * amount, origin);
};
var toPath2 = (arc2) => {
  guard4(arc2);
  return Object.freeze({
    ...arc2,
    interpolate: (amount) => interpolate3(amount, arc2),
    bbox: () => bbox3(arc2),
    length: () => length3(arc2),
    toSvgString: () => toSvg(arc2),
    kind: `arc`
  });
};
var length3 = (arc2) => piPi * arc2.radius * ((arc2.startRadian - arc2.endRadian) / piPi);
var bbox3 = (arc2) => {
  if (isPositioned2(arc2)) {
    const middle = interpolate3(0.5, arc2);
    const asLine = toLine(arc2);
    return Point_exports.bbox(middle, asLine.a, asLine.b);
  } else {
    return {
      width: arc2.radius * 2,
      height: arc2.radius * 2
    };
  }
};
var toSvg = (a, b, c, d, e) => {
  if (isArc(a)) {
    if (isPositioned2(a)) {
      return toSvgFull(a, a.radius, a.startRadian, a.endRadian, b);
    } else {
      if (isPoint(b)) {
        return toSvgFull(b, a.radius, a.startRadian, a.endRadian, c);
      } else {
        return toSvgFull({ x: 0, y: 0 }, a.radius, a.startRadian, a.endRadian);
      }
    }
  } else {
    if (c === void 0)
      throw new Error(`startAngle undefined`);
    if (d === void 0)
      throw new Error(`endAngle undefined`);
    if (isPoint(a)) {
      if (typeof b === `number` && typeof c === `number` && typeof d === `number`) {
        return toSvgFull(a, b, c, d, e);
      } else {
        throw new Error(`Expected (point, number, number, number). Missing a number param.`);
      }
    } else {
      throw new Error(`Expected (point, number, number, number). Missing first point.`);
    }
  }
};
var toSvgFull = (origin, radius, startRadian, endRadian, opts) => {
  if (opts === void 0 || typeof opts !== `object`)
    opts = {};
  const isFullCircle = endRadian - startRadian === 360;
  const start2 = Polar_exports.toCartesian(radius, endRadian - 0.01, origin);
  const end = Polar_exports.toCartesian(radius, startRadian, origin);
  const { largeArc = false, sweep = false } = opts;
  const d = [`
    M ${start2.x} ${start2.y}
    A ${radius} ${radius} 0 ${largeArc ? `1` : `0`} ${sweep ? `1` : `0`} ${end.x} ${end.y},
  `];
  if (isFullCircle)
    d.push(`z`);
  return d;
};
var distanceCenter = (a, b) => Point_exports.distance(a, b);
var isEquals = (a, b) => {
  if (a.radius !== b.radius)
    return false;
  if (isPositioned2(a) && isPositioned2(b)) {
    if (a.x !== b.x)
      return false;
    if (a.y !== b.y)
      return false;
    if (a.z !== b.z)
      return false;
    return true;
  } else if (!isPositioned2(a) && !isPositioned2(b)) {
  } else
    return false;
  if (a.endRadian !== b.endRadian)
    return false;
  if (a.startRadian !== b.startRadian)
    return false;
  return true;
};

// src/geometry/Bezier.ts
var Bezier_exports = {};
__export(Bezier_exports, {
  computeQuadraticSimple: () => computeQuadraticSimple,
  cubic: () => cubic,
  isCubicBezier: () => isCubicBezier,
  isQuadraticBezier: () => isQuadraticBezier,
  quadratic: () => quadratic,
  quadraticBend: () => quadraticBend,
  quadraticSimple: () => quadraticSimple,
  quadraticToSvgString: () => quadraticToSvgString,
  toPath: () => toPath3
});

// node_modules/bezier-js/src/utils.js
var { abs, cos, sin, acos, atan2, sqrt, pow } = Math;
function crt(v) {
  return v < 0 ? -pow(-v, 1 / 3) : pow(v, 1 / 3);
}
var pi = Math.PI;
var tau = 2 * pi;
var quart = pi / 2;
var epsilon = 1e-6;
var nMax = Number.MAX_SAFE_INTEGER || 9007199254740991;
var nMin = Number.MIN_SAFE_INTEGER || -9007199254740991;
var ZERO = { x: 0, y: 0, z: 0 };
var utils = {
  Tvalues: [
    -0.06405689286260563,
    0.06405689286260563,
    -0.1911188674736163,
    0.1911188674736163,
    -0.3150426796961634,
    0.3150426796961634,
    -0.4337935076260451,
    0.4337935076260451,
    -0.5454214713888396,
    0.5454214713888396,
    -0.6480936519369755,
    0.6480936519369755,
    -0.7401241915785544,
    0.7401241915785544,
    -0.820001985973903,
    0.820001985973903,
    -0.8864155270044011,
    0.8864155270044011,
    -0.9382745520027328,
    0.9382745520027328,
    -0.9747285559713095,
    0.9747285559713095,
    -0.9951872199970213,
    0.9951872199970213
  ],
  Cvalues: [
    0.12793819534675216,
    0.12793819534675216,
    0.1258374563468283,
    0.1258374563468283,
    0.12167047292780339,
    0.12167047292780339,
    0.1155056680537256,
    0.1155056680537256,
    0.10744427011596563,
    0.10744427011596563,
    0.09761865210411388,
    0.09761865210411388,
    0.08619016153195327,
    0.08619016153195327,
    0.0733464814110803,
    0.0733464814110803,
    0.05929858491543678,
    0.05929858491543678,
    0.04427743881741981,
    0.04427743881741981,
    0.028531388628933663,
    0.028531388628933663,
    0.0123412297999872,
    0.0123412297999872
  ],
  arcfn: function(t4, derivativeFn) {
    const d = derivativeFn(t4);
    let l = d.x * d.x + d.y * d.y;
    if (typeof d.z !== "undefined") {
      l += d.z * d.z;
    }
    return sqrt(l);
  },
  compute: function(t4, points, _3d) {
    if (t4 === 0) {
      points[0].t = 0;
      return points[0];
    }
    const order = points.length - 1;
    if (t4 === 1) {
      points[order].t = 1;
      return points[order];
    }
    const mt = 1 - t4;
    let p = points;
    if (order === 0) {
      points[0].t = t4;
      return points[0];
    }
    if (order === 1) {
      const ret = {
        x: mt * p[0].x + t4 * p[1].x,
        y: mt * p[0].y + t4 * p[1].y,
        t: t4
      };
      if (_3d) {
        ret.z = mt * p[0].z + t4 * p[1].z;
      }
      return ret;
    }
    if (order < 4) {
      let mt2 = mt * mt, t22 = t4 * t4, a, b, c, d = 0;
      if (order === 2) {
        p = [p[0], p[1], p[2], ZERO];
        a = mt2;
        b = mt * t4 * 2;
        c = t22;
      } else if (order === 3) {
        a = mt2 * mt;
        b = mt2 * t4 * 3;
        c = mt * t22 * 3;
        d = t4 * t22;
      }
      const ret = {
        x: a * p[0].x + b * p[1].x + c * p[2].x + d * p[3].x,
        y: a * p[0].y + b * p[1].y + c * p[2].y + d * p[3].y,
        t: t4
      };
      if (_3d) {
        ret.z = a * p[0].z + b * p[1].z + c * p[2].z + d * p[3].z;
      }
      return ret;
    }
    const dCpts = JSON.parse(JSON.stringify(points));
    while (dCpts.length > 1) {
      for (let i = 0; i < dCpts.length - 1; i++) {
        dCpts[i] = {
          x: dCpts[i].x + (dCpts[i + 1].x - dCpts[i].x) * t4,
          y: dCpts[i].y + (dCpts[i + 1].y - dCpts[i].y) * t4
        };
        if (typeof dCpts[i].z !== "undefined") {
          dCpts[i] = dCpts[i].z + (dCpts[i + 1].z - dCpts[i].z) * t4;
        }
      }
      dCpts.splice(dCpts.length - 1, 1);
    }
    dCpts[0].t = t4;
    return dCpts[0];
  },
  computeWithRatios: function(t4, points, ratios, _3d) {
    const mt = 1 - t4, r = ratios, p = points;
    let f1 = r[0], f2 = r[1], f3 = r[2], f4 = r[3], d;
    f1 *= mt;
    f2 *= t4;
    if (p.length === 2) {
      d = f1 + f2;
      return {
        x: (f1 * p[0].x + f2 * p[1].x) / d,
        y: (f1 * p[0].y + f2 * p[1].y) / d,
        z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z) / d,
        t: t4
      };
    }
    f1 *= mt;
    f2 *= 2 * mt;
    f3 *= t4 * t4;
    if (p.length === 3) {
      d = f1 + f2 + f3;
      return {
        x: (f1 * p[0].x + f2 * p[1].x + f3 * p[2].x) / d,
        y: (f1 * p[0].y + f2 * p[1].y + f3 * p[2].y) / d,
        z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z + f3 * p[2].z) / d,
        t: t4
      };
    }
    f1 *= mt;
    f2 *= 1.5 * mt;
    f3 *= 3 * mt;
    f4 *= t4 * t4 * t4;
    if (p.length === 4) {
      d = f1 + f2 + f3 + f4;
      return {
        x: (f1 * p[0].x + f2 * p[1].x + f3 * p[2].x + f4 * p[3].x) / d,
        y: (f1 * p[0].y + f2 * p[1].y + f3 * p[2].y + f4 * p[3].y) / d,
        z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z + f3 * p[2].z + f4 * p[3].z) / d,
        t: t4
      };
    }
  },
  derive: function(points, _3d) {
    const dpoints = [];
    for (let p = points, d = p.length, c = d - 1; d > 1; d--, c--) {
      const list = [];
      for (let j = 0, dpt; j < c; j++) {
        dpt = {
          x: c * (p[j + 1].x - p[j].x),
          y: c * (p[j + 1].y - p[j].y)
        };
        if (_3d) {
          dpt.z = c * (p[j + 1].z - p[j].z);
        }
        list.push(dpt);
      }
      dpoints.push(list);
      p = list;
    }
    return dpoints;
  },
  between: function(v, m, M) {
    return m <= v && v <= M || utils.approximately(v, m) || utils.approximately(v, M);
  },
  approximately: function(a, b, precision) {
    return abs(a - b) <= (precision || epsilon);
  },
  length: function(derivativeFn) {
    const z = 0.5, len = utils.Tvalues.length;
    let sum3 = 0;
    for (let i = 0, t4; i < len; i++) {
      t4 = z * utils.Tvalues[i] + z;
      sum3 += utils.Cvalues[i] * utils.arcfn(t4, derivativeFn);
    }
    return z * sum3;
  },
  map: function(v, ds, de, ts, te) {
    const d1 = de - ds, d2 = te - ts, v2 = v - ds, r = v2 / d1;
    return ts + d2 * r;
  },
  lerp: function(r, v1, v2) {
    const ret = {
      x: v1.x + r * (v2.x - v1.x),
      y: v1.y + r * (v2.y - v1.y)
    };
    if (v1.z !== void 0 && v2.z !== void 0) {
      ret.z = v1.z + r * (v2.z - v1.z);
    }
    return ret;
  },
  pointToString: function(p) {
    let s = p.x + "/" + p.y;
    if (typeof p.z !== "undefined") {
      s += "/" + p.z;
    }
    return s;
  },
  pointsToString: function(points) {
    return "[" + points.map(utils.pointToString).join(", ") + "]";
  },
  copy: function(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  angle: function(o, v1, v2) {
    const dx1 = v1.x - o.x, dy1 = v1.y - o.y, dx2 = v2.x - o.x, dy2 = v2.y - o.y, cross = dx1 * dy2 - dy1 * dx2, dot2 = dx1 * dx2 + dy1 * dy2;
    return atan2(cross, dot2);
  },
  round: function(v, d) {
    const s = "" + v;
    const pos = s.indexOf(".");
    return parseFloat(s.substring(0, pos + 1 + d));
  },
  dist: function(p1, p2) {
    const dx = p1.x - p2.x, dy = p1.y - p2.y;
    return sqrt(dx * dx + dy * dy);
  },
  closest: function(LUT, point3) {
    let mdist = pow(2, 63), mpos, d;
    LUT.forEach(function(p, idx) {
      d = utils.dist(point3, p);
      if (d < mdist) {
        mdist = d;
        mpos = idx;
      }
    });
    return { mdist, mpos };
  },
  abcratio: function(t4, n) {
    if (n !== 2 && n !== 3) {
      return false;
    }
    if (typeof t4 === "undefined") {
      t4 = 0.5;
    } else if (t4 === 0 || t4 === 1) {
      return t4;
    }
    const bottom = pow(t4, n) + pow(1 - t4, n), top = bottom - 1;
    return abs(top / bottom);
  },
  projectionratio: function(t4, n) {
    if (n !== 2 && n !== 3) {
      return false;
    }
    if (typeof t4 === "undefined") {
      t4 = 0.5;
    } else if (t4 === 0 || t4 === 1) {
      return t4;
    }
    const top = pow(1 - t4, n), bottom = pow(t4, n) + top;
    return top / bottom;
  },
  lli8: function(x1, y1, x2, y2, x3, y3, x4, y4) {
    const nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4), ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4), d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (d == 0) {
      return false;
    }
    return { x: nx / d, y: ny / d };
  },
  lli4: function(p1, p2, p3, p4) {
    const x1 = p1.x, y1 = p1.y, x2 = p2.x, y2 = p2.y, x3 = p3.x, y3 = p3.y, x4 = p4.x, y4 = p4.y;
    return utils.lli8(x1, y1, x2, y2, x3, y3, x4, y4);
  },
  lli: function(v1, v2) {
    return utils.lli4(v1, v1.c, v2, v2.c);
  },
  makeline: function(p1, p2) {
    return new Bezier(p1.x, p1.y, (p1.x + p2.x) / 2, (p1.y + p2.y) / 2, p2.x, p2.y);
  },
  findbbox: function(sections) {
    let mx = nMax, my = nMax, MX = nMin, MY = nMin;
    sections.forEach(function(s) {
      const bbox7 = s.bbox();
      if (mx > bbox7.x.min)
        mx = bbox7.x.min;
      if (my > bbox7.y.min)
        my = bbox7.y.min;
      if (MX < bbox7.x.max)
        MX = bbox7.x.max;
      if (MY < bbox7.y.max)
        MY = bbox7.y.max;
    });
    return {
      x: { min: mx, mid: (mx + MX) / 2, max: MX, size: MX - mx },
      y: { min: my, mid: (my + MY) / 2, max: MY, size: MY - my }
    };
  },
  shapeintersections: function(s1, bbox1, s2, bbox22, curveIntersectionThreshold) {
    if (!utils.bboxoverlap(bbox1, bbox22))
      return [];
    const intersections2 = [];
    const a1 = [s1.startcap, s1.forward, s1.back, s1.endcap];
    const a2 = [s2.startcap, s2.forward, s2.back, s2.endcap];
    a1.forEach(function(l1) {
      if (l1.virtual)
        return;
      a2.forEach(function(l2) {
        if (l2.virtual)
          return;
        const iss = l1.intersects(l2, curveIntersectionThreshold);
        if (iss.length > 0) {
          iss.c1 = l1;
          iss.c2 = l2;
          iss.s1 = s1;
          iss.s2 = s2;
          intersections2.push(iss);
        }
      });
    });
    return intersections2;
  },
  makeshape: function(forward, back, curveIntersectionThreshold) {
    const bpl = back.points.length;
    const fpl = forward.points.length;
    const start2 = utils.makeline(back.points[bpl - 1], forward.points[0]);
    const end = utils.makeline(forward.points[fpl - 1], back.points[0]);
    const shape = {
      startcap: start2,
      forward,
      back,
      endcap: end,
      bbox: utils.findbbox([start2, forward, back, end])
    };
    shape.intersections = function(s2) {
      return utils.shapeintersections(shape, shape.bbox, s2, s2.bbox, curveIntersectionThreshold);
    };
    return shape;
  },
  getminmax: function(curve, d, list) {
    if (!list)
      return { min: 0, max: 0 };
    let min3 = nMax, max3 = nMin, t4, c;
    if (list.indexOf(0) === -1) {
      list = [0].concat(list);
    }
    if (list.indexOf(1) === -1) {
      list.push(1);
    }
    for (let i = 0, len = list.length; i < len; i++) {
      t4 = list[i];
      c = curve.get(t4);
      if (c[d] < min3) {
        min3 = c[d];
      }
      if (c[d] > max3) {
        max3 = c[d];
      }
    }
    return { min: min3, mid: (min3 + max3) / 2, max: max3, size: max3 - min3 };
  },
  align: function(points, line3) {
    const tx = line3.p1.x, ty = line3.p1.y, a = -atan2(line3.p2.y - ty, line3.p2.x - tx), d = function(v) {
      return {
        x: (v.x - tx) * cos(a) - (v.y - ty) * sin(a),
        y: (v.x - tx) * sin(a) + (v.y - ty) * cos(a)
      };
    };
    return points.map(d);
  },
  roots: function(points, line3) {
    line3 = line3 || { p1: { x: 0, y: 0 }, p2: { x: 1, y: 0 } };
    const order = points.length - 1;
    const aligned = utils.align(points, line3);
    const reduce2 = function(t4) {
      return 0 <= t4 && t4 <= 1;
    };
    if (order === 2) {
      const a2 = aligned[0].y, b2 = aligned[1].y, c2 = aligned[2].y, d2 = a2 - 2 * b2 + c2;
      if (d2 !== 0) {
        const m1 = -sqrt(b2 * b2 - a2 * c2), m2 = -a2 + b2, v12 = -(m1 + m2) / d2, v2 = -(-m1 + m2) / d2;
        return [v12, v2].filter(reduce2);
      } else if (b2 !== c2 && d2 === 0) {
        return [(2 * b2 - c2) / (2 * b2 - 2 * c2)].filter(reduce2);
      }
      return [];
    }
    const pa = aligned[0].y, pb = aligned[1].y, pc = aligned[2].y, pd = aligned[3].y;
    let d = -pa + 3 * pb - 3 * pc + pd, a = 3 * pa - 6 * pb + 3 * pc, b = -3 * pa + 3 * pb, c = pa;
    if (utils.approximately(d, 0)) {
      if (utils.approximately(a, 0)) {
        if (utils.approximately(b, 0)) {
          return [];
        }
        return [-c / b].filter(reduce2);
      }
      const q3 = sqrt(b * b - 4 * a * c), a2 = 2 * a;
      return [(q3 - b) / a2, (-b - q3) / a2].filter(reduce2);
    }
    a /= d;
    b /= d;
    c /= d;
    const p = (3 * b - a * a) / 3, p3 = p / 3, q = (2 * a * a * a - 9 * a * b + 27 * c) / 27, q2 = q / 2, discriminant = q2 * q2 + p3 * p3 * p3;
    let u1, v1, x1, x2, x3;
    if (discriminant < 0) {
      const mp3 = -p / 3, mp33 = mp3 * mp3 * mp3, r = sqrt(mp33), t4 = -q / (2 * r), cosphi = t4 < -1 ? -1 : t4 > 1 ? 1 : t4, phi = acos(cosphi), crtr = crt(r), t12 = 2 * crtr;
      x1 = t12 * cos(phi / 3) - a / 3;
      x2 = t12 * cos((phi + tau) / 3) - a / 3;
      x3 = t12 * cos((phi + 2 * tau) / 3) - a / 3;
      return [x1, x2, x3].filter(reduce2);
    } else if (discriminant === 0) {
      u1 = q2 < 0 ? crt(-q2) : -crt(q2);
      x1 = 2 * u1 - a / 3;
      x2 = -u1 - a / 3;
      return [x1, x2].filter(reduce2);
    } else {
      const sd = sqrt(discriminant);
      u1 = crt(-q2 + sd);
      v1 = crt(q2 + sd);
      return [u1 - v1 - a / 3].filter(reduce2);
    }
  },
  droots: function(p) {
    if (p.length === 3) {
      const a = p[0], b = p[1], c = p[2], d = a - 2 * b + c;
      if (d !== 0) {
        const m1 = -sqrt(b * b - a * c), m2 = -a + b, v1 = -(m1 + m2) / d, v2 = -(-m1 + m2) / d;
        return [v1, v2];
      } else if (b !== c && d === 0) {
        return [(2 * b - c) / (2 * (b - c))];
      }
      return [];
    }
    if (p.length === 2) {
      const a = p[0], b = p[1];
      if (a !== b) {
        return [a / (a - b)];
      }
      return [];
    }
    return [];
  },
  curvature: function(t4, d1, d2, _3d, kOnly) {
    let num, dnm, adk, dk, k = 0, r = 0;
    const d = utils.compute(t4, d1);
    const dd = utils.compute(t4, d2);
    const qdsum = d.x * d.x + d.y * d.y;
    if (_3d) {
      num = sqrt(pow(d.y * dd.z - dd.y * d.z, 2) + pow(d.z * dd.x - dd.z * d.x, 2) + pow(d.x * dd.y - dd.x * d.y, 2));
      dnm = pow(qdsum + d.z * d.z, 3 / 2);
    } else {
      num = d.x * dd.y - d.y * dd.x;
      dnm = pow(qdsum, 3 / 2);
    }
    if (num === 0 || dnm === 0) {
      return { k: 0, r: 0 };
    }
    k = num / dnm;
    r = dnm / num;
    if (!kOnly) {
      const pk = utils.curvature(t4 - 1e-3, d1, d2, _3d, true).k;
      const nk = utils.curvature(t4 + 1e-3, d1, d2, _3d, true).k;
      dk = (nk - k + (k - pk)) / 2;
      adk = (abs(nk - k) + abs(k - pk)) / 2;
    }
    return { k, r, dk, adk };
  },
  inflections: function(points) {
    if (points.length < 4)
      return [];
    const p = utils.align(points, { p1: points[0], p2: points.slice(-1)[0] }), a = p[2].x * p[1].y, b = p[3].x * p[1].y, c = p[1].x * p[2].y, d = p[3].x * p[2].y, v1 = 18 * (-3 * a + 2 * b + 3 * c - d), v2 = 18 * (3 * a - b - 3 * c), v3 = 18 * (c - a);
    if (utils.approximately(v1, 0)) {
      if (!utils.approximately(v2, 0)) {
        let t4 = -v3 / v2;
        if (0 <= t4 && t4 <= 1)
          return [t4];
      }
      return [];
    }
    const d2 = 2 * v1;
    if (utils.approximately(d2, 0))
      return [];
    const trm = v2 * v2 - 4 * v1 * v3;
    if (trm < 0)
      return [];
    const sq = Math.sqrt(trm);
    return [(sq - v2) / d2, -(v2 + sq) / d2].filter(function(r) {
      return 0 <= r && r <= 1;
    });
  },
  bboxoverlap: function(b1, b2) {
    const dims = ["x", "y"], len = dims.length;
    for (let i = 0, dim, l, t4, d; i < len; i++) {
      dim = dims[i];
      l = b1[dim].mid;
      t4 = b2[dim].mid;
      d = (b1[dim].size + b2[dim].size) / 2;
      if (abs(l - t4) >= d)
        return false;
    }
    return true;
  },
  expandbox: function(bbox7, _bbox) {
    if (_bbox.x.min < bbox7.x.min) {
      bbox7.x.min = _bbox.x.min;
    }
    if (_bbox.y.min < bbox7.y.min) {
      bbox7.y.min = _bbox.y.min;
    }
    if (_bbox.z && _bbox.z.min < bbox7.z.min) {
      bbox7.z.min = _bbox.z.min;
    }
    if (_bbox.x.max > bbox7.x.max) {
      bbox7.x.max = _bbox.x.max;
    }
    if (_bbox.y.max > bbox7.y.max) {
      bbox7.y.max = _bbox.y.max;
    }
    if (_bbox.z && _bbox.z.max > bbox7.z.max) {
      bbox7.z.max = _bbox.z.max;
    }
    bbox7.x.mid = (bbox7.x.min + bbox7.x.max) / 2;
    bbox7.y.mid = (bbox7.y.min + bbox7.y.max) / 2;
    if (bbox7.z) {
      bbox7.z.mid = (bbox7.z.min + bbox7.z.max) / 2;
    }
    bbox7.x.size = bbox7.x.max - bbox7.x.min;
    bbox7.y.size = bbox7.y.max - bbox7.y.min;
    if (bbox7.z) {
      bbox7.z.size = bbox7.z.max - bbox7.z.min;
    }
  },
  pairiteration: function(c1, c2, curveIntersectionThreshold) {
    const c1b = c1.bbox(), c2b = c2.bbox(), r = 1e5, threshold = curveIntersectionThreshold || 0.5;
    if (c1b.x.size + c1b.y.size < threshold && c2b.x.size + c2b.y.size < threshold) {
      return [
        (r * (c1._t1 + c1._t2) / 2 | 0) / r + "/" + (r * (c2._t1 + c2._t2) / 2 | 0) / r
      ];
    }
    let cc1 = c1.split(0.5), cc2 = c2.split(0.5), pairs = [
      { left: cc1.left, right: cc2.left },
      { left: cc1.left, right: cc2.right },
      { left: cc1.right, right: cc2.right },
      { left: cc1.right, right: cc2.left }
    ];
    pairs = pairs.filter(function(pair) {
      return utils.bboxoverlap(pair.left.bbox(), pair.right.bbox());
    });
    let results = [];
    if (pairs.length === 0)
      return results;
    pairs.forEach(function(pair) {
      results = results.concat(utils.pairiteration(pair.left, pair.right, threshold));
    });
    results = results.filter(function(v, i) {
      return results.indexOf(v) === i;
    });
    return results;
  },
  getccenter: function(p1, p2, p3) {
    const dx1 = p2.x - p1.x, dy1 = p2.y - p1.y, dx2 = p3.x - p2.x, dy2 = p3.y - p2.y, dx1p = dx1 * cos(quart) - dy1 * sin(quart), dy1p = dx1 * sin(quart) + dy1 * cos(quart), dx2p = dx2 * cos(quart) - dy2 * sin(quart), dy2p = dx2 * sin(quart) + dy2 * cos(quart), mx1 = (p1.x + p2.x) / 2, my1 = (p1.y + p2.y) / 2, mx2 = (p2.x + p3.x) / 2, my2 = (p2.y + p3.y) / 2, mx1n = mx1 + dx1p, my1n = my1 + dy1p, mx2n = mx2 + dx2p, my2n = my2 + dy2p, arc2 = utils.lli8(mx1, my1, mx1n, my1n, mx2, my2, mx2n, my2n), r = utils.dist(arc2, p1);
    let s = atan2(p1.y - arc2.y, p1.x - arc2.x), m = atan2(p2.y - arc2.y, p2.x - arc2.x), e = atan2(p3.y - arc2.y, p3.x - arc2.x), _;
    if (s < e) {
      if (s > m || m > e) {
        s += tau;
      }
      if (s > e) {
        _ = e;
        e = s;
        s = _;
      }
    } else {
      if (e < m && m < s) {
        _ = e;
        e = s;
        s = _;
      } else {
        e += tau;
      }
    }
    arc2.s = s;
    arc2.e = e;
    arc2.r = r;
    return arc2;
  },
  numberSort: function(a, b) {
    return a - b;
  }
};

// node_modules/bezier-js/src/poly-bezier.js
var PolyBezier = class {
  constructor(curves) {
    this.curves = [];
    this._3d = false;
    if (!!curves) {
      this.curves = curves;
      this._3d = this.curves[0]._3d;
    }
  }
  valueOf() {
    return this.toString();
  }
  toString() {
    return "[" + this.curves.map(function(curve) {
      return utils.pointsToString(curve.points);
    }).join(", ") + "]";
  }
  addCurve(curve) {
    this.curves.push(curve);
    this._3d = this._3d || curve._3d;
  }
  length() {
    return this.curves.map(function(v) {
      return v.length();
    }).reduce(function(a, b) {
      return a + b;
    });
  }
  curve(idx) {
    return this.curves[idx];
  }
  bbox() {
    const c = this.curves;
    var bbox7 = c[0].bbox();
    for (var i = 1; i < c.length; i++) {
      utils.expandbox(bbox7, c[i].bbox());
    }
    return bbox7;
  }
  offset(d) {
    const offset2 = [];
    this.curves.forEach(function(v) {
      offset2.push(...v.offset(d));
    });
    return new PolyBezier(offset2);
  }
};

// node_modules/bezier-js/src/bezier.js
var { abs: abs2, min: min2, max: max2, cos: cos2, sin: sin2, acos: acos2, sqrt: sqrt2 } = Math;
var pi2 = Math.PI;
var Bezier = class {
  constructor(coords) {
    let args = coords && coords.forEach ? coords : Array.from(arguments).slice();
    let coordlen = false;
    if (typeof args[0] === "object") {
      coordlen = args.length;
      const newargs = [];
      args.forEach(function(point4) {
        ["x", "y", "z"].forEach(function(d) {
          if (typeof point4[d] !== "undefined") {
            newargs.push(point4[d]);
          }
        });
      });
      args = newargs;
    }
    let higher = false;
    const len = args.length;
    if (coordlen) {
      if (coordlen > 4) {
        if (arguments.length !== 1) {
          throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");
        }
        higher = true;
      }
    } else {
      if (len !== 6 && len !== 8 && len !== 9 && len !== 12) {
        if (arguments.length !== 1) {
          throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");
        }
      }
    }
    const _3d = this._3d = !higher && (len === 9 || len === 12) || coords && coords[0] && typeof coords[0].z !== "undefined";
    const points = this.points = [];
    for (let idx = 0, step = _3d ? 3 : 2; idx < len; idx += step) {
      var point3 = {
        x: args[idx],
        y: args[idx + 1]
      };
      if (_3d) {
        point3.z = args[idx + 2];
      }
      points.push(point3);
    }
    const order = this.order = points.length - 1;
    const dims = this.dims = ["x", "y"];
    if (_3d)
      dims.push("z");
    this.dimlen = dims.length;
    const aligned = utils.align(points, { p1: points[0], p2: points[order] });
    const baselength = utils.dist(points[0], points[order]);
    this._linear = aligned.reduce((t4, p) => t4 + abs2(p.y), 0) < baselength / 50;
    this._lut = [];
    this._t1 = 0;
    this._t2 = 1;
    this.update();
  }
  static quadraticFromPoints(p1, p2, p3, t4) {
    if (typeof t4 === "undefined") {
      t4 = 0.5;
    }
    if (t4 === 0) {
      return new Bezier(p2, p2, p3);
    }
    if (t4 === 1) {
      return new Bezier(p1, p2, p2);
    }
    const abc = Bezier.getABC(2, p1, p2, p3, t4);
    return new Bezier(p1, abc.A, p3);
  }
  static cubicFromPoints(S, B2, E2, t4, d1) {
    if (typeof t4 === "undefined") {
      t4 = 0.5;
    }
    const abc = Bezier.getABC(3, S, B2, E2, t4);
    if (typeof d1 === "undefined") {
      d1 = utils.dist(B2, abc.C);
    }
    const d2 = d1 * (1 - t4) / t4;
    const selen = utils.dist(S, E2), lx = (E2.x - S.x) / selen, ly = (E2.y - S.y) / selen, bx1 = d1 * lx, by1 = d1 * ly, bx2 = d2 * lx, by2 = d2 * ly;
    const e1 = { x: B2.x - bx1, y: B2.y - by1 }, e2 = { x: B2.x + bx2, y: B2.y + by2 }, A2 = abc.A, v1 = { x: A2.x + (e1.x - A2.x) / (1 - t4), y: A2.y + (e1.y - A2.y) / (1 - t4) }, v2 = { x: A2.x + (e2.x - A2.x) / t4, y: A2.y + (e2.y - A2.y) / t4 }, nc1 = { x: S.x + (v1.x - S.x) / t4, y: S.y + (v1.y - S.y) / t4 }, nc2 = {
      x: E2.x + (v2.x - E2.x) / (1 - t4),
      y: E2.y + (v2.y - E2.y) / (1 - t4)
    };
    return new Bezier(S, nc1, nc2, E2);
  }
  static getUtils() {
    return utils;
  }
  getUtils() {
    return Bezier.getUtils();
  }
  static get PolyBezier() {
    return PolyBezier;
  }
  valueOf() {
    return this.toString();
  }
  toString() {
    return utils.pointsToString(this.points);
  }
  toSVG() {
    if (this._3d)
      return false;
    const p = this.points, x = p[0].x, y = p[0].y, s = ["M", x, y, this.order === 2 ? "Q" : "C"];
    for (let i = 1, last = p.length; i < last; i++) {
      s.push(p[i].x);
      s.push(p[i].y);
    }
    return s.join(" ");
  }
  setRatios(ratios) {
    if (ratios.length !== this.points.length) {
      throw new Error("incorrect number of ratio values");
    }
    this.ratios = ratios;
    this._lut = [];
  }
  verify() {
    const print = this.coordDigest();
    if (print !== this._print) {
      this._print = print;
      this.update();
    }
  }
  coordDigest() {
    return this.points.map(function(c, pos) {
      return "" + pos + c.x + c.y + (c.z ? c.z : 0);
    }).join("");
  }
  update() {
    this._lut = [];
    this.dpoints = utils.derive(this.points, this._3d);
    this.computedirection();
  }
  computedirection() {
    const points = this.points;
    const angle2 = utils.angle(points[0], points[this.order], points[1]);
    this.clockwise = angle2 > 0;
  }
  length() {
    return utils.length(this.derivative.bind(this));
  }
  static getABC(order = 2, S, B2, E2, t4 = 0.5) {
    const u = utils.projectionratio(t4, order), um = 1 - u, C2 = {
      x: u * S.x + um * E2.x,
      y: u * S.y + um * E2.y
    }, s = utils.abcratio(t4, order), A2 = {
      x: B2.x + (B2.x - C2.x) / s,
      y: B2.y + (B2.y - C2.y) / s
    };
    return { A: A2, B: B2, C: C2, S, E: E2 };
  }
  getABC(t4, B2) {
    B2 = B2 || this.get(t4);
    let S = this.points[0];
    let E2 = this.points[this.order];
    return Bezier.getABC(this.order, S, B2, E2, t4);
  }
  getLUT(steps) {
    this.verify();
    steps = steps || 100;
    if (this._lut.length === steps) {
      return this._lut;
    }
    this._lut = [];
    steps++;
    this._lut = [];
    for (let i = 0, p, t4; i < steps; i++) {
      t4 = i / (steps - 1);
      p = this.compute(t4);
      p.t = t4;
      this._lut.push(p);
    }
    return this._lut;
  }
  on(point3, error) {
    error = error || 5;
    const lut = this.getLUT(), hits = [];
    for (let i = 0, c, t4 = 0; i < lut.length; i++) {
      c = lut[i];
      if (utils.dist(c, point3) < error) {
        hits.push(c);
        t4 += i / lut.length;
      }
    }
    if (!hits.length)
      return false;
    return t /= hits.length;
  }
  project(point3) {
    const LUT = this.getLUT(), l = LUT.length - 1, closest = utils.closest(LUT, point3), mpos = closest.mpos, t12 = (mpos - 1) / l, t22 = (mpos + 1) / l, step = 0.1 / l;
    let mdist = closest.mdist, t4 = t12, ft = t4, p;
    mdist += 1;
    for (let d; t4 < t22 + step; t4 += step) {
      p = this.compute(t4);
      d = utils.dist(point3, p);
      if (d < mdist) {
        mdist = d;
        ft = t4;
      }
    }
    ft = ft < 0 ? 0 : ft > 1 ? 1 : ft;
    p = this.compute(ft);
    p.t = ft;
    p.d = mdist;
    return p;
  }
  get(t4) {
    return this.compute(t4);
  }
  point(idx) {
    return this.points[idx];
  }
  compute(t4) {
    if (this.ratios) {
      return utils.computeWithRatios(t4, this.points, this.ratios, this._3d);
    }
    return utils.compute(t4, this.points, this._3d, this.ratios);
  }
  raise() {
    const p = this.points, np = [p[0]], k = p.length;
    for (let i = 1, pi4, pim; i < k; i++) {
      pi4 = p[i];
      pim = p[i - 1];
      np[i] = {
        x: (k - i) / k * pi4.x + i / k * pim.x,
        y: (k - i) / k * pi4.y + i / k * pim.y
      };
    }
    np[k] = p[k - 1];
    return new Bezier(np);
  }
  derivative(t4) {
    return utils.compute(t4, this.dpoints[0], this._3d);
  }
  dderivative(t4) {
    return utils.compute(t4, this.dpoints[1], this._3d);
  }
  align() {
    let p = this.points;
    return new Bezier(utils.align(p, { p1: p[0], p2: p[p.length - 1] }));
  }
  curvature(t4) {
    return utils.curvature(t4, this.dpoints[0], this.dpoints[1], this._3d);
  }
  inflections() {
    return utils.inflections(this.points);
  }
  normal(t4) {
    return this._3d ? this.__normal3(t4) : this.__normal2(t4);
  }
  __normal2(t4) {
    const d = this.derivative(t4);
    const q = sqrt2(d.x * d.x + d.y * d.y);
    return { t: t4, x: -d.y / q, y: d.x / q };
  }
  __normal3(t4) {
    const r1 = this.derivative(t4), r2 = this.derivative(t4 + 0.01), q1 = sqrt2(r1.x * r1.x + r1.y * r1.y + r1.z * r1.z), q2 = sqrt2(r2.x * r2.x + r2.y * r2.y + r2.z * r2.z);
    r1.x /= q1;
    r1.y /= q1;
    r1.z /= q1;
    r2.x /= q2;
    r2.y /= q2;
    r2.z /= q2;
    const c = {
      x: r2.y * r1.z - r2.z * r1.y,
      y: r2.z * r1.x - r2.x * r1.z,
      z: r2.x * r1.y - r2.y * r1.x
    };
    const m = sqrt2(c.x * c.x + c.y * c.y + c.z * c.z);
    c.x /= m;
    c.y /= m;
    c.z /= m;
    const R = [
      c.x * c.x,
      c.x * c.y - c.z,
      c.x * c.z + c.y,
      c.x * c.y + c.z,
      c.y * c.y,
      c.y * c.z - c.x,
      c.x * c.z - c.y,
      c.y * c.z + c.x,
      c.z * c.z
    ];
    const n = {
      t: t4,
      x: R[0] * r1.x + R[1] * r1.y + R[2] * r1.z,
      y: R[3] * r1.x + R[4] * r1.y + R[5] * r1.z,
      z: R[6] * r1.x + R[7] * r1.y + R[8] * r1.z
    };
    return n;
  }
  hull(t4) {
    let p = this.points, _p = [], q = [], idx = 0;
    q[idx++] = p[0];
    q[idx++] = p[1];
    q[idx++] = p[2];
    if (this.order === 3) {
      q[idx++] = p[3];
    }
    while (p.length > 1) {
      _p = [];
      for (let i = 0, pt, l = p.length - 1; i < l; i++) {
        pt = utils.lerp(t4, p[i], p[i + 1]);
        q[idx++] = pt;
        _p.push(pt);
      }
      p = _p;
    }
    return q;
  }
  split(t12, t22) {
    if (t12 === 0 && !!t22) {
      return this.split(t22).left;
    }
    if (t22 === 1) {
      return this.split(t12).right;
    }
    const q = this.hull(t12);
    const result = {
      left: this.order === 2 ? new Bezier([q[0], q[3], q[5]]) : new Bezier([q[0], q[4], q[7], q[9]]),
      right: this.order === 2 ? new Bezier([q[5], q[4], q[2]]) : new Bezier([q[9], q[8], q[6], q[3]]),
      span: q
    };
    result.left._t1 = utils.map(0, 0, 1, this._t1, this._t2);
    result.left._t2 = utils.map(t12, 0, 1, this._t1, this._t2);
    result.right._t1 = utils.map(t12, 0, 1, this._t1, this._t2);
    result.right._t2 = utils.map(1, 0, 1, this._t1, this._t2);
    if (!t22) {
      return result;
    }
    t22 = utils.map(t22, t12, 1, 0, 1);
    return result.right.split(t22).left;
  }
  extrema() {
    const result = {};
    let roots = [];
    this.dims.forEach(function(dim) {
      let mfn = function(v) {
        return v[dim];
      };
      let p = this.dpoints[0].map(mfn);
      result[dim] = utils.droots(p);
      if (this.order === 3) {
        p = this.dpoints[1].map(mfn);
        result[dim] = result[dim].concat(utils.droots(p));
      }
      result[dim] = result[dim].filter(function(t4) {
        return t4 >= 0 && t4 <= 1;
      });
      roots = roots.concat(result[dim].sort(utils.numberSort));
    }.bind(this));
    result.values = roots.sort(utils.numberSort).filter(function(v, idx) {
      return roots.indexOf(v) === idx;
    });
    return result;
  }
  bbox() {
    const extrema = this.extrema(), result = {};
    this.dims.forEach(function(d) {
      result[d] = utils.getminmax(this, d, extrema[d]);
    }.bind(this));
    return result;
  }
  overlaps(curve) {
    const lbbox = this.bbox(), tbbox = curve.bbox();
    return utils.bboxoverlap(lbbox, tbbox);
  }
  offset(t4, d) {
    if (typeof d !== "undefined") {
      const c = this.get(t4), n = this.normal(t4);
      const ret = {
        c,
        n,
        x: c.x + n.x * d,
        y: c.y + n.y * d
      };
      if (this._3d) {
        ret.z = c.z + n.z * d;
      }
      return ret;
    }
    if (this._linear) {
      const nv = this.normal(0), coords = this.points.map(function(p) {
        const ret = {
          x: p.x + t4 * nv.x,
          y: p.y + t4 * nv.y
        };
        if (p.z && nv.z) {
          ret.z = p.z + t4 * nv.z;
        }
        return ret;
      });
      return [new Bezier(coords)];
    }
    return this.reduce().map(function(s) {
      if (s._linear) {
        return s.offset(t4)[0];
      }
      return s.scale(t4);
    });
  }
  simple() {
    if (this.order === 3) {
      const a1 = utils.angle(this.points[0], this.points[3], this.points[1]);
      const a2 = utils.angle(this.points[0], this.points[3], this.points[2]);
      if (a1 > 0 && a2 < 0 || a1 < 0 && a2 > 0)
        return false;
    }
    const n1 = this.normal(0);
    const n2 = this.normal(1);
    let s = n1.x * n2.x + n1.y * n2.y;
    if (this._3d) {
      s += n1.z * n2.z;
    }
    return abs2(acos2(s)) < pi2 / 3;
  }
  reduce() {
    let i, t12 = 0, t22 = 0, step = 0.01, segment, pass1 = [], pass2 = [];
    let extrema = this.extrema().values;
    if (extrema.indexOf(0) === -1) {
      extrema = [0].concat(extrema);
    }
    if (extrema.indexOf(1) === -1) {
      extrema.push(1);
    }
    for (t12 = extrema[0], i = 1; i < extrema.length; i++) {
      t22 = extrema[i];
      segment = this.split(t12, t22);
      segment._t1 = t12;
      segment._t2 = t22;
      pass1.push(segment);
      t12 = t22;
    }
    pass1.forEach(function(p1) {
      t12 = 0;
      t22 = 0;
      while (t22 <= 1) {
        for (t22 = t12 + step; t22 <= 1 + step; t22 += step) {
          segment = p1.split(t12, t22);
          if (!segment.simple()) {
            t22 -= step;
            if (abs2(t12 - t22) < step) {
              return [];
            }
            segment = p1.split(t12, t22);
            segment._t1 = utils.map(t12, 0, 1, p1._t1, p1._t2);
            segment._t2 = utils.map(t22, 0, 1, p1._t1, p1._t2);
            pass2.push(segment);
            t12 = t22;
            break;
          }
        }
      }
      if (t12 < 1) {
        segment = p1.split(t12, 1);
        segment._t1 = utils.map(t12, 0, 1, p1._t1, p1._t2);
        segment._t2 = p1._t2;
        pass2.push(segment);
      }
    });
    return pass2;
  }
  translate(v, d1, d2) {
    d2 = typeof d2 === "number" ? d2 : d1;
    const o = this.order;
    let d = this.points.map((_, i) => (1 - i / o) * d1 + i / o * d2);
    return new Bezier(this.points.map((p, i) => ({
      x: p.x + v.x * d[i],
      y: p.y + v.y * d[i]
    })));
  }
  scale(d) {
    const order = this.order;
    let distanceFn = false;
    if (typeof d === "function") {
      distanceFn = d;
    }
    if (distanceFn && order === 2) {
      return this.raise().scale(distanceFn);
    }
    const clockwise = this.clockwise;
    const points = this.points;
    if (this._linear) {
      return this.translate(this.normal(0), distanceFn ? distanceFn(0) : d, distanceFn ? distanceFn(1) : d);
    }
    const r1 = distanceFn ? distanceFn(0) : d;
    const r2 = distanceFn ? distanceFn(1) : d;
    const v = [this.offset(0, 10), this.offset(1, 10)];
    const np = [];
    const o = utils.lli4(v[0], v[0].c, v[1], v[1].c);
    if (!o) {
      throw new Error("cannot scale this curve. Try reducing it first.");
    }
    [0, 1].forEach(function(t4) {
      const p = np[t4 * order] = utils.copy(points[t4 * order]);
      p.x += (t4 ? r2 : r1) * v[t4].n.x;
      p.y += (t4 ? r2 : r1) * v[t4].n.y;
    });
    if (!distanceFn) {
      [0, 1].forEach((t4) => {
        if (order === 2 && !!t4)
          return;
        const p = np[t4 * order];
        const d2 = this.derivative(t4);
        const p2 = { x: p.x + d2.x, y: p.y + d2.y };
        np[t4 + 1] = utils.lli4(p, p2, o, points[t4 + 1]);
      });
      return new Bezier(np);
    }
    [0, 1].forEach(function(t4) {
      if (order === 2 && !!t4)
        return;
      var p = points[t4 + 1];
      var ov = {
        x: p.x - o.x,
        y: p.y - o.y
      };
      var rc = distanceFn ? distanceFn((t4 + 1) / order) : d;
      if (distanceFn && !clockwise)
        rc = -rc;
      var m = sqrt2(ov.x * ov.x + ov.y * ov.y);
      ov.x /= m;
      ov.y /= m;
      np[t4 + 1] = {
        x: p.x + rc * ov.x,
        y: p.y + rc * ov.y
      };
    });
    return new Bezier(np);
  }
  outline(d1, d2, d3, d4) {
    d2 = d2 === void 0 ? d1 : d2;
    if (this._linear) {
      const n = this.normal(0);
      const start2 = this.points[0];
      const end = this.points[this.points.length - 1];
      let s, mid, e;
      if (d3 === void 0) {
        d3 = d1;
        d4 = d2;
      }
      s = { x: start2.x + n.x * d1, y: start2.y + n.y * d1 };
      e = { x: end.x + n.x * d3, y: end.y + n.y * d3 };
      mid = { x: (s.x + e.x) / 2, y: (s.y + e.y) / 2 };
      const fline = [s, mid, e];
      s = { x: start2.x - n.x * d2, y: start2.y - n.y * d2 };
      e = { x: end.x - n.x * d4, y: end.y - n.y * d4 };
      mid = { x: (s.x + e.x) / 2, y: (s.y + e.y) / 2 };
      const bline = [e, mid, s];
      const ls2 = utils.makeline(bline[2], fline[0]);
      const le2 = utils.makeline(fline[2], bline[0]);
      const segments2 = [ls2, new Bezier(fline), le2, new Bezier(bline)];
      return new PolyBezier(segments2);
    }
    const reduced = this.reduce(), len = reduced.length, fcurves = [];
    let bcurves = [], p, alen = 0, tlen = this.length();
    const graduated = typeof d3 !== "undefined" && typeof d4 !== "undefined";
    function linearDistanceFunction(s, e, tlen2, alen2, slen) {
      return function(v) {
        const f1 = alen2 / tlen2, f2 = (alen2 + slen) / tlen2, d = e - s;
        return utils.map(v, 0, 1, s + f1 * d, s + f2 * d);
      };
    }
    reduced.forEach(function(segment) {
      const slen = segment.length();
      if (graduated) {
        fcurves.push(segment.scale(linearDistanceFunction(d1, d3, tlen, alen, slen)));
        bcurves.push(segment.scale(linearDistanceFunction(-d2, -d4, tlen, alen, slen)));
      } else {
        fcurves.push(segment.scale(d1));
        bcurves.push(segment.scale(-d2));
      }
      alen += slen;
    });
    bcurves = bcurves.map(function(s) {
      p = s.points;
      if (p[3]) {
        s.points = [p[3], p[2], p[1], p[0]];
      } else {
        s.points = [p[2], p[1], p[0]];
      }
      return s;
    }).reverse();
    const fs = fcurves[0].points[0], fe = fcurves[len - 1].points[fcurves[len - 1].points.length - 1], bs = bcurves[len - 1].points[bcurves[len - 1].points.length - 1], be = bcurves[0].points[0], ls = utils.makeline(bs, fs), le = utils.makeline(fe, be), segments = [ls].concat(fcurves).concat([le]).concat(bcurves);
    return new PolyBezier(segments);
  }
  outlineshapes(d1, d2, curveIntersectionThreshold) {
    d2 = d2 || d1;
    const outline = this.outline(d1, d2).curves;
    const shapes = [];
    for (let i = 1, len = outline.length; i < len / 2; i++) {
      const shape = utils.makeshape(outline[i], outline[len - i], curveIntersectionThreshold);
      shape.startcap.virtual = i > 1;
      shape.endcap.virtual = i < len / 2 - 1;
      shapes.push(shape);
    }
    return shapes;
  }
  intersects(curve, curveIntersectionThreshold) {
    if (!curve)
      return this.selfintersects(curveIntersectionThreshold);
    if (curve.p1 && curve.p2) {
      return this.lineIntersects(curve);
    }
    if (curve instanceof Bezier) {
      curve = curve.reduce();
    }
    return this.curveintersects(this.reduce(), curve, curveIntersectionThreshold);
  }
  lineIntersects(line3) {
    const mx = min2(line3.p1.x, line3.p2.x), my = min2(line3.p1.y, line3.p2.y), MX = max2(line3.p1.x, line3.p2.x), MY = max2(line3.p1.y, line3.p2.y);
    return utils.roots(this.points, line3).filter((t4) => {
      var p = this.get(t4);
      return utils.between(p.x, mx, MX) && utils.between(p.y, my, MY);
    });
  }
  selfintersects(curveIntersectionThreshold) {
    const reduced = this.reduce(), len = reduced.length - 2, results = [];
    for (let i = 0, result, left, right; i < len; i++) {
      left = reduced.slice(i, i + 1);
      right = reduced.slice(i + 2);
      result = this.curveintersects(left, right, curveIntersectionThreshold);
      results.push(...result);
    }
    return results;
  }
  curveintersects(c1, c2, curveIntersectionThreshold) {
    const pairs = [];
    c1.forEach(function(l) {
      c2.forEach(function(r) {
        if (l.overlaps(r)) {
          pairs.push({ left: l, right: r });
        }
      });
    });
    let intersections2 = [];
    pairs.forEach(function(pair) {
      const result = utils.pairiteration(pair.left, pair.right, curveIntersectionThreshold);
      if (result.length > 0) {
        intersections2 = intersections2.concat(result);
      }
    });
    return intersections2;
  }
  arcs(errorThreshold) {
    errorThreshold = errorThreshold || 0.5;
    return this._iterate(errorThreshold, []);
  }
  _error(pc, np1, s, e) {
    const q = (e - s) / 4, c1 = this.get(s + q), c2 = this.get(e - q), ref = utils.dist(pc, np1), d1 = utils.dist(pc, c1), d2 = utils.dist(pc, c2);
    return abs2(d1 - ref) + abs2(d2 - ref);
  }
  _iterate(errorThreshold, circles) {
    let t_s = 0, t_e = 1, safety;
    do {
      safety = 0;
      t_e = 1;
      let np1 = this.get(t_s), np2, np3, arc2, prev_arc;
      let curr_good = false, prev_good = false, done;
      let t_m = t_e, prev_e = 1, step = 0;
      do {
        prev_good = curr_good;
        prev_arc = arc2;
        t_m = (t_s + t_e) / 2;
        step++;
        np2 = this.get(t_m);
        np3 = this.get(t_e);
        arc2 = utils.getccenter(np1, np2, np3);
        arc2.interval = {
          start: t_s,
          end: t_e
        };
        let error = this._error(arc2, np1, t_s, t_e);
        curr_good = error <= errorThreshold;
        done = prev_good && !curr_good;
        if (!done)
          prev_e = t_e;
        if (curr_good) {
          if (t_e >= 1) {
            arc2.interval.end = prev_e = 1;
            prev_arc = arc2;
            if (t_e > 1) {
              let d = {
                x: arc2.x + arc2.r * cos2(arc2.e),
                y: arc2.y + arc2.r * sin2(arc2.e)
              };
              arc2.e += utils.angle({ x: arc2.x, y: arc2.y }, d, this.get(1));
            }
            break;
          }
          t_e = t_e + (t_e - t_s) / 2;
        } else {
          t_e = t_m;
        }
      } while (!done && safety++ < 100);
      if (safety >= 100) {
        break;
      }
      prev_arc = prev_arc ? prev_arc : arc2;
      circles.push(prev_arc);
      t_s = prev_e;
    } while (t_e < 1);
    return circles;
  }
};

// src/geometry/Bezier.ts
var isQuadraticBezier = (path2) => path2.quadratic !== void 0;
var isCubicBezier = (path2) => path2.cubic1 !== void 0 && path2.cubic2 !== void 0;
var quadraticBend = (a, b, bend = 0) => quadraticSimple(a, b, bend);
var quadraticSimple = (start2, end, bend = 0) => {
  if (isNaN(bend))
    throw Error(`bend is NaN`);
  if (bend < -1 || bend > 1)
    throw Error(`Expects bend range of -1 to 1`);
  const middle = Line_exports.interpolate(0.5, start2, end);
  let target = middle;
  if (end.y < start2.y) {
    target = bend > 0 ? { x: Math.min(start2.x, end.x), y: Math.min(start2.y, end.y) } : { x: Math.max(start2.x, end.x), y: Math.max(start2.y, end.y) };
  } else {
    target = bend > 0 ? { x: Math.max(start2.x, end.x), y: Math.min(start2.y, end.y) } : { x: Math.min(start2.x, end.x), y: Math.max(start2.y, end.y) };
  }
  const handle = Line_exports.interpolate(Math.abs(bend), middle, target);
  return quadratic(start2, end, handle);
};
var computeQuadraticSimple = (start2, end, bend, amt) => {
  const q = quadraticSimple(start2, end, bend);
  const bzr = new Bezier(q.a, q.quadratic, q.b);
  return bzr.compute(amt);
};
var quadraticToSvgString = (start2, end, handle) => [`M ${start2.x} ${start2.y} Q ${handle.x} ${handle.y} ${end.x} ${end.y}`];
var toPath3 = (cubicOrQuadratic) => {
  if (isCubicBezier(cubicOrQuadratic)) {
    return cubicToPath(cubicOrQuadratic);
  } else if (isQuadraticBezier(cubicOrQuadratic)) {
    return quadratictoPath(cubicOrQuadratic);
  } else {
    throw new Error(`Unknown bezier type`);
  }
};
var cubic = (start2, end, cubic1, cubic2) => ({
  a: Object.freeze(start2),
  b: Object.freeze(end),
  cubic1: Object.freeze(cubic1),
  cubic2: Object.freeze(cubic2)
});
var cubicToPath = (cubic2) => {
  const { a, cubic1, cubic2: cubic22, b } = cubic2;
  const bzr = new Bezier(a, cubic1, cubic22, b);
  return Object.freeze({
    ...cubic2,
    length: () => bzr.length(),
    interpolate: (t4) => bzr.compute(t4),
    bbox: () => {
      const { x, y } = bzr.bbox();
      const xSize = x.size;
      const ySize = y.size;
      if (xSize === void 0)
        throw new Error(`x.size not present on calculated bbox`);
      if (ySize === void 0)
        throw new Error(`x.size not present on calculated bbox`);
      return Rect_exports.fromTopLeft({ x: x.min, y: y.min }, xSize, ySize);
    },
    toString: () => bzr.toString(),
    toSvgString: () => [`brrup`],
    kind: `bezier/cubic`
  });
};
var quadratic = (start2, end, handle) => ({
  a: Object.freeze(start2),
  b: Object.freeze(end),
  quadratic: Object.freeze(handle)
});
var quadratictoPath = (quadraticBezier2) => {
  const { a, b, quadratic: quadratic2 } = quadraticBezier2;
  const bzr = new Bezier(a, quadratic2, b);
  return Object.freeze({
    ...quadraticBezier2,
    length: () => bzr.length(),
    interpolate: (t4) => bzr.compute(t4),
    bbox: () => {
      const { x, y } = bzr.bbox();
      const xSize = x.size;
      const ySize = y.size;
      if (xSize === void 0)
        throw new Error(`x.size not present on calculated bbox`);
      if (ySize === void 0)
        throw new Error(`x.size not present on calculated bbox`);
      return Rect_exports.fromTopLeft({ x: x.min, y: y.min }, xSize, ySize);
    },
    toString: () => bzr.toString(),
    toSvgString: () => quadraticToSvgString(a, b, quadratic2),
    kind: `bezier/quadratic`
  });
};

// src/geometry/Circle.ts
var Circle_exports = {};
__export(Circle_exports, {
  area: () => area2,
  bbox: () => bbox4,
  circumference: () => circumference,
  distanceCenter: () => distanceCenter2,
  distanceFromExterior: () => distanceFromExterior2,
  interpolate: () => interpolate4,
  intersectionLine: () => intersectionLine,
  intersections: () => intersections,
  isCircle: () => isCircle,
  isCirclePositioned: () => isCirclePositioned,
  isContainedBy: () => isContainedBy,
  isEquals: () => isEquals2,
  isIntersecting: () => isIntersecting,
  isPositioned: () => isPositioned3,
  length: () => length4,
  point: () => point2,
  toPath: () => toPath4,
  toSvg: () => toSvg2
});
var piPi2 = Math.PI * 2;
var isPositioned3 = (p) => p.x !== void 0 && p.y !== void 0;
var isCircle = (p) => p.radius !== void 0;
var isCirclePositioned = (p) => isCircle(p) && isPositioned3(p);
var point2 = (circle3, angleRadian2, origin) => {
  if (origin === void 0) {
    if (isPositioned3(circle3)) {
      origin = circle3;
    } else {
      origin = { x: 0, y: 0 };
    }
  }
  return {
    x: Math.cos(-angleRadian2) * circle3.radius + origin.x,
    y: Math.sin(-angleRadian2) * circle3.radius + origin.y
  };
};
var guard5 = (circle3, paramName = `circle`) => {
  if (isPositioned3(circle3)) {
    guard(circle3, `circle`);
  }
  if (Number.isNaN(circle3.radius))
    throw new Error(`${paramName}.radius is NaN`);
  if (circle3.radius <= 0)
    throw new Error(`${paramName}.radius must be greater than zero`);
};
var guardPositioned2 = (circle3, paramName = `circle`) => {
  if (!isPositioned3(circle3))
    throw new Error(`Expected a positioned circle with x,y`);
  return guard5(circle3, paramName);
};
var interpolate4 = (circle3, t4) => point2(circle3, t4 * piPi2);
var length4 = (circle3) => circumference(circle3);
var circumference = (circle3) => {
  guard5(circle3);
  return piPi2 * circle3.radius;
};
var area2 = (circle3) => {
  guard5(circle3);
  return Math.PI * circle3.radius * circle3.radius;
};
var bbox4 = (circle3) => {
  if (isPositioned3(circle3)) {
    return Rect_exports.fromCenter(circle3, circle3.radius * 2, circle3.radius * 2);
  } else {
    return { width: circle3.radius * 2, height: circle3.radius * 2 };
  }
};
var isContainedBy = (a, b) => {
  const d = distanceCenter2(a, b);
  return d < Math.abs(a.radius - b.radius);
};
var isIntersecting = (a, b) => {
  if (isEquals2(a, b))
    return true;
  if (isContainedBy(a, b))
    return true;
  return intersections(a, b).length === 2;
};
var intersections = (a, b) => {
  const vector = Point_exports.subtract(b, a);
  const centerD = Math.sqrt(vector.y * vector.y + vector.x * vector.x);
  if (centerD > a.radius + b.radius)
    return [];
  if (centerD < Math.abs(a.radius - b.radius))
    return [];
  if (isEquals2(a, b))
    return [];
  const centroidD = (a.radius * a.radius - b.radius * b.radius + centerD * centerD) / (2 * centerD);
  const centroid3 = {
    x: a.x + vector.x * centroidD / centerD,
    y: a.y + vector.y * centroidD / centerD
  };
  const centroidIntersectionD = Math.sqrt(a.radius * a.radius - centroidD * centroidD);
  const intersection = {
    x: -vector.y * (centroidIntersectionD / centerD),
    y: vector.x * (centroidIntersectionD / centerD)
  };
  return [
    Point_exports.sum(centroid3, intersection),
    Point_exports.subtract(centroid3, intersection)
  ];
};
var isEquals2 = (a, b) => {
  if (a.radius !== b.radius)
    return false;
  if (isPositioned3(a) && isPositioned3(b)) {
    if (a.x !== b.x)
      return false;
    if (a.y !== b.y)
      return false;
    if (a.z !== b.z)
      return false;
    return true;
  } else if (!isPositioned3(a) && !isPositioned3(b)) {
  } else
    return false;
  return false;
};
var distanceCenter2 = (a, b) => {
  guardPositioned2(a, `a`);
  guardPositioned2(a, `b`);
  return Point_exports.distance(a, b);
};
var distanceFromExterior2 = (a, b) => {
  guardPositioned2(a, `a`);
  if (isCirclePositioned(b)) {
    return Math.max(0, distanceCenter2(a, b) - a.radius - b.radius);
  } else if (Point_exports.isPoint(b)) {
    return Math.max(0, Point_exports.distance(a, b));
  } else
    throw new Error(`Second parameter invalid type`);
};
var toSvg2 = (a, sweep, origin) => {
  if (isCircle(a)) {
    if (origin !== void 0) {
      return toSvgFull2(a.radius, origin, sweep);
    }
    if (isPositioned3(a)) {
      return toSvgFull2(a.radius, a, sweep);
    } else
      throw new Error(`origin parameter needed for non-positioned circle`);
  } else {
    if (origin !== void 0) {
      return toSvgFull2(a, origin, sweep);
    } else
      throw new Error(`origin parameter needed`);
  }
};
var toSvgFull2 = (radius, origin, sweep) => {
  const { x, y } = origin;
  const s = sweep ? `1` : `0`;
  return `
    M ${x}, ${y}
    m -${radius}, 0
    a ${radius},${radius} 0 1,${s} ${radius * 2},0
    a ${radius},${radius} 0 1,${s} -${radius * 2},0
  `.split(`
`);
};
var toPath4 = (circle3) => {
  guard5(circle3);
  return Object.freeze({
    ...circle3,
    interpolate: (t4) => interpolate4(circle3, t4),
    bbox: () => bbox4(circle3),
    length: () => length4(circle3),
    toSvgString: (sweep = true) => toSvg2(circle3, sweep),
    kind: `circular`
  });
};
var intersectionLine = (circle3, line3) => {
  const v1 = {
    x: line3.b.x - line3.a.x,
    y: line3.b.y - line3.a.y
  };
  const v2 = {
    x: line3.a.x - circle3.x,
    y: line3.a.y - circle3.y
  };
  const b = (v1.x * v2.x + v1.y * v2.y) * -2;
  const c = 2 * (v1.x * v1.x + v1.y * v1.y);
  const d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle3.radius * circle3.radius));
  if (isNaN(d))
    return [];
  const u1 = (b - d) / c;
  const u2 = (b + d) / c;
  const ret = [];
  if (u1 <= 1 && u1 >= 0) {
    ret.push({
      x: line3.a.x + v1.x * u1,
      y: line3.a.y + v1.y * u1
    });
  }
  if (u2 <= 1 && u2 >= 0) {
    ret.push({
      x: line3.a.x + v1.x * u2,
      y: line3.a.y + v1.y * u2
    });
  }
  return ret;
};

// src/geometry/CompoundPath.ts
var CompoundPath_exports = {};
__export(CompoundPath_exports, {
  bbox: () => bbox5,
  computeDimensions: () => computeDimensions,
  fromPaths: () => fromPaths,
  guardContinuous: () => guardContinuous,
  interpolate: () => interpolate5,
  setSegment: () => setSegment,
  toString: () => toString3,
  toSvgString: () => toSvgString2
});
var setSegment = (compoundPath, index, path2) => {
  const existing = [...compoundPath.segments];
  existing[index] = path2;
  return fromPaths(...existing);
};
var interpolate5 = (paths2, t4, useWidth, dimensions) => {
  if (dimensions === void 0) {
    dimensions = computeDimensions(paths2);
  }
  const expected = t4 * (useWidth ? dimensions.totalWidth : dimensions.totalLength);
  let soFar = 0;
  const l = useWidth ? dimensions.widths : dimensions.lengths;
  for (let i = 0; i < l.length; i++) {
    if (soFar + l[i] >= expected) {
      const relative = expected - soFar;
      let amt = relative / l[i];
      if (amt > 1)
        amt = 1;
      return paths2[i].interpolate(amt);
    } else
      soFar += l[i];
  }
  return { x: 0, y: 0 };
};
var computeDimensions = (paths2) => {
  const widths = paths2.map((l) => l.bbox().width);
  const lengths3 = paths2.map((l) => l.length());
  let totalLength = 0;
  let totalWidth = 0;
  for (let i = 0; i < lengths3.length; i++)
    totalLength += lengths3[i];
  for (let i = 0; i < widths.length; i++)
    totalWidth += widths[i];
  return { totalLength, totalWidth, widths, lengths: lengths3 };
};
var bbox5 = (paths2) => {
  const boxes = paths2.map((p) => p.bbox());
  const corners3 = boxes.map((b) => Rect_exports.corners(b)).flat();
  return Point_exports.bbox(...corners3);
};
var toString3 = (paths2) => paths2.map((p) => p.toString()).join(`, `);
var guardContinuous = (paths2) => {
  let lastPos = Path_exports.getEnd(paths2[0]);
  for (let i = 1; i < paths2.length; i++) {
    const start2 = Path_exports.getStart(paths2[i]);
    if (!Point_exports.isEqual(start2, lastPos))
      throw new Error(`Path index ` + i + ` does not start at prior path end. Start: ` + start2.x + `,` + start2.y + ` expected: ` + lastPos.x + `,` + lastPos.y);
    lastPos = Path_exports.getEnd(paths2[i]);
  }
};
var toSvgString2 = (paths2) => paths2.flatMap((p) => p.toSvgString());
var fromPaths = (...paths2) => {
  guardContinuous(paths2);
  const dims = computeDimensions(paths2);
  return Object.freeze({
    segments: paths2,
    length: () => dims.totalLength,
    interpolate: (t4, useWidth = false) => interpolate5(paths2, t4, useWidth, dims),
    bbox: () => bbox5(paths2),
    toString: () => toString3(paths2),
    toSvgString: () => toSvgString2(paths2),
    kind: `compound`
  });
};

// src/geometry/Grid.ts
var Grid_exports = {};
__export(Grid_exports, {
  allDirections: () => allDirections,
  cellAtPoint: () => cellAtPoint,
  cellEquals: () => cellEquals,
  cellKeyString: () => cellKeyString,
  cellMiddle: () => cellMiddle,
  cells: () => cells,
  crossDirections: () => crossDirections,
  getLine: () => getLine,
  getVectorFromCardinal: () => getVectorFromCardinal,
  guardCell: () => guardCell,
  inside: () => inside,
  isEqual: () => isEqual3,
  neighbours: () => neighbours,
  offset: () => offset,
  offsetCardinals: () => offsetCardinals,
  rectangleForCell: () => rectangleForCell,
  rows: () => rows,
  simpleLine: () => simpleLine,
  visitFor: () => visitFor,
  visitor: () => visitor,
  visitorBreadth: () => visitorBreadth,
  visitorColumn: () => visitorColumn,
  visitorDepth: () => visitorDepth,
  visitorRandom: () => visitorRandom,
  visitorRandomContiguous: () => visitorRandomContiguous,
  visitorRow: () => visitorRow
});
var isCell = (cell) => {
  if (cell === void 0)
    return false;
  return `x` in cell && `y` in cell;
};
var isNeighbour = (n) => {
  if (n === void 0)
    return false;
  if (n[1] === void 0)
    return false;
  return true;
};
var isEqual3 = (a, b) => {
  if (`rows` in a && `cols` in a) {
    if (`rows` in b && `cols` in b) {
      if (a.rows !== b.rows || a.cols !== b.cols)
        return false;
    } else
      return false;
  }
  if (`size` in a) {
    if (`size` in b) {
      if (a.size !== b.size)
        return false;
    } else
      return false;
  }
  return true;
};
var cellKeyString = (v) => `Cell{${v.x},${v.y}}`;
var cellEquals = (a, b) => {
  if (b === void 0)
    return false;
  if (a === void 0)
    return false;
  return a.x === b.x && a.y === b.y;
};
var guardCell = (cell, paramName = `Param`, grid2) => {
  if (cell === void 0)
    throw new Error(paramName + ` is undefined. Expecting {x,y}`);
  if (cell.x === void 0)
    throw new Error(paramName + `.x is undefined`);
  if (cell.y === void 0)
    throw new Error(paramName + `.y is undefined`);
  if (!Number.isInteger(cell.x))
    throw new Error(paramName + `.x is non-integer`);
  if (!Number.isInteger(cell.y))
    throw new Error(paramName + `.y is non-integer`);
  if (grid2 !== void 0) {
    if (!inside(grid2, cell))
      throw new Error(`${paramName} is outside of grid. Cell: ${cell.x},${cell.y} Grid: ${grid2.cols}, ${grid2.rows}`);
  }
};
var guardGrid = (grid2, paramName = `Param`) => {
  if (grid2 === void 0)
    throw new Error(`${paramName} is undefined. Expecting grid.`);
  if (!(`rows` in grid2))
    throw new Error(`${paramName}.rows is undefined`);
  if (!(`cols` in grid2))
    throw new Error(`${paramName}.cols is undefined`);
  if (!Number.isInteger(grid2.rows))
    throw new Error(`${paramName}.rows is not an integer`);
  if (!Number.isInteger(grid2.cols))
    throw new Error(`${paramName}.cols is not an integer`);
};
var inside = (grid2, cell) => {
  if (cell.x < 0 || cell.y < 0)
    return false;
  if (cell.x >= grid2.cols || cell.y >= grid2.rows)
    return false;
  return true;
};
var rectangleForCell = (cell, grid2) => {
  guardCell(cell);
  const size = grid2.size;
  const x = cell.x * size;
  const y = cell.y * size;
  const r = Rect_exports.fromTopLeft({ x, y }, size, size);
  return r;
};
var cellAtPoint = (position, grid2) => {
  const size = grid2.size;
  if (position.x < 0 || position.y < 0)
    return;
  const x = Math.floor(position.x / size);
  const y = Math.floor(position.y / size);
  if (x >= grid2.cols)
    return;
  if (y >= grid2.rows)
    return;
  return { x, y };
};
var allDirections = Object.freeze([`n`, `ne`, `nw`, `e`, `s`, `se`, `sw`, `w`]);
var crossDirections = Object.freeze([`n`, `e`, `s`, `w`]);
var neighbours = (grid2, cell, bounds = `undefined`, directions) => {
  const dirs = directions ?? allDirections;
  const points = dirs.map((c) => offset(grid2, cell, getVectorFromCardinal(c), bounds));
  return zipKeyValue(dirs, points);
};
var cellMiddle = (cell, grid2) => {
  guardCell(cell);
  const size = grid2.size;
  const x = cell.x * size;
  const y = cell.y * size;
  return Object.freeze({ x: x + size / 2, y: y + size / 2 });
};
var getLine = (start2, end) => {
  guardCell(start2);
  guardCell(end);
  let startX = start2.x;
  let startY = start2.y;
  const dx = Math.abs(end.x - startX);
  const dy = Math.abs(end.y - startY);
  const sx = startX < end.x ? 1 : -1;
  const sy = startY < end.y ? 1 : -1;
  let err = dx - dy;
  const cells2 = [];
  while (true) {
    cells2.push(Object.freeze({ x: startX, y: startY }));
    if (startX === end.x && startY === end.y)
      break;
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      startX += sx;
    }
    if (e2 < dx) {
      err += dx;
      startY += sy;
    }
  }
  return cells2;
};
var offsetCardinals = (grid2, start2, steps, bounds = `stop`) => {
  guardGrid(grid2, `grid`);
  guardCell(start2, `start`);
  integer(steps, `aboveZero`, `steps`);
  const directions = allDirections;
  const vectors = directions.map((d) => getVectorFromCardinal(d, steps));
  const cells2 = directions.map((d, i) => offset(grid2, start2, vectors[i], bounds));
  return zipKeyValue(directions, cells2);
};
var getVectorFromCardinal = (cardinal, multiplier = 1) => {
  let v;
  switch (cardinal) {
    case `n`:
      v = { x: 0, y: -1 * multiplier };
      break;
    case `ne`:
      v = { x: 1 * multiplier, y: -1 * multiplier };
      break;
    case `e`:
      v = { x: 1 * multiplier, y: 0 };
      break;
    case `se`:
      v = { x: 1 * multiplier, y: 1 * multiplier };
      break;
    case `s`:
      v = { x: 0, y: 1 * multiplier };
      break;
    case `sw`:
      v = { x: -1 * multiplier, y: 1 * multiplier };
      break;
    case `w`:
      v = { x: -1 * multiplier, y: 0 };
      break;
    case `nw`:
      v = { x: -1 * multiplier, y: -1 * multiplier };
      break;
    default:
      v = { x: 0, y: 0 };
  }
  return Object.freeze(v);
};
var simpleLine = function(start2, end, endInclusive = false) {
  const cells2 = [];
  if (start2.x === end.x) {
    const lastY = endInclusive ? end.y + 1 : end.y;
    for (let y = start2.y; y < lastY; y++) {
      cells2.push({ x: start2.x, y });
    }
  } else if (start2.y === end.y) {
    const lastX = endInclusive ? end.x + 1 : end.x;
    for (let x = start2.x; x < lastX; x++) {
      cells2.push({ x, y: start2.y });
    }
  } else {
    throw new Error(`Only does vertical and horizontal: ${start2.x},${start2.y} - ${end.x},${end.y}`);
  }
  return cells2;
};
var offset = function(grid2, start2, vector, bounds = `undefined`) {
  guardCell(start2, `start`, grid2);
  guardCell(vector);
  guardGrid(grid2, `grid`);
  let x = start2.x;
  let y = start2.y;
  switch (bounds) {
    case `wrap`:
      x += vector.x % grid2.cols;
      y += vector.y % grid2.rows;
      if (x < 0)
        x = grid2.cols + x;
      else if (x >= grid2.cols) {
        x -= grid2.cols;
      }
      if (y < 0)
        y = grid2.rows + y;
      else if (y >= grid2.rows) {
        y -= grid2.rows;
      }
      break;
    case `stop`:
      x += vector.x;
      y += vector.y;
      x = clampIndex(x, grid2.cols);
      y = clampIndex(y, grid2.rows);
      break;
    case `undefined`:
      x += vector.x;
      y += vector.y;
      if (x < 0 || y < 0)
        return;
      if (x >= grid2.cols || y >= grid2.rows)
        return;
      break;
    case `unbounded`:
      x += vector.x;
      y += vector.y;
      break;
    default:
      throw new Error(`Unknown BoundsLogic case ${bounds}`);
  }
  return Object.freeze({ x, y });
};
var neighbourList = (grid2, cell, directions, bounds) => {
  const cellNeighbours = neighbours(grid2, cell, bounds, directions);
  const entries = Object.entries(cellNeighbours);
  return entries.filter(isNeighbour);
};
var visitor = function* (logic, grid2, start2, opts = {}) {
  guardGrid(grid2, `grid`);
  guardCell(start2, `start`, grid2);
  const v = opts.visited ?? setMutable((c) => cellKeyString(c));
  const possibleNeighbours = logic.options ? logic.options : (g, c) => neighbourList(g, c, crossDirections, `undefined`);
  if (!isCell(start2))
    throw new Error(`'start' parameter is undefined or not a cell`);
  let cellQueue = [start2];
  let moveQueue = [];
  let current = null;
  while (cellQueue.length > 0) {
    if (current === null) {
      const nv = cellQueue.pop();
      if (nv === void 0) {
        break;
      }
      current = nv;
    }
    if (!v.has(current)) {
      v.add(current);
      yield current;
      const nextSteps = possibleNeighbours(grid2, current).filter((step) => !v.has(step[1]));
      if (nextSteps.length === 0) {
        if (current !== null) {
          cellQueue = cellQueue.filter((cq) => cellEquals(cq, current));
        }
      } else {
        moveQueue.push(...nextSteps);
      }
    }
    moveQueue = moveQueue.filter((step) => !v.has(step[1]));
    if (moveQueue.length === 0) {
      current = null;
    } else {
      const potential = logic.select(moveQueue);
      if (potential !== void 0) {
        cellQueue.push(potential[1]);
        current = potential[1];
      }
    }
  }
};
var visitorDepth = (grid2, start2, opts = {}) => visitor({
  select: (nbos) => nbos[nbos.length - 1]
}, grid2, start2, opts);
var visitorBreadth = (grid2, start2, opts = {}) => visitor({
  select: (nbos) => nbos[0]
}, grid2, start2, opts);
var randomNeighbour = (nbos) => randomElement(nbos);
var visitorRandomContiguous = (grid2, start2, opts = {}) => visitor({
  select: randomNeighbour
}, grid2, start2, opts);
var visitorRandom = (grid2, start2, opts = {}) => visitor({
  options: (grid3, cell) => {
    const t4 = [];
    for (const c of cells(grid3, cell)) {
      t4.push([`n`, c]);
    }
    return t4;
  },
  select: randomNeighbour
}, grid2, start2, opts);
var visitorRow = (grid2, start2, opts = {}) => {
  const { reversed = false } = opts;
  const neighbourSelect = (nbos) => nbos.find((n) => n[0] === (reversed ? `w` : `e`));
  const possibleNeighbours = (grid3, cell) => {
    if (reversed) {
      if (cell.x > 0) {
        cell = { x: cell.x - 1, y: cell.y };
      } else {
        if (cell.y > 0) {
          cell = { x: grid3.cols - 1, y: cell.y - 1 };
        } else {
          cell = { x: grid3.cols - 1, y: grid3.rows - 1 };
        }
      }
    } else {
      if (cell.x < grid3.rows - 1) {
        cell = { x: cell.x + 1, y: cell.y };
      } else {
        if (cell.y < grid3.rows - 1) {
          cell = { x: 0, y: cell.y + 1 };
        } else {
          cell = { x: 0, y: 0 };
        }
      }
    }
    return [[reversed ? `w` : `e`, cell]];
  };
  const logic = {
    select: neighbourSelect,
    options: possibleNeighbours
  };
  return visitor(logic, grid2, start2, opts);
};
var visitFor = (grid2, start2, steps, visitor2) => {
  integer(steps, ``, `steps`);
  const opts = {
    reversed: steps < 0
  };
  steps = Math.abs(steps);
  let c = start2;
  let v = visitor2(grid2, start2, opts);
  v.next();
  let stepsMade = 0;
  while (stepsMade < steps) {
    stepsMade++;
    const { value } = v.next();
    if (value) {
      c = value;
      if (opts.debug)
        console.log(`stepsMade: ${stepsMade} cell: ${c.x}, ${c.y} reverse: ${opts.reversed}`);
    } else {
      if (steps >= grid2.cols * grid2.rows) {
        steps -= grid2.cols * grid2.rows;
        stepsMade = 0;
        v = visitor2(grid2, start2, opts);
        v.next();
        c = start2;
        if (opts.debug)
          console.log(`resetting visitor to ${steps}`);
      } else
        throw new Error(`Value not received by visitor`);
    }
  }
  return c;
};
var visitorColumn = (grid2, start2, opts = {}) => {
  const { reversed = false } = opts;
  const logic = {
    select: (nbos) => nbos.find((n) => n[0] === (reversed ? `n` : `s`)),
    options: (grid3, cell) => {
      if (reversed) {
        if (cell.y > 0) {
          cell = { x: cell.x, y: cell.y - 1 };
        } else {
          if (cell.x === 0) {
            cell = { x: grid3.cols - 1, y: grid3.rows - 1 };
          } else {
            cell = { x: cell.x - 1, y: grid3.rows - 1 };
          }
        }
      } else {
        if (cell.y < grid3.rows - 1) {
          cell = { x: cell.x, y: cell.y + 1 };
        } else {
          if (cell.x < grid3.cols - 1) {
            cell = { x: cell.x + 1, y: 0 };
          } else {
            cell = { x: 0, y: 0 };
          }
        }
      }
      return [[reversed ? `n` : `s`, cell]];
    }
  };
  return visitor(logic, grid2, start2, opts);
};
var rows = function* (grid2, start2 = { x: 0, y: 0 }) {
  let row = start2.y;
  let rowCells = [];
  for (const c of cells(grid2, start2)) {
    if (c.y !== row) {
      yield rowCells;
      rowCells = [c];
      row = c.y;
    } else {
      rowCells.push(c);
    }
  }
  if (rowCells.length > 0)
    yield rowCells;
};
var cells = function* (grid2, start2 = { x: 0, y: 0 }) {
  guardGrid(grid2, `grid`);
  guardCell(start2, `start`, grid2);
  let { x, y } = start2;
  let canMove = true;
  do {
    yield { x, y };
    x++;
    if (x === grid2.cols) {
      y++;
      x = 0;
    }
    if (y === grid2.rows) {
      y = 0;
      x = 0;
    }
    if (x === start2.x && y === start2.y)
      canMove = false;
  } while (canMove);
};

// src/geometry/Path.ts
var Path_exports = {};
__export(Path_exports, {
  getEnd: () => getEnd,
  getStart: () => getStart
});
var getStart = function(path2) {
  if (Bezier_exports.isQuadraticBezier(path2))
    return path2.a;
  else if (Line_exports.isLine(path2))
    return path2.a;
  else
    throw new Error(`Unknown path type ${JSON.stringify(path2)}`);
};
var getEnd = function(path2) {
  if (Bezier_exports.isQuadraticBezier(path2))
    return path2.b;
  else if (Line_exports.isLine(path2))
    return path2.b;
  else
    throw new Error(`Unknown path type ${JSON.stringify(path2)}`);
};

// src/geometry/Ellipse.ts
var Ellipse_exports = {};
__export(Ellipse_exports, {
  fromDegrees: () => fromDegrees2
});
var fromDegrees2 = (radiusX, radiusY, rotationDeg = 0, startAngleDeg = 0, endAngleDeg = 360) => ({
  radiusX,
  radiusY,
  rotation: degreeToRadian(rotationDeg),
  startAngle: degreeToRadian(startAngleDeg),
  endAngle: degreeToRadian(endAngleDeg)
});

// src/geometry/Polar.ts
var Polar_exports = {};
__export(Polar_exports, {
  fromCartesian: () => fromCartesian,
  isCoord: () => isCoord,
  rotate: () => rotate3,
  rotateDegrees: () => rotateDegrees,
  spiral: () => spiral,
  spiralRaw: () => spiralRaw,
  toCartesian: () => toCartesian
});
var isCoord = (p) => {
  if (p.distance === void 0)
    return false;
  if (p.angleRadian === void 0)
    return false;
  return true;
};
var fromCartesian = (point3, origin) => {
  point3 = subtract3(point3, origin);
  const angle2 = Math.atan2(point3.y, point3.x);
  return Object.freeze({
    ...point3,
    angleRadian: angle2,
    distance: Math.sqrt(point3.x * point3.x + point3.y * point3.y)
  });
};
var toCartesian = (a, b, c) => {
  if (isCoord(a)) {
    if (b === void 0)
      b = Empty;
    if (!isPoint(b))
      throw new Error(`Expecting (Coord, Point). Point param wrong type.`);
    return polarToCartesian(a.distance, a.angleRadian, b);
  } else {
    if (typeof a === `number` && typeof b === `number`) {
      if (c === void 0)
        c = Empty;
      if (!isPoint(c))
        throw new Error(`Expecting (number, number, Point). Point param wrong type`);
      return polarToCartesian(a, b, c);
    } else {
      throw new Error(`Expecting parameters of (number, number). Got: (${typeof a}, ${typeof b}, ${typeof c}). a: ${JSON.stringify(a)}`);
    }
  }
};
function* spiral(smoothness, zoom) {
  let step = 0;
  while (true) {
    const a = smoothness * step++;
    yield {
      distance: zoom * a,
      angleRadian: a,
      step
    };
  }
}
var rotate3 = (c, amountRadian) => Object.freeze({
  ...c,
  angleRadian: c.angleRadian + amountRadian
});
var rotateDegrees = (c, amountDeg) => Object.freeze({
  ...c,
  angleRadian: c.angleRadian + degreeToRadian(amountDeg)
});
var spiralRaw = (step, smoothness, zoom) => {
  const a = smoothness * step;
  return Object.freeze({
    distance: zoom * a,
    angleRadian: a
  });
};
var polarToCartesian = (distance3, angleRadians, origin) => {
  guard(origin);
  return Object.freeze({
    x: origin.x + distance3 * Math.cos(angleRadians),
    y: origin.y + distance3 * Math.sin(angleRadians)
  });
};

// src/geometry/Shape.ts
var Shape_exports = {};
__export(Shape_exports, {
  arrow: () => arrow,
  starburst: () => starburst
});
var starburst = (outerRadius, points = 5, innerRadius, origin = { x: 0, y: 0 }, opts) => {
  integer(points, `positive`, `points`);
  const angle2 = Math.PI * 2 / points;
  const angleHalf = angle2 / 2;
  const initialAngle = opts?.initialAngleRadian ?? -Math.PI / 2;
  if (innerRadius === void 0)
    innerRadius = outerRadius / 2;
  let a = initialAngle;
  const pts = [];
  for (let i = 0; i < points; i++) {
    const peak = toCartesian(outerRadius, a, origin);
    const left = toCartesian(innerRadius, a - angleHalf, origin);
    const right = toCartesian(innerRadius, a + angleHalf, origin);
    pts.push(left, peak);
    if (i + 1 < points)
      pts.push(right);
    a += angle2;
  }
  return pts;
};
var arrow = (origin, from2, opts = {}) => {
  const tailLength = opts.tailLength ?? 10;
  const tailThickness = opts.tailThickness ?? Math.max(tailLength / 5, 5);
  const angleRadian2 = opts.angleRadian ?? 0;
  const arrowSize = opts.arrowSize ?? Math.max(tailLength / 5, 15);
  const triAngle = Math.PI / 2;
  let tri;
  let tailPoints;
  if (from2 === `tip`) {
    tri = Triangle_exports.equilateralFromVertex(origin, arrowSize, triAngle);
    tailPoints = Rect_exports.corners(Rect_exports.fromTopLeft({ x: tri.a.x - tailLength, y: origin.y - tailThickness / 2 }, tailLength, tailThickness));
  } else {
    tailPoints = Rect_exports.corners(Rect_exports.fromTopLeft({ x: origin.x, y: origin.y - tailThickness / 2 }, tailLength, tailThickness));
    tri = Triangle_exports.equilateralFromVertex({ x: origin.x + tailLength + arrowSize * 0.7, y: origin.y }, arrowSize, triAngle);
  }
  const arrow2 = Point_exports.rotate([
    tailPoints[0],
    tailPoints[1],
    tri.a,
    tri.b,
    tri.c,
    tailPoints[2],
    tailPoints[3]
  ], angleRadian2, origin);
  return arrow2;
};

// src/geometry/Triangle.ts
var Triangle_exports = {};
__export(Triangle_exports, {
  Empty: () => Empty2,
  Placeholder: () => Placeholder2,
  angles: () => angles,
  anglesDegrees: () => anglesDegrees,
  apply: () => apply3,
  area: () => area3,
  barycentricCoord: () => barycentricCoord,
  barycentricToCartestian: () => barycentricToCartestian,
  bbox: () => bbox6,
  centroid: () => centroid2,
  corners: () => corners2,
  edges: () => edges2,
  equilateralFromVertex: () => equilateralFromVertex,
  fromFlatArray: () => fromFlatArray2,
  fromPoints: () => fromPoints2,
  fromRadius: () => fromRadius,
  guard: () => guard6,
  innerCircle: () => innerCircle,
  intersectsPoint: () => intersectsPoint2,
  isAcute: () => isAcute,
  isEmpty: () => isEmpty5,
  isEqual: () => isEqual4,
  isEquilateral: () => isEquilateral,
  isIsoceles: () => isIsoceles,
  isOblique: () => isOblique,
  isObtuse: () => isObtuse,
  isPlaceholder: () => isPlaceholder3,
  isRightAngle: () => isRightAngle,
  isTriangle: () => isTriangle,
  lengths: () => lengths2,
  outerCircle: () => outerCircle,
  perimeter: () => perimeter2,
  rotate: () => rotate4,
  rotateByVertex: () => rotateByVertex,
  toFlatArray: () => toFlatArray2
});
var piPi3 = Math.PI * 2;
var Empty2 = Object.freeze({ a: { x: 0, y: 0 }, b: { x: 0, y: 0 }, c: { x: 0, y: 0 } });
var Placeholder2 = Object.freeze({ a: { x: NaN, y: NaN }, b: { x: NaN, y: NaN }, c: { x: NaN, y: NaN } });
var isEmpty5 = (t4) => isEmpty4(t4.a) && isEmpty4(t4.b) && isEmpty4(t4.c);
var isPlaceholder3 = (t4) => isPlaceholder2(t4.a) && isPlaceholder2(t4.b) && isPlaceholder2(t4.c);
var apply3 = (t4, fn) => Object.freeze({
  ...t4,
  a: fn(t4.a, `a`),
  b: fn(t4.b, `b`),
  c: fn(t4.c, `c`)
});
var guard6 = (t4, name = `t`) => {
  if (t4 === void 0)
    throw Error(`{$name} undefined`);
  guard(t4.a, name + `.a`);
  guard(t4.b, name + `.b`);
  guard(t4.c, name + `.c`);
};
var isTriangle = (p) => {
  if (p === void 0)
    return false;
  const tri = p;
  if (!isPoint(tri.a))
    return false;
  if (!isPoint(tri.b))
    return false;
  if (!isPoint(tri.c))
    return false;
  return true;
};
var isEqual4 = (a, b) => isEqual2(a.a, b.a) && isEqual2(a.b, b.b) && isEqual2(a.c, b.c);
var corners2 = (t4) => {
  guard6(t4);
  return [t4.a, t4.b, t4.c];
};
var edges2 = (t4) => {
  guard6(t4);
  return Line_exports.joinPointsToLines(t4.a, t4.b, t4.c, t4.a);
};
var lengths2 = (t4) => {
  guard6(t4);
  return [
    distance2(t4.a, t4.b),
    distance2(t4.b, t4.c),
    distance2(t4.c, t4.a)
  ];
};
var angles = (t4) => {
  guard6(t4);
  return [
    angle(t4.a, t4.b),
    angle(t4.b, t4.c),
    angle(t4.c, t4.a)
  ];
};
var anglesDegrees = (t4) => {
  guard6(t4);
  return radianToDegree(angles(t4));
};
var isEquilateral = (t4) => {
  guard6(t4);
  const [a, b, c] = lengths2(t4);
  return a === b && b === c;
};
var isIsoceles = (t4) => {
  const [a, b, c] = lengths2(t4);
  if (a === b)
    return true;
  if (b === c)
    return true;
  if (c === a)
    return true;
  return false;
};
var isRightAngle = (t4) => angles(t4).some((v) => v === Math.PI / 2);
var isOblique = (t4) => !isRightAngle(t4);
var isAcute = (t4) => !angles(t4).some((v) => v >= Math.PI / 2);
var isObtuse = (t4) => angles(t4).some((v) => v > Math.PI / 2);
var centroid2 = (t4) => {
  guard6(t4);
  const total2 = reduce([t4.a, t4.b, t4.c], (p, acc) => ({
    x: p.x + acc.x,
    y: p.y + acc.y
  }));
  const div = {
    x: total2.x / 3,
    y: total2.y / 3
  };
  return div;
};
var perimeter2 = (t4) => {
  guard6(t4);
  return edges2(t4).reduce((acc, v) => acc + Line_exports.length(v), 0);
};
var area3 = (t4) => {
  guard6(t4, `t`);
  const e = edges2(t4).map((l) => Line_exports.length(l));
  const p = (e[0] + e[1] + e[2]) / 2;
  return Math.sqrt(p * (p - e[0]) * (p - e[1]) * (p - e[2]));
};
var innerCircle = (t4) => {
  const c = centroid2(t4);
  const p = perimeter2(t4) / 2;
  const a = area3(t4);
  const radius = a / p;
  return { radius, ...c };
};
var outerCircle = (t4) => {
  const [a, b, c] = edges2(t4).map((l) => Line_exports.length(l));
  const cent = centroid2(t4);
  const radius = a * b * c / Math.sqrt((a + b + c) * (-a + b + c) * (a - b + c) * (a + b - c));
  return {
    radius,
    ...cent
  };
};
var fromRadius = (origin, radius, opts = {}) => {
  number(radius, `positive`, `radius`);
  guard(origin, `origin`);
  const initialAngleRadian = opts.initialAngleRadian ?? 0;
  const angles2 = [initialAngleRadian, initialAngleRadian + piPi3 * 1 / 3, initialAngleRadian + piPi3 * 2 / 3];
  const points = angles2.map((a) => Polar_exports.toCartesian(radius, a, origin));
  return fromPoints2(points);
};
var rotateByVertex = (triangle3, amountRadian, vertex = `b`) => {
  const origin = vertex === `a` ? triangle3.a : vertex === `b` ? triangle3.b : triangle3.c;
  return Object.freeze({
    a: rotate2(triangle3.a, amountRadian, origin),
    b: rotate2(triangle3.b, amountRadian, origin),
    c: rotate2(triangle3.c, amountRadian, origin)
  });
};
var equilateralFromVertex = (origin = { x: 0, y: 0 }, length5 = 10, angleRadian2 = Math.PI / 2) => {
  const a = project(origin, length5, Math.PI - -angleRadian2 / 2);
  const c = project(origin, length5, Math.PI - angleRadian2 / 2);
  return { a, b: origin, c };
};
var toFlatArray2 = (t4) => {
  guard6(t4);
  return [
    t4.a.x,
    t4.a.y,
    t4.b.x,
    t4.b.y,
    t4.c.x,
    t4.c.y
  ];
};
var fromFlatArray2 = (coords) => {
  if (!Array.isArray(coords))
    throw new Error(`coords expected as array`);
  if (coords.length !== 6)
    throw new Error(`coords array expected with 6 elements. Got ${coords.length}`);
  return fromPoints2(fromNumbers2(...coords));
};
var fromPoints2 = (points) => {
  if (!Array.isArray(points))
    throw new Error(`points expected as array`);
  if (points.length !== 3)
    throw new Error(`points array expected with 3 elements. Got ${points.length}`);
  const t4 = {
    a: points[0],
    b: points[1],
    c: points[2]
  };
  return t4;
};
var bbox6 = (t4, inflation = 0) => {
  const { a, b, c } = t4;
  const xMin = Math.min(a.x, b.x, c.x) - inflation;
  const xMax = Math.max(a.x, b.x, c.x) + inflation;
  const yMin = Math.min(a.y, b.y, c.y) - inflation;
  const yMax = Math.max(a.y, b.y, c.y) + inflation;
  const r = {
    x: xMin,
    y: yMin,
    width: xMax - xMin,
    height: yMax - yMin
  };
  return r;
};
var barycentricCoord = (t4, a, b) => {
  const pt = getPointParam(a, b);
  const ab = (x, y, pa, pb) => (pa.y - pb.y) * x + (pb.x - pa.x) * y + pa.x * pb.y - pb.x * pa.y;
  const alpha = ab(pt.x, pt.y, t4.b, t4.c) / ab(t4.a.x, t4.a.y, t4.b, t4.c);
  const theta = ab(pt.x, pt.y, t4.c, t4.a) / ab(t4.b.x, t4.b.y, t4.c, t4.a);
  const gamma2 = ab(pt.x, pt.y, t4.a, t4.b) / ab(t4.c.x, t4.c.y, t4.a, t4.b);
  return {
    a: alpha,
    b: theta,
    c: gamma2
  };
};
var barycentricToCartestian = (t4, bc) => {
  guard6(t4);
  const { a, b, c } = t4;
  const x = a.x * bc.a + b.x * bc.b + c.x * bc.c;
  const y = a.y * bc.a + b.y * bc.b + c.y * bc.c;
  if (a.z && b.z && c.z) {
    const z = a.z * bc.a + b.z * bc.b + c.z * bc.c;
    return Object.freeze({ x, y, z });
  } else {
    return Object.freeze({ x, y });
  }
};
var intersectsPoint2 = (t4, a, b) => {
  const box = bbox6(t4);
  const pt = getPointParam(a, b);
  if (!Rect_exports.intersectsPoint(box, pt))
    return false;
  const bc = barycentricCoord(t4, pt);
  return 0 <= bc.a && bc.a <= 1 && 0 <= bc.b && bc.b <= 1 && 0 <= bc.c && bc.c <= 1;
};
var rotate4 = (t4, amountRadian, origin) => {
  if (amountRadian === void 0 || amountRadian === 0)
    return t4;
  if (origin === void 0)
    origin = centroid2(t4);
  return Object.freeze({
    ...t4,
    a: rotate2(t4.a, amountRadian, origin),
    b: rotate2(t4.b, amountRadian, origin),
    c: rotate2(t4.c, amountRadian, origin)
  });
};

// src/geometry/index.ts
function degreeToRadian(angleInDegrees) {
  if (Array.isArray(angleInDegrees)) {
    return angleInDegrees.map((v) => v * (Math.PI / 180));
  } else {
    return angleInDegrees * (Math.PI / 180);
  }
}
function radianToDegree(angleInRadians) {
  if (Array.isArray(angleInRadians)) {
    return angleInRadians.map((v) => v * 180 / Math.PI);
  } else {
    return angleInRadians * 180 / Math.PI;
  }
}
var radiansFromAxisX = (point3) => Math.atan2(point3.x, point3.y);
try {
  if (typeof window !== `undefined`) {
    window.ixfx = { ...window.ixfx, Geometry: { Circles: Circle_exports, Arcs: Arc_exports, Lines: Line_exports, Rects: Rect_exports, Points: Point_exports, Paths: Path_exports, Grids: Grid_exports, Beziers: Bezier_exports, Compound: CompoundPath_exports, Ellipses: Ellipse_exports, Polar: Polar_exports, Shapes: Shape_exports, radiansFromAxisX, radianToDegree, degreeToRadian } };
  }
} catch {
}

// src/io/index.ts
var io_exports = {};
__export(io_exports, {
  AudioAnalysers: () => AudioAnalyser_exports,
  AudioVisualisers: () => AudioVisualiser_exports,
  Bluetooth: () => NordicBleDevice_exports,
  Camera: () => Camera_exports,
  Codec: () => Codec,
  Espruino: () => Espruino_exports,
  Serial: () => Serial_exports,
  StringReceiveBuffer: () => StringReceiveBuffer,
  StringWriteBuffer: () => StringWriteBuffer
});

// src/io/NordicBleDevice.ts
var NordicBleDevice_exports = {};
__export(NordicBleDevice_exports, {
  NordicBleDevice: () => NordicBleDevice,
  defaultOpts: () => defaultOpts
});

// src/io/Codec.ts
var Codec = class {
  constructor() {
    __publicField(this, "enc", new TextEncoder());
    __publicField(this, "dec", new TextDecoder(`utf-8`));
  }
  toBuffer(str) {
    return this.enc.encode(str);
  }
  fromBuffer(buffer) {
    return this.dec.decode(buffer);
  }
};

// src/io/StringReceiveBuffer.ts
var StringReceiveBuffer = class {
  constructor(onData, separator = `
`) {
    this.onData = onData;
    this.separator = separator;
    __publicField(this, "buffer", ``);
    __publicField(this, "stream");
  }
  clear() {
    this.buffer = ``;
  }
  writable() {
    if (this.stream === void 0)
      this.stream = this.createWritable();
    return this.stream;
  }
  createWritable() {
    const b = this;
    return new WritableStream({
      write(chunk) {
        b.add(chunk);
      },
      close() {
        b.clear();
      }
    });
  }
  addImpl(str) {
    const pos = str.indexOf(this.separator);
    if (pos < 0) {
      this.buffer += str;
      return ``;
    }
    const part = str.substring(0, pos);
    try {
      this.onData(this.buffer + part);
      str = str.substring(part.length + this.separator.length);
    } catch (ex) {
      console.warn(ex);
    }
    this.buffer = ``;
    return str;
  }
  add(str) {
    while (str.length > 0) {
      str = this.addImpl(str);
    }
  }
};

// src/io/StringWriteBuffer.ts
var StringWriteBuffer = class {
  constructor(onData, chunkSize = -1) {
    this.onData = onData;
    this.chunkSize = chunkSize;
    __publicField(this, "paused", false);
    __publicField(this, "queue");
    __publicField(this, "writer");
    __publicField(this, "intervalMs");
    __publicField(this, "stream");
    this.intervalMs = 10;
    this.queue = queueMutable();
    this.writer = continuously(() => this.onWrite(), this.intervalMs);
  }
  clear() {
    this.queue = queueMutable();
  }
  writable() {
    if (this.stream === void 0)
      this.stream = this.createWritable();
    return this.stream;
  }
  createWritable() {
    const b = this;
    return new WritableStream({
      write(chunk) {
        b.add(chunk);
      },
      close() {
        b.clear();
      }
    });
  }
  async onWrite() {
    if (this.queue.isEmpty) {
      return false;
    }
    if (this.paused) {
      console.warn(`WriteBuffer.onWrite: paused...`);
      return true;
    }
    const s = this.queue.dequeue();
    if (s === void 0)
      return false;
    await this.onData(s);
    return true;
  }
  add(str) {
    if (this.chunkSize > 0) {
      this.queue.enqueue(...splitByLength(str, this.chunkSize));
    } else {
      this.queue.enqueue(str);
    }
    this.writer.start();
  }
};

// src/flow/Retry.ts
var retry = async (callback, attempts = 5, startingTimeoutMs = 200, cancelToken) => {
  integer(attempts, `positive`, `attempts`);
  integer(startingTimeoutMs, `positive`, `startingTimeoutMs`);
  let timeout = startingTimeoutMs;
  let totalSlept = 0;
  while (attempts > 0) {
    try {
      return await callback();
    } catch (ex) {
      attempts--;
    }
    totalSlept += timeout;
    if (cancelToken && cancelToken.cancel)
      throw new Error(`Cancelled`);
    await sleep(timeout);
    if (cancelToken && cancelToken.cancel)
      throw new Error(`Cancelled`);
    timeout *= 2;
  }
  throw new Error(`Retry failed after ${attempts} attempts over ${totalSlept} ms.`);
};

// src/io/BleDevice.ts
var BleDevice = class extends SimpleEventEmitter {
  constructor(device, config) {
    super();
    this.device = device;
    this.config = config;
    __publicField(this, "states");
    __publicField(this, "codec");
    __publicField(this, "rx");
    __publicField(this, "tx");
    __publicField(this, "gatt");
    __publicField(this, "verboseLogging", false);
    __publicField(this, "rxBuffer");
    __publicField(this, "txBuffer");
    this.verboseLogging = config.debug;
    this.txBuffer = new StringWriteBuffer(async (data) => {
      await this.writeInternal(data);
    }, config.chunkSize);
    this.rxBuffer = new StringReceiveBuffer((line3) => {
      this.fireEvent(`data`, { data: line3 });
    });
    this.codec = new Codec();
    this.states = new StateMachine(`ready`, {
      ready: `connecting`,
      connecting: [`connected`, `closed`],
      connected: [`closed`],
      closed: `connecting`
    });
    this.states.addEventListener(`change`, (evt) => {
      this.fireEvent(`change`, evt);
      this.verbose(`${evt.priorState} -> ${evt.newState}`);
      if (evt.priorState === `connected`) {
        this.rxBuffer.clear();
        this.txBuffer.clear();
      }
    });
    device.addEventListener(`gattserverdisconnected`, () => {
      if (this.isClosed)
        return;
      this.verbose(`GATT server disconnected`);
      this.states.state = `closed`;
    });
    this.verbose(`ctor ${device.name} ${device.id}`);
  }
  get isConnected() {
    return this.states.state === `connected`;
  }
  get isClosed() {
    return this.states.state === `closed`;
  }
  write(txt) {
    if (this.states.state !== `connected`)
      throw new Error(`Cannot write while state is ${this.states.state}`);
    this.txBuffer.add(txt);
  }
  async writeInternal(txt) {
    this.verbose(`writeInternal ${txt}`);
    const tx = this.tx;
    if (tx === void 0)
      throw new Error(`Unexpectedly without tx characteristic`);
    try {
      await tx.writeValue(this.codec.toBuffer(txt));
    } catch (ex) {
      this.warn(ex);
    }
  }
  disconnect() {
    if (this.states.state !== `connected`)
      return;
    this.gatt?.disconnect();
  }
  async connect() {
    const attempts = this.config.connectAttempts ?? 3;
    this.states.state = `connecting`;
    this.verbose(`connect`);
    const gatt = this.device.gatt;
    if (gatt === void 0)
      throw new Error(`Gatt not available on device`);
    await retry(async () => {
      const server = await gatt.connect();
      this.verbose(`Getting primary service`);
      const service = await server.getPrimaryService(this.config.service);
      this.verbose(`Getting characteristics`);
      const rx2 = await service.getCharacteristic(this.config.rxGattCharacteristic);
      const tx = await service.getCharacteristic(this.config.txGattCharacteristic);
      rx2.addEventListener(`characteristicvaluechanged`, (evt) => this.onRx(evt));
      this.rx = rx2;
      this.tx = tx;
      this.gatt = gatt;
      this.states.state = `connected`;
      await rx2.startNotifications();
    }, attempts, 200);
  }
  onRx(evt) {
    const rx2 = this.rx;
    if (rx2 === void 0)
      return;
    const view = evt.target.value;
    if (view === void 0)
      return;
    let str = this.codec.fromBuffer(view.buffer);
    const plzStop = indexOfCharCode(str, 19);
    const plzStart = indexOfCharCode(str, 17);
    if (plzStart && plzStop < plzStart) {
      this.verbose(`Tx plz start`);
      str = omitChars(str, plzStart, 1);
      this.txBuffer.paused = false;
    }
    if (plzStop && plzStop > plzStart) {
      this.verbose(`Tx plz stop`);
      str = omitChars(str, plzStop, 1);
      this.txBuffer.paused = true;
    }
    this.rxBuffer.add(str);
  }
  verbose(m) {
    if (this.verboseLogging)
      console.info(`${this.config.name} `, m);
  }
  log(m) {
    console.log(`${this.config.name} `, m);
  }
  warn(m) {
    console.warn(`${this.config.name} `, m);
  }
};

// src/io/NordicBleDevice.ts
var defaultOpts = {
  chunkSize: 20,
  service: `6e400001-b5a3-f393-e0a9-e50e24dcca9e`,
  txGattCharacteristic: `6e400002-b5a3-f393-e0a9-e50e24dcca9e`,
  rxGattCharacteristic: `6e400003-b5a3-f393-e0a9-e50e24dcca9e`,
  name: `NordicDevice`,
  connectAttempts: 5,
  debug: false
};
var NordicBleDevice = class extends BleDevice {
  constructor(device, opts = {}) {
    super(device, { ...defaultOpts, ...opts });
  }
};

// src/io/AudioAnalyser.ts
var AudioAnalyser_exports = {};
__export(AudioAnalyser_exports, {
  AudioAnalyser: () => AudioAnalyser,
  basic: () => basic,
  freq: () => freq,
  peakLevel: () => peakLevel
});

// src/io/AudioVisualiser.ts
var AudioVisualiser_exports = {};
__export(AudioVisualiser_exports, {
  default: () => AudioVisualiser
});

// src/data/TrackedValue.ts
var TrackerBase = class {
  constructor(id, opts = {}) {
    this.id = id;
    __publicField(this, "seenCount");
    __publicField(this, "storeIntermediate");
    __publicField(this, "resetAfterSamples");
    this.storeIntermediate = opts.storeIntermediate ?? false;
    this.resetAfterSamples = opts.resetAfterSamples ?? -1;
    this.seenCount = 0;
  }
  reset() {
    this.seenCount = 0;
    this.onReset();
  }
  seen(...p) {
    if (this.resetAfterSamples > 0 && this.seenCount > this.resetAfterSamples) {
      this.reset();
    }
    this.seenCount += p.length;
    const t4 = this.seenImpl(p);
    this.onSeen(t4);
  }
  onSeen(_p) {
  }
};
var PrimitiveTracker = class extends TrackerBase {
  constructor(id, opts) {
    super(id, opts);
    __publicField(this, "values");
    __publicField(this, "timestamps");
    this.values = [];
    this.timestamps = [];
  }
  get last() {
    return this.values.at(-1);
  }
  get initial() {
    return this.values.at(0);
  }
  get size() {
    return this.values.length;
  }
  get elapsed() {
    if (this.values.length < 0)
      throw new Error(`No values seen yet`);
    return Date.now() - this.timestamps[0];
  }
  onReset() {
    this.values = [];
    this.timestamps = [];
  }
  seenImpl(p) {
    const last = p.at(-1);
    const now = Date.now();
    if (this.storeIntermediate) {
      this.values.push(...p);
      this.timestamps.push(...repeat(p.length, () => now));
    } else if (this.values.length === 0) {
      this.values.push(last);
      this.timestamps.push(now);
    } else if (this.values.length === 2) {
      this.values[1] = last;
      this.timestamps[1] = now;
    } else if (this.values.length === 1) {
      this.values.push(last);
      this.timestamps.push(now);
    }
    return p;
  }
};
var ObjectTracker = class extends TrackerBase {
  constructor(id, opts) {
    super(id, opts);
    __publicField(this, "values");
    this.values = [];
  }
  onReset() {
    this.values = [];
  }
  seenImpl(p) {
    const ts = p.map((v) => `at` in v ? v : {
      ...v,
      at: Date.now()
    });
    const last = ts.at(-1);
    if (this.storeIntermediate)
      this.values.push(...ts);
    else if (this.values.length === 0) {
      this.values.push(last);
    } else if (this.values.length === 2) {
      this.values[1] = last;
    } else if (this.values.length === 1) {
      this.values.push(last);
    }
    return ts;
  }
  get last() {
    if (this.values.length === 1)
      return this.values[0];
    return this.values.at(-1);
  }
  get initial() {
    return this.values.at(0);
  }
  get size() {
    return this.values.length;
  }
  get elapsed() {
    return Date.now() - this.values[0].at;
  }
};
var TrackedValueMap = class {
  constructor(creator) {
    __publicField(this, "store");
    __publicField(this, "gog");
    this.store = /* @__PURE__ */ new Map();
    this.gog = getOrGenerate(this.store, creator);
  }
  get size() {
    return this.store.size;
  }
  has(id) {
    return this.store.has(id);
  }
  async seen(id, ...values) {
    const trackedValue = await this.getTrackedValue(id, ...values);
    return trackedValue.seen(...values);
  }
  async getTrackedValue(id, ...values) {
    if (id === null)
      throw new Error(`id parameter cannot be null`);
    if (id === void 0)
      throw new Error(`id parameter cannot be undefined`);
    const trackedValue = await this.gog(id, values[0]);
    return trackedValue;
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
  *values() {
    yield* this.store.values();
  }
  trackedByAge() {
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
  valuesByAge() {
    const tb = this.trackedByAge();
    return tb.map((t4) => t4.last);
  }
  *last() {
    for (const p of this.store.values()) {
      yield p.last;
    }
  }
  *initialValues() {
    for (const p of this.store.values()) {
      yield p.initial;
    }
  }
  get(id) {
    return this.store.get(id);
  }
};

// src/data/NumberTracker.ts
var NumberTracker = class extends PrimitiveTracker {
  constructor() {
    super(...arguments);
    __publicField(this, "total", 0);
    __publicField(this, "min", Number.MAX_SAFE_INTEGER);
    __publicField(this, "max", Number.MIN_SAFE_INTEGER);
  }
  get avg() {
    return this.total / this.seenCount;
  }
  difference() {
    if (this.last === void 0)
      return;
    if (this.initial === void 0)
      return;
    return this.last - this.initial;
  }
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
  onSeen(values) {
    if (values.some((v) => Number.isNaN(v)))
      throw Error(`Cannot add NaN`);
    this.total = values.reduce((acc, v) => acc + v, this.total);
    this.min = Math.min(...values, this.min);
    this.max = Math.max(...values, this.max);
  }
  getMinMaxAvg() {
    return {
      min: this.min,
      max: this.max,
      avg: this.avg
    };
  }
};
var numberTracker = (id, opts) => new NumberTracker(id ?? ``, opts ?? {});

// src/io/AudioVisualiser.ts
var AudioVisualiser = class {
  constructor(parentElem, audio) {
    __publicField(this, "freqMaxRange", 200);
    __publicField(this, "audio");
    __publicField(this, "parent");
    __publicField(this, "lastPointer", { x: 0, y: 0 });
    __publicField(this, "pointerDown", false);
    __publicField(this, "pointerClicking", false);
    __publicField(this, "pointerClickDelayMs", 100);
    __publicField(this, "pointerDelaying", false);
    __publicField(this, "waveTracker");
    __publicField(this, "freqTracker");
    __publicField(this, "el");
    this.audio = audio;
    this.parent = parentElem;
    this.waveTracker = numberTracker();
    this.freqTracker = numberTracker();
    parentElem.innerHTML = `
    <section>
      <button id="rendererComponentToggle">\u{1F53C}</button>
      <div>
        <h1>Visualiser</h1>
        <div style="display:flex; flex-wrap: wrap">
          <div class="visPanel">
            <h2>Frequency distribution</h2>
            <br />
            <canvas id="rendererComponentFreqData" height="200" width="400"></canvas>
          </div>
          <div class="visPanel">
            <h2>Waveform</h2>
            <button id="rendererComponentWaveReset">Reset</button>
            <div>
              Press and hold on wave to measure
            </div>
            <br />
            <canvas id="rendererComponentWaveData" height="200" width="400"></canvas>
          </div>
        </div>
      </div>
    </section>
    `;
    this.el = parentElem.children[0];
    document.getElementById(`rendererComponentToggle`)?.addEventListener(`click`, () => {
      this.setExpanded(!this.isExpanded());
    });
    this.el.addEventListener(`pointermove`, (e) => this.onPointer(e));
    this.el.addEventListener(`pointerup`, () => {
      this.pointerDelaying = false;
      this.pointerDown = false;
    });
    this.el.addEventListener(`pointerdown`, () => {
      this.pointerDelaying = true;
      setTimeout(() => {
        if (this.pointerDelaying) {
          this.pointerDelaying = false;
          this.pointerDown = true;
        }
      }, this.pointerClickDelayMs);
    });
    this.el.addEventListener(`pointerleave`, () => {
      this.pointerDelaying = false;
      this.pointerDown = false;
    });
    document.getElementById(`rendererComponentWaveReset`)?.addEventListener(`click`, () => {
      this.clear();
    });
  }
  renderFreq(freq2) {
    if (!this.isExpanded())
      return;
    if (!freq2)
      return;
    const canvas = document.getElementById(`rendererComponentFreqData`);
    if (canvas === null)
      throw new Error(`Cannot find canvas element`);
    const g = canvas.getContext(`2d`);
    if (g === null)
      throw new Error(`Cannot create drawing context`);
    const bins = freq2.length;
    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;
    g.clearRect(0, 0, canvasWidth, canvasHeight);
    const pointer = this.getPointerRelativeTo(canvas);
    const width = canvasWidth / bins;
    const minMax = Arrays_exports.minMaxAvg(freq2);
    for (let i = 0; i < bins; i++) {
      if (!Number.isFinite(freq2[i]))
        continue;
      const value = freq2[i] - minMax.min;
      const valueRelative = value / this.freqMaxRange;
      const height = Math.abs(canvasHeight * valueRelative);
      const offset2 = canvasHeight - height;
      const hue2 = i / bins * 360;
      const left = i * width;
      g.fillStyle = `hsl(` + hue2 + `, 100%, 50%)`;
      if (pointer.y > 0 && pointer.y <= canvasHeight && pointer.x >= left && pointer.x <= left + width) {
        if (this.freqTracker.id !== i.toString()) {
          this.freqTracker = numberTracker(i.toString());
        }
        this.freqTracker.seen(freq2[i]);
        const freqMma = this.freqTracker.getMinMaxAvg();
        g.fillStyle = `black`;
        if (this.audio) {
          g.fillText(`Frequency (${i}) at pointer: ${this.audio.getFrequencyAtIndex(i).toLocaleString(`en`)} - ${this.audio.getFrequencyAtIndex(i + 1).toLocaleString(`en`)}`, 2, 10);
        }
        g.fillText(`Raw value: ${freq2[i].toFixed(2)}`, 2, 20);
        g.fillText(`Min: ${freqMma.min.toFixed(2)}`, 2, 40);
        g.fillText(`Max: ${freqMma.max.toFixed(2)}`, 60, 40);
        g.fillText(`Avg: ${freqMma.avg.toFixed(2)}`, 120, 40);
      }
      g.fillRect(left, offset2, width, height);
    }
  }
  isExpanded() {
    const contentsElem = this.el.querySelector(`div`);
    if (contentsElem === null)
      throw new Error(`contents div not found`);
    return contentsElem.style.display === ``;
  }
  setExpanded(value) {
    const contentsElem = this.el.querySelector(`div`);
    const button = this.el.querySelector(`button`);
    if (button === null)
      throw new Error(`Button element not found`);
    if (contentsElem === null)
      throw new Error(`Contents element not found`);
    if (value) {
      contentsElem.style.display = ``;
      button.innerText = `\u{1F53C}`;
    } else {
      contentsElem.style.display = `none`;
      button.innerText = `\u{1F53D}`;
    }
  }
  clear() {
    this.clearCanvas(document.getElementById(`rendererComponentFreqData`));
    this.clearCanvas(document.getElementById(`rendererComponentWaveData`));
  }
  clearCanvas(canvas) {
    if (canvas === null)
      throw new Error(`Canvas is null`);
    const g = canvas.getContext(`2d`);
    if (g === null)
      throw new Error(`Cannot create drawing context`);
    g.fillStyle = `white`;
    g.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  }
  renderWave(wave, bipolar = true) {
    if (!this.isExpanded())
      return;
    if (!wave)
      return;
    const canvas = document.getElementById(`rendererComponentWaveData`);
    if (canvas === null)
      throw new Error(`Cannot find wave canvas`);
    const g = canvas.getContext(`2d`);
    if (g === null)
      throw new Error(`Cannot create drawing context for wave`);
    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;
    const pointer = this.getPointerRelativeTo(canvas);
    const infoAreaHeight = 20;
    const infoAreaWidth = 60;
    const bins = wave.length;
    g.fillStyle = `white`;
    g.fillRect(0, 0, infoAreaWidth, infoAreaHeight);
    const width = canvasWidth / bins;
    g.fillStyle = `rgba(255, 255, 255, 0.03)`;
    g.fillRect(0, 20, canvasWidth, canvasHeight);
    g.fillStyle = `red`;
    if (bipolar) {
      g.fillRect(0, canvasHeight / 2, canvasWidth, 1);
    } else {
      g.fillRect(0, canvasHeight - 1, canvasWidth, 1);
    }
    g.lineWidth = 1;
    g.strokeStyle = `black`;
    g.beginPath();
    let x = 0;
    for (let i = 0; i < bins; i++) {
      const height = wave[i] * canvasHeight;
      const y = bipolar ? canvasHeight / 2 - height : canvasHeight - height;
      if (i === 0) {
        g.moveTo(x, y);
      } else {
        g.lineTo(x, y);
      }
      x += width;
      if (this.pointerDown)
        this.waveTracker.seen(wave[i]);
    }
    g.lineTo(canvasWidth, bipolar ? canvasHeight / 2 : canvasHeight);
    g.stroke();
    if (this.pointerDown) {
      const waveMma = this.waveTracker.getMinMaxAvg();
      g.fillStyle = `rgba(255,255,0,1)`;
      g.fillRect(infoAreaWidth, 0, 150, 20);
      g.fillStyle = `black`;
      g.fillText(`Min: ` + waveMma.min.toFixed(2), 60, 10);
      g.fillText(`Max: ` + waveMma.max.toFixed(2), 110, 10);
      g.fillText(`Avg: ` + waveMma.avg.toFixed(2), 160, 10);
    } else {
      this.waveTracker.reset();
    }
    if (pointer.y > 0 && pointer.y <= canvasHeight && pointer.x >= 0 && pointer.x <= canvasWidth) {
      g.fillStyle = `black`;
      g.fillText(`Level: ` + (1 - pointer.y / canvasHeight).toFixed(2), 2, 10);
    }
  }
  getPointerRelativeTo(elem) {
    const rect2 = elem.getBoundingClientRect();
    return {
      x: this.lastPointer.x - rect2.left - window.scrollX,
      y: this.lastPointer.y - rect2.top - window.scrollY
    };
  }
  onPointer(evt) {
    this.lastPointer = {
      x: evt.pageX,
      y: evt.pageY
    };
    evt.preventDefault();
  }
};

// src/io/AudioAnalyser.ts
var basic = (onData, opts = {}) => new AudioAnalyser((node, analyser) => {
  const freq2 = new Float32Array(node.frequencyBinCount);
  const wave = new Float32Array(node.fftSize);
  node.getFloatFrequencyData(freq2);
  node.getFloatTimeDomainData(wave);
  onData(freq2, wave, analyser);
}, opts);
var freq = (onData, opts = {}) => new AudioAnalyser((node, analyser) => {
  const freq2 = new Float32Array(node.frequencyBinCount);
  node.getFloatFrequencyData(freq2);
  onData(freq2, analyser);
}, opts);
var peakLevel = (onData, opts = {}) => new AudioAnalyser((node, analyser) => {
  const wave = new Float32Array(node.fftSize);
  node.getFloatTimeDomainData(wave);
  onData(Arrays_exports.maxFast(wave), analyser);
}, opts);
var _isPaused, _initInProgress;
var AudioAnalyser = class {
  constructor(analyse, opts = {}) {
    __publicField(this, "showVis");
    __publicField(this, "fftSize");
    __publicField(this, "smoothingTimeConstant");
    __privateAdd(this, _isPaused, false);
    __publicField(this, "debug");
    __privateAdd(this, _initInProgress, false);
    __publicField(this, "visualiser");
    __publicField(this, "audioCtx");
    __publicField(this, "analyserNode");
    __publicField(this, "analyse");
    this.showVis = opts.showVis ?? false;
    this.fftSize = opts.fftSize ?? 1024;
    this.debug = opts.debug ?? false;
    this.smoothingTimeConstant = opts.smoothingTimeConstant ?? 0.8;
    integer(this.fftSize, `positive`, `opts.fftSize`);
    number(this.smoothingTimeConstant, `percentage`, `opts.smoothingTimeConstant`);
    if (!isPowerOfTwo(this.fftSize))
      throw new Error(`fftSize must be a power of two from 32 to 32768 (${this.fftSize})`);
    if (this.fftSize < 32)
      throw new Error(`fftSize must be at least 32`);
    if (this.fftSize > 32768)
      throw new Error(`fftSize must be no greater than 32768`);
    this.analyse = analyse;
    this.paused = false;
    this.init();
    const visualiserEl = document.getElementById(`audio-visualiser`);
    if (visualiserEl) {
      const visualiser = new AudioVisualiser(visualiserEl, this);
      visualiser.setExpanded(this.showVis);
      this.visualiser = visualiser;
    }
  }
  init() {
    if (__privateGet(this, _initInProgress)) {
      if (this.debug)
        console.debug(`Init already in progress`);
      return;
    }
    __privateSet(this, _initInProgress, true);
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream2) => {
      this.onMicSuccess(stream2);
    }).catch((err) => {
      __privateSet(this, _initInProgress, false);
      console.error(err);
    });
  }
  get paused() {
    return __privateGet(this, _isPaused);
  }
  set paused(v) {
    if (v === __privateGet(this, _isPaused))
      return;
    __privateSet(this, _isPaused, v);
    if (!v) {
      if (this.debug)
        console.log(`Unpaused`);
      window.requestAnimationFrame(this.analyseLoop.bind(this));
    } else {
      if (this.debug)
        console.log(`Paused`);
    }
  }
  setup(audioCtx, stream2) {
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = this.fftSize;
    analyser.smoothingTimeConstant = this.smoothingTimeConstant;
    const micSource = audioCtx.createMediaStreamSource(stream2);
    micSource.connect(analyser);
    return analyser;
  }
  onMicSuccess(stream2) {
    try {
      const audioCtx = new AudioContext();
      audioCtx.addEventListener(`statechange`, () => {
        if (this.debug)
          console.log(`Audio context state: ${audioCtx.state}`);
      });
      this.audioCtx = audioCtx;
      this.analyserNode = this.setup(audioCtx, stream2);
      window.requestAnimationFrame(this.analyseLoop.bind(this));
    } catch (ex) {
      __privateSet(this, _initInProgress, false);
      console.error(ex);
    }
  }
  analyseLoop() {
    if (this.paused) {
      if (this.debug)
        console.log(`Paused`);
      return;
    }
    const a = this.analyserNode;
    if (a === void 0) {
      console.warn(`Analyser undefined`);
      return;
    }
    try {
      this.analyse(a, this);
    } catch (e) {
      console.error(e);
    }
    window.requestAnimationFrame(this.analyseLoop.bind(this));
  }
  getFrequencyRangeMax(lowFreq, highFreq, freqData) {
    const samples = this.sliceByFrequency(lowFreq, highFreq, freqData);
    return Arrays_exports.max(...samples);
  }
  sliceByFrequency(lowFreq, highFreq, freqData) {
    const lowIndex = this.getIndexForFrequency(lowFreq);
    const highIndex = this.getIndexForFrequency(highFreq);
    const samples = freqData.slice(lowIndex, highIndex);
    return samples;
  }
  getFrequencyAtIndex(index) {
    const a = this.analyserNode;
    const ctx = this.audioCtx;
    if (a === void 0)
      throw new Error(`Analyser not available`);
    if (ctx === void 0)
      throw new Error(`Audio context not available`);
    integer(index, `positive`, `index`);
    if (index > a.frequencyBinCount)
      throw new Error(`Index ${index} exceeds frequency bin count ${a.frequencyBinCount}`);
    return index * ctx.sampleRate / (a.frequencyBinCount * 2);
  }
  getIndexForFrequency(freq2) {
    const a = this.analyserNode;
    if (a === void 0)
      throw new Error(`Analyser not available`);
    const nyquist = a.context.sampleRate / 2;
    const index = Math.round(freq2 / nyquist * a.frequencyBinCount);
    if (index < 0)
      return 0;
    if (index >= a.frequencyBinCount)
      return a.frequencyBinCount - 1;
    return index;
  }
};
_isPaused = new WeakMap();
_initInProgress = new WeakMap();

// src/io/Espruino.ts
var Espruino_exports = {};
__export(Espruino_exports, {
  EspruinoBleDevice: () => EspruinoBleDevice,
  EspruinoSerialDevice: () => EspruinoSerialDevice,
  connectBle: () => connectBle,
  deviceEval: () => deviceEval,
  puck: () => puck,
  serial: () => serial
});

// src/io/EspruinoBleDevice.ts
var EspruinoBleDevice = class extends NordicBleDevice {
  constructor(device, opts = {}) {
    super(device, opts);
    __publicField(this, "evalTimeoutMs");
    __publicField(this, "evalReplyBluetooth", true);
    this.evalTimeoutMs = opts.evalTimeoutMs ?? 5 * 1e3;
  }
  async writeScript(code) {
    this.write(`reset();
`);
    this.write(`${code}
`);
  }
  async eval(code, opts = {}) {
    return deviceEval(code, opts, this, `Bluetooth.println`, false, (msg) => {
      this.warn(msg);
    });
  }
};

// src/io/Serial.ts
var Serial_exports = {};
__export(Serial_exports, {
  Device: () => Device
});

// src/io/JsonDevice.ts
var JsonDevice = class extends SimpleEventEmitter {
  constructor(config = {}) {
    super();
    __publicField(this, "states");
    __publicField(this, "codec");
    __publicField(this, "verboseLogging", false);
    __publicField(this, "name");
    __publicField(this, "connectAttempts");
    __publicField(this, "chunkSize");
    __publicField(this, "rxBuffer");
    __publicField(this, "txBuffer");
    this.verboseLogging = config.debug ?? false;
    this.chunkSize = config.chunkSize ?? 1024;
    this.connectAttempts = config.connectAttempts ?? 3;
    this.name = config.name ?? `JsonDevice`;
    this.txBuffer = new StringWriteBuffer(async (data) => {
      await this.writeInternal(data);
    }, config.chunkSize);
    this.rxBuffer = new StringReceiveBuffer((line3) => {
      this.fireEvent(`data`, { data: line3 });
    });
    this.codec = new Codec();
    this.states = new StateMachine(`ready`, {
      ready: `connecting`,
      connecting: [`connected`, `closed`],
      connected: [`closed`],
      closed: `connecting`
    });
    this.states.addEventListener(`change`, (evt) => {
      this.fireEvent(`change`, evt);
      this.verbose(`${evt.priorState} -> ${evt.newState}`);
      if (evt.priorState === `connected`) {
        this.rxBuffer.clear();
        this.txBuffer.clear();
      }
    });
  }
  get isConnected() {
    return this.states.state === `connected`;
  }
  get isClosed() {
    return this.states.state === `closed`;
  }
  write(txt) {
    if (this.states.state !== `connected`)
      throw new Error(`Cannot write while state is ${this.states.state}`);
    this.txBuffer.add(txt);
  }
  close() {
    if (this.states.state !== `connected`)
      return;
    this.onClosed();
  }
  async connect() {
    const attempts = this.connectAttempts;
    this.states.state = `connecting`;
    await this.onPreConnect();
    await retry(async () => {
      await this.onConnectAttempt();
      this.states.state = `connected`;
    }, attempts, 200);
  }
  onRx(evt) {
    const view = evt.target.value;
    if (view === void 0)
      return;
    let str = this.codec.fromBuffer(view.buffer);
    const plzStop = indexOfCharCode(str, 19);
    const plzStart = indexOfCharCode(str, 17);
    if (plzStart && plzStop < plzStart) {
      this.verbose(`Tx plz start`);
      str = omitChars(str, plzStart, 1);
      this.txBuffer.paused = false;
    }
    if (plzStop && plzStop > plzStart) {
      this.verbose(`Tx plz stop`);
      str = omitChars(str, plzStop, 1);
      this.txBuffer.paused = true;
    }
    this.rxBuffer.add(str);
  }
  verbose(m) {
    if (this.verboseLogging)
      console.info(`${this.name} `, m);
  }
  log(m) {
    console.log(`${this.name} `, m);
  }
  warn(m) {
    console.warn(`${this.name} `, m);
  }
};

// src/io/Serial.ts
var Device = class extends JsonDevice {
  constructor(config = {}) {
    super(config);
    this.config = config;
    __publicField(this, "port");
    __publicField(this, "tx");
    __publicField(this, "baudRate");
    this.baudRate = config.baudRate ?? 9600;
    if (config.name === void 0)
      super.name = `Serial.Device`;
    this.rxBuffer.separator = `\r
`;
  }
  async writeInternal(txt) {
    if (this.tx === void 0)
      throw new Error(`tx not ready`);
    try {
      this.tx.write(txt);
    } catch (ex) {
      this.warn(ex);
    }
  }
  onClosed() {
    try {
      this.port?.close();
    } catch (ex) {
      this.warn(ex);
    }
    this.states.state = `closed`;
  }
  onPreConnect() {
    return Promise.resolve();
  }
  async onConnectAttempt() {
    let reqOpts = {};
    const openOpts = {
      baudRate: this.baudRate
    };
    if (this.config.filters)
      reqOpts = { filters: [...this.config.filters] };
    this.port = await navigator.serial.requestPort(reqOpts);
    this.port.addEventListener(`disconnect`, (_) => {
      this.close();
    });
    await this.port.open(openOpts);
    const txW = this.port.writable;
    const txText = new TextEncoderStream();
    if (txW !== null) {
      txText.readable.pipeTo(txW);
      this.tx = txText.writable.getWriter();
    }
    const rxR = this.port.readable;
    const rxText = new TextDecoderStream();
    if (rxR !== null) {
      rxR.pipeTo(rxText.writable);
      rxText.readable.pipeTo(this.rxBuffer.writable());
    }
  }
};

// src/io/EspruinoSerialDevice.ts
var EspruinoSerialDevice = class extends Device {
  constructor(opts) {
    super(opts);
    __publicField(this, "evalTimeoutMs");
    __publicField(this, "evalReplyBluetooth", false);
    if (opts === void 0)
      opts = {};
    this.evalTimeoutMs = opts.evalTimeoutMs ?? 5 * 1e3;
  }
  async writeScript(code) {
    this.write(`reset();
`);
    this.write(`${code}
`);
  }
  async eval(code, opts = {}) {
    return deviceEval(code, opts, this, `console.log`, true, (msg) => {
      this.warn(msg);
    });
  }
};

// src/io/Espruino.ts
var puck = async (opts = {}) => {
  const name = opts.name ?? `Puck`;
  const debug2 = opts.debug ?? false;
  const device = await navigator.bluetooth.requestDevice({
    filters: [
      { namePrefix: `Puck.js` },
      { services: [defaultOpts.service] }
    ],
    optionalServices: [defaultOpts.service]
  });
  const d = new EspruinoBleDevice(device, { name, debug: debug2 });
  await d.connect();
  return d;
};
var serial = async (opts = {}) => {
  const d = new EspruinoSerialDevice(opts);
  await d.connect();
  return d;
};
var connectBle = async () => {
  const device = await navigator.bluetooth.requestDevice({
    filters: [
      { namePrefix: `Puck.js` },
      { namePrefix: `Pixl.js` },
      { namePrefix: `MDBT42Q` },
      { namePrefix: `RuuviTag` },
      { namePrefix: `iTracker` },
      { namePrefix: `Thingy` },
      { namePrefix: `Espruino` },
      { services: [defaultOpts.service] }
    ],
    optionalServices: [defaultOpts.service]
  });
  const d = new EspruinoBleDevice(device, { name: `Espruino` });
  await d.connect();
  return d;
};
var deviceEval = async (code, opts = {}, device, evalReplyPrefix, debug2, warn) => {
  const timeoutMs = opts.timeoutMs ?? device.evalTimeoutMs;
  const assumeExclusive = opts.assumeExclusive ?? true;
  if (typeof code !== `string`)
    throw new Error(`code parameter should be a string`);
  return new Promise((resolve, reject) => {
    const id = string(5);
    const onData = (d) => {
      try {
        const dd = JSON.parse(d.data);
        if (`reply` in dd) {
          if (dd.reply === id) {
            done();
            if (`result` in dd) {
              resolve(dd.result);
            }
          } else {
            warn(`Expected reply ${id}, got ${dd.reply}`);
          }
        }
      } catch (ex) {
        if (assumeExclusive) {
          done(d.data);
        } else {
          warn(ex);
        }
      }
    };
    const onStateChange = (e) => {
      if (e.newState !== `connected`)
        done(`State changed to '${e.newState}', aborting`);
    };
    device.addEventListener(`data`, onData);
    device.addEventListener(`change`, onStateChange);
    const done = waitFor(timeoutMs, (reason) => {
      reject(reason);
    }, () => {
      device.removeEventListener(`data`, onData);
      device.removeEventListener(`change`, onStateChange);
    });
    const src = `${evalReplyPrefix}(JSON.stringify({reply:"${id}", result:JSON.stringify(${code})}))
`;
    if (debug2)
      warn(src);
    device.write(src);
  });
};

// src/io/Camera.ts
var Camera_exports = {};
__export(Camera_exports, {
  dumpDevices: () => dumpDevices,
  start: () => start
});
var dumpDevices = async (filterKind = `videoinput`) => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  devices.forEach((d) => {
    if (d.kind !== filterKind)
      return;
    console.log(d.label);
    console.log(` Kind: ${d.kind}`);
    console.log(` Device id: ${d.deviceId}`);
  });
};
var start = async (constraints = {}) => {
  const videoEl = document.createElement(`VIDEO`);
  videoEl.style.display = `none`;
  document.body.appendChild(videoEl);
  let stopVideo = () => {
  };
  const dispose = () => {
    try {
      stopVideo();
    } catch {
    }
    videoEl.remove();
  };
  try {
    const r = await startWithVideoEl(videoEl, constraints);
    stopVideo = r.dispose;
  } catch (err) {
    console.error(err);
    dispose();
    return;
  }
  return { videoEl, dispose };
};
var startWithVideoEl = async (videoEl, constraints = {}) => {
  if (videoEl === void 0)
    throw new Error(`videoEl undefined`);
  if (videoEl === null)
    throw new Error(`videoEl null`);
  const facingMode = constraints.facingMode ?? `user`;
  const maxRes = constraints.max;
  const minRes = constraints.min;
  const c = {
    audio: false,
    video: {
      facingMode,
      width: {},
      height: {}
    }
  };
  if (maxRes) {
    c.video.width = {
      max: maxRes.width
    };
    c.video.height = {
      max: maxRes.height
    };
  }
  if (minRes) {
    c.video.width = {
      min: minRes.width
    };
    c.video.height = {
      min: minRes.height
    };
  }
  const dispose = () => {
    console.log(`Camera:dispose`);
    videoEl.pause();
    const t4 = stream2.getTracks();
    t4.forEach((track) => track.stop());
  };
  const stream2 = await navigator.mediaDevices.getUserMedia(c);
  videoEl.srcObject = stream2;
  const ret = { videoEl, dispose };
  const p = new Promise((resolve, reject) => {
    videoEl.addEventListener(`loadedmetadata`, () => {
      videoEl.play().then(() => {
        resolve(ret);
      }).catch((ex) => {
        reject(ex);
      });
    });
  });
  return p;
};

// src/visual/index.ts
var visual_exports = {};
__export(visual_exports, {
  Colour: () => Colour_exports,
  Drawing: () => Drawing_exports,
  Palette: () => Palette_exports,
  Plot: () => Plot_exports,
  Plot2: () => Plot2_exports,
  SceneGraph: () => SceneGraph_exports,
  Svg: () => Svg_exports,
  Video: () => Video_exports
});

// src/visual/Drawing.ts
var Drawing_exports = {};
__export(Drawing_exports, {
  arc: () => arc,
  bezier: () => bezier,
  circle: () => circle,
  connectedPoints: () => connectedPoints,
  copyToImg: () => copyToImg,
  dot: () => dot,
  drawingStack: () => drawingStack,
  ellipse: () => ellipse,
  getCtx: () => getCtx,
  line: () => line,
  lineThroughPoints: () => lineThroughPoints,
  makeHelper: () => makeHelper,
  paths: () => paths,
  pointLabels: () => pointLabels,
  rect: () => rect,
  textBlock: () => textBlock,
  textBlockAligned: () => textBlockAligned,
  textWidth: () => textWidth,
  translatePoint: () => translatePoint,
  triangle: () => triangle
});

// src/visual/Colour.ts
var Colour_exports = {};
__export(Colour_exports, {
  getCssVariable: () => getCssVariable,
  goldenAngleColour: () => goldenAngleColour,
  interpolate: () => interpolate6,
  opacity: () => opacity,
  randomHue: () => randomHue,
  scale: () => scale2,
  toHex: () => toHex,
  toHsl: () => toHsl,
  toRgb: () => toRgb
});

// node_modules/d3-color/src/define.js
function define_default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition)
    prototype[key] = definition[key];
  return prototype;
}

// node_modules/d3-color/src/color.js
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*";
var reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex = /^#([0-9a-f]{3,8})$/;
var reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`);
var reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`);
var reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`);
var reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`);
var reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`);
var reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define_default(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b, a) {
  if (a <= 0)
    r = g = b = NaN;
  return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity2) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity2 == null ? 1 : opacity2);
}
function Rgb(r, g, b, opacity2) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity2;
}
define_default(Rgb, rgb, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}
function clampa(opacity2) {
  return isNaN(opacity2) ? 1 : Math.max(0, Math.min(1, opacity2));
}
function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l, a) {
  if (a <= 0)
    h = s = l = NaN;
  else if (l <= 0 || l >= 1)
    h = s = NaN;
  else if (s <= 0)
    h = NaN;
  return new Hsl(h, s, l, a);
}
function hslConvert(o) {
  if (o instanceof Hsl)
    return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Hsl();
  if (o instanceof Hsl)
    return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min3 = Math.min(r, g, b), max3 = Math.max(r, g, b), h = NaN, s = max3 - min3, l = (max3 + min3) / 2;
  if (s) {
    if (r === max3)
      h = (g - b) / s + (g < b) * 6;
    else if (g === max3)
      h = (b - r) / s + 2;
    else
      h = (r - g) / s + 4;
    s /= l < 0.5 ? max3 + min3 : 2 - max3 - min3;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity2) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity2 == null ? 1 : opacity2);
}
function Hsl(h, s, l, opacity2) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity2;
}
define_default(Hsl, hsl, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
  }
}));
function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}
function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

// node_modules/d3-color/src/math.js
var radians = Math.PI / 180;
var degrees = 180 / Math.PI;

// node_modules/d3-color/src/lab.js
var K = 18;
var Xn = 0.96422;
var Yn = 1;
var Zn = 0.82521;
var t0 = 4 / 29;
var t1 = 6 / 29;
var t2 = 3 * t1 * t1;
var t3 = t1 * t1 * t1;
function labConvert(o) {
  if (o instanceof Lab)
    return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl)
    return hcl2lab(o);
  if (!(o instanceof Rgb))
    o = rgbConvert(o);
  var r = rgb2lrgb(o.r), g = rgb2lrgb(o.g), b = rgb2lrgb(o.b), y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x, z;
  if (r === g && g === b)
    x = z = y;
  else {
    x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
  }
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}
function lab(l, a, b, opacity2) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity2 == null ? 1 : opacity2);
}
function Lab(l, a, b, opacity2) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity2;
}
define_default(Lab, lab, extend(Color, {
  brighter(k) {
    return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker(k) {
    return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb() {
    var y = (this.l + 16) / 116, x = isNaN(this.a) ? y : y + this.a / 500, z = isNaN(this.b) ? y : y - this.b / 200;
    x = Xn * lab2xyz(x);
    y = Yn * lab2xyz(y);
    z = Zn * lab2xyz(z);
    return new Rgb(lrgb2rgb(3.1338561 * x - 1.6168667 * y - 0.4906146 * z), lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.033454 * z), lrgb2rgb(0.0719453 * x - 0.2289914 * y + 1.4052427 * z), this.opacity);
  }
}));
function xyz2lab(t4) {
  return t4 > t3 ? Math.pow(t4, 1 / 3) : t4 / t2 + t0;
}
function lab2xyz(t4) {
  return t4 > t1 ? t4 * t4 * t4 : t2 * (t4 - t0);
}
function lrgb2rgb(x) {
  return 255 * (x <= 31308e-7 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}
function rgb2lrgb(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}
function hclConvert(o) {
  if (o instanceof Hcl)
    return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab))
    o = labConvert(o);
  if (o.a === 0 && o.b === 0)
    return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
  var h = Math.atan2(o.b, o.a) * degrees;
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}
function hcl(h, c, l, opacity2) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity2 == null ? 1 : opacity2);
}
function Hcl(h, c, l, opacity2) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity2;
}
function hcl2lab(o) {
  if (isNaN(o.h))
    return new Lab(o.l, 0, 0, o.opacity);
  var h = o.h * radians;
  return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}
define_default(Hcl, hcl, extend(Color, {
  brighter(k) {
    return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
  },
  darker(k) {
    return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
  },
  rgb() {
    return hcl2lab(this).rgb();
  }
}));

// node_modules/d3-color/src/cubehelix.js
var A = -0.14861;
var B = 1.78277;
var C = -0.29227;
var D = -0.90649;
var E = 1.97294;
var ED = E * D;
var EB = E * B;
var BC_DA = B * C - D * A;
function cubehelixConvert(o) {
  if (o instanceof Cubehelix)
    return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Rgb))
    o = rgbConvert(o);
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB), bl = b - l, k = (E * (g - l) - C * bl) / D, s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), h = s ? Math.atan2(k, bl) * degrees - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}
function cubehelix(h, s, l, opacity2) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity2 == null ? 1 : opacity2);
}
function Cubehelix(h, s, l, opacity2) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity2;
}
define_default(Cubehelix, cubehelix, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * radians, l = +this.l, a = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh = Math.cos(h), sinh = Math.sin(h);
    return new Rgb(255 * (l + a * (A * cosh + B * sinh)), 255 * (l + a * (C * cosh + D * sinh)), 255 * (l + a * (E * cosh)), this.opacity);
  }
}));

// node_modules/d3-interpolate/src/basis.js
function basis(t12, v0, v1, v2, v3) {
  var t22 = t12 * t12, t32 = t22 * t12;
  return ((1 - 3 * t12 + 3 * t22 - t32) * v0 + (4 - 6 * t22 + 3 * t32) * v1 + (1 + 3 * t12 + 3 * t22 - 3 * t32) * v2 + t32 * v3) / 6;
}
function basis_default(values) {
  var n = values.length - 1;
  return function(t4) {
    var i = t4 <= 0 ? t4 = 0 : t4 >= 1 ? (t4 = 1, n - 1) : Math.floor(t4 * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t4 - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default(values) {
  var n = values.length;
  return function(t4) {
    var i = Math.floor(((t4 %= 1) < 0 ? ++t4 : t4) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
    return basis((t4 - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/constant.js
var constant_default = (x) => () => x;

// node_modules/d3-interpolate/src/color.js
function linear(a, d) {
  return function(t4) {
    return a + t4 * d;
  };
}
function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t4) {
    return Math.pow(a + t4 * b, y);
  };
}
function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant_default(isNaN(a) ? b : a);
}
function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant_default(isNaN(a) ? b : a);
  };
}
function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant_default(isNaN(a) ? b : a);
}

// node_modules/d3-interpolate/src/rgb.js
var rgb_default = function rgbGamma(y) {
  var color2 = gamma(y);
  function rgb2(start2, end) {
    var r = color2((start2 = rgb(start2)).r, (end = rgb(end)).r), g = color2(start2.g, end.g), b = color2(start2.b, end.b), opacity2 = nogamma(start2.opacity, end.opacity);
    return function(t4) {
      start2.r = r(t4);
      start2.g = g(t4);
      start2.b = b(t4);
      start2.opacity = opacity2(t4);
      return start2 + "";
    };
  }
  rgb2.gamma = rgbGamma;
  return rgb2;
}(1);
function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color2;
    for (i = 0; i < n; ++i) {
      color2 = rgb(colors[i]);
      r[i] = color2.r || 0;
      g[i] = color2.g || 0;
      b[i] = color2.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color2.opacity = 1;
    return function(t4) {
      color2.r = r(t4);
      color2.g = g(t4);
      color2.b = b(t4);
      return color2 + "";
    };
  };
}
var rgbBasis = rgbSpline(basis_default);
var rgbBasisClosed = rgbSpline(basisClosed_default);

// node_modules/d3-interpolate/src/numberArray.js
function numberArray_default(a, b) {
  if (!b)
    b = [];
  var n = a ? Math.min(b.length, a.length) : 0, c = b.slice(), i;
  return function(t4) {
    for (i = 0; i < n; ++i)
      c[i] = a[i] * (1 - t4) + b[i] * t4;
    return c;
  };
}
function isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}

// node_modules/d3-interpolate/src/array.js
function genericArray(a, b) {
  var nb = b ? b.length : 0, na = a ? Math.min(nb, a.length) : 0, x = new Array(na), c = new Array(nb), i;
  for (i = 0; i < na; ++i)
    x[i] = value_default(a[i], b[i]);
  for (; i < nb; ++i)
    c[i] = b[i];
  return function(t4) {
    for (i = 0; i < na; ++i)
      c[i] = x[i](t4);
    return c;
  };
}

// node_modules/d3-interpolate/src/date.js
function date_default(a, b) {
  var d = new Date();
  return a = +a, b = +b, function(t4) {
    return d.setTime(a * (1 - t4) + b * t4), d;
  };
}

// node_modules/d3-interpolate/src/number.js
function number_default(a, b) {
  return a = +a, b = +b, function(t4) {
    return a * (1 - t4) + b * t4;
  };
}

// node_modules/d3-interpolate/src/object.js
function object_default(a, b) {
  var i = {}, c = {}, k;
  if (a === null || typeof a !== "object")
    a = {};
  if (b === null || typeof b !== "object")
    b = {};
  for (k in b) {
    if (k in a) {
      i[k] = value_default(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }
  return function(t4) {
    for (k in i)
      c[k] = i[k](t4);
    return c;
  };
}

// node_modules/d3-interpolate/src/string.js
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB = new RegExp(reA.source, "g");
function zero(b) {
  return function() {
    return b;
  };
}
function one(b) {
  return function(t4) {
    return b(t4) + "";
  };
}
function string_default(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
  a = a + "", b = b + "";
  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      bs = b.slice(bi, bs);
      if (s[i])
        s[i] += bs;
      else
        s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s[i])
        s[i] += bm;
      else
        s[++i] = bm;
    } else {
      s[++i] = null;
      q.push({ i, x: number_default(am, bm) });
    }
    bi = reB.lastIndex;
  }
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i])
      s[i] += bs;
    else
      s[++i] = bs;
  }
  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t4) {
    for (var i2 = 0, o; i2 < b; ++i2)
      s[(o = q[i2]).i] = o.x(t4);
    return s.join("");
  });
}

// node_modules/d3-interpolate/src/value.js
function value_default(a, b) {
  var t4 = typeof b, c;
  return b == null || t4 === "boolean" ? constant_default(b) : (t4 === "number" ? number_default : t4 === "string" ? (c = color(b)) ? (b = c, rgb_default) : string_default : b instanceof color ? rgb_default : b instanceof Date ? date_default : isNumberArray(b) ? numberArray_default : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object_default : number_default)(a, b);
}

// node_modules/d3-interpolate/src/hsl.js
function hsl2(hue2) {
  return function(start2, end) {
    var h = hue2((start2 = hsl(start2)).h, (end = hsl(end)).h), s = nogamma(start2.s, end.s), l = nogamma(start2.l, end.l), opacity2 = nogamma(start2.opacity, end.opacity);
    return function(t4) {
      start2.h = h(t4);
      start2.s = s(t4);
      start2.l = l(t4);
      start2.opacity = opacity2(t4);
      return start2 + "";
    };
  };
}
var hsl_default = hsl2(hue);
var hslLong = hsl2(nogamma);

// node_modules/d3-interpolate/src/lab.js
function lab2(start2, end) {
  var l = nogamma((start2 = lab(start2)).l, (end = lab(end)).l), a = nogamma(start2.a, end.a), b = nogamma(start2.b, end.b), opacity2 = nogamma(start2.opacity, end.opacity);
  return function(t4) {
    start2.l = l(t4);
    start2.a = a(t4);
    start2.b = b(t4);
    start2.opacity = opacity2(t4);
    return start2 + "";
  };
}

// node_modules/d3-interpolate/src/hcl.js
function hcl2(hue2) {
  return function(start2, end) {
    var h = hue2((start2 = hcl(start2)).h, (end = hcl(end)).h), c = nogamma(start2.c, end.c), l = nogamma(start2.l, end.l), opacity2 = nogamma(start2.opacity, end.opacity);
    return function(t4) {
      start2.h = h(t4);
      start2.c = c(t4);
      start2.l = l(t4);
      start2.opacity = opacity2(t4);
      return start2 + "";
    };
  };
}
var hcl_default = hcl2(hue);
var hclLong = hcl2(nogamma);

// node_modules/d3-interpolate/src/cubehelix.js
function cubehelix2(hue2) {
  return function cubehelixGamma(y) {
    y = +y;
    function cubehelix3(start2, end) {
      var h = hue2((start2 = cubehelix(start2)).h, (end = cubehelix(end)).h), s = nogamma(start2.s, end.s), l = nogamma(start2.l, end.l), opacity2 = nogamma(start2.opacity, end.opacity);
      return function(t4) {
        start2.h = h(t4);
        start2.s = s(t4);
        start2.l = l(Math.pow(t4, y));
        start2.opacity = opacity2(t4);
        return start2 + "";
      };
    }
    cubehelix3.gamma = cubehelixGamma;
    return cubehelix3;
  }(1);
}
var cubehelix_default = cubehelix2(hue);
var cubehelixLong = cubehelix2(nogamma);

// node_modules/d3-interpolate/src/piecewise.js
function piecewise(interpolate8, values) {
  if (values === void 0)
    values = interpolate8, interpolate8 = value_default;
  var i = 0, n = values.length - 1, v = values[0], I = new Array(n < 0 ? 0 : n);
  while (i < n)
    I[i] = interpolate8(v, v = values[++i]);
  return function(t4) {
    var i2 = Math.max(0, Math.min(n - 1, Math.floor(t4 *= n)));
    return I[i2](t4 - i2);
  };
}

// src/visual/Colour.ts
var toHsl = (colour) => {
  const rgb2 = toRgb(colour);
  const hsl3 = rgbToHsl(rgb2.r, rgb2.b, rgb2.g);
  if (rgb2.opacity)
    return { ...hsl3, opacity: rgb2.opacity };
  else
    return hsl3;
};
var goldenAngleColour = (index, saturation = 0.5, lightness = 0.75) => {
  number(index, `positive`, `index`);
  number(saturation, `percentage`, `saturation`);
  number(lightness, `percentage`, `lightness`);
  const hue2 = index * 137.508;
  return `hsl(${hue2},${saturation * 100}%,${lightness * 100}%)`;
};
var randomHue = (rand = defaultRandom) => {
  const r = rand();
  return r * 360;
};
var toRgb = (colour) => {
  const c = resolveColour(colour);
  const rgb2 = c.rgb();
  if (c.opacity < 1)
    return { r: rgb2.r, g: rgb2.g, b: rgb2.b, opacity: c.opacity };
  else
    return { r: rgb2.r, g: rgb2.g, b: rgb2.b };
};
var resolveColour = (c) => {
  if (typeof c === `string`) {
    const css = color(c);
    if (css !== null)
      return css;
  } else {
    if (isHsl(c))
      return hsl(c.h, c.s, c.l);
    if (isRgb(c))
      return rgb(c.r, c.g, c.b);
  }
  throw new Error(`Could not resolve colour ${JSON.stringify(c)}`);
};
var toHex = (colour) => {
  const c = resolveColour(colour);
  return c.formatHex();
};
var opacity = (colour, amt) => {
  const c = resolveColour(colour);
  c.opacity *= amt;
  return c.toString();
};
var getCssVariable = (name, fallbackColour = `black`, root) => {
  if (root === void 0)
    root = document.body;
  const fromCss = getComputedStyle(root).getPropertyValue(`--${name}`).trim();
  if (fromCss === void 0 || fromCss.length === 0)
    return fallbackColour;
  return fromCss;
};
var interpolate6 = (amount, from2, to, optsOrSpace) => {
  number(amount, `percentage`, `amount`);
  if (typeof from2 !== `string`)
    throw new Error(`Expected string for 'from' param`);
  if (typeof to !== `string`)
    throw new Error(`Expected string for 'to' param`);
  let opts;
  if (typeof optsOrSpace === `undefined`)
    opts = {};
  else if (typeof optsOrSpace === `string`)
    opts = { space: optsOrSpace };
  else
    opts = optsOrSpace;
  const inter = getInterpolator(opts, [from2, to]);
  if (inter === void 0)
    throw new Error(`Could not handle colour/space`);
  return inter(amount);
};
var getInterpolator = (optsOrSpace, colours) => {
  if (!Array.isArray(colours))
    throw new Error(`Expected one or more colours as parameters`);
  let opts;
  if (typeof optsOrSpace === `undefined`)
    opts = {};
  else if (typeof optsOrSpace === `string`)
    opts = { space: optsOrSpace };
  else
    opts = optsOrSpace;
  if (!Array.isArray(colours))
    throw new Error(`Expected array for colours parameter`);
  if (colours.length < 2)
    throw new Error(`Interpolation expects at least two colours`);
  const { space = `rgb`, long = false } = opts;
  let inter;
  switch (space) {
    case `lab`:
      inter = lab2;
      break;
    case `hsl`:
      inter = long ? hslLong : hsl_default;
      break;
    case `hcl`:
      inter = long ? hclLong : hcl_default;
      break;
    case `cubehelix`:
      inter = long ? cubehelixLong : cubehelix_default;
      break;
    case `rgb`:
      inter = rgb_default;
    default:
      inter = rgb_default;
  }
  if (opts.gamma) {
    if (space === `rgb` || space === `cubehelix`) {
      inter = inter.gamma(opts.gamma);
    }
  }
  if (colours.length > 2) {
    return piecewise(inter, colours);
  } else
    return inter(colours[0], colours[1]);
};
var scale2 = (steps, opts, ...colours) => {
  number(steps, `aboveZero`, `steps`);
  if (!Array.isArray(colours))
    throw new Error(`Expected one or more colours as parameters`);
  const inter = getInterpolator(opts, colours);
  if (inter === void 0)
    throw new Error(`Could not handle colour/space`);
  const perStep = 1 / (steps - 1);
  const r = [];
  let amt = 0;
  for (let i = 0; i < steps; i++) {
    r.push(inter(amt));
    amt += perStep;
    if (amt > 1)
      amt = 1;
  }
  return r;
};
var isHsl = (p) => {
  if (p.h === void 0)
    return false;
  if (p.s === void 0)
    return false;
  if (p.l === void 0)
    return false;
  return true;
};
var isRgb = (p) => {
  if (p.r === void 0)
    return false;
  if (p.g === void 0)
    return false;
  if (p.b === void 0)
    return false;
  return true;
};
var rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  var min3 = Math.min(r, g, b), max3 = Math.max(r, g, b), delta = max3 - min3, h, s, l;
  h = 0;
  if (max3 === min3) {
    h = 0;
  } else if (r === max3) {
    h = (g - b) / delta;
  } else if (g === max3) {
    h = 2 + (b - r) / delta;
  } else if (b === max3) {
    h = 4 + (r - g) / delta;
  }
  h = Math.min(h * 60, 360);
  if (h < 0) {
    h += 360;
  }
  l = (min3 + max3) / 2;
  if (max3 === min3) {
    s = 0;
  } else if (l <= 0.5) {
    s = delta / (max3 + min3);
  } else {
    s = delta / (2 - max3 - min3);
  }
  return { h, s, l };
};

// src/visual/Drawing.ts
var PIPI = Math.PI * 2;
var getCtx = (canvasElCtxOrQuery) => {
  if (canvasElCtxOrQuery === null)
    throw Error(`canvasElCtxOrQuery null. Must be a 2d drawing context or Canvas element`);
  if (canvasElCtxOrQuery === void 0)
    throw Error(`canvasElCtxOrQuery undefined. Must be a 2d drawing context or Canvas element`);
  const ctx = canvasElCtxOrQuery instanceof CanvasRenderingContext2D ? canvasElCtxOrQuery : canvasElCtxOrQuery instanceof HTMLCanvasElement ? canvasElCtxOrQuery.getContext(`2d`) : typeof canvasElCtxOrQuery === `string` ? resolveEl(canvasElCtxOrQuery).getContext(`2d`) : canvasElCtxOrQuery;
  if (ctx === null)
    throw new Error(`Could not create 2d context for canvas`);
  return ctx;
};
var makeHelper = (ctxOrCanvasEl, canvasBounds) => {
  const ctx = getCtx(ctxOrCanvasEl);
  return {
    paths(pathsToDraw, opts) {
      paths(ctx, pathsToDraw, opts);
    },
    line(lineToDraw, opts) {
      line(ctx, lineToDraw, opts);
    },
    rect(rectsToDraw, opts) {
      rect(ctx, rectsToDraw, opts);
    },
    bezier(bezierToDraw, opts) {
      bezier(ctx, bezierToDraw, opts);
    },
    connectedPoints(pointsToDraw, opts) {
      connectedPoints(ctx, pointsToDraw, opts);
    },
    pointLabels(pointsToDraw, opts) {
      pointLabels(ctx, pointsToDraw, opts);
    },
    dot(dotPosition, opts) {
      dot(ctx, dotPosition, opts);
    },
    circle(circlesToDraw, opts) {
      circle(ctx, circlesToDraw, opts);
    },
    arc(arcsToDraw, opts) {
      arc(ctx, arcsToDraw, opts);
    },
    textBlock(lines, opts) {
      if (opts.bounds === void 0 && canvasBounds !== void 0)
        opts = { ...opts, bounds: { ...canvasBounds, x: 0, y: 0 } };
      textBlock(ctx, lines, opts);
    }
  };
};
var optsOp = (opts) => coloringOp(opts.strokeStyle, opts.fillStyle);
var applyOpts = (ctx, opts = {}, ...additionalOps) => {
  if (ctx === void 0)
    throw Error(`ctx undefined`);
  const stack2 = drawingStack(ctx).push(optsOp(opts), ...additionalOps);
  stack2.apply();
  return stack2;
};
var arc = (ctx, arcs, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (arc2) => {
    ctx.beginPath();
    ctx.arc(arc2.x, arc2.y, arc2.radius, arc2.startRadian, arc2.endRadian);
    ctx.stroke();
  };
  if (Array.isArray(arcs)) {
    arcs.forEach(draw2);
  } else
    draw2(arcs);
};
var coloringOp = (strokeStyle, fillStyle) => {
  const apply5 = (ctx) => {
    if (fillStyle)
      ctx.fillStyle = fillStyle;
    if (strokeStyle)
      ctx.strokeStyle = strokeStyle;
  };
  return apply5;
};
var lineOp = (lineWidth, lineJoin, lineCap) => {
  const apply5 = (ctx) => {
    if (lineWidth)
      ctx.lineWidth = lineWidth;
    if (lineJoin)
      ctx.lineJoin = lineJoin;
    if (lineCap)
      ctx.lineCap = lineCap;
  };
  return apply5;
};
var drawingStack = (ctx, stk) => {
  if (stk === void 0)
    stk = stack();
  const push2 = (...ops) => {
    if (stk === void 0)
      stk = stack();
    const s = stk.push(...ops);
    ops.forEach((o) => o(ctx));
    return drawingStack(ctx, s);
  };
  const pop2 = () => {
    const s = stk?.pop();
    return drawingStack(ctx, s);
  };
  const apply5 = () => {
    if (stk === void 0)
      return drawingStack(ctx);
    stk.forEach((op) => op(ctx));
    return drawingStack(ctx, stk);
  };
  return { push: push2, pop: pop2, apply: apply5 };
};
var lineThroughPoints = (ctx, points, opts) => {
  applyOpts(ctx, opts);
  ctx.moveTo(points[0].x, points[0].y);
  points.forEach((p, index) => {
    if (index + 2 >= points.length)
      return;
    const pNext = points[index + 1];
    const mid = {
      x: (p.x + pNext.x) / 2,
      y: (p.y + pNext.y) / 2
    };
    const cpX1 = (mid.x + p.x) / 2;
    const cpX2 = (mid.x + pNext.x) / 2;
    ctx.quadraticCurveTo(cpX1, pNext.y, mid.x, mid.y);
    ctx.quadraticCurveTo(cpX2, pNext.y, pNext.x, pNext.y);
  });
};
var circle = (ctx, circlesToDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (c) => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.radius, 0, PIPI);
    if (opts.strokeStyle)
      ctx.stroke();
    if (opts.fillStyle)
      ctx.fill();
  };
  if (Array.isArray(circlesToDraw))
    circlesToDraw.forEach(draw2);
  else
    draw2(circlesToDraw);
};
var ellipse = (ctx, ellipsesToDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (e) => {
    ctx.beginPath();
    const rotation = e.rotation ?? 0;
    const startAngle = e.startAngle ?? 0;
    const endAngle = e.endAngle ?? PIPI;
    ctx.ellipse(e.x, e.y, e.radiusX, e.radiusY, rotation, startAngle, endAngle);
    if (opts.strokeStyle)
      ctx.stroke();
    if (opts.fillStyle)
      ctx.fill();
  };
  if (Array.isArray(ellipsesToDraw))
    ellipsesToDraw.forEach(draw2);
  else
    draw2(ellipsesToDraw);
};
var paths = (ctx, pathsToDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (path2) => {
    if (isQuadraticBezier(path2))
      quadraticBezier(ctx, path2, opts);
    else if (isLine(path2))
      line(ctx, path2, opts);
    else
      throw new Error(`Unknown path type ${JSON.stringify(path2)}`);
  };
  if (Array.isArray(pathsToDraw))
    pathsToDraw.forEach(draw2);
  else
    draw2(pathsToDraw);
};
var connectedPoints = (ctx, pts, opts = {}) => {
  const shouldLoop = opts.loop ?? false;
  array(pts);
  if (pts.length === 0)
    return;
  pts.forEach((pt, i) => guard(pt, `Index ${i}`));
  applyOpts(ctx, opts);
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  pts.forEach((pt) => ctx.lineTo(pt.x, pt.y));
  if (shouldLoop)
    ctx.lineTo(pts[0].x, pts[0].y);
  if (opts.strokeStyle || opts.strokeStyle === void 0 && opts.fillStyle === void 0) {
    ctx.stroke();
  }
  if (opts.fillStyle) {
    ctx.fill();
  }
};
var pointLabels = (ctx, pts, opts = {}, labels) => {
  if (pts.length === 0)
    return;
  pts.forEach((pt, i) => guard(pt, `Index ${i}`));
  applyOpts(ctx, opts);
  pts.forEach((pt, i) => {
    const label = labels !== void 0 && i < labels.length ? labels[i] : i.toString();
    ctx.fillText(label.toString(), pt.x, pt.y);
  });
};
var translatePoint = (ctx, point3) => {
  const m = ctx.getTransform();
  return {
    x: point3.x * m.a + point3.y * m.c + m.e,
    y: point3.x * m.b + point3.y * m.d + m.f
  };
};
var copyToImg = (canvasEl) => {
  const img = document.createElement(`img`);
  img.src = canvasEl.toDataURL(`image/jpeg`);
  return img;
};
var dot = (ctx, pos, opts) => {
  if (opts === void 0)
    opts = {};
  const radius = opts.radius ?? 10;
  applyOpts(ctx, opts);
  ctx.beginPath();
  if (Array.isArray(pos)) {
    pos.forEach((p) => {
      ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
    });
  } else {
    const p = pos;
    ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
  }
  if (opts.filled || !opts.outlined)
    ctx.fill();
  if (opts.outlined)
    ctx.stroke();
};
var bezier = (ctx, bezierToDraw, opts) => {
  if (isQuadraticBezier(bezierToDraw)) {
    quadraticBezier(ctx, bezierToDraw, opts);
  } else if (isCubicBezier(bezierToDraw)) {
    cubicBezier(ctx, bezierToDraw, opts);
  }
};
var cubicBezier = (ctx, bezierToDraw, opts = {}) => {
  let stack2 = applyOpts(ctx, opts);
  const { a, b, cubic1, cubic2 } = bezierToDraw;
  const isDebug = opts.debug ?? false;
  if (isDebug) {
  }
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.bezierCurveTo(cubic1.x, cubic1.y, cubic2.x, cubic2.y, b.x, b.y);
  ctx.stroke();
  if (isDebug) {
    stack2 = stack2.push(optsOp({
      ...opts,
      strokeStyle: opacity(opts.strokeStyle ?? `silver`, 0.6),
      fillStyle: opacity(opts.fillStyle ?? `yellow`, 0.4)
    }));
    stack2.apply();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(cubic1.x, cubic1.y);
    ctx.stroke();
    ctx.moveTo(b.x, b.y);
    ctx.lineTo(cubic2.x, cubic2.y);
    ctx.stroke();
    ctx.fillText(`a`, a.x + 5, a.y);
    ctx.fillText(`b`, b.x + 5, b.y);
    ctx.fillText(`c1`, cubic1.x + 5, cubic1.y);
    ctx.fillText(`c2`, cubic2.x + 5, cubic2.y);
    dot(ctx, cubic1, { radius: 3 });
    dot(ctx, cubic2, { radius: 3 });
    dot(ctx, a, { radius: 3 });
    dot(ctx, b, { radius: 3 });
    stack2 = stack2.pop();
    stack2.apply();
  }
};
var quadraticBezier = (ctx, bezierToDraw, opts = {}) => {
  const { a, b, quadratic: quadratic2 } = bezierToDraw;
  const isDebug = opts.debug ?? false;
  let stack2 = applyOpts(ctx, opts);
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.quadraticCurveTo(quadratic2.x, quadratic2.y, b.x, b.y);
  ctx.stroke();
  if (isDebug) {
    stack2 = stack2.push(optsOp({
      ...opts,
      strokeStyle: opacity(opts.strokeStyle ?? `silver`, 0.6),
      fillStyle: opacity(opts.fillStyle ?? `yellow`, 0.4)
    }));
    connectedPoints(ctx, [a, quadratic2, b]);
    ctx.fillText(`a`, a.x + 5, a.y);
    ctx.fillText(`b`, b.x + 5, b.y);
    ctx.fillText(`h`, quadratic2.x + 5, quadratic2.y);
    dot(ctx, quadratic2, { radius: 3 });
    dot(ctx, a, { radius: 3 });
    dot(ctx, b, { radius: 3 });
    stack2 = stack2.pop();
    stack2.apply();
  }
};
var line = (ctx, toDraw, opts = {}) => {
  const isDebug = opts.debug ?? false;
  const o = lineOp(opts.lineWidth, opts.lineJoin, opts.lineCap);
  applyOpts(ctx, opts, o);
  const draw2 = (d) => {
    const { a, b } = d;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    if (isDebug) {
      ctx.fillText(`a`, a.x, a.y);
      ctx.fillText(`b`, b.x, b.y);
      dot(ctx, a, { radius: 5, strokeStyle: `black` });
      dot(ctx, b, { radius: 5, strokeStyle: `black` });
    }
    ctx.stroke();
  };
  if (Array.isArray(toDraw))
    toDraw.forEach(draw2);
  else
    draw2(toDraw);
};
var triangle = (ctx, toDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (t4) => {
    connectedPoints(ctx, corners2(t4), { ...opts, loop: true });
    if (opts.debug) {
      pointLabels(ctx, corners2(t4), void 0, [`a`, `b`, `c`]);
    }
  };
  if (Array.isArray(toDraw))
    toDraw.forEach(draw2);
  else
    draw2(toDraw);
};
var rect = (ctx, toDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (d) => {
    if (opts.filled)
      ctx.fillRect(d.x, d.y, d.width, d.height);
    ctx.strokeRect(d.x, d.y, d.width, d.height);
    if (opts.debug) {
      pointLabels(ctx, corners(d), void 0, [`NW`, `NE`, `SE`, `SW`]);
    }
  };
  if (Array.isArray(toDraw))
    toDraw.forEach(draw2);
  else
    draw2(toDraw);
};
var textWidth = (ctx, text2, padding = 0, widthMultiple) => {
  if (text2 === void 0 || text2 === null || text2.length === 0)
    return 0;
  const m = ctx.measureText(text2);
  if (widthMultiple)
    return roundUpToMultiple(m.width, widthMultiple) + padding;
  return m.width + padding;
};
var textBlock = (ctx, lines, opts) => {
  applyOpts(ctx, opts);
  const anchorPadding = opts.anchorPadding ?? 0;
  const anchor = opts.anchor;
  const bounds = opts.bounds ?? { x: 0, y: 0, width: 1e6, height: 1e6 };
  const blocks = lines.map((l) => ctx.measureText(l));
  const widths = blocks.map((tm) => tm.width);
  const heights = blocks.map((tm) => tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent);
  const maxWidth = Math.max(...widths);
  const totalHeight = heights.reduce((acc, val) => acc + val, 0);
  let { x, y } = anchor;
  if (anchor.x + maxWidth > bounds.width)
    x = bounds.width - (maxWidth + anchorPadding);
  else
    x -= anchorPadding;
  if (x < bounds.x)
    x = bounds.x + anchorPadding;
  if (anchor.y + totalHeight > bounds.height)
    y = bounds.height - (totalHeight + anchorPadding);
  else
    y -= anchorPadding;
  if (y < bounds.y)
    y = bounds.y + anchorPadding;
  lines.forEach((line3, i) => {
    ctx.fillText(line3, x, y);
    y += heights[i];
  });
};
var textBlockAligned = (ctx, text2, opts) => {
  const { bounds } = opts;
  const { horiz = `left`, vert = `top` } = opts;
  let lines;
  if (typeof text2 === `string`)
    lines = [text2];
  else
    lines = text2;
  applyOpts(ctx, opts);
  ctx.save();
  ctx.translate(bounds.x, bounds.y);
  ctx.textAlign = `left`;
  ctx.textBaseline = `top`;
  const middleX = bounds.width / 2;
  const middleY = bounds.height / 2;
  const blocks = lines.map((l) => ctx.measureText(l));
  const heights = blocks.map((tm) => tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent);
  const totalHeight = heights.reduce((acc, val) => acc + val, 0);
  let y = 0;
  if (vert === `center`)
    y = middleY - totalHeight / 2;
  else if (vert === `bottom`) {
    y = bounds.height - totalHeight;
  }
  lines.forEach((line3, i) => {
    let x = 0;
    if (horiz === `center`)
      x = middleX - blocks[i].width / 2;
    else if (horiz === `right`)
      x = bounds.width - blocks[i].width;
    ctx.fillText(lines[i], x, y);
    y += heights[i];
  });
  ctx.restore();
};

// src/visual/Svg.ts
var Svg_exports = {};
__export(Svg_exports, {
  Elements: () => SvgElements_exports,
  applyOpts: () => applyOpts2,
  applyPathOpts: () => applyPathOpts,
  applyStrokeOpts: () => applyStrokeOpts,
  clear: () => clear2,
  createEl: () => createEl,
  createOrResolve: () => createOrResolve,
  getBounds: () => getBounds,
  makeHelper: () => makeHelper2,
  remove: () => remove,
  setBounds: () => setBounds
});

// src/visual/SvgMarkers.ts
var createMarker = (id, opts, childCreator) => {
  const m = createEl(`marker`, id);
  if (opts.markerWidth)
    m.setAttribute(`markerWidth`, opts.markerWidth?.toString());
  if (opts.markerHeight)
    m.setAttribute(`markerHeight`, opts.markerHeight?.toString());
  if (opts.orient)
    m.setAttribute(`orient`, opts.orient.toString());
  else
    m.setAttribute(`orient`, `auto-start-reverse`);
  if (opts.viewBox)
    m.setAttribute(`viewBox`, opts.viewBox.toString());
  if (opts.refX)
    m.setAttribute(`refX`, opts.refX.toString());
  if (opts.refY)
    m.setAttribute(`refY`, opts.refY.toString());
  if (childCreator) {
    const c = childCreator();
    m.appendChild(c);
  }
  return m;
};
var markerPrebuilt = (elem, opts, _context) => {
  if (elem === null)
    return `(elem null)`;
  const parent = elem.ownerSVGElement;
  if (parent === null)
    throw new Error(`parent for elem is null`);
  const defsEl = createOrResolve(parent, `defs`, `defs`);
  let defEl = defsEl.querySelector(`#${opts.id}`);
  if (defEl !== null) {
    return `url(#${opts.id})`;
  }
  if (opts.id === `triangle`) {
    opts = { ...opts, strokeStyle: `transparent` };
    if (!opts.markerHeight)
      opts = { ...opts, markerHeight: 6 };
    if (!opts.markerWidth)
      opts = { ...opts, markerWidth: 6 };
    if (!opts.refX)
      opts = { ...opts, refX: opts.markerWidth };
    if (!opts.refY)
      opts = { ...opts, refY: opts.markerHeight };
    if (!opts.fillStyle || opts.fillStyle === `none`)
      opts = { ...opts, fillStyle: `black` };
    if (!opts.viewBox)
      opts = { ...opts, viewBox: `0 0 10 10` };
    defEl = createMarker(opts.id, opts, () => {
      const tri = createEl(`path`);
      tri.setAttribute(`d`, `M 0 0 L 10 5 L 0 10 z`);
      if (opts)
        applyOpts2(tri, opts);
      return tri;
    });
  } else
    throw new Error(`Do not know how to make ${opts.id}`);
  defEl.id = opts.id;
  defsEl.appendChild(defEl);
  return `url(#${opts.id})`;
};

// src/visual/SvgElements.ts
var SvgElements_exports = {};
__export(SvgElements_exports, {
  circle: () => circle2,
  circleUpdate: () => circleUpdate,
  grid: () => grid,
  line: () => line2,
  lineUpdate: () => lineUpdate,
  path: () => path,
  pathUpdate: () => pathUpdate,
  text: () => text,
  textPath: () => textPath,
  textPathUpdate: () => textPathUpdate,
  textUpdate: () => textUpdate
});
var numOrPercentage = (v) => {
  if (v >= 0 && v <= 1)
    return v * 100 + `%`;
  return v.toString();
};
var path = (svgOrArray, parent, opts, queryOrExisting) => {
  const elem = createOrResolve(parent, `path`, queryOrExisting);
  const svg = typeof svgOrArray === `string` ? svgOrArray : svgOrArray.join(`
`);
  elem.setAttributeNS(null, `d`, svg);
  parent.appendChild(elem);
  return pathUpdate(elem, opts);
};
var pathUpdate = (elem, opts) => {
  if (opts)
    applyOpts2(elem, opts);
  if (opts)
    applyStrokeOpts(elem, opts);
  return elem;
};
var circleUpdate = (elem, circle3, opts) => {
  elem.setAttributeNS(null, `cx`, circle3.x.toString());
  elem.setAttributeNS(null, `cy`, circle3.y.toString());
  elem.setAttributeNS(null, `r`, circle3.radius.toString());
  if (opts)
    applyOpts2(elem, opts);
  if (opts)
    applyStrokeOpts(elem, opts);
  return elem;
};
var circle2 = (circle3, parent, opts, queryOrExisting) => {
  const p = createOrResolve(parent, `circle`, queryOrExisting);
  return circleUpdate(p, circle3, opts);
};
var line2 = (line3, parent, opts, queryOrExisting) => {
  const lineEl = createOrResolve(parent, `line`, queryOrExisting);
  return lineUpdate(lineEl, line3, opts);
};
var lineUpdate = (lineEl, line3, opts) => {
  lineEl.setAttributeNS(null, `x1`, line3.a.x.toString());
  lineEl.setAttributeNS(null, `y1`, line3.a.y.toString());
  lineEl.setAttributeNS(null, `x2`, line3.b.x.toString());
  lineEl.setAttributeNS(null, `y2`, line3.b.y.toString());
  if (opts)
    applyOpts2(lineEl, opts);
  if (opts)
    applyPathOpts(lineEl, opts);
  if (opts)
    applyStrokeOpts(lineEl, opts);
  return lineEl;
};
var textPathUpdate = (el, text2, opts) => {
  if (opts?.method)
    el.setAttributeNS(null, `method`, opts.method);
  if (opts?.side)
    el.setAttributeNS(null, `side`, opts.side);
  if (opts?.spacing)
    el.setAttributeNS(null, `spacing`, opts.spacing);
  if (opts?.startOffset) {
    el.setAttributeNS(null, `startOffset`, numOrPercentage(opts.startOffset));
  }
  if (opts?.textLength)
    el.setAttributeNS(null, `textLength`, numOrPercentage(opts.textLength));
  if (text2) {
    el.textContent = text2;
  }
  if (opts)
    applyOpts2(el, opts);
  if (opts)
    applyStrokeOpts(el, opts);
  return el;
};
var textPath = (pathRef, text2, parent, opts, queryOrExisting) => {
  const textEl = createOrResolve(parent, `text`, queryOrExisting + `-text`);
  textUpdate(textEl, void 0, void 0, opts);
  const p = createOrResolve(textEl, `textPath`, queryOrExisting);
  p.setAttributeNS(null, `href`, pathRef);
  return textPathUpdate(p, text2, opts);
};
var textUpdate = (el, pos, text2, opts) => {
  if (pos) {
    el.setAttributeNS(null, `x`, pos.x.toString());
    el.setAttributeNS(null, `y`, pos.y.toString());
  }
  if (text2) {
    el.textContent = text2;
  }
  if (opts) {
    applyOpts2(el, opts);
    if (opts)
      applyStrokeOpts(el, opts);
    if (opts.anchor)
      el.setAttributeNS(null, `text-anchor`, opts.anchor);
    if (opts.align)
      el.setAttributeNS(null, `alignment-baseline`, opts.align);
  }
  return el;
};
var text = (text2, parent, pos, opts, queryOrExisting) => {
  const p = createOrResolve(parent, `text`, queryOrExisting);
  return textUpdate(p, pos, text2, opts);
};
var grid = (parent, center3, spacing, width, height, opts = {}) => {
  if (!opts.strokeStyle)
    opts = { ...opts, strokeStyle: getCssVariable(`bg-dim`, `silver`) };
  if (!opts.strokeWidth)
    opts = { ...opts, strokeWidth: 1 };
  const g = createEl(`g`);
  applyOpts2(g, opts);
  applyPathOpts(g, opts);
  applyStrokeOpts(g, opts);
  let y = 0;
  while (y < height) {
    const horiz = fromNumbers(0, y, width, y);
    line2(horiz, g);
    y += spacing;
  }
  let x = 0;
  while (x < width) {
    const vert = fromNumbers(x, 0, x, height);
    line2(vert, g);
    x += spacing;
  }
  parent.appendChild(g);
  return g;
};

// src/visual/Svg.ts
var createOrResolve = (parent, type, queryOrExisting) => {
  let existing = null;
  if (queryOrExisting !== void 0) {
    if (typeof queryOrExisting === `string`)
      existing = parent.querySelector(queryOrExisting);
    else
      existing = queryOrExisting;
  }
  if (existing === null) {
    const p = document.createElementNS(`http://www.w3.org/2000/svg`, type);
    parent.appendChild(p);
    if (queryOrExisting && typeof queryOrExisting === `string`) {
      if (queryOrExisting.startsWith(`#`))
        p.id = queryOrExisting.substring(1);
    }
    return p;
  }
  return existing;
};
var remove = (parent, queryOrExisting) => {
  if (typeof queryOrExisting === `string`) {
    const e = parent.querySelector(queryOrExisting);
    if (e === null)
      return;
    e.remove();
  } else {
    queryOrExisting.remove();
  }
};
var clear2 = (parent) => {
  let c = parent.lastElementChild;
  while (c) {
    parent.removeChild(c);
    c = parent.lastElementChild;
  }
};
var createEl = (type, id) => {
  const m = document.createElementNS(`http://www.w3.org/2000/svg`, type);
  if (id) {
    m.id = id;
  }
  return m;
};
var applyPathOpts = (elem, opts) => {
  if (opts.markerEnd)
    elem.setAttribute(`marker-end`, markerPrebuilt(elem, opts.markerEnd, opts));
  if (opts.markerStart)
    elem.setAttribute(`marker-end`, markerPrebuilt(elem, opts.markerStart, opts));
  if (opts.markerMid)
    elem.setAttribute(`marker-end`, markerPrebuilt(elem, opts.markerMid, opts));
};
var applyOpts2 = (elem, opts) => {
  if (opts.fillStyle)
    elem.setAttributeNS(null, `fill`, opts.fillStyle);
};
var applyStrokeOpts = (elem, opts) => {
  if (opts.strokeStyle)
    elem.setAttributeNS(null, `stroke`, opts.strokeStyle);
  if (opts.strokeWidth)
    elem.setAttributeNS(null, `stroke-width`, opts.strokeWidth.toString());
  if (opts.strokeDash)
    elem.setAttribute(`stroke-dasharray`, opts.strokeDash);
  if (opts.strokeLineCap)
    elem.setAttribute(`stroke-linecap`, opts.strokeLineCap);
};
var getBounds = (svg) => {
  const w = svg.getAttributeNS(null, `width`);
  const width = w === null ? 0 : parseFloat(w);
  const h = svg.getAttributeNS(null, `height`);
  const height = h === null ? 0 : parseFloat(h);
  return { width, height };
};
var setBounds = (svg, bounds) => {
  svg.setAttributeNS(null, `width`, bounds.width.toString());
  svg.setAttributeNS(null, `height`, bounds.height.toString());
};
var makeHelper2 = (parent, parentOpts) => {
  if (parentOpts) {
    applyOpts2(parent, parentOpts);
    applyStrokeOpts(parent, parentOpts);
  }
  const o = {
    remove: (queryOrExisting) => remove(parent, queryOrExisting),
    text: (text2, pos, opts, queryOrExisting) => text(text2, parent, pos, opts, queryOrExisting),
    textPath: (pathRef, text2, opts, queryOrExisting) => textPath(pathRef, text2, parent, opts, queryOrExisting),
    line: (line3, opts, queryOrExisting) => line2(line3, parent, opts, queryOrExisting),
    circle: (circle3, opts, queryOrExisting) => circle2(circle3, parent, opts, queryOrExisting),
    path: (svgStr, opts, queryOrExisting) => path(svgStr, parent, opts, queryOrExisting),
    grid: (center3, spacing, width, height, opts) => grid(parent, center3, spacing, width, height, opts),
    query: (selectors) => parent.querySelector(selectors),
    get width() {
      const w = parent.getAttributeNS(null, `width`);
      if (w === null)
        return 0;
      return parseFloat(w);
    },
    set width(width) {
      parent.setAttributeNS(null, `width`, width.toString());
    },
    get parent() {
      return parent;
    },
    get height() {
      const w = parent.getAttributeNS(null, `height`);
      if (w === null)
        return 0;
      return parseFloat(w);
    },
    set height(height) {
      parent.setAttributeNS(null, `height`, height.toString());
    },
    clear: () => {
      while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
      }
    }
  };
  return o;
};

// src/visual/Plot.ts
var Plot_exports = {};
__export(Plot_exports, {
  add: () => add2,
  calcScale: () => calcScale,
  defaultAxis: () => defaultAxis,
  draw: () => draw,
  drawValue: () => drawValue,
  plot: () => plot
});
var piPi4 = Math.PI * 2;
var defaultAxis = (name) => ({
  endWith: `none`,
  lineWidth: 1,
  namePosition: "none",
  name,
  showLabels: name === `y`,
  showLine: true,
  textSize: name === `y` ? 20 : 10
});
var calcScale = (buffer, drawingOpts, seriesColours) => {
  const seriesNames = buffer.keys();
  const scales = [];
  seriesNames.forEach((s) => {
    const series = buffer.get(s);
    if (series === void 0)
      return;
    let { min: min3, max: max3 } = minMaxAvg(series);
    let range = max3 - min3;
    let colour;
    if (seriesColours !== void 0) {
      colour = seriesColours[s];
    }
    if (colour == void 0) {
      if (drawingOpts.defaultSeriesVariable)
        colour = Colour_exports.getCssVariable(`accent`, drawingOpts.defaultSeriesColour);
      else
        colour = drawingOpts.defaultSeriesColour;
    }
    if (range === 0) {
      range = min3;
      min3 = min3 - range / 2;
      max3 = max3 + range / 2;
    }
    scales.push({
      min: min3,
      max: max3,
      range,
      name: s,
      colour
    });
  });
  return scales;
};
var add2 = (buffer, value, series = "") => {
  buffer.addKeyedValues(series, value);
};
var drawValue = (index, buffer, drawing) => {
  const c = {
    ...drawing,
    translucentPlot: true,
    leadingEdgeDot: false
  };
  draw(buffer, c);
  drawing = {
    ...drawing,
    highlightIndex: index,
    leadingEdgeDot: true,
    translucentPlot: false,
    style: `none`,
    clearCanvas: false
  };
  draw(buffer, drawing);
};
var scaleWithFixedRange = (buffer, range, drawing) => calcScale(buffer, drawing, drawing.seriesColours).map((s) => ({ ...s, range: range[1] - range[0], min: range[0], max: range[1] }));
var draw = (buffer, drawing) => {
  const { x: xAxis, y: yAxis, ctx, canvasSize } = drawing;
  const margin = drawing.margin;
  const series = drawing.y.scaleRange ? scaleWithFixedRange(buffer, drawing.y.scaleRange, drawing) : calcScale(buffer, drawing, drawing.seriesColours);
  if (drawing.clearCanvas)
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  if (drawing.debug) {
    ctx.strokeStyle = `orange`;
    ctx.strokeRect(0, 0, canvasSize.width, canvasSize.height);
  }
  ctx.translate(margin, margin);
  const plotSize = drawing.plotSize ?? plotSizeFromBounds(canvasSize, drawing);
  const axisSize = { height: plotSize.height + margin + margin, width: plotSize.width };
  if (yAxis.showLabels || yAxis.showLine) {
    series.forEach((s) => {
      if (yAxis.allowedSeries !== void 0) {
        if (!yAxis.allowedSeries.includes(s.name))
          return;
      }
      drawYSeriesScale(s, axisSize, drawing);
    });
    if (series.length > 0 && yAxis.showLine)
      drawYLine(axisSize, series[0], drawing);
  }
  if ((xAxis.showLabels || xAxis.showLine) && series.length > 0) {
    const yPos = yAxis.labelRange ? yAxis.labelRange[0] : series[0].min;
    drawXAxis(plotSize.width, calcYForValue(yPos, series[0], plotSize.height) + margin + xAxis.lineWidth, drawing);
  }
  const plotDrawing = {
    ...drawing,
    plotSize
  };
  const ptr = Drawing_exports.translatePoint(ctx, drawing.pointer);
  series.forEach((s) => {
    const data = buffer.getSource(s.name);
    if (data === void 0)
      return;
    let leadingEdgeIndex = buffer.typeName === `circular` ? data.pointer - 1 : data.length - 1;
    if (drawing.highlightIndex !== void 0)
      leadingEdgeIndex = drawing.highlightIndex;
    ctx.save();
    ctx.translate(0, margin + margin);
    drawSeriesData(s, data, plotSize, plotDrawing, leadingEdgeIndex);
    ctx.restore();
  });
  if (drawing.showLegend) {
    ctx.save();
    ctx.translate(0, plotSize.height + margin + margin + margin);
    const legendSize = { width: plotSize.width, height: drawing.x.textSize + margin + margin };
    drawLegend(series, drawing, legendSize);
    ctx.restore();
  }
  ctx.resetTransform();
};
var drawYSeriesScale = (series, plotSize, drawing) => {
  const { ctx, y, digitsPrecision, margin } = drawing;
  const { height } = plotSize;
  if (drawing.debug) {
    ctx.strokeStyle = `purple`;
    ctx.strokeRect(0, 0, y.textSize, height + margin);
  }
  ctx.fillStyle = series.colour.length > 0 ? series.colour : `white`;
  if (y.colour)
    ctx.fillStyle = y.colour;
  const min3 = y.labelRange ? y.labelRange[0] : series.min;
  const max3 = y.labelRange ? y.labelRange[1] : series.max;
  const range = y.labelRange ? max3 - min3 : series.range;
  const mid = min3 + range / 2;
  const halfHeight = drawing.textHeight / 2;
  ctx.textBaseline = `top`;
  ctx.fillText(min3.toFixed(digitsPrecision), 0, calcYForValue(min3, series, height) - halfHeight);
  ctx.fillText(mid.toFixed(digitsPrecision), 0, calcYForValue(mid, series, height) - halfHeight);
  ctx.fillText(max3.toFixed(digitsPrecision), 0, calcYForValue(max3, series, height) - margin);
  ctx.translate(y.textSize + margin, 0);
};
var drawYLine = (plotSize, series, drawing) => {
  if (series === void 0)
    throw new Error(`series undefined`);
  const { ctx, y } = drawing;
  const { height } = plotSize;
  const min3 = y.labelRange ? y.labelRange[0] : series.min;
  const max3 = y.labelRange ? y.labelRange[1] : series.max;
  const minPos = calcYForValue(min3, series, height);
  const maxPos = calcYForValue(max3, series, height);
  ctx.translate(y.lineWidth, 0);
  ctx.lineWidth = y.lineWidth;
  ctx.beginPath();
  ctx.moveTo(0, minPos);
  ctx.lineTo(0, maxPos);
  ctx.strokeStyle = series.colour;
  if (y.colour)
    ctx.strokeStyle = y.colour;
  ctx.stroke();
  ctx.translate(y.lineWidth, 0);
};
var drawLegend = (series, drawing, size) => {
  const { ctx } = drawing;
  const lineSampleWidth = 10;
  let x = 0;
  const lineY = drawing.margin * 3;
  const textY = drawing.margin;
  ctx.lineWidth = drawing.lineWidth;
  series.forEach((s) => {
    ctx.moveTo(x, lineY);
    ctx.strokeStyle = s.colour;
    ctx.lineTo(x + lineSampleWidth, lineY);
    ctx.stroke();
    x += lineSampleWidth + drawing.margin;
    let label = s.name;
    if (s.lastValue)
      label += " " + s.lastValue.toFixed(drawing.digitsPrecision);
    const labelSize = ctx.measureText(label);
    ctx.fillStyle = s.colour;
    ctx.fillText(label, x, textY);
    x += labelSize.width;
  });
};
var drawXAxis = (width, yPos, drawing) => {
  const { ctx, x, y } = drawing;
  if (!x.showLine)
    return;
  if (x.colour)
    ctx.strokeStyle = x.colour;
  ctx.lineWidth = x.lineWidth;
  ctx.beginPath();
  ctx.moveTo(0, yPos);
  ctx.lineTo(width, yPos);
  ctx.stroke();
};
var drawSeriesData = (series, values, plotSize, drawing, leadingEdgeIndex) => {
  const { ctx, lineWidth, translucentPlot = false, margin, x: xAxis } = drawing;
  const style = drawing.style ?? `connected`;
  const height = plotSize.height - margin;
  let dataXScale = 1;
  if (xAxis.scaleRange) {
    const xAxisRange = xAxis.scaleRange[1] - xAxis.scaleRange[0];
    dataXScale = plotSize.width / xAxisRange;
  } else {
    if (drawing.capacity === 0)
      dataXScale = plotSize.width / values.length;
    else
      dataXScale = plotSize.width / drawing.capacity;
  }
  const incrementBy = drawing.coalesce ? dataXScale < 0 ? Math.floor(1 / dataXScale) : 1 : 1;
  let x = 0;
  let leadingEdge;
  if (drawing.debug) {
    ctx.strokeStyle = `green`;
    ctx.strokeRect(0, 0, plotSize.width, plotSize.height);
  }
  const colourTransform = (c) => {
    if (translucentPlot)
      return Colour_exports.opacity(c, 0.2);
    return c;
  };
  if (style === `dots`) {
    ctx.fillStyle = colourTransform(series.colour);
  } else if (style === `none`) {
  } else {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = colourTransform(series.colour);
  }
  for (let i = 0; i < values.length; i += incrementBy) {
    let y = calcYForValue(values[i], series, height) - 1;
    if (style === `dots`) {
      ctx.beginPath();
      ctx.arc(x, y, lineWidth, 0, piPi4);
      ctx.fill();
    } else if (style === `none`) {
    } else {
      if (i == 0)
        ctx.moveTo(x, y);
      ctx.lineTo(x, y);
    }
    if (i === leadingEdgeIndex) {
      leadingEdge = { x, y };
      series.lastValue = values[i];
    }
    x += dataXScale;
  }
  if (style === `connected`) {
    ctx.stroke();
  }
  if (leadingEdge !== void 0 && drawing.leadingEdgeDot) {
    ctx.beginPath();
    ctx.fillStyle = colourTransform(series.colour);
    ctx.arc(leadingEdge.x, leadingEdge.y, 3, 0, 2 * Math.PI);
    ctx.fill();
  }
};
var calcYForValue = (v, series, height) => (1 - (v - series.min) / series.range) * height;
var calcSizing = (margin, x, y, showLegend) => {
  let fromLeft = margin;
  if (y.showLabels)
    fromLeft += y.textSize;
  if (y.showLine)
    fromLeft += y.lineWidth;
  if (y.showLabels || y.showLine)
    fromLeft += margin + margin;
  let fromRight = margin;
  let fromTop = margin + margin;
  let fromBottom = margin + margin;
  if (x.showLabels)
    fromBottom += x.textSize;
  else
    fromBottom += margin;
  if (x.showLine)
    fromBottom += x.lineWidth;
  if (x.showLabels || x.showLine)
    fromBottom += margin;
  if (showLegend)
    fromBottom += x.textSize;
  return {
    left: fromLeft,
    right: fromRight,
    top: fromTop,
    bottom: fromBottom
  };
};
var plotSizeFromBounds = (bounds, opts) => {
  const { width, height } = bounds;
  const sizing = calcSizing(opts.margin, opts.x, opts.y, opts.showLegend);
  return {
    width: width - sizing.left - sizing.right,
    height: height - sizing.top - sizing.bottom
  };
};
var canvasSizeFromPlot = (plot2, opts) => {
  const { width, height } = plot2;
  const sizing = calcSizing(opts.margin, opts.x, opts.y, opts.showLegend);
  return {
    width: width + sizing.left + sizing.right,
    height: height + sizing.top + sizing.bottom
  };
};
var plot = (parentElOrQuery, opts) => {
  if (parentElOrQuery === null)
    throw new Error(`parentElOrQuery is null. Expected string or element`);
  const parentEl = resolveEl(parentElOrQuery);
  let canvasEl;
  let destroyCanvasEl = true;
  let plotSize = opts.plotSize;
  let canvasSize;
  if (parentEl.nodeName === `CANVAS`) {
    canvasEl = parentEl;
    destroyCanvasEl = false;
    canvasSize = { width: canvasEl.width, height: canvasEl.height };
  } else {
    canvasEl = document.createElement(`CANVAS`);
    parentEl.append(canvasEl);
    plotSize = opts.plotSize;
    canvasSize = { width: canvasEl.width, height: canvasEl.height };
  }
  const pointer = { x: 0, y: 0 };
  const onPointerMove = (evt) => {
    pointer.x = evt.offsetX;
    pointer.y = evt.offsetY;
  };
  canvasEl.addEventListener(`pointermove`, onPointerMove);
  const ctx = canvasEl.getContext(`2d`);
  const capacity = opts.capacity ?? 10;
  const buffer = capacity > 0 ? mapCircularMutable({ capacity }) : mapArray();
  const metrics = ctx.measureText("Xy");
  const coalesce = opts.coalesce ?? true;
  if (ctx === null)
    throw new Error(`Drawing context not available`);
  let xAxis = defaultAxis(`x`);
  if (opts.x)
    xAxis = { ...xAxis, ...opts.x };
  let yAxis = defaultAxis(`y`);
  if (opts.y)
    yAxis = { ...yAxis, ...opts.y };
  let drawingOpts = {
    ...opts,
    y: yAxis,
    x: xAxis,
    pointer,
    capacity,
    coalesce,
    plotSize,
    canvasSize,
    ctx,
    textHeight: opts.textHeight ?? metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
    style: opts.style ?? `connected`,
    defaultSeriesColour: opts.defaultSeriesColour ?? `yellow`,
    margin: 3,
    clearCanvas: true,
    leadingEdgeDot: true,
    debug: opts.debug ?? false,
    digitsPrecision: opts.digitsPrecision ?? 2,
    lineWidth: opts.lineWidth ?? 2,
    showLegend: opts.showLegend ?? false
  };
  if (plotSize) {
    const canvasSize2 = canvasSizeFromPlot(plotSize, drawingOpts);
    canvasEl.width = canvasSize2.width;
    canvasEl.height = canvasSize2.height;
    drawingOpts.canvasSize = canvasSize2;
  }
  if (opts.autoSizeCanvas) {
    parentSizeCanvas(canvasEl, (args) => {
      const bounds = args.bounds;
      drawingOpts = {
        ...drawingOpts,
        plotSize: plotSizeFromBounds(bounds, drawingOpts),
        canvasSize: bounds
      };
      draw(buffer, drawingOpts);
    });
  }
  return {
    drawValue: (index) => {
      drawValue(index, buffer, drawingOpts);
    },
    dispose: () => {
      canvasEl.removeEventListener(`pointermove`, onPointerMove);
      if (destroyCanvasEl)
        canvasEl.remove();
    },
    add: (value, series = "", skipDrawing = false) => {
      add2(buffer, value, series);
      if (skipDrawing)
        return;
      draw(buffer, drawingOpts);
    },
    draw: () => {
      draw(buffer, drawingOpts);
    },
    clear: () => {
      buffer.clear();
    }
  };
};

// src/visual/Plot2.ts
var Plot2_exports = {};
__export(Plot2_exports, {
  AxisX: () => AxisX,
  AxisY: () => AxisY,
  Legend: () => Legend,
  Plot: () => Plot,
  PlotArea: () => PlotArea,
  Series: () => Series
});

// src/visual/SceneGraph.ts
var SceneGraph_exports = {};
__export(SceneGraph_exports, {
  Box: () => Box,
  CanvasBox: () => CanvasBox,
  CanvasMeasureState: () => CanvasMeasureState,
  MeasureState: () => MeasureState
});
var unitIsEqual = (a, b) => {
  if (a.type === `px` && b.type === `px`) {
    return a.value === b.value;
  }
  return false;
};
var boxRectIsEqual = (a, b) => {
  if (a === void 0 && b === void 0)
    return true;
  if (a === void 0)
    return false;
  if (b === void 0)
    return false;
  if (a.x && b.x) {
    if (!unitIsEqual(a.x, b.x))
      return false;
  }
  if (a.y && b.y) {
    if (!unitIsEqual(a.y, b.y))
      return false;
  }
  if (a.width && b.width) {
    if (!unitIsEqual(a.width, b.width))
      return false;
  }
  if (a.height && b.height) {
    if (!unitIsEqual(a.height, b.height))
      return false;
  }
  return true;
};
var MeasureState = class {
  constructor(bounds) {
    __publicField(this, "bounds");
    __publicField(this, "pass");
    __publicField(this, "measurements");
    this.bounds = bounds;
    this.pass = 0;
    this.measurements = /* @__PURE__ */ new Map();
  }
  getSize(id) {
    const s = this.measurements.get(id);
    if (s === void 0)
      return;
    if (isPlaceholder(s.size))
      return;
    return s.size;
  }
  resolveToPx(u, defaultValue) {
    if (u === void 0)
      return defaultValue;
    if (u.type === `px`)
      return u.value;
    throw new Error(`Unknown unit type ${u.type}`);
  }
};
var Box = class {
  constructor(parent, id) {
    __publicField(this, "visual", placeholderPositioned);
    __publicField(this, "_desiredSize");
    __publicField(this, "_lastMeasure");
    __publicField(this, "children", []);
    __publicField(this, "_parent");
    __publicField(this, "_idMap", /* @__PURE__ */ new Map());
    __publicField(this, "debugLayout", false);
    __publicField(this, "_visible", true);
    __publicField(this, "_ready", true);
    __publicField(this, "takesSpaceWhenInvisible", false);
    __publicField(this, "needsDrawing", true);
    __publicField(this, "_needsLayout", true);
    __publicField(this, "debugHue", randomHue());
    __publicField(this, "id");
    this.id = id;
    this._parent = parent;
    parent?.onChildAdded(this);
  }
  hasChild(box) {
    const byRef = this.children.find((c) => c === box);
    const byId = this.children.find((c) => c.id === box.id);
    return byRef !== void 0 || byId !== void 0;
  }
  notify(msg, source) {
    this.onNotify(msg, source);
    this.children.forEach((c) => c.notify(msg, source));
  }
  onNotify(msg, source) {
  }
  onChildAdded(child) {
    if (child.hasChild(this))
      throw new Error(`Recursive`);
    if (child === this)
      throw new Error(`Cannot add self as child`);
    if (this.hasChild(child))
      throw new Error(`Child already present`);
    this.children.push(child);
    this._idMap.set(child.id, child);
  }
  setReady(ready, includeChildren = false) {
    this._ready = ready;
    if (includeChildren) {
      this.children.forEach((c) => c.setReady(ready, includeChildren));
    }
  }
  get visible() {
    return this._visible;
  }
  set visible(v) {
    if (this._visible === v)
      return;
    this._visible = v;
    this.onLayoutNeeded();
  }
  get desiredSize() {
    return this._desiredSize;
  }
  set desiredSize(v) {
    if (boxRectIsEqual(v, this._desiredSize))
      return;
    this._desiredSize = v;
    this.onLayoutNeeded();
  }
  onLayoutNeeded() {
    this.notifyChildLayoutNeeded();
  }
  notifyChildLayoutNeeded() {
    this._needsLayout = true;
    this.needsDrawing = true;
    if (this._parent !== void 0) {
      this._parent.notifyChildLayoutNeeded();
    } else {
      this.update();
    }
  }
  get root() {
    if (this._parent === void 0)
      return this;
    return this._parent.root;
  }
  measurePreflight() {
  }
  measureApply(m, force) {
    let different = true;
    this._needsLayout = false;
    if (isEqual(m.size, this.visual))
      different = false;
    if (isPositioned(m.size)) {
      this.visual = m.size;
    } else {
      this.visual = {
        x: 0,
        y: 0,
        width: m.size.width,
        height: m.size.height
      };
    }
    m.children.forEach((c) => {
      if (c !== void 0)
        c.ref.measureApply(c, force);
    });
    if (different || force) {
      this.needsDrawing = true;
      this.root.notify(`measureApplied`, this);
    }
    return different;
  }
  debugLog(m) {
    console.log(this.id, m);
  }
  measureStart(opts, force, parent) {
    this.measurePreflight();
    let m = {
      ref: this,
      size: placeholder,
      children: []
    };
    opts.measurements.set(this.id, m);
    if (!this._visible && !this.takesSpaceWhenInvisible) {
      m.size = emptyPositioned;
    } else {
      let size = this._lastMeasure;
      if (this._needsLayout || this._lastMeasure === void 0) {
        size = this.measureSelf(opts, parent);
        this.root.notify(`measured`, this);
      }
      if (size === void 0)
        return;
      m.size = size;
      this._lastMeasure = size;
    }
    m.children = this.children.map((c) => c.measureStart(opts, force, m));
    if (Arrays_exports.without(m.children, void 0).length < this.children.length) {
      return void 0;
    }
    return m;
  }
  measureSelf(opts, parent) {
    let size = placeholderPositioned;
    if (parent) {
      if (parent.size) {
        size = {
          x: 0,
          y: 0,
          width: parent.size.width,
          height: parent.size.height
        };
      }
    } else {
      size = {
        x: 0,
        y: 0,
        width: opts.bounds.width,
        height: opts.bounds.height
      };
    }
    if (isPlaceholder(size))
      return;
    return size;
  }
  updateDone(state, force) {
    this.onUpdateDone(state, force);
    this.children.forEach((c) => c.updateDone(state, force));
  }
  update(force = false) {
    const state = this.updateBegin(force);
    let attempts = 5;
    let applied = false;
    while (attempts--) {
      const m = this.measureStart(state, force);
      if (m !== void 0) {
        this.measureApply(m, force);
        if (!this._ready)
          return;
        applied = true;
      }
    }
    this.updateDone(state, force);
    if (!applied)
      console.warn(`Ran out of measurement attempts`);
  }
};
var CanvasMeasureState = class extends MeasureState {
  constructor(bounds, ctx) {
    super(bounds);
    __publicField(this, "ctx");
    this.ctx = ctx;
  }
};
var CanvasBox = class extends Box {
  constructor(parent, canvasEl, id) {
    super(parent, id);
    __publicField(this, "canvasEl");
    if (canvasEl === void 0)
      throw new Error(`canvasEl undefined`);
    if (canvasEl === null)
      throw new Error(`canvasEl null`);
    this.canvasEl = canvasEl;
    if (parent === void 0)
      this.designateRoot();
  }
  designateRoot() {
    this.canvasEl.addEventListener(`pointermove`, (evt) => {
      const p = { x: evt.offsetX, y: evt.offsetY };
      this.notifyPointerMove(p);
    });
    this.canvasEl.addEventListener(`pointerleave`, (evt) => {
      this.notifyPointerLeave();
    });
    this.canvasEl.addEventListener(`click`, (evt) => {
      const p = { x: evt.offsetX, y: evt.offsetY };
      this.notifyClick(p);
    });
  }
  onClick(p) {
  }
  notifyClick(p) {
    if (isPlaceholder(this.visual))
      return;
    if (intersectsPoint(this.visual, p)) {
      const pp = Point_exports.subtract(p, this.visual.x, this.visual.y);
      this.onClick(pp);
      this.children.forEach((c) => c.notifyClick(pp));
    }
  }
  notifyPointerLeave() {
    this.onPointerLeave();
    this.children.forEach((c) => c.notifyPointerLeave());
  }
  notifyPointerMove(p) {
    if (isPlaceholder(this.visual))
      return;
    if (intersectsPoint(this.visual, p)) {
      const pp = Point_exports.subtract(p, this.visual.x, this.visual.y);
      this.onPointerMove(pp);
      this.children.forEach((c) => c.notifyPointerMove(pp));
    }
  }
  onPointerLeave() {
  }
  onPointerMove(p) {
  }
  updateBegin() {
    const ctx = this.canvasEl.getContext(`2d`);
    if (ctx === null)
      throw new Error(`Context unavailable`);
    const s = this.canvasEl.getBoundingClientRect();
    return new CanvasMeasureState({
      width: s.width,
      height: s.height
    }, ctx);
  }
  onUpdateDone(state, force) {
    if (!this.needsDrawing && !force)
      return;
    const ctx = this.canvasEl.getContext(`2d`);
    if (ctx === null)
      throw new Error(`Context unavailable`);
    ctx.save();
    ctx.translate(this.visual.x, this.visual.y);
    const v = this.visual;
    if (this.debugLayout) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = `hsl(${this.debugHue}, 100%, 50%)`;
      ctx.strokeRect(0, 0, v.width, v.height);
      ctx.fillStyle = ctx.strokeStyle;
      ctx.fillText(this.id, 10, 10, v.width);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(v.width, v.height);
      ctx.stroke();
    }
    this.drawSelf(ctx);
    this.needsDrawing = false;
    ctx.restore();
  }
  drawSelf(ctx) {
  }
};

// src/visual/Plot2.ts
var ArrayDataSource = class {
  constructor(series) {
    __publicField(this, "data");
    __publicField(this, "series");
    __publicField(this, "dirty", false);
    __publicField(this, "type", `array`);
    __publicField(this, "_range");
    this.series = series;
    this.data = [];
    this.dirty = true;
  }
  clear() {
    this.set([]);
  }
  set(data) {
    this.data = data;
    this.dirty = true;
  }
  get length() {
    return this.data.length;
  }
  get range() {
    if (!this.dirty && this._range !== void 0)
      return this._range;
    this.dirty = false;
    this._range = Arrays_exports.minMaxAvg(this.data);
    return { ...this._range, changed: true };
  }
  add(value) {
    this.data = [...this.data, value];
    this.dirty = true;
  }
};
var StreamingDataSource = class extends ArrayDataSource {
  constructor(series) {
    super(series);
    __publicField(this, "desiredDataPointMinWidth", 5);
  }
  add(value) {
    const lastWidth = this.series.lastPxPerPt;
    if (lastWidth > -1 && lastWidth < this.desiredDataPointMinWidth) {
      const pts = Math.floor(this.desiredDataPointMinWidth / lastWidth);
      const d = [...this.data.slice(pts), value];
      super.set(d);
    } else
      super.add(value);
  }
};
var Series = class {
  constructor(name, sourceType, plot2, opts) {
    this.plot = plot2;
    __publicField(this, "name");
    __publicField(this, "colour");
    __publicField(this, "source");
    __publicField(this, "drawingStyle");
    __publicField(this, "width", 3);
    __publicField(this, "dataHitPoint");
    __publicField(this, "tooltip");
    __publicField(this, "precision", 2);
    __publicField(this, "lastPxPerPt", -1);
    __publicField(this, "_visualRange");
    __publicField(this, "_visualRangeStretch");
    this.name = name;
    this.drawingStyle = opts.drawingStyle ?? `line`;
    this.colour = opts.colour;
    this.width = opts.width ?? 3;
    this._visualRange = opts.axisRange ?? { min: Number.NaN, max: Number.NaN };
    this._visualRangeStretch = opts.visualRangeStretch ?? true;
    if (sourceType === `array`) {
      this.source = new ArrayDataSource(this);
    } else if (sourceType === `stream`) {
      this.source = new StreamingDataSource(this);
    } else
      throw new Error(`Unknown sourceType. Expected array|stream`);
  }
  formatValue(v) {
    return v.toFixed(this.precision);
  }
  get visualRange() {
    let vr = this._visualRange;
    const sourceRange = this.source.range;
    let changed = false;
    if (sourceRange.changed) {
      if (this._visualRangeStretch) {
        const rmin = Math.min(ifNaN(vr.min, sourceRange.min), sourceRange.min);
        const rmax = Math.max(ifNaN(vr.max, sourceRange.max), sourceRange.max);
        if (rmin !== vr.min || rmax !== vr.max) {
          vr = { min: rmin, max: rmax };
          changed = true;
        }
      } else {
        if (!isRangeEqual(sourceRange, vr)) {
          vr = sourceRange;
          changed = true;
        }
      }
    }
    this._visualRange = vr;
    return { ...vr, changed };
  }
  scaleValue(value) {
    if (this.source === void 0)
      return value;
    const r = this.visualRange;
    if (r.min == r.max) {
      return 0.5;
    }
    return scale(value, r.min, r.max);
  }
  add(value) {
    this.source.add(value);
    this.plot.plotArea.needsDrawing = true;
  }
  clear() {
    this.source.clear();
    this.plot.plotArea.needsDrawing = true;
  }
};
var PlotArea = class extends CanvasBox {
  constructor(plot2) {
    super(plot2, plot2.canvasEl, `PlotArea`);
    this.plot = plot2;
    __publicField(this, "paddingPx", 3);
    __publicField(this, "piPi", Math.PI * 2);
    __publicField(this, "pointerDistanceThreshold", 20);
    __publicField(this, "lastRangeChange", 0);
    __publicField(this, "pointer");
  }
  clear() {
    this.lastRangeChange = 0;
    this.pointer = void 0;
  }
  measureSelf(opts, parent) {
    const axisY = opts.getSize(`AxisY`);
    if (axisY === void 0)
      return;
    const legend = opts.getSize(`Legend`);
    if (legend === void 0)
      return;
    const axisX = opts.getSize(`AxisX`);
    if (axisX === void 0)
      return;
    return {
      x: axisY.width,
      y: 0,
      width: opts.bounds.width - axisY.width,
      height: opts.bounds.height - legend.height - axisX.height
    };
  }
  onNotify(msg, source) {
    if (msg === `measureApplied` && source === this.plot.axisY)
      this._needsLayout = true;
    if (msg === `measureApplied` && source === this.plot.legend)
      this._needsLayout = true;
  }
  onPointerLeave() {
    const series = [...this.plot.series.values()];
    series.forEach((series2) => {
      series2.tooltip = void 0;
    });
    this.pointer = void 0;
    this.plot.legend.onLayoutNeeded();
  }
  onPointerMove(p) {
    this.pointer = p;
    this.plot.legend.onLayoutNeeded();
  }
  measurePreflight() {
    this.updateTooltip();
  }
  updateTooltip() {
    const p = this.pointer;
    if (p === void 0)
      return;
    const series = [...this.plot.series.values()];
    series.forEach((series2) => {
      if (p === void 0) {
        series2.tooltip = void 0;
        return;
      }
      if (series2.dataHitPoint === void 0)
        return;
      const v = series2.dataHitPoint(p);
      if (v[0] === void 0)
        return;
      if (v[1] > this.pointerDistanceThreshold)
        return;
      series2.tooltip = series2.formatValue(v[0].value);
    });
    this.plot.legend.needsDrawing = true;
  }
  drawSelf(ctx) {
    if (this.plot.frozen)
      return;
    const series = this.plot.seriesArray();
    ctx.clearRect(0, 0, this.visual.width, this.visual.height);
    series.forEach((series2) => {
      if (series2.source.type === `array` || series2.source.type === `stream`) {
        const arraySeries = series2.source;
        if (arraySeries.data === void 0)
          return;
        const d = [...arraySeries.data];
        this.drawDataSet(series2, d, ctx);
      } else
        console.warn(`Unknown data source type ${series2.source.type}`);
    });
  }
  computeY(series, rawValue) {
    const s = series.scaleValue(rawValue);
    return flip(s) * this.visual.height + this.paddingPx;
  }
  drawDataSet(series, d, ctx) {
    const padding = this.paddingPx + series.width;
    const v = Rect_exports.subtract(this.visual, padding * 2, padding * 3.5);
    const pxPerPt = v.width / d.length;
    series.lastPxPerPt = pxPerPt;
    let x = padding;
    ctx.strokeStyle = series.colour;
    ctx.lineWidth = series.width;
    const shapes = [];
    series.dataHitPoint = (pt) => {
      const distances = shapes.map((v2) => Point_exports.distanceToExterior(pt, v2));
      const i = minIndex(...distances);
      const closest = shapes[i];
      if (closest === void 0)
        [void 0, 0];
      return [closest, distances[i]];
    };
    if (series.drawingStyle === `line`) {
      let y = 0;
      ctx.beginPath();
      for (let i = 0; i < d.length; i++) {
        const scaled = clamp(series.scaleValue(d[i]));
        y = padding + this.paddingPx + v.height * flip(scaled);
        shapes.push({ x, y, index: i, value: d[i] });
        if (i == 0)
          ctx.moveTo(x + pxPerPt / 2, y);
        else
          ctx.lineTo(x + pxPerPt / 2, y);
        if (y > this.visual.height)
          console.warn(y + " h: " + this.visual.height);
        x += pxPerPt;
      }
      ctx.strokeStyle = series.colour;
      ctx.stroke();
    } else if (series.drawingStyle === `dotted`) {
      let y = 0;
      ctx.fillStyle = series.colour;
      for (let i = 0; i < d.length; i++) {
        const scaled = series.scaleValue(d[i]);
        y = padding + v.height * flip(scaled);
        ctx.beginPath();
        ctx.arc(x + pxPerPt / 2, y, series.width, 0, this.piPi);
        ctx.fill();
        shapes.push({ radius: series.width, x, y, index: i, value: d[i] });
        x += pxPerPt;
      }
    } else if (series.drawingStyle === `bar`) {
      ctx.fillStyle = series.colour;
      const interBarPadding = Math.ceil(pxPerPt * 0.1);
      for (let i = 0; i < d.length; i++) {
        const scaled = series.scaleValue(d[i]);
        const h = v.height * scaled;
        const r = {
          x: x + interBarPadding,
          y: v.height - h + padding,
          width: pxPerPt - interBarPadding,
          height: h,
          index: i,
          value: d[i]
        };
        ctx.fillRect(r.x, r.y, r.width, r.height);
        shapes.push(r);
        x += pxPerPt;
      }
    }
  }
};
var Legend = class extends CanvasBox {
  constructor(plot2) {
    super(plot2, plot2.canvasEl, `Legend`);
    this.plot = plot2;
    __publicField(this, "sampleSize", { width: 10, height: 10 });
    __publicField(this, "padding", 3);
    __publicField(this, "widthSnapping", 20);
  }
  clear() {
  }
  measureSelf(opts, parent) {
    const yAxis = opts.measurements.get(`AxisY`);
    const sample2 = this.sampleSize;
    const widthSnapping = this.widthSnapping;
    const padding = this.padding;
    const ctx = opts.ctx;
    if (yAxis === void 0)
      return;
    const usableWidth = opts.bounds.width - yAxis.size.width;
    const series = this.plot.seriesArray();
    let width = padding;
    for (let i = 0; i < series.length; i++) {
      width += sample2.width + padding;
      width += textWidth(ctx, series[i].name, padding, widthSnapping);
      width += textWidth(ctx, series[i].tooltip, padding, widthSnapping);
    }
    const rows2 = Math.max(1, Math.ceil(width / usableWidth));
    const h = rows2 * (this.sampleSize.height + this.padding + this.padding);
    return {
      x: yAxis.size.width,
      y: opts.bounds.height - h,
      width: usableWidth,
      height: h
    };
  }
  drawSelf(ctx) {
    const series = this.plot.seriesArray();
    const sample2 = this.sampleSize;
    const padding = this.padding;
    const widthSnapping = this.widthSnapping;
    let x = padding;
    let y = padding;
    ctx.clearRect(0, 0, this.visual.width, this.visual.height);
    for (let i = 0; i < series.length; i++) {
      const s = series[i];
      ctx.fillStyle = s.colour;
      ctx.fillRect(x, y, sample2.width, sample2.height);
      x += sample2.width + padding;
      ctx.textBaseline = `middle`;
      ctx.fillText(s.name, x, y + sample2.height / 2);
      x += textWidth(ctx, s.name, padding, widthSnapping);
      if (s.tooltip) {
        ctx.fillStyle = this.plot.axisColour;
        ctx.fillText(s.tooltip, x, y + sample2.height / 2);
        x += textWidth(ctx, s.tooltip, padding, widthSnapping);
      }
      x += padding;
      if (x > this.visual.width - 100) {
        x = padding;
        y += sample2.height + padding + padding;
      }
    }
  }
  onNotify(msg, source) {
    if (msg === `measureApplied` && source === this._parent.axisY)
      this._needsLayout = true;
  }
};
var AxisX = class extends CanvasBox {
  constructor(plot2) {
    super(plot2, plot2.canvasEl, `AxisX`);
    this.plot = plot2;
    __publicField(this, "paddingPx", 2);
    __publicField(this, "colour");
  }
  clear() {
  }
  onNotify(msg, source) {
    if (msg === `measureApplied` && source === this.plot.axisY)
      this._needsLayout = true;
    if (msg === `measureApplied` && source === this.plot.legend) {
      this.onLayoutNeeded();
    }
  }
  drawSelf(ctx) {
    const plot2 = this.plot;
    const v = this.visual;
    const width = plot2.axisWidth;
    const colour = this.colour ?? plot2.axisColour;
    ctx.strokeStyle = colour;
    ctx.clearRect(0, 0, v.width, v.height);
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.moveTo(0, width / 2);
    ctx.lineTo(v.width, width / 2);
    ctx.stroke();
  }
  measureSelf(opts, parent) {
    const plot2 = this.plot;
    const yAxis = opts.measurements.get(`AxisY`);
    if (yAxis === void 0)
      return;
    const legend = opts.measurements.get(`Legend`);
    if (legend === void 0)
      return;
    const h = plot2.axisWidth + this.paddingPx;
    return {
      x: yAxis.size.width,
      y: opts.bounds.height - h - legend.size.height,
      width: opts.bounds.width - yAxis.size.width,
      height: h
    };
  }
};
var isRangeEqual = (a, b) => a.max === b.max && a.min === b.min;
var isRangeSinglePoint = (a) => a.max === a.min;
var AxisY = class extends CanvasBox {
  constructor(plot2) {
    super(plot2, plot2.canvasEl, `AxisY`);
    this.plot = plot2;
    __publicField(this, "_maxDigits", 1);
    __publicField(this, "seriesToShow");
    __publicField(this, "paddingPx", 2);
    __publicField(this, "colour");
    __publicField(this, "lastRange");
    __publicField(this, "lastPlotAreaHeight", 0);
    this.lastRange = { min: 0, max: 0 };
  }
  clear() {
    this.lastRange = { min: 0, max: 0 };
    this.lastPlotAreaHeight = 0;
  }
  measurePreflight() {
    const series = this.getSeries();
    if (series !== void 0 && !isRangeEqual(series.visualRange, this.lastRange)) {
      this._needsLayout = true;
      this.needsDrawing = true;
    }
  }
  onNotify(msg, source) {
    const pa = this.plot.plotArea;
    if (msg === `measureApplied` && source === pa) {
      if (pa.visual.height !== this.lastPlotAreaHeight) {
        this.lastPlotAreaHeight = pa.visual.height;
        this.needsDrawing = true;
      }
    }
  }
  measureSelf(opts) {
    const copts = opts;
    const paddingPx = this.paddingPx;
    let width = this.plot.axisWidth + paddingPx;
    const series = this.getSeries();
    if (series !== void 0) {
      const r = series.visualRange;
      this._maxDigits = Math.ceil(r.max).toString().length + series.precision + 1;
      const textToMeasure = `9`.repeat(this._maxDigits);
      width += textWidth(copts.ctx, textToMeasure, paddingPx * 2);
    }
    const w = opts.resolveToPx(this.desiredSize?.width, width);
    return {
      x: 0,
      y: 0,
      width: w,
      height: opts.bounds.height
    };
  }
  drawSelf(ctx) {
    const s = this.getSeries();
    if (s !== void 0)
      this.seriesAxis(s, ctx);
    else {
      if (this.seriesToShow === void 0)
        return;
      console.warn(`Plot AxisY series '${this.seriesToShow}' is missing.`);
    }
  }
  getSeries() {
    if (this.seriesToShow === void 0) {
      return this.plot.seriesArray()[0];
    } else {
      return this.plot.series.get(this.seriesToShow);
    }
  }
  seriesAxis(series, ctx) {
    const plot2 = this.plot;
    const plotArea = plot2.plotArea;
    const v = this.visual;
    const paddingPx = this.paddingPx;
    const r = series.visualRange;
    const width = plot2.axisWidth;
    const colour = this.colour ?? plot2.axisColour;
    ctx.strokeStyle = colour;
    ctx.fillStyle = colour;
    if (Number.isNaN(r.min) && Number.isNaN(r.max))
      return;
    this.lastRange = r;
    ctx.clearRect(0, 0, v.width, v.height);
    ctx.beginPath();
    ctx.lineWidth = width;
    const lineX = v.width - width / 2;
    ctx.moveTo(lineX, plotArea.paddingPx + width);
    ctx.lineTo(lineX, plotArea.visual.height + width);
    ctx.stroke();
    ctx.textBaseline = `top`;
    const fromRight = v.width - paddingPx * 4;
    if (isRangeSinglePoint(r)) {
      drawText(ctx, series.formatValue(r.max), (size) => [
        fromRight - size.width,
        plotArea.computeY(series, r.max) - paddingPx * 4
      ]);
    } else {
      drawText(ctx, series.formatValue(r.max), (size) => [
        fromRight - size.width,
        plotArea.computeY(series, r.max) + width / 2
      ]);
      drawText(ctx, series.formatValue(r.min), (size) => [
        fromRight - size.width,
        plotArea.computeY(series, r.min) - 5
      ]);
    }
  }
};
var drawText = (ctx, text2, position) => {
  const size = ctx.measureText(text2);
  const xy = position(size);
  ctx.fillText(text2, xy[0], xy[1]);
};
var Plot = class extends CanvasBox {
  constructor(canvasEl, opts = {}) {
    if (canvasEl === void 0)
      throw new Error(`canvasEl undefined`);
    super(void 0, canvasEl, `Plot`);
    __publicField(this, "plotArea");
    __publicField(this, "legend");
    __publicField(this, "axisX");
    __publicField(this, "axisY");
    __publicField(this, "axisColour");
    __publicField(this, "axisWidth");
    __publicField(this, "series");
    __publicField(this, "_frozen", false);
    __publicField(this, "defaultSeriesOpts");
    if (opts.autoSize) {
      parentSizeCanvas(canvasEl, (evt) => {
        this.update(true);
      });
    }
    this.axisColour = opts.axisColour ?? `black`;
    this.axisWidth = opts.axisWidth ?? 3;
    this.series = /* @__PURE__ */ new Map();
    this.plotArea = new PlotArea(this);
    this.legend = new Legend(this);
    this.axisX = new AxisX(this);
    this.axisY = new AxisY(this);
  }
  clear() {
    this.series = /* @__PURE__ */ new Map();
    this.plotArea.clear();
    this.legend.clear();
    this.axisX.clear();
    this.axisY.clear();
    this.update(true);
  }
  get frozen() {
    return this._frozen;
  }
  set frozen(v) {
    this._frozen = v;
    if (v) {
      this.canvasEl.classList.add(`frozen`);
      this.canvasEl.title = `Plot frozen. Tap to unfreeze`;
    } else {
      this.canvasEl.title = ``;
      this.canvasEl.classList.remove(`frozen`);
    }
  }
  seriesArray() {
    return [...this.series.values()];
  }
  get seriesLength() {
    return this.series.size;
  }
  plot(o) {
    const paths2 = getFieldPaths(o);
    paths2.forEach((p) => {
      let s = this.series.get(p);
      if (s === void 0) {
        s = this.createSeries(p, `stream`);
        s.drawingStyle = `line`;
      }
      s.add(getFieldByPath(o, p));
    });
  }
  createSeriesFromObject(o, prefix = ``) {
    const keys = Object.keys(o);
    const create3 = (key) => {
      const v = o[key];
      if (typeof v === `object`) {
        return this.createSeriesFromObject(v, prefix + key + ".");
      } else if (typeof v === `number`) {
        return [this.createSeries(key, `stream`)];
      } else {
        return [];
      }
    };
    return keys.flatMap(create3);
  }
  createSeries(name, type = `array`, seriesOpts) {
    const len = this.seriesLength;
    if (name === void 0)
      name = `series-${len}`;
    if (this.series.has(name))
      throw new Error(`Series name '${name}' already in use`);
    let opts = {
      colour: `hsl(${len * 25 % 360}, 70%,50%)`,
      ...seriesOpts
    };
    if (this.defaultSeriesOpts)
      opts = { ...this.defaultSeriesOpts, ...opts };
    const s = new Series(name, type, this, opts);
    this.series.set(name, s);
    this.setReady(true, true);
    this.plotArea.needsDrawing = true;
    return s;
  }
};

// src/visual/Palette.ts
var Palette_exports = {};
__export(Palette_exports, {
  create: () => create
});
var create = (fallbacks) => new PaletteImpl(fallbacks);
var _store, _aliases, _lastFallback, _elementBase;
var PaletteImpl = class {
  constructor(fallbacks) {
    __privateAdd(this, _store, /* @__PURE__ */ new Map());
    __privateAdd(this, _aliases, /* @__PURE__ */ new Map());
    __publicField(this, "fallbacks");
    __privateAdd(this, _lastFallback, 0);
    __privateAdd(this, _elementBase, void 0);
    if (fallbacks !== void 0)
      this.fallbacks = fallbacks;
    else
      this.fallbacks = [`red`, `blue`, `green`, `orange`];
    __privateSet(this, _elementBase, document.body);
  }
  setElementBase(el) {
    __privateSet(this, _elementBase, el);
  }
  add(key, colour) {
    __privateGet(this, _store).set(key, colour);
  }
  alias(from2, to) {
    __privateGet(this, _aliases).set(from2, to);
  }
  get(key, fallback) {
    const alias = __privateGet(this, _aliases).get(key);
    if (alias !== void 0)
      key = alias;
    const c = __privateGet(this, _store).get(key);
    if (c !== void 0)
      return c;
    const varName = `--` + key;
    let fromCss = getComputedStyle(__privateGet(this, _elementBase)).getPropertyValue(varName).trim();
    if (fromCss === void 0 || fromCss.length === 0) {
      if (fallback !== void 0)
        return fallback;
      fromCss = this.fallbacks[__privateGet(this, _lastFallback)];
      __privateWrapper(this, _lastFallback)._++;
      if (__privateGet(this, _lastFallback) === this.fallbacks.length)
        __privateSet(this, _lastFallback, 0);
    }
    return fromCss;
  }
  getOrAdd(key, fallback) {
    if (this.has(key))
      return this.get(key);
    const c = this.get(key, fallback);
    this.add(key, c);
    return c;
  }
  has(key) {
    return __privateGet(this, _store).has(key);
  }
};
_store = new WeakMap();
_aliases = new WeakMap();
_lastFallback = new WeakMap();
_elementBase = new WeakMap();

// src/visual/Video.ts
var Video_exports = {};
__export(Video_exports, {
  capture: () => capture,
  frames: () => frames
});
async function* frames(sourceVideoEl, opts = {}) {
  const maxIntervalMs = opts.maxIntervalMs ?? 0;
  const showCanvas = opts.showCanvas ?? false;
  let canvasEl = opts.canvasEl;
  let w, h;
  w = h = 0;
  if (canvasEl === void 0) {
    canvasEl = document.createElement(`CANVAS`);
    if (!showCanvas) {
      canvasEl.style.display = `none`;
    }
    document.body.appendChild(canvasEl);
  }
  const updateSize = () => {
    if (canvasEl === void 0)
      return;
    w = sourceVideoEl.videoWidth;
    h = sourceVideoEl.videoHeight;
    canvasEl.width = w;
    canvasEl.height = h;
  };
  let c = null;
  const looper = delayLoop(maxIntervalMs);
  for await (const _ of looper) {
    if (w === 0 || h === 0)
      updateSize();
    if (w === 0 || h === 0)
      continue;
    if (c === null)
      c = canvasEl.getContext(`2d`);
    if (c === null)
      return;
    c.drawImage(sourceVideoEl, 0, 0, w, h);
    const pixels = c.getImageData(0, 0, w, h);
    yield pixels;
  }
}
var capture = (sourceVideoEl, opts = {}) => {
  const maxIntervalMs = opts.maxIntervalMs ?? 0;
  const showCanvas = opts.showCanvas ?? false;
  const onFrame = opts.onFrame;
  const w = sourceVideoEl.videoWidth;
  const h = sourceVideoEl.videoHeight;
  const canvasEl = document.createElement(`CANVAS`);
  if (!showCanvas) {
    canvasEl.style.display = `none`;
  }
  canvasEl.width = w;
  canvasEl.height = h;
  let c = null;
  let worker;
  if (opts.workerScript) {
    worker = new Worker(opts.workerScript);
  }
  const getPixels = worker || onFrame;
  if (!getPixels && !showCanvas) {
    console.warn(`Video will be captured to hidden element without any processing. Is this what you want?`);
  }
  const loop = continuously(() => {
    if (c === null)
      c = canvasEl.getContext(`2d`);
    if (c === null)
      return;
    c.drawImage(sourceVideoEl, 0, 0, w, h);
    let pixels;
    if (getPixels) {
      pixels = c.getImageData(0, 0, w, h);
    }
    if (worker) {
      worker.postMessage({
        pixels: pixels.data.buffer,
        width: w,
        height: h,
        channels: 4
      }, [pixels.data.buffer]);
    }
    if (onFrame) {
      try {
        onFrame(pixels);
      } catch (e) {
        console.error(e);
      }
    }
  }, maxIntervalMs);
  return {
    start: () => loop.start(),
    cancel: () => loop.cancel(),
    canvasEl
  };
};

// src/visual/index.ts
try {
  if (typeof window !== `undefined`) {
    window.ixfx = { ...window.ixfx, Visuals: { SceneGraph: SceneGraph_exports, Plot2: Plot2_exports, Drawing: Drawing_exports, Svg: Svg_exports, Plot: Plot_exports, Palette: Palette_exports, Colour: Colour_exports, Video: Video_exports } };
  }
} catch {
}

// src/dom/index.ts
var dom_exports = {};
__export(dom_exports, {
  Forms: () => Forms_exports,
  clear: () => clear,
  copyToClipboard: () => copyToClipboard,
  createAfter: () => createAfter,
  createIn: () => createIn,
  dataTable: () => dataTable,
  dataTableList: () => dataTableList,
  defaultErrorHandler: () => defaultErrorHandler,
  fullSizeCanvas: () => fullSizeCanvas,
  fullSizeElement: () => fullSizeElement,
  getTranslation: () => getTranslation,
  log: () => log,
  parentSize: () => parentSize,
  parentSizeCanvas: () => parentSizeCanvas,
  pointerVisualise: () => pointerVisualise,
  reconcileChildren: () => reconcileChildren,
  resizeObservable: () => resizeObservable,
  resolveEl: () => resolveEl,
  rx: () => rx,
  themeChangeObservable: () => themeChangeObservable,
  windowResize: () => windowResize
});

// src/dom/ShadowDom.ts
var addShadowCss = (parentEl, styles) => {
  const styleEl = document.createElement(`style`);
  styleEl.textContent = styles;
  let shadowRoot;
  if (parentEl.shadowRoot) {
    shadowRoot = parentEl.shadowRoot;
    shadowRoot.innerHTML = ``;
  } else {
    shadowRoot = parentEl.attachShadow({ mode: `open` });
  }
  shadowRoot.appendChild(styleEl);
  return shadowRoot;
};

// src/dom/Log.ts
var log = (domQueryOrEl, opts = {}) => {
  const { capacity = 0, monospaced = true, timestamp = false, collapseDuplicates = true, css = `` } = opts;
  let added = 0;
  let lastLog;
  let lastLogRepeats = 0;
  const parentEl = resolveEl(domQueryOrEl);
  const fontFamily = monospaced ? `Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", Monaco, "Courier New", Courier, monospace` : `normal`;
  const shadowRoot = addShadowCss(parentEl, `
  .log {
    font-family: ${fontFamily};
    background-color: var(--code-background-color);
    padding: var(--padding1, 0.2em);
    overflow-y: auto;
    height:100%;
  }
  .timestamp {
    margin-right: 0.5em;
    opacity: 0.5;
    font-size: 70%;
    align-self: center;
  }
  .line {
    display: flex;
    padding-bottom: 0.1em;
    padding-top: 0.1em;
  }
  .line:hover {
  
  }
  .error {
    color: red;
  }
  .badge {
    border: 1px solid currentColor;
    align-self: center;
    font-size: 70%;
    padding-left: 0.2em;
    padding-right: 0.2em;
    border-radius: 1em;
    margin-left: 0.5em;
    margin-right: 0.5em;
  }
  .msg {
    flex: 1;
    word-break: break-all;

  }
  ${css}
  `);
  const el = document.createElement(`div`);
  el.className = `log`;
  shadowRoot.append(el);
  const error = (msgOrError) => {
    const line3 = document.createElement(`div`);
    if (typeof msgOrError === `string`) {
      line3.innerHTML = msgOrError;
    } else if (msgOrError instanceof Error) {
      const stack2 = msgOrError.stack;
      if (stack2 === void 0) {
        line3.innerHTML = msgOrError.toString();
      } else {
        line3.innerHTML = stack2.toString();
      }
    } else {
      line3.innerHTML = msgOrError;
    }
    line3.classList.add(`error`);
    append(line3);
    lastLog = void 0;
    lastLogRepeats = 0;
  };
  let lastLogTime = 0;
  const log2 = (whatToLog = ``) => {
    let msg;
    const interval = window.performance.now() - lastLogTime;
    if (opts.minIntervalMs && interval < opts.minIntervalMs)
      return;
    lastLogTime = window.performance.now();
    if (typeof whatToLog === `object`) {
      msg = JSON.stringify(whatToLog);
    } else if (whatToLog === void 0) {
      msg = `(undefined)`;
    } else if (whatToLog === null) {
      msg = `(null)`;
    } else if (typeof whatToLog === `number`) {
      if (Number.isNaN(msg))
        msg = `(NaN)`;
      msg = whatToLog.toString();
    } else {
      msg = whatToLog;
    }
    if (msg.length === 0) {
      const rule = document.createElement(`hr`);
      lastLog = void 0;
      append(rule);
    } else if (msg === lastLog && collapseDuplicates) {
      const lastEl = el.firstElementChild;
      let lastBadge = lastEl.querySelector(`.badge`);
      if (lastBadge === null) {
        lastBadge = document.createElement(`div`);
        lastBadge.className = `badge`;
        lastEl.insertAdjacentElement(`beforeend`, lastBadge);
      }
      if (lastEl !== null) {
        lastBadge.textContent = (++lastLogRepeats).toString();
      }
      return lastEl;
    } else {
      const line3 = document.createElement(`div`);
      line3.innerText = msg;
      append(line3);
      lastLog = msg;
      return line3;
    }
  };
  const append = (line3) => {
    if (timestamp) {
      const wrapper = document.createElement(`div`);
      const timestamp2 = document.createElement(`div`);
      timestamp2.className = `timestamp`;
      timestamp2.innerText = new Date().toLocaleTimeString();
      wrapper.append(timestamp2, line3);
      line3.classList.add(`msg`);
      wrapper.classList.add(`line`);
      line3 = wrapper;
    } else {
      line3.classList.add(`line`, `msg`);
    }
    if (opts.reverse) {
      el.appendChild(line3);
    } else {
      el.insertBefore(line3, el.firstChild);
    }
    if (capacity > 0 && ++added > capacity * 2) {
      while (added > capacity) {
        el.lastChild?.remove();
        added--;
      }
    }
    if (opts.reverse) {
      el.scrollTop = el.scrollHeight;
    }
    lastLogRepeats = 0;
  };
  const clear3 = () => {
    el.innerHTML = ``;
    lastLog = void 0;
    lastLogRepeats = 0;
    added = 0;
  };
  const dispose = () => {
    el.remove();
  };
  return {
    error,
    log: log2,
    append,
    clear: clear3,
    dispose,
    get isEmpty() {
      return added === 0;
    }
  };
};

// src/dom/DomRx.ts
var rx = (elOrQuery, event, opts) => {
  const el = resolveEl(elOrQuery);
  const ev = fromEvent(el, event);
  const value = {};
  const clear3 = () => {
    const keys = Object.keys(value);
    keys.forEach((key) => {
      delete value[key];
    });
  };
  const setup = (sub) => {
    sub.subscribe({
      next: (newValue) => {
        Object.assign(value, newValue);
      }
    });
    return {
      value,
      clear: clear3
    };
  };
  if (opts === void 0)
    return setup(ev);
  if (opts.pluck) {
    return setup(ev.pipe(map((x) => x[opts.pluck])));
  } else if (opts.transform) {
    return setup(ev.pipe(map((x) => opts.transform(x))));
  }
  return setup(ev);
};

// src/data/PointTracker.ts
var PointTracker = class extends ObjectTracker {
  constructor(id, opts) {
    super(id, opts);
    this.id = id;
    __publicField(this, "relation");
    __publicField(this, "lastInfo");
  }
  get x() {
    return this.last.x;
  }
  get y() {
    return this.last.y;
  }
  onReset() {
    super.onReset();
    this.lastInfo = void 0;
    this.relation = void 0;
  }
  seen(...p) {
    const currentLast = this.last;
    super.seen(...p);
    const newLast = this.last;
    if (this.relation === void 0) {
      this.relation = relation(newLast);
    }
    const rel = this.relation(newLast);
    const r = {
      ...rel,
      values: this.values,
      speed: this.values.length < 2 ? 0 : length(currentLast, newLast) / (newLast.at - currentLast.at)
    };
    this.lastInfo = r;
    return r;
  }
  get line() {
    if (this.values.length === 1)
      return [];
    return joinPointsToLines(...this.values);
  }
  distanceFromStart() {
    const initial = this.initial;
    if (this.values.length >= 2 && initial !== void 0) {
      return distance2(initial, this.last);
    } else {
      return 0;
    }
  }
  angleFromStart() {
    const initial = this.initial;
    if (initial !== void 0 && this.values.length > 2) {
      return angle(initial, this.last);
    }
  }
  get length() {
    if (this.values.length === 1)
      return 0;
    const l = this.line;
    return length(l);
  }
};
var TrackedPointMap = class extends TrackedValueMap {
  constructor(opts) {
    super((key, start2) => {
      if (start2 === void 0)
        throw new Error(`Requires start point`);
      const p = new PointTracker(key, opts);
      p.seen(start2);
      return p;
    });
  }
};
var pointsTracker = (opts) => new TrackedPointMap(opts);
var pointTracker = (id, opts = {}) => new PointTracker(id ?? ``, opts);

// src/dom/PointerVisualise.ts
var pointerVisualise = (elOrQuery, opts = {}) => {
  const touchRadius = opts.touchRadius ?? 45;
  const mouseRadius = opts.touchRadius ?? 20;
  const trace = opts.trace ?? false;
  const hue2 = opts.hue ?? 100;
  const startFillStyle = `hsla(${hue2}, 100%, 10%, 10%)`;
  let currentHue = hue2;
  const el = resolveEl(elOrQuery);
  const tracker = pointsTracker({
    storeIntermediate: trace
  });
  const svg = document.createElementNS(`http://www.w3.org/2000/svg`, `svg`);
  svg.id = `pointerVis`;
  svg.style.zIndex = `-1000`;
  svg.style.position = `fixed`;
  svg.style.top = `0`;
  svg.style.left = `0`;
  svg.style.width = `100%`;
  svg.style.height = `100%`;
  svg.style.boxSizing = `border-box`;
  svg.style.border = `3px solid red`;
  svg.style.pointerEvents = `none`;
  svg.style.touchAction = `none`;
  fullSizeElement(svg);
  let pointerCount = 0;
  const lostPointer = async (ev) => {
    const id = ev.pointerId.toString();
    tracker.delete(id);
    currentHue = hue2;
    svg.querySelector(`#pv-start-${id}`)?.remove();
    for (let i = 0; i < pointerCount + 10; i++) {
      svg.querySelector(`#pv-progress-${id}-${i}`)?.remove();
    }
    pointerCount = 0;
  };
  const trackPointer = async (ev) => {
    const id = ev.pointerId.toString();
    const pt = { x: ev.x, y: ev.y };
    const type = ev.pointerType;
    if (ev.type === `pointermove` && !tracker.has(id)) {
      return;
    }
    const info = await tracker.seen(id, pt);
    if (info.values.length === 1) {
      const el3 = SvgElements_exports.circle({ ...info.values[0], radius: type === `touch` ? touchRadius : mouseRadius }, svg, {
        fillStyle: startFillStyle
      }, `#pv-start-${id}`);
      el3.style.pointerEvents = `none`;
      el3.style.touchAction = `none`;
    }
    const progressFillStyle = `hsla(${currentHue}, 100%, 50%, 50%)`;
    const el2 = SvgElements_exports.circle({ ...pt, radius: type === `touch` ? touchRadius : mouseRadius }, svg, {
      fillStyle: progressFillStyle
    }, `#pv-progress-${id}-${info.values.length}`);
    el2.style.pointerEvents = `none`;
    el2.style.touchAction = `none`;
    currentHue += 1;
    pointerCount = info.values.length;
    return true;
  };
  document.body.appendChild(svg);
  el.addEventListener(`pointerdown`, trackPointer);
  el.addEventListener(`pointermove`, trackPointer);
  el.addEventListener(`pointerup`, lostPointer);
  el.addEventListener(`pointerleave`, lostPointer);
  el.addEventListener(`contextmenu`, (ev) => {
    ev.preventDefault();
  });
};

// src/dom/ErrorHandler.ts
var defaultErrorHandler = () => {
  let enabled = true;
  const container = document.createElement(`div`);
  container.style.color = `black`;
  container.style.border = `2px solid red`;
  container.style.backgroundColor = `hsl(0, 80%, 90%)`;
  container.style.padding = `1em`;
  container.style.display = `none`;
  container.style.top = `1em`;
  container.style.left = `1em`;
  container.style.position = `absolute`;
  container.style.fontFamily = `monospace`;
  const msgEl = document.createElement(`div`);
  msgEl.style.maxWidth = `80vw`;
  msgEl.style.maxHeight = `80vh`;
  msgEl.style.overflowY = `scroll`;
  container.innerHTML = `<h1>Error</h1>`;
  container.append(msgEl);
  const styleButton = (b) => {
    b.style.padding = `0.3em`;
  };
  const btnClose = document.createElement(`button`);
  btnClose.innerText = `Close`;
  btnClose.onclick = () => {
    hide();
  };
  const btnStop = document.createElement(`button`);
  btnStop.innerText = `Stop displaying errors`;
  btnStop.onclick = () => {
    enabled = false;
    hide();
  };
  container.append(btnClose);
  container.append(btnStop);
  document.body.append(container);
  const show = (ex) => {
    container.style.display = `inline`;
    if (ex.stack) {
      msgEl.innerHTML += `<pre>${ex.stack}</pre>`;
    } else {
      msgEl.innerHTML += `<p>${ex}</p>`;
    }
  };
  const hide = () => {
    container.style.display = `none`;
  };
  window.onerror = (msg, url, lineNo, colNo, error) => {
    if (enabled) {
      if (error) {
        console.log(error);
        show(error);
      } else {
        console.log(msg);
        show(msg);
      }
    }
  };
  window.addEventListener(`unhandledrejection`, (e) => {
    console.log(e.reason);
    if (enabled) {
      show(e.reason);
    }
  });
  return { show, hide };
};

// src/modulation/index.ts
var modulation_exports = {};
__export(modulation_exports, {
  Easings: () => Easing_exports,
  Forces: () => Forces_exports,
  Oscillators: () => Oscillator_exports,
  adsr: () => adsr,
  adsrSample: () => adsrSample,
  defaultAdsrOpts: () => defaultAdsrOpts,
  jitter: () => jitter
});

// src/modulation/Envelope.ts
var Envelope_exports = {};
__export(Envelope_exports, {
  adsr: () => adsr,
  adsrSample: () => adsrSample,
  defaultAdsrOpts: () => defaultAdsrOpts
});
var defaultAdsrOpts = () => ({
  attackBend: -1,
  decayBend: -0.3,
  releaseBend: -0.3,
  peakLevel: 1,
  initialLevel: 0,
  sustainLevel: 0.6,
  releaseLevel: 0,
  attackDuration: 600,
  decayDuration: 200,
  releaseDuration: 800,
  shouldLoop: false
});
var _sm, _timeSource, _timer, _holding, _holdingInitial;
var AdsrBase = class extends SimpleEventEmitter {
  constructor(opts) {
    super();
    __privateAdd(this, _sm, void 0);
    __privateAdd(this, _timeSource, void 0);
    __privateAdd(this, _timer, void 0);
    __privateAdd(this, _holding, void 0);
    __privateAdd(this, _holdingInitial, void 0);
    __publicField(this, "attackDuration");
    __publicField(this, "decayDuration");
    __publicField(this, "releaseDuration");
    __publicField(this, "decayDurationTotal");
    __publicField(this, "shouldLoop");
    this.attackDuration = opts.attackDuration ?? 300;
    this.decayDuration = opts.decayDuration ?? 500;
    this.releaseDuration = opts.releaseDuration ?? 1e3;
    this.shouldLoop = opts.shouldLoop ?? false;
    const descr = {
      attack: [`decay`, `release`],
      decay: [`sustain`, `release`],
      sustain: [`release`],
      release: [`complete`],
      complete: null
    };
    __privateSet(this, _sm, new StateMachine(`attack`, descr));
    __privateGet(this, _sm).addEventListener(`change`, (ev) => {
      if (ev.newState === `release` && __privateGet(this, _holdingInitial)) {
        __privateGet(this, _timer)?.reset();
      }
      super.fireEvent(`change`, ev);
    });
    __privateGet(this, _sm).addEventListener(`stop`, (ev) => {
      super.fireEvent(`complete`, ev);
    });
    __privateSet(this, _timeSource, msElapsedTimer);
    __privateSet(this, _holding, __privateSet(this, _holdingInitial, false));
    this.decayDurationTotal = this.attackDuration + this.decayDuration;
  }
  switchState() {
    if (__privateGet(this, _timer) === void 0)
      return false;
    let elapsed = __privateGet(this, _timer).elapsed;
    const wasHeld = __privateGet(this, _holdingInitial) && !__privateGet(this, _holding);
    let hasChanged = false;
    do {
      hasChanged = false;
      switch (__privateGet(this, _sm).state) {
        case `attack`:
          if (elapsed > this.attackDuration || wasHeld) {
            __privateGet(this, _sm).next();
            hasChanged = true;
          }
          break;
        case `decay`:
          if (elapsed > this.decayDurationTotal || wasHeld) {
            __privateGet(this, _sm).next();
            hasChanged = true;
          }
          break;
        case `sustain`:
          if (!__privateGet(this, _holding) || wasHeld) {
            elapsed = 0;
            __privateGet(this, _sm).next();
            __privateGet(this, _timer)?.reset();
            hasChanged = true;
          }
          break;
        case `release`:
          if (elapsed > this.releaseDuration) {
            __privateGet(this, _sm).next();
            hasChanged = true;
          }
          break;
        case `complete`:
          if (this.shouldLoop) {
            this.trigger(__privateGet(this, _holdingInitial));
          }
      }
    } while (hasChanged);
    return hasChanged;
  }
  computeRaw(allowStateChange = true) {
    if (__privateGet(this, _timer) === void 0)
      return [void 0, 0, __privateGet(this, _sm).state];
    if (allowStateChange)
      this.switchState();
    const prevStage = __privateGet(this, _sm).state;
    const elapsed = __privateGet(this, _timer).elapsed;
    let relative = 0;
    const state = __privateGet(this, _sm).state;
    switch (state) {
      case `attack`:
        relative = elapsed / this.attackDuration;
        break;
      case `decay`:
        relative = (elapsed - this.attackDuration) / this.decayDuration;
        break;
      case `sustain`:
        relative = 1;
        break;
      case `release`:
        relative = Math.min(elapsed / this.releaseDuration, 1);
        break;
      case `complete`:
        return [void 0, 1, prevStage];
      default:
        throw new Error(`State machine in unknown state: ${state}`);
    }
    return [state, relative, prevStage];
  }
  get isDone() {
    return __privateGet(this, _sm).isDone;
  }
  onTrigger() {
  }
  trigger(hold = false) {
    this.onTrigger();
    __privateGet(this, _sm).reset();
    __privateSet(this, _timer, __privateGet(this, _timeSource).call(this));
    __privateSet(this, _holding, hold);
    __privateSet(this, _holdingInitial, hold);
  }
  compute() {
  }
  release() {
    if (this.isDone || !__privateGet(this, _holdingInitial))
      return;
    __privateSet(this, _holding, false);
    this.compute();
  }
};
_sm = new WeakMap();
_timeSource = new WeakMap();
_timer = new WeakMap();
_holding = new WeakMap();
_holdingInitial = new WeakMap();
var AdsrImpl = class extends AdsrBase {
  constructor(opts) {
    super(opts);
    __publicField(this, "attackPath");
    __publicField(this, "decayPath");
    __publicField(this, "releasePath");
    __publicField(this, "initialLevel");
    __publicField(this, "peakLevel");
    __publicField(this, "releaseLevel");
    __publicField(this, "sustainLevel");
    __publicField(this, "attackBend");
    __publicField(this, "decayBend");
    __publicField(this, "releaseBend");
    __publicField(this, "initialLevelOverride");
    __publicField(this, "retrigger");
    __publicField(this, "releasedAt");
    this.initialLevel = opts.initialLevel ?? 0;
    this.peakLevel = opts.peakLevel ?? 1;
    this.releaseLevel = opts.releaseLevel ?? 0;
    this.sustainLevel = opts.sustainLevel ?? 0.75;
    this.retrigger = opts.retrigger ?? true;
    this.attackBend = opts.attackBend ?? 0;
    this.releaseBend = opts.releaseBend ?? 0;
    this.decayBend = opts.decayBend ?? 0;
    const max3 = 1;
    this.attackPath = toPath3(quadraticSimple({ x: 0, y: this.initialLevel }, { x: max3, y: this.peakLevel }, -this.attackBend));
    this.decayPath = toPath3(quadraticSimple({ x: 0, y: this.peakLevel }, { x: max3, y: this.sustainLevel }, -this.decayBend));
    this.releasePath = toPath3(quadraticSimple({ x: 0, y: this.sustainLevel }, { x: max3, y: this.releaseLevel }, -this.releaseBend));
  }
  onTrigger() {
    this.initialLevelOverride = void 0;
    if (!this.retrigger) {
      const [_stage, scaled, _raw] = this.compute();
      if (!Number.isNaN(scaled) && scaled > 0) {
        console.log(`Retrigger. Last value was: ${scaled}`);
        this.initialLevelOverride = scaled;
      }
    }
  }
  get value() {
    return this.compute(true)[1];
  }
  compute(allowStateChange = true) {
    const [stage, amt] = super.computeRaw(allowStateChange);
    if (stage === void 0)
      return [void 0, NaN, NaN];
    let v;
    switch (stage) {
      case `attack`:
        v = this.attackPath.interpolate(amt).y;
        if (this.initialLevelOverride !== void 0) {
          v = scale(v, 0, this.initialLevel, this.initialLevelOverride, this.initialLevel);
        }
        this.releasedAt = v;
        break;
      case `decay`:
        v = this.decayPath.interpolate(amt).y;
        this.releasedAt = v;
        break;
      case `sustain`:
        v = this.sustainLevel;
        this.releasedAt = v;
        break;
      case `release`:
        v = this.releasePath.interpolate(amt).y;
        if (this.releasedAt !== void 0)
          v = scale(v, 0, this.sustainLevel, 0, this.releasedAt);
        break;
      case `complete`:
        v = this.releaseLevel;
        this.releasedAt = void 0;
        break;
      default:
        throw new Error(`Unknown state: ${stage}`);
    }
    return [stage, v, amt];
  }
};
var adsr = (opts) => new AdsrImpl(opts);
var adsrSample = (opts, sampleRateMs) => {
  if (opts.shouldLoop)
    throw new Error(`Cannot sample a looping envelope`);
  const env = adsr(opts);
  const data = [];
  let started = false;
  return new Promise((resolve, _reject) => {
    continuously(() => {
      if (!started) {
        started = true;
        env.trigger();
      }
      const v = env.value;
      if (!Number.isNaN(v))
        data.push(env.value);
      if (env.isDone) {
        resolve(data);
        return false;
      }
    }, sampleRateMs).start();
  });
};

// src/modulation/Forces.ts
var Forces_exports = {};
__export(Forces_exports, {
  accelerationForce: () => accelerationForce,
  angleFromAccelerationForce: () => angleFromAccelerationForce,
  angleFromVelocityForce: () => angleFromVelocityForce,
  angularForce: () => angularForce,
  apply: () => apply4,
  attractionForce: () => attractionForce,
  computeAttractionForce: () => computeAttractionForce,
  computePositionFromAngle: () => computePositionFromAngle,
  computePositionFromVelocity: () => computePositionFromVelocity,
  computeVelocity: () => computeVelocity,
  constrainBounce: () => constrainBounce,
  guard: () => guard7,
  magnitudeForce: () => magnitudeForce,
  pendulumForce: () => pendulumForce,
  springForce: () => springForce,
  velocityForce: () => velocityForce
});
var guard7 = (t4, name = `t`) => {
  if (t4 === void 0)
    throw new Error(`Parameter ${name} is undefined. Expected ForceAffected`);
  if (t4 === null)
    throw new Error(`Parameter ${name} is null. Expected ForceAffected`);
  if (typeof t4 !== `object`)
    throw new Error(`Parameter ${name} is type ${typeof t4}. Expected object of shape ForceAffected`);
};
var constrainBounce = (bounds = { width: 1, height: 1 }, dampen = 1) => {
  const minX = getEdgeX(bounds, `left`);
  const maxX = getEdgeX(bounds, `right`);
  const minY = getEdgeY(bounds, `top`);
  const maxY = getEdgeY(bounds, `bottom`);
  return (t4) => {
    const position = computePositionFromVelocity(t4.position ?? Point_exports.Empty, t4.velocity ?? Point_exports.Empty);
    let velocity = t4.velocity ?? Point_exports.Empty;
    let { x, y } = position;
    if (x > maxX) {
      x = maxX;
      velocity = Point_exports.invert(Point_exports.multiply(velocity, dampen), `x`);
    } else if (x < minX) {
      x = minX;
      velocity = Point_exports.invert(Point_exports.multiply(velocity, dampen), `x`);
    }
    if (y > maxY) {
      y = maxY;
      velocity = Point_exports.multiply(Point_exports.invert(velocity, `y`), dampen);
    } else if (position.y < minY) {
      y = minY;
      velocity = Point_exports.invert(Point_exports.multiply(velocity, dampen), `y`);
    }
    return Object.freeze({
      ...t4,
      position: { x, y },
      velocity
    });
  };
};
var attractionForce = (attractors, gravity, distanceRange = {}) => (attractee) => {
  let accel = attractee.acceleration ?? Point_exports.Empty;
  attractors.forEach((a) => {
    if (a === attractee)
      return;
    const f = computeAttractionForce(a, attractee, gravity, distanceRange);
    accel = Point_exports.sum(accel, f);
  });
  return {
    ...attractee,
    acceleration: accel
  };
};
var computeAttractionForce = (attractor, attractee, gravity, distanceRange = {}) => {
  if (attractor.position === void 0)
    throw new Error(`attractor.position not set`);
  if (attractee.position === void 0)
    throw new Error(`attractee.position not set`);
  const distRangeMin = distanceRange.min ?? 0.01;
  const distRangeMax = distanceRange.max ?? 0.7;
  const f = Point_exports.normalise(Point_exports.subtract(attractor.position, attractee.position));
  const d = clamp(Point_exports.distance(f), distRangeMin, distRangeMax);
  return Point_exports.multiply(f, gravity * (attractor.mass ?? 1) * (attractee.mass ?? 1) / (d * d));
};
var apply4 = (t4, ...accelForces) => {
  if (t4 === void 0)
    throw new Error(`t parameter is undefined`);
  accelForces.forEach((f) => {
    if (f === null || f === void 0)
      return;
    if (typeof f === `function`) {
      t4 = f(t4);
    } else {
      t4 = {
        ...t4,
        acceleration: Point_exports.sum(t4.acceleration ?? Point_exports.Empty, f)
      };
    }
  });
  const velo = computeVelocity(t4.acceleration ?? Point_exports.Empty, t4.velocity ?? Point_exports.Empty);
  const pos = computePositionFromVelocity(t4.position ?? Point_exports.Empty, velo);
  const ff = {
    ...t4,
    position: pos,
    velocity: velo,
    acceleration: Point_exports.Empty
  };
  return ff;
};
var accelerationForce = (v, mass) => (t4) => Object.freeze({
  ...t4,
  acceleration: massApplyAccel(v, t4, mass)
});
var massApplyAccel = (v, t4, mass) => {
  let op;
  if (mass === `dampen`)
    op = (mass2) => Point_exports.divide(v, mass2, mass2);
  else if (mass === `multiply`)
    op = (mass2) => Point_exports.multiply(v, mass2, mass2);
  else if (mass === `ignored`) {
    op = (_mass) => v;
  } else {
    throw new Error(`Unknown 'mass' parameter '${mass}. Exepected 'dampen', 'multiply' or 'ignored'`);
  }
  return Point_exports.sum(t4.acceleration ?? Point_exports.Empty, op(t4.mass ?? 1));
};
var magnitudeForce = (force, mass) => (t4) => {
  if (t4.velocity === void 0)
    return t4;
  const mag = Point_exports.distance(Point_exports.normalise(t4.velocity));
  const magSq = force * mag * mag;
  const vv = Point_exports.multiply(Point_exports.invert(t4.velocity), magSq);
  return Object.freeze({
    ...t4,
    acceleration: massApplyAccel(vv, t4, mass)
  });
};
var velocityForce = (force, mass) => {
  const pipeline2 = Point_exports.pipeline(Point_exports.invert, (v) => Point_exports.multiply(v, force));
  return (t4) => {
    if (t4.velocity === void 0)
      return t4;
    const v = pipeline2(t4.velocity);
    return Object.freeze({
      ...t4,
      acceleration: massApplyAccel(v, t4, mass)
    });
  };
};
var angularForce = () => (t4) => {
  const acc = t4.angularAcceleration ?? 0;
  const vel = t4.angularVelocity ?? 0;
  const angle2 = t4.angle ?? 0;
  const v = vel + acc;
  const a = angle2 + v;
  return Object.freeze({
    ...t4,
    angle: a,
    angularVelocity: v,
    angularAcceleration: 0
  });
};
var angleFromAccelerationForce = (scaling = 20) => (t4) => {
  const accel = t4.acceleration ?? Point_exports.Empty;
  return Object.freeze({
    ...t4,
    angularAcceleration: accel.x * scaling
  });
};
var angleFromVelocityForce = (interpolateAmt = 1) => (t4) => {
  const a = Point_exports.angle(t4.velocity ?? Point_exports.Empty);
  return Object.freeze({
    ...t4,
    angle: interpolateAmt < 1 ? interpolateAngle(interpolateAmt, t4.angle ?? 0, a) : a
  });
};
var springForce = (pinnedAt, restingLength = 1) => {
  const k = 0.05;
  return (t4) => {
    const force = Point_exports.subtract(t4.position ?? Point_exports.Empty, pinnedAt);
    const mag = Point_exports.distance(force);
    const stretch = mag - restingLength;
    const f = Point_exports.pipelineApply(force, Point_exports.normalise, (p) => Point_exports.multiply(p, -1 * k * stretch));
    return {
      ...t4,
      acceleration: massApplyAccel(f, t4, `dampen`)
    };
  };
};
var pendulumForce = (pinnedAt = { x: 0.5, y: 0 }, length5 = 10, gravity = 0.02, damping = 0.995) => (t4) => {
  let angle2 = t4.angle;
  if (angle2 === void 0) {
    if (t4.position) {
      angle2 = Point_exports.angle(pinnedAt, t4.position) - Math.PI / 2;
    } else {
      angle2 = 0;
    }
  }
  const accel = -1 * gravity / length5 * Math.sin(angle2);
  const v = (t4.angularVelocity ?? 0) + accel;
  angle2 += v;
  return Object.freeze({
    angularVelocity: v * damping,
    angle: angle2,
    position: computePositionFromAngle(length5, angle2 + Math.PI / 2, pinnedAt)
  });
};
var computeVelocity = (acceleration, velocity) => Point_exports.sum(velocity, acceleration);
var computePositionFromVelocity = (position, velocity) => Point_exports.sum(position, velocity);
var computePositionFromAngle = (distance3, angle2, origin) => Polar_exports.toCartesian(distance3, angle2, origin);

// src/modulation/Oscillator.ts
var Oscillator_exports = {};
__export(Oscillator_exports, {
  saw: () => saw,
  sine: () => sine,
  sineBipolar: () => sineBipolar,
  square: () => square,
  triangle: () => triangle2
});
var piPi5 = Math.PI * 2;
function* sine(timerOrFreq) {
  if (typeof timerOrFreq === `number`)
    timerOrFreq = frequencyTimer(timerOrFreq);
  while (true) {
    yield (Math.sin(timerOrFreq.elapsed * piPi5) + 1) / 2;
  }
}
function* sineBipolar(timerOrFreq) {
  if (typeof timerOrFreq === `number`)
    timerOrFreq = frequencyTimer(timerOrFreq);
  while (true) {
    yield Math.sin(timerOrFreq.elapsed * piPi5);
  }
}
function* triangle2(timerOrFreq) {
  if (typeof timerOrFreq === `number`)
    timerOrFreq = frequencyTimer(timerOrFreq);
  while (true) {
    let v = timerOrFreq.elapsed;
    if (v < 0.5) {
      v *= 2;
    } else {
      v = 2 - v * 2;
    }
    yield v;
  }
}
function* saw(timerOrFreq) {
  if (typeof timerOrFreq === `number`)
    timerOrFreq = frequencyTimer(timerOrFreq);
  while (true) {
    yield timerOrFreq.elapsed;
  }
}
function* square(timerOrFreq) {
  if (typeof timerOrFreq === `number`)
    timerOrFreq = frequencyTimer(timerOrFreq);
  while (true) {
    yield timerOrFreq.elapsed < 0.5 ? 0 : 1;
  }
}

// src/modulation/index.ts
var jitter = (value, jitter2, opts = {}, rand = defaultRandom) => {
  const type = opts.type ?? `abs`;
  const clamped = opts.clamped ?? true;
  number(value, clamped ? `percentage` : `bipolar`, `value`);
  number(jitter2, clamped ? `percentage` : `bipolar`, `jitter`);
  let v;
  if (type === `rel`) {
    jitter2 = value * jitter2;
    const j = jitter2 * 2 * rand();
    v = value - jitter2 + j;
  } else if (type === `abs`) {
    const j = jitter2 * 2 * rand();
    v = value - jitter2 + j;
  } else {
    throw new Error(`Unknown jitter type: ${type}.`);
  }
  if (clamped)
    return clamp(v);
  return v;
};
try {
  if (typeof window !== `undefined`) {
    window.ixfx = { ...window.ixfx, Modulation: { Forces: Forces_exports, jitter, Envelopes: Envelope_exports, Oscillators: Oscillator_exports, Easings: Easing_exports } };
  }
} catch {
}

// src/data/FrequencyMutable.ts
var _store2, _keyString;
var FrequencyMutable = class extends SimpleEventEmitter {
  constructor(keyString = void 0) {
    super();
    __privateAdd(this, _store2, void 0);
    __privateAdd(this, _keyString, void 0);
    __privateSet(this, _store2, /* @__PURE__ */ new Map());
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
    __privateGet(this, _store2).clear();
    this.fireEvent(`change`, void 0);
  }
  keys() {
    return __privateGet(this, _store2).keys();
  }
  values() {
    return __privateGet(this, _store2).values();
  }
  toArray() {
    return Array.from(__privateGet(this, _store2).entries());
  }
  debugString() {
    let t4 = ``;
    for (const [key, count] of __privateGet(this, _store2).entries()) {
      t4 += `${key}: ${count}, `;
    }
    if (t4.endsWith(`, `))
      return t4.substring(0, t4.length - 2);
    return t4;
  }
  frequencyOf(value) {
    if (typeof value === `string`)
      return __privateGet(this, _store2).get(value);
    const key = __privateGet(this, _keyString).call(this, value);
    return __privateGet(this, _store2).get(key);
  }
  relativeFrequencyOf(value) {
    let freq2;
    if (typeof value === `string`)
      freq2 = __privateGet(this, _store2).get(value);
    else {
      const key = __privateGet(this, _keyString).call(this, value);
      freq2 = __privateGet(this, _store2).get(key);
    }
    if (freq2 === void 0)
      return;
    const mma = this.minMaxAvg();
    return freq2 / mma.total;
  }
  entries() {
    return Array.from(__privateGet(this, _store2).entries());
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
      const score = __privateGet(this, _store2).get(key) ?? 0;
      __privateGet(this, _store2).set(key, score + 1);
    });
    this.fireEvent(`change`, void 0);
  }
};
_store2 = new WeakMap();
_keyString = new WeakMap();
var frequencyMutable = (keyString) => new FrequencyMutable(keyString);

// src/data/MovingAverage.ts
var movingAverageLight = (scaling = 3) => {
  integer(scaling, `aboveZero`, `scaling`);
  let average2 = 0;
  let count = 0;
  const ma = {
    add(v) {
      count++;
      average2 = average2 + (v - average2) / Math.min(count, scaling);
      return average2;
    },
    clear() {
      average2 = 0;
      count = 0;
    },
    compute() {
      return average2;
    }
  };
  return ma;
};
var movingAverage = (samples = 100, weightingFn) => {
  let q = queueMutable({
    capacity: samples,
    discardPolicy: `older`
  });
  const clear3 = () => {
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
  const add3 = (v) => {
    q.enqueue(v);
    return compute();
  };
  return { add: add3, compute, clear: clear3 };
};

// src/data/IntervalTracker.ts
var IntervalTracker = class extends NumberTracker {
  constructor() {
    super(...arguments);
    __publicField(this, "lastMark", 0);
  }
  mark() {
    if (this.lastMark > 0) {
      this.seen(window.performance.now() - this.lastMark);
    }
    this.lastMark = window.performance.now();
  }
};
var intervalTracker = (id, opts) => new IntervalTracker(id, opts);

// src/data/Flip.ts
var flip = (v) => {
  if (typeof v === `function`)
    v = v();
  number(v, `percentage`, `v`);
  return 1 - v;
};

// src/data/Wrap.ts
var wrapInteger = (v, min3 = 0, max3 = 360) => {
  integer(v, void 0, `v`);
  integer(min3, void 0, `min`);
  integer(max3, void 0, `max`);
  if (v === min3)
    return min3;
  if (v === max3)
    return min3;
  if (v > 0 && v < min3)
    v += min3;
  v -= min3;
  max3 -= min3;
  v = v % max3;
  if (v < 0)
    v = max3 - Math.abs(v) + min3;
  return v + min3;
};
var wrap = (v, min3 = 0, max3 = 1) => {
  number(v, ``, `min`);
  number(min3, ``, `min`);
  number(max3, ``, `max`);
  if (v === min3)
    return min3;
  if (v === max3)
    return min3;
  while (v <= min3 || v >= max3) {
    if (v === max3)
      break;
    if (v === min3)
      break;
    if (v > max3) {
      v = min3 + (v - max3);
    } else if (v < min3) {
      v = max3 - (min3 - v);
    }
  }
  return v;
};
var wrapRange = (min3, max3, fn, a, b) => {
  let r = 0;
  const distF = Math.abs(b - a);
  const distFwrap = Math.abs(max3 - a + b);
  const distBWrap = Math.abs(a + (360 - b));
  const distMin = Math.min(distF, distFwrap, distBWrap);
  if (distMin === distBWrap) {
    r = a - fn(distMin);
  } else if (distMin === distFwrap) {
    r = a + fn(distMin);
  } else {
    if (a > b) {
      r = a - fn(distMin);
    } else {
      r = a + fn(distMin);
    }
  }
  return wrapInteger(r, min3, max3);
};

// src/data/index.ts
var piPi6 = Math.PI * 2;

// src/data/Interpolate.ts
var interpolate7 = (amount, a, b) => {
  const v = (1 - amount) * a + amount * b;
  return v;
};
var interpolateAngle = (amount, angleA, angleB) => {
  const t4 = wrap(angleB - angleA, 0, piPi6);
  return interpolate7(amount, angleA, angleA + (t4 > Math.PI ? t4 - piPi6 : t4));
};

// src/modulation/Easing.ts
var sqrt3 = Math.sqrt;
var pow2 = Math.pow;
var cos3 = Math.cos;
var pi3 = Math.PI;
var sin3 = Math.sin;
var time = function(nameOrFn, durationMs) {
  return create2(nameOrFn, durationMs, msElapsedTimer);
};
var tick = function(nameOrFn, durationTicks) {
  return create2(nameOrFn, durationTicks, ticksElapsedTimer);
};
var create2 = function(nameOrFn, duration, timerSource) {
  let fn;
  if (typeof nameOrFn === `function`)
    fn = nameOrFn;
  else
    fn = get(nameOrFn);
  if (fn === void 0)
    throw new Error(`Easing function not found: ${nameOrFn}`);
  const timer = relativeTimer(duration, timerSource(), true);
  return {
    get isDone() {
      return timer.isDone;
    },
    compute: () => {
      const relative = timer.elapsed;
      return fn(relative);
    },
    reset: () => {
      timer.reset();
    }
  };
};
var fromCubicBezier = (b, d) => (t4) => {
  const s = 1 - t4;
  const s2 = s * s;
  const t22 = t4 * t4;
  const t32 = t22 * t4;
  return 3 * b * s2 * t4 + 3 * d * s * t22 + t32;
};
var mix = (amt, balance, easingA, easingB) => interpolate7(balance, easingA(amt), easingB(amt));
var crossfade = (amt, easingA, easingB) => mix(amt, amt, easingA, easingB);
var get = function(easingName) {
  if (easingName === null)
    throw new Error(`easingName is null`);
  if (easingName === void 0)
    throw new Error(`easingName is undefined`);
  const name = easingName.toLocaleLowerCase();
  const found = Object.entries(functions).find(([k, _v]) => k.toLocaleLowerCase() === name);
  if (found === void 0)
    return found;
  return found[1];
};
var getEasings = function() {
  return Array.from(Object.keys(functions));
};
var gaussian = (stdDev = 0.4) => {
  const a = 1 / sqrt3(2 * pi3);
  const mean = 0.5;
  return (t4) => {
    const f = a / stdDev;
    let p = -2.5;
    let c = (t4 - mean) / stdDev;
    c *= c;
    p *= c;
    const v = f * pow2(Math.E, p);
    if (v > 1)
      return 1;
    if (v < 0)
      return 0;
    return v;
  };
};
var bounceOut = function(x) {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
};
var quintIn = (x) => x * x * x * x * x;
var quintOut = (x) => 1 - pow2(1 - x, 5);
var arch = (x) => x * (1 - x) * 4;
var functions = {
  arch,
  bell: gaussian(),
  sineIn: (x) => 1 - cos3(x * pi3 / 2),
  sineOut: (x) => sin3(x * pi3 / 2),
  quadIn: (x) => x * x,
  quadOut: (x) => 1 - (1 - x) * (1 - x),
  sineInOut: (x) => -(cos3(pi3 * x) - 1) / 2,
  quadInOut: (x) => x < 0.5 ? 2 * x * x : 1 - pow2(-2 * x + 2, 2) / 2,
  cubicIn: (x) => x * x * x,
  cubicOut: (x) => 1 - pow2(1 - x, 3),
  quartIn: (x) => x * x * x * x,
  quartOut: (x) => 1 - pow2(1 - x, 4),
  quintIn,
  quintOut,
  expoIn: (x) => x === 0 ? 0 : pow2(2, 10 * x - 10),
  expoOut: (x) => x === 1 ? 1 : 1 - pow2(2, -10 * x),
  quintInOut: (x) => x < 0.5 ? 16 * x * x * x * x * x : 1 - pow2(-2 * x + 2, 5) / 2,
  expoInOut: (x) => x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? pow2(2, 20 * x - 10) / 2 : (2 - pow2(2, -20 * x + 10)) / 2,
  circIn: (x) => 1 - sqrt3(1 - pow2(x, 2)),
  circOut: (x) => sqrt3(1 - pow2(x - 1, 2)),
  backIn: (x) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return c3 * x * x * x - c1 * x * x;
  },
  backOut: (x) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * pow2(x - 1, 3) + c1 * pow2(x - 1, 2);
  },
  circInOut: (x) => x < 0.5 ? (1 - sqrt3(1 - pow2(2 * x, 2))) / 2 : (sqrt3(1 - pow2(-2 * x + 2, 2)) + 1) / 2,
  backInOut: (x) => {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return x < 0.5 ? pow2(2 * x, 2) * ((c2 + 1) * 2 * x - c2) / 2 : (pow2(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
  },
  elasticIn: (x) => {
    const c4 = 2 * pi3 / 3;
    return x === 0 ? 0 : x === 1 ? 1 : -pow2(2, 10 * x - 10) * sin3((x * 10 - 10.75) * c4);
  },
  elasticOut: (x) => {
    const c4 = 2 * pi3 / 3;
    return x === 0 ? 0 : x === 1 ? 1 : pow2(2, -10 * x) * sin3((x * 10 - 0.75) * c4) + 1;
  },
  bounceIn: (x) => 1 - bounceOut(1 - x),
  bounceOut,
  elasticInOut: (x) => {
    const c5 = 2 * pi3 / 4.5;
    return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? -(pow2(2, 20 * x - 10) * sin3((20 * x - 11.125) * c5)) / 2 : pow2(2, -20 * x + 10) * sin3((20 * x - 11.125) * c5) / 2 + 1;
  },
  bounceInOut: (x) => x < 0.5 ? (1 - bounceOut(1 - 2 * x)) / 2 : (1 + bounceOut(2 * x - 1)) / 2
};

// src/Random.ts
var defaultRandom = Math.random;
var weighted = (easingName = `quadIn`, rand = defaultRandom) => {
  const r = rand();
  const easingFn = get(easingName);
  if (easingFn === void 0)
    throw new Error(`Easing function '${easingName}' not found.`);
  return easingFn(r);
};
var weightedSkewed = (easingName = `quadIn`, rand = defaultRandom) => () => weighted(easingName, rand);
var weightedInteger = (minOrMax, maxOrEasing, easing, rand = defaultRandom) => {
  number(minOrMax);
  let min3, max3, easingName;
  easingName = `quadIn`;
  min3 = 0;
  if (maxOrEasing === void 0) {
    max3 = minOrMax;
  } else {
    if (typeof maxOrEasing === `number`) {
      min3 = minOrMax;
      max3 = maxOrEasing;
      if (easing !== void 0)
        easingName = easing;
    } else if (typeof maxOrEasing === `string`) {
      max3 = minOrMax;
      easingName = maxOrEasing;
    } else {
      throw new Error(`Unexpected value type for maxOrEasing: ${maxOrEasing}`);
    }
  }
  if (easing !== void 0)
    easingName = easing;
  const easingFn = get(easingName);
  if (easingFn === void 0)
    throw new Error(`Easing '${easingName}' not found`);
  number(min3);
  if (max3 <= min3)
    throw new Error(`Max should be greater than min`);
  const r = clamp(easingFn(rand()));
  return Math.floor(r * (max3 - min3)) + min3;
};
var gaussian2 = (skew = 1) => {
  const min3 = 0;
  const max3 = 1;
  let u = 0, v = 0;
  while (u === 0)
    u = Math.random();
  while (v === 0)
    v = Math.random();
  let num = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  num = num / 10 + 0.5;
  if (num > 1 || num < 0) {
    num = gaussian2(skew);
  } else {
    num = Math.pow(num, skew);
    num *= max3 - min3;
    num += min3;
  }
  return num;
};
var gaussianSkewed = (skew = 1) => () => gaussian2(skew);
var integer2 = (max3, min3) => {
  let reverse2 = false;
  if (min3 === void 0) {
    if (max3 < 0) {
      max3 = Math.abs(max3);
      reverse2 = true;
    }
    min3 = 0;
  }
  const amt = max3 - min3;
  const r = Math.floor(Math.random() * amt) + min3;
  if (reverse2)
    return -r;
  return r;
};
var float = (max3 = 1, min3 = 0) => Math.random() * (max3 - min3) + min3;
var string = (length5) => Math.random().toString(36).substring(2, length5 + 2);
var shortGuid = () => {
  const firstPart = Math.random() * 46656 | 0;
  const secondPart = Math.random() * 46656 | 0;
  const firstPartStr = `000${firstPart.toString(36)}`.slice(-3);
  const secondPartStr = `000${secondPart.toString(36)}`.slice(-3);
  return firstPartStr + secondPartStr;
};

// src/collections/Arrays.ts
var guardArray = (array3, paramName = `?`) => {
  if (array3 === void 0)
    throw new Error(`Param '${paramName}' is undefined. Expected array.`);
  if (array3 === null)
    throw new Error(`Param '${paramName}' is null. Expected array.`);
  if (!Array.isArray(array3))
    throw new Error(`Param '${paramName}' not an array as expected`);
};
var guardIndex = (array3, index, paramName = `index`) => {
  guardArray(array3);
  integer(index, `positive`, paramName);
  if (index > array3.length - 1)
    throw new Error(`'${paramName}' ${index} beyond array max of ${array3.length - 1}`);
};
var areValuesIdentical = (array3, equality) => {
  if (!Array.isArray(array3))
    throw new Error(`Param 'array' is not an array.`);
  if (array3.length === 0)
    return true;
  const eq = equality === void 0 ? isEqualValueDefault : equality;
  const a = array3[0];
  const r = array3.some((v) => !eq(a, v));
  if (r)
    return false;
  return true;
};
var zip = (...arrays) => {
  if (arrays.some((a) => !Array.isArray(a)))
    throw new Error(`All parameters must be an array`);
  const lengths3 = arrays.map((a) => a.length);
  if (!areValuesIdentical(lengths3))
    throw new Error(`Arrays must be of same length`);
  const ret = [];
  const len = lengths3[0];
  for (let i = 0; i < len; i++) {
    ret.push(arrays.map((a) => a[i]));
  }
  return ret;
};
var ensureLength = (data, length5, expand = `undefined`) => {
  if (data === void 0)
    throw new Error(`Data undefined`);
  if (!Array.isArray(data))
    throw new Error(`data is not an array`);
  if (data.length === length5)
    return [...data];
  if (data.length > length5) {
    return data.slice(0, length5);
  }
  const d = [...data];
  const add3 = length5 - d.length;
  for (let i = 0; i < add3; i++) {
    if (expand === `undefined`) {
      d.push(void 0);
    } else if (expand === `repeat`) {
      d.push(data[i % data.length]);
    } else if (expand === `first`) {
      d.push(data[0]);
    } else if (expand === `last`) {
      d.push(data[data.length - 1]);
    }
  }
  return d;
};
var filterBetween = (array3, predicate, startIndex, endIndex) => {
  guardArray(array3);
  if (typeof startIndex === `undefined`)
    startIndex = 0;
  if (typeof endIndex === `undefined`)
    endIndex = array3.length - 1;
  guardIndex(array3, startIndex, `startIndex`);
  guardIndex(array3, endIndex, `endIndex`);
  const t4 = [];
  for (let i = startIndex; i <= endIndex; i++) {
    if (predicate(array3[i], i, array3))
      t4.push(array3[i]);
  }
  return t4;
};
var randomIndex = (array3, rand = defaultRandom) => Math.floor(rand() * array3.length);
var randomElement = (array3, rand = defaultRandom) => {
  guardArray(array3, `array`);
  return array3[Math.floor(rand() * array3.length)];
};
var randomPluck = (array3, mutate = false, rand = defaultRandom) => {
  if (array3 === void 0)
    throw new Error(`array is undefined`);
  if (!Array.isArray(array3))
    throw new Error(`'array' param is not an array`);
  if (array3.length === 0)
    return { value: void 0, array: [] };
  const index = randomIndex(array3, rand);
  if (mutate) {
    return {
      value: array3[index],
      array: array3.splice(index, 1)
    };
  } else {
    const t4 = [...array3];
    t4.splice(index, 1);
    return {
      value: array3[index],
      array: t4
    };
  }
};
var shuffle = (dataToShuffle, rand = defaultRandom) => {
  const array3 = [...dataToShuffle];
  for (let i = array3.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [array3[i], array3[j]] = [array3[j], array3[i]];
  }
  return array3;
};
var without = (data, value, comparer = isEqualDefault) => data.filter((v) => !comparer(v, value));
var remove2 = (data, index) => {
  if (!Array.isArray(data))
    throw new Error(`'data' parameter should be an array`);
  guardIndex(data, index, `index`);
  return [...data.slice(0, index), ...data.slice(index + 1)];
};
var groupBy = (array3, grouper) => array3.reduce((store, item) => {
  const key = grouper(item);
  const val = store.get(key);
  if (val === void 0) {
    store.set(key, [item]);
  } else {
    val.push(item);
  }
  return store;
}, /* @__PURE__ */ new Map());
var sample = (array3, amount) => {
  let subsampleSteps = 1;
  if (amount <= 1) {
    const numberOfItems = array3.length * amount;
    subsampleSteps = Math.round(array3.length / numberOfItems);
  } else {
    subsampleSteps = amount;
  }
  integer(subsampleSteps, `positive`, `amount`);
  if (subsampleSteps > array3.length - 1)
    throw new Error(`Subsample steps exceeds array length`);
  const r = [];
  for (let i = subsampleSteps - 1; i < array3.length; i += subsampleSteps) {
    r.push(array3[i]);
  }
  return r;
};

// src/KeyValue.ts
var byKey = (reverse2 = false) => pipe(reverse2 ? reverse(Ord2) : Ord2, contramap((v) => v[0]));
var byValueString = (reverse2 = false) => pipe(reverse2 ? reverse(Ord2) : Ord2, contramap((v) => v[1]));
var byValueNumber = (reverse2 = false) => pipe(reverse2 ? reverse(Ord) : Ord, contramap((v) => v[1]));
var sortByKey = (reverse2 = false) => sort(byKey(reverse2));
var sortByValueString = (reverse2 = false) => sort(byValueString(reverse2));
var sortByValueNumber = (reverse2 = false) => sort(byValueNumber(reverse2));
var getSorter = (sortStyle) => {
  switch (sortStyle) {
    case `value`:
      return sortByValueNumber(false);
    case `valueReverse`:
      return sortByValueNumber(true);
    case `key`:
      return sortByKey(false);
    case `keyReverse`:
      return sortByKey(true);
    default:
      throw new Error(`Unknown sorting value '${sortStyle}'. Expecting: value, valueReverse, key or keyReverse`);
  }
};
var minMaxAvg2 = (entries, conversionFn) => {
  if (conversionFn === void 0)
    conversionFn = (v) => v[1];
  const values = entries.map(conversionFn);
  return minMaxAvg(values);
};

export {
  weight,
  dotProduct,
  average,
  averageWeighted,
  min,
  maxIndex,
  minIndex,
  max,
  total,
  maxFast,
  minFast,
  minMaxAvg,
  scale,
  scalePercentages,
  scalePercent,
  Normalise_exports,
  byValueString,
  sortByKey,
  sortByValueString,
  sortByValueNumber,
  getSorter,
  minMaxAvg2,
  KeyValue_exports,
  circularArray,
  MapOfMutableImpl,
  mapArray,
  mapSet,
  mapCircularMutable,
  stack,
  stackMutable,
  Stack_exports,
  queue,
  queueMutable,
  Queue_exports,
  map2 as map,
  mapMutable,
  collections_exports,
  Line_exports,
  Rect_exports,
  Point_exports,
  Arc_exports,
  Bezier_exports,
  Circle_exports,
  CompoundPath_exports,
  Grid_exports,
  Path_exports,
  Ellipse_exports,
  Polar_exports,
  Shape_exports,
  Triangle_exports,
  degreeToRadian,
  radianToDegree,
  radiansFromAxisX,
  geometry_exports,
  Codec,
  StringReceiveBuffer,
  StringWriteBuffer,
  NordicBleDevice_exports,
  TrackerBase,
  PrimitiveTracker,
  ObjectTracker,
  TrackedValueMap,
  NumberTracker,
  numberTracker,
  AudioVisualiser_exports,
  AudioAnalyser_exports,
  Serial_exports,
  Espruino_exports,
  Camera_exports,
  io_exports,
  randomHue,
  Colour_exports,
  Drawing_exports,
  SvgElements_exports,
  createOrResolve,
  remove,
  clear2 as clear,
  createEl,
  applyPathOpts,
  applyOpts2 as applyOpts,
  applyStrokeOpts,
  getBounds,
  setBounds,
  makeHelper2 as makeHelper,
  Svg_exports,
  Plot_exports,
  SceneGraph_exports,
  Plot2_exports,
  Palette_exports,
  Video_exports,
  visual_exports,
  log,
  rx,
  PointTracker,
  TrackedPointMap,
  pointsTracker,
  pointTracker,
  pointerVisualise,
  defaultErrorHandler,
  dom_exports,
  defaultAdsrOpts,
  adsr,
  adsrSample,
  Forces_exports,
  Oscillator_exports,
  jitter,
  modulation_exports,
  FrequencyMutable,
  frequencyMutable,
  movingAverageLight,
  movingAverage,
  IntervalTracker,
  intervalTracker,
  flip,
  wrapInteger,
  wrap,
  wrapRange,
  piPi6 as piPi,
  data_exports,
  interpolate7 as interpolate,
  interpolateAngle,
  Easing_exports,
  defaultRandom,
  weighted,
  weightedSkewed,
  weightedInteger,
  gaussian2 as gaussian,
  gaussianSkewed,
  integer2 as integer,
  float,
  string,
  shortGuid,
  Random_exports,
  guardArray,
  guardIndex,
  areValuesIdentical,
  zip,
  ensureLength,
  filterBetween,
  randomIndex,
  randomElement,
  randomPluck,
  shuffle,
  without,
  remove2,
  groupBy,
  sample,
  Arrays_exports
};
//# sourceMappingURL=chunk-4GRJ34I2.js.map