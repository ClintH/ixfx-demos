import {
  round
} from "./chunk-S5D7YRXR.js";
import {
  throwIntegerTest,
  throwNumberTest
} from "./chunk-CSXWZ3IC.js";

// src/numbers/Quantise.ts
var quantiseEvery = (v, every, middleRoundsUp = true) => {
  const everyStr = every.toString();
  const decimal = everyStr.indexOf(`.`);
  let multiplier = 1;
  if (decimal >= 0) {
    let d = everyStr.substring(decimal + 1).length;
    multiplier = 10 * d;
    every = Math.floor(multiplier * every);
    v = v * multiplier;
  }
  throwNumberTest(v, ``, `v`);
  throwIntegerTest(every, ``, `every`);
  let div = v / every;
  const divModule = div % 1;
  div = Math.floor(div);
  if (divModule === 0.5 && middleRoundsUp || divModule > 0.5) div++;
  const vv = every * div / multiplier;
  return vv;
};

// src/numbers/LinearSpace.ts
function* linearSpace(start, end, steps, precision) {
  throwNumberTest(start, ``, `start`);
  throwNumberTest(end, ``, `end`);
  throwNumberTest(steps, ``, `steps`);
  const r = precision ? round(precision) : (v) => v;
  const step = (end - start) / (steps - 1);
  throwNumberTest(step, ``, `step`);
  if (!Number.isFinite(step)) {
    throw new TypeError(`Calculated step value is infinite`);
  }
  for (let index = 0; index < steps; index++) {
    const v = start + step * index;
    yield r(v);
  }
}

export {
  quantiseEvery,
  linearSpace
};
//# sourceMappingURL=chunk-647FAJGC.js.map