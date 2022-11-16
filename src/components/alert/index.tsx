import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useAlert } from "../../hooks/use-alert";

type Props = {
  title?: string;
  message: string;
};

export function Alert({ title, message }: Props) {
  const { changeAlert } = useAlert();

  useEffect(() => {
    setTimeout(() => {
      changeAlert({} as Props);
    }, 2800);
  }, []);

  return (
    <div
      className="bg-green-100 border-l-8 border-green-500 text-green-700 p-4 mb-3 fixed inset-x-6 top-2"
      role="alert"
    >
      {title && <p className="font-bold">{title}</p>}
      <p className="flex justify-between">
        <span>{message}</span>
        <FontAwesomeIcon
          icon={faTimes}
          className="text-lg"
          onClick={() => changeAlert({ title: "", message: "" })}
        />
      </p>
    </div>
  );
}
