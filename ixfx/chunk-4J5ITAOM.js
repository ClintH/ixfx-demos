import {
  getCssVariable
} from "./chunk-KUISNGY5.js";
import {
  fromNumbers
} from "./chunk-VMGOXQMS.js";
import {
  __export
} from "./chunk-YDTVC7MM.js";

// src/visual/Svg.ts
var Svg_exports = {};
__export(Svg_exports, {
  Elements: () => SvgElements_exports,
  applyOpts: () => applyOpts,
  applyPathOpts: () => applyPathOpts,
  createEl: () => createEl,
  createOrResolve: () => createOrResolve,
  getOrCreateDefX: () => getOrCreateDefX,
  svg: () => svg
});

// src/visual/SvgMarkers.ts
var createMarker = (id, opts, childCreator) => {
  const m = createEl(`marker`, id);
  if (opts.markerWidth)
    m.setAttribute(`markerWidth`, opts.markerWidth?.toString());
  if (opts.markerHeight)
    m.setAttribute(`markerHeight`, opts.markerHeight?.toString());
  if (opts.orient)
    m.setAttribute(`orient`, opts.orient.toString());
  else
    m.setAttribute(`orient`, `auto-start-reverse`);
  if (opts.viewBox)
    m.setAttribute(`viewBox`, opts.viewBox.toString());
  if (opts.refX)
    m.setAttribute(`refX`, opts.refX.toString());
  if (opts.refY)
    m.setAttribute(`refY`, opts.refY.toString());
  if (childCreator) {
    const c = childCreator();
    m.appendChild(c);
  }
  return m;
};
var markerPrebuilt = (elem, opts, _context) => {
  if (elem === null)
    return `(elem null)`;
  const parent = elem.ownerSVGElement;
  if (parent === null)
    throw new Error(`parent for elem is null`);
  const defsEl = createOrResolve(parent, `defs`, `defs`);
  let defEl = defsEl.querySelector(`#${opts.id}`);
  if (defEl !== null) {
    return `url(#${opts.id})`;
  }
  if (opts.id === `triangle`) {
    opts = { ...opts, strokeStyle: `transparent` };
    if (!opts.markerHeight)
      opts = { ...opts, markerHeight: 6 };
    if (!opts.markerWidth)
      opts = { ...opts, markerWidth: 6 };
    if (!opts.refX)
      opts = { ...opts, refX: opts.markerWidth };
    if (!opts.refY)
      opts = { ...opts, refY: opts.markerHeight };
    if (!opts.fillStyle || opts.fillStyle === `none`)
      opts = { ...opts, fillStyle: `black` };
    if (!opts.viewBox)
      opts = { ...opts, viewBox: `0 0 10 10` };
    defEl = createMarker(opts.id, opts, () => {
      const tri = createEl(`path`);
      tri.setAttribute(`d`, `M 0 0 L 10 5 L 0 10 z`);
      if (opts)
        applyOpts(tri, opts);
      return tri;
    });
  } else
    throw new Error(`Do not know how to make ${opts.id}`);
  defEl.id = opts.id;
  defsEl.appendChild(defEl);
  return `url(#${opts.id})`;
};

// src/visual/SvgElements.ts
var SvgElements_exports = {};
__export(SvgElements_exports, {
  circleEl: () => circleEl,
  circleUpdate: () => circleUpdate,
  grid: () => grid,
  lineEl: () => lineEl,
  pathEl: () => pathEl,
  textEl: () => textEl,
  textElUpdate: () => textElUpdate,
  textPathEl: () => textPathEl,
  textPathUpdate: () => textPathUpdate
});
var numOrPercentage = (v) => {
  if (v >= 0 && v <= 1)
    return v * 100 + `%`;
  return v.toString();
};
var pathEl = (svgOrArray, parent, opts, queryOrExisting) => {
  const p = createOrResolve(parent, `path`, queryOrExisting);
  const svg2 = typeof svgOrArray === `string` ? svgOrArray : svgOrArray.join(`
`);
  p.setAttributeNS(null, `d`, svg2);
  parent.appendChild(p);
  if (opts)
    applyOpts(p, opts);
  return p;
};
var circleUpdate = (el, circle, opts) => {
  el.setAttributeNS(null, `cx`, circle.x.toString());
  el.setAttributeNS(null, `cy`, circle.y.toString());
  el.setAttributeNS(null, `r`, circle.radius.toString());
  if (opts)
    applyOpts(el, opts);
};
var circleEl = (circle, parent, opts, queryOrExisting) => {
  const p = createOrResolve(parent, `circle`, queryOrExisting);
  circleUpdate(p, circle, opts);
  return p;
};
var lineEl = (line, parent, opts, queryOrExisting) => {
  const lineEl2 = createOrResolve(parent, `line`, queryOrExisting);
  lineEl2.setAttributeNS(null, `x1`, line.a.x.toString());
  lineEl2.setAttributeNS(null, `y1`, line.a.y.toString());
  lineEl2.setAttributeNS(null, `x2`, line.b.x.toString());
  lineEl2.setAttributeNS(null, `y2`, line.b.y.toString());
  if (opts)
    applyOpts(lineEl2, opts);
  if (opts)
    applyPathOpts(lineEl2, opts);
  return lineEl2;
};
var textPathUpdate = (el, text, opts) => {
  if (opts?.method)
    el.setAttributeNS(null, `method`, opts.method);
  if (opts?.side)
    el.setAttributeNS(null, `side`, opts.side);
  if (opts?.spacing)
    el.setAttributeNS(null, `spacing`, opts.spacing);
  if (opts?.startOffset) {
    el.setAttributeNS(null, `startOffset`, numOrPercentage(opts.startOffset));
  }
  if (opts?.textLength)
    el.setAttributeNS(null, `textLength`, numOrPercentage(opts.textLength));
  if (text) {
    el.textContent = text;
  }
};
var textPathEl = (pathRef, text, parent, opts, queryOrExisting) => {
  const textEl2 = createOrResolve(parent, `text`, queryOrExisting + `-text`);
  textElUpdate(textEl2, void 0, void 0, opts);
  const p = createOrResolve(textEl2, `textPath`, queryOrExisting);
  p.setAttributeNS(null, `href`, pathRef);
  textPathUpdate(p, text, opts);
  if (opts)
    applyOpts(p, opts);
  return p;
};
var textElUpdate = (el, pos, text, opts) => {
  if (pos) {
    el.setAttributeNS(null, `x`, pos.x.toString());
    el.setAttributeNS(null, `y`, pos.y.toString());
  }
  if (text) {
    el.textContent = text;
  }
  if (opts) {
    applyOpts(el, opts);
    if (opts.anchor)
      el.setAttributeNS(null, `text-anchor`, opts.anchor);
    if (opts.align)
      el.setAttributeNS(null, `alignment-baseline`, opts.align);
  }
};
var textEl = (text, parent, pos, opts, queryOrExisting) => {
  const p = createOrResolve(parent, `text`, queryOrExisting);
  textElUpdate(p, pos, text, opts);
  return p;
};
var grid = (parent, center, spacing, width, height, opts = {}) => {
  if (!opts.strokeStyle)
    opts = { ...opts, strokeStyle: getCssVariable(`bg-dim`, `silver`) };
  if (!opts.strokeWidth)
    opts = { ...opts, strokeWidth: 1 };
  const g = createEl(`g`);
  applyOpts(g, opts);
  let y = 0;
  while (y < height) {
    const horiz = fromNumbers(0, y, width, y);
    lineEl(horiz, g);
    y += spacing;
  }
  let x = 0;
  while (x < width) {
    const vert = fromNumbers(x, 0, x, height);
    lineEl(vert, g);
    x += spacing;
  }
  parent.appendChild(g);
};

