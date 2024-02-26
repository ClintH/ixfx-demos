import {
  DomRx_exports,
  fullSizeCanvas,
  parentSizeCanvas,
  resizeObservable,
  windowResize
} from "./chunk-HZ74O52U.js";
import {
  SvgElements_exports
} from "./chunk-7DIGOKRD.js";
import {
  require_dist
} from "./chunk-ZP2IY5GE.js";
import {
  Forms_exports
} from "./chunk-V2EXQDZT.js";
import {
  resolveEl,
  resolveEls
} from "./chunk-W7ZO7ANV.js";
import {
  Placeholder,
  Scaler_exports,
  Vector_exports,
  angle,
  cardinal,
  distance,
  getPointParameter,
  line_exports,
  multiply,
  multiply2,
  point_exports,
  relation,
  subtract2 as subtract
} from "./chunk-CAI5TLNP.js";
import {
  TrackedValueMap,
  TrackerBase
} from "./chunk-DK5J4BYE.js";
import {
  round
} from "./chunk-N26YSP3N.js";
import {
  afterMatch
} from "./chunk-MX6757FI.js";
import {
  getErrorMessage
} from "./chunk-L62EN7US.js";
import {
  __export,
  __toESM
} from "./chunk-ERASX3TW.js";

// src/dom/index.ts
var dom_exports = {};
__export(dom_exports, {
  DataDisplay: () => DataDisplay,
  DataTable: () => DataTable_exports,
  DragDrop: () => DragDrop_exports,
  Forms: () => Forms_exports,
  Rx: () => DomRx_exports,
  Variables: () => CssVariables_exports,
  byId: () => byId,
  canvasHelper: () => canvasHelper,
  cardinalPosition: () => cardinalPosition,
  clear: () => clear,
  copyToClipboard: () => copyToClipboard,
  createAfter: () => createAfter,
  createIn: () => createIn,
  cycleCssClass: () => cycleCssClass,
  defaultErrorHandler: () => defaultErrorHandler,
  el: () => el,
  elRequery: () => elRequery,
  fullSizeCanvas: () => fullSizeCanvas,
  fullSizeElement: () => fullSizeElement,
  getTranslation: () => getTranslation,
  inlineConsole: () => inlineConsole,
  insertSorted: () => insertSorted,
  log: () => log,
  parentSize: () => parentSize,
  parentSizeCanvas: () => parentSizeCanvas,
  pointScaler: () => pointScaler,
  pointerVisualise: () => pointerVisualise,
  positionFn: () => positionFn,
  positionFromMiddle: () => positionFromMiddle,
  positionRelative: () => positionRelative,
  reconcileChildren: () => reconcileChildren,
  resolveEl: () => resolveEl,
  resolveEls: () => resolveEls,
  setCssClass: () => setCssClass,
  setCssDisplay: () => setCssDisplay,
  setCssToggle: () => setCssToggle,
  setHtml: () => setHtml,
  setText: () => setText,
  viewportToSpace: () => viewportToSpace
});

// src/dom/ShadowDom.ts
var addShadowCss = (parentEl, styles) => {
  const styleEl = document.createElement(`style`);
  styleEl.textContent = styles;
  let shadowRoot;
  if (parentEl.shadowRoot) {
    shadowRoot = parentEl.shadowRoot;
    shadowRoot.innerHTML = ``;
  } else {
    shadowRoot = parentEl.attachShadow({ mode: `open` });
  }
  shadowRoot.append(styleEl);
  return shadowRoot;
};

// src/dom/Log.ts
var log = (domQueryOrElement, opts = {}) => {
  const {
    capacity = 0,
    monospaced = true,
    timestamp = false,
    collapseDuplicates = true,
    css = ``
  } = opts;
  let added = 0;
  let lastLog;
  let lastLogRepeats = 0;
  const parentElement = resolveEl(domQueryOrElement);
  const fontFamily = monospaced ? `Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", Monaco, "Courier New", Courier, monospace` : `normal`;
  const shadowRoot = addShadowCss(
    parentElement,
    `
  .log {
    font-family: ${fontFamily};
    background-color: var(--code-background-color);
    padding: var(--padding1, 0.2em);
    overflow-y: auto;
    height:100%;
  }
  .timestamp {
    margin-right: 0.5em;
    opacity: 0.5;
    font-size: 70%;
    align-self: center;
  }
  .line {
    display: flex;
    padding-bottom: 0.1em;
    padding-top: 0.1em;
  }
  .line:hover {
  
  }
  .error {
    color: red;
  }
  .badge {
    border: 1px solid currentColor;
    align-self: center;
    font-size: 70%;
    padding-left: 0.2em;
    padding-right: 0.2em;
    border-radius: 1em;
    margin-left: 0.5em;
    margin-right: 0.5em;
  }
  .msg {
    flex: 1;
    word-break: break-word;
  }
  ${css}
  `
  );
  const el2 = document.createElement(`div`);
  el2.className = `log`;
  shadowRoot.append(el2);
  const error = (messageOrError) => {
    const line = document.createElement(`div`);
    if (typeof messageOrError === `string`) {
      line.innerHTML = messageOrError;
    } else if (messageOrError instanceof Error) {
      const stack = messageOrError.stack;
      line.innerHTML = stack === void 0 ? messageOrError.toString() : stack.toString();
    } else {
      line.innerHTML = messageOrError;
    }
    line.classList.add(`error`);
    append(line);
    lastLog = void 0;
    lastLogRepeats = 0;
  };
  let lastLogTime = 0;
  const warn = (whatToLog = ``) => {
    const element = log2(whatToLog);
    if (!element)
      return element;
    element.classList.add(`warning`);
    return element;
  };
  const log2 = (whatToLog = ``) => {
    let message;
    const interval = window.performance.now() - lastLogTime;
    if (opts.minIntervalMs && interval < opts.minIntervalMs)
      return;
    lastLogTime = window.performance.now();
    if (typeof whatToLog === `object`) {
      message = JSON.stringify(whatToLog);
    } else if (whatToLog === void 0) {
      message = `(undefined)`;
    } else if (whatToLog === null) {
      message = `(null)`;
    } else if (typeof whatToLog === `number`) {
      if (Number.isNaN(message))
        message = `(NaN)`;
      message = whatToLog.toString();
    } else {
      message = whatToLog;
    }
    if (message.length === 0) {
      const rule = document.createElement(`hr`);
      lastLog = void 0;
      append(rule);
    } else if (message === lastLog && collapseDuplicates) {
      const lastElement = el2.firstElementChild;
      let lastBadge = lastElement.querySelector(`.badge`);
      if (lastBadge === null) {
        lastBadge = document.createElement(`div`);
        lastBadge.className = `badge`;
        lastElement.insertAdjacentElement(`beforeend`, lastBadge);
      }
      if (lastElement !== null) {
        lastBadge.textContent = (++lastLogRepeats).toString();
      }
      return lastElement;
    } else {
      const line = document.createElement(`div`);
      line.textContent = message;
      append(line);
      lastLog = message;
      return line;
    }
  };
  const append = (line) => {
    if (timestamp) {
      const wrapper = document.createElement(`div`);
      const timestamp2 = document.createElement(`div`);
      timestamp2.className = `timestamp`;
      timestamp2.textContent = (/* @__PURE__ */ new Date()).toLocaleTimeString();
      wrapper.append(timestamp2, line);
      line.classList.add(`msg`);
      wrapper.classList.add(`line`);
      line = wrapper;
    } else {
      line.classList.add(`line`, `msg`);
    }
    if (opts.reverse) {
      el2.append(line);
    } else {
      el2.insertBefore(line, el2.firstChild);
    }
    if (capacity > 0 && ++added > capacity * 2) {
      while (added > capacity) {
        el2.lastChild?.remove();
        added--;
      }
    }
    if (opts.reverse) {
      el2.scrollTop = el2.scrollHeight;
    }
    lastLogRepeats = 0;
  };
  const clear2 = () => {
    el2.innerHTML = ``;
    lastLog = void 0;
    lastLogRepeats = 0;
    added = 0;
  };
  const dispose = () => {
    el2.remove();
  };
  return {
    error,
    log: log2,
    warn,
    append,
    clear: clear2,
    dispose,
    get isEmpty() {
      return added === 0;
    }
  };
};

