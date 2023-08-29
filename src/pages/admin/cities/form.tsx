import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUndo } from "@fortawesome/free-solid-svg-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { State, schemaState } from "../states/form";
import { SEO } from "../../../components/seo/seo";
import { Input } from "../../../components/inputs";
import { api } from "../../../services/api";

export const schemaCity = z.object({
  id: z.string().optional(),
  city: z.string().min(1, { message: "Campo obrigatório!" }),
  states_id: z.string().min(1, { message: "Campo obrigatório!" }),
  state: schemaState.optional(),
});

export type City = z.infer<typeof schemaCity>;

export default function FormCities() {
  const navigate = useNavigate();

  const { cityId } = useParams<{ cityId: string | undefined }>();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<City>({
    resolver: zodResolver(schemaCity),
  });

  const { data: states } = useQuery({
    queryKey: ["states"],
    queryFn: () => api.get<State[]>(`/states`).then(async (res) => res.data),
  });

  const { mutate } = useMutation({
    mutationFn: async (data: City) => {
      const newData = {
        ...data,
        states_id: states?.find((item) => item.state === data.states_id)?.id,
      };
      return await api.patch(`/cities`, { ...newData });
    },
    onError: (error) => {
      toast.error("Não foi possivel fazer o cadastro!");
      console.log(`${error}`);
    },
    onSuccess: async (resp) => {
      toast.success("Cadastro salvo com sucesso!");
      navigate({
        pathname: `/adm/cities/${await resp.data?.id}/edit`,
      });
    },
  });

  useQuery({
    queryKey: ["city", cityId],
    queryFn: () => {
      if (!cityId) return null;
      return api.get<City>(`/cities/${cityId}`).then(async (res) => res.data);
    },
    onSuccess: (data) => {
      if (data) {
        const newData = {
          ...data,
          states_id: states?.find((item) => item.id === data.states_id)?.state,
        };
        reset(newData);
      }
    },
  });

  return (
    <>
      <SEO
        title={`${cityId ? "Editar" : "Cadastrar"} Cidades`}
        siteTitle={import.meta.env.VITE_TITLE}
      />

      <div className="overflow-x-auto rounded-sm bg-white p-6">
        <div className="border-b pb-3 mb-5 flex gap-3">
          <button className="btn-success btn-ico" type="submit" form="form">
            <FontAwesomeIcon icon={faSave} />
            <span>Salvar</span>
          </button>

          <Link className="btn-warning btn-ico" to="/adm/cities">
            <FontAwesomeIcon icon={faUndo} />
            <span>Voltar</span>
          </Link>
        </div>
        <form
          id="form"
          className="basis-full"
          onSubmit={handleSubmit((values) => {
            mutate(values);
          })}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="basis-full md:basis-4/12 px-3">
              <Input
                type="text"
                label="Cidade *"
                className={`input-form ${errors.city && "invalid"}`}
                error={errors.city}
                register={register("city")}
              />
            </div>
            <div className="basis-full mb-5"></div>
            <div className="basis-full md:basis-2/12 px-3 mb-5">
              <label className="label-form" htmlFor="situation">
                Estado *
              </label>
              <div className="flex">
                <input
                  list="states"
                  type="search"
                  placeholder="Pesquisar..."
                  className={`input-form ${errors.states_id && "invalid"}`}
                  {...register("states_id", { required: true })}
                />
              </div>
              {errors.states_id && (
                <small className="input-text-invalid">Campo obrigatório</small>
              )}
              <datalist id="states">
                {states?.map((item) => (
                  <option key={item.id} value={item.state} />
                ))}
              </datalist>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
