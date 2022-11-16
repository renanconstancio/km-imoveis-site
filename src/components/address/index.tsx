import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = React.HTMLAttributes<HTMLHeadElement> & {
  address: string[];
};

export function Address({ address }: Props) {
  return (
    <address className="text-sm mb-2">
      {address && (
        <>
          <FontAwesomeIcon icon={faLocationDot} />{" "}
          {address[0] && address[1] && address[2] && `${address[0]} - `}
          {address[0] && !address[1] && !address[2] && address[0]}
          {address[1] && `${address[1]}/`}
          {address[2] && `${address[2]}`}
        </>
      )}
    </address>
  );
}
