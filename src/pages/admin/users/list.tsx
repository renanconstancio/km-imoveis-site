import { KeyboardEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { SEO } from "../../../components/seo";
import { Loading } from "../../../components/loading";
import { Link } from "react-router-dom";
import { api } from "../../../services/api";

export type User = {
  id: string;
  type: string;
  email: string;
  first_name: string;
  last_name: string | null;
  creci: string;
  phone: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export default function Users() {
  const [clear, setClear] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>("");

  const queryClient = useQueryClient();

  function handleSearch(event: KeyboardEvent<EventTarget & HTMLInputElement>) {
    if (
      event.currentTarget.value &&
      (event.code === "Enter" || event.keyCode === 13)
    ) {
      setClear(!clear);
    }
  }

  const { mutate } = useMutation({
    mutationFn: async (id: string) => api.delete(`/users/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const { data, isLoading } = useQuery<User[] | []>({
    queryKey: ["users"],
    queryFn: () => api.get(`/users`).then(async (res) => res.data),
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <SEO title={`Lista de Usuários`} siteTitle={import.meta.env.VITE_TITLE} />

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
                    queryClient.invalidateQueries({ queryKey: ["users"] });
                    setTextInput("");
                    setClear(!clear);
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              )}
            </aside>
            <nav>
              <Link className="btn-success" to="/adm/users/new">
                <FontAwesomeIcon icon={faEdit} /> Criar
              </Link>
            </nav>
          </section>
        </li>

        <li className="list-orders uppercase font-play font-bold bg-gray-200">
          <span className="basis-1/12">ações</span>
          <span className="basis-11/12">Nome.</span>
        </li>

        {data
          ?.filter((item) => item.first_name.toLowerCase().includes(textInput))
          ?.map((rws) => (
            <li key={rws.id} className="list-orders">
              <span className="flex gap-1 basis-1/12">
                <Link
                  className="btn-primary btn-xs"
                  to={`/adm/users/${rws.id}/edit`}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
                <span
                  className="btn-danger btn-xs"
                  onClick={() => {
                    if (!confirm(`Você deseja excluir ${rws.first_name}?`))
                      return;

                    mutate(`${rws.id}`);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </span>
              <span className="basis-11/12">{rws.first_name}</span>
            </li>
          ))}

        {!data?.length && (
          <li className="py-3 px-6 text-center">Nenhum imovel encontado</li>
        )}
      </ul>
    </>
  );
}
