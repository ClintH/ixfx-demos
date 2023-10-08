var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Sampler_instances, _Sampler_running, _Sampler_buffer, _Sampler_sample, _Sampler_debugLog;
export class Sampler {
    constructor(app) {
        _Sampler_instances.add(this);
        _Sampler_running.set(this, false);
        //#canvasEl: HTMLCanvasElement | undefined;
        _Sampler_buffer.set(this, void 0);
        //#ctx: CanvasRenderingContext2D | null = null;
        //#source: ISource | undefined;
        _Sampler_sample.set(this, () => { });
        this.debug = app.debug;
        this.app = app;
    }
    init() {
    }
    setSource(source) {
        __classPrivateFieldGet(this, _Sampler_instances, "m", _Sampler_debugLog).call(this, `setSource: ${source?.name}`);
        if (source === undefined) {
            this.stop();
            __classPrivateFieldSet(this, _Sampler_buffer, undefined, "f");
            __classPrivateFieldSet(this, _Sampler_sample, () => { }, "f");
            return;
        }
        const sourceDim = source.dimensions;
        this.app.ui.view.setSize(sourceDim);
        __classPrivateFieldSet(this, _Sampler_buffer, new OffscreenCanvas(sourceDim.width, sourceDim.height), "f");
        const ctx = __classPrivateFieldGet(this, _Sampler_buffer, "f").getContext(`2d`);
        if (ctx === null)
            throw new Error(`Could not get canvas context`);
        if (source.hasVideoElement) {
            const s = source;
            const videoEl = s.getVideoElement();
            __classPrivateFieldSet(this, _Sampler_sample, () => {
                ctx.drawImage(videoEl, 0, 0);
            }, "f");
        }
        else {
            // No re-sampling
            if (source.name === `recorder`)
                return;
            throw new Error(`Cannot handle source`);
        }
        this.start();
    }
    start() {
        if (__classPrivateFieldGet(this, _Sampler_running, "f"))
            return;
        if (__classPrivateFieldGet(this, _Sampler_buffer, "f") === undefined) {
            this.setSource(this.app.activeSource); // throw new Error(`Ui not initalised`);
            return;
        }
        __classPrivateFieldGet(this, _Sampler_instances, "m", _Sampler_debugLog).call(this, `Sampler started`);
        __classPrivateFieldSet(this, _Sampler_running, true, "f");
        this.loop();
    }
    stop() {
        if (!__classPrivateFieldGet(this, _Sampler_running, "f"))
            return;
        __classPrivateFieldGet(this, _Sampler_instances, "m", _Sampler_debugLog).call(this, `Stop called`);
        __classPrivateFieldSet(this, _Sampler_running, false, "f");
    }
    loop() {
        //const start = performance.now();
        // Sample from source
        __classPrivateFieldGet(this, _Sampler_sample, "f").call(this);
        // Send to model
        this.app.model.run(__classPrivateFieldGet(this, _Sampler_buffer, "f")).then((results) => {
            //const elapsed = performance.now() - start;
            //this.#lastSample = elapsed;
            if (Array.isArray(results)) {
                this.app.handleData(results);
                if (this.app.recorder.isRecording && results.length > 0) {
                    this.app.recorder.onData(results);
                }
            }
            if (__classPrivateFieldGet(this, _Sampler_running, "f")) {
                requestAnimationFrame(() => this.loop());
            }
            else {
                __classPrivateFieldGet(this, _Sampler_instances, "m", _Sampler_debugLog).call(this, `Sampler stopped.`);
            }
        });
    }
}
_Sampler_running = new WeakMap(), _Sampler_buffer = new WeakMap(), _Sampler_sample = new WeakMap(), _Sampler_instances = new WeakSet(), _Sampler_debugLog = function _Sampler_debugLog(message) {
    if (!this.debug)
        return;
    console.log(`Sampler`, message);
};
//# sourceMappingURL=Sampler.js.map