export declare enum Severity {
    Else = "else",
    Error = "error",
    Warning = "warning",
    Info = "info",
    Debug = "debug",
    Low = "low",
    Normal = "normal",
    High = "high",
    Critical = "critical"
}
export declare namespace Severity {
    function fromString(level: string): Severity;
}
