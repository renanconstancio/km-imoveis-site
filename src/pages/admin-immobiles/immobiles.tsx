import { parse, stringify } from "query-string";
import { KeyboardEvent, useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Loading } from "../../components/loading";
import { Pagination } from "../../components/pagination";
import {
  faEdit,
  faSort,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { situationText } from "../../utils/functions";
import { api } from "../../services/api";
import { PropsPagination } from "../../global/types";
import { PropsImmobles } from "./types";

export default function Immobiles() {
  const [loading, setLoading] = useState<boolean>(true);
  const [immobiles, setImmobiles] = useState<PropsPagination<PropsImmobles[]>>(
    {} as PropsPagination<PropsImmobles[]>,
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

  const handleDelete = useCallback(
    async ({ id, description }: { id: string; description: string }) => {
      if (!confirm(`Você deseja excluir ${description}?`)) return;
      setLoading(true);
      await api
        .delete(`/immobiles/${id}`)
        .then(() =>
          setImmobiles({
            ...immobiles,
            data: immobiles?.data?.filter((f: { id: string }) => f.id !== id),
          }),
        )
        .finally(() => setLoading(false));
    },
    [],
  );

  const loadImmobiles = useCallback(async () => {
    setLoading(true);

    const urlParse = parse(
      `page=${page}&limit=${limit}&search[reference]=${qs}&search[description]=${qs}&search[city]=${qs}&search[street]=${qs}&search[district]=${qs}`,
    );

    await api
      .get(`/immobiles?${decodeURI(stringify({ ...query, ...urlParse }))}`)
      .then(async resp => setImmobiles(await resp.data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadImmobiles();
  }, [locationDecodURI]);

  if (loading) return <Loading />;

  return (
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
              <Link className="btn-default text-black" to="/adm/immobiles">
                <FontAwesomeIcon icon={faTimes} />
              </Link>
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
            const testReference = locationDecodURI.indexOf("[reference]=asc");
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
            const testReference = locationDecodURI.indexOf("[description]=asc");
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
          className="text-center basis-1/12 cursor-pointer"
          onClick={() => {
            const testReference = locationDecodURI.indexOf("[published]=asc");
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

      {immobiles?.data?.map(
        ({
          id,
          photos,
          reference,
          description,
          street,
          published,
          situation,
        }) => (
          <li key={id} className="list-orders">
            <span className="flex gap-1 basis-1/12">
              <img src={photos?.[0]?.image_xs} alt="." className="w-full" />
            </span>
            <span className="flex gap-1 basis-1/12">
              <Link
                className="btn-primary btn-xs"
                to={`/adm/immobiles/${id}/edit`}
              >
                <FontAwesomeIcon icon={faEdit} />
              </Link>
              <span
                className="btn-danger btn-xs"
                onClick={() => handleDelete({ id, description })}
              >
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </span>
            <span className="basis-1/12">{reference}</span>
            <span className="basis-4/12">{description}</span>
            <span className="basis-4/12">{street?.street}</span>
            <span
              className={`text-center basis-1/12 ${
                published ? "bg-green-300" : "bg-red-300"
              }`}
            >
              {published ? "ON" : "OFF"}
            </span>
            <span className="basis-1/12 text-center">
              {situationText(situation)}
            </span>
          </li>
        ),
      )}

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
  );
}
