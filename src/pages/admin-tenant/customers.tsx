import { api } from "../../services/api";
import {
  faEdit,
  faSort,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { parse, stringify } from "query-string";
import { KeyboardEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Loading } from "../../components/loading";
import { Pagination } from "../../components/pagination";
import { TPagination } from "../../global/types";
import { TTenant } from "./types";
import { Helmet } from "react-helmet-async";

export default function Customers() {
  const [loading, setLoading] = useState<boolean>(true);
  const [customers, setCustomers] = useState<TPagination<TTenant[]>>(
    {} as TPagination<TTenant[]>,
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

  async function handleDelete(data: TTenant) {
    if (!confirm(`Você deseja excluir ${data.first_name}?`)) return;

    setLoading(true);

    await api
      .delete(`/customers/${data.id}`)
      .then(() => loadCustomers())
      .finally(() => setLoading(false));
  }

  async function loadCustomers() {
    const conveterParse = parse(
      `page=${page}&limit=${limit}&search[type]=tenant&search[last_name]=${qs}&search[first_name]=${qs}&search[cpf]=${qs}`,
    );

    await api
      .get(`/customers?${decodeURI(stringify({ ...query, ...conveterParse }))}`)
      .then(async resp => setCustomers(await resp.data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadCustomers();
  }, [locationDecodURI]);

  if (loading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Lista de Inquilínos - {import.meta.env.VITE_TITLE}</title>
      </Helmet>
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
              {qs && (
                <Link className="btn-default text-black" to="/adm/tenants">
                  <FontAwesomeIcon icon={faTimes} />
                </Link>
              )}
            </aside>
            <nav>
              <Link className="btn-success" to="/adm/tenants/new">
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
          <span className="basis-1/12">ações</span>
          <span
            className="basis-4/12 cursor-pointer"
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
            className="basis-4/12 cursor-pointer"
            onClick={() => {
              const testReference =
                locationDecodURI.indexOf("[first_name]=asc");
              if (testReference !== -1) {
                handleOrder("order[first_name]=desc");
              } else {
                handleOrder("order[first_name]=asc");
              }
            }}
          >
            <FontAwesomeIcon icon={faSort} /> Sobrenome
          </span>
          <span className="basis-3/12">Telefone.</span>
        </li>

        {customers?.data?.map(rws => (
          <li key={rws.id} className="list-orders">
            <span className="flex gap-1 basis-1/12">
              <Link
                className="btn-primary btn-xs"
                to={`/adm/tenants/${rws.id}/edit`}
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
            <span className="basis-4/12">{rws.first_name}</span>
            <span className="basis-4/12">{rws.last_name}</span>
            <span className="basis-3/12">{rws.phone}</span>
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
    </>
  );
}
