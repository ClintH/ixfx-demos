import {
  round
} from "./chunk-6YLYFKO3.js";
import "./chunk-EIQV725C.js";
import "./chunk-ZSSYQQHP.js";
import "./chunk-DUNDLGZO.js";
import "./chunk-BIZA3WZ7.js";
import "./chunk-VE7DK22H.js";

// src/Compare.ts
var changedDataFields = (a, b) => {
  const r = compareData(a, b, true);
  if (Object.entries(r.added).length > 0)
    throw new Error(`Shape of data has changed`);
  if (Object.entries(r.removed).length > 0)
    throw new Error(`Shape of data has changed`);
  const output = compareResultToObject(r, b);
  return output;
};
var compareResultToObject = (r, b) => {
  const output = {};
  if (r.isArray) {
    return b;
  }
  for (const entry of Object.entries(r.changed)) {
    output[entry[0]] = entry[1];
  }
  for (const entry of Object.entries(r.added)) {
    output[entry[0]] = entry[1];
  }
  for (const childEntry of Object.entries(r.children)) {
    if (childEntry[1].hasChanged) {
      output[childEntry[0]] = compareResultToObject(childEntry[1], b[childEntry[0]]);
    }
  }
  return output;
};
var compareData = (a, b, assumeSameShape = false) => {
  const entriesA = Object.entries(a);
  const entriesB = Object.entries(b);
  const scannedKeys = /* @__PURE__ */ new Set();
  const changed = {};
  const added = {};
  const children = {};
  const removed = [];
  const isArray = Array.isArray(a);
  const summary = new Array();
  let hasChanged = false;
  for (const entry of entriesA) {
    const outputKey = isArray ? `_${entry[0]}` : entry[0];
    const aValue = entry[1];
    const bValue = b[entry[0]];
    scannedKeys.add(entry[0]);
    if (bValue === void 0) {
      hasChanged = true;
      if (assumeSameShape && !isArray) {
        changed[outputKey] = bValue;
        summary.push([`mutate`, outputKey, bValue]);
      } else {
        removed.push(outputKey);
        summary.push([`del`, outputKey, aValue]);
      }
      continue;
    }
    if (typeof aValue === `object`) {
      const r = compareData(aValue, bValue, assumeSameShape);
      if (r.hasChanged)
        hasChanged = true;
      children[outputKey] = r;
      const childSummary = r.summary.map((sum) => {
        return [sum[0], outputKey + `.` + sum[1], sum[2]];
      });
      summary.push(...childSummary);
    } else {
      if (aValue !== bValue) {
        changed[outputKey] = bValue;
        hasChanged = true;
        summary.push([`mutate`, outputKey, bValue]);
      }
    }
  }
  if (!assumeSameShape || isArray) {
    for (const entry of entriesB) {
      const key = isArray ? `_${entry[0]}` : entry[0];
      if (scannedKeys.has(entry[0]))
        continue;
      added[key] = entry[1];
      hasChanged = true;
      summary.push([`add`, key, entry[1]]);
    }
  }
  return {
    changed,
    added,
    removed,
    children,
    hasChanged,
    isArray,
    summary
  };
};

// src/web-components/DataDisplay.ts
var DataDisplayComponent = class _DataDisplayComponent extends HTMLElement {
  previousValue;
  _shadow;
  _container;
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: `open` });
    this._container = document.createElement(`section`);
    const style = document.createElement(`style`);
    style.textContent = `
    section {
      background: white;
      color: black;
      border: 2px solid hsl(0deg 0.61% 90%);
      padding: 1em;
      font-family: monospace;
      display:grid;
      grid-template-cols: repeat(2, 1fr);
    }
    div {
      border:1px solid black;
    }
    `;
    this._shadow.append(style, this._container);
  }
  formatValue(v, options = {}) {
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
    return JSON.stringify(v);
  }
  displayData(o) {
    for (const [key, value] of Object.entries(o)) {
      const domKey = `path-${key}`;
      if (typeof value === `object`) {
        const element = this.getOrCreate(domKey, (parent) => {
          parent.classList.add(`row`, `nested`);
          const label = document.createElement(`label`);
          label.textContent = key;
          const valueElement2 = new _DataDisplayComponent();
          parent.append(label, valueElement2);
        });
        const valueElement = element.querySelector(`data-display`);
        if (valueElement !== null) {
          valueElement.update(value);
        }
      } else {
        const element = this.getOrCreate(domKey, (parent) => {
          parent.classList.add(`row`);
          const label = document.createElement(`label`);
          label.textContent = key;
          const valueElement2 = document.createElement(`div`);
          valueElement2.textContent = this.formatValue(value);
          parent.append(label, valueElement2);
        });
        const valueElement = element.querySelector(`div`);
        if (valueElement === null) {
          debugger;
        } else {
          valueElement.innerHTML = this.formatValue(value);
        }
      }
    }
  }
  getOrCreate(path, init) {
    const element = this._shadow.getElementById(path);
    if (element !== null)
      return element;
    const elementCreated = document.createElement(`div`);
    elementCreated.id = path;
    if (init)
      init(elementCreated);
    this._container.append(elementCreated);
    return elementCreated;
  }
  update(value) {
    if (this.previousValue === void 0) {
      this.displayData(value);
    } else {
      this.displayData(changedDataFields(this.previousValue, value));
    }
    this.previousValue = value;
  }
};
customElements.define(`data-display`, DataDisplayComponent);
export {
  DataDisplayComponent
};
//# sourceMappingURL=webcomponents.js.map