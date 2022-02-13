// src/Guards.ts
var number = (t, range = ``, name = `?`) => {
  if (Number.isNaN(t))
    throw new Error(`Parameter '${name}' is NaN`);
  if (typeof t !== `number`)
    throw new Error(`Parameter '${name}' does not have type of number (${t})`);
  switch (range) {
    case `positive`:
      if (t < 0)
        throw new Error(`Parameter ${name} must be at least zero (${t})`);
      break;
    case `negative`:
      if (t > 0)
        throw new Error(`Parameter ${name} must be zero or lower (${t})`);
      break;
    case `aboveZero`:
      if (t <= 0)
        throw new Error(`Parameter ${name} must be above zero (${t})`);
      break;
    case `belowZero`:
      if (t >= 0)
        throw new Error(`Parameter ${name} must be below zero (${t})`);
      break;
    case `percentage`:
      if (t > 1 || t < 0)
        throw new Error(`Parameter ${name} must be in percentage range (0 to 1). (${t})`);
      break;
    case `nonZero`:
      if (t === 0)
        throw new Error(`Parameter ${name} must non-zero. (${t})`);
      break;
    case `bipolar`:
      if (t > 1 || t < -1)
        throw new Error(`Parameter ${name} must be in bipolar percentage range (-1 to 1). (${t})`);
      break;
  }
  return true;
};
var percent = (value, paramName = `?`) => number(value, `percentage`, paramName);
var integer = (value, range = ``, paramName = `?`) => {
  number(value, range, paramName);
  if (!Number.isInteger(value))
    throw new Error(`Paramter ${paramName} is not an integer`);
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
  number,
  percent,
  integer,
  isStringArray,
  array
};