// src/dom/Util.ts
var import_json5 = __toESM(require_dist(), 1);
var pointScaler = (reference = `viewport`) => {
  switch (reference) {
    case `viewport`: {
      return (a, b) => {
        const pt = getPointParameter(a, b);
        return Object.freeze({
          x: pt.x / window.innerWidth,
          y: pt.y / window.innerHeight
        });
      };
    }
    case `screen`: {
      return (a, b) => {
        const pt = getPointParameter(a, b);
        return Object.freeze({
          x: pt.x / screen.width,
          y: pt.y / screen.height
        });
      };
    }
    case `document`: {
      return (a, b) => {
        const pt = getPointParameter(a, b);
        return Object.freeze({
          x: pt.x / document.body.scrollWidth,
          y: pt.y / document.body.scrollHeight
        });
      };
    }
    default: {
      throw new Error(
        `Unknown 'reference' parameter: ${JSON.stringify(reference)}`
      );
    }
  }
};
var positionFn = (domQueryOrEl, opts = {}) => {
  const targetSpace = opts.target ?? `viewport`;
  const relative = opts.relative ?? false;
  const anchor = opts.anchor ?? `nw`;
  const el2 = resolveEl(domQueryOrEl);
  const vpToSpace = viewportToSpace(targetSpace);
  if (relative) {
    const s = pointScaler(targetSpace);
    return () => s(vpToSpace(cardinal(el2.getBoundingClientRect(), anchor)));
  } else {
    return () => vpToSpace(cardinal(el2.getBoundingClientRect(), anchor));
  }
};
var cardinalPosition = (domQueryOrEl, anchor = `nw`) => {
  const el2 = resolveEl(domQueryOrEl);
  return cardinal(el2.getBoundingClientRect(), anchor);
};
var positionRelative = (domQueryOrEl, target = `viewport`) => {
  const f = positionFn(domQueryOrEl, { relative: true, target });
  return f();
};
var viewportToSpace = (targetSpace = `viewport`) => {
  switch (targetSpace) {
    case `screen`: {
      return (a, b) => {
        const pt = getPointParameter(a, b);
        return Object.freeze({
          x: pt.x + window.screenX,
          y: pt.y + window.screenY
        });
      };
    }
    case `document`: {
      return (a, b) => {
        const pt = getPointParameter(a, b);
        return Object.freeze({
          x: pt.x + window.scrollX,
          y: pt.y + window.scrollY
        });
      };
    }
    case `viewport`: {
      return (a, b) => {
        const pt = getPointParameter(a, b);
        return Object.freeze({
          x: pt.x,
          y: pt.y
        });
      };
    }
    default: {
      throw new Error(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `Unexpected target coordinate space: ${targetSpace}. Expected: viewport, document or screen`
      );
    }
  }
};
var positionFromMiddle = (domQueryOrEl, relativePos, relativeTo = `window`) => {
  if (!domQueryOrEl)
    throw new Error(`domQueryOrEl is null or undefined`);
  const el2 = resolveEl(domQueryOrEl);
  const absPosition = multiply2(
    relativePos,
    window.innerWidth,
    window.innerHeight
  );
  const thingRect = el2.getBoundingClientRect();
  const offsetPos = subtract(
    absPosition,
    thingRect.width / 2,
    thingRect.height / 2
  );
  el2.style.transform = `translate(${offsetPos.x}px, ${offsetPos.y}px)`;
};
var cycleCssClass = (el2, list) => {
  if (el2 === null || !el2)
    return;
  if (!Array.isArray(list)) {
    throw new TypeError(`List should be an array of strings`);
  }
  for (let index = 0; index < list.length; index++) {
    if (el2.classList.contains(list[index])) {
      el2.classList.remove(list[index]);
      if (index + 1 < list.length) {
        el2.classList.add(list[index + 1]);
      } else {
        el2.classList.add(list[0]);
      }
      return;
    }
  }
  el2.classList.add(list[0]);
};
var getTranslation = (domQueryOrEl) => {
  const el2 = resolveEl(domQueryOrEl);
  const style = window.getComputedStyle(el2);
  const matrix = style.transform;
  if (matrix === `none` || typeof matrix === `undefined`) {
    return {
      x: 0,
      y: 0,
      z: 0
    };
  }
  const matrixType = matrix.includes(`3d`) ? `3d` : `2d`;
  const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(`, `);
  if (matrixType === `2d`) {
    return {
      x: Number.parseFloat(matrixValues[4]),
      y: Number.parseFloat(matrixValues[5]),
      z: 0
    };
  }
  if (matrixType === `3d`) {
    return {
      x: Number.parseFloat(matrixValues[12]),
      y: Number.parseFloat(matrixValues[13]),
      z: Number.parseFloat(matrixValues[14])
    };
  }
  return { x: 0, y: 0, z: 0 };
};
var createAfter = (sibling, tagName) => {
  const el2 = document.createElement(tagName);
  sibling.parentElement?.insertBefore(el2, sibling.nextSibling);
  return el2;
};
var createIn = (parent, tagName) => {
  const el2 = document.createElement(tagName);
  parent.append(el2);
  return el2;
};
var clear = (parent) => {
  let c = parent.lastElementChild;
  while (c) {
    c.remove();
    c = parent.lastElementChild;
  }
};
var copyToClipboard = (object) => {
  const p = new Promise((resolve, reject) => {
    const string_ = import_json5.default.stringify(object);
    navigator.clipboard.writeText(JSON.stringify(string_)).then(
      () => {
        resolve(true);
      },
      (error) => {
        console.warn(`Could not copy to clipboard`);
        console.log(string_);
        reject(new Error(error));
      }
    );
  });
  return p;
};
var insertSorted = (parent, element) => {
  const elSort = element.getAttribute(`data-sort`) ?? ``;
  let elAfter;
  let elBefore;
  for (const c of parent.children) {
    const sort = c.getAttribute(`data-sort`) ?? ``;
    if (elSort >= sort)
      elAfter = c;
    if (elSort <= sort)
      elBefore = c;
    if (elAfter !== void 0 && elBefore !== void 0)
      break;
  }
  if (elAfter !== void 0) {
    elAfter.insertAdjacentElement(`afterend`, element);
  } else if (elBefore === void 0) {
    parent.append(element);
  } else {
    elBefore.insertAdjacentElement(`beforebegin`, element);
  }
};
var reconcileChildren = (parentEl, list, createUpdate) => {
  if (parentEl === null)
    throw new Error(`parentEl is null`);
  if (parentEl === void 0)
    throw new Error(`parentEl is undefined`);
  const seen = /* @__PURE__ */ new Set();
  for (const [key, value] of list) {
    const id = `c-${key}`;
    const el2 = parentEl.querySelector(`#${id}`);
    const finalEl = createUpdate(value, el2);
    if (el2 !== finalEl) {
      finalEl.id = id;
      parentEl.append(finalEl);
    }
    seen.add(id);
  }
  const prune = [];
  for (const child of parentEl.children) {
    if (!seen.has(child.id)) {
      prune.push(child);
    }
  }
  for (const p of prune)
    p.remove();
};
var setCssClass = (selectors, value, cssClass) => {
  const elements = resolveEls(selectors);
  if (elements.length === 0)
    return;
  for (const element of elements) {
    if (value)
      element.classList.add(cssClass);
    else
      element.classList.remove(cssClass);
  }
};
var setCssToggle = (selectors, cssClass) => {
  const elements = resolveEls(selectors);
  if (elements.length === 0)
    return;
  for (const element of elements) {
    element.classList.toggle(cssClass);
  }
};
var setCssDisplay = (selectors, value) => {
  const elements = resolveEls(selectors);
  if (elements.length === 0)
    return;
  for (const element of elements) {
    element.style.display = value;
  }
};
var byId = (id) => {
  const element = document.getElementById(id);
  if (element === null)
    throw new Error(`HTML element with id '${id}' not found`);
  return element;
};
var setHtml = (selectors, value) => {
  const elements = resolveEls(selectors);
  if (elements.length === 0)
    return;
  if (typeof value === `number`) {
    value = value.toString();
  }
  for (const element of elements) {
    element.innerHTML = value;
  }
};
var setText = (selectors, value) => {
  const elements = resolveEls(selectors);
  if (elements.length === 0)
    return;
  if (typeof value === `number`) {
    value = value.toString();
  }
  for (const element of elements) {
    element.textContent = value;
  }
};
var elRequery = (selectors) => {
  ({
    text: (value) => {
      setText(selectors, value);
    },
    html: (value) => {
      setHtml(selectors, value);
    },
    cssDisplay: (value) => {
      setCssDisplay(selectors, value);
    },
    cssClass: (value, cssClass) => {
      setCssClass(selectors, value, cssClass);
    },
    cssToggle: (cssClass) => {
      setCssToggle(selectors, cssClass);
    },
    el: () => resolveEl(selectors),
    els: () => resolveEls(selectors)
  });
};
var el = (selectors) => {
  const elements = resolveEls(selectors);
  return {
    text: (value) => {
      setText(elements, value);
    },
    html: (value) => {
      setHtml(elements, value);
    },
    cssDisplay: (value) => {
      setCssDisplay(elements, value);
    },
    cssClass: (value, cssClass) => {
      setCssClass(elements, value, cssClass);
    },
    cssToggle: (cssClass) => {
      setCssToggle(elements, cssClass);
    },
    el: () => elements[0],
    els: () => elements
  };
};

