import { e as Rect, P as Path, f as Line, R as RectPositioned, a as Point } from './Rect-32759dac';
import { a as CirclePositioned } from './Circle-7a98104c';
import { Q as QuadraticBezier, C as CubicBezier, a as ArcPositioned } from './Bezier-91f2c5bc';
import { a as Stack, M as MapOfMutable, C as CircularArray } from './Interfaces-c1395722';
import { S as Svg } from './Svg-37d4348e';
import * as d3Colour from 'd3-color';

declare type CanvasCtxQuery = null | string | CanvasRenderingContext2D | HTMLCanvasElement;
/**
 * Gets a 2d drawing context from canvas element or query, or throws an error
 * @param canvasElCtxOrQuery Canvas element reference or DOM query
 * @returns Drawing context.
 */
declare const getCtx: (canvasElCtxOrQuery: CanvasCtxQuery) => CanvasRenderingContext2D;
/**
 * Makes a helper object that wraps together a bunch of drawing functions that all use the same drawing context
 * @param ctxOrCanvasEl Drawing context or canvs element reference
 * @param canvasBounds Bounds of drawing (optional). Used for limiting `textBlock`
 * @returns
 */
declare const makeHelper: (ctxOrCanvasEl: CanvasCtxQuery, canvasBounds?: Rect | undefined) => {
    paths(pathsToDraw: Path[], opts?: DrawingOpts$1 | undefined): void;
    line(lineToDraw: Line | Line[], opts?: DrawingOpts$1 | undefined): void;
    rect(rectsToDraw: RectPositioned | RectPositioned[], opts?: (DrawingOpts$1 & {
        filled?: boolean | undefined;
    }) | undefined): void;
    bezier(bezierToDraw: QuadraticBezier | CubicBezier, opts?: DrawingOpts$1 | undefined): void;
    connectedPoints(pointsToDraw: Point[], opts?: (DrawingOpts$1 & {
        loop?: boolean | undefined;
    }) | undefined): void;
    pointLabels(pointsToDraw: Point[], opts?: DrawingOpts$1 | undefined): void;
    dot(dotPosition: Point | Point[], opts?: (DrawingOpts$1 & {
        radius: number;
        outlined?: boolean | undefined;
        filled?: boolean | undefined;
    }) | undefined): void;
    circle(circlesToDraw: CirclePositioned | CirclePositioned[], opts: DrawingOpts$1): void;
    arc(arcsToDraw: ArcPositioned | ArcPositioned[], opts: DrawingOpts$1): void;
    textBlock(lines: string[], opts: DrawingOpts$1 & {
        anchor: Point;
        anchorPadding?: number;
        bounds?: RectPositioned;
    }): void;
};
/**
 * Drawing options
 */
declare type DrawingOpts$1 = {
    /**
     * Stroke style
     */
    readonly strokeStyle?: string;
    /**
     * Fill style
     */
    readonly fillStyle?: string;
    /**
     * If true, diagnostic helpers will be drawn
     */
    readonly debug?: boolean;
};
/**
 * Draws one or more arcs.
 * @param ctx
 * @param arcs
 * @param opts
 */
declare const arc: (ctx: CanvasRenderingContext2D, arcs: ArcPositioned | ReadonlyArray<ArcPositioned>, opts?: DrawingOpts$1) => void;
/**
 * A drawing stack operation
 */
declare type StackOp = (ctx: CanvasRenderingContext2D) => void;
/**
 * A drawing stack (immutable)
 */
declare type DrawingStack = Readonly<{
    /**
     * Push a new drawing op
     * @param op Operation to add
     * @returns stack with added op
     */
    push(op: StackOp): DrawingStack;
    /**
     * Pops an operatiomn
     * @returns Drawing stack with item popped
     */
    pop(): DrawingStack;
    /**
     * Applies drawing stack
     */
    apply(): DrawingStack;
}>;
/**
 * Creates and returns an immutable drawing stack for a context
 * @param ctx Context
 * @param stk Initial stack operations
 * @returns
 */
