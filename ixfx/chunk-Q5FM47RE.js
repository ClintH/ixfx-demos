import {
  throwFromResult
} from "./chunk-CSXWZ3IC.js";

// src/util/GuardFunction.ts
var isFunction = (object) => object instanceof Function;
var functionTest = (value, parameterName = `?`) => {
  if (value === void 0) return [false, `Param '${parameterName}' is undefined. Expected: function.`];
  if (value === null) return [false, `Param '${parameterName}' is null. Expected: function.`];
  if (typeof value !== `function`) return [false, `Param '${parameterName}' is type '${typeof value}'. Expected: function`];
  return [true];
};
var throwFunctionTest = (value, parameterName = `?`) => {
  const [ok, msg] = functionTest(value, parameterName);
  if (ok) return;
  throw new TypeError(msg);
};

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
  isFunction,
  functionTest,
  throwFunctionTest,
  stringTest,
  throwStringTest
};
//# sourceMappingURL=chunk-Q5FM47RE.js.map