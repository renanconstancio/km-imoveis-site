import { api } from "../../services/api";
import { useForm } from "react-hook-form";
import { useModal } from "../../hooks/use-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { TCategories } from "../../pages/categories/types";

export type TModalCategory = {
  addCategories: (data: any) => void;
};

export default function ModalCategory({ addCategories }: TModalCategory) {
  const { openCategory, closeCategory } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCategories>();

  async function onSubmit(data: TCategories) {
    await api
      .patch(`/categories`, {
        ...data,
        filter: data.filter === "yes" ? true : false,
      })
      .then(async (res) => {
        const category = await res.data;
        addCategories((old: any) => [...old, category]);
        closeCategory(!openCategory);
      });
  }

  return (
    <div className={`${openCategory ? "" : "hidden"} modal`}>
      <div className="modal-content">
        <div className="modal-body">
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
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full">
                <label className="label-form" htmlFor="category">
                  Descrição do Imóvel
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
