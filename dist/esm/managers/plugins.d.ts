import { ICuiPlugin, ICuiPluginManager } from "cui-light-core/dist/esm/models/interfaces";
import { CuiUtils } from "cui-light-core/dist/esm/models/utils";
export declare class CuiPluginManager implements ICuiPluginManager {
    #private;
    constructor(plugins: ICuiPlugin[]);
    init(utils: CuiUtils): void;
    get(name: string): ICuiPlugin | undefined;
    onMutation(mutation: MutationRecord): Promise<boolean>;
}
