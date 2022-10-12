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

export default function Immobles() {
  const [immobles, setImmobles] = useState<Props[]>([]);

  useEffect(() => {
    (async () => {
      api.get("/immobles").then(async res => setImmobles(await res.data));
    })();
  }, []);

  if (immobles.length) return <Loading />;

  return (
    <div>
      <ul>
        <li>
          <Link className="btn-primary" to="/adm/immobles/new">
            Criar
          </Link>
        </li>
        {immobles.map(items => (
          <li key={items.id}>
            <span>{items.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
