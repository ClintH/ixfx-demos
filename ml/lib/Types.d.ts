import { App } from "./App.js";
import { CameraSource } from "./sources/CameraSource.js";
import { Sampler } from "./Sampler.js";
import { Ui } from "./ui/Ui.js";
import { VideoSource } from "./sources/VideoSource.js";
import { RecorderSource } from "./sources/RecorderSource.js";
export interface BoundingBox {
    xMin: number;
    yMin: number;
    xMax: number;
    yMax: number;
    width: number;
    height: number;
}
export interface Mask {
    toCanvasImageSource(): Promise<CanvasImageSource>;
    toImageData(): Promise<ImageData>;
    toTensor(): Promise<any>;
    getUnderlyingType(): 'canvasimagesource' | 'imagedata' | 'tensor';
}
export interface Segmentation {
    maskValueToLabel: (maskValue: number) => string;
    mask: Mask;
}
export interface Pose {
    keypoints: Keypoint[];
    score?: number;
    keypoints3D?: Keypoint[];
    box?: BoundingBox;
    segmentation?: Segmentation;
    id?: number;
}
export interface Keypoint {
    x: number;
    y: number;
    z?: number;
    score?: number;
    name?: string;
}
export type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};
export type Config = Readonly<{
    recordSamplingMs: number;
    viewData: boolean;
    viewRaw: boolean;
    debug: boolean;
}>;
export type Rect = {
    width: number;
    height: number;
};
export type Point = {
    x: number;
    y: number;
};
export type OnPoseData = (poses: Pose[]) => void;
export interface ISource {
    name: `camera` | `video` | `recorder`;
    onActivate(): Promise<boolean>;
    onStandby(): void;
    stop(): void;
    start(): Promise<boolean>;
    hasVideoElement: boolean;
    dimensions: Rect;
}
export type IApp = {
    debug: boolean;
    config: Config;
    useVideo(): void;
    useCameraByName(name: string): void;
    useCameraById(id: string): void;
    changeSource(source: ISource | undefined): void;
    handleData(data: Pose[]): void;
    get onPoseData(): OnPoseData | undefined;
    set onPoseData(callback: OnPoseData | undefined);
    get events(): EventTarget;
    get activeSource(): ISource | undefined;
    get camera(): CameraSource;
    get video(): VideoSource;
    get ui(): Ui;
    get model(): Model;
    get sampler(): Sampler;
    get recorder(): RecorderSource;
};
export type VideoElSource = ISource & {
    hasVideoElement: true;
    getVideoElement(): HTMLVideoElement;
};
export type Model = {
    name: string;
    init(app: App): void;
    run(image: OffscreenCanvas | undefined): Record<string, any>;
};
export type CameraInfo = {
    deviceId: string;
    label: string;
};
export type Recording = {
    name: string;
    size: Rect;
    data: Array<any>;
    model: string;
};
//# sourceMappingURL=Types.d.ts.map