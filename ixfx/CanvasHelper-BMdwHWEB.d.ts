import { S as ScaleBy, a as Scaler } from './Scaler-C_gjBH0I.js';
import { R as Rect } from './RectTypes-Brg8Cmy-.js';
import { S as SimpleEventEmitter } from './Events-DJgOvcWD.js';

type CanvasEvents = {
    /**
     * Fired when canvas is resized
     */
    resize: {
        size: Rect;
        helper: CanvasHelper;
        ctx: CanvasRenderingContext2D;
    };
};
/**
 * Options
 */
type CanvasHelperOpts = {
    /**
     * If _true_ (default) canvas is cleared when a resize happens
     */
    readonly clearOnResize: boolean;
    /**
     * If true, it won't add any position CSS
     */
    readonly skipCss: boolean;
    readonly scaleBy: ScaleBy;
    /**
     * Callback when canvas is resized
     * @param size
     * @returns
     */
    readonly onResize?: (ctx: CanvasRenderingContext2D, size: Rect, helper: CanvasHelper) => void;
    /**
     * Automatically set canvas to fill. Default: 'none'
     * * 'viewport': size of screen
     * * 'parent': size of parent element
     * * 'none': no resizing. Use 'width' and 'height' options to set the logical size of the canvas
     *
     */
    readonly fill: `viewport` | `parent` | `none`;
    /**
     * Logical width of canvas.
     * Ignored if `fill` is set to 'viewport' or 'parent'
     */
    readonly width: number;
    /**
     * Logical height of canvas.
     * Ignored if `fill` is set to 'viewport' or 'parent'
     */
    readonly height: number;
    /**
     * If set, the z-index for this canvas.
     * By default, fullscreen canvas will be given -1
     */
    readonly zIndex: number;
    /**
     * If specified, this function be called in an animation loop.
     * @param ctx
     * @param size
     * @returns
     */
    readonly draw?: (ctx: CanvasRenderingContext2D, size: Rect, helper: CanvasHelper) => void;
};
/**
 * A wrapper for the CANVAS element that scales the canvas for high-DPI displays
 * and helps with resizing.
 *
 * ```js
 * const canvas = new CanvasHelper(`#my-canvas`, { fill: `viewport` });
 * const { ctx, width, height } = canvas.ctx; // Get drawing context, width & height
 * ```
 *
 * Draw whenever it is resized using the 'resize' event
 * ```js
 * canvas.addEventListener(`resize`, ({ctx, size}) => {
 *  // Use ctx...
 * });
 * ```
 *
 * Or provide a function when initialising:
 * ```js
 * const onResize = (ctx, size) => {
 *  // Do drawing
 * }
 * const canvas = new CanvasHelper(`#my-canvas`, { fill: `viewport`, onResize });
 * ```
 *
 * Automatically draw at animation speeds:
 * ```js
 * const draw = () => {
 * }
 * const canvas = new CanvasHelper(`#my-canvas`, { fill: `viewport`, draw });
 * ```
 */
declare class CanvasHelper extends SimpleEventEmitter<CanvasEvents> {
    #private;
    readonly el: HTMLCanvasElement;
    readonly opts: CanvasHelperOpts;
    constructor(domQueryOrEl: Readonly<string | HTMLCanvasElement | undefined | null>, opts?: Partial<CanvasHelperOpts>);
    setLogicalSize(logicalSize: Rect): void;
    /**
     * Clears the canvas.
     *
     * Shortcut for:
     * `this.ctx.clearRect( 0, 0, this.width, this.height)`
     */
    clear(): void;
    fill(colour?: string): void;
    /**
     * Gets the drawing context
     */
    get ctx(): CanvasRenderingContext2D;
    /**
     * Gets the logical width of the canvas
     * See also: {@link height}, {@link size}
     */
    get width(): number;
    /**
     * Gets the logical height of the canvas
     * See also: {@link width}, {@link size}
     */
    get height(): number;
    /**
     * Gets the logical size of the canvas
     * See also: {@link width}, {@link height}
     */
    get size(): Rect;
    /**
     * Gets the current scaling ratio being used
     * to compensate for high-DPI display
     */
    get ratio(): number;
    /**
     * Returns the width or height, whichever is smallest
     */
    get dimensionMin(): number;
    /**
     * Returns the width or height, whichever is largest
     */
    get dimensionMax(): number;
    /**
     * Returns a Scaler that converts from relative to absolute
     * coordinates.
     * This is based on the canvas size.
     *
     * ```js
     * // Assuming a canvas of 800x600
     * toAbsolute({ x: 1, y: 1 });      // { x: 800, y: 600}
     * toAbsolute({ x: 0, y: 0 });      // { x: 0, y: 0}
     * toAbsolute({ x: 0.5, y: 0.5 });  // { x: 400, y: 300}
     * ```
     */
    get toAbsolute(): Scaler;
    /**
     * Returns a Scaler that converts from absolute
     * to relative coordinates.
     * This is based on the canvas size.
     *
     * ```js
     * // Assuming a canvas of 800x500
     * toRelative({ x: 800, y:600 });  // { x: 1,   y: 1 }
     * toRelative({ x: 0,   y: 0 });   // { x: 0,   y: 0 }
     * toRelative({ x: 400, y: 300 }); // { x: 0.5, y: 0.5 }
     * ```
     */
    get toRelative(): Scaler;
    /**
     * Gets the center coordinate of the canvas
     */
    get center(): {
        x: number;
        y: number;
    };
}

export { CanvasHelper as C, type CanvasEvents as a, type CanvasHelperOpts as b };
