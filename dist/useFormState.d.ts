export declare function useFormState<T>(initial: T): {
    form: T;
    update: <K extends keyof T>(key: K, value: T[K]) => void;
    patch: (newValues: Partial<T>) => void;
    reset: () => void;
};
