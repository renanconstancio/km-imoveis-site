import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropsAddress } from "./types";

export function Address({ address }: PropsAddress) {
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
