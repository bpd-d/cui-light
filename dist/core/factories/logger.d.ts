import { CuiLogLevel } from "../utlis/types";
import { ICuiLogger } from "../models/interfaces";
/**
 *
 */
export declare class CuiLoggerFactory {
    /**
     * Gets new instance of component focused logger
     * @param name - component name
     */
    static get(name: string, logLevel?: CuiLogLevel): ICuiLogger;
}
