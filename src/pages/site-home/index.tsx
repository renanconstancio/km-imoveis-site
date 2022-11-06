import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { CarouselIndex } from "../../components/carousel";
import { Card } from "../../components/card";
import { PropsImmobles, PropsPagination } from "../../global/types/types";
import { Filters } from "../../components/filters";
import { useLocation } from "react-router-dom";
import { parse, stringify } from "query-string";
import { Loading } from "../../components/loading";

export function SiteHome() {
  const [loading, setLoading] = useState(true);
  const [immobiles, setImmobiles] = useState<PropsPagination<PropsImmobles[]>>(
    {} as PropsPagination<PropsImmobles[]>,
  );

  const location = useLocation();
  const query = parse(location.search);
  const locationDecodURI = decodeURI(location.search);
  const reference = (query.reference || "") as string;
  const district = (query.district || "") as string;
  const category = (query.category || "") as string;
  const city = (query.city || "") as string;
  const limit = (query.limit || "25") as string;
  const page = (query.page || "1") as string;

  async function loadImmobiles() {
    const conveterParse = parse(
      `page=${page}&limit=${limit}&search[reference]=${reference}&search[city]=${city}&search[district]=${district}`,
    );

    setLoading(true);
    await api
      .get(`/immobiles?${decodeURI(stringify({ ...query, ...conveterParse }))}`)
      .then(async resp => setImmobiles(await resp.data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    (async () => {
      loadImmobiles();
    })();
  }, [locationDecodURI]);

  console.log(location.pathname);

  return (
    <>
      {location.pathname === "/" && (
        <div className="bg-slate-100">
          <section className="container px-4 flex flex-wrap items-center">
            <div className="flex-initial w-full md:w-1/3 order-last mt-4 md:mt-0 md:order-first">
              <Filters />
            </div>
            <div className="flex-initial w-full md:w-2/3">
              <CarouselIndex />
            </div>
          </section>
        </div>
      )}

      {location.pathname !== "/" && (
        <div className="bg-slate-100 -mt-2 mb-5">
          <section className="container flex flex-1 flex-end p-5 ">
            <Filters variant="row" />
          </section>
        </div>
      )}

      <div className="border-b border-gray-200 py-2">
        <div className="container px-4 text-2xl uppercase font-play font-bold mb-7">
          {immobiles?.data?.length} encotrado(s)
        </div>

        {loading ? (
          <Loading />
        ) : (
          <ul className="container px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
        )}
      </div>
    </>
  );
}
