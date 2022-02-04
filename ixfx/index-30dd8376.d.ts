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

/**
 * Quick access to <input type="checkbox"> value.
 * Provide a checkbox by string id or object reference. If a callback is
 * supplied, it will be called when the checkbox changes value.
 *
 * ```
 * const opt = checkbox(`chkMate`);
 * opt.checked; // Returns current state
 *
 * const opt = checkbox(document.getElementById(`chkMate`), (newVal) => {
 *  if (newVal) ...
 * });
 *
 * @param {(string | HTMLInputElement)} domIdOrEl
 * @param {(currentVal:boolean) => void} [onChanged]
 * @returns
 */
declare const checkbox: (domIdOrEl: string | HTMLInputElement, onChanged?: ((currentVal: boolean) => void) | undefined) => {
    checked: boolean;
};
declare const numeric: (domIdOrEl: string | HTMLInputElement, onChanged?: ((currentVal: number) => void) | undefined) => {
    readonly value: number;
    checked: number;
};
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
declare type SelectOpts = {
    readonly placeholderOpt?: string;
    /**
     * If true, a placeholder option 'Choose' is added to the list
     *
     * @type {boolean}
     */
    readonly shouldAddChoosePlaceholder?: boolean;
    readonly autoSelectAfterChoice?: number;
};
declare const button: (domQueryOrEl: string | HTMLButtonElement, onClick?: (() => void) | undefined) => {
    click(): void;
    disabled: boolean;
};
/**
 * Convienence wrapper for a SELECT element.
 *
 * Handle changes in value:
 * ```
 * const mySelect = select(`#mySelect`, (newValue) => {
 *  console.log(`Value is now ${newValue}`);
 * });
 * ```
 *
 * Enable/disable:
 * ```
 * mySelect.disabled = true / false;
 * ```
 *
 * Get currently selected index or value:
 * ```
 * mySelect.value / mySelect.index
 * ```
 *
 * Is the currently selected value a placeholder?
 * ```
 * mySelect.isSelectedPlaceholder
 * ```
 *
 * Set list of options
 * ```
 * // Adds options, preselecting `opt2`.
 * mySelect.setOpts([`opt1`, `opt2 ...], `opt2`);
 * ```
 *
 * Select an element
 * ```
 * mySelect.select(1); // Select second item
 * mySelect.select(1, true); // If true is added, change handler fires as well
 * ```
 * @param {(string|HTMLSelectElement)} domIdOrEl
 * @param {(currentVal:string) => void} [onChanged]
 * @param {SelectOpts} [opts={}]
 * @return {*}
 */
declare const select: (domIdOrEl: string | HTMLSelectElement, onChanged?: ((currentVal: string) => void) | undefined, opts?: SelectOpts) => {
    disabled: boolean;
    readonly value: string;
    readonly index: number;
    readonly isSelectedPlaceholder: boolean;
    setOpts(opts: string[], preSelect?: string | undefined): void;
    select(index?: number, trigger?: boolean): void;
};

declare const Forms_checkbox: typeof checkbox;
declare const Forms_numeric: typeof numeric;
declare const Forms_resolveEl: typeof resolveEl;
declare const Forms_button: typeof button;
declare const Forms_select: typeof select;
declare namespace Forms {
  export {
    Forms_checkbox as checkbox,
    Forms_numeric as numeric,
    Forms_resolveEl as resolveEl,
    Forms_button as button,
    Forms_select as select,
  };
}

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
    index_createAfter as createAfter,
    index_createIn as createIn,
    index_themeChangeObservable as themeChangeObservable,
    index_resizeObservable as resizeObservable,
    index_copyToClipboard as copyToClipboard,
  };
}

export { DomRx as D, Forms as F, LogOpts as L, PluckOpts as P, TransformOpts as T, Log as a, DomRxOpts as b, createAfter as c, domRx as d, createIn as e, copyToClipboard as f, index as i, log as l, resizeObservable as r, themeChangeObservable as t };
