export type FieldConfig = {
    label: string;
    type?: string;
    options?: string[];
    [key: string]: unknown;
};
export type Schema<T> = {
    [K in keyof T]: FieldConfig;
};
export type BoundField<T, K extends keyof T> = FieldConfig & {
    value: T[K];
    setValue: (value: T[K] extends string ? string : T[K]) => void;
};
