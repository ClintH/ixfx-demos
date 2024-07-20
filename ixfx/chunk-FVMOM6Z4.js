import {
  defaultRandom
} from "./chunk-5VWJ6TUI.js";
import {
  throwNumberTest
} from "./chunk-JIDOUNL5.js";

// src/random/FloatSource.ts
var floatSource = (maxOrOptions = 1) => {
  const options = typeof maxOrOptions === `number` ? { max: maxOrOptions } : maxOrOptions;
  let max = options.max;
  let min = options.min ?? 0;
  const source = options.source ?? defaultRandom;
  throwNumberTest(min, ``, `min`);
  throwNumberTest(max, ``, `max`);
  if (!options.min && max < 0) {
    min = max;
    max = 0;
  }
  if (min > max) {
    throw new Error(`Min is greater than max. Min: ${min} max: ${max}`);
  }
  return () => source() * (max - min) + min;
};
var float = (maxOrOptions = 1) => floatSource(maxOrOptions)();

export {
  floatSource,
  float
};
//# sourceMappingURL=chunk-FVMOM6Z4.js.map