import {
  __export
} from "./chunk-YDTVC7MM.js";

// src/Text.ts
var Text_exports = {};
__export(Text_exports, {
  between: () => between,
  countCharsFromStart: () => countCharsFromStart,
  indexOfCharCode: () => indexOfCharCode,
  lineSpan: () => lineSpan,
  omitChars: () => omitChars,
  splitByLength: () => splitByLength,
  splitRanges: () => splitRanges,
  startsEnds: () => startsEnds,
  untilMatch: () => untilMatch,
  unwrap: () => unwrap
});
var between = (source, start, end, lastEndMatch = true) => {
  const startPos = source.indexOf(start);
  if (startPos < 0)
    return;
  if (end === void 0)
    end = start;
  const endPos = lastEndMatch ? source.lastIndexOf(end) : source.indexOf(end, startPos + 1);
  if (endPos < 0)
    return;
  return source.substring(startPos + 1, endPos);
};
var indexOfCharCode = (source, code, start = 0, end = source.length - 1) => {
  for (let i = start; i <= end; i++) {
    if (source.charCodeAt(i) === code)
      return i;
  }
  return -1;
};
var omitChars = (source, removeStart, removeLength) => source.substring(0, removeStart) + source.substring(removeStart + removeLength);
var splitByLength = (source, length) => {
  const chunks = Math.ceil(source.length / length);
  const ret = [];
  for (let i = 0, o = 0; i < chunks; ++i, o += length) {
    ret.push(source.substring(o, length));
  }
};
var untilMatch = (source, match, startPos = 0) => {
  if (startPos > source.length)
    throw new Error(`startPos should be less than length`);
  const m = source.indexOf(match, startPos);
  if (m < 0)
    return source;
  return source.substring(startPos, m);
};
var unwrap = (source, ...wrappers) => {
  let matched = false;
  do {
    matched = false;
    for (const w of wrappers) {
      if (source.startsWith(w) && source.endsWith(w)) {
        source = source.substring(w.length, source.length - w.length * 2 + 1);
        matched = true;
      }
    }
  } while (matched);
  return source;
};
var lineSpan = (ranges, start, end) => {
  let s = -1;
  let e = -1;
  for (let i = 0; i < ranges.length; i++) {
    const r = ranges[i];
    s = i;
    if (r.text.length === 0)
      continue;
    if (start < r.end) {
      break;
    }
  }
  for (let i = s; i < ranges.length; i++) {
    const r = ranges[i];
    e = i;
    if (end === r.end) {
      e = i + 1;
      break;
    }
    if (end < r.end) {
      break;
    }
  }
  return { length: e - s, start: s, end: e };
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
  for (let i = 0; i < source.length; i++) {
    if (chars.includes(source.charAt(i))) {
      counted++;
    } else {
      break;
    }
  }
  return counted;
};
var startsEnds = (source, start, end = start) => source.startsWith(start) && source.endsWith(end);

export {
  between,
  indexOfCharCode,
  omitChars,
  splitByLength,
  untilMatch,
  unwrap,
  lineSpan,
  splitRanges,
  countCharsFromStart,
  startsEnds,
  Text_exports
};
