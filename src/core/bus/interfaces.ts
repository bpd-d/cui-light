export interface CuiBusExtStatisticsItem {
    name: string;
    emits: number;
    queueNumber: number;
}

export interface CuiBusExtStatistics {
    queueCount: number;
    events: { [name: string]: CuiBusExtStatisticsItem }
}


export interface ICuiEventBusQueueSetup {
    name: string;
    handler: "tasked" | string;
    eventsDef: string[];
    priority: number;
}