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
            backgroundImage: `url(${photos.image_lg})`,
            backgroundPosition: "center bottom",
            backgroundSize: "cover",
          }}
          className="flex flex-row h-[250px] md:h-[450px]"
        ></Link>
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
