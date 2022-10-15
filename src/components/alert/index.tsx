import { useAlert } from "../../hooks/use-alert";

type Props = {
  title?: string;
  message: string;
};

export function Alert({ title, message }: Props) {
  const { changeAlert } = useAlert();

  return (
    <div
      className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-3"
      role="alert"
    >
      {title && <p className="font-bold">{title}</p>}
      <p className="flex justify-between">
        <span>{message}</span>
        <i
          className="fas fa-times text-lg"
          onClick={() => changeAlert({ title: "", message: "" })}
        ></i>
      </p>
    </div>
  );
}
