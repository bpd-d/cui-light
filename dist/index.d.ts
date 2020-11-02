// Generated by dts-bundle v0.7.3

export const CUI_LIGHT_VERSION = "0.1.32";
global {
    interface Window {
        cuiInit: CuiInit;
    }
}

export class CuiInitializer {
    #private;
    constructor();
    init(setup: CuiInitData): Promise<CuiInitResult>;
}
export class CuiInit {
    #private;
    constructor();
    init(data: CuiInitData): Promise<boolean>;
}

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

export interface CuiTargetChangeEvent {
    top: number;
    left: number;
    target: Element;
    timestamp: number;
}
export interface CuiToggleEvent {
    action: ICuiComponentAction;
    target: Element;
    timestamp: number;
}
export interface CuiScrollByEvent {
    to: number;
    by: number;
    target: Element;
    parent: Element;
    timestamp: number;
}

interface CuiSetupCommon {
    prefix?: string;
    logLevel?: CuiLogLevel;
    cacheSize?: number;
    autoLightMode?: boolean;
    animationTime?: number;
    animationTimeShort?: number;
    animationTimeLong?: number;
    scrollThreshold?: number;
    resizeThreshold?: number;
}
export class CuiSetup implements CuiSetupCommon {
    prefix?: string;
    logLevel?: CuiLogLevel;
    cacheSize?: number;
    autoLightMode?: boolean;
    animationTime?: number;
    animationTimeShort?: number;
    animationTimeLong?: number;
    scrollThreshold: number;
    resizeThreshold: number;
    plugins: any;
    constructor();
    fromInit(init: CuiSetupInit): CuiSetup;
}
export class CuiSetupInit implements CuiSetupCommon {
    prefix?: string;
    app?: string;
    interaction?: CuiInteractionsType;
    logLevel?: CuiLogLevel;
    cacheSize?: number;
    autoLightMode?: boolean;
    animationTime?: number;
    animationTimeShort?: number;
    animationTimeLong?: number;
    scrollThreshold?: number;
    resizeThreshold?: number;
    busSetup?: ICuiEventBusQueueSetup[];
    root: HTMLElement;
    constructor();
}
export {};

export class CuiUtils {
    #private;
    interactions: IUIInteractionProvider;
    bus: ICuiEventBus;
    setup: CuiSetup;
    cache: ICuiManager<CuiCachable>;
    colors: CuiInstanceColorHandler;
    styleAppender: ICuiDocumentStyleAppender;
    constructor(initialSetup: CuiSetupInit);
    setLightMode(mode: CuiLightMode): void;
    getLightMode(): CuiLightMode;
    setPrintMode(flag: boolean): void;
    isPrintMode(): boolean;
    setProperty(name: string, value: string): void;
}

export class CuiColor {
    #private;
    constructor(red: number, green: number, blue: number, alpha?: number);
    static create(colorStr: string): CuiColor;
    set(red: number, green: number, blue: number, alpha?: number): void;
    setRed(red: number): void;
    setGreen(green: number): void;
    setBlue(blue: number): void;
    opacity(val: number): CuiColor;
    lighten(amount: number): CuiColor;
    darken(amount: number): CuiColor;
    invert(): CuiColor;
    getColorValue(type: string): number;
    toCssString(): string;
    clone(): CuiColor;
}
export interface CuiColorSet {
    base: CuiColor;
    muted?: CuiColor;
    active?: CuiColor;
}
export interface CuiColorTheme {
    base: string;
    muted: string;
    active: string;
}
export interface CuiColorPair {
    light: string;
    dark: string;
}
interface ColorParser {
    trim(): void;
    isValid(): boolean;
    parse(): CuiColor;
}
export class HexColorParser implements ColorParser {
    #private;
    constructor(colorStr: string);
    trim(): void;
    isValid(): boolean;
    parse(): CuiColor;
}
export class RgbColorParser implements ColorParser {
    #private;
    constructor(colorStr: string);
    trim(): void;
    isValid(): boolean;
    parse(): CuiColor;
}
export {};

