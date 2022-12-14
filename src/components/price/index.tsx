import { maskCurrency } from "../../utils/mask";
import { TPrice } from "./types";

export function Price({ price, ...rest }: TPrice) {
  return (
    <span
      className="font-play font-bold text-km-blue text-sm block mb-3"
      {...rest}
    >
      R$: {maskCurrency(price)}
    </span>
  );
}
