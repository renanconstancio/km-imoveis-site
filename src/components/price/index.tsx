import { maskCurrency } from "../../utils/mask";

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  price: string;
};

export function Price({ price, ...rest }: Props) {
  return (
    <span
      className="font-play font-bold text-km-blue text-sm block mb-3"
      {...rest}
    >
      R$: {maskCurrency(price)}
    </span>
  );
}