declare const drawingStack: (ctx: CanvasRenderingContext2D, stk?: Stack<StackOp> | undefined) => DrawingStack;
declare const lineThroughPoints: (ctx: CanvasRenderingContext2D, points: readonly Point[], opts?: DrawingOpts$1 | undefined) => void;
/**
 * Draws one or more circles
 * @param ctx
 * @param circlesToDraw
 * @param opts
 */
declare const circle: (ctx: CanvasRenderingContext2D, circlesToDraw: CirclePositioned | readonly CirclePositioned[], opts?: DrawingOpts$1) => void;
/**
 * Draws one or more paths.
 * supported paths are quadratic beziers and lines.
 * @param ctx
 * @param pathsToDraw
 * @param opts
 */
declare const paths: (ctx: CanvasRenderingContext2D, pathsToDraw: readonly Path[] | Path, opts?: Readonly<{
    readonly strokeStyle?: string;
    readonly debug?: boolean;
}>) => void;
/**
 * Draws a line between all the given points.
 *
 * @param ctx
 * @param pts
 */
declare const connectedPoints: (ctx: CanvasRenderingContext2D, pts: readonly Point[], opts?: {
    readonly loop?: boolean;
    readonly strokeStyle?: string;
}) => void;
/**
 * Draws labels for a set of points
 * @param ctx
 * @param pts Points to draw
 * @param opts
 * @param labels Labels for points
 */
declare const pointLabels: (ctx: CanvasRenderingContext2D, pts: readonly Point[], opts?: {
    readonly fillStyle?: string;
}, labels?: readonly string[] | undefined) => void;
/**
 * Draws a cubic or quadratic bezier
 * @param ctx
 * @param bezierToDraw
 * @param opts
 */
declare const bezier: (ctx: CanvasRenderingContext2D, bezierToDraw: QuadraticBezier | CubicBezier, opts?: DrawingOpts$1 | undefined) => void;
/**
 * Draws one or more lines
 * @param ctx
 * @param toDraw
 * @param opts
 */
declare const line: (ctx: CanvasRenderingContext2D, toDraw: Line | readonly Line[], opts?: {
    readonly strokeStyle?: string;
    readonly debug?: boolean;
}) => void;
/**
 * Draws one or more rectangles
 * @param ctx
 * @param toDraw
 * @param opts
 */
declare const rect: (ctx: CanvasRenderingContext2D, toDraw: RectPositioned | readonly RectPositioned[], opts?: DrawingOpts$1 & {
    readonly filled?: boolean;
}) => void;
/**
 * Draws a block of text. Each array item is considered a line.
 * @param ctx
 * @param lines
 * @param opts
 */
declare const textBlock: (ctx: CanvasRenderingContext2D, lines: readonly string[], opts: DrawingOpts$1 & {
    readonly anchor: Point;
    readonly anchorPadding?: number;
    readonly bounds?: RectPositioned;
}) => void;
declare const textBlockCentered: (ctx: CanvasRenderingContext2D, lines: readonly string[], opts: DrawingOpts$1 & {
    readonly bounds: RectPositioned;
}) => void;

declare const Drawing_getCtx: typeof getCtx;
declare const Drawing_makeHelper: typeof makeHelper;
declare const Drawing_arc: typeof arc;
declare const Drawing_drawingStack: typeof drawingStack;
declare const Drawing_lineThroughPoints: typeof lineThroughPoints;
declare const Drawing_circle: typeof circle;
declare const Drawing_paths: typeof paths;
declare const Drawing_connectedPoints: typeof connectedPoints;
declare const Drawing_pointLabels: typeof pointLabels;
declare const Drawing_bezier: typeof bezier;
declare const Drawing_line: typeof line;
declare const Drawing_rect: typeof rect;
declare const Drawing_textBlock: typeof textBlock;
declare const Drawing_textBlockCentered: typeof textBlockCentered;
declare namespace Drawing {
  export {
    Drawing_getCtx as getCtx,
    Drawing_makeHelper as makeHelper,
    Drawing_arc as arc,
    Drawing_drawingStack as drawingStack,
    Drawing_lineThroughPoints as lineThroughPoints,
    Drawing_circle as circle,
    Drawing_paths as paths,
    Drawing_connectedPoints as connectedPoints,
    Drawing_pointLabels as pointLabels,
    Drawing_bezier as bezier,
    Drawing_line as line,
    Drawing_rect as rect,
    Drawing_textBlock as textBlock,
    Drawing_textBlockCentered as textBlockCentered,
  };
}

