import { CollectionManager } from "../src/managers/collection";
import { FastDom } from "cui-light-core/dist/esm/utils/interactions";

describe("Tests checking class [CollectionManager]", function () {
    let manager: CollectionManager;
    let elements: Element[];

    let sleep = (timeout: number): Promise<boolean> => {
        return new Promise(resolve => setTimeout(() => {
            resolve(true)
        }, timeout));
    }

    beforeEach(() => {
        let fastDom = new FastDom();
        elements = [
            document.createElement('div'),
            document.createElement('div'),
            document.createElement('div')
        ]
        manager = new CollectionManager(elements, fastDom);
        manager.setToggle('active');
    })

    it("Collection shall be correctly initialized", function () {
        expect(manager.length()).toEqual(elements.length)
    })

    it("Checking method [length]", function () {
        expect(manager.length()).toEqual(elements.length)
    })

    it("Checking method [set]", async function () {
        let isActive: boolean = false;
        let current: number = -1;
        let performed: boolean = false;

        performed = await manager.set(1);
        isActive = elements[1].classList.contains('active');
        current = manager.getCurrentIndex();

        expect(performed).toBeTrue();
        expect(isActive).toBeTrue()
        expect(current).toEqual(1);
    })

    it("Checking method [set] - the same index", async function () {
        let isActive: boolean = false;
        let current: number = -1;
        let performed: boolean = false;
        await manager.set(1);
        performed = await manager.set(1);
        isActive = elements[1].classList.contains('active');
        current = manager.getCurrentIndex();

        expect(performed).toBeFalse();
        expect(isActive).toBeTrue()
        expect(current).toEqual(1);
    })

    it("Checking method [next] - normal case", async function () {
        let isActive: boolean = false;
        let current: number = -1;
        let performed: boolean = false;

        await manager.set(1);
        performed = await manager.next();
        isActive = elements[2].classList.contains('active');
        current = manager.getCurrentIndex();

        expect(performed).toBeTrue();
        expect(isActive).toBeTrue()
        expect(current).toEqual(2);
    })

    it("Checking method [next] - edge case", async function () {
        let isActive: boolean = false;
        let current: number = -1;
        let performed: boolean = false;
        await manager.set(elements.length - 1);
        performed = await manager.next();
        isActive = elements[0].classList.contains('active');
        current = manager.getCurrentIndex();

        expect(performed).toBeTrue();
        expect(isActive).toBeTrue()
        expect(current).toEqual(0);
    })

    it("Checking method [next] - no set case", async function () {
        let isActive: boolean = false;
        let current: number = -1;
        let performed: boolean = false;

        performed = await manager.next();
        isActive = elements[0].classList.contains('active');
        current = manager.getCurrentIndex();

        expect(performed).toBeTrue();
        expect(isActive).toBeTrue()
        expect(current).toEqual(0);
    })

    it("Checking method [previous] - normal case", async function () {
        let isActive: boolean = false;
        let current: number = -1;
        let performed: boolean = false;

        await manager.set(1);
        performed = await manager.previous();
        isActive = elements[0].classList.contains('active');
        current = manager.getCurrentIndex();

        expect(performed).toBeTrue();
        expect(isActive).toBeTrue()
        expect(current).toEqual(0);
    })

    it("Checking method [previous] - edge case", async function () {
        let isActive: boolean = false;
        let current: number = -1;
        let performed: boolean = false;

        await manager.set(0);
        performed = await manager.previous();
        isActive = elements[elements.length - 1].classList.contains('active');
        current = manager.getCurrentIndex();

        expect(performed).toBeTrue();
        expect(isActive).toBeTrue();
        expect(current).toEqual(elements.length - 1);
    })

    it("Checking method [previous] - no set case", async function () {
        let isActive: boolean = false;
        let current: number = -1;
        let performed: boolean = false;

        performed = await manager.previous();
        isActive = elements[elements.length - 1].classList.contains('active');
        current = manager.getCurrentIndex();

        expect(performed).toBeTrue();
        expect(isActive).toBeTrue()
        expect(current).toEqual(elements.length - 1);
    })

    it("Checking whether manager works when list gets updated outside", async function () {
        let isActive: boolean = false;
        let current: number = -1;
        let performed: boolean = false;
        elements[1].classList.add('active');
        performed = await manager.next();
        isActive = elements[2].classList.contains('active');
        current = manager.getCurrentIndex();

        expect(performed).toBeTrue();
        expect(isActive).toBeTrue()
        expect(current).toEqual(2);
    })

    it("Checking method [setWithAnimation]", async function () {
        let current: number = -1;
        let performed: boolean = false;
        let checkAnimIn1: boolean = false;
        let checkAnimIn2: boolean = false;
        let checkAnimOut1: boolean = false;
        let checkAnimOut2: boolean = false;
        await manager.set(0);
        performed = await manager.setWithAnimation(1, 'animIn', 'animOut', 300);
        await sleep(100);
        checkAnimIn1 = elements[1].classList.contains('animIn')
        checkAnimOut1 = elements[0].classList.contains('animOut')
        await sleep(300);
        checkAnimIn2 = elements[1].classList.contains('animIn')
        checkAnimOut2 = elements[0].classList.contains('animOut')
        current = manager.getCurrentIndex();

        expect(performed).toBeTrue();
        expect(checkAnimIn1).toBeTrue();
        expect(checkAnimOut1).toBeTrue();
        expect(checkAnimIn2).toBeFalse();
        expect(checkAnimOut2).toBeFalse();
        expect(current).toEqual(1);
    })

})