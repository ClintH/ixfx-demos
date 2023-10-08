import { IApp } from "../Types.js";
import { BaseUi } from "./BaseUi.js";
export declare class SourceSelect extends BaseUi {
    #private;
    selectionEl: HTMLSelectElement | undefined;
    constructor(app: IApp);
    protected initUi(): HTMLDivElement;
    updateVisibility(): void;
    updateOptions(): void;
}
//# sourceMappingURL=SourceSelect.d.ts.map