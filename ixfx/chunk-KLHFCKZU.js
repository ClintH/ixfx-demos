// src/Compare.ts
var changedDataFields = (a, b) => {
  const r = compareData(a, b, true);
  if (Object.entries(r.added).length > 0)
    throw new Error(`Shape of data has changed`);
  if (Object.entries(r.removed).length > 0)
    throw new Error(`Shape of data has changed`);
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
var compareData = (a, b, assumeSameShape = false) => {
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
      const r = compareData(aValue, bValue, assumeSameShape);
      if (r.hasChanged)
        hasChanged = true;
      children[outputKey] = r;
      const childSummary = r.summary.map((sum) => {
        return [sum[0], outputKey + `.` + sum[1], sum[2]];
      });
      summary.push(...childSummary);
    } else {
      if (aValue !== bValue) {
        changed[outputKey] = bValue;
        hasChanged = true;
        summary.push([`mutate`, outputKey, bValue]);
      }
    }
  }
  if (!assumeSameShape || isArray) {
    for (const entry of entriesB) {
      const key = isArray ? `_${entry[0]}` : entry[0];
      if (scannedKeys.has(entry[0]))
        continue;
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
  changedDataFields,
  compareData
};
