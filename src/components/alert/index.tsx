import { useEffect } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAlert } from "../../hooks/use-alert";
import { TAlert } from "../../context/alert";

export function Alert({ title, message, variant = "success" }: TAlert) {
  const { changeAlert } = useAlert();

  useEffect(() => {
    setTimeout(() => {
      changeAlert({} as TAlert);
    }, 4500);
  }, []);

  return (
    <div
      className={`${
        variant !== "success"
          ? "border-red-500 text-red-700 bg-red-300/70"
          : "border-green-500 text-green-700 bg-green-300/70"
      } border-l-8 p-4 mb-3 fixed right-4 top-4 z-30`}
      role="alert"
    >
      <div className="flex flex-row items-center">
        <span>
          {title && <p className="font-bold">{title}</p>}
          <p className="pr-5">{message}</p>
        </span>
        <span>
          <FontAwesomeIcon
            icon={faTimes}
            className="text-lg"
            onClick={() => changeAlert({ title: "", message: "" })}
          />
        </span>
      </div>
    </div>
  );
}
