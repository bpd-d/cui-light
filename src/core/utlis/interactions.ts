import { IUIInteractionProvider } from "../models/interfaces";

export class FastDom implements IUIInteractionProvider {
    private writes: any[];
    private reads: any[];
    private raf: any;
    private isScheduled: boolean = false;
    #limit: number;

    constructor() {
        this.raf = window.requestAnimationFrame.bind(window)
        this.writes = []
        this.reads = []
        this.#limit = 5;
    }
    mutate(callback: any, ctx: any, ...args: any[]): void {
        this.reads.push(this.createTask(callback, ctx, ...args))
        this.schedule()
    }

    fetch(callback: any, ctx: any, ...args: any[]): void {
        this.writes.push(this.createTask(callback, ctx, ...args))
        this.schedule()
    }

    private createTask(callback: any, ctx: any, ...args: any[]): any {
        return ctx || args ? callback.bind(ctx, ...args) : callback;
    }

    private run(tasks: any[]) {
        let task = null
        while (task = tasks.shift()) {
            task()
        }
    }

    private schedule(recursion?: number) {
        if (!this.isScheduled) {
            this.isScheduled = true;
            if (recursion >= this.#limit) {
                throw new Error("Fast Dom limit reached")
            } else {
                this.raf(this.flush.bind(this, recursion));
            }

        }
    }

    private flush(recursion?: number) {
        let rec: number = recursion ?? 0;
        let error = null;
        let writes = this.writes;
        let reads = this.reads;

        try {
            this.run(reads);
            this.run(writes);
        } catch (e) {
            error = e
            console.error(e)
        }
        this.isScheduled = false;

        if (error) {
            this.schedule(rec + 1)
        }
        if (this.writes.length || this.reads.length) {
            this.schedule(recursion + 1);
        }
    }
}

export class SyncInteractions implements IUIInteractionProvider {
    tasks: any[];
    raf: any;
    isRunning: boolean = false;
    constructor() {
        this.tasks = [];
        this.raf = window.requestAnimationFrame.bind(window)
    }

    mutate(callback: any, ctx: any, ...args: any[]): void {
        this.tasks.push(this.createTask(callback, ctx, ...args))
        this.schedule()
    }

    fetch(callback: any, ctx: any, ...args: any[]): void {
        this.tasks.push(this.createTask(callback, ctx, ...args))
        this.schedule()
    }

    private schedule() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.raf(this.flush.bind(this))
        }
    }

    private flush() {
        let task = null
        while (task = this.tasks.shift()) {
            try {
                task()
            }
            catch (e) {
            }
        }
        this.isRunning = false
    }

    private createTask(callback: any, ctx: any, ...args: any[]): any {
        return ctx || args ? callback.bind(ctx, ...args) : callback;
    }

}