// src/dom/DataTable.ts
var DataTable_exports = {};
__export(DataTable_exports, {
  fromList: () => fromList,
  fromObject: () => fromObject
});
var import_json52 = __toESM(require_dist(), 1);
var toHtmlSimple = (v, options) => {
  if (v === null)
    return `(null)`;
  if (v === void 0)
    return `(undefined)`;
  if (typeof v === `boolean`)
    return v ? `true` : `false`;
  if (typeof v === `string`)
    return `"${v}"`;
  if (typeof v === `number`) {
    let vAsNumber = v;
    if (options.roundNumbers !== void 0)
      vAsNumber = round(options.roundNumbers, v);
    if (options.precision !== void 0)
      return vAsNumber.toFixed(options.precision);
    return vAsNumber.toString();
  }
  if (typeof v === `object`)
    return toTableSimple(v, options);
  return import_json52.default.stringify(v);
};
var toTableSimple = (v, options) => {
  let html = `<div style="display:grid; grid-template-columns: repeat(2, 1fr)">`;
  for (const entry of Object.entries(v)) {
    const value = toHtmlSimple(entry[1], options);
    html += `<div class="label" style="display:table-cell">${entry[0]}</div>
      <div class="data" style="display:table-cell">${value}</div>`;
  }
  html += `</div>`;
  return html;
};
var fromList = (parentOrQuery, data) => {
  const parent = resolveEl(parentOrQuery);
  let container = document.createElement(
    `DIV`
  );
  parent.append(container);
  const remove = () => {
    if (!container)
      return false;
    container.remove();
    container = void 0;
    return true;
  };
  const update = (data2) => {
    const seenTables = /* @__PURE__ */ new Set();
    for (const [key, value] of data2) {
      const tKey = `table-${key}`;
      seenTables.add(tKey);
      let t = parent.querySelector(`#${tKey}`);
      if (t === null) {
        t = document.createElement(`table`);
        if (!t)
          throw new Error(`Could not create table element`);
        t.id = tKey;
        parent.append(t);
      }
      updateElement(t, value);
    }
    const tables = Array.from(parent.querySelectorAll(`table`));
    for (const t of tables) {
      if (!seenTables.has(t.id)) {
        t.remove();
      }
    }
  };
  if (data)
    update(data);
  return { update, remove };
};
var updateElement = (t, data, opts = {}) => {
  const precision = opts.precision ?? 2;
  const idPrefix = opts.idPrefix ?? ``;
  const objectsAsTables = opts.objectsAsTables ?? false;
  if (data === void 0) {
    t.innerHTML = ``;
    return;
  }
  const seenRows = /* @__PURE__ */ new Set();
  for (const [key, value] of Object.entries(data)) {
    const domKey = `${idPrefix}-row-${key}`;
    seenRows.add(domKey);
    let rowEl = t.querySelector(`tr[data-key='${domKey}']`);
    if (rowEl === null) {
      rowEl = document.createElement(`tr`);
      t.append(rowEl);
      rowEl.setAttribute(`data-key`, domKey);
      const keyEl = document.createElement(`td`);
      keyEl.textContent = key;
      keyEl.classList.add(`label`);
      rowEl.append(keyEl);
    }
    let valEl = rowEl.querySelector(`td[data-key='${domKey}-val']`);
    if (valEl === null) {
      valEl = document.createElement(`td`);
      valEl.classList.add(`data`);
      valEl.setAttribute(`data-key`, `${domKey}-val`);
      rowEl.append(valEl);
    }
    let valueHTML;
    if (opts.formatter) {
      valueHTML = opts.formatter(value, key);
    }
    if (valueHTML === void 0) {
      if (typeof value === `object`) {
        valueHTML = objectsAsTables ? toTableSimple(value, opts) : import_json52.default.stringify(value);
      } else if (typeof value === `number`) {
        valueHTML = opts.roundNumbers ? Math.round(value).toString() : value.toFixed(precision);
      } else if (typeof value === `boolean`) {
        valueHTML = value ? `true` : `false`;
      } else if (typeof value === `string`) {
        valueHTML = `"${value}"`;
      } else {
        valueHTML = JSON.stringify(value);
      }
    }
    valEl.innerHTML = valueHTML;
  }
  const rows = Array.from(t.querySelectorAll(`tr`));
  for (const r of rows) {
    const key = r.getAttribute(`data-key`);
    if (!seenRows.has(key)) {
      r.remove();
    }
  }
};
var fromObject = (parentOrQuery, data, opts) => {
  const parent = resolveEl(parentOrQuery);
  const idPrefix = opts?.idPrefix ?? Math.floor(Math.random() * 1e3).toString();
  let t = document.createElement(`table`);
  parent.append(t);
  const remove = () => {
    if (!t)
      return false;
    t.remove();
    t = void 0;
    return true;
  };
  if (data)
    updateElement(t, data, opts);
  const update = (d) => {
    if (!t)
      throw new Error(`Table disposed`);
    updateElement(t, d, { ...opts, idPrefix });
  };
  return { remove, update };
};