declare type Plotter = {
    add(value: number, series?: string, skipDrawing?: boolean): void;
    drawValue(index: number): void;
    clear(): void;
    dispose(): void;
};
declare type Series = {
    min: number;
    max: number;
    range: number;
    name: string;
    colour: string;
};
declare type DrawingOpts = PlotOpts & {
    x: Axis;
    y: Axis;
    ctx: CanvasRenderingContext2D;
    textHeight: number;
    capacity: number;
    coalesce: boolean;
    margin: number;
    canvasSize: Rect;
    clearCanvas: boolean;
    translucentPlot?: boolean;
    highlightIndex?: number;
    leadingEdgeDot: boolean;
    debug: boolean;
};
/**
 * Properties for an axis
 */
declare type Axis = {
    allowedSeries?: string[];
    /**
     * Name of axis, eg `x`
     */
    name: string;
    /**
     * Colour to use for axis labels
     */
    colour: string;
    /**
     * Forced scale for values
     */
    scaleRange?: [number, number];
    /**
     * Forced range for labelling, by default
     * uses scaleRange
     */
    labelRange?: [number, number];
    /**
     * Width of axis line
     */
    lineWidth: number;
    /**
     * How line ends
     */
    endWith: `none` | `arrow`;
    /**
     * Where to place the name of the axis
     */
    namePosition: `none` | `end` | `side`;
    /**
     * Width for y axis, height for x axis
     */
    textSize: number;
    /**
     * If true, axis labels (ie numeric scale) are shown. Default: true
     */
    showLabels: boolean;
    /**
     * If true, a line is drawn to represent axis. Default: true
     */
    showLine: boolean;
};
declare type SeriesColours = {
    [id: string]: string | undefined;
};
/**
 * Plotter options
 */
declare type PlotOpts = {
    debug?: boolean;
    seriesColours?: SeriesColours;
    x?: Axis;
    y?: Axis;
    plotSize?: Rect;
    autoSizeCanvas?: boolean;
    style?: `connected` | `dots` | `none`;
    /**
     * Number of items to keep in the circular array
     * Default: 10
     */
    capacity?: number;
    textHeight?: number;
    /**
     * Width of plotted line
     */
    lineWidth?: number;
    /**
     * If true, sub-pixel data points are ignored
     */
    coalesce?: boolean;
    /**
     * Fixed range to scale Y values. By default normalises values
     * as they come in. This will also determine the y-axis labels and drawing
     */
    /**
     * How many horizontal pixels per data point. If unspecified,
     * it will scale based on width of canvas and capacity.
     */
    dataXScale?: number;
};
declare const defaultAxis: (name: string) => Axis;
declare const calcScale: (buffer: BufferType, seriesColours?: SeriesColours | undefined) => Series[];
declare const add: (buffer: BufferType, value: number, series?: string) => void;
declare type BufferType = MapOfMutable<number, CircularArray<number>> | MapOfMutable<number, ReadonlyArray<number>>;
declare const drawValue: (index: number, buffer: BufferType, drawing: DrawingOpts) => void;
/**
 * Draws a `buffer` of data with `drawing` options.
 *
 * @param buffer
 * @param drawing
 */
