import {
  isEqualDefault
} from "./chunk-SGQC7FGM.js";

// src/iterables/CompareValues.ts
var maxScore = (iterable, scorer) => {
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
var compareValuesShallow = (a, b, eq = isEqualDefault) => {
  const shared = [];
  const aUnique = [];
  const bUnique = [];
  for (const elementOfA of a) {
    let seenInB = false;
    for (const elementOfB of b) {
      if (eq(elementOfA, elementOfB)) {
        seenInB = true;
        break;
      }
    }
    if (seenInB) {
      shared.push(elementOfA);
    } else {
      aUnique.push(elementOfA);
    }
  }
  for (const elementOfB of b) {
    let seenInA = false;
    for (const elementOfA of a) {
      if (eq(elementOfB, elementOfA)) {
        seenInA = true;
      }
    }
    if (!seenInA) {
      bUnique.push(elementOfB);
    }
  }
  const isSame = aUnique.length === 0 && bUnique.length === 0;
  return {
    shared,
    isSame,
    a: aUnique,
    b: bUnique
  };
};

export {
  maxScore,
  min,
  compareValuesShallow
};
//# sourceMappingURL=chunk-SMLGKS2N.js.map