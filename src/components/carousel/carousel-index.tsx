import React from "react";
import { TCarousel } from "./types";
import ReactOwlCarousel, { Options } from "react-owl-carousel";
import { situationText, slugiFy } from "../../utils/functions";
import { Link } from "react-router-dom";

export default function CarouselIndex({ banners }: { banners: TCarousel[] }) {
  const options: Options = {
    nav: false,
    loop: true,
    margin: 5,
    items: 1,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    center: true,
    dotClass: "owl-dot owl-dot-personalized",
    dotsClass: "owl-dots absolute bottom-3 inset-x-0",
    responsive: {
      0: {
        items: 1,
      },
    },
  };

  return (
    <ReactOwlCarousel className="owl-theme" {...options}>
      {banners.map(({ photo, reference, description, situation }, id) => (
        <React.Fragment key={id}>
          {reference ? (
            <Link
              to={`/${slugiFy(
                `${situationText(situation)}`,
              )}/imovel/${reference}/${slugiFy(`${description}`)}`}
              style={{
                backgroundImage: `url(${photo.image_lg})`,
                backgroundPosition: "center bottom",
                backgroundSize: "cover",
              }}
              className="item h-[265px] md:h-[475px]"
            ></Link>
          ) : (
            <div
              style={{
                backgroundImage: `url(${photo.image_lg})`,
                backgroundPosition: "center bottom",
                backgroundSize: "cover",
              }}
              className="item h-[265px] md:h-[475px]"
            ></div>
          )}
        </React.Fragment>
      ))}
    </ReactOwlCarousel>
  );
}
