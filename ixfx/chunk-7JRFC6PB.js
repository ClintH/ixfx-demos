import {
  defaultComparer,
  isEqualDefault,
  isEqualValueDefault,
  toStringDefault2 as toStringDefault
} from "./chunk-RFTU5JVU.js";
import {
  defaultRandom
} from "./chunk-Z2HKKABB.js";
import {
  throwIntegerTest
} from "./chunk-JNUBDOCI.js";
import {
  __export
} from "./chunk-Q2EHUQVZ.js";

// src/collections/arrays/index.ts
var arrays_exports = {};
__export(arrays_exports, {
  additionalValues: () => additionalValues,
  average: () => average,
  averageWeighted: () => averageWeighted,
  chunks: () => chunks,
  compareValues: () => compareValues,
  compareValuesEqual: () => compareValuesEqual,
  contains: () => contains,
  containsDuplicateInstances: () => containsDuplicateInstances,
  containsDuplicateValues: () => containsDuplicateValues,
  cycle: () => cycle,
  dotProduct: () => dotProduct,
  ensureLength: () => ensureLength,
  filterAB: () => filterAB,
  filterBetween: () => filterBetween,
  flatten: () => flatten,
  groupBy: () => groupBy,
  guardArray: () => guardArray,
  guardIndex: () => guardIndex,
  interleave: () => interleave,
  intersection: () => intersection,
  isEqual: () => isEqual,
  max: () => max,
  maxFast: () => maxFast,
  maxIndex: () => maxIndex,
  mergeByKey: () => mergeByKey2,
  min: () => min,
  minFast: () => minFast,
  minIndex: () => minIndex,
  minMaxAvg: () => minMaxAvg,
  randomElement: () => randomElement,
  randomElementWeightedSource: () => randomElementWeightedSource,
  randomIndex: () => randomIndex,
  randomPluck: () => randomPluck,
  reducePairwise: () => reducePairwise,
  remove: () => remove,
  sample: () => sample,
  shuffle: () => shuffle,
  sortByNumericProperty: () => sortByNumericProperty,
  total: () => total,
  totalFast: () => totalFast,
  unique: () => unique,
  until: () => until,
  validNumbers: () => validNumbers,
  valuesEqual: () => valuesEqual,
  weight: () => weight,
  without: () => without,
  withoutUndefined: () => withoutUndefined,
  zip: () => zip
});

