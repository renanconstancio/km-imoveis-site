type Props = {
  title: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

export function H2Title({ title, ...rest }: Props) {
  return (
    <h2 className="font-play font-bold text-2xl" {...rest}>
      {title}
    </h2>
  );
}
