import { ErrorOption } from "react-hook-form";

export type TInput = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  mask?: (value: string) => string;
  register?: string | ValidationRule<boolean> | undefined;
  error?: ErrorOption;
};
