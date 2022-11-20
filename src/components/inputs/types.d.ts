export type TInput = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  mask?: (value: string) => string;
  register?: any;
  error?: any;
};
