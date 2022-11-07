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
  faShower,
  faSink,
  faStarOfLife,
  faTv,
} from "@fortawesome/free-solid-svg-icons";

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
          <Helmet>
            <title>
              {immoble?.description} - {import.meta.env.VITE_REACT_TITLE}
            </title>
          </Helmet>
          <div className="bg-slate-100 -mt-2 mb-5">
            <section className="container p-5">
              <Filters variant="row" />
            </section>
          </div>
          <ul className="container px-4 flex flex-col flex-wrap sm:flex-row">
            <li className="flex-initial basis-full">
              <H2 title={`${immoble?.description}`} />
              <Address address={[immoble?.district?.district].join(", ")} />
            </li>
            <li className="flex-initial basis-full sm:basis-8/12">
              <CarouselIcons images={photos} />
            </li>
            <li className="flex-initial basis-full mt-5 sm:mt-0 sm:basis-4/12 sm:pl-5">
              <Price price={immoble?.rent_price} style={{ fontSize: "32px" }} />
              <hr />
              <section className="flex gap-5 items-center mt-4 mb-5">
                <img src={faWhatsApp} alt="whatsapp" width={25} />
                <span>{immoble?.user?.phone}</span>
              </section>
              <section className="font-[10] capitalize whitespace[-5] flex flex-col flex-wrap gap-3">
                <span>
                  <FontAwesomeIcon icon={faExpand} /> {immoble?.terrain_area}
                </span>
                <span>
                  <FontAwesomeIcon icon={faExpand} /> {immoble?.building_area}
                </span>
                {tags.map((r, index) => {
                  if (
                    immoble?.description_text.split(",").includes(`${r.tag}`)
                  ) {
                    return (
                      <span key={index}>
                        {r.icon === "faTv" && <FontAwesomeIcon icon={faTv} />}
                        {r.icon === "faCar" && <FontAwesomeIcon icon={faCar} />}
                        {r.icon === "faBath" && (
                          <FontAwesomeIcon icon={faBath} />
                        )}
                        {r.icon === "faStarOfLife" && (
                          <FontAwesomeIcon icon={faStarOfLife} />
                        )}
                        {r.icon === "faSink" && (
                          <FontAwesomeIcon icon={faSink} />
                        )}
                        {r.icon === "faBed" && <FontAwesomeIcon icon={faBed} />}
                        {r.icon === "faExpand" && (
                          <FontAwesomeIcon icon={faExpand} />
                        )}
                        {r.icon === "faFan" && <FontAwesomeIcon icon={faFan} />}
                        {r.icon === "faShower" && (
                          <FontAwesomeIcon icon={faShower} />
                        )}{" "}
                        {r?.tag}
                      </span>
                    );
                  }
                })}
              </section>
            </li>
            {/* <li className="flex-initial basis-full sm:basis-8/12">
              <H2 title="Descrição do Imóvel" />

              <div
                className="font-[10] capitalize whitespace[-5] flex flex-row flex-wrap gap-1"
                dangerouslySetInnerHTML={{
                  __html: `<span>${immoble?.terrain_area}</span><span>${
                    immoble?.building_area
                  }</span><span>${immoble?.description_text
                    .split(",")
                    .join("</span><span>")}</span>`,
                }}
              />
            </li> */}
            <li className="flex-initial basis-full sm:basis-8/12">
              <H2 title="Corretor" />
              {immoble?.user?.first_name}
              <br />
              Telefone: {immoble?.user?.phone}
            </li>
          </ul>
        </>
      )}
    </div>
  );
}
