import {
  defaultRandom
} from "./chunk-JIUPCK6W.js";

// src/random/String.ts
var string = (lengthOrOptions = 5) => {
  const options = typeof lengthOrOptions === `number` ? { length: lengthOrOptions } : lengthOrOptions;
  const calculate = options.source ?? defaultRandom;
  return calculate().toString(36).slice(2, length + 2);
};

export {
  string
};
//# sourceMappingURL=chunk-K45JUSCV.js.map