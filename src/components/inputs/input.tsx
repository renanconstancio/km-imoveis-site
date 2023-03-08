import { TInput } from "./types";

export default function Input({
  label,
  mask = (value: string) => value,
  error,
  register,
  ...rest
}: TInput) {
  return (
    <>
      {label && (
        <label className="label-form">
          {(typeof label === "string" && label) || "Preencha este campo"}
        </label>
      )}
      <input
        {...register}
        onBlur={(e) => (e.target.value = `${mask(e.target.value)}`)}
        {...rest}
      />
      {error && <small className="input-text-invalid">{error.message}</small>}
    </>
  );
}
