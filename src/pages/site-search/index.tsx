import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "../../components/card";
import { PropsImmobles, PropsPagination } from "../../global/types/types";
import { parse, stringify } from "query-string";
import { Loading } from "../../components/loading";
import { Pagination } from "../../components/pagination";
import { api, tags } from "../../services/api";

export function SiteSearch() {
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
        `/immobiles/website/list?${decodeURI(
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
        {!loading && location.pathname !== "/" && (
          <section className="container px-4 uppercase font-play mb-7">
            <div className="flex flex-row bg-white p-4 items-center justify-between">
              <span>{immobiles?.total} encotrado(s)</span>
              <Pagination
                total={immobiles?.total || 0}
                currentPage={Number(`${page || "1"}`)}
                perPage={Number(`${limit || "25"}`)}
                style={{ flex: "0 1 auto" }}
              />
            </div>
          </section>
        )}

        {loading ? (
          <section className="py-48">
            <Loading />
          </section>
        ) : (
          <ul className="container px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {immobiles?.data?.map((item, k) => (
              <li className="relative bg-white overflow-hidden" key={k}>
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
              </li>
            ))}
          </ul>
        )}

        {!loading && location.pathname !== "/" && (
          <section className="container px-4 uppercase font-play mb-7">
            <div className="flex flex-row bg-white p-4 items-center justify-between">
              <span>{immobiles?.total} encotrado(s)</span>
              <Pagination
                total={immobiles?.total || 0}
                currentPage={Number(`${page || "1"}`)}
                perPage={Number(`${limit || "25"}`)}
                style={{ flex: "0 1 auto" }}
              />
            </div>
          </section>
        )}
      </div>
    </>
  );
}
