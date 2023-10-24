import {
  getSorter
} from "./chunk-6YLYFKO3.js";
import "./chunk-EIQV725C.js";
import "./chunk-ZSSYQQHP.js";
import "./chunk-DUNDLGZO.js";
import "./chunk-BIZA3WZ7.js";
import {
  __decorateClass,
  __publicField
} from "./chunk-VE7DK22H.js";

// src/components/HistogramVis.ts
import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators/custom-element.js";
import { property } from "lit/decorators/property.js";
import { repeat } from "lit/directives/repeat.js";
var jsonData = (object) => {
  if (object === null || object === void 0 || object === `undefined`)
    return;
  try {
    if (typeof object === `string`) {
      if (object.length === 0)
        return;
      const o = JSON.parse(object);
      if (!Array.isArray(o)) {
        console.error(`Histogram innerText should be JSON array`);
        return;
      }
      for (const [index, element] of o.entries()) {
        if (!Array.isArray(element)) {
          console.error(`Histogram array should consist of inner arrays`);
          return;
        }
        if (element.length !== 2) {
          console.error(
            `Histogram inner arrays should consist of two elements`
          );
          return;
        }
        if (typeof element[0] !== `string`) {
          console.error(
            `First element of inner array should be a string (index ${index})`
          );
          return;
        }
        if (typeof element[1] !== `number`) {
          console.error(
            `Second element of inner array should be a number (index ${index})`
          );
          return;
        }
      }
      return o;
    }
  } catch (error) {
    console.log(object);
    console.error(error);
  }
  return;
};
var HistogramVis = class extends LitElement {
  constructor() {
    super();
    this.data = [];
    this.showDataLabels = true;
    this.height = `100%`;
    this.showXAxis = true;
    this.json = void 0;
  }
  connectedCallback() {
    if (!this.hasAttribute(`json`)) {
      this.setAttribute(`json`, this.innerText);
    }
    super.connectedCallback();
  }
  barTemplate(bar, index, _totalBars) {
    const { percentage } = bar;
    const [key, freq] = bar.data;
    const rowStart = 1;
    const rowEnd = 2;
    const colStart = index + 1;
    const colEnd = colStart + 1;
    const dataLabel = html`<div class="data">${freq}</div>`;
    const xAxis = html`${key}`;
    return html`
      <div
             class="bar"
             style="grid-area: ${rowStart} / ${colStart} / ${rowEnd} / ${colEnd}"
           >
             <div class="barTrack" style="height: ${(percentage ?? 0) * 100}%"></div>
             ${this.showDataLabels ? dataLabel : ``}
           </div>
           <div
             class="xAxisLabels"
             style="grid-area: ${rowStart + 2} / ${colStart} / ${rowEnd + 2} / ${colEnd}"
           >
             ${this.showXAxis ? xAxis : ``}
           </div>
    `;
  }
  render() {
    if ((this.data === void 0 || this.data.length === 0) && this.json === void 0) {
      return html``;
    }
    const d = this.data ?? this.json;
    const length = d.length;
    const highestCount = Math.max(...d.map((d2) => d2[1]));
    const bars = d.map((kv) => ({
      data: kv,
      percentage: kv[1] / highestCount
    }));
    const xAxis = html`
      <div
            class="xAxis"
            style="grid-area: 2 / 1 / 3 / ${d.length + 1}"
          ></div>
    `;
    const height = this.height ? `height: ${this.height};` : ``;
    const h = html`
      <style>
             div.chart {
               grid-template-columns: repeat(${d.length}, minmax(2px, 1fr));
             }
           </style>
           <div class="container" style="${height}">
             <div class="chart">
               ${repeat(
      bars,
      (bar) => bar.data[0],
      (b, index) => this.barTemplate(b, index, length)
    )}
               ${this.showXAxis ? xAxis : ``}
             </div>
           </div>
    `;
    return h;
  }
};
__publicField(HistogramVis, "styles", css`
    :host {
    }
    div.container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    div.chart {
      display: grid;
      flex: 1;
      grid-template-rows: 1fr 1px min-content;
      justify-items: center;
    }
    div.bar {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      justify-self: normal;
      padding-left: 0.3vw;
      padding-right: 0.3vw;
    }
    div.bar > div.barTrack {
      background-color: var(--histogram-bar-color, gray);
      align-self: stretch;
    }
    div.xAxisLabels,
    div.data {
      font-size: min(1vw, 1em);
      color: var(--histogram-label-color, currentColor);
    }
    div.xAxisLabels {
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      text-align: center;
    }
    div.xAxis {
      background-color: var(--histogram-axis-color, silver);
      width: 100%;
      height: 100%;
    }
  `);
__decorateClass([
  property()
], HistogramVis.prototype, "data", 2);
__decorateClass([
  property()
], HistogramVis.prototype, "showDataLabels", 2);
__decorateClass([
  property()
], HistogramVis.prototype, "height", 2);
__decorateClass([
  property()
], HistogramVis.prototype, "showXAxis", 2);
__decorateClass([
  property({ converter: jsonData, type: Object })
], HistogramVis.prototype, "json", 2);
HistogramVis = __decorateClass([
  customElement(`histogram-vis`)
], HistogramVis);

// src/components/FrequencyHistogramPlot.ts
var FrequencyHistogramPlot = class {
  //readonly parentEl:HTMLElement;
  // eslint-disable-next-line functional/prefer-readonly-type
  el;
  // eslint-disable-next-line functional/prefer-readonly-type
  #sorter;
  //eslint-disable-next-line functional/prefer-immutable-types
  constructor(el) {
    this.el = el;
  }
  setAutoSort(sortStyle) {
    this.#sorter = getSorter(sortStyle);
  }
  clear() {
    if (this.el === void 0)
      return;
    this.el.data = [];
  }
  // init() {
  //   if (this.el !== undefined) return; // already inited
  //   // eslint-disable-next-line functional/immutable-data
  //   this.el = document.createElement(`histogram-vis`);
  //   this.parentEl.appendChild(this.el);
  // }
  dispose() {
    const el = this.el;
    if (el === void 0)
      return;
    el.remove();
  }
  update(data) {
    if (this.el === void 0) {
      console.warn(`FrequencyHistogramPlot this.el undefined`);
      return;
    }
    if (this.#sorter === void 0) {
      this.el.data = [...data];
    } else {
      this.el.data = this.#sorter(data);
    }
  }
};
export {
  FrequencyHistogramPlot,
  HistogramVis
};
//# sourceMappingURL=components.js.map