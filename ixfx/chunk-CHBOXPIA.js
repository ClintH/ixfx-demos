import {
  guardArray
} from "./chunk-UH4IORRN.js";
import {
  isEqualDefault,
  isEqualValueDefault
} from "./chunk-SGQC7FGM.js";

// src/data/arrays/Equality.ts
var isEqual = (arrayA, arrayB, eq = isEqualDefault) => {
  guardArray(arrayA, `arrayA`);
  guardArray(arrayB, `arrayB`);
  if (arrayA.length !== arrayB.length) return false;
  for (let indexA = 0; indexA < arrayA.length; indexA++) {
    if (!eq(arrayA[indexA], arrayB[indexA])) return false;
  }
  return true;
};
var isContentsTheSame = (array, equality) => {
  if (!Array.isArray(array)) throw new Error(`Param 'array' is not an array.`);
  if (array.length === 0) return true;
  const eq = equality ?? isEqualValueDefault;
  const a = array[0];
  const r = array.some((v) => !eq(a, v));
  if (r) return false;
  return true;
};

export {
  isEqual,
  isContentsTheSame
};
//# sourceMappingURL=chunk-CHBOXPIA.js.map