export class ParamStore {
    page: Map<string, string>;
    category: Map<string, string>;
    filter: Map<string, string>;
    search: Map<string, string>;
    constructor() {
        this.page = new Map();
        this.category = new Map();
        this.filter = new Map();
    }
    mergeParam() {
        const mergeMap = new Map();
        this.page.forEach((value, key) => {
            mergeMap.set(key, value );
        });
        this.category.forEach((value, key) => {
            mergeMap.set(key, value);
        });
        this.filter.forEach((value, key) => {
            mergeMap.set(key, value );
        });
        return mergeMap;
    }
    mergeSearchParam() {
        const mergeMap = new Map();
        this.page.forEach((value, key) => {
            mergeMap.set(key, value );
        });
        this.search.forEach((value, key) => {
            mergeMap.set(key, value);
        });
        return mergeMap;
    }
}
