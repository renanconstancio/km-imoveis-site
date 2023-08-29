import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { KeyboardEvent, useState } from "react";
import { faEdit, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

import { State } from "../states/form";
import { Loading } from "../../../components/loading";
import { SEO } from "../../../components/seo/seo";
import { api } from "../../../services/api";

export default function States() {
  const [clear, setClear] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>("");

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (id: string) => api.delete(`/states/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["states"] }),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["states"],
    queryFn: () =>
      api.get<State[] | []>(`/states`).then(async (res) => res.data),
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
      <SEO title={`Lista de Estados`} siteTitle={import.meta.env.VITE_TITLE} />

      <ul className="overflow-x-auto rounded-sm bg-white p-5">
        <li className="flex border-b mb-3 pb-3 gap-3 justify-between">
          <section className="w-6/12 flex gap-3 justify-end items-center">
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
                    queryClient.invalidateQueries({ queryKey: ["states"] });
                    setTextInput("");
                    setClear(!clear);
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              )}
            </aside>
            <nav>
              <Link className="btn-success" to="/adm/states/new">
                <FontAwesomeIcon icon={faEdit} /> Criar
              </Link>
            </nav>
          </section>
        </li>

        <li className="list-orders uppercase font-play font-bold bg-gray-200">
          <span className="w-1/12">ações</span>
          <span className="w-11/12">Estados</span>
        </li>

        {data?.length &&
          data
            ?.filter((item) => item.state.toLowerCase().includes(textInput))
            ?.map((rws) => (
              <li key={rws.id} className="list-orders">
                <span className="flex gap-1 w-1/12">
                  <Link
                    className="btn-primary btn-xs"
                    to={`/adm/states/${rws.id}/edit`}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                  <span
                    className="btn-danger btn-xs"
                    onClick={() => {
                      if (!confirm(`Você deseja excluir ${rws.state}?`)) return;

                      mutate(`${rws.id}`);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </span>
                <span className="w-11/12">{rws.state}</span>
              </li>
            ))}

        {!data?.length && (
          <li className="py-3 px-6 text-center">Nenhum estado encontado</li>
        )}
      </ul>
    </>
  );
}