// src/collections/Map/MapFns.ts
var getClosestIntegerKey = (data, target) => {
  target = Math.round(target);
  if (data.has(target)) {
    return target;
  } else {
    let offset = 1;
    while (offset < 1e3) {
      if (data.has(target - offset))
        return target - offset;
      else if (data.has(target + offset))
        return target + offset;
      offset++;
    }
    throw new Error(`Could not find target ${target}`);
  }
};
var hasKeyValue = (map, key, value, comparer) => {
  if (!map.has(key))
    return false;
  const values = [...map.values()];
  return values.some((v) => comparer(v, value));
};
var deleteByValue = (map, value, comparer = isEqualDefault) => {
  for (const entry of Object.entries(map)) {
    if (comparer(entry[1], value)) {
      map.delete(entry[0]);
    }
  }
};
var firstEntryByIterablePredicate = (map, predicate) => {
  for (const entry of map.entries()) {
    if (predicate(entry[1], entry[0]))
      return entry;
  }
};
var firstEntryByIterableValue = (map, value, isEqual2 = isEqualDefault) => {
  for (const entry of map.entries()) {
    if (isEqual2(entry[1], value))
      return entry;
  }
};
var addKeepingExisting = (set, hasher, ...values) => {
  const s = set === void 0 ? /* @__PURE__ */ new Map() : new Map(set);
  for (const v of values) {
    const hashResult = hasher(v);
    if (s.has(hashResult))
      continue;
    s.set(hashResult, v);
  }
  return s;
};
var sortByValue = (map, comparer) => {
  const f = comparer ?? defaultComparer;
  [...map.entries()].sort((a, b) => f(a[1], b[1]));
};
var sortByValueProperty = (map, property, compareFunction) => {
  const cfn = typeof compareFunction === `undefined` ? defaultComparer : compareFunction;
  return [...map.entries()].sort((aE, bE) => {
    const a = aE[1];
    const b = bE[1];
    return cfn(a[property], b[property]);
  });
};
var hasAnyValue = (map, value, comparer) => {
  const entries = [...map.entries()];
  return entries.some((kv) => comparer(kv[1], value));
};
function* filter(map, predicate) {
  for (const v of map.values()) {
    if (predicate(v))
      yield v;
  }
}
var toArray = (map) => [...map.values()];
var fromIterable = (data, keyFunction = toStringDefault, allowOverwrites = false) => {
  const m = /* @__PURE__ */ new Map();
  for (const d of data) {
    const id = keyFunction(d);
    if (m.has(id) && !allowOverwrites) {
      throw new Error(
        `id ${id} is already used and new data will overwrite it. `
      );
    }
    m.set(id, d);
  }
  return m;
};
var fromObject = (data) => {
  const map = /* @__PURE__ */ new Map();
  if (Array.isArray(data)) {
    for (const d of data)
      addObject(map, d);
  } else {
    addObject(map, data);
  }
  return map;
};
var addObject = (map, data) => {
  const entries = Object.entries(data);
  for (const [key, value] of entries) {
    map.set(key, value);
  }
};
var find = (map, predicate) => [...map.values()].find((v) => predicate(v));
var mapToObjectTransform = (m, valueTransform) => (
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, unicorn/no-array-reduce
  [...m].reduce((object, [key, value]) => {
    const t = valueTransform(value);
    object[key] = t;
    return object;
  }, {})
);
var zipKeyValue = (keys, values) => {
  if (keys.length !== values.length) {
    throw new Error(`Keys and values arrays should be same length`);
  }
  return Object.fromEntries(keys.map((k, index) => [k, values[index]]));
};
var transformMap = (source, transformer) => new Map(Array.from(source, (v) => [v[0], transformer(v[1], v[0])]));
var toObject = (m) => (
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  [...m].reduce((object, [key, value]) => {
    object[key] = value;
    return object;
  }, {})
);
var mapToArray = (m, transformer) => [...m.entries()].map((x) => transformer(x[0], x[1]));
var mergeByKey = (reconcile, ...maps) => {
  const result = /* @__PURE__ */ new Map();
  for (const m of maps) {
    for (const [mk, mv] of m) {
      let v = result.get(mk);
      v = v ? reconcile(v, mv) : mv;
      result.set(mk, v);
    }
  }
  return result;
};

// src/random/WeightedIndex.ts
var weightedIndex = (weightings, rand = defaultRandom) => {
  const precompute = [];
  let total2 = 0;
  for (let index = 0; index < weightings.length; index++) {
    total2 += weightings[index];
    precompute[index] = total2;
  }
  if (total2 !== 1)
    throw new Error(`Weightings should add up to 1. Got: ${total2}`);
  return () => {
    const v = rand();
    for (let index = 0; index < precompute.length; index++) {
      if (v <= precompute[index])
        return index;
    }
    throw new Error(`Bug: weightedIndex could not select index`);
  };
};

// src/collections/GuardArray.ts
var guardArray = (array, name = `?`) => {
  if (array === void 0) {
    throw new TypeError(`Param '${name}' is undefined. Expected array.`);
  }
  if (array === null) {
    throw new TypeError(`Param '${name}' is null. Expected array.`);
  }
  if (!Array.isArray(array)) {
    throw new TypeError(`Param '${name}' not an array as expected`);
  }
};

// src/collections/GuardIndex.ts
var guardIndex = (array, index, name = `index`) => {
  guardArray(array);
  throwIntegerTest(index, `positive`, name);
  if (index > array.length - 1) {
    throw new Error(
      `'${name}' ${index} beyond array max of ${array.length - 1}`
    );
  }
};

// src/collections/arrays/ValuesEqual.ts
var valuesEqual = (array, equality) => {
  if (!Array.isArray(array))
    throw new Error(`Param 'array' is not an array.`);
  if (array.length === 0)
    return true;
  const eq = equality ?? isEqualValueDefault;
  const a = array[0];
  const r = array.some((v) => !eq(a, v));
  if (r)
    return false;
  return true;
};

// src/iterable/SliceSync.ts
function* slice(it, start = 0, end = Number.POSITIVE_INFINITY) {
  const iit = it[Symbol.iterator]();
  for (; start > 0; start--, end--)
    iit.next();
  for (const v of it) {
    if (end-- > 0) {
      yield v;
    } else {
      break;
    }
  }
}

// src/collections/FilterBetween.ts
var filterBetween = (array, predicate, startIndex, endIndex) => {
  guardArray(array);
  if (typeof startIndex === `undefined`)
    startIndex = 0;
  if (typeof endIndex === `undefined`)
    endIndex = array.length;
  guardIndex(array, startIndex, `startIndex`);
  guardIndex(array, endIndex - 1, `endIndex`);
  const t = [];
  for (let index = startIndex; index < endIndex; index++) {
    if (predicate(array[index], index, array))
      t.push(array[index]);
  }
  return t;
};

