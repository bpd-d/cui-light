import { CuiUtils } from "./utils";
import { CuiSetupInit } from "./setup";
import { CuiAnimationsDefinition } from "../../app/animation/definitions";

export interface ICuiLogger {
    debug(message: string, functionName?: string): void;
    error(message: string, functionName?: string): void;
    warning(message: string, functionName?: string): void;
    exception(e: Error, functionName?: string): void;
    performance(callback: any, functionName?: string): void;
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

export interface ICuiComponentHandler {
    handle(args: any): void;
    refresh(args: any): void;
    destroy(): void;
}

export interface ICuiOpenable {
    open(args?: any): Promise<boolean>;
}

export interface ICuiSwitchable {
    switch(index: number): Promise<boolean>;
}

export interface ICuiClosable {
    close(args?: any): Promise<boolean>;
}

export interface CuiCachable {
    refresh(): boolean;
}

export interface ICuiParsable {
    parse(val: any): void;
}

export interface ICui {
    getId(): string;
}

export interface ICuiManager<T> {
    put(key: string, element: T): void;
    get(key: string): T;
    has(key: string): boolean;
    remove(key: string): boolean;
    clear(): void;
}

export interface ICuiPlugin {
    description: string;
    name: string;
    setup: any;
    init(utils: CuiUtils): void;
    destroy(): void;
}

export interface ICuiMutiationPlugin {
    mutation(record: MutationRecord): Promise<boolean>;
}

export interface ICuiEventBus {
    on(name: string, callback: any, cui?: CuiElement): string;
    //detach(name: string, ctx: CuiContext, cui?: CuiElement): void;
    detach(name: string, id: string, cui?: CuiElement): void;
    detachAll(name: string, cui?: CuiElement): void;
    emit(event: string, cuid: string, ...args: any[]): Promise<boolean>;
    isSubscribing(name: string, id: string, cui?: CuiElement): boolean;
    detachByCuid(event: string, cuid: string): void;
}

export interface ICuiCallbackExecutor {
    execute(callback: any, args: any[]): Promise<void>;
}

export interface CuiEventObj {
    callback: any;
    $cuid: string;
}

export interface CuiEventReceiver {
    [id: string]: CuiEventObj;
}

export interface ICuiEventEmitHandler {
    handle(receiver: CuiEventReceiver, cuid: string, args: any[]): Promise<void>;
}

export interface CuiContext {
    getId(): string;
}

export interface CuiInitData {
    plugins?: ICuiPlugin[];
    components?: ICuiComponent[];
    setup?: CuiSetupInit;
    icons?: any;
    swipeAnimations?: CuiAnimationsDefinition;
}

export interface CuiInitResult {
    result: boolean;
    message?: string;
}

export interface ICuiComponentFactory {
    get(element: Element, sutils: CuiUtils): ICuiComponentHandler;
}

export interface ICuiComponent {
    attribute: string;
    getStyle(): string;
    get(element: HTMLElement, sutils: CuiUtils): ICuiComponentHandler;
}

export interface ICuiPluginManager {
    init(utils: CuiUtils): void;
    get(name: string): ICuiPlugin;
    onMutation(mutation: MutationRecord): Promise<boolean>;
}
export interface ICuiObservableArg {

}
export interface ICuiObservable {
    key: string;
    on(arg: ICuiObservableArg): Promise<boolean>;
}

export interface CuiObservables {
    [key: string]: ICuiObservable;
}

export interface CuiHandlers {
    [id: string]: ICuiComponentHandler;
}


export interface CuiElement {
    $cuid: string;
    $handlers?: CuiHandlers;
}

export interface ICuiObserver {
    observe(target: Element): void;
    unobserve(target: Element): void;
    connect(): void;
    disconnect(): void;
}

export interface ICuiEventListener<T> {
    setCallback(callback: (t: T) => void): void;
    isInProgress(): boolean;
    attach(): void;
    detach(): void;
    isAttached(): boolean;
}

export interface CuiAlertData {
    title: string;
    message: string;
    reverse?: boolean;
    onCancel?: () => void;
    onOk?: () => void;
    onYes?: () => void;
    onNo?: () => void;
}

export interface ICuiDevelopmentTool {
    registerElement(element: HTMLElement, cuid: string, component: string): void;
    unregisterElement(cuid: string, component: string): void;
    setProperty<T>(cuid: string, component: string, name: string, t: T): void;
    pushState(cuid: string, component: string, type: CuiDevelopmentStateType, message: string, functionName?: string): void;
}

export interface ICuiDevelopmentToolApi {
    getProperty<T>(cuid: string, component: string, name: string): T;
    getElement<T>(cuid: string): CuiDevelopmentElement<T>;
}

export interface CuiDevelopmentElement<T> {
    element: HTMLElement;
    cuid: string;
    components: CuiDevelopmentComponents<T>
    properties: CuiDevelopmentProperties<T>;
}

export interface CuiDevelopmentProperties<T> {
    [name: string]: T;
}

export interface CuiDevelopmentComponents<T> {
    [name: string]: CuiDevelopmentComponent<T>
}

export interface CuiDevelopmentComponent<T> {
    name: string;
    registerDt: number;
    properties: CuiDevelopmentProperties<T>;
    state: CuiDevelopmentState[];
}

export interface CuiDevelopmentState {
    message: string;
    function: string;
    timestamp: number;
    type: CuiDevelopmentStateType;
}

export type CuiDevelopmentStateType = "info" | "error" | "warning";