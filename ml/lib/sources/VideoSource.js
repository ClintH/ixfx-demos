var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _VideoSource_el;
import { VideoElement } from "./VideoElement.js";
import * as SourceEvents from '../SourceEvents.js';
export class VideoSource {
    constructor(app) {
        _VideoSource_el.set(this, void 0);
        this.events = new EventTarget();
        this.hasVideoElement = true;
        this.dimensions = { width: 0, height: 0 };
        this.name = `video`;
        this.debug = false;
        this.app = app;
        this.debug = app.debug;
        __classPrivateFieldSet(this, _VideoSource_el, new VideoElement(this), "f");
    }
    init() {
        const el = __classPrivateFieldGet(this, _VideoSource_el, "f").initUi();
        document.body.append(el);
    }
    getVideoElement() {
        return __classPrivateFieldGet(this, _VideoSource_el, "f").videoEl;
    }
    notifyPlayingState(value) {
        if (value) {
            this.dimensions = __classPrivateFieldGet(this, _VideoSource_el, "f").dimensions;
            this.events.dispatchEvent(new CustomEvent(SourceEvents.Playing));
        }
        else {
            this.events.dispatchEvent(new CustomEvent(SourceEvents.Stopped));
        }
    }
    stop() {
        __classPrivateFieldGet(this, _VideoSource_el, "f").stop();
    }
    start() {
        return __classPrivateFieldGet(this, _VideoSource_el, "f").start();
    }
    async onActivate() {
        this.debugLog(`onActivate`);
        __classPrivateFieldGet(this, _VideoSource_el, "f").onActivate();
        return true;
    }
    onStandby() {
        __classPrivateFieldGet(this, _VideoSource_el, "f").onStandby();
    }
    setSource(src) {
        __classPrivateFieldGet(this, _VideoSource_el, "f").setSource(src);
    }
    debugLog(message) {
        if (!this.debug)
            return;
        console.log(`Video`, message);
    }
}
_VideoSource_el = new WeakMap();
//# sourceMappingURL=VideoSource.js.map