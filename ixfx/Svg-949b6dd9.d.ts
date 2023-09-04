import { e as CirclePositioned, L as Line, a as Point, f as Rect } from './Point-7e80cb86.js';

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
declare const path: (svgOrArray: string | readonly string[], parent: SVGElement, opts?: PathDrawingOpts, queryOrExisting?: string | SVGPathElement) => SVGPathElement;
declare const pathUpdate: (elem: SVGPathElement, opts?: PathDrawingOpts) => SVGPathElement;
/**
 * Updates an existing `SVGCircleElement` with potentially updated circle data and drawing options
 * @param elem Element
 * @param circle Circle
 * @param opts Drawing options
 * @returns SVGCircleElement
 */
declare const circleUpdate: (elem: SVGCircleElement, circle: CirclePositioned, opts?: CircleDrawingOpts) => SVGCircleElement;
/**
 * Creates or reuses a `SVGCircleElement`.
 *
 * To update an existing element, use `circleUpdate`
 * @param circle
 * @param parent
 * @param opts
 * @param queryOrExisting
 * @returns
 */
declare const circle: (circle: CirclePositioned, parent: SVGElement, opts?: CircleDrawingOpts, queryOrExisting?: string | SVGCircleElement) => SVGCircleElement;
/**
 * Creates or resuses a `SVGGElement` (group)
 *
 * To update an existing elemnet, use `groupUpdate`
 * @param children
 * @param parent
 * @param queryOrExisting
 * @returns
 */
declare const group: (children: readonly SVGElement[], parent: SVGElement, queryOrExisting?: string | SVGGElement) => SVGGElement;
declare const groupUpdate: (elem: SVGGElement, children: readonly SVGElement[]) => SVGGElement;
/**
 * Creates or reuses a SVGLineElement.
 *
 * @param line
 * @param parent
 * @param opts
 * @param queryOrExisting
 * @returns
 */
declare const line: (line: Line, parent: SVGElement, opts?: LineDrawingOpts, queryOrExisting?: string | SVGLineElement) => SVGLineElement;
/**
 * Updates a SVGLineElement instance with potentially changed line and drawing data
 * @param lineEl
 * @param line
 * @param opts
 * @returns
 */
declare const lineUpdate: (lineEl: SVGLineElement, line: Line, opts?: LineDrawingOpts) => SVGLineElement;
/**
 * Updates an existing SVGTextPathElement instance with text and drawing options
 * @param el
 * @param text
 * @param opts
 * @returns
 */
declare const textPathUpdate: (el: SVGTextPathElement, text?: string, opts?: TextPathDrawingOpts) => SVGTextPathElement;
/**
 * Creates or reuses a SVGTextPathElement.
 * @param pathRef
 * @param text
 * @param parent
 * @param opts
 * @param queryOrExisting
 * @returns
 */
declare const textPath: (pathRef: string, text: string, parent: SVGElement, opts?: TextPathDrawingOpts, queryOrExisting?: string | SVGTextPathElement) => SVGTextPathElement;
/**
 * Updates an existing SVGTextElement instance with position, text and drawing options
 * @param el
 * @param pos
 * @param text
 * @param opts
 * @returns
 */
declare const textUpdate: (el: SVGTextElement, pos?: Point, text?: string, opts?: TextDrawingOpts) => SVGTextElement;
/**
 * Creates or reuses a SVGTextElement
 * @param pos Position of text
 * @param text Text
 * @param parent
 * @param opts
 * @param queryOrExisting
 * @returns
 */
declare const text: (text: string, parent: SVGElement, pos?: Point, opts?: TextDrawingOpts, queryOrExisting?: string | SVGTextElement) => SVGTextElement;
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

declare const SvgElements_circle: typeof circle;
declare const SvgElements_circleUpdate: typeof circleUpdate;
declare const SvgElements_grid: typeof grid;
declare const SvgElements_group: typeof group;
declare const SvgElements_groupUpdate: typeof groupUpdate;
declare const SvgElements_line: typeof line;
declare const SvgElements_lineUpdate: typeof lineUpdate;
declare const SvgElements_path: typeof path;
declare const SvgElements_pathUpdate: typeof pathUpdate;
declare const SvgElements_text: typeof text;
declare const SvgElements_textPath: typeof textPath;
declare const SvgElements_textPathUpdate: typeof textPathUpdate;
declare const SvgElements_textUpdate: typeof textUpdate;
declare namespace SvgElements {
  export {
    SvgElements_circle as circle,
    SvgElements_circleUpdate as circleUpdate,
    SvgElements_grid as grid,
    SvgElements_group as group,
    SvgElements_groupUpdate as groupUpdate,
    SvgElements_line as line,
    SvgElements_lineUpdate as lineUpdate,
    SvgElements_path as path,
    SvgElements_pathUpdate as pathUpdate,
    SvgElements_text as text,
    SvgElements_textPath as textPath,
    SvgElements_textPathUpdate as textPathUpdate,
    SvgElements_textUpdate as textUpdate,
  };
}

