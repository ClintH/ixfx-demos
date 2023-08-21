import { f as Rect, d as Path, L as Line, R as RectPositioned, a as Point, e as CirclePositioned, j as CellAccessor } from './Point-94426255.js';
import { Q as QuadraticBezier, C as CubicBezier, b as ArcPositioned, c as EllipsePositioned, T as Triangle } from './Triangle-b874ed56.js';
import { b as IStackImmutable, d as IMapOfMutableExtended, I as ICircularArray } from './IMapOfMutableExtended-2d4706a0.js';
import { S as Svg } from './Svg-e149fbb1.js';
import { b as Rgb, C as Colour } from './Arrays-83c49f17.js';
import { V as Video } from './Video-02eb65f6.js';

type CanvasCtxQuery = null | string | CanvasRenderingContext2D | HTMLCanvasElement;
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
declare const makeHelper: (ctxOrCanvasEl: CanvasCtxQuery, canvasBounds?: Rect) => {
    paths(pathsToDraw: Path[], opts?: DrawingOpts$1): void;
    line(lineToDraw: Line | Line[], opts?: DrawingOpts$1): void;
    rect(rectsToDraw: RectPositioned | RectPositioned[], opts?: DrawingOpts$1 & {
        filled?: boolean;
    }): void;
    bezier(bezierToDraw: QuadraticBezier | CubicBezier, opts?: DrawingOpts$1): void;
    connectedPoints(pointsToDraw: Point[], opts?: DrawingOpts$1 & {
        loop?: boolean;
    }): void;
    pointLabels(pointsToDraw: Point[], opts?: DrawingOpts$1): void;
    dot(dotPosition: Point | Point[], opts?: DrawingOpts$1 & {
        radius: number;
        outlined?: boolean;
        filled?: boolean;
    }): void;
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
type DrawingOpts$1 = {
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
type LineOpts = {
    readonly lineWidth?: number;
    readonly lineCap?: CanvasLineCap;
    readonly lineJoin?: CanvasLineJoin;
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
type StackOp = (ctx: CanvasRenderingContext2D) => void;
/**
 * A drawing stack (immutable)
 */
type DrawingStack = {
    /**
     * Push a new drawing op
     * @param op Operation to add
     * @returns stack with added op
     */
    push(...ops: readonly StackOp[]): DrawingStack;
    /**
     * Pops an operatiomn
     * @returns Drawing stack with item popped
     */
    pop(): DrawingStack;
    /**
     * Applies drawing stack
     */
    apply(): DrawingStack;
};
/**
 * Creates and returns an immutable drawing stack for a context
 * @param ctx Context
 * @param stk Initial stack operations
 * @returns
 */
declare const drawingStack: (ctx: CanvasRenderingContext2D, stk?: IStackImmutable<StackOp>) => DrawingStack;
declare const lineThroughPoints: (ctx: CanvasRenderingContext2D, points: readonly Point[], opts?: DrawingOpts$1) => void;
/**
 * Draws one or more circles. Will draw outline/fill depending on
 * whether `strokeStyle` or `fillStyle` params are present in the drawing options.
 *
 * ```js
 * // Draw a circle with radius of 10 at 0,0
 * circle(ctx, {radius:10});
 *
 * // Draw a circle of radius 10 at 100,100
 * circle(ctx, {radius: 10, x: 100, y: 100});
 *
 * // Draw two blue outlined circles
 * circle(ctx, [ {radius: 5}, {radius: 10} ], {strokeStyle:`blue`});
 * ```
 * @param ctx Drawing context
 * @param circlesToDraw Circle(s) to draw
 * @param opts Drawing options
 */
declare const circle: (ctx: CanvasRenderingContext2D, circlesToDraw: CirclePositioned | readonly CirclePositioned[], opts?: DrawingOpts$1) => void;
/**
 * Draws one or more ellipses. Will draw outline/fill depending on
 * whether `strokeStyle` or `fillStyle` params are present in the drawing options.
 * @param ctx
 * @param ellipsesToDraw
 * @param opts
 */
declare const ellipse: (ctx: CanvasRenderingContext2D, ellipsesToDraw: EllipsePositioned | readonly EllipsePositioned[], opts?: DrawingOpts$1) => void;
/**
 * Draws one or more paths.
 * supported paths are quadratic beziers and lines.
 * @param ctx
 * @param pathsToDraw
 * @param opts
 */
declare const paths: (ctx: CanvasRenderingContext2D, pathsToDraw: readonly Path[] | Path, opts?: {
    readonly strokeStyle?: string;
    readonly debug?: boolean;
}) => void;
/**
 * Draws a line between all the given points.
 * If a fillStyle is specified, it will be filled.
 *
 * See also:
 * * {@link line}: Draw one or more lines
 *
 * @param ctx
 * @param pts
 */
declare const connectedPoints: (ctx: CanvasRenderingContext2D, pts: readonly Point[], opts?: {
    readonly loop?: boolean;
    readonly fillStyle?: string;
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
}, labels?: readonly string[]) => void;
/**
 * Returns `point` with the canvas's translation matrix applied
 * @param ctx
 * @param point
 * @returns
 */
declare const translatePoint: (ctx: CanvasRenderingContext2D, point: Point) => Point;
/**
 * Creates a new HTML IMG element with a snapshot of the
 * canvas. Element will need to be inserted into the document.
 *
 * ```
 * const myCanvas = document.getElementById('someCanvas');
 * const el = copyToImg(myCanvas);
 * document.getElementById('images').appendChild(el);
 * ```
 * @param canvasEl
 * @returns
 */
declare const copyToImg: (canvasEl: HTMLCanvasElement) => HTMLImageElement;
/**
 * Draws filled circle(s) at provided point(s)
 * @param ctx
 * @param pos
 * @param opts
 */
declare const dot: (ctx: CanvasRenderingContext2D, pos: Point | readonly Point[], opts?: DrawingOpts$1 & {
    readonly radius?: number;
    readonly outlined?: boolean;
    readonly filled?: boolean;
}) => void;
/**
 * Draws a cubic or quadratic bezier
 * @param ctx
 * @param bezierToDraw
 * @param opts
 */
declare const bezier: (ctx: CanvasRenderingContext2D, bezierToDraw: QuadraticBezier | CubicBezier, opts?: DrawingOpts$1) => void;
/**
 * Draws one or more lines.
 *
 * Each line is drawn independently, ie it's not assumed lines are connected.
 *
 * See also:
 * * {@link connectedPoints}: Draw a series of connected points
 * @param ctx
 * @param toDraw
 * @param opts
 */
declare const line: (ctx: CanvasRenderingContext2D, toDraw: Line | readonly Line[], opts?: LineOpts & DrawingOpts$1) => void;
/**
 * Draws one or more triangles
 * @param ctx
 * @param toDraw
 * @param opts
 */
declare const triangle: (ctx: CanvasRenderingContext2D, toDraw: Triangle | readonly Triangle[], opts?: DrawingOpts$1 & {
    readonly filled?: boolean;
}) => void;
/**
 * Draws one or more rectangles
 * @param ctx
 * @param toDraw
 * @param opts
 */
declare const rect: (ctx: CanvasRenderingContext2D, toDraw: RectPositioned | readonly RectPositioned[], opts?: DrawingOpts$1 & {
    readonly filled?: boolean;
    readonly stroked?: boolean;
}) => void;
/**
 * Returns the width of `text`. Rounds number up to nearest multiple if provided. If
 * text is empty or undefined, 0 is returned.
 * @param ctx
 * @param text
 * @param widthMultiple
 * @returns
 */
declare const textWidth: (ctx: CanvasRenderingContext2D, text?: string | null, padding?: number, widthMultiple?: number) => number;
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
type HorizAlign = `left` | `right` | `center`;
type VertAlign = `top` | `center` | `bottom`;
/**
 * Draws an aligned text block
 */
declare const textBlockAligned: (ctx: CanvasRenderingContext2D, text: readonly string[] | string, opts: DrawingOpts$1 & {
    readonly bounds: RectPositioned;
    readonly horiz?: HorizAlign;
    readonly vert?: VertAlign;
}) => void;

type Drawing_CanvasCtxQuery = CanvasCtxQuery;
type Drawing_DrawingStack = DrawingStack;
type Drawing_HorizAlign = HorizAlign;
type Drawing_LineOpts = LineOpts;
type Drawing_StackOp = StackOp;
type Drawing_VertAlign = VertAlign;
declare const Drawing_arc: typeof arc;
declare const Drawing_bezier: typeof bezier;
declare const Drawing_circle: typeof circle;
declare const Drawing_connectedPoints: typeof connectedPoints;
declare const Drawing_copyToImg: typeof copyToImg;
declare const Drawing_dot: typeof dot;
declare const Drawing_drawingStack: typeof drawingStack;
declare const Drawing_ellipse: typeof ellipse;
declare const Drawing_getCtx: typeof getCtx;
declare const Drawing_line: typeof line;
declare const Drawing_lineThroughPoints: typeof lineThroughPoints;
declare const Drawing_makeHelper: typeof makeHelper;
declare const Drawing_paths: typeof paths;
declare const Drawing_pointLabels: typeof pointLabels;
declare const Drawing_rect: typeof rect;
declare const Drawing_textBlock: typeof textBlock;
declare const Drawing_textBlockAligned: typeof textBlockAligned;
declare const Drawing_textWidth: typeof textWidth;
declare const Drawing_translatePoint: typeof translatePoint;
declare const Drawing_triangle: typeof triangle;
declare namespace Drawing {
  export {
    Drawing_CanvasCtxQuery as CanvasCtxQuery,
    DrawingOpts$1 as DrawingOpts,
    Drawing_DrawingStack as DrawingStack,
    Drawing_HorizAlign as HorizAlign,
    Drawing_LineOpts as LineOpts,
    Drawing_StackOp as StackOp,
    Drawing_VertAlign as VertAlign,
    Drawing_arc as arc,
    Drawing_bezier as bezier,
    Drawing_circle as circle,
    Drawing_connectedPoints as connectedPoints,
    Drawing_copyToImg as copyToImg,
    Drawing_dot as dot,
    Drawing_drawingStack as drawingStack,
    Drawing_ellipse as ellipse,
    Drawing_getCtx as getCtx,
    Drawing_line as line,
    Drawing_lineThroughPoints as lineThroughPoints,
    Drawing_makeHelper as makeHelper,
    Drawing_paths as paths,
    Drawing_pointLabels as pointLabels,
    Drawing_rect as rect,
    Drawing_textBlock as textBlock,
    Drawing_textBlockAligned as textBlockAligned,
    Drawing_textWidth as textWidth,
    Drawing_translatePoint as translatePoint,
    Drawing_triangle as triangle,
  };
}

type Plotter = {
    add(value: number, series?: string, skipDrawing?: boolean): void;
    drawValue(index: number): void;
    /**
     * Draws current data. Useful if skipDrawing was true for earlier add() calls.
     */
    draw(): void;
    clear(): void;
    dispose(): void;
};
/**
 * Series
 */
type Series$1 = {
    min: number;
    max: number;
    range: number;
    name: string;
    colour: string;
    lastValue?: number;
    hoverValue?: number;
};
/**
 * Drawing options
 */
type DrawingOpts = PlotOpts & {
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
    digitsPrecision: number;
    lineWidth: number;
    defaultSeriesColour: string;
    defaultSeriesVariable?: string;
    showLegend: boolean;
    pointer: {
        x: number;
        y: number;
    };
};
/**
 * Properties for an axis
 */
type Axis = {
    allowedSeries?: string[];
    /**
     * Name of axis, eg `x`
     */
    name: string;
    /**
     * Colour to use for axis labels
     */
    colour?: string;
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
type SeriesColours = {
    [id: string]: string | undefined;
};
/**
 * Plotter options
 */
type PlotOpts = {
    debug?: boolean;
    seriesColours?: SeriesColours;
    /**
     * Default: 2
     */
    digitsPrecision?: number;
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
    defaultSeriesColour?: string;
    defaultSeriesVariable?: string;
    showLegend?: boolean;
};
declare const defaultAxis: (name: string) => Axis;
declare const calcScale: (buffer: BufferType, drawingOpts: DrawingOpts, seriesColours?: SeriesColours) => Series$1[];
declare const add: (buffer: BufferType, value: number, series?: string) => void;
type BufferType = IMapOfMutableExtended<number, ICircularArray<number>> | IMapOfMutableExtended<number, ReadonlyArray<number>>;
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

type Plot$1_Axis = Axis;
type Plot$1_BufferType = BufferType;
type Plot$1_DrawingOpts = DrawingOpts;
type Plot$1_PlotOpts = PlotOpts;
type Plot$1_Plotter = Plotter;
type Plot$1_SeriesColours = SeriesColours;
declare const Plot$1_add: typeof add;
declare const Plot$1_calcScale: typeof calcScale;
declare const Plot$1_defaultAxis: typeof defaultAxis;
declare const Plot$1_draw: typeof draw;
declare const Plot$1_drawValue: typeof drawValue;
declare const Plot$1_plot: typeof plot;
declare namespace Plot$1 {
  export {
    Plot$1_Axis as Axis,
    Plot$1_BufferType as BufferType,
    Plot$1_DrawingOpts as DrawingOpts,
    Plot$1_PlotOpts as PlotOpts,
    Plot$1_Plotter as Plotter,
    Series$1 as Series,
    Plot$1_SeriesColours as SeriesColours,
    Plot$1_add as add,
    Plot$1_calcScale as calcScale,
    Plot$1_defaultAxis as defaultAxis,
    Plot$1_draw as draw,
    Plot$1_drawValue as drawValue,
    Plot$1_plot as plot,
  };
}

type Measurement = {
    size: Rect | RectPositioned;
    ref: Box;
    children: Array<Measurement | undefined>;
};
type PxUnit = {
    value: number;
    type: `px`;
};
type BoxUnit = PxUnit;
type BoxRect = {
    x?: BoxUnit;
    y?: BoxUnit;
    width?: BoxUnit;
    height?: BoxUnit;
};
declare class MeasureState {
    bounds: Rect;
    pass: number;
    measurements: Map<string, Measurement>;
    constructor(bounds: Rect);
    getSize(id: string): Rect | undefined;
    resolveToPx(u: BoxUnit | undefined, defaultValue: number): number;
}
declare abstract class Box {
    visual: RectPositioned;
    private _desiredSize;
    private _lastMeasure;
    protected children: Box[];
    protected readonly _parent: Box | undefined;
    private _idMap;
    debugLayout: boolean;
    private _visible;
    protected _ready: boolean;
    takesSpaceWhenInvisible: boolean;
    needsDrawing: boolean;
    protected _needsLayout: boolean;
    debugHue: number;
    readonly id: string;
    constructor(parent: Box | undefined, id: string);
    hasChild(box: Box): boolean;
    notify(msg: string, source: Box): void;
    protected onNotify(msg: string, source: Box): void;
    protected onChildAdded(child: Box): void;
    setReady(ready: boolean, includeChildren?: boolean): void;
    get visible(): boolean;
    set visible(v: boolean);
    get desiredSize(): BoxRect | undefined;
    set desiredSize(v: BoxRect | undefined);
    onLayoutNeeded(): void;
    private notifyChildLayoutNeeded;
    get root(): Box;
    protected measurePreflight(): void;
    /**
     * Applies measurement, returning true if size is different than before
     * @param size
     * @returns
     */
    measureApply(m: Measurement, force: boolean): boolean;
    debugLog(m: any): void;
    measureStart(opts: MeasureState, force: boolean, parent?: Measurement): Measurement | undefined;
    protected measureSelf(opts: MeasureState, parent?: Measurement): RectPositioned | Rect | undefined;
    /**
     * Called when update() is called
     * @param force
     */
    protected abstract updateBegin(force: boolean): MeasureState;
    protected updateDone(state: MeasureState, force: boolean): void;
    abstract onUpdateDone(state: MeasureState, force: boolean): void;
    update(force?: boolean): void;
}
declare class CanvasMeasureState extends MeasureState {
    readonly ctx: CanvasRenderingContext2D;
    constructor(bounds: Rect, ctx: CanvasRenderingContext2D);
}
declare class CanvasBox extends Box {
    readonly canvasEl: HTMLCanvasElement;
    constructor(parent: CanvasBox | undefined, canvasEl: HTMLCanvasElement, id: string);
    private designateRoot;
    protected onClick(p: Point): void;
    private notifyClick;
    private notifyPointerLeave;
    private notifyPointerMove;
    protected onPointerLeave(): void;
    protected onPointerMove(p: Point): void;
    protected updateBegin(): MeasureState;
    onUpdateDone(state: MeasureState, force: boolean): void;
    protected drawSelf(ctx: CanvasRenderingContext2D): void;
}

type SceneGraph_Box = Box;
declare const SceneGraph_Box: typeof Box;
type SceneGraph_BoxRect = BoxRect;
type SceneGraph_BoxUnit = BoxUnit;
type SceneGraph_CanvasBox = CanvasBox;
declare const SceneGraph_CanvasBox: typeof CanvasBox;
type SceneGraph_CanvasMeasureState = CanvasMeasureState;
declare const SceneGraph_CanvasMeasureState: typeof CanvasMeasureState;
type SceneGraph_MeasureState = MeasureState;
declare const SceneGraph_MeasureState: typeof MeasureState;
type SceneGraph_Measurement = Measurement;
type SceneGraph_PxUnit = PxUnit;
declare namespace SceneGraph {
  export {
    SceneGraph_Box as Box,
    SceneGraph_BoxRect as BoxRect,
    SceneGraph_BoxUnit as BoxUnit,
    SceneGraph_CanvasBox as CanvasBox,
    SceneGraph_CanvasMeasureState as CanvasMeasureState,
    SceneGraph_MeasureState as MeasureState,
    SceneGraph_Measurement as Measurement,
    SceneGraph_PxUnit as PxUnit,
  };
}

/**
 * A data source
 */
interface DataSource {
    dirty: boolean;
    type: string;
    get range(): DataRange;
    add(value: number): void;
    clear(): void;
}
/**
 * Plot options
 */
type Opts = {
    /**
     * If true, Canvas will be resized to fit parent
     */
    autoSize?: boolean;
    /**
     * Colour for axis lines & labels
     */
    axisColour?: string;
    /**
     * Width for axis lines
     */
    axisWidth?: number;
};
/**
 * Series options
 */
type SeriesOpts = {
    /**
     * Colour for series
     */
    colour: string;
    /**
     * Visual width/height (depends on drawingStyle)
     */
    width?: number;
    /**
     * How series should be rendered
     */
    drawingStyle?: `line` | `dotted` | `bar`;
    /**
     * Preferred data range
     */
    axisRange?: DataRange;
    /**
     * If true, range will stay at min/max, rather than continuously adapting
     * to the current data range.
     */
    visualRangeStretch?: boolean;
};
type DataPoint = {
    value: number;
    index: number;
    title?: string;
};
type DataHitPoint = (pt: Point) => [point: DataPoint | undefined, distance: number];
type DataRange = {
    min: number;
    max: number;
    changed?: boolean;
};
declare class Series {
    private plot;
    name: string;
    colour: string;
    source: DataSource;
    drawingStyle: `line` | `dotted` | `bar`;
    width: number;
    dataHitPoint: DataHitPoint | undefined;
    tooltip?: string;
    precision: number;
    readonly axisRange: DataRange;
    lastPxPerPt: number;
    protected _visualRange: DataRange;
    protected _visualRangeStretch: boolean;
    constructor(name: string, sourceType: `array` | `stream`, plot: Plot, opts: SeriesOpts);
    formatValue(v: number): string;
    get visualRange(): DataRange;
    scaleValue(value: number): number;
    add(value: number): void;
    /**
     * Clears the underlying source
     * and sets a flag that the plot area needs redrawing
     */
    clear(): void;
}
declare class PlotArea extends CanvasBox {
    private plot;
    paddingPx: number;
    piPi: number;
    pointerDistanceThreshold: number;
    lastRangeChange: number;
    pointer: Point | undefined;
    constructor(plot: Plot);
    clear(): void;
    protected measureSelf(opts: MeasureState, parent?: Measurement): Rect | RectPositioned | undefined;
    protected onNotify(msg: string, source: Box): void;
    protected onPointerLeave(): void;
    protected onPointerMove(p: Point): void;
    protected measurePreflight(): void;
    updateTooltip(): void;
    protected drawSelf(ctx: CanvasRenderingContext2D): void;
    computeY(series: Series, rawValue: number): number;
    drawDataSet(series: Series, d: number[], ctx: CanvasRenderingContext2D): void;
}
declare class Legend extends CanvasBox {
    private plot;
    sampleSize: {
        width: number;
        height: number;
    };
    padding: number;
    widthSnapping: number;
    constructor(plot: Plot);
    clear(): void;
    protected measureSelf(opts: MeasureState, parent?: Measurement): Rect | RectPositioned | undefined;
    protected drawSelf(ctx: CanvasRenderingContext2D): void;
    protected onNotify(msg: string, source: Box): void;
}
declare class AxisX extends CanvasBox {
    private plot;
    paddingPx: number;
    colour?: string;
    constructor(plot: Plot);
    clear(): void;
    protected onNotify(msg: string, source: Box): void;
    protected drawSelf(ctx: CanvasRenderingContext2D): void;
    protected measureSelf(opts: MeasureState, parent?: Measurement): Rect | RectPositioned | undefined;
}
declare class AxisY extends CanvasBox {
    private plot;
    private _maxDigits;
    seriesToShow: string | undefined;
    paddingPx: number;
    colour?: string;
    lastRange: DataRange;
    lastPlotAreaHeight: number;
    constructor(plot: Plot);
    clear(): void;
    protected measurePreflight(): void;
    protected onNotify(msg: string, source: Box): void;
    protected measureSelf(opts: MeasureState): RectPositioned;
    protected drawSelf(ctx: CanvasRenderingContext2D): void;
    getSeries(): Series | undefined;
    seriesAxis(series: Series, ctx: CanvasRenderingContext2D): void;
}
/**
 * Canvas-based data plotter.
 *
 * ```
 * const p = new Plot(document.getElementById(`myCanvas`), opts);
 *
 * // Plot 1-5 as series  test'
 * p.createSeries(`test`, `array`, [1,2,3,4,5]);
 *
 * // Create a streaming series, add a random number
 * const s = p.createSeries(`test2`, `stream`);
 * s.add(Math.random());
 * ```
 * `createSeries` returns the {@link Series} instance with properties for fine-tuning
 *
 * For simple usage, use `plot(someData)` which automatically creates
 * series for the properties of an object.
 */
declare class Plot extends CanvasBox {
    plotArea: PlotArea;
    legend: Legend;
    axisX: AxisX;
    axisY: AxisY;
    axisColour: string;
    axisWidth: number;
    series: Map<string, Series>;
    private _frozen;
    defaultSeriesOpts?: SeriesOpts;
    constructor(canvasEl: HTMLCanvasElement, opts?: Opts);
    /**
     * Calls 'clear()' on each of the series
     */
    clearSeries(): void;
    /**
     * Removes all series, plot, legend
     * and axis data.
     */
    clear(): void;
    get frozen(): boolean;
    set frozen(v: boolean);
    seriesArray(): Series[];
    get seriesLength(): number;
    /**
     * Plots a simple object, eg `{ x: 10, y: 20, z: 300 }`
     * Series are automatically created for each property of `o`
     *
     * Be sure to call `update()` to visually refresh.
     * @param o
     */
    plot(o: any): void;
    createSeriesFromObject(o: any, prefix?: string): Series[];
    createSeries(name?: string, type?: `stream` | `array`, seriesOpts?: SeriesOpts): Series;
}

type Plot2_AxisX = AxisX;
declare const Plot2_AxisX: typeof AxisX;
type Plot2_AxisY = AxisY;
declare const Plot2_AxisY: typeof AxisY;
type Plot2_DataHitPoint = DataHitPoint;
type Plot2_DataPoint = DataPoint;
type Plot2_DataRange = DataRange;
type Plot2_DataSource = DataSource;
type Plot2_Legend = Legend;
declare const Plot2_Legend: typeof Legend;
type Plot2_Opts = Opts;
type Plot2_Plot = Plot;
declare const Plot2_Plot: typeof Plot;
type Plot2_PlotArea = PlotArea;
declare const Plot2_PlotArea: typeof PlotArea;
type Plot2_Series = Series;
declare const Plot2_Series: typeof Series;
type Plot2_SeriesOpts = SeriesOpts;
declare namespace Plot2 {
  export {
    Plot2_AxisX as AxisX,
    Plot2_AxisY as AxisY,
    Plot2_DataHitPoint as DataHitPoint,
    Plot2_DataPoint as DataPoint,
    Plot2_DataRange as DataRange,
    Plot2_DataSource as DataSource,
    Plot2_Legend as Legend,
    Plot2_Opts as Opts,
    Plot2_Plot as Plot,
    Plot2_PlotArea as PlotArea,
    Plot2_Series as Series,
    Plot2_SeriesOpts as SeriesOpts,
  };
}

/**
 * Manage a set of colours. Uses CSS variables as a fallback if colour is not added
 *
 */
type Palette = {
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
declare const create: (fallbacks?: readonly string[]) => Palette;

type Palette$1_Palette = Palette;
declare const Palette$1_create: typeof create;
declare namespace Palette$1 {
  export {
    Palette$1_Palette as Palette,
    Palette$1_create as create,
  };
}

declare const accessor: (image: ImageData) => CellAccessor<Rgb>;

declare const ImageDataGrid_accessor: typeof accessor;
declare namespace ImageDataGrid {
  export {
    ImageDataGrid_accessor as accessor,
  };
}

declare const index_Colour: typeof Colour;
declare const index_Drawing: typeof Drawing;
declare const index_ImageDataGrid: typeof ImageDataGrid;
declare const index_Plot2: typeof Plot2;
declare const index_SceneGraph: typeof SceneGraph;
declare const index_Svg: typeof Svg;
declare const index_Video: typeof Video;
declare namespace index {
  export {
    index_Colour as Colour,
    index_Drawing as Drawing,
    index_ImageDataGrid as ImageDataGrid,
    Palette$1 as Palette,
    Plot$1 as Plot,
    index_Plot2 as Plot2,
    index_SceneGraph as SceneGraph,
    index_Svg as Svg,
    index_Video as Video,
  };
}

export { Drawing as D, ImageDataGrid as I, Palette$1 as P, SceneGraph as S, Plot$1 as a, Plot2 as b, index as i };
