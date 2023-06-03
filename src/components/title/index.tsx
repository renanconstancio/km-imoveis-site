import { TTitle } from "./types";

export function Title({
  title,
  variant = "text-base",
  mb = "mb-4",
  mt = "mt-1",
  ...rest
}: TTitle) {
  return (
    <h2 className={`font-play font-bold ${variant} ${mb} ${mt}`} {...rest}>
      {title}
    </h2>
  );
}
