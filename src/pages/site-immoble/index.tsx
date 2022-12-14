import { api, tags } from "../../services/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { H2 } from "../../components/title";
import { Address } from "../../components/address";
import { Price } from "../../components/price";
import { Loading } from "../../components/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import { situationText, situationTextClassName } from "../../utils/functions";
import { ButtonWhatsapp } from "../../components/button-whatsapp";
import { CardTags } from "../../components/card-tags";
import { TImmobles } from "../admin-immobiles/types";
import { CardCarousel } from "../../components/card-carousel";
import { CarouselIcons } from "../../components/carousel";

export function SiteImmoble() {
  const [loading, setLoading] = useState(true);
  const [immobiles, setImmobiles] = useState<TImmobles[]>([]);
  const [immoble, setImmoble] = useState<TImmobles>({} as TImmobles);
  const [photos, setPhotos] = useState<string[]>([]);
  const sort: string[] = [];

  const { reference } = useParams<{ reference: string | undefined }>();

  async function loadImmoble(reference: string) {
    setLoading(true);
    await api
      .get(`/immobiles/${reference}/reference`)
      .then(async (resp) => setImmoble(await resp.data))
      .finally(() => setLoading(false));
  }

  async function loadImmobles() {
    let uri = "";

    if (immoble?.situation) {
      uri = `${uri}&search[situation]=${immoble?.situation}`;
    }

    if (immoble?.city) {
      uri = `${uri}&search[city]=${immoble?.city?.city}`;
    }

    await api
      .get(`/immobiles/website/list?limit=20&order[random]=true${uri}`)
      .then(async (resp) => setImmobiles(await resp.data?.data));
  }

  useEffect(() => {
    if (reference) loadImmoble(reference);
  }, [reference]);

  useEffect(() => {
    immoble?.photos?.map((r, k) =>
      sort.push(immoble?.photos?.[k]?.image_lg || ""),
    );
    setPhotos(sort);
  }, [immoble]);

  useEffect(() => {
    if (immoble.id) loadImmobles();
  }, [immoble]);

  if (!immoble.id)
    return (
      <div className="container">
        <div className="divide-y divide-slate-200 bg-white mx-4 sm:mx-0 p-5 pb-7">
          <H2 title="Im??vel Indispon??vel" />
          <p className="py-3">
            Esse im??vel encontra-se Indispon??vel no momento, veja outras op????es
            abaixo
          </p>
          <div className="pt-5 relative">
            <CardCarousel id="all" mapping={immobiles} />
          </div>
        </div>
      </div>
    );

  return (
    <div className="border-b border-gray-200 py-2">
      {loading ? (
        <section className="py-48">
          <Loading />
        </section>
      ) : (
        <>
          {immoble?.description && (
            <Helmet>
              <title>
                {`${immoble?.description} - ${import.meta.env.VITE_TITLE}`}
              </title>

              <meta
                name="description"
                content={`${immoble?.description} C??d.: ${immoble?.reference}`}
              />
              <meta
                name="keywords"
                content={`${immoble?.description}, ${situationText(
                  immoble?.situation,
                )}, ${[
                  immoble.district?.district,
                  `${immoble.city?.city}/${immoble.city?.state.state}`,
                ].join(", ")}`}
              />
              <meta property="og:url" content={window.location.href} />
              <meta
                property="og:title"
                content={`${immoble?.description} - ${
                  import.meta.env.VITE_TITLE
                }`}
              />
              <meta
                property="og:description"
                content={`${immoble?.description} C??d.: ${immoble?.reference}`}
              />
              <meta
                property="og:image"
                content={immoble.photos?.[0]?.image_xs}
              />
              <link rel="canonical" href={window.location.href} />
            </Helmet>
          )}

          <div className="container">
            <ul className="divide-y divide-slate-200 bg-white mx-4 sm:mx-0 px-5 pb-7 flex flex-col flex-wrap sm:flex-row">
              <li className="w-full">
                <H2 title={`${immoble?.description}`} />

                <small>C??D.: {immoble?.reference}</small>

                <Address
                  address={[
                    immoble.district?.district ?? "",
                    immoble.city?.city ?? "",
                    immoble.city?.state.state ?? "",
                  ]}
                />
              </li>
              <li className="pt-5 w-full sm:w-8/12 relative">
                <ul className="absolute left-0 top-8 h-[auto] w-auto z-[9999] font-play text-white text-lg flex gap-2">
                  <li
                    className={`p-1 ${situationTextClassName(
                      immoble?.situation,
                    )}`}
                  >
                    {situationText(immoble?.situation)}
                  </li>
                </ul>

                {photos.length && <CarouselIcons images={photos} />}
              </li>
              <li className="pt-5 w-full mt-5 sm:mt-0 sm:w-4/12 sm:pl-10">
                {Number(immoble?.sale_price) * 1 > 0 && (
                  <Price
                    price={immoble?.sale_price}
                    style={{ fontSize: "32px" }}
                  />
                )}

                {Number(immoble?.rent_price) * 1 > 0 && (
                  <Price
                    price={immoble?.rent_price}
                    style={{ fontSize: "32px" }}
                  />
                )}

                <section className="font-[10] capitalize whitespace[-5] flex flex-col flex-wrap gap-3">
                  {immoble?.terrain_area && (
                    <span>
                      <FontAwesomeIcon icon={faExpand} />{" "}
                      {immoble?.terrain_area}
                    </span>
                  )}
                  {immoble?.building_area && (
                    <span>
                      <FontAwesomeIcon icon={faExpand} />{" "}
                      {immoble?.building_area}
                    </span>
                  )}

                  <CardTags cardTag={immoble?.tags || ""} cardTags={tags} />
                </section>
                <section className="flex gap-5 items-center mt-4 mb-5">
                  <ButtonWhatsapp
                    phone={immoble?.user?.phone || import.meta.env.VITE_PHONE}
                    text={`Ol??, gostaria de saber mais informa????es sobre o im??vel ${immoble?.description} | C??D.: ${immoble?.reference}\nhttps://${window.location.host}`}
                  />
                </section>
              </li>

              {immoble?.description_text && (
                <li className="w-full sm:w-8/12 flex flex-col gap-3 pb-7">
                  <H2 title="Descri????o do Imov??l" />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: immoble?.description_text,
                    }}
                  />
                </li>
              )}

              {immoble?.user?.first_name && (
                <li className="w-full sm:w-8/12 flex flex-col gap-2">
                  <H2 title="Corretor" />
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

            {immobiles.length && (
              <section className="container mt-5">
                <div className="relative">
                  <H2 title={`Veja outros`} />
                  <CardCarousel id="all" mapping={immobiles} />
                </div>
              </section>
            )}
          </div>
        </>
      )}
    </div>
  );
}
