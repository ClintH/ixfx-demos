import { IApp, ISource, Rect } from "../Types.js";
export declare class VideoSource implements ISource {
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
//# sourceMappingURL=VideoSource.d.ts.map