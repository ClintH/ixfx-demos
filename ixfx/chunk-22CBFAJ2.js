// src/Guards.ts
var number = (value, range = ``, paramName = `?`) => {
  if (Number.isNaN(value))
    throw new Error(`Parameter '${paramName}' is NaN`);
  if (typeof value !== `number`)
    throw new Error(`Parameter '${paramName}' does not have type of number (${value})`);
  switch (range) {
    case `positive`:
      if (value < 0)
        throw new Error(`Parameter ${paramName} must be at least zero (${value})`);
      break;
    case `negative`:
      if (value > 0)
        throw new Error(`Parameter ${paramName} must be zero or lower (${value})`);
      break;
    case `aboveZero`:
      if (value <= 0)
        throw new Error(`Parameter ${paramName} must be above zero (${value})`);
      break;
    case `belowZero`:
      if (value >= 0)
        throw new Error(`Parameter ${paramName} must be below zero (${value})`);
      break;
    case `percentage`:
      if (value > 1 || value < 0)
        throw new Error(`Parameter ${paramName} must be in percentage range (0 to 1). (${value})`);
      break;
    case `nonZero`:
      if (value === 0)
        throw new Error(`Parameter ${paramName} must non-zero. (${value})`);
      break;
    case `bipolar`:
      if (value > 1 || value < -1)
        throw new Error(`Parameter ${paramName} must be in bipolar percentage range (-1 to 1). (${value})`);
      break;
  }
  return true;
};
var percent = (value, paramName = `?`) => number(value, `percentage`, paramName);
var integer = (value, range = ``, paramName = `?`) => {
  number(value, range, paramName);
  if (!Number.isInteger(value))
    throw new Error(`Paramter ${paramName} is not an integer`);
  console.log(`value ${value} is an integer`);
};
var isStringArray = (value) => {
  if (!Array.isArray(value))
    return false;
  return value.find((v) => typeof v !== `string`) === void 0;
};
var array = (value, paramName = `?`) => {
  if (!Array.isArray(value))
    throw new Error(`Parameter '${paramName}' is expected to be an array'`);
};

export {
  number,
  percent,
  integer,
  isStringArray,
  array
};
