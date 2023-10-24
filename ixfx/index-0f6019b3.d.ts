import { j as CellAccessor, f as Rect, d as Path, L as Line, R as RectPositioned, a as Point, e as CirclePositioned } from './Point-bfc55176.js';
import { c as Rgb, C as Colour } from './Arrays-205913df.js';
import { Q as QuadraticBezier, C as CubicBezier, b as ArcPositioned, c as EllipsePositioned, T as Triangle } from './Triangle-d2c5ec69.js';
import { b as IStackImmutable, c as IMapOfMutableExtended, I as ICircularArray } from './IMapOfMutableExtended-16486249.js';
import { S as Svg } from './Svg-9c6258e7.js';
import { V as Video } from './Video-02eb65f6.js';

declare const accessor: (image: ImageData) => CellAccessor<Rgb>;

declare const ImageDataGrid_accessor: typeof accessor;
declare namespace ImageDataGrid {
  export {
    ImageDataGrid_accessor as accessor,
  };
}

/**
 * Options
 */
type BipolarViewOptions = Readonly<{
    width?: number;
    height?: number;
    labelPrecision?: number;
    labels?: [string, string];
    axisColour?: string;
    bgColour?: string;
    whiskerColour?: string;
    whiskerSize?: number;
    dotColour?: string;
    dotRadius?: number;
    showWhiskers?: boolean;
    showDot?: boolean;
    showLabels?: boolean;
    padding?: number;
    labelColour?: string;
    axisWidth?: number;
    asPercentages?: boolean;
    /**
     * Custom rendering for background
     */
    renderBackground?: Render;
}>;
type Render = (ctx: CanvasRenderingContext2D, width: number, height: number) => void;
/**
 * A function that plots a point on the graph
 */
type BipolarView = (x: number, y: number) => void;
/**
 * Initialises a plotter for bipolar values (-1...1)
 *
 * ```js
 * const p = BipolarView.init(`#my-canvas`);
 * // Shows the dot at 1, 0.5
 * p(1, 0.5);
 * ```
 * @param elementQuery
 * @param opts
 * @returns
 */
declare const init: (elementQuery: string, opts?: BipolarViewOptions) => BipolarView;

type BipolarView$1_BipolarView = BipolarView;
type BipolarView$1_BipolarViewOptions = BipolarViewOptions;
type BipolarView$1_Render = Render;
declare const BipolarView$1_init: typeof init;
declare namespace BipolarView$1 {
  export {
    BipolarView$1_BipolarView as BipolarView,
    BipolarView$1_BipolarViewOptions as BipolarViewOptions,
    BipolarView$1_Render as Render,
    BipolarView$1_init as init,
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

type CanvasCtxQuery = null | string | CanvasRenderingContext2D | HTMLCanvasElement;
/**
 * Gets a 2d drawing context from canvas element or query, or throws an error
 * @param canvasElCtxOrQuery Canvas element reference or DOM query
 * @returns Drawing context.
 */
declare const getContext: (canvasElCtxOrQuery: CanvasCtxQuery) => CanvasRenderingContext2D;
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
declare const textRect: (ctx: CanvasRenderingContext2D, text?: string | null, padding?: number, widthMultiple?: number) => Rect;
declare const textHeight: (ctx: CanvasRenderingContext2D, text?: string | null, padding?: number) => number;
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
declare const Drawing_getContext: typeof getContext;
declare const Drawing_line: typeof line;
declare const Drawing_lineThroughPoints: typeof lineThroughPoints;
declare const Drawing_makeHelper: typeof makeHelper;
declare const Drawing_paths: typeof paths;
declare const Drawing_pointLabels: typeof pointLabels;
declare const Drawing_rect: typeof rect;
declare const Drawing_textBlock: typeof textBlock;
declare const Drawing_textBlockAligned: typeof textBlockAligned;
declare const Drawing_textHeight: typeof textHeight;
declare const Drawing_textRect: typeof textRect;
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
    Drawing_getContext as getContext,
    Drawing_line as line,
    Drawing_lineThroughPoints as lineThroughPoints,
    Drawing_makeHelper as makeHelper,
    Drawing_paths as paths,
    Drawing_pointLabels as pointLabels,
    Drawing_rect as rect,
    Drawing_textBlock as textBlock,
    Drawing_textBlockAligned as textBlockAligned,
    Drawing_textHeight as textHeight,
    Drawing_textRect as textRect,
    Drawing_textWidth as textWidth,
    Drawing_translatePoint as translatePoint,
    Drawing_triangle as triangle,
  };
}

