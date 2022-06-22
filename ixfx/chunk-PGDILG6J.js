import {
  SvgElements_exports
} from "./chunk-WDOIF2B2.js";
import {
  joinPointsToLines,
  length,
  relation
} from "./chunk-MBFM23RZ.js";
import {
  getOrGenerate
} from "./chunk-LTK4DV2D.js";
import {
  Forms_exports
} from "./chunk-STULEM3H.js";
import {
  clear,
  copyToClipboard,
  createAfter,
  createIn,
  dataTable,
  dataTableList,
  fromEvent,
  fullSizeCanvas,
  fullSizeElement,
  getTranslation,
  map,
  parentSize,
  parentSizeCanvas,
  reconcileChildren,
  resizeObservable,
  resolveEl,
  themeChangeObservable,
  windowResize
} from "./chunk-OBKVGNTY.js";
import {
  __export,
  __publicField
} from "./chunk-6SYKIMQH.js";

// src/dom/index.ts
var dom_exports = {};
__export(dom_exports, {
  Forms: () => Forms_exports,
  clear: () => clear,
  copyToClipboard: () => copyToClipboard,
  createAfter: () => createAfter,
  createIn: () => createIn,
  dataTable: () => dataTable,
  dataTableList: () => dataTableList,
  fullSizeCanvas: () => fullSizeCanvas,
  fullSizeElement: () => fullSizeElement,
  getTranslation: () => getTranslation,
  log: () => log,
  parentSize: () => parentSize,
  parentSizeCanvas: () => parentSizeCanvas,
  pointerVisualise: () => pointerVisualise,
  reconcileChildren: () => reconcileChildren,
  resizeObservable: () => resizeObservable,
  resolveEl: () => resolveEl,
  rx: () => rx,
  themeChangeObservable: () => themeChangeObservable,
  windowResize: () => windowResize
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
  shadowRoot.appendChild(styleEl);
  return shadowRoot;
};

// src/dom/Log.ts
var log = (domQueryOrEl, opts = {}) => {
  const { capacity = 0, monospaced = true, timestamp = false, collapseDuplicates = true, css = `` } = opts;
  let added = 0;
  let lastLog;
  let lastLogRepeats = 0;
  const parentEl = resolveEl(domQueryOrEl);
  const fontFamily = monospaced ? `Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", Monaco, "Courier New", Courier, monospace` : `normal`;
  const shadowRoot = addShadowCss(parentEl, `
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
    word-break: break-all;

  }
  ${css}
  `);
  const el = document.createElement(`div`);
  el.className = `log`;
  shadowRoot.append(el);
  const error = (msgOrError) => {
    const line = document.createElement(`div`);
    if (typeof msgOrError === `string`) {
      line.innerHTML = msgOrError;
    } else if (msgOrError instanceof Error) {
      const stack = msgOrError.stack;
      if (stack === void 0) {
        line.innerHTML = msgOrError.toString();
      } else {
        line.innerHTML = stack.toString();
      }
    } else {
      line.innerHTML = msgOrError;
    }
    line.classList.add(`error`);
    append(line);
    lastLog = void 0;
    lastLogRepeats = 0;
  };
  let lastLogTime = 0;
  const log2 = (whatToLog = ``) => {
    let msg;
    const interval = window.performance.now() - lastLogTime;
    if (opts.minIntervalMs && interval < opts.minIntervalMs)
      return;
    lastLogTime = window.performance.now();
    if (typeof whatToLog === `object`) {
      msg = JSON.stringify(whatToLog);
    } else if (whatToLog === void 0) {
      msg = `(undefined)`;
    } else if (whatToLog === null) {
      msg = `(null)`;
    } else if (typeof whatToLog === `number`) {
      if (Number.isNaN(msg))
        msg = `(NaN)`;
      msg = whatToLog.toString();
    } else {
      msg = whatToLog;
    }
    if (msg.length === 0) {
      const rule = document.createElement(`hr`);
      lastLog = void 0;
      append(rule);
    } else if (msg === lastLog && collapseDuplicates) {
      const lastEl = el.firstElementChild;
      let lastBadge = lastEl.querySelector(`.badge`);
      if (lastBadge === null) {
        lastBadge = document.createElement(`div`);
        lastBadge.className = `badge`;
        lastEl.insertAdjacentElement(`beforeend`, lastBadge);
      }
      if (lastEl !== null) {
        lastBadge.textContent = (++lastLogRepeats).toString();
      }
      return lastEl;
    } else {
      const line = document.createElement(`div`);
      line.innerText = msg;
      append(line);
      lastLog = msg;
      return line;
    }
  };
  const append = (line) => {
    if (timestamp) {
      const wrapper = document.createElement(`div`);
      const timestamp2 = document.createElement(`div`);
      timestamp2.className = `timestamp`;
      timestamp2.innerText = new Date().toLocaleTimeString();
      wrapper.append(timestamp2, line);
      line.classList.add(`msg`);
      wrapper.classList.add(`line`);
      line = wrapper;
    } else {
      line.classList.add(`line`, `msg`);
    }
    if (opts.reverse) {
      el.appendChild(line);
    } else {
      el.insertBefore(line, el.firstChild);
    }
    if (capacity > 0 && ++added > capacity * 2) {
      while (added > capacity) {
        el.lastChild?.remove();
        added--;
      }
    }
    if (opts.reverse) {
      el.scrollTop = el.scrollHeight;
    }
    lastLogRepeats = 0;
  };
  const clear2 = () => {
    el.innerHTML = ``;
    lastLog = void 0;
    lastLogRepeats = 0;
    added = 0;
  };
  const dispose = () => {
    el.remove();
  };
  return {
    error,
    log: log2,
    append,
    clear: clear2,
    dispose,
    get isEmpty() {
      return added === 0;
    }
  };
};

// src/dom/DomRx.ts
var rx = (elOrQuery, event, opts) => {
  const el = resolveEl(elOrQuery);
  const ev = fromEvent(el, event);
  const value = {};
  const clear2 = () => {
    const keys = Object.keys(value);
    keys.forEach((key) => {
      delete value[key];
    });
  };
  const setup = (sub) => {
    sub.subscribe({
      next: (newValue) => {
        Object.assign(value, newValue);
      }
    });
    return {
      value,
      clear: clear2
    };
  };
  if (opts === void 0)
    return setup(ev);
  if (opts.pluck) {
    return setup(ev.pipe(map((x) => x[opts.pluck])));
  } else if (opts.transform) {
    return setup(ev.pipe(map((x) => opts.transform(x))));
  }
  return setup(ev);
};

// src/temporal/PointTracker.ts
var TrackedValue = class {
  constructor(id, start, storeIntermediate) {
    this.id = id;
    this.storeIntermediate = storeIntermediate;
    __publicField(this, "values");
    const s = { ...start, at: Date.now() };
    this.values = [s];
  }
  seen(...p) {
    const ts = p.map((v) => `at` in v ? v : {
      ...v,
      at: Date.now()
    });
    const last = ts.at(-1);
    if (this.storeIntermediate)
      this.values.push(...ts);
    else if (this.values.length === 2) {
      this.values[1] = last;
    } else {
      this.values.push(last);
    }
  }
  get last() {
    return this.values.at(-1);
  }
  get size() {
    return this.values.length;
  }
  get elapsed() {
    return Date.now() - this.values[0].at;
  }
};
var TrackedPoint = class extends TrackedValue {
  constructor(id, start, storePoints) {
    super(id, start, storePoints);
    this.id = id;
    this.storePoints = storePoints;
    __publicField(this, "relation");
    const s = { x: start.x, y: start.y, at: Date.now() };
    this.relation = relation(s);
  }
  get x() {
    return this.last?.x;
  }
  get y() {
    return this.last?.y;
  }
  seen(...p) {
    const currentLast = this.last;
    super.seen(...p);
    const newLast = this.last;
    const rel = this.relation(newLast);
    const r = {
      ...rel,
      values: this.values,
      speed: length(currentLast, newLast) / (newLast.at - currentLast.at)
    };
    return r;
  }
  get line() {
    if (this.values.length === 1)
      return [];
    return joinPointsToLines(...this.values);
  }
  get length() {
    if (this.values.length === 1)
      return 0;
    const l = this.line;
    return length(l);
  }
};
var TrackedValueMap = class {
  constructor(creator, opts = {}) {
    __publicField(this, "store");
    __publicField(this, "gog");
    this.store = /* @__PURE__ */ new Map();
    this.gog = getOrGenerate(this.store, creator);
  }
  get size() {
    return this.store.size;
  }
  has(id) {
    return this.store.has(id);
  }
  async seenImpl(id, ...values) {
    const trackedValue = await this.seenValue(id, ...values);
    trackedValue.seen(...values);
  }
  async seenValue(id, ...values) {
    if (id === null)
      throw new Error(`id parameter cannot be null`);
    if (id === void 0)
      throw new Error(`id parameter cannot be undefined`);
    const trackedValue = await this.gog(id, values[0]);
    return trackedValue;
  }
  delete(id) {
    this.store.delete(id);
  }
  reset() {
    this.store = /* @__PURE__ */ new Map();
  }
  *ids() {
    yield* this.store.keys();
  }
  *values() {
    yield* this.store.values();
  }
  getByAge() {
    const tp = Array.from(this.store.values());
    tp.sort((a, b) => {
      const aa = a.elapsed;
      const bb = b.elapsed;
      if (aa === bb)
        return 0;
      if (aa > bb)
        return -1;
      return 1;
    });
    return tp;
  }
  *lastPoints() {
    for (const p of this.store.values()) {
      yield p.last;
    }
  }
  *startValues() {
    for (const p of this.store.values()) {
      yield p.values[0];
    }
  }
  get(id) {
    return this.store.get(id);
  }
};
var TrackedPointMap = class extends TrackedValueMap {
  constructor(opts) {
    super((key, start) => {
      if (start === void 0)
        throw new Error(`Requires start point`);
      return new TrackedPoint(key, start, opts.trackIntermediatePoints ?? false);
    }, opts);
  }
  async seen(id, ...values) {
    const trackedValue = await this.seenValue(id, ...values);
    return trackedValue.seen(...values);
  }
};
var pointTracker = (opts) => new TrackedPointMap(opts);

// src/dom/PointerVisualise.ts
var pointerVisualise = (elOrQuery, opts = {}) => {
  const touchRadius = opts.touchRadius ?? 45;
  const mouseRadius = opts.touchRadius ?? 20;
  const trace = opts.trace ?? false;
  const hue = opts.hue ?? 100;
  const startFillStyle = `hsla(${hue}, 100%, 10%, 10%)`;
  let currentHue = hue;
  const el = resolveEl(elOrQuery);
  const tracker = pointTracker({
    trackIntermediatePoints: trace
  });
  const svg = document.createElementNS(`http://www.w3.org/2000/svg`, `svg`);
  svg.id = `pointerVis`;
  svg.style.zIndex = `100`;
  svg.style.position = `fixed`;
  svg.style.top = `0`;
  svg.style.left = `0`;
  svg.style.width = `100%`;
  svg.style.height = `100%`;
  svg.style.boxSizing = `border-box`;
  svg.style.border = `3px solid red`;
  fullSizeElement(svg);
  let pointerCount = 0;
  const lostPointer = async (ev) => {
    const id = ev.pointerId.toString();
    tracker.delete(id);
    currentHue = hue;
    svg.querySelector(`#pv-start-${id}`)?.remove();
    for (let i = 0; i < pointerCount + 1; i++) {
      svg.querySelector(`#pv-progress-${id}-${i}`)?.remove();
    }
    pointerCount = 0;
  };
  const trackPointer = async (ev) => {
    const id = ev.pointerId.toString();
    const pt = { x: ev.x, y: ev.y };
    const type = ev.pointerType;
    if (ev.type === `pointermove` && !tracker.has(id))
      return;
    const info = await tracker.seen(id, pt);
    if (info.values.length === 1) {
      SvgElements_exports.circle({ ...info.values[0], radius: type === `touch` ? touchRadius : mouseRadius }, svg, {
        fillStyle: startFillStyle
      }, `#pv-start-${id}`);
    }
    const progressFillStyle = `hsla(${currentHue}, 100%, 50%, 50%)`;
    SvgElements_exports.circle({ ...pt, radius: type === `touch` ? touchRadius : mouseRadius }, svg, {
      fillStyle: progressFillStyle
    }, `#pv-progress-${id}-${info.values.length}`);
    currentHue += 1;
    pointerCount = info.values.length;
  };
  document.body.appendChild(svg);
  el.addEventListener(`pointerdown`, trackPointer);
  el.addEventListener(`pointermove`, trackPointer);
  el.addEventListener(`pointerup`, lostPointer);
  el.addEventListener(`pointerleave`, lostPointer);
};

export {
  pointTracker,
  log,
  rx,
  pointerVisualise,
  dom_exports
};
//# sourceMappingURL=chunk-PGDILG6J.js.map