// src/visual/Svg.ts
var createOrResolve = (parent, type, queryOrExisting) => {
  let existing = null;
  if (queryOrExisting !== void 0) {
    if (typeof queryOrExisting === `string`)
      existing = parent.querySelector(queryOrExisting);
    else
      existing = queryOrExisting;
  }
  if (existing === null) {
    const p = document.createElementNS(`http://www.w3.org/2000/svg`, type);
    parent.appendChild(p);
    if (queryOrExisting && typeof queryOrExisting === `string`) {
      if (queryOrExisting.startsWith(`#`))
        p.id = queryOrExisting.substring(1);
    }
    return p;
  }
  return existing;
};
var getOrCreateDefX = (parent, id, creator) => {
  const created = creator();
  if (created === void 0)
    throw new Error(`Could not create def ${id}`);
  return created;
};
var createEl = (type, id) => {
  const m = document.createElementNS(`http://www.w3.org/2000/svg`, type);
  if (id) {
    m.id = id;
  }
  return m;
};
var applyPathOpts = (elem, opts) => {
  if (opts.markerEnd)
    elem.setAttribute(`marker-end`, markerPrebuilt(elem, opts.markerEnd, opts));
  if (opts.markerStart)
    elem.setAttribute(`marker-end`, markerPrebuilt(elem, opts.markerStart, opts));
  if (opts.markerMid)
    elem.setAttribute(`marker-end`, markerPrebuilt(elem, opts.markerMid, opts));
};
var applyOpts = (elem, opts) => {
  if (opts.fillStyle)
    elem.setAttributeNS(null, `fill`, opts.fillStyle);
  if (opts.strokeStyle)
    elem.setAttributeNS(null, `stroke`, opts.strokeStyle);
  if (opts.strokeWidth)
    elem.setAttributeNS(null, `stroke-width`, opts.strokeWidth.toString());
  if (opts.strokeDash)
    elem.setAttribute(`stroke-dasharray`, opts.strokeDash);
};
var svg = (parent, parentOpts) => {
  if (parentOpts)
    applyOpts(parent, parentOpts);
  const o = {
    text: (text, pos, opts, queryOrExisting) => textEl(text, parent, pos, opts, queryOrExisting),
    textPath: (pathRef, text, opts, queryOrExisting) => textPathEl(pathRef, text, parent, opts, queryOrExisting),
    line: (line, opts, queryOrExisting) => lineEl(line, parent, opts, queryOrExisting),
    circle: (circle, opts, queryOrExisting) => circleEl(circle, parent, opts, queryOrExisting),
    path: (svgStr, opts, queryOrExisting) => pathEl(svgStr, parent, opts, queryOrExisting),
    grid: (center, spacing, width, height, opts) => grid(parent, center, spacing, width, height, opts),
    query: (selectors) => parent.querySelector(selectors),
    get width() {
      const w = parent.getAttributeNS(null, `width`);
      if (w === null)
        return 0;
      return parseFloat(w);
    },
    set width(width) {
      parent.setAttributeNS(null, `width`, width.toString());
    },
    get parent() {
      return parent;
    },
    get height() {
      const w = parent.getAttributeNS(null, `height`);
      if (w === null)
        return 0;
      return parseFloat(w);
    },
    set height(height) {
      parent.setAttributeNS(null, `height`, height.toString());
    },
    clear: () => {
      while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
      }
    }
  };
  return o;
};

export {
  SvgElements_exports,
  createOrResolve,
  getOrCreateDefX,
  createEl,
  applyPathOpts,
  applyOpts,
  svg,
  Svg_exports
};
