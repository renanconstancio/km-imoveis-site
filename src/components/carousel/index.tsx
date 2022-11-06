import "react-responsive-carousel/lib/styles/carousel.css";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

import { PropsBanners } from "../../global/types/types";
import { H2 } from "../title";
import { Price } from "../price";
import { maskCurrency } from "../../utils/mask";

export function CarouselIndex() {
  const [banners, setBanners] = useState<PropsBanners[]>([]);

  useEffect(() => {
    (async () => {
      await api
        .get("/immobiles/sort/banner")
        .then(async resp => setBanners(await resp.data));
    })();
  }, []);

  return (
    <Carousel
      showArrows={true}
      dynamicHeight={false}
      showThumbs={false}
      autoPlay={true}
    >
      {banners.map(
        ({ id, photos, reference, description, rent_price, sale_price }) => (
          <div
            key={id}
            style={{
              height: 430,
              backgroundImage: `url(${photos.image_lg})`,
              backgroundPosition: "center bottom",
              backgroundSize: "cover",
            }}
            className="flex flex-col justify-end items-start p-7 "
          >
            <h2 className="drop-shadow-md font-play font-bold text-3xl mb-5 text-km-blue">
              {description}
            </h2>
            <small className="drop-shadow-md">CÓD.: {reference}</small>
            {/* <span className="font-play font-bold text-sm block mb-3">
              R$: {maskCurrency(rent_price)}
            </span> */}
          </div>
        ),
      )}
    </Carousel>
  );
}

export function CarouselIcons({ images }: { images: string[] }) {
  return (
    <Carousel
      showArrows={true}
      showIndicators={false}
      dynamicHeight={false}
      showThumbs={true}
      showStatus={true}
      centerSlidePercentage={100}
      width={"100%"}
    >
      {images.map(image => (
        <div key={image}>
          <img src={image} className="w-full" />
        </div>
      ))}
    </Carousel>
  );
}
