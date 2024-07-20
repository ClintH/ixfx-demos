import {
  Ops,
  sources_exports
} from "./chunk-RBLOJS6A.js";
import {
  resolveEl
} from "./chunk-ZNCB3DZ2.js";
import {
  __export
} from "./chunk-AFNFQUHK.js";

// src/dom/DomRx.ts
var DomRx_exports = {};
__export(DomRx_exports, {
  resizeObservable: () => resizeObservable,
  themeChange: () => themeChange,
  windowResize: () => windowResize
});
var windowResize = (elapsed) => Ops.debounce({ elapsed: elapsed ?? 100 })(sources_exports.event(window, `resize`, { innerWidth: 0, innerHeight: 0 }));
var themeChange = () => {
  const m = sources_exports.observable((stream) => {
    const ro = new MutationObserver((entries) => {
      stream.set(entries);
    });
    const opts = {
      attributeFilter: [`class`],
      attributes: true
    };
    ro.observe(document.documentElement, opts);
    return () => {
      ro.disconnect();
    };
  });
  return m;
};
var resizeObservable = (elem, timeout) => {
  if (elem === null) {
    throw new Error(`elem parameter is null. Expected element to observe`);
  }
  if (elem === void 0) {
    throw new Error(`elem parameter is undefined. Expected element to observe`);
  }
  const m = sources_exports.observable((stream) => {
    const ro = new ResizeObserver((entries) => {
      stream.set(entries);
    });
    ro.observe(elem);
    return () => {
      ro.unobserve(elem);
    };
  });
  return Ops.debounce({ elapsed: timeout ?? 100 })(m);
};

// src/dom/CanvasSizing.ts
var parentSizeCanvas = (domQueryOrEl, onResized, timeoutMs = 100) => {
  const el = resolveEl(domQueryOrEl);
  if (el.nodeName !== `CANVAS`) {
    throw new Error(
      `Expected HTML element with node name CANVAS, not ${el.nodeName}`
    );
  }
  const parent = el.parentElement;
  if (parent === null) throw new Error(`Element has no parent`);
  const ctx = el.getContext(`2d`);
  if (ctx === null) throw new Error(`Could not create drawing context`);
  el.style.width = `100%`;
  el.style.height = `100%`;
  const ro = resizeObservable(parent, timeoutMs).onValue(
    (entries) => {
      const entry = entries.find((v) => v.target === parent);
      if (entry === void 0) return;
      const width = entry.contentRect.width;
      const height = entry.contentRect.height;
      el.setAttribute(`width`, el.offsetWidth + `px`);
      el.setAttribute(`height`, el.offsetHeight + `px`);
      if (onResized !== void 0) {
        const bounds = {
          min: Math.min(width, height),
          max: Math.max(width, height),
          width,
          height,
          center: { x: width / 2, y: height / 2 }
        };
        onResized({ ctx, el, bounds });
      }
    }
  );
  return ro;
};
var fullSizeCanvas = (domQueryOrEl, onResized, skipCss = false) => {
  if (domQueryOrEl === null || domQueryOrEl === void 0) {
    throw new Error(`domQueryOrEl is null or undefined`);
  }
  const el = resolveEl(domQueryOrEl);
  if (el.nodeName !== `CANVAS`) {
    throw new Error(
      `Expected HTML element with node name CANVAS, not ${el.nodeName}`
    );
  }
  const ctx = el.getContext(`2d`);
  if (ctx === null) throw new Error(`Could not create drawing context`);
  const update = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    el.width = width;
    el.height = height;
    if (onResized !== void 0) {
      const bounds = {
        min: Math.min(width, height),
        max: Math.max(width, height),
        width,
        height,
        center: { x: width / 2, y: height / 2 }
      };
      onResized({ ctx, el, bounds });
    }
  };
  if (!skipCss) {
    el.style.top = `0`;
    el.style.left = `0`;
    el.style.zIndex = `-100`;
    el.style.position = `fixed`;
  }
  const r = windowResize();
  r.onValue(update);
  update();
  return r;
};

export {
  windowResize,
  resizeObservable,
  DomRx_exports,
  parentSizeCanvas,
  fullSizeCanvas
};
//# sourceMappingURL=chunk-63MQIVHE.js.map