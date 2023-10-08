import { BaseUi } from './BaseUi.js';
export class CameraSourceUi extends BaseUi {
    constructor(app) {
        super(`Ui.SourceSelect`, app);
    }
    initUi() {
        const c = document.createElement(`div`);
        c.classList.add(`hidden`);
        return c;
    }
}
// import {CameraInfo, IApp} from '../Types.js';
// import {BaseUi} from './BaseUi.js';
// import {createHeading} from './Util.js';
// export class CameraSourceUi extends BaseUi {
//   videoEl: HTMLVideoElement | undefined;
//   readonly events = new EventTarget();
//   constructor(app: IApp) {
//     super(`Ui.SourceSelect`, app);
//   }
//   protected override initUi() {
//     const c = document.createElement(`div`);
//     const videoEl = document.createElement(`video`);
//     videoEl.autoplay = true;
//     videoEl.muted = true;
//     c.append(
//       createHeading(`Camera`),
//       videoEl);
//     this.videoEl = videoEl;
//     return c;
//   }
//   stop() {
//     if (this.videoEl === undefined) throw new Error(`Ui not yet initalised`);
//     this.videoEl.pause();
//     this.app.camera.notifyPlayingState(false);
//     return true;
//   }
//   start() {
//     if (this.videoEl === undefined) return false;
//     this.videoEl.play();
//     this.app.camera.notifyPlayingState(true);
//     return true;
//   }
//   get isPlaying() {
//     if (this.videoEl === undefined) throw new Error(`Ui not yet initalised`);
//     return !this.videoEl.paused;
//   }
//   async setCamera(camera: CameraInfo | undefined) {
//     if (this.videoEl === undefined) throw new Error(`Ui not initalised`);
//     if (camera === undefined) {
//       this.videoEl.srcObject = null;
//       return;
//     }
//     const constraints = {
//       video: {
//         deviceId: {exact: camera.deviceId}
//       }
//     }
//     const stream = await navigator.mediaDevices.getUserMedia(constraints);
//     this.videoEl.srcObject = stream;
//     this.app.camera.notifyPlayingState(true);
//   }
// }
//# sourceMappingURL=CameraSourceUi.js.map