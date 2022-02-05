import {
  __export
} from "./chunk-FQLUQVDZ.js";

// src/collections/Arrays.ts
var Arrays_exports = {};
__export(Arrays_exports, {
  average: () => average,
  groupBy: () => groupBy,
  guardArray: () => guardArray,
  minMaxAvg: () => minMaxAvg,
  randomElement: () => randomElement,
  randomIndex: () => randomIndex,
  randomPluck: () => randomPluck,
  shuffle: () => shuffle,
  without: () => without
});

// src/util.ts
var clamp = (v, min = 0, max = 1) => {
  if (Number.isNaN(v))
    throw new Error(`v parameter is NaN`);
  if (Number.isNaN(min))
    throw new Error(`min parameter is NaN`);
  if (Number.isNaN(max))
    throw new Error(`max parameter is NaN`);
  if (v < min)
    return min;
  if (v > max)
    return max;
  return v;
};
var map = (v, inMin, inMax, outMin, outMax) => {
  return (v - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
};
var clampZeroBounds = (v, length) => {
  if (!Number.isInteger(v))
    throw new Error(`v parameter must be an integer (${v})`);
  if (!Number.isInteger(length))
    throw new Error(`length parameter must be an integer (${length}, ${typeof length})`);
  v = Math.round(v);
  if (v < 0)
    return 0;
  if (v >= length)
    return length - 1;
  return v;
};
var lerp = (amt, a, b) => (1 - amt) * a + amt * b;
var isEqualDefault = (a, b) => a === b;
var isEqualValueDefault = (a, b) => {
  if (a === b)
    return true;
  return toStringDefault(a) === toStringDefault(b);
};
var toStringDefault = (itemToMakeStringFor) => typeof itemToMakeStringFor === `string` ? itemToMakeStringFor : JSON.stringify(itemToMakeStringFor);

// src/collections/NumericArrays.ts
var average = (...data) => {
  if (data === void 0)
    throw new Error(`data parameter is undefined`);
  const validNumbers = data.filter((d) => typeof d === `number` && !Number.isNaN(d));
  const total = validNumbers.reduce((acc, v) => acc + v, 0);
  return total / validNumbers.length;
};
var minMaxAvg = (data) => {
  const validNumbers = data.filter((d) => typeof d === `number` && !Number.isNaN(d));
  const total = validNumbers.reduce((acc, v) => acc + v, 0);
  return {
    total,
    max: Math.max(...validNumbers),
    min: Math.min(...validNumbers),
    avg: total / validNumbers.length
  };
};

// src/collections/Arrays.ts
var guardArray = (array, paramName = `?`) => {
  if (array === void 0)
    throw new Error(`Param '${paramName}' is undefined. Expected array.`);
  if (array === null)
    throw new Error(`Param '${paramName}' is null. Expected array.`);
  if (!Array.isArray(array))
    throw new Error(`Param '${paramName}' not an array as expected`);
};
var randomIndex = (array) => Math.floor(Math.random() * array.length);
var randomElement = (array) => {
  guardArray(array, `array`);
  return array[Math.floor(Math.random() * array.length)];
};
var randomPluck = (array, mutate = false) => {
  if (array === void 0)
    throw new Error(`array is undefined`);
  if (!Array.isArray(array))
    throw new Error(`'array' param is not an array`);
  if (array.length === 0)
    return { value: void 0, array: [] };
  const index = randomIndex(array);
  if (mutate) {
    return {
      value: array[index],
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
var shuffle = (dataToShuffle) => {
  const array = [...dataToShuffle];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
var without = (data, value, comparer = isEqualDefault) => data.filter((v) => !comparer(v, value));
var groupBy = (array, grouper) => array.reduce((store, item) => {
  const key = grouper(item);
  const val = store.get(key);
  if (val === void 0) {
    store.set(key, [item]);
  } else {
    val.push(item);
  }
  return store;
}, /* @__PURE__ */ new Map());

export {
  clamp,
  map,
  clampZeroBounds,
  lerp,
  isEqualDefault,
  isEqualValueDefault,
  toStringDefault,
  average,
  minMaxAvg,
  guardArray,
  randomIndex,
  randomElement,
  randomPluck,
  shuffle,
  without,
  groupBy,
  Arrays_exports
};
//# sourceMappingURL=chunk-BD22GUMY.js.map