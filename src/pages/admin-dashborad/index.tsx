import {
  faCashRegister,
  faExchange,
  faHomeAlt,
  faLockOpen,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

export function Dashboard() {
  const [totalImmobiles, setTotal] = useState<number>(0);
  const [totalLocation, setTotalLocation] = useState<number>(0);
  const [totalSaleBarter, setTotalSaleBarter] = useState<number>(0);
  const [totalSaleLease, setTotalSaleLease] = useState<number>(0);
  const [totalPurchase, setTotalPurchase] = useState<number>(0);
  const [totalExchange, setTotalExchange] = useState<number>(0);
  const [totalSale, setTotalSale] = useState<number>(0);
  const [totalOnline, setTotalOnline] = useState<number>(0);
  const [totalOffline, setTotalOffline] = useState<number>(0);

  useEffect(() => {
    (async () => {
      await api
        .get("/immobiles")
        .then(async resp => setTotal((await resp.data)?.total));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await api
        .get("/immobiles?search[situation]=location")
        .then(async resp => setTotalLocation((await resp.data)?.total));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await api
        .get("/immobiles?search[published]=false")
        .then(async resp => setTotalOffline((await resp.data)?.total));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await api
        .get("/immobiles?search[published]=true")
        .then(async resp => setTotalOnline((await resp.data)?.total));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await api
        .get("/immobiles?search[situation]=purchase&search[published]=true")
        .then(async resp => setTotalPurchase((await resp.data)?.total));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await api
        .get("/immobiles?search[situation]=exchange&search[published]=true")
        .then(async resp => setTotalExchange((await resp.data)?.total));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await api
        .get("/immobiles?search[situation]=sale&search[published]=true")
        .then(async resp => setTotalSale((await resp.data)?.total));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await api
        .get("/immobiles?search[published]=true&search[situation]=sale_lease")
        .then(async resp => setTotalSaleLease((await resp.data)?.total));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await api
        .get("/immobiles?search[published]=true&search[situation]=sale_barter")
        .then(async resp => setTotalSaleBarter((await resp.data)?.total));
    })();
  }, []);

  return (
    <ul className="flex flex-wrap -mx-3">
      <li className="p-3 basis-1/3">
        <section className="rounded overflow-hidden shadow-lg bg-green-100">
          <div className="flex items-center px-6 pt-4 pb-3 gap-3">
            <span className="bg-green-200 w-14 h-14 rounded-full flex items-center justify-center">
              <FontAwesomeIcon
                icon={faHomeAlt}
                size="2x"
                className="text-green-900"
              />
            </span>
            <div className="text-sm">
              <strong className="text-gray-900 leading-none uppercase">
                Total de Imovéis
              </strong>
              <p className="text-gray-600">
                {totalImmobiles ?? 0} cadastrado(s)
              </p>
            </div>
          </div>
        </section>
      </li>
      <li className="p-3 basis-1/3">
        <section className="rounded overflow-hidden shadow-lg bg-gray-100">
          <div className="flex items-center px-6 pt-4 pb-3 gap-3">
            <span className="bg-gray-200 w-14 h-14 rounded-full flex items-center justify-center">
              <FontAwesomeIcon
                icon={faHomeAlt}
                size="2x"
                className="text-gray-900"
              />
            </span>
            <div className="text-sm">
              <strong className="text-gray-900 leading-none uppercase">
                Imovéis Offline/Alugados
              </strong>
              <p className="text-gray-600">{totalOffline ?? 0} cadastrado(s)</p>
            </div>
          </div>
        </section>
      </li>
      <li className="p-3 basis-1/3">
        <section className="rounded overflow-hidden shadow-lg bg-cyan-100">
          <div className="flex items-center px-6 pt-4 pb-3 gap-3">
            <span className="bg-cyan-200 w-14 h-14 rounded-full flex items-center justify-center">
              <FontAwesomeIcon
                icon={faHomeAlt}
                size="2x"
                className="text-cyan-900"
              />
            </span>
            <div className="text-sm">
              <strong className="text-gray-900 leading-none uppercase">
                Imovéis Online
              </strong>
              <p className="text-gray-600">{totalOnline ?? 0} cadastrado(s)</p>
            </div>
          </div>
        </section>
      </li>
      <li className="p-3 basis-1/3">
        <section className="rounded overflow-hidden shadow-lg bg-blue-100">
          <div className="flex items-center px-6 pt-4 pb-3 gap-3">
            <span className="bg-blue-200 w-14 h-14 rounded-full flex items-center justify-center">
              <FontAwesomeIcon
                icon={faLockOpen}
                size="2x"
                className="text-blue-900"
              />
            </span>
            <div className="text-sm">
              <strong className="text-gray-900 leading-none uppercase">
                Para Locação
              </strong>
              <p className="text-gray-600">
                {totalLocation ?? 0} cadastrado(s)
              </p>
            </div>
          </div>
        </section>
      </li>
      <li className="p-3 basis-1/3">
        <section className="rounded overflow-hidden shadow-lg bg-orange-100">
          <div className="flex items-center px-6 pt-4 pb-3 gap-3">
            <span className="bg-orange-200 w-14 h-14 rounded-full flex items-center justify-center">
              <FontAwesomeIcon
                icon={faCashRegister}
                size="2x"
                className="text-orange-900"
              />
            </span>
            <div className="text-sm">
              <strong className="text-gray-900 leading-none uppercase">
                Para Compra
              </strong>
              <p className="text-gray-600">
                {totalPurchase ?? 0} cadastrado(s)
              </p>
            </div>
          </div>
        </section>
      </li>
      <li className="p-3 basis-1/3">
        <section className="rounded overflow-hidden shadow-lg bg-indigo-100">
          <div className="flex items-center px-6 pt-4 pb-3 gap-3">
            <span className="bg-indigo-200 w-14 h-14 rounded-full flex items-center justify-center">
              <FontAwesomeIcon
                icon={faExchange}
                size="2x"
                className="text-indigo-900"
              />
            </span>
            <div className="text-sm">
              <strong className="text-gray-900 leading-none uppercase">
                Permuta
              </strong>
              <p className="text-gray-600">
                {totalExchange ?? 0} cadastrado(s)
              </p>
            </div>
          </div>
        </section>
      </li>
      <li className="p-3 basis-1/3">
        <section className="rounded overflow-hidden shadow-lg bg-red-100">
          <div className="flex items-center px-6 pt-4 pb-3 gap-3">
            <span className="bg-red-200 w-14 h-14 rounded-full flex items-center justify-center">
              <FontAwesomeIcon
                icon={faSackDollar}
                size="2x"
                className="text-red-900"
              />
            </span>
            <div className="text-sm">
              <strong className="text-gray-900 leading-none uppercase">
                Para Venda
              </strong>
              <p className="text-gray-600">{totalSale ?? 0} cadastrado(s)</p>
            </div>
          </div>
        </section>
      </li>
      <li className="p-3 basis-1/3">
        <section className="rounded overflow-hidden shadow-lg bg-fuchsia-100">
          <div className="flex items-center px-6 pt-4 pb-3 gap-3">
            <span className="bg-fuchsia-200 w-14 h-14 rounded-full flex items-center justify-center">
              <FontAwesomeIcon
                icon={faSackDollar}
                size="2x"
                className="text-fuchsia-900"
              />
            </span>
            <div className="text-sm">
              <strong className="text-gray-900 leading-none uppercase">
                Venda e Locação
              </strong>
              <p className="text-gray-600">
                {totalSaleBarter ?? 0} cadastrado(s)
              </p>
            </div>
          </div>
        </section>
      </li>
      <li className="p-3 basis-1/3">
        <section className="rounded overflow-hidden shadow-lg bg-lime-100">
          <div className="flex items-center px-6 pt-4 pb-3 gap-3">
            <span className="bg-lime-200 w-14 h-14 rounded-full flex items-center justify-center">
              <FontAwesomeIcon
                icon={faExchange}
                size="2x"
                className="text-lime-900"
              />
            </span>
            <div className="text-sm">
              <strong className="text-gray-900 leading-none uppercase">
                Venda e Permuta
              </strong>
              <p className="text-gray-600">
                {totalSaleLease ?? 0} cadastrado(s)
              </p>
            </div>
          </div>
        </section>
      </li>
    </ul>
  );
}
