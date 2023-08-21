import * as rxjs from 'rxjs';
import { Observable } from 'rxjs';
import { a as Point, C as CardinalDirection } from './Point-94426255.js';
import { S as ScaleFn } from './Scaler-02e40b7f.js';
import { F as Forms } from './Forms-d8146f9f.js';

type LogOpts = {
    readonly reverse?: boolean;
    readonly capacity?: number;
    readonly timestamp?: boolean;
    readonly collapseDuplicates?: boolean;
    readonly monospaced?: boolean;
    readonly minIntervalMs?: number;
    readonly css?: string;
};
type Log = {
    clear(): void;
    error(msgOrError: string | Error | unknown): void;
    log(msg?: string | object | number): HTMLElement | undefined;
    append(el: HTMLElement): void;
    dispose(): void;
    readonly isEmpty: boolean;
};
/**
 * Allows writing to a DOM element in console.log style. Element grows in size, so use
 * something like `overflow-y: scroll` on its parent
 *
 * ```
 * const l = log(`#dataStream`); // Assumes HTML element with id `dataStream` exists
 * l.log(`Hi`);
 * l.log(); // Displays a horizontal rule
 *
 * const l = log(document.getElementById(`dataStream`), {
 *  timestamp: true,
 *  truncateEntries: 20
 * });
 * l.log(`Hi`);
 * l.error(`Some error`); // Adds class `error` to line
 * ```
 *
 * For logging high-throughput streams:
 * ```
 * // Silently drop log if it was less than 5ms since the last
 * const l = log(`#dataStream`, { minIntervalMs: 5 });
 *
 * // Only the last 100 entries are kept
 * const l = log(`#dataStream`, { capacity: 100 });
 * ```
 *
 * @param {(HTMLElement | string | undefined)} elOrId Element or id of element
 * @param {LogOpts} opts
 * @returns {Log}
 */
declare const log: (domQueryOrEl: HTMLElement | string, opts?: LogOpts) => Log;

type PluckOpts = {
    readonly pluck: string;
};
type TransformOpts = {
    transform(ev: Event): any;
};
/**
 * Responsive value
 */
type Rx<V> = {
    /**
     * Last value
     */
    readonly value: V;
    /**
     * Clears last value
     */
    readonly clear: () => void;
};
type DomRxOpts = PluckOpts | TransformOpts;
/**
 * Keeps track of last event data
 *
 * ```js
 * const pointer = rx(`#myDiv`, `pointermove`).value;
 *
 * if (pointer.clientX > ...)
 * ```
 *
 * Pluck a field:
 * ```js
 * const pointerX = rx(`#myDiv`, `pointermove`, { pluck: `clientX` }).value;
 *
 * if (pointerX > ...)
 * ```
 * @template V Event type
 * @param opts
 * @return
 */
declare const rx: <V extends object>(elOrQuery: HTMLElement | string, event: string, opts?: DomRxOpts) => Rx<V>;

type ElementResizeArgs<V extends HTMLElement | SVGSVGElement> = {
    readonly el: V;
    readonly bounds: {
        readonly width: number;
        readonly height: number;
        readonly center: Point;
        readonly min: number;
        readonly max: number;
    };
};
type CanvasResizeArgs = ElementResizeArgs<HTMLCanvasElement> & {
    readonly ctx: CanvasRenderingContext2D;
};
type PointSpaces = `viewport` | `screen` | `document`;
/**
 * Convert an absolute point to relative, in different coordinate spaces.
 *
 * When calling the returned function, the input value must be in the same
 * scale as the intended output scale.
 *
 * Viewport-relative is used by default.
 *
 * @example Get relative position of click in screen coordinates
 * ```js
 * const f = pointScaler({ to: 'screen' });
 * document.addEventListener('click', evt => {
 *  const screenRelative = f(evt.screenX, evt.screenY);
 *  // Yields {x,y} on 0..1 scale
 * });
 * ```
 *
 * @example Get relative position of click in viewport coordinates
 * ```js
 * const f = pointScaler({ to: 'viewport' });
 * document.addEventListener('click', evt => {
 *  const viewportRelative = f(evt.clientX, evt.clientY);
 *  // Yields {x,y} on 0..1 scale
 * });
 * ```
 *
 * @example Get relative position of click in document coordinates
 * ```js
 * const f = pointScaler({ to: 'document' });
 * document.addEventListener('click', evt => {
 *  const documentRelative = f(evt.pageX, evt.pageY);
 *  // Yields {x,y} on 0..1 scale
 * });
 * ```
 *
 * @param opts
 * @returns
 */
