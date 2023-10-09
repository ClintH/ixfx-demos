import { IApp, ISource } from './Types.js';
export declare class Sampler {
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
//# sourceMappingURL=Sampler.d.ts.map