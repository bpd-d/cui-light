export interface ICuiLogger {
    debug(message: string, functionName?: string): void;
    error(message: string, functionName?: string): void;
    warning(message: string, functionName?: string): void;
    exception(e: Error, functionName?: string): void;
    performance(callback: any, message?: string, functionName?: string): void;
    setId(id: string): void;
}

export interface IUIInteractionProvider {
    mutate(callback: any, ctx: any, ...args: any[]): void;
    fetch(callback: any, ctx: any, ...args: any[]): void;
}

export interface ICuiDictionary<T> {
    add(key: string, value: T): void;
    remove(key: string): void;
    get(key: string): T;
    containsKey(key: string): boolean;
    keys(): string[];
    values(): T[];
    indexOf(key: string): number;
    update(key: string, value: T): void;
}

export interface ICuiDictionaryItem<T> {
    key: string;
    value: T;
}

export interface ICuiObserver<T> {
    observe(target: T): void;
    unobserve(target: T): void;
    connect(): void;
    disconnect(): void;
}

export interface ICuiMutationHandler {
    handle(): void;
    refresh(): void;
}