import { BoundField } from "../core/types";

export function FormField<T, K extends keyof T>({
  field, labelClassName, inputClassName
}: {
  field: BoundField<T, K>;
  labelClassName?: string;
  inputClassName?: string;
}) {
  const { label, type, value, setValue, options } = field;

  let input: JSX.Element;

  switch (type) {
    case "single-select":
    case "multi-select":
      input = (
        <select {...(type === "single-select" ? {} : {multiple: true})} className={inputClassName} value={String(value)} onChange={e => setValue(e.target.value as T[K])}>
          {options?.map(opt => 
            <option key={String(opt)} value={String(opt)}>{String(opt)}</option>
          )}
        </select>
      );
      break;
    case "number":
      input = (
        <input type="number" className={inputClassName} value={Number(value)} onChange={e => setValue(Number(e.target.value) as T[K])} />
      );
      break;
    default:
      input = (
        <input type={type} className={inputClassName} value={String(value)} onChange={e => setValue(e.target.value as T[K])} />
      );
  }
  return (
    <>
      <label className={labelClassName}>{label}</label>
      {input}
    </>
  );
}