type Measurement = {
    actual: Rect;
    ref: Box;
    children: Array<Measurement | undefined>;
};
type Layout = {
    actual: Point;
    ref: Box;
    children: Array<Layout | undefined>;
};
type PxUnit = {
    value: number;
    type: `px`;
};
type PcUnit = {
    value: number;
    type: `pc`;
};
type BoxUnit = PxUnit | PcUnit;
type BoxRect = {
    x?: BoxUnit;
    y?: BoxUnit;
    width?: BoxUnit;
    height?: BoxUnit;
};
declare const boxUnitFromPx: (v: number) => PxUnit;
declare const boxRectFromPx: (x: number, y: number, width: number, height: number) => BoxRect;
declare const boxRectFromRectPx: (r: RectPositioned) => BoxRect;
declare class BaseState {
    bounds: RectPositioned;
    pass: number;
    constructor(bounds: RectPositioned);
    resolveToPx(u: BoxUnit | undefined, maxValue: number, defaultValue?: number): number | undefined;
    resolveBox(box: BoxRect | undefined): Rect | RectPositioned | undefined;
}
declare class MeasureState extends BaseState {
    measurements: Map<string, Measurement>;
    constructor(bounds: RectPositioned);
    getActualSize(id: string): Rect | undefined;
    whatIsMeasured(): Array<string>;
}
declare class LayoutState extends BaseState {
    layouts: Map<string, Layout>;
    constructor(bounds: RectPositioned);
}
/**
 * Box
 */
