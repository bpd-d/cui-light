import { ICuiLogger, IUIInteractionProvider, CuiElement, CuiContext, ICuiComponentHandler, ICuiParsable } from "../../core/models/interfaces";
import { CuiLoggerFactory } from "../../core/factories/logger";
import { CuiUtils } from "../../core/models/utils";
import { getActiveClass, CuiActionsHelper, ICuiComponentAction } from "../../core/index";

export class CuiHandlerBase implements CuiContext {
    _log: ICuiLogger;
    utils: CuiUtils;
    element: Element;
    cuid: string;
    isLocked: boolean;
    constructor(componentName: string, element: Element, utils: CuiUtils) {
        this._log = CuiLoggerFactory.get(componentName);
        this.utils = utils;
        this.element = element;
        this.cuid = (<any>element).$cuid;
        this.isLocked = false;
        this._log.setId(this.cuid);
    }


    mutate(callback: any, ...args: any[]): void {
        this.utils.interactions.mutate(callback, this, ...args)
    }

    fetch(callback: any, ...args: any[]): void {
        this.utils.interactions.fetch(callback, this, ...args)
    }

    getEventName(name: string) {
        return [name, this.cuid].join('-');
    }

    emitEvent(event: string, ...data: any[]) {
        this.utils.bus.emit(event, this.cuid, ...data)
    }

    onEvent(event: string, callback: any) {
        this.utils.bus.on(event, callback, this, this.element as any)
    }

    detachEvent(event: string) {
        this.utils.bus.detach(event, this)
    }

    getId(): string {
        return this.cuid;
    }

    checkLockAndWarn(fName?: string): boolean {
        if (this.isLocked) {
            this._log.warning("Component is locked", fName)
            return true
        }
        return false;
    }
}

export abstract class CuiHandler<T extends ICuiParsable> extends CuiHandlerBase implements ICuiComponentHandler {
    args: T;
    prevArgs: T;
    isInitialized: boolean;
    activeClassName: string;
    actionsHelper: CuiActionsHelper;
    constructor(componentName: string, element: Element, args: T, utils: CuiUtils) {
        super(componentName, element, utils);
        this.args = args;
        this.activeClassName = getActiveClass(utils.setup.prefix);
        this.actionsHelper = new CuiActionsHelper(utils.interactions)
        this.prevArgs = null;
        this.isInitialized = false;
    }

    isActive(): boolean {
        return this.element.classList.contains(this.activeClassName);
    }


    async performAction(action: ICuiComponentAction, timeout: number, onFinish: () => void, callback?: () => void): Promise<boolean> {
        if (await this.actionsHelper.performAction(this.element, action, timeout, callback)) {
            onFinish();
            return true;
        }
        return false;
    }

    handle(args: any): void {
        this._log.debug("Init", 'handle');
        if (this.isInitialized) {
            this._log.warning("Trying to initialize component again", 'handle');
            return;
        }
        this.args.parse(args);
        this.onInit();
        this.isInitialized = true;
    }

    refresh(args: any): void {
        this._log.debug("Update", 'refresh')
        if (!this.isInitialized) {
            this._log.error("Cannot update not initialized componentn", 'refresh');
            return;
        }
        this.prevArgs = { ...this.args };
        this.args.parse(args);
        this.onUpdate();
    }

    destroy(): void {
        this._log.debug("Destroy", "destroy");
        this.onDestroy();
        this.isInitialized = false;
    }

    abstract onInit(): void;
    abstract onUpdate(): void;
    abstract onDestroy(): void;

}