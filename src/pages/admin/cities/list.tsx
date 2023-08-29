import { Link } from "react-router-dom";
import { KeyboardEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Loading } from "../../../components/loading";
import { SEO } from "../../../components/seo/seo";
import { City } from "../cities/form";
import { api } from "../../../services/api";

export default function Cities() {
  const [clear, setClear] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>("");

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (id: string) => api.delete(`/cities/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cities"] }),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["cities"],
    queryFn: () =>
      api.get<City[] | []>(`/cities`).then(async (res) => res.data),
  });

  function handleSearch(event: KeyboardEvent<EventTarget & HTMLInputElement>) {
    if (
      event.currentTarget.value &&
      (event.code === "Enter" || event.keyCode === 13)
    ) {
      setClear(!clear);
    }
  }

  if (isLoading) return <Loading />;

  return (
    <>
      <SEO title={`Lista de Cidades`} siteTitle={import.meta.env.VITE_TITLE} />

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
              {(textInput || clear) && (
                <button
                  className="btn text-black w-8"
                  type="button"
                  onClick={() => {
                    queryClient.invalidateQueries({ queryKey: ["cities"] });
                    setTextInput("");
                    setClear(!clear);
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              )}
            </aside>
            <nav>
              <Link className="btn-success" to="/adm/cities/new">
                <FontAwesomeIcon icon={faEdit} /> Criar
              </Link>
            </nav>
          </section>
        </li>

        <li className="list-orders uppercase font-play font-bold bg-gray-200">
          <span className="basis-1/12">ações</span>
          <span className="basis-11/12">Cidade</span>
        </li>

        {data?.length &&
          data
            ?.filter((item) => item.city.toLowerCase().includes(textInput))
            ?.map((rws) => (
              <li key={rws.id} className="list-orders">
                <span className="flex gap-1 basis-1/12">
                  <Link
                    className="btn-primary btn-xs"
                    to={`/adm/cities/${rws.id}/edit`}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                  <span
                    className="btn-danger btn-xs"
                    onClick={() => {
                      if (!confirm(`Você deseja excluir ${rws.city}?`)) return;

                      mutate(`${rws.id}`);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </span>
                <span className="basis-11/12">
                  {[rws.city, rws.state?.state].join("/")}
                </span>
              </li>
            ))}

        {!data?.length && (
          <li className="py-3 px-6 text-center">Nenhuma cidade encontada</li>
        )}
      </ul>
    </>
  );
}
