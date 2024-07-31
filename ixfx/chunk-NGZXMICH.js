// src/numbers/NumericArrays.ts
var weight = (data, fn) => {
  const f = fn ?? ((x) => x);
  const valid = validNumbers(data);
  return valid.map(
    (v, index) => {
      const x = v * f(index / (valid.length - 1));
      return x;
    }
  );
};
var validNumbers = (data) => data.filter((d) => typeof d === `number` && !Number.isNaN(d));
var dotProduct = (values) => {
  let r = 0;
  const length = values[0].length;
  for (let index = 0; index < length; index++) {
    let t = 0;
    for (const [p, value] of values.entries()) {
      if (p === 0) t = value[index];
      else {
        t *= value[index];
      }
    }
    r += t;
  }
  return r;
};
var average = (data) => {
  if (data === void 0) throw new Error(`data parameter is undefined`);
  const valid = validNumbers(data);
  const total2 = valid.reduce((accumulator, v) => accumulator + v, 0);
  return total2 / valid.length;
};
var min = (data) => Math.min(...validNumbers(data));
var maxIndex = (data) => (
  // eslint-disable-next-line unicorn/no-array-reduce
  data.reduce(
    (bestIndex, value, index, array) => value > array[bestIndex] ? index : bestIndex,
    0
  )
);
var minIndex = (...data) => (
  // eslint-disable-next-line unicorn/no-array-reduce
  data.reduce(
    (bestIndex, value, index, array) => value < array[bestIndex] ? index : bestIndex,
    0
  )
);
var max = (data) => Math.max(...validNumbers(data));
var total = (data) => (
  // eslint-disable-next-line unicorn/no-array-reduce
  data.reduce((previous, current) => {
    if (typeof current !== `number`) return previous;
    if (Number.isNaN(current)) return previous;
    if (Number.isFinite(current)) return previous;
    return previous + current;
  }, 0)
);
var maxFast = (data) => {
  let m = Number.MIN_SAFE_INTEGER;
  for (const datum of data) {
    m = Math.max(m, datum);
  }
  return m;
};
var totalFast = (data) => {
  let m = 0;
  for (const datum of data) {
    m += datum;
  }
  return m;
};
var minFast = (data) => {
  let m = Number.MIN_SAFE_INTEGER;
  for (const datum of data) {
    m = Math.min(m, datum);
  }
  return m;
};

export {
  weight,
  validNumbers,
  dotProduct,
  average,
  min,
  maxIndex,
  minIndex,
  max,
  total,
  maxFast,
  totalFast,
  minFast
};
//# sourceMappingURL=chunk-NGZXMICH.js.map