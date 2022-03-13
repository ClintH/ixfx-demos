import {
  continuously,
  debounce,
  delay,
  frequencyTimer,
  frequencyTimerSource,
  interval,
  msElapsedTimer,
  relativeTimer,
  sleep,
  throttle,
  ticksElapsedTimer,
  timeout,
  updateOutdated
} from "./chunk-SHBH44D2.js";
import {
  StateMachine_exports
} from "./chunk-WPZ6N3LH.js";
import {
  number
} from "./chunk-QLMTBJ7O.js";
import {
  __export
} from "./chunk-FQLUQVDZ.js";

// src/flow/index.ts
var flow_exports = {};
__export(flow_exports, {
  StateMachine: () => StateMachine_exports,
  continuously: () => continuously,
  debounce: () => debounce,
  delay: () => delay,
  frequencyTimer: () => frequencyTimer,
  frequencyTimerSource: () => frequencyTimerSource,
  interval: () => interval,
  msElapsedTimer: () => msElapsedTimer,
  relativeTimer: () => relativeTimer,
  repeat: () => repeat,
  sleep: () => sleep,
  throttle: () => throttle,
  ticksElapsedTimer: () => ticksElapsedTimer,
  timeout: () => timeout,
  updateOutdated: () => updateOutdated
});
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
  repeat,
  flow_exports
};
//# sourceMappingURL=chunk-XNK372T3.js.map