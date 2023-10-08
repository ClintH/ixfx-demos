var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SourceSelect_instances, _SourceSelect_updateSelectedItem;
import { BaseUi } from "./BaseUi.js";
import { createOption, createOptionGroup } from "./Util.js";
import * as AppEvents from '../AppEvents.js';
import * as SourceEvents from '../SourceEvents.js';
export class SourceSelect extends BaseUi {
    constructor(app) {
        super(`Ui.SourceSelect`, app);
        _SourceSelect_instances.add(this);
        app.events.addEventListener(AppEvents.SourceChanged, () => {
            this.debugLog(`source changed ${app.activeSource?.name}`);
            const src = app.activeSource;
            if (src === undefined) {
                if (this.el)
                    this.el.style.display = `none`;
            }
            else {
                if (this.el)
                    this.el.style.display = `unset`;
                __classPrivateFieldGet(this, _SourceSelect_instances, "m", _SourceSelect_updateSelectedItem).call(this);
                this.updateVisibility();
            }
        });
    }
    initUi() {
        this.app.camera.events.addEventListener(SourceEvents.Enumerated, () => {
            this.updateOptions();
        });
        this.app.recorder.events.addEventListener(SourceEvents.Enumerated, () => {
            this.updateOptions();
        });
        const selEl = document.createElement(`select`);
        selEl.classList.add(`hidden`);
        selEl.addEventListener(`change`, event => {
            const selectedItem = this.selectionEl?.options.item(this.selectionEl.selectedIndex);
            const parentText = (selectedItem?.parentElement).label;
            const value = selectedItem?.value;
            switch (parentText) {
                case `Other`:
                    this.app.changeSource(this.app.video);
                    return;
                case `Recorder`:
                    this.app.recorder.use(value);
                    this.app.changeSource(this.app.recorder);
                    return;
                case `Camera`:
                    if (value === undefined) {
                        throw new Error(`No camera label?`);
                    }
                    this.app.useCameraById(value);
                    break;
            }
        });
        const c = document.createElement(`div`);
        c.append(selEl);
        this.selectionEl = selEl;
        return c;
    }
    updateVisibility() {
        const src = this.app.activeSource;
        if (src === undefined)
            return;
        const srcName = src.name;
        this.debugLog(`updateVisibility: ${srcName}`);
        switch (srcName) {
            case `video`:
                this.app.ui.videoSource.visible = true;
                this.app.ui.cameraSource.visible = false;
                this.app.ui.recorderSource.visible = false;
                break;
            case `recorder`:
                this.app.ui.recorderSource.visible = true;
                this.app.ui.videoSource.visible = false;
                this.app.ui.cameraSource.visible = false;
                break;
            default:
                this.app.ui.cameraSource.visible = true;
                this.app.ui.videoSource.visible = false;
                this.app.ui.recorderSource.visible = false;
        }
    }
    updateOptions() {
        if (this.selectionEl === undefined)
            throw new Error(`Ui not initialised`);
        this.selectionEl.classList.remove(`hidden`);
        const cameraOpts = this.app.camera.cameras.map(c => createOption({ label: c.label, value: c.deviceId }));
        const cameraGroup = createOptionGroup(`Camera`, cameraOpts);
        const recorderOpts = this.app.recorder.db.map(r => createOption({ label: r.name + ` (${r.data.length})`, value: r.name }));
        const recorderGroup = createOptionGroup(`Recorder`, [
            ...recorderOpts
        ]);
        const otherOpts = [
            createOption({ label: `Video`, value: `video` })
        ];
        const otherGroup = createOptionGroup(`Other`, otherOpts);
        this.selectionEl.innerHTML = ``;
        this.selectionEl.append(cameraGroup, recorderGroup, otherGroup);
        __classPrivateFieldGet(this, _SourceSelect_instances, "m", _SourceSelect_updateSelectedItem).call(this);
        this.updateVisibility();
    }
}
_SourceSelect_instances = new WeakSet(), _SourceSelect_updateSelectedItem = function _SourceSelect_updateSelectedItem() {
    const src = this.app.activeSource;
    if (src === undefined)
        return;
    switch (src.name) {
        case `camera`:
            const deviceId = this.app.camera.activeCamera?.deviceId;
            if (deviceId)
                this.selectionEl.value = deviceId;
            break;
        case `recorder`:
            const rec = this.app.recorder.activeRecording;
            if (rec)
                this.selectionEl.value = rec.name;
            break;
        case `video`:
            this.selectionEl.value = `video`;
            break;
    }
};
//# sourceMappingURL=SourceSelect.js.map