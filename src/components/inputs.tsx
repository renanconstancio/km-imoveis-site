import { ErrorOption, ValidationRule } from "react-hook-form";

export type TInput = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  mask?: (value: string) => string;
  register?: string | ValidationRule<boolean> | undefined;
  error?: ErrorOption;
};

export function Input({
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
        // onChange={(e) => (e.target.value = `${mask(e.target.value)}`)}
        {...register}
        onKeyUp={(e) =>
          (e.currentTarget.value = `${mask(e.currentTarget.value)}`)
        }
        {...rest}
      />
      {error && <small className="input-text-invalid">{error.message}</small>}
    </>
  );
}
