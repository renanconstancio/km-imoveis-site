import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Loading() {
  return (
    <div className="h-full flex flex-1 flex-row justify-center items-center">
      <FontAwesomeIcon icon={faSpinner} className="fa-spin fa-2x" />
    </div>
  );
}

export function LoadingFull() {
  return (
    <div className="h-screen flex flex-1 flex-row justify-center items-center">
      <FontAwesomeIcon icon={faSpinner} className="fa-spin fa-2x" />
    </div>
  );
}
