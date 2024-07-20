import {
  Bipolar_exports,
  flip
} from "./chunk-2J7LUMRE.js";
import {
  averageWeighted
} from "./chunk-FFP764T4.js";
import {
  NumberTracker,
  PrimitiveTracker,
  numberTracker
} from "./chunk-R2SBCFPC.js";
import {
  arrays_exports
} from "./chunk-BHCE37EK.js";
import {
  zip
} from "./chunk-UEAUFROA.js";
import {
  getSorter,
  minMaxAvg as minMaxAvg2
} from "./chunk-NBBVKVFQ.js";
import {
  minMaxAvg
} from "./chunk-BXWBMVS6.js";
import {
  PointTracker,
  TrackedPointMap,
  pointTracker,
  pointsTracker,
  trackUnique,
  trackUniqueInstances
} from "./chunk-KZGM4G5G.js";
import {
  DirectedGraph_exports,
  Pathed_exports,
  Process_exports,
  Table,
  compareData as compareData2,
  hasLast,
  isEmptyEntries,
  isEqualContextString,
  isReactive,
  mapObjectByObject,
  mapObjectShallow
} from "./chunk-RBLOJS6A.js";
import {
  interpolate,
  interpolateAngle,
  interpolatorInterval,
  interpolatorStepped
} from "./chunk-YEZDB5LJ.js";
import {
  wrap,
  wrapInteger,
  wrapRange
} from "./chunk-3RVYHJO6.js";
import {
  scale,
  scaleClamped,
  scalePercent,
  scalePercentages,
  scaler,
  scalerPercent
} from "./chunk-4NG2GB4D.js";
import {
  TrackedValueMap,
  TrackerBase
} from "./chunk-RRVLDWW5.js";
import {
  average
} from "./chunk-IALMVFKW.js";
import {
  rateMinimum
} from "./chunk-RNUQGND2.js";
import {
  clamp,
  clampIndex
} from "./chunk-REDAXMKO.js";
import {
  immutable
} from "./chunk-KSOSZLHF.js";
import {
  QueueMutable
} from "./chunk-5PZ2TXZH.js";
import {
  SimpleEventEmitter
} from "./chunk-QZPNGNL4.js";
import {
  addKeepingExisting,
  addObject,
  deleteByValue,
  filter,
  find,
  firstEntryByIterablePredicate,
  firstEntryByIterableValue,
  fromIterable,
  fromObject,
  getClosestIntegerKey,
  getFromKeys,
  hasAnyValue,
  hasKeyValue,
  mapToArray,
  mapToObjectTransform,
  mergeByKey,
  some,
  sortByValue,
  sortByValueProperty,
  toArray,
  toObject,
  transformMap,
  zipKeyValue
} from "./chunk-YWGG2NOJ.js";
import {
  changedDataFields,
  compareArrays,
  compareData,
  compareKeys
} from "./chunk-EHDC2PRM.js";
import {
  numberTest,
  throwNumberTest
} from "./chunk-JIDOUNL5.js";
import {
  logSet
} from "./chunk-BWJ5AMOD.js";
import {
  getOrGenerate,
  getOrGenerateSync
} from "./chunk-IQEKYUOH.js";
import {
  __export
} from "./chunk-AFNFQUHK.js";

// src/data/index.ts
var data_exports = {};
__export(data_exports, {
  Arrays: () => arrays_exports,
  Bipolar: () => Bipolar_exports,
  Correlate: () => Correlate_exports,
  FrequencyMutable: () => FrequencyMutable,
  Graphs: () => graphs_exports,
  IntervalTracker: () => IntervalTracker,
  Maps: () => maps_exports,
  Normalise: () => Normalise_exports,
  NumberTracker: () => NumberTracker,
  Pathed: () => Pathed_exports,
  PointTracker: () => PointTracker,
  Pool: () => Pool_exports,
  PrimitiveTracker: () => PrimitiveTracker,
  Process: () => Process_exports,
  Table: () => Table,
  TrackedPointMap: () => TrackedPointMap,
  TrackedValueMap: () => TrackedValueMap,
  TrackerBase: () => TrackerBase,
  changedDataFields: () => changedDataFields,
  clamp: () => clamp,
  clampIndex: () => clampIndex,
  compareArrays: () => compareArrays,
  compareData: () => compareData,
  compareDataExecute: () => compareDataExecute,
  compareKeys: () => compareKeys,
  flip: () => flip,
  frequencyMutable: () => frequencyMutable,
  interpolate: () => interpolate,
  interpolateAngle: () => interpolateAngle,
  interpolatorInterval: () => interpolatorInterval,
  interpolatorStepped: () => interpolatorStepped,
  intervalTracker: () => intervalTracker,
  isEmptyEntries: () => isEmptyEntries,
  isEqualContextString: () => isEqualContextString,
  keysToNumbers: () => keysToNumbers,
  mapObjectByObject: () => mapObjectByObject,
  mapObjectShallow: () => mapObjectShallow,
  movingAverage: () => movingAverage,
  movingAverageLight: () => movingAverageLight,
  movingAverageTimed: () => movingAverageTimed,
  noiseFilter: () => noiseFilter,
  numberTracker: () => numberTracker,
  piPi: () => piPi,
  pointTracker: () => pointTracker,
  pointsTracker: () => pointsTracker,
  proportion: () => proportion,
  resolve: () => resolve,
  resolveFields: () => resolveFields,
  scale: () => scale,
  scaleClamped: () => scaleClamped,
  scalePercent: () => scalePercent,
  scalePercentages: () => scalePercentages,
  scaler: () => scaler,
  scalerPercent: () => scalerPercent,
  softmax: () => softmax,
  trackUnique: () => trackUnique,
  trackUniqueInstances: () => trackUniqueInstances,
  wrap: () => wrap,
  wrapInteger: () => wrapInteger,
  wrapRange: () => wrapRange
});