declare const pointScaler: (reference?: PointSpaces) => (a: Readonly<Point | number | number[]>, b?: number) => Readonly<{
    x: number;
    y: number;
}>;
type ElPositionOpts = {
    readonly target?: PointSpaces;
    readonly relative?: boolean;
    readonly anchor?: CardinalDirection | `center`;
};
/**
 * Returns a function which yields element position in target coordinate space with optional scaling.
 * Live position is calculated when the function is invoked.
 * Use {@link positionRelative} to simply get relative position of element in given coordinate space.
 *
 * @example Absolute position of #blah in viewport coordinate space
 * ```js
 * const f = positionFn('#blah');
 * f(); // Yields: {x,y}
 * // Or:
 * positionFn('#blah')(); // Immediately invoke
 * ```
 *
 * @example Relative position of element in viewport-space
 * ```js
 * const f = positionFn(evt.target, { relative: true });
 * f(); // Yields: {x,y}
 * ```
 *
 * @example Relative position of #blah in screen-space
 * ```js
 * const f = positionFn('#blah', { target: 'screen', relative: true });
 * f(); // Yields: {x,y}
 * ```
 *
 * By default, top-left corner (north west) is used. Other cardinal points or 'center' can be specified:
 * ```js
 * // Relative position by center
 * positionFn('#blah', { relative: true, anchor: 'center' });
 *
 * // ...by bottom-right corner
 * positionFn('#blah', { relative: true, anchor: 'se' });
 * ```
 *
 * This function is useful if you have a stable DOM element and conversion target.
 * If the DOM element is changing continually, consider using {@link viewportToSpace} to
 * convert from viewport coordinates to target coordinates:
 *
 * ```js
 * // Eg.1 Absolute coords in screen space
 * const vpToScreen = viewportToSpace('screen');
 * vpToScreen(el.getBoundingClientRect());
 *
 * // Eg.2 Relative coords in viewport space
 * const vpRelative = pointScaler(); // Re-usable scaler. Default uses viewport
 * vpRelative(el.getBoundingClientRect()); // Yields: { x,y }
 *
 * // Eg.3 Relative coords in screen space
 * const vpToScreen = viewportToSpace('screen'); // Map viewport->screen
 * const screenRelative = pointScaler('screen'); // Scale screen units
 *
 * // Combine into a resuable function that takes an element
 * const mapAndScale = (el) => screenRelative(vpToScreen(el.getBoundingClientRect()));
 *
 * // Call
 * mapAndScale(document.getElementById('blah')); // Yields: { x,y }
 * ```
 * @param domQueryOrEl
 * @param coordinateSpace
 * @param scaled
 * @returns
 */
declare const positionFn: (domQueryOrEl: Readonly<string | HTMLElement>, opts?: ElPositionOpts) => (() => Point);
declare const cardinalPosition: (domQueryOrEl: Readonly<string | HTMLElement>, anchor?: CardinalDirection | `center`) => Point;
/**
 * Returns relative position of element in target coordinate space, or viewport by default.
 * Relative means that { x:0.5, y: 0.5 } is the middle of the target space. Eg for viewport, that means its the middle of the browser window.
 * ```js
 * // These all yield { x, y }
 * elPositionRelative('#blah');
 * elPositionRelative(evt.target, 'screen');
 * ```
 * @param domQueryOrEl DOM query or element
 * @param target Target coordinate space, or viewport by default
 * @returns Point
 */
