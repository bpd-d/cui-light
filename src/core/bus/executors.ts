import { ICuiCallbackExecutor } from "../models/interfaces"
import { is } from "../utils/functions"

export class CuiCallbackExecutor implements ICuiCallbackExecutor {
    async execute(callback: any, args: any[]): Promise<void> {
        args = args ?? []
        // if (is(ctx)) {
        //     callback.apply(ctx, args)
        // } else {
        callback(...args)
        return;
    }
}