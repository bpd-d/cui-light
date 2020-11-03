import { ElementBuilder } from "../../app/builders/element";
import { CuiHandler } from "../../app/handlers/base";
import { CuiAnimationEngine } from "../../core/animation/engine";
import { CuiUtils, getIntOrDefault, getStringOrDefault, ICuiComponent, ICuiComponentHandler, ICuiParsable, is, isString, sleep } from "../../core/index";
import { CuiHoverEvent, CuiHoverListener } from "../../core/listeners/hover";

export class CuiTooltipArgs implements ICuiParsable {
    content: string;
    width: number;
    constructor() {
        this.content = undefined;
        this.width = 150;
    }

    parse(val: any): void {
        if (isString(val)) {
            this.content = getStringOrDefault(val, "");
            return;
        }
        this.content = getStringOrDefault(val.content, "");
        this.width = getIntOrDefault(val.width, 150);
    }
}

export class CuiTooltipComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string) {
        this.attribute = `${prefix ?? "cui"}-tooltip`;
    }
    getStyle(): string {
        return null;
    }

    get(element: HTMLElement, sutils: CuiUtils): ICuiComponentHandler {
        return new CuiTooltipHandler(element, this.attribute, sutils);
    }
}

export class CuiTooltipHandler extends CuiHandler<CuiTooltipArgs> {
    #hoverListener: CuiHoverListener;
    #tooltip: HTMLElement;
    #margin: number;
    constructor(element: HTMLElement, attribute: string, utils: CuiUtils) {
        super("CuiTooltipHandler", element, attribute, new CuiTooltipArgs(), utils);
        this.#hoverListener = new CuiHoverListener(element);
        this.#hoverListener.setCallback(this.onHover.bind(this));
        this.#margin = 8;

    }

    onInit(): void {
        this.#hoverListener.attach();
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
        this.#tooltip = new ElementBuilder("div").setClasses("cui-tooltip-data").build();
        this.#tooltip.textContent = this.args.content;
        this.#tooltip.style.maxWidth = `${this.args.width}px`;
        document.body.appendChild(this.#tooltip);
        this.mutate(() => {
            if (!this.#tooltip) {
                return;
            }
            const toolbox = this.#tooltip.getBoundingClientRect();
            let top = box.top - this.#margin - this.#tooltip.offsetHeight;
            this.#tooltip.style.top = `${top < 0 ? box.top + box.height + this.#margin : top}px`;
            this.#tooltip.style.left = `${this.calculateTooltipLeft(box.x, box.width, toolbox.width)}px`;
            this.#tooltip.classList.add("cui-animation-tooltip-in");
        })
    }

    removeTooltip() {
        if (!is(this.#tooltip)) {
            return;
        }
        this.#tooltip.remove();
        this.#tooltip = null;

    }

    private calculateTooltipLeft(elX: number, elWidth: number, tooltipWidth: number) {
        const boxCenter = (elX + elWidth / 2);
        const half = tooltipWidth / 2;
        const fromCenter = boxCenter - half;
        if (fromCenter > 0 && boxCenter + half < window.innerWidth) {
            return fromCenter;
        }
        // To left side of element
        const fromLeft = elX + tooltipWidth;
        if (fromLeft < window.innerWidth) {
            return elX;
        }

        // To right side of element
        return elX + elWidth - tooltipWidth;
    }
}