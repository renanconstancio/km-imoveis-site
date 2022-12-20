import { TTitle } from "./types";

export function Title({ title, variant = "text-base", ...rest }: TTitle) {
  return (
    <h2 className={`font-play font-bold ${variant} mt-1 mb-5`} {...rest}>
      {title}
    </h2>
  );
}