declare abstract class Box {
    /** Rectangle Box occupies in canvas/etc */
    canvasRegion: RectPositioned;
    private _desiredRect;
    protected _measuredSize: Rect | undefined;
    protected _layoutPosition: Point | undefined;
    protected children: Array<Box>;
    protected readonly _parent: Box | undefined;
    private _idMap;
    debugLayout: boolean;
    private _visible;
    protected _ready: boolean;
    takesSpaceWhenInvisible: boolean;
    protected _needsMeasuring: boolean;
    protected _needsLayoutX: boolean;
    protected _needsDrawing: boolean;
    debugHue: number;
    readonly id: string;
    /**
     * Constructor.
     *
     * If `parent` is provided, `parent.onChildAdded(this)` is called.
     * @param parent parent box
     * @param id id of this box
     */
    constructor(parent: Box | undefined, id: string);
    /**
     * Returns _true_ if `box` is a child
     * @param box
     * @returns
     */
    hasChild(box: Box): boolean;
    /**
     * Sends a message to all child boxes.
     *
     * This first calls `onNotify` on this instance,
     * before calling `notify()` on each child.
     * @param message
     * @param source
     */
    notify(message: string, source: Box): void;
    getChildren(): Generator<never, IterableIterator<[number, Box]>, unknown>;
    /**
     * Handles a received message
     * @param _message
     * @param _source
     */
    protected onNotify(_message: string, _source: Box): void;
    /**
     * Notification a child box has been added
     *
     * Throws if
     * - child has parent as its own child
     * - child is same as this
     * - child is already child of this
     * @param child
     */
    protected onChildAdded(child: Box): void;
    /**
     * Sets `_ready` to `ready`. If `includeChildren` is _true_,
     * `setReady` is called on each child
     * @param ready
     * @param includeChildren
     */
    setReady(ready: boolean, includeChildren?: boolean): void;
    /**
     * Gets visible state
     */
    get visible(): boolean;
    /**
     * Sets visible state
     */
    set visible(v: boolean);
    /**
     * Gets the box's desired region, or _undefined_
     */
    get desiredRegion(): BoxRect | undefined;
    /**
     * Sets the box's desired region.
     * Calls `onLayoutNeeded()`
     */
    set desiredRegion(v: BoxRect | undefined);
    /**
     * Calls `notifyChildLayoutNeeded`
     */
    layoutInvalidated(reason: string): void;
    drawingInvalidated(_reason: string): void;
    /**
     * Called from a child, notifying us that
     * its layout has changed
     * @returns
     */
    private notifyChildLayoutNeeded;
    /**
     * Returns the root box
     */
    get root(): Box;
    /**
     * Prepare for measuring
     */
    protected measurePreflight(): void;
    /**
     * Applies actual size, returning _true_ if size is different than before
     *
     * 1. Sets `_needsLayout` to _false_.
     * 2. Sets `visual` to `m`
     * 3. Calls `measureApply` on each child
     * 4. If there's a change or `force`, sets `needsDrawing` to _true_, and notifies root of `measureApplied`
     * @param m Measurement for box
     * @param force If true forces `measureApplied` notify
     * @returns
     */
    protected measureApply(m: Measurement): boolean;
    protected layoutApply(l: Layout): boolean;
    /**
     * Debug log from this box context
     * @param m
     */
    debugLog(m: any): void;
    layoutStart(measureState: MeasureState, layoutState: LayoutState, force: boolean, parent?: Layout): Layout | undefined;
    protected layoutSelf(measureState: MeasureState, layoutState: LayoutState, _parent?: Layout): Point | undefined;
    /**
     * Start of measuring
     * 1. Keeps track of measurements in `opts.measurements`
     * 2. If this box takes space
     * 2.1. Measure itself if needed
     * 2.2. Use size
     * 2. Calls `measureStart` on each child
     * @param opts Options
     * @param force
     * @param parent Parent's measurement
     * @returns Measurement
     */
    measureStart(opts: MeasureState, force: boolean, parent?: Measurement): Measurement | undefined;
    /**
     * Measure the box
     * 1. Uses desired rectangle, if possible
     * 2. Otherwise uses parent's size
     * @param opts Measure state
     * @param parent Parent size
     * @returns
     */
    protected measureSelf(opts: MeasureState, parent?: Measurement): Rect | string;
    /**
     * Gets initial state for a run of measurements & layout.
     *
     * Called when update() is called
     * @param force
     */
    protected abstract updateBegin(context: any): [MeasureState, LayoutState];
    protected abstract updateComplete(measureChanged: boolean, layoutChanged: boolean): void;
    /**
     * Update has completed
     * @param state
     * @param force
     */
    /**
     * Update
     * 1. Calls `this.updateBegin()` to initialise measurement state
     * 2. In a loop, run `measureStart()` and then `measureApply` if possible
     * 3. Call `updateDone` when finished
     * @param force
     * @returns
     */
    update(context: object, force?: boolean): void;
}
/**
 * Canvas measure state
 */
declare class CanvasMeasureState extends MeasureState {
    readonly ctx: CanvasRenderingContext2D;
    constructor(bounds: RectPositioned, ctx: CanvasRenderingContext2D);
}
declare class CanvasLayoutState extends LayoutState {
    readonly ctx: CanvasRenderingContext2D;
    constructor(bounds: RectPositioned, ctx: CanvasRenderingContext2D);
}
/**
 * A Box that exists on a HTMLCanvasElement
 */
