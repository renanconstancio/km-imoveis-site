import { maskCurrency } from "../utils/mask";

export type TPrice = React.HTMLAttributes<HTMLSpanElement> & {
  price: string;
};

export function Price({ price, ...rest }: TPrice) {
  return (
    <span
      className="font-play font-bold text-km-blue text-lg block mb-3"
      {...rest}
    >
      R$: {maskCurrency(price)}
    </span>
  );
}
