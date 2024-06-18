import {
  ifNaN,
  integerParse,
  integerTest,
  isPowerOfTwo,
  numberTest,
  percentTest,
  throwFromResult,
  throwIntegerTest,
  throwNumberTest,
  throwPercentTest
} from "./chunk-2OY2BTO2.js";
import {
  __export
} from "./chunk-4VA37QKG.js";

// src/util/guards.ts
var guards_exports = {};
__export(guards_exports, {
  arrayTest: () => arrayTest,
  defined: () => defined,
  ifNaN: () => ifNaN,
  integerParse: () => integerParse,
  integerTest: () => integerTest,
  isFunction: () => isFunction,
  isPlainObject: () => isPlainObject,
  isPlainObjectOrPrimitive: () => isPlainObjectOrPrimitive,
  isPowerOfTwo: () => isPowerOfTwo,
  isStringArray: () => isStringArray,
  nullUndef: () => nullUndef,
  numberTest: () => numberTest,
  percentTest: () => percentTest,
  throwArrayTest: () => throwArrayTest,
  throwFromResult: () => throwFromResult,
  throwIntegerTest: () => throwIntegerTest,
  throwNullUndef: () => throwNullUndef,
  throwNumberTest: () => throwNumberTest,
  throwPercentTest: () => throwPercentTest
});

// src/util/GuardArrays.ts
var arrayTest = (value, parameterName = `?`) => {
  if (!Array.isArray(value)) {
    return [false, `Parameter '${parameterName}' is expected to be an array'`];
  }
  return [true];
};
var throwArrayTest = (value, parameterName = `?`) => {
  throwFromResult(arrayTest(value, parameterName));
};
var isStringArray = (value) => {
  if (!Array.isArray(value)) return false;
  return !value.some((v) => typeof v !== `string`);
};

// src/util/GuardEmpty.ts
var nullUndef = (value, parameterName = `?`) => {
  if (typeof value === `undefined`) {
    return [false, `${parameterName} param is undefined`];
  }
  if (value === null) return [false, `${parameterName} param is null`];
  return [true];
};
var throwNullUndef = (value, parameterName = `?`) => {
  const r = nullUndef(value, parameterName);
  if (r[0]) return;
  throw new Error(r[1]);
};
var defined = (argument) => argument !== void 0;

// src/util/GuardFunction.ts
var isFunction = (object) => object instanceof Function;

// src/util/GuardObject.ts
var isPlainObject = (value) => {
  if (typeof value !== `object` || value === null) return false;
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
};
var isPlainObjectOrPrimitive = (value) => {
  const t = typeof value;
  if (t === `symbol`) return false;
  if (t === `function`) return false;
  if (t === `bigint`) return true;
  if (t === `number`) return true;
  if (t === `string`) return true;
  if (t === `boolean`) return true;
  return isPlainObject(value);
};

export {
  arrayTest,
  throwArrayTest,
  isStringArray,
  nullUndef,
  throwNullUndef,
  defined,
  isFunction,
  isPlainObject,
  isPlainObjectOrPrimitive,
  guards_exports
};
//# sourceMappingURL=chunk-AAXTH4Z6.js.map