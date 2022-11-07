import { parse } from "query-string";
import { KeyboardEvent, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Loading } from "../../components/loading";
import { PropsStates } from "../../global/types/types";
import { faEdit, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api } from "../../services/api";

export default function States() {
  const [clear, setClear] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [states, setStates] = useState<PropsStates[]>([]);

  const location = useLocation();

  const query = parse(location.search);

  const q = (query.q || "") as unknown as string;

  function handleKeyPressSearch(
    event: KeyboardEvent<EventTarget & HTMLInputElement>,
  ) {
    if (event.currentTarget.value) {
      if (event.code === "Enter" || event.keyCode === 13) {
        setClear(!clear);
        setStates(
          states?.filter(
            (f: { street: string }) =>
              f.street
                .toLowerCase()
                .includes(event.currentTarget.value.toLowerCase()), //f.street === event.currentTarget.value,
          ),
        );
      }
    }
  }

  async function handleDelete(data: PropsStates) {
    if (!confirm(`Você deseja excluir ${data.street}?`)) return;
    setLoading(true);
    await api
      .delete(`/states/${data.id}`)
      .then(() =>
        setStates(states?.filter((f: { id: string }) => f.id !== data.id)),
      )
      .finally(() => setLoading(false));
  }

  async function loadStates() {
    setLoading(true);
    await api
      .get(`/states`)
      .then(async resp => setStates(await resp.data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadStates();
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
                  loadStates();
                  setClear(!clear);
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </aside>
          <nav>
            <Link className="btn-success" to="/adm/states/new">
              <FontAwesomeIcon icon={faEdit} /> Criar
            </Link>
          </nav>
        </section>
      </li>

      <li className="list-orders uppercase font-play font-bold bg-gray-200">
        <span className="w-1/12">ações</span>
        <span className="w-11/12">Estados</span>
      </li>

      {states?.map(rws => (
        <li key={rws.id} className="list-orders">
          <span className="flex gap-1 w-1/12">
            <Link
              className="btn-primary btn-xs"
              to={`/adm/states/${rws.id}/edit`}
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
          <span className="w-11/12">{rws.state}</span>
        </li>
      ))}

      {!states.length && (
        <li className="py-3 px-6 text-center">Nenhum imovel encontado</li>
      )}
    </ul>
  );
}
