import { are, ICui, ICuiComponentAction, is } from "../../core/index";
import { CuiIntersectionResultItem } from "../../core/intersection/interfaces";

export interface CuiScrollspyUpdateResult {
    intersecting?: HTMLElement[];
    changed: boolean;
}

export interface ICuiScrollspyModeHandler {
    update(items: CuiIntersectionResultItem[], ratio: number, actions: ICuiComponentAction[], links: HTMLElement[], linksActions: ICuiComponentAction[]): CuiScrollspyUpdateResult;
}

export class CuiScrollSpyModeHandlerFactory {
    static get(mode: string) {
        if (mode === "multi") {
            return new CuiMultiModeHandler();
        }
        return new CuiSingleModeHandler();
    }
}

abstract class CuiModeHandlerBase<T> {
    previous: T;

    getMatching(ratio: number, items: CuiIntersectionResultItem[]): number[] {
        return items.reduce((result: number[], item: CuiIntersectionResultItem, index: number) => {
            if (item.verticalRatio > ratio) {
                result.push(index);
            }
            return result;
        }, [])
    }

    addActions(actions: ICuiComponentAction[], ...elements: HTMLElement[]) {
        this.forEachAction(actions, elements, (action, element) => {
            action.add(element);
        })
    }

    removeActions(actions: ICuiComponentAction[], ...elements: HTMLElement[]) {
        this.forEachAction(actions, elements, (action, element) => {
            action.remove(element);
        })
    }

    private forEachAction(actions: ICuiComponentAction[], elements: HTMLElement[], callback: (action: ICuiComponentAction, element: HTMLElement) => void): void {
        if (!are(actions, elements, callback)) {
            return;
        }
        actions.forEach(action => {
            elements.forEach(element => {
                if (is(element))
                    callback(action, element);
            })
        })
    }

    abstract matches(item: T): boolean;

}

export class CuiSingleModeHandler extends CuiModeHandlerBase<number> implements ICuiScrollspyModeHandler {

    constructor() {
        super();
        this.previous = -1;
    }

    update(items: CuiIntersectionResultItem[], ratio: number, actions: ICuiComponentAction[], links: HTMLElement[], linksActions: ICuiComponentAction[]): CuiScrollspyUpdateResult {
        let matching = this.getMatching(ratio, items);
        let len = matching.length;
        let last = len > 0 ? matching[len - 1] : -1;
        let result: CuiScrollspyUpdateResult = {
            changed: false
        }
        if (!this.matches(last)) {
            if (this.previous > -1)
                this.removeActions(actions, items[this.previous].element);
            if (last > -1) {
                let lastElement = items[last].element;
                result.intersecting = [lastElement]
                this.addActions(actions, lastElement)
            }
            if (are(links, linksActions)) {
                if (this.previous > -1)
                    this.removeActions(linksActions, links[this.previous]);
                if (last > -1)
                    this.addActions(linksActions, links[last])
            }
            this.previous = last;
            result.changed = true;
            result.intersecting = []
            return result;
        }
        return result;
    }

    matches(item: number): boolean {
        return item === this.previous;
    }
}

export class CuiMultiModeHandler extends CuiModeHandlerBase<number[]> implements ICuiScrollspyModeHandler {
    constructor() {
        super();
        this.previous = [];
    }
    update(items: CuiIntersectionResultItem[], ratio: number, actions: ICuiComponentAction[], links: HTMLElement[], linksActions: ICuiComponentAction[]): CuiScrollspyUpdateResult {
        let matching = this.getMatching(ratio, items);
        let result: CuiScrollspyUpdateResult = {
            changed: false
        }
        if (!this.matches(matching)) {
            let intersecting = matching.map(idx => { return items[idx].element })
            this.removeActions(actions, ...this.previous.map(idx => { return items[idx].element }));
            this.addActions(actions, ...intersecting)
            result.intersecting = intersecting;
            if (are(links, linksActions)) {
                this.removeActions(linksActions, ...this.previous.map(idx => { return links[idx] }));
                this.addActions(linksActions, ...matching.map(idx => { return links[idx] }))
            }
            this.previous = matching;
            result.changed = true;
            return result;
        }
        return result;
    }

    matches(item: number[]): boolean {
        let len = item.length;
        if (len !== this.previous.length) {
            return false;
        }
        let i = 0;
        for (i = 0; i < len; i++) {
            if (!this.previous.includes(item[i])) {
                return false;
            }
        }
        return true;
    }
}