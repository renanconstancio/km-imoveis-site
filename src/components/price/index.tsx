import { maskCurrency } from "../../utils/mask";
import { PropsPrice } from "./types";

export function Price({ price, ...rest }: PropsPrice) {
  return (
    <span
      className="font-play font-bold text-km-blue text-sm block mb-3"
      {...rest}
    >
      R$: {maskCurrency(price)}
    </span>
  );
}
