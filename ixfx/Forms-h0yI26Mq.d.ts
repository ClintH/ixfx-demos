/**
 * Adds tab and shift+tab to TEXTAREA
 * @param el
 */
declare const textAreaKeyboard: (el: HTMLTextAreaElement) => void;
/**
 * Quick access to <input type="checkbox"> value.
 * Provide a checkbox by string id or object reference. If a callback is
 * supplied, it will be called when the checkbox changes value.
 *
 * ```
 * const opt = checkbox(`#chkMate`);
 * opt.checked; // Gets/sets
 *
 * const opt = checkbox(document.getElementById(`#chkMate`), newVal => {
 *  if (newVal) ...
 * });
 * ```
 * @param {(string | HTMLInputElement)} domIdOrEl
 * @param {(currentVal:boolean) => void} [onChanged]
 * @returns
 */
declare const checkbox: (domIdOrEl: string | HTMLInputElement, onChanged?: (currentValue: boolean) => void) => {
    checked: boolean;
};
/**
 * Numeric INPUT
 *
 * ```
 * const el = numeric(`#num`, (currentValue) => {
 *  // Called when input changes
 * })
 * ```
 *
 * Get/set value
 * ```
 * el.value = 10;
 * ```
 * @param domIdOrEl
 * @param onChanged
 * @param live If true, event handler fires based on `input` event, rather than `change`
 * @returns
 */
declare const numeric: (domIdOrEl: string | HTMLInputElement, onChanged?: (currentValue: number) => void, live?: boolean) => {
    value: number;
};
/**
 * SELECT options
 */
type SelectOpts = {
    /**
     * Placeholder item
     */
    readonly placeholderOpt?: string;
    /**
     * If true, a placeholder option 'Choose' is added to the list
     */
    readonly shouldAddChoosePlaceholder?: boolean;
    /**
     * Item to choose after a selection is made
     */
    readonly autoSelectAfterChoice?: number;
};
/**
 * Button
 *
 * ```
 * const b = button(`#myButton`, () => {
 *  console.log(`Button clicked`);
 * });
 * ```
 *
 * ```
 * b.click(); // Call the click handler
 * b.disabled = true / false;
 * ```
 * @param domQueryOrEl Query string or element instance
 * @param onClick Callback when button is clicked
 * @returns
 */
declare const button: (domQueryOrEl: string | HTMLButtonElement, onClickHandler?: () => void) => {
    /**
     * Gets text content of button
     */
    get title(): string | null;
    /**
     * Sets text content of button
     */
    set title(value: string);
    /**
     * Disposes the button.
     * Removes event handler and optionally removes from document
     * @param deleteElement
     */
    dispose(deleteElement?: boolean): void;
    /**
     * Sets the click handler, overwriting existing.
     * @param handler
     */
    onClick(handler?: () => void): void;
    /**
     * Trigger onClick handler
     */
    click(): void;
    /**
     * Sets disabled state of button
     */
    disabled: boolean;
    /**
     * Gets the button element
     */
    readonly el: HTMLButtonElement;
};
/**
 * Creates a BUTTON element, wrapping it via {@link button} and returning it.
 * ```js
 * const b = buttonCreate(`Stop`, () => console.log(`Stop`));
 * someParent.addNode(b.el);
 * ```
 * @param title
 * @param onClick
 * @returns
 */
declare const buttonCreate: (title: string, onClick?: () => void) => {
    /**
     * Gets text content of button
     */
    get title(): string | null;
    /**
     * Sets text content of button
     */
    set title(value: string);
    /**
     * Disposes the button.
     * Removes event handler and optionally removes from document
     * @param deleteElement
     */
    dispose(deleteElement?: boolean): void;
    /**
     * Sets the click handler, overwriting existing.
     * @param handler
     */
    onClick(handler?: () => void): void;
    /**
     * Trigger onClick handler
     */
    click(): void;
    /**
     * Sets disabled state of button
     */
    disabled: boolean;
    /**
     * Gets the button element
     */
    readonly el: HTMLButtonElement;
};
/**
 * SELECT handler
 */
type SelectHandler = {
    /**
     * Gets/Sets disabled
     */
    set disabled(value: boolean);
    get disabled(): boolean;
    /**
     * Gets value
     */
    get value(): string;
    /**
     * Sets selected index
     */
    get index(): number;
    /**
     * _True_ if currently selected item is the placeholder
     */
    get isSelectedPlaceholder(): boolean;
    /**
     * Set options
     * @param opts Options
     * @param preSelect Item to preselect
     */
    setOpts(opts: ReadonlyArray<string>, preSelect?: string): void;
    /**
     * Select item by index
     * @param index Index
     * @param trigger If true, triggers change event
     */
    select(index?: number, trigger?: boolean): void;
};
/**
 * SELECT element.
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
 * @param domQueryOrEl Query (eg `#id`) or element
 * @param onChanged Callback when a selection is made
 * @param opts Options
 * @return
 */
declare const select: (domQueryOrEl: string | HTMLSelectElement, onChanged?: (currentValue: string) => void, opts?: SelectOpts) => SelectHandler;

type Forms_SelectHandler = SelectHandler;
type Forms_SelectOpts = SelectOpts;
declare const Forms_button: typeof button;
declare const Forms_buttonCreate: typeof buttonCreate;
declare const Forms_checkbox: typeof checkbox;
declare const Forms_numeric: typeof numeric;
declare const Forms_select: typeof select;
declare const Forms_textAreaKeyboard: typeof textAreaKeyboard;
declare namespace Forms {
  export { type Forms_SelectHandler as SelectHandler, type Forms_SelectOpts as SelectOpts, Forms_button as button, Forms_buttonCreate as buttonCreate, Forms_checkbox as checkbox, Forms_numeric as numeric, Forms_select as select, Forms_textAreaKeyboard as textAreaKeyboard };
}

export { Forms as F, type SelectOpts as S, buttonCreate as a, button as b, checkbox as c, type SelectHandler as d, numeric as n, select as s, textAreaKeyboard as t };
