import { ElementBuilder } from "../../app/builders/element";
import { CuiHandler } from "../../app/handlers/base";
import { CuiAnimationEngine } from "../../core/animation/engine";
import { CuiUtils, getIntOrDefault, getStringOrDefault, ICuiComponent, ICuiComponentHandler, ICuiParsable, is, isString, replacePrefix, sleep } from "../../core/index";
import { CuiHoverEvent, CuiHoverListener } from "../../core/listeners/hover";
import { CuiBasePositionCalculator } from "../../core/position/calculator";
import { ICuiPositionCalculator } from "../../core/position/interfaces";

export class CuiTooltipArgs implements ICuiParsable {
    content: string;
    width: number;
    pos: string;
    margin: number;
    constructor() {
        this.content = undefined;
        this.width = 150;
        this.margin = 8;
        this.pos = null;
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
    #tooltipDataCls: string
    constructor(element: HTMLElement, attribute: string, utils: CuiUtils, prefix: string) {
        super("CuiTooltipHandler", element, attribute, new CuiTooltipArgs(), utils);
        this.#tooltipDataCls = replacePrefix('{prefix}-tooltip-data', prefix);
        this.#hoverListener = new CuiHoverListener(element);
        this.#hoverListener.setCallback(this.onHover.bind(this));
        this.#margin = 8;
        this.#positionCalculator = new CuiBasePositionCalculator();
        this.#positionCalculator.setPreferred("top-center");

    }

    onInit(): void {
        this.#hoverListener.attach();
        this.#positionCalculator.setMargin(this.args.margin);
        this.#positionCalculator.setStatic(this.args.pos);
    }

    onUpdate(): void {

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

    createTooltip() {
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
                this.#tooltip.classList.add("cui-animation-tooltip-in");
            } catch (e) {
                this._log.exception(e);
            }

        })
    }

    removeTooltip() {
        if (!is(this.#tooltip)) {
            return;
        }
        this.#tooltip.remove();
        this.#tooltip = null;

    }
}