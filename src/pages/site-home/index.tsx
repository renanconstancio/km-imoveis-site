import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PropsImmobles } from "../../global/types/types";
import { parse } from "query-string";
import { Loading } from "../../components/loading";
import { H2 } from "../../components/title";
import { CadSwiper } from "../../components/card-swiper";
import { api } from "../../services/api";

export function SiteHome() {
  const [loading, setLoading] = useState(true);
  const [immobilesSales, setImmobilesSales] = useState<PropsImmobles[]>([]);
  const [immobilesLocation, setImmobilesLocation] = useState<PropsImmobles[]>(
    [],
  );
  const [immobilesPurchase, setImmobilesPurchase] = useState<PropsImmobles[]>(
    [],
  );
  const [immobilesExchange, setImmobilesExchange] = useState<PropsImmobles[]>(
    [],
  );

  const location = useLocation();
  const query = parse(location.search);
  const city = (query.city || "") as string;

  useEffect(() => {
    (async () => {
      setLoading(true);
      await api
        .get(
          `/immobiles/website/list?limit=20&search[situation]=location&search[city]=${city}`,
        )
        .then(async resp => {
          setImmobilesLocation(await resp.data?.data);
        })
        .finally(() => setLoading(false));
    })();
  }, [city]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await api
        .get(
          `/immobiles/website/list?limit=20&search[situation]=purchase&search[city]=${city}`,
        )
        .then(async resp => {
          setImmobilesPurchase(await resp.data?.data);
        })
        .finally(() => setLoading(false));
    })();
  }, [city]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await api
        .get(
          `/immobiles/website/list?limit=20&search[situation]=exchange&search[city]=${city}`,
        )
        .then(async resp => {
          setImmobilesExchange(await resp.data?.data);
        })
        .finally(() => setLoading(false));
    })();
  }, [city]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await api
        .get(
          `/immobiles/website/list?limit=20&search[situation]=sale&search[city]=${city}`,
        )
        .then(async resp => {
          setImmobilesSales(await resp.data?.data);
        })
        .finally(() => setLoading(false));
    })();
  }, [city]);

  return (
    <>
      <div className="border-b border-gray-200 py-2">
        {loading ? (
          <section className="py-48">
            <Loading />
          </section>
        ) : (
          <>
            {immobilesLocation.length > 0 && (
              <section className="container p-4 mb-7 mt-5">
                <div className="relative bg-white p-4">
                  <H2 title={`Imóveis para Locação`} />
                  <CadSwiper id="location" mapping={immobilesLocation} />
                </div>
              </section>
            )}

            {immobilesSales.length > 0 && (
              <section className="container p-4 mb-7">
                <div className="relative bg-white p-4">
                  <H2 title={`Imóveis para Venda`} />
                  <CadSwiper id="sale" mapping={immobilesSales} />
                </div>
              </section>
            )}

            {immobilesPurchase.length > 0 && (
              <section className="container p-4 mb-7">
                <div className="relative bg-white p-4">
                  <H2 title={`Imóveis para Compra`} />
                  <CadSwiper id="purchase" mapping={immobilesPurchase} />
                </div>
              </section>
            )}

            {immobilesExchange.length > 0 && (
              <section className="container p-4 mb-7">
                <div className="relative bg-white p-4">
                  <H2 title={`Imóveis com Permuta`} />
                  <CadSwiper id="exchange" mapping={immobilesExchange} />
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </>
  );
}
