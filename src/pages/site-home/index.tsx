import { api, apiListOfHouses } from "../../api/api";
import { useEffect, useState } from "react";
import { CarouselIndex } from "../../components/carousel";
import { Card } from "../../components/card";
import { price } from "../../utils/fun";
import { PropsImmobilePagination } from "../../global/types/types";
import { Filters } from "../../components/filters";

type PropsListOfHouseImage = {
  image: string;
};

type PropsListOfHouse = {
  title: string;
  address: string;
  district: string;
  number: string;
  city: string;
  state: string;
  zip_code: string;
  price: number;
  description?: string;
  tags: string[];
  images: PropsListOfHouseImage[];
};

type PropsStates = {
  id: string;
  state: string;
};

export function SiteHome() {
  const [loading, setLoading] = useState(true);
  const [states, setStates] = useState<PropsStates[]>([]);
  const [immobiles, setImmobiles] = useState<PropsImmobilePagination>();

  useEffect(() => {
    (async () => {
      api.get("/states").then(async res => {
        setStates(await res.data);
      });
    })();
  }, []);

  async function loadImmobiles({ limit, page, q }: { [k: string]: string }) {
    setLoading(true);
    await api
      .get(
        `/immobiles?page=${page}&limit=${limit}&search[reference]=${q}&search[description]=${q}&search[city]=${q}&search[street]=${q}&search[district]=${q}`,
      )
      .then(async resp => setImmobiles(await resp.data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    (async () => {
      loadImmobiles({
        limit: "15",
        page: "1",
        q: "",
      });
    })();
  }, []);

  return (
    <>
      <CarouselIndex />
      <div className="border-b border-gray-200 py-2">
        <Filters states={[]} />

        <div className="container text-2xl uppercase font-play font-bold mb-7">
          {immobiles?.data.length} encotrado(s)
        </div>

        <ul className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {immobiles?.data?.map((item, k) => (
            <Card
              key={k}
              id={item.id}
              title={item.description}
              price={price(item.sale_price)}
              address={[
                item.district?.district,
                `${item.city?.city}/${item.city?.state.state}`,
              ].join(", ")}
              tags={[]}
              images={item?.photos?.map(f => f.image_lg)}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