type MarkerOpts = StrokeOpts & DrawingOpts & {
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
type DrawingOpts = {
    /**
     * Style for fill. Eg `black`.
     * @see [fill](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill)
     */
    readonly fillStyle?: string;
    /**
     * Opacity (0..1)
     */
    readonly opacity?: number;
    /**
     * If true, debug helpers are drawn
     */
    readonly debug?: boolean;
};
type StrokeOpts = {
    /**
     * Line cap
     * @see [stroke-linecap](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap)
     */
    readonly strokeLineCap?: `butt` | `round` | `square`;
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
    /**
     * Style for lines. Eg `white`.
     * @see [stroke](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke)
     */
    readonly strokeStyle?: string;
};
/**
 * Line drawing options
 */
type LineDrawingOpts = DrawingOpts & MarkerDrawingOpts & StrokeOpts;
type CircleDrawingOpts = DrawingOpts & StrokeOpts & MarkerDrawingOpts;
type PathDrawingOpts = DrawingOpts & StrokeOpts & MarkerDrawingOpts;
type MarkerDrawingOpts = {
    readonly markerEnd?: MarkerOpts;
    readonly markerStart?: MarkerOpts;
    readonly markerMid?: MarkerOpts;
};
/**
 * Text drawing options
 */
type TextDrawingOpts = StrokeOpts & DrawingOpts & {
    readonly anchor?: `start` | `middle` | `end`;
    readonly align?: `text-bottom` | `text-top` | `baseline` | `top` | `hanging` | `middle`;
    readonly userSelect?: boolean;
};
/**
 * Text path drawing options
 */
type TextPathDrawingOpts = TextDrawingOpts & {
    readonly method?: `align` | `stretch`;
    readonly side?: `left` | `right`;
    readonly spacing?: `auto` | `exact`;
    readonly startOffset?: number;
    readonly textLength?: number;
};
/**
 * Creates and appends a SVG element.
 *
 * ```js
 * // Create a circle
 * const circleEl = createOrResolve(parentEl, `SVGCircleElement`);
 * ```
 *
 * If `queryOrExisting` is specified, it is used as a query to find an existing element. If
 * query starts with `#`, this will be set as the element id, if created.
 *
 * ```js
 * // Creates an element with id 'myCircle' if it doesn't exist
 * const circleEl = createOrResolve(parentEl, `SVGCircleElement`, `#myCircle`);
 * ```
 * @param parent Parent element
 * @param type Type of SVG element
 * @param queryOrExisting Query, eg `#id`
 * @returns
 */
declare const createOrResolve: <V extends SVGElement>(parent: SVGElement, type: string, queryOrExisting?: string | V | undefined) => V;
declare const remove: <V extends SVGElement>(parent: SVGElement, queryOrExisting: string | V) => void;
declare const clear: (parent: SVGElement) => void;
/**
 * Creates an element of `type` and with `id` (if specified)
 * @param type Element type, eg `circle`
 * @param id Optional id to assign to element
 * @returns Element
 */
declare const createEl: <V extends SVGElement>(type: string, id?: string) => V;
/**
 * Applies path drawing options to given element
 * Applies: markerEnd, markerStart, markerMid
 * @param elem Element (presumed path)
 * @param opts Options
 */
declare const applyPathOpts: (elem: SVGElement, opts: PathDrawingOpts) => void;
/**
 * Applies drawing options to given SVG element.
 * Applies: fillStyle
 * @param elem Element
 * @param opts Drawing options
 */
declare const applyOpts: (elem: SVGElement, opts: DrawingOpts) => void;
/**
 * Applies drawing options to given SVG element.
 * Applies: strokeStyle, strokeWidth, strokeDash, strokeLineCap
 * @param elem Element
 * @param opts
 */
declare const applyStrokeOpts: (elem: SVGElement, opts: StrokeOpts) => void;
/**
 * Helper to make SVG elements with a common parent.
 *
 * Create with {@link makeHelper}.
 */
type SvgHelper = {
    remove(queryOrExisting: string | SVGElement): void;
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
    circle(circle: CirclePositioned, opts?: CircleDrawingOpts, queryOrExisting?: string | SVGCircleElement): SVGCircleElement;
    /**
     * Creates a path
     * @param svgStr Path description, or empty string
     * @param opts Drawing options
     * @param queryOrExisting DOM query to look up existing element, or the element instance
     */
    path(svgStr: string | readonly string[], opts?: PathDrawingOpts, queryOrExisting?: string | SVGPathElement): SVGPathElement;
    /**
     * Creates a grid of horizontal and vertical lines inside of a group
     * @param center Grid origin
     * @param spacing Cell size
     * @param width Width of grid
     * @param height Height of grid
     * @param opts Drawing options
     */
    grid(center: Point, spacing: number, width: number, height: number, opts?: LineDrawingOpts): SVGGElement;
    /**
     * Returns an element if it exists in parent
     * @param selectors Eg `#path`
     */
    query<V extends SVGElement>(selectors: string): V | null;
    /**
     * Gets/sets the width of the parent
     */
    get width(): number;
    set width(width: number);
    /**
     * Gets the parent
     */
    get parent(): SVGElement;
    /**
     * Gets/sets the height of the parent
     */
    get height(): number;
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
 * Creates a {@link SvgHelper} for the creating and management of SVG elements.
 * @param parent
 * @param parentOpts
 * @returns
 */
declare const makeHelper: (parent: SVGElement, parentOpts?: DrawingOpts & StrokeOpts) => SvgHelper;

type Svg_CircleDrawingOpts = CircleDrawingOpts;
type Svg_DrawingOpts = DrawingOpts;
type Svg_LineDrawingOpts = LineDrawingOpts;
type Svg_MarkerDrawingOpts = MarkerDrawingOpts;
type Svg_MarkerOpts = MarkerOpts;
type Svg_PathDrawingOpts = PathDrawingOpts;
type Svg_StrokeOpts = StrokeOpts;
type Svg_SvgHelper = SvgHelper;
type Svg_TextDrawingOpts = TextDrawingOpts;
type Svg_TextPathDrawingOpts = TextPathDrawingOpts;
declare const Svg_applyOpts: typeof applyOpts;
declare const Svg_applyPathOpts: typeof applyPathOpts;
declare const Svg_applyStrokeOpts: typeof applyStrokeOpts;
declare const Svg_clear: typeof clear;
declare const Svg_createEl: typeof createEl;
declare const Svg_createOrResolve: typeof createOrResolve;
declare const Svg_getBounds: typeof getBounds;
declare const Svg_makeHelper: typeof makeHelper;
declare const Svg_remove: typeof remove;
declare const Svg_setBounds: typeof setBounds;
declare namespace Svg {
  export {
    Svg_CircleDrawingOpts as CircleDrawingOpts,
    Svg_DrawingOpts as DrawingOpts,
    SvgElements as Elements,
    Svg_LineDrawingOpts as LineDrawingOpts,
    Svg_MarkerDrawingOpts as MarkerDrawingOpts,
    Svg_MarkerOpts as MarkerOpts,
    Svg_PathDrawingOpts as PathDrawingOpts,
    Svg_StrokeOpts as StrokeOpts,
    Svg_SvgHelper as SvgHelper,
    Svg_TextDrawingOpts as TextDrawingOpts,
    Svg_TextPathDrawingOpts as TextPathDrawingOpts,
    Svg_applyOpts as applyOpts,
    Svg_applyPathOpts as applyPathOpts,
    Svg_applyStrokeOpts as applyStrokeOpts,
    Svg_clear as clear,
    Svg_createEl as createEl,
    Svg_createOrResolve as createOrResolve,
    Svg_getBounds as getBounds,
    Svg_makeHelper as makeHelper,
    Svg_remove as remove,
    Svg_setBounds as setBounds,
  };
}

export { CircleDrawingOpts as C, DrawingOpts as D, LineDrawingOpts as L, MarkerOpts as M, PathDrawingOpts as P, Svg as S, TextDrawingOpts as T, SvgElements as a, StrokeOpts as b, MarkerDrawingOpts as c, TextPathDrawingOpts as d, createOrResolve as e, clear as f, createEl as g, applyPathOpts as h, applyOpts as i, applyStrokeOpts as j, SvgHelper as k, getBounds as l, makeHelper as m, remove as r, setBounds as s };
