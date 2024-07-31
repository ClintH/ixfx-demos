import {
  defaultRandom
} from "./chunk-5VWJ6TUI.js";
import {
  throwIntegerTest,
  throwNumberTest
} from "./chunk-CSXWZ3IC.js";

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

// src/numbers/Count.ts
function* count(amount, offset = 0) {
  throwIntegerTest(amount, ``, `amount`);
  throwIntegerTest(offset, ``, `offset`);
  if (amount === 0) return;
  let index = 0;
  do {
    yield amount < 0 ? -index + offset : index + offset;
  } while (index++ < Math.abs(amount) - 1);
}

export {
  floatSource,
  float,
  count
};
//# sourceMappingURL=chunk-OVLG22EY.js.map