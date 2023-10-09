import { CameraInfo, IApp, ISource } from "../Types.js";
export declare class CameraSource implements ISource {
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
//# sourceMappingURL=CameraSource.d.ts.map