declare class CanvasBox extends Box {
    readonly bounds: RectPositioned | undefined;
    constructor(parent: CanvasBox | undefined, id: string, bounds?: RectPositioned);
    static fromCanvas(canvasElement: HTMLCanvasElement): CanvasBox;
    /**
     * Called if this is the parent Box
     */
    addEventHandlers(element: HTMLElement): void;
    protected onClick(_p: Point): void;
    /**
     * Click event has happened on canvas
     * 1. If it's within our range, call `onClick` and pass to all children via `notifyClick`
     * @param p
     * @returns
     */
    private notifyClick;
    /**
     * Pointer has left
     * 1. Pass notification to all children via `notifyPointerLeave`
     */
    private notifyPointerLeave;
    /**
     * Pointer has moved
     * 1. If it's within range `onPointerMove` is called, and pass on to all children via `notifyPointerMove`
     * @param p
     * @returns
     */
    private notifyPointerMove;
    /**
     * Handler when pointer has left
     */
    protected onPointerLeave(): void;
    /**
     * Handler when pointer moves within our region
     * @param _p
     */
    protected onPointerMove(_p: Point): void;
    /**
     * Performs recalculations and drawing as necessary
     * If nothing needs to happen, function returns.
     * @param context
     * @param force
     */
    update(context: CanvasRenderingContext2D, force?: boolean): void;
    getBounds(): RectPositioned | undefined;
    /**
     * Update begins.
     * @returns MeasureState
     */
    protected updateBegin(context: CanvasRenderingContext2D): [MeasureState, LayoutState];
    protected updateComplete(_measureChanged: boolean, _layoutChanged: boolean): void;
    protected measureApply(m: Measurement): boolean;
    protected layoutApply(l: Layout): boolean;
    draw(ctx: CanvasRenderingContext2D, force?: boolean): void;
    /**
     * Draw this object
     * @param _ctx
     */
    protected drawSelf(_ctx: CanvasRenderingContext2D): void;
}

type SceneGraph_Box = Box;
declare const SceneGraph_Box: typeof Box;
type SceneGraph_BoxRect = BoxRect;
type SceneGraph_BoxUnit = BoxUnit;
type SceneGraph_CanvasBox = CanvasBox;
declare const SceneGraph_CanvasBox: typeof CanvasBox;
type SceneGraph_CanvasLayoutState = CanvasLayoutState;
declare const SceneGraph_CanvasLayoutState: typeof CanvasLayoutState;
type SceneGraph_CanvasMeasureState = CanvasMeasureState;
declare const SceneGraph_CanvasMeasureState: typeof CanvasMeasureState;
type SceneGraph_Layout = Layout;
type SceneGraph_LayoutState = LayoutState;
declare const SceneGraph_LayoutState: typeof LayoutState;
type SceneGraph_MeasureState = MeasureState;
declare const SceneGraph_MeasureState: typeof MeasureState;
type SceneGraph_Measurement = Measurement;
type SceneGraph_PcUnit = PcUnit;
type SceneGraph_PxUnit = PxUnit;
declare const SceneGraph_boxRectFromPx: typeof boxRectFromPx;
declare const SceneGraph_boxRectFromRectPx: typeof boxRectFromRectPx;
declare const SceneGraph_boxUnitFromPx: typeof boxUnitFromPx;
declare namespace SceneGraph {
  export {
    SceneGraph_Box as Box,
    SceneGraph_BoxRect as BoxRect,
    SceneGraph_BoxUnit as BoxUnit,
    SceneGraph_CanvasBox as CanvasBox,
    SceneGraph_CanvasLayoutState as CanvasLayoutState,
    SceneGraph_CanvasMeasureState as CanvasMeasureState,
    SceneGraph_Layout as Layout,
    SceneGraph_LayoutState as LayoutState,
    SceneGraph_MeasureState as MeasureState,
    SceneGraph_Measurement as Measurement,
    SceneGraph_PcUnit as PcUnit,
    SceneGraph_PxUnit as PxUnit,
    SceneGraph_boxRectFromPx as boxRectFromPx,
    SceneGraph_boxRectFromRectPx as boxRectFromRectPx,
    SceneGraph_boxUnitFromPx as boxUnitFromPx,
  };
}

/**
 *
 *  const dataStream = new DataStream();
 *  dataStream.in({ key: `x`, value: 0.5 });
 *  const label = (obj:any) => {
 *    if (`key` in obj) return obj;
 *    return { key: randomKey(), ...obj }
 *  }
 *  const stream = pipeline(dataStream, label);
 *  // Actively compute size of window based on window width
 *  const windowSize = ops.divide(rxWindow.innerWidth, pointSize);
 *  const dataWindow = window(stream, windowSize);
 *  const dataToPoints = (value);
 *
 *  const drawPlot = (dataWindow) => {
 *    for (const dataPoint in dataWindow) {
 *    }
 *  }
 */
