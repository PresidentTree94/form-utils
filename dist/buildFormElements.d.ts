export declare function buildFormElements<T extends object>(form: T, update: (key: keyof T, value: any) => void, schema: Record<string, any>): {
    [k: string]: any;
};
