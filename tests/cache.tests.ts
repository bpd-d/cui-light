import { ICuiCacheManager, CuiCachable } from "../src/core/models/interfaces"
import { CuiCacheManager } from "../src/app/managers/cache";
import { CacheTestItem } from "./helpers/models";

describe("Tests for class [CuiCacheManager]", function () {
    let manager: ICuiCacheManager;
    let maxSize: number = 10;
    let getItem = (id: number): CacheTestItem => {
        return new CacheTestItem(id);
    }

    beforeEach(() => {
        manager = new CuiCacheManager(maxSize);
    })

    it("Method [get] - proper key", function () {
        let item: CacheTestItem = getItem(0);
        let output: CacheTestItem = null

        manager.put('first', item);
        output = manager.get('first') as CacheTestItem;

        expect(manager.has('first')).toBeTrue();
        expect(output.id).toEqual(item.id);
    })

    it("Method [get] - non-exisiting key", function () {
        let item: CacheTestItem = getItem(0);
        let output: CacheTestItem = null

        manager.put('first', item);
        output = manager.get('key1') as CacheTestItem;

        expect(manager.has('key1')).toBeFalse();
        expect(output).toEqual(null);
    })

    it("Method [get] - inproper key", function () {
        let item: CacheTestItem = getItem(0);
        let output: CacheTestItem = null;
        manager.put('first', item);
        output = manager.get('') as CacheTestItem;
        expect(output).toEqual(null);
    })


    it("Method [put] - add new item", function () {
        let item: CacheTestItem = getItem(0);
        manager.put('first', item);

        expect(manager.has('first'));
    })

    it("Method [put] - update existing item", function () {
        let item: CacheTestItem = getItem(0);
        let item2: CacheTestItem = getItem(1);
        let output: CacheTestItem = null;

        manager.put('first', item);
        manager.put('first', item2);
        output = manager.get('first') as CacheTestItem;

        expect(manager.has('first'));
        expect(output.id).toEqual(item2.id);
    })

    it("Method [remove] - remove existing item", function () {
        let item: CacheTestItem = getItem(0);
        let output: boolean = null;

        manager.put('first', item);
        output = manager.remove('first');

        expect(manager.has('first')).toBeFalse();
        expect(output).toBeTrue();
    })

    it("Method [remove] - non-existing item", function () {
        let item: CacheTestItem = getItem(0);
        let output: boolean = null;

        manager.put('first', item);
        output = manager.remove('second');

        expect(output).toBeFalse();
    })

    it("Method [remove] - remove inproper item", function () {
        let item: CacheTestItem = getItem(0);
        let output: boolean = null;

        manager.put('first', item);
        output = manager.remove('');

        expect(output).toBeFalse();
    })


    it("Method [clear] - clear cache", function () {
        let item: CacheTestItem = getItem(0);
        let output: boolean = null;

        manager.put('first', item);
        manager.clear();

        expect(manager.has('first')).toBeFalse();
    })

    it("Method [put] - max size", function () {

        for (let i = 0; i < 11; i++) {
            manager.put(i.toString(), getItem(i));
        }
        expect(manager.has('0')).toBeFalse();
        expect(manager.has('10')).toBeTrue();
    })
})