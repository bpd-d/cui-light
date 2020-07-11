import { ICuiEventBus, ICuiCallbackExecutor, ICuiEventEmitHandler, CuiEventReceiver, CuiElement } from "../src/core/models/interfaces"
import { CuiEventBus } from "../src/core/bus/bus";
import { CuiCallbackExecutor } from "../src/core/bus/executors";
import { TaskedEventEmitHandler } from "../src/core/bus/handlers";
import { ExecutorTestItem, ExecutorTestItemExt } from "./helpers/models";

describe("Tests for class [CuiCallbackExecutor]", function () {

    let executor: ICuiCallbackExecutor;

    beforeEach(() => {
        executor = new CuiCallbackExecutor();
    })

    it("Case for method [execute] - no context", async function () {
        let value: boolean = false;
        await executor.execute(() => {
            value = true;
        }, null, null)

        expect(value).toBeTrue();
    })

    it("Case for method [execute] - with context", async function () {
        let item: ExecutorTestItem = new ExecutorTestItem();
        await executor.execute(item.setValue, item, [true]);

        expect(item.value).toBeTrue();
    })
})

describe("Tests for class [TaskedEventEmitHandler]", function () {

    let executor: ICuiCallbackExecutor;
    let handler: ICuiEventEmitHandler;

    beforeEach(() => {
        executor = new CuiCallbackExecutor();
        handler = new TaskedEventEmitHandler(executor);
    })

    it("Case for method [handle] - no context", async function () {
        let item: ExecutorTestItem = new ExecutorTestItem();
        let tasks: CuiEventReceiver = {
            "task": { ctx: item, callback: item.setValue, $cuid: "000" }
        }
        await handler.handle(tasks, null, [true])

        expect(item.value).toBeTrue();
    })

    it("Case for method [handle] - no args", async function () {
        let item: ExecutorTestItem = new ExecutorTestItem();
        let tasks: CuiEventReceiver = {
            "task": { ctx: item, callback: item.setValue, $cuid: null }
        }
        await handler.handle(tasks, null, null)

        expect(item.value).toBeFalsy();
    })

    it("Case for method [handle] - many tasks", async function () {
        let item: ExecutorTestItem = new ExecutorTestItem();
        let item2: ExecutorTestItem = new ExecutorTestItem();
        let tasks: CuiEventReceiver = {
            "task": { ctx: item, callback: item.setValue, $cuid: null },
            "task2": { ctx: item2, callback: item2.setValue, $cuid: "000" }
        }
        await handler.handle(tasks, null, [true])

        expect(item.value).toBeTrue();
        expect(item2.value).toBeTrue();
    })
})

describe("Tests for class [SimpleEventEmitHandler]", function () {

    let executor: ICuiCallbackExecutor;
    let handler: ICuiEventEmitHandler;

    beforeEach(() => {
        executor = new CuiCallbackExecutor();
        handler = new TaskedEventEmitHandler(executor);
    })

    it("Case for method [handle] - no context", async function () {
        let item: ExecutorTestItem = new ExecutorTestItem();
        let tasks: CuiEventReceiver = {
            "task": { ctx: item, callback: item.setValue, $cuid: null }
        }
        await handler.handle(tasks, null, [true])

        expect(item.value).toBeTrue();
    })

    it("Case for method [handle] - no args", async function () {
        let item: ExecutorTestItem = new ExecutorTestItem();
        let tasks: CuiEventReceiver = {
            "task": { ctx: item, callback: item.setValue, $cuid: null }
        }
        await handler.handle(tasks, null, null)

        expect(item.value).toBeFalsy();
    })

    it("Case for method [handle] - many tasks", async function () {
        let item: ExecutorTestItem = new ExecutorTestItem();
        let item2: ExecutorTestItem = new ExecutorTestItem();
        let tasks: CuiEventReceiver = {
            "task": { ctx: item, callback: item.setValue, $cuid: null },
            "task2": { ctx: item2, callback: item2.setValue, $cuid: null }
        }
        await handler.handle(tasks, null, [true])

        expect(item.value).toBeTrue();
        expect(item2.value).toBeTrue();
    })
})