export class CuiInstance {
    #private;
    constructor(setup: CuiSetupInit, plugins: ICuiPlugin[], components: ICuiComponent[]);
    init(): CuiInstance;
    finish(): void;
    get(selector: string): ElementManager;
    collection(selector: string): CollectionManager;
    toast(message: string): Promise<boolean>;
    select(selector: string): Element;
    all(selector: string): Element[];
    getUtils(): CuiUtils;
    on(event: string, callback: any, element?: CuiElement): void;
    detach(event: string, id: string): void;
    detachAll(event: string): void;
    emit(event: string, element: Element | string, ...args: any[]): void;
    alert(id: string, type: CuiAlertType, data: CuiAlertData): void;
    getPlugin(name: string): ICuiPlugin;
}

export interface AnimationDefinition {
    previous: DefinitionItem;
    current: DefinitionItem;
}
export interface DefinitionItem {
    left: AnimationProperty<PropsTypes>;
    right: AnimationProperty<PropsTypes>;
}
export interface CuiAnimationsDefinition {
    [id: string]: AnimationDefinition;
}
export const SWIPE_ANIMATIONS_DEFINITIONS: CuiAnimationsDefinition;

export interface ICuiComponentAction {
    add(element: Element, utils?: CuiUtils): void;
    remove(element: Element, utils?: CuiUtils): void;
    toggle(element: Element, utils?: CuiUtils): void;
}
export class CuiClassAction implements ICuiComponentAction {
    #private;
    constructor(className: string);
    add(element: Element, utils?: CuiUtils): void;
    remove(element: Element, utils?: CuiUtils): void;
    toggle(element: Element, utils?: CuiUtils): void;
}
export class CuiInboundAction implements ICuiComponentAction {
    #private;
    constructor(name: string);
    add(element: Element, utils?: CuiUtils): void;
    remove(element: Element, utils?: CuiUtils): void;
    toggle(element: Element, utils?: CuiUtils): void;
}
export class AttributeAction implements ICuiComponentAction {
    #private;
    constructor(attribute: string);
    add(element: Element, utils?: CuiUtils): void;
    remove(element: Element, utils?: CuiUtils): void;
    toggle(element: Element, utils?: CuiUtils): void;
}
export class DummyAction implements ICuiComponentAction {
    constructor();
    add(element: Element, utils?: CuiUtils): void;
    remove(element: Element, utils?: CuiUtils): void;
    toggle(element: Element, utils?: CuiUtils): void;
}
export class CuiActionsFatory {
    static get(value: string): ICuiComponentAction;
}
export class CuiActionsListFactory {
    static get(value: string): ICuiComponentAction[];
}

export interface CuiBusExtStatisticsItem {
    name: string;
    emits: number;
    queueNumber: number;
}
export interface CuiBusExtStatistics {
    queueCount: number;
    events: {
        [name: string]: CuiBusExtStatisticsItem;
    };
}
export interface ICuiEventBusQueueSetup {
    name: string;
    handler: "tasked" | string;
    eventsDef: string[];
    priority: number;
}

export type CuiLogLevel = "none" | "error" | "warning" | "debug";
export type CuiInteractionsType = 'sync' | 'async';
export type CuiColorSetType = 'light' | 'dark' | 'accent' | 'secondary' | 'success' | 'warning' | 'error';
export type CuiClearCacheType = 'element' | "collection" | "all";
export type CuiLightMode = 'light' | 'dark';
export type CuiWindowSize = 'small' | 'medium' | 'large' | 'xlarge';
export type CuiAlertType = "Info" | "OkCancel" | "YesNoCancel";

export interface ICuiDocumentStyleAppender {
    append(style: string): boolean;
}
export class CuiDocumentStyleAppender implements ICuiDocumentStyleAppender {
    #private;
    constructor(interactions: IUIInteractionProvider);
    append(style: string): boolean;
}

export class CuiInstanceColorHandler {
    #private;
    constructor(interactions: IUIInteractionProvider);
    setAppBackground(light: CuiColor, dark: CuiColor): void;
    setComponentBackground(light: CuiColor, dark: CuiColor): void;
    setBordersColors(light: CuiColor, dark: CuiColor): void;
    setColor(type: CuiColorSetType, set: CuiColorSet): void;
    setLightenFactor(factor: number): void;
    setDarkenFactor(factor: number): void;
    setProperty(propertyName: string, value: string): void;
    setPropertyIn(propertyName: string, value: string): void;
}

