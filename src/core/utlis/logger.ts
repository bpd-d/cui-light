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
            console.log(this.prepString(message, functionName))
        }
    }
    error(message: string, functionName?: string): void {
        if (this.level === 'error' || this.level === 'debug' || this.level === 'warning')
            console.error(this.prepString(message, functionName))
    }

    warning(message: string, functionName?: string): void {
        if (this.level === 'warning' || this.level === 'debug')
            console.warn(this.prepString(message, functionName))
    }

    exception(e: Error, functionName?: string): void {
        console.error(this.prepString(`An exception occured: ${e.name}: ${e.message}`, functionName))
        if (this.level === 'debug')
            console.exception(e.stack)
    }

    performance(callback: any, message?: string, functionName?: string): void {
        //
    }

    private prepString(message: string, functionName?: string) {
        return `[${new Date().toLocaleString()}][${this.component}][${functionName ?? '-'}][${this.id}][${message}]`
    }
}