type Props = {
  address: string;
} & React.HTMLAttributes<HTMLHeadElement>;

export function Address({ address }: Props) {
  return (
    <address className="text-sm mb-2">
      <i className="fas fa-map-marker-alt"></i> {address}
    </address>
  );
}
