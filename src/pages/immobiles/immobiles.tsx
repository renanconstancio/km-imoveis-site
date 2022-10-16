import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../../components/loading";
import { api } from "../../api/api";
import { PropsImmobles } from "../../global/types/types";

export default function Immobiles() {
  const [loading, setLoading] = useState(true);
  const [immobles, setImmobles] = useState<PropsImmobles[]>([]);

  useEffect(() => {
    (async () => {
      api
        .get(`/immobiles`)
        .then(async res => setImmobles(await res.data))
        .finally(() => setLoading(false));
    })();
  }, []);

  if (loading) return <Loading />;

  return (
    <ul className="overflow-x-auto rounded-sm bg-white p-5">
      <li className="flex border-b pb-3 justify-end items-center">
        <span>
          <input type="search" className="input-form" />
        </span>
        <span>
          <Link className="btn-success" to="/adm/immobiles/new">
            <i className="fas fa-edit"></i> Criar
          </Link>
        </span>
      </li>
      <li className="list-orders uppercase font-play font-bold bg-gray-200">
        <span className="w-1/12">ações</span>
        <span className="w-1/12">CÓD</span>
        <span className="w-3/12">descrição do imóvel</span>
        <span className="w-3/12">Rua, Avenida, Apto.</span>
      </li>

      {immobles.map(rws => (
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
          <span className="w-3/12">{rws.description}</span>
          <span className="w-3/12">{rws.street?.street}</span>
        </li>
      ))}

      {!immobles.length && (
        <li className="py-3 px-6 text-center">Nenhum imovel encontado</li>
      )}
    </ul>
  );
}
