import "swiper/css";
import "swiper/css/navigation";
import { parse } from "query-string";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TImmobles } from "../admin-immobiles/types";
import { Loading } from "../../components/loading";
import { CadSwiper } from "../../components/card-swiper";
import { H2 } from "../../components/title";
import { api } from "../../services/api";
import { Helmet } from "react-helmet-async";

export function SiteHome() {
  const [loading, setLoading] = useState(true);
  const [immobilesSales, setImmobilesSales] = useState<TImmobles[]>([]);
  const [immobilesLocation, setImmobilesLocation] = useState<TImmobles[]>([]);
  const [immobilesPurchase, setImmobilesPurchase] = useState<TImmobles[]>([]);
  const [immobilesExchange, setImmobilesExchange] = useState<TImmobles[]>([]);
  const [immobilesSaleLease, setImmobilesSaleLease] = useState<TImmobles[]>([]);
  const [immobilesSaleBarter, setImmobilesSaleBarter] = useState<TImmobles[]>(
    [],
  );

  const location = useLocation();
  const query = parse(location.search);
  const city = (query.city || "") as string;

  async function loadLocation() {
    setLoading(true);
    await api
      .get(
        `/immobiles/website/list?limit=20&search[situation]=location&search[city]=${city}`,
      )
      .then(async (resp) => setImmobilesLocation(await resp.data?.data))
      .finally(() => setLoading(false));
  }

  async function loadPurchase() {
    setLoading(true);
    await api
      .get(
        `/immobiles/website/list?limit=20&search[situation]=purchase&search[city]=${city}`,
      )
      .then(async (resp) => setImmobilesPurchase(await resp.data?.data))
      .finally(() => setLoading(false));
  }

  async function loadExchange() {
    setLoading(true);
    await api
      .get(
        `/immobiles/website/list?limit=20&search[situation]=exchange&search[city]=${city}`,
      )
      .then(async (resp) => setImmobilesExchange(await resp.data?.data))
      .finally(() => setLoading(false));
  }

  async function loadSale() {
    setLoading(true);
    await api
      .get(
        `/immobiles/website/list?limit=20&search[situation]=sale&search[city]=${city}`,
      )
      .then(async (resp) => setImmobilesSales(await resp.data?.data))
      .finally(() => setLoading(false));
  }

  async function loadSaleLease() {
    setLoading(true);
    await api
      .get(
        `/immobiles/website/list?limit=20&search[situation]=sale_lease&search[city]=${city}`,
      )
      .then(async (resp) => setImmobilesSaleLease(await resp.data?.data))
      .finally(() => setLoading(false));
  }

  async function loadSaleBarter() {
    setLoading(true);
    await api
      .get(
        `/immobiles/website/list?limit=20&search[situation]=sale_barter&search[city]=${city}`,
      )
      .then(async (resp) => setImmobilesSaleBarter(await resp.data?.data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadLocation();
  }, [city]);

  useEffect(() => {
    loadPurchase();
  }, [city]);

  useEffect(() => {
    loadExchange();
  }, [city]);

  useEffect(() => {
    loadSale();
  }, [city]);

  useEffect(() => {
    loadSaleLease();
  }, [city]);

  useEffect(() => {
    loadSaleBarter();
  }, [city]);

  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_TITLE}</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content={import.meta.env.VITE_DESCRIPTION} />
        <meta name="keywords" content={import.meta.env.VITE_KEYWORDS} />
        <meta property="og:url" content={import.meta.env.VITE_URL} />
        <meta property="og:title" content={import.meta.env.VITE_TITLE} />
        <meta
          property="og:description"
          content={import.meta.env.VITE_DESCRIPTION}
        />
        <meta property="og:image" content={import.meta.env.VITE_IMAGE} />
        <link rel="canonical" href={import.meta.env.VITE_URL} />
      </Helmet>
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

            {immobilesSaleLease.length > 0 && (
              <section className="container p-4 mb-7">
                <div className="relative bg-white p-4">
                  <H2 title={`Imóveis com Venda e Locação`} />
                  <CadSwiper id="sale_lease" mapping={immobilesSaleLease} />
                </div>
              </section>
            )}

            {immobilesSaleBarter.length > 0 && (
              <section className="container p-4 mb-7">
                <div className="relative bg-white p-4">
                  <H2 title={`Imóveis com Venda e Permuta`} />
                  <CadSwiper id="sale_barter" mapping={immobilesSaleBarter} />
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </>
  );
}