export class ElementManager implements CuiCachable {
    #private;
    constructor(elements: Element[], utils: CuiUtils);
    toggleClass(className: string): Promise<boolean>;
    toggleClassAs(className: string): Promise<boolean>;
    setClass(className: string): Promise<boolean>;
    setClassAs(className: string): Promise<boolean>;
    removeClass(className: string): Promise<boolean>;
    removeClassAs(className: string): Promise<boolean>;
    getAttribute(attributeName: string): string[];
    setAttribute(attributeName: string, attributeValue?: string): Promise<boolean>;
    setAttributeAs(attributeName: string, attributeValue?: string): Promise<boolean>;
    removeAttribute(attributeName: string): Promise<boolean>;
    removeAttributeAs(attributeName: string): Promise<boolean>;
    toggleAttribute(attributeName: string, attributeValue?: string): Promise<boolean>;
    toggleAttributeAs(attributeName: string, attributeValue?: string): Promise<boolean>;
    click(onClick: (ev: MouseEvent) => void): Promise<boolean>;
    event(eventName: string, callback: any): Promise<boolean>;
    call(callback: (element: Element, index: Number) => void, functionName?: string): Promise<boolean>;
    animate(className: string, timeout?: number): Promise<boolean>;
    open(openClass: string, animationClass: string, timeout?: number): Promise<boolean>;
    close(closeClass: string, animationClass: string, timeout?: number): Promise<boolean>;
    emit(event: string, ...args: any[]): void;
    on(event: string, callback: any): string[];
    detach(event: string, id: string): void;
    read(callback: any, ...args: any[]): void;
    change(callback: any, ...args: any[]): void;
    elements(): Element[];
    count(): number;
    lock(): void;
    unlock(): void;
    isLocked(): boolean;
    refresh(): boolean;
}

export class CollectionManager implements CuiCachable {
    #private;
    constructor(elements: Element[], interactions: IUIInteractionProvider);
    setToggle(className: string): void;
    setElements(elements: Element[]): void;
    click(callback: (element: Element, index: number) => void): void;
    next(): Promise<boolean>;
    previous(): Promise<boolean>;
    set(index: number): Promise<boolean>;
    setWithAnimation(index: number, animClassIn: string, animClassOut: string, duration: number): Promise<boolean>;
    getCurrentIndex(): number;
    length(): number;
    refresh(): boolean;
}

export type PropsTypes = AnimatorPropertyValue | TransformAnimatorProperty;
export class CuiAnimation {
        #private;
        constructor(element?: Element);
        setElement(element: Element): void;
        setTimeout(timeout: number): void;
        onError(callback: (e: Error) => void): void;
        onFinish(callback: OnAnimationFinishCallback): void;
        perform(props: AnimationProperty<PropsTypes>, timeout?: number, factor?: number): void;
}
export class CuiAnimationEngine {
        #private;
        constructor(cleanOnFinish?: boolean);
        onFinish(callback: OnAnimationFinishCallback): void;
        setAnimators(animators: ICuiPropertyAnimator<PropsTypes>[]): void;
        setElement(element: Element): void;
        setOnError(callback: (e: Error) => void): void;
        animate(timeout: number, progress?: number, revert?: boolean): void;
        isLocked(): boolean;
}
export class CuiSwipeAnimationEngine {
        #private;
        constructor(shouldCleanOnFinish?: boolean);
        setElement(element: Element): void;
        setOnFinish(callback: OnAnimationFinishCallback): void;
        setOnError(callback: (e: Error) => void): void;
        setProps(props: AnimationProperty<PropsTypes>): void;
        /**
            * Perform single update on animators
            * @param progress - progress value to be set to animators 0..1
            */
        update(progress: number): void;
        /**
            * Perform single update on animators in RAF
            * @param progress - progress value to be set to animators 0..1
            */
        updateAsync(progress: number): void;
        /**
            * Finish swipe animation using animation engine
            * @param progress - initial progress value 0..1
            * @param timeout - time for animation to perform
            * @param revert - whether animation should return back to 0 or progress to the end
            */
        finish(progress: number, timeout: number, revert: boolean): void;
}

