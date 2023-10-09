import * as PoseDetection from '@tensorflow-models/pose-detection';
import { Pose as Pose$1 } from '@tensorflow-models/pose-detection';
import { Pose as Pose$2 } from '@tensorflow-models/pose-detection/dist/types.js';

declare class Sampler {
    #private;
    debug: boolean;
    app: IApp;
    constructor(app: IApp);
    init(): void;
    setSource(source: ISource | undefined): void;
    start(): void;
    stop(): void;
    private loop;
}

declare abstract class BaseUi {
    protected el: HTMLElement | undefined;
    readonly app: IApp;
    debug: boolean;
    readonly name: string;
    constructor(name: string, app: IApp);
    protected debugLog(message: string): void;
    getElement(): HTMLElement;
    get visible(): boolean;
    set visible(value: boolean);
    append(ui: BaseUi): void;
    protected abstract initUi(): HTMLElement;
}

declare class VideoSourceUi extends BaseUi {
    constructor(app: App);
    initUi(): HTMLDivElement;
}

declare class CameraSourceUi extends BaseUi {
    constructor(app: IApp);
    protected initUi(): HTMLDivElement;
}

declare class PlaybackControls extends BaseUi {
    stopButton: HTMLButtonElement | undefined;
    startButton: HTMLButtonElement | undefined;
    recButton: HTMLButtonElement | undefined;
    constructor(app: IApp);
    protected initUi(): HTMLElement;
}

declare class SourceSelect extends BaseUi {
    #private;
    selectionEl: HTMLSelectElement | undefined;
    constructor(app: IApp);
    protected initUi(): HTMLDivElement;
    updateVisibility(): void;
    updateOptions(): void;
}

declare class View extends BaseUi {
    #private;
    constructor(app: IApp);
    protected initUi(): HTMLElement;
    toggle(): void;
    getCtx(): CanvasRenderingContext2D | undefined;
    /**
     * Called by the sampler
     * @param bounds
     */
    setSize(bounds: Rect): void;
    relToAbs(x: number, y: number): {
        x: number;
        y: number;
    };
    drawPoses(poses: Pose$1[]): void;
    drawDot(ctx: CanvasRenderingContext2D, point: Point, radius: number, label: string): void;
    drawPose(ctx: CanvasRenderingContext2D, pose: Pose$1, index: number): void;
    traceLine(ctx: CanvasRenderingContext2D, ...points: Array<Point | undefined>): void;
    drawOffscreen(buffer: OffscreenCanvas): void;
}

declare class RecorderSourceUi extends BaseUi {
    constructor(app: IApp);
    protected initUi(): HTMLElement;
}

declare class Ui extends BaseUi {
    readonly sourceSelect: SourceSelect;
    readonly cameraSource: CameraSourceUi;
    readonly videoSource: VideoSourceUi;
    readonly playbackControls: PlaybackControls;
    readonly recorderSource: RecorderSourceUi;
    readonly view: View;
    constructor(app: App);
    protected initUi(): HTMLElement;
}

declare class VideoSource implements ISource {
    #private;
    readonly events: EventTarget;
    hasVideoElement: boolean;
    dimensions: Rect;
    readonly name = "video";
    debug: boolean;
    app: IApp;
    constructor(app: IApp);
    init(): void;
    getVideoElement(): HTMLVideoElement | undefined;
    notifyPlayingState(value: boolean): void;
    stop(): void;
    start(): Promise<boolean>;
    onActivate(): Promise<boolean>;
    onStandby(): void;
    setSource(src: string): void;
    protected debugLog(message: any): void;
}

declare class RecorderSource implements ISource {
    #private;
    readonly name = "recorder";
    readonly hasVideoElement = false;
    readonly app: IApp;
    db: Array<Recording>;
    events: EventTarget;
    dimensions: Rect;
    debug: boolean;
    constructor(app: IApp);
    add(recording: Recording): void;
    get activeRecording(): Recording | undefined;
    onActivate(): Promise<boolean>;
    onStandby(): void;
    stop(): void;
    runLoop(): void;
    start(): Promise<boolean>;
    get isRecording(): boolean;
    use(name: string): void;
    setActiveRecording(r: Recording | undefined): void;
    delete(): void;
    startStop(): void;
    stopRecording(): void;
    onData(data: any): void;
    save(): void;
    init(): void;
    protected debugLog(message: any): void;
}

