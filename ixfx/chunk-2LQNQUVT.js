import {
  round
} from "./chunk-S5D7YRXR.js";
import {
  numberTest
} from "./chunk-CSXWZ3IC.js";

// src/flow/IntervalType.ts
function intervalToMs(interval, defaultNumber) {
  if (isInterval(interval)) {
    if (typeof interval === `number`) return interval;
    let ms = interval.millis ?? 0;
    ms += (interval.hours ?? 0) * 60 * 60 * 1e3;
    ms += (interval.mins ?? 0) * 60 * 1e3;
    ms += (interval.secs ?? 0) * 1e3;
    return ms;
  } else {
    if (typeof defaultNumber !== `undefined`) return defaultNumber;
    throw new Error(`Not a valid interval: ${interval}`);
  }
}
function isInterval(interval) {
  if (interval === void 0) return false;
  if (interval === null) return false;
  if (typeof interval === `number`) {
    if (Number.isNaN(interval)) return false;
    if (!Number.isFinite(interval)) return false;
    return true;
  } else if (typeof interval !== `object`) return false;
  const hasMillis = `millis` in interval;
  const hasSecs = `secs` in interval;
  const hasMins = `mins` in interval;
  const hasHours = `hours` in interval;
  if (hasMillis && !numberTest(interval.millis)[0]) return false;
  if (hasSecs && !numberTest(interval.secs)[0]) return false;
  if (hasMins && !numberTest(interval.mins)[0]) return false;
  if (hasHours && !numberTest(interval.hours)[0]) return false;
  if (hasMillis || hasSecs || hasHours || hasMins) return true;
  return false;
}
var elapsedToHumanString = (millisOrFunction, rounding = 2) => {
  let interval = {} = 0;
  if (typeof millisOrFunction === `function`) {
    const intervalResult = millisOrFunction();
    return elapsedToHumanString(intervalResult);
  } else if (typeof millisOrFunction === `number`) {
    interval = millisOrFunction;
  } else if (typeof millisOrFunction === `object`) {
    interval = intervalToMs(interval);
  }
  let ms = intervalToMs(interval);
  if (typeof ms === `undefined`) return `(undefined)`;
  if (ms < 1e3) return `${round(rounding, ms)}ms`;
  ms /= 1e3;
  if (ms < 120) return `${ms.toFixed(1)}secs`;
  ms /= 60;
  if (ms < 60) return `${ms.toFixed(2)}mins`;
  ms /= 60;
  return `${ms.toFixed(2)}hrs`;
};

export {
  intervalToMs,
  isInterval,
  elapsedToHumanString
};
//# sourceMappingURL=chunk-2LQNQUVT.js.map