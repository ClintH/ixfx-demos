import {
  resolveEl
} from "./chunk-YOC6YR6E.js";
import {
  __export
} from "./chunk-6SYKIMQH.js";

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
  el.addEventListener(`keydown`, (evt) => {
    const val = el.value;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    if (evt.key === `Tab` && evt.shiftKey) {
      if (el.value.substring(start - 2, start) === `  `) {
        el.value = val.substring(0, start - 2) + val.substring(end);
      }
      el.selectionStart = el.selectionEnd = start - 2;
      evt.preventDefault();
      return false;
    } else if (evt.key === `Tab`) {
      el.value = val.substring(0, start) + `  ` + val.substring(end);
      el.selectionStart = el.selectionEnd = start + 2;
      evt.preventDefault();
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
    set checked(val) {
      el.checked = val;
    }
  };
};
var numeric = (domIdOrEl, onChanged, live) => {
  const el = resolveEl(domIdOrEl);
  const evt = live ? `change` : `input`;
  if (onChanged) {
    el.addEventListener(evt, () => {
      onChanged(parseInt(el.value));
    });
  }
  return {
    get value() {
      return parseInt(el.value);
    },
    set value(val) {
      el.value = val.toString();
    }
  };
};
var button = (domQueryOrEl, onClick) => {
  const el = resolveEl(domQueryOrEl);
  if (onClick) {
    el.addEventListener(`click`, (_ev) => {
      onClick();
    });
  }
  return {
    click() {
      if (onClick)
        onClick();
    },
    set disabled(val) {
      el.disabled = val;
    }
  };
};
var select = (domQueryOrEl, onChanged, opts = {}) => {
  const el = resolveEl(domQueryOrEl);
  const { placeholderOpt, shouldAddChoosePlaceholder = false, autoSelectAfterChoice = -1 } = opts;
  const change = () => {
    if (onChanged !== void 0)
      onChanged(el.value);
    if (autoSelectAfterChoice >= 0)
      el.selectedIndex = autoSelectAfterChoice;
  };
  if (onChanged) {
    el.addEventListener(`change`, (_ev) => {
      change();
    });
  }
  return {
    set disabled(val) {
      el.disabled = val;
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
    setOpts(opts2, preSelect) {
      el.options.length = 0;
      if (shouldAddChoosePlaceholder)
        opts2 = [`-- Choose --`, ...opts2];
      else if (placeholderOpt !== void 0)
        opts2 = [placeholderOpt, ...opts2];
      let toSelect = 0;
      opts2.forEach((o, index) => {
        const optEl = document.createElement(`option`);
        optEl.value = o;
        optEl.innerHTML = o;
        if (preSelect !== void 0 && o === preSelect)
          toSelect = index;
        el.options.add(optEl);
      });
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
//# sourceMappingURL=chunk-E3UQRORL.js.map