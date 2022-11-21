import React from "react";
import { TBanners } from "./types";
import { Carousel } from "react-responsive-carousel";
import { situationText, slugiFy } from "../../utils/functions";
import { Link } from "react-router-dom";

export default function CarouselIndex({ banners }: { banners: TBanners[] }) {
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
              className="flex flex-row h-[250px] md:h-[475px]"
            ></Link>
          ) : (
            <div
              style={{
                backgroundImage: `url(${photo.image_lg})`,
                backgroundPosition: "center bottom",
                backgroundSize: "cover",
              }}
              className="flex flex-row h-[250px] md:h-[475px]"
            ></div>
          )}
        </React.Fragment>
      ))}
    </Carousel>
  );
}