type TrackerConfig = {
    maxTracks: number;
    maxAge: number;
    minSimilarity: number;
    keypointTrackerParams?: KeypointTrackerConfig;
    boundingBoxTrackerParams?: BoundingBoxTrackerConfig;
};
type KeypointTrackerConfig = {
    keypointConfidenceThreshold: number;
    keypointFalloff: number[];
    minNumberOfKeypoints: number;
};
type BoundingBoxTrackerConfig = {};
type TrackerType = "keypoint" | "boundingBox";
type MoveNetConfig = {
    scoreThreshold: number;
    maxPoses: number;
    enableSmoothing: boolean;
    modelType: `SinglePose.Lightning` | `SinglePose.Thunder` | 'MultiPose.Lightning';
    minPoseScore?: number;
    multiPoseMaxDimension?: number;
    enableTracking: boolean;
    trackerType: TrackerType;
    trackerConfig?: TrackerConfig;
};
declare const defaultMoveNetConfig: (maxPoses: number) => MoveNetConfig;

type Types_d_BoundingBoxTrackerConfig = BoundingBoxTrackerConfig;
type Types_d_KeypointTrackerConfig = KeypointTrackerConfig;
type Types_d_MoveNetConfig = MoveNetConfig;
type Types_d_TrackerConfig = TrackerConfig;
type Types_d_TrackerType = TrackerType;
declare const Types_d_defaultMoveNetConfig: typeof defaultMoveNetConfig;
declare namespace Types_d {
  export { type Types_d_BoundingBoxTrackerConfig as BoundingBoxTrackerConfig, type Types_d_KeypointTrackerConfig as KeypointTrackerConfig, type Types_d_MoveNetConfig as MoveNetConfig, type Types_d_TrackerConfig as TrackerConfig, type Types_d_TrackerType as TrackerType, Types_d_defaultMoveNetConfig as defaultMoveNetConfig };
}

