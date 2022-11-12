import { api, tags } from "../../services/api";
import { useEffect, useState } from "react";
import { CarouselIndex } from "../../components/carousel";
import { Card } from "../../components/card";
import {
  PropsBanners,
  PropsImmobles,
  PropsPagination,
} from "../../global/types/types";
import { useLocation } from "react-router-dom";
import { parse, stringify } from "query-string";
import { Loading } from "../../components/loading";
import { Pagination } from "../../components/pagination";

export function SiteHome() {
  const [loading, setLoading] = useState(true);
  const [immobiles, setImmobiles] = useState<PropsPagination<PropsImmobles[]>>(
    {} as PropsPagination<PropsImmobles[]>,
  );

  const location = useLocation();

  const query = parse(location.search);
  const locationDecodUri = decodeURI(location.search);
  const situation = (query.situation || "") as string;
  const reference = (query.reference || "") as string;
  const district = (query.district || "") as string;
  const category = (query.category || "") as string;
  const city = (query.city || "") as string;
  const limit = (query.limit || "20") as string;
  const page = (query.page || "1") as string;

  async function loadImmobiles() {
    setLoading(true);

    const conveterParse = parse(
      `page=${page}&limit=${limit}&search[situation]=${situation}&search[category]=${category}&search[reference]=${reference}&search[city]=${city}&search[district]=${district}`,
    );

    await api
      .get(
        `/immobiles/list/all?${decodeURI(
          stringify({ ...query, ...conveterParse }),
        )}`,
      )
      .then(async resp => setImmobiles(await resp.data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadImmobiles();
  }, [locationDecodUri]);

  return (
    <>
      <div className="border-b border-gray-200 py-2">
        <section className="container px-4 uppercase font-play font-bold mb-7">
          {immobiles?.total} encotrado(s)
        </section>

        {!loading && location.pathname !== "/" && (
          <section className="container px-4 uppercase font-play font-bold mb-7">
            <Pagination
              total={immobiles?.total || 0}
              currentPage={Number(`${page || "1"}`)}
              perPage={Number(`${limit || "25"}`)}
            />
          </section>
        )}

        {loading ? (
          <section className="py-28">
            <Loading />
          </section>
        ) : (
          <ul className="container px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {immobiles?.data?.map((item, k) => (
              <Card
                key={k}
                id={item.reference}
                reference={item.reference}
                situation={item.situation}
                description={item.description}
                buildingArea={item.building_area}
                terrainArea={item.terrain_area}
                rentPrice={item.rent_price}
                salePrice={item.sale_price}
                city={item.city}
                address={[
                  item.district?.district,
                  `${item.city?.city}/${item.city?.state.state}`,
                ].join(", ")}
                tag={item.tags || ""}
                tags={tags}
                images={item?.photos?.map(f => f.image_xs) || []}
              />
            ))}
          </ul>
        )}

        {!loading && location.pathname !== "/" && (
          <section className="container px-4 uppercase font-play font-bold mt-7 mb-7">
            <Pagination
              total={immobiles?.total || 0}
              currentPage={Number(`${page || "1"}`)}
              perPage={Number(`${limit || "25"}`)}
            />
          </section>
        )}
      </div>
    </>
  );
}
