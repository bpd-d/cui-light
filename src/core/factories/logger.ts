import { CuiLogger } from "../utlis/logger";
import { CuiLogLevel } from "../utlis/types";
import { ICuiLogger } from "../models/interfaces";
import { STATICS } from "../utlis/statics";

/**
 * 
 */
export class CuiLoggerFactory {
    /**
     * Gets new instance of component focused logger
     * @param name - component name
     */
    public static get(name: string, logLevel?: CuiLogLevel): ICuiLogger {
        return new CuiLogger(name, logLevel ?? STATICS.logLevel)
    }
}