interface BoundingBox {
    xMin: number;
    yMin: number;
    xMax: number;
    yMax: number;
    width: number;
    height: number;
}
interface Mask {
    toCanvasImageSource(): Promise<CanvasImageSource>;
    toImageData(): Promise<ImageData>;
    toTensor(): Promise<any>;
    getUnderlyingType(): 'canvasimagesource' | 'imagedata' | 'tensor';
}
interface Segmentation {
    maskValueToLabel: (maskValue: number) => string;
    mask: Mask;
}
interface Pose {
    keypoints: Keypoint[];
    score?: number;
    keypoints3D?: Keypoint[];
    box?: BoundingBox;
    segmentation?: Segmentation;
    id?: number;
}
interface Keypoint {
    x: number;
    y: number;
    z?: number;
    score?: number;
    name?: string;
}
type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};
type Config = Readonly<{
    recordSamplingMs: number;
    debug: boolean;
    moveNet: MoveNetConfig;
    /**
     * Preferred camera size. Defaults to 800x600
     * Other common sizes:
     * - 1600x1200
     * - 1280x720
     * - 640x480
     * - 320x240
     */
    preferredCameraSize: {
        width: number;
        height: number;
    };
}>;
type Rect = {
    width: number;
    height: number;
};
type Point = {
    x: number;
    y: number;
};
type OnPoseData = (poses: Pose[]) => void;
interface ISource {
    name: `camera` | `video` | `recorder`;
    onActivate(): Promise<boolean>;
    onStandby(): void;
    stop(): void;
    start(): Promise<boolean>;
    hasVideoElement: boolean;
    dimensions: Rect;
}
type IApp = {
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
type VideoElSource = ISource & {
    hasVideoElement: true;
    getVideoElement(): HTMLVideoElement;
};
type Model = {
    name: string;
    init(app: App): void;
    run(image: OffscreenCanvas | undefined): Record<string, any>;
};
type CameraInfo = {
    deviceId: string;
    label: string;
};
type Recording = {
    name: string;
    size: Rect;
    data: Array<any>;
    model: string;
};

declare class CameraSource implements ISource {
    #private;
    cameras: Array<CameraInfo>;
    readonly events: EventTarget;
    readonly app: IApp;
    readonly name = "camera";
    readonly hasVideoElement = true;
    debug: boolean;
    constructor(app: IApp);
    get dimensions(): {
        width: number;
        height: number;
    };
    getVideoElement(): HTMLVideoElement | undefined;
    stop(): void;
    start(): Promise<boolean>;
    notifyPlayingState(value: boolean): true | undefined;
    protected debugLog(message: any): void;
    get activeCamera(): CameraInfo | undefined;
    get hasReadCameraList(): boolean;
    findByName(name: string): CameraInfo | undefined;
    findById(id: string): CameraInfo | undefined;
    use(camera: CameraInfo): void;
    init(): void;
    read(): Promise<CameraInfo[]>;
    onActivate(): Promise<boolean>;
    onStandby(): void;
}

declare class App {
    #private;
    camera: CameraSource;
    video: VideoSource;
    readonly ui: Ui;
    readonly events: EventTarget;
    readonly sampler: Sampler;
    readonly recorder: RecorderSource;
    debug: boolean;
    config: Config;
    constructor(config?: Partial<Config>);
    handleData(data: Pose$2[]): void;
    get model(): Model;
    set model(value: Model);
    get activeSource(): ISource | undefined;
    useCameraByName(name: string): void;
    useCameraById(id: string): void;
    useVideo(): void;
    changeSource(source: ISource | undefined): Promise<void>;
    get onPoseData(): OnPoseData | undefined;
    set onPoseData(callback: OnPoseData | undefined);
}

declare class MoveNet {
    detector: PoseDetection.PoseDetector | undefined;
    config: MoveNetConfig;
    debug: boolean;
    readonly name = "MoveNet";
    constructor(config: Partial<MoveNetConfig>);
    run(image?: OffscreenCanvas): Promise<{
        box: {
            xMax: number;
            xMin: number;
            yMin: number;
            yMax: number;
            width: number;
            height: number;
        } | undefined;
        id: number | undefined;
        keypoints: {
            name: string | undefined;
            score: number | undefined;
            x: number;
            y: number;
        }[];
        score: number | undefined;
    }[] | undefined>;
    debugLog(message: any): void;
    init(app: IApp): void;
    getDetector(): Promise<PoseDetection.PoseDetector>;
}

type index_d_MoveNet = MoveNet;
declare const index_d_MoveNet: typeof MoveNet;
declare namespace index_d {
  export { index_d_MoveNet as MoveNet, Types_d as MoveNetTypes };
}

declare enum NamedKeypoints {
    'nose' = 0,
    'left_eye' = 1,
    'right_eye' = 2,
    'left_ear' = 3,
    'right_ear' = 4,
    'left_shoulder' = 5,
    'right_shoulder' = 6,
    'left_elbow' = 7,
    'right_elbow' = 8,
    'left_wrist' = 9,
    'right_wrist' = 10,
    'left_hip' = 11,
    'right_hip' = 12,
    'left_knee' = 13,
    'right_knee' = 14,
    'left_ankle' = 15,
    'right_ankle' = 16
}
declare const nameToIndex: Map<string, number>;
declare const indexToName: Map<number, string>;
declare const getKeypoint: (pose: Pose, nameOrIndex: string | number) => Keypoint;

type Coco_d_NamedKeypoints = NamedKeypoints;
declare const Coco_d_NamedKeypoints: typeof NamedKeypoints;
declare const Coco_d_getKeypoint: typeof getKeypoint;
declare const Coco_d_indexToName: typeof indexToName;
declare const Coco_d_nameToIndex: typeof nameToIndex;
declare namespace Coco_d {
  export { Coco_d_NamedKeypoints as NamedKeypoints, Coco_d_getKeypoint as getKeypoint, Coco_d_indexToName as indexToName, Coco_d_nameToIndex as nameToIndex };
}

declare const mount: (elementOrQuery: HTMLElement | string, config?: Partial<Mutable<Config>>) => App;

export { type BoundingBox, type CameraInfo, Coco_d as Coco, type Config, type IApp, type ISource, type Keypoint, type Mask, type Model, index_d as Models, type Mutable, type OnPoseData, type Point, type Pose, type Recording, type Rect, type Segmentation, type VideoElSource, VideoSourceUi, mount };
