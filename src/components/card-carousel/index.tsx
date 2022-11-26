import { tags } from "../../services/api";
import ReactOwlCarousel, { Options } from "react-owl-carousel";
import { TCardCarousel } from "./types";
import { Card } from "../card";

export function CardCarousel({ mapping, id }: TCardCarousel) {
  const options: Options = {
    nav: true,
    loop: false,
    margin: 16,
    dots: false,
    navText: [
      "<span class='text-6xl absolute top-[48%] -left-5 z-10 cursor-pointer'>‹</span>",
      "<span class='text-6xl absolute top-[48%] -right-5 z-10 cursor-pointer'>›</span>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      767: {
        items: 2,
      },
      768: {
        items: 4,
      },
    },
  };
  return (
    <ReactOwlCarousel id={id} className="owl-theme relative" {...options}>
      {mapping.map((item, k) => (
        <Card
          key={k}
          reference={item.reference}
          situation={item.situation}
          description={item.description}
          buildingArea={item.building_area}
          terrainArea={item.terrain_area}
          rentPrice={item.rent_price}
          salePrice={item.sale_price}
          address={[
            item.district?.district ?? "",
            item.city?.city ?? "",
            item.city?.state.state ?? "",
          ]}
          tag={item.tags || ""}
          tags={tags}
          images={item?.photos?.map((f) => f.image_xs) || []}
        />
      ))}
    </ReactOwlCarousel>
  );
}
