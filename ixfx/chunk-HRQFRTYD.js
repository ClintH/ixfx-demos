import {
  get
} from "./chunk-W5HGRWSK.js";
import {
  randomElement,
  randomIndex
} from "./chunk-WYGXOGEX.js";
import {
  number
} from "./chunk-6JTGCZJL.js";
import {
  __export
} from "./chunk-FQLUQVDZ.js";

// src/Random.ts
var Random_exports = {};
__export(Random_exports, {
  arrayElement: () => randomElement,
  arrayIndex: () => randomIndex,
  weighted: () => weighted,
  weighted2: () => weighted2
});
var weighted2 = (min2, max2) => {
  const r = Math.random() * max2;
  const x = Math.round(max2 / r);
  if (x > max2) {
    console.log(`r: ${r} x: ${x} min: ${min2} max: ${max2}`);
  }
  return x;
};
var weighted = (max2, min2, easing) => {
  number(max2);
  number(min2);
  if (max2 <= min2)
    throw new Error(`Max should be greater than min`);
  const r = get(easing)(Math.random());
  return r * (max2 - min2) + min2;
};
var loops = 1e3;
var min = 0;
var max = 10;
while (loops--) {
  const v = weighted(max, min, "easeInSine");
  if (v === min)
    console.log(`Min`);
  if (v === max)
    console.log(`Max`);
  if (v < min)
    console.log(`Less than min: ${v}`);
  if (v > max)
    console.log(`Greater than max: ${v}`);
}
console.log(`done`);

export {
  weighted2,
  weighted,
  Random_exports
};
//# sourceMappingURL=chunk-HRQFRTYD.js.map