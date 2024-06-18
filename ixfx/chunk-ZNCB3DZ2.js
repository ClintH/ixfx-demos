// src/dom/ResolveEl.ts
var resolveEl = (domQueryOrEl) => {
  if (typeof domQueryOrEl === `string`) {
    const d = document.querySelector(domQueryOrEl);
    if (d === null) {
      const error = domQueryOrEl.startsWith(`#`) ? new Error(
        `Query '${domQueryOrEl}' did not match anything. Try '#id', 'div', or '.class'`
      ) : new Error(
        `Query '${domQueryOrEl}' did not match anything. Did you mean '#${domQueryOrEl}?`
      );
      throw error;
    }
    domQueryOrEl = d;
  } else if (domQueryOrEl === null) {
    throw new Error(`Param 'domQueryOrEl' is null`);
  } else if (domQueryOrEl === void 0) {
    throw new Error(`Param 'domQueryOrEl' is undefined`);
  }
  const el = domQueryOrEl;
  return el;
};
var resolveEls = (selectors) => {
  if (selectors === void 0) return [];
  if (selectors === null) return [];
  if (Array.isArray(selectors)) return selectors;
  if (typeof selectors === `string`) {
    const elements = [...document.querySelectorAll(selectors)];
    return elements;
  }
  return [selectors];
};

export {
  resolveEl,
  resolveEls
};
//# sourceMappingURL=chunk-ZNCB3DZ2.js.map