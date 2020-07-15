export class ErrorBase extends Error {
    constructor(name: string, message?: string,) {
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

export class ArgumentError extends ErrorBase {
    constructor(message?: string) {
        super("ArgumentError", message);
    }
}

export class CuiBusError extends ErrorBase {
    constructor(message?: string) {
        super("ArgumentError", message);
    }
}

export class CuiInstanceInitError extends ErrorBase {
    constructor(message?: string) {
        super("CuiInstanceInitError", message);
    }
}

export class CuiScrollSpyOutOfRangeError extends ErrorBase {
    constructor(message?: string) {
        super("CuiScrollSpyOutOfRangeError", message);
    }
}


export class RegisterElementError extends ErrorBase {
    constructor(message?: string) {
        super("RegisterElementError", message);
    }
}
