import { CuiUtils } from "../src/core/models/utils"
import { CuiSetupInit } from "../src/core/models/setup";
import { sleep } from "../src/core/utils/functions";
import { CuiLightMode } from "../src/core/utils/types";

describe("Tests checking method [CuiUtils]", function () {
    let utils: CuiUtils;
    let lightClass: string = 'cui-dark';
    let printClass: string = 'cui-print';
    beforeEach(() => {
        utils = new CuiUtils(new CuiSetupInit());
        document.body.classList.remove(lightClass);
        document.body.classList.remove(printClass);
    })

    it("Checking method [setLightMode] - normal case", async function () {
        let hasToggledDark: boolean = false;
        let hasUnToggledDark: boolean = false;
        const classes = document.body.classList;
        utils.setLightMode('dark');
        await sleep(100);
        hasToggledDark = classes.contains(lightClass);
        utils.setLightMode('light');
        await sleep(100);
        hasUnToggledDark = classes.contains(lightClass);

        expect(hasToggledDark).toBeTrue();
        expect(hasUnToggledDark).toBeFalse();

    })

    it("Checking method [setLightMode] - the same twice case", async function () {
        let hasToggledDark: boolean = false;
        let hasToggledDarkSecond: boolean = false;
        const classes = document.body.classList;
        utils.setLightMode('dark');
        await sleep(100);
        hasToggledDark = classes.contains(lightClass);
        utils.setLightMode('dark');
        await sleep(100);
        hasToggledDarkSecond = classes.contains(lightClass);

        expect(hasToggledDark).toBeTrue();
        expect(hasToggledDarkSecond).toBeTrue();

    })


    it("Checking method [setPrintMode] - normal case", async function () {
        let hasPrint: boolean = false;
        let hasPrintAfter: boolean = false;
        const classes = document.body.classList;
        utils.setPrintMode(true);
        await sleep(100);
        hasPrint = classes.contains(printClass);
        utils.setPrintMode(false);
        await sleep(100);
        hasPrintAfter = classes.contains(printClass);

        expect(hasPrint).toBeTrue();
        expect(hasPrintAfter).toBeFalse();

    })

    it("Checking method [setPrintMode] - twice the same case", async function () {
        let hasPrint: boolean = false;
        let hasPrintAfter: boolean = false;
        const classes = document.body.classList;
        utils.setPrintMode(true);
        await sleep(100);
        hasPrint = classes.contains(printClass);
        utils.setPrintMode(true);
        await sleep(100);
        hasPrintAfter = classes.contains(printClass);

        expect(hasPrint).toBeTrue();
        expect(hasPrintAfter).toBeTrue();

    })

    it("Checking method [getLightMode]", async function () {
        let lightMode: CuiLightMode = null;
        await sleep(100);
        lightMode = utils.getLightMode();
        expect(lightMode).toEqual('light');

    })

    it("Checking method [getLightMode] - dark ", async function () {
        let lightMode: CuiLightMode = null;
        utils.setLightMode('dark');
        await sleep(100);
        lightMode = utils.getLightMode();
        expect(lightMode).toEqual('dark');
    })

    it("Checking method [isPrintMode]", async function () {
        let printMode: boolean = null;
        await sleep(100);
        printMode = utils.isPrintMode();
        expect(printMode).toBeFalse();

    })

    it("Checking method [isPrintMode] - true ", async function () {
        let printMode: boolean = null;
        utils.setPrintMode(true);
        await sleep(100);
        printMode = utils.isPrintMode();
        expect(printMode).toBeTrue();
    })

    it("Checking method [setProperty] - without prefix", async function () {
        let value: string = null;
        utils.setProperty("--name", "value")
        value = document.documentElement.style.getPropertyValue("--name")
        expect(value).toEqual(value);
    })

    it("Checking method [setProperty] - with prefix", async function () {
        let value: string = null;
        utils.setProperty("--{prefix}-name", "value")
        value = document.documentElement.style.getPropertyValue("--cui-name")
        expect(value).toEqual(value);
    })
})