import { CameraSource } from './CameraSource.js';
import { CameraInfo } from '../Types.js';
export declare class CameraElement {
    #private;
    videoEl: HTMLVideoElement | undefined;
    readonly events: EventTarget;
    dimensions: {
        width: number;
        height: number;
    };
    debug: boolean;
    constructor(camera: CameraSource);
    initUi(): HTMLVideoElement;
    stop(): boolean;
    start(): Promise<boolean>;
    onActivate(): void;
    onStandby(): void;
    get isPlaying(): boolean;
    setCamera(camera: CameraInfo | undefined): Promise<void>;
    getCamera(): CameraInfo | undefined;
}
//# sourceMappingURL=CameraElement.d.ts.map