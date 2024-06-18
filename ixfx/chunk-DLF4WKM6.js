import {
  isEqualDefault
} from "./chunk-SGQC7FGM.js";
import {
  __export
} from "./chunk-4VA37QKG.js";

// src/collections/Iterables.ts
var Iterables_exports = {};
__export(Iterables_exports, {
  compareValues: () => compareValues,
  compareValuesEqual: () => compareValuesEqual,
  max: () => max,
  min: () => min
});
var max = (iterable, scorer) => {
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
var min = (iterable, scorer) => {
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
  const isSame = aUnique.length === 0 && bUnique.length === 0;
  return {
    shared,
    a: aUnique,
    b: bUnique,
    isSame
  };
};

export {
  max,
  min,
  compareValuesEqual,
  compareValues,
  Iterables_exports
};
//# sourceMappingURL=chunk-DLF4WKM6.js.map