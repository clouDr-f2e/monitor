import { Severity } from '@mito/utils';
import { TNumStrObj } from '@mito/types';
interface LogTypes {
    message: TNumStrObj;
    tag?: TNumStrObj;
    level?: Severity;
    ex?: Error | any;
}
export declare function log({ message, tag, level, ex }: LogTypes): void;
export {};
