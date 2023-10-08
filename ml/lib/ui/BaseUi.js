export class BaseUi {
    constructor(name, app) {
        if (app === undefined)
            throw new Error(`Parameter 'app' is undefined`);
        this.name = name;
        this.app = app;
        this.debug = app.debug;
    }
    debugLog(message) {
        if (!this.debug)
            return;
        console.log(this.name, message);
    }
    getElement() {
        if (this.el !== undefined)
            return this.el;
        this.el = this.initUi();
        return this.el;
    }
    get visible() {
        if (this.el === undefined)
            throw new Error(`Not initialised`);
        return this.el.classList.contains(`hidden`);
    }
    set visible(value) {
        if (this.el === undefined)
            throw new Error(`Not initialised`);
        if (value) {
            this.el.classList.remove(`hidden`);
        }
        else {
            this.el.classList.add(`hidden`);
        }
    }
    append(ui) {
    }
}
//# sourceMappingURL=BaseUi.js.map