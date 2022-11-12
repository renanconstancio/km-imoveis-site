import "react-responsive-carousel/lib/styles/carousel.css";
import { Carousel } from "react-responsive-carousel";
import { PropsBanners } from "../../global/types/types";
import { situationText, slugiFy } from "../../utils/functions";
import { Link } from "react-router-dom";

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
      {banners.map(({ id, photos, reference, description, situation }) => (
        <Link
          to={`/${slugiFy(
            `${situationText(situation)}`,
          )}/imovel/${reference}/${slugiFy(`${description}`)}`}
          key={id}
          style={{
            height: 430,
            backgroundImage: `url(${photos.image_lg})`,
            backgroundPosition: "center bottom",
            backgroundSize: "cover",
          }}
          className="flex flex-row justify-start items-end px-7"
        >
          {/* <section className="text-start">
              <h2
                className={`font-play font-bold text-3xl mb-1 text-gray-700 ${situationTextClassName(
                  situation,
                )}`}
                style={{
                  textShadow:
                    "1px 1px 2px white, 0 0 1em black, 0 0 0.2em white",
                }}
              >
                {description}
              </h2>
              <small className="text-shadow[1px 1px 2px black]">
                CÓD.: {reference}
              </small>
              <span className="font-play font-bold text-sm block mb-3">
                R$: {maskCurrency(rent_price ?? sale_price)}
              </span>
            </section> */}
        </Link>
      ))}
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
