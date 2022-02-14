import { a as CirclePositioned } from './Circle-709d7567';
import { f as Line, a as Point } from './Rect-a4ccf209';

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
declare const grid: (parent: SVGElement, center: Point, spacing: number, width: number, height: number, opts?: LineDrawingOpts) => void;

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
declare type DrawingOpts = {
    readonly strokeStyle?: string;
    readonly fillStyle?: string;
    readonly debug?: boolean;
    readonly strokeWidth?: number;
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
declare const getOrCreateDefX: (parent: SVGElement, id: string, creator: () => SVGElement | undefined) => SVGElement;
/**
 * Creates an element of `type` and with `id` (if specified)
 * @param type Element type, eg `circle`
 * @param id Optional id to assign to element
 * @returns Element
 */
declare const createEl: <V extends SVGElement>(type: string, id?: string | undefined) => V;
declare const applyPathOpts: (elem: SVGElement, opts: PathDrawingOpts) => void;
/**
 * Applies drawing options to given SVG element.
 *
 * Use to easily assign fillStyle, strokeStyle, strokeWidth.
 * @param elem Element
 * @param opts Drawing options
 */
declare const applyOpts: (elem: SVGElement, opts: DrawingOpts) => void;
declare const svg: (parent: SVGElement, parentOpts?: DrawingOpts | undefined) => {
    text: (text: string, pos: Point, opts?: TextDrawingOpts | undefined, queryOrExisting?: string | SVGTextElement | undefined) => SVGTextElement;
    textPath: (pathRef: string, text: string, opts?: TextDrawingOpts | undefined, queryOrExisting?: string | SVGTextPathElement | undefined) => SVGTextPathElement;
    line: (line: Line, opts?: LineDrawingOpts | undefined, queryOrExisting?: string | SVGLineElement | undefined) => SVGLineElement;
    circle: (circle: CirclePositioned, opts?: DrawingOpts | undefined, queryOrExisting?: string | SVGCircleElement | undefined) => SVGCircleElement;
    path: (svgStr: string | readonly string[], opts?: DrawingOpts | undefined, queryOrExisting?: string | SVGPathElement | undefined) => SVGPathElement;
    grid: (center: Point, spacing: number, width: number, height: number, opts?: DrawingOpts | undefined) => void;
    query: <V extends SVGElement>(selectors: string) => V | null;
    width: number;
    readonly parent: SVGElement;
    height: number;
    clear: () => void;
};

type Svg_MarkerOpts = MarkerOpts;
type Svg_DrawingOpts = DrawingOpts;
type Svg_LineDrawingOpts = LineDrawingOpts;
type Svg_PathDrawingOpts = PathDrawingOpts;
type Svg_TextDrawingOpts = TextDrawingOpts;
type Svg_TextPathDrawingOpts = TextPathDrawingOpts;
declare const Svg_createOrResolve: typeof createOrResolve;
declare const Svg_getOrCreateDefX: typeof getOrCreateDefX;
declare const Svg_createEl: typeof createEl;
declare const Svg_applyPathOpts: typeof applyPathOpts;
declare const Svg_applyOpts: typeof applyOpts;
declare const Svg_svg: typeof svg;
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
    Svg_getOrCreateDefX as getOrCreateDefX,
    Svg_createEl as createEl,
    Svg_applyPathOpts as applyPathOpts,
    Svg_applyOpts as applyOpts,
    Svg_svg as svg,
  };
}

export { DrawingOpts as D, LineDrawingOpts as L, MarkerOpts as M, PathDrawingOpts as P, Svg as S, TextDrawingOpts as T, SvgElements as a, TextPathDrawingOpts as b, createOrResolve as c, createEl as d, applyPathOpts as e, applyOpts as f, getOrCreateDefX as g, svg as s };
