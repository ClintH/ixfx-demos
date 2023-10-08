export const wrap = (...elements) => {
    const c = document.createElement(`div`);
    c.append(...elements);
    return c;
};
export const createOptions = (options) => {
    const optionElements = options.map(o => {
        return createOption(o);
    });
    return optionElements;
};
export const createOption = (o) => {
    const opt = document.createElement(`option`);
    opt.value = o.value;
    opt.textContent = o.label;
    return opt;
};
export const createButton = (title) => {
    const b = document.createElement(`button`);
    b.textContent = title;
    return b;
};
export const createSpan = (text) => {
    const s = document.createElement(`span`);
    s.textContent = text;
    return s;
};
export const createOptionGroup = (title, options) => {
    const el = document.createElement(`optgroup`);
    el.label = title;
    el.append(...options);
    return el;
};
export const createHeading = (text, level = 1) => {
    const el = document.createElement(`h${level}`);
    el.textContent = text;
    return el;
};
//# sourceMappingURL=Util.js.map