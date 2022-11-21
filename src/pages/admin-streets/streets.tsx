import { api } from "../../services/api";
import { parse } from "query-string";
import { KeyboardEvent, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Loading } from "../../components/loading";
import { faEdit, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TStreets } from "./types";
import { Helmet } from "react-helmet-async";

export default function Streets() {
  const [clear, setClear] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [streets, setStreets] = useState<TStreets[]>([]);

  const location = useLocation();

  const query = parse(location.search);

  const q = (query.q || "") as unknown as string;

  function handleSearch(event: KeyboardEvent<EventTarget & HTMLInputElement>) {
    if (
      event.currentTarget.value &&
      (event.code === "Enter" || event.keyCode === 13)
    ) {
      setClear(!clear);
      setStreets(
        streets?.filter((f: { street: string }) =>
          f.street
            .toLowerCase()
            .includes(event.currentTarget.value.toLowerCase()),
        ),
      );
    }
  }

  async function handleDelete(data: TStreets) {
    if (!confirm(`Você deseja excluir ${data.street}?`)) return;

    await api
      .delete(`/streets/${data.id}`)
      .then(() => loadStreets())
      .finally(() => setLoading(false));
  }

  async function loadStreets() {
    setLoading(true);
    await api
      .get(`/streets`)
      .then(async resp => setStreets(await resp.data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadStreets();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Lista de Ruas - {import.meta.env.VITE_TITLE}</title>
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
              {(q || clear) && (
                <button
                  className="btn-default text-black"
                  type="button"
                  onClick={() => {
                    loadStreets();
                    setClear(!clear);
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              )}
            </aside>
            <nav>
              <Link className="btn-success" to="/adm/streets/new">
                <FontAwesomeIcon icon={faEdit} /> Criar
              </Link>
            </nav>
          </section>
        </li>

        <li className="list-orders uppercase font-play font-bold bg-gray-200">
          <span className="basis-1/12">ações</span>
          <span className="basis-11/12">Rua, Avenida, Apto.</span>
        </li>

        {streets?.map(rws => (
          <li key={rws.id} className="list-orders">
            <span className="flex gap-1 basis-1/12">
              <Link
                className="btn-primary btn-xs"
                to={`/adm/streets/${rws.id}/edit`}
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
            <span className="basis-11/12">{rws.street}</span>
          </li>
        ))}

        {!streets.length && (
          <li className="py-3 px-6 text-center">Nenhum imovel encontado</li>
        )}
      </ul>
    </>
  );
}