// src/data/Correlate.ts
var Correlate_exports = {};
__export(Correlate_exports, {
  align: () => align,
  alignById: () => alignById
});
var orderScore = (a, b) => {
  if (a.score > b.score) return -1;
  else if (a.score < b.score) return 1;
  return 0;
};
var align = (similarityFn, lastData, newData, options = {}) => {
  const matchThreshold = options.matchThreshold ?? 0;
  const debug = options.debug ?? false;
  const results = /* @__PURE__ */ new Map();
  const newThings = [];
  const lastMap = /* @__PURE__ */ new Map();
  lastData?.forEach((d, index) => {
    if (d === void 0) {
      throw new Error(`'lastData' contains undefined (index: ${index})`);
    }
    lastMap.set(d.id, d);
  });
  for (let i = 0; i < newData.length; i++) {
    const newD = newData[i];
    if (!lastData || lastData.length === 0) {
      if (debug) console.debug(`Correlate.align() new id: ${newD.id}`);
      newThings.push(newD);
      continue;
    }
    const scoredLastValues = Array.from(lastMap.values()).map((last) => ({
      id: last.id,
      score: last === null ? -1 : similarityFn(last, newD),
      last
    }));
    if (scoredLastValues.length === 0) {
      if (debug) {
        console.debug(`Correlate.align() no valid last values id: ${newD.id}`);
      }
      newThings.push(newD);
      continue;
    }
    scoredLastValues.sort(orderScore);
    const top = scoredLastValues[0];
    if (top.score < matchThreshold) {
      if (debug) {
        console.debug(
          `Correlate.align() new item does not reach threshold. Top score: ${top.score} id: ${newD.id}`
        );
      }
      newThings.push(newD);
      continue;
    }
    if (debug && top.id !== newD.id) {
      console.log(
        `Correlate.align() Remapped ${newD.id} -> ${top.id} (score: ${top.score})`
      );
    }
    results.set(top.id, { ...newD, id: top.id });
    lastMap.delete(top.id);
  }
  newThings.forEach((t) => results.set(t.id, t));
  return Array.from(results.values());
};
var alignById = (fn, options = {}) => {
  let lastData = [];
  const compute = (newData) => {
    lastData = align(fn, lastData, newData, options);
    return [...lastData];
  };
  return compute;
};

