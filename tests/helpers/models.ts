import { CuiCachable, CuiContext, ICuiPlugin, ICuiMutiationPlugin } from "../../src/core/models/interfaces";
import { CuiUtils } from "../../src/core/models/utils";

export class CacheTestItem implements CuiCachable {
    id: number;
    constructor(id: number) {
        this.id = id
    }
    refresh(): boolean {
        return true;
    }
}

export class ExecutorTestItem {
    value: boolean;
    constructor() {
        this.value = false;
    }

    setValue(value: boolean) {
        this.value = value;
    }
}

export class ExecutorTestItemExt implements CuiContext {
    value: boolean;
    id: string;
    constructor(id: string) {
        this.value = false;
        this.id = id;
    }

    getId(): string {
        return this.id;
    }

    setValue(value: boolean) {
        this.value = value;
    }
}

export class SamplePlugin implements ICuiPlugin {
    description: string = 'Sample plugin';
    name: string = "sample";
    setup: any;
    constructor() {
        this.setup = {
            initialized: false,
        }
    }
    init(utils: CuiUtils): void {
        this.setup.initialized = true
    }
    destroy(): void {
        //
    }
}

export class SampleMutationPlugin implements ICuiPlugin, ICuiMutiationPlugin {

    description: string = 'Sample plugin';
    name: string = "sample-mutation";
    setup: any;

    constructor() {
        this.setup = {
            initialized: false,
            mutation: false
        }
    }

    init(utils: CuiUtils): void {
        // throw new Error("Method not implemented.");
        this.setup.initialized = true;
    }
    destroy(): void {
        //
    }

    async mutation(record: MutationRecord): Promise<boolean> {
        this.setup.mutation = true;
        return true;
    }
}

export class SampleTask {
    flag: boolean;
    constructor() {
        this.flag = false;
    }

    setFlag(val: boolean) {
        this.flag = val;
    }
}