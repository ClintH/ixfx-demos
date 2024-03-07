// src/Guards.ts
var numberTest = (value, range = ``, parameterName = `?`) => {
  if (value === null)
    return [false, `Parameter '${parameterName}' is null`];
  if (typeof value === `undefined`) {
    return [false, `Parameter '${parameterName}' is undefined`];
  }
  if (Number.isNaN(value)) {
    return [false, `Parameter '${parameterName}' is NaN`];
  }
  if (typeof value !== `number`) {
    return [false, `Parameter '${parameterName}' is not a number (${JSON.stringify(value)})`];
  }
  switch (range) {
    case `positive`: {
      if (value < 0) {
        return [false, `Parameter '${parameterName}' must be at least zero (${value})`];
      }
      break;
    }
    case `negative`: {
      if (value > 0) {
        return [false, `Parameter '${parameterName}' must be zero or lower (${value})`];
      }
      break;
    }
    case `aboveZero`: {
      if (value <= 0) {
        return [false, `Parameter '${parameterName}' must be above zero (${value})`];
      }
      break;
    }
    case `belowZero`: {
      if (value >= 0) {
        return [false, `Parameter '${parameterName}' must be below zero (${value})`];
      }
      break;
    }
    case `percentage`: {
      if (value > 1 || value < 0) {
        return [false, `Parameter '${parameterName}' must be in percentage range (0 to 1). (${value})`];
      }
      break;
    }
    case `nonZero`: {
      if (value === 0) {
        return [false, `Parameter '${parameterName}' must non-zero. (${value})`];
      }
      break;
    }
    case `bipolar`: {
      if (value > 1 || value < -1) {
        return [false, `Parameter '${parameterName}' must be in bipolar percentage range (-1 to 1). (${value})`];
      }
      break;
    }
  }
  return [true];
};
var throwNumberTest = (value, range = ``, parameterName = `?`) => {
  throwFromResult(numberTest(value, range, parameterName));
};
var nullUndef = (value, parameterName = `?`) => {
  if (typeof value === `undefined`) {
    return [false, `${parameterName} param is undefined`];
  }
  if (value === null)
    return [false, `${parameterName} param is null`];
  return [true];
};
var throwFromResult = (test) => {
  if (test[0])
    return false;
  else
    throw new Error(test[1]);
};
var percentTest = (value, parameterName = `?`) => numberTest(value, `percentage`, parameterName);
var throwPercentTest = (value, parameterName = `?`) => {
  throwFromResult(percentTest(value, parameterName));
};
var integerTest = (value, range = ``, parameterName = `?`) => {
  const r = numberTest(value, range, parameterName);
  if (!r[0])
    return r;
  if (!Number.isInteger(value)) {
    return [false, `Parameter ${parameterName} is not an integer`];
  }
  return [true];
};
var throwIntegerTest = (value, range = ``, parameterName = `?`) => {
  throwFromResult(integerTest(value, range, parameterName));
};
var integerParse = (value, range = ``, defaultValue = Number.NaN) => {
  if (value === void 0)
    return defaultValue;
  if (value === null)
    return defaultValue;
  try {
    const parsed = Number.parseInt(value);
    const r = integerTest(parsed, range, `parsed`);
    return r[0] ? parsed : defaultValue;
  } catch {
    return defaultValue;
  }
  return Number.parseInt(value);
};
var isStringArray = (value) => {
  if (!Array.isArray(value))
    return false;
  return !value.some((v) => typeof v !== `string`);
};
var arrayTest = (value, parameterName = `?`) => {
  if (!Array.isArray(value)) {
    return [false, `Parameter '${parameterName}' is expected to be an array'`];
  }
  return [true];
};
var throwArrayTest = (value, parameterName = `?`) => {
  throwFromResult(arrayTest(value, parameterName));
};
var defined = (argument) => argument !== void 0;

export {
  numberTest,
  throwNumberTest,
  nullUndef,
  throwFromResult,
  percentTest,
  throwPercentTest,
  integerTest,
  throwIntegerTest,
  integerParse,
  isStringArray,
  arrayTest,
  throwArrayTest,
  defined
};
//# sourceMappingURL=chunk-WUN4GNAA.js.map