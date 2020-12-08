import { IUIInteractionProvider } from "cui-light-core/dist/esm/models/interfaces";
export declare class CuiToastHandler {
    #private;
    constructor(interaction: IUIInteractionProvider, prefix: string, animationTime: number);
    show(message: string): Promise<boolean>;
}
