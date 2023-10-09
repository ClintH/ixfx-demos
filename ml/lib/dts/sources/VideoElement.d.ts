import { VideoSource } from "./VideoSource.js";
export declare class VideoElement {
    #private;
    videoEl: HTMLVideoElement | undefined;
    readonly events: EventTarget;
    dimensions: {
        width: number;
        height: number;
    };
    debug: boolean;
    constructor(video: VideoSource);
    initUi(): HTMLVideoElement;
    stop(): boolean;
    onActivate(): void;
    onStandby(): void;
    start(): Promise<boolean>;
    get isPlaying(): boolean;
    setSource(src: string | undefined): void;
}
//# sourceMappingURL=VideoElement.d.ts.map