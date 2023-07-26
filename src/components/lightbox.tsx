import {
  faArrowCircleLeft,
  faArrowCircleRight,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { LightBoxeContext } from "../context/lightbox";

type LightboxReact = {
  images: string[];
  isShow: boolean;
};

export function LightboxReact({ images, isShow }: LightboxReact) {
  const [indexOfImages, setIndexOfImages] = useState(0);

  const { isOpen, closeLightBox } = useContext(LightBoxeContext);

  if (!isOpen) return <></>;

  return (
    <div className="fixed h-full w-full bg-black/50 z-[9999] inset-0 overflow-y-auto flex flex-col justify-center items-center">
      <FontAwesomeIcon
        icon={faClose}
        onClick={closeLightBox}
        className="right-5 top-5 absolute text-3xl cursor-pointer z-10"
      />
      <div className="flex bg-white w-full max-w-5xl rounded-lg p-5 relative">
        <img src={images[indexOfImages]} className="w-full rounded-lg" />
      </div>
      <FontAwesomeIcon
        className="left-5 top-2/4 absolute text-3xl cursor-pointer"
        icon={faArrowCircleLeft}
        onClick={() =>
          setIndexOfImages((indexOfImages + images.length - 1) % images.length)
        }
      />
      <FontAwesomeIcon
        className="right-5 top-2/4 absolute text-3xl cursor-pointer"
        icon={faArrowCircleRight}
        onClick={() =>
          setIndexOfImages((indexOfImages + images.length + 1) % images.length)
        }
      />
    </div>
  );
}