declare const positionRelative: (domQueryOrEl: Readonly<string | HTMLElement>, target?: PointSpaces) => Point;
/**
 * Returns a function that converts input viewport coordinate space
 * to an output coordinate space.
 *
 * ```js
 * // f() will convert from viewport to document coordinate space
 * const f = viewportToSpace('document');
 *
 * // {x:100,y:100} is viewport coordinate space
 * f(100,100); // Yields: { x, y } converted to document space
 * ```
 *
 * Or immediately invoke for one-off use:
 * ```js
 * viewportToSpace('document')(100,100); // Yields: { x, y }
 * ```
 * @param targetSpace
 * @returns
 */
declare const viewportToSpace: (targetSpace?: PointSpaces) => (a: Readonly<Point | number[] | number>, b?: number) => Readonly<{
    x: number;
    y: number;
}>;
/**
 * Position element by relative coordinate. Relative to window dimensions by default
 * @param element DOM element to position, or query
 * @param relativePos Window-relative coordinate. 0.5/0.5 is middle of window.
 */
declare const positionFromMiddle: (domQueryOrEl: string | HTMLElement, relativePos: Point, relativeTo?: `window` | `screen`) => void;
declare const fullSizeElement: <V extends HTMLElement>(domQueryOrEl: string | V, onResized?: ((args: ElementResizeArgs<V>) => void) | undefined) => Observable<Event>;
type CanvasOpts = {
    readonly skipCss?: boolean;
    readonly fullSize?: boolean;
    readonly scaleBy?: `both` | `width` | `height` | `min` | `max`;
};
declare const canvasHelper: (domQueryOrEl: Readonly<string | HTMLCanvasElement | undefined | null>, opts: CanvasOpts) => {
    abs: ScaleFn;
    rel: ScaleFn;
    getContext: () => void;
};
/**
 * Resizes given canvas element to match window size.
 * To resize canvas to match its parent, use {@link parentSizeCanvas}.
 *
 * To make the canvas appear propery, it sets the following CSS:
 * ```css
 * {
 *  top: 0;
 *  left: 0;
 *  zIndex: -1;
 *  position: fixed;
 * }
 * ```
 * Pass _true_ for `skipCss` to avoid this.
 *
 * Provide a callback for when resize happens.
 * @param domQueryOrEl Query string or reference to canvas element
 * @param onResized Callback for when resize happens, eg for redrawing canvas
 * @param skipCss if true, style are not added
 * @returns Observable
 */
declare const fullSizeCanvas: (domQueryOrEl: Readonly<string | HTMLCanvasElement | undefined | null>, onResized?: ((args: CanvasResizeArgs) => void) | undefined, skipCss?: boolean) => Observable<Event>;
/**
 * Given an array of class class names, this will cycle between them each time
 * it is called.
 *
 * Eg, assume `list` is: [ `a`, `b`, `c` ]
 *
 * If `el` already has the class `a`, the first time it is called, class `a`
 * is removed, and `b` added. The next time `b` is swapped for `c`. Once again,
 * `c` will swap with `a` and so on.
 *
 * If `el` is undefined or null, function silently returns.
 * @param el Element
 * @param list List of class names
 * @returns
 */
declare const cycleCssClass: (el: Readonly<HTMLElement>, list: readonly string[]) => void;
/**
 * Sets width/height atributes on the given element according to the size of its parent.
 * @param domQueryOrEl Elememnt to resize
 * @param onResized Callback when resize happens
 * @param timeoutMs Timeout for debouncing events
 * @returns
 */
declare const parentSize: <V extends HTMLElement | SVGSVGElement>(domQueryOrEl: string | V, onResized?: ((args: ElementResizeArgs<V>) => void) | undefined, timeoutMs?: number) => rxjs.Subscription;
/**
 * Source: https://zellwk.com/blog/translate-in-javascript
 * @param domQueryOrEl
 */
