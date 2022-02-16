import { a as CirclePositioned } from './Circle-c8def07e';
import { f as Line, a as Point, e as Rect } from './Rect-0db90c49';

/**
 * Creates and adds an SVG path element
 * @example
 * ```js
 * const paths = [
 *  `M300,200`,
 *  `a25,25 -30 0,1 50, -25 l 50,-25`
 * ]
 * const pathEl = path(paths, parentEl);
 * ```
 * @param svgOrArray Path syntax, or array of paths. Can be empty if path data will be added later
 * @param parent SVG parent element
 * @param opts Options Drawing options
 * @returns
 */
declare const path: (svgOrArray: string | readonly string[], parent: SVGElement, opts?: DrawingOpts | undefined, queryOrExisting?: string | SVGPathElement | undefined) => SVGPathElement;
declare const circleUpdate: (el: SVGCircleElement, circle: CirclePositioned, opts?: DrawingOpts | undefined) => void;
declare const circle: (circle: CirclePositioned, parent: SVGElement, opts?: DrawingOpts | undefined, queryOrExisting?: string | SVGCircleElement | undefined) => SVGCircleElement;
declare const line: (line: Line, parent: SVGElement, opts?: LineDrawingOpts | undefined, queryOrExisting?: string | SVGLineElement | undefined) => SVGLineElement;
declare const textPathUpdate: (el: SVGTextPathElement, text?: string | undefined, opts?: TextPathDrawingOpts | undefined) => void;
declare const textPath: (pathRef: string, text: string, parent: SVGElement, opts?: TextPathDrawingOpts | undefined, queryOrExisting?: string | SVGTextPathElement | undefined) => SVGTextPathElement;
declare const textUpdate: (el: SVGTextElement, pos?: Point | undefined, text?: string | undefined, opts?: TextDrawingOpts | undefined) => void;
/**
 * Creates a SVG Text element
 * @param pos Position of text
 * @param text Text
 * @param parent
 * @param opts
 * @param queryOrExisting
 * @returns
 */
declare const text: (text: string, parent: SVGElement, pos?: Point | undefined, opts?: TextDrawingOpts | undefined, queryOrExisting?: string | SVGTextElement | undefined) => SVGTextElement;
/**
 * Creates a square grid based at a center point, with cells having `spacing` height and width.
 *
 * It fits in as many cells as it can within `width` and `height`.
 *
 * Returns a SVG group, consisting of horizontal and vertical lines
 * @param parent Parent element
 * @param center Center point of grid
 * @param spacing Width/height of cells
 * @param width How wide grid should be
 * @param height How high grid should be
 * @param opts
 */
declare const grid: (parent: SVGElement, center: Point, spacing: number, width: number, height: number, opts?: LineDrawingOpts) => SVGGElement;

declare const SvgElements_path: typeof path;
declare const SvgElements_circleUpdate: typeof circleUpdate;
declare const SvgElements_circle: typeof circle;
declare const SvgElements_line: typeof line;
declare const SvgElements_textPathUpdate: typeof textPathUpdate;
declare const SvgElements_textPath: typeof textPath;
declare const SvgElements_textUpdate: typeof textUpdate;
declare const SvgElements_text: typeof text;
declare const SvgElements_grid: typeof grid;
declare namespace SvgElements {
  export {
    SvgElements_path as path,
    SvgElements_circleUpdate as circleUpdate,
    SvgElements_circle as circle,
    SvgElements_line as line,
    SvgElements_textPathUpdate as textPathUpdate,
    SvgElements_textPath as textPath,
    SvgElements_textUpdate as textUpdate,
    SvgElements_text as text,
    SvgElements_grid as grid,
  };
}

declare type MarkerOpts = DrawingOpts & {
    readonly id: string;
    readonly markerWidth?: number;
    readonly markerHeight?: number;
    readonly orient?: string;
    readonly viewBox?: string;
    readonly refX?: number;
    readonly refY?: number;
};
/**
 * Drawing options
 */
