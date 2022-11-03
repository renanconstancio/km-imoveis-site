import { api } from "../../services/api";
import { useEffect, useState } from "react";

import { PropsImmobles } from "../../global/types/types";
import { useParams } from "react-router-dom";
import { Filters } from "../../components/filters";
import { Helmet } from "react-helmet-async";
import { H2 } from "../../components/title";
import { Address } from "../../components/address";
import { Price } from "../../components/price";
import faWhatsApp from "../../assets/whatsapp.svg";
import { Loading } from "../../components/loading";

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
      if (immobleId) loadImmoble(immobleId);
    })();
  }, [immobleId]);

  return (
    <>
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
            <ul className="container flex flex-row flex-wrap">
              <li className="w-8/12">
                <H2 title={`${immoble?.description}`} />
                <Address address={[immoble?.district?.district].join(", ")} />

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
                <Price
                  price={`${immoble?.rent_price}`}
                  style={{ fontSize: "32px" }}
                />

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
          </>
        )}
      </div>
    </>
  );
}
