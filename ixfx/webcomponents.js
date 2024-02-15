import {
  changedDataFields
} from "./chunk-VPVY4V72.js";
import "./chunk-QHMHQL3M.js";
import "./chunk-KPH2Y2KE.js";
import "./chunk-NCKQMQK4.js";
import "./chunk-QY5LFF2P.js";
import {
  round
} from "./chunk-TXGBPR3B.js";
import "./chunk-OFL7SXB4.js";
import "./chunk-NK6HAYS3.js";
import "./chunk-Z2KIHL7P.js";
import "./chunk-TVFDG2SY.js";
import "./chunk-LLFBMR3M.js";
import "./chunk-TPDZCJAQ.js";
import "./chunk-OIMRACQX.js";
import "./chunk-7WLVSHT7.js";
import "./chunk-HXJ3OV5R.js";
import "./chunk-BPBV6L7W.js";
import "./chunk-J2Z65AN3.js";
import "./chunk-Z2HKKABB.js";
import "./chunk-JNUBDOCI.js";
import "./chunk-EKX6PMDK.js";
import "./chunk-EG2IYMCR.js";
import "./chunk-Q2EHUQVZ.js";

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