import {
  mapKeys
} from "./chunk-HOGLR6UM.js";
import {
  isEqualDefault
} from "./chunk-6UZ3OSJO.js";

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

// src/data/Compare.ts
var compareKeys = (a, b) => {
  const c = compareValuesShallow(Object.keys(a), Object.keys(b));
  return c;
};
var changedDataFields = (a, b) => {
  const r = compareData(a, b, true);
  if (Object.entries(r.added).length > 0) throw new Error(`Shape of data has changed`);
  if (Object.entries(r.removed).length > 0) throw new Error(`Shape of data has changed`);
  const output = compareResultToObject(r, b);
  return output;
};
var compareResultToObject = (r, b) => {
  const output = {};
  if (r.isArray) {
    return b;
  }
  for (const entry of Object.entries(r.changed)) {
    output[entry[0]] = entry[1];
  }
  for (const entry of Object.entries(r.added)) {
    output[entry[0]] = entry[1];
  }
  for (const childEntry of Object.entries(r.children)) {
    if (childEntry[1].hasChanged) {
      output[childEntry[0]] = compareResultToObject(childEntry[1], b[childEntry[0]]);
    }
  }
  return output;
};
var compareArrays = (a, b, eq = isEqualDefault) => {
  if (!Array.isArray(a)) throw new Error(`Param 'a' is not an array`);
  if (!Array.isArray(b)) throw new Error(`Param 'b' is not an array`);
  const c = compareData(a, b, false, eq);
  if (!c.isArray) throw new Error(`Change set does not have arrays as parameters`);
  const convert = (key) => {
    if (key.startsWith(`_`)) {
      return Number.parseInt(key.slice(1));
    } else throw new Error(`Unexpected key '${key}'`);
  };
  const cc = {
    ...c,
    added: mapKeys(c.added, convert),
    changed: mapKeys(c.changed, convert),
    removed: c.removed.map((v) => convert(v)),
    summary: c.summary.map((value) => {
      return [value[0], convert(value[1]), value[2]];
    })
  };
  return cc;
};
var compareData = (a, b, assumeSameShape = false, eq = isEqualDefault) => {
  const entriesA = Object.entries(a);
  const entriesB = Object.entries(b);
  const scannedKeys = /* @__PURE__ */ new Set();
  const changed = {};
  const added = {};
  const children = {};
  const removed = [];
  const isArray = Array.isArray(a);
  const summary = new Array();
  let hasChanged = false;
  for (const entry of entriesA) {
    const outputKey = isArray ? `_${entry[0]}` : entry[0];
    const aValue = entry[1];
    const bValue = b[entry[0]];
    scannedKeys.add(entry[0]);
    if (bValue === void 0) {
      hasChanged = true;
      if (assumeSameShape && !isArray) {
        changed[outputKey] = bValue;
        summary.push([`mutate`, outputKey, bValue]);
      } else {
        removed.push(outputKey);
        summary.push([`del`, outputKey, aValue]);
      }
      continue;
    }
    if (typeof aValue === `object`) {
      const r = compareData(aValue, bValue, assumeSameShape, eq);
      if (r.hasChanged) hasChanged = true;
      children[outputKey] = r;
      const childSummary = r.summary.map((sum) => {
        return [sum[0], outputKey + `.` + sum[1], sum[2]];
      });
      summary.push(...childSummary);
    } else {
      if (!eq(aValue, bValue)) {
        changed[outputKey] = bValue;
        hasChanged = true;
        summary.push([`mutate`, outputKey, bValue]);
      }
    }
  }
  if (!assumeSameShape || isArray) {
    for (const entry of entriesB) {
      const key = isArray ? `_${entry[0]}` : entry[0];
      if (scannedKeys.has(entry[0])) continue;
      added[key] = entry[1];
      hasChanged = true;
      summary.push([`add`, key, entry[1]]);
    }
  }
  return {
    changed,
    added,
    removed,
    children,
    hasChanged,
    isArray,
    summary
  };
};

export {
  maxScore,
  min,
  compareKeys,
  changedDataFields,
  compareArrays,
  compareData
};
//# sourceMappingURL=chunk-DWAKOV2F.js.map