// src/data/FrequencyMutable.ts
var FrequencyMutable = class extends SimpleEventEmitter {
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
    return minMaxAvg2(this.entries());
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
var frequencyMutable = (keyString) => new FrequencyMutable(keyString);

// src/data/IntervalTracker.ts
var IntervalTracker = class extends NumberTracker {
  lastMark = 0;
  mark() {
    if (this.lastMark > 0) {
      this.seen(performance.now() - this.lastMark);
    }
    this.lastMark = performance.now();
  }
};
var intervalTracker = (options) => new IntervalTracker(options);

// src/data/KeysToNumbers.ts
var keysToNumbers = (object, onInvalidKey = `throw`) => {
  const returnObject = {};
  for (const entry of Object.entries(object)) {
    const asNumber = Number.parseInt(entry[0]);
    if (Number.isNaN(asNumber)) {
      switch (onInvalidKey) {
        case `throw`: {
          throw new TypeError(`Cannot convert key '${entry[0]}' to an integer`);
        }
        case `ignore`: {
          continue;
        }
        case `keep`: {
          returnObject[entry[0]] = entry[1];
          continue;
        }
        default: {
          throw new Error(`Param 'onInvalidKey' should be: 'throw', 'ignore' or 'keep'.`);
        }
      }
    }
    returnObject[asNumber] = entry[1];
  }
  return returnObject;
};

// src/data/MovingAverage.ts
var movingAverageLight = (scaling = 3) => {
  throwNumberTest(scaling, `aboveZero`, `scaling`);
  let average2 = 0;
  let count = 0;
  return (v) => {
    const r = numberTest(v, ``, `v`);
    if (r[0] && v !== void 0) {
      count++;
      average2 = average2 + (v - average2) / Math.min(count, scaling);
    }
    return average2;
  };
};
var movingAverageTimed = (options) => {
  const average2 = movingAverageLight();
  const rm = rateMinimum({
    ...options,
    whatToCall: (distance) => {
      average2(distance);
    },
    fallback() {
      return options.default ?? 0;
    }
  });
  return (v) => {
    rm(v);
    return average2();
  };
};
var movingAverage = (samples = 100, weighter) => {
  const q = new QueueMutable({
    capacity: samples,
    discardPolicy: `older`
  });
  return (v) => {
    const r = numberTest(v);
    if (r[0] && v !== void 0) {
      q.enqueue(v);
    }
    return weighter === void 0 ? average(q.data) : averageWeighted(q.data, weighter);
  };
};
var PiPi = Math.PI * 2;
var smoothingFactor = (timeDelta, cutoff) => {
  const r = PiPi * cutoff * timeDelta;
  return r / (r + 1);
};
var exponentialSmoothing = (smoothingFactor2, value, previous) => {
  return smoothingFactor2 * value + (1 - smoothingFactor2) * previous;
};
var noiseFilter = (cutoffMin = 1, speedCoefficient = 0, cutoffDefault = 1) => {
  let previousValue = 0;
  let derivativeLast = 0;
  let timestampLast = 0;
  const compute = (value, timestamp) => {
    if (timestamp === void 0) timestamp = performance.now();
    const timeDelta = timestamp - timestampLast;
    const s = smoothingFactor(timeDelta, cutoffDefault);
    const valueDelta = (value - previousValue) / timeDelta;
    const derivative = exponentialSmoothing(s, valueDelta, derivativeLast);
    const cutoff = cutoffMin + speedCoefficient * Math.abs(derivative);
    const a = smoothingFactor(timeDelta, cutoff);
    const smoothed = exponentialSmoothing(a, value, previousValue);
    previousValue = smoothed;
    derivativeLast = derivative;
    timestampLast = timestamp;
    return smoothed;
  };
  return compute;
};

// src/data/Normalise.ts
var Normalise_exports = {};
__export(Normalise_exports, {
  array: () => array,
  stream: () => stream
});
var stream = (minDefault, maxDefault) => {
  let min = minDefault ?? Number.MAX_SAFE_INTEGER;
  let max = maxDefault ?? Number.MIN_SAFE_INTEGER;
  throwNumberTest(minDefault);
  throwNumberTest(maxDefault);
  return (v) => {
    throwNumberTest(v);
    min = Math.min(min, v);
    max = Math.max(max, v);
    return scale(v, min, max);
  };
};
var array = (values, minForced, maxForced) => {
  if (!Array.isArray(values)) {
    throw new TypeError(`Param 'values' should be an array. Got: ${typeof values}`);
  }
  const mma = minMaxAvg(values);
  const min = minForced ?? mma.min;
  const max = maxForced ?? mma.max;
  return values.map((v) => clamp(scale(v, min, max)));
};

// src/data/MonitorChanges.ts
var compareDataExecute = (o, options) => {
  let current = o;
  const cbs = /* @__PURE__ */ new Map();
  for (const [k, v] of Object.entries(options.onFieldChange)) {
    cbs.set(k.replaceAll(`_`, `.`), v);
  }
  return (value) => {
    const changes = compareData2(current, value, { includeParents: true });
    for (const c of changes) {
      const cb = cbs.get(c.path);
      if (cb) {
        c.value = cb(c.value, c.previous, c.path);
      }
    }
    console.log(`post`, JSON.stringify(changes));
    return current;
  };
};

// src/data/Pool.ts
var Pool_exports = {};
__export(Pool_exports, {
  Pool: () => Pool,
  PoolUser: () => PoolUser,
  Resource: () => Resource,
  create: () => create
});
var PoolUser = class extends SimpleEventEmitter {
  /**
   * Constructor
   * @param key User key
   * @param resource Resource being used
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  constructor(key, resource) {
    super();
    this.key = key;
    this.resource = resource;
    this._lastUpdate = performance.now();
    this._pool = resource.pool;
    this._userExpireAfterMs = this._pool.userExpireAfterMs;
    this._state = `idle`;
    this._pool.log.log(`PoolUser ctor key: ${this.key}`);
  }
  _lastUpdate;
  _pool;
  _state;
  _userExpireAfterMs;
  /**
   * Returns a human readable debug string
   * @returns
   */
  toString() {
    if (this.isDisposed) return `PoolUser. State: disposed`;
    return `PoolUser. State: ${this._state} Elapsed: ${performance.now() - this._lastUpdate} Data: ${JSON.stringify(this.resource.data)}`;
  }
  /**
   * Resets countdown for instance expiry.
   * Throws an error if instance is disposed.
   */
  keepAlive() {
    if (this._state === `disposed`) throw new Error(`PoolItem disposed`);
    this._lastUpdate = performance.now();
  }
  /**
   * @internal
   * @param reason
   * @returns
   */
  _dispose(reason, data) {
    if (this._state === `disposed`) return;
    const resource = this.resource;
    this._state = `disposed`;
    resource._release(this);
    this._pool.log.log(`PoolUser dispose key: ${this.key} reason: ${reason}`);
    this.fireEvent(`disposed`, { data, reason });
    super.clearEventListeners();
  }
  /**
   * Release this instance
   * @param reason
   */
  release(reason) {
    if (this.isDisposed) throw new Error(`User disposed`);
    const resource = this.resource;
    const data = resource.data;
    this._pool.log.log(`PoolUser release key: ${this.key} reason: ${reason}`);
    this.fireEvent(`released`, { data, reason });
    this._dispose(`release-${reason}`, data);
  }
  // #region Properties
  get data() {
    if (this.isDisposed) throw new Error(`User disposed`);
    return this.resource.data;
  }
  /**
   * Returns true if this instance has expired.
   * Expiry counts if elapsed time is greater than `userExpireAfterMs`
   */
  get isExpired() {
    if (this._userExpireAfterMs > 0) {
      return performance.now() > this._lastUpdate + this._userExpireAfterMs;
    }
    return false;
  }
  /**
   * Returns elapsed time since last 'update'
   */
  get elapsed() {
    return performance.now() - this._lastUpdate;
  }
  /**
   * Returns true if instance is disposed
   */
  get isDisposed() {
    return this._state === `disposed`;
  }
  /**
   * Returns true if instance is neither disposed nor expired
   */
  get isValid() {
    if (this.isDisposed || this.isExpired) return false;
    if (this.resource.isDisposed) return false;
    return true;
  }
  // #endregion
};
var Resource = class {
  /**
   * Constructor.
   * @param pool Pool
   * @param data Data
   */
  constructor(pool, data) {
    this.pool = pool;
    if (data === void 0) throw new Error(`Parameter 'data' is undefined`);
    if (pool === void 0) throw new Error(`Parameter 'pool' is undefined`);
    this.#data = data;
    this.#lastUsersChange = 0;
    this.#resourcesWithoutUserExpireAfterMs = pool.resourcesWithoutUserExpireAfterMs;
    this.#capacityPerResource = pool.capacityPerResource;
    this.#users = [];
    this.#state = `idle`;
  }
  #state;
  #data;
  #users;
  #capacityPerResource;
  #resourcesWithoutUserExpireAfterMs;
  #lastUsersChange;
  /**
   * Gets data associated with resource.
   * Throws an error if disposed
   */
  get data() {
    if (this.#state === `disposed`) throw new Error(`Resource disposed`);
    return this.#data;
  }
  /**
   * Changes the data associated with this resource.
   * Throws an error if disposed or `data` is undefined.
   * @param data
   */
  updateData(data) {
    if (this.#state === `disposed`) throw new Error(`Resource disposed`);
    if (data === void 0) throw new Error(`Parameter 'data' is undefined`);
    this.#data = data;
  }
  /**
   * Returns a human-readable debug string for resource
   * @returns
   */
  toString() {
    return `Resource (expired: ${this.isExpiredFromUsers} users: ${this.#users.length}, state: ${this.#state}) data: ${JSON.stringify(this.data)}`;
  }
  /**
   * Assigns a user to this resource.
   * @internal
   * @param user
   */
  _assign(user) {
    const existing = this.#users.find((u) => u === user || u.key === user.key);
    if (existing) throw new Error(`User instance already assigned to resource`);
    this.#users.push(user);
    this.#lastUsersChange = performance.now();
  }
  /**
   * Releases a user from this resource
   * @internal
   * @param user
   */
  _release(user) {
    this.#users = this.#users.filter((u) => u !== user);
    this.pool._release(user);
    this.#lastUsersChange = performance.now();
  }
  /**
   * Returns true if resource can have additional users allocated
   */
  get hasUserCapacity() {
    return this.usersCount < this.#capacityPerResource;
  }
  /**
   * Returns number of uses of the resource
   */
  get usersCount() {
    return this.#users.length;
  }
  /**
   * Returns true if automatic expiry is enabled, and that interval
   * has elapsed since the users list has changed for this resource
   */
  get isExpiredFromUsers() {
    if (this.#resourcesWithoutUserExpireAfterMs <= 0) return false;
    if (this.#users.length > 0) return false;
    return performance.now() > this.#resourcesWithoutUserExpireAfterMs + this.#lastUsersChange;
  }
  /**
   * Returns true if instance is disposed
   */
  get isDisposed() {
    return this.#state === `disposed`;
  }
  /**
   * Disposes the resource.
   * If it is already disposed, it does nothing.
   * @param reason
   * @returns
   */
  dispose(reason) {
    if (this.#state === `disposed`) return;
    const data = this.#data;
    this.#state = `disposed`;
    this.pool.log.log(`Resource disposed (${reason})`);
    for (const u of this.#users) {
      u._dispose(`resource-${reason}`, data);
    }
    this.#users = [];
    this.#lastUsersChange = performance.now();
    this.pool._releaseResource(this, reason);
    if (this.pool.freeResource) this.pool.freeResource(data);
  }
};
var Pool = class {
  _resources;
  _users;
  capacity;
  userExpireAfterMs;
  resourcesWithoutUserExpireAfterMs;
  capacityPerResource;
  fullPolicy;
  generateResource;
  freeResource;
  log;
  /**
   * Constructor.
   *
   * By default, no capacity limit, one user per resource
   * @param options Pool options
   */
  constructor(options = {}) {
    this.capacity = options.capacity ?? -1;
    this.fullPolicy = options.fullPolicy ?? `error`;
    this.capacityPerResource = options.capacityPerResource ?? 1;
    this.userExpireAfterMs = options.userExpireAfterMs ?? -1;
    this.resourcesWithoutUserExpireAfterMs = options.resourcesWithoutUserExpireAfterMs ?? -1;
    this.generateResource = options.generate;
    this.freeResource = options.free;
    this._users = /* @__PURE__ */ new Map();
    this._resources = [];
    this.log = logSet(`Pool`, options.debug ?? false);
    const timer = Math.max(
      this.userExpireAfterMs,
      this.resourcesWithoutUserExpireAfterMs
    );
    if (timer > 0) {
      setInterval(() => {
        this.maintain();
      }, timer * 1.1);
    }
  }
  /**
   * Returns a debug string of Pool state
   * @returns
   */
  dumpToString() {
    let r = `Pool
    capacity: ${this.capacity} userExpireAfterMs: ${this.userExpireAfterMs} capacityPerResource: ${this.capacityPerResource}
    resources count: ${this._resources.length}`;
    const resource = this._resources.map((r2) => r2.toString()).join(`\r
	`);
    r += `\r
Resources:\r
	` + resource;
    r += `\r
Users: \r
`;
    for (const [k, v] of this._users.entries()) {
      r += `	k: ${k} v: ${v.toString()}\r
`;
    }
    return r;
  }
  /**
   * Sorts users by longest elapsed time since update
   * @returns
   */
  getUsersByLongestElapsed() {
    return [...this._users.values()].sort((a, b) => {
      const aa = a.elapsed;
      const bb = b.elapsed;
      if (aa === bb) return 0;
      if (aa < bb) return 1;
      return -1;
    });
  }
  /**
   * Returns resources sorted with least used first
   * @returns
   */
  getResourcesSortedByUse() {
    return [...this._resources].sort((a, b) => {
      if (a.usersCount === b.usersCount) return 0;
      if (a.usersCount < b.usersCount) return -1;
      return 1;
    });
  }
  /**
   * Adds a resource to the pool.
   * Throws an error if the capacity limit is reached.
   * @param resource
   * @returns
   */
  addResource(resource) {
    if (resource === void 0) {
      throw new Error(`Cannot add undefined resource`);
    }
    if (resource === null) throw new Error(`Cannot add null resource`);
    if (this.capacity > 0 && this._resources.length === this.capacity) {
      throw new Error(
        `Capacity limit (${this.capacity}) reached. Cannot add more.`
      );
    }
    this.log.log(`Adding resource: ${JSON.stringify(resource)}`);
    const pi = new Resource(this, resource);
    this._resources.push(pi);
    return pi;
  }
  /**
   * Performs maintenance, removing disposed/expired resources & users.
   * This is called automatically when using a resource.
   */
  maintain() {
    let changed = false;
    const nuke = [];
    for (const p of this._resources) {
      if (p.isDisposed) {
        this.log.log(`Maintain, disposed resource: ${JSON.stringify(p.data)}`);
        nuke.push(p);
      } else if (p.isExpiredFromUsers) {
        this.log.log(`Maintain, expired resource: ${JSON.stringify(p.data)}`);
        nuke.push(p);
      }
    }
    if (nuke.length > 0) {
      for (const resource of nuke) {
        resource.dispose(`diposed/expired`);
      }
      changed = true;
    }
    const userKeysToRemove = [];
    for (const [key, user] of this._users.entries()) {
      if (!user.isValid) {
        this.log.log(
          `Maintain. Invalid user: ${user.key} (Disposed: ${user.isDisposed} Expired: ${user.isExpired} Resource disposed: ${user.resource.isDisposed})`
        );
        userKeysToRemove.push(key);
        user._dispose(`invalid`, user.data);
      }
    }
    for (const userKey of userKeysToRemove) {
      this._users.delete(userKey);
      changed = true;
    }
    if (changed) {
      this.log.log(
        `End: resource len: ${this._resources.length} users: ${this.usersLength}`
      );
    }
  }
  /**
   * Iterate over resources in the pool.
   * To iterate over the data associated with each resource, use
   * `values`.
   */
  *resources() {
    const resource = [...this._resources];
    for (const r of resource) {
      yield r;
    }
  }
  /**
   * Iterate over resource values in the pool.
   * to iterate over the resources, use `resources`.
   *
   * Note that values may be returned even though there is no
   * active user.
   */
  *values() {
    const resource = [...this._resources];
    for (const r of resource) {
      yield r.data;
    }
  }
  /**
   * Unassociate a key with a pool item
   * @param userKey
   */
  release(userKey, reason) {
    const pi = this._users.get(userKey);
    if (!pi) return;
    pi.release(reason ?? `Pool.release`);
  }
  /**
   * @internal
   * @param user
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  _release(user) {
    this._users.delete(user.key);
  }
  /**
   * @internal
   * @param resource
   * @param _
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  _releaseResource(resource, _) {
    this._resources = this._resources.filter((v) => v !== resource);
  }
  /**
   * Returns true if `v` has an associted resource in the pool
   * @param resource
   * @returns
   */
  hasResource(resource) {
    const found = this._resources.find((v) => v.data === resource);
    return found !== void 0;
  }
  /**
   * Returns true if a given `userKey` is in use.
   * @param userKey
   * @returns
   */
  hasUser(userKey) {
    return this._users.has(userKey);
  }
  /**
   * @internal
   * @param key
   * @param resource
   * @returns
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  _assign(key, resource) {
    const u = new PoolUser(key, resource);
    this._users.set(key, u);
    resource._assign(u);
    return u;
  }
  /**
   * @internal
   * @param userKey
   * @returns
   */
  _findUser(userKey) {
    const sorted = this.getResourcesSortedByUse();
    if (sorted.length > 0 && sorted[0].hasUserCapacity) {
      const u = this._assign(userKey, sorted[0]);
      return u;
    }
    if (this.generateResource && (this.capacity < 0 || this._resources.length < this.capacity)) {
      this.log.log(
        `capacity: ${this.capacity} resources: ${this._resources.length}`
      );
      const resourceGenerated = this.addResource(this.generateResource());
      const u = this._assign(userKey, resourceGenerated);
      return u;
    }
  }
  /**
   * Return the number of users
   */
  get usersLength() {
    return [...this._users.values()].length;
  }
  /**
   * 'Uses' a resource, returning the value
   * @param userKey
   * @returns
   */
  useValue(userKey) {
    const resource = this.use(userKey);
    return resource.resource.data;
  }
  /**
   * Gets a pool item based on a user key.
   * The same key should return the same pool item,
   * for as long as it still exists.
   * @param userKey
   * @returns
   */
  use(userKey) {
    const pi = this._users.get(userKey);
    if (pi) {
      pi.keepAlive();
      return pi;
    }
    this.maintain();
    const match = this._findUser(userKey);
    if (match) return match;
    if (this.fullPolicy === `error`) {
      throw new Error(
        `Pool is fully used (fullPolicy: ${this.fullPolicy}, capacity: ${this.capacity})`
      );
    }
    if (this.fullPolicy === `evictOldestUser`) {
      const users = this.getUsersByLongestElapsed();
      if (users.length > 0) {
        this.release(users[0].key, `evictedOldestUser`);
        const match2 = this._findUser(userKey);
        if (match2) return match2;
      }
    }
    throw new Error(`Pool is fully used (${this.fullPolicy})`);
  }
};
var create = (options = {}) => new Pool(options);

// src/data/Proportion.ts
var proportion = (v, t) => {
  if (typeof v === `function`) v = v();
  if (typeof t === `function`) t = t();
  throwNumberTest(v, `percentage`, `v`);
  throwNumberTest(t, `percentage`, `t`);
  return v * t;
};

// src/data/Resolve.ts
async function resolve(r, ...args) {
  if (typeof r === `object`) {
    if (`next` in r) {
      const tag = r[Symbol.toStringTag];
      if (tag === `Generator` || tag == `Array Iterator`) {
        const v = r.next();
        if (`done` in v && `value` in v) return v.value;
        return v;
      } else if (tag === `AsyncGenerator`) {
        const v = await r.next();
        if (`done` in v && `value` in v) return v.value;
        return v;
      } else {
        throw new Error(`Object has 'next' prop, but does not have 'AsyncGenerator', 'Generator' or 'Array Iterator' string tag symbol. Got: '${tag}'`);
      }
    } else if (isReactive(r)) {
      if (hasLast(r)) return r.last();
      throw new Error(`Reactive does not have last value`);
    } else {
      return r;
    }
  } else if (typeof r === `function`) {
    const v = await r(args);
    return v;
  } else {
    return r;
  }
}

// src/data/ResolveFields.ts
async function resolveFields(object) {
  const resolvers = [];
  const keys = [];
  for (const entry of Object.entries(object)) {
    const resolvable = entry[1];
    resolvers.push(resolve(resolvable));
    keys.push(entry[0]);
  }
  const results = await Promise.all(resolvers);
  const entries = zip(keys, results);
  return Object.fromEntries(entries);
}

// src/data/Softmax.ts
var softmax = (logits) => {
  const maxLogit = logits.reduce((a, b) => Math.max(a, b), Number.NEGATIVE_INFINITY);
  const scores = logits.map((l) => Math.exp(l - maxLogit));
  const denom = scores.reduce((a, b) => a + b);
  return scores.map((s) => s / denom);
};

// src/data/graphs/index.ts
var graphs_exports = {};
__export(graphs_exports, {
  Directed: () => DirectedGraph_exports,
  Undirected: () => UndirectedGraph_exports
});

// src/data/graphs/UndirectedGraph.ts
var UndirectedGraph_exports = {};
__export(UndirectedGraph_exports, {
  adjacentVertices: () => adjacentVertices,
  connect: () => connect,
  connectTo: () => connectTo,
  createVertex: () => createVertex,
  dumpGraph: () => dumpGraph,
  edgesForVertex: () => edgesForVertex,
  getConnection: () => getConnection,
  getOrCreate: () => getOrCreate,
  graph: () => graph,
  hasConnection: () => hasConnection,
  toAdjacencyMatrix: () => toAdjacencyMatrix,
  updateGraphVertex: () => updateGraphVertex
});
var createVertex = (id) => {
  return {
    id
  };
};
var updateGraphVertex = (graph2, vertex) => {
  const gr = {
    ...graph2,
    vertices: graph2.vertices.set(vertex.id, vertex)
  };
  return gr;
};
var getOrCreate = (graph2, id) => {
  const v = graph2.vertices.get(id);
  if (v !== void 0) return { graph: graph2, vertex: v };
  const vv = createVertex(id);
  const gg = updateGraphVertex(graph2, vv);
  return { graph: gg, vertex: vv };
};
function resolveVertex(graph2, idOrVertex) {
  const v = typeof idOrVertex === `string` ? graph2.vertices.get(idOrVertex) : idOrVertex;
  if (v === void 0) throw new Error(`Id not found ${idOrVertex}`);
  return v;
}
var hasConnection = (graph2, a, b) => {
  const edge = getConnection(graph2, a, b);
  return edge !== void 0;
};
var getConnection = (graph2, a, b) => {
  const aa = resolveVertex(graph2, a);
  const bb = resolveVertex(graph2, b);
  for (const edge of graph2.edges) {
    if (edge.a == aa.id && edge.b === bb.id) return edge;
    if (edge.a == bb.id && edge.b === aa.id) return edge;
  }
  return;
};
function connectTo(graph2, a, b, weight) {
  const aResult = getOrCreate(graph2, a);
  graph2 = aResult.graph;
  const bResult = getOrCreate(graph2, b);
  graph2 = bResult.graph;
  let edge = getConnection(graph2, a, b);
  if (edge !== void 0) return { graph: graph2, edge };
  edge = {
    a,
    b,
    weight
  };
  const graphChanged = {
    ...graph2,
    edges: [...graph2.edges, edge]
  };
  return { graph: graphChanged, edge };
}
function connect(graph2, options) {
  const { a, weight, b } = options;
  const destinations = Array.isArray(b) ? b : [b];
  for (const destination of destinations) {
    const result = connectTo(graph2, a, destination, weight);
    graph2 = result.graph;
  }
  return graph2;
}
var graph = (...initialConnections) => {
  let g = {
    vertices: immutable(),
    edges: []
  };
  for (const ic of initialConnections) {
    g = connect(g, ic);
  }
  return g;
};
function toAdjacencyMatrix(graph2) {
  const v = [...graph2.vertices.values()];
  const table = new Table();
  table.labelColumns(...v.map((vv) => vv.id));
  table.labelRows(...v.map((vv) => vv.id));
  for (let i = 0; i < v.length; i++) {
    table.setRow(i, v.length, false);
    const ii = v[i];
    for (const [j, jj] of v.entries()) {
      const connected = hasConnection(graph2, ii, jj);
      if (connected) {
        table.set(i, j, true);
      }
    }
  }
  return table;
}
var dumpGraph = (graph2) => {
  const lines = debugGraphToArray(graph2);
  return lines.join(`
`);
};
var debugGraphToArray = (graph2) => {
  const r = [];
  r.push(`Vertices: ${[...graph2.vertices.values()].map((v) => v.id).join(`, `)}`);
  r.push(`Edges:`);
  for (const edge of graph2.edges) {
    r.push(stringForEdge(edge));
  }
  return r;
};
var stringForEdge = (edge) => {
  const weight = edge.weight ? ` (${edge.weight})` : ``;
  return `${edge.a} <-> ${edge.b}${weight}`;
};
function* adjacentVertices(graph2, context) {
  if (context === void 0) return;
  const vertex = typeof context === `string` ? graph2.vertices.get(context) : context;
  if (vertex === void 0) throw new Error(`Vertex not found ${JSON.stringify(context)}`);
  for (const edge of graph2.edges) {
    if (edge.a === context) yield resolveVertex(graph2, edge.b);
    else if (edge.b === context) yield resolveVertex(graph2, edge.a);
  }
}
function* edgesForVertex(graph2, context) {
  if (context === void 0) return;
  const vertex = typeof context === `string` ? graph2.vertices.get(context) : context;
  if (vertex === void 0) throw new Error(`Vertex not found ${JSON.stringify(context)}`);
  for (const edge of graph2.edges) {
    if (edge.a === context) yield edge;
    else if (edge.b === context) yield edge;
  }
}

// src/data/maps/index.ts
var maps_exports = {};
__export(maps_exports, {
  addKeepingExisting: () => addKeepingExisting,
  addObject: () => addObject,
  deleteByValue: () => deleteByValue,
  filter: () => filter,
  find: () => find,
  firstEntryByIterablePredicate: () => firstEntryByIterablePredicate,
  firstEntryByIterableValue: () => firstEntryByIterableValue,
  fromIterable: () => fromIterable,
  fromObject: () => fromObject,
  getClosestIntegerKey: () => getClosestIntegerKey,
  getFromKeys: () => getFromKeys,
  getOrGenerate: () => getOrGenerate,
  getOrGenerateSync: () => getOrGenerateSync,
  hasAnyValue: () => hasAnyValue,
  hasKeyValue: () => hasKeyValue,
  mapToArray: () => mapToArray,
  mapToObjectTransform: () => mapToObjectTransform,
  mergeByKey: () => mergeByKey,
  some: () => some,
  sortByValue: () => sortByValue,
  sortByValueProperty: () => sortByValueProperty,
  toArray: () => toArray,
  toObject: () => toObject,
  transformMap: () => transformMap,
  zipKeyValue: () => zipKeyValue
});

// src/data/index.ts
var piPi = Math.PI * 2;

export {
  Correlate_exports,
  FrequencyMutable,
  frequencyMutable,
  IntervalTracker,
  intervalTracker,
  keysToNumbers,
  movingAverageLight,
  movingAverageTimed,
  movingAverage,
  noiseFilter,
  Normalise_exports,
  compareDataExecute,
  Pool_exports,
  proportion,
  resolve,
  resolveFields,
  softmax,
  graphs_exports,
  maps_exports,
  piPi,
  data_exports
};
//# sourceMappingURL=chunk-SNSLUFZY.js.map