declare const draw: (buffer: BufferType, drawing: DrawingOpts) => void;
/**
 * Creates a simple horizontal data plot within a DIV.
 *
 * ```
 * const p = plot(`#parentDiv`);
 * p.add(10);
 * p.clear();
 *
 * // Plot data using series
 * p.add(-1, `temp`);
 * p.add(0.4, `humidty`);
 * ```
 *
 * Options can be specified to customise plot
 * ```
 * const p = plot(`#parentDiv`, {
 *  capacity: 100,     // How many data points to store (default: 10)
 *  showYAxis: false,  // Toggle whether y axis is shown (default: true)
 *  lineWidth: 2,      // Width of plot line (default: 2)
 *  yAxes:  [`temp`],  // Only show these y axes (by default all are shown)
 *  palette: Palette,  // Colour palette instance to use
 *  coalesce: true,    // If true, sub-pixel data points are skipped, improving performance for dense plots at the expense of plot precision
 * });
 * ```
 *
 * For all `capacity` values other than `0`, a circular array is used to track data. Otherwise an array is used that will
 * grow infinitely.
 *
 * By default, will attempt to use CSS variable `--series[seriesName]` for axis colours.
 *  `--series[name]-axis` for titles. Eg `--seriesX`. For data added without a named series,
 * it will use `--series` and `--series-axis`.
 * @param parentElOrQuery
 * @param opts
 * @return Plotter instance
 */
declare const plot: (parentElOrQuery: string | HTMLElement, opts: PlotOpts) => Plotter;

type Plot_Plotter = Plotter;
type Plot_Axis = Axis;
type Plot_SeriesColours = SeriesColours;
type Plot_PlotOpts = PlotOpts;
declare const Plot_defaultAxis: typeof defaultAxis;
declare const Plot_calcScale: typeof calcScale;
declare const Plot_add: typeof add;
declare const Plot_drawValue: typeof drawValue;
declare const Plot_draw: typeof draw;
declare const Plot_plot: typeof plot;
declare namespace Plot {
  export {
    Plot_Plotter as Plotter,
    Plot_Axis as Axis,
    Plot_SeriesColours as SeriesColours,
    Plot_PlotOpts as PlotOpts,
    Plot_defaultAxis as defaultAxis,
    Plot_calcScale as calcScale,
    Plot_add as add,
    Plot_drawValue as drawValue,
    Plot_draw as draw,
    Plot_plot as plot,
  };
}

declare type Cmyk = readonly [number, number, number, number];
declare type Lab = readonly [number, number, number];
declare type Rgb$1 = readonly [number, number, number];
declare type DictColour = {
    readonly name: string;
    readonly combinations: ReadonlyArray<number>;
    readonly swatch: number;
    readonly cmyk: Cmyk;
    readonly lab: Lab;
    readonly rgb: Rgb$1;
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
    alias(from: string, to: string): void;
};
declare const create: (fallbacks?: readonly string[] | undefined) => Palette;

type Palette$1_Palette = Palette;
declare const Palette$1_create: typeof create;
declare namespace Palette$1 {
  export {
    Palette$1_Palette as Palette,
    Palette$1_create as create,
  };
}

declare type Hsl = {
    h: number;
    s: number;
    l: number;
    opacity?: number;
};
declare type Rgb = {
    r: number;
    g: number;
    b: number;
    opacity?: number;
};
declare type Spaces = `hsl` | `rgb` | `lab` | `hcl` | `cubehelix`;
/**
 * @private
 */
declare type Colour = d3Colour.RGBColor | d3Colour.HSLColor;
declare type Colourish = string | d3Colour.ColorCommonInstance;
/**
 * Options for interpolation
 */
declare type InterpolationOpts = {
    /**
     * Gamma correction. Eg 4 brightens values. Only applies to rgb and cubehelix
     * [Read more](https://github.com/d3/d3-interpolate#interpolate_gamma)
     */
    gamma?: number;
    /**
     * Colour space
     */
    space?: Spaces;
    /**
     * If true, interpolation happens the longer distance. Only applies to hsl, hcl and cubehelix
     */
    long?: boolean;
};
/**
 * Parses colour to {h,s,l}. `opacity` field is added if it exists on source.
 * @param colour
 * @returns
 */
