import * as lit_html from 'lit-html';
import * as lit from 'lit';
import { LitElement, PropertyValues } from 'lit';
import { K as KeyValue } from './PrimitiveTypes-HWqXs_XP.js';
import { Ref } from 'lit/directives/ref.js';
import { C as CanvasHelper } from './CanvasHelper-bmixRaHe.js';
import { a as RectPositioned, R as Rect } from './RectTypes-kjDrC-8b.js';
import { C as Colourish } from './Colour-Dzx2zUdg.js';
import { D as DrawingHelper } from './Drawing-mtp-emr9.js';
import './Scaler-PgueV1cj.js';
import './PointType-0vgoM_lJ.js';
import './Events-IwuYx9yI.js';
import './IntervalType-CQa4mlKV.js';
import 'colorjs.io';
import './Types-Tj0rQbez.js';
import './LineType-Lekba5_H.js';
import './ArcType-VEUNL6ta.js';
import './CircleType-hb8awD7g.js';
import './IStackImmutable-nAQ6b3zv.js';

type Bar = {
    readonly percentage: number;
    readonly data: KeyValue;
};
/**
 * Usage in HTML:
 * ```html
 * <style>
 * histogram-vis {
 *  display: block;
 *  height: 7em;
 *  --histogram-bar-color: pink;
 * }
 * </style>
 * <histogram-vis>
 * [
 *  ["apples", 5],
 *  ["oranges", 3],
 *  ["pineapple", 0],
 *  ["limes", 9]
 * ]
 * </histogram-vis>
 * ```
 *
 * CSS colour theming:
 * --histogram-bar-color
 * --histogram-label-color
 *
 * HTML tag attributes
 * showXAxis (boolean)
 * showDataLabels (boolean)
 *
 * @export
 * @class HistogramVis
 * @extends {LitElement}
 **/
declare class HistogramVis extends LitElement {
    static readonly styles: lit.CSSResult;
    data: ReadonlyArray<KeyValue>;
    showDataLabels: boolean;
    height: string;
    showXAxis: boolean;
    json: ReadonlyArray<KeyValue> | undefined;
    constructor();
    connectedCallback(): void;
    barTemplate(bar: Bar, index: number, _totalBars: number): lit_html.TemplateResult<1>;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        readonly 'histogram-vis': HistogramVis;
    }
}

/**
 * Creates and drives a HistogramVis instance.
 * Data should be an outer array containing two-element arrays for each
 * data point. The first element of the inner array is expected to be the key, the second the frequency.
 * For example,  `[`apples`, 2]` means the key `apples` was counted twice.
 *
 * Usage:
 * .sortBy() automatically sorts prior to visualisation. By default off.
 * .update(data) full set of data to plot
 * .clear() empties plot - same as calling `update([])`
 * .el - The `HistogramVis` instance, or undefined if not created/disposed
 *
 * ```
 * const plot = new FrequencyHistogramPlot(document.getElementById('histogram'));
 * plot.sortBy('key'); // Automatically sort by key
 * ...
 * plot.update([[`apples`, 2], [`oranges', 0], [`bananas`, 5]])
 * ```
 *
 * @export
 * @class FrequencyHistogramPlot
 */
declare class FrequencyHistogramPlot {
    #private;
    readonly el: HistogramVis | undefined;
    constructor(el: HistogramVis);
    setAutoSort(sortStyle: `value` | `value-reverse` | `key` | `key-reverse`): void;
    clear(): void;
    dispose(): void;
    update(data: ReadonlyArray<readonly [key: string, count: number]>): void;
}

interface IPlotElement {
    plot(value: number, series?: string): IDataSeries;
    draw(): void;
}
interface IDataSeries {
    clear(): void;
}

/**
 * Attributes
 * * streaming: true/false (default: true)
 * * max-length: number (default: 500). How many data points per series to store
 * * data-width: when streaming, how much horizontal width per point
 * * fixed-max/fixed-min: global input scaling (default: NaN, ie. disabled)
 *
 * * line-width: stroke width of drawing line (default:2)
 *
 * * render: 'dot' or 'line' (default: 'dot')
 *
 * Styling variables
 * * --legend-fg: legend foreground text
 */
declare class PlotElement extends LitElement implements IPlotElement {
    #private;
    streaming: boolean;
    maxLength: number;
    dataWidth: number;
    fixedMax: number;
    fixedMin: number;
    lineWidth: number;
    renderStyle: string;
    autoRedraw: boolean;
    padding: number;
    paused: boolean;
    canvasEl: Ref<HTMLCanvasElement>;
    constructor();
    get series(): DataSeries[];
    get seriesCount(): number;
    /**
     * Delete a series.
     * Returns _true_ if there was a series to delete
     * @param name
     * @returns
     */
    deleteSeries(name: string): boolean;
    /**
     * Keeps the series, but deletes its data
     * @param name
     * @returns
     */
    clearSeries(name: string): boolean;
    /**
     * Delete all data & series
     */
    clear(): void;
    /**
     * Keeps all series, but deletes their data
     */
    clearData(): void;
    render(): lit_html.TemplateResult<1>;
    connectedCallback(): void;
    protected firstUpdated(_changedProperties: PropertyValues): void;
    updateColours(): void;
    plot(value: number, seriesName?: string): DataSeries;
    plotObject(value: object): void;
    draw(): void;
    drawLegend(cl: RectPositioned, d: DrawingHelper): void;
    drawLineSeries(data: number[], cp: Rect, d: DrawingHelper, colour: string): void;
    drawDotSeries(data: number[], cp: Rect, d: DrawingHelper, colour: string): void;
    computePlot(c: CanvasHelper, plotHeight: number, axisYwidth: number, padding: number): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    computeAxisYWidth(c: CanvasHelper): number;
    computeLegend(c: CanvasHelper, maxWidth: number, padding: number): {
        bounds: {
            width: number;
            height: number;
        };
        parts: {
            width: number;
            height: number;
            x: number;
            y: number;
        }[];
    };
    getSeries(name: string): DataSeries | undefined;
    static styles: lit.CSSResult;
}
declare class DataSeries implements IDataSeries {
    name: string;
    private plot;
    data: number[];
    colour: Colourish;
    minSeen: number;
    maxSeen: number;
    static hue: number;
    constructor(name: string, plot: PlotElement);
    clear(): void;
    getScaled(): number[];
    getScaledBy(scaler: (v: number) => number): number[];
    push(value: number): void;
    resetScale(): void;
}

export { DataSeries, FrequencyHistogramPlot, HistogramVis, type IDataSeries, type IPlotElement, PlotElement };