// src/collections/MinMaxAvg.ts
var minMaxAvg = (data, opts = {}) => {
  if (data === void 0)
    throw new Error(`'data' is undefined`);
  if (!Array.isArray(data)) {
    if (`next` in data) {
      if (opts.startIndex || opts.endIndex) {
        data = slice(data, opts.startIndex, opts.endIndex);
      }
      let total3 = 0;
      let min3 = Number.MAX_SAFE_INTEGER;
      let max3 = Number.MIN_SAFE_INTEGER;
      let samples = 0;
      for (const v of data) {
        if (typeof v !== `number`) {
          throw new TypeError(`Generator should yield numbers. Got: ${typeof v}`);
        }
        total3 += v;
        samples++;
        min3 = Math.min(min3, v);
        max3 = Math.max(max3, v);
      }
      return {
        avg: total3 / samples,
        total: total3,
        max: max3,
        min: min3
      };
    } else {
      throw new Error(`'data' parameter is neither array or iterable`);
    }
  }
  if (data.length === 0) {
    return {
      total: 0,
      min: 0,
      max: 0,
      avg: 0
    };
  }
  const startIndex = opts.startIndex ?? 0;
  const endIndex = opts.endIndex ?? data.length;
  const validNumbers2 = filterBetween(
    data,
    (d) => typeof d === `number` && !Number.isNaN(d),
    startIndex,
    endIndex
  );
  const total2 = validNumbers2.reduce((accumulator, v) => accumulator + v, 0);
  return {
    total: total2,
    max: Math.max(...validNumbers2),
    min: Math.min(...validNumbers2),
    avg: total2 / validNumbers2.length
  };
};

// src/collections/arrays/NumericArrays.ts
var weight = (data, fn) => {
  const f = fn ?? ((x) => x);
  return validNumbers(data).map(
    (v, index) => v * f(index / (validNumbers.length - 1))
  );
};
var validNumbers = (data) => data.filter((d) => typeof d === `number` && !Number.isNaN(d));
var dotProduct = (values) => {
  let r = 0;
  const length = values[0].length;
  for (let index = 0; index < length; index++) {
    let t = 0;
    for (const [p, value] of values.entries()) {
      if (p === 0)
        t = value[index];
      else {
        t *= value[index];
      }
    }
    r += t;
  }
  return r;
};
var average = (data) => {
  if (data === void 0)
    throw new Error(`data parameter is undefined`);
  const valid = validNumbers(data);
  const total2 = valid.reduce((accumulator, v) => accumulator + v, 0);
  return total2 / valid.length;
};
var min = (data) => Math.min(...validNumbers(data));
var maxIndex = (data) => (
  // eslint-disable-next-line unicorn/no-array-reduce
  data.reduce(
    (bestIndex, value, index, array) => value > array[bestIndex] ? index : bestIndex,
    0
  )
);
var minIndex = (...data) => (
  // eslint-disable-next-line unicorn/no-array-reduce
  data.reduce(
    (bestIndex, value, index, array) => value < array[bestIndex] ? index : bestIndex,
    0
  )
);
var max = (data) => Math.max(...validNumbers(data));
var total = (data) => (
  // eslint-disable-next-line unicorn/no-array-reduce
  data.reduce((previous, current) => {
    if (typeof current !== `number`)
      return previous;
    if (Number.isNaN(current))
      return previous;
    if (Number.isFinite(current))
      return previous;
    return previous + current;
  }, 0)
);
var maxFast = (data) => {
  let m = Number.MIN_SAFE_INTEGER;
  for (const datum of data) {
    m = Math.max(m, datum);
  }
  return m;
};
var totalFast = (data) => {
  let m = 0;
  for (const datum of data) {
    m += datum;
  }
  return m;
};
var minFast = (data) => {
  let m = Number.MIN_SAFE_INTEGER;
  for (const datum of data) {
    m = Math.min(m, datum);
  }
  return m;
};

