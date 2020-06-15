import { CuiCachable } from "../../src/core/models/interfaces";

export class CacheTestItem implements CuiCachable {
    id: number;
    constructor(id: number) {
        this.id = id
    }
    refresh(): boolean {
        return true;
    }
}