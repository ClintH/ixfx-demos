import {
  isEqualDefault
} from "./chunk-SGQC7FGM.js";

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

// src/collections/arrays/ContainsDuplicateInstances.ts
var containsDuplicateInstances = (array) => {
  if (!Array.isArray(array)) throw new Error(`Parameter needs to be an array`);
  for (let index = 0; index < array.length; index++) {
    for (let x = 0; x < array.length; x++) {
      if (index === x) continue;
      if (array[index] === array[x]) return true;
    }
  }
  return false;
};

// src/collections/arrays/Without.ts
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
  slice,
  containsDuplicateInstances,
  without
};
//# sourceMappingURL=chunk-E7QFX75E.js.map