// src/collections/ArrayCycle.ts
var cycle = (options) => {
  const opts = [...options];
  let index = 0;
  const next = () => {
    index++;
    if (index === opts.length)
      index = 0;
    return value();
  };
  const prev = () => {
    index--;
    if (index === -1)
      index = opts.length - 1;
    return value();
  };
  const value = () => {
    return opts.at(index);
  };
  const select = (indexOrValue) => {
    if (typeof indexOrValue === `number`) {
      index = indexOrValue;
    } else {
      const found = opts.indexOf(indexOrValue);
      if (found === -1)
        throw new Error(`Could not find value`);
      index = found;
    }
  };
  const toArray2 = () => [...opts];
  return { toArray: toArray2, next, prev, get current() {
    return value();
  }, select };
};

// src/collections/arrays/Zip.ts
var zip = (...arrays) => {
  if (arrays.some((a) => !Array.isArray(a))) {
    throw new Error(`All parameters must be an array`);
  }
  const lengths = arrays.map((a) => a.length);
  if (!valuesEqual(lengths)) {
    throw new Error(`Arrays must be of same length`);
  }
  const returnValue = [];
  const length = lengths[0];
  for (let index = 0; index < length; index++) {
    returnValue.push(arrays.map((a) => a[index]));
  }
  return returnValue;
};

// src/collections/arrays/AverageWeighted.ts
var averageWeighted = (data, weightings) => {
  if (typeof weightings === `function`)
    weightings = weight(data, weightings);
  const ww = zip(data, weightings);
  const [totalV, totalW] = ww.reduce(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    (accumulator, v) => [accumulator[0] + v[0] * v[1], accumulator[1] + v[1]],
    [0, 0]
  );
  return totalV / totalW;
};

// src/collections/arrays/SortByNumericProperty.ts
var sortByNumericProperty = (data, propertyName) => [...data].sort((a, b) => {
  guardArray(data, `data`);
  const av = a[propertyName];
  const bv = b[propertyName];
  if (av < bv)
    return -1;
  if (av > bv)
    return 1;
  return 0;
});

// src/collections/Iterables.ts
var Iterables_exports = {};
__export(Iterables_exports, {
  compareValues: () => compareValues,
  compareValuesEqual: () => compareValuesEqual,
  max: () => max2,
  min: () => min2
});
var max2 = (iterable, scorer) => {
  let highestValue;
  let highestScore = Number.MIN_SAFE_INTEGER;
  for (const value of iterable) {
    const score = scorer(value);
    if (score >= highestScore) {
      highestScore = score;
      highestValue = value;
    }
  }
  return highestValue;
};
var min2 = (iterable, scorer) => {
  let lowestValue;
  let lowestScore = Number.MAX_SAFE_INTEGER;
  for (const value of iterable) {
    const score = scorer(value);
    if (score <= lowestScore) {
      lowestScore = score;
      lowestValue = value;
    }
  }
  return lowestValue;
};
var compareValuesEqual = (iterableA, iterableB, eq = isEqualDefault) => {
  const returnValue = compareValues(iterableA, iterableB, eq);
  return returnValue.a.length === 0 && returnValue.b.length === 0;
};
var compareValues = (a, b, eq = isEqualDefault) => {
  const shared = [];
  const aUnique = [];
  const bUnique = [];
  for (const element of a) {
    let seenInB = false;
    for (const element_ of b) {
      if (eq(element, element_)) {
        seenInB = true;
        break;
      }
    }
    if (seenInB) {
      shared.push(element);
    } else {
      aUnique.push(element);
    }
  }
  for (const element of b) {
    let seenInA = false;
    for (const element_ of a) {
      if (eq(element, element_)) {
        seenInA = true;
      }
    }
    if (!seenInA) {
      bUnique.push(element);
    }
  }
  return {
    shared,
    a: aUnique,
    b: bUnique
  };
};

