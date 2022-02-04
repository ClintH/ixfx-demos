import * as rxjs from 'rxjs';
import { e as Rect, P as Path, f as Line, R as RectPositioned, a as Point } from './Rect-04af8f31';
import { Q as QuadraticBezier, a as CubicBezier, b as CirclePositioned, c as ArcPositioned } from './Circle-1c0c31de';
import { S as SimpleEventEmitter } from './Events-faeaa6ab';
import { T as ToString } from './util-61c3ff4c';

declare enum OverflowPolicy {
    /**
     * Removes items front of the queue (ie older items are discarded)
     */
    DiscardOlder = 0,
    /**
     * Remove from rear of queue to make space for new items (ie newer items are discarded)
     */
    DiscardNewer = 1,
    /**
     * Only adds new items that there are room for (ie. brand new items are discarded)
     */
    DiscardAdditions = 2
}
declare type StackOpts = {
    readonly debug?: boolean;
    readonly capacity?: number;
    readonly overflowPolicy?: OverflowPolicy;
};
/**
 * Immutable stack
 * `Push` & `pop` both return a new instance, the original is never modified.
 *
 * Usage:
 * ```
 * push(item);  // Return a new stack with item(s) added
 * pop();       // Return a new stack with top-most item removed (ie. newest)
 * .peek;       // Return what is at the top of the stack or undefined if empty
 * .isEmpty/.isFull;
 * .length;     // How many items in stack
 * .data;       // Get the underlying array
 * ```
 *
 * Example
 * ```
 * let sanga = new Stack();
 * sanga = sanga.push(`bread`, `tomato`, `cheese`);
 * sanga.peek;  // `cheese`
 * sanga = sanga.pop(); // removes `cheese`
 * sanga.peek;  // `tomato`
 * const sangaAlt = sanga.push(`lettuce`, `cheese`); // sanga stays [`bread`, `tomato`], while sangaAlt is [`bread`, `tomato`, `lettuce`, `cheese`]
 * ```
 *
 * Stack can also be created from the basis of an existing array. First index of array will be the bottom of the stack.
 * @class Stack
 * @template V
 */
declare class Stack<V> {
    readonly opts: StackOpts;
    readonly data: ReadonlyArray<V>;
    constructor(opts: StackOpts, data: ReadonlyArray<V>);
    push(...toAdd: ReadonlyArray<V>): Stack<V>;
    pop(): Stack<V>;
    /**
     * Enumerates stack from bottom-to-top
     *
     * @param {(v:V) => void} fn
     * @memberof Stack
     */
    forEach(fn: (v: V) => void): void;
    forEachFromTop(fn: (v: V) => void): void;
    get isEmpty(): boolean;
    get isFull(): boolean;
    get peek(): V | undefined;
    get length(): number;
}

