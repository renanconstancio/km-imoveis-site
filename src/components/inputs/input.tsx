type InputProps = {
  label: string;
  labelName?: string;
  invalid?: boolean;
};

export default function Input({
  label,
  labelName,
  invalid,
  ...rest
}: InputProps) {
  return (
    <>
      <label className="label-form" htmlFor={labelName}>
        {label}
      </label>
      <input className={`input-form ${invalid ? "invalid" : ""}`} {...rest} />
    </>
  );
}
