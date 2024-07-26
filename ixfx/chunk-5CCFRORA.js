import {
  resolveEl
} from "./chunk-ZNCB3DZ2.js";
import {
  __export
} from "./chunk-L5EJU35C.js";

// src/dom/Forms.ts
var Forms_exports = {};
__export(Forms_exports, {
  button: () => button,
  buttonCreate: () => buttonCreate,
  checkbox: () => checkbox,
  numeric: () => numeric,
  select: () => select,
  textAreaKeyboard: () => textAreaKeyboard
});
var textAreaKeyboard = (el) => {
  el.addEventListener(`keydown`, (event) => {
    const elementValue = el.value;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    if (event.key === `Tab` && event.shiftKey) {
      if (el.value.substring(start - 2, start) === `  `) {
        el.value = elementValue.slice(0, Math.max(0, start - 2)) + elementValue.slice(Math.max(0, end));
      }
      el.selectionStart = el.selectionEnd = start - 2;
      event.preventDefault();
      return false;
    } else if (event.key === `Tab`) {
      el.value = elementValue.slice(0, Math.max(0, start)) + `  ` + elementValue.slice(Math.max(0, end));
      el.selectionStart = el.selectionEnd = start + 2;
      event.preventDefault();
      return false;
    }
  });
};
var checkbox = (domIdOrEl, onChanged) => {
  const el = resolveEl(domIdOrEl);
  if (onChanged) {
    el.addEventListener(`change`, () => {
      onChanged(el.checked);
    });
  }
  return {
    get checked() {
      return el.checked;
    },
    set checked(value) {
      el.checked = value;
    }
  };
};
var numeric = (domIdOrEl, onChanged, live) => {
  const el = resolveEl(domIdOrEl);
  const eventName = live ? `change` : `input`;
  if (onChanged) {
    el.addEventListener(eventName, () => {
      onChanged(Number.parseInt(el.value));
    });
  }
  return {
    get value() {
      return Number.parseInt(el.value);
    },
    set value(value) {
      el.value = value.toString();
    }
  };
};
var button = (domQueryOrEl, onClickHandler) => {
  const el = resolveEl(domQueryOrEl);
  const addEvent = () => {
    if (onClickHandler) {
      el.addEventListener(`click`, onClickHandler);
    }
  };
  const removeEvent = () => {
    if (onClickHandler) {
      el.removeEventListener(`click`, onClickHandler);
    }
  };
  addEvent();
  return {
    /**
     * Gets text content of button
     */
    get title() {
      return el.textContent;
    },
    /**
     * Sets text content of button
     */
    set title(value) {
      el.textContent = value;
    },
    /**
     * Disposes the button.
     * Removes event handler and optionally removes from document
     * @param deleteElement 
     */
    dispose(deleteElement = false) {
      removeEvent();
      if (deleteElement) el.remove();
    },
    /**
     * Sets the click handler, overwriting existing.
     * @param handler 
     */
    onClick(handler) {
      removeEvent();
      onClickHandler = handler;
      addEvent();
    },
    /**
     * Trigger onClick handler
     */
    click() {
      if (onClickHandler) onClickHandler();
    },
    /**
     * Sets disabled state of button
     */
    set disabled(value) {
      el.disabled = value;
    },
    /**
     * Gets the button element
     */
    get el() {
      return el;
    }
  };
};
var buttonCreate = (title, onClick) => {
  const el = document.createElement(`button`);
  const w = button(el, onClick);
  w.title = title;
  return w;
};
var select = (domQueryOrEl, onChanged, options = {}) => {
  const el = resolveEl(domQueryOrEl);
  const {
    placeholderOpt,
    shouldAddChoosePlaceholder = false,
    autoSelectAfterChoice = -1
  } = options;
  const change = () => {
    if (onChanged !== void 0) onChanged(el.value);
    if (autoSelectAfterChoice >= 0) el.selectedIndex = autoSelectAfterChoice;
  };
  if (onChanged) {
    el.addEventListener(`change`, (_event) => {
      change();
    });
  }
  return {
    set disabled(value) {
      el.disabled = value;
    },
    get value() {
      return el.value;
    },
    get index() {
      return el.selectedIndex;
    },
    get isSelectedPlaceholder() {
      return (shouldAddChoosePlaceholder || options.placeholderOpt !== void 0) && el.selectedIndex === 0;
    },
    //eslint-disable-next-line functional/prefer-immutable-types
    setOpts(opts, preSelect) {
      el.options.length = 0;
      if (shouldAddChoosePlaceholder) opts = [`-- Choose --`, ...opts];
      else if (placeholderOpt !== void 0) opts = [placeholderOpt, ...opts];
      let toSelect = 0;
      for (const [index, o] of opts.entries()) {
        const optEl = document.createElement(`option`);
        optEl.value = o;
        optEl.innerHTML = o;
        if (preSelect !== void 0 && o === preSelect) toSelect = index;
        el.options.add(optEl);
      }
      el.selectedIndex = toSelect;
    },
    select(index = 0, trigger = false) {
      el.selectedIndex = index;
      if (trigger && onChanged) {
        change();
      }
    }
  };
};

export {
  textAreaKeyboard,
  checkbox,
  numeric,
  button,
  buttonCreate,
  select,
  Forms_exports
};
//# sourceMappingURL=chunk-5CCFRORA.js.map