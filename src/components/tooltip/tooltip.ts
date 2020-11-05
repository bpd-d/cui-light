import { ElementBuilder } from "../../app/builders/element";
import { CuiHandler } from "../../app/handlers/base";
import { CuiAnimationEngine } from "../../core/animation/engine";
import { CuiActionsListFactory, CuiUtils, getIntOrDefault, getStringOrDefault, ICuiComponent, ICuiComponentAction, ICuiComponentHandler, ICuiParsable, is, isString, replacePrefix, sleep } from "../../core/index";
import { CuiHoverEvent, CuiHoverListener } from "../../core/listeners/hover";
import { CuiBasePositionCalculator } from "../../core/position/calculator";
import { ICuiPositionCalculator } from "../../core/position/interfaces";
import { CuiTaskRunner, ICuiTask } from "../../core/utils/task";

const TOOLTIP_ACTION = ".{prefix}-animation-tooltip-in";
const TOOLTIP_DATA = "{prefix}-tooltip-data";

export class CuiTooltipArgs implements ICuiParsable {
    content: string;
    width: number;
    pos: string;
    margin: number;
    action: string;
    timeout: number;
    #defAct: string;
    constructor(prefix: string) {
        this.#defAct = replacePrefix(TOOLTIP_ACTION, prefix)
        this.content = undefined;
        this.width = 150;
        this.margin = 8;
        this.timeout = 3000;
        this.pos = null;
        this.action = this.#defAct;
    }

    parse(val: any): void {
        if (isString(val)) {
            this.content = getStringOrDefault(val, "");
            return;
        }
        this.content = getStringOrDefault(val.content, "");
        this.width = getIntOrDefault(val.width, 150);
        this.margin = getIntOrDefault(val.margin, 8);
        this.pos = getStringOrDefault(val.pos, null);
        this.action = getStringOrDefault(val.action, this.#defAct);
        this.timeout = getIntOrDefault(val.timeout, 3000);
    }
}

export class CuiTooltipComponent implements ICuiComponent {
    attribute: string;
    #prefix: string;

    constructor(prefix?: string) {
        this.#prefix = prefix ?? 'cui';
        this.attribute = `${this.#prefix}-tooltip`;
    }


    getStyle(): string {
        return null;
    }

    get(element: HTMLElement, sutils: CuiUtils): ICuiComponentHandler {
        return new CuiTooltipHandler(element, this.attribute, sutils, this.#prefix);
    }
}

export class CuiTooltipHandler extends CuiHandler<CuiTooltipArgs> {
    #hoverListener: CuiHoverListener;
    #tooltip: HTMLElement;
    #margin: number;
    #positionCalculator: ICuiPositionCalculator;
    #tooltipDataCls: string;
    #actions: ICuiComponentAction[];
    #task: ICuiTask;
    constructor(element: HTMLElement, attribute: string, utils: CuiUtils, prefix: string) {
        super("CuiTooltipHandler", element, attribute, new CuiTooltipArgs(prefix), utils);
        this.#tooltipDataCls = replacePrefix(TOOLTIP_DATA, prefix);
        this.#hoverListener = new CuiHoverListener(element);
        this.#hoverListener.setCallback(this.onHover.bind(this));
        this.#margin = 8;
        this.#positionCalculator = new CuiBasePositionCalculator();
        this.#positionCalculator.setPreferred("top-center");
    }

    onInit(): void {
        this.#hoverListener.attach();
        this.getDataFromArgs();
        this.#task = new CuiTaskRunner(this.args.timeout, false, this.removeTooltip.bind(this));
    }

    onUpdate(): void {
        this.getDataFromArgs();
        this.#task.setTimeout(this.args.timeout);
    }

    onDestroy(): void {
        this.#hoverListener.detach();
    }

    onHover(ev: CuiHoverEvent) {
        if (ev.isHovering) {
            this.createTooltip();
        } else {
            this.removeTooltip();
        }
    }

    private createTooltip() {
        if (is(this.#tooltip) || !is(this.args.content)) {
            return;
        }
        const box = this.element.getBoundingClientRect();
        this.#tooltip = new ElementBuilder("div").setClasses(this.#tooltipDataCls).build();
        this.#tooltip.textContent = this.args.content;
        this.#tooltip.style.maxWidth = `${this.args.width}px`;
        document.body.appendChild(this.#tooltip);
        this.mutate(() => {
            if (!this.#tooltip) {
                return;
            }
            const toolbox = this.#tooltip.getBoundingClientRect();
            this.#positionCalculator.setMargin(this.#margin);
            try {
                let [x, y] = this.#positionCalculator.calculate(box, toolbox.width, toolbox.height);
                this.#tooltip.style.top = `${y}px`;
                this.#tooltip.style.left = `${x}px`;
                this.toggleActions();
                this.#task.start();
            } catch (e) {
                this._log.exception(e);
            }

        })
    }

    private removeTooltip() {
        if (!is(this.#tooltip)) {
            return;
        }
        this.#task.stop();
        this.mutate(() => {
            this.#tooltip.remove();
            this.#tooltip = null;
        })
    }

    private getDataFromArgs() {
        this.#positionCalculator.setMargin(this.args.margin);
        this.#positionCalculator.setStatic(this.args.pos);
        this.#actions = CuiActionsListFactory.get(this.args.action);
    }

    private toggleActions() {
        this.#actions.forEach(action => {
            action.toggle(this.#tooltip);
        })
    }
}