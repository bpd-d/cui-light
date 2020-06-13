import { ICuiCallbackExecutor } from "../models/interfaces"
import { is } from "../utlis/functions"

export class CuiCallbackExecutor implements ICuiCallbackExecutor {
    async execute(callback: any, ctx: any, args: any[]): Promise<void> {
        if (is(ctx)) {
            callback.apply(ctx, args)
        } else {
            callback(...args)
        }
        return
    }
}