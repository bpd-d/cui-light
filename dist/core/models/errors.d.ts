export declare class ErrorBase extends Error {
    constructor(name: string, message?: string);
}
export declare class ItemNotFoundError extends ErrorBase {
    constructor(message?: string);
}
export declare class ArgumentError extends ErrorBase {
    constructor(message?: string);
}
export declare class CuiBusError extends ErrorBase {
    constructor(message?: string);
}
export declare class CuiInstanceInitError extends ErrorBase {
    constructor(message?: string);
}
export declare class CuiScrollSpyOutOfRangeError extends ErrorBase {
    constructor(message?: string);
}
