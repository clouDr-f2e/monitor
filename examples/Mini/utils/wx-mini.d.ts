import { EActionType } from '@mitojs/types';
import { errorBoundaryReport } from '@mitojs/react';
import { InitOptions } from '@mitojs/types';
import { ITrackBaseParam } from '@mitojs/types';
import { log } from '@mitojs/core';
import { MitoVue } from '@mitojs/vue';
import { TrackReportData } from '@mitojs/types';
export { errorBoundaryReport }

export declare function init(options?: InitOptions): void;
export { log }
export { MitoVue }

export declare function sendTrackData(data: TrackReportData): void;

export declare function track(actionType: EActionType, param: ITrackBaseParam): {
    actionType: EActionType;
    trackId?: string;
    custom?: string | {
        [prop: string]: string | number | boolean;
    };
};

export { }
