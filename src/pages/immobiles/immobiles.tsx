import { SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../../components/loading";
import { api } from "../../api/api";
import { PropsImmobilePagination } from "../../global/types/types";
import { useQuery } from "../../hooks/use-query";
import { Pagination } from "../../components/pagination";

export default function Immobiles() {
  const [loading, setLoading] = useState(true);
  const [immobile, setImmobile] = useState<PropsImmobilePagination>();
  const [search, setHandleEnterSearch] = useState();

  const query = useQuery();

  const limit = query.get("limit") || "25";
  const page = query.get("page") || "1";
  const q = query.get("q") || "";

  async function loadImmobiles(params: { [k: string]: string }) {
    setLoading(true);
    api
      .get(`/immobiles?${new URLSearchParams(params).toString()}`)
      .then(async res => setImmobile(await res.data))
      .finally(() => setLoading(false));
  }

  function handleClickChange(e: {
    keyCode: number;
    key: string;
    target: { value: string };
  }) {
    if (e.keyCode === 13 || e.key === "enter")
      setHandleEnterSearch(e.target.value);
  }

  useEffect(() => {
    (async () => {
      loadImmobiles({
        limit,
        page,
        qS: search,
      });
    })();
  }, [limit, page, search]);

  if (loading) return <Loading />;

  return (
    <ul className="overflow-x-auto rounded-sm bg-white p-5">
      <li className="flex border-b mb-3 pb-3 gap-3 justify-between items-center self-center">
        <span className="flex items-center">
          <Pagination
            total={immobile?.total || 0}
            currentPage={Number(`${query.get("page") || "1"}`)}
            perPage={Number(`${query.get("page") || "25"}`)}
          />
        </span>
        <span className="flex gap-3 justify-end items-center">
          <span>
            <input
              type="search"
              className="input-form"
              onKeyDown={handleClickChange}
            />
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
