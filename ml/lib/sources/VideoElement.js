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
var _VideoElement_instances, _VideoElement_video, _VideoElement_debugLog;
export class VideoElement {
    constructor(video) {
        _VideoElement_instances.add(this);
        this.events = new EventTarget();
        this.dimensions = { width: 0, height: 0 };
        _VideoElement_video.set(this, void 0);
        __classPrivateFieldSet(this, _VideoElement_video, video, "f");
        this.debug = video.app.debug;
    }
    initUi() {
        const videoEl = document.createElement(`video`);
        videoEl.style.zIndex = `1`;
        videoEl.style.top = `0px`;
        videoEl.style.left = `0px`;
        videoEl.style.position = `absolute`;
        videoEl.style.transform = `scaleX(-1)`;
        videoEl.style.opacity = `0.3`;
        videoEl.controls = false;
        videoEl.autoplay = false;
        videoEl.loop = true;
        videoEl.muted = true;
        //videoEl.hidden = true; <-- does not work
        //videoEl.style.visibility = `hidden`;
        videoEl.playsInline = true;
        // @ts-ignore
        videoEl.webkitPlaysInline = true;
        videoEl.addEventListener(`loadedmetadata`, (event) => {
            __classPrivateFieldGet(this, _VideoElement_instances, "m", _VideoElement_debugLog).call(this, `loaded`);
            this.dimensions = {
                width: videoEl.videoWidth,
                height: videoEl.videoHeight
            };
            videoEl.style.aspectRatio = `${this.dimensions.width} / ${this.dimensions.height}`;
            this.start();
        });
        videoEl.addEventListener(`playing`, () => {
            __classPrivateFieldGet(this, _VideoElement_video, "f").notifyPlayingState(true);
        });
        videoEl.addEventListener(`pause`, () => {
            __classPrivateFieldGet(this, _VideoElement_video, "f").notifyPlayingState(false);
        });
        this.videoEl = videoEl;
        return videoEl;
    }
    stop() {
        if (this.videoEl === undefined)
            throw new Error(`Ui not yet initalised`);
        __classPrivateFieldGet(this, _VideoElement_instances, "m", _VideoElement_debugLog).call(this, `stop`);
        this.videoEl.pause();
        return true;
    }
    onActivate() {
        this.videoEl?.classList.remove(`hidden`);
    }
    onStandby() {
        this.videoEl?.classList.add(`hidden`);
    }
    async start() {
        if (this.videoEl === undefined)
            return false;
        await this.videoEl.play();
        return true;
    }
    get isPlaying() {
        if (this.videoEl === undefined)
            throw new Error(`Ui not yet initalised`);
        return !this.videoEl.paused;
    }
    setSource(src) {
        if (this.videoEl === undefined)
            throw new Error(`Ui not initalised`);
        if (src === undefined) {
            this.videoEl.srcObject = null;
            return;
        }
        //URL.createObjectURL(files[0])
        this.videoEl.src = src;
        this.videoEl.load();
    }
}
_VideoElement_video = new WeakMap(), _VideoElement_instances = new WeakSet(), _VideoElement_debugLog = function _VideoElement_debugLog(message) {
    if (!this.debug)
        return;
    console.log(`VideoElement`, message);
};
//# sourceMappingURL=VideoElement.js.map