declare const autoSizeCanvas: (canvasEl: HTMLCanvasElement, callback: () => void, timeoutMs?: number) => rxjs.Subscription;
declare type CanvasCtxQuery = null | string | CanvasRenderingContext2D | HTMLCanvasElement;
declare const getCtx: (canvasElCtxOrQuery: CanvasCtxQuery) => CanvasRenderingContext2D;
declare const makeHelper: (ctxOrCanvasEl: CanvasCtxQuery, canvasBounds?: Rect | undefined) => {
    paths(pathsToDraw: Path[], opts?: DrawingOpts$2 | undefined): void;
    line(lineToDraw: Line | Line[], opts?: DrawingOpts$2 | undefined): void;
    rect(rectsToDraw: RectPositioned | RectPositioned[], opts?: (DrawingOpts$2 & {
        filled?: boolean | undefined;
    }) | undefined): void;
    bezier(bezierToDraw: QuadraticBezier | CubicBezier, opts?: DrawingOpts$2 | undefined): void;
    connectedPoints(pointsToDraw: Point[], opts?: (DrawingOpts$2 & {
        loop?: boolean | undefined;
    }) | undefined): void;
    pointLabels(pointsToDraw: Point[], opts?: DrawingOpts$2 | undefined): void;
    dot(dotPosition: Point | Point[], opts?: (DrawingOpts$2 & {
        radius: number;
        outlined?: boolean | undefined;
        filled?: boolean | undefined;
    }) | undefined): void;
    circle(circlesToDraw: CirclePositioned | CirclePositioned[], opts: DrawingOpts$2): void;
    arc(arcsToDraw: ArcPositioned | ArcPositioned[], opts: DrawingOpts$2): void;
    textBlock(lines: string[], opts: DrawingOpts$2 & {
        anchor: Point;
        anchorPadding?: number;
        bounds?: RectPositioned;
    }): void;
};
declare type DrawingOpts$2 = {
    readonly strokeStyle?: string;
    readonly fillStyle?: string;
    readonly debug?: boolean;
};
declare const arc: (ctx: CanvasRenderingContext2D, arcs: ArcPositioned | ReadonlyArray<ArcPositioned>, opts?: DrawingOpts$2) => void;
declare type StackOp = (ctx: CanvasRenderingContext2D) => void;
declare type DrawingStack = Readonly<{
    push(op: StackOp): DrawingStack;
    pop(): DrawingStack;
    apply(): DrawingStack;
}>;
declare const drawingStack: (ctx: CanvasRenderingContext2D, stk?: Stack<StackOp> | undefined) => DrawingStack;
declare const circle: (ctx: CanvasRenderingContext2D, circlesToDraw: CirclePositioned | readonly CirclePositioned[], opts?: DrawingOpts$2) => void;
declare const paths: (ctx: CanvasRenderingContext2D, pathsToDraw: readonly Path[] | Path, opts?: Readonly<{
    readonly strokeStyle?: string;
    readonly debug?: boolean;
}>) => void;
/**
 * Draws a line between all the given points.
 *
 * @export
 * @param {CanvasRenderingContext2D} ctx
 * @param {...Points.Point[]} pts
 * @returns {void}
 */
declare const connectedPoints: (ctx: CanvasRenderingContext2D, pts: readonly Point[], opts?: {
    readonly loop?: boolean;
    readonly strokeStyle?: string;
}) => void;
declare const pointLabels: (ctx: CanvasRenderingContext2D, pts: readonly Point[], opts?: {
    readonly fillStyle?: string;
}, labels?: readonly string[] | undefined) => void;
declare const bezier: (ctx: CanvasRenderingContext2D, bezierToDraw: QuadraticBezier | CubicBezier, opts?: DrawingOpts$2 | undefined) => void;
declare const line: (ctx: CanvasRenderingContext2D, toDraw: Line | readonly Line[], opts?: {
    readonly strokeStyle?: string;
    readonly debug?: boolean;
}) => void;
declare const rect: (ctx: CanvasRenderingContext2D, toDraw: RectPositioned | readonly RectPositioned[], opts?: DrawingOpts$2 & {
    readonly filled?: boolean;
}) => void;
declare const textBlock: (ctx: CanvasRenderingContext2D, lines: readonly string[], opts: DrawingOpts$2 & {
    readonly anchor: Point;
    readonly anchorPadding?: number;
    readonly bounds?: RectPositioned;
}) => void;

declare const Drawing_autoSizeCanvas: typeof autoSizeCanvas;
declare const Drawing_getCtx: typeof getCtx;
declare const Drawing_makeHelper: typeof makeHelper;
declare const Drawing_arc: typeof arc;
declare const Drawing_drawingStack: typeof drawingStack;
declare const Drawing_circle: typeof circle;
declare const Drawing_paths: typeof paths;
declare const Drawing_connectedPoints: typeof connectedPoints;
declare const Drawing_pointLabels: typeof pointLabels;
declare const Drawing_bezier: typeof bezier;
declare const Drawing_line: typeof line;
declare const Drawing_rect: typeof rect;
declare const Drawing_textBlock: typeof textBlock;
declare namespace Drawing {
  export {
    Drawing_autoSizeCanvas as autoSizeCanvas,
    Drawing_getCtx as getCtx,
    Drawing_makeHelper as makeHelper,
    Drawing_arc as arc,
    Drawing_drawingStack as drawingStack,
    Drawing_circle as circle,
    Drawing_paths as paths,
    Drawing_connectedPoints as connectedPoints,
    Drawing_pointLabels as pointLabels,
    Drawing_bezier as bezier,
    Drawing_line as line,
    Drawing_rect as rect,
    Drawing_textBlock as textBlock,
  };
}

