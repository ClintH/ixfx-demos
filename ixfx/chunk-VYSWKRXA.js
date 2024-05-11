import {
  integerTest,
  throwFromResult
} from "./chunk-LTXP53ZM.js";

// src/numbers/Round.ts
function round(a, b) {
  throwFromResult(integerTest(a, `positive`, `decimalPlaces`));
  let rounder;
  if (a === 0)
    rounder = Math.round;
  else {
    const p = Math.pow(10, a);
    rounder = (v) => Math.floor(v * p) / p;
  }
  return b === void 0 ? rounder : rounder(b);
}

export {
  round
};
//# sourceMappingURL=chunk-VYSWKRXA.js.map