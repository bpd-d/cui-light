import { SampleTask } from "./helpers/models"
import { CuiTaskRunner } from '../src/core/utils/task';
import { sleep } from "../src/core/utils/functions";

/**
 * Tests for ICuiTask and runners
 */
describe("Tests checking class [CuiTaskRunner]", function () {

    it("Shall perform given task", async function () {
        let data = new SampleTask();
        let task = new CuiTaskRunner(100, false, data.setFlag.bind(data, true));
        task.start();
        await sleep(150);
        expect(data.flag).toBeTrue();
    })

    it("Shall NOT perform given task - incorrect timeout", async function () {
        let data = new SampleTask();
        let task = new CuiTaskRunner(-1, false, data.setFlag.bind(data, true));
        task.start();
        await sleep(150);
        expect(data.flag).toBeFalse();
    })

    it("Shall NOT perform given task - no callback", async function () {
        let data = new SampleTask();
        let task = new CuiTaskRunner(100, false);
        task.start();
        await sleep(150);
        expect(data.flag).toBeFalse();
    })

    it("Shall perform given task in loop", async function () {
        let data = new SampleTask();
        let task = new CuiTaskRunner(100, true, data.setFlag.bind(data, true));
        task.start();
        await sleep(150);
        expect(task.getId() !== null).toBeTrue();
    })

})