declare type DrawingOpts$1 = {
    readonly strokeStyle?: string;
    readonly fillStyle?: string;
    readonly debug?: boolean;
    readonly strokeWidth?: number;
};
declare type TextDrawingOpts = DrawingOpts$1 & {
    readonly anchor?: `start` | `middle` | `end`;
    readonly align?: `text-bottom` | `text-top` | `baseline` | `top` | `hanging` | `middle`;
};
declare const createPath: (svg: string, parent: SVGElement, opts?: DrawingOpts$1 | undefined) => SVGPathElement;
declare const createCircle: (circle: CirclePositioned, parent: SVGElement, opts?: DrawingOpts$1 | undefined) => SVGCircleElement;
declare const createLine: (line: Line, parent: SVGElement, opts?: DrawingOpts$1 | undefined, id?: string | undefined) => SVGLineElement;
declare const createText: (pos: Point, text: string, parent: SVGElement, opts?: TextDrawingOpts | undefined, id?: string | undefined) => SVGTextElement;
declare const svg: (parent: SVGElement, opts?: DrawingOpts$1 | undefined) => {
    text: (pos: Point, text: string, opts?: TextDrawingOpts | undefined, id?: string | undefined) => SVGTextElement;
    line: (line: Line, opts?: DrawingOpts$1 | undefined, id?: string | undefined) => SVGLineElement;
    circle: (circle: CirclePositioned, opts?: DrawingOpts$1 | undefined) => SVGCircleElement;
    path: (svgStr: string, opts?: DrawingOpts$1 | undefined) => SVGPathElement;
    query: <V extends SVGElement>(selectors: string) => V | null;
    width: number;
    height: number;
    clear: () => void;
};

type Svg_TextDrawingOpts = TextDrawingOpts;
declare const Svg_createPath: typeof createPath;
declare const Svg_createCircle: typeof createCircle;
declare const Svg_createLine: typeof createLine;
declare const Svg_createText: typeof createText;
declare const Svg_svg: typeof svg;
declare namespace Svg {
  export {
    DrawingOpts$1 as DrawingOpts,
    Svg_TextDrawingOpts as TextDrawingOpts,
    Svg_createPath as createPath,
    Svg_createCircle as createCircle,
    Svg_createLine as createLine,
    Svg_createText as createText,
    Svg_svg as svg,
  };
}

/**
 * The circular array grows to a fixed size. Once full, new
 * items replace the oldest item in the array. Immutable.
 *
 * Usage:
 * ```
 * let a = new Circular(10);
 * let b = a.add(something);
 * ```
 * @class CircularArray
 * @extends {Array}
 * @template V
 */
declare class MutableCircularArray<V> extends Array {
    #private;
    constructor(capacity: number);
    /**
     * Returns a new Circular with item added
     *
     * @param {V} thing Thing to add
     * @returns {Circular<V>} Circular with item added
     * @memberof Circular
     */
    add(thing: V): MutableCircularArray<V>;
    get pointer(): number;
    get isFull(): boolean;
}

declare type MapMultiOpts<V> = {
    /**
     * Returns true if two values should be considered equal.
     *
     * @type {(IsEqual<V>|undefined)}
     */
    /**
     * Returns a group for values added via `addValue`. Eg. maybe you want to
     * group values in the shape `{name: 'Samantha' city: 'Copenhagen'}` by city:
     *
     * ```
     * const opts = {
     *  groupBy: (v) => v.city
     * }
     * ```
     *
     * @type {(ToString<V>|undefined)}
     */
    readonly groupBy?: ToString<V> | undefined;
};
declare type MutableMapArrayEvents<V> = {
    readonly addedValues: {
        readonly values: ReadonlyArray<V>;
    };
    readonly addedKey: {
        readonly key: string;
    };
    readonly clear: boolean;
    readonly deleteKey: {
        readonly key: string;
    };
};
declare type MultiValue<V, M> = Readonly<{
    has(source: M, value: V): boolean;
    add(destination: M | undefined, values: ReadonlyArray<V>): M;
    toArray(source: M): ReadonlyArray<V> | undefined;
    find(source: M, predicate: (v: V) => boolean): V | unknown;
    filter(source: M, predicate: (v: V) => boolean): ReadonlyArray<V>;
    without(source: M, value: V): ReadonlyArray<V>;
    count(source: M): number;
}>;
/**
 * Like a `Map` but multiple values can be stored for each key.
 * Duplicate values can be added to the same or even a several keys.
 *
 * By default, equality is based on value rather than reference.
 *
 * @export
 * @class MutableMapMulti
 * @template V
 */
