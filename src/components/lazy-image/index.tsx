import "./styles.css";
import { ImgHTMLAttributes, useEffect, useState } from "react";

type TLazyImage = ImgHTMLAttributes<HTMLImageElement> & {
  placeholder: string;
  src: string;
};

export function LazyImage({ placeholder, src, ...rest }: TLazyImage) {
  const [imgSrc, setImgSrc] = useState(placeholder || src);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
    };
  }, [src]);

  const customClass =
    placeholder && imgSrc === placeholder ? "loading-img" : "loaded-img";

  return (
    <img
      {...{ src: imgSrc, ...rest }}
      alt={rest?.alt || ""}
      className={`${rest.className} ${customClass}`}
    />
  );
}
