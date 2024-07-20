import {
  zip
} from "./chunk-UEAUFROA.js";
import {
  isContentsTheSame,
  isEqual
} from "./chunk-CHBOXPIA.js";
import {
  minMaxAvg
} from "./chunk-BXWBMVS6.js";
import {
  insertAt,
  remove
} from "./chunk-C6FK33KH.js";
import {
  sortByNumericProperty,
  sortByProperty
} from "./chunk-AK2RMORX.js";
import {
  pairwise,
  pairwiseReduce
} from "./chunk-VJWZGNDD.js";
import {
  unique
} from "./chunk-AMGGFK7I.js";
import {
  randomElement,
  randomElementWeightedSource,
  randomIndex,
  randomPluck,
  shuffle
} from "./chunk-WIEQUAVY.js";
import {
  containsDuplicateInstances
} from "./chunk-MZFSDYZE.js";
import {
  fromIterable
} from "./chunk-YWGG2NOJ.js";
import {
  filterAB,
  filterBetween,
  guardIndex,
  without,
  withoutUndefined
} from "./chunk-2XNNMGQC.js";
import {
  guardArray
} from "./chunk-UH4IORRN.js";
import {
  isEqualDefault,
  toStringDefault
} from "./chunk-SGQC7FGM.js";
import {
  throwIntegerTest
} from "./chunk-JIDOUNL5.js";
import {
  __export
} from "./chunk-AFNFQUHK.js";

// src/data/arrays/index.ts
var arrays_exports = {};
__export(arrays_exports, {
  chunks: () => chunks,
  contains: () => contains,
  containsDuplicateInstances: () => containsDuplicateInstances,
  containsDuplicateValues: () => containsDuplicateValues,
  cycle: () => cycle,
  ensureLength: () => ensureLength,
  filterAB: () => filterAB,
  filterBetween: () => filterBetween,
  flatten: () => flatten,
  groupBy: () => groupBy,
  guardArray: () => guardArray,
  guardIndex: () => guardIndex,
  insertAt: () => insertAt,
  interleave: () => interleave,
  intersection: () => intersection,
  isContentsTheSame: () => isContentsTheSame,
  isEqual: () => isEqual,
  mergeByKey: () => mergeByKey,
  minMaxAvg: () => minMaxAvg,
  pairwise: () => pairwise,
  pairwiseReduce: () => pairwiseReduce,
  randomElement: () => randomElement,
  randomElementWeightedSource: () => randomElementWeightedSource,
  randomIndex: () => randomIndex,
  randomPluck: () => randomPluck,
  remove: () => remove,
  sample: () => sample,
  shuffle: () => shuffle,
  sortByNumericProperty: () => sortByNumericProperty,
  sortByProperty: () => sortByProperty,
  unique: () => unique,
  until: () => until,
  without: () => without,
  withoutUndefined: () => withoutUndefined,
  zip: () => zip
});

// src/data/arrays/ArrayCycle.ts
var cycle = (options) => {
  const opts = [...options];
  let index = 0;
  const next = () => {
    index++;
    if (index === opts.length) index = 0;
    return value();
  };
  const prev = () => {
    index--;
    if (index === -1) index = opts.length - 1;
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
      if (found === -1) throw new Error(`Could not find value`);
      index = found;
    }
  };
  const toArray = () => [...opts];
  return { toArray, next, prev, get current() {
    return value();
  }, select };
};

// src/data/arrays/Chunks.ts
function chunks(array, size) {
  const output = [];
  for (let index = 0; index < array.length; index += size) {
    output.push(array.slice(index, index + size));
  }
  return output;
}

// src/data/arrays/Contains.ts
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
var containsDuplicateValues = (array, keyFunction = toStringDefault) => {
  if (!Array.isArray(array)) throw new Error(`Parameter needs to be an array`);
  try {
    const _ = fromIterable(array, keyFunction);
  } catch {
    return true;
  }
  return false;
};

// src/data/arrays/EnsureLength.ts
var ensureLength = (data, length, expand = `undefined`) => {
  if (data === void 0) throw new Error(`Data undefined`);
  if (!Array.isArray(data)) throw new Error(`data is not an array`);
  if (data.length === length) return [...data];
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

// src/data/arrays/Flatten.ts
var flatten = (array) => [...array].flat();

// src/data/arrays/GroupBy.ts
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

// src/data/arrays/Interleave.ts
var interleave = (...arrays) => {
  if (arrays.some((a) => !Array.isArray(a))) {
    throw new Error(`All parameters must be an array`);
  }
  const lengths = arrays.map((a) => a.length);
  if (!isContentsTheSame(lengths)) {
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

// src/data/arrays/Intersection.ts
var intersection = (arrayA, arrayB, equality = isEqualDefault) => arrayA.filter((valueFromA) => arrayB.some((valueFromB) => equality(valueFromA, valueFromB)));

// src/data/arrays/MergeByKey.ts
var mergeByKey = (keyFunction, reconcile, ...arrays) => {
  const result = /* @__PURE__ */ new Map();
  for (const m of arrays) {
    for (const mv of m) {
      if (mv === void 0) continue;
      const mk = keyFunction(mv);
      let v = result.get(mk);
      v = v ? reconcile(v, mv) : mv;
      result.set(mk, v);
    }
  }
  return [...result.values()];
};

// src/data/arrays/Sample.ts
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

// src/data/arrays/Until.ts
var until = (data, predicate, initial) => {
  const returnValue = [];
  let total = initial;
  for (const datum of data) {
    const [stop, accumulator] = predicate(datum, total);
    if (stop) break;
    total = accumulator;
    returnValue.push(datum);
  }
  return returnValue;
};

export {
  cycle,
  chunks,
  contains,
  containsDuplicateValues,
  ensureLength,
  flatten,
  groupBy,
  interleave,
  intersection,
  mergeByKey,
  sample,
  until,
  arrays_exports
};
//# sourceMappingURL=chunk-BHCE37EK.js.map