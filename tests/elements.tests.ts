import { CuiUtils } from "cui-light-core/dist/esm/models/utils"
import { CuiSetupInit } from "cui-light-core/dist/esm/models/setup";
import { ElementManager } from "../src/managers/element";

describe("Tests checking class [managers -> elements]", function () {
    let utils: CuiUtils;
    let element: ElementManager;
    let node: Element;

    let sleep = (timeout: number): Promise<boolean> => {
        return new Promise(resolve => setTimeout(() => {
            resolve(true)
        }, timeout));
    }

    beforeAll(function () {
        utils = new CuiUtils(new CuiSetupInit());
    })

    beforeEach(function () {
        node = document.createElement("div");
        element = new ElementManager([node], utils)
    });

    it("Check method [toggleClass] - proper class", async function () {
        let hasToggled: boolean = false;
        let hasUnToggled: boolean = false;
        let perform: boolean = false
        perform = await element.toggleClass('test');
        hasToggled = node.classList.contains('test')
        await element.toggleClass('test');
        hasUnToggled = node.classList.contains('test');

        expect(perform).toBeTrue();
        expect(hasToggled).toBeTrue();
        expect(hasUnToggled).toBeFalse();
    })


    it("Check method [toggleClass] - empty class", async function () {
        let hasToggled: boolean = false;
        let perform: boolean = false
        perform = await element.toggleClass('');
        hasToggled = node.classList.contains('')

        expect(perform).toBeFalse();
        expect(hasToggled).toBeFalse();
    })

    it("Check method [toggleClassAs] - proper class", async function () {
        let hasToggled: boolean = false;
        let hasUnToggled: boolean = false;
        let perform: boolean = false
        let perform2: boolean = false;
        perform = await element.toggleClassAs('test');
        await sleep(100);
        hasToggled = node.classList.contains('test')
        perform2 = await element.toggleClassAs('test');
        await sleep(100);
        hasUnToggled = node.classList.contains('test');

        expect(perform).toBeTrue();
        expect(perform2).toBeTrue();
        expect(hasToggled).toBeTrue();
        expect(hasUnToggled).toBeFalse();
    })

    it("Check method [toggleClassAs] - empty class", async function () {
        let hasToggled: boolean = false;
        let perform: boolean = false
        perform = await element.toggleClassAs('');
        await sleep(100);
        hasToggled = node.classList.contains('')

        expect(perform).toBeFalse();
        expect(hasToggled).toBeFalse();
    })

    it("Check method [setClass] - proper class", async function () {
        let hasToggled: boolean = false;
        let perform: boolean = false
        perform = await element.setClass('test');
        hasToggled = node.classList.contains('test')

        expect(perform).toBeTrue();
        expect(hasToggled).toBeTrue();
    })

    it("Check method [setClass] - empty class", async function () {
        let hasToggled: boolean = false;
        let perform: boolean = false
        perform = await element.setClass('');
        hasToggled = node.classList.contains('')

        expect(perform).toBeFalse();
        expect(hasToggled).toBeFalse();
    })

    it("Check method [setClassAs] - proper class", async function () {
        let hasToggled: boolean = false;
        let perform: boolean = false
        perform = await element.setClassAs('test');
        await sleep(100);
        hasToggled = node.classList.contains('test')

        expect(perform).toBeTrue();
        expect(hasToggled).toBeTrue();
    })

    it("Check method [setClassAs] - empty class", async function () {
        let hasToggled: boolean = false;
        let perform: boolean = false
        perform = await element.setClassAs('');
        await sleep(100);
        hasToggled = node.classList.contains('')

        expect(perform).toBeFalse();
        expect(hasToggled).toBeFalse();
    })


    it("Check method [removeClass] - existing class", async function () {
        let hasToggled: boolean = false;
        let perform: boolean = false
        await element.setClass('test');
        perform = await element.removeClass('test');
        hasToggled = node.classList.contains('test')

        expect(perform).toBeTrue();
        expect(hasToggled).toBeFalse();
    })

    it("Check method [removeClass] - non-existing class", async function () {
        let hasToggled: boolean = false;
        let perform: boolean = false
        perform = await element.removeClass('test');
        hasToggled = node.classList.contains('test')

        expect(perform).toBeTrue();
        expect(hasToggled).toBeFalse();
    })

    it("Check method [removeClass] - empty class", async function () {
        let perform: boolean = false
        perform = await element.removeClass('');

        expect(perform).toBeFalse();
    })

    it("Check method [removeClassAs] - existing class", async function () {
        let hasToggled: boolean = false;
        let perform: boolean = false
        await element.setClass('test');
        perform = await element.removeClassAs('test');
        await sleep(100);
        hasToggled = node.classList.contains('test')

        expect(perform).toBeTrue();
        expect(hasToggled).toBeFalse();
    })

    it("Check method [removeClassAs] - non-existing class", async function () {
        let hasToggled: boolean = false;
        let perform: boolean = false
        perform = await element.removeClassAs('test');
        await sleep(100);
        hasToggled = node.classList.contains('test')

        expect(perform).toBeTrue();
        expect(hasToggled).toBeFalse();
    })

    it("Check method [removeClassAs] - empty class", async function () {
        let perform: boolean = false
        perform = await element.removeClassAs('');
        await sleep(100);
        expect(perform).toBeFalse();
    })

    it("Check method [getAttribute] - proper attribute", function () {
        node.setAttribute('test', 'test');
        let output: string[] = element.getAttribute('test');

        expect(output.length).toEqual(1);
        expect(output[0]).toEqual('test');
    })

    it("Check method [getAttribute] - empty attribute", function () {
        node.setAttribute('test', 'test');
        let output: string[] = element.getAttribute(null);

        expect(output).toEqual(null);
    })


    it("Check method [getAttribute] - non-exisiting attribute", function () {
        node.setAttribute('test', 'test');
        let output: string[] = element.getAttribute('xxx');

        expect(output.length).toEqual(1);
        expect(output[0]).toBeFalsy();
    })

    it("Check method [setAttribute] - proper attribute", async function () {
        let perform: boolean = false
        let output: string = null;
        perform = await element.setAttribute('test', 'test');
        output = node.getAttribute('test')
        expect(perform).toBeTrue();
        expect(output).toEqual('test', 'Value shall match attribute value');
    })

    it("Check method [setAttribute] - empty attribute name", async function () {
        let perform: boolean = false
        let output: string = null;
        perform = await element.setAttribute('', 'test');
        output = node.getAttribute('')
        expect(perform).toBeFalse();
        expect(output).toEqual(null);
    })

    it("Check method [setAttributeAs] - proper attribute", async function () {
        let perform: boolean = false
        let output: string = null;
        perform = await element.setAttributeAs('test', 'test');
        await sleep(100);
        output = node.getAttribute('test')
        expect(perform).toBeTrue();
        expect(output).toEqual('test', 'Value shall match attribute value');
    })

    it("Check method [setAttributeAs] - empty attribute name", async function () {
        let perform: boolean = false
        let output: string = null;
        perform = await element.setAttribute('', 'test');
        await sleep(100);
        output = node.getAttribute('')
        expect(perform).toBeFalse();
        expect(output).toEqual(null);
    })

    it("Check method [removeAttribute] - proper attribute name", async function () {
        let perform: boolean = false
        let output: string = null;
        node.setAttribute('test', "test")
        perform = await element.removeAttribute('test');
        output = node.getAttribute('test')
        expect(perform).toBeTrue();
        expect(output).toEqual(null);
    })

    it("Check method [removeAttribute] - incorrect attribute name", async function () {
        let perform: boolean = false
        let output: string = null;
        node.setAttribute('test', "test")
        perform = await element.removeAttribute('');
        output = node.getAttribute('')
        expect(perform).toBeFalse();
        expect(output).toEqual(null);
    })

    it("Check method [removeAttribute] - non-existing attribute name", async function () {
        let perform: boolean = false
        let output: string = null;
        node.setAttribute('test', "test")
        perform = await element.removeAttribute('aaa');
        expect(perform).toBeTrue();
    })

    it("Check method [removeAttributeAs] - proper attribute name", async function () {
        let perform: boolean = false
        let output: string = null;
        node.setAttribute('test', "test")
        perform = await element.removeAttributeAs('test');
        await sleep(100);
        output = node.getAttribute('test')
        expect(perform).toBeTrue();
        expect(output).toEqual(null);
    })

    it("Check method [removeAttributeAs] - incorrect attribute name", async function () {
        let perform: boolean = false
        let output: string = null;
        node.setAttribute('test', "test")
        perform = await element.removeAttributeAs('');
        await sleep(100);
        output = node.getAttribute('')
        expect(perform).toBeFalse();
        expect(output).toEqual(null);
    })

    it("Check method [removeAttributeAs] - non-existing attribute name", async function () {
        let perform: boolean = false
        let output: string = null;
        node.setAttribute('test', "test")
        perform = await element.removeAttributeAs('aaa');
        await sleep(100);
        expect(perform).toBeTrue();
    })

    it("Check method [toggleAttribute] - proper attribute name", async function () {
        let perform: boolean = false
        let perform2: boolean = false
        let output: string = null;
        let output2: string = null;
        perform = await element.toggleAttribute('test', 'test');
        output = node.getAttribute('test')
        perform2 = await element.toggleAttribute('test', 'test');
        output2 = node.getAttribute('test')

        expect(perform).toBeTrue();
        expect(perform2).toBeTrue();
        expect(output).toEqual('test');
        expect(output2).toEqual(null);
    })

    it("Check method [toggleAttribute] - inproper attribute name", async function () {
        let perform: boolean = false
        let perform2: boolean = false
        perform = await element.toggleAttribute('', 'test');
        perform2 = await element.toggleAttribute(null, 'test');

        expect(perform).toBeFalse();
        expect(perform2).toBeFalse();
    })

    it("Check method [toggleAttributeAs] - proper attribute name", async function () {
        let perform: boolean = false
        let perform2: boolean = false
        let output: string = null;
        let output2: string = null;
        perform = await element.toggleAttribute('test', 'test');
        await sleep(100);
        output = node.getAttribute('test')
        perform2 = await element.toggleAttribute('test', 'test');
        await sleep(100);
        output2 = node.getAttribute('test')

        expect(perform).toBeTrue();
        expect(perform2).toBeTrue();
        expect(output).toEqual('test');
        expect(output2).toEqual(null);
    })

    it("Check method [toggleAttributeAs] - inproper attribute name", async function () {
        let perform: boolean = false
        let perform2: boolean = false
        perform = await element.toggleAttribute('', 'test');
        await sleep(100);
        perform2 = await element.toggleAttribute(null, 'test');
        await sleep(100);

        expect(perform).toBeFalse();
        expect(perform2).toBeFalse();
    })

    it("Check method [open] - proper values", async function () {
        let perform: boolean = false
        let contains: boolean = false;
        let contains2: boolean = false;
        let conAnim: boolean = false;
        let conAnim2: boolean = false;
        // First call method
        perform = await element.open('cui-open', 'test', 300);
        await sleep(100);
        // Check whether element has an anim class and doesn't have open yet
        contains = node.classList.contains('cui-open')
        conAnim = node.classList.contains('test')
        await sleep(400);
        // Check whether element has an opennnnn class and doesn't have anim class anymore
        contains2 = node.classList.contains('cui-open')
        conAnim2 = node.classList.contains('test')
        expect(perform).toBeTrue();
        expect(contains).toBeFalse();
        expect(contains2).toBeTrue();
        expect(conAnim).toBeTrue();
        expect(conAnim2).toBeFalse();
    })

    it("Check method [open] - empty value", async function () {
        let perform: boolean = false
        let contains: boolean = false;
        let contains2: boolean = false;
        perform = await element.open('cui-open', '', 300);
        await sleep(100);
        contains = node.classList.contains('cui-open')
        await sleep(400);
        contains2 = node.classList.contains('cui-open')
        expect(perform).toBeFalse();
        expect(contains).toBeFalse();
        expect(contains2).toBeFalse();
    })

    it("Check method [close] - proper values", async function () {
        let perform: boolean = false
        let contains: boolean = false;
        let contains2: boolean = false;
        let conAnim: boolean = false;
        let conAnim2: boolean = false;
        // Add class to node - will be removed by method close
        node.classList.add('cui-close')
        perform = await element.close('cui-close', 'test', 300);
        await sleep(100);
        // Check whether contains close and anim classes
        contains = node.classList.contains('cui-close')
        conAnim = node.classList.contains('test')
        await sleep(400);
        // Check whether it doesn't contain close class and anim class
        contains2 = node.classList.contains('cui-close')
        conAnim2 = node.classList.contains('test')
        expect(perform).toBeTrue();
        expect(contains).toBeTrue();
        expect(contains2).toBeFalse();
        expect(conAnim).toBeTrue();
        expect(conAnim2).toBeFalse();
    })

    it("Check method [close] - empty value", async function () {
        let perform: boolean = false
        let contains: boolean = false;
        let contains2: boolean = false;
        node.classList.add('cui-close')
        perform = await element.close('cui-close', '', 300);
        await sleep(100);
        contains = node.classList.contains('cui-close')
        await sleep(400);
        contains2 = node.classList.contains('cui-close')
        expect(perform).toBeFalse();
        expect(contains).toBeTrue();
        expect(contains2).toBeTrue();
    })

})