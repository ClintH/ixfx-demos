import { P as Point } from './PointType-DYug3Yo5.js';
import { L as Line } from './LineType-FU9c78oU.js';
import { P as Path } from './PathType-BjzQ3mag.js';
import { R as Rect, a as RectPositioned } from './RectTypes-Brg8Cmy-.js';
import { C as CirclePositioned } from './CircleType-HV1S_Vyw.js';
import { Q as QuadraticBezier, C as CubicBezier, A as ArcPositioned, E as EllipsePositioned, T as Triangle } from './ArcType-BQP6bHin.js';
import { I as IStackImmutable } from './IStackImmutable-BNEmWxct.js';

type CanvasContextQuery = null | string | CanvasRenderingContext2D | HTMLCanvasElement;
/**
 * Gets a 2d drawing context from canvas element or query, or throws an error
 * @param canvasElementContextOrQuery Canvas element reference or DOM query
 * @returns Drawing context.
 */
declare const getContext: (canvasElementContextOrQuery: CanvasContextQuery) => CanvasRenderingContext2D;
type DrawingHelper = ReturnType<typeof makeHelper>;
/**
 * Makes a helper object that wraps together a bunch of drawing functions that all use the same drawing context
 * @param ctxOrCanvasEl Drawing context or canvs element reference
 * @param canvasBounds Bounds of drawing (optional). Used for limiting `textBlock`
 * @returns
 */
declare const makeHelper: (ctxOrCanvasEl: CanvasContextQuery, canvasBounds?: Rect) => {
    ctx: CanvasRenderingContext2D;
    paths(pathsToDraw: Array<Path>, opts?: DrawingOpts): void;
    line(lineToDraw: Line | Array<Line>, opts?: DrawingOpts): void;
    rect(rectsToDraw: RectPositioned | Array<RectPositioned>, opts?: RectOpts): void;
    bezier(bezierToDraw: QuadraticBezier | CubicBezier, opts?: DrawingOpts): void;
    connectedPoints(pointsToDraw: Array<Point>, opts?: DrawingOpts & Partial<ConnectedPointsOptions>): void;
    pointLabels(pointsToDraw: Array<Point>, opts?: DrawingOpts): void;
    dot(dotPosition: Point | Array<Point>, opts?: DotOpts): void;
    circle(circlesToDraw: CirclePositioned | Array<CirclePositioned>, opts: DrawingOpts): void;
    arc(arcsToDraw: ArcPositioned | Array<ArcPositioned>, opts: DrawingOpts): void;
    textBlock(lines: Array<string>, opts: DrawingOpts & {
        anchor: Point;
        anchorPadding?: number;
        bounds?: RectPositioned;
    }): void;
};
/**
 * Drawing options
 */
