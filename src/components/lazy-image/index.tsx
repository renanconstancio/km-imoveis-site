import "./styles.css";
import { useEffect, useState } from "react";
import type { TLazyImage } from "./types";

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
      className={`w-full ${rest.className} ${customClass}`}
    />
  );
}
