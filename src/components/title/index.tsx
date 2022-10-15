type Props = React.HTMLAttributes<HTMLHeadElement> & {
  title: string;
};

export function H2({ title, ...rest }: Props) {
  return (
    <h2 className="font-play font-bold text-2xl mt-3 mb-5" {...rest}>
      {title}
    </h2>
  );
}
