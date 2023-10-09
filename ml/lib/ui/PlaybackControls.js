import { BaseUi } from './BaseUi.js';
import { createButton } from './Util.js';
import * as SourceEvents from '../SourceEvents.js';
export class PlaybackControls extends BaseUi {
    constructor(app) {
        super(`Ui.SourceSelect`, app);
    }
    initUi() {
        const app = this.app;
        app.events.addEventListener(SourceEvents.Playing, () => {
            this.debugLog(`Playing`);
            this.stopButton?.classList.remove(`hidden`);
            this.startButton?.classList.add(`hidden`);
            this.recButton?.classList.remove(`hidden`);
        });
        app.events.addEventListener(SourceEvents.Stopped, () => {
            this.debugLog(`Stopped`);
            this.startButton?.classList.remove(`hidden`);
            this.stopButton?.classList.add(`hidden`);
            this.recButton?.classList.add(`hidden`);
        });
        app.recorder.events.addEventListener(`stopped`, () => {
            if (this.recButton === undefined)
                return;
            this.recButton.textContent = `Record`;
        });
        app.recorder.events.addEventListener(`started`, () => {
            if (this.recButton === undefined)
                return;
            this.recButton.textContent = `Recording stop`;
        });
        const c = document.createElement(`div`);
        c.style.display = `flex`;
        c.style.gap = `0.5em`;
        const stopButton = createButton(`Stop`);
        stopButton.addEventListener(`click`, () => {
            app.activeSource?.stop();
            app.sampler.stop();
        });
        stopButton.classList.add(`hidden`);
        const startButton = createButton(`Start`);
        startButton.addEventListener(`click`, () => {
            app.activeSource?.start();
            app.sampler.start();
        });
        const recButton = createButton(`Record`);
        recButton.addEventListener(`click`, () => {
            app.recorder.startStop();
        });
        recButton.classList.add(`hidden`);
        this.startButton = startButton;
        this.stopButton = stopButton;
        this.recButton = recButton;
        c.append(startButton, stopButton, recButton);
        return c;
    }
}
//# sourceMappingURL=PlaybackControls.js.map