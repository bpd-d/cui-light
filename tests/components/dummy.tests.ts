import { CuiDummyComponent, CuiDummyHandler } from '../../src/components/dummy/dummy';
import { CuiUtils, CuiSetupInit, ICuiComponentHandler, parseAttribute } from '../../src/core';

describe("Tests checking component [dummy]", function () {
    let component: CuiDummyComponent;
    let utils: CuiUtils;
    let handler: ICuiComponentHandler;
    let element: Element;

    beforeAll(() => {
        utils = new CuiUtils(new CuiSetupInit())
        component = new CuiDummyComponent();
    })

    beforeEach(() => {
        element = document.createElement("div")
        element.id = "dummy";
        element.setAttribute(component.attribute, "")
        document.documentElement.appendChild(element);
        handler = component.get(element, utils)

    })

    afterEach(() => {
        element.remove();
        handler = element = null;

    })

    it("Initializes properly", function () {
        let failed: boolean = false;
        try {
            handler.handle(parseAttribute(element, component.attribute))
        } catch (e) {
            failed = true;
        }

        expect(failed).toBeFalse();
    })

    it("Updates properly", function () {
        let failed: boolean = false;
        try {
            handler.handle(parseAttribute(element, component.attribute))
            handler.refresh(parseAttribute(element, component.attribute))
        } catch (e) {
            failed = true;
        }

        expect(failed).toBeFalse();
    })

    it("Removes properly", function () {
        let failed: boolean = false;
        try {
            handler.handle(parseAttribute(element, component.attribute))
            handler.destroy();
        } catch (e) {
            failed = true;
        }

        expect(failed).toBeFalse();
    })

})