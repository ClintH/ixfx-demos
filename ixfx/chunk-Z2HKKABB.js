import {
  integerTest,
  throwFromResult
} from "./chunk-JNUBDOCI.js";
import {
  __export
} from "./chunk-Q2EHUQVZ.js";

// src/Text.ts
var Text_exports = {};
__export(Text_exports, {
  abbreviate: () => abbreviate,
  afterMatch: () => afterMatch,
  between: () => between,
  betweenChomp: () => betweenChomp,
  countCharsFromStart: () => countCharsFromStart,
  htmlEntities: () => htmlEntities,
  indexOfCharCode: () => indexOfCharCode,
  lineSpan: () => lineSpan,
  omitChars: () => omitChars,
  random: () => string,
  splitByLength: () => splitByLength,
  splitRanges: () => splitRanges,
  startsEnds: () => startsEnds,
  toStringAbbreviate: () => toStringAbbreviate,
  untilMatch: () => untilMatch,
  unwrap: () => unwrap
});

// src/random/Types.ts
var defaultRandom = Math.random;

// src/random/String.ts
var string = (lengthOrOptions = 5) => {
  const options = typeof lengthOrOptions === `number` ? { length: lengthOrOptions } : lengthOrOptions;
  const calculate = options.source ?? defaultRandom;
  return calculate().toString(36).slice(2, length + 2);
};

// src/Text.ts
var abbreviate = (source, maxLength = 15) => {
  throwFromResult(integerTest(maxLength, `aboveZero`, `maxLength`));
  if (typeof source !== `string`)
    throw new Error(`Parameter 'source' is not a string`);
  if (source.length > maxLength && source.length > 3) {
    if (maxLength > 15) {
      const chunk = Math.round((maxLength - 2) / 2);
      return source.slice(0, chunk) + `...` + source.slice(-chunk);
    }
    return source.slice(0, maxLength) + `...`;
  }
  return source;
};
var toStringAbbreviate = (source, maxLength = 20) => {
  if (source === void 0)
    return `(undefined)`;
  if (source === null)
    return `(null)`;
  return abbreviate(JSON.stringify(source), maxLength);
};
var between = (source, start, end, lastEndMatch = true) => {
  const startPos = source.indexOf(start);
  if (startPos < 0)
    return;
  if (end === void 0)
    end = start;
  const endPos = lastEndMatch ? source.lastIndexOf(end) : source.indexOf(end, startPos + 1);
  if (endPos < 0)
    return;
  return source.slice(startPos + 1, endPos);
};
var betweenChomp = (source, start, end, lastEndMatch = true) => {
  if (typeof source !== `string`)
    throw new Error(`Parameter 'source' is not a string`);
  if (typeof start !== `string`)
    throw new Error(`Parameter 'start' is not a string`);
  if (end !== void 0 && typeof end !== `string`)
    throw new Error(`Parameter 'end' is not a string`);
  const startPos = source.indexOf(start);
  if (startPos < 0)
    return [source, void 0];
  if (end === void 0)
    end = start;
  const endPos = lastEndMatch ? source.lastIndexOf(end) : source.indexOf(end, startPos + 1);
  if (endPos < 0)
    return [source, void 0];
  const between2 = source.slice(startPos + 1, endPos);
  const sourceResult = source.slice(0, startPos) + source.slice(endPos + 1);
  return [sourceResult, between2];
};
var indexOfCharCode = (source, code, start = 0, end = source.length - 1) => {
  for (let index = start; index <= end; index++) {
    if (source.codePointAt(index) === code)
      return index;
  }
  return -1;
};
var omitChars = (source, removeStart, removeLength) => source.slice(0, removeStart) + source.slice(removeStart + removeLength);
var splitByLength = (source, length2) => {
  throwFromResult(integerTest(length2, `aboveZero`, `length`));
  if (source === null)
    throw new Error(`source parameter null`);
  if (typeof source !== `string`) {
    throw new TypeError(`source parameter not a string`);
  }
  const chunks = Math.ceil(source.length / length2);
  const returnValue = [];
  let start = 0;
  for (let c = 0; c < chunks; c++) {
    returnValue.push(source.slice(start, start + length2));
    start += length2;
  }
  return returnValue;
};
var untilMatch = (source, match, options = {}) => {
  let fallback = options.fallback;
  const ifNoMatch = options.ifNoMatch ?? (fallback ? `fallback` : `original`);
  if (ifNoMatch === `original`)
    fallback = source;
  if (ifNoMatch === `fallback` && fallback === void 0)
    throw new Error(`Fallback must be provided`);
  const startPos = options.startPos ?? void 0;
  const fromEnd = options.fromEnd ?? false;
  const m = fromEnd ? source.lastIndexOf(match, startPos) : source.indexOf(match, startPos);
  if (m < 0) {
    if (ifNoMatch === `throw`)
      throw new Error(`Match string not found in source`);
    return fallback;
  }
  return source.slice(startPos ?? 0, m);
};
var afterMatch = (source, match, options = {}) => {
  if (source === void 0)
    throw new Error(`source is undefined`);
  const startPos = options.startPos ?? void 0;
  const fromEnd = options.fromEnd ?? false;
  const m = fromEnd ? source.lastIndexOf(match, startPos) : source.indexOf(match, startPos);
  if (m < 0)
    return source;
  return source.slice(Math.max(0, m + match.length));
};
var unwrap = (source, ...wrappers) => {
  let matched = false;
  do {
    matched = false;
    for (const w of wrappers) {
      if (source.startsWith(w) && source.endsWith(w)) {
        source = source.slice(w.length, source.length - w.length * 2 + 1);
        matched = true;
      }
    }
  } while (matched);
  return source;
};
var lineSpan = (ranges, start, end) => {
  let s = -1;
  let endPos = -1;
  for (const [index, r] of ranges.entries()) {
    s = index;
    if (r.text.length === 0)
      continue;
    if (start < r.end) {
      break;
    }
  }
  for (let index = s; index < ranges.length; index++) {
    const r = ranges[index];
    endPos = index;
    if (end === r.end) {
      endPos = index + 1;
      break;
    }
    if (end < r.end) {
      break;
    }
  }
  return { length: endPos - s, start: s, end: endPos };
};
var splitRanges = (source, split) => {
  let start = 0;
  let text = ``;
  const ranges = [];
  let index = 0;
  for (let i = 0; i < source.length; i++) {
    if (source.indexOf(split, i) === i) {
      const end = i;
      ranges.push({
        text,
        start,
        end,
        index
      });
      start = end + 1;
      text = ``;
      index++;
    } else {
      text += source.charAt(i);
    }
  }
  if (start < source.length) {
    ranges.push({ text, start, index, end: source.length });
  }
  return ranges;
};
var countCharsFromStart = (source, ...chars) => {
  let counted = 0;
  for (let index = 0; index < source.length; index++) {
    if (chars.includes(source.charAt(index))) {
      counted++;
    } else {
      break;
    }
  }
  return counted;
};
var startsEnds = (source, start, end = start) => source.startsWith(start) && source.endsWith(end);
var htmlEntities = (source) => source.replaceAll(/[&<>\u00A0-\u9999]/g, (index) => `&#${index.codePointAt(0)};`);

export {
  defaultRandom,
  string,
  abbreviate,
  toStringAbbreviate,
  between,
  betweenChomp,
  indexOfCharCode,
  omitChars,
  splitByLength,
  untilMatch,
  afterMatch,
  unwrap,
  lineSpan,
  splitRanges,
  countCharsFromStart,
  startsEnds,
  htmlEntities,
  Text_exports
};
//# sourceMappingURL=chunk-Z2HKKABB.js.map