declare const getTranslation: (domQueryOrEl: Readonly<string | HTMLElement>) => Point;
/**
 * Resizes given canvas to its parent element.
 * To resize canvas to match the viewport, use {@link fullSizeCanvas}.
 *
 * Provide a callback for when resize happens.
 * @param domQueryOrEl Query string or reference to canvas element
 * @param onResized Callback for when resize happens, eg for redrawing canvas
 * @returns Observable
 */
declare const parentSizeCanvas: (domQueryOrEl: Readonly<string | HTMLCanvasElement>, onResized?: ((args: CanvasResizeArgs) => void) | undefined, timeoutMs?: number) => rxjs.Subscription;
/**
 * Returns an Observable for window resize. Default 100ms debounce.
 * @param timeoutMs
 * @returns
 */
declare const windowResize: (timeoutMs?: number) => Observable<Event>;
/**
 * Resolves either a string or HTML element to an element.
 * Useful when an argument is either an HTML element or query.
 *
 * ```js
 * resolveEl(`#someId`);
 * resolveEl(someElement);
 * ```
 * @param domQueryOrEl
 * @returns
 */
declare const resolveEl: <V extends Element>(domQueryOrEl: string | V) => V;
/**
 * Creates an element after `sibling`
 * ```
 * const el = createAfter(siblingEl, `DIV`);
 * ```
 * @param sibling Element
 * @param tagName Element to create
 * @returns New element
 */
declare const createAfter: (sibling: Readonly<HTMLElement>, tagName: string) => HTMLElement;
/**
 * Creates an element inside of `parent`
 * ```
 * const newEl = createIn(parentEl, `DIV`);
 * ```
 * @param parent Parent element
 * @param tagName Tag to create
 * @returns New element
 */
declare const createIn: (parent: Readonly<HTMLElement>, tagName: string) => HTMLElement;
/**
 * Remove all child nodes from `parent`
 * @param parent
 */
declare const clear: (parent: Readonly<HTMLElement>) => void;
/**
 * Observer when document's class changes
 *
 * ```js
 * const c = themeChangeObservable();
 * c.subscribe(() => {
 *  // Class has changed...
 * });
 * ```
 * @returns
 */
declare const themeChangeObservable: () => Observable<readonly MutationRecord[]>;
/**
 * Observer when element resizes. Specify `timeoutMs` to debounce.
 *
 * ```
 * const o = resizeObservable(myEl, 500);
 * o.subscribe(() => {
 *  // called 500ms after last resize
 * });
 * ```
 * @param elem
 * @param timeoutMs Tiemout before event gets triggered
 * @returns
 */
declare const resizeObservable: (elem: Readonly<Element>, timeoutMs?: number) => Observable<readonly ResizeObserverEntry[]>;
/**
 * Copies string representation of object to clipboard
 * @param obj
 * @returns Promise
 */
declare const copyToClipboard: (obj: object) => Promise<unknown>;
type CreateUpdateElement<V> = (item: V, el: HTMLElement | null) => HTMLElement;
declare const reconcileChildren: <V>(parentEl: HTMLElement, list: Map<string, V>, createUpdate: CreateUpdateElement<V>) => void;

type DataTableOpts = {
    readonly formatter?: DataFormatter;
    readonly precision?: number;
    readonly roundNumbers?: boolean;
};
type DataTable<V> = {
    update(data: V): void;
    remove(): boolean;
};
/**
 * Creates a table of data points for each object in the map
 * ```
 * const t = DataTable.fromList(parentEl, map);
 * t.update(newMap);
 * ```
 */
declare const fromList: (parentOrQuery: HTMLElement | string, data: Map<string, object>) => DataTable<Map<string, object>>;
/**
 * Format data. Return _undefined_ to signal that
 * data was not handled.
 */
type DataFormatter = (data: object, path: string) => string | undefined;
/**
 * Creates a HTML table where each row is a key-value pair from `data`.
 * First column is the key, second column data.
 *
 * ```js
 * const dt = fromObject(`#hostDiv`);
 * ```
 *
 * `dt` is a function to call when you want to update data:
 *
 * ```js
 * dt({
 *  name: `Blerg`,
 *  height: 120
 * });
 * ```
 */
