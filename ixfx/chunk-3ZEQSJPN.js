import {
  defaultRandom
} from "./chunk-5VWJ6TUI.js";

// src/random/String.ts
var string = (lengthOrOptions = 5) => {
  const options = typeof lengthOrOptions === `number` ? { length: lengthOrOptions } : lengthOrOptions;
  const calculate = options.source ?? defaultRandom;
  return calculate().toString(36).slice(2, length + 2);
};

export {
  string
};
//# sourceMappingURL=chunk-3ZEQSJPN.js.map