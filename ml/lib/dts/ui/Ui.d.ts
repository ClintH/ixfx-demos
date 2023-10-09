import { VideoSourceUi } from "./VideoSourceUi.js";
import { App } from "../App.js";
import { BaseUi } from "./BaseUi.js";
import { CameraSourceUi } from "./CameraSourceUi.js";
import { PlaybackControls } from "./PlaybackControls.js";
import { SourceSelect } from "./SourceSelect.js";
import { View } from "./View.js";
import { RecorderSourceUi } from "./RecorderSourceUi.js";
export declare class Ui extends BaseUi {
    readonly sourceSelect: SourceSelect;
    readonly cameraSource: CameraSourceUi;
    readonly videoSource: VideoSourceUi;
    readonly playbackControls: PlaybackControls;
    readonly recorderSource: RecorderSourceUi;
    readonly view: View;
    constructor(app: App);
    protected initUi(): HTMLElement;
}
//# sourceMappingURL=Ui.d.ts.map