describe("Tests for class [CuiEventBus]", function () {
    let bus: ICuiEventBus;
    let executor: ICuiCallbackExecutor;
    let handler: ICuiEventEmitHandler;

    beforeEach(() => {
        executor = new CuiCallbackExecutor();
        handler = new TaskedEventEmitHandler(executor);
        bus = new CuiEventBus(handler);
    })

    it("Case for method [on]", function () {
        let item = new ExecutorTestItemExt('001');
        let subscribing: boolean = false;
        bus.on('test', item.setValue, item);
        subscribing = bus.isSubscribing('test', item)
        expect(subscribing).toBeTrue();
    })

    it("Case for method [on] - missing one argument", function () {
        let item = new ExecutorTestItemExt('001');
        let failed: boolean = false;

        try {
            bus.on('', item.setValue, item);
        } catch (e) {
            failed = true;
        }

        expect(failed).toBeTrue();
    })

    it("Case for method [on] - incorrect cuid", function () {
        let item = new ExecutorTestItemExt('');
        let failed: boolean = false;
        try {
            bus.on('test', item.setValue, item);
        } catch (e) {
            failed = true;
        }

        expect(failed).toBeFalse();
    })

    it("Case for method [detach]", function () {
        let item = new ExecutorTestItemExt('001');
        let item2 = new ExecutorTestItemExt('002');
        let subscribing: boolean = false;
        let failed: boolean = false;
        try {
            bus.on('test', item.setValue, item);
            bus.on('test', item2.setValue, item2);

            bus.detach('test', item);
            subscribing = bus.isSubscribing('test', item)
        } catch (e) {
            failed = true;
        }

        expect(failed).toBeFalse();
        expect(subscribing).toBeFalse();
    })

    it("Case for method [detach] - incorrect argument", function () {
        let item = new ExecutorTestItemExt('001');
        let item2 = new ExecutorTestItemExt('002');
        let subscribing: boolean = false;
        let failed: boolean = false;
        try {
            bus.on('test', item.setValue, item);
            bus.on('test', item2.setValue, item2);

            bus.detach('test', item);
            subscribing = bus.isSubscribing('test', null)
        } catch (e) {
            failed = true;
        }

        expect(failed).toBeTrue();
        expect(subscribing).toBeFalse();
    })

    it("Case for method [detachAll]", function () {
        let item = new ExecutorTestItemExt('001');
        let item2 = new ExecutorTestItemExt('002');
        let subscribing: boolean = false;
        let failed: boolean = false;
        try {
            bus.on('test', item.setValue, item);
            bus.on('test', item2.setValue, item2);

            bus.detachAll('test');
            subscribing = bus.isSubscribing('test', item)
        } catch (e) {
            failed = true;
        }

        expect(failed).toBeFalse();
        expect(subscribing).toBeFalse();
    })

    it("Case for method [detachAll] - incorrect event name", function () {
        let item = new ExecutorTestItemExt('001');
        let item2 = new ExecutorTestItemExt('002');
        let subscribing: boolean = false;
        let failed: boolean = false;
        try {
            bus.on('test', item.setValue, item);
            bus.on('test', item2.setValue, item2);

            bus.detachAll('');
            subscribing = bus.isSubscribing('test', item)
        } catch (e) {
            failed = true;
        }

        expect(failed).toBeFalse();
        expect(subscribing).toBeTrue();
    })

    it("Case for method [emit]", async function () {
        let item = new ExecutorTestItemExt('001');
        let item2 = new ExecutorTestItemExt('002');
        let failed: boolean = false;
        try {
            bus.on('test', item.setValue, item);
            bus.on('test', item2.setValue, item2);
            await bus.emit('test', null, true);

        } catch (e) {
            console.error(e)
            failed = true;
        }

        expect(failed).toBeFalse();
        expect(item.value).toBeTrue();
        expect(item2.value).toBeTrue();
    })

    it("Case for method [emit] - missing event name", async function () {
        let item = new ExecutorTestItemExt('001');
        let item2 = new ExecutorTestItemExt('002');
        let failed: boolean = false;
        try {
            bus.on('test', item.setValue, item);
            bus.on('test', item2.setValue, item2);

            await bus.emit('', null, true);
        } catch (e) {
            failed = true;
        }

        expect(failed).toBeTrue();
        expect(item.value).toBeFalse();
        expect(item2.value).toBeFalse();
    })

    it("Case for method [emit] - different event name", async function () {
        let item = new ExecutorTestItemExt('001');
        let item2 = new ExecutorTestItemExt('002');
        let failed: boolean = false;
        try {
            bus.on('test', item.setValue, item);
            bus.on('test', item2.setValue, item2);

            await bus.emit('test_2', null, true);
        } catch (e) {
            failed = true;
        }

        expect(failed).toEqual(false, "Method failed");
        expect(item.value).toBeFalse();
        expect(item2.value).toBeFalse();
    })

    it("Case for method [emit] - no event attached", async function () {
        let failed: boolean = false;
        try {

            await bus.emit('test', null, true);
        } catch (e) {
            failed = true;
        }

        expect(failed).toBeFalse();
    })


    it("Case for method [emit] - call event only for specfic components", async function () {
        let item = new ExecutorTestItemExt('001');
        let item2 = new ExecutorTestItemExt('002');
        let element: CuiElement = { $cuid: "000-000-01" }
        let failed: boolean = false;
        try {
            bus.on('test', item.setValue, item, element);
            bus.on('test', item2.setValue, item2);

            await bus.emit('test', element.$cuid, true);
        } catch (e) {
            failed = true;
        }

        expect(failed).toBeFalse();
        expect(item.value).toBeTrue();
        expect(item2.value).toBeFalse();
    })

    it("Case for method [emit] - call event all components regardless of attached element", async function () {
        let item = new ExecutorTestItemExt('001');
        let item2 = new ExecutorTestItemExt('002');
        let element: CuiElement = { $cuid: "000-000-01" }
        let failed: boolean = false;
        try {
            bus.on('test', item.setValue, item, element);
            bus.on('test', item2.setValue, item2);

            await bus.emit('test', null, true);
        } catch (e) {
            failed = true;
        }

        expect(failed).toBeFalse();
        expect(item.value).toBeTrue();
        expect(item2.value).toBeTrue();
    })

})