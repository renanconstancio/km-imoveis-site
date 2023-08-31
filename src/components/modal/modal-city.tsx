import { api } from "../../services/api";
import { useForm } from "react-hook-form";
import { useModal } from "../../hooks/use-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { City, schemaCity } from "../../pages/admin/cities/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { State } from "../../pages/admin/states/form";
import { toast } from "react-toastify";

export default function ModalCity() {
  const { openCity, closeCity } = useModal();

  const queryClient = useQueryClient();

  const { data: states } = useQuery({
    queryKey: ["states"],
    queryFn: () => api.get<State[]>(`/states`).then(async (res) => res.data),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<City>({
    resolver: zodResolver(schemaCity),
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
    onSuccess: async () => {
      toast.success("Cadastro salvo com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["cities"] });
    },
  });

  return (
    <div className={`${openCity ? "" : "hidden"} modal`}>
      <div className="modal-content">
        <div className="modal-body rounded-lg">
          <button
            type="button"
            className="modal-close"
            onClick={() => closeCity(!openCity)}
          >
            <FontAwesomeIcon icon={faTimes} className="text-lg" />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Cadastrar Bairros
            </h3>
            <form
              className="flex flex-wrap -mx-3"
              onSubmit={handleSubmit(async (data) => mutate(data))}
            >
              <div className="basis-full md:basis-5/12 px-3 mb-5">
                <label className="label-form" htmlFor="situation">
                  Estado
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
                  <small className="input-text-invalid">
                    Campo obrigatório
                  </small>
                )}
                <datalist id="states">
                  {states &&
                    states?.map(({ id, state }) => (
                      <option key={id} value={state} />
                    ))}
                </datalist>
              </div>
              <div className="basis-full md:basis-9/12 px-3">
                <label className="label-form" htmlFor="city">
                  Cidade.
                </label>
                <input
                  type="text"
                  className={`input-form ${errors.city && "invalid"}`}
                  {...register("city", { required: true })}
                />
                {errors.city && (
                  <small className="input-text-invalid">
                    Campo obrigatório
                  </small>
                )}
              </div>
              <div className="basis-full mt-5 px-3">
                <button className="btn-primary" type="submit">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
