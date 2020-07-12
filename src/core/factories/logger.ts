import { CuiLogger } from "../utils/logger";
import { CuiLogLevel } from "../utils/types";
import { ICuiLogger } from "../models/interfaces";
import { STATICS } from "../utils/statics";

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