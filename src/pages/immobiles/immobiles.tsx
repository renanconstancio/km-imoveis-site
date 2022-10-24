import { parse } from "query-string";
import { KeyboardEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Loading } from "../../components/loading";
import {
  PropsImmobilePagination,
  PropsImmobles,
} from "../../global/types/types";
import { Pagination } from "../../components/pagination";
import { api } from "../../api/api";
import { faEdit, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Immobiles() {
  const [loading, setLoading] = useState(true);
  const [immobiles, setImmobiles] = useState<PropsImmobilePagination>();

  const navigate = useNavigate();
  const location = useLocation();

  const query = parse(location.search);

  const q = (query.q || "") as unknown as string;
  const limit = (query.limit || "25") as string;
  const page = (query.page || "1") as string;

  function handleKeyPressSearch(
    event: KeyboardEvent<EventTarget & HTMLInputElement>,
  ) {
    if (event.currentTarget.value) {
      if (event.code === "Enter" || event.keyCode === 13) {
        navigate({
          search: `?q=${event.currentTarget.value}`,
        });
      }
    }
  }

  async function handleDelete(data: PropsImmobles) {
    if (!confirm(`Você deseja excluir ${data.description}?`)) return;
    setLoading(true);
    await api
      .delete(`/immobiles/${data.id}`)
      .then(() =>
        setImmobiles({
          ...immobiles,
          data: immobiles?.data.filter((f: { id: string }) => f.id !== data.id),
        } as PropsImmobilePagination),
      )
      .finally(() => setLoading(false));
  }

  async function loadImmobiles({ limit, page, q }: { [k: string]: string }) {
    setLoading(true);
    await api
      .get(
        `/immobiles?page=${page}&limit=${limit}&search[reference]=${q}&search[description]=${q}&search[city]=${q}&search[street]=${q}&search[district]=${q}`,
      )
      .then(async resp => setImmobiles(await resp.data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    (async () => {
      loadImmobiles({
        limit,
        page,
        q,
      });
    })();
  }, [limit, page, q]);

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
            {q && (
              <Link className="btn-default text-black" to="/adm/immobiles">
                <FontAwesomeIcon icon={faTimes} />
              </Link>
            )}
          </aside>
          <nav>
            <Link className="btn-success" to="/adm/immobiless/new">
              <FontAwesomeIcon icon={faEdit} /> Criar
            </Link>
          </nav>
        </section>
        <nav>
          <Pagination
            total={immobiles?.total || 0}
            currentPage={Number(`${query.page || "1"}`)}
            perPage={Number(`${query.page || "25"}`)}
          />
        </nav>
      </li>

      <li className="list-orders uppercase font-play font-bold bg-gray-200">
        <span className="w-1/12">ações</span>
        <span className="w-1/12">CÓD</span>
        <span className="w-3/12">descrição do imóvel</span>
        <span className="w-3/12">Rua, Avenida, Apto.</span>
      </li>

      {immobiles?.data.map(rws => (
        <li key={rws.id} className="list-orders">
          <span className="flex gap-1 w-1/12">
            <Link
              className="btn-primary btn-xs"
              to={`/adm/immobiles/${rws.id}/edit`}
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
          <span className="w-1/12">{rws.reference}</span>
          <span className="w-3/12">{rws.description}</span>
          <span className="w-3/12">{rws.street?.street}</span>
        </li>
      ))}

      {!immobiles?.data.length && (
        <li className="py-3 px-6 text-center">Nenhum imovel encontado</li>
      )}

      <li className="flex justify-end mt-5">
        <nav>
          <Pagination
            total={immobiles?.total || 0}
            currentPage={Number(`${query.page || "1"}`)}
            perPage={Number(`${query.page || "25"}`)}
          />
        </nav>
      </li>
    </ul>
  );
}
