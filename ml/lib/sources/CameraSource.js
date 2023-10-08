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
var _CameraSource_el, _CameraSource_activeCamera, _CameraSource_readCameraList, _CameraSource_playing;
import { CameraElement } from './CameraElement.js';
import * as SourceEvents from '../SourceEvents.js';
export class CameraSource {
    constructor(app) {
        this.cameras = [];
        this.events = new EventTarget();
        this.name = `camera`;
        this.hasVideoElement = true;
        _CameraSource_el.set(this, void 0);
        _CameraSource_activeCamera.set(this, void 0);
        _CameraSource_readCameraList.set(this, false);
        _CameraSource_playing.set(this, false);
        this.app = app;
        this.debug = app.debug;
        __classPrivateFieldSet(this, _CameraSource_el, new CameraElement(this), "f");
    }
    get dimensions() {
        return __classPrivateFieldGet(this, _CameraSource_el, "f").dimensions;
    }
    getVideoElement() {
        return __classPrivateFieldGet(this, _CameraSource_el, "f").videoEl;
    }
    stop() {
        __classPrivateFieldGet(this, _CameraSource_el, "f").stop();
    }
    start() {
        return __classPrivateFieldGet(this, _CameraSource_el, "f").start();
    }
    notifyPlayingState(value) {
        //this.debugLog(`notifyPlayingState value: ${value} (prev: ${this.#playing})`);
        if (value === __classPrivateFieldGet(this, _CameraSource_playing, "f"))
            return;
        __classPrivateFieldSet(this, _CameraSource_playing, value, "f");
        setTimeout(() => {
            const name = value ? SourceEvents.Playing : SourceEvents.Stopped;
            this.events.dispatchEvent(new CustomEvent(name, { detail: { source: this } }));
        }, 50);
        return true;
    }
    debugLog(message) {
        if (!this.debug)
            return;
        console.log(`Camera`, message);
    }
    get activeCamera() {
        return __classPrivateFieldGet(this, _CameraSource_activeCamera, "f");
    }
    get hasReadCameraList() {
        return __classPrivateFieldGet(this, _CameraSource_readCameraList, "f");
    }
    findByName(name) {
        return this.cameras.find(c => c.label.includes(name));
    }
    findById(id) {
        return this.cameras.find(c => c.deviceId === id);
    }
    use(camera) {
        this.debugLog(`use: ${camera.label}`);
        if (camera === __classPrivateFieldGet(this, _CameraSource_activeCamera, "f"))
            return;
        __classPrivateFieldSet(this, _CameraSource_playing, false, "f");
        __classPrivateFieldSet(this, _CameraSource_activeCamera, camera, "f");
        this.events.dispatchEvent(new CustomEvent(`camera-changed`));
        __classPrivateFieldGet(this, _CameraSource_el, "f").setCamera(camera);
        localStorage.setItem(`camera-label`, camera.label);
    }
    init() {
        const el = __classPrivateFieldGet(this, _CameraSource_el, "f").initUi();
        document.body.append(el);
        this.read();
    }
    async read() {
        if (!(`mediaDevices` in navigator)) {
            console.warn(`navigator.mediaDevices is missing -- are you running over https:// or via localhost?`);
        }
        if (!('getUserMedia' in navigator.mediaDevices)) {
            console.warn(`navigator.getUserMedia is missing -- are you running over https:// or via localhost?`);
        }
        await navigator.mediaDevices.getUserMedia({ video: true });
        const devices = await navigator.mediaDevices.enumerateDevices();
        const list = [];
        const lastCamera = localStorage.getItem(`camera-label`);
        for (const d of devices) {
            if (d.kind !== `videoinput`)
                continue;
            let label = d.label;
            if (label.endsWith(')')) {
                const lastOpen = label.lastIndexOf('(');
                if (lastOpen > 0) {
                    label = label.substring(0, lastOpen).trim();
                }
            }
            const info = {
                deviceId: d.deviceId,
                label: label
            };
            list.push(info);
            if (label === lastCamera) {
                __classPrivateFieldSet(this, _CameraSource_activeCamera, info, "f");
            }
        }
        this.cameras = list;
        if (!__classPrivateFieldGet(this, _CameraSource_readCameraList, "f")) {
            setTimeout(() => {
                this.events.dispatchEvent(new CustomEvent(SourceEvents.Enumerated, { detail: list }));
            }, 50);
        }
        __classPrivateFieldSet(this, _CameraSource_readCameraList, true, "f");
        return list;
    }
    async onActivate() {
        this.debugLog(`onActivate. Active camera: ${JSON.stringify(this.app.camera.activeCamera)}`);
        __classPrivateFieldGet(this, _CameraSource_el, "f").setCamera(this.app.camera.activeCamera);
        __classPrivateFieldGet(this, _CameraSource_el, "f").onActivate();
        return true;
    }
    onStandby() {
        __classPrivateFieldGet(this, _CameraSource_el, "f").setCamera(undefined);
        __classPrivateFieldGet(this, _CameraSource_el, "f").onStandby();
    }
}
_CameraSource_el = new WeakMap(), _CameraSource_activeCamera = new WeakMap(), _CameraSource_readCameraList = new WeakMap(), _CameraSource_playing = new WeakMap();
//# sourceMappingURL=CameraSource.js.map