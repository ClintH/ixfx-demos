import {
  round
} from "./chunk-3NK3ODTY.js";
import {
  throwIntegerTest,
  throwNumberTest
} from "./chunk-2OY2BTO2.js";

// src/numbers/Quantise.ts
var quantiseEvery = (v, every, middleRoundsUp = true) => {
  throwNumberTest(v, ``, `v`);
  throwIntegerTest(every, ``, `every`);
  let div = v / every;
  const divModule = div % 1;
  div = Math.floor(div);
  if (divModule === 0.5 && middleRoundsUp || divModule > 0.5) div++;
  return every * div;
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
//# sourceMappingURL=chunk-EO6AODLL.js.map