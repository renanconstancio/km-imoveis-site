import { parse, stringify } from "query-string";
import { KeyboardEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Loading } from "../../components/loading";
import { PropsCustomers, PropsPagination } from "../../global/types/types";
import { Pagination } from "../../components/pagination";
import {
  faEdit,
  faSort,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api } from "../../services/api";

export default function Customers() {
  const [loading, setLoading] = useState<boolean>(true);
  const [customers, setCustomers] = useState<PropsPagination<PropsCustomers[]>>(
    {} as PropsPagination<PropsCustomers[]>,
  );

  const navigate = useNavigate();
  const location = useLocation();
  const locationDecodURI = decodeURI(location.search);
  const query = parse(location.search);

  const qs = (query.q || "") as unknown as string;
  const limit = (query.limit || "25") as string;
  const page = (query.page || "1") as string;

  function handleSearch(event: KeyboardEvent<EventTarget & HTMLInputElement>) {
    if (event.currentTarget.value) {
      if (event.code === "Enter" || event.keyCode === 13) {
        navigate({
          search: `?q=${event.currentTarget.value}`,
        });
      }
    }
  }

  function handleOrder(orderString: string) {
    const qsParse = parse(orderString);

    navigate({
      search: decodeURI(stringify({ ...query, ...qsParse })),
    });
  }

  async function handleDelete({
    id,
    first_name,
  }: {
    id: string;
    first_name: string;
  }) {
    if (!confirm(`Você deseja excluir ${first_name}?`)) return;
    setLoading(true);
    await api
      .delete(`/customers/${id}`)
      .then(() =>
        setCustomers({
          ...customers,
          data: customers?.data?.filter((f: { id: string }) => f.id !== id),
        }),
      )
      .finally(() => setLoading(false));
  }

  async function loadCustomers() {
    const conveterParse = parse(
      `page=${page}&limit=${limit}&search[type]=owner&search[last_name]=${qs}&search[first_name]=${qs}&search[cpf]=${qs}`,
    );

    setLoading(true);
    await api
      .get(`/customers?${decodeURI(stringify({ ...query, ...conveterParse }))}`)
      .then(async resp => setCustomers(await resp.data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    (async () => {
      loadCustomers();
    })();
  }, [locationDecodURI]);

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
              onKeyDown={handleSearch}
            />
            {qs && (
              <Link className="btn-default text-black" to="/adm/owners">
                <FontAwesomeIcon icon={faTimes} />
              </Link>
            )}
          </aside>
          <nav>
            <Link className="btn-success" to="/adm/owners/new">
              <FontAwesomeIcon icon={faEdit} /> Criar
            </Link>
          </nav>
        </section>
        <nav>
          <Pagination
            total={customers?.total || 0}
            currentPage={Number(`${query.page || "1"}`)}
            perPage={Number(`${query.limit || "25"}`)}
          />
        </nav>
      </li>

      <li className="list-orders uppercase font-play font-bold bg-gray-200">
        <span className="w-1/12">ações</span>
        <span
          className="w-4/12 cursor-pointer"
          onClick={() => {
            const testReference = locationDecodURI.indexOf("[last_name]=asc");
            if (testReference !== -1) {
              handleOrder("order[last_name]=desc");
            } else {
              handleOrder("order[last_name]=asc");
            }
          }}
        >
          <FontAwesomeIcon icon={faSort} /> Nome
        </span>
        <span
          className="w-4/12 cursor-pointer"
          onClick={() => {
            const testReference = locationDecodURI.indexOf("[first_name]=asc");
            if (testReference !== -1) {
              handleOrder("order[first_name]=desc");
            } else {
              handleOrder("order[first_name]=asc");
            }
          }}
        >
          <FontAwesomeIcon icon={faSort} /> Sobrenome
        </span>
        <span className="w-3/12">Telefone.</span>
      </li>

      {customers?.data?.map(({ id, first_name, last_name, phone }) => (
        <li key={id} className="list-orders">
          <span className="flex gap-1 w-1/12">
            <Link className="btn-primary btn-xs" to={`/adm/owners/${id}/edit`}>
              <FontAwesomeIcon icon={faEdit} />
            </Link>
            <span
              className="btn-danger btn-xs"
              onClick={() => handleDelete({ id, first_name })}
            >
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </span>
          <span className="w-4/12">{first_name}</span>
          <span className="w-4/12">{last_name}</span>
          <span className="w-3/12">{phone}</span>
        </li>
      ))}

      {!customers?.data?.length && (
        <li className="py-3 px-6 text-center">Nenhum cliente encontado</li>
      )}

      <li className="flex justify-end mt-5">
        <nav>
          <Pagination
            total={customers?.total || 0}
            currentPage={Number(`${query.page || "1"}`)}
            perPage={Number(`${query.limit || "25"}`)}
          />
        </nav>
      </li>
    </ul>
  );
}
