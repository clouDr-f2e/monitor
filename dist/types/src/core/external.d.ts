import { Severity } from '../utils/Severity';
interface LogTypes {
    message: string;
    tag?: string;
    level?: Severity;
    ex?: any;
}
export declare function log({ message, tag, level, ex }: LogTypes): void;
export {};
