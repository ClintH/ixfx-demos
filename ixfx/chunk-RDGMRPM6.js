import {
  round
} from "./chunk-2FF4255M.js";
import {
  integerTest,
  numberTest,
  throwFromResult
} from "./chunk-WUN4GNAA.js";

// src/numbers/Quantise.ts
var quantiseEvery = (v, every, middleRoundsUp = true) => {
  throwFromResult(numberTest(v, ``, `v`));
  throwFromResult(integerTest(every, ``, `every`));
  let div = v / every;
  const divModule = div % 1;
  div = Math.floor(div);
  if (divModule === 0.5 && middleRoundsUp || divModule > 0.5)
    div++;
  return every * div;
};

// src/numbers/LinearSpace.ts
function* linearSpace(start, end, steps, precision) {
  throwFromResult(numberTest(start, ``, `start`));
  throwFromResult(numberTest(end, ``, `end`));
  throwFromResult(numberTest(steps, ``, `steps`));
  const r = precision ? round(precision) : (v) => v;
  const step = (end - start) / (steps - 1);
  throwFromResult(numberTest(step, ``, `step`));
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
//# sourceMappingURL=chunk-RDGMRPM6.js.map