type DrawingOpts = {
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
declare const arc: (ctx: CanvasRenderingContext2D, arcs: ArcPositioned | ReadonlyArray<ArcPositioned>, opts?: DrawingOpts) => void;
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
     * @param ops Operation to add
     * @returns stack with added op
     */
    push(...ops: ReadonlyArray<StackOp>): DrawingStack;
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
/**
 * Draws a curved line through a set of points
 * @param ctx
 * @param points
 * @param opts
 */
declare const lineThroughPoints: (ctx: CanvasRenderingContext2D, points: ReadonlyArray<Point>, opts?: DrawingOpts) => void;
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
declare const circle: (ctx: CanvasRenderingContext2D, circlesToDraw: CirclePositioned | ReadonlyArray<CirclePositioned>, opts?: DrawingOpts) => void;
/**
 * Draws one or more ellipses. Will draw outline/fill depending on
 * whether `strokeStyle` or `fillStyle` params are present in the drawing options.
 * @param ctx
 * @param ellipsesToDraw
 * @param opts
 */
declare const ellipse: (ctx: CanvasRenderingContext2D, ellipsesToDraw: EllipsePositioned | ReadonlyArray<EllipsePositioned>, opts?: DrawingOpts) => void;
/**
 * Draws one or more paths.
 * supported paths are quadratic beziers and lines.
 * @param ctx
 * @param pathsToDraw
 * @param opts
 */
declare const paths: (ctx: CanvasRenderingContext2D, pathsToDraw: ReadonlyArray<Path> | Path, opts?: {
    readonly strokeStyle?: string;
    readonly debug?: boolean;
}) => void;
type ConnectedPointsOptions = {
    readonly lineWidth: number;
    readonly loop: boolean;
    readonly fillStyle: string;
    readonly strokeStyle: string;
};
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
declare const connectedPoints: (ctx: CanvasRenderingContext2D, pts: ReadonlyArray<Point>, opts?: Partial<ConnectedPointsOptions>) => void;
/**
 * Draws labels for a set of points
 * @param ctx
 * @param pts Points to draw
 * @param opts
 * @param labels Labels for points
 */
declare const pointLabels: (ctx: CanvasRenderingContext2D, pts: ReadonlyArray<Point>, opts?: {
    readonly fillStyle?: string;
}, labels?: ReadonlyArray<string>) => void;
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
type DotOpts = DrawingOpts & {
    readonly radius?: number;
    readonly stroke?: boolean;
    readonly filled?: boolean;
    readonly strokeWidth?: number;
};
/**
 * Draws filled circle(s) at provided point(s)
 * @param ctx
 * @param pos
 * @param opts
 */
declare const dot: (ctx: CanvasRenderingContext2D, pos: Point | Array<Point | CirclePositioned> | CirclePositioned, opts?: DotOpts) => void;
/**
 * Draws a cubic or quadratic bezier
 * @param ctx
 * @param bezierToDraw
 * @param opts
 */
declare const bezier: (ctx: CanvasRenderingContext2D, bezierToDraw: QuadraticBezier | CubicBezier, opts?: DrawingOpts) => void;
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
declare const line: (ctx: CanvasRenderingContext2D, toDraw: Line | ReadonlyArray<Line>, opts?: LineOpts & DrawingOpts) => void;
/**
 * Draws one or more triangles
 * @param ctx
 * @param toDraw
 * @param opts
 */
declare const triangle: (ctx: CanvasRenderingContext2D, toDraw: Triangle | ReadonlyArray<Triangle>, opts?: DrawingOpts & {
    readonly filled?: boolean;
}) => void;
type RectOpts = DrawingOpts & {
    readonly stroke?: boolean;
    readonly filled?: boolean;
    readonly strokeWidth?: number;
};
/**
 * Draws one or more rectangles.
 *
 * @param ctx
 * @param toDraw
 * @param opts
 */
declare const rect: (ctx: CanvasRenderingContext2D, toDraw: Rect | RectPositioned | ReadonlyArray<RectPositioned>, opts?: RectOpts) => void;
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
declare const textBlock: (ctx: CanvasRenderingContext2D, lines: ReadonlyArray<string>, opts: DrawingOpts & {
    readonly anchor: Point;
    readonly anchorPadding?: number;
    readonly bounds?: RectPositioned;
}) => void;
type HorizAlign = `left` | `right` | `center`;
type VertAlign = `top` | `center` | `bottom`;
/**
 * Draws an aligned text block
 */
declare const textBlockAligned: (ctx: CanvasRenderingContext2D, text: ReadonlyArray<string> | string, opts: DrawingOpts & {
    readonly bounds: RectPositioned;
    readonly horiz?: HorizAlign;
    readonly vert?: VertAlign;
}) => void;

type Drawing_CanvasContextQuery = CanvasContextQuery;
type Drawing_ConnectedPointsOptions = ConnectedPointsOptions;
type Drawing_DotOpts = DotOpts;
type Drawing_DrawingHelper = DrawingHelper;
type Drawing_DrawingOpts = DrawingOpts;
type Drawing_DrawingStack = DrawingStack;
type Drawing_HorizAlign = HorizAlign;
type Drawing_LineOpts = LineOpts;
type Drawing_RectOpts = RectOpts;
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
  export { type Drawing_CanvasContextQuery as CanvasContextQuery, type Drawing_ConnectedPointsOptions as ConnectedPointsOptions, type Drawing_DotOpts as DotOpts, type Drawing_DrawingHelper as DrawingHelper, type Drawing_DrawingOpts as DrawingOpts, type Drawing_DrawingStack as DrawingStack, type Drawing_HorizAlign as HorizAlign, type Drawing_LineOpts as LineOpts, type Drawing_RectOpts as RectOpts, type Drawing_StackOp as StackOp, type Drawing_VertAlign as VertAlign, Drawing_arc as arc, Drawing_bezier as bezier, Drawing_circle as circle, Drawing_connectedPoints as connectedPoints, Drawing_copyToImg as copyToImg, Drawing_dot as dot, Drawing_drawingStack as drawingStack, Drawing_ellipse as ellipse, Drawing_getContext as getContext, Drawing_line as line, Drawing_lineThroughPoints as lineThroughPoints, Drawing_makeHelper as makeHelper, Drawing_paths as paths, Drawing_pointLabels as pointLabels, Drawing_rect as rect, Drawing_textBlock as textBlock, Drawing_textBlockAligned as textBlockAligned, Drawing_textHeight as textHeight, Drawing_textRect as textRect, Drawing_textWidth as textWidth, Drawing_translatePoint as translatePoint, Drawing_triangle as triangle };
}

export { type DrawingHelper as D, Drawing as a };
