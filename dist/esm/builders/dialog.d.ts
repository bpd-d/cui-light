export declare class DialogBuilder {
    #private;
    constructor(prefix: string, reverse: boolean, switches?: string);
    createHeader(title: string, classes: string[], elements?: Element[]): void;
    createFooter(classes: string[], elements: Element[]): void;
    createBody(classes: string[], elements: Element[]): void;
    build(id: string): HTMLElement;
    private appendChildrens;
    private getPrefixedString;
}
