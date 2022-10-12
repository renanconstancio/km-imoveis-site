import { useRouteError } from "react-router-dom";

export function Error() {
  const error: any = useRouteError();

  return (
    <div className="h-screen flex flex-1 flex-col justify-center items-center">
      <h1 className="font-play text-9xl mb-5">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i className="font-play font-bold">
          {error.statusText || error.message}
        </i>
      </p>
    </div>
  );
}
