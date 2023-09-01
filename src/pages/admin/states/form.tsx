import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUndo } from "@fortawesome/free-solid-svg-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "../../../components/inputs";
import { SEO } from "../../../components/seo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { api } from "../../../services/api";

export const schemaState = z.object({
  id: z.string().optional(),
  state: z.string().min(2, { message: "Campo obrigatório!" }),
});

export type State = z.infer<typeof schemaState>;

export default function FormStates() {
  const navigate = useNavigate();

  const { stateId } = useParams<{ stateId: string | undefined }>();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<State>({
    resolver: zodResolver(schemaState),
  });

  const { mutate } = useMutation({
    mutationFn: async (data: State) => {
      return await api.patch(`/states`, { ...data });
    },
    onError: (error) => {
      toast.error("Não foi possivel fazer o cadastro!");
      console.log(`${error}`);
    },
    onSuccess: async (resp) => {
      toast.success("Cadastro salvo com sucesso!");
      navigate({
        pathname: `/adm/states/${await resp.data?.id}/edit`,
      });
    },
  });

  useQuery({
    queryKey: ["city", stateId],
    queryFn: () => {
      if (!stateId) return null;
      return api.get<State>(`/states/${stateId}`).then(async (res) => res.data);
    },
    onSuccess: (data) => {
      if (data) {
        reset(data);
      }
    },
  });

  return (
    <>
      <SEO
        title={`${stateId ? "Editar" : "Cadastrar"} Estados`}
        siteTitle={import.meta.env.VITE_TITLE}
      />

      <div className="overflow-x-auto rounded-sm bg-white p-6">
        <div className="border-b pb-3 mb-5 flex gap-3">
          <button className="btn-success btn-ico" type="submit" form="form">
            <FontAwesomeIcon icon={faSave} />
            <span>Salvar</span>
          </button>

          <Link className="btn-warning btn-ico" to="/adm/states">
            <FontAwesomeIcon icon={faUndo} />
            <span>Voltar</span>
          </Link>
        </div>
        <form
          id="form"
          className="basis-full"
          onSubmit={handleSubmit(async (data) => mutate(data))}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="basis-full md:basis-4/12 px-3">
              <Input
                type="text"
                label="Estado. *"
                className={`input-form ${errors.state && "invalid"}`}
                error={errors.state}
                register={register("state")}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
