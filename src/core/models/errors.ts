export class ErrorBase extends Error {
    constructor(name: string, message?: string, ) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
    }
}

export class ItemNotFoundError extends ErrorBase {
    constructor(message?: string) {
        super("ItemNotFoundError", message);
    }
}