declare const fromObject: (parentOrQuery: Readonly<HTMLElement | string>, data?: object, opts?: DataTableOpts) => DataTable<object>;

type DataTable$1_DataFormatter = DataFormatter;
type DataTable$1_DataTable<V> = DataTable<V>;
type DataTable$1_DataTableOpts = DataTableOpts;
declare const DataTable$1_fromList: typeof fromList;
declare const DataTable$1_fromObject: typeof fromObject;
declare namespace DataTable$1 {
  export {
    DataTable$1_DataFormatter as DataFormatter,
    DataTable$1_DataTable as DataTable,
    DataTable$1_DataTableOpts as DataTableOpts,
    DataTable$1_fromList as fromList,
    DataTable$1_fromObject as fromObject,
  };
}

type Opts = {
    readonly touchRadius?: number;
    readonly mouseRadius?: number;
    readonly trace?: boolean;
    readonly hue?: number;
};
/**
 * Visualises pointer events within a given element.
 *
 * ```js
 * // Show pointer events for whole document
 * pointerVis(document);
 * ```
 *
 * Note you may need to set the following CSS properties on the target element:
 *
 * ```css
 * touch-action: none;
 * user-select: none;
 * overscroll-behavior: none;
 * ```
 *
 * Options
 * * touchRadius/mouseRadius: size of circle for these kinds of pointer events
 * * trace: if true, intermediate events are captured and displayed
 * @param elOrQuery
 * @param opts
 */
declare const pointerVisualise: (elOrQuery: HTMLElement | string, opts?: Opts) => void;

/**
 * Creates an error handler to show errors on-screen.
 * This is useful when testing on mobile devices that lack access to the console.
 *
 * ```js
 * const e = defaultErrorHandler();
 * ```
 *
 * Manual control:
 * ```js
 * const e = defaultErrorHandler();
 * e.show(someError);
 * e.hide();
 * ```
 * @returns
 */
declare const defaultErrorHandler: () => {
    show: (ex: Error | string | Event) => void;
    hide: () => void;
};

type DragState = {
    readonly token?: object;
    readonly initial: Point;
    readonly delta: Point;
};
type DragStart = {
    readonly allow: boolean;
    readonly token: object;
};
type DragListener = {
    readonly start?: () => DragStart;
    readonly progress?: (state: DragState) => boolean;
    readonly abort?: (reason: string, state: DragState) => void;
    readonly success?: (state: DragState) => void;
};
declare const draggable: (elem: SVGElement, listener: DragListener) => () => void;

type DragDrop_DragListener = DragListener;
type DragDrop_DragStart = DragStart;
type DragDrop_DragState = DragState;
declare const DragDrop_draggable: typeof draggable;
declare namespace DragDrop {
  export {
    DragDrop_DragListener as DragListener,
    DragDrop_DragStart as DragStart,
    DragDrop_DragState as DragState,
    DragDrop_draggable as draggable,
  };
}