// src/collections/arrays/index.ts
var intersection = (arrayA, arrayB, equality = isEqualDefault) => arrayA.filter((valueFromA) => arrayB.some((valueFromB) => equality(valueFromA, valueFromB)));
var flatten = (array) => [...array].flat();
var interleave = (...arrays) => {
  if (arrays.some((a) => !Array.isArray(a))) {
    throw new Error(`All parameters must be an array`);
  }
  const lengths = arrays.map((a) => a.length);
  if (!valuesEqual(lengths)) {
    throw new Error(`Arrays must be of same length`);
  }
  const returnValue = [];
  const length = lengths[0];
  for (let index = 0; index < length; index++) {
    for (const array of arrays) {
      returnValue.push(array[index]);
    }
  }
  return returnValue;
};
var ensureLength = (data, length, expand = `undefined`) => {
  if (data === void 0)
    throw new Error(`Data undefined`);
  if (!Array.isArray(data))
    throw new Error(`data is not an array`);
  if (data.length === length)
    return [...data];
  if (data.length > length) {
    return data.slice(0, length);
  }
  const d = [...data];
  const add = length - d.length;
  for (let index = 0; index < add; index++) {
    switch (expand) {
      case `undefined`: {
        d.push(void 0);
        break;
      }
      case `repeat`: {
        d.push(data[index % data.length]);
        break;
      }
      case `first`: {
        d.push(data[0]);
        break;
      }
      case `last`: {
        d.push(data.at(-1));
        break;
      }
    }
  }
  return d;
};
var randomIndex = (array, rand = defaultRandom) => Math.floor(rand() * array.length);
var randomElementWeightedSource = (array, weightings, randomSource = defaultRandom) => {
  if (array.length !== weightings.length)
    throw new Error(`Lengths of 'array' and 'weightings' should be the same.`);
  const r = weightedIndex(weightings, randomSource);
  return () => {
    const index = r();
    return array[index];
  };
};
var randomElement = (array, rand = defaultRandom) => {
  guardArray(array, `array`);
  return array[Math.floor(rand() * array.length)];
};
var randomPluck = (array, mutate = false, rand = defaultRandom) => {
  if (array === void 0)
    throw new Error(`array is undefined`);
  if (!Array.isArray(array))
    throw new Error(`'array' param is not an array`);
  if (array.length === 0)
    return { value: void 0, array: [] };
  const index = randomIndex(array, rand);
  if (mutate) {
    return {
      value: array[index],
      //eslint-disable-next-line functional/immutable-data
      array: array.splice(index, 1)
    };
  } else {
    const t = [...array];
    t.splice(index, 1);
    return {
      value: array[index],
      array: t
    };
  }
};
var shuffle = (dataToShuffle, rand = defaultRandom) => {
  const array = [...dataToShuffle];
  for (let index = array.length - 1; index > 0; index--) {
    const index_ = Math.floor(rand() * (index + 1));
    [array[index], array[index_]] = [array[index_], array[index]];
  }
  return array;
};
var without = (sourceArray, toRemove, comparer = isEqualDefault) => {
  if (Array.isArray(toRemove)) {
    const returnArray = [];
    for (const source of sourceArray) {
      if (!toRemove.some((v) => comparer(source, v))) {
        returnArray.push(source);
      }
    }
    return returnArray;
  } else {
    return sourceArray.filter((v) => !comparer(v, toRemove));
  }
};
var withoutUndefined = (data) => {
  return data.filter((v) => v !== void 0);
};
var until = (data, predicate, initial) => {
  const returnValue = [];
  let total2 = initial;
  for (const datum of data) {
    const [stop, accumulator] = predicate(datum, total2);
    if (stop)
      break;
    total2 = accumulator;
    returnValue.push(datum);
  }
  return returnValue;
};
var remove = (data, index) => {
  if (!Array.isArray(data)) {
    throw new TypeError(`'data' parameter should be an array`);
  }
  guardIndex(data, index, `index`);
  return [...data.slice(0, index), ...data.slice(index + 1)];
};
var groupBy = (array, grouper) => {
  const map = /* @__PURE__ */ new Map();
  for (const a of array) {
    const key = grouper(a);
    let existing = map.get(key);
    if (!existing) {
      existing = [];
      map.set(key, existing);
    }
    existing.push(a);
  }
  return map;
};
var sample = (array, amount) => {
  let subsampleSteps = 1;
  if (amount <= 1) {
    const numberOfItems = array.length * amount;
    subsampleSteps = Math.round(array.length / numberOfItems);
  } else {
    subsampleSteps = amount;
  }
  throwIntegerTest(subsampleSteps, `positive`, `amount`);
  if (subsampleSteps > array.length - 1) {
    throw new Error(`Subsample steps exceeds array length`);
  }
  const r = [];
  for (let index = subsampleSteps - 1; index < array.length; index += subsampleSteps) {
    r.push(array[index]);
  }
  return r;
};
function chunks(array, size) {
  const output = [];
  for (let index = 0; index < array.length; index += size) {
    output.push(array.slice(index, index + size));
  }
  return output;
}
var mergeByKey2 = (keyFunction, reconcile, ...arrays) => {
  const result = /* @__PURE__ */ new Map();
  for (const m of arrays) {
    for (const mv of m) {
      if (mv === void 0)
        continue;
      const mk = keyFunction(mv);
      let v = result.get(mk);
      v = v ? reconcile(v, mv) : mv;
      result.set(mk, v);
    }
  }
  return [...result.values()];
};
var reducePairwise = (array, reducer, initial) => {
  guardArray(array, `arr`);
  if (array.length < 2)
    return initial;
  for (let index = 0; index < array.length - 1; index++) {
    initial = reducer(initial, array[index], array[index + 1]);
  }
  return initial;
};
var filterAB = (data, filter2) => {
  const a = [];
  const b = [];
  for (const datum of data) {
    if (filter2(datum))
      a.push(datum);
    else
      b.push(datum);
  }
  return [a, b];
};
var unique = (arrays, comparer = isEqualDefault) => {
  const t = [];
  for (const a of arrays) {
    if (Array.isArray(a)) {
      for (const v of additionalValues(t, a, comparer)) {
        t.push(v);
      }
    } else {
      return [...additionalValues([], arrays, comparer)];
    }
  }
  return t;
};
var containsDuplicateValues = (array, keyFunction = toStringDefault) => {
  if (!Array.isArray(array))
    throw new Error(`Parameter needs to be an array`);
  try {
    const _ = fromIterable(array, keyFunction);
  } catch {
    return true;
  }
  return false;
};
var containsDuplicateInstances = (array) => {
  if (!Array.isArray(array))
    throw new Error(`Parameter needs to be an array`);
  for (let index = 0; index < array.length; index++) {
    for (let x = 0; x < array.length; x++) {
      if (index === x)
        continue;
      if (array[index] === array[x])
        return true;
    }
  }
  return false;
};
var isEqual = (arrayA, arrayB, isEqual2 = isEqualDefault) => {
  if (!Array.isArray(arrayA))
    throw new Error(`Parameter 'arrayA' is not actually an array`);
  if (!Array.isArray(arrayB))
    throw new Error(`Parameter 'arrayB' is not actually an array`);
  if (arrayA.length !== arrayB.length)
    return false;
  for (let indexA = 0; indexA < arrayA.length; indexA++) {
    if (!isEqual2(arrayA[indexA], arrayB[indexA]))
      return false;
  }
  return true;
};
var contains = (haystack, needles, eq = isEqualDefault) => {
  if (!Array.isArray(haystack)) {
    throw new TypeError(`Expects haystack parameter to be an array`);
  }
  if (!Array.isArray(needles)) {
    throw new TypeError(`Expects needles parameter to be an array`);
  }
  for (const needle of needles) {
    let found = false;
    for (const element of haystack) {
      if (eq(needle, element)) {
        found = true;
        break;
      }
    }
    if (!found) {
      return false;
    }
  }
  return true;
};
function* additionalValues(input, values, eq = isEqualDefault) {
  const yielded = [];
  for (const v of values) {
    const found = input.find((index) => eq(index, v));
    if (!found) {
      const alreadyYielded = yielded.find((ii) => eq(ii, v));
      if (!alreadyYielded) {
        yielded.push(v);
        yield v;
      }
    }
  }
}

