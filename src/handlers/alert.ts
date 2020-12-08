import { ElementManager } from "../managers/element";
import { DialogBuilder } from "../builders/dialog";
import { ElementBuilder } from "cui-light-core/dist/esm/builders/element";
import { CuiAlertData, CuiContext } from "cui-light-core/dist/esm/models/interfaces";
import { CuiUtils } from "cui-light-core/dist/esm/models/utils";
import { is } from "cui-light-core/dist/esm/utils/functions";
import { CuiAlertType } from "cui-light-core/dist/esm/utils/types";

export interface ICuiAlertHandler {
    show(root: Element): void;
}

interface AlertCallbacks {
    [name: string]: (() => void) | undefined;
}

abstract class CuiAlertHandlerBase implements ICuiAlertHandler, CuiContext {
    #callbacks: AlertCallbacks;
    #utils: CuiUtils;
    #id: string;
    #manager: ElementManager | undefined;
    closeStr: string;
    iconStr: string;
    content: string;
    title: string;
    prefix: string;
    reverse: boolean;
    #attid: string | null;
    constructor(setup: CuiUtils, id: string, data: CuiAlertData) {
        this.#callbacks = {
            "yes": data.onYes,
            "no": data.onNo,
            "cancel": data.onCancel,
            "ok": data.onOk
        }
        this.content = data.message;
        this.title = data.title;
        this.prefix = setup.setup.prefix;
        this.#utils = setup;
        this.#id = id;
        this.reverse = false;
        this.#attid = null;
        this.closeStr = `${this.#utils.setup.prefix}-close`;
        this.iconStr = `${this.#utils.setup.prefix}-icon`;
        this.#manager = undefined;
    }

    getId(): string {
        return this.#id;
    }

    show(root: Element): void {
        let element = document.getElementById(this.#id);
        if (!is(element)) {
            element = this.createElement();
            root.appendChild(element);
        } else {
            // @ts-ignore - already checked
            this.updateElement(element);
        }
        setTimeout(() => {
            // @ts-ignore - already checked
            this.#manager = new ElementManager([element], this.#utils);
            let ids = this.#manager.on('closed', this.onClose.bind(this));
            this.#attid = ids.length > 0 ? ids[0] : null;
            this.#manager.emit("open");
        }, 100);
    }

    updateElement(element: HTMLElement) {
        let title = element.querySelector(`.${this.prefix}-dialog-title`);
        let content = element.querySelector(`.${this.prefix}-dialog-body>p`);
        this.#utils.interactions.mutate(() => {
            if (title) {
                title.innerHTML = this.title;
            }
            if (content) {
                content.innerHTML = this.content;
            }
        }, null)
    }

    onClose(arg: any) {
        try {
            if (is(arg) && arg.state && this.#callbacks) {
                if (is(this.#callbacks[arg.state])) {
                    let callback = this.#callbacks[arg.state];
                    if (callback) {
                        callback();
                    }
                }
            }
        } finally {
            if (this.#attid != null) {
                if (this.#manager)
                    this.#manager.detach('closed', this.#attid);
                this.#attid = null;
            }

            this.#manager = undefined;
        }
    }

    abstract createElement(): HTMLElement;


}

export class CuiAlertHandler extends CuiAlertHandlerBase {
    #id: string;
    constructor(setup: CuiUtils, id: string, data: CuiAlertData) {
        super(setup, id, data);
        this.#id = id;
        this.reverse = data.reverse ?? false;
    }

    createElement() {
        let dialogBuilder = new DialogBuilder(this.prefix, this.reverse);

        dialogBuilder.createHeader(this.title, [], [
            new ElementBuilder('a').setClasses(`${this.prefix}-icon`).setAttributes({
                [this.closeStr]: "state: cancel",
                [this.iconStr]: "close"
            }).build()
        ]);
        dialogBuilder.createBody([], [
            new ElementBuilder('p').build(this.content)
        ]);
        dialogBuilder.createFooter([`${this.prefix}-flex`, `${this.prefix}-right`], [
            new ElementBuilder('button').setClasses(`${this.prefix}-button`, `${this.prefix}-margin-small-right`).setAttributes({ [this.closeStr]: "state: cancel" }).build("Cancel"),
            new ElementBuilder('button').setClasses(`${this.prefix}-button`, `${this.prefix}-accent`).setAttributes({ [this.closeStr]: "state: ok" }).build("Ok")
        ])
        return dialogBuilder.build(this.#id);
    }
}

export class CuiInfoAlertUpHandler extends CuiAlertHandlerBase {
    #id: string;
    constructor(setup: CuiUtils, id: string, data: CuiAlertData) {
        super(setup, id, data);
        this.#id = id;
        this.content = data.message;;
        this.title = data.title;
        this.prefix = setup.setup.prefix;
        this.reverse = data.reverse ?? false;

    }

    createElement() {
        let dialogBuilder = new DialogBuilder(this.prefix, this.reverse);
        dialogBuilder.createHeader(this.title, []);
        dialogBuilder.createBody([], [
            new ElementBuilder('p').build(this.content)
        ]);
        dialogBuilder.createFooter([`${this.prefix}-flex`, `${this.prefix}-right`], [
            new ElementBuilder('button').setClasses(`${this.prefix}-button`, `${this.prefix}-accent`).setAttributes({ [this.closeStr]: "state: ok" }).build("Ok")
        ])

        return dialogBuilder.build(this.#id);
    }
}

export class CuiYesNoPopUpHandler extends CuiAlertHandlerBase {
    #id: string;
    constructor(setup: CuiUtils, id: string, data: CuiAlertData) {
        super(setup, id, data);
        this.#id = id;
        this.content = data.message;
        this.title = data.title;
        this.prefix = setup.setup.prefix;
        this.reverse = data.reverse ?? false;
    }

    createElement() {
        let dialogBuilder = new DialogBuilder(this.prefix, this.reverse);

        dialogBuilder.createHeader(this.title, [], [
            new ElementBuilder('a').setClasses(`${this.prefix}-icon`).setAttributes({
                [this.closeStr]: "state: cancel",
                [this.iconStr]: "close"
            }).build()
        ]);
        dialogBuilder.createBody([], [
            new ElementBuilder('p').build(this.content)
        ]);
        dialogBuilder.createFooter([`${this.prefix}-flex`, `${this.prefix}-right`], [
            new ElementBuilder('button').setClasses(`${this.prefix}-button`, `${this.prefix}-margin-small-right`).setAttributes({ [this.closeStr]: "state: no" }).build("No"),
            new ElementBuilder('button').setClasses(`${this.prefix}-button`, `${this.prefix}-accent`).setAttributes({ [this.closeStr]: "state: yes" }).build("Yes")
        ])
        return dialogBuilder.build(this.#id);
    }
}

export class CuiAlertFactory {
    static get(id: string, type: CuiAlertType, data: CuiAlertData, utils: CuiUtils): ICuiAlertHandler | undefined {
        if (type === "Info") {
            return new CuiInfoAlertUpHandler(utils, id, data);
        } else if (type === 'YesNoCancel') {
            return new CuiYesNoPopUpHandler(utils, id, data);
        } else if (type === 'OkCancel') {
            return new CuiAlertHandler(utils, id, data);
        }
        return undefined;
    }
}


