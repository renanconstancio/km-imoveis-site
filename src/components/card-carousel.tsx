import ReactOwlCarousel, { Options } from "react-owl-carousel";
import { tags } from "../services/api";
import { Card } from "./card";
import { Immobile } from "../pages/admin/immobiles/schema";

const options: Options = {
  nav: true,
  loop: false,
  margin: 16,
  dots: false,
  navText: [
    "<span class='text-6xl absolute top-1/2 leading-6 rounded w-10 h-10 bg-gray-400 -left-2 sm:-left-5 z-10 cursor-pointer'>‹</span>",
    "<span class='text-6xl absolute top-1/2 leading-6 rounded w-10 h-10 bg-gray-400 -right-2 sm:-right-5 z-10 cursor-pointer'>›</span>",
  ],
  responsive: {
    0: {
      items: 2,
    },
    767: {
      items: 4,
    },
    768: {
      items: 5,
    },
  },
};

export type TCardCarousel = {
  mapping?: Immobile[];
  id: string;
};

export function CardCarousel({ mapping, id }: TCardCarousel) {
  return (
    <ReactOwlCarousel id={id} className="owl-theme relative" {...options}>
      {mapping?.map((item, k) => (
        <Card
          key={k}
          reference={item.reference}
          situation={item.situation}
          description={item.description}
          buildingArea={`${item.building_area}`}
          terrainArea={`${item.terrain_area}`}
          rentPrice={`${item.rent_price}`}
          salePrice={`${item.sale_price}`}
          address={[
            item.district?.district ?? "",
            item.city?.city ?? "",
            item.city?.state?.state ?? "",
          ]}
          tag={item.tags || ""}
          tags={tags}
          images={item?.photos?.map((f) => f.image_xs) || []}
          location={(item.tenant_id && true) as boolean}
        />
      ))}
    </ReactOwlCarousel>
  );
}
