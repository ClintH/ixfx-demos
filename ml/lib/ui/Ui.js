import { VideoSourceUi } from "./VideoSourceUi.js";
import { BaseUi } from "./BaseUi.js";
import { CameraSourceUi } from "./CameraSourceUi.js";
import { PlaybackControls } from "./PlaybackControls.js";
import { SourceSelect } from "./SourceSelect.js";
import { wrap } from "./Util.js";
import { View } from "./View.js";
import { RecorderSourceUi } from "./RecorderSourceUi.js";
export class Ui extends BaseUi {
    constructor(app) {
        super(`Ui`, app);
        this.sourceSelect = new SourceSelect(app);
        this.cameraSource = new CameraSourceUi(app);
        this.videoSource = new VideoSourceUi(app);
        this.recorderSource = new RecorderSourceUi(app);
        this.playbackControls = new PlaybackControls(app);
        this.view = new View(app);
    }
    initUi() {
        const c = document.createElement(`div`);
        c.style.zIndex = `10`;
        c.style.position = `absolute`;
        // const viewRawButton = document.createElement(`button`);
        // viewRawButton.textContent = `Source`;
        // viewRawButton.addEventListener(`click`, () => {
        //   this.app.ui.view.toggle();
        // });
        // const viewControls = wrap(
        //   createSpan(`View`),
        //   viewRawButton
        // );
        // viewControls.style.paddingLeft = `1em`;
        // viewControls.style.display = `flex`;
        // viewControls.style.gap = `0.5em`;
        // viewControls.style.scale = `0.8`;
        const controls = wrap(this.sourceSelect.getElement(), this.playbackControls.getElement());
        controls.style.display = `flex`;
        const sources = wrap(this.cameraSource.getElement(), this.videoSource.getElement(), this.recorderSource.getElement());
        c.append(controls, sources);
        document.body.append(this.view.getElement());
        return c;
    }
}
//# sourceMappingURL=Ui.js.map