import * as rxjs from 'rxjs';
import { e as Rect, P as Path, f as Line, R as RectPositioned, a as Point } from './Rect-04af8f31';
import { Q as QuadraticBezier, a as CubicBezier, b as CirclePositioned, c as ArcPositioned } from './Circle-af6a5146';
import { a as Stack, M as MapOfMutable, C as CircularArray } from './Interfaces-1af00b23';

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
 * Manage a set of colours. Uses CSS variables as a fallback if colour is not added
 *
 */
declare type Palette = {
    setElementBase(el: Element): void;
    has(key: string): boolean;
    /**
     * Returns a colour by name.
     *
     * If the colour is not found:
     *  1. Try to use a CSS variable `--key`, or
     *  2. The next fallback colour is used (array cycles)
     *
     * @param key
     * @returns
     */
    get(key: string, fallback?: string): string;
    /**
     * Gets a colour by key, adding and returning fallback if not present
     * @param key Key of colour
     * @param fallback Fallback colour if key is not found
     */
    getOrAdd(key: string, fallback?: string): string;
    /**
     * Adds a colour with a given key
     *
     * @param key
     * @param colour
     */
    add(key: string, value: string): void;
};
declare const create: (fallbacks?: readonly string[] | undefined) => Palette;
/**
 * Gets a CSS variable.
 * @example Fetch --accent variable, or use `yellow` if not found.
 * ```
 * getCssVariable(`accent`, `yellow`);
 * ```
 * @param name Name of variable. Do not starting `--`
 * @param fallbackColour Fallback colour if not found
 * @param root  Element to search variable from
 * @returns Colour or fallback.
 */
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
declare const createScales: (buffer: MapOfMutable<number, CircularArray<number>>) => Series[];
declare const add: (buffer: MapOfMutable<number, CircularArray<number>>, value: number, series?: string) => void;
declare const draw: (buffer: MapOfMutable<number, CircularArray<number>>, drawing: DrawingOpts) => void;
declare const drawSeriesAxis: (series: Series, drawing: DrawingOpts) => void;
declare const drawSeries: (series: Series, values: CircularArray<number>, drawing: DrawingOpts) => void;
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
 *
 * By default, will attempt to use CSS variable `--series[seriesName]` for axis colours. -axis for titles.
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
