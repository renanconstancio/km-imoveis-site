import "react-responsive-carousel/lib/styles/carousel.css";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import { api } from "../../api/api";

import importImage01 from "../../assets/banners/banner-a.jpg";
import importImage02 from "../../assets/banners/banner-b.jpg";
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
        >
          {/* <img src={} className="object-contain" /> */}
        </div>
      ))}

      {/* <div style={{ height: 430 }}>
        <img src={importImage02} />
       <p className="legend">Legend 2</p>
      </div> */}
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
          <img src={image} className="object-cover h-64 w-96" />
        </div>
      ))}
    </Carousel>
  );
}
