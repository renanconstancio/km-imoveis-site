import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { faExpand } from "@fortawesome/free-solid-svg-icons";

import { Title } from "../../components/title";
import { Address } from "../../components/address";
import { Price } from "../../components/price";
import { Loading } from "../../components/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { situationText, situationTextClassName } from "../../utils/functions";
import { ButtonWhatsapp } from "../../components/button-whatsapp";
import { CardTags } from "../../components/card-tags";
import { CardCarousel } from "../../components/card-carousel";
import { CarouselIcons } from "../../components/carousel";

import { SEO } from "../../components/seo";
import { LightBoxeContext } from "../../context/lightbox";
import { LightboxReact } from "../../components/lightbox";
import { Immobile } from "../admin/immobiles/schema";
import { api, tags } from "../../services/api";

export default function SiteImmoble() {
  const { reference } = useParams<{ reference: string | undefined }>();

  const sort: string[] = [];
  const [photos, setPhotos] = useState<string[]>([]);

  const { isOpen, openLightBox } = useContext(LightBoxeContext);

  const { data: immoble, isLoading: loading } = useQuery<Immobile>({
    queryKey: ["immoble", reference],
    queryFn: () =>
      api.get(`/immobiles/${reference}/reference`).then((res) => res.data),
  });

  let uri = "&order[created_at]=desc&order[tenant_id]=asc";

  if (immoble?.situation) {
    uri = `${uri}&search[situation]=${immoble?.situation}`;
  }

  if (immoble?.district) {
    uri = `${uri}&search[district]=${immoble?.district?.district}`;
  }

  if (immoble?.city) {
    uri = `${uri}&search[city]=${immoble?.city?.city}`;
  }

  const { data: immobiles, isLoading: loadingImmobiles } = useQuery({
    queryKey: ["immobles", reference],
    queryFn: () =>
      api
        .get<{
          data: Immobile[];
        }>(`/immobiles/website/list?limit=20${uri}`)
        .then((res) => res.data),
  });

  let textCondition = "imóvel alugado";
  if (
    immoble?.situation === "sale" ||
    immoble?.situation === "sale_barter" ||
    immoble?.situation === "exchange"
  ) {
    textCondition = "imóvel vendido";
  }

  if (immoble?.situation === "sale_lease") {
    textCondition = "imóvel vendido ou alugado";
  }

  useEffect(() => {
    immoble?.photos?.map((r, k) =>
      sort.push(immoble?.photos?.[k]?.image_lg || ""),
    );
    setPhotos(sort);
  }, [immoble]);

  useEffect(() => {
    if (immoble?.id) {
      window.scrollTo(0, 0);
    }
  }, [immoble]);

  if (loading) {
    return (
      <section className="py-48">
        <Loading />
      </section>
    );
  }

  if (!immoble?.id || immoble?.tenant_id) {
    return (
      <div className="container">
        <div className="divide-y divide-slate-200 p-5 pb-7">
          <div className="bg-white p-5">
            <Title title="Imóvel Indisponível" />
            <p className="py-3">
              Esse imóvel encontra-se Indisponível no momento, veja outras
              opções abaixo
            </p>
            <div className="pt-5 relative">
              {immobiles?.data.length && (
                <CardCarousel id="outhers" mapping={immobiles?.data} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        siteTitle={import.meta.env.VITE_TITLE}
        title={`${immoble?.description} - ${[
          immoble.district?.district || "",
          [immoble.city?.city || "", immoble.city?.state?.state || ""].join(
            "/",
          ),
        ].join(", ")}`}
        description={`${immoble?.description} - ${[
          immoble.district?.district || "",
          [immoble.city?.city || "", immoble.city?.state?.state || ""].join(
            "/",
          ),
        ].join(", ")}`}
        keywords={`${immoble?.description}, ${situationText(
          immoble?.situation,
        )}, ${[
          immoble.district?.district || "",
          [immoble.city?.city || "", immoble.city?.state?.state || ""].join(
            "/",
          ),
          import.meta.env.VITE_TITLE,
        ].join(", ")}`}
        image={immoble.photos?.[0]?.image_lg}
        robots
      />

      <div className="container px-4">
        <ul className="divide-y divide-slate-200 bg-white px-5 pb-7 flex flex-col flex-wrap sm:flex-row overflow-hidden rounded-md shadow-md">
          <li className="w-full pt-6">
            <Title
              title={`${immoble?.description}`}
              variant="sm:text-4xl text-2xl"
            />

            <small>CÓD.: {immoble?.reference}</small>

            <Address
              address={[
                immoble.district?.district ?? "",
                immoble.city?.city ?? "",
                immoble.city?.state?.state ?? "",
              ]}
            />
          </li>

          <li className="pt-0 w-full sm:pt-5 sm:w-8/12 relative -order-1 sm:order-none">
            <ul className="absolute left-0 top-8 h-[auto] w-auto z-[100] font-play text-white text-lg flex gap-2">
              <li
                className={`p-1 ${situationTextClassName(immoble?.situation)}`}
              >
                {immoble?.tenant_id
                  ? textCondition
                  : situationText(immoble?.situation)}
              </li>
            </ul>

            {photos.length && (
              <CarouselIcons images={photos} onClick={openLightBox} />
            )}
          </li>

          <li className="pt-5 w-full mt-5 sm:mt-0 sm:w-4/12 sm:pl-10">
            {Number(immoble?.sale_price) * 1 > 0 && (
              <Price
                price={`${immoble.sale_price}`}
                style={{ fontSize: "32px" }}
              />
            )}

            {Number(immoble?.rent_price) * 1 > 0 && (
              <Price
                price={`${immoble?.rent_price}`}
                style={{ fontSize: "32px" }}
              />
            )}

            <section className="font-[10] capitalize whitespace[-5] flex flex-col flex-wrap gap-3">
              {immoble?.terrain_area && (
                <span>
                  <FontAwesomeIcon icon={faExpand} /> {immoble?.terrain_area}
                </span>
              )}
              {immoble?.building_area && (
                <span>
                  <FontAwesomeIcon icon={faExpand} /> {immoble?.building_area}
                </span>
              )}

              <CardTags cardTag={immoble?.tags || ""} cardTags={tags} />
            </section>
            <section className="flex gap-5 items-center mt-4 mb-5">
              <ButtonWhatsapp
                phone={immoble?.user?.phone || import.meta.env.VITE_PHONE}
                text={`Olá, gostaria de saber mais informações sobre o imóvel ${immoble?.description} | CÓD.: ${immoble?.reference}\nhttps://${window.location.host}`}
              />
            </section>
          </li>

          {immoble?.description_text && (
            <li className="w-full sm:w-8/12 flex flex-col gap-3 p-7">
              <Title title="Descrição do Imóvel" variant="text-2xl" />
              <div
                dangerouslySetInnerHTML={{
                  __html: immoble?.description_text,
                }}
              />
            </li>
          )}

          {immoble?.user?.first_name && (
            <li className="w-full sm:w-8/12 flex flex-col gap-2">
              <Title title="Corretor(a)" variant="text-2xl" />
              {immoble?.user?.first_name && (
                <span>Nome: {immoble?.user?.first_name}</span>
              )}
              {immoble?.user?.phone && (
                <span>Telefone: {immoble?.user?.phone}</span>
              )}
              {immoble?.user?.creci && (
                <span>CRECI: {immoble?.user?.creci}</span>
              )}
            </li>
          )}
        </ul>
      </div>

      {!loadingImmobiles && (
        <section className="container px-4 mt-5">
          <div className="relative">
            <Title
              title={`Veja Outras Opções`}
              style={{
                textAlign: "center",
                margin: "2em 0 1em 0",
                textTransform: "uppercase",
                fontSize: "1.5em",
              }}
            />
            <CardCarousel id="all" mapping={immobiles?.data} />
          </div>
        </section>
      )}

      <LightboxReact images={photos} isShow={isOpen} />
    </>
  );
}
