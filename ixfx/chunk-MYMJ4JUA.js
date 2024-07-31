import {
  guardArray
} from "./chunk-GISMJX5E.js";
import {
  isEqualDefault
} from "./chunk-6UZ3OSJO.js";
import {
  throwIntegerTest
} from "./chunk-CSXWZ3IC.js";

// src/iterables/sync/Slice.ts
function* slice(it, start = 0, end = Number.POSITIVE_INFINITY) {
  const iit = it[Symbol.iterator]();
  for (; start > 0; start--, end--) iit.next();
  for (const v of it) {
    if (end-- > 0) {
      yield v;
    } else {
      break;
    }
  }
}

// src/data/arrays/GuardIndex.ts
var guardIndex = (array, index, name = `index`) => {
  guardArray(array);
  throwIntegerTest(index, `positive`, name);
  if (index > array.length - 1) {
    throw new Error(
      `'${name}' ${index} beyond array max of ${array.length - 1}`
    );
  }
};

// src/data/arrays/Filter.ts
var withoutUndefined = (data) => {
  return data.filter((v) => v !== void 0);
};
var filterAB = (data, filter) => {
  const a = [];
  const b = [];
  for (const datum of data) {
    if (filter(datum)) a.push(datum);
    else b.push(datum);
  }
  return [a, b];
};
function* filterBetween(array, predicate, startIndex, endIndex) {
  guardArray(array);
  if (typeof startIndex === `undefined`) startIndex = 0;
  if (typeof endIndex === `undefined`) endIndex = array.length;
  guardIndex(array, startIndex, `startIndex`);
  guardIndex(array, endIndex - 1, `endIndex`);
  for (let index = startIndex; index < endIndex; index++) {
    if (predicate(array[index], index, array)) yield array[index];
  }
}
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

// src/numbers/MinMaxAvg.ts
var minMaxAvg = (data, opts = {}) => {
  if (data === void 0) throw new Error(`'data' is undefined`);
  if (!Array.isArray(data)) {
    if (`next` in data) {
      if (opts.startIndex || opts.endIndex) {
        data = slice(data, opts.startIndex, opts.endIndex);
      }
      let total2 = 0;
      let min = Number.MAX_SAFE_INTEGER;
      let max = Number.MIN_SAFE_INTEGER;
      let samples = 0;
      for (const v of data) {
        if (typeof v !== `number`) {
          throw new TypeError(`Generator should yield numbers. Got: ${typeof v}`);
        }
        total2 += v;
        samples++;
        min = Math.min(min, v);
        max = Math.max(max, v);
      }
      return {
        avg: total2 / samples,
        total: total2,
        max,
        min
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
  const validNumbers = [...filterBetween(
    data,
    (d) => typeof d === `number` && !Number.isNaN(d),
    startIndex,
    endIndex
  )];
  const total = validNumbers.reduce((accumulator, v) => accumulator + v, 0);
  return {
    total,
    max: Math.max(...validNumbers),
    min: Math.min(...validNumbers),
    avg: total / validNumbers.length
  };
};

export {
  slice,
  guardIndex,
  withoutUndefined,
  filterAB,
  filterBetween,
  without,
  minMaxAvg
};
//# sourceMappingURL=chunk-MYMJ4JUA.js.map