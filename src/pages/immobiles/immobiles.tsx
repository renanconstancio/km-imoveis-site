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
    <ul className="overflow-x-auto rounded-sm bg-white">
      <li className="flex border-b py-3 px-6">
        <Link className="btn-primary" to="/adm/immobiles/new">
          Criar
        </Link>
      </li>
      {!immobles.length && (
        <li className="py-3 px-6 text-center">Nenhum imovel encontado</li>
      )}
      {immobles.map(items => (
        <li
          key={items.id}
          className="py-3 px-6 flex flex-row flex-nowrap border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <span>{items.description}</span>
        </li>
      ))}
    </ul>
  );
}
