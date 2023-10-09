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
var _App_instances, _App_activeSource, _App_activeModel, _App_onPoseData, _App_useCamera, _App_debugLog;
import { CameraSource } from "./sources/CameraSource.js";
import { VideoSource } from "./sources/VideoSource.js";
import * as AppEvents from './AppEvents.js';
import * as SourceEvents from './SourceEvents.js';
import { MoveNet } from "./models/index.js";
import { Ui } from "./ui/Ui.js";
import { Sampler } from './Sampler.js';
import * as TensorFlow from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-wasm';
import { RecorderSource } from "./sources/RecorderSource.js";
import { defaultMoveNetConfig } from "./models/Types.js";
export class App {
    constructor(config = {}) {
        _App_instances.add(this);
        _App_activeSource.set(this, void 0);
        _App_activeModel.set(this, void 0);
        _App_onPoseData.set(this, void 0);
        this.config = {
            debug: false,
            recordSamplingMs: 50,
            preferredCameraSize: {
                height: 600,
                width: 800
            },
            moveNet: defaultMoveNetConfig(6),
            ...config
        };
        this.debug = this.config.debug;
        console.log(`Config:`, this.config);
        this.sampler = new Sampler(this);
        this.events = new EventTarget();
        this.ui = new Ui(this);
        this.camera = new CameraSource(this);
        this.video = new VideoSource(this);
        __classPrivateFieldSet(this, _App_activeModel, new MoveNet(this.config.moveNet), "f");
        this.recorder = new RecorderSource(this);
        const checkReady = async () => {
            if (this.camera.hasReadCameraList) {
                await TensorFlow.ready();
                __classPrivateFieldGet(this, _App_activeModel, "f").init(this);
                this.events.dispatchEvent(new CustomEvent(`ready`));
                setTimeout(() => {
                    const lastSource = localStorage.getItem(`last-source`);
                    switch (lastSource) {
                        case `camera`:
                            this.changeSource(this.camera);
                            break;
                        case `video`:
                            this.changeSource(this.video);
                            break;
                        case `recorder`:
                            this.changeSource(this.recorder);
                    }
                }, 100);
            }
        };
        this.camera.events.addEventListener(SourceEvents.Enumerated, () => {
            checkReady();
        });
        this.camera.events.addEventListener(SourceEvents.Playing, () => {
            this.sampler.setSource(this.camera);
            this.events.dispatchEvent(new CustomEvent(SourceEvents.Playing));
        });
        this.video.events.addEventListener(SourceEvents.Playing, () => {
            this.sampler.setSource(this.video);
            this.events.dispatchEvent(new CustomEvent(SourceEvents.Playing));
        });
        this.recorder.events.addEventListener(SourceEvents.Playing, () => {
            this.sampler.setSource(undefined);
            this.events.dispatchEvent(new CustomEvent(SourceEvents.Playing));
        });
        this.camera.events.addEventListener(SourceEvents.Stopped, () => {
            __classPrivateFieldGet(this, _App_instances, "m", _App_debugLog).call(this, `Got camera.Stopped`);
            this.events.dispatchEvent(new CustomEvent(SourceEvents.Stopped));
            this.sampler.stop();
        });
        this.video.events.addEventListener(SourceEvents.Stopped, () => {
            this.events.dispatchEvent(new CustomEvent(SourceEvents.Stopped));
            this.sampler.stop();
        });
        this.recorder.events.addEventListener(SourceEvents.Stopped, () => {
            this.events.dispatchEvent(new CustomEvent(SourceEvents.Stopped));
        });
        this.sampler.init();
        this.camera.init();
        this.video.init();
        this.recorder.init();
    }
    handleData(data) {
        this.ui.view.drawPoses(data);
        if (__classPrivateFieldGet(this, _App_onPoseData, "f") === undefined)
            return;
        __classPrivateFieldGet(this, _App_onPoseData, "f").call(this, data);
    }
    get model() {
        return __classPrivateFieldGet(this, _App_activeModel, "f");
    }
    set model(value) {
        __classPrivateFieldSet(this, _App_activeModel, value, "f");
    }
    get activeSource() {
        return __classPrivateFieldGet(this, _App_activeSource, "f");
    }
    useCameraByName(name) {
        const c = this.camera.findByName(name);
        __classPrivateFieldGet(this, _App_instances, "m", _App_useCamera).call(this, c);
    }
    useCameraById(id) {
        const c = this.camera.findById(id);
        __classPrivateFieldGet(this, _App_instances, "m", _App_useCamera).call(this, c);
    }
    useVideo() {
        this.changeSource(this.video);
    }
    async changeSource(source) {
        __classPrivateFieldGet(this, _App_instances, "m", _App_debugLog).call(this, `changeSource: ${source ? source.name : `undefined`}`);
        if (__classPrivateFieldGet(this, _App_activeSource, "f") !== undefined) {
            __classPrivateFieldGet(this, _App_activeSource, "f").stop();
            __classPrivateFieldGet(this, _App_activeSource, "f").onStandby();
        }
        __classPrivateFieldSet(this, _App_activeSource, source, "f");
        if (source !== undefined) {
            localStorage.setItem(`last-source`, source.name);
            await source.onActivate();
        }
        setTimeout(() => {
            this.events.dispatchEvent(new CustomEvent(AppEvents.SourceChanged));
        }, 100);
    }
    get onPoseData() {
        return __classPrivateFieldGet(this, _App_onPoseData, "f");
    }
    set onPoseData(callback) {
        __classPrivateFieldSet(this, _App_onPoseData, callback, "f");
    }
}
_App_activeSource = new WeakMap(), _App_activeModel = new WeakMap(), _App_onPoseData = new WeakMap(), _App_instances = new WeakSet(), _App_useCamera = function _App_useCamera(info) {
    if (info === undefined) {
        throw new Error(`No matching camera. Cameras: ${JSON.stringify(this.camera.cameras)}`);
    }
    this.camera.use(info);
    this.changeSource(this.camera);
}, _App_debugLog = function _App_debugLog(message) {
    if (!this.debug)
        return;
    console.log(`App: `, message);
};
//# sourceMappingURL=App.js.map