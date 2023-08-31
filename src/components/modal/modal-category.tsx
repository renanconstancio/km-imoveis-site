import { api } from "../../services/api";
import { useForm } from "react-hook-form";
import { useModal } from "../../hooks/use-modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { Category, schemaCategory } from "../../pages/admin/categories/form";

export default function ModalCategory() {
  const { openCategory, closeCategory } = useModal();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Category>({
    resolver: zodResolver(schemaCategory),
  });

  const { mutate } = useMutation({
    mutationFn: async (data: Category) => {
      return await api.patch(`/categories`, data);
    },
    onError: (error) => {
      toast.error("Não foi possivel fazer o cadastro!");
      console.log(`${error}`);
    },
    onSuccess: async () => {
      toast.success("Cadastro salvo com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return (
    <div className={`${openCategory ? "" : "hidden"} modal`}>
      <div className="modal-content">
        <div className="modal-body rounded-lg">
          <button
            type="button"
            className="modal-close"
            onClick={() => closeCategory(!openCategory)}
          >
            <FontAwesomeIcon icon={faTimes} className="text-lg" />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Cadastrar Nova Categoria
            </h3>
            <form
              className="space-y-6"
              onSubmit={handleSubmit(async (data) => mutate(data))}
            >
              <div className="w-full">
                <label className="label-form" htmlFor="category">
                  Descrição da Categoria *
                </label>
                <input
                  type="text"
                  className={`input-form ${errors.category && "invalid"}`}
                  {...register("category", { required: true })}
                />
                {errors.category && (
                  <small className="input-text-invalid">
                    Campo obrigatório
                  </small>
                )}
              </div>
              <div className="w-full">
                <label className="label-form" htmlFor="filter">
                  Filtro?
                </label>
                <div className="relative">
                  <select
                    className="input-form"
                    {...register("filter", { required: false })}
                  >
                    <option value="yes">Sim</option>
                    <option value="no">Não</option>
                  </select>
                </div>
              </div>
              <button className="btn-primary" type="submit">
                Salvar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
