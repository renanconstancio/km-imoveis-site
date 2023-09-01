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
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { Loading } from "../../../components/loading";
import { Pagination } from "../../../components/pagination";
import { SEO } from "../../../components/seo/seo";

import { situationText } from "../../../utils/functions";
import { schemaImmobleZod } from "./schema";
import { api } from "../../../services/api";

const schema = z.object({
  limit: z.number(),
  page: z.number(),
  total: z.number(),
  data: z.array(schemaImmobleZod),
});

export type ImmobilePaginated = z.output<typeof schema>;

export default function Immobiles() {
  const [textInput, setTextInput] = useState<string>("");

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const location = useLocation();

  const uriDecode = decodeURI(location.search);
  const query = parse(uriDecode);

  const qs = (query.q || "") as string;
  const limit = (query.limit || "25") as string;
  const page = (query.page || "1") as string;

  const urlParse = parse(
    `page=${page}&limit=${limit}&search[reference]=${qs}&search[description]=${qs}&search[city]=${qs}&search[street]=${qs}&search[district]=${qs}`,
  );

  function handleClearSearch() {
    setTextInput("");
    navigate({ search: `?q=` });
  }

  function handleSearch(event: KeyboardEvent<EventTarget & HTMLInputElement>) {
    if (textInput)
      if (event.code === "Enter" || event.keyCode === 13)
        navigate({
          search: `?q=${textInput}`,
        });
  }

  function handleOrder(orderString: string) {
    const qsParse = parse(orderString);

    navigate({
      search: decodeURI(stringify({ ...query, ...qsParse })),
    });
  }

  const { mutate } = useMutation({
    mutationFn: async (id: string) => api.delete(`/immobiles/${id}`),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [
          `immobiles${decodeURI(stringify({ ...query, ...urlParse }))}`,
        ],
      }),
  });

  const { data: immobiles, isLoading } = useQuery<ImmobilePaginated>({
    queryKey: [`immobiles${decodeURI(stringify({ ...query, ...urlParse }))}`],
    queryFn: async () => {
      return api
        .get(`/immobiles?${decodeURI(stringify({ ...query, ...urlParse }))}`)
        .then(async (resp) => resp.data);
    },
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <SEO title="Lista de Imóveis" siteTitle={import.meta.env.VITE_TITLE} />

      <ul className="overflow-x-auto rounded-sm bg-white p-5">
        <li className="flex flex-wrap border-b mb-3 pb-3 gap-3 justify-between">
          <section className="w-full md:basis-6/12 flex gap-3 justify-end items-center">
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
              <Link className="btn-success" to="/adm/immobiles/new">
                <FontAwesomeIcon icon={faEdit} /> Criar
              </Link>
            </nav>
          </section>
          <nav>
            <Pagination
              total={immobiles?.total || 0}
              currentPage={Number(`${query.page || "1"}`)}
              perPage={Number(`${query.limit || "25"}`)}
            />
          </nav>
        </li>

        <li className="list-orders uppercase font-play font-bold bg-gray-200">
          <span className="basis-2/12 text-center">ações</span>
          <span
            className="basis-1/12 cursor-pointer"
            onClick={() => {
              const testReference = uriDecode.indexOf("[reference]=asc");
              if (testReference !== -1) {
                handleOrder("order[reference]=desc");
              } else {
                handleOrder("order[reference]=asc");
              }
            }}
          >
            <FontAwesomeIcon icon={faSort} /> CÓD
          </span>
          <span
            className="basis-3/12 cursor-pointer"
            onClick={() => {
              const testReference = uriDecode.indexOf("[description]=asc");
              if (testReference !== -1) {
                handleOrder("order[description]=desc");
              } else {
                handleOrder("order[description]=asc");
              }
            }}
          >
            <FontAwesomeIcon icon={faSort} /> descrição do imóvel
          </span>
          <span className="basis-4/12">Rua, Avenida, Apto.</span>
          <span
            className="basis-1/12 cursor-pointer"
            onClick={() => {
              const testReference = uriDecode.indexOf("[published]=asc");
              if (testReference !== -1) {
                handleOrder("order[published]=desc");
              } else {
                handleOrder("order[published]=asc");
              }
            }}
          >
            <FontAwesomeIcon icon={faSort} /> Site
          </span>
          <span className="text-center basis-1/12">Situação</span>
        </li>

        {immobiles?.data?.map((rws) => (
          <li key={rws.id} className="list-orders">
            <span className="flex gap-1 basis-1/12">
              <Link
                className="btn-primary btn-xs"
                to={`/adm/immobiles/${rws.id}/edit`}
              >
                <FontAwesomeIcon icon={faEdit} />
              </Link>
              <span
                className="btn-danger btn-xs"
                onClick={() => {
                  if (confirm(`Você deseja excluir ${rws.reference}?`))
                    return mutate(`${rws.id}`);
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </span>
            <span className="flex gap-1 basis-1/12">
              <img src={rws.photos?.[0]?.image_xs} alt="." className="w-full" />
            </span>
            <span className="basis-1/12">{rws.reference}</span>
            <span className="basis-3/12">{rws.description}</span>
            <span className="basis-4/12">{rws.street?.street}</span>
            <span className={`text-center basis-1/12`}>
              <span
                className={`rounded-full w-10 h-10 leading-9 block ${
                  rws.published ? "bg-green-300" : "bg-red-300"
                }`}
              >
                {rws.published ? "ON" : "OFF"}
              </span>
            </span>
            <span className="basis-1/12 text-center">
              {situationText(rws.situation)}
            </span>
          </li>
        ))}

        {!immobiles?.data?.length && (
          <li className="py-3 px-6 text-center">Nenhum imovel encontado</li>
        )}

        <li className="flex justify-end mt-5">
          <nav>
            <Pagination
              total={immobiles?.total || 0}
              currentPage={Number(`${query.page || "1"}`)}
              perPage={Number(`${query.limit || "25"}`)}
            />
          </nav>
        </li>
      </ul>
    </>
  );
}
