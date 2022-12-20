import { api, tags } from "../../services/api";
import { parse } from "query-string";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TImmobles } from "../admin-immobiles/types";
import { Loading } from "../../components/loading";
import { SEO } from "../../components/seo/seo";
import { Card } from "../../components/card";
import { Title } from "../../components/title";

type TSiteHome = {
  location?: TImmobles[];
  exchange?: TImmobles[];
  purchase?: TImmobles[];
  sale?: TImmobles[];
  saleLease?: TImmobles[];
  saleBarter?: TImmobles[];
};

export function SiteHome() {
  const [loading, setLoading] = useState(true);
  const [immobiles, setImmobiles] = useState<TSiteHome>();

  const location = useLocation();
  const query = parse(location.search);
  const city = (query.city || "") as string;

  useEffect(() => {
    (async () => {
      setLoading(true);
      await api
        .get(
          `/immobiles/website/list?limit=100&search[city]=${city}&order[random]=true`,
        )
        .then(async (resp) => {
          const respAll = (await resp.data?.data) as TImmobles[] | null;

          setImmobiles({
            location: respAll
              ?.filter((immoble) => immoble.situation === "location")
              .slice(0, 10),
            exchange: respAll
              ?.filter((immoble) => immoble.situation === "exchange")
              .slice(0, 10),
            purchase: respAll
              ?.filter((immoble) => immoble.situation === "purchase")
              .slice(0, 10),
            sale: respAll
              ?.filter((immoble) => immoble.situation === "sale")
              .slice(0, 10),
            saleLease: respAll
              ?.filter((immoble) => immoble.situation === "sale_lease")
              .slice(0, 10),
            saleBarter: respAll
              ?.filter((immoble) => immoble.situation === "sale_barter")
              .slice(0, 10),
          });
        })
        .finally(() => setLoading(false));
    })();
  }, []);

  return (
    <>
      <SEO
        title={""}
        siteTitle={import.meta.env.VITE_TITLE}
        description={import.meta.env.VITE_DESCRIPTION}
        keywords={import.meta.env.VITE_KEYWORDS}
        image={import.meta.env.VITE_IMAGE}
        robots
      />
      <div className="border-b border-gray-200 py-2">
        {loading ? (
          <section className="py-48">
            <Loading />
          </section>
        ) : (
          <>
            {immobiles?.location && immobiles?.location?.length > 0 && (
              <>
                <Title
                  title={`Casas para Alugar`}
                  style={{
                    textAlign: "center",
                    margin: "2em 0 1em 0",
                    textTransform: "uppercase",
                    fontSize: "2em",
                  }}
                />
                <section className="container px-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-5">
                  {immobiles?.location?.map((item, k) => (
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
              </>
            )}

            {immobiles?.sale && immobiles?.sale?.length > 0 && (
              <>
                <Title
                  title={`Casas a Venda`}
                  style={{
                    textAlign: "center",
                    margin: "2em 0 1em 0",
                    textTransform: "uppercase",
                    fontSize: "2em",
                  }}
                />
                <section className="container px-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-5">
                  {immobiles?.sale?.map((item, k) => (
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
              </>
            )}

            {immobiles?.exchange && immobiles?.exchange?.length > 0 && (
              <>
                <Title
                  title={`Casas para Comprar`}
                  style={{
                    textAlign: "center",
                    margin: "2em 0 1em 0",
                    textTransform: "uppercase",
                    fontSize: "2em",
                  }}
                />
                <section className="container px-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-5">
                  {immobiles?.exchange?.map((item, k) => (
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
              </>
            )}

            {immobiles?.saleLease && immobiles?.saleLease?.length > 0 && (
              <>
                <Title
                  title={`Casas para Venda e Locação`}
                  style={{
                    textAlign: "center",
                    margin: "2em 0 1em 0",
                    textTransform: "uppercase",
                    fontSize: "2em",
                  }}
                />
                <section className="container px-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-5">
                  {immobiles?.saleLease?.map((item, k) => (
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
              </>
            )}

            {immobiles?.saleBarter && immobiles?.saleBarter?.length > 0 && (
              <>
                <Title
                  title={`Casas para Venda e Permuta`}
                  style={{
                    textAlign: "center",
                    margin: "2em 0 1em 0",
                    textTransform: "uppercase",
                    fontSize: "2em",
                  }}
                />
                <section className="container px-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-5">
                  {immobiles?.saleBarter?.map((item, k) => (
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
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
