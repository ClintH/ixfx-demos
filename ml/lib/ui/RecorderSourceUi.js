import { BaseUi } from "./BaseUi.js";
export class RecorderSourceUi extends BaseUi {
    constructor(app) {
        super(`RecorderSourceUi`, app);
    }
    initUi() {
        const active = this.app.recorder.activeRecording;
        const c = document.createElement(`div`);
        c.style.display = `flex`;
        c.style.gap = `0.5em`;
        c.style.paddingTop = `1em`;
        const progress = document.createElement(`div`);
        if (active) {
            progress.textContent = `${active.data.length} samples. Model: ${active.model}`;
        }
        const deleteButton = document.createElement(`button`);
        deleteButton.textContent = `Delete`;
        deleteButton.addEventListener(`click`, () => {
            this.app.recorder.delete();
        });
        const exportButton = document.createElement(`button`);
        exportButton.textContent = `Copy`;
        exportButton.addEventListener(`click`, async () => {
            await navigator.clipboard.writeText(JSON.stringify(this.app.recorder.activeRecording));
            alert(`Data for this recording copied to clipboard.`);
        });
        const importButton = document.createElement(`button`);
        importButton.textContent = `Paste`;
        importButton.addEventListener(`click`, async () => {
            const text = await navigator.clipboard.readText();
            if (text.length === 0) {
                alert(`Clipboard is empty :(`);
                return;
            }
            let err = ``;
            try {
                const r = JSON.parse(text);
                if (!(`name` in r)) {
                    err = `Missing 'name'`;
                }
                else if (!(`data` in r)) {
                    err = `Missing 'data'`;
                }
                else if (!(`model` in r)) {
                    err = `Missing 'model'`;
                }
                else if (!(`size` in r)) {
                    err = `Missing 'size'`;
                }
                if (err.length === 0) {
                    this.app.recorder.add(r);
                }
            }
            catch (error) {
                err = `Clipboard does not contain a valid recording`;
            }
            if (err.length > 0) {
                alert(err);
            }
        });
        c.classList.add(`hidden`);
        c.append(progress, deleteButton, importButton, exportButton);
        return c;
    }
}
//# sourceMappingURL=RecorderSourceUi.js.map