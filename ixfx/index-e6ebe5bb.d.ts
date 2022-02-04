import { F as Forms } from './Forms-f331a200';
import { Observable } from 'rxjs';

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
declare type DomRx<V> = {
    readonly value: V;
    readonly clear: () => void;
};
declare type DomRxOpts = PluckOpts | TransformOpts;
/**
 * Keeps track of last event data
 *
 * ```js
 * const pointer = domRx<PointerEvent>(`#myDiv`, `pointermove`).value;
 *
 * if (pointer.clientX > ...)
 * ```
 *
 * Pluck a field:
 * ```js
 * const pointerX = domRx<PointerEvent>(`#myDiv`, `pointermove`, {pluck: `clientX`}).value;
 *
 * if (pointerX > ...)
 * ```
 * @template V
 * @param {DomRxPluckOpts} opts
 * @return {*}  {DomRx<V>}
 */
declare const domRx: <V>(elOrQuery: HTMLElement | string, event: string, opts?: DomRxOpts | undefined) => DomRx<V>;

/**
 * Resolves either a string or HTML element to an element.
 * Useful when an argument is either an HTML element or query.
 *
 * ```js
 * const t = (elOrString:string|HTMLElement) => {
 *  const el = resolveEl(elOrString); // throws if not resolved
 * }
 *
 * t(`#someId`);
 * t(someElement);
 * ```
 * @param domQueryOrEl
 * @returns
 */
declare const resolveEl: <V extends HTMLElement>(domQueryOrEl: string | V) => V;
declare const createAfter: (sibling: HTMLElement, tagName: string) => HTMLElement;
declare const createIn: (parent: HTMLElement, tagName: string) => HTMLElement;
declare const themeChangeObservable: () => Observable<readonly MutationRecord[]>;
declare const resizeObservable: (elem: HTMLElement, timeoutMs?: number) => Observable<readonly ResizeObserverEntry[]>;
declare const copyToClipboard: (obj: any) => Promise<unknown>;

declare const index_Forms: typeof Forms;
type index_LogOpts = LogOpts;
type index_Log = Log;
declare const index_log: typeof log;
type index_PluckOpts = PluckOpts;
type index_TransformOpts = TransformOpts;
type index_DomRx<V> = DomRx<V>;
type index_DomRxOpts = DomRxOpts;
declare const index_domRx: typeof domRx;
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
    index_DomRx as DomRx,
    index_DomRxOpts as DomRxOpts,
    index_domRx as domRx,
    index_resolveEl as resolveEl,
    index_createAfter as createAfter,
    index_createIn as createIn,
    index_themeChangeObservable as themeChangeObservable,
    index_resizeObservable as resizeObservable,
    index_copyToClipboard as copyToClipboard,
  };
}

export { DomRx as D, LogOpts as L, PluckOpts as P, TransformOpts as T, Log as a, DomRxOpts as b, createAfter as c, domRx as d, createIn as e, resizeObservable as f, copyToClipboard as g, index as i, log as l, resolveEl as r, themeChangeObservable as t };
