import "react-responsive-carousel/lib/styles/carousel.css";
import { Carousel } from "react-responsive-carousel";
import { PropsBanners } from "../../global/types/types";
import { maskCurrency } from "../../utils/mask";

export function CarouselIndex({ banners }: { banners: PropsBanners[] }) {
  return (
    <Carousel
      interval={4500}
      autoPlay={true}
      infiniteLoop={true}
      showArrows={true}
      dynamicHeight={false}
      showThumbs={false}
      centerSlidePercentage={100}
      width={"100%"}
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
            <h2 className="drop-shadow-md font-play font-bold text-3xl mb-5 text-black">
              {description}
            </h2>
            <small className="drop-shadow-md">CÓD.: {reference}</small>
            <span className="font-play font-bold text-sm block mb-3">
              R$: {maskCurrency(rent_price)}
            </span>
          </div>
        ),
      )}
    </Carousel>
  );
}

export function CarouselIcons({ images }: { images: string[] }) {
  return (
    <Carousel
      infiniteLoop={true}
      autoPlay={true}
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
