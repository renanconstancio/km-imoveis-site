import { parse } from "query-string";
import { KeyboardEvent, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Loading } from "../../components/loading";
import { PropsCities } from "../../global/types/types";
import { faEdit, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api } from "../../api/api";

export default function Cities() {
  const [clear, setClear] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [cities, setCities] = useState<PropsCities[]>([]);

  const location = useLocation();

  const query = parse(location.search);

  const q = (query.q || "") as unknown as string;

  function handleKeyPressSearch(
    event: KeyboardEvent<EventTarget & HTMLInputElement>,
  ) {
    if (event.currentTarget.value) {
      if (event.code === "Enter" || event.keyCode === 13) {
        setClear(!clear);
        setCities(
          cities?.filter((f: { city: string }) =>
            f.city
              .toLowerCase()
              .includes(event.currentTarget.value.toLowerCase()),
          ),
        );
      }
    }
  }

  async function handleDelete(data: PropsCities) {
    if (!confirm(`Você deseja excluir ${data.city}?`)) return;
    setLoading(true);
    await api
      .delete(`/cities/${data.id}`)
      .then(() =>
        setCities(cities?.filter((f: { id: string }) => f.id !== data.id)),
      )
      .finally(() => setLoading(false));
  }

  async function loadCities() {
    setLoading(true);
    await api
      .get(`/cities`)
      .then(async resp => setCities(await resp.data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    (async () => {
      loadCities();
    })();
  }, []);

  if (loading) return <Loading />;

  return (
    <ul className="overflow-x-auto rounded-sm bg-white p-5">
      <li className="flex border-b mb-3 pb-3 gap-3 justify-between">
        <section className="w-6/12 flex gap-3 justify-end items-center">
          <aside className="flex flex-1">
            <input
              type="text"
              className="input-form"
              defaultValue={`${query.q || ""}`}
              onKeyDown={handleKeyPressSearch}
            />
            {(q || clear) && (
              <button
                className="btn-default text-black"
                type="button"
                onClick={() => {
                  loadCities();
                  setClear(!clear);
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </aside>
          <nav>
            <Link className="btn-success" to="/adm/cities/new">
              <FontAwesomeIcon icon={faEdit} /> Criar
            </Link>
          </nav>
        </section>
      </li>

      <li className="list-orders uppercase font-play font-bold bg-gray-200">
        <span className="w-1/12">ações</span>
        <span className="w-11/12">Cidade</span>
      </li>

      {cities?.map(rws => (
        <li key={rws.id} className="list-orders">
          <span className="flex gap-1 w-1/12">
            <Link
              className="btn-primary btn-xs"
              to={`/adm/cities/${rws.id}/edit`}
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
          <span className="w-11/12">
            {[rws.city, rws.state?.state].join("/")}
          </span>
        </li>
      ))}

      {!cities.length && (
        <li className="py-3 px-6 text-center">Nenhum imovel encontado</li>
      )}
    </ul>
  );
}
