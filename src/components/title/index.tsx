import { TH2 } from "./types";

export function H2({ title, ...rest }: TH2) {
  return (
    <h2 className="font-play font-bold text-lg md:text-2xl mt-1 mb-5" {...rest}>
      {title}
    </h2>
  );
}
