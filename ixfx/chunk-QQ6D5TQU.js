import {
  fromNumbers
} from "./chunk-VUEFATQ3.js";
import {
  getCssVariable
} from "./chunk-F6XISRGF.js";
import {
  __export
} from "./chunk-L5EJU35C.js";

// src/visual/Svg.ts
var Svg_exports = {};
__export(Svg_exports, {
  Elements: () => SvgElements_exports,
  applyOpts: () => applyOpts,
  applyPathOpts: () => applyPathOpts,
  applyStrokeOpts: () => applyStrokeOpts,
  clear: () => clear,
  createEl: () => createEl,
  createOrResolve: () => createOrResolve,
  getBounds: () => getBounds,
  makeHelper: () => makeHelper,
  remove: () => remove,
  setBounds: () => setBounds
});

// src/visual/SvgMarkers.ts
var createMarker = (id, opts, childCreator) => {
  const m = createEl(`marker`, id);
  if (opts.markerWidth) {
    m.setAttribute(`markerWidth`, opts.markerWidth?.toString());
  }
  if (opts.markerHeight) {
    m.setAttribute(`markerHeight`, opts.markerHeight?.toString());
  }
  if (opts.orient) m.setAttribute(`orient`, opts.orient.toString());
  else m.setAttribute(`orient`, `auto-start-reverse`);
  if (opts.viewBox) m.setAttribute(`viewBox`, opts.viewBox.toString());
  if (opts.refX) m.setAttribute(`refX`, opts.refX.toString());
  if (opts.refY) m.setAttribute(`refY`, opts.refY.toString());
  if (childCreator) {
    const c = childCreator();
    m.appendChild(c);
  }
  return m;
};
var markerPrebuilt = (elem, opts, _context) => {
  if (elem === null) return `(elem null)`;
  const parent = elem.ownerSVGElement;
  if (parent === null) throw new Error(`parent for elem is null`);
  const defsEl = createOrResolve(parent, `defs`, `defs`);
  let defEl = defsEl.querySelector(`#${opts.id}`);
  if (defEl !== null) {
    return `url(#${opts.id})`;
  }
  if (opts.id === `triangle`) {
    opts = { ...opts, strokeStyle: `transparent` };
    if (!opts.markerHeight) opts = { ...opts, markerHeight: 6 };
    if (!opts.markerWidth) opts = { ...opts, markerWidth: 6 };
    if (!opts.refX) opts = { ...opts, refX: opts.markerWidth };
    if (!opts.refY) opts = { ...opts, refY: opts.markerHeight };
    if (!opts.fillStyle || opts.fillStyle === `none`) {
      opts = { ...opts, fillStyle: `black` };
    }
    if (!opts.viewBox) opts = { ...opts, viewBox: `0 0 10 10` };
    defEl = createMarker(opts.id, opts, () => {
      const tri = createEl(`path`);
      tri.setAttribute(`d`, `M 0 0 L 10 5 L 0 10 z`);
      if (opts) applyOpts(tri, opts);
      return tri;
    });
  } else throw new Error(`Do not know how to make ${opts.id}`);
  defEl.id = opts.id;
  defsEl.appendChild(defEl);
  return `url(#${opts.id})`;
};

