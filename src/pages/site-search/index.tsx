import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "../../components/card";
import { parse, stringify } from "query-string";
import { Loading } from "../../components/loading";
import { Pagination } from "../../components/pagination";
import { api, tags } from "../../services/api";
import { TPagination } from "../../global/types";
import { TImmobles } from "../admin-immobiles/types";
import { maskCurrencyUs } from "../../utils/mask";
import { SEO } from "../../components/seo/seo";

export function SiteSearch() {
  const [loading, setLoading] = useState(true);
  const [immobiles, setImmobiles] = useState<TPagination<TImmobles[]>>(
    {} as TPagination<TImmobles[]>,
  );

  const location = useLocation();

  const query = parse(location.search);
  const locationDecodUri = decodeURI(location.search);
  const situation = (query.situation || "") as string;

  const price_lte = (query.price_lte || "") as string;
  const price_gte = (query.price_gte || "") as string;

  const reference = (query.reference || "") as string;
  const district = (query.district || "") as string;
  const category = (query.category || "") as string;

  const city = (query.city || "") as string;
  const limit = (query.limit || "20") as string;
  const page = (query.page || "1") as string;

  async function loadImmobiles() {
    setLoading(true);

    let conveterParse = `page=${page}&limit=${limit}&search[situation]=${situation}&search[category]=${category}&search[reference]=${reference}&search[city]=${city}&search[district]=${district}`;

    if (situation === "location" && price_lte) {
      conveterParse = `${conveterParse}&search[rent_price_lte]=${maskCurrencyUs(
        price_lte,
      )}`;
    }

    if (situation === "location" && price_gte) {
      conveterParse = `${conveterParse}&search[rent_price_gte]=${maskCurrencyUs(
        price_gte,
      )}`;
    }

    if (situation !== "location" && price_lte) {
      conveterParse = `${conveterParse}&search[sale_price_lte]=${maskCurrencyUs(
        price_lte,
      )}`;
    }

    if (situation !== "location" && price_gte) {
      conveterParse = `${conveterParse}&search[sale_price_gte]=${maskCurrencyUs(
        price_gte,
      )}`;
    }

    await api
      .get(
        `/immobiles/website/list?${decodeURI(
          stringify({ ...parse(conveterParse) }),
        )}`,
      )
      .then(async (resp) => setImmobiles(await resp.data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadImmobiles();
  }, [locationDecodUri]);

  return (
    <>
      <SEO
        title={"Pesquisar Imóveis"}
        siteTitle={import.meta.env.VITE_TITLE}
        description={import.meta.env.VITE_DESCRIPTION}
        keywords={import.meta.env.VITE_KEYWORDS}
        image={import.meta.env.VITE_IMAGE}
        robots
      />

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
          <section className="container px-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-5">
            {immobiles?.data?.map((item, k) => (
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
                location={item.tenant_id && true}
              />
            ))}
          </section>
        )}

        {!loading && location.pathname !== "/" && (
          <section className="container px-4 uppercase font-play mt-7">
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
