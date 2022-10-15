import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/api";
import { Loading } from "../../components/loading";

type Props = {
  id: string;
  streets_id: string;
  number: string;
  description: string;
  sale_price: number;
  rent_price: number;
  published: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export default function Immobiles() {
  const [loading, setLoading] = useState(true);
  const [immobles, setImmobles] = useState<Props[]>([]);

  useEffect(() => {
    (async () => {
      api
        .get("/immobiles")
        .then(async res => setImmobles(await res.data))
        .finally(() => setLoading(false));
    })();
  }, []);

  if (loading) return <Loading />;

  return (
    <ul className="overflow-x-auto rounded-sm bg-white p-5">
      <li className="flex border-b pb-3 justify-end">
        <Link className="btn-success" to="/adm/immobiles/new">
          <i className="fas fa-edit"></i> Criar
        </Link>
      </li>
      <li className="list-orders uppercase font-play font-bold bg-gray-200">
        <span>ações</span>
        <span>descrição do imóvel</span>
      </li>

      {immobles.map(rws => (
        <li key={rws.id} className="list-orders">
          <span className="flex gap-1">
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
          <span>{rws.description}</span>
        </li>
      ))}

      {!immobles.length && (
        <li className="py-3 px-6 text-center">Nenhum imovel encontado</li>
      )}
    </ul>
  );
}
