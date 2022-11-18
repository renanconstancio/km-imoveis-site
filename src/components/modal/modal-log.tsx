import { useModal } from "../../hooks/use-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export type PropsModalLog = {
  log: any;
};

export default function ModalLog({ log }: PropsModalLog) {
  const { open, closeModal } = useModal();

  return (
    <div className={`${open ? "" : "hidden"} modal`}>
      <div className="modal-content max-w-4xl">
        <div className="modal-body">
          <button
            type="button"
            className="modal-close"
            onClick={() => closeModal(!open)}
          >
            <FontAwesomeIcon icon={faTimes} className="text-lg" />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Logs
            </h3>
            <pre className="text-xs">{JSON.stringify(log, null, 1)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
