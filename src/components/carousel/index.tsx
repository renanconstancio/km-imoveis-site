import "react-responsive-carousel/lib/styles/carousel.css";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

import { PropsBanners } from "../../global/types/types";

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
    <Carousel showArrows={true} dynamicHeight={false} showThumbs={false}>
      {banners.map(({ id, photos }) => (
        <div
          key={id}
          style={{
            height: 430,
            backgroundImage: `url(${photos.image_lg})`,
            backgroundPosition: "center bottom",
            backgroundSize: "cover",
          }}
        ></div>
      ))}
    </Carousel>
  );
}

export function CarouselIcons({ images }: { images: string[] }) {
  return (
    <Carousel
      showArrows={true}
      showIndicators={false}
      dynamicHeight={false}
      showThumbs={false}
      showStatus={false}
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
