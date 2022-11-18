import { PropsH2 } from "./types";

export function H2({ title, ...rest }: PropsH2) {
  return (
    <h2 className="font-play font-bold text-2xl mt-3 mb-5" {...rest}>
      {title}
    </h2>
  );
}
