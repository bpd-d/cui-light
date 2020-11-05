import { CuiOpenComponent, CuiOpenHandler } from '../../src/components/open/open';
import { CuiDialogComponent } from '../../src/components/dialog/dialog';
import { CuiUtils, CuiSetupInit, ICuiComponentHandler, registerCuiElement, ICuiComponent, CuiElement, sleep } from '../../src/core';

describe("Tests checking component [open]", function () {
    //let component: CuiDummyComponent;
    let utils: CuiUtils;
    let handler: ICuiComponentHandler;
    let element: HTMLElement;
    let currId: string;
    let components: ICuiComponent[];
    let attributes: string[];
    let helper: HTMLElement;

    function register(id: string, attribute: string, value: string): void {
        element = document.createElement("div")
        element.id = id;
        element.setAttribute(attribute, value);
        document.documentElement.appendChild(element);
        registerCuiElement(element, components, attributes, utils);
        handler = ((element as any) as CuiElement).$handlers['cui-open']
    }

    function registerHelperAsDialog(id: string, attribute: string, value: string) {
        helper = document.createElement("div")
        helper.id = id;
        helper.setAttribute(attribute, value);
        document.documentElement.appendChild(helper);
        registerCuiElement(helper, components, attributes, utils);
    }
    function createHelper(id: string) {
        helper = document.createElement("div");
        helper.id = id;
        document.documentElement.appendChild(helper);
    }

    beforeAll(() => {
        utils = new CuiUtils(new CuiSetupInit())
        components = [new CuiOpenComponent(), new CuiDialogComponent()]
        attributes = ["cui-open", "cui-dialog"]

    })

    beforeEach(() => {
        // element = document.createElement("div")
        // element.id = "dummy";
        // document.documentElement.appendChild(element);
        // registerCuiElement(element, components, attributes, utils);

    })

    afterEach(() => {
        element.remove();
        if (helper) {
            helper.remove();
        }
        handler = element = helper = null;

    })

    it("Test checking [open] - initialization", async () => {
        register("open-test-01", "cui-open", "");

        expect(handler).toBeDefined();
        expect(element.classList.contains('cui-open'));
    })

    it("Test checking [open] - open simple", async () => {
        // Create
        register("open-test-02", "cui-open", "#open-helper-02");
        createHelper("open-helper-02");
        // Init
        let isActive = false;
        let open = handler as CuiOpenHandler;
        // Act
        utils.bus.emit("open", open.getId());
        await sleep(50);
        isActive = helper.classList.contains('cui-active');
        // Assert
        expect(handler).toBeDefined();
        expect(isActive).toBeTrue();
    })

    it("Test checking [open] - open complex", async () => {
        // Create
        register("open-test-03", "cui-open", "target: #open-helper-03; action: .xxx");
        createHelper("open-helper-03");
        // Init
        let isActive = false;
        let isActive2 = false;
        let open = handler as CuiOpenHandler;
        // Act
        utils.bus.emit("open", open.getId());
        await sleep(50);
        isActive = helper.classList.contains('cui-active');
        await sleep(300);
        isActive2 = helper.classList.contains('cui-active');
        // Assert
        expect(isActive).toBeFalse();
        expect(isActive2).toBeTrue();
    })

    it("Test checking [open] - open cui", async () => {
        // Create
        register("open-test-04", "cui-open", "target: #open-helper-04;");
        registerHelperAsDialog("open-helper-04", "cui-dialog", "");
        // Init
        let isActive = false;
        let open = handler as CuiOpenHandler;
        // Act
        utils.bus.emit("open", open.getId());
        await sleep(50);
        isActive = helper.classList.contains('cui-active');
        // Assert
        expect(isActive).toBeTrue();
    })

    it("Test checking [open] - opened event emit on non-cui", async () => {
        // Create
        register("open-test-05", "cui-open", "#open-helper-05");
        createHelper("open-helper-05");
        // Init
        let isActive = false;
        let data: any = null;
        let open = handler as CuiOpenHandler;
        utils.bus.on("opened", (state: any) => {
            data = state
        }, element as any)
        // Act
        utils.bus.emit("open", open.getId(), "XXX");
        await sleep(50);
        isActive = helper.classList.contains('cui-active');
        // Assert
        expect(isActive).toBeTrue();
        expect(data.event).toEqual('XXX');
    })

})