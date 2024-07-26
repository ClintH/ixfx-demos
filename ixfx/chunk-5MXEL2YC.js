import {
  throwFromResult
} from "./chunk-44XJNV6Z.js";

// src/util/GuardString.ts
var stringTest = (value, range = ``, parameterName = `?`) => {
  if (typeof value !== `string`) return [false, `Param '${parameterName} is not type string. Got: ${typeof value}`];
  switch (range) {
    case `non-empty`:
      if (value.length === 0) return [false, `Param '${parameterName} is empty`];
      break;
  }
  return [true];
};
var throwStringTest = (value, range = ``, parameterName = `?`) => {
  throwFromResult(stringTest(value, range, parameterName));
};

export {
  stringTest,
  throwStringTest
};
//# sourceMappingURL=chunk-5MXEL2YC.js.map