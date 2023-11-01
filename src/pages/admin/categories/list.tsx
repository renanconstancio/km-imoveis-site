import { Link } from "react-router-dom";
import { KeyboardEvent, useState } from "react";
import { faEdit, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import { Category } from "./form";
import { Loading } from "../../../components/loading";
import { SEO } from "../../../components/seo";
import { api } from "../../../services/api";

export default function Categories() {
  const [clear, setClear] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>("");

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (id: string) => api.delete(`/categories/${id}`),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      api.get<Category[] | []>(`/categories`).then(async (res) => res.data),
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
      <SEO
        title={`Lista de Categorias`}
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
              {(textInput || clear) && (
                <button
                  className="btn text-black w-8"
                  type="button"
                  onClick={() => {
                    queryClient.invalidateQueries({ queryKey: ["categories"] });
                    setTextInput("");
                    setClear(!clear);
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              )}
            </aside>
            <nav>
              <Link className="btn-success" to="/adm/categories/new">
                <FontAwesomeIcon icon={faEdit} /> Criar
              </Link>
            </nav>
          </section>
        </li>

        <li className="list-orders uppercase font-play font-bold bg-gray-200">
          <span className="basis-1/12">ações</span>
          <span className="basis-11/12">categorias</span>
        </li>

        {data?.length &&
          data
            ?.filter((item) => item.category.toLowerCase().includes(textInput))
            ?.map((rws) => (
              <li key={rws.id} className="list-orders">
                <span className="flex gap-1 basis-1/12">
                  <Link
                    className="btn-primary btn-xs"
                    to={`/adm/categories/${rws.id}/edit`}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                  <span
                    className="btn-danger btn-xs"
                    onClick={() => {
                      if (confirm(`Você deseja excluir ${rws.category}?`))
                        return mutate(`${rws.id}`);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </span>
                <span className="basis-11/12">{rws.category}</span>
              </li>
            ))}

        {!data?.length && (
          <li className="py-3 px-6 text-center">Nenhuma categoria encontada</li>
        )}
      </ul>
    </>
  );
}
