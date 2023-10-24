import "./carousel-index.css";
import { lazy } from "react";
import { TBanner } from "./types";
import { Options } from "react-owl-carousel";
import bgPixel from "../../assets/bg-black-pixel.png";

const OwlCarousel = lazy(() => import("react-owl-carousel"));

export default function CarouselIndex({ banners }: { banners: TBanner[] }) {
  const options: Options = {
    nav: false,
    loop: true,
    margin: 5,
    items: 1,
    dots: false,
    autoplay: true,
    autoplayTimeout: 7000,
    center: true,
    dotClass: "owl-dot owl-dot-personalized",
    dotsClass: "owl-dots absolute bottom-3 inset-x-0",
    animateOut: "fadeOut",
    responsive: {
      0: {
        items: 1,
      },
    },
  };

  return (
    <OwlCarousel className="owl-theme mb-0" {...options}>
      {banners.map(({ photo, title, description, link }, id) => (
        <div key={id}>
          <picture>
            <source srcSet={photo.image_lg} media="(min-width: 600px)" />
            <img src={photo.image_xs} alt="banner" />
          </picture>
          <div
            style={{
              backgroundImage: `url(${bgPixel})`,
            }}
            className="carousel-index item"
          >
            {/* <h3>{title}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: `${description}`,
              }}
            /> */}
          </div>
        </div>
      ))}
    </OwlCarousel>
  );
}