export interface ICuiPropertyAnimator<T> {
    perform(element: any, progress: number, factor: number): void;
    setProperty(prop: T): void;
}
export interface AnimationProperty<T> {
    [id: string]: T;
}
export interface AnimatorPropertyValue {
    from: number;
    to: number;
    unit?: string;
}
export interface TransformAnimatorProperty {
    [name: string]: AnimatorPropertyValue;
}
export interface OnAnimationFinishCallback {
    (element: Element, reverted: boolean, error: boolean): void;
}

export class ErrorBase extends Error {
    constructor(name: string, message?: string);
}
export class ItemNotFoundError extends ErrorBase {
    constructor(message?: string);
}
export class ArgumentError extends ErrorBase {
    constructor(message?: string);
}
export class CuiBusError extends ErrorBase {
    constructor(message?: string);
}
export class CuiInstanceInitError extends ErrorBase {
    constructor(message?: string);
}
export class CuiScrollSpyOutOfRangeError extends ErrorBase {
    constructor(message?: string);
}
export class RegisterElementError extends ErrorBase {
    constructor(message?: string);
}
export class AnimatorError extends ErrorBase {
    constructor(message?: string);
}
export class CSSVariableError extends ErrorBase {
    constructor(message?: string);
}
export class CuiColorError extends ErrorBase {
    constructor(message?: string);
}