export {
  getClosestIntegerKey,
  hasKeyValue,
  deleteByValue,
  firstEntryByIterablePredicate,
  firstEntryByIterableValue,
  addKeepingExisting,
  sortByValue,
  sortByValueProperty,
  hasAnyValue,
  filter,
  toArray,
  fromIterable,
  fromObject,
  addObject,
  find,
  mapToObjectTransform,
  zipKeyValue,
  transformMap,
  toObject,
  mapToArray,
  mergeByKey,
  weightedIndex,
  guardArray,
  guardIndex,
  valuesEqual,
  slice,
  filterBetween,
  minMaxAvg,
  weight,
  validNumbers,
  dotProduct,
  average,
  min,
  maxIndex,
  minIndex,
  max,
  total,
  maxFast,
  totalFast,
  minFast,
  cycle,
  zip,
  averageWeighted,
  sortByNumericProperty,
  max2,
  min2,
  compareValuesEqual,
  compareValues,
  Iterables_exports,
  intersection,
  flatten,
  interleave,
  ensureLength,
  randomIndex,
  randomElementWeightedSource,
  randomElement,
  randomPluck,
  shuffle,
  without,
  withoutUndefined,
  until,
  remove,
  groupBy,
  sample,
  chunks,
  mergeByKey2,
  reducePairwise,
  filterAB,
  unique,
  containsDuplicateValues,
  containsDuplicateInstances,
  isEqual,
  contains,
  additionalValues,
  arrays_exports
};
//# sourceMappingURL=chunk-7JRFC6PB.js.map