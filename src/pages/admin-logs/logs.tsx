import { parse } from "query-string";
import { KeyboardEvent, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Loading } from "../../components/loading";
import { PropsLogs } from "../../global/types/types";
import { faEdit, faEye, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addClassName } from "../../utils/functions";
import { useModal } from "../../hooks/use-modal";
import { format } from "date-fns";
import { api } from "../../services/api";
import ModalLog from "../../components/modal/modal-log";

export default function Logs() {
  const [clear, setClear] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [logs, setLogs] = useState<PropsLogs[]>([]);
  const [log, addLogs] = useState();

  const location = useLocation();
  const { closeModal, open } = useModal();

  const query = parse(location.search);

  const q = (query.q || "") as unknown as string;

  function handleSearch(event: KeyboardEvent<EventTarget & HTMLInputElement>) {
    if (event.currentTarget.value) {
      if (event.code === "Enter" || event.keyCode === 13) {
        setClear(!clear);
        setLogs(
          logs?.filter(
            (f: { text: string }) =>
              f.text
                .toLowerCase()
                .includes(event.currentTarget.value.toLowerCase()), //f.street === event.currentTarget.value,
          ),
        );
      }
    }
  }

  async function loadLogs() {
    setLoading(true);
    await api
      .get("/logs")
      .then(async resp => setLogs(await resp.data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadLogs();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
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
              {(q || clear) && (
                <button
                  className="btn-default text-black"
                  type="button"
                  onClick={() => {
                    loadLogs();
                    setClear(!clear);
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              )}
            </aside>
            <nav>
              <Link className="btn-success" to="/adm/logs/new">
                <FontAwesomeIcon icon={faEdit} /> Criar
              </Link>
            </nav>
          </section>
        </li>

        <li className="list-orders uppercase font-play font-bold bg-gray-200">
          <span className="basis-1/12">Ação</span>
          <span className="basis-7/12">Usuário</span>
          <span className="basis-2/12">route</span>
          <span className="basis-2/12">Data/Hora</span>
        </li>

        {logs?.map(rws => (
          <li key={rws.created_at} className="list-orders">
            <span className="flex items-center gap-1 basis-1/12">
              <span
                className="btn-primary btn-xs"
                onClick={() => {
                  closeModal(!open);
                  addLogs(rws.text);
                }}
              >
                <FontAwesomeIcon icon={faEye} />
              </span>
              <span className={`${addClassName(rws.type)}`}></span>
            </span>
            <span className="basis-7/12">{rws?.user?.first_name}</span>
            <span className="basis-2/12">{rws?.route}</span>
            <span className="basis-2/12">
              {format(new Date(rws.created_at), "dd.MM.yyyy HH:mm")}
            </span>
          </li>
        ))}

        {!logs.length && (
          <li className="py-3 px-6 text-center">Nenhum imovel encontado</li>
        )}
      </ul>
      <ModalLog log={log} />
    </>
  );
}