// src/dom/DataDisplay.ts
var DataDisplay = class {
  dataTable;
  /**
   * Constructor
   * @param options Options
   */
  constructor(options = {}) {
    const theme = options.theme ?? `dark`;
    const existing = document.querySelector(`#ixfx-data-display`);
    if (existing !== null)
      throw new Error(`DataDisplay already loaded on this page`);
    const container = document.createElement(`div`);
    container.id = `ixfx-data-display`;
    container.classList.add(`theme-${theme}`);
    const css = document.createElement(`style`);
    css.textContent = `
    #ixfx-data-display {
      background: white;
      color: black;
      border: 2px solid hsl(0deg 0.61% 90%);
      border-radius: 4px;
      z-index: 1000;
      opacity: 40%;
      padding: 1em;
      font-family: monospace;
      position: fixed;
      right: 1em;
      top: 1em;
    }
    #ixfx-data-display.theme-dark {
      background: black;
      color: white;
      border: 2px solid hsl(0deg 0.61% 10%);
    }
    #ixfx-data-display:hover {
      opacity: 100%;
    }
    #ixfx-data-display table {
      border-collapse: collapse;
    }
    #ixfx-data-display tr:not(:last-child) {
      border-bottom: 2px solid hsl(0deg 0.61% 90%);
    }
    #ixfx-data-display.dark tr:not(:last-child) {
      border-bottom: 2px solid hsl(0deg 0.61% 10%);
    }
    #ixfx-data-display td {
      padding-bottom: 0.4em;
      padding-top: 0.4em;
    }
    #ixfx-data-display .label {
      color: hsl(0deg 0.61% 60%);
      text-align: right;
      padding-right: 0.5em;
    }
    #ixfx-data-display.theme-dark .label {
      color: gray;
    }
    `;
    container.style.display = `inline-block`;
    document.body.append(css);
    document.body.append(container);
    this.dataTable = fromObject(container, void 0, {
      objectsAsTables: true,
      roundNumbers: 2
    });
  }
  update(data) {
    this.dataTable.update(data);
  }
};

