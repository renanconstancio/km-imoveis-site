import { api, tags } from "../../services/api";
import { parse } from "query-string";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TImmobles } from "../admin-immobiles/types";
import { SEO } from "../../components/seo/seo";
import { Card } from "../../components/card";
import { Title } from "../../components/title";
import { TBanner } from "../../components/carousel/types";
import { CarouselIndex } from "../../components/carousel";
import { Filters } from "../../components/filters";

import banner01 from "../../assets/banners/banner-a.jpg";
import banner02 from "../../assets/banners/banner-b.jpg";
import banner03 from "../../assets/banners/banner-c.jpg";

import banner01Xs from "../../assets/banners/banner-a-xs.jpg";
import banner02Xs from "../../assets/banners/banner-b-xs.jpg";
import banner03Xs from "../../assets/banners/banner-c-xs.jpg";
import { CardSkeleton } from "../../components/card-skeleton";

const bannerFix: TBanner[] = [
  {
    title: "REALIZE O SONHO DA CASA PRÓPRIA",
    description: `<p class="text-center w-1/2">Conquiste o sonho da casa própria, venha fazer uma simulação, aprovação em até 24 horas</p>`,
    photo: {
      image_lg: `${banner01}`,
      image_xs: `${banner01Xs}`,
    },
  },
  {
    title: "FAÇA UMA SIMULAÇÃO",
    description: `<p class="text-center w-1/2">Você sabia que agora você pode fazer sua simulção, tanto para renda formal, quanto para renda informal, entre em contato e saiba mais</p>`,
    photo: {
      image_lg: `${banner02}`,
      image_xs: `${banner02Xs}`,
    },
  },
  {
    title: "SAIA DO ALUGUEL",
    description: `<p class="text-center w-1/2">Com a Km e Negócios Imobiliários, tenha certeza que irá fazer o melhor negócio para você conquistar sua casa própria</p>`,
    photo: {
      image_lg: `${banner03}`,
      image_xs: `${banner03Xs}`,
    },
  },
];

type TSiteHome = {
  location?: TImmobles[];
  exchange?: TImmobles[];
  purchase?: TImmobles[];
  sale?: TImmobles[];
  saleLease?: TImmobles[];
  saleBarter?: TImmobles[];
};

export default function SiteHome() {
  const [loading, setLoading] = useState(true);
  const [immobiles, setImmobiles] = useState<TSiteHome>();
  const [banners, setBanners] = useState<TBanner[]>([]);

  const location = useLocation();
  const query = parse(location.search);
  const city = (query.city || "") as string;

  useEffect(() => {
    setBanners(bannerFix.sort(() => Math.random() - 0.5));
  }, [setBanners]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await api
        .get(
          `/immobiles/website/list?limit=100&search[city]=${city}&order[random]=true&order[created_at]=desc&order[tenant_id]=asc`,
        )
        .then(async (resp) => {
          const respAll = (await resp.data?.data) as TImmobles[] | null;

          setImmobiles({
            location: respAll
              ?.filter((immoble) => immoble.situation === "location")
              .slice(0, 10)
              .sort(() => Math.random() - 0.5),
            exchange: respAll
              ?.filter((immoble) => immoble.situation === "exchange")
              .slice(0, 10)
              .sort(() => Math.random() - 0.5),
            purchase: respAll
              ?.filter((immoble) => immoble.situation === "purchase")
              .slice(0, 10)
              .sort(() => Math.random() - 0.5),
            sale: respAll
              ?.filter((immoble) => immoble.situation === "sale")
              .slice(0, 10)
              .sort(() => Math.random() - 0.5),
            saleLease: respAll
              ?.filter((immoble) => immoble.situation === "sale_lease")
              .slice(0, 10),
            saleBarter: respAll
              ?.filter((immoble) => immoble.situation === "sale_barter")
              .slice(0, 10)
              .sort(() => Math.random() - 0.5),
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
      <div className="border-b border-gray-200">
        <div className="relative">
          <CarouselIndex banners={banners} />
          <section className="container flex flex-wrap justify-between items-center md:-mt-10 relative bg-slate-100 p-5 z-50 rounded-md">
            <Filters variant="row" />
          </section>
        </div>
        {loading ? (
          <section className="m-5 container px-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-5">
            {[0, 1, 2, 3, 4].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </section>
        ) : (
          <>
            {immobiles?.location && immobiles?.location?.length > 0 && (
              <>
                <Title
                  title={`Casas para Locação`}
                  style={{
                    textAlign: "center",
                    margin: "2em 0 1em 0",
                    textTransform: "uppercase",
                    fontSize: "1.5em",
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
                        item.city?.state?.state ?? "",
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
                    fontSize: "1.5em",
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
                    fontSize: "1.5em",
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
                    fontSize: "1.5em",
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
                    fontSize: "1.5em",
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
