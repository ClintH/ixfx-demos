import {
  changedDataFields
} from "./chunk-DWAKOV2F.js";
import {
  round
} from "./chunk-S5D7YRXR.js";
import "./chunk-HOGLR6UM.js";
import "./chunk-6UZ3OSJO.js";
import "./chunk-CSXWZ3IC.js";
import "./chunk-L5EJU35C.js";

// src/web-components/DataDisplay.ts
var DataDisplayComponent = class _DataDisplayComponent extends HTMLElement {
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
    if (v === null) return `(null)`;
    if (v === void 0) return `(undefined)`;
    if (typeof v === `boolean`) return v ? `true` : `false`;
    if (typeof v === `string`) return `"${v}"`;
    if (typeof v === `number`) {
      let vAsNumber = v;
      if (options.roundNumbers !== void 0) vAsNumber = round(options.roundNumbers, v);
      if (options.precision !== void 0) return vAsNumber.toFixed(options.precision);
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
    if (element !== null) return element;
    const elementCreated = document.createElement(`div`);
    elementCreated.id = path;
    if (init) init(elementCreated);
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