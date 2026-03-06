import { BoundField } from "../core/types";

export function FormField<T, K extends keyof T>({
  field
}: {
  field: BoundField<T, K>;
}) {
  const { label, type = "text", value, setValue, options } = field;

  let input: JSX.Element;

  switch (type) {
    case "select":
      input = (
        <select value={String(value)} onChange={e => setValue(e.target.value as T[K])}>
          {options?.map(opt => 
            <option key={String(opt)} value={String(opt)}>
              {String(opt)}
            </option>
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
    <div className="form-field">
      <label>
        {label}
        {input}
      </label>
    </div>
  );
}
