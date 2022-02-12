import { e as Rect, P as Path, f as Line, R as RectPositioned, a as Point } from './Rect-320e55dc';
import { Q as QuadraticBezier, a as CubicBezier, b as CirclePositioned, c as ArcPositioned } from './Circle-f30fc0a6';
import { a as Stack } from './Interfaces-99011dee';

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
    paths(pathsToDraw: Path[], opts?: DrawingOpts | undefined): void;
    line(lineToDraw: Line | Line[], opts?: DrawingOpts | undefined): void;
    rect(rectsToDraw: RectPositioned | RectPositioned[], opts?: (DrawingOpts & {
        filled?: boolean | undefined;
    }) | undefined): void;
    bezier(bezierToDraw: QuadraticBezier | CubicBezier, opts?: DrawingOpts | undefined): void;
    connectedPoints(pointsToDraw: Point[], opts?: (DrawingOpts & {
        loop?: boolean | undefined;
    }) | undefined): void;
    pointLabels(pointsToDraw: Point[], opts?: DrawingOpts | undefined): void;
    dot(dotPosition: Point | Point[], opts?: (DrawingOpts & {
        radius: number;
        outlined?: boolean | undefined;
        filled?: boolean | undefined;
    }) | undefined): void;
    circle(circlesToDraw: CirclePositioned | CirclePositioned[], opts: DrawingOpts): void;
    arc(arcsToDraw: ArcPositioned | ArcPositioned[], opts: DrawingOpts): void;
    textBlock(lines: string[], opts: DrawingOpts & {
        anchor: Point;
        anchorPadding?: number;
        bounds?: RectPositioned;
    }): void;
};
/**
 * Drawing options
 */
declare type DrawingOpts = {
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
declare const arc: (ctx: CanvasRenderingContext2D, arcs: ArcPositioned | ReadonlyArray<ArcPositioned>, opts?: DrawingOpts) => void;
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
declare const lineThroughPoints: (ctx: CanvasRenderingContext2D, points: readonly Point[], opts?: DrawingOpts | undefined) => void;
/**
 * Draws one or more circles
 * @param ctx
 * @param circlesToDraw
 * @param opts
 */
declare const circle: (ctx: CanvasRenderingContext2D, circlesToDraw: CirclePositioned | readonly CirclePositioned[], opts?: DrawingOpts) => void;
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
declare const bezier: (ctx: CanvasRenderingContext2D, bezierToDraw: QuadraticBezier | CubicBezier, opts?: DrawingOpts | undefined) => void;
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
declare const rect: (ctx: CanvasRenderingContext2D, toDraw: RectPositioned | readonly RectPositioned[], opts?: DrawingOpts & {
    readonly filled?: boolean;
}) => void;
/**
 * Draws a block of text. Each array item is considered a line.
 * @param ctx
 * @param lines
 * @param opts
 */
declare const textBlock: (ctx: CanvasRenderingContext2D, lines: readonly string[], opts: DrawingOpts & {
    readonly anchor: Point;
    readonly anchorPadding?: number;
    readonly bounds?: RectPositioned;
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
  };
}

export { Drawing as D, arc as a, connectedPoints as b, circle as c, drawingStack as d, pointLabels as e, bezier as f, getCtx as g, line as h, lineThroughPoints as l, makeHelper as m, paths as p, rect as r, textBlock as t };