declare class MutableMapOf<V, M> extends SimpleEventEmitter<MutableMapArrayEvents<V>> {
    #private;
    readonly groupBy: ToString<V>;
    readonly type: MultiValue<V, M>;
    /**
     * Constructor.
     *
     * By default it will group by the string representation of values and use
     * reference matching for values.
     * @param {MapMultiOpts<V>} [opts={}]
     * @memberof MutableMapMulti
     */
    constructor(type: MultiValue<V, M>, opts?: MapMultiOpts<V>);
    debugString(): string;
    /**
     * Returns true if the map is empty
     *
     * @readonly
     * @type {boolean}
     * @memberof MutableMapMulti
     */
    get isEmpty(): boolean;
    /**
     * Clears the map
     *
     * @memberof MutableMapMulti
     */
    clear(): void;
    /**
     * Adds several values under the same key. Duplicate values are permitted.
     *
     * @param {string} key Key for values
     * @param {...V[]} value Values
     * @memberof MapMulti
     */
    addKeyedValues(key: string, ...values: ReadonlyArray<V>): void;
    /**
     * Adds a value, automatically extracting a key via the
     * `groupBy` function assigned in the constructor options.
     *
     * @param {V} values
     * @memberof MutableMapArray
     */
    addValue(...values: ReadonlyArray<V>): void;
    /**
     * Returns true if `value` is stored under `key`.
     *
     * By default values are compared by value, not reference.
     *
     * @param {string} key
     * @param {V} value
     * @return {*}  {boolean}
     * @memberof MutableMapArray
     */
    hasKeyValue(key: string, value: V): boolean;
    has(key: string): boolean;
    /**
     * Deletes all values under the specified key that match the given value.
     *
     * @param {string} key
     * @param {V} value
     * @return {*}
     * @memberof MutableMapArray
     */
    deleteKeyValue(key: string, value: V): void;
    delete(key: string): boolean;
    /**
     * Deletes all occurences of `value` regardless of key
     *
     * @param {V} value
     * @memberof MapMulti
     */
    /**
     * Finds the first key where value is stored.
     * Note: value could be stored in multiple keys
     *
     * @param {V} value
     * @returns {(string | undefined)}
     * @memberof MapMulti
     */
    findKeyForValue(value: V): string | undefined;
    /**
     * Returns the number of values stored under `key`, or 0 if key is not present.
     *
     * @param {string} key
     * @return {*}  {number}
     * @memberof MutableMapArray
     */
    count(key: string): number;
    /**
     * Returns the array of values stored under `key`
     * or undefined if key does not exist
     *
     * @param {string} key
     * @return {*}  {readonly}
     * @memberof MutableMapArray
     */
    get(key: string): readonly V[] | undefined;
    getSource(key: string): M | undefined;
    keys(): string[];
    keysAndCounts(): Array<[string, number]>;
    merge(other: MutableMapOf<V, M>): void;
}

declare type Palette = {
    setElementBase(el: Element): void;
    has(key: string): boolean;
    get(key: string, fallback?: string): string;
};
declare const create: (fallbacks?: readonly string[] | undefined) => Palette;
declare const getCssVariable: (name: string, fallbackColour?: string, root?: HTMLElement | undefined) => string;

type Palette$1_Palette = Palette;
declare const Palette$1_create: typeof create;
declare const Palette$1_getCssVariable: typeof getCssVariable;
declare namespace Palette$1 {
  export {
    Palette$1_Palette as Palette,
    Palette$1_create as create,
    Palette$1_getCssVariable as getCssVariable,
  };
}

