import { RecorderSource } from './RecorderSource.js';
export declare class RecordingInProgressElement {
    progressEl: HTMLDivElement | undefined;
    el: HTMLElement | undefined;
    rec: RecorderSource;
    constructor(rec: RecorderSource);
    update(length: number): void;
    initUi(): HTMLDivElement;
    get visible(): boolean;
    set visible(value: boolean);
}
//# sourceMappingURL=RecordingInProgressElement.d.ts.map