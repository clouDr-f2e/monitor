import { Severity } from '../utils/Severity';
import { TNumStrObj } from '@/types/common';
interface LogTypes {
    message: TNumStrObj;
    tag?: TNumStrObj;
    level?: Severity;
    ex?: Error | any;
}
export declare function log({ message, tag, level, ex }: LogTypes): void;
export {};
