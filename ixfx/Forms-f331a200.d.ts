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
declare const Forms_button: typeof button;
declare const Forms_select: typeof select;
declare namespace Forms {
  export {
    Forms_checkbox as checkbox,
    Forms_numeric as numeric,
    Forms_button as button,
    Forms_select as select,
  };
}

export { Forms as F, button as b, checkbox as c, numeric as n, select as s };
