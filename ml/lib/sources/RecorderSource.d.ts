import { IApp, ISource, Rect, Recording } from "../Types.js";
export declare class RecorderSource implements ISource {
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
//# sourceMappingURL=RecorderSource.d.ts.map