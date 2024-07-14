import {
  guardArray
} from "./chunk-UH4IORRN.js";
import {
  isEqualDefault
} from "./chunk-SGQC7FGM.js";
import {
  throwIntegerTest
} from "./chunk-JIDOUNL5.js";

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
var filterBetween = (array, predicate, startIndex, endIndex) => {
  guardArray(array);
  if (typeof startIndex === `undefined`) startIndex = 0;
  if (typeof endIndex === `undefined`) endIndex = array.length;
  guardIndex(array, startIndex, `startIndex`);
  guardIndex(array, endIndex - 1, `endIndex`);
  const t = [];
  for (let index = startIndex; index < endIndex; index++) {
    if (predicate(array[index], index, array)) t.push(array[index]);
  }
  return t;
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

export {
  guardIndex,
  withoutUndefined,
  filterAB,
  filterBetween,
  without
};
//# sourceMappingURL=chunk-2XNNMGQC.js.map