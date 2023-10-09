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
var _CameraElement_instances, _CameraElement_camera, _CameraElement_lastCameraInfo, _CameraElement_preferredCameraSize, _CameraElement_debugLog;
export class CameraElement {
    constructor(camera) {
        _CameraElement_instances.add(this);
        this.events = new EventTarget();
        _CameraElement_camera.set(this, void 0);
        _CameraElement_lastCameraInfo.set(this, void 0);
        this.dimensions = { width: 0, height: 0 };
        _CameraElement_preferredCameraSize.set(this, void 0);
        this.debug = camera.app.debug;
        __classPrivateFieldSet(this, _CameraElement_camera, camera, "f");
        __classPrivateFieldSet(this, _CameraElement_preferredCameraSize, camera.app.config.preferredCameraSize, "f");
    }
    initUi() {
        const videoEl = document.createElement(`video`);
        //videoEl.hidden = true; <-- does not work
        //videoEl.style.visibility = `hidden`;
        // @ts-ignore
        videoEl.webkitPlaysInline = true;
        videoEl.playsInline = true;
        videoEl.muted = true;
        videoEl.autoplay = true;
        videoEl.style.opacity = `0.3`;
        videoEl.style.zIndex = `1`;
        videoEl.style.top = `0px`;
        videoEl.style.left = `0px`;
        videoEl.style.position = `absolute`;
        videoEl.style.transform = `scaleX(-1)`;
        videoEl.addEventListener(`loadedmetadata`, (event) => {
            this.dimensions = {
                width: videoEl.videoWidth,
                height: videoEl.videoHeight
            };
            if (this.dimensions.width !== __classPrivateFieldGet(this, _CameraElement_preferredCameraSize, "f").width || this.dimensions.height !== __classPrivateFieldGet(this, _CameraElement_preferredCameraSize, "f").height) {
                console.warn(`Actual camera size is ${this.dimensions.width}x${this.dimensions.height}, not the preferred of ${__classPrivateFieldGet(this, _CameraElement_preferredCameraSize, "f").width}x${__classPrivateFieldGet(this, _CameraElement_preferredCameraSize, "f").height}`);
            }
            videoEl.style.aspectRatio = `${this.dimensions.width} / ${this.dimensions.height}`;
        });
        videoEl.addEventListener(`ended`, () => {
            __classPrivateFieldGet(this, _CameraElement_instances, "m", _CameraElement_debugLog).call(this, `videoEl.ended`);
        });
        videoEl.addEventListener(`pause`, () => {
            __classPrivateFieldGet(this, _CameraElement_instances, "m", _CameraElement_debugLog).call(this, `videoEl.pause`);
            __classPrivateFieldGet(this, _CameraElement_camera, "f").notifyPlayingState(false);
        });
        videoEl.addEventListener(`playing`, () => {
            __classPrivateFieldGet(this, _CameraElement_instances, "m", _CameraElement_debugLog).call(this, `videoEl.playing`);
            __classPrivateFieldGet(this, _CameraElement_camera, "f").notifyPlayingState(true);
        });
        this.videoEl = videoEl;
        return videoEl;
    }
    stop() {
        if (this.videoEl === undefined)
            throw new Error(`Ui not yet initalised`);
        __classPrivateFieldGet(this, _CameraElement_instances, "m", _CameraElement_debugLog).call(this, `Stop`);
        this.videoEl.pause();
        // Shouldn't be necessary since we do this via videoEl.addEventListener(`pause`)
        // but it doesn't seem to always fire?
        __classPrivateFieldGet(this, _CameraElement_camera, "f").notifyPlayingState(false);
        return true;
    }
    async start() {
        if (this.videoEl === undefined)
            return false;
        __classPrivateFieldGet(this, _CameraElement_instances, "m", _CameraElement_debugLog).call(this, `Start`);
        if (this.videoEl.srcObject === null) {
            await this.setCamera(__classPrivateFieldGet(this, _CameraElement_camera, "f").activeCamera);
        }
        await this.videoEl.play();
        return true;
    }
    onActivate() {
        this.videoEl?.classList.remove(`hidden`);
    }
    onStandby() {
        __classPrivateFieldGet(this, _CameraElement_instances, "m", _CameraElement_debugLog).call(this, `onStandby`);
        this.videoEl?.classList.add(`hidden`);
    }
    get isPlaying() {
        if (this.videoEl === undefined)
            throw new Error(`Ui not yet initalised`);
        return !this.videoEl.paused;
    }
    async setCamera(camera) {
        __classPrivateFieldGet(this, _CameraElement_instances, "m", _CameraElement_debugLog).call(this, `setCamera: ${camera?.label}`);
        if (this.videoEl === undefined)
            throw new Error(`Ui not initalised`);
        if (camera === __classPrivateFieldGet(this, _CameraElement_lastCameraInfo, "f"))
            return;
        if (camera === undefined) {
            this.videoEl.srcObject = null;
            __classPrivateFieldSet(this, _CameraElement_lastCameraInfo, undefined, "f");
            return;
        }
        const constraints = {
            video: {
                deviceId: { exact: camera.deviceId },
                width: __classPrivateFieldGet(this, _CameraElement_preferredCameraSize, "f").width,
                height: __classPrivateFieldGet(this, _CameraElement_preferredCameraSize, "f").height
            }
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        __classPrivateFieldSet(this, _CameraElement_lastCameraInfo, camera, "f");
        this.videoEl.srcObject = stream;
    }
    getCamera() {
        return __classPrivateFieldGet(this, _CameraElement_lastCameraInfo, "f");
    }
}
_CameraElement_camera = new WeakMap(), _CameraElement_lastCameraInfo = new WeakMap(), _CameraElement_preferredCameraSize = new WeakMap(), _CameraElement_instances = new WeakSet(), _CameraElement_debugLog = function _CameraElement_debugLog(message) {
    if (!this.debug)
        return;
    console.log(`CameraElement`, message);
};
//# sourceMappingURL=CameraElement.js.map