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
var _RecorderSource_active, _RecorderSource_recordBuffer, _RecorderSource_recording, _RecorderSource_inProgressElement, _RecorderSource_sampleRate, _RecorderSource_lastSample, _RecorderSource_count, _RecorderSource_playing, _RecorderSource_playPosition;
import * as SourceEvents from '../SourceEvents.js';
import { RecordingInProgressElement } from "./RecordingInProgressElement.js";
export class RecorderSource {
    constructor(app) {
        this.name = "recorder";
        this.hasVideoElement = false;
        this.db = [];
        this.events = new EventTarget();
        this.dimensions = { width: 0, height: 0 };
        this.debug = false;
        _RecorderSource_active.set(this, void 0);
        _RecorderSource_recordBuffer.set(this, []);
        _RecorderSource_recording.set(this, false);
        _RecorderSource_inProgressElement.set(this, void 0);
        _RecorderSource_sampleRate.set(this, void 0);
        _RecorderSource_lastSample.set(this, 0);
        _RecorderSource_count.set(this, 1);
        _RecorderSource_playing.set(this, false);
        _RecorderSource_playPosition.set(this, 0);
        __classPrivateFieldSet(this, _RecorderSource_inProgressElement, new RecordingInProgressElement(this), "f");
        __classPrivateFieldSet(this, _RecorderSource_sampleRate, app.config.recordSamplingMs, "f");
        this.app = app;
        this.debug = app.debug;
    }
    add(recording) {
        // Removing existing recording by name
        const t = this.db.filter(r => r.name !== recording.name);
        t.push(recording);
        this.db = t;
        this.save();
        this.events.dispatchEvent(new CustomEvent(SourceEvents.Enumerated));
        setTimeout(() => {
            this.setActiveRecording(recording);
        }, 100);
    }
    get activeRecording() {
        return __classPrivateFieldGet(this, _RecorderSource_active, "f");
    }
    async onActivate() {
        this.debugLog(`onActivate`);
        return true;
    }
    onStandby() {
        this.debugLog(`onStandby`);
    }
    stop() {
        this.debugLog(`stop. playing: ${__classPrivateFieldGet(this, _RecorderSource_playing, "f")}`);
        if (!__classPrivateFieldGet(this, _RecorderSource_playing, "f"))
            return;
        __classPrivateFieldSet(this, _RecorderSource_playing, false, "f");
        this.events.dispatchEvent(new CustomEvent(SourceEvents.Stopped));
    }
    runLoop() {
        var _a;
        if (!__classPrivateFieldGet(this, _RecorderSource_playing, "f"))
            return;
        this.app.handleData(__classPrivateFieldGet(this, _RecorderSource_active, "f")?.data[__classPrivateFieldGet(this, _RecorderSource_playPosition, "f")]);
        __classPrivateFieldSet(this, _RecorderSource_playPosition, (_a = __classPrivateFieldGet(this, _RecorderSource_playPosition, "f"), _a++, _a), "f");
        if (__classPrivateFieldGet(this, _RecorderSource_playPosition, "f") === __classPrivateFieldGet(this, _RecorderSource_active, "f")?.data.length)
            __classPrivateFieldSet(this, _RecorderSource_playPosition, 0, "f");
        setTimeout(() => this.runLoop(), __classPrivateFieldGet(this, _RecorderSource_sampleRate, "f"));
    }
    async start() {
        if (__classPrivateFieldGet(this, _RecorderSource_playing, "f"))
            return false;
        __classPrivateFieldSet(this, _RecorderSource_playing, true, "f");
        this.debugLog(`start`);
        this.events.dispatchEvent(new CustomEvent(SourceEvents.Playing));
        setTimeout(() => this.runLoop(), __classPrivateFieldGet(this, _RecorderSource_sampleRate, "f"));
        return true;
    }
    get isRecording() {
        return __classPrivateFieldGet(this, _RecorderSource_recording, "f");
    }
    use(name) {
        const r = this.db.find(r => r.name === name);
        if (r === undefined)
            throw new Error(`Could not find named recording`);
        this.setActiveRecording(r);
    }
    setActiveRecording(r) {
        __classPrivateFieldSet(this, _RecorderSource_active, r, "f");
        if (r === undefined) {
            localStorage.removeItem(`last-recording`);
        }
        else {
            this.dimensions = r.size;
            localStorage.setItem(`last-recording`, r?.name);
        }
        setTimeout(() => {
            this.events.dispatchEvent(new CustomEvent(SourceEvents.Changed));
        }, 100);
    }
    delete() {
        const a = __classPrivateFieldGet(this, _RecorderSource_active, "f");
        if (a === undefined) {
            console.log(`No active recording`);
            return;
        }
        this.db = this.db.filter(r => r.name !== a.name);
        if (this.db.length > 0) {
            this.setActiveRecording(this.db[0]);
        }
        else {
            this.setActiveRecording(undefined);
        }
        this.save();
        setTimeout(() => {
            this.events.dispatchEvent(new CustomEvent(SourceEvents.Enumerated));
            if (__classPrivateFieldGet(this, _RecorderSource_active, "f") === undefined)
                this.app.changeSource(this.app.camera);
        }, 100);
    }
    startStop() {
        if (__classPrivateFieldGet(this, _RecorderSource_recording, "f")) {
            this.stopRecording();
        }
        else {
            __classPrivateFieldSet(this, _RecorderSource_recording, true, "f");
            __classPrivateFieldGet(this, _RecorderSource_inProgressElement, "f").visible = true;
            this.events.dispatchEvent(new CustomEvent(`started`));
        }
    }
    stopRecording() {
        var _a;
        const formatOpts = {
            dateStyle: `short`,
            timeStyle: `short`
        };
        const defaultName = new Intl.DateTimeFormat("se-SE", formatOpts).format(Date.now()) + ' recording ' + __classPrivateFieldGet(this, _RecorderSource_count, "f");
        const name = prompt(`Name for recording`, defaultName);
        if (name !== null) {
            const src = this.app.activeSource;
            const rec = {
                data: __classPrivateFieldGet(this, _RecorderSource_recordBuffer, "f"),
                name,
                size: src.dimensions,
                model: this.app.model.name
            };
            this.db.push(rec);
            this.save();
            __classPrivateFieldSet(this, _RecorderSource_count, (_a = __classPrivateFieldGet(this, _RecorderSource_count, "f"), _a++, _a), "f");
            setTimeout(() => {
                this.events.dispatchEvent(new CustomEvent(SourceEvents.Enumerated));
            }, 100);
        }
        __classPrivateFieldSet(this, _RecorderSource_recording, false, "f");
        __classPrivateFieldGet(this, _RecorderSource_inProgressElement, "f").visible = false;
        this.events.dispatchEvent(new CustomEvent(`stopped`));
        __classPrivateFieldSet(this, _RecorderSource_recordBuffer, [], "f");
    }
    onData(data) {
        if (!__classPrivateFieldGet(this, _RecorderSource_recording, "f"))
            return;
        const elapsed = performance.now() - __classPrivateFieldGet(this, _RecorderSource_lastSample, "f");
        if (elapsed > __classPrivateFieldGet(this, _RecorderSource_sampleRate, "f")) {
            __classPrivateFieldSet(this, _RecorderSource_lastSample, performance.now(), "f");
            __classPrivateFieldGet(this, _RecorderSource_recordBuffer, "f").push(data);
            __classPrivateFieldGet(this, _RecorderSource_inProgressElement, "f").update(__classPrivateFieldGet(this, _RecorderSource_recordBuffer, "f").length);
        }
    }
    save() {
        localStorage.setItem(`recorder`, JSON.stringify(this.db));
    }
    init() {
        const r = localStorage.getItem(`recorder`);
        if (r === null) {
            this.db = [];
        }
        else {
            this.db = JSON.parse(r);
            const lastRecording = localStorage.getItem(`last-recording`);
            if (lastRecording !== null) {
                for (const r of this.db) {
                    if (r.name === lastRecording)
                        this.setActiveRecording(r);
                }
            }
        }
        __classPrivateFieldGet(this, _RecorderSource_inProgressElement, "f").initUi();
        this.events.dispatchEvent(new CustomEvent(SourceEvents.Enumerated));
    }
    debugLog(message) {
        if (!this.debug)
            return;
        console.log(`RecorderSource`, message);
    }
}
_RecorderSource_active = new WeakMap(), _RecorderSource_recordBuffer = new WeakMap(), _RecorderSource_recording = new WeakMap(), _RecorderSource_inProgressElement = new WeakMap(), _RecorderSource_sampleRate = new WeakMap(), _RecorderSource_lastSample = new WeakMap(), _RecorderSource_count = new WeakMap(), _RecorderSource_playing = new WeakMap(), _RecorderSource_playPosition = new WeakMap();
//# sourceMappingURL=RecorderSource.js.map