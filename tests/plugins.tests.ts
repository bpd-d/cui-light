import { ICuiPluginManager, ICuiPlugin } from "../src/core/models/interfaces"
import { CuiUtils } from "../src/core/models/utils";
import { CuiSetupInit } from "../src/core/models/setup";
import { SamplePlugin, SampleMutationPlugin } from "./helpers/models";
import { CuiPluginManager } from "../src/app/managers/plugins";

describe("Tests checking method [CuiPluginManager]", function () {
    let utils: CuiUtils;
    beforeAll(() => {
        utils = new CuiUtils(new CuiSetupInit());

    })
    it("Checks method init [init]", function () {
        let plugins = [
            new SamplePlugin(),
        ];
        let manager: ICuiPluginManager = new CuiPluginManager(plugins);
        manager.init(utils);

        expect(manager.get(plugins[0].name)).toBe(plugins[0])
        expect(plugins[0].setup.initialized).toBeTrue();
    })

    it("Checks method init [init] - init many", function () {
        let plugins = [
            new SamplePlugin(),
            new SampleMutationPlugin()
        ];
        let manager: ICuiPluginManager = new CuiPluginManager(plugins);
        manager.init(utils);

        expect(plugins[0].setup.initialized).toBeTrue();
        expect(plugins[1].setup.initialized).toBeTrue();
    })

    it("Checks method init [init] - empty list", function () {
        let manager: ICuiPluginManager = new CuiPluginManager([]);
        manager.init(utils);
        let plugin = manager.get('sample')
        expect(plugin).toBeUndefined();
    })

    it("Checks method init [get] - empty string", function () {
        let manager: ICuiPluginManager = new CuiPluginManager([
            new SamplePlugin()
        ]);
        manager.init(utils);
        let plugin = manager.get('')
        expect(plugin).toBeUndefined();
    })

    it("Checks method init [onMutation]", function () {
        let mutationPlugin = new SampleMutationPlugin()
        let manager: ICuiPluginManager = new CuiPluginManager([
            new SamplePlugin(),
            mutationPlugin
        ]);
        manager.init(utils);
        manager.onMutation(null);

        expect(mutationPlugin.setup.initialized).toBeTrue();
        expect(mutationPlugin.setup.mutation).toBeTrue();
    })
})