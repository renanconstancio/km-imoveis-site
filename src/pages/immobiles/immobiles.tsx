import { parse, stringify, stringifyUrl } from "query-string";
import { KeyboardEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Loading } from "../../components/loading";
import { PropsImmobilePagination } from "../../global/types/types";
import { Pagination } from "../../components/pagination";
import { api } from "../../api/api";

export default function Immobiles() {
  const [loading, setLoading] = useState(true);
  const [immobile, setImmobile] = useState<PropsImmobilePagination>();

  const navigate = useNavigate();
  const location = useLocation();

  const query = parse(location.search);

  const q = (query.q || "") as unknown as string;
  const limit = (query.limit || "25") as string;
  const page = (query.page || "1") as string;

  function handleClickChange(
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

  async function loadImmobiles({ limit, page, q }: { [k: string]: string }) {
    setLoading(true);
    api
      .get(
        `immobiles?page=${page}&limit=${limit}&search[reference]=${q}&search[description]=${q}&search[city]=${q}&search[street]=${q}&search[district]=${q}`,
      )
      .then(async res => setImmobile(await res.data))
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
      <li className="flex border-b mb-3 pb-3 gap-3 justify-between items-center self-center">
        <span className="flex items-center">
          <Pagination
            total={immobile?.total || 0}
            currentPage={Number(`${query.page || "1"}`)}
            perPage={Number(`${query.page || "25"}`)}
          />
        </span>
        <span className="flex gap-3 justify-end items-center">
          <span className="flex">
            <input
              type="search"
              className="input-form"
              onKeyDown={handleClickChange}
            />
            {q && (
              <Link className="btn-default text-black" to="/adm/immobiles">
                <i className="fas fa-times"></i>
              </Link>
            )}
          </span>
          <span>
            <Link className="btn-success" to="/adm/immobiles/new">
              <i className="fas fa-edit"></i> Criar
            </Link>
          </span>
        </span>
      </li>

      <li className="list-orders uppercase font-play font-bold bg-gray-200">
        <span className="w-1/12">ações</span>
        <span className="w-1/12">CÓD</span>
        <span className="w-3/12">descrição do imóvel</span>
        <span className="w-3/12">Rua, Avenida, Apto.</span>
      </li>

      {immobile?.data.map(rws => (
        <li key={rws.id} className="list-orders">
          <span className="flex gap-1 w-1/12">
            <Link
              className="btn-primary btn-xs"
              to={`/adm/immobiles/${rws.id}/edit`}
            >
              <i className="fas fa-edit"></i>
            </Link>
            <Link
              className="btn-danger btn-xs"
              to={`/adm/immobiles/${rws.id}/edit`}
            >
              <i className="fas fa-trash"></i>
            </Link>
          </span>
          <span className="w-1/12">{rws.reference}</span>
          <span className="w-3/12">
            {rws.description} <br />
            {rws.id}
          </span>
          <span className="w-3/12">{rws.street?.street}</span>
        </li>
      ))}

      {!immobile?.data.length && (
        <li className="py-3 px-6 text-center">Nenhum imovel encontado</li>
      )}
    </ul>
  );
}
