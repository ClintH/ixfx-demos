type FormattingOptions = {
    readonly precision?: number;
    readonly roundNumbers?: number;
};
declare class DataDisplayComponent extends HTMLElement {
    previousValue: Record<string, any> | undefined;
    _shadow: ShadowRoot;
    _container: HTMLElement;
    constructor();
    formatValue(v: any, options?: FormattingOptions): string;
    displayData(o: Record<string, any>): void;
    getOrCreate(path: string, init?: (parent: HTMLElement) => void): HTMLElement;
    update(value: Record<string, any>): void;
}

export { DataDisplayComponent, type FormattingOptions };