// src/visual/SvgElements.ts
var SvgElements_exports = {};
__export(SvgElements_exports, {
  circle: () => circle,
  circleUpdate: () => circleUpdate,
  grid: () => grid,
  group: () => group,
  groupUpdate: () => groupUpdate,
  line: () => line,
  lineUpdate: () => lineUpdate,
  path: () => path,
  pathUpdate: () => pathUpdate,
  text: () => text,
  textPath: () => textPath,
  textPathUpdate: () => textPathUpdate,
  textUpdate: () => textUpdate
});
var numberOrPercentage = (v) => {
  if (v >= 0 && v <= 1) return `${v * 100}%`;
  return v.toString();
};
var path = (svgOrArray, parent, opts, queryOrExisting) => {
  const elem = createOrResolve(
    parent,
    `path`,
    queryOrExisting
  );
  const svg = typeof svgOrArray === `string` ? svgOrArray : svgOrArray.join(`
`);
  elem.setAttributeNS(null, `d`, svg);
  parent.append(elem);
  return pathUpdate(elem, opts);
};
var pathUpdate = (elem, opts) => {
  if (opts) applyOpts(elem, opts);
  if (opts) applyStrokeOpts(elem, opts);
  return elem;
};
var circleUpdate = (elem, circle2, opts) => {
  elem.setAttributeNS(null, `cx`, circle2.x.toString());
  elem.setAttributeNS(null, `cy`, circle2.y.toString());
  elem.setAttributeNS(null, `r`, circle2.radius.toString());
  if (opts) applyOpts(elem, opts);
  if (opts) applyStrokeOpts(elem, opts);
  return elem;
};
var circle = (circle2, parent, opts, queryOrExisting) => {
  const p = createOrResolve(
    parent,
    `circle`,
    queryOrExisting
  );
  return circleUpdate(p, circle2, opts);
};
var group = (children, parent, queryOrExisting) => {
  const p = createOrResolve(parent, `g`, queryOrExisting);
  return groupUpdate(p, children);
};
var groupUpdate = (elem, children) => {
  for (const c of children) {
    if (c.parentNode !== elem) {
      elem.append(c);
    }
  }
  return elem;
};
var line = (line2, parent, opts, queryOrExisting) => {
  const lineEl = createOrResolve(
    parent,
    `line`,
    queryOrExisting
  );
  return lineUpdate(lineEl, line2, opts);
};
var lineUpdate = (lineEl, line2, opts) => {
  lineEl.setAttributeNS(null, `x1`, line2.a.x.toString());
  lineEl.setAttributeNS(null, `y1`, line2.a.y.toString());
  lineEl.setAttributeNS(null, `x2`, line2.b.x.toString());
  lineEl.setAttributeNS(null, `y2`, line2.b.y.toString());
  if (opts) applyOpts(lineEl, opts);
  if (opts) applyPathOpts(lineEl, opts);
  if (opts) applyStrokeOpts(lineEl, opts);
  return lineEl;
};
var textPathUpdate = (el, text2, opts) => {
  if (opts?.method) el.setAttributeNS(null, `method`, opts.method);
  if (opts?.side) el.setAttributeNS(null, `side`, opts.side);
  if (opts?.spacing) el.setAttributeNS(null, `spacing`, opts.spacing);
  if (opts?.startOffset) {
    el.setAttributeNS(null, `startOffset`, numberOrPercentage(opts.startOffset));
  }
  if (opts?.textLength) {
    el.setAttributeNS(null, `textLength`, numberOrPercentage(opts.textLength));
  }
  if (text2) {
    el.textContent = text2;
  }
  if (opts) applyOpts(el, opts);
  if (opts) applyStrokeOpts(el, opts);
  return el;
};
var textPath = (pathReference, text2, parent, opts, textQueryOrExisting, pathQueryOrExisting) => {
  const textEl = createOrResolve(
    parent,
    `text`,
    textQueryOrExisting,
    `-text`
  );
  textUpdate(textEl, void 0, void 0, opts);
  const p = createOrResolve(
    textEl,
    `textPath`,
    pathQueryOrExisting
  );
  p.setAttributeNS(null, `href`, pathReference);
  return textPathUpdate(p, text2, opts);
};
var textUpdate = (el, pos, text2, opts) => {
  if (pos) {
    el.setAttributeNS(null, `x`, pos.x.toString());
    el.setAttributeNS(null, `y`, pos.y.toString());
  }
  if (text2) {
    el.textContent = text2;
  }
  if (opts) {
    applyOpts(el, opts);
    if (opts) applyStrokeOpts(el, opts);
    if (opts.anchor) el.setAttributeNS(null, `text-anchor`, opts.anchor);
    if (opts.align) el.setAttributeNS(null, `alignment-baseline`, opts.align);
    const userSelect = opts.userSelect ?? true;
    if (!userSelect) {
      el.style.userSelect = `none`;
      el.style.webkitUserSelect = `none`;
    }
  }
  return el;
};
var text = (text2, parent, pos, opts, queryOrExisting) => {
  const p = createOrResolve(
    parent,
    `text`,
    queryOrExisting
  );
  return textUpdate(p, pos, text2, opts);
};
var grid = (parent, center, spacing, width, height, opts = {}) => {
  if (!opts.strokeStyle) {
    opts = { ...opts, strokeStyle: getCssVariable(`bg-dim`, `silver`) };
  }
  if (!opts.strokeWidth) opts = { ...opts, strokeWidth: 1 };
  const g = createEl(`g`);
  applyOpts(g, opts);
  applyPathOpts(g, opts);
  applyStrokeOpts(g, opts);
  let y = 0;
  while (y < height) {
    const horiz = fromNumbers(0, y, width, y);
    line(horiz, g);
    y += spacing;
  }
  let x = 0;
  while (x < width) {
    const vert = fromNumbers(x, 0, x, height);
    line(vert, g);
    x += spacing;
  }
  parent.append(g);
  return g;
};

