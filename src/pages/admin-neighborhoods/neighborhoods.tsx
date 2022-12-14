import { api } from "../../services/api";
import { parse } from "query-string";
import { KeyboardEvent, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Loading } from "../../components/loading";
import { faEdit, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TNeighborhoods } from "./types";
import { Helmet } from "react-helmet-async";

export default function Neighborhoods() {
  const [clear, setClear] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [neighborhoods, setNeighborhoods] = useState<TNeighborhoods[]>([]);

  const location = useLocation();

  const query = parse(location.search);

  const q = (query.q || "") as unknown as string;

  function handleSearch(event: KeyboardEvent<EventTarget & HTMLInputElement>) {
    if (
      event.currentTarget.value &&
      (event.code === "Enter" || event.keyCode === 13)
    ) {
      setClear(!clear);
      setNeighborhoods(
        neighborhoods?.filter((f: { district: string }) =>
          f.district
            .toLowerCase()
            .includes(event.currentTarget.value.toLowerCase()),
        ),
      );
    }
  }

  async function handleDelete(data: TNeighborhoods) {
    if (!confirm(`Você deseja excluir ${data.district}?`)) return;

    await api
      .delete(`/neighborhoods/${data.id}`)
      .then(() => loadNeighborhoods())
      .finally(() => setLoading(false));
  }

  async function loadNeighborhoods() {
    setLoading(true);
    await api
      .get(`/neighborhoods`)
      .then(async (resp) => setNeighborhoods(await resp.data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadNeighborhoods();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Lista de Bairros - {import.meta.env.VITE_TITLE}</title>
      </Helmet>
      <ul className="overflobasis-x-auto rounded-sm bg-white p-5">
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
                    loadNeighborhoods();
                    setClear(!clear);
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              )}
            </aside>
            <nav>
              <Link className="btn-success" to="/adm/neighborhoods/new">
                <FontAwesomeIcon icon={faEdit} /> Criar
              </Link>
            </nav>
          </section>
        </li>

        <li className="list-orders uppercase font-play font-bold bg-gray-200">
          <span className="basis-1/12">ações</span>
          <span className="basis-11/12">Bairros</span>
        </li>

        {neighborhoods?.map((rws) => (
          <li key={rws.id} className="list-orders">
            <span className="flex gap-1 basis-1/12">
              <Link
                className="btn-primary btn-xs"
                to={`/adm/neighborhoods/${rws.id}/edit`}
              >
                <FontAwesomeIcon icon={faEdit} />
              </Link>
              <span
                className="btn-danger btn-xs"
                onClick={() => handleDelete(rws)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </span>
            <span className="basis-11/12">{rws.district}</span>
          </li>
        ))}

        {!neighborhoods.length && (
          <li className="py-3 px-6 text-center">Nenhum imovel encontado</li>
        )}
      </ul>
    </>
  );
}
