import { parse } from "query-string";
import { KeyboardEvent, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Loading } from "../../components/loading";
import { PropsUsers } from "../../global/types/types";
import { faEdit, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api } from "../../services/api";

export default function Users() {
  const [clear, setClear] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<PropsUsers[]>([]);

  const location = useLocation();

  const query = parse(location.search);

  const q = (query.q || "") as unknown as string;

  function handleSearch(event: KeyboardEvent<EventTarget & HTMLInputElement>) {
    if (event.currentTarget.value) {
      if (event.code === "Enter" || event.keyCode === 13) {
        setClear(!clear);
        setUsers(
          users?.filter(
            (f: { first_name: string }) =>
              f.first_name
                .toLowerCase()
                .includes(event.currentTarget.value.toLowerCase()), //f.street === event.currentTarget.value,
          ),
        );
      }
    }
  }

  async function handleDelete(data: PropsUsers) {
    if (!confirm(`Você deseja excluir ${data.first_name}?`)) return;
    setLoading(true);
    await api
      .delete(`/users/${data.id}`)
      .then(() =>
        setUsers(users?.filter((f: { id: string }) => f.id !== data.id)),
      )
      .finally(() => setLoading(false));
  }

  async function loadUsers() {
    setLoading(true);
    await api
      .get(`/users`)
      .then(async resp => setUsers(await resp.data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) return <Loading />;

  return (
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
                  loadUsers();
                  setClear(!clear);
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </aside>
          <nav>
            <Link className="btn-success" to="/adm/users/new">
              <FontAwesomeIcon icon={faEdit} /> Criar
            </Link>
          </nav>
        </section>
      </li>

      <li className="list-orders uppercase font-play font-bold bg-gray-200">
        <span className="basis-1/12">ações</span>
        <span className="basis-11/12">Nome.</span>
      </li>

      {users?.map(rws => (
        <li key={rws.id} className="list-orders">
          <span className="flex gap-1 basis-1/12">
            <Link
              className="btn-primary btn-xs"
              to={`/adm/users/${rws.id}/edit`}
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
          <span className="basis-11/12">{rws.first_name}</span>
        </li>
      ))}

      {!users.length && (
        <li className="py-3 px-6 text-center">Nenhum imovel encontado</li>
      )}
    </ul>
  );
}