// src/data/ObjectTracker.ts
var ObjectTracker = class extends TrackerBase {
  //abstract onSeen(_p: Array<V>): SeenResultType;
  values;
  constructor(opts = {}) {
    super(opts);
    this.values = [];
  }
  onTrimmed() {
  }
  /**
   * Reduces size of value store to `limit`. 
   * Returns number of remaining items
   * @param limit
   */
  trimStore(limit) {
    if (limit >= this.values.length)
      return this.values.length;
    this.values = this.values.slice(-limit);
    return this.values.length;
  }
  /**
   * Allows sub-classes to be notified when a reset happens
   * @ignore
   */
  onReset() {
    this.values = [];
  }
  /**
   * Tracks a value
   * @ignore
   */
  filterData(p) {
    const ts = p.map(
      (v) => `at` in v ? v : {
        ...v,
        at: Date.now()
      }
    );
    const last = ts.at(-1);
    if (this.storeIntermediate)
      this.values.push(...ts);
    else
      switch (this.values.length) {
        case 0: {
          this.values.push(last);
          break;
        }
        case 1: {
          this.values.push(last);
          break;
        }
        case 2: {
          this.values[1] = last;
          break;
        }
      }
    return ts;
  }
  /**
   * Last seen value. If no values have been added, it will return the initial value
   */
  get last() {
    if (this.values.length === 1)
      return this.values[0];
    return this.values.at(-1);
  }
  /**
   * Returns the initial value
   */
  get initial() {
    return this.values.at(0);
  }
  /**
   * Returns number of recorded values (includes the initial value in the count)
   */
  get size() {
    return this.values.length;
  }
  /**
   * Returns the elapsed time, in milliseconds since the initial value
   */
  get elapsed() {
    return Date.now() - this.values[0].at;
  }
};

// src/data/PointTracker.ts
var PointTracker = class extends ObjectTracker {
  /**
   * Function that yields the relation from initial point
   */
  initialRelation;
  /**
   * Last result
   */
  lastResult;
  constructor(opts = {}) {
    super(opts);
  }
  onTrimmed() {
    this.initialRelation = void 0;
  }
  /**
   * Returns the last x coord
   */
  get x() {
    return this.last.x;
  }
  /**
   * Returns the last y coord
   */
  get y() {
    return this.last.y;
  }
  /**
   * @ignore
   */
  onReset() {
    super.onReset();
    this.lastResult = void 0;
    this.initialRelation = void 0;
  }
  seenEvent(p) {
    if (`getCoalescedEvents` in p) {
      const events = p.getCoalescedEvents();
      const asPoints = events.map((event) => ({ x: event.clientX, y: event.clientY }));
      return this.seen(...asPoints);
    } else {
      return this.seen({ x: p.clientX, y: p.clientY });
    }
  }
  /**
   * Tracks a point, returning data on its relation to the
   * initial point and the last received point.
   * 
   * Use {@link seenEvent} to track a raw `PointerEvent`.
   * 
   * @param _p Point
   */
  computeResults(_p) {
    const currentLast = this.last;
    const previousLast = this.values.at(-2);
    if (this.initialRelation === void 0 && this.initial) {
      this.initialRelation = relation(this.initial);
    } else if (this.initialRelation === void 0) {
      throw new Error(`Bug: No initialRelation, and this.inital is undefined?`);
    }
    const lastRelation = previousLast === void 0 ? relation(currentLast) : relation(previousLast);
    const initialRel = this.initialRelation(currentLast);
    const speed = previousLast === void 0 ? 0 : line_exports.length(previousLast, currentLast) / (currentLast.at - previousLast.at);
    const lastRel = {
      ...lastRelation(currentLast),
      speed
    };
    const r = {
      fromInitial: initialRel,
      fromLast: lastRel,
      values: [...this.values]
    };
    this.lastResult = r;
    return r;
  }
  /**
   * Returns a polyline representation of stored points.
   * Returns an empty array if points were not saved, or there's only one.
   */
  get line() {
    if (this.values.length === 1)
      return [];
    return line_exports.joinPointsToLines(...this.values);
  }
  /**
   * Returns a vector of the initial/last points of the tracker.
   * Returns as a polar coordinate
   */
  get vectorPolar() {
    return Vector_exports.fromLinePolar(this.lineStartEnd);
  }
  /**
   * Returns a vector of the initial/last points of the tracker.
   * Returns as a Cartesian coordinate
   */
  get vectorCartesian() {
    return Vector_exports.fromLineCartesian(this.lineStartEnd);
  }
  /**
   * Returns a line from initial point to last point.
   *
   * If there are less than two points, Lines.Empty is returned
   */
  get lineStartEnd() {
    const initial = this.initial;
    if (this.values.length < 2 || !initial)
      return line_exports.Empty;
    return {
      a: initial,
      b: this.last
    };
  }
  /**
   * Returns distance from latest point to initial point.
   * If there are less than two points, zero is returned.
   *
   * This is the direct distance from initial to last,
   * not the accumulated length.
   * @returns Distance
   */
  distanceFromStart() {
    const initial = this.initial;
    return this.values.length >= 2 && initial !== void 0 ? distance(initial, this.last) : 0;
  }
  /**
   * Difference between last point and the initial point, calculated
   * as a simple subtraction of x & y.
   *
   * `Points.Placeholder` is returned if there's only one point so far.
   */
  difference() {
    const initial = this.initial;
    return this.values.length >= 2 && initial !== void 0 ? subtract(this.last, initial) : Placeholder;
  }
  /**
   * Returns angle (in radians) from latest point to the initial point
   * If there are less than two points, undefined is return.
   * @returns Angle in radians
   */
  angleFromStart() {
    const initial = this.initial;
    if (initial !== void 0 && this.values.length > 2) {
      return angle(initial, this.last);
    }
  }
  /**
   * Returns the total length of accumulated points.
   * Returns 0 if points were not saved, or there's only one
   */
  get length() {
    if (this.values.length === 1)
      return 0;
    const l = this.line;
    return line_exports.length(l);
  }
};
var TrackedPointMap = class extends TrackedValueMap {
  constructor(opts = {}) {
    super((key, start) => {
      if (start === void 0)
        throw new Error(`Requires start point`);
      const p = new PointTracker({
        ...opts,
        id: key
      });
      p.seen(start);
      return p;
    });
  }
  /**
   * Track a PointerEvent
   * @param event
   */
  seenEvent(event) {
    if (`getCoalescedEvents` in event) {
      const events = event.getCoalescedEvents();
      const seens = events.map((subEvent) => super.seen(subEvent.pointerId.toString(), subEvent));
      return Promise.all(seens);
    } else {
      return Promise.all([super.seen(event.pointerId.toString(), event)]);
    }
  }
};
var pointsTracker = (opts = {}) => new TrackedPointMap(opts);
var pointTracker = (opts = {}) => new PointTracker(opts);

