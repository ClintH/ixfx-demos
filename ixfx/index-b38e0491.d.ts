import { Observable } from 'rxjs';
import { F as Forms } from './Forms-846a05a5';

declare type LogOpts = {
    readonly capacity?: number;
    readonly timestamp?: boolean;
    readonly collapseDuplicates?: boolean;
    readonly monospaced?: boolean;
    readonly minIntervalMs?: number;
};
declare type Log = Readonly<{
    clear(): void;
    error(msgOrError: string | Error | unknown): void;
    log(msg?: string | object | number): void;
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

/**
 * @private
 */
declare type PluckOpts = {
    readonly pluck: string;
};
/**
 * @private
 */
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
declare const rx: <V>(elOrQuery: HTMLElement | string, event: string, opts?: DomRxOpts | undefined) => Rx<V>;

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
declare const resolveEl: <V extends HTMLElement>(domQueryOrEl: string | V) => V;
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
declare const resizeObservable: (elem: HTMLElement, timeoutMs?: number) => Observable<readonly ResizeObserverEntry[]>;
/**
 * Copies string representation of object to clipboard
 * @param obj
 * @returns Promise
 */
declare const copyToClipboard: (obj: any) => Promise<unknown>;

declare const index_Forms: typeof Forms;
type index_LogOpts = LogOpts;
type index_Log = Log;
declare const index_log: typeof log;
type index_PluckOpts = PluckOpts;
type index_TransformOpts = TransformOpts;
type index_Rx<V> = Rx<V>;
type index_DomRxOpts = DomRxOpts;
declare const index_rx: typeof rx;
declare const index_resolveEl: typeof resolveEl;
declare const index_createAfter: typeof createAfter;
declare const index_createIn: typeof createIn;
declare const index_themeChangeObservable: typeof themeChangeObservable;
declare const index_resizeObservable: typeof resizeObservable;
declare const index_copyToClipboard: typeof copyToClipboard;
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
    index_resolveEl as resolveEl,
    index_createAfter as createAfter,
    index_createIn as createIn,
    index_themeChangeObservable as themeChangeObservable,
    index_resizeObservable as resizeObservable,
    index_copyToClipboard as copyToClipboard,
  };
}

export { DomRxOpts as D, LogOpts as L, PluckOpts as P, Rx as R, TransformOpts as T, Log as a, resolveEl as b, createAfter as c, createIn as d, resizeObservable as e, copyToClipboard as f, index as i, log as l, rx as r, themeChangeObservable as t };
