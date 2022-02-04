// src/Guards.ts
var number = (t, range = ``, name = `?`) => {
  if (Number.isNaN(t))
    throw new Error(`Parameter '${name}' is NaN`);
  if (typeof t !== `number`)
    throw new Error(`Parameter '${name}' does not have type of number`);
  switch (range) {
    case `positive`:
      if (t < 0)
        throw new Error(`Parameter ${name} must be at least zero`);
      break;
    case `negative`:
      if (t > 0)
        throw new Error(`Parameter ${name} must be zero or lower`);
      break;
    case `aboveZero`:
      if (t <= 0)
        throw new Error(`Parameter ${name} must be above zero`);
      break;
    case `belowZero`:
      if (t >= 0)
        throw new Error(`Parameter ${name} must be below zero`);
      break;
    case `percentage`:
      if (t > 1 || t < 0)
        throw new Error(`Parameter ${name} must be in percentage range (0 to 1)`);
      break;
    case `bipolar`:
      if (t > 1 || t < -1)
        throw new Error(`Parameter ${name} must be in bipolar percentage range (-1 to 1)`);
      break;
  }
  return true;
};
var percent = (t, name = `?`) => number(t, `percentage`, name);
var integer = (t, name = `?`, range = ``) => {
  number(t, range, name);
  if (!Number.isInteger(t))
    throw new Error(`Paramter ${name} is not an integer`);
};
var isStringArray = (t) => {
  if (!Array.isArray(t))
    return false;
  return t.find((v) => typeof v !== `string`) === void 0;
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
//# sourceMappingURL=chunk-PUZBTW3S.js.map