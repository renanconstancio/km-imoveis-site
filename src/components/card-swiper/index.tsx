import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Navigation } from "swiper";
import { PropsImmobles } from "../../global/types/types";
import { Card } from "../../components/card";
import { tags } from "../../services/api";

type PropsCardSwiper = {
  mapping: PropsImmobles[];
  id: string;
};

export function CadSwiper({ mapping, id }: PropsCardSwiper) {
  return (
    <>
      <FontAwesomeIcon
        size={"2x"}
        icon={faChevronLeft}
        className={`${id}-prev hidden sm:inline-block absolute top-1/2 -left-5 z-10 cursor-pointer`}
      />
      <FontAwesomeIcon
        size={"2x"}
        icon={faChevronRight}
        className={`${id}-next hidden sm:inline-block absolute top-1/2 -right-5 z-10 cursor-pointer`}
      />
      <Swiper
        loop={true}
        modules={[Navigation]}
        breakpoints={{
          // when window width is >= 640px
          0: {
            width: 0,
            spaceBetween: 25,
            slidesPerView: 1,
          },
          // when window width is >= 768px
          640: {
            width: 640,
            spaceBetween: 25,
            slidesPerView: 2,
          },

          1024: {
            width: 1024,
            spaceBetween: 25,
            slidesPerView: 4,
          },
        }}
        navigation={{
          nextEl: `.${id}-next`,
          prevEl: `.${id}-prev`,
        }}
      >
        {mapping.map((item, k) => (
          <SwiperSlide key={k}>
            <Card
              reference={item.reference}
              situation={item.situation}
              description={item.description}
              buildingArea={item.building_area}
              terrainArea={item.terrain_area}
              rentPrice={item.rent_price}
              salePrice={item.sale_price}
              address={[
                item.district?.district,
                `${item.city?.city}/${item.city?.state.state}`,
              ].join(", ")}
              tag={item.tags || ""}
              tags={tags}
              images={item?.photos?.map(f => f.image_xs) || []}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
