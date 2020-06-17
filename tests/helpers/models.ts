import { CuiCachable, CuiContext } from "../../src/core/models/interfaces";

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
    getCuid(): string {
        return this.id;
    }

    setValue(value: boolean) {
        this.value = value;
    }
}