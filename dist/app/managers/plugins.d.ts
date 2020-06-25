import { ICuiPluginManager, ICuiPlugin } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
export declare class CuiPluginManager implements ICuiPluginManager {
    #private;
    constructor(plugins: ICuiPlugin[]);
    init(utils: CuiUtils): void;
    get(name: string): ICuiPlugin;
    onMutation(mutation: MutationRecord): Promise<boolean>;
}
