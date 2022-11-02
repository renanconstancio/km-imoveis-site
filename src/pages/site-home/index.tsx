import { api } from "../../api/api";
import { useEffect, useState } from "react";
import { CarouselIndex } from "../../components/carousel";
import { Card } from "../../components/card";
import { PropsImmobles, PropsPagination } from "../../global/types/types";
import { Filters } from "../../components/filters";
import { useLocation } from "react-router-dom";
import { parse } from "query-string";

export function SiteHome() {
  const [loading, setLoading] = useState(true);
  const [immobiles, setImmobiles] = useState<PropsPagination<PropsImmobles[]>>(
    {} as PropsPagination<PropsImmobles[]>,
  );

  const location = useLocation();
  const query = parse(location.search);

  const reference = (query.reference || "") as string;
  const category = (query.category || "") as string;
  const city = (query.city || "") as string;

  async function loadImmobiles({ limit, page, q }: { [k: string]: any }) {
    setLoading(true);

    let queryString = `/immobiles?page=${page}&limit=${limit}&search[published]=true`;

    if (q?.reference) {
      queryString = `${queryString}&search[reference]=${q.reference}`;
    }

    if (q?.category) {
      queryString = `${queryString}&search[category]=${q.category}`;
    }

    if (q?.city) {
      queryString = `${queryString}&search[city]=${q.city}`;
    }

    await api
      .get(queryString)
      .then(async resp => setImmobiles(await resp.data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    (async () => {
      loadImmobiles({
        limit: "20",
        page: "1",
        q: { reference, city, category },
      });
    })();
  }, [reference, category, city]);

  return (
    <>
      <CarouselIndex />
      <div className="border-b border-gray-200 py-2">
        <Filters />

        <div className="container text-2xl uppercase font-play font-bold mb-7">
          {immobiles?.data?.length} encotrado(s)
        </div>

        <ul className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {immobiles?.data?.map((item, k) => (
            <Card
              key={k}
              id={item.id}
              title={item.description}
              rent_price={item.rent_price}
              sale_price={item.sale_price}
              address={[
                item.district?.district,
                `${item.city?.city}/${item.city?.state.state}`,
              ].join(", ")}
              tags={[]}
              images={item?.photos?.map(f => f.image_xs) || []}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
