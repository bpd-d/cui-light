import { CuiSetupInit } from "cui-light-core/dist/esm/models/setup";
import { ICuiComponent, ICuiPlugin } from "cui-light-core/dist/esm/models/interfaces";
import { CuiAnimationsDefinition } from "cui-light-core/dist/esm/animation/definitions";
export interface CuiInitData {
    plugins?: ICuiPlugin[];
    components?: ICuiComponent[];
    setup?: CuiSetupInit;
    icons?: any;
    swipeAnimations?: CuiAnimationsDefinition;
}
export interface CuiInitResult {
    result: boolean;
    message?: string;
}
export declare class CuiInitializer {
    #private;
    constructor();
    init(setup: CuiInitData): Promise<CuiInitResult>;
}
