import { ICuiEventBus, ICuiCallbackExecutor, ICuiEventEmitHandler, CuiEventReceiver, CuiElement } from "../src/core/models/interfaces"
import { CuiEventBus, CuiEventExtBus } from "../src/core/bus/bus";
import { CuiCallbackExecutor } from "../src/core/bus/executors";
import { TaskedEventEmitHandler } from "../src/core/bus/handlers";
import { ExecutorTestItem, ExecutorTestItemExt } from "./helpers/models";
import { ICuiEventBusQueueSetup } from "../src/core/bus/interfaces";

describe("Tests for class [CuiCallbackExecutor]", function () {

    let executor: ICuiCallbackExecutor;

    beforeEach(() => {
        executor = new CuiCallbackExecutor();
    })

    it("Case for method [execute] - no context", async function () {
        let value: boolean = false;
        await executor.execute(() => {
            value = true;
        }, null)

        expect(value).toBeTrue();
    })

    it("Case for method [execute] - with context", async function () {
        let item: ExecutorTestItem = new ExecutorTestItem();
        await executor.execute(item.setValue.bind(item), [true]);

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
            "task": { callback: item.setValue.bind(item), $cuid: "000" }
        }
        await handler.handle(tasks, null, [true])

        expect(item.value).toBeTrue();
    })

    it("Case for method [handle] - no args", async function () {
        let item: ExecutorTestItem = new ExecutorTestItem();
        let tasks: CuiEventReceiver = {
            "task": { callback: item.setValue.bind(item), $cuid: null }
        }
        await handler.handle(tasks, null, null)

        expect(item.value).toBeFalsy();
    })

    it("Case for method [handle] - many tasks", async function () {
        let item: ExecutorTestItem = new ExecutorTestItem();
        let item2: ExecutorTestItem = new ExecutorTestItem();
        let tasks: CuiEventReceiver = {
            "task": { callback: item.setValue.bind(item), $cuid: null },
            "task2": { callback: item2.setValue.bind(item2), $cuid: "000" }
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
            "task": { callback: item.setValue.bind(item), $cuid: null }
        }
        await handler.handle(tasks, null, [true])

        expect(item.value).toBeTrue();
    })

    it("Case for method [handle] - no args", async function () {
        let item: ExecutorTestItem = new ExecutorTestItem();
        let tasks: CuiEventReceiver = {
            "task": { callback: item.setValue.bind(item), $cuid: null }
        }
        await handler.handle(tasks, null, null)

        expect(item.value).toBeFalsy();
    })

    it("Case for method [handle] - many tasks", async function () {
        let item: ExecutorTestItem = new ExecutorTestItem();
        let item2: ExecutorTestItem = new ExecutorTestItem();
        let tasks: CuiEventReceiver = {
            "task": { callback: item.setValue.bind(item), $cuid: null },
            "task2": { callback: item2.setValue.bind(item2), $cuid: null }
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
        let id = bus.on('test', item.setValue.bind(item));
        subscribing = bus.isSubscribing('test', id)
        expect(subscribing).toBeTrue();
    })

    it("Case for method [on] - missing one argument", function () {
        let item = new ExecutorTestItemExt('001');
        let failed: boolean = false;

        try {
            bus.on('', item.setValue.bind(item));
        } catch (e) {
            failed = true;
        }

        expect(failed).toBeTrue();
    })

    it("Case for method [on] - incorrect cuid", function () {
        let item = new ExecutorTestItemExt('');
        let failed: boolean = false;
        try {
            bus.on('test', item.setValue.bind(item));
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
            let id = bus.on('test', item.setValue.bind(item));
            bus.on('test', item2.setValue.bind(item2));

            bus.detach('test', id);
            subscribing = bus.isSubscribing('test', id)
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
            let id = bus.on('test', item.setValue.bind(item));
            bus.on('test', item2.setValue.bind(item2));

            bus.detach('test', null);
            subscribing = bus.isSubscribing('test', id)
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
            let id = bus.on('test', item.setValue.bind(item));
            bus.on('test', item2.setValue.bind(item2));

            bus.detachAll('test');
            subscribing = bus.isSubscribing('test', id)
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
            let id = bus.on('test', item.setValue.bind(item));
            bus.on('test', item2.setValue.bind(item2));

            bus.detachAll('');
            subscribing = bus.isSubscribing('test', id)
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
            bus.on('test', item.setValue.bind(item));
            bus.on('test', item2.setValue.bind(item2));
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
            bus.on('test', item.setValue.bind(item));
            bus.on('test', item2.setValue.bind(item));

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
            bus.on('test', item.setValue.bind(item));
            bus.on('test', item2.setValue.bind(item));

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
            bus.on('test', item.setValue.bind(item), element);
            bus.on('test', item2.setValue.bind(item2));

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
            bus.on('test', item.setValue.bind(item), element);
            bus.on('test', item2.setValue.bind(item2));

            await bus.emit('test', null, true);
        } catch (e) {
            failed = true;
        }

        expect(failed).toBeFalse();
        expect(item.value).toBeTrue();
        expect(item2.value).toBeTrue();
    })

})


describe("Tests for class [CuiEventExtBus]", function () {
    const setup: ICuiEventBusQueueSetup[] = [
        {
            name: "CustomQueue",
            eventsDef: ["AAA"],
            handler: 'tasked',
            priority: 0
        },
        {
            name: "CustomQueue2",
            eventsDef: ["BBB"],
            handler: 'tasked',
            priority: 1
        }
    ]

    beforeEach(() => {
    })

    it("Initialization", function () {
        let extBus = new CuiEventExtBus(setup);
        expect(extBus).toBeDefined();
    })


    it("Method on", function () {
        let extBus = new CuiEventExtBus(setup);
        let id = extBus.on("AAA", () => {
        });
        expect(extBus).toBeDefined();
        expect(id).toBeDefined();
        expect(id).toContain(setup[0].name);
    })
})