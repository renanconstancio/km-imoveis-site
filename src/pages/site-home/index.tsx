import { lazy, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { parse } from "query-string";

import { SEO } from "../../components/seo/seo";
import { TImmobles } from "../admin-immobiles/types";
import { Card } from "../../components/card";
import { Title } from "../../components/title";
import { TBanner } from "../../components/carousel/types";
import { Filters } from "../../components/filters";

import { CardSkeleton } from "../../components/card-skeleton";
import { api, tags } from "../../services/api";

const CarouselIndex = lazy(
  () => import("../../components/carousel/carousel-index"),
);

import banner01 from "../../assets/banners/banner-a.jpg";
import banner02 from "../../assets/banners/banner-b.jpg";
import banner03 from "../../assets/banners/banner-c.jpg";

import banner01Xs from "../../assets/banners/banner-a-xs.jpg";
import banner02Xs from "../../assets/banners/banner-b-xs.jpg";
import banner03Xs from "../../assets/banners/banner-c-xs.jpg";

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

export default function SiteHome() {
  const [banners, setBanners] = useState<TBanner[]>([]);

  const location = useLocation();
  const query = parse(location.search);
  const city = (query.city || "") as string;

  useEffect(() => {
    setBanners(bannerFix.sort(() => Math.random() - 0.5));
  }, [setBanners]);

  const { data: dataLocation, isLoading: locationLoading } = useQuery({
    queryKey: ["site-location"],
    queryFn: () =>
      api
        .get<{ data: TImmobles[] }>(
          `/immobiles/website/list?limit=10&search[city]=${city}&order[created_at]=desc&order[tenant_id]=asc&search[situation]=location`,
        )
        .then(async (res) => res.data),
  });

  const { data: dataSale, isLoading: saleLoading } = useQuery({
    queryKey: ["site-sale"],
    queryFn: () =>
      api
        .get<{ data: TImmobles[] }>(
          `/immobiles/website/list?limit=10&search[city]=${city}&order[created_at]=desc&order[tenant_id]=asc&search[situation]=sale`,
        )
        .then((res) => res.data),
  });

  const { data: dataExchange, isLoading: exchangeLoading } = useQuery({
    queryKey: ["site-exchange"],
    queryFn: () =>
      api
        .get<{ data: TImmobles[] }>(
          `/immobiles/website/list?limit=10&search[city]=${city}&order[created_at]=desc&order[tenant_id]=asc&search[situation]=exchange`,
        )
        .then((res) => res.data),
  });

  const { data: dataSaleLease, isLoading: saleLeaseLoading } = useQuery({
    queryKey: ["site-sale-lease"],
    queryFn: () =>
      api
        .get<{ data: TImmobles[] }>(
          `/immobiles/website/list?limit=10&search[city]=${city}&order[created_at]=desc&order[tenant_id]=asc&search[situation]=sale_lease`,
        )
        .then((res) => res.data),
  });

  const { data: dataSaleBarter, isLoading: saleBarterLoading } = useQuery({
    queryKey: ["site-sale-barter"],
    queryFn: () =>
      api
        .get<{ data: TImmobles[] }>(
          `/immobiles/website/list?limit=10&search[city]=${city}&order[created_at]=desc&order[tenant_id]=asc&search[situation]=sale_barter`,
        )
        .then((res) => res.data),
  });

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

      <CarouselIndex banners={banners} />

      <Filters variant="row" />

      {dataLocation?.data.length ? (
        <Title
          title={`Casas para Locação`}
          style={{
            textAlign: "center",
            margin: "2em 0 1em 0",
            textTransform: "uppercase",
            fontSize: "1.5em",
          }}
        />
      ) : null}

      <section className="container px-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-5">
        {locationLoading &&
          [0, 1, 2, 3, 4].map((i) => <CardSkeleton key={i} />)}

        {!locationLoading &&
          dataLocation?.data
            .sort(() => Math.random() - 0.5)
            .map((item, k) => (
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

      {!saleLoading && dataSale?.data.length ? (
        <Title
          title={`Casas a Venda`}
          style={{
            textAlign: "center",
            margin: "2em 0 1em 0",
            textTransform: "uppercase",
            fontSize: "1.5em",
          }}
        />
      ) : null}
      <section className="container px-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-5">
        {saleLoading && [0, 1, 2, 3, 4].map((i) => <CardSkeleton key={i} />)}

        {!saleLoading &&
          dataSale?.data
            .sort(() => Math.random() - 0.5)
            .map((item, k) => (
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

      {!exchangeLoading && dataExchange?.data.length ? (
        <Title
          title={`Casas para Comprar`}
          style={{
            textAlign: "center",
            margin: "2em 0 1em 0",
            textTransform: "uppercase",
            fontSize: "1.5em",
          }}
        />
      ) : null}

      <section className="container px-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-5">
        {exchangeLoading &&
          [0, 1, 2, 3, 4].map((i) => <CardSkeleton key={i} />)}

        {!exchangeLoading &&
          dataExchange?.data
            .sort(() => Math.random() - 0.5)
            .map((item, k) => (
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

      {!saleLeaseLoading && dataSaleLease?.data.length ? (
        <Title
          title={`CASAS PARA VENDA E LOCAÇÃO`}
          style={{
            textAlign: "center",
            margin: "2em 0 1em 0",
            textTransform: "uppercase",
            fontSize: "1.5em",
          }}
        />
      ) : null}

      <section className="container px-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-5">
        {saleLeaseLoading &&
          [0, 1, 2, 3, 4].map((i) => <CardSkeleton key={i} />)}

        {!saleLeaseLoading &&
          dataSaleLease?.data
            .sort(() => Math.random() - 0.5)
            .map((item, k) => (
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

      {!saleBarterLoading && dataSaleBarter?.data.length ? (
        <Title
          title={`CASAS PARA VENDA E PERMUTA`}
          style={{
            textAlign: "center",
            margin: "2em 0 1em 0",
            textTransform: "uppercase",
            fontSize: "1.5em",
          }}
        />
      ) : null}
      <section className="container px-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-5">
        {saleBarterLoading &&
          [0, 1, 2, 3, 4].map((i) => <CardSkeleton key={i} />)}

        {!saleBarterLoading &&
          dataSaleBarter?.data
            .sort(() => Math.random() - 0.5)
            .map((item, k) => (
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
  );
}