type index_CanvasOpts = CanvasOpts;
type index_CanvasResizeArgs = CanvasResizeArgs;
type index_CreateUpdateElement<V> = CreateUpdateElement<V>;
type index_DomRxOpts = DomRxOpts;
declare const index_DragDrop: typeof DragDrop;
type index_ElPositionOpts = ElPositionOpts;
type index_ElementResizeArgs<V extends HTMLElement | SVGSVGElement> = ElementResizeArgs<V>;
declare const index_Forms: typeof Forms;
type index_Log = Log;
type index_LogOpts = LogOpts;
type index_Opts = Opts;
type index_PluckOpts = PluckOpts;
type index_PointSpaces = PointSpaces;
type index_Rx<V> = Rx<V>;
type index_TransformOpts = TransformOpts;
declare const index_canvasHelper: typeof canvasHelper;
declare const index_cardinalPosition: typeof cardinalPosition;
declare const index_clear: typeof clear;
declare const index_copyToClipboard: typeof copyToClipboard;
declare const index_createAfter: typeof createAfter;
declare const index_createIn: typeof createIn;
declare const index_cycleCssClass: typeof cycleCssClass;
declare const index_defaultErrorHandler: typeof defaultErrorHandler;
declare const index_fullSizeCanvas: typeof fullSizeCanvas;
declare const index_fullSizeElement: typeof fullSizeElement;
declare const index_getTranslation: typeof getTranslation;
declare const index_log: typeof log;
declare const index_parentSize: typeof parentSize;
declare const index_parentSizeCanvas: typeof parentSizeCanvas;
declare const index_pointScaler: typeof pointScaler;
declare const index_pointerVisualise: typeof pointerVisualise;
declare const index_positionFn: typeof positionFn;
declare const index_positionFromMiddle: typeof positionFromMiddle;
declare const index_positionRelative: typeof positionRelative;
declare const index_reconcileChildren: typeof reconcileChildren;
declare const index_resizeObservable: typeof resizeObservable;
declare const index_resolveEl: typeof resolveEl;
declare const index_rx: typeof rx;
declare const index_themeChangeObservable: typeof themeChangeObservable;
declare const index_viewportToSpace: typeof viewportToSpace;
declare const index_windowResize: typeof windowResize;
declare namespace index {
  export {
    index_CanvasOpts as CanvasOpts,
    index_CanvasResizeArgs as CanvasResizeArgs,
    index_CreateUpdateElement as CreateUpdateElement,
    DataTable$1 as DataTable,
    index_DomRxOpts as DomRxOpts,
    index_DragDrop as DragDrop,
    index_ElPositionOpts as ElPositionOpts,
    index_ElementResizeArgs as ElementResizeArgs,
    index_Forms as Forms,
    index_Log as Log,
    index_LogOpts as LogOpts,
    index_Opts as Opts,
    index_PluckOpts as PluckOpts,
    index_PointSpaces as PointSpaces,
    index_Rx as Rx,
    index_TransformOpts as TransformOpts,
    index_canvasHelper as canvasHelper,
    index_cardinalPosition as cardinalPosition,
    index_clear as clear,
    index_copyToClipboard as copyToClipboard,
    index_createAfter as createAfter,
    index_createIn as createIn,
    index_cycleCssClass as cycleCssClass,
    index_defaultErrorHandler as defaultErrorHandler,
    index_fullSizeCanvas as fullSizeCanvas,
    index_fullSizeElement as fullSizeElement,
    index_getTranslation as getTranslation,
    index_log as log,
    index_parentSize as parentSize,
    index_parentSizeCanvas as parentSizeCanvas,
    index_pointScaler as pointScaler,
    index_pointerVisualise as pointerVisualise,
    index_positionFn as positionFn,
    index_positionFromMiddle as positionFromMiddle,
    index_positionRelative as positionRelative,
    index_reconcileChildren as reconcileChildren,
    index_resizeObservable as resizeObservable,
    index_resolveEl as resolveEl,
    index_rx as rx,
    index_themeChangeObservable as themeChangeObservable,
    index_viewportToSpace as viewportToSpace,
    index_windowResize as windowResize,
  };
}

export { clear as A, themeChangeObservable as B, CanvasResizeArgs as C, DataTable$1 as D, ElementResizeArgs as E, resizeObservable as F, copyToClipboard as G, CreateUpdateElement as H, reconcileChildren as I, pointerVisualise as J, defaultErrorHandler as K, LogOpts as L, Opts as O, PluckOpts as P, Rx as R, TransformOpts as T, DragDrop as a, Log as b, DomRxOpts as c, PointSpaces as d, ElPositionOpts as e, positionFn as f, cardinalPosition as g, positionRelative as h, index as i, positionFromMiddle as j, fullSizeElement as k, log as l, CanvasOpts as m, canvasHelper as n, fullSizeCanvas as o, pointScaler as p, cycleCssClass as q, rx as r, parentSize as s, getTranslation as t, parentSizeCanvas as u, viewportToSpace as v, windowResize as w, resolveEl as x, createAfter as y, createIn as z };
