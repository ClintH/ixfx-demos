import { IApp } from '../Types.js';
import { BaseUi } from './BaseUi.js';
export declare class PlaybackControls extends BaseUi {
    stopButton: HTMLButtonElement | undefined;
    startButton: HTMLButtonElement | undefined;
    recButton: HTMLButtonElement | undefined;
    constructor(app: IApp);
    protected initUi(): HTMLElement;
}
//# sourceMappingURL=PlaybackControls.d.ts.map