declare type DrawingOpts = {
    /**
     * Style for lines. Eg `white`.
     * @see [stroke](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke)
     */
    readonly strokeStyle?: string;
    /**
     * Style for fill. Eg `black`.
     * @see [fill](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill)
     */
    readonly fillStyle?: string;
    /**
     * If true, debug helpers are drawn
     */
    readonly debug?: boolean;
    /**
     * Width of stroke, eg `2`
     * @see [stroke-width](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-width)
     */
    readonly strokeWidth?: number;
    /**
     * Stroke dash pattern, eg `5`
     * @see [stroke-dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray)
     */
    readonly strokeDash?: string;
};
declare type LineDrawingOpts = DrawingOpts & PathDrawingOpts;
declare type PathDrawingOpts = {
    readonly markerEnd?: MarkerOpts;
    readonly markerStart?: MarkerOpts;
    readonly markerMid?: MarkerOpts;
};
declare type TextDrawingOpts = DrawingOpts & {
    readonly anchor?: `start` | `middle` | `end`;
    readonly align?: `text-bottom` | `text-top` | `baseline` | `top` | `hanging` | `middle`;
};
declare type TextPathDrawingOpts = TextDrawingOpts & {
    readonly method?: `align` | `stretch`;
    readonly side?: `left` | `right`;
    readonly spacing?: `auto` | `exact`;
    readonly startOffset?: number;
    readonly textLength?: number;
};
/**
 * Creates and appends a SVG element.
 * If `queryOrExisting` is specified, element will be returned if it already exists.
 * @param parent Parent element
 * @param type Type of SVG element
 * @param queryOrExisting Query, eg `#id`
 * @returns
 */
declare const createOrResolve: <V extends SVGElement>(parent: SVGElement, type: string, queryOrExisting?: string | V | undefined) => V;
/**
 * Adds definition if it doesn't already exist
 * @param parent
 * @param id
 * @param creator
 * @returns
 */
/**
 * Creates an element of `type` and with `id` (if specified)
 * @param type Element type, eg `circle`
 * @param id Optional id to assign to element
 * @returns Element
 */
declare const createEl: <V extends SVGElement>(type: string, id?: string | undefined) => V;
/**
 * Applies path drawing options to given element
 * Applies: markerEnd, markerStart, markerMid
 * @param elem Element (presumed path)
 * @param opts Options
 */
declare const applyPathOpts: (elem: SVGElement, opts: PathDrawingOpts) => void;
/**
 * Applies drawing options to given SVG element.
 * Applies: fillStyle, strokeStyle, strokeWidth, strokeDash
 * @param elem Element
 * @param opts Drawing options
 */
declare const applyOpts: (elem: SVGElement, opts: DrawingOpts) => void;
/**
 * Helper to make SVG elements with a common parent.
 *
 * Create with {@link makeHelper}.
 */
