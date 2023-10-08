export type KeyValue = {
    value: string;
    label: string;
};
export declare const wrap: (...elements: Array<HTMLElement>) => HTMLDivElement;
export declare const createOptions: (options: Array<KeyValue>) => HTMLOptionElement[];
export declare const createOption: (o: KeyValue) => HTMLOptionElement;
export declare const createButton: (title: string) => HTMLButtonElement;
export declare const createSpan: (text: string) => HTMLSpanElement;
export declare const createOptionGroup: (title: string, options: Array<HTMLOptionElement>) => HTMLOptGroupElement;
export declare const createHeading: (text: string, level?: number) => HTMLElement;
//# sourceMappingURL=Util.d.ts.map