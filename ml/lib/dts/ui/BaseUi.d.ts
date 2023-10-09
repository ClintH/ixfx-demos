import { IApp } from "../Types.js";
export declare abstract class BaseUi {
    protected el: HTMLElement | undefined;
    readonly app: IApp;
    debug: boolean;
    readonly name: string;
    constructor(name: string, app: IApp);
    protected debugLog(message: string): void;
    getElement(): HTMLElement;
    get visible(): boolean;
    set visible(value: boolean);
    append(ui: BaseUi): void;
    protected abstract initUi(): HTMLElement;
}
//# sourceMappingURL=BaseUi.d.ts.map