declare type SvgHelper = {
    /**
     * Creates a text element
     * @param text Text
     * @param pos Position
     * @param opts Drawing options
     * @param queryOrExisting DOM query to look up existing element, or the element instance
     */
    text(text: string, pos: Point, opts?: TextDrawingOpts, queryOrExisting?: string | SVGTextElement): SVGTextElement;
    /**
     * Creates text on a path
     * @param pathRef Reference to path element
     * @param text Text
     * @param opts Drawing options
     * @param queryOrExisting DOM query to look up existing element, or the element instance
     */
    textPath(pathRef: string, text: string, opts?: TextDrawingOpts, queryOrExisting?: string | SVGTextPathElement): SVGTextPathElement;
    /**
     * Creates a line
     * @param line Line
     * @param opts Drawing options
     * @param queryOrExisting DOM query to look up existing element, or the element instance
     */
    line(line: Line, opts?: LineDrawingOpts, queryOrExisting?: string | SVGLineElement): SVGLineElement;
    /**
     * Creates a circle
     * @param circle Circle
     * @param opts Drawing options
     * @param queryOrExisting DOM query to look up existing element, or the element instance
     */
    circle(circle: CirclePositioned, opts?: DrawingOpts, queryOrExisting?: string | SVGCircleElement): SVGCircleElement;
    /**
     * Creates a path
     * @param svgStr Path description, or empty string
     * @param opts Drawing options
     * @param queryOrExisting DOM query to look up existing element, or the element instance
     */
    path(svgStr: string | readonly string[], opts?: DrawingOpts, queryOrExisting?: string | SVGPathElement): SVGPathElement;
    /**
     * Creates a grid of horizontal and vertical lines inside of a group
     * @param center Grid origin
     * @param spacing Cell size
     * @param width Width of grid
     * @param height Height of grid
     * @param opts Drawing options
     */
    grid(center: Point, spacing: number, width: number, height: number, opts?: DrawingOpts): SVGGElement;
    /**
     * Returns an element if it exists in parent
     * @param selectors Eg `#path`
     */
    query<V extends SVGElement>(selectors: string): V | null;
    /**
     * Gets the width of the parent
     */
    get width(): number;
    /**
     * Sets the width of the parent
     */
    set width(width: number);
    /**
     * Gets the parent
     */
    get parent(): SVGElement;
    /**
     * Gets the height of the parent
     */
    get height(): number;
    /**
     * Sets the height of the parent
     */
    set height(height: number);
    /**
     * Deletes all child elements
     */
    clear(): void;
};
/**
 * Get the bounds of an SVG element (determined by its width/height attribs)
 * @param svg
 * @returns
 */
declare const getBounds: (svg: SVGElement) => Rect;
/**
 * Set the bounds of an element, using its width/height attribs.
 * @param svg
 * @param bounds
 */
declare const setBounds: (svg: SVGElement, bounds: Rect) => void;
/**
 * @inheritdoc SvgHelper
 * @param parent
 * @param parentOpts
 * @returns
 */
declare const makeHelper: (parent: SVGElement, parentOpts?: DrawingOpts | undefined) => SvgHelper;

type Svg_MarkerOpts = MarkerOpts;
type Svg_DrawingOpts = DrawingOpts;
type Svg_LineDrawingOpts = LineDrawingOpts;
type Svg_PathDrawingOpts = PathDrawingOpts;
type Svg_TextDrawingOpts = TextDrawingOpts;
type Svg_TextPathDrawingOpts = TextPathDrawingOpts;
declare const Svg_createOrResolve: typeof createOrResolve;
declare const Svg_createEl: typeof createEl;
declare const Svg_applyPathOpts: typeof applyPathOpts;
declare const Svg_applyOpts: typeof applyOpts;
type Svg_SvgHelper = SvgHelper;
declare const Svg_getBounds: typeof getBounds;
declare const Svg_setBounds: typeof setBounds;
declare const Svg_makeHelper: typeof makeHelper;
declare namespace Svg {
  export {
    SvgElements as Elements,
    Svg_MarkerOpts as MarkerOpts,
    Svg_DrawingOpts as DrawingOpts,
    Svg_LineDrawingOpts as LineDrawingOpts,
    Svg_PathDrawingOpts as PathDrawingOpts,
    Svg_TextDrawingOpts as TextDrawingOpts,
    Svg_TextPathDrawingOpts as TextPathDrawingOpts,
    Svg_createOrResolve as createOrResolve,
    Svg_createEl as createEl,
    Svg_applyPathOpts as applyPathOpts,
    Svg_applyOpts as applyOpts,
    Svg_SvgHelper as SvgHelper,
    Svg_getBounds as getBounds,
    Svg_setBounds as setBounds,
    Svg_makeHelper as makeHelper,
  };
}

export { DrawingOpts as D, LineDrawingOpts as L, MarkerOpts as M, PathDrawingOpts as P, Svg as S, TextDrawingOpts as T, SvgElements as a, TextPathDrawingOpts as b, createOrResolve as c, createEl as d, applyPathOpts as e, applyOpts as f, SvgHelper as g, getBounds as h, makeHelper as m, setBounds as s };