// src/dom/ElementSizing.ts
var fullSizeElement = (domQueryOrEl, onResized) => {
  const el2 = resolveEl(domQueryOrEl);
  const r = windowResize();
  const update = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    el2.setAttribute(`width`, width.toString());
    el2.setAttribute(`height`, height.toString());
    if (onResized !== void 0) {
      const bounds = {
        min: Math.min(width, height),
        max: Math.max(width, height),
        width,
        height,
        center: {
          x: width / 2,
          y: height / 2
        }
      };
      onResized({ el: el2, bounds });
    }
  };
  r.value(update);
  update();
  return r;
};
var parentSize = (domQueryOrEl, onResized, timeoutMs = 100) => {
  const el2 = resolveEl(domQueryOrEl);
  const parent = el2.parentElement;
  if (parent === null)
    throw new Error(`Element has no parent`);
  const ro = resizeObservable(parent, timeoutMs).value(
    (entries) => {
      const entry = entries.find((v) => v.target === parent);
      if (entry === void 0)
        return;
      const width = entry.contentRect.width;
      const height = entry.contentRect.height;
      el2.setAttribute(`width`, width + `px`);
      el2.setAttribute(`height`, height + `px`);
      if (onResized !== void 0) {
        const bounds = {
          min: Math.min(width, height),
          max: Math.max(width, height),
          width,
          height,
          center: { x: width / 2, y: height / 2 }
        };
        onResized({ el: el2, bounds });
      }
    }
  );
  return ro;
};

// src/dom/PointerVisualise.ts
var pointerVisualise = (elOrQuery, opts = {}) => {
  const touchRadius = opts.touchRadius ?? 45;
  const mouseRadius = opts.touchRadius ?? 20;
  const trace = opts.trace ?? false;
  const hue = opts.hue ?? 100;
  const startFillStyle = `hsla(${hue}, 100%, 10%, 10%)`;
  let currentHue = hue;
  const el2 = resolveEl(elOrQuery);
  const tracker = pointsTracker({
    storeIntermediate: trace
  });
  const svg = document.createElementNS(
    `http://www.w3.org/2000/svg`,
    `svg`
  );
  svg.id = `pointerVis`;
  svg.style.zIndex = `-1000`;
  svg.style.position = `fixed`;
  svg.style.top = `0`;
  svg.style.left = `0`;
  svg.style.width = `100%`;
  svg.style.height = `100%`;
  svg.style.boxSizing = `border-box`;
  svg.style.border = `3px solid red`;
  svg.style.pointerEvents = `none`;
  svg.style.touchAction = `none`;
  fullSizeElement(svg);
  let pointerCount = 0;
  const lostPointer = (event) => {
    const id = event.pointerId.toString();
    tracker.delete(id);
    currentHue = hue;
    svg.querySelector(`#pv-start-${id}`)?.remove();
    for (let index = 0; index < pointerCount + 10; index++) {
      svg.querySelector(`#pv-progress-${id}-${index}`)?.remove();
    }
    pointerCount = 0;
  };
  const trackPointer = async (event) => {
    const id = event.pointerId.toString();
    const pt = { x: event.x, y: event.y };
    const type = event.pointerType;
    if (event.type === `pointermove` && !tracker.has(id)) {
      return;
    }
    const info = await tracker.seen(event.pointerId.toString(), { x: event.clientX, y: event.clientY });
    if (info.values.length === 1) {
      const el3 = SvgElements_exports.circle(
        {
          ...info.values[0],
          radius: type === `touch` ? touchRadius : mouseRadius
        },
        svg,
        {
          fillStyle: startFillStyle
        },
        `#pv-start-${id}`
      );
      el3.style.pointerEvents = `none`;
      el3.style.touchAction = `none`;
    }
    const fillStyle = `hsla(${currentHue}, 100%, 50%, 50%)`;
    const el22 = SvgElements_exports.circle(
      { ...pt, radius: type === `touch` ? touchRadius : mouseRadius },
      svg,
      {
        fillStyle
      },
      `#pv-progress-${id}-${info.values.length}`
    );
    el22.style.pointerEvents = `none`;
    el22.style.touchAction = `none`;
    currentHue += 1;
    pointerCount = info.values.length;
  };
  document.body.append(svg);
  el2.addEventListener(`pointerdown`, trackPointer);
  el2.addEventListener(`pointermove`, trackPointer);
  el2.addEventListener(`pointerup`, lostPointer);
  el2.addEventListener(`pointerleave`, lostPointer);
  el2.addEventListener(`contextmenu`, (event) => {
    event.preventDefault();
  });
};

