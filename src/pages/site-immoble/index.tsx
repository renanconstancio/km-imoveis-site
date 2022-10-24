import { api } from "../../api/api";
import { useEffect, useState } from "react";

import { PropsImmobles } from "../../global/types/types";
import { useParams } from "react-router-dom";
import { Filters } from "../../components/filters";
import { Helmet } from "react-helmet-async";
import { H2 } from "../../components/title";
import { Address } from "../../components/address";
import { Price } from "../../components/price";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faWhatsApp from "../../assets/whatsapp.svg";

export function SiteImmoble() {
  const [loading, setLoading] = useState(true);
  const [immoble, setImmoble] = useState<PropsImmobles>();

  const { immobleId } = useParams<{ immobleId: string | undefined }>();

  async function loadImmoble(id: string) {
    setLoading(true);
    await api
      .get(`/immobiles/${id}`)
      .then(async resp => setImmoble(await resp.data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    (async () => {
      loadImmoble(immobleId);
    })();
  }, [immobleId]);

  return (
    <>
      <div className="border-b border-gray-200 py-2">
        <Filters states={[]} />

        <ul className="container flex flex-row flex-wrap">
          <li className="w-8/12">
            <section>
              <figure>
                <img
                  src={immoble?.photos?.[0].image_lg}
                  alt=""
                  className="object-cover"
                />
              </figure>
            </section>
          </li>
          <li className="w-4/12 pl-5">
            <H2 title={`${immoble?.description}`} />
            <Address address={[immoble?.district?.district].join(", ")} />

            <Price price={immoble?.rent_price} />
            <hr />

            <section className="flex gap-5 items-center mt-4">
              <img src={faWhatsApp} alt="whatsapp" width={45} />
              <span>FONE</span>
            </section>
            <section className="flex gap-5 items-center mt-4">
              <img src={faWhatsApp} alt="whatsapp" width={45} />
              <span>FONE</span>
            </section>
            <section className="flex gap-5 items-center mt-4">
              <img src={faWhatsApp} alt="whatsapp" width={45} />
              <span>FONE</span>
            </section>
          </li>
          <li className="w-8/12">
            <H2 title="Descrição do Imóvel" />
            Aerea Constr.: {immoble?.building_area}
            <br />
            Aerea Terrea.: {immoble?.terrain_area}
          </li>
        </ul>
      </div>
      <Helmet>
        <title>s - {import.meta.env.VITE_REACT_TITLE}</title>
      </Helmet>
    </>
  );
}
