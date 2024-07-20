import {
  floatSource
} from "./chunk-FVMOM6Z4.js";
import {
  interpolate
} from "./chunk-YEZDB5LJ.js";
import {
  scaler
} from "./chunk-4NG2GB4D.js";
import {
  throwNumberTest
} from "./chunk-JIDOUNL5.js";
import {
  __export
} from "./chunk-AFNFQUHK.js";

// src/data/Bipolar.ts
var Bipolar_exports = {};
__export(Bipolar_exports, {
  clamp: () => clamp,
  fromScalar: () => fromScalar,
  immutable: () => immutable,
  random: () => random,
  randomSource: () => randomSource,
  scale: () => scale,
  scaleUnclamped: () => scaleUnclamped,
  toScalar: () => toScalar,
  towardZero: () => towardZero
});
var immutable = (startingValueOrBipolar = 0) => {
  const startingValue = typeof startingValueOrBipolar === `number` ? startingValueOrBipolar : startingValueOrBipolar.value;
  if (startingValue > 1) throw new Error(`Cannot be larger than 1`);
  if (startingValue < -1) throw new Error(`Cannot be smaller than -1`);
  if (Number.isNaN(startingValue)) throw new Error(`startingValue is NaN`);
  const v = startingValue;
  return {
    [Symbol.toPrimitive](hint) {
      if (hint === `number`) return v;
      else if (hint === `string`) return v.toString();
      return true;
    },
    value: v,
    towardZero: (amt) => {
      return immutable(towardZero(v, amt));
    },
    add: (amt) => {
      return immutable(clamp(v + amt));
    },
    multiply: (amt) => {
      return immutable(clamp(v * amt));
    },
    inverse: () => {
      return immutable(-v);
    },
    interpolate: (amt, b) => {
      return immutable(clamp(interpolate(amt, v, b)));
    },
    asScalar: () => {
      return toScalar(v);
    }
  };
};
var toScalar = (bipolarValue) => {
  if (typeof bipolarValue !== `number`) throw new Error(`Expected v to be a number. Got: ${typeof bipolarValue}`);
  if (Number.isNaN(bipolarValue)) throw new Error(`Parameter is NaN`);
  return (bipolarValue + 1) / 2;
};
var fromScalar = (scalarValue) => {
  throwNumberTest(scalarValue, `percentage`, `v`);
  return scalarValue * 2 - 1;
};
var scale = (inputValue, inMin, inMax) => {
  return clamp(scaler(inMin, inMax, -1, 1)(inputValue));
};
var scaleUnclamped = (inputValue, inMin, inMax) => {
  return scaler(inMin, inMax, -1, 1)(inputValue);
};
var randomSource = (maxOrOptions) => {
  const source = floatSource(maxOrOptions);
  return () => source() * 2 - 1;
};
var random = (maxOrOptions) => {
  const source = randomSource(maxOrOptions);
  return source();
};
var clamp = (bipolarValue) => {
  if (typeof bipolarValue !== `number`) throw new Error(`Parameter must be a number. Got: ${typeof bipolarValue}`);
  if (Number.isNaN(bipolarValue)) throw new Error(`v parameter is NaN`);
  if (bipolarValue > 1) return 1;
  if (bipolarValue < -1) return -1;
  return bipolarValue;
};
var towardZero = (bipolarValue, amount) => {
  if (typeof bipolarValue !== `number`) throw new Error(`Parameter 'v' must be a number. Got: ${typeof bipolarValue}`);
  if (typeof amount !== `number`) throw new Error(`Parameter 'amt' must be a number. Got: ${typeof amount}`);
  if (amount < 0) throw new Error(`Parameter 'amt' must be positive`);
  if (bipolarValue < 0) {
    bipolarValue += amount;
    if (bipolarValue > 0) bipolarValue = 0;
  } else if (bipolarValue > 0) {
    bipolarValue -= amount;
    if (bipolarValue < 0) bipolarValue = 0;
  }
  return bipolarValue;
};

// src/data/Flip.ts
var flip = (v) => {
  if (typeof v === `function`) v = v();
  throwNumberTest(v, `percentage`, `v`);
  return 1 - v;
};

export {
  clamp,
  Bipolar_exports,
  flip
};
//# sourceMappingURL=chunk-2J7LUMRE.js.map