import { CuiUtils } from "./utils";

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
    clear(): void;
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

export interface CuiCachable {
    refresh(): boolean;
}

export interface ICui {
    getId(): string;
}

export interface ICuiCacheManager {
    put(key: string, element: CuiCachable): void;
    get(key: string): CuiCachable;
    has(key: string): boolean;
    remove(key: string): boolean;
    clear(): void;
}

export interface ICuiPlugin {
    description: string;
    setup: any;
    init(utils: CuiUtils): void;
    destroy(): void;
}

export interface ICuiMutiationPlugin {
    mutation(record: MutationRecord): Promise<boolean>;
}

export interface ICuiEventBus {
    on(name: string, callback: any, ctx: CuiContext): void;
    detach(name: string, ctx: CuiContext): void;
    detachAll(name: string): void;
    emit(event: string, ...args: any[]): Promise<boolean>;
    isSubscribing(name: string, ctx: CuiContext): boolean;
    clear(name: string): void;
}

export interface ICuiCallbackExecutor {
    execute(callback: any, ctx: any, args: any[]): Promise<void>;
}

export interface CuiEventObj {
    ctx: any;
    callback: any;
}

export interface CuiEventReceiver {
    [id: string]: CuiEventObj;
}

export interface ICuiEventEmitHandler {
    handle(receiver: CuiEventReceiver, args: any[]): Promise<void>;
}

export interface CuiContext {
    getCuid(): string;
}