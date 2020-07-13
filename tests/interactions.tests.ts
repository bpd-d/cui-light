import { IUIInteractionProvider } from "../src/core/models/interfaces";
import { FastDom } from "../src/core/utils/interactions";

describe("Tests checking [FastDom]", function () {

    let interactions: IUIInteractionProvider;
    let element: Element;
    let sleep = (timeout: number): Promise<boolean> => {
        return new Promise(resolve => setTimeout(() => {
            resolve(true)
        }, timeout));
    }

    beforeEach(function () {
        this.interactions = new FastDom();
        this.element = document.createElement("div");
    });

    it("Shall mutate object", async function () {
        this.interactions.mutate(() => {
            this.element.classList.add("someClass")
        }, this)
        await sleep(100);
        expect(this.element).toHaveClass("someClass");
    })

    it("Shall fetch object", async function () {
        this.element.setAttribute("test", "test");
        let output: string = null
        this.interactions.fetch(() => {
            output = this.element.getAttribute("test")
        }, this)
        await sleep(100);
        expect(output).toEqual("test");
    })

    it("Shall nest mutate in fetch object", async function () {
        let output: string = null
        this.element.setAttribute("test", "test");
        this.interactions.fetch(() => {
            let test = this.element.getAttribute("test")
            this.interactions.mutate(() => {
                this.element.setAttribute("xtest", test)
            }, this)
        }, null)

        await sleep(100);
        output = this.element.getAttribute("xtest")
        expect(output).toEqual("test");
    })


})