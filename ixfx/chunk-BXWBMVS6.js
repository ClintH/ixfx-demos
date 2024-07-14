import {
  slice
} from "./chunk-TZZOFPLH.js";
import {
  filterBetween
} from "./chunk-2XNNMGQC.js";

// src/numbers/MinMaxAvg.ts
var minMaxAvg = (data, opts = {}) => {
  if (data === void 0) throw new Error(`'data' is undefined`);
  if (!Array.isArray(data)) {
    if (`next` in data) {
      if (opts.startIndex || opts.endIndex) {
        data = slice(data, opts.startIndex, opts.endIndex);
      }
      let total2 = 0;
      let min = Number.MAX_SAFE_INTEGER;
      let max = Number.MIN_SAFE_INTEGER;
      let samples = 0;
      for (const v of data) {
        if (typeof v !== `number`) {
          throw new TypeError(`Generator should yield numbers. Got: ${typeof v}`);
        }
        total2 += v;
        samples++;
        min = Math.min(min, v);
        max = Math.max(max, v);
      }
      return {
        avg: total2 / samples,
        total: total2,
        max,
        min
      };
    } else {
      throw new Error(`'data' parameter is neither array or iterable`);
    }
  }
  if (data.length === 0) {
    return {
      total: 0,
      min: 0,
      max: 0,
      avg: 0
    };
  }
  const startIndex = opts.startIndex ?? 0;
  const endIndex = opts.endIndex ?? data.length;
  const validNumbers = filterBetween(
    data,
    (d) => typeof d === `number` && !Number.isNaN(d),
    startIndex,
    endIndex
  );
  const total = validNumbers.reduce((accumulator, v) => accumulator + v, 0);
  return {
    total,
    max: Math.max(...validNumbers),
    min: Math.min(...validNumbers),
    avg: total / validNumbers.length
  };
};

export {
  minMaxAvg
};
//# sourceMappingURL=chunk-BXWBMVS6.js.map