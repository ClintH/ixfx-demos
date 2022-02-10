import {
  Forms_exports
} from "./chunk-ZU4WHOHB.js";
import {
  copyToClipboard,
  createAfter,
  createIn,
  fromEvent,
  fullSizeCanvas,
  map,
  parentSize,
  parentSizeCanvas,
  resizeObservable,
  resolveEl,
  themeChangeObservable,
  windowResize
} from "./chunk-BER7IJSK.js";
import {
  __export
} from "./chunk-YDTVC7MM.js";

// src/dom/index.ts
var dom_exports = {};
__export(dom_exports, {
  Forms: () => Forms_exports,
  copyToClipboard: () => copyToClipboard,
  createAfter: () => createAfter,
  createIn: () => createIn,
  fullSizeCanvas: () => fullSizeCanvas,
  log: () => log,
  parentSize: () => parentSize,
  parentSizeCanvas: () => parentSizeCanvas,
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
  const { capacity = 0, monospaced = true, timestamp = false, collapseDuplicates = true } = opts;
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
  }
  .timestamp {
    margin-right: 0.5em;
    opacity: 0.5;
    font-size: 70%;
    align-self: center;
  }
  .line {
    display: flex;
  }
  .line:hover {
    background-color: var(--theme-bg-hover, whitesmoke);
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
  }
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
    } else {
      const line = document.createElement(`div`);
      line.innerHTML = msg;
      append(line);
      lastLog = msg;
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
    el.insertBefore(line, el.firstChild);
    if (capacity > 0 && ++added > capacity * 2) {
      while (added > capacity) {
        el.lastChild?.remove();
        added--;
      }
    }
    lastLogRepeats = 0;
  };
  const clear = () => {
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
    clear,
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
  const clear = () => {
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
      clear
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

export {
  log,
  rx,
  dom_exports
};