// src/dom/ErrorHandler.ts
var defaultErrorHandler = () => {
  let enabled = true;
  const container = document.createElement(`div`);
  container.style.color = `black`;
  container.style.border = `2px solid red`;
  container.style.backgroundColor = `hsl(0, 80%, 90%)`;
  container.style.padding = `1em`;
  container.style.display = `none`;
  container.style.top = `1em`;
  container.style.left = `1em`;
  container.style.position = `absolute`;
  container.style.fontFamily = `monospace`;
  const messageElement = document.createElement(`div`);
  messageElement.style.maxWidth = `50vw`;
  messageElement.style.maxHeight = `50vh`;
  messageElement.style.overflowY = `scroll`;
  container.innerHTML = `<h1>Error</h1>`;
  container.append(messageElement);
  const styleButton = (b) => {
    b.style.padding = `0.3em`;
    b.style.marginTop = `1em`;
  };
  const buttonClose = document.createElement(`button`);
  buttonClose.textContent = `Close`;
  buttonClose.addEventListener(`click`, () => {
    hide();
  });
  const buttonStop = document.createElement(`button`);
  buttonStop.textContent = `Stop displaying errors`;
  buttonStop.addEventListener(`click`, () => {
    enabled = false;
    hide();
  });
  styleButton(buttonClose);
  styleButton(buttonStop);
  container.append(buttonClose);
  container.append(buttonStop);
  document.body.append(container);
  const show = (ex) => {
    container.style.display = `inline`;
    messageElement.innerHTML += ex.stack ? `<pre>${ex.stack}</pre>` : `<p>${getErrorMessage(ex)}</p>`;
  };
  const hide = () => {
    container.style.display = `none`;
  };
  window.onerror = (message, url, lineNo, colNo, error) => {
    if (enabled) {
      if (error) {
        console.log(error);
        show(error);
      } else {
        console.log(message);
        show(message);
      }
    }
  };
  window.addEventListener(`unhandledrejection`, (event) => {
    console.log(event.reason);
    if (enabled) {
      show(event.reason);
    }
  });
  return { show, hide };
};

// src/dom/DragDrop.ts
var DragDrop_exports = {};
__export(DragDrop_exports, {
  draggable: () => draggable
});
var draggable = (elem, listener) => {
  let initial = point_exports.Placeholder;
  let token;
  const onParentClick = () => {
    const selected = elem.classList.contains(`drag-sel`);
    if (selected) {
      elem.classList.remove(`drag-sel`);
    }
  };
  const onElementClick = (event) => {
    const selected = elem.classList.contains(`drag-sel`);
    if (selected) {
      elem.classList.remove(`drag-sel`);
    } else {
      elem.classList.add(`drag-sel`);
    }
    event.stopPropagation();
  };
  elem.ownerDocument.addEventListener(`click`, onParentClick);
  elem.addEventListener(`click`, onElementClick);
  const dragCleanup = () => {
    elem.classList.remove(`drag-progress`);
    elem.ownerDocument.removeEventListener(`pointermove`, onPointerMove);
    elem.ownerDocument.removeEventListener(`pointerup`, onPointerUp);
    elem.ownerDocument.removeEventListener(`pointercancel`, onDragCancel);
  };
  const dispose = () => {
    console.log(`drag dispose`);
    if (elem.classList.contains(`drag-progress`)) {
      onDragCancel(void 0, `dispose`);
    } else {
      dragCleanup();
    }
    elem.ownerDocument.removeEventListener(`click`, onParentClick);
    elem.removeEventListener(`click`, onElementClick);
  };
  const onPointerMove = (moveEvent) => {
    moveEvent.preventDefault();
    moveEvent.stopPropagation();
    const offset = point_exports.isPlaceholder(initial) ? { x: moveEvent.offsetX, y: moveEvent.offsetY } : {
      x: moveEvent.x - initial.x,
      y: moveEvent.y - initial.y
    };
    const state = {
      delta: offset,
      initial,
      token
    };
    if (typeof listener.progress !== `undefined` && !listener.progress(state)) {
      onDragCancel(void 0, `discontinued`);
    }
  };
  const onPointerUp = (upEvent) => {
    dragCleanup();
    const offset = {
      x: upEvent.x - initial.x,
      y: upEvent.y - initial.y
    };
    const state = {
      initial,
      token,
      delta: offset
    };
    if (typeof listener.success !== `undefined`) {
      listener.success(state);
    }
  };
  const onDragCancel = (event, reason = `pointercancel`) => {
    dragCleanup();
    const state = {
      token,
      initial,
      delta: { x: -1, y: -1 }
    };
    if (typeof listener.abort !== `undefined`) {
      listener.abort(reason, state);
    }
  };
  elem.addEventListener(`pointerdown`, (event) => {
    const selected = elem.classList.contains(`drag-sel`);
    if (!selected)
      return;
    initial = { x: event.x, y: event.y };
    const s = typeof listener.start === `undefined` ? { allow: true, token } : listener.start();
    if (!s.allow)
      return;
    token = s.token;
    elem.classList.add(`drag-progress`);
    elem.ownerDocument.addEventListener(`pointermove`, onPointerMove);
    elem.ownerDocument.addEventListener(`pointerup`, onPointerUp);
    elem.ownerDocument.addEventListener(`pointercancel`, onDragCancel);
  });
  return dispose;
};

