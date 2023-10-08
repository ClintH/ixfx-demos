import { CameraSource } from "./sources/CameraSource.js";
import { VideoSource } from "./sources/VideoSource.js";
import { Config, ISource, Model, OnPoseData } from "./Types.js";
import { Ui } from "./ui/Ui.js";
import { Sampler } from './Sampler.js';
import '@tensorflow/tfjs-backend-webgl';
import { RecorderSource } from "./sources/RecorderSource.js";
import { Pose } from "@tensorflow-models/pose-detection/dist/types.js";
export declare class App {
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
    handleData(data: Pose[]): void;
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
//# sourceMappingURL=App.d.ts.map