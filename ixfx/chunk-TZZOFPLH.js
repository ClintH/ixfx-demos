// src/iterables/sync/Slice.ts
function* slice(it, start = 0, end = Number.POSITIVE_INFINITY) {
  const iit = it[Symbol.iterator]();
  for (; start > 0; start--, end--) iit.next();
  for (const v of it) {
    if (end-- > 0) {
      yield v;
    } else {
      break;
    }
  }
}

export {
  slice
};
//# sourceMappingURL=chunk-TZZOFPLH.js.map