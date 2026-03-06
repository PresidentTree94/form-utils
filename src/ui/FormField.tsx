import { BoundField } from "../core/types";

export function FormField<T, K extends keyof T>({
  field, className = "form-field"
}: {
  field: BoundField<T, K>;
  className?: string;
}) {
  const { label, type = "text", value, setValue, options } = field;

  let input: JSX.Element;

  switch (type) {
    case "select":
      input = (
        <select value={String(value)} onChange={e => setValue(e.target.value as T[K])}>
          {options?.map(opt => 
            <option key={String(opt)} value={String(opt)}>{String(opt)}</option>
          )}
        </select>
      );
      break;
    case "number":
      input = (
        <input type="number" value={Number(value)} onChange={e => setValue(Number(e.target.value) as T[K])} />
      );
      break;
    default:
      input = (
        <input type={type} value={String(value)} onChange={e => setValue(e.target.value as T[K])} />
      );
  }
  return (
    <div className={`${className || ""}`}>
      <label>{label}</label>
      {input}
    </div>
  );
}
