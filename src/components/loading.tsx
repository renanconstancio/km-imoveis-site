import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Loading() {
  return (
    <div className="h-full flex flex-1 flex-row justify-center items-center">
      <FontAwesomeIcon icon={faSpinner} className="fa-pulse fa-3x" />
    </div>
  );
}
