import { ImgHTMLAttributes } from "react";

type TLazyImage = ImgHTMLAttributes<HTMLImageElement> & {
  placeholder: string;
  src: string;
};
