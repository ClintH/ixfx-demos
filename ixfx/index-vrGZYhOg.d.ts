import { P as Point, ae as CardinalDirection } from './index-hzykKOZZ.js';
import { F as Forms } from './Forms-L7Bq41nz.js';
import { a as Scaler } from './Scaler-Omk1IaZJ.js';
import { R as Reactive, P as Passed, a as ReactiveDiff, b as ReactiveDisposable, c as ReactiveWritable } from './Reactive-zZpZsUf8.js';
import { C as Change } from './Immutable-_XVsuiA0.js';
import { I as Interval } from './IntervalType-zqeNLRm6.js';

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
    error(messageOrError: unknown): void;
    log(message?: string | object | number): HTMLElement | undefined;
    warn(message?: string | object | number): HTMLElement | undefined;
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
declare const log: (domQueryOrElement: HTMLElement | string, opts?: LogOpts) => Log;

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
declare const resolveEl: <V extends Element>(domQueryOrEl: string | V | null | undefined) => V;
type QueryOrElements = string | Array<Element> | Array<HTMLElement> | HTMLElement | Element;
declare const resolveEls: (selectors: QueryOrElements) => Array<HTMLElement>;

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
declare const pointScaler: (reference?: PointSpaces) => (a: Readonly<Point | number | Array<number>>, b?: number) => Readonly<{
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
/**
 * Returns a {x,y} Point on a cardinal position of element.
 * ```
 * // Top edge, middle horizontal position
 * const pos = cardinalPosition(`#blah`, `n`);
 * ```
 * @param domQueryOrEl
 * @param anchor
 * @returns
 */
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
declare const viewportToSpace: (targetSpace?: PointSpaces) => (a: Readonly<Point | Array<number> | number>, b?: number) => Readonly<{
    x: number;
    y: number;
}>;
/**
 * Position element by relative coordinate. Relative to window dimensions by default
 * @param element DOM element to position, or query
 * @param relativePos Window-relative coordinate. 0.5/0.5 is middle of window.
 */
declare const positionFromMiddle: (domQueryOrEl: string | HTMLElement, relativePos: Point, relativeTo?: `window` | `screen`) => void;
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
declare const cycleCssClass: (el: Readonly<HTMLElement>, list: ReadonlyArray<string>) => void;
/**
 * Source: https://zellwk.com/blog/translate-in-javascript
 * @param domQueryOrEl
 */
declare const getTranslation: (domQueryOrEl: Readonly<string | HTMLElement>) => Point;
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
 * Copies string representation of object to clipboard
 * @param obj
 * @returns Promise
 */
declare const copyToClipboard: (object: object) => Promise<unknown>;
/**
 * Inserts `element` into `parent` sorted according to its HTML attribute `data-sort`.
 *
 * Assumes:
 * * Every child of `parent` and `element`, has a `data-sort` attribute. This is the basis for sorting.
 * * `parent` starts off empty or pre-sorted.
 * * Order of `parent`'s children is not changed (ie it always remains sorted)
 * @param parent
 * @param element
 */
declare const insertSorted: (parent: HTMLElement, element: HTMLElement) => void;
type CreateUpdateElement<V> = (item: V, el: HTMLElement | null) => HTMLElement;
declare const reconcileChildren: <V>(parentEl: HTMLElement, list: Map<string, V>, createUpdate: CreateUpdateElement<V>) => void;
/**
 * Adds `cssClass` to element(s) if `value` is true.
 * ```js
 * setClass(`#someId`, true, `activated`);
 * ```
 * @param query
 * @param value
 * @param cssClass
 * @returns
 */
declare const setCssClass: (selectors: QueryOrElements, value: boolean, cssClass: string) => void;
/**
 * Toggles a CSS class on all elements that match selector
 * @param selectors
 * @param cssClass
 * @returns
 */
declare const setCssToggle: (selectors: QueryOrElements, cssClass: string) => void;
declare const setCssDisplay: (selectors: QueryOrElements, value: string) => void;
/**
 * Gets a HTML element by id, throwing an error if not found
 * @param id
 * @returns
 */
declare const byId: <V extends HTMLElement>(id: string) => HTMLElement;
declare const setHtml: (selectors: QueryOrElements, value: string | number) => void;
declare const setText: (selectors: QueryOrElements, value: string | number) => void;
declare const elRequery: (selectors: string) => void;
declare const el: (selectors: QueryOrElements) => {
    text: (value: string | number) => void;
    html: (value: string | number) => void;
    cssDisplay: (value: string) => void;
    cssClass: (value: boolean, cssClass: string) => void;
    cssToggle: (cssClass: string) => void;
    el: () => HTMLElement;
    els: () => HTMLElement[];
};

type FormattingOptions = {
    readonly precision?: number;
    readonly roundNumbers?: number;
};
type DataTableOpts = FormattingOptions & {
    readonly formatter?: DataFormatter;
    readonly objectsAsTables?: boolean;
    readonly idPrefix?: string;
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
declare const fromObject: (parentOrQuery: HTMLElement | string, data?: object, opts?: DataTableOpts) => DataTable<object>;

type DataTable$1_DataFormatter = DataFormatter;
type DataTable$1_DataTable<V> = DataTable<V>;
type DataTable$1_DataTableOpts = DataTableOpts;
type DataTable$1_FormattingOptions = FormattingOptions;
declare const DataTable$1_fromList: typeof fromList;
declare const DataTable$1_fromObject: typeof fromObject;
declare namespace DataTable$1 {
  export { type DataTable$1_DataFormatter as DataFormatter, type DataTable$1_DataTable as DataTable, type DataTable$1_DataTableOpts as DataTableOpts, type DataTable$1_FormattingOptions as FormattingOptions, DataTable$1_fromList as fromList, DataTable$1_fromObject as fromObject };
}

type DataDisplayOptions = {
    theme?: `dark` | `light`;
};
/**
 * Creates a simple display for data. Designed to show ixfx state data
 *
 * ```js
 * // Create once
 * const display = new DataDisplay();
 *
 * // Call .update to show state
 * display.update(state);
 * ```
 */
declare class DataDisplay {
    dataTable: DataTable<object>;
    /**
     * Constructor
     * @param options Options
     */
    constructor(options?: DataDisplayOptions);
    update(data: object): void;
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
  export { type DragDrop_DragListener as DragListener, type DragDrop_DragStart as DragStart, type DragDrop_DragState as DragState, DragDrop_draggable as draggable };
}

type InlineConsoleOptions = LogOpts;
/**
 * Adds an inline console to the page. A DIV is added to display log messages.
 *
 * Captures all console.log, console.warn and console.error calls, as well as unhandled exceptions.
 *
 * ```js
 * // Adds the DIV and intercepts console logs
 * inlineConsole();
 *
 * console.log(`Hello`); // message is displayed in the inline console
 * ```
 * @param opts
 */
declare const inlineConsole: (opts?: InlineConsoleOptions) => void;

/**
 * CSS Variable
 */
type CssVariable = {
    /**
     * CSS variable to read for the value. `--` prefix is not needed
     */
    variable: string;
    /**
     * Attribute name, eg 'width' for a Canvas element.
     */
    attribute?: string;
    field?: string;
    /**
     * Optional default value
     */
    defaultValue: string | undefined;
};
/**
 * CSS Variable by id
 */
type CssVariableByIdOption = CssVariable & {
    id: string;
};
/**
 * CSS variable by query
 */
type CssVariableByQueryOption = CssVariable & {
    query: string;
};
/**
 * CSS variable by element reference
 */
type CssVariableByElementOption = CssVariable & {
    element: (HTMLElement | SVGElement) | Array<Element>;
};
/**
 * CSS variable option
 */
type CssVariableOption = CssVariable & (CssVariableByElementOption | CssVariableByIdOption | CssVariableByQueryOption);
/**
 * Parse data as attributes.
 *
 * This is a first step of going from a relatively human-friendly simple array format
 * into setting HTML attributes based on a CSS variable. The second step is to call `setFromVariables`
 *
 * ```js
 * // Array of arrays is treated as a set of key-value pairs
 * const options = [ [`indicator-fill`, `gray`], [`backdrop-fill`, `whitesmoke`] ]
 * const attrs = parseAsAttributes(options);
 * Yields:
 * [
 *  { variable: `indicator-fill`, attribute: `fill`, id: `indicator`, defaultValue: `gray` }
 *  { variable: `backdrop-fill`, attribute: `fill`, id: `backdrop`, defaultValue: `whitesmoke` }
 * ]
 *
 * // Assign
 * setFromCssVariables(document.body, attrs);
 * ```
 * @param options
 * @returns
 */
declare const parseAsAttributes: (options: Array<string | Array<string>>) => Array<CssVariable & CssVariableByIdOption>;
/**
 * Reads the value of a CSS variable and assign it to HTML attributes or object field.
 *
 * ```js
 * const options = [
 *  // Set the 'width' attribute to the value of --some-css-variable to all elements with class 'blah'
 *  { query: `.blah`, variable: `some-css-variable`, attribute: `width` }
 *  // Set #blah's 'size' attribute to the value of css variable '--size'
 *  { id: 'blah', variable: 'size', attribute: 'size' }
 *  // Sets someEL.blah = css variable '--hue'
 *  { element: someEl, variable: `hue`, field: `blah` }
 * ]
 *
 * setFromVariables(document.body, ...options);
 * ```
 *
 * The first parameter is the context for which CSS variable values are fetched
 * as well as for resolving query selectors. This can usually be `document.body`.
 * @param context Context element which is needed for relative querying. Otherwise use document.body
 * @param options Details of what to do
 */
declare const setFromVariables: (context: HTMLElement | string, ...options: Array<CssVariableOption>) => void;

type CssVariables_CssVariable = CssVariable;
type CssVariables_CssVariableByElementOption = CssVariableByElementOption;
type CssVariables_CssVariableByIdOption = CssVariableByIdOption;
type CssVariables_CssVariableByQueryOption = CssVariableByQueryOption;
type CssVariables_CssVariableOption = CssVariableOption;
declare const CssVariables_parseAsAttributes: typeof parseAsAttributes;
declare const CssVariables_setFromVariables: typeof setFromVariables;
declare namespace CssVariables {
  export { type CssVariables_CssVariable as CssVariable, type CssVariables_CssVariableByElementOption as CssVariableByElementOption, type CssVariables_CssVariableByIdOption as CssVariableByIdOption, type CssVariables_CssVariableByQueryOption as CssVariableByQueryOption, type CssVariables_CssVariableOption as CssVariableOption, CssVariables_parseAsAttributes as parseAsAttributes, CssVariables_setFromVariables as setFromVariables };
}

type CanvasOpts = {
    readonly skipCss?: boolean;
    readonly fullSize?: boolean;
    readonly scaleBy?: `both` | `width` | `height` | `min` | `max`;
};
declare const canvasHelper: (domQueryOrEl: Readonly<string | HTMLCanvasElement | undefined | null>, opts: CanvasOpts) => {
    abs: Scaler;
    rel: Scaler;
    getContext: () => void;
};

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
declare const fullSizeElement: <V extends HTMLElement>(domQueryOrEl: string | V, onResized?: ((args: ElementResizeArgs<V>) => void) | undefined) => Reactive<UIEvent>;
/**
 * Sets width/height atributes on the given element according to the size of its parent.
 * @param domQueryOrEl Elememnt to resize
 * @param onResized Callback when resize happens
 * @param timeoutMs Timeout for debouncing events
 * @returns
 */
declare const parentSize: <V extends HTMLElement | SVGSVGElement>(domQueryOrEl: string | V, onResized?: ((args: ElementResizeArgs<V>) => void) | undefined, timeoutMs?: number) => () => void;

type CanvasResizeArgs = ElementResizeArgs<HTMLCanvasElement> & {
    readonly ctx: CanvasRenderingContext2D;
};
/**
 * Resizes given canvas to its parent element.
 * To resize canvas to match the viewport, use {@link fullSizeCanvas}.
 *
 * Provide a callback for when resize happens.
 * @param domQueryOrEl Query string or reference to canvas element
 * @param onResized Callback for when resize happens, eg for redrawing canvas
 * @returns Observable
 */
declare const parentSizeCanvas: (domQueryOrEl: Readonly<string | HTMLCanvasElement>, onResized?: ((args: CanvasResizeArgs) => void) | undefined, timeoutMs?: number) => () => void;
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
declare const fullSizeCanvas: (domQueryOrEl: Readonly<string | HTMLCanvasElement | undefined | null>, onResized?: ((args: CanvasResizeArgs) => void) | undefined, skipCss?: boolean) => Reactive<UIEvent>;

/**
 * Returns an Reactive for window resize. Default 100ms debounce.
 * @param timeoutMs
 * @returns
 */
declare const windowResize: (elapsed?: Interval) => Reactive<UIEvent>;
/**
 * Observe when document's class changes
 *
 * ```js
 * const c = themeChangeObservable();
 * c.on(msg => {
 *  // do something...
 * });
 * ```
 * @returns
 */
declare const themeChange: () => {
    on: (handler: (value: Passed<MutationRecord[]>) => void) => () => void;
    value: (callback: (value: MutationRecord[]) => void) => () => void;
};
/**
 * Observe when element resizes. Specify `timeoutMs` to debounce, uses 100ms by default.
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
declare const resizeObservable: (elem: Readonly<Element>, timeout?: Interval) => Reactive<ResizeObserverEntry[]>;
declare const elements: <T>(source: ReactiveDiff<T> | (ReactiveDisposable & ReactiveWritable<T> & {
    onDiff(handler: (changes: Passed<Change<any>[]>) => void): () => void;
    update(changedPart: Record<string, any>): void;
    updateField(field: string, value: any): void;
} & Reactive<T> & {
    last(): T;
})) => void;

declare const DomRx_elements: typeof elements;
declare const DomRx_resizeObservable: typeof resizeObservable;
declare const DomRx_themeChange: typeof themeChange;
declare const DomRx_windowResize: typeof windowResize;
declare namespace DomRx {
  export { DomRx_elements as elements, DomRx_resizeObservable as resizeObservable, DomRx_themeChange as themeChange, DomRx_windowResize as windowResize };
}

type index_CanvasOpts = CanvasOpts;
type index_CanvasResizeArgs = CanvasResizeArgs;
type index_CreateUpdateElement<V> = CreateUpdateElement<V>;
type index_DataDisplay = DataDisplay;
declare const index_DataDisplay: typeof DataDisplay;
type index_DataDisplayOptions = DataDisplayOptions;
declare const index_DragDrop: typeof DragDrop;
type index_ElPositionOpts = ElPositionOpts;
type index_ElementResizeArgs<V extends HTMLElement | SVGSVGElement> = ElementResizeArgs<V>;
declare const index_Forms: typeof Forms;
type index_InlineConsoleOptions = InlineConsoleOptions;
type index_Log = Log;
type index_LogOpts = LogOpts;
type index_Opts = Opts;
type index_PointSpaces = PointSpaces;
type index_QueryOrElements = QueryOrElements;
declare const index_byId: typeof byId;
declare const index_canvasHelper: typeof canvasHelper;
declare const index_cardinalPosition: typeof cardinalPosition;
declare const index_clear: typeof clear;
declare const index_copyToClipboard: typeof copyToClipboard;
declare const index_createAfter: typeof createAfter;
declare const index_createIn: typeof createIn;
declare const index_cycleCssClass: typeof cycleCssClass;
declare const index_defaultErrorHandler: typeof defaultErrorHandler;
declare const index_el: typeof el;
declare const index_elRequery: typeof elRequery;
declare const index_fullSizeCanvas: typeof fullSizeCanvas;
declare const index_fullSizeElement: typeof fullSizeElement;
declare const index_getTranslation: typeof getTranslation;
declare const index_inlineConsole: typeof inlineConsole;
declare const index_insertSorted: typeof insertSorted;
declare const index_log: typeof log;
declare const index_parentSize: typeof parentSize;
declare const index_parentSizeCanvas: typeof parentSizeCanvas;
declare const index_pointScaler: typeof pointScaler;
declare const index_pointerVisualise: typeof pointerVisualise;
declare const index_positionFn: typeof positionFn;
declare const index_positionFromMiddle: typeof positionFromMiddle;
declare const index_positionRelative: typeof positionRelative;
declare const index_reconcileChildren: typeof reconcileChildren;
declare const index_resolveEl: typeof resolveEl;
declare const index_resolveEls: typeof resolveEls;
declare const index_setCssClass: typeof setCssClass;
declare const index_setCssDisplay: typeof setCssDisplay;
declare const index_setCssToggle: typeof setCssToggle;
declare const index_setHtml: typeof setHtml;
declare const index_setText: typeof setText;
declare const index_viewportToSpace: typeof viewportToSpace;
declare namespace index {
  export { type index_CanvasOpts as CanvasOpts, type index_CanvasResizeArgs as CanvasResizeArgs, type index_CreateUpdateElement as CreateUpdateElement, index_DataDisplay as DataDisplay, type index_DataDisplayOptions as DataDisplayOptions, DataTable$1 as DataTable, index_DragDrop as DragDrop, type index_ElPositionOpts as ElPositionOpts, type index_ElementResizeArgs as ElementResizeArgs, index_Forms as Forms, type index_InlineConsoleOptions as InlineConsoleOptions, type index_Log as Log, type index_LogOpts as LogOpts, type index_Opts as Opts, type index_PointSpaces as PointSpaces, type index_QueryOrElements as QueryOrElements, DomRx as Rx, CssVariables as Variables, index_byId as byId, index_canvasHelper as canvasHelper, index_cardinalPosition as cardinalPosition, index_clear as clear, index_copyToClipboard as copyToClipboard, index_createAfter as createAfter, index_createIn as createIn, index_cycleCssClass as cycleCssClass, index_defaultErrorHandler as defaultErrorHandler, index_el as el, index_elRequery as elRequery, index_fullSizeCanvas as fullSizeCanvas, index_fullSizeElement as fullSizeElement, index_getTranslation as getTranslation, index_inlineConsole as inlineConsole, index_insertSorted as insertSorted, index_log as log, index_parentSize as parentSize, index_parentSizeCanvas as parentSizeCanvas, index_pointScaler as pointScaler, index_pointerVisualise as pointerVisualise, index_positionFn as positionFn, index_positionFromMiddle as positionFromMiddle, index_positionRelative as positionRelative, index_reconcileChildren as reconcileChildren, index_resolveEl as resolveEl, index_resolveEls as resolveEls, index_setCssClass as setCssClass, index_setCssDisplay as setCssDisplay, index_setCssToggle as setCssToggle, index_setHtml as setHtml, index_setText as setText, index_viewportToSpace as viewportToSpace };
}

export { elRequery as A, el as B, CssVariables as C, DataTable$1 as D, type ElPositionOpts as E, type DataDisplayOptions as F, DataDisplay as G, pointerVisualise as H, defaultErrorHandler as I, type InlineConsoleOptions as J, inlineConsole as K, type LogOpts as L, type CanvasOpts as M, canvasHelper as N, type Opts as O, type PointSpaces as P, type CanvasResizeArgs as Q, parentSizeCanvas as R, fullSizeCanvas as S, type ElementResizeArgs as T, fullSizeElement as U, parentSize as V, resolveEl as W, type QueryOrElements as X, resolveEls as Y, DragDrop as a, DomRx as b, type Log as c, positionFn as d, cardinalPosition as e, positionRelative as f, positionFromMiddle as g, cycleCssClass as h, index as i, getTranslation as j, createAfter as k, log as l, createIn as m, clear as n, copyToClipboard as o, pointScaler as p, insertSorted as q, type CreateUpdateElement as r, reconcileChildren as s, setCssClass as t, setCssToggle as u, viewportToSpace as v, setCssDisplay as w, byId as x, setHtml as y, setText as z };
