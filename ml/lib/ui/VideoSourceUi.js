import { BaseUi } from "./BaseUi.js";
export class VideoSourceUi extends BaseUi {
    constructor(app) {
        super(`Ui.VideoSource`, app);
    }
    initUi() {
        const inputEl = document.createElement(`input`);
        inputEl.type = `file`;
        inputEl.accept = `video/*`;
        inputEl.addEventListener(`change`, event => {
            const files = inputEl.files;
            if (files === null)
                return;
            if (files.length !== 1)
                return;
            this.app.video.setSource(URL.createObjectURL(files[0]));
            this.app.useVideo();
        });
        inputEl.style.display = `block`;
        const c = document.createElement(`div`);
        c.append(inputEl);
        c.classList.add(`hidden`);
        return c;
    }
}
//# sourceMappingURL=VideoSourceUi.js.map