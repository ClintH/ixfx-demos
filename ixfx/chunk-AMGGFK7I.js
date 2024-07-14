import {
  isEqualDefault
} from "./chunk-SGQC7FGM.js";

// src/iterables/sync/AdditionalValues.ts
function* additionalValues(source, values, eq = isEqualDefault) {
  const sourceArray = Array.isArray(source) ? source : [...source];
  const yielded = [];
  for (const v of values) {
    const found = sourceArray.find((index) => eq(index, v));
    if (!found) {
      const alreadyYielded = yielded.find((ii) => eq(ii, v));
      if (!alreadyYielded) {
        yielded.push(v);
        yield v;
      }
    }
  }
}

// src/data/arrays/Unique.ts
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

export {
  unique
};
//# sourceMappingURL=chunk-AMGGFK7I.js.map