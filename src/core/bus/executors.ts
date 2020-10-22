import { ICuiCallbackExecutor } from "../models/interfaces"

export class CuiCallbackExecutor implements ICuiCallbackExecutor {
    async execute(callback: any, args: any[]): Promise<void> {
        args = args ?? []

        callback(...args)
        return;
    }
}