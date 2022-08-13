import * as rxjs from 'rxjs';
import { Observable } from 'rxjs';
import { a as Point } from './Point-07a7b1b3.js';
import { F as Forms } from './Forms-3d8c95ae.js';

declare type LogOpts = {
    readonly reverse?: boolean;
    readonly capacity?: number;
    readonly timestamp?: boolean;
    readonly collapseDuplicates?: boolean;
    readonly monospaced?: boolean;
    readonly minIntervalMs?: number;
    readonly css?: string;
};
declare type Log = Readonly<{
    clear(): void;
    error(msgOrError: string | Error | unknown): void;
    log(msg?: string | object | number): HTMLElement | undefined;
    append(el: HTMLElement): void;
    dispose(): void;
    readonly isEmpty: boolean;
}>;
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

declare type PluckOpts = {
    readonly pluck: string;
};
declare type TransformOpts = {
    transform(ev: Event): any;
};
/**
 * Responsive value
 */
declare type Rx<V> = {
    /**
     * Last value
     */
    readonly value: V;
    /**
     * Clears last value
     */
    readonly clear: () => void;
};
declare type DomRxOpts = PluckOpts | TransformOpts;
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
 * const pointerX = rx(`#myDiv`, `pointermove`, {pluck: `clientX`}).value;
 *
 * if (pointerX > ...)
 * ```
 * @template V Event type
 * @param opts
 * @return
 */
declare const rx: <V>(elOrQuery: HTMLElement | string, event: string, opts?: DomRxOpts) => Rx<V>;

declare type ElementResizeArgs<V extends HTMLElement | SVGSVGElement> = {
    readonly el: V;
    readonly bounds: {
        readonly width: number;
        readonly height: number;
        readonly center: Point;
    };
};
declare type CanvasResizeArgs = ElementResizeArgs<HTMLCanvasElement> & {
    readonly ctx: CanvasRenderingContext2D;
};
declare const fullSizeElement: <V extends HTMLElement>(domQueryOrEl: string | V, onResized?: ((args: ElementResizeArgs<V>) => void) | undefined) => Observable<Event>;
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
declare const fullSizeCanvas: (domQueryOrEl: string | HTMLCanvasElement | undefined | null, onResized?: ((args: CanvasResizeArgs) => void) | undefined, skipCss?: boolean) => Observable<Event>;
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
declare const getTranslation: (domQueryOrEl: string | HTMLElement) => Point;
/**
 * Resizes given canvas to its parent element.
 * To resize canvas to match the viewport, use {@link fullSizeCanvas}.
 *
 * Provide a callback for when resize happens.
 * @param domQueryOrEl Query string or reference to canvas element
 * @param onResized Callback for when resize happens, eg for redrawing canvas
 * @returns Observable
 */
declare const parentSizeCanvas: (domQueryOrEl: string | HTMLCanvasElement, onResized?: ((args: CanvasResizeArgs) => void) | undefined, timeoutMs?: number) => rxjs.Subscription;
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
declare const createAfter: (sibling: HTMLElement, tagName: string) => HTMLElement;
/**
 * Creates an element inside of `parent`
 * ```
 * const newEl = createIn(parentEl, `DIV`);
 * ```
 * @param parent Parent element
 * @param tagName Tag to create
 * @returns New element
 */
declare const createIn: (parent: HTMLElement, tagName: string) => HTMLElement;
/**
 * Creates a table based on a list of objects
 * ```
 * const t = dataTableList(parentEl, map);
 *
 * t(newMap)
 * ```
 */
declare const dataTableList: (parentOrQuery: HTMLElement | string, data: ReadonlyMap<string, object>) => (data: ReadonlyMap<string, object>) => void;
/**
 * Format data. Return _undefined_ to signal that
 * data was not handled.
 */
declare type DataFormatter = (data: object, path: string) => string | undefined;
declare type DataTableOpts = {
    readonly formatter?: DataFormatter;
    readonly precision?: number;
    readonly roundNumbers?: boolean;
};
/**
 * Creates a HTML table where each row is a key-value pair from `data`.
 * First column is the key, second column data.
 *
 * ```js
 * const dt = dataTable(`#hostDiv`);
 * dt({
 *  name: `Blerg`,
 *  height: 120
 * });
 * ```
 */
declare const dataTable: (parentOrQuery: HTMLElement | string, data?: object, opts?: DataTableOpts) => (data: object) => void;
/**
 * Remove all child nodes from `parent`
 * @param parent
 */
declare const clear: (parent: HTMLElement) => void;
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
declare const resizeObservable: (elem: Element, timeoutMs?: number) => Observable<readonly ResizeObserverEntry[]>;
/**
 * Copies string representation of object to clipboard
 * @param obj
 * @returns Promise
 */
declare const copyToClipboard: (obj: object) => Promise<unknown>;
declare type CreateUpdateElement<V> = (item: V, el: HTMLElement | null) => HTMLElement;
declare const reconcileChildren: <V>(parentEl: HTMLElement, list: ReadonlyMap<string, V>, createUpdate: CreateUpdateElement<V>) => void;

declare type Opts = {
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

declare const index_Forms: typeof Forms;
type index_LogOpts = LogOpts;
type index_Log = Log;
declare const index_log: typeof log;
type index_PluckOpts = PluckOpts;
type index_TransformOpts = TransformOpts;
type index_Rx<V> = Rx<V>;
type index_DomRxOpts = DomRxOpts;
declare const index_rx: typeof rx;
type index_ElementResizeArgs<V extends HTMLElement | SVGSVGElement> = ElementResizeArgs<V>;
type index_CanvasResizeArgs = CanvasResizeArgs;
declare const index_fullSizeElement: typeof fullSizeElement;
declare const index_fullSizeCanvas: typeof fullSizeCanvas;
declare const index_parentSize: typeof parentSize;
declare const index_getTranslation: typeof getTranslation;
declare const index_parentSizeCanvas: typeof parentSizeCanvas;
declare const index_windowResize: typeof windowResize;
declare const index_resolveEl: typeof resolveEl;
declare const index_createAfter: typeof createAfter;
declare const index_createIn: typeof createIn;
declare const index_dataTableList: typeof dataTableList;
type index_DataFormatter = DataFormatter;
type index_DataTableOpts = DataTableOpts;
declare const index_dataTable: typeof dataTable;
declare const index_clear: typeof clear;
declare const index_themeChangeObservable: typeof themeChangeObservable;
declare const index_resizeObservable: typeof resizeObservable;
declare const index_copyToClipboard: typeof copyToClipboard;
type index_CreateUpdateElement<V> = CreateUpdateElement<V>;
declare const index_reconcileChildren: typeof reconcileChildren;
type index_Opts = Opts;
declare const index_pointerVisualise: typeof pointerVisualise;
declare const index_defaultErrorHandler: typeof defaultErrorHandler;
declare namespace index {
  export {
    index_Forms as Forms,
    index_LogOpts as LogOpts,
    index_Log as Log,
    index_log as log,
    index_PluckOpts as PluckOpts,
    index_TransformOpts as TransformOpts,
    index_Rx as Rx,
    index_DomRxOpts as DomRxOpts,
    index_rx as rx,
    index_ElementResizeArgs as ElementResizeArgs,
    index_CanvasResizeArgs as CanvasResizeArgs,
    index_fullSizeElement as fullSizeElement,
    index_fullSizeCanvas as fullSizeCanvas,
    index_parentSize as parentSize,
    index_getTranslation as getTranslation,
    index_parentSizeCanvas as parentSizeCanvas,
    index_windowResize as windowResize,
    index_resolveEl as resolveEl,
    index_createAfter as createAfter,
    index_createIn as createIn,
    index_dataTableList as dataTableList,
    index_DataFormatter as DataFormatter,
    index_DataTableOpts as DataTableOpts,
    index_dataTable as dataTable,
    index_clear as clear,
    index_themeChangeObservable as themeChangeObservable,
    index_resizeObservable as resizeObservable,
    index_copyToClipboard as copyToClipboard,
    index_CreateUpdateElement as CreateUpdateElement,
    index_reconcileChildren as reconcileChildren,
    index_Opts as Opts,
    index_pointerVisualise as pointerVisualise,
    index_defaultErrorHandler as defaultErrorHandler,
  };
}

export { CanvasResizeArgs as C, DomRxOpts as D, ElementResizeArgs as E, LogOpts as L, Opts as O, PluckOpts as P, Rx as R, TransformOpts as T, Log as a, fullSizeCanvas as b, parentSizeCanvas as c, resolveEl as d, createAfter as e, fullSizeElement as f, getTranslation as g, createIn as h, index as i, dataTableList as j, DataFormatter as k, log as l, DataTableOpts as m, dataTable as n, clear as o, parentSize as p, resizeObservable as q, rx as r, copyToClipboard as s, themeChangeObservable as t, CreateUpdateElement as u, reconcileChildren as v, windowResize as w, pointerVisualise as x, defaultErrorHandler as y };