export class CuiDictionary<T> implements ICuiDictionary<T> {
    #private;
    constructor(init?: ICuiDictionaryItem<T>[]);
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

/**
    * Checks if value is defined an is not null
    * Additionally with type check it can check value if it is not empty string or collection or object
    *
    * @param val - value
    * @param typecheck - default true - additional check whether value is not empty (string, collection, object)
    * @returns whether value passed all conditions
    */
export function is(val: any, typecheck?: boolean): boolean;
/**
    * Checks if value is empty string, array or object
    *
    *
    * @param val - value
    * @returns whether value passed all conditions
    */
export function isEmpty(val: any): boolean;
export function getName(prefix: string, name: string): string;
export function sleep(timeout: number): Promise<boolean>;
/**
    * Creates proper html element from given string
    * @param htmlString - string containing html
    */
export function createElementFromString(htmlString: string): Element;
export function getMatchingAttribute(element: any, attributes: string[]): string;
export function getMatchingAttributes(element: any, attributes: string[]): string[];
export function getRangeValue(value: number, min: number, max: number): number;
export function getRangeValueOrDefault(value: number, min: number, max: number, def: number): number;
export function increaseValue(value: number, amount: number): number;
export function decreaseValue(value: number, amount: number): number;
export function clone(object: any): any;
export function getSingleColorRatio(first: number, second: number, max: number): number;
/**
    * Creates string containg css selector for array of attributes
    * @param attributes - attributes values
    */
export function joinAttributesForQuery(attributes: string[]): string;
/**
    * Checks light system light mode
    * @returns Light Mode - dark/light
    */
export function getSystemLightMode(): CuiLightMode;
/**
    * Check print mode in the browser window
    * @returns true if window is displayed in print mode
    */
export function getSystemPrintMode(): boolean;
/**
    * Verifies whether attributes exist and have some values
    * @param attributes attributes list
    */
export function are(...attributes: any[]): boolean;
export function calcWindowSize(width: number): CuiWindowSize;
/**
    * Creates object from string.
    * Supported syntaxes are:
    * - JSON
    * - single value
    * - key:value,value;key=value
    *
    * @param attribute - attribute value
    */
export function parseAttributeString(attribute: string): any;
/**
    * Creates object from JSON string
 * String must start with { and end with }
    *
    * @param attribute - attribute value
    * @returns object if string passes test, null otherwise
    */
export function parseJsonString(attribute: string): any | null;
/**
    * Creates object from JSON string
    * @param attribute - JSON string
    */
export function jsonify(attribute: string): any;
export function getOffsetTop(element: HTMLElement): number;
export function getOffsetLeft(element: HTMLElement): number;
export function getIntOrDefault(value: any, def: number): number;
export function getStyleValue(target: any, property: string): any;
export function prepLogString(message: string, component: string, functionName?: string): string;
export function isInRange(value: number, min: number, max: number): boolean;
export function getActiveClass(prefix: string): string;
export function parseAttribute(element: Element, attribute: string): any;
/**
    *  Checks whether string value contains synonym of true
    * @param value - string to check
    */
export function isStringTrue(value: string): boolean;
export function boolStringOrDefault(prop: any, def: boolean): boolean;
export function getStringOrDefault(value: any, def: string): any;
/**
    * Checks whether device supports touch
    */
export function isTouchSupported(): boolean;
/**
    * Checks whether value is type of string
    * @param {any} value - value to be checked
    */
export function isString(value: any): boolean;
/**
    * Replaces mask {prefix} with actual value in the string
    * @param {string} value - text containg a mask
    * @param {string} prefix - value to be put in place of mask
    */
export function replacePrefix(value: string, prefix: string): string;
/**
    * Generates identifier for Cui element
    *
    * @param element - Cui element selector
    * @returns generated identifier
    */
export function generateCUID(element?: string): string;
/**
    * Generates random string
    */
export function generateRandomString(): string;
/**
    * Generates random integer
    * @param min - min number
    * @param max - max number
    * @returns random integer
    */
export function getRandomInt(min: number, max: number): number;
/**
    * Registers Element as Cui element, initializes handlers, sets component style to document header and sets $cuid
    * @param {any} node - document node
    * @param {ICuiComponent[]} components -supported components array
    * @param {string[]} attributes - supported attributes array
    * @param {CuiUtils} utils - Cui Utils instance
    */
export function registerCuiElement(node: any, components: ICuiComponent[], attributes: string[], utils: CuiUtils): void;
export function counter(): Generator<number, void, unknown>;
export function getHandlerExtendingOrNull<T>(target: CuiElement, fName: string): T;
/**
    * Checks whether property exists on the object and it is a function
    * @param obj - object
    * @param fName - property name
    */
export function hasFunction(obj: any, fName: string): boolean;
/**
    * Gets closest parent element which is a cUI element
    * @param element
    */
export function getParentCuiElement(element: Element): Element;
/**
    * Calculates element height by calculating childerns heights
    * @param element
    */
export function getChildrenHeight(element: Element): number;
export function enumerateObject<T>(object: T, callback: (property: string, value: any) => void): void;
export function round(value: number, decimalPlaces: number): number;
export function calculateNextIndex(val: any, currentIndex: number, totalLength: number): number;
export function getFirstMatching<T>(array: T[], callback: (t: T, index: number) => boolean): T | undefined;
export function mapObject<T, V>(input: T, callback: (t: T) => V): V | undefined;
export function mapObjectArray<T, V>(input: T[], callback: (t: T) => V): V[];
/**
    * Delays callback execution by specific time. Callback cannot be called again until previous execution finishes or was cancelled
    * @param callback - callback to execute
    * @param delayTime - time in ms that execution shall be delayed by
    * @returns Cancel callback
    */
export function delay(callback: (...args: any[]) => void, delayTime: number): (...args: any[]) => () => void;

export class FastDom implements IUIInteractionProvider {
    #private;
    constructor();
    mutate(callback: any, ctx: any, ...args: any[]): void;
    fetch(callback: any, ctx: any, ...args: any[]): void;
}
export class SyncInteractions implements IUIInteractionProvider {
    tasks: any[];
    raf: any;
    isRunning: boolean;
    constructor();
    mutate(callback: any, ctx: any, ...args: any[]): void;
    fetch(callback: any, ctx: any, ...args: any[]): void;
}

export class CuiLogger implements ICuiLogger {
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
}

export const CUID_ATTRIBUTE = "cuid";
export const CLASSES: {
    dark: string;
    animProgress: string;
    print: string;
    active: string;
    swipingOn: string;
    selectionOff: string;
};
export const ICONS: any;
export const COLORS: string[];
export const CSS_APP_BACKGROUND_COLORS: CuiColorPair;
export const CSS_COMPONENT_BACKGROUND_COLORS: CuiColorPair;
export const CSS_COMPONENT_BORDER_COLORS: CuiColorPair;
export const CSS_THEMES: {
    light: {
        base: string;
        muted: string;
        active: string;
    };
    dark: {
        base: string;
        muted: string;
        active: string;
    };
    accent: {
        base: string;
        muted: string;
        active: string;
    };
    secondary: {
        base: string;
        muted: string;
        active: string;
    };
    success: {
        base: string;
        muted: string;
        active: string;
    };
    warning: {
        base: string;
        muted: string;
        active: string;
    };
    error: {
        base: string;
        muted: string;
        active: string;
    };
};
export const SCOPE_SELECTOR = ":scope ";
export const CSS_VARIABLES: any;
export class STATICS {
    static logLevel: CuiLogLevel;
    static prefix: string;
}
export const EVENTS: {
    INSTANCE_INITIALIZED: string;
    INSTANCE_FINISHED: string;
    RESIZE: string;
    OPEN: string;
    OPENED: string;
    CLOSE: string;
    CLOSED: string;
    TOGGLE: string;
    TOGGLED: string;
    SWITCH: string;
    SWITCHED: string;
    ON_SCROLL: string;
    TARGET_CHANGE: string;
    INTERSECTION: string;
    KEYDOWN: string;
    SCROLLBY: string;
    WINDOW_CLICK: string;
    OFFSET: string;
    PROGRESS_CHANGE: string;
    PROGRESS_CHANGED: string;
    CHANGE: string;
    CHANGED: string;
    GLOBAL_MOVE: string;
    MOVE_LOCK: string;
    PAUSE: string;
    PAUSED: string;
    SORTED: string;
    SORT_START: string;
};
export const OBSERVABLE_SCROLL = "SCROLL";
export const OBSERVABLE_INTERSECTION = "INTERSECTION";
export const COMPONENTS_COUNTER: Generator<number, void, unknown>;

/**
    *
    */
export class CuiLoggerFactory {
        /**
            * Gets new instance of component focused logger
            * @param name - component name
            */
        static get(name: string, logLevel?: CuiLogLevel): ICuiLogger;
}

export class CuiInteractionsFactory {
    /**
      * Gets new instance of component focused logger
      * @param type - Interactions type
      */
    static get(type: CuiInteractionsType): IUIInteractionProvider;
}

export class CuiActionsHelper {
    #private;
    constructor(interactions: IUIInteractionProvider);
    performAction(target: Element, action: ICuiComponentAction, timeout: number, callback?: () => void): Promise<boolean>;
    performActions(target: Element, actions: ICuiComponentAction[], timeout: number, callback?: () => void): Promise<boolean>;
    performSwitchAction(inTarget: Element, outTarget: Element, inAction: ICuiComponentAction, outAction: ICuiComponentAction, onFinish: () => void, timeout: number): Promise<boolean>;
}

export class CuiCallbackExecutor implements ICuiCallbackExecutor {
    execute(callback: any, args: any[]): Promise<void>;
}

interface EmitHandlerData {
    events: CuiEventReceiver;
    cuid: string;
    args: any[];
}
class EmitHandlerBase {
    isBusy: boolean;
    queue: EmitHandlerData[];
    constructor();
    idMatches(emitId: string, handleId: string): boolean;
}
export class SimpleEventEmitHandler extends EmitHandlerBase implements ICuiEventEmitHandler {
    #private;
    constructor(executor: ICuiCallbackExecutor);
    handle(events: CuiEventReceiver, cuid: string, args: any[]): Promise<void>;
}
export class TaskedEventEmitHandler extends EmitHandlerBase implements ICuiEventEmitHandler {
    #private;
    constructor(executor: ICuiCallbackExecutor);
    handle(events: CuiEventReceiver, cuid: string, args: any[]): Promise<void>;
}
export class CuiEventEmitHandlerFactory {
    static get(name: string, executor: ICuiCallbackExecutor): ICuiEventEmitHandler;
}
export {};

export class CuiEventBus implements ICuiEventBus {
        #private;
        constructor(emitHandler: ICuiEventEmitHandler, name?: string);
        /**
            * Attaches event to event bus
            *
            * @param {string} name - Event name
            * @param {any} callback - callback function
            * @param {CuiContext} ctx - callback context with id
            * @param {CuiElement} cui - optional - cui element which event shall be attached to
            */
        on(name: string, callback: any, cui?: CuiElement): string;
        /**
         * Detaches specific event from event bus
         *
         * @param {string} name - Event name
         * @param {CuiContext} ctx - callback context with id
         * @param {CuiElement} cui - optional - cui element which event shall be attached to
         */
        detach(name: string, id: string): void;
        /**
         * Detaches all callbacks from event
         *
         * @param {string} name - Event name
         */
        detachAll(name: string): void;
        /**
         * Emits event call to event bus
         *
         * @param {string} name - Event name
         * @param {string} cuid - id of component which emits the event
         * @param {any[]} args  - event arguments
         */
        emit(event: string, cuid: string, ...args: any[]): Promise<boolean>;
        /**
         * Checks whether given context is already attached to specific event
         *
         * @param {string} name - Event name
         * @param {CuiContext} ctx - callback context with id
         * @param {CuiElement} cui - optional - cui element which event shall be attached to
         */
        isSubscribing(name: string, id: string, cui?: CuiElement): boolean;
        /**
            * Detaches callbacks by component cuid - this is used to clean up attachments on component deletion
            * @param {string} event - event name
            * @param {string} cuid - cuid of the component
            */
        detachByCuid(event: string, cuid: string): void;
}
export class CuiEventExtBus implements ICuiEventBus {
        #private;
        constructor(setup: ICuiEventBusQueueSetup[]);
        /**
            * Attaches event to event bus
            *
            * @param {string} name - Event name
            * @param {any} callback - callback function
            * @param {CuiContext} ctx - callback context with id
            * @param {CuiElement} cui - optional - cui element which event shall be attached to
            */
        on(name: string, callback: any, cui?: CuiElement): string;
        /**
         * Detaches specific event from event bus
         *
         * @param {string} name - Event name
         * @param {CuiContext} ctx - callback context with id
         * @param {CuiElement} cui - optional - cui element which event shall be attached to
         */
        detach(name: string, id: string, cui?: CuiElement): void;
        /**
         * Detaches all callbacks from event
         *
         * @param {string} name - Event name
         */
        detachAll(name: string): void;
        /**
         * Emits event call to event bus
         *
         * @param {string} name - Event name
         * @param {string} cuid - id of component which emits the event
         * @param {any[]} args  - event arguments
         */
        emit(event: string, cuid: string, ...args: any[]): Promise<boolean>;
        /**
         * Checks whether given context is already attached to specific event
         *
         * @param {string} name - Event name
         * @param {CuiContext} ctx - callback context with id
         * @param {CuiElement} cui - optional - cui element which event shall be attached to
         */
        isSubscribing(name: string, id: string, cui?: CuiElement): boolean;
        /**
         * Detaches callbacks by component cuid - this is used to clean up attachments on component deletion
         * @param {string} event - event name
         * @param {string} cuid - cuid of the component
         */
        detachByCuid(event: string, cuid: string): void;
}
export class CuiEventBusFactory {
        static get(setup: ICuiEventBusQueueSetup[]): ICuiEventBus;
}
export class CuiBusExtStatisticsHandler {
        #private;
        constructor(gather: boolean, queueCount: number);
        addEvent(event: string, queueNumber: number, emitCount?: number): void;
        addQueue(): void;
        addEmit(event: string, queueNumber?: number): void;
        getStatistics(): CuiBusExtStatistics;
}

export class CuiKeyPressListener implements ICuiEventListener<KeyboardEvent> {
    #private;
    constructor(singleEmit: boolean, keys?: string[]);
    setCallback(callback: (t: KeyboardEvent) => void): void;
    isInProgress(): boolean;
    attach(): void;
    detach(): void;
    isAttached(): boolean;
    onKeyDown(ev: KeyboardEvent): void;
    onKeyUp(ev: KeyboardEvent): void;
}

export class CuiMediaQueryListener implements ICuiEventListener<MediaQueryListEvent> {
    #private;
    constructor(mediaQuery: string);
    setCallback(callback: (t: MediaQueryListEvent) => void): void;
    isInProgress(): boolean;
    attach(): void;
    detach(): void;
    isAttached(): boolean;
}

export interface CuiScrollEvent {
    base: Event;
    top: number;
    left: number;
}
export class CuiScrollListener implements ICuiEventListener<CuiScrollEvent> {
    #private;
    constructor(target: Element, threshold?: number);
    setCallback(callback: (ev: CuiScrollEvent) => void): void;
    attach(): void;
    detach(): void;
    isInProgress(): boolean;
    isAttached(): boolean;
    getTop(): number;
    getLeft(): number;
}