declare const toHsl: (colour: Colourish) => Hsl;
/**
 * Parses colour to {r,g,b}. `opacity` field is added if it exists on source.
 * @param colour
 * @returns
 */
declare const toRgb: (colour: Colourish) => Rgb;
/**
 * Returns a colour in hex format `#000000`
 * @param colour
 * @returns Hex format, including #
 */
declare const toHex: (colour: Colourish) => string;
/**
 * Returns a variation of colour with its opacity multiplied by `amt`.
 *
 * ```js
 * opacity(`blue`, 0.5);
 * ```
 * @param colour
 * @param amt
 * @returns
 */
declare const opacity: (colour: Colourish, amt: number) => string;
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
/**
 * Interpolates between two colours, returning a string
 *
 * @example
 * ```js
 * // Get 50% between blue and red
 * interpolate(0.5, `blue`, `red`);
 *
 * // Get midway point, with specified colour space
 * interpolate(0.5, `hsl(200, 100%, 50%)`, `pink`, {space: `hcl`});
 * ```
 * @param amount Amount (0 = from, 0.5 halfway, 1= to)
 * @param from Starting colour
 * @param to Final colour
 * @param optsOrSpace Options for interpolation, or string name for colour space, eg `hsl`.
 * @returns String representation of colour, eg. `rgb(x,x,x)`
 */
declare const interpolate: (amount: number, from: Colourish, to: Colourish, optsOrSpace?: string | InterpolationOpts | undefined) => string;
/**
 * Produces a scale of colours as a string array
 *
 * @example
 * ```js
 * // Yields array of 5 colour strings
 * const s = scale(5, {space:`hcl`}, `blue`, `red`);
 * // Produces scale between three colours
 * const s = scale(5, {space:`hcl`}, `blue`, `yellow`, `red`);
 * ```
 * @param steps Number of colours
 * @param opts Options for interpolation, or string colour space eg `hsl`
 * @param colours From/end colours (or more)
 * @returns
 */
declare const scale: (steps: number, opts: InterpolationOpts | string, ...colours: Colourish[]) => string[];

type Colour$1_Hsl = Hsl;
type Colour$1_Rgb = Rgb;
type Colour$1_Spaces = Spaces;
type Colour$1_Colour = Colour;
type Colour$1_Colourish = Colourish;
type Colour$1_InterpolationOpts = InterpolationOpts;
declare const Colour$1_toHsl: typeof toHsl;
declare const Colour$1_toRgb: typeof toRgb;
declare const Colour$1_toHex: typeof toHex;
declare const Colour$1_opacity: typeof opacity;
declare const Colour$1_getCssVariable: typeof getCssVariable;
declare const Colour$1_interpolate: typeof interpolate;
declare const Colour$1_scale: typeof scale;
declare namespace Colour$1 {
  export {
    Colour$1_Hsl as Hsl,
    Colour$1_Rgb as Rgb,
    Colour$1_Spaces as Spaces,
    Colour$1_Colour as Colour,
    Colour$1_Colourish as Colourish,
    Colour$1_InterpolationOpts as InterpolationOpts,
    Colour$1_toHsl as toHsl,
    Colour$1_toRgb as toRgb,
    Colour$1_toHex as toHex,
    Colour$1_opacity as opacity,
    Colour$1_getCssVariable as getCssVariable,
    Colour$1_interpolate as interpolate,
    Colour$1_scale as scale,
  };
}

declare const index_Drawing: typeof Drawing;
declare const index_Svg: typeof Svg;
declare const index_Plot: typeof Plot;
declare const index_DictionaryOfColourCombinations: typeof DictionaryOfColourCombinations;
declare namespace index {
  export {
    Colour$1 as Colour,
    Palette$1 as Palette,
    index_Drawing as Drawing,
    index_Svg as Svg,
    index_Plot as Plot,
    index_DictionaryOfColourCombinations as DictionaryOfColourCombinations,
  };
}

export { Colour$1 as C, Drawing as D, Palette$1 as P, Plot as a, DictionaryOfColourCombinations as b, index as i };
