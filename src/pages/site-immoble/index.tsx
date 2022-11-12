import { api, tags } from "../../services/api";
import { useEffect, useState } from "react";

import { PropsImmobles } from "../../global/types/types";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { H2 } from "../../components/title";
import { Address } from "../../components/address";
import { Price } from "../../components/price";
import faWhatsApp from "../../assets/whatsapp.svg";
import { Loading } from "../../components/loading";
import { CarouselIcons } from "../../components/carousel";
import { Filters } from "../../components/filters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBath,
  faBed,
  faCar,
  faExpand,
  faFan,
  faPhoneVolume,
  faShower,
  faSink,
  faStarOfLife,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import { situationText, situationTextClassName } from "../../utils/functions";
import { ButtonWhatsapp } from "../../components/button-whatsapp";
import { CardTags } from "../../components/card-tags";

export function SiteImmoble() {
  const [loading, setLoading] = useState(true);
  const [immoble, setImmoble] = useState<PropsImmobles>({} as PropsImmobles);
  const [photos, setPhotos] = useState<string[]>([]);

  const { reference } = useParams<{ reference: string | undefined }>();

  async function loadImmoble(reference: string) {
    setLoading(true);
    await api
      .get(`/immobiles/${reference}/reference`)
      .then(async resp => setImmoble(await resp.data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (reference) loadImmoble(reference);
  }, [reference]);

  useEffect(() => {
    immoble?.photos?.map(r => setPhotos(photos => [...photos, r.image_lg]));
  }, [immoble]);

  return (
    <div className="border-b border-gray-200 py-2">
      {loading ? (
        <Loading />
      ) : (
        <>
          {immoble?.description && (
            <Helmet>
              <title>
                {immoble?.description} - {import.meta.env.VITE_REACT_TITLE}
              </title>

              <link rel="canonical" href={window.location.href} />
              <meta
                name="description"
                content={`${immoble?.description} - ${
                  import.meta.env.VITE_REACT_TITLE
                }`}
              />
              <meta property="og:url" content={`${location.href}`} />
              <meta
                property="og:title"
                content={`${immoble?.description} - ${
                  import.meta.env.VITE_REACT_TITLE
                }`}
              />
              <meta
                property="og:description"
                content={`${immoble?.description} - ${
                  import.meta.env.VITE_REACT_TITLE
                }`}
              />
              <meta
                property="og:image"
                content={immoble.photos?.[0].image_xs}
              />
            </Helmet>
          )}

          <div className="bg-gray-100 -mt-2 mb-5">
            <section className="container p-5">
              <Filters variant="row" />
            </section>
          </div>
          <div className="container">
            <ul className="divide-y divide-slate-200 bg-white mx-5 sm:mx-0 px-5 pb-7 flex flex-col flex-wrap sm:flex-row">
              <li className="w-full">
                <H2 title={`${immoble?.description}`} />

                <small>CÓD.: {immoble?.reference}</small>

                <Address
                  address={[
                    immoble.district?.district,
                    `${immoble.city?.city}/${immoble.city?.state.state}`,
                  ].join(", ")}
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
                <CarouselIcons images={photos} />
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
                    text={`Olá, gostaria de saber mais informações sobre o imóvel ${immoble?.description} | CÓD.: ${immoble?.reference}\nhttps://${window.location.host}`}
                  />
                </section>
              </li>

              {immoble?.description_text && (
                <li className="w-full sm:w-8/12 flex flex-col gap-3 pb-7">
                  <H2 title="Descrição do Imovél" />
                  <div
                    className="flex flex-row flex-wrap gap-1"
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
          </div>
        </>
      )}
    </div>
  );
}
