import {
  StateMachine_exports
} from "./chunk-5L5XW7ZM.js";
import {
  continuously,
  debounce,
  delay,
  delayLoop,
  frequencyTimer,
  frequencyTimerSource,
  interval,
  msElapsedTimer,
  relativeTimer,
  retry,
  sleep,
  throttle,
  ticksElapsedTimer,
  timeout,
  updateOutdated,
  waitFor
} from "./chunk-D4SQX7VY.js";
import {
  number
} from "./chunk-U4IZE4J2.js";
import {
  __export
} from "./chunk-6SYKIMQH.js";

// src/flow/index.ts
var flow_exports = {};
__export(flow_exports, {
  StateMachine: () => StateMachine_exports,
  continuously: () => continuously,
  debounce: () => debounce,
  delay: () => delay,
  delayLoop: () => delayLoop,
  forEach: () => forEach,
  forEachAsync: () => forEachAsync,
  frequencyTimer: () => frequencyTimer,
  frequencyTimerSource: () => frequencyTimerSource,
  interval: () => interval,
  msElapsedTimer: () => msElapsedTimer,
  relativeTimer: () => relativeTimer,
  repeat: () => repeat,
  retry: () => retry,
  sleep: () => sleep,
  throttle: () => throttle,
  ticksElapsedTimer: () => ticksElapsedTimer,
  timeout: () => timeout,
  updateOutdated: () => updateOutdated,
  waitFor: () => waitFor
});
var forEach = (iterator, fn) => {
  for (const x of iterator) {
    const r = fn(x);
    if (typeof r === `boolean` && !r)
      break;
  }
};
var forEachAsync = async function(iterator, fn, intervalMs) {
  if (Array.isArray(iterator)) {
    for (const x of iterator) {
      const r = await fn(x);
      if (intervalMs)
        await sleep(intervalMs);
      if (typeof r === `boolean` && !r)
        break;
    }
  } else {
    for await (const x of iterator) {
      const r = await fn(x);
      if (intervalMs)
        await sleep(intervalMs);
      if (typeof r === `boolean` && !r)
        break;
    }
  }
};
var repeat = (countOrPredicate, fn) => {
  let repeats, valuesProduced;
  repeats = valuesProduced = 0;
  const ret = [];
  if (typeof countOrPredicate === `number`) {
    number(countOrPredicate, `positive`, `countOrPredicate`);
    while (countOrPredicate-- > 0) {
      repeats++;
      const v = fn();
      if (v === void 0)
        continue;
      ret.push(v);
      valuesProduced++;
    }
  } else {
    while (countOrPredicate(repeats, valuesProduced)) {
      repeats++;
      const v = fn();
      if (v === void 0)
        continue;
      ret.push(v);
      valuesProduced++;
    }
  }
  return ret;
};

export {
  forEach,
  forEachAsync,
  repeat,
  flow_exports
};
//# sourceMappingURL=chunk-PDKXPD7C.js.map