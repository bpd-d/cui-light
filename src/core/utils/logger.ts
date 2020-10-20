import { CuiLogLevel } from "./types";
import { ICuiLogger } from "../models/interfaces";

export class CuiLogger implements ICuiLogger {
    level: CuiLogLevel
    component: string;
    id: string;
    constructor(name: string, level: CuiLogLevel) {
        this.level = level
        this.component = name
        this.id = "-";
    }

    setLevel(level: CuiLogLevel) {
        this.level = level
    }

    setId(id: string) {
        this.id = id
    }
    debug(message: string, functionName?: string): void {
        if (this.level === 'debug') {
            console.log(this.prepString(message, "debug", functionName))
        }
    }
    error(message: string, functionName?: string): void {
        if (this.level === 'error' || this.level === 'debug' || this.level === 'warning')
            console.error(this.prepString(message, "error", functionName))
    }

    warning(message: string, functionName?: string): void {
        if (this.level === 'warning' || this.level === 'debug')
            console.warn(this.prepString(message, "warning", functionName))
    }

    exception(e: Error, functionName?: string): void {
        console.error(this.prepString(`An exception occured: ${e.name}: ${e.message}`, "exception", functionName))
        if (this.level === 'debug')
            console.error(e.stack)
    }

    performance(callback: () => void, functionName?: string): void {
        if (this.level !== 'debug') {
            return;
        }
        let start = Date.now();
        callback();
        console.log(this.prepString(`Performance measure: ${Date.now() - start}ms`, "performance", functionName))
    }

    private prepString(message: string, level: string, functionName?: string) {
        return `[${new Date().toLocaleString()}][${level}][${this.component}][${functionName ?? '-'}][${this.id}][${message}]`
    }
}