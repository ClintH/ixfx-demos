export class RecordingInProgressElement {
    constructor(rec) {
        this.rec = rec;
    }
    update(length) {
        if (this.progressEl === undefined)
            return;
        this.progressEl.textContent = `${length} frames`;
    }
    initUi() {
        const c = document.createElement(`div`);
        c.classList.add(`hidden`);
        c.style.position = `absolute`;
        c.style.zIndex = `11`;
        c.style.right = `0px`;
        c.style.bottom = `0px`;
        c.style.padding = `1em`;
        c.style.backgroundColor = `rgba(0,0,0,0.5)`;
        this.progressEl = document.createElement(`div`);
        this.progressEl.textContent = `Frames 0/100`;
        // const stopButton = document.createElement(`button`);
        // stopButton.textContent = `Stop`;
        // stopButton.addEventListener(`click`, () => {
        //   this.rec.stopRecording();
        // });
        c.append(this.progressEl);
        document.body.append(c);
        this.el = c;
        return c;
    }
    get visible() {
        if (this.el === undefined)
            throw new Error(`Ui not initalised`);
        return this.el.classList.contains(`hidden`);
    }
    set visible(value) {
        if (this.el === undefined)
            throw new Error(`Ui not initalised`);
        if (value) {
            this.el.classList.remove(`hidden`);
        }
        else {
            this.el.classList.add(`hidden`);
        }
    }
}
//# sourceMappingURL=RecordingInProgressElement.js.map