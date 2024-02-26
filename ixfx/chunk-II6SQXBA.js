import {
  pingPong,
  pingPongPercent
} from "./chunk-KPH2Y2KE.js";
import {
  integerUniqueGen
} from "./chunk-VDKKFE3W.js";
import {
  delayLoop,
  interval
} from "./chunk-5A33PLPK.js";
import {
  IterableSync_exports
} from "./chunk-P2G4XDHN.js";
import {
  IterableAsync_exports
} from "./chunk-J2Z65AN3.js";
import {
  throwIntegerTest,
  throwNumberTest
} from "./chunk-JNUBDOCI.js";
import {
  __export
} from "./chunk-Q2EHUQVZ.js";

// src/Generators.ts
var Generators_exports = {};
__export(Generators_exports, {
  Async: () => IterableAsync_exports,
  Sync: () => IterableSync_exports,
  count: () => count,
  delayLoop: () => delayLoop,
  interval: () => interval,
  numericPercent: () => numericPercent,
  numericRange: () => numericRange,
  numericRangeRaw: () => numericRangeRaw,
  pingPong: () => pingPong,
  pingPongPercent: () => pingPongPercent,
  randomUniqueInteger: () => integerUniqueGen
});
var numericRangeRaw = function* (interval2, start = 0, end, repeating = false) {
  if (interval2 <= 0)
    throw new Error(`Interval is expected to be above zero`);
  if (end === void 0)
    end = Number.MAX_SAFE_INTEGER;
  let v = start;
  do {
    while (v < end) {
      yield v;
      v += interval2;
    }
  } while (repeating);
};
var numericRange = function* (interval2, start = 0, end, repeating = false, rounding) {
  throwNumberTest(interval2, `nonZero`);
  const negativeInterval = interval2 < 0;
  if (end === void 0) {
  } else {
    if (negativeInterval && start < end) {
      throw new Error(
        `Interval of ${interval2} will never go from ${start} to ${end}`
      );
    }
    if (!negativeInterval && start > end) {
      throw new Error(
        `Interval of ${interval2} will never go from ${start} to ${end}`
      );
    }
  }
  rounding = rounding ?? 1e3;
  if (end === void 0)
    end = Number.MAX_SAFE_INTEGER;
  else
    end *= rounding;
  interval2 = interval2 * rounding;
  do {
    let v = start * rounding;
    while (!negativeInterval && v <= end || negativeInterval && v >= end) {
      yield v / rounding;
      v += interval2;
    }
  } while (repeating);
};
var count = function* (amount, offset = 0) {
  throwIntegerTest(amount, ``, `amount`);
  throwIntegerTest(offset, ``, `offset`);
  if (amount === 0)
    return;
  let index = 0;
  do {
    yield amount < 0 ? -index + offset : index + offset;
  } while (index++ < Math.abs(amount) - 1);
};
var numericPercent = function(interval2 = 0.01, repeating = false, start = 0, end = 1) {
  throwNumberTest(interval2, `percentage`, `interval`);
  throwNumberTest(start, `percentage`, `start`);
  throwNumberTest(end, `percentage`, `end`);
  return numericRange(interval2, start, end, repeating);
};

export {
  numericRangeRaw,
  numericRange,
  count,
  numericPercent,
  Generators_exports
};
//# sourceMappingURL=chunk-II6SQXBA.js.map