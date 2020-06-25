import { IUIInteractionProvider } from "../../core/models/interfaces";
export declare class CuiToastHandler {
    #private;
    constructor(interaction: IUIInteractionProvider, prefix: string, animationTime: number);
    show(message: string): Promise<boolean>;
}