declare type Series = {
    min: number;
    max: number;
    range: number;
    name: string;
};
declare type DrawingOpts = PlotOpts & {
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    dataXScale?: number;
    yLabelWidth: number;
    palette: Palette;
    textHeight: number;
    capacity: number;
    coalesce: boolean;
};
declare type PlotOpts = {
    palette?: Palette;
    capacity?: number;
    showYAxis?: boolean;
    yAxes?: string[] | string;
    textHeight?: number;
    lineWidth?: number;
    coalesce?: boolean;
};
declare const createScales: (buffer: MutableMapOf<number, MutableCircularArray<number>>) => Series[];
declare const add: (buffer: MutableMapOf<number, MutableCircularArray<number>>, value: number, series?: string) => void;
declare const draw: (buffer: MutableMapOf<number, MutableCircularArray<number>>, drawing: DrawingOpts) => void;
declare const drawSeriesAxis: (series: Series, drawing: DrawingOpts) => void;
declare const drawSeries: (series: Series, values: MutableCircularArray<number>, drawing: DrawingOpts) => void;
/**
 * Creates a simple horizontal data plot within a DIV.
 *
 * ```
 * const plot = plot2(`#parentDiv`);
 * plot.add(10);
 * plot.clear();
 *
 * // Plot data using series
 * plot.add(-1, `temp`);
 * plot.add(0.4, `humidty`);
 * ```
 *
 * Options can be specified to customise plot
 * ```
 * const plot = plot2(`#parentDiv`, {
 *  capacity: 100,     // How many data points to store (default: 10)
 *  showYAxis: false,  // Toggle whether y axis is shown (default: true)
 *  lineWidth: 2,      // Width of plot line (default: 2)
 *  yAxes:  [`temp`],  // Only show these y axes (by default all are shown)
 *  palette: Palette,  // Colour palette instance to use
 *  coalesce: true,    // If true, sub-pixel data points are skipped, improving performance for dense plots at the expense of plot precision
 * });
 * ```
 * @param {string} parentElOrQuery
 * @param {PlotOpts} opts
 * @return {*}
 */
declare const plot2: (parentElOrQuery: string | HTMLElement, opts: PlotOpts) => {
    add: (value: number, series?: string, skipDrawing?: boolean) => void;
    clear: () => void;
};

declare const Plot2_createScales: typeof createScales;
declare const Plot2_add: typeof add;
declare const Plot2_draw: typeof draw;
declare const Plot2_drawSeriesAxis: typeof drawSeriesAxis;
declare const Plot2_drawSeries: typeof drawSeries;
declare const Plot2_plot2: typeof plot2;
declare namespace Plot2 {
  export {
    Plot2_createScales as createScales,
    Plot2_add as add,
    Plot2_draw as draw,
    Plot2_drawSeriesAxis as drawSeriesAxis,
    Plot2_drawSeries as drawSeries,
    Plot2_plot2 as plot2,
  };
}

declare type Cmyk = readonly [number, number, number, number];
declare type Lab = readonly [number, number, number];
declare type Rgb = readonly [number, number, number];
declare type DictColour = {
    readonly name: string;
    readonly combinations: ReadonlyArray<number>;
    readonly swatch: number;
    readonly cmyk: Cmyk;
    readonly lab: Lab;
    readonly rgb: Rgb;
    readonly hex: string;
};
declare const randomPalette: (minColours?: number) => readonly DictColour[];

type DictionaryOfColourCombinations_DictColour = DictColour;
declare const DictionaryOfColourCombinations_randomPalette: typeof randomPalette;
declare namespace DictionaryOfColourCombinations {
  export {
    DictionaryOfColourCombinations_DictColour as DictColour,
    DictionaryOfColourCombinations_randomPalette as randomPalette,
  };
}

declare const index_Drawing: typeof Drawing;
declare const index_Svg: typeof Svg;
declare const index_DictionaryOfColourCombinations: typeof DictionaryOfColourCombinations;
declare namespace index {
  export {
    Palette$1 as Palette,
    index_Drawing as Drawing,
    index_Svg as Svg,
    Plot2 as Plot,
    index_DictionaryOfColourCombinations as DictionaryOfColourCombinations,
  };
}

export { Drawing as D, Palette$1 as P, Svg as S, Plot2 as a, DictionaryOfColourCombinations as b, index as i };
