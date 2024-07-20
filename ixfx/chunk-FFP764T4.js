import {
  zip
} from "./chunk-UEAUFROA.js";
import {
  weight
} from "./chunk-IALMVFKW.js";

// src/numbers/AverageWeighted.ts
var averageWeighted = (data, weightings) => {
  if (typeof weightings === `function`) weightings = weight(data, weightings);
  const ww = zip(data, weightings);
  const [totalV, totalW] = ww.reduce(
    (accumulator, v) => [accumulator[0] + v[0] * v[1], accumulator[1] + v[1]],
    [0, 0]
  );
  return totalV / totalW;
};

export {
  averageWeighted
};
//# sourceMappingURL=chunk-FFP764T4.js.map