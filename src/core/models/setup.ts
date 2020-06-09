import { CuiLogLevel, CuiInteractionsType } from "../utlis/types";
import { CuiColorSet } from "./color";

export class CuiSetup {
    prefix?: string;
    app?: string;
    logLevel?: CuiLogLevel;
    interaction?: CuiInteractionsType;
    animationTime?: number;
    animationTimeShort?: number;
    animationTimeLong?: number;
    colorLight?: CuiColorSet;
    colorDark?: CuiColorSet;
    colorAccent?: CuiColorSet;
    colorSecondary?: CuiColorSet;
    colorSuccess?: CuiColorSet;
    colorError?: CuiColorSet;
    colorWarning?: CuiColorSet;
}