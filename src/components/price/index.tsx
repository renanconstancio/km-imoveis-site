type Props = {
  price: string;
} & React.HTMLAttributes<HTMLSpanElement>;

export function Price({ price, ...rest }: Props) {
  return (
    <span
      className="font-play font-bold text-sky-500 text-sm block mb-3"
      {...rest}
    >
      R$: {price}
    </span>
  );
}
