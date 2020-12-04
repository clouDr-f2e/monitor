import { Severity } from '../utils/Severity';
interface LogTypes {
    message: string;
    level: Severity;
    ex: any;
    tag: string;
}
export declare function log({ message, tag, level, ex }: LogTypes): void;
export {};
