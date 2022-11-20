import { api } from "../../services/api";
import { Link, useLocation } from "react-router-dom";
import { KeyboardEvent, useEffect, useState } from "react";
import { Loading } from "../../components/loading";
import { faEdit, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TCategories } from "./types";
import { parse } from "query-string";

export default function Categories() {
  const [clear, setClear] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<TCategories[]>([]);

  const location = useLocation();

  const query = parse(location.search);

  const q = (query.q || "") as unknown as string;

  function handleSearch(event: KeyboardEvent<EventTarget & HTMLInputElement>) {
    if (
      event.currentTarget.value &&
      (event.code === "Enter" || event.keyCode === 13)
    ) {
      setClear(!clear);
      setCategories(
        categories?.filter((f: { category: string }) =>
          f.category
            .toLowerCase()
            .includes(event.currentTarget.value.toLowerCase()),
        ),
      );
    }
  }

  async function handleDelete(data: TCategories) {
    if (!confirm(`Você deseja excluir ${data.category}?`)) return;
    await api
      .delete(`/categories/${data.id}`)
      .finally(() => setLoading(false))
      .then(() => loadCategories());
  }

  async function loadCategories() {
    setLoading(true);
    await api
      .get(`/categories`)
      .finally(() => setLoading(false))
      .then(async resp => setCategories(await resp.data));
  }

  useEffect(() => {
    loadCategories();
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
                  loadCategories();
                  setClear(!clear);
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </aside>
          <nav>
            <Link className="btn-success" to="/adm/categories/new">
              <FontAwesomeIcon icon={faEdit} /> Criar
            </Link>
          </nav>
        </section>
      </li>

      <li className="list-orders uppercase font-play font-bold bg-gray-200">
        <span className="basis-1/12">ações</span>
        <span className="basis-11/12">Estados</span>
      </li>

      {categories?.map(rws => (
        <li key={rws.id} className="list-orders">
          <span className="flex gap-1 basis-1/12">
            <Link
              className="btn-primary btn-xs"
              to={`/adm/categories/${rws.id}/edit`}
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
          <span className="basis-11/12">{rws.category}</span>
        </li>
      ))}

      {!categories.length && (
        <li className="py-3 px-6 text-center">Nenhum imovel encontado</li>
      )}
    </ul>
  );
}
