import { CuiLogLevel } from "./types";
import { ICuiLogger } from "../models/interfaces";
export declare class CuiLogger implements ICuiLogger {
    level: CuiLogLevel;
    component: string;
    id: string;
    constructor(name: string, level: CuiLogLevel);
    setLevel(level: CuiLogLevel): void;
    setId(id: string): void;
    debug(message: string, functionName?: string): void;
    error(message: string, functionName?: string): void;
    warning(message: string, functionName?: string): void;
    exception(e: Error, functionName?: string): void;
    performance(callback: () => void, functionName?: string): void;
    private prepString;
}
