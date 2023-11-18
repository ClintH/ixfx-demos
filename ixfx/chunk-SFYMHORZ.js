import {
  resolveEl
} from "./chunk-LYP27BGI.js";
import {
  __export
} from "./chunk-VE7DK22H.js";

// src/dom/Forms.ts
var Forms_exports = {};
__export(Forms_exports, {
  button: () => button,
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
var button = (domQueryOrEl, onClick) => {
  const el = resolveEl(domQueryOrEl);
  if (onClick) {
    el.addEventListener(`click`, (_event) => {
      onClick();
    });
  }
  return {
    click() {
      if (onClick)
        onClick();
    },
    set disabled(value) {
      el.disabled = value;
    }
  };
};
var select = (domQueryOrEl, onChanged, opts = {}) => {
  const el = resolveEl(domQueryOrEl);
  const {
    placeholderOpt,
    shouldAddChoosePlaceholder = false,
    autoSelectAfterChoice = -1
  } = opts;
  const change = () => {
    if (onChanged !== void 0)
      onChanged(el.value);
    if (autoSelectAfterChoice >= 0)
      el.selectedIndex = autoSelectAfterChoice;
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
      return (shouldAddChoosePlaceholder || opts.placeholderOpt !== void 0) && el.selectedIndex === 0;
    },
    //eslint-disable-next-line functional/prefer-immutable-types
    setOpts(opts2, preSelect) {
      el.options.length = 0;
      if (shouldAddChoosePlaceholder)
        opts2 = [`-- Choose --`, ...opts2];
      else if (placeholderOpt !== void 0)
        opts2 = [placeholderOpt, ...opts2];
      let toSelect = 0;
      for (const [index, o] of opts2.entries()) {
        const optEl = document.createElement(`option`);
        optEl.value = o;
        optEl.innerHTML = o;
        if (preSelect !== void 0 && o === preSelect)
          toSelect = index;
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
  select,
  Forms_exports
};
//# sourceMappingURL=chunk-SFYMHORZ.js.map