// src/dom/InlineConsole.ts
var inlineConsole = (opts = {}) => {
  const original = {
    log: console.log,
    error: console.error,
    warn: console.warn
  };
  const logElement = document.createElement(`DIV`);
  logElement.id = `ixfx-log`;
  logElement.style.position = `fixed`;
  logElement.style.left = `0px`;
  logElement.style.top = `0px`;
  logElement.style.pointerEvents = `none`;
  logElement.style.display = `none`;
  document.body.prepend(logElement);
  const logger = log(logElement, opts);
  const visibility = (show) => {
    logElement.style.display = show ? `block` : `none`;
  };
  console.error = (message, ...optionalParameters) => {
    logger.error(message);
    if (optionalParameters.length > 0) {
      logger.error(optionalParameters);
    }
    original.error(message, ...optionalParameters);
    visibility(true);
  };
  console.warn = (message, ...optionalParameters) => {
    logger.warn(message);
    if (optionalParameters.length > 0) {
      logger.warn(optionalParameters);
    }
    visibility(true);
  };
  console.log = (message, ...optionalParameters) => {
    logger.log(message);
    if (optionalParameters.length > 0) {
      logger.log(optionalParameters);
    }
    original.log(message, ...optionalParameters);
    visibility(true);
  };
  window.onerror = (event, source, lineno, _colno, error) => {
    const abbreviatedSource = source === void 0 ? `` : afterMatch(source, `/`, { fromEnd: true });
    const eventString = getErrorMessage(error);
    logger.error(eventString + ` (${abbreviatedSource}:${lineno})`);
    visibility(true);
  };
};

// src/dom/CssVariables.ts
var CssVariables_exports = {};
__export(CssVariables_exports, {
  parseAsAttributes: () => parseAsAttributes,
  setFromVariables: () => setFromVariables
});
var parseAsAttributes = (options) => {
  return options.map((opt) => {
    let defaultValue;
    if (Array.isArray(opt)) {
      defaultValue = opt[1];
      opt = opt[0];
    }
    const dash = opt.indexOf(`-`);
    if (dash < 0)
      throw new Error(`Simple expression expects form of: 'elementid-attribute'`);
    return {
      variable: opt,
      attribute: opt.slice(dash + 1),
      id: opt.slice(0, dash),
      defaultValue
    };
  });
};
var setFromVariables = (context, ...options) => {
  const contextEl = resolveEl(context);
  const style = window.getComputedStyle(contextEl);
  for (const opt of options) {
    const variable = afterMatch(opt.variable, `--`);
    let v = style.getPropertyValue(`--${variable}`);
    if (v === null || v.length === 0) {
      if (opt.defaultValue === void 0) {
        continue;
      } else {
        v = opt.defaultValue;
      }
    }
    let query;
    let els;
    if (`query` in opt && opt.query !== void 0) {
      query = opt.query;
    } else if (`id` in opt && opt.id !== void 0) {
      query = `#${opt.id}`;
    } else if (`element` in opt && opt.element !== void 0) {
      els = Array.isArray(opt.element) ? opt.element : [opt.element];
    }
    if (query === void 0) {
      if (els === void 0) {
        throw new Error(`Missing query, id or element`);
      }
    } else {
      els = [...contextEl.querySelectorAll(query)];
    }
    if (els === null)
      continue;
    if (els === void 0)
      continue;
    if (opt.attribute) {
      for (const el2 of els) {
        el2.setAttribute(opt.attribute, v);
      }
    } else if (opt.field) {
      for (const el2 of els) {
        el2[opt.field] = v;
      }
    } else {
      throw new Error(`Neither 'attribute' or 'field' to set is defined in option (${JSON.stringify(opt)})`);
    }
  }
};

// src/dom/CanvasHelper.ts
var canvasHelper = (domQueryOrEl, opts) => {
  if (!domQueryOrEl)
    throw new Error(`domQueryOrEl is null or undefined`);
  const el2 = resolveEl(domQueryOrEl);
  if (el2.nodeName !== `CANVAS`) {
    throw new Error(`Expected CANVAS HTML element. Got: ${el2.nodeName}`);
  }
  const fullSize = opts.fullSize ?? true;
  const ratio = Math.round(window.devicePixelRatio) || 1;
  const scaleBy = opts.scaleBy ?? `both`;
  let scaler = Scaler_exports.scaler(`both`);
  const updateDimensions = (rect) => {
    scaler = Scaler_exports.scaler(scaleBy, rect);
    const pixelScaled = multiply(rect, ratio, ratio);
    el2.width = pixelScaled.width;
    el2.height = pixelScaled.height;
    el2.style.width = rect.width + `px`;
    el2.style.height = rect.height + `px`;
  };
  const onWindowResize = () => {
    const innerWindow = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    updateDimensions(innerWindow);
  };
  const getContext = () => {
    const ctx = el2.getContext(`2d`);
    if (ctx === null)
      throw new Error(`Could not create drawing context`);
    ctx.scale(ratio, ratio);
  };
  if (fullSize) {
    const r = windowResize();
    r.value(onWindowResize);
  }
  return {
    abs: scaler.abs,
    rel: scaler.rel,
    getContext
  };
};

export {
  PointTracker,
  TrackedPointMap,
  pointsTracker,
  pointTracker,
  log,
  pointScaler,
  positionFn,
  cardinalPosition,
  positionRelative,
  viewportToSpace,
  positionFromMiddle,
  cycleCssClass,
  getTranslation,
  createAfter,
  createIn,
  clear,
  copyToClipboard,
  insertSorted,
  reconcileChildren,
  setCssClass,
  setCssToggle,
  setCssDisplay,
  byId,
  setHtml,
  setText,
  elRequery,
  el,
  DataTable_exports,
  DataDisplay,
  fullSizeElement,
  parentSize,
  pointerVisualise,
  defaultErrorHandler,
  DragDrop_exports,
  inlineConsole,
  CssVariables_exports,
  canvasHelper,
  dom_exports
};
