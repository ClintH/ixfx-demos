// src/Guards.ts
var percent = (t, name = `?`) => {
  if (Number.isNaN(t))
    throw new Error(`Parameter '${name}' is NaN`);
  if (t < 0)
    throw new Error(`Parameter '${name}' must be above or equal to 0`);
  if (t > 1)
    throw new Error(`Parameter '${name}' must be below or equal to 1`);
};
var integer = (t, name = `?`, enforcePositive = false) => {
  if (Number.isNaN(t))
    throw new Error(`Parameter '${name}' is NaN`);
  if (!Number.isInteger(t))
    throw new Error(`Paramter ${name} is not an integer`);
  if (enforcePositive && t < 0)
    throw new Error(`Parameter '${name}' must be at least zero`);
};
var isStringArray = (t) => {
  if (!Array.isArray(t))
    return false;
  for (let i = 0; i < t.length; i++) {
    if (typeof t[i] !== `string`)
      return false;
  }
  return true;
};
var array = (t, name = `?`) => {
  if (!Array.isArray(t))
    throw new Error(`Parameter '${name}' is expected to be an array'`);
};

export {
  percent,
  integer,
  isStringArray,
  array
};
//# sourceMappingURL=chunk-BBPDPC3N.js.map