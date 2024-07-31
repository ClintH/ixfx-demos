import {
  throwIntegerTest
} from "./chunk-CSXWZ3IC.js";

// src/numbers/Round.ts
function round(a, b) {
  throwIntegerTest(a, `positive`, `decimalPlaces`);
  let rounder;
  if (a === 0) rounder = Math.round;
  else {
    const p = Math.pow(10, a);
    rounder = (v) => Math.floor(v * p) / p;
  }
  return b === void 0 ? rounder : rounder(b);
}

export {
  round
};
//# sourceMappingURL=chunk-S5D7YRXR.js.map