/**
 * A data source
 */
type DataSource = {
    dirty: boolean;
    type: string;
    get range(): DataRange;
    add(value: number): void;
    clear(): void;
};
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
    axisStrokeColour?: string;
    axisTextColour?: string;
    legendTextColour?: string;
    /**
     * Width for axis lines
     */
    axisStrokeWidth?: number;
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
declare class Series$1 {
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
    constructor(plot: Plot, region: RectPositioned);
    clear(): void;
    protected measureSelf(opts: MeasureState, _parent?: Measurement): Rect | string;
    protected layoutSelf(measureState: MeasureState, _layoutState: LayoutState, _parent: Layout): {
        x: number;
        y: number;
    };
    protected onNotify(message: string, source: Box): void;
    protected onPointerLeave(): void;
    protected onPointerMove(p: Point): void;
    protected measurePreflight(): void;
    updateTooltip(): void;
    protected drawSelf(ctx: CanvasRenderingContext2D): void;
    computeY(series: Series$1, rawValue: number): number;
    drawDataSet(series: Series$1, d: Array<number>, ctx: CanvasRenderingContext2D): void;
}
declare class Legend extends CanvasBox {
    private plot;
    sampleSize: {
        width: number;
        height: number;
    };
    padding: number;
    widthSnapping: number;
    labelMeasurements: Map<string, RectPositioned>;
    constructor(plot: Plot, region: RectPositioned);
    clear(): void;
    protected layoutSelf(measureState: MeasureState, layoutState: LayoutState, _parent: Layout): {
        x: number;
        y: number;
    };
    protected measureSelf(opts: CanvasMeasureState, _parent?: Measurement): Rect | RectPositioned | string;
    protected drawSelf(ctx: CanvasRenderingContext2D): void;
    protected onNotify(message: string, source: Box): void;
}
declare class AxisX extends CanvasBox {
    private plot;
    paddingPx: number;
    colour?: string;
    constructor(plot: Plot, region: RectPositioned);
    clear(): void;
    protected onNotify(message: string, source: Box): void;
    protected drawSelf(ctx: CanvasRenderingContext2D): void;
    protected measureSelf(opts: CanvasMeasureState, _parent?: Measurement): Rect | RectPositioned | string;
    protected layoutSelf(measureState: MeasureState, _layoutState: LayoutState, _parent?: Layout | undefined): Point | undefined;
}
declare class AxisY extends CanvasBox {
    private plot;
    private _maxDigits;
    seriesToShow: string | undefined;
    paddingPx: number;
    colour?: string;
    lastRange: DataRange;
    lastPlotAreaHeight: number;
    constructor(plot: Plot, region: RectPositioned);
    clear(): void;
    protected measurePreflight(): void;
    protected onNotify(message: string, source: Box): void;
    protected measureSelf(copts: CanvasMeasureState): Rect;
    protected layoutSelf(_measureState: MeasureState, _layoutState: LayoutState, _parent?: Layout | undefined): Point;
    protected drawSelf(ctx: CanvasRenderingContext2D): void;
    getSeries(): Series$1 | undefined;
    seriesAxis(series: Series$1, ctx: CanvasRenderingContext2D): void;
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
    axisStrokeColour: string;
    axisTextColour: string;
    legendTextColour: string;
    axisStrokeWidth: number;
    series: Map<string, Series$1>;
    private _frozen;
    private _canvasEl;
    private _ctx;
    defaultSeriesOpts?: SeriesOpts;
    constructor(canvasElementOrQuery: HTMLCanvasElement | string, opts?: Opts);
    update(ctx?: CanvasRenderingContext2D, force?: boolean): void;
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
    seriesArray(): Array<Series$1>;
    get seriesLength(): number;
    /**
     * Plots a simple object, eg `{ x: 10, y: 20, z: 300 }`
     * Series are automatically created for each property of `o`
     *
     * Be sure to call `update()` to visually refresh.
     * @param o
     */
    plot(o: any): void;
    createSeriesFromObject(o: any, prefix?: string): Array<Series$1>;
    createSeries(name?: string, type?: `stream` | `array`, seriesOpts?: SeriesOpts): Series$1;
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
    Series$1 as Series,
    Plot2_SeriesOpts as SeriesOpts,
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
type Series = {
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
declare const calcScale: (buffer: BufferType, drawingOpts: DrawingOpts, seriesColours?: SeriesColours) => Series[];
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

type PlotOld_Axis = Axis;
type PlotOld_BufferType = BufferType;
type PlotOld_DrawingOpts = DrawingOpts;
type PlotOld_PlotOpts = PlotOpts;
type PlotOld_Plotter = Plotter;
type PlotOld_Series = Series;
type PlotOld_SeriesColours = SeriesColours;
declare const PlotOld_add: typeof add;
declare const PlotOld_calcScale: typeof calcScale;
declare const PlotOld_defaultAxis: typeof defaultAxis;
declare const PlotOld_draw: typeof draw;
declare const PlotOld_drawValue: typeof drawValue;
declare const PlotOld_plot: typeof plot;
declare namespace PlotOld {
  export {
    PlotOld_Axis as Axis,
    PlotOld_BufferType as BufferType,
    PlotOld_DrawingOpts as DrawingOpts,
    PlotOld_PlotOpts as PlotOpts,
    PlotOld_Plotter as Plotter,
    PlotOld_Series as Series,
    PlotOld_SeriesColours as SeriesColours,
    PlotOld_add as add,
    PlotOld_calcScale as calcScale,
    PlotOld_defaultAxis as defaultAxis,
    PlotOld_draw as draw,
    PlotOld_drawValue as drawValue,
    PlotOld_plot as plot,
  };
}

/**
 * Scales a canvas to account for retina displays.
 *
 * ```js
 * const r = scaleCanvas(`#my-canvas`);
 * r.ctx;      // CanvasRendering2D
 * r.element;  // HTMLCanvasElement
 * r.bounds;   // {x:number,y:number,width:number,height:number}
 * ```
 *
 * Eg:
 * ```js
 * const { ctx } = scaleCanvas(`#my-canvas`);
 * ctx.fillStyle = `red`;
 * ctx.fillRect(0,0,100,100);
 * ```
 *
 * Throws an error if `domQueryOrElement` does not resolve.w
 * @param domQueryOrElement
 * @returns
 */
declare const scaleCanvas: (domQueryOrElement: HTMLCanvasElement | string) => {
    ctx: CanvasRenderingContext2D;
    element: HTMLCanvasElement;
    bounds: DOMRect;
};

declare const index_Colour: typeof Colour;
declare const index_Drawing: typeof Drawing;
declare const index_ImageDataGrid: typeof ImageDataGrid;
declare const index_Plot2: typeof Plot2;
declare const index_PlotOld: typeof PlotOld;
declare const index_SceneGraph: typeof SceneGraph;
declare const index_Svg: typeof Svg;
declare const index_Video: typeof Video;
declare const index_scaleCanvas: typeof scaleCanvas;
declare namespace index {
  export {
    BipolarView$1 as BipolarView,
    index_Colour as Colour,
    index_Drawing as Drawing,
    index_ImageDataGrid as ImageDataGrid,
    Palette$1 as Palette,
    index_Plot2 as Plot2,
    index_PlotOld as PlotOld,
    index_SceneGraph as SceneGraph,
    index_Svg as Svg,
    index_Video as Video,
    index_scaleCanvas as scaleCanvas,
  };
}

export { BipolarView$1 as B, Drawing as D, ImageDataGrid as I, Palette$1 as P, SceneGraph as S, Plot2 as a, PlotOld as b, index as i, scaleCanvas as s };