// src/visual/Svg.ts
var createOrResolve = (parent, type, queryOrExisting, suffix) => {
  let existing = null;
  if (queryOrExisting !== void 0) {
    existing = typeof queryOrExisting === `string` ? parent.querySelector(queryOrExisting) : queryOrExisting;
  }
  if (existing === null) {
    const p = document.createElementNS(`http://www.w3.org/2000/svg`, type);
    parent.append(p);
    if (queryOrExisting && typeof queryOrExisting === `string` && queryOrExisting.startsWith(`#`)) {
      p.id = suffix !== void 0 && !queryOrExisting.endsWith(suffix) ? queryOrExisting.slice(1) + suffix : queryOrExisting.slice(1);
    }
    return p;
  }
  return existing;
};
var remove = (parent, queryOrExisting) => {
  if (typeof queryOrExisting === `string`) {
    const elem = parent.querySelector(queryOrExisting);
    if (elem === null) return;
    elem.remove();
  } else {
    queryOrExisting.remove();
  }
};
var clear = (parent) => {
  let c = parent.lastElementChild;
  while (c) {
    c.remove();
    c = parent.lastElementChild;
  }
};
var createEl = (type, id) => {
  const m = document.createElementNS(`http://www.w3.org/2000/svg`, type);
  if (id) {
    m.id = id;
  }
  return m;
};
var applyPathOpts = (elem, opts) => {
  if (opts.markerEnd) {
    elem.setAttribute(
      `marker-end`,
      markerPrebuilt(elem, opts.markerEnd, opts)
    );
  }
  if (opts.markerStart) {
    elem.setAttribute(
      `marker-start`,
      markerPrebuilt(elem, opts.markerStart, opts)
    );
  }
  if (opts.markerMid) {
    elem.setAttribute(
      `marker-mid`,
      markerPrebuilt(elem, opts.markerMid, opts)
    );
  }
};
var applyOpts = (elem, opts) => {
  if (opts.fillStyle) elem.setAttributeNS(null, `fill`, opts.fillStyle);
  if (opts.opacity) {
    elem.setAttributeNS(null, `opacity`, opts.opacity.toString());
  }
};
var applyStrokeOpts = (elem, opts) => {
  if (opts.strokeStyle) elem.setAttributeNS(null, `stroke`, opts.strokeStyle);
  if (opts.strokeWidth) {
    elem.setAttributeNS(null, `stroke-width`, opts.strokeWidth.toString());
  }
  if (opts.strokeDash) elem.setAttribute(`stroke-dasharray`, opts.strokeDash);
  if (opts.strokeLineCap) {
    elem.setAttribute(`stroke-linecap`, opts.strokeLineCap);
  }
};
var getBounds = (svg) => {
  const w = svg.getAttributeNS(null, `width`);
  const width = w === null ? 0 : Number.parseFloat(w);
  const h = svg.getAttributeNS(null, `height`);
  const height = h === null ? 0 : Number.parseFloat(h);
  return { width, height };
};
var setBounds = (svg, bounds) => {
  svg.setAttributeNS(null, `width`, bounds.width.toString());
  svg.setAttributeNS(null, `height`, bounds.height.toString());
};
var makeHelper = (parent, parentOpts) => {
  if (parentOpts) {
    applyOpts(parent, parentOpts);
    applyStrokeOpts(parent, parentOpts);
  }
  const o = {
    remove: (queryOrExisting) => {
      remove(parent, queryOrExisting);
    },
    text: (text2, pos, opts, queryOrExisting) => text(text2, parent, pos, opts, queryOrExisting),
    textPath: (pathReference, text2, opts, textQueryOrExisting, pathQueryOrExisting) => textPath(pathReference, text2, parent, opts, textQueryOrExisting, pathQueryOrExisting),
    line: (line2, opts, queryOrExisting) => line(line2, parent, opts, queryOrExisting),
    circle: (circle2, opts, queryOrExisting) => circle(circle2, parent, opts, queryOrExisting),
    path: (svgString, opts, queryOrExisting) => path(svgString, parent, opts, queryOrExisting),
    grid: (center, spacing, width, height, opts) => grid(parent, center, spacing, width, height, opts),
    query: (selectors) => parent.querySelector(selectors),
    get width() {
      const w = parent.getAttributeNS(null, `width`);
      if (w === null) return 0;
      return Number.parseFloat(w);
    },
    set width(width) {
      parent.setAttributeNS(null, `width`, width.toString());
    },
    get parent() {
      return parent;
    },
    get height() {
      const w = parent.getAttributeNS(null, `height`);
      if (w === null) return 0;
      return Number.parseFloat(w);
    },
    set height(height) {
      parent.setAttributeNS(null, `height`, height.toString());
    },
    clear: () => {
      while (parent.firstChild) {
        parent.lastChild.remove();
      }
    }
  };
  return o;
};

export {
  SvgElements_exports,
  createOrResolve,
  remove,
  clear,
  createEl,
  applyPathOpts,
  applyOpts,
  applyStrokeOpts,
  getBounds,
  setBounds,
  makeHelper,
  Svg_exports
};
//# sourceMappingURL=chunk-QQ6D5TQU.js.map