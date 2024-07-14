import {
  numberTest
} from "./chunk-JIDOUNL5.js";

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

export {
  intervalToMs,
  isInterval
};
//# sourceMappingURL=chunk-37WZU5ZM.js.map