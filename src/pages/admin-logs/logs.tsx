import { api } from "../../services/api";
import { parse, stringify } from "query-string";
import { KeyboardEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Loading } from "../../components/loading";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addClassName } from "../../utils/functions";
import { useModal } from "../../hooks/use-modal";
import { format } from "date-fns";
import { Pagination } from "../../components/pagination";
import { TPagination } from "../../global/types";
import { TLogs } from "./types";
import ModalLog from "../../components/modal/modal-log";
import { Helmet } from "react-helmet-async";

export default function Logs() {
  const [loading, setLoading] = useState<boolean>(true);
  const [log, addLogs] = useState();
  const [logs, setLogs] = useState<TPagination<TLogs[]>>(
    {} as TPagination<TLogs[]>,
  );

  const { closeModal, open } = useModal();
  const location = useLocation();
  const navigate = useNavigate();

  const locationDecodUri = decodeURI(location.search);

  const query = parse(location.search);
  const limit = (query.limit || "100") as string;
  const page = (query.page || "1") as string;
  const qs = (query.q || "") as unknown as string;

  function handleSearch(event: KeyboardEvent<EventTarget & HTMLInputElement>) {
    if (
      event.currentTarget.value &&
      (event.code === "Enter" || event.keyCode === 13)
    ) {
      navigate({
        search: `?q=${event.currentTarget.value}`,
      });
    }
  }

  async function loadLogs() {
    setLoading(true);

    const urlParse = parse(
      `page=${page}&limit=${limit}&search[text]=${qs}&search[user]=${qs}`,
    );

    await api
      .get(`/logs?${decodeURI(stringify({ ...query, ...urlParse }))}`)
      .then(async resp => setLogs(await resp.data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadLogs();
  }, [locationDecodUri]);

  if (loading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Logs - {import.meta.env.VITE_TITLE}</title>
      </Helmet>
      <ul className="overflow-x-auto rounded-sm bg-white p-5">
        <li className="flex border-b mb-3 pb-3 gap-3 justify-between">
          <section className="basis-6/12 flex gap-3 justify-end items-center">
            <aside className="flex flex-1">
              <input
                type="text"
                className="input-form"
                defaultValue={`${query.q || ""}`}
                onKeyDown={handleSearch}
              />
              {qs && (
                <Link className="btn-default text-black" to="/adm/logs">
                  <FontAwesomeIcon icon={faTimes} />
                </Link>
              )}
            </aside>
          </section>
          <nav>
            <Pagination
              total={logs?.total || 0}
              currentPage={Number(`${query.page || "1"}`)}
              perPage={Number(`${query.limit || "25"}`)}
            />
          </nav>
        </li>

        <li className="list-orders uppercase font-play font-bold bg-gray-200">
          <span className="basis-1/12">Ação</span>
          <span className="basis-7/12">Usuário</span>
          <span className="basis-2/12">route</span>
          <span className="basis-2/12">Data/Hora</span>
        </li>

        {logs?.data?.map(rws => (
          <li key={rws.created_at} className="list-orders">
            <span className="flex items-center basis-1/12">
              {/* <span className={`${addClassName(rws.type)}`}></span> */}
              <span
                className={`${addClassName(rws.type)}`}
                onClick={() => {
                  closeModal(!open);
                  addLogs(rws.text);
                }}
              />
            </span>
            <span className="basis-7/12">{rws?.user?.first_name}</span>
            <span className="basis-2/12">{rws?.route}</span>
            <span className="basis-2/12">
              {format(new Date(rws.created_at), "dd.MM.yyyy HH:mm")}
            </span>
          </li>
        ))}

        {!logs.limit && (
          <li className="py-3 px-6 text-center">Nenhum imovel encontado</li>
        )}
      </ul>
      <ModalLog log={log} />
    </>
  );
}
