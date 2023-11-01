import {
  faEdit,
  faSort,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { parse, stringify } from "query-string";
import { KeyboardEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { schemaTenantCreated } from "./form";
import { z } from "zod";

import { Loading } from "../../../components/loading";
import { Pagination } from "../../../components/pagination";
import { SEO } from "../../../components/seo";
import { api } from "../../../services/api";

const schema = z.object({
  limit: z.number(),
  page: z.number(),
  total: z.number(),
  data: z.array(schemaTenantCreated),
});

export type TenantPaginated = z.output<typeof schema>;

export default function Tenants() {
  const [textInput, setTextInput] = useState<string>("");

  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const location = useLocation();
  const locationDecodURI = decodeURI(location.search);
  const query = parse(location.search);

  const qs = (query.q || "") as unknown as string;
  const limit = (query.limit || "25") as string;
  const page = (query.page || "1") as string;

  function handleClearSearch() {
    navigate({ search: `?q=` });
    setTextInput("");
  }

  function handleSearch(event: KeyboardEvent<EventTarget & HTMLInputElement>) {
    if (textInput) {
      if (event.code === "Enter" || event.keyCode === 13) {
        navigate({
          search: `?q=${textInput}`,
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

  const { mutate } = useMutation({
    mutationFn: async (id: string) => api.delete(`/customers/${id}`),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["tenants", page, limit, qs],
      }),
  });

  const { data: tenant, isLoading } = useQuery({
    queryKey: ["tenants", page, limit, qs],
    queryFn: () =>
      api
        .get<TenantPaginated>(
          `/customers?page=${page}&limit=${limit}&search[type]=tenant&search[last_name]=${qs}&search[first_name]=${qs}&search[cpf]=${qs}`,
        )
        .then(async (res) => res.data),
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <SEO
        title={`Lista de Proprietários`}
        siteTitle={import.meta.env.VITE_TITLE}
      />

      <ul className="overflow-x-auto rounded-sm bg-white p-5">
        <li className="flex border-b mb-3 pb-3 gap-3 justify-between">
          <section className="basis-6/12 flex gap-3 justify-end items-center">
            <aside className="flex flex-1">
              <input
                type="text"
                className="input-form"
                value={textInput}
                onChange={(e) => setTextInput(e.currentTarget.value)}
                onKeyDown={handleSearch}
              />
              {textInput && (
                <button
                  className="btn text-black w-8 h-8"
                  type="button"
                  onClick={handleClearSearch}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
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
              total={tenant?.total || 0}
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
          <span className="basis-3/12">Telefone</span>
        </li>

        {tenant?.total &&
          tenant?.data?.map((rws) => (
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
                  onClick={() => {
                    if (confirm(`Você deseja excluir ${rws.first_name}?`))
                      mutate(`${rws.id}`);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </span>
              <span className="basis-4/12">{rws.first_name}</span>
              <span className="basis-4/12">{rws.last_name}</span>
              <span className="basis-3/12">{rws.phone}</span>
            </li>
          ))}

        {!tenant?.total && (
          <li className="py-3 px-6 text-center">Nenhum cliente encontado</li>
        )}

        <li className="flex justify-end mt-5">
          <nav>
            <Pagination
              total={tenant?.total || 0}
              currentPage={Number(`${query.page || "1"}`)}
              perPage={Number(`${query.limit || "25"}`)}
            />
          </nav>
        </li